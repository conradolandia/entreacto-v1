<script>
  import LogoMedio from './LogoMedio.svelte';
  import OtroLogo from './OtroLogo.svelte';
  import CuartoElement from './CuartoElement.svelte';
  import { playerOn } from './store';

  let switchPlayer = () => {
    $playerOn = !$playerOn;
  };

  setTimeout(() => {
    let indi = document.getElementById('indicador');
    if (indi !== null) indi.classList.add('opacity-0');
  }, 10000);
</script>

<div
  id="indicador"
  class="absolute bottom-6 -z-10 transition-opacity duration-700"
>
  <div
    class="pointer-events-none text-white animate-bounce text-2xl w-12 h-12 flex items-center justify-center"
  >
    ↧
  </div>
</div>
<div class="absolute top-full -z-10 pointer-events-auto">
  <div class="w-4/5 md:w-1/2 md:text-justify ml-auto mr-auto">
    <div class="text-center mt-16 mb-24">
      <button
        on:click={switchPlayer}
        class="bg-black text-candela py-3 px-6 rounded-md"
        >cuarto de espera</button
      >
    </div>
    <div class="text-2xl">
      <p>
        Plataforma virtual que reflexiona sobre la animalidad a través del
        diálogo con diferentes disciplinas. Además, en el entreacto, funciona
        como un cuarto de espera interactivo en donde canciones se mezclan con
        transmisiones en vivo de lo que sucede en hábitats de zoológicos y
        reservas ecológicas del mundo.
      </p>
      <p>
        Este proyecto propone un diálogo transdisciplinar e incentiva un
        pensamiento interespecie bajo una premisa sencilla pero pertinente:
        mirar, crear, pensar con los animales (no humanos) nos permite reconocer
        un mundo en crisis y buscar formas alternativas de vivir en él.
      </p>
    </div>

    <CuartoElement
      titulo="Primer cuarto"
      nombre="Claudia Leal"
      profesion="historiadora"
      videoUrl="https://player.vimeo.com/video/749404083?h=dea7ff7f6c&title=0&byline=0&portrait=0"
    />

    <CuartoElement
      titulo="Segundo cuarto"
      nombre="Juan Alberto Conde"
      profesion="semiólogo"
      videoUrl="https://player.vimeo.com/video/749404160?h=6162265709&title=0&byline=0&portrait=0"
    />

    <CuartoElement
      titulo="Tercer cuarto"
      nombre="Eugenio Andrade"
      profesion="filósofo"
      videoUrl="https://player.vimeo.com/video/749404004?h=d9e79402ed&title=0&byline=0&portrait=0"
    />

    <CuartoElement
      titulo="Cuarto cuarto"
      nombre="María Camila Corredor"
      profesion="etóloga"
      videoUrl="https://player.vimeo.com/video/749404240?h=51b93259c3&title=0&byline=0&portrait=0"
    />

    <CuartoElement
      titulo="Quinto cuarto"
      nombre="Mariana Herrera"
      profesion="animalista"
      videoUrl="https://player.vimeo.com/video/749404368?h=13a7bfac6b&title=0&byline=0&portrait=0"
    />

    <div class="creditos text-center mt-24 mb-20">
      <p>
        Una producción de entre&rbrace;&lbrace;acto con el apoyo de la Beca de
        programación virtual en artes plásticas y visuales Red Galería Santa Fe,
        categoría sala virtual Programa Distrital de Estímulos, Alcaldía de
        Bogotá, 2022. Valeria Mejía, producción general; Sebastián Harper, foto
        y edición; Diana Martínez, diseño sonoro pieza intro; estudio EL CAJÓN,
        diseño y desarrollo web; proyecto Omnívoro selección musical; Juan
        Mejía, editor contenido y presentador; Carolina Castillo, bióloga y
        editora de contenido; Yannis Álvarez, apoyo logístico; cita musical en
        la intro al programa Naturalia RTI (1974&nbsp;–&nbsp;1993), dirigido por
        Alejandro Castaño y presentado por Gloria Valencia.
      </p>
      <p>Idea, dirección y producción general: Sebastián Múnera.</p>
      <p>
        <button class="underline" on:click={switchPlayer}>cuarto animal</button>
        agradece el apoyo logístico de María Clara Arias y Mariana Arango del Idartes,
        también a todos los invitados por su generosa participación y a los animales
        no humanos que hacen parte de este proyecto.
      </p>
    </div>
  </div>

  <div
    class="w-full md:w-4/5 lg:w-3/5 my-24 md:my-8 mx-auto bg-candela flex flex-col items-center gap-8 lg:flex-row lg:justify-between"
  >
    <OtroLogo
      svg={false}
      src="/logos/bogota.png"
      classList="h-10 lg:h-6 xl:h-9"
    />
    <OtroLogo
      svg={false}
      src="/logos/gsf.png"
      classList="h-10 lg:h-6 xl:h-12"
    />
    <OtroLogo
      svg={false}
      src="/logos/omnivoro.png"
      classList="h-10 lg:h-6 xl:h-12"
      href="https://open.spotify.com/user/swpkjor9kvrdymcm0ed9cd3s3?si=084da14427014d6e&nd=1"
    />

    <div class="flex items-center justify-center">
      <LogoMedio classList="h-10 lg:h-12" />
    </div>

    <OtroLogo
      svg={false}
      src="/logos/elcajon.png"
      href="http://estudioelcajon.com/"
      classList="h-10 lg:h-6 xl:h-12"
    />
    <OtroLogo
      svg={false}
      src="/logos/idartes.png"
      classList="h-10 lg:h-6 xl:h-12"
    />
  </div>
</div>

<style>
  p {
    @apply mt-4;
  }
</style>
