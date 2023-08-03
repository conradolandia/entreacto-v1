<script>
  import { onMount } from 'svelte';

  export let estaMontado = false;
  export let buttonText = '';

  let button, text, buttonWidth, textWidth;
  let isOverflowing = false;

  function checkOverflow() {
    buttonWidth = button.clientWidth;
    textWidth = text.clientWidth;
    isOverflowing = buttonWidth < textWidth;
  }

  function killOverflow() {
    isOverflowing = false;
  }

  onMount(() => {
    if (estaMontado) {
      checkOverflow();
    }
  });
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<button
  class="slide"
  bind:this={button}
  on:mouseenter={checkOverflow}
  on:mouseleave={killOverflow}
  on:mouseenter
  on:mouseleave
  on:click
>
  <div
    bind:this={text}
    class={isOverflowing ? 'ticker-text overflowing' : 'ticker-text'}
  >
    {buttonText}
  </div>
</button>

<style>
  .slide {
    transform: translateZ(0);
    backface-visibility: hidden;
    width: 50%;
    @apply absolute 
      inset-0 
      text-5xl
      h-14
      m-auto 
      transition-all 
      ease-out 
      duration-500 
      overflow-hidden
      whitespace-nowrap
      origin-center;
  }

  .ticker-text {
    display: inline-block;
    position: relative;
  }

  .ticker-text.overflowing {
    animation-duration: 5s;
    animation-timing-function: ease-out;
    animation-name: ticker;
  }

  @keyframes ticker {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(-60%);
    }
    100% {
      transform: translateX(0);
    }
  }
</style>
