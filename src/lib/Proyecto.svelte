<script>
  import { createEventDispatcher } from 'svelte';
  import { abiertoActo, projectPreview } from './store';
  import { push } from 'svelte-spa-router';

  import Eright from './Eright.svelte';
  import Eleft from './Eleft.svelte';
  import Spinner from './Spinner.svelte';

  export let params;

  const BASE_URL = 'http://entreacto.test/wp-json/wp/v2/posts';
  const ALL_FIELDS = '_fields=title,slug';
  const SINGLE_FIELDS = '_fields=title,slug,content,acf&acf_format=standard';

  const dispatch = createEventDispatcher();

  let title,
    slug,
    content,
    prevProyectoSlug,
    nextProyectoSlug,
    prevProyectoTitle,
    nextProyectoTitle,
    cont,
    elem,
    isLoading = true,
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

  const fetchAllProyectos = async () => {
    const response = await fetch(`${BASE_URL}?${ALL_FIELDS}&per_page=99`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  };

  const fetchSingleProyecto = async slug => {
    const response = await fetch(`${BASE_URL}?slug=${slug}&${SINGLE_FIELDS}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return (await response.json())[0];
  };

  const setPrevAndNextProject = (proyectos, proyecto) => {
    let currentIndex = proyectos.findIndex(p => p.slug === proyecto.slug);

    let previousIndex =
      currentIndex === 0 ? proyectos.length - 1 : currentIndex - 1;
    let nextIndex =
      currentIndex === proyectos.length - 1 ? 0 : currentIndex + 1;

    return {
      prevProyecto: proyectos[previousIndex],
      nextProyecto: proyectos[nextIndex],
    };
  };

  const fetchProyecto = async () => {
    try {
      const proyectos = await fetchAllProyectos();
      const proyecto = await fetchSingleProyecto(params.slug);

      if (proyectos && proyecto) {
        title = proyecto.title.rendered;
        slug = proyecto.slug;
        content = proyecto.content.rendered;

        let { prevProyecto, nextProyecto } = setPrevAndNextProject(
          proyectos,
          proyecto
        );

        prevProyectoSlug = prevProyecto.slug;
        prevProyectoTitle = prevProyecto.title.rendered;
        nextProyectoSlug = nextProyecto.slug;
        nextProyectoTitle = nextProyecto.title.rendered;

        isLoading = false;
        $abiertoActo = true;
        dispatch('projectLoaded');
      }
    } catch (error) {
      console.log(error);
      isLoading = false;
      errorMessage = error.message;
    }
  };

  const getPrevProyecto = () => push(`/proyecto/${prevProyectoSlug}`);
  const getNextProyecto = () => push(`/proyecto/${nextProyectoSlug}`);

  $: {
    if (params) {
      isLoading = true;
      isElementAtTop = false;
      fetchProyecto();
    }
  }
</script>

{#if $abiertoActo}
  <button
    title={prevProyectoTitle}
    class="bright pointer-events-auto ml-4"
    on:click={getPrevProyecto}
  >
    <Eright fill="#000" />
  </button>
  {#if isLoading}
    <div class="loader">
      <Spinner />
    </div>
  {:else}
    <div class="contenido" bind:this={cont} on:scroll={onScrollAction}>
      {#if errorMessage}
        <div class="error">
          <p>{errorMessage}</p>
        </div>
      {/if}
      <h1
        class="post-title text-black text-center
    {isElementAtTop ? 'stick' : 'nostick'}"
        bind:this={elem}
        on:click={cerrarProyecto}
      >
        {title}
      </h1>
      <div class="absolute bottom-6">
        <div class="text-black animate-bounce text-2xl w-12 h-12">↧</div>
      </div>
      <div class="absolute top-full pointer-events-auto">
        <div class="entrada prose-2xl mb-16 md:text-justify">
          {@html content}
        </div>
      </div>
    </div>
  {/if}
  <button
    title={nextProyectoTitle}
    class="bleft pointer-events-auto mr-4"
    on:click={getNextProyecto}
  >
    <Eleft fill="#000" />
  </button>
{/if}

<style>
  .loader {
    @apply grid justify-items-center items-center w-full h-full;
  }
  .post-title {
    @apply z-10 py-16 w-1/2 flex justify-center items-center text-3xl transform-gpu transition-transform scale-150;
    pointer-events: all;
  }

  .contenido {
    @apply relative w-full h-full grid grid-flow-row justify-items-center items-center overflow-hidden overflow-y-scroll pointer-events-auto;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
    margin-left: calc(-3rem - 3px);
    margin-right: calc(-3rem - 3px);
    width: calc(100% + calc((3rem + 3px) * 2));
  }

  .contenido::-webkit-scrollbar {
    background: transparent; /* Chrome/Safari/Webkit */
    width: 0px;
  }

  .stick {
    @apply sticky top-0 bg-white scale-100 w-full;
  }

  .error {
    @apply p-8 bg-red-900 text-white absolute top-0 left-0 right-0;
  }
</style>
