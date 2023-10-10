<script>
  export let color = 'black';
  export let invert = false;
  export let animate = true;
  export let classes = '';
</script>

<button
  class="pointer-events-auto cursor-pointer text-{color} text-2xl w-12 h-12
  {classes} 
  {animate ? 'animate-bounce' : ''}"
  on:click
>
  {#if invert}
    ↥
  {:else}
    ↧
  {/if}
</button>

<style>
  button {
    font-family: 'Favorit', Helvetica, sans-serif;
  }
</style>
