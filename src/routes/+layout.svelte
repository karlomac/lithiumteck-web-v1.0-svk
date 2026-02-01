<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		// Ensure dark mode is applied
		document.documentElement.classList.add('dark');
		document.body.classList.add('dark');
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="bg-[#102210] text-white transition-colors duration-300 min-h-screen">
	{@render children()}
</div>
