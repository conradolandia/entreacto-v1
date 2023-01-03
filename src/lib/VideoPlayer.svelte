<script>
  import { onMount, onDestroy } from 'svelte';
  import { listen, idle, onIdle } from 'svelte-idle';
  import Keydown from 'svelte-keydown';

  import { apiData, numVideos } from './store';
  import { audioData } from './audioData';

  export let playlist = '';
  export let title = '';
  export let autoplay = 1;

  const playlistLenght = audioData.length;
  const key = 'AIzaSyBtSg72pOULsr2eymo8VQPuT5sJqCCeh4Q';
  const baseUrl =
    'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=';
  const fullUrl = `${baseUrl}${playlist}&key=${key}`;

  let song = {};
  let num = 0;

  let randomVideoId = () => {
    return ~~(Math.random() * $numVideos) + 1;
  };

  let currentVideoId = () => {
    return Number(
      document.getElementById('videoPlayer').getAttribute('data-id')
    );
  };

  let nextVideoId = () => {
    let vid = currentVideoId();
    return vid === $numVideos ? (num = 1) : (num = vid + 1);
  };

  let prevVideoId = () => {
    let vid = currentVideoId();
    return vid === 1 ? (num = $numVideos) : (num = vid - 1);
  };

  let currentAudioId = () => {
    return Number(sessionStorage.getItem('currentAudioTrack'));
  };

  let nextAudioId = () => {
    let aud = currentAudioId();
    return aud;
  };

  let prevAudioId = () => {
    let aud = currentAudioId();
    let paud = aud - 2;
    return paud === 1 ? (paud = playlistLenght) : paud;
  };

  let getSong = (id) => {
    let songObject = audioData[id];
    if (!songObject) songObject = audioData[0];
    return songObject;
  };

  let randomAudioId = () => {
    const item = audioData[~~(Math.random() * audioData.length)];
    return item.id;
  };

  let stopAllSongs = () => {
    sessionStorage.clear();
    const audios = document.querySelectorAll('audio');
    audios.forEach((element) => {
      element.remove();
    });
  };

  let playSong = (random = false, id = 1) => {
    stopAllSongs();
    let songObject;
    random === false
      ? (songObject = getSong(id))
      : (songObject = getSong(randomAudioId()));

    let src = songObject.src;
    let songId = songObject.id;
    let thisSong = document.createElement('audio');

    thisSong.setAttribute('src', src);
    thisSong.setAttribute('data-id', String(songId));
    thisSong.setAttribute('id', 'audioPlayer');
    thisSong.setAttribute('autoplay', 'true');

    document.body.appendChild(thisSong).addEventListener('ended', () => {
      console.log('Canción terminada... reproduciendo otra...');
      song = playNextSong();
    });

    sessionStorage.setItem('currentAudioTrack', String(songId));

    console.log(
      `Track ${songObject.id}: ${songObject.title} / ${songObject.performer}`
    );

    return songObject;
  };

  let playNextSong = (backwards = false) => {
    let player = document.getElementById('audioPlayer');
    if (!player) return;

    let prevSongId = prevAudioId();
    let nextSongId = nextAudioId();

    stopAllSongs();

    let songObject;

    backwards === false
      ? (songObject = getSong(nextSongId))
      : (songObject = getSong(prevSongId));

    let src = songObject.src;
    let songId = songObject.id;
    let thisSong = document.createElement('audio');

    thisSong.setAttribute('src', src);
    thisSong.setAttribute('data-id', String(songId));
    thisSong.setAttribute('id', 'audioPlayer');
    thisSong.setAttribute('autoplay', 'true');

    document.body.appendChild(thisSong).addEventListener('ended', () => {
      console.log('Canción terminada... reproduciendo otra...');
      song = playNextSong(backwards);
    });

    sessionStorage.setItem('currentAudioTrack', String(songId));

    console.log(
      `Track ${songObject.id}: ${songObject.title} / ${songObject.performer}`
    );

    return songObject;
  };

  const forwardAudioAndVideo = () => {
    song = playNextSong(false);
    num = nextVideoId();
    return num;
  };

  const rewindAudioAndVideo = () => {
    song = playNextSong(true);
    num = prevVideoId();
    return num;
  };

  onMount(async () => {
    let data = [];
    const response = await fetch(fullUrl)
      .then((response) => response.json())
      .then((data) => {
        apiData.set(data);
        numVideos.set(data.items.length);
        num = randomVideoId();
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  });

  onMount(() => {
    const unsub = onIdle(() =>
      console.log('¡Usuario inactivo! escondiendo UI...')
    );
    return unsub;
  });

  song = playSong(true);

  listen({
    timer: 10_000,
  });

  onDestroy(() => stopAllSongs());
</script>

<div class="video-wrapper fixed inset-0" id="player">
  <div class="md:hidden absolute inset-0 top-[70%] m-4 p-8 text-white z-50">
    Es preferible experimentar esta aplicación en dispositivos de mayor
    resolución.
  </div>
  <iframe
    {title}
    id="videoPlayer"
    src="https://www.youtube.com/embed?list={playlist}&mute=1&autoplay={autoplay}&index={num}&enablejsapi=1&controls=0&rel=0&showinfo=0&modestbranding=1"
    frameborder="0"
    allow="accelerometer; gyroscope; encrypted-media"
    allowfullscreen
    tabindex="-1"
    data-id={num}
  />
</div>
<button
  on:click={() => rewindAudioAndVideo()}
  class="cursor-pointer pointer-events-auto absolute left-0 top-1/2 h-[44px] w-[44px] -mt-[22px]"
/>
<button
  on:click={() => forwardAudioAndVideo()}
  class="cursor-pointer pointer-events-auto absolute right-0 top-1/2 h-[44px] w-[44px] -mt-[22px]"
/>
<div
  class="{$idle === true
    ? 'opacity-0'
    : 'opacity-1'} absolute bottom-0 left-0 my-11 mx-12 max-w-[80%] flex gap-4 text-white transition-all"
>
  <div id="songInfo">
    {song.title}
    {#if song.performer} / {song.performer} {/if}
  </div>
</div>

<Keydown
  on:ArrowRight={() => {
    forwardAudioAndVideo();
  }}
  on:ArrowLeft={() => {
    rewindAudioAndVideo();
  }}
  on:ArrowUp={() => {
    song = playNextSong(true);
  }}
  on:ArrowDown={() => {
    song = playNextSong(false);
  }}
/>

<style>
  .video-wrapper {
    z-index: -1;
  }

  .video-wrapper iframe {
    position: absolute;
    top: -20vh;
    left: -20vw;
    width: 140vw;
    height: 140vh;
    transition: opacity 0.2s ease-in-out;
  }
</style>
