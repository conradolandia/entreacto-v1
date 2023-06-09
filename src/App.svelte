<script>
  import { abiertoActo } from './lib/store';

  import Nav from './lib/Nav.svelte';
  import Eleft from './lib/Eleft.svelte';
  import Eright from './lib/Eright.svelte';

  let closed = false;
  let unique = {};

  let cerrarTodo = () => {
    let elementos = document.querySelectorAll('.visibleActo, .visibleEntre');
    elementos.forEach(elemento => {
      elemento.classList.remove('visibleActo', 'visibleEntre');
    });
  };

  let restart = () => {
    setTimeout(() => {
      cerrarTodo();
      unique = {};
    }, 1000);
  };
</script>

<div class="contenedor-principal w-full h-full overflow-hidden relative">
  <div
    class="{closed} cortina-wrapper absolute top-0 left-0 w-full h-full overflow-hidden grid grid-cols-2"
  >
    {#if closed}
      <input
        class="starter absolute cursor-pointer opacity-0 z-50 {$abiertoActo ===
        true
          ? 'pointer-events-none'
          : 'pointer-events-auto'}"
        type="checkbox"
        bind:checked={closed}
      />
    {:else}
      <input
        class="stopper-left absolute cursor-pointer opacity-0 z-50 {$abiertoActo ===
        true
          ? 'pointer-events-none'
          : 'pointer-events-auto'}"
        type="checkbox"
        bind:checked={closed}
        on:click={restart}
      />
      <input
        class="stopper-right absolute cursor-pointer opacity-0 z-50 {$abiertoActo ===
        true
          ? 'pointer-events-none'
          : 'pointer-events-auto'}"
        type="checkbox"
        bind:checked={closed}
        on:click={restart}
      />
    {/if}
    <div class="cortina left">
      <Eleft fill="#fff" />
    </div>
    <div class="cortina right">
      <Eright fill="#fff" />
    </div>
  </div>

  <div class="w-full h-full flex justify-center items-center">
    <!-- {#key unique} -->
    <Nav />
    <!-- {/key} -->
  </div>
</div>

<style>
  .contenedor-principal,
  .cortina {
    background-color: black;
    z-index: 10;
  }
  .cortina {
    padding: 4px;
    transition: all 1s ease-in-out;
  }

  .false {
    @apply pointer-events-none;
  }

  .left,
  .right {
    display: flex;
    align-items: center;
  }

  .left {
    grid-column: 1;
    transform: translateX(calc((100% - 36px) * -1));
    justify-content: flex-end;
  }

  .right {
    grid-column: 2;
    transform: translateX(calc(100% - 36px));
    justify-content: flex-start;
  }

  .starter {
    left: calc(50% - 22px);
    top: calc(50% - 22px);
    height: 3em;
    width: 3em;
  }

  .starter:checked ~ .left {
    transform: translateX(0);
  }

  .starter:checked ~ .right {
    transform: translateX(0);
  }

  .stopper-left,
  .stopper-right {
    top: calc(50% - 22px);
    height: 3em;
    width: 22px;
  }

  .stopper-left {
    left: 22px;
  }

  .stopper-right {
    right: 22px;
  }
</style>
