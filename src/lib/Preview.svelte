<script>
  import { onDestroy, onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { push } from 'svelte-spa-router';
  import { projectPreview, abiertoActo } from './store.js';

  import Eleft from './Eleft.svelte';
  import Eright from './Eright.svelte';
  import LogoEntre from './LogoEntre.svelte';

  let proyecto, unsubscribe;
  let is_video = true;

  // Cargar proyecto desde store
  onMount(() => {
    unsubscribe = projectPreview.subscribe(value => {
      console.log('projectPreview value changed:', value);
      // verificar que tenemos todo antes de cargar proyecto.
      if (value && value.acf && value.acf.fondo_preview) {
        proyecto = value;
        const fileUrl = proyecto.acf.fondo_preview;
        const fileExtension = fileUrl.split('.').pop();
        is_video = fileExtension === 'mp4' || fileExtension === 'webm';
      } else {
        projectPreview.set(null);
      }
    });
  });

  /// Destruir al alejar el mouse
  function closePreview() {
    projectPreview.set(null);
  }

  function abrirProyecto(proyecto) {
    projectPreview.set(null);
    push(`/proyecto/${proyecto.slug}`);
    $abiertoActo = true;
  }

  onDestroy(() => {
    if (unsubscribe) unsubscribe();
  });

  // fade
  let fadeDuration = { duration: 32 };
</script>

{#if proyecto}
  <div
    in:fade={fadeDuration}
    out:fade={fadeDuration}
    class="text-white absolute inset-0 overflow-hidden z-50 grid grid-cols-2 gap-1 items-center p-5"
  >
    <div class="left flex items-center">
      <Eleft />
      <div class="flex-grow flex justify-center">
        <div class="w-80">
          {@html proyecto.acf.resumen
            ? proyecto.acf.resumen
            : proyecto.excerpt.rendered}
        </div>
      </div>
      <LogoEntre />
    </div>
    <div class="right flex items-center">
      <Eright />
      <div class="flex-grow text-center relative">
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        <button
          class="slide"
          on:mouseout={closePreview}
          on:click={() => abrirProyecto(proyecto)}
        >
          {proyecto.title.rendered}
        </button>
      </div>
      <Eright />
    </div>
  </div>
  <div
    class="fondo absolute inset-0 overflow-hidden"
    in:fade={fadeDuration}
    out:fade={fadeDuration}
  >
    {#if is_video}
      <video autoplay muted loop>
        <source src={proyecto.acf.fondo_preview} />
        Su navegador no soporta la etiqueta "video"
      </video>
    {:else}
      <img
        class="w-full h-full object-cover"
        src={proyecto.acf.fondo_preview}
        alt={proyecto.title.rendered}
      />
    {/if}
  </div>
{/if}

<style>
  .fondo {
    @apply bg-black;
    z-index: 49;
  }

  .slide {
    @apply absolute 
      h-40 
      inset-0 
      m-auto 
      block 
      pl-[18px]
      mx-5
      text-center
      text-5xl;
  }
</style>
