<script lang="ts">
	export let title: string = 'Default Title';
	export let description: string = 'Default description.';
	export let itemsAlignment: string = 'items-center';
</script>

<div class="flex flex-col {itemsAlignment} gap-3 mb-10">
	<h1
		class="text-[26px] md:text-[30px] lg:text-[36px] {itemsAlignment === 'items-start'
			? ' text-start'
			: 'text-center'} text-[#111928]"
	>
		{title}
	</h1>
	<h2
		class="text-[14px] md:text-[16px] lg:text-[18px] text-[#6B7280] mx-0 {itemsAlignment ===
		'items-start'
			? ' text-start'
			: 'text-center lg:mx-38'} "
	>
		{description}
	</h2>
</div>
