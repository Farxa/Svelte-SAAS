<script lang="ts">
	export let name: string;
	export let formattedAmount: string;
	export let mostPopular: boolean;
	export let toggleInterval: () => Promise<void>;
</script>

<div
	class={`flex flex-col items-center p-6 bg-white rounded-lg border-2 ${
		mostPopular ? 'border-[#1C64F2]' : ''
	} shadow-md w-full h-fit gap-3`}
>
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
		<li class="flex items-center mb-2">
			<span class="mr-2"><img src="/credit-card.png" alt="credit card icon" /></span>
			<!-- <div class="i-cil:credit-card w-1em h-1em" style="color: black;" /> -->
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
