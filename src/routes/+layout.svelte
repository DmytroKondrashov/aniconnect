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

<div class="page-container">
	<Navbar />
	<main class="main-content">
		<div class="container mb-6">
			{@render children?.()}
		</div>
	</main>
	<Footer />
</div>

<style>
	.page-container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.main-content {
		flex: 1 0 auto;
	}

	:global(body) {
		margin: 0;
		min-height: 100vh;
	}
</style>
