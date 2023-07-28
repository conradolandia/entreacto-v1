<svg class="spinner" viewBox="0 0 40 40">
  <circle class="path" cx="20" cy="20" r="10" fill="none" stroke-width="3" />
</svg>

<style>
  .spinner {
    -webkit-animation: rotate 2s linear infinite;
    animation: rotate 2s linear infinite;
    z-index: 2;
    margin-left: -20px;
    width: 40px;
    height: 40px;
  }
  .spinner .path {
    stroke: #000000;
    stroke-linecap: round;
    -webkit-animation: dash 1.5s ease-in-out infinite;
    animation: dash 1.5s ease-in-out infinite;
  }

  @-webkit-keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
</style>
