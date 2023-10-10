<script>
  import { onMount } from 'svelte';
  export let isCurrentSlide = false;
  export let buttonText = '';

  let doubleText = `${buttonText} ${buttonText}`;
  let button, text, buttonWidth, textWidth;
  let isOverflowing = false;

  function checkOverflow() {
    if (!button || !text) return;
    buttonWidth = button.clientWidth;
    textWidth = text.clientWidth;
    isOverflowing = buttonWidth < textWidth;
  }

  function killOverflow() {
    isOverflowing = false;
  }

  $: if (button && text && isCurrentSlide) {
    checkOverflow();
  } else {
    killOverflow();
  }

  onMount(() => {
    checkOverflow();
  });
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<button
  class="slide"
  bind:this={button}
  on:mouseenter={checkOverflow}
  on:mouseenter
  on:mouseleave
  on:click
>
  <div
    bind:this={text}
    class={isOverflowing ? 'ticker-text overflowing' : 'ticker-text'}
  >
    {#if isOverflowing}
      {doubleText}
    {:else}
      {buttonText}
    {/if}
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
    animation-duration: 8s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-name: ticker;
  }

  @keyframes ticker {
    0%,
    100% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
</style>
