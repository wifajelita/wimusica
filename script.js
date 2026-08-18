const tracks=[
 {title:'Moonlit Steps',artist:'Wimusikal Sessions',file:'assets/audio/moonlit-steps.wav',art:'art-1'},
 {title:'Cloudy Notes',artist:'Wimusikal Sessions',file:'assets/audio/cloudy-notes.wav',art:'art-2'},
 {title:'Dreamy Afternoon',artist:'Wimusikal Sessions',file:'assets/audio/dreamy-afternoon.wav',art:'art-3'},
 {title:'Good Energy',artist:'Wimusikal Sessions',file:'assets/audio/good-energy.wav',art:'art-4'}
];
const audio=document.querySelector('#audio'), title=document.querySelector('#title'),artist=document.querySelector('#artist'),progress=document.querySelector('#progress'),current=document.querySelector('#current'),duration=document.querySelector('#duration'),mainPlay=document.querySelector('#mainPlay'),playerArt=document.querySelector('#playerArt'),volume=document.querySelector('#volume');let index=0;
function fmt(s){if(!Number.isFinite(s))return'0:00';return `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`}
function load(i,autoplay=false){index=(i+tracks.length)%tracks.length;const t=tracks[index];audio.src=t.file;title.textContent=t.title;artist.textContent=t.artist;playerArt.className=`player-art ${t.art}`;document.querySelectorAll('.album-card').forEach((c,n)=>c.classList.toggle('active',n===index));document.querySelectorAll('.card-play').forEach((b,n)=>b.textContent=n===index&& !audio.paused?'❚❚':'▶');if(autoplay)audio.play().catch(()=>{});}
function toggle(){if(audio.paused){audio.play().catch(()=>{});mainPlay.textContent='❚❚'}else{audio.pause();mainPlay.textContent='▶'}document.querySelectorAll('.card-play').forEach((b,n)=>b.textContent=n===index&&!audio.paused?'❚❚':'▶')}
document.querySelectorAll('[data-play]').forEach(b=>b.addEventListener('click',()=>{load(Number(b.dataset.play));toggle();document.querySelector('#player').scrollIntoView({behavior:'smooth',block:'center'})}));mainPlay.addEventListener('click',toggle);document.querySelector('#next').addEventListener('click',()=>load(index+1,true));document.querySelector('#prev').addEventListener('click',()=>load(index-1,true));audio.addEventListener('ended',()=>load(index+1,true));audio.addEventListener('loadedmetadata',()=>{duration.textContent=fmt(audio.duration)});audio.addEventListener('timeupdate',()=>{current.textContent=fmt(audio.currentTime);progress.value=audio.duration?(audio.currentTime/audio.duration*100):0});progress.addEventListener('input',()=>{if(audio.duration)audio.currentTime=progress.value/100*audio.duration});volume.addEventListener('input',()=>audio.volume=volume.value);audio.volume=.55;load(0);

/* ===== WIMUSIKAL AUTO-SCROLL =====
   Setelah 2 detik tanpa interaksi pengguna, halaman bergerak perlahan ke bawah.
   Saat mencapai bagian paling bawah, halaman kembali cepat ke atas lalu mengulang.
*/
(() => {
  const IDLE_DELAY = 2000;
  const SCROLL_SPEED = 0.42; // px/frame, sengaja pelan
  const TOP_RESET_DELAY = 180;
  const BOTTOM_EPSILON = 3;

  let idleTimer = null;
  let animationFrame = null;
  let autoScrolling = false;
  let resetting = false;

  const status = document.createElement('div');
  status.className = 'auto-scroll-status paused';
  status.innerHTML = '<span class="auto-scroll-dot"></span><span class="auto-scroll-label">AUTO-SCROLL PAUSED</span>';
  document.body.appendChild(status);

  const label = status.querySelector('.auto-scroll-label');

  function setStatus(active) {
    status.classList.toggle('paused', !active);
    label.textContent = active ? 'AUTO-SCROLL ON' : 'AUTO-SCROLL PAUSED';
  }

  function stopAutoScroll() {
    autoScrolling = false;
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
    setStatus(false);
  }

  function startAutoScroll() {
    if (autoScrolling || resetting) return;
    autoScrolling = true;
    setStatus(true);
    animationFrame = requestAnimationFrame(step);
  }

  function step() {
    if (!autoScrolling) return;

    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const currentScroll = window.scrollY || window.pageYOffset;

    if (currentScroll >= maxScroll - BOTTOM_EPSILON) {
      autoScrolling = false;
      resetting = true;
      setStatus(false);

      // Kembali cepat ke atas tanpa smooth-scroll agar terasa seperti reset playlist.
      window.scrollTo({ top: 0, behavior: 'auto' });

      window.setTimeout(() => {
        resetting = false;
        startAutoScroll();
      }, TOP_RESET_DELAY);
      return;
    }

    window.scrollBy(0, SCROLL_SPEED);
    animationFrame = requestAnimationFrame(step);
  }

  function scheduleAutoScroll() {
    stopAutoScroll();
    window.clearTimeout(idleTimer);
    idleTimer = window.setTimeout(startAutoScroll, IDLE_DELAY);
  }

  // Interaksi nyata pengguna menghentikan auto-scroll dan mengaktifkan timer 2 detik lagi.
  const userEvents = ['wheel', 'touchstart', 'touchmove', 'pointerdown', 'keydown', 'click'];
  userEvents.forEach(eventName => {
    window.addEventListener(eventName, event => {
      // Klik pada status hanya dianggap interaksi biasa; auto-scroll tetap dijadwalkan ulang.
      if (eventName === 'keydown' && ['Shift','Control','Alt','Meta'].includes(event.key)) return;
      scheduleAutoScroll();
    }, { passive: true });
  });

  // Jangan menganggap scroll yang dilakukan script sebagai aktivitas pengguna.
  scheduleAutoScroll();
})();
