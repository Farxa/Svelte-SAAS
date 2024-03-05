<script>
	import Heading from './Heading.svelte';
	import PageWrapper from './PageWrapper.svelte';
	const brands = [
		{ name: 'Google', logo: '/google.png' },
		{ name: 'Microsoft', logo: '/microsoft.png' },
		{ name: 'Spotify', logo: '/spotify.png' },
		{ name: 'Mailchimp', logo: '/mailchimp.png' }
	];
</script>

<PageWrapper>
	<Heading title="You’ll be in good company" />
	<div class="flex flex-wrap justify-between">
		{#each brands as brand, i}
			<div class="basis-1/2 lg:basis-1/4 flex justify-center items-center p-4">
				<img src={brand.logo} alt={brand.name} class="max-h-12" />
			</div>
		{/each}
	</div>
</PageWrapper>
