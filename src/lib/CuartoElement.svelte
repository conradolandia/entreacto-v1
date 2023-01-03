<script>
  export let titulo = '';
  export let nombre = '';
  export let profesion = '';
  export let videoUrl = '';
  export let stillFrame = undefined;
</script>

<div class="elemento">
  <h1>{titulo}</h1>
  <h2>{nombre} <span class="text-base">{profesion}</span></h2>
  <div class="video-container">
    {#if stillFrame === undefined}
      <iframe
        title="{nombre} ({profesion})"
        src={videoUrl}
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
      />
    {:else}
      <img class="aspect-video object-cover" src={stillFrame} alt={nombre} />
    {/if}
  </div>
</div>

<style>
  .elemento {
    @apply mt-16;
  }
  .video-container {
    @apply relative;
    @apply aspect-4/3;
  }
  .video-container > iframe {
    @apply absolute;
    @apply top-0;
    @apply left-0;
    @apply w-full;
    @apply h-full;
  }
  h1 {
    @apply font-semibold;
    @apply text-2xl;
    @apply underline;
    @apply uppercase;
  }
  h2 {
    @apply mb-2;
    @apply font-semibold;
    @apply text-2xl;
  }
  @supports not (aspect-ratio: 4 / 3) {
    .video-container::before {
      float: left;
      padding-top: 75%;
      content: '';
    }
    .video-container::after {
      display: block;
      content: '';
      clear: both;
    }
  }
</style>
