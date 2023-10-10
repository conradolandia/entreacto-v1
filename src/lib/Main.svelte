<script>
  import { onMount } from 'svelte';
  import Router, { push } from 'svelte-spa-router';

  import {
    abiertoActo,
    visibleEntre,
    visibleActo,
    projectPreview,
    URL,
  } from './store';

  import Nav from './Nav.svelte';
  import Eboth from './Eboth.svelte';
  import ButtonIcon from './ButtonIcon.svelte';
  import Preview from './Preview.svelte';
  import Proyectos from './Proyectos.svelte';
  import Proyecto from './Proyecto.svelte';

  // Rutas
  const routes = {
    '/proyecto/:slug': Proyecto,
  };

  let showPreview = false,
    intro_text,
    proyecto;

  $: showPreview = $projectPreview !== null;

  projectPreview.subscribe(value => {
    proyecto = value;
  });

  const verEntre = () => {
    $visibleEntre = !$visibleEntre;
    $visibleActo = false;
  };

  const verActo = () => {
    $visibleActo = !$visibleActo;
    $visibleEntre = false;
  };

  const cerrarCuarto = () => {
    $visibleActo = false;
    $abiertoActo = false;
  };

  const cerrarProyecto = () => {
    push('/');
    $abiertoActo = false;
  };

  /// back button
  document.onmouseover = function () {
    //User's mouse is inside the page.
    window.innerDocClick = true;
  };

  document.onmouseleave = function () {
    //User's mouse has left the page.
    window.innerDocClick = false;
  };

  window.onhashchange = function () {
    if (!window.innerDocClick) {
      cerrarProyecto();
    }
  };

  // fetch intro
  const fetchIntro = async () => {
    try {
      const res = await fetch(
        `${$URL}/wp-json/wp/v2/pages?slug=intro&_fields=content`
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const [intro] = await res.json();

      if (intro) {
        intro_text = intro.content.rendered;
      }
    } catch (error) {
      console.log(error);
    }
  };

  onMount(fetchIntro);
</script>

<Nav />

<div
  class="main-container absolute inset-0 overflow-hidden grid grid-cols-2 pointer-events-none"
>
  <!-- ENTRE -->
  <div
    class="entre bg-black text-white cortina
    {$visibleEntre ? 'visibleEntre' : ''}"
  >
    <div class="ui w-full h-full">
      <header class="flex items-center justify-between transition-all">
        <button class="pointer-events-auto" on:click={() => verEntre()}>
          <Eboth className="h-[22px]" fill="#fff" />
        </button>
        <div class="text-white">
          <div class="flex gap-[22px]">
            <ButtonIcon
              fill="#fff"
              name="Instagram"
              href="//www.instagram.com/entre__acto/"
              target="_blank"
            />
            <ButtonIcon
              fill="#fff"
              name="vimeo"
              href="//vimeo.com/user183118141"
              target="_blank"
            />
          </div>
        </div>
      </header>
      <main class="flex items-center justify-end pl-12">
        <div class="flex-grow">
          <div class="hidden md:block w-1/2 mx-auto overflow-hidden">
            {#if intro_text}
              {@html intro_text}
            {/if}
          </div>
        </div>
        <div class="flex items-center justify-center contenidoEntre p-2">
          <svg
            class="h-[27px] mb-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 19.51886 5.9160199"
          >
            <g style="fill:#fff">
              <path
                d="M123.45383 161.63182c0-.14852.0141-.29034.0423-.42545.0123-.0589.0275-.11677.0452-.17321.0864-.27588.23707-.52.45226-.73343.35913-.35772.86113-.53587 1.50671-.53587 0 0 .20779-.002.27376.002.45826.03.8569.16369 1.1945.40182.38665.27199.62019.65369.70062 1.14582h-.95814c-.002-.009-.004-.0176-.005-.0265-.0508-.23636-.17251-.41769-.36725-.54434-.12135-.079-.25541-.13405-.4011-.16545-.0466-.0102-.0945-.0176-.14359-.0226-.0522-.006-.32349-.005-.32349-.005-.32914 0-.58808.0949-.77611.2854-.12983.13088-.21485.29775-.25506.50095-.005.024-.009.0483-.0123.0734-.0102.0699-.0152.14358-.0152.2219v1.37266c0 .078.005.15205.0152.2219.004.025.008.0494.0123.0737.0402.20284.12523.36971.25506.50023.18803.1905.44591.28575.77611.28575 0 0 .27128.00071.32349-.005.049-.005.097-.0123.14359-.0226.14569-.0314.27975-.0864.4011-.16545.19474-.127.31645-.30763.36725-.54434.002-.009.004-.0173.005-.0265h.95814c-.0804.49213-.31397.87418-.70062 1.14582-.3376.23778-.73624.37183-1.1945.40146-.066.005-.27376.003-.27376.003-.64558 0-1.14758-.17851-1.50671-.53622-.21519-.21343-.36583-.45791-.45226-.73343-.0176-.0564-.0328-.1143-.0452-.17356-.0282-.13512-.0423-.27658-.0423-.4251v-.6858zm9.55559-.45202c-.0123-.0593-.0272-.11783-.0445-.17462-.0854-.27764-.23495-.52353-.44697-.73802-.35525-.36018-.8509-.53975-1.48943-.53975h-.0169c-.0289-.002-.0582-.002-.0875-.003h-.0152c-.0293.00035-.048.001-.0766.003h-.0173c-.63817 0-1.13418.17957-1.48907.53975-.21237.21449-.3616.46038-.44697.73802-.0176.0568-.0325.11535-.0448.17462-.0279.13582-.0416.27834-.0416.42792v1.38183c0 .14958.0138.2921.0416.42792.0123.0596.0272.11783.0448.17462.0854.27764.2346.52353.44697.73802.35489.36018.8509.53975 1.48907.53975h.0173c.0286.001.0473.002.0766.003h.0152c.0293-.00071.0586-.001.0875-.003h.0169c.63853 0 1.13418-.17957 1.48943-.53975.21202-.21449.3616-.46038.44697-.73802.0173-.0568.0321-.115.0445-.17462.0279-.13582.042-.27834.042-.42792v-1.38183c0-.14958-.0141-.2921-.042-.42792m-.90487.58596v1.22379c0 .0783-.005.15275-.0148.22331-.004.025-.007.0497-.0123.0737-.0395.20461-.12347.37253-.25188.50412-.18556.19191-.44062.28751-.76659.28751l-.13476.002h-.0152l-.12382-.002c-.32632 0-.58103-.0956-.76694-.28751-.12806-.13159-.21202-.29951-.25224-.50412-.005-.024-.008-.0487-.012-.0737-.01-.0706-.0148-.14499-.0148-.22331v-1.38183c0-.0783.005-.15275.0148-.22331.004-.0254.007-.0501.012-.0737.0402-.20461.12418-.37253.25224-.50412.18591-.19191.44168-.28787.76694-.28787l.12382-.002h.0152l.13476.002c.32491 0 .58103.096.76659.28787.12841.13159.21237.29951.25188.50412.005.0236.009.0483.0123.0737.01.0706.0148.14499.0148.22331zm5.16074-1.9669c-.0868-.0109-.17639-.0162-.26952-.0162-.0632 0-.28469.003-.33549.003-.4699 0-.89041.12347-1.26013.36971v-.27305h-.92258c.0423.21978.0487 1.11548.0487 1.11548v3.79413h.93875v-2.74955c0-.19756-.001-.37995.0127-.54011.0307-.16086.11183-.31079.24447-.44944.0229-.0275.0473-.0543.0727-.0804.26317-.26776.57468-.40217.93627-.40252.001 0 .002-.00035.003-.00035h.0988c.15169 0 .28539.0197.40181.0596.39123.133.58702.48965.58702 1.06962v3.09316h.93874v-3.28895c0-.52423-.15698-.94156-.4699-1.25236-.25788-.25612-.60007-.40711-1.02552-.45191m4.63332 4.07514c-.0596-.055-.0892-.1584-.0892-.30903v-2.87691h1.00859v-.80539h-1.00859v-.92569h-.9391v.92569h-1.00577v.80539h1.00577v3.02402c0 .34043.0935.60571.28187.79551.18733.18944.45579.28469.80539.28469h1.0153v-.83432h-.76835c-.14499 0-.24695-.0279-.30586-.084"
                transform="translate(-123.45383 -158.95684)"
              />
            </g>
          </svg>
        </div>
      </main>
      <footer class="flex items-center justify-between pointer-events-auto">
        <button on:click={verActo}>actos</button>

        <div class="flex gap-[22px] relative">
          <ButtonIcon
            fill="#fff"
            name="Message"
            href="mailto:test@example.com?subject=Mensaje desde entreacto"
            target="_blank"
          />
          <ButtonIcon
            fill="#fff"
            textColor="white"
            name="Share"
            isButton={true}
          />
        </div>
      </footer>
    </div>
  </div>
  <!-- ACTO -->
  <div
    class="acto cortina bg-black text-white
    {$visibleActo ? 'visibleActo' : ''} 
    {$abiertoActo ? 'abiertoActo' : ''}"
  >
    <div class="ui h-full w-full">
      <header class="header flex justify-between transition-all">
        {#if !$visibleActo || $abiertoActo}
          <button class="pointer-events-auto" on:click={cerrarProyecto}>
            <Eboth className="h-[22px] hover:fill-white" fill="#000" />
          </button>
          <div class="flex gap-[22px]">
            <ButtonIcon
              fill="#000"
              className="hover:fill-white"
              name="Instagram"
              href="//www.instagram.com/entre__acto/"
              target="_blank"
            />
            <ButtonIcon
              fill="#000"
              className="hover:fill-white"
              name="vimeo"
              href="//vimeo.com/user183118141"
              target="_blank"
            />
          </div>
        {:else}
          <div />
          <button class="pointer-events-auto" on:click={cerrarCuarto}>
            <Eboth className="h-[22px] hover:fill-white" fill="#fff" />
          </button>
        {/if}
      </header>
      <!-- menu proyectos -->
      <main class="flex items-center justify-start">
        <Proyectos />
        <Router {routes} />
      </main>
      <!-- fin menu proyectos -->
      <footer class="footer flex justify-between transition-all">
        {#if !$visibleActo || $abiertoActo}
          <button class="pointer-events-auto" on:click={cerrarProyecto}
            >actos</button
          >
          <div class="flex items-center gap-[22px]">
            <ButtonIcon
              fill="#000"
              textColor="black"
              name="Share"
              isButton={true}
            />
          </div>
        {:else}
          <div />
          <div class="text-white">
            <button class="pointer-events-auto" on:click={() => verEntre()}
              >contacto</button
            >
          </div>
        {/if}
      </footer>
    </div>
  </div>
</div>
{#if proyecto && showPreview}
  <Preview />
{/if}

<style>
  .cortina {
    transition: all 0.8s ease-in-out;
    width: 50vw;
    pointer-events: none;
    @apply text-white;
    z-index: 9;
    padding: 0 2px;
  }

  .entre {
    transform: translateX(-100%);
    width: calc(100% - 14px);
  }

  .acto {
    transform: translateX(100%);
  }

  .visibleEntre,
  .visibleActo {
    transform: translateX(0);
  }

  .ui main {
    height: 100vh;
  }

  .ui header,
  .ui footer {
    position: fixed;
    width: 100%;
    left: 0;
    z-index: 999;
  }

  header {
    top: 0;
  }

  footer {
    bottom: 0;
  }

  .acto .ui header {
    padding: 44px 48px;
  }

  .acto .ui footer {
    padding: 0 48px 44px;
  }

  .entre .ui header {
    padding: 44px 21px 0 48px;
  }

  .entre .ui footer {
    padding: 0 21px 44px 48px;
  }

  .abiertoActo {
    transition: all 1s ease-in-out;
    z-index: 100;
    width: 100vw;
    transform: translateX(-50%);
    @apply bg-white;
    @apply text-black;
  }

  @media screen and (max-width: 767px) and (orientation: portrait) {
    .cortina {
      width: 50vh;
    }

    .ui main {
      height: 100vw;
    }

    .abiertoActo {
      width: 100vh;
    }
  }
</style>
