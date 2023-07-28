<script>
  import { onMount, afterUpdate } from 'svelte';

  import { abiertoActo, projectPreview } from './store';

  import Eright from './Eright.svelte';
  import Eleft from './Eleft.svelte';

  /////////////////////////// manejar el hover

  const hoverDuration = 1200;

  let hoverTimeout,
    lastHoveredProyecto,
    errorMessage = null;

  const previewProyecto = proyecto => {
    lastHoveredProyecto = proyecto;
    hoverTimeout = setTimeout(() => {
      if (lastHoveredProyecto === proyecto) {
        projectPreview.set(proyecto);
      }
    }, hoverDuration);
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
    'rgb(255, 255, 255)',
    'rgb(250, 206, 87)',
    'rgb(250, 166, 76)',
    'rgb(250, 105, 61)',
    'rgb(250, 95, 45)',
    'rgb(250, 75, 35)',
    'rgb(255, 50, 0)',
  ];

  const mainColor = colors[4];

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
  // shrink: cuanto se reduce la escala de cada elemento repsecto al anterior
  // show: porcentaje del elemento que queda expuesto cuando está por detrás de otro
  // sliderRef: contenedor del slider
  // proyectos: array de proyectos cargados

  const shrink = 0.6;
  const show = 0.7;

  let sliderRef = null;
  let proyectos = [];

  // desplazamos con la rueda
  const handleWheel = event => {
    const index = event.deltaY > 0 ? slide.current + 1 : slide.current - 1;
    switchSlide(index);
  };

  // cambiar slide
  const switchSlide = index => {
    const { num } = slide;
    slide.current = index >= num ? 0 : index < 0 ? num - 1 : index;
    updateCarousel(slide.num, slide.visible, slide.current);
  };

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
        const scale = shrink ** Math.abs(layer);
        const isCurrentSlide = i === current;
        const opacity = scale;

        let translate = 0;

        // desactivamos eventos del raton excepto en current slide
        slide.disabled = !isCurrentSlide;
        slide.classList.toggle('pointer-events-none', !isCurrentSlide);

        // trasladamos y escalamos los demas slides
        for (let j = 1; j <= Math.abs(layer); j++) {
          translate += show * shrink ** (j - 1);
        }

        if (visible % 2 === 0 && layer === 0) {
          translate = 0;
        } else if (visible % 2 === 1) {
          translate += show * shrink ** Math.abs(layers);
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
    }
  };

  /////////////////////////// Conseguimos los proyectos

  const fetchProyectos = async () => {
    try {
      const res = await fetch(
        'http://entreacto.test/wp-json/wp/v2/posts?_fields=title,slug,id,acf,excerpt&per_page=99&acf_format=standard'
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      proyectos = await res.json();

      if (proyectos && sliderRef) {
        slide.num = proyectos.length;
        updateCarousel(slide.num, slide.visible, slide.current);
      }
    } catch (error) {
      console.log(error);
      errorMessage = error.message;
    }
  };

  /////////////////////////// Montar funcion y actualizar

  onMount(fetchProyectos);
  afterUpdate(fetchProyectos);
</script>

{#if !$abiertoActo}
  <button class={$abiertoActo ? 'bright pointer-events-auto ml-4' : ''}>
    <Eright fill={$abiertoActo ? '#000' : '#fff'} />
  </button>
  <div bind:this={sliderRef} on:wheel={handleWheel} class="contenidoActo">
    {#each proyectos as proyecto, index}
      <!-- svelte-ignore a11y-mouse-events-have-key-events -->
      <button
        id="slide{index}"
        class="slide"
        on:mouseover={() => previewProyecto(proyecto)}
        on:mouseout={closePreview}
      >
        {proyecto.title.rendered}
      </button>
    {/each}
  </div>
  <button class={$abiertoActo ? 'bleft pointer-events-auto mr-4' : ''}>
    <Eleft fill={$abiertoActo ? '#000' : '#fff'} />
  </button>
{/if}

<style>
  .slide {
    @apply absolute 
      h-40 
      inset-0 
      m-auto 
      block 
      transition-all 
      ease-out 
      duration-700 
      mx-8 
      text-candela 
      text-5xl;
    transform-origin: center;
    transform: translateZ(0);
    backface-visibility: hidden;
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
