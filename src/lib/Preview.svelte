<script>
  import { onDestroy, onMount } from 'svelte';
  import { push } from 'svelte-spa-router';
  import { projectPreview, abiertoActo } from './store.js';

  import Eleft from './Eleft.svelte';
  import Eright from './Eright.svelte';
  import LogoEntre from './LogoEntre.svelte';
  import ButtonTicker from './ButtonTicker.svelte';

  let proyecto,
    unsubscribe,
    externalUrl = '',
    is_video = true;

  // Cargar proyecto desde store
  onMount(() => {
    unsubscribe = projectPreview.subscribe(value => {
      // verificar que tenemos todo antes de cargar proyecto.
      if (value && value.acf && value.acf.fondo_preview) {
        proyecto = value;
        const fileUrl = proyecto.acf.fondo_preview;
        const fileExtension = fileUrl.split('.').pop();
        externalUrl = proyecto.acf.url;
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
</script>

{#if proyecto}
  <div
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
    <div class="flex items-center">
      <Eright />
      <div class="flex-grow text-center relative ml-[19px]">
        {#if externalUrl}
          <a
            class="slide"
            href={externalUrl}
            title={proyecto.title.rendered}
            target="_blank"
            on:mouseleave={closePreview}>{proyecto.title.rendered}</a
          >
        {:else}
          <ButtonTicker
            on:mouseleave={closePreview}
            on:click={() => abrirProyecto(proyecto)}
            buttonText={proyecto.title.rendered}
            estaMontado={true}
          />
        {/if}
      </div>
      <Eright />
    </div>
  </div>
  <div class="fondo absolute inset-0 overflow-hidden">
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
    width: 70%;
    transform: translateZ(0);
    backface-visibility: hidden;
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

  a.slide {
    @apply flex items-center justify-center;
  }
</style>
