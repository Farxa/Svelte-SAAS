<script>
	import Heading from './Heading.svelte';
	import PageWrapper from './PageWrapper.svelte';
	import IconifyIcon from '@iconify/svelte';

	const imageUrl = '/illustration.png';
</script>

<div class="h-screen">
	<div class="h-screen flex flex-col lg:flex-row items-center justify-center">
		<PageWrapper>
			<div class="mb-6 mx-5 lg:mx-0 lg:mb-0">
				<Heading
					title="We invest in the world's potential"
					description="Here at flowbite we focus on markets where technology, innovation, and capital can unlock
				long-term value and drive economic growth."
					isXl={true}
				/>

				<p class="text-gray-600 text-center lg:text-left" />
				<div class="flex justify-center space-x-4">
					<a href="#" class="bg-[#1C64F2] text-white px-4 py-2 rounded-md shadow">Learn more → </a>

					<a
						href="#"
						class="flex items-center bg-transparent border border-gray-300 text-gray-900 px-4 py-2 rounded-md shadow"
						><IconifyIcon icon="carbon:video-filled" class="text-gray-900 inline-block mr-2" />Watch
						video</a
					>
				</div>
			</div>
		</PageWrapper>
		<div class="flex lg:h-full items-end">
			<img src={imageUrl} alt="Illustration" class="w-[350px] lg:w-auto lg:max-w-lg" />
		</div>
	</div>
</div>
