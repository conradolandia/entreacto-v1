<script>
  import { idle } from 'svelte-idle';
  import { fade } from 'svelte/transition';
  import { projectPreview } from './store.js';

  import Eleft from './Eleft.svelte';
  import Eright from './Eright.svelte';
  import LogoEntre from './LogoEntre.svelte';

  let proyecto, is_video;

  // Cargar proyecto desde store
  projectPreview.subscribe(value => {
    proyecto = value;
  });

  // Archivo de fondo, verificar si es video
  if (proyecto) {
    const fileUrl = proyecto.acf.fondo_preview;
    const fileExtension = fileUrl.split('.').pop();
    is_video = fileExtension === 'mp4' || fileExtension === 'webm';
  }

  /// Destruir al alejar el mouse
  function closePreview() {
    projectPreview.set(null);
  }

  // fade
  let fadeDuration = { duration: 300 };
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
      <div class="flex-grow text-center title">
        <button class="slide" on:mouseleave={closePreview}>
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
  .title {
    margin-left: 11px;
    @apply relative;
  }

  .fondo {
    z-index: 49;
  }

  .slide {
    @apply absolute 
      h-40 
      inset-0 
      m-auto 
      block 
      mx-8 
      text-5xl;
  }
</style>
