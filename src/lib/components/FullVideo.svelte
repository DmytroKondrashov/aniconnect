<script lang="ts">
  let { src = $bindable(), alt } = $props();
</script>

{#if src}
<div class="fixed inset-0 z-50 flex items-center justify-center" onclick={() => src = null}>
  <div class="absolute inset-0 bg-black/70"></div>
  <div class="relative z-10 w-[90vw] max-w-5xl aspect-video">
    <iframe 
      {src} 
      title={alt} 
      loading="lazy" 
      frameborder="0" 
      allowfullscreen 
      class="w-full h-full rounded"
    ></iframe>
  </div>
</div>
{/if}
