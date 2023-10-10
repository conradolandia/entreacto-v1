<script>
  import { onMount } from 'svelte';

  import { abiertoActo, projectPreview, URL } from './store';

  import Eleft from './Eleft.svelte';
  import Eright from './Eright.svelte';
  import ButtonTicker from './ButtonTicker.svelte';
  import Flecha from './Flecha.svelte';

  /////////////////////////// manejar el hover

  const hoverDuration = 100;

  let hoverTimeout,
    lastHoveredProyecto,
    errorMessage = null,
    isScrolling = false,
    scrollTimeout;

  const previewProyecto = proyecto => {
    if (!isScrolling) {
      // Solo abrir preview del proyecto si no estamos haciendo scroll
      lastHoveredProyecto = proyecto;
      hoverTimeout = setTimeout(() => {
        if (lastHoveredProyecto === proyecto) {
          projectPreview.set(proyecto);
        }
      }, hoverDuration);
    }
  };

  const closePreview = () => {
    clearTimeout(hoverTimeout);
  };

  ////////////////////////// Slider

  // definimos el slide con parametros iniciales
  const slide = {
    num: 0,
    visible: 8,
    current: 0,
  };

  // lista de colores
  const colors = [
    'rgb(61, 250, 200)',
    'rgb(76, 204, 250)',
    'rgb(87, 125, 250)',
    'rgb(149, 102, 250)',
    'rgb(255, 220, 150)',
    'rgb(250, 206, 87)',
    'rgb(250, 166, 76)',
    'rgb(250, 105, 61)',
    'rgb(250, 95, 45)',
    'rgb(250, 75, 35)',
    'rgb(255, 50, 0)',
  ];

  const mainColor = 'rgb(255,255,255)';

  // distribuir colores de aceurdo a la posicion del elemento en el slider
  const getColorForPosition = position => {
    const middleIndex = Math.ceil(slide.visible / 2);
    const targetColorsLength = slide.num + 1;
    const repeatedColors = colors.concat(colors).slice(0, targetColorsLength);
    const colorIndex =
      ((position % slide.num) + slide.num + middleIndex) % slide.num; // Handle negative values correctly
    return repeatedColors[colorIndex];
  };

  /////////////// constantes:
  // factorReduccion: cuanto se reduce la escala de cada elemento repsecto al anterior
  // factorExposicion: porcentaje del elemento que queda expuesto cuando está por detrás de otro
  // sliderRef: contenedor del slider
  // proyectos: array de proyectos cargados

  const factorReduccion = 0.6;
  const factorExposicion = 2.0;

  let sliderRef = null;
  let proyectos = [];

  // desplazamos con la rueda
  let insensibilidadScroll = 400; // mayor valor = más scrolling para cambiar
  let sumaScroll = 0;
  let startY;

  const handleTouchStart = event => {
    console.log('Touch start');
    startY = event.touches[0].clientY; // Posición donde empieza el touch event
  };

  const handleTouchMove = event => {
    console.log('touch move');
    event.preventDefault();
    const deltaY = startY - event.touches[0].clientY; // Distancia que se ha movido el dedo
    handleWheel(deltaY);
  };

  const handleWheel = event => {
    sumaScroll += Math.abs(event.deltaY);

    isScrolling = true; // Scrolling es true mientras hacemos scroll
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false; // Resetear estado del scroll después de 300ms sin eventos de la rueda
    }, 300);

    if (sumaScroll >= insensibilidadScroll) {
      const index = event.deltaY > 0 ? slide.current + 1 : slide.current - 1;
      switchSlide(index);
      sumaScroll = 0;
    }
  };

  const handleClick = (dir = 1) => {
    const index = dir > 0 ? slide.current + 1 : slide.current - 1;
    switchSlide(index);
  };

  // cambiar slide
  const switchSlide = index => {
    const { num } = slide;
    slide.current = index >= num ? 0 : index < 0 ? num - 1 : index;
    updateCarousel(slide.num, slide.visible, slide.current);
  };

  let slidesState = Array(slide.num).fill(false); // Assuming num is the total number of slides.

  // actualizar el carrusel
  const updateCarousel = (num, visible, current) => {
    if (sliderRef) {
      const slides = Array.from(sliderRef.querySelectorAll('.slide'));
      const layers = Math.floor(visible / 2);
      const visibleSlides = [];

      for (let i = -layers; i <= layers; i++) {
        let index = current + i;
        if (index < 0) {
          index = num + index;
        } else {
          index %= num;
        }
        visibleSlides.push(index);
      }

      slides.forEach((slide, i) => {
        const layer = visibleSlides.indexOf(i) - layers;
        const scale = factorReduccion ** Math.abs(layer);
        const isCurrentSlide = i === current;
        slidesState[i] = isCurrentSlide;
        const opacity = scale;

        let translate = 0;

        // desactivamos eventos del raton excepto en current slide
        slide.disabled = !isCurrentSlide;
        slide.classList.toggle('pointer-events-none', !isCurrentSlide);

        // trasladamos y escalamos los demas slides
        for (let j = 1; j <= Math.abs(layer); j++) {
          translate += factorExposicion * factorReduccion ** (j - 1);
        }

        if (visible % 2 === 0 && layer === 0) {
          translate = 0;
        } else if (visible % 2 === 1) {
          translate += factorExposicion * factorReduccion ** Math.abs(layers);
        }

        translate *= 100;
        if (layer < 0) translate *= -1;

        slide.style.transform = `translateY(${translate}%) scale(${scale})`;
        slide.style.opacity = opacity;
        slide.style.zIndex = (layers - Math.abs(layer)) * 5;
        slide.style.color = isCurrentSlide
          ? mainColor
          : getColorForPosition(current - i);
      });

      slidesState = slidesState;
    }
  };

  function updateWhenReady() {
    if (proyectos && sliderRef) {
      slide.num = proyectos.length;
      setTimeout(() => {
        updateCarousel(slide.num, slide.visible, slide.current);
      }, 0);
    }
  }

  /////////////////////////// Conseguimos los proyectos

  const fetchProyectos = async () => {
    try {
      const res = await fetch(
        `${$URL}/wp-json/wp/v2/posts?_fields=title,slug,id,acf,excerpt&per_page=99&acf_format=standard`
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      proyectos = await res.json();
      updateWhenReady();
    } catch (error) {
      console.log(error);
      errorMessage = error.message;
    }
  };

  /////////////////////////// Montar funcion y actualizar

  $: proyectos && updateWhenReady();
  $: sliderRef && updateWhenReady();

  onMount(fetchProyectos);
</script>

{#if !$abiertoActo}
  <button>
    <Eright fill="#fff" />
  </button>
  <div class="contenedorActo">
    <div class="boton absolute w-full mx-6 text-center top-9">
      <Flecha
        color="white"
        animate={false}
        invert={true}
        on:click={() => handleClick(0)}
      />
    </div>
    <div
      bind:this={sliderRef}
      on:touchstart={handleTouchStart}
      on:touchmove={handleTouchMove}
      on:wheel={handleWheel}
      on:wheel={closePreview}
      class="contenidoActo"
    >
      {#each proyectos as proyecto, i}
        <ButtonTicker
          isCurrentSlide={slidesState[i]}
          on:mouseenter={() => previewProyecto(proyecto)}
          on:click={() => previewProyecto(proyecto)}
          on:mouseleave={closePreview}
          buttonText={proyecto.title.rendered}
        />
      {/each}
    </div>
    <div class="boton absolute w-full mx-6 text-center bottom-8">
      <Flecha color="white" animate={false} on:click={() => handleClick(1)} />
    </div>
  </div>
  <button>
    <Eleft fill="#fff" />
  </button>
{/if}

<style>
  .boton {
    z-index: 51;
  }
  .contenedorActo {
    @apply w-full h-full relative;
  }

  .contenidoActo {
    @apply pointer-events-auto 
    z-50 
    mx-5 
    w-full 
    h-full 
    relative;
  }
</style>
