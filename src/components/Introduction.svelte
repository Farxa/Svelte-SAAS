<script>
	import PageWrapper from './PageWrapper.svelte';
	import Heading from './Heading.svelte';
	const images = [
		{ src: '/row1image1.png', alt: 'row1image1', span: 'col-span-2' },
		{ src: '/row1image2.png', alt: 'row1image2', span: 'col-span-1' },
		{ src: '/row1image3.png', alt: 'row1image3', span: 'col-span-1' },
		{ src: '/row2image1.png', alt: 'row2image1', span: 'col-span-1' },
		{ src: '/row2image2.png', alt: 'row2image2', span: 'col-span-2' },
		{ src: '/row2image3.png', alt: 'row2image3', span: 'col-span-1' }
	];
</script>

<PageWrapper>
	<Heading
		title="We didn't reinvent the wheel"
		description="We are strategists, designers and developers..."
	/>
	<div class="grid grid-cols-4 gap-2">
		{#each images as { src, alt, span }}
			<div class={`${span} min-h-[200px]`}>
				<img {src} {alt} class="rounded-lg h-full w-full object-cover" />
			</div>
		{/each}
	</div>
</PageWrapper>
