(() => {
  const tracks = [
    { name: 'NIKI - lowkey (Lyrics)', file: 'NIKI - lowkey (Lyrics).mp3' },
    { name: 'NIKI - Backburner (Official Lyric Video)', file: 'NIKI -  Backburner (Official Lyric Video).mp3' }
  ];
  const savedTrack = Number(sessionStorage.getItem('bean-music-track')) || 0;
  const savedTime = Number(sessionStorage.getItem('bean-music-time')) || 0;
  let currentTrack = Math.min(savedTrack, tracks.length - 1);
  let hasStarted = sessionStorage.getItem('bean-music-playing') === 'true';

  const player = document.createElement('aside');
  player.className = 'music-player';
  player.innerHTML = `<button class="music-toggle" type="button" aria-label="Play background music">▶</button><div class="music-info"><span class="music-label">Now playing</span><strong></strong></div><button class="music-next" type="button" aria-label="Next song">→</button><audio preload="metadata"></audio>`;
  document.body.appendChild(player);

  const audio = player.querySelector('audio');
  const toggle = player.querySelector('.music-toggle');
  const title = player.querySelector('strong');
  const next = player.querySelector('.music-next');

  function loadTrack(index, shouldPlay = false) {
    currentTrack = (index + tracks.length) % tracks.length;
    audio.src = `../Music/${tracks[currentTrack].file}`;
    title.textContent = tracks[currentTrack].name;
    audio.load();
    audio.addEventListener('loadedmetadata', () => {
      if (currentTrack === savedTrack && savedTime < audio.duration) audio.currentTime = savedTime;
      if (shouldPlay) audio.play().catch(() => { hasStarted = false; updateControls(); });
    }, { once: true });
  }

  function updateControls() {
    const isPlaying = !audio.paused;
    toggle.textContent = isPlaying ? 'Ⅱ' : '▶';
    toggle.setAttribute('aria-label', isPlaying ? 'Pause background music' : 'Play background music');
    player.classList.toggle('is-playing', isPlaying);
  }

  function rememberPosition() {
    sessionStorage.setItem('bean-music-track', String(currentTrack));
    sessionStorage.setItem('bean-music-time', String(audio.currentTime));
    sessionStorage.setItem('bean-music-playing', String(!audio.paused));
  }

  toggle.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => { hasStarted = true; updateControls(); }).catch(() => { title.textContent = 'Add music files in Music/'; });
    } else {
      audio.pause();
      hasStarted = false;
      rememberPosition();
      updateControls();
    }
  });
  next.addEventListener('click', () => { loadTrack(currentTrack + 1, true); });
  audio.addEventListener('play', updateControls);
  audio.addEventListener('pause', () => { rememberPosition(); updateControls(); });
  audio.addEventListener('timeupdate', rememberPosition);
  audio.addEventListener('ended', () => loadTrack(currentTrack + 1, true));
  audio.addEventListener('error', () => {
    title.textContent = 'Unable to load this track';
    toggle.disabled = true;
    player.classList.remove('is-playing');
  });
  window.addEventListener('pagehide', rememberPosition);

  loadTrack(currentTrack, hasStarted);
})();
