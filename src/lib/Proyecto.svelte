<script>
  import { onMount, onDestroy } from 'svelte';
  import { abiertoActo, projectPreview } from './store';
  import { push } from 'svelte-spa-router';

  export let params;

  let title, slug, content;

  const cerrarCuarto = () => {
    $abiertoActo = false;
    push(`/`);
  };

  let isElementAtTop = false;

  const onScrollAction = () => {
    const elem = document.querySelector('.post-title');
    const cont = document.querySelector('.contenido');
    const rect = elem.getBoundingClientRect();
    isElementAtTop = rect.top <= cont.offsetTop;
  };

  const fetchProyecto = async () => {
    try {
      const res = await fetch(
        `http://entreacto.test/wp-json/wp/v2/posts?slug=${params.slug}`
      );
      const [proyecto] = await res.json();
      title = proyecto.title.rendered;
      slug = params.slug;
      content = proyecto.content.rendered;
    } catch (error) {
      console.log(error);
    }
  };

  onDestroy(() => {
    projectPreview.set(null);
  });

  onMount(fetchProyecto);
</script>

<div on:scroll={onScrollAction} class="contenido">
  <button
    class="post-title
    {isElementAtTop ? 'stick' : 'nostick'}"
    on:click={cerrarCuarto}
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
</style>
