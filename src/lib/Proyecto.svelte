<script>
  import { onMount } from 'svelte';
  import { abiertoActo, projectPreview } from './store';
  import { push } from 'svelte-spa-router';

  export let params;

  let title,
    content,
    cont,
    elem,
    isElementAtTop = false,
    errorMessage = null;

  const cerrarProyecto = () => {
    $abiertoActo = false;
    projectPreview.set(null);
    push('/');
  };

  const onScrollAction = () => {
    const elemPosition = elem.offsetTop - cont.scrollTop;
    isElementAtTop = elemPosition <= 0;
  };

  const fetchProyecto = async () => {
    try {
      const res = await fetch(
        `http://entreacto.test/wp-json/wp/v2/posts?slug=${params.slug}`
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const [proyecto] = await res.json();

      if (proyecto) {
        title = proyecto.title.rendered;
        content = proyecto.content.rendered;
        $abiertoActo = true;
      }
    } catch (error) {
      console.log(error);
      errorMessage = error.message; // Set the error message
    }
  };

  onMount(fetchProyecto);
</script>

{#if $abiertoActo}
  <div class="contenido" bind:this={cont} on:scroll={onScrollAction}>
    {#if errorMessage}
      <div class="error">
        <p>{errorMessage}</p>
      </div>
    {/if}
    <button
      class="post-title
      {isElementAtTop ? 'stick' : 'nostick'}"
      bind:this={elem}
      on:click={cerrarProyecto}
    >
      <span class="text-black text-center">{title}</span>
    </button>
    <div id="indicador" class="absolute bottom-6">
      <div class="text-black animate-bounce text-2xl w-12 h-12">↧</div>
    </div>
    <div class="absolute top-full pointer-events-auto">
      <div class="w-4/5 md:w-1/2 md:text-justify ml-auto mr-auto">
        <div class="prose-2xl mb-16">
          {@html content}
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .post-title {
    @apply z-10 p-16 w-full flex justify-center items-center text-3xl transform-gpu transition-transform scale-150;
    pointer-events: all;
  }

  .contenido {
    @apply relative w-full h-full ml-5 grid grid-flow-row justify-items-center items-center overflow-hidden overflow-y-scroll;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
  }

  .contenido::-webkit-scrollbar {
    background: transparent; /* Chrome/Safari/Webkit */
    width: 0px;
  }

  .stick {
    @apply sticky top-0 bg-white scale-100;
  }

  .error {
    @apply p-8 bg-red-900 text-white;
  }
</style>
