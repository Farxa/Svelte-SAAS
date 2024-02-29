<script>
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

<section
	title="introduction"
	class="flex flex-col items-center justify-center mx-[32px] my-[32px] md:mx-[80px] gap-3"
>
	<Heading
		title="We didn't reinvent the wheel"
		description="We are strategists, designers and developers. Innovators and problem solvers. Small enough to
        be simple and quick, but big enough to deliver the scope you want at the pace you need."
	/>
	<div class="grid grid-cols-4 gap-2">
		{#each images as { src, alt, span }}
			<div class={span}>
				<img {src} {alt} class="w-full h-full object-cover" />
			</div>
		{/each}
	</div>
</section>
