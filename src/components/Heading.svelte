<script lang="ts">
	export let title: string = '';
	export let description: string = '';
	export let itemsAlignment: string = 'items-center';
	export let isXl: boolean = false;
</script>

<div class="flex flex-col {itemsAlignment} gap-3 mb-10">
	<h1
		class=" {isXl
			? 'text-[30px] md:text-[30px] lg:text-[36px]'
			: 'text-[24px] md:text-[30px] lg:text-[36px]'} {itemsAlignment === 'items-start'
			? ' text-start'
			: 'text-center'} text-[#111928]"
	>
		{title}
	</h1>
	<h2
		class="{isXl
			? 'text-[18px] md:text-[26px] lg:text-[20px]'
			: 'text-[14px] md:text-[16px] lg:text-[18px]'} text-[#6B7280] mx-0 {itemsAlignment ===
		'items-start'
			? ' text-start'
			: 'text-center'} "
	>
		{description}
	</h2>
</div>
