<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import type { Writable } from 'svelte/store';
	import PageWrapper from './PageWrapper.svelte';
	import Heading from './Heading.svelte';
	import Slider from './Slider.svelte';
	import LoadingSpinner from './LoadingSpinner.svelte';
	import Card from './Card.svelte';

	interface PricingPlan {
		amount: string;
		unit: string;
	}

	interface Pricing {
		[key: string]: PricingPlan;
	}

	let interval: Writable<string> = writable('monthly');
	let pricing: Writable<Pricing> = writable({});
	let isLoading: Writable<boolean> = writable(false);
	let isInitialLoading: Writable<boolean> = writable(true);

	function formatPrice(amount: string, unit: string): string {
		const symbol = unit === 'USD' ? '$' : unit === 'EUR' ? '€' : '';
		return `${symbol}${amount}`;
	}

	async function fetchAndCacheData(
		selectedInterval: string,
		cacheKey: string,
		now: number,
		useCacheData: boolean = false,
		cachedData: any = null
	): Promise<boolean> {
		if (useCacheData && cachedData) {
			pricing.set(cachedData.data);
			isInitialLoading.set(false);
			return false;
		}

		const response = await fetch('/api/proxy', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				interval: selectedInterval
			})
		});

		if (response.ok) {
			const newPrices = await response.json();
			if (!useCacheData || JSON.stringify(newPrices) !== JSON.stringify(cachedData.data)) {
				localStorage.setItem(cacheKey, JSON.stringify({ data: newPrices, timestamp: now }));
				pricing.set(newPrices);
				return true;
			}
		}
		return false;
	}

	async function fetchPricing(selectedInterval: string): Promise<void> {
		isLoading.set(true);

		const cacheKey = `pricing_${selectedInterval}`;
		const cachedData = localStorage.getItem(cacheKey);
		const now = new Date().getTime();
		let dataLoaded = false;

		if (cachedData) {
			const parsedCache = JSON.parse(cachedData);
			if (now - parsedCache.timestamp < 24 * 60 * 60 * 1000) {
				dataLoaded = await fetchAndCacheData(selectedInterval, cacheKey, now, true, parsedCache);
			}
		}

		if (!dataLoaded) {
			await fetchAndCacheData(selectedInterval, cacheKey, now);
		}

		isLoading.set(false);
	}

	function toggleInterval(): Promise<void> {
		return new Promise<void>((resolve) => {
			interval.update((currentInterval) => {
				const newInterval = currentInterval === 'monthly' ? 'yearly' : 'monthly';
				fetchPricing(newInterval).then(resolve);
				return newInterval;
			});
		});
	}

	$: MonthlyChecked = $interval === 'monthly';
	$: YearlyChecked = $interval === 'yearly';

	$: formattedPricing = Object.entries($pricing).map(([plan, details]) => ({
		name: plan.charAt(0).toUpperCase() + plan.slice(1),
		amount: details.amount,
		unit: details.unit,
		formattedAmount: formatPrice(details.amount, details.unit),
		mostPopular: plan === 'pro'
	}));

	onMount(() => {
		fetchPricing($interval);
	});
</script>

<PageWrapper>
	<Heading
		title="We didn't reinvent the wheel"
		description="We are strategists, designers and developers..."
	/>
	<Slider bind:MonthlyChecked bind:YearlyChecked {toggleInterval} />

	{#if $isInitialLoading}
		<div class="flex justify-center items-center min-h-[500px]">
			<LoadingSpinner />
		</div>
	{:else}
		<div class="flex flex-col mb-6 w-full md:flex-row md:items-end gap-7">
			{#each formattedPricing as { name, formattedAmount, mostPopular }}
				<Card {name} {formattedAmount} {mostPopular} {toggleInterval} isLoading={$isLoading}>
					<span slot="buttonText">
						Go to {YearlyChecked ? 'monthly' : 'annual'} plan →
					</span>
				</Card>
			{/each}
		</div>
	{/if}
</PageWrapper>
