<script>
  import { idle } from 'svelte-idle';

  import { abiertoActo, playerOn } from './store';

  import Eleft from './Eleft.svelte';
  import Eright from './Eright.svelte';
  import Eboth from './Eboth.svelte';
  import Animal from './LogoAnimal.svelte';
  import VideoPlayer from './VideoPlayer.svelte';
  import ButtonIcon from './ButtonIcon.svelte';
  import IntroText from './IntroText.svelte';

  let visibleEntre = false;
  let visibleActo = false;

  let elem;
  let elemScrollTop;

  let verEntre = () => {
    visibleEntre = !visibleEntre;
    visibleActo = false;
  };

  let verActo = () => {
    visibleActo = !visibleActo;
    visibleEntre = false;
  };

  let cerrarIntro = () => {
    const intro = document.querySelector('#introAnimal');
    if (intro !== null) intro.remove();
  };

  let abrirCuarto = () => {
    $abiertoActo = true;
  };

  let cerrarCuarto = () => {
    cerrarIntro();
    $playerOn = false;
    visibleActo = false;
    $abiertoActo = false;
  };

  let switchPlayer = () => {
    $playerOn = !$playerOn;
  };

  function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
  }

  function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
    }
    navigator.clipboard.writeText(text).then(
      function () {
        console.log('Async: Copying to clipboard was successful!');
      },
      function (err) {
        console.error('Async: Could not copy text: ', err);
      }
    );
  }

  function CopyLink() {
    copyTextToClipboard(location.href);
    let anuncio = document.querySelector('.anuncio');
    anuncio.classList.remove('opacity-0');
    setTimeout(() => {
      anuncio.classList.add('opacity-0');
    }, 3000);
  }

  // activar animal desde el principio
  abrirCuarto();
</script>

