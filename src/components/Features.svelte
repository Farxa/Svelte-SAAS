<script>
	import IconifyIcon from '@iconify/svelte';
	import PageWrapper from './PageWrapper.svelte';
	import Heading from './Heading.svelte';

	const features = [
		{
			icon: 'mingcute:presentation-2-fill',
			title: 'Marketing',
			description:
				'Plan it, create it, launch it. Collaborate seamlessly with all the organization and hit your marketing goals every month with our marketing plan.'
		},
		{
			icon: 'heroicons-solid:academic-cap',
			title: 'Legal',
			description:
				'Protect your organization, devices and stay compliant with our structured workflows and custom permissions made for you.'
		},
		{
			icon: 'material-symbols-light:business-center',
			title: 'Business Automation',
			description:
				'Auto-assign tasks, send Slack messages, and much more. Now power up with hundreds of new templates to help you get started.'
		}
	];
</script>

<PageWrapper>
	<Heading
		title="Designed for business teams like yours"
		description="Here at flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth."
		itemsAlignment="items-start"
	/>
	<div class="flex flex-col md:flex-row justify-between space-y-10 md:space-y-0 md:space-x-14">
		{#each features as feature}
			<div class="flex flex-col items-start space-y-2">
				<div class="p-2 bg-gray-100 rounded-full inline-flex">
					<IconifyIcon icon={feature.icon} class="text-[#1C64F2] text-xl" />
				</div>
				<h3 class="text-xl font-semibold">{feature.title}</h3>
				<p class="text-gray-600 text-justify">{feature.description}</p>
			</div>
		{/each}
	</div>
</PageWrapper>
