<script lang="ts">
	import IconifyIcon from '@iconify/svelte';

	export let name: string;
	export let formattedAmount: string;
	export let mostPopular: boolean;
	export let isLoading: boolean;
	export let toggleInterval: () => Promise<void>;

	enum Package {
		all = 'all',
		pro = 'pro',
		platinum = 'platinum'
	}

	const features = [
		{
			icon: 'tabler:credit-card-filled',
			text: 'All tools you need to manage payments',
			package: [Package.all]
		},
		{
			icon: 'heroicons-solid:paper-airplane',
			text: 'Get hundreds of feature updates',
			package: [Package.pro, Package.platinum]
		},
		{
			icon: 'lets-icons:chart-fill',
			text: 'Financial reconciliation and reporting',
			package: [Package.platinum]
		},
		{
			icon: 'heroicons-solid:chat',
			text: '24x7 phone, chat, and email support',
			package: [Package.platinum]
		}
	];
	function featureUnavailable(featurePackages: Package[], packageName: string) {
		if (featurePackages.includes(Package.all)) {
			return false;
		}
		return !featurePackages.includes(packageName.toLocaleLowerCase() as Package);
	}
</script>

<div
	class={`flex flex-col items-center p-6 bg-white rounded-lg border-2 mb-4 ${
		mostPopular ? 'border-[#1C64F2]' : ''
	} shadow-md w-full h-fit gap-3`}
>
	{#if mostPopular}
		<div class="mb-2 text-sm text-[#1E429F] bg-blue-50 px-3 py-1 rounded-md">Most popular</div>
	{/if}

	<h2
		class="text-2xl font-semibold {isLoading
			? 'text-gray-300 animate-pulse'
			: 'text-gray-900'} mb-4"
	>
		{name}
	</h2>
	<p class="text-4xl font-bold {isLoading ? 'text-gray-300 animate-pulse' : 'text-gray-900'}  mb-4">
		{formattedAmount}
	</p>
	<button
		on:click={toggleInterval}
		disabled={isLoading}
		class="{isLoading ? 'text-gray-300 cursor-not-allowed' : 'text-[#1C64F2]'} text-sm mb-4"
	>
		<slot name="buttonText">Default Button Text</slot>
	</button>

	<button
		on:click={toggleInterval}
		disabled={isLoading}
		class="text-white font-bold py-2 px-4 mb-6 w-full rounded-md {mostPopular
			? 'bg-[#1C64F2]'
			: 'bg-black'} {isLoading ? 'bg-gray-400 cursor-not-allowed' : ''}"
	>
		Get started
	</button>

	<ul class="w-full text-gray-600 text-left">
		{#each features as feature}
			<li class="flex items-center mb-2">
				<!-- <span class="w-5 h-5 inline-block"> -->
				<IconifyIcon
					icon={feature.icon}
					class="inline-block mr-2 {featureUnavailable(feature.package, name)
						? 'text-gray-400'
						: 'text-current'}"
				/>
				<!-- </span> -->
				<span class={featureUnavailable(feature.package, name) ? 'line-through text-gray-400' : ''}>
					{feature.text}
				</span>
			</li>
		{/each}
	</ul>
</div>