<div class="logo-container">
  <button on:click={() => verEntre()}>
    <svg
      class="h-[44px] fill-white"
      id="entre"
      viewBox="0 0 62.172 23.019"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M229.253 36.148c-.59-.784-.88-2.29-.88-4.52V13.61q0-7.03-2.59-10.315C224.045 1.094 221.246 0 217.367 0h-6.599v7.463h4c2.109 0 3.518.472 4.228 1.406.71.934 1.06 2.671 1.06 5.192v21.093q0 7.452 6.998 7.462v1.758q-7.048 0-6.998 7.472V72.94q0 3.776-1.06 5.182c-.71.944-2.12 1.406-4.229 1.406h-3.999V87h6.599c3.879 0 6.678-1.105 8.418-3.294 1.74-2.19 2.589-5.645 2.589-10.325V55.34c0-2.219.29-3.726.88-4.519.59-.793 1.76-1.185 3.529-1.185h2.2V37.333h-2.2c-1.77 0-2.94-.392-3.53-1.185"
        style="stroke-width:1.00207"
        transform="matrix(.26458 0 0 .26458 0 0)"
      />
      <path
        d="M197.59 109.25v-.35a19.74 19.74 0 0 0-2.06-.1h-3a22.08 22.08 0 0 0-3.07.21 19.35 19.35 0 0 0-8.16 3.08v-2.43h-8.22a89.8 89.8 0 0 1 .44 9.84v33.89h8.36v-24.46c0-1.76 0-3.47.12-4.81a7.89 7.89 0 0 1 2.17-4c.21-.24.42-.48.65-.71a11.32 11.32 0 0 1 8.34-3.59h.91a11.15 11.15 0 0 1 3.52.51v-7.07zM114.1 108.93a18.63 18.63 0 0 0-2.4-.15h-3a19.75 19.75 0 0 0-11.23 3.3v-2.44h-8.2c.38 2 .43 9.94.43 9.94v33.8h8.37v-24.46c0-1.76 0-3.39.11-4.82a7.93 7.93 0 0 1 2.18-4c.2-.25.42-.48.65-.72a11.31 11.31 0 0 1 8.34-3.58h.91a10.86 10.86 0 0 1 3.57.53q5.24 1.77 5.23 9.52v27.56h8.37v-29.3q0-7-4.19-11.15a14.68 14.68 0 0 0-9.14-4M51.88 126.31v-.91a8.46 8.46 0 0 1 3.65-6.91 13.79 13.79 0 0 1 7.39-2.68h1.73a7.32 7.32 0 0 1 5 1.79 5.75 5.75 0 0 1 1.9 3.23 5.91 5.91 0 0 1 .13 1.28 5.59 5.59 0 0 1-1.78 4.23 6.76 6.76 0 0 1-.64.54 10.75 10.75 0 0 1-6.37 2.12l-11-.07zm20.82 14.4a7.29 7.29 0 0 1-3.2 4.84 10.88 10.88 0 0 1-6.16 1.75h-2.21a9 9 0 0 1-6.78-2.54 8.57 8.57 0 0 1-2.23-4.45 13.6 13.6 0 0 1-.24-2.63v-2.38h10.37a26.12 26.12 0 0 0 7.38-1 20.47 20.47 0 0 0 3.58-1.41c.5-.25 1-.52 1.48-.82a10.84 10.84 0 0 0 3.92-4.11 12.72 12.72 0 0 0 1.45-6.21q0-.65-.06-1.26a11.65 11.65 0 0 0-4.08-8 15.07 15.07 0 0 0-10.39-3.68h-3a19.82 19.82 0 0 0-11.23 3.29 21.82 21.82 0 0 0-.31-2.45h-7.91a75.58 75.58 0 0 1 .44 9.62v18.37a18 18 0 0 0 .76 5.33 15.82 15.82 0 0 0 3.95 6.52c3.14 3.18 7.53 4.63 13.16 4.77h1.42A20.36 20.36 0 0 0 75 150.67a14.86 14.86 0 0 0 6.12-10.19h-8.37a1.89 1.89 0 0 1 0 .23M152.51 145.4a3.7 3.7 0 0 1-.8-2.75V117h9v-7.17h-9v-8.23h-8.36v8.25h-9V117h9v27a9.62 9.62 0 0 0 2.51 7.09q2.5 2.53 7.17 2.53h9.05v-7.43h-6.85a3.9 3.9 0 0 1-2.72-.75M213.14 126.31v-.91a8.46 8.46 0 0 1 3.65-6.91 13.79 13.79 0 0 1 7.39-2.68h1.73a7.32 7.32 0 0 1 5 1.79 5.81 5.81 0 0 1 1.9 3.23 6.61 6.61 0 0 1 .13 1.28 5.59 5.59 0 0 1-1.78 4.23 6.89 6.89 0 0 1-.65.54 10.72 10.72 0 0 1-6.38 2.14l-11-.07zm20.86 14.4a7.32 7.32 0 0 1-3.2 4.84 10.91 10.91 0 0 1-6.17 1.75h-2.2a9 9 0 0 1-6.78-2.54 8.57 8.57 0 0 1-2.23-4.45 13.6 13.6 0 0 1-.24-2.63v-2.38h10.37a26.18 26.18 0 0 0 7.38-1 20.47 20.47 0 0 0 3.58-1.41c.5-.25 1-.52 1.48-.82a10.74 10.74 0 0 0 3.91-4.11 12.61 12.61 0 0 0 1.46-6.21q0-.65-.06-1.26a11.69 11.69 0 0 0-4.08-8 15.07 15.07 0 0 0-10.39-3.68h-3a19.88 19.88 0 0 0-11.24 3.29 20 20 0 0 0-.3-2.45h-7.92a76 76 0 0 1 .43 9.62v18.37a18 18 0 0 0 .77 5.33 15.82 15.82 0 0 0 4 6.52c3.14 3.18 7.53 4.63 13.16 4.77h1.41a20.37 20.37 0 0 0 12.2-3.63 14.86 14.86 0 0 0 6.12-10.19H234a1.89 1.89 0 0 1 0 .23"
        transform="matrix(.26452 0 0 .26574 -11.395 -23.447)"
      />
    </svg>
  </button>
  <button on:click={() => verActo()}>
    <svg
      class="h-[44px] fill-white"
      id="acto"
      viewBox="0 0 62.146 23.005"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        class="cls-1"
        d="M146.018 148.804v1.634a5.177 5.2 0 0 1-.098 1.016 4.92 4.92 0 0 1-.106.411 4.211 4.23 0 0 1-1.058 1.749c-.838.853-2.005 1.278-3.51 1.278h-.503q-2.256 0-3.51-1.278a4.211 4.23 0 0 1-1.058-1.749 4.044 4.063 0 0 1-.105-.411 4.98 5.004 0 0 1-.098-1.016v-3.27a4.973 4.996 0 0 1 .098-1.013 4.044 4.063 0 0 1 .105-.412 4.195 4.215 0 0 1 1.058-1.749q1.254-1.278 3.51-1.276h.501c1.505 0 2.671.423 3.51 1.276a4.195 4.215 0 0 1 1.058 1.749c.04.133.076.265.106.412a5.169 5.193 0 0 1 .097 1.012zm-12.168-3.827h-2.38v7.175a2.545 2.556 0 0 1-.662 1.877c-.441.449-1.076.675-1.899.675h-2.396v-1.978h1.812a1.034 1.04 0 0 0 .722-.199.981.986 0 0 0 .211-.733v-6.817h-2.38v-1.908h2.38v-2.195h2.214v2.195h2.381zm-10.107 3.867v1.624a4.89 4.914 0 0 1-.1 1.004 4.044 4.063 0 0 1-.106.412 4.185 4.204 0 0 1-1.058 1.735q-1.27 1.27-3.55 1.27h-.646a5.351 5.376 0 0 1-2.814-.95 3.917 3.936 0 0 1-1.65-2.711h2.256c0 .02 0 .042.013.06a1.944 1.953 0 0 0 .865 1.29 2.759 2.772 0 0 0 .944.393 2.822 2.835 0 0 0 .339.053c.124.013.764 0 .764 0a2.447 2.458 0 0 0 1.828-.675 2.267 2.277 0 0 0 .6-1.185c0-.059.022-.114.03-.176a3.642 3.66 0 0 0 .034-.531v-3.24a3.68 3.696 0 0 0-.034-.531c0-.059-.019-.117-.03-.173a2.259 2.27 0 0 0-.6-1.185 2.452 2.463 0 0 0-1.828-.678h-.764a2.91 2.923 0 0 0-1.283.444 1.944 1.953 0 0 0-.865 1.289c0 .021 0 .043-.013.064H113.8a3.917 3.936 0 0 1 1.65-2.713 5.396 5.421 0 0 1 2.815-.952h.645q2.283 0 3.55 1.268a4.177 4.196 0 0 1 1.058 1.738 3.994 4.013 0 0 1 .106.409 4.899 4.922 0 0 1 .1 1.007zm-14.945 5.828a5.148 5.171 0 0 1-.082-.651 5.232 5.256 0 0 1-2.97.877h-.794a3.984 4.002 0 0 1-2.749-.976 3.105 3.12 0 0 1-1.081-2.126c0-.109-.014-.22-.014-.335a3.354 3.37 0 0 1 .384-1.647 2.894 2.907 0 0 1 1.037-1.095 8.25 8.25 0 0 1 .391-.215 5.227 5.251 0 0 1 .947-.378 6.994 7.026 0 0 1 1.952-.265h2.74v-.622a3.828 3.845 0 0 0-.06-.7 2.293 2.304 0 0 0-.59-1.184 2.38 2.392 0 0 0-1.793-.675h-.585a2.878 2.891 0 0 0-1.63.465 1.952 1.961 0 0 0-.848 1.286v.064h-2.214a3.936 3.954 0 0 1 1.618-2.71 5.386 5.41 0 0 1 3.225-.965h.376c1.489.037 2.645.422 3.48 1.267a4.193 4.212 0 0 1 1.059 1.735 4.761 4.783 0 0 1 .2 1.417v4.876a19.963 20.056 0 0 0 .117 2.557zm44.06-16.453q-.687-.874-2.224-.871H95.847c-.264.024-.529.026-.793.066a2.116 2.126 0 0 0-1.791 1.534 5.38 5.405 0 0 0-.265 1.631c-.016.657 0 1.329 0 1.972v3.407a3.738 3.755 0 0 1-.076.62.675.678 0 0 1-.625.61c-.243.032-.492.027-.738.037h-.174v3.256h.36a5.576 5.602 0 0 1 .597.045.667.67 0 0 1 .561.58 3.968 3.986 0 0 1 .082.661v4.876c0 .3 0 .601.032.899a4.986 5.01 0 0 0 .251 1.251 2.116 2.126 0 0 0 1.476 1.44 4.007 4.026 0 0 0 .833.12h55.041c1.026 0 1.767-.292 2.225-.871.457-.58.687-1.494.687-2.732V140.95q0-1.86-.687-2.732m-9.12 8.246a2.272 2.283 0 0 0-.593-1.193 2.402 2.413 0 0 0-1.807-.68h-.645a2.38 2.392 0 0 0-1.807.68 2.296 2.307 0 0 0-.595 1.193c0 .056-.019.115-.027.173a3.746 3.763 0 0 0-.037.532v3.268a3.68 3.696 0 0 0 .037.532c0 .06.016.12.027.175a2.296 2.307 0 0 0 .595 1.193 2.38 2.392 0 0 0 1.807.68h.645a2.397 2.408 0 0 0 1.807-.68 2.272 2.283 0 0 0 .592-1.193 1.717 1.725 0 0 0 .03-.175 3.703 3.72 0 0 0 .034-.532v-3.268a3.756 3.774 0 0 0-.035-.532c0-.058-.016-.117-.029-.173m-39.765 3.639c-.06.047-.116.095-.17.143a1.484 1.49 0 0 0-.47 1.124 1.78 1.788 0 0 0 .032.343 1.526 1.533 0 0 0 .505.856 1.92 1.93 0 0 0 1.323.475H105.637a3.624 3.64 0 0 0 1.955-.712 2.233 2.243 0 0 0 .962-1.836v-.933l-2.91-.021a2.86 2.873 0 0 0-1.69.568"
        transform="translate(-91.385 -137.348)"
      />
    </svg>
  </button>
