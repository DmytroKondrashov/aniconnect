<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	interface Props extends Record<string, unknown> {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="page-container flex flex-col min-h-screen">
	<Navbar />
	<main class="main-content flex-grow">
		<div class="max-w-7xl mx-auto px-4 mb-6">
			{@render children?.()}
		</div>
	</main>
	<Footer />
</div>

<style>
</style>
