<script lang="ts">
	import { limits } from "$lib/stores";

  let { page = $bindable(), 
  limit = $bindable(), } = $props();
</script>

<!-- <nav class="pagination my-6" role="navigation" aria-label="pagination">
  <button class="pagination-previous" disabled={page === 1} onclick={() => page -= 1}>Previous</button>
  <button class="pagination-next" onclick={() => page += 1}>Next page</button>

  <ul class="pagination-list">
    {#each $limits as limitVariant}
      <li>
        <button class:is-current={limit === limitVariant} class="pagination-link" 
        onclick={() => limit = limitVariant}>{limitVariant}</button>
      </li>
    {/each}
  </ul>
</nav> -->

<nav class="flex justify-center items-center space-x-1 my-6" role="navigation" aria-label="pagination">
  <button 
    class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-500" 
    disabled={page === 1} 
    onclick={() => page -= 1}
  >
    Previous
  </button>
  
  <ul class="flex space-x-1">
    {#each $limits as limitVariant}
      <li>
        <button 
          class="px-3 py-2 text-sm font-medium border hover:bg-gray-50 hover:text-gray-700 {limit === limitVariant ? 'bg-blue-600 text-white border-blue-600' : 'text-gray-500 bg-white border-gray-300'}"
          onclick={() => limit = limitVariant}
        >
          {limitVariant}
        </button>
      </li>
    {/each}
  </ul>
  
  <button 
    class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 hover:text-gray-700" 
    onclick={() => page += 1}
  >
    Next page
  </button>
</nav>
