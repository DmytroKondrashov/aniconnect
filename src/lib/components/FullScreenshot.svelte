<script lang="ts">
  let { src = $bindable(), alt } = $props();
</script>

{#if src}
<div class="fixed inset-0 z-50 flex items-center justify-center" onclick={() => src = null}>
  <div class="absolute inset-0 bg-black/70"></div>
  <img {src} {alt} class="relative z-10 max-w-[90vw] max-h-[85vh] object-contain" />
</div>
{/if}
