<script>
  import { onMount } from 'svelte';
  import { abiertoActo, playerOn } from './store';
  import { push } from 'svelte-spa-router';

  export let params;

  let proyecto, entrada, title, content;

  let cerrarCuarto = () => {
    $playerOn = false;
    $abiertoActo = false;
    push(`/`);
  };

  onMount(async () => {
    window.scrollTo(0, 0);
    const res = await fetch(
      `http://entreacto.test/wp-json/wp/v2/posts?slug=${params.slug}`
    );
    proyecto = await res.json();
    [entrada] = proyecto;
    title = entrada.title.rendered;
    content = entrada.content.rendered;
  });
</script>

<div class="relative w-full h-full flex justify-center">
  <button
    tabindex="-1"
    class="py-[44px] pointer-events-auto sticky top-0 post-title"
    on:click={cerrarCuarto}
  >
    <h1 class="text-black">{title}</h1>
  </button>
  <div
    id="indicador"
    class="absolute bottom-6 -z-10 transition-opacity duration-700"
  >
    <div
      class="pointer-events-none text-black animate-bounce text-2xl w-12 h-12 flex items-center justify-center"
    >
      ↧
    </div>
  </div>
  <div class="absolute top-full -z-10 pointer-events-auto">
    <div class="w-4/5 md:w-1/2 md:text-justify ml-auto mr-auto">
      <div class="prose-2xl mb-16">
        {@html content}
      </div>
    </div>
  </div>
</div>

<style>
  .post-title {
    pointer-events: all;
    display: flex;
    align-items: center;
    text-align: center;
    font-size: 3rem;
    line-height: 1;
    margin: 0 2rem;
    min-height: 100%;
    @apply text-candela;
  }
</style>
