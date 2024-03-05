<script lang="ts">
	export let title: string = 'Default Title';
	export let description: string = 'Default description.';
</script>

<div class="flex flex-col items-center gap-3">
	<h1 class="text-[26px] md:text-[30px] lg:text-[36px] text-center text-[#111928]">
		{title}
	</h1>
	<h2 class="text-[14px] md:text-[16px] lg:text-[18px] text-center text-[#6B7280] mx-0 lg:mx-38">
		{description}
	</h2>
</div>
