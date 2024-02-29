<script lang="ts">
	export let MonthlyChecked: boolean;
	export let YearlyChecked: boolean;
	export let toggleInterval: () => Promise<void>;
</script>

<label class="flex items-center cursor-pointer gap-3">
	<span class={`${MonthlyChecked ? 'text-[#111928]' : 'text-[#6B7280]'}`}>Monthly</span>
	<input type="checkbox" class="sr-only" on:change={toggleInterval} />
	<div class="w-14 h-8 bg-gray-200 rounded-full p-1 inline-block">
		<div
			class={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
				YearlyChecked ? 'translate-x-6' : ''
			}`}
		/>
	</div>
	<span class={`${YearlyChecked ? 'text-[#111928]' : 'text-[#6B7280]'}`}>Yearly</span>
</label>
