<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import type { Writable } from 'svelte/store';
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

	function formatPrice(amount: string, unit: string): string {
		const symbol = unit === 'USD' ? '$' : unit === 'EUR' ? '€' : '';
		return `${symbol}${amount}`;
	}

	async function fetchPricing(selectedInterval: string): Promise<void> {
		isLoading.set(true);
		try {
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
				const data = await response.json();
				pricing.set(data);
			} else {
				console.error('Failed to fetch data');
			}
		} catch (error) {
			console.error('Failed to fetch data', error);
		} finally {
			isLoading.set(false);
		}
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

<section class="flex flex-col items-center justify-center mx-[32px] my-[38px] md:mx-[80px] gap-3">
	<Heading
		title="We didn't reinvent the wheel"
		description="We are strategists, designers and developers. Innovators and problem solvers. Small enough to
        be simple and quick, but big enough to deliver the scope you want at the pace you need."
	/>
	<Slider bind:MonthlyChecked bind:YearlyChecked {toggleInterval} />

	{#if $isLoading}
		<div class="flex justify-center items-center min-h-[500px]">
			<LoadingSpinner />
		</div>
	{:else}
		<div class="flex flex-col mb-6 lg:flex-row lg:items-end gap-7">
			{#each formattedPricing as { name, formattedAmount, mostPopular }}
				<Card {name} {formattedAmount} {mostPopular} {toggleInterval}>
					<span slot="buttonText">
						Go to {YearlyChecked ? 'monthly' : 'annual'} plan →
					</span>
				</Card>
			{/each}
		</div>
	{/if}
</section>
