<script>
  import { abiertoActo } from './store';

  import LogoMedio from './LogoMedio.svelte';

  export let colaboradores = [];

  let colab_izquierda, colab_derecha;

  if (colaboradores) {
    colab_izquierda = colaboradores.slice(0, 3);
    colab_derecha = colaboradores.slice(3);
  }

  const resetApp = () => ($abiertoActo = false);
</script>

<div class="grid grid-cols-3 gap-8 justify-between items-center">
  <div class="flex gap-8 justify-between">
    {#if colab_izquierda}
      {#each colab_izquierda as colaborador}
        <a
          href={colaborador.url}
          alt="Enlace externo a {colaborador.nombre}"
          target="_blank"
          class="logo"
          ><img
            src={colaborador.logo}
            alt={colaborador.nombre}
            class="w-full object-contain"
          /></a
        >
      {/each}
    {/if}
  </div>
  <button class="flex justify-center" on:click={resetApp}>
    <LogoMedio classList="h-[44px]" />
  </button>
  <div class="flex gap-8 justify-between">
    {#if colab_derecha}
      {#each colab_derecha as colaborador}
        <a
          href={colaborador.url}
          alt="Enlace externo a {colaborador.nombre}"
          target="_blank"
          class="logo"
          ><img
            src={colaborador.logo}
            alt={colaborador.nombre}
            class="w-full object-contain"
          /></a
        >
      {/each}
    {/if}
  </div>
</div>

<style>
  .logo {
    @apply flex items-center justify-center max-h-8;
  }
</style>
