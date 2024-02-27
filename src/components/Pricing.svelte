<script lang="ts">
	import { writable } from 'svelte/store';
	import type { Writable } from 'svelte/store';

	interface PricingPlan {
		amount: string;
		unit: string;
	}

	interface Pricing {
		[key: string]: PricingPlan;
	}

	// Derived store to determine the interval based on the toggle state
	let interval: Writable<string> = writable('monthly');
	let pricing: Writable<Pricing> = writable({});

	function formatPrice(amount: string, unit: string): string {
		const symbol = unit === 'USD' ? '$' : unit === 'EUR' ? '€' : '';
		return `${symbol}${amount}`;
	}

	// toggle the interval and make the API request
	async function fetchPricing(): Promise<void> {
		interval.update((current) => (current === 'monthly' ? 'yearly' : 'monthly'));

		const response = await fetch('/api/proxy', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				interval: $interval
			})
		});

		if (response.ok) {
			const data = await response.json();
			pricing.set(data);
		} else {
			console.error('Failed to fetch data');
		}
	}
	$: MonthlyChecked = $interval === 'monthly';
	$: YearlyChecked = $interval === 'yearly';
	$: formattedPricing = {};
	pricing.subscribe(($pricing) => {
		formattedPricing = Object.entries($pricing).map(([plan, details]) => ({
			name: plan.charAt(0).toUpperCase() + plan.slice(1), // Capitalize the plan name
			amount: details.amount,
			unit: details.unit,
			formattedAmount: formatPrice(details.amount, details.unit),
			mostPopular: plan === 'pro' // Highlight the "Pro" plan as most popular
		}));
	});
</script>

<section class="flex flex-col items-center justify-center mx-[32px] my-[38px] md:mx-[80px] gap-3">
	<div class="flex flex-col items-center gap-3">
		<h1 class="text-[24px] md:text-[30px] lg:text-[36px] font-normal text-center text-[#111928]">
			Designed for business teams like yours
		</h1>
		<h2
			class="text-[12px] md:text-[16px] lg:text-[18px] font-normal text-center text-[#6B7280] mx-0 lg:mx-38"
		>
			Here at flowbite we focus on markets where technology, innovation, and capital can unlock
			long-term value and drive economic growth.
		</h2>
	</div>
	<label class="flex items-center cursor-pointer gap-3">
		<span class={`${MonthlyChecked ? 'text-[#111928]' : 'text-[#6B7280]'}`}>Monthly</span>
		<input type="checkbox" class="sr-only" on:change={fetchPricing} />
		<div class="w-14 h-8 bg-gray-300 rounded-full p-1 inline-block">
			<div
				class={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
					YearlyChecked ? 'translate-x-6' : ''
				}`}
			/>
		</div>
		<span class={`${YearlyChecked ? 'text-[#111928]' : 'text-[#6B7280]'}`}>Yearly</span>
	</label>
	<div class="flex flex-col md:flex-row md:justify-center md:items-stretch gap-2">
		{#each Object.entries($pricing) as [plan, details]}
			<div
				class="flex flex-col items-center p-6 bg-white rounded-lg border-2 border-[#1C64F2] max-w-sm"
			>
				<div class="mb-2 text-sm font-semibold text-gray-700 bg-gray-200 px-3 py-1 rounded-full">
					Most popular
				</div>
				<h2 class="text-2xl font-semibold text-gray-800 mb-4">Pro</h2>
				<p class="text-4xl font-bold text-gray-900 mb-4">${'199'}</p>
				<button class="text-blue-600 hover:text-blue-700 text-sm mb-4">
					Go to annual plan →
				</button>
				<button class="bg-[#1C64F2] text-white font-bold py-2 px-4 mb-6 w-full rounded-md"
					>Get started</button
				>
				<ul class="w-full text-gray-600 text-left">
					<li class="flex items-center mb-2">
						<span class="mr-2"><img src="/credit-card.png" alt="credit card icon" /></span>
						All tools you need to manage payments
					</li>
					<li class="flex items-center mb-2">
						<span class="mr-2"><img src="/paper-airplane.png" alt="paper airplane icon" /></span>
						Get hundreds of feature updates
					</li>
					<li class="flex items-center mb-2">
						<span class="mr-2"><img src="/vector.png" alt="vector icon" /></span>
						Financial reconciliation and reporting
					</li>
					<li class="flex items-center">
						<span class="mr-2"><img src="/chat.png" alt="chat icon" /></span>
						24x7 phone, chat, and email support
					</li>
				</ul>
			</div>
		{/each}
	</div>
</section>