</div>
<div
  class="absolute top-0 left-0 w-full h-full overflow-hidden grid grid-cols-2 pointer-events-none"
>
  <!-- ENTRE -->
  <div
    class="entre bg-black text-white cortina
    {visibleEntre === true ? 'visibleEntre' : ''}"
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
            Somos una productora de cinematografía expandida. Investigamos,
            desarrollamos y producimos experiencias. Nuestro lugar de creación
            es el intermedio entre una idea y su puesta en escena.
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
        <a href="//www.sebastianmunera.com/" target="_blank">Sebastian Múnera</a
        >
        <div class="text-white">
          <div class="flex gap-[22px]">
            <ButtonIcon
              fill="#fff"
              name="Message"
              href="mailto:test@example.com?subject=Mensaje desde cuartoanimal.com"
              target="_blank"
            />
            <ButtonIcon fill="#fff" name="Share" isButton={true} />
          </div>
        </div>
      </footer>
    </div>
  </div>
  <!-- ACTO -->
  <div
    class="acto bg-black text-white cortina
    {visibleActo === true ? 'visibleActo' : ''} 
    {$abiertoActo === true ? 'z-[100] abiertoActo' : ''}"
  >
    <div class="ui h-full w-full">
      <header
        class="header flex justify-between transition-all {$idle === true
          ? 'opacity-0'
          : 'opacity-100'}"
      >
        {#if visibleActo !== true || $abiertoActo === true}
          <button class="pointer-events-auto" on:click={cerrarCuarto}>
            <Eboth
              className="h-[22px] hover:fill-white"
              fill={$playerOn === true ? '#fff' : '#000'}
            />
          </button>
          <div class={$playerOn === true ? 'text-white' : 'text-black'}>
            <div class="flex gap-[22px]">
              <ButtonIcon
                fill={$playerOn === true ? '#fff' : '#000'}
                name="Instagram"
                className="hover:fill-white"
                href="//www.instagram.com/cuarto__animal/"
                target="_blank"
              />
            </div>
          </div>
        {:else}
          <div />
          <button class="pointer-events-auto" on:click={cerrarCuarto}>
            <Eboth className="h-[22px] hover:fill-white" fill="#fff" />
          </button>
        {/if}
      </header>
      <main
        class="flex items-center justify-start {$abiertoActo === true
          ? 'px-[44px]'
          : ''}"
      >
        <button
          on:click={switchPlayer}
          class={$abiertoActo === true
            ? 'bright pointer-events-auto -ml-4'
            : 'pointer-events-auto'}
        >
          <Eright
            className="{$idle === true
              ? 'opacity-0'
              : 'opacity-100'} hover:fill-white"
            fill={$playerOn === true || $abiertoActo === false
              ? '#fff'
              : '#000'}
          />
        </button>
        <div
          bind:this={elem}
          on:scroll={() => (elemScrollTop = elem.scrollTop)}
          class="{$abiertoActo === true
            ? 'pointer-events-auto'
            : 'pointer-events-none'} flex-grow z-50 px-4 -my-11 w-full h-full relative flex items-center justify-center contenidoActo overflow-y-auto"
        >
          {#if $abiertoActo === true}
            <button
              tabindex="-1"
              class="{elemScrollTop
                ? 'bg-candela py-[44px] w-full flex items-center justify-center'
                : ''} pointer-events-auto sticky top-0"
              on:click={switchPlayer}
            >
              <Animal
                className="hover:fill-white {$playerOn === true
                  ? 'fill-white'
                  : 'fill-black'} {$idle === true
                  ? 'opacity-0'
                  : 'opacity-100'}"
              />
            </button>
            {#if $playerOn === false}
              <IntroText />
            {/if}
          {:else}
            <button class="pointer-events-auto" on:click={abrirCuarto}>
              <Animal className="fill-candela" />
            </button>
          {/if}
        </div>
        <button
          on:click={switchPlayer}
          class={$abiertoActo === true ? 'bleft pointer-events-auto -mr-4' : ''}
        >
          <Eleft
            className="{$idle === true
              ? 'opacity-0'
              : 'opacity-100'} hover:fill-white"
            fill={$playerOn === true || $abiertoActo === false
              ? '#fff'
              : '#000'}
          />
        </button>
      </main>
      <footer
        class="{$idle === true
          ? 'opacity-0'
          : 'opacity-100'} footer flex justify-between transition-all}"
      >
        {#if visibleActo !== true || $abiertoActo === true}
          <div class={$playerOn === true ? 'text-white' : 'text-black'}>
            {#if $playerOn !== true}
              <button
                class="pointer-events-auto hover:text-white transition-all"
                on:click={switchPlayer}>cuarto animal</button
              >
            {/if}
          </div>
          <div class={$playerOn === true ? 'text-white' : 'text-black'}>
            <div class="flex items-center gap-[22px]">
              <div
                class="opacity-0 anuncio transition-opacity ease-in duration-700"
              >
                enlace copiado!
              </div>
              <ButtonIcon
                fill={$playerOn === true ? '#fff' : '#000'}
                name="Share"
                className="hover:fill-white"
                isButton={true}
                on:click={CopyLink}
              />
            </div>
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
    {#if $abiertoActo === true && $playerOn === true}
      <VideoPlayer
        playlist="PLQr8GN-e6Yr0lpWfK19bL3DKO8NxYOU2p"
        title="Cuarto Animal"
        autoplay={1}
      />
    {/if}
  </div>
</div>

<style>
  button svg {
    transition: all 0.8s ease-in-out;
    display: inline;
  }

  .bleft,
  .bright {
    transition: all 0.4s ease-in-out;
  }

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
    transition: all 0.8s ease-in-out;
    z-index: 100;
    width: 100vw;
    transform: translateX(-50%);
    @apply bg-candela;
    @apply text-black;
  }

  .contenidoActo {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
  }

  .contenidoActo::-webkit-scrollbar {
    background: transparent; /* Chrome/Safari/Webkit */
    width: 0px;
  }
</style>
