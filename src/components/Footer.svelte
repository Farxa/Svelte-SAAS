<script lang="ts">
	import IconifyIcon from '@iconify/svelte';
	const socialLinks = [
		{ icon: 'mdi-facebook', label: 'Facebook', href: 'https://facebook.com' },
		{ icon: 'mdi-twitter', label: 'Twitter', href: 'https://twitter.com' },
		{ icon: 'mdi-github', label: 'GitHub', href: 'https://github.com' },
		{ icon: 'mdi-dribbble', label: 'dribbble', href: 'https://dribbble.com' }
	];
</script>

<footer class="flex justify-between items-center p-4 mt-24 bg-white">
	<span class="text-sm text-gray-500">© 2021 Flowbite, LLC. All rights reserved.</span>
	<div class="flex items-center space-x-4">
		{#each socialLinks as { icon, label, href }}
			<a {href} class="text-gray-500 hover:text-gray-900" aria-label={label}>
				<IconifyIcon {icon} />
			</a>
		{/each}
	</div>
</footer>
