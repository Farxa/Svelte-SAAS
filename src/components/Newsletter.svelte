<script lang="ts">
	import { writable } from 'svelte/store';
	import { isValidEmail } from '$lib/utils';
	import IconifyIcon from '@iconify/svelte';
	import PageWrapper from './PageWrapper.svelte';
	import Heading from './Heading.svelte';

	let email: string = '';
	let emailValidationMessage = writable('');
	let successMessage = writable('');

	async function submitEmail(): Promise<void> {
		emailValidationMessage.set('');
		successMessage.set('');
		if (!isValidEmail(email)) {
			emailValidationMessage.set('Please enter a valid email address.');
			return;
		}
		successMessage.set('Thank you for subscribing!');
		// The following code snippet is an example of how I would implement sending the email to the backend and calling the subscribe endpoint.

		// try {
		// 	const response = await fetch('/BACKEND_ENDPOINT', {
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json'
		// 		},
		// 		body: JSON.stringify({ email })
		// 	});

		// 	if (!response.ok) {
		// 		throw new Error('Failed to subscribe');
		// 	}

		// 	const data = await response.json();
		// 	successMessage.set('Thank you for subscribing!');
		// } catch (error) {
		// 	emailValidationMessage.set('There was a problem with your subscription. Please try again.');
		// }
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
	<form on:submit={handleSubmit} class="w-full max-w-lg mx-auto" novalidate>
		<div class="flex flex-row items-center space-y-0">
			<div class="relative flex-1">
				<span class="absolute inset-y-0 left-0 flex items-center pl-3">
					<IconifyIcon icon="mdi:email-outline" class="text-gray-500" />
				</span>
				<input
					type="email"
					placeholder="Enter your email"
					class="w-full py-3 px-6 pl-10 border rounded-r-none rounded-l-lg placeholder-gray-500 focus:outline-none focus:bg-[#F9FAFB]"
					bind:value={email}
				/>
			</div>
			<button
				class="bg-[#1C64F2] text-white border font-bold py-3 px-6 rounded-l-none rounded-r-lg focus:outline-none focus:shadow-outline"
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
	</form>
</PageWrapper>
