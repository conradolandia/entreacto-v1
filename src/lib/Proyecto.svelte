<script>
  import { createEventDispatcher } from 'svelte';
  import { abiertoActo, projectPreview, URL } from './store';
  import { push } from 'svelte-spa-router';

  import Eright from './Eright.svelte';
  import Eleft from './Eleft.svelte';
  import Spinner from './Spinner.svelte';
  import ProyectoFooter from './ProyectoFooter.svelte';
  import Flecha from './Flecha.svelte';

  export let params;

  const BASE_URL = `${$URL}/wp-json/wp/v2/posts`;
  const ALL_FIELDS = '_fields=title,slug';
  const SINGLE_FIELDS = '_fields=title,slug,content,acf&acf_format=standard';

  const dispatch = createEventDispatcher();

  let bg,
    title,
    subtitle,
    slug,
    content,
    colaboradores,
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
        subtitle = proyecto.acf.subtitulo;
        slug = proyecto.slug;
        content = proyecto.content.rendered;
        colaboradores = proyecto.acf.colaboradores;
        bg = proyecto.acf.color_de_fondo;

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

  const scrollDown = () => cont.scrollBy({ top: 600, behavior: 'smooth' });

  $: {
    if (params) {
      isLoading = true;
      isElementAtTop = false;
      fetchProyecto();
    }
  }
</script>

{#if $abiertoActo}
  <div class="contenedor" style="background-color: {bg};">
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
          {title}
          class="post-title text-black text-center
    {isElementAtTop ? 'stick' : 'nostick'}"
          style="background-color: {isElementAtTop && bg ? bg : ''};"
          bind:this={elem}
          on:click={cerrarProyecto}
        >
          {title}
          <span title={subtitle} class="block">{subtitle}</span>
        </h1>
        <div class="absolute bottom-6">
          <Flecha on:click={scrollDown} />
        </div>
        <div class="absolute top-full pointer-events-auto">
          <div class="entrada prose-2xl mb-32 md:text-justify">
            {@html content}
          </div>
          <div class="post-footer">
            <ProyectoFooter {colaboradores} />
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
  </div>
{/if}

<style>
  .loader {
    @apply grid justify-items-center items-center w-full h-full;
  }
  .post-title {
    @apply z-50 py-16 w-1/2 flex flex-col justify-center items-center text-3xl transition-all scale-150 duration-500;
    pointer-events: all;
  }

  .post-title span {
    display: none;
    @apply transition-all;
    font-size: 50%;
  }

  .post-title.stick span {
    display: block;
  }

  .contenedor,
  .contenido {
    margin-left: calc(-3rem - 3px);
    margin-right: calc(-3rem - 3px);
    width: calc(100% + calc((3rem + 3px) * 2));
    align-items: center;
  }

  .contenedor {
    @apply h-full flex transition-all duration-500;
    padding: 0 calc(3rem + 3px);
  }

  .contenido {
    @apply relative h-full grid grid-flow-row justify-items-center overflow-hidden overflow-y-scroll pointer-events-auto;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
  }

  .contenido::-webkit-scrollbar {
    background: transparent; /* Chrome/Safari/Webkit */
    width: 0px;
  }

  .post-footer {
    margin: 0 12%;
    margin-bottom: 35px;
  }
  .stick {
    @apply sticky top-0 bg-white scale-100 w-full;
  }

  .error {
    @apply p-8 bg-red-900 text-white absolute top-0 left-0 right-0;
  }
</style>
