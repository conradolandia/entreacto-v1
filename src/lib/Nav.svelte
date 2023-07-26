<script>
  import { visibleEntre, visibleActo } from './store';

  import LogoEntre from './LogoEntre.svelte';
  import LogoActo from './LogoActo.svelte';

  let verEntre = () => {
    $visibleEntre = !$visibleEntre;
    $visibleActo = false;
  };

  let verActo = () => {
    $visibleActo = !$visibleActo;
    $visibleEntre = false;
  };
</script>

<nav>
  <button on:click={() => verEntre()}>
    <LogoEntre />
  </button>
  <button on:click={() => verActo()}>
    <LogoActo />
  </button>
</nav>
