<script lang="ts">
	import SkeletonLoader from './SkeletonLoader.svelte';
	export let name: string;
	export let formattedAmount: string;
	export let mostPopular: boolean;
	export let isLoading: boolean;
	export let toggleInterval: () => Promise<void>;

	const features = [
		{ img: '/credit-card.png', text: 'All tools you need to manage payments' },
		{ img: '/paper-airplane.png', text: 'Get hundreds of feature updates' },
		{ img: '/vector.png', text: 'Financial reconciliation and reporting' },
		{ img: '/chat.png', text: '24x7 phone, chat, and email support' }
	];
</script>

<div
	class={`flex flex-col items-center p-6 bg-white rounded-lg border-2 mb-4 ${
		mostPopular ? 'border-[#1C64F2]' : ''
	} shadow-md w-full h-fit gap-3`}
>
	{#if isLoading}
		{#if mostPopular}
			<SkeletonLoader width="w-1/2" height="h-4" marginBottom="mb-2" />
		{/if}
		<SkeletonLoader width="w-3/4" height="h-8" marginBottom="mb-4" />
		<SkeletonLoader width="w-2/3" height="h-6" marginBottom="mb-4" />
		<SkeletonLoader width="w-1/2" height="h-10" marginBottom="mb-4" />
		<SkeletonLoader width="w-full" height="h-10" marginBottom="mb-6" />
		<SkeletonLoader width="w-full" height="h-4" marginBottom="mb-2" />
		<SkeletonLoader width="w-full" height="h-4" marginBottom="mb-2" />
		<SkeletonLoader width="w-full" height="h-4" marginBottom="mb-2" />
	{:else}
		{#if mostPopular}
			<div class="mb-2 text-sm text-[#1E429F] bg-blue-50 px-3 py-1 rounded-md">Most popular</div>
		{/if}

		<h2 class="text-2xl font-semibold text-gray-800 mb-4">{name}</h2>
		<p class="text-4xl font-bold text-gray-900 mb-4">{formattedAmount}</p>
		<button on:click={toggleInterval} class="text-[#1C64F2] text-sm mb-4">
			<slot name="buttonText">Default Button Text</slot>
		</button>

		<button
			class={`text-white font-bold py-2 px-4 mb-6 w-full rounded-md ${
				mostPopular ? 'bg-[#1C64F2]' : 'bg-black'
			}`}
		>
			Get started
		</button>

		<ul class="w-full text-gray-600 text-left">
			{#each features as feature}
				<li class="flex items-center mb-2">
					<span class="w-5 h-5 inline-block mr-4">
						<img src={feature.img} alt={feature.text} class="w-6 h-6" />
					</span>
					{feature.text}
				</li>
				<div class="i-unicons:home w-1em h-1em" style="color: black;" />
			{/each}
		</ul>
	{/if}
</div>
