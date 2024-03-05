<script lang="ts">
	import Introduction from '../components/Introduction.svelte';
	import Pricing from '../components/Pricing.svelte';
	import Newsletter from '../components/Newsletter.svelte';
	import Footer from '../components/Footer.svelte';
	import Features from '../components/Features.svelte';
	import Clients from '../components/Clients.svelte';
	import Hero from '../components/Hero.svelte';
</script>

<div>
	<Hero />
	<div class="px-[32px] md:px-[80px]">
		<Clients />
		<Introduction />
		<Features />
		<Pricing />
		<Newsletter />
		<Footer />
	</div>
</div>
