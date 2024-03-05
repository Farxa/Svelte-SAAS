<script lang="ts">
	import { writable } from 'svelte/store';
	import IconifyIcon from '@iconify/svelte';
	import PageWrapper from './PageWrapper.svelte';
	import Heading from './Heading.svelte';

	let email: string = '';
	let emailValidationMessage = writable('');
	let successMessage = writable('');

	function isValidEmail(email: string): boolean {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	}

	async function submitEmail(): Promise<void> {
		emailValidationMessage.set('');
		successMessage.set('');
		if (!isValidEmail(email)) {
			emailValidationMessage.set('Please enter a valid email address.');
			return;
		}

		try {
			const response = await fetch('/api/validate-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email })
			});

			if (response.ok) {
				const { message } = await response.json();
				successMessage.set(message);
			} else {
				const { error } = await response.json();
				emailValidationMessage.set(error || 'Failed to validate email.');
			}
		} catch (error) {
			emailValidationMessage.set('An error occurred while validating the email.');
		}
	}

	function handleSubmit(event: Event) {
		event.preventDefault();
		submitEmail();
	}
</script>

<PageWrapper>
	<Heading
		title="Sign up for our newsletter"
		description="Stay up to date with the roadmap progress, announcements and exclusive discounts feel free to sign up with your email."
	/>
	<form on:submit={handleSubmit} class="p-4 w-full max-w-lg mx-auto" novalidate>
		<!-- <div class="p-4 max-w-lg mx-auto"> 
		<div class="flex items-center">
			<div class="flex-1">-->
		<div class="flex flex-col md:flex-row items-center space-y-4 sm:space-y-0">
			<div class="relative flex-1">
				<!-- <span class="absolute py-4 px-7 pl-5"> -->
				<span class="absolute inset-y-0 left-0 flex items-center pl-3">
					<IconifyIcon icon="mdi:email-outline" class="text-gray-500" />
				</span>
				<input
					type="email"
					placeholder="Enter your email"
					class="w-full py-3 px-6 pl-10 border rounded-lg md:rounded-r-none md:rounded-l-lg placeholder-gray-500 focus:outline-none focus:bg-[#F9FAFB]"
				/>
			</div>
			<button
				class="bg-[#1C64F2] text-white border font-bold py-3 px-6 rounded-lg md:rounded-l-none md:rounded-r-lg focus:outline-none focus:shadow-outline"
			>
				Subscribe
			</button>
		</div>
		{#if $successMessage}
			<p class="mt-2 text-green-500 text-sm">
				{$successMessage}
			</p>
		{:else if $emailValidationMessage}
			<p class="mt-2 text-red-500 text-sm">
				{$emailValidationMessage}
			</p>
		{/if}
		<div class="text-sm text-gray-600 mt-2">
			We care about the protection of your data. Read our
			<a href="/privacy-policy" class="text-gray-700 underline">Privacy Policy</a>.
		</div>
		<!-- </div> -->
	</form>
</PageWrapper>
