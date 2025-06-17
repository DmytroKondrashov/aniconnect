<script lang="ts">
  let { playerData } = $props();
  $inspect(playerData)

  let videoElement: HTMLVideoElement;
  let isPlaying = $state(false);
  let currentTime = $state(0);
  let duration = $state(0);
  let volume = $state(1);

  const formattedCurrentTime = $derived(() => formatTime(currentTime));
  const formattedDuration = $derived(() => formatTime(duration));
  const playIcon = $derived(() => isPlaying ? '⏸' : '▶️');
  const volumeIcon = $derived(() => volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊');

  function togglePlay() {
    if (videoElement.paused) {
      videoElement.play();
      isPlaying = true;
    } else {
      videoElement.pause();
      isPlaying = false;
    }
  }

  function handleTimeUpdate() {
    currentTime = videoElement.currentTime;
  }

  function handleLoadedMetadata() {
    duration = videoElement.duration;
  }

  function handleVolumeChange(e: Event) {
    const target = e.target as HTMLInputElement;
    volume = parseFloat(target.value);
    videoElement.volume = volume;
  }

  function handleSeek(e: Event) {
    const target = e.target as HTMLInputElement;
    const seekTime = parseFloat(target.value);
    videoElement.currentTime = seekTime;
    currentTime = seekTime;
  }

  function formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
</script>

<div class="video-player mt-6">
  <video
    bind:this={videoElement}
    src={`https://api.anilibria.tv${playerData.list[1].hls.hd}`}
    poster={playerData.poster}
    autoplay={playerData.autoplay}
    loop={playerData.loop}
    muted={playerData.muted}
    on:timeupdate={handleTimeUpdate}
    on:loadedmetadata={handleLoadedMetadata}
    class="video-element"
  />
  
  <div class="controls">
    <button class="play-button" on:click={togglePlay}>
      {playIcon}
    </button>
    
    <div class="time-display">
      {formattedCurrentTime} / {formattedDuration}
    </div>
    
    <input
      type="range"
      min="0"
      max={duration}
      value={currentTime}
      on:input={handleSeek}
      class="seek-bar"
    />
    
    <div class="volume-control">
      <span>{volumeIcon}</span>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        on:input={handleVolumeChange}
        class="volume-slider"
      />
    </div>
  </div>
</div>

<style>
  .video-player {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    background: #000;
    border-radius: 8px;
    overflow: hidden;
  }

  .video-element {
    width: 100%;
    display: block;
  }

  .controls {
    padding: 1rem;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .play-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    padding: 0.5rem;
    transition: transform 0.2s ease;
  }

  .play-button:hover {
    transform: scale(1.1);
  }

  .time-display {
    color: white;
    font-family: monospace;
    min-width: 100px;
  }

  .seek-bar {
    flex: 1;
    height: 4px;
    -webkit-appearance: none;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    cursor: pointer;
    transition: height 0.2s ease;
  }

  .seek-bar:hover {
    height: 6px;
  }

  .seek-bar::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .seek-bar::-webkit-slider-thumb:hover {
    transform: scale(1.2);
  }

  .volume-control {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: white;
  }

  .volume-slider {
    width: 80px;
    height: 4px;
    -webkit-appearance: none;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    cursor: pointer;
    transition: height 0.2s ease;
  }

  .volume-slider:hover {
    height: 6px;
  }

  .volume-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .volume-slider::-webkit-slider-thumb:hover {
    transform: scale(1.2);
  }
</style>
