const nav=document.querySelector('.navbar');
const reveals=document.querySelectorAll('.reveal');
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.12});
reveals.forEach(el=>io.observe(el));
addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>18));
addEventListener('pointermove',e=>{document.body.style.setProperty('--mx',e.clientX+'px');document.body.style.setProperty('--my',e.clientY+'px')});
const tracks=[
 {title:'Moment of Peace',genre:'CHILL / PIANO',artist:'Wimusikal Sessions',src:'music/moment-of-peace.mp3',cover:'assets/collections/moment-of-peace.svg'},
 {title:'Cool Jazz Loops',genre:'JAZZ / LOUNGE',artist:'Wimusikal Sessions',src:'music/cool-jazz-loops.mp3',cover:'assets/collections/cool-jazz-loops.svg'},
 {title:'Soft Afternoon',genre:'ACOUSTIC / CHILL',artist:'Wimusikal Sessions',src:'music/soft-afternoon.mp3',cover:'assets/collections/soft-afternoon.svg'},
 {title:'Good Energy',genre:'UPBEAT / POP',artist:'Wimusikal Sessions',src:'music/good-energy.mp3',cover:'assets/collections/good-energy.svg'}
];
let index=0;let audio=new Audio();audio.volume=.45;
const title=document.getElementById('playerTitle'),genre=document.getElementById('playerGenre'),artist=document.getElementById('playerArtist'),cover=document.getElementById('playerCover'),progress=document.getElementById('progress'),current=document.getElementById('current'),duration=document.getElementById('duration'),mainPlay=document.getElementById('mainPlay'),mini=document.getElementById('miniPlayer'),miniTitle=document.getElementById('miniTitle'),miniStatus=document.getElementById('miniStatus'),miniPlay=document.getElementById('miniPlay');
function fmt(s){if(!isFinite(s))return '0:00';return Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0')}
function load(i,autoplay=false){index=(i+tracks.length)%tracks.length;const t=tracks[index];title.textContent=t.title;genre.textContent=t.genre;artist.textContent=t.artist;miniTitle.textContent=t.title;cover.innerHTML=`<img src="${t.cover}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:18px">`;audio.src=t.src;progress.value=0;if(autoplay){audio.play().then(()=>playing(true)).catch(()=>playing(false))}else playing(false)}
function playing(on){mainPlay.textContent=on?'❚❚':'▶';miniPlay.textContent=on?'❚❚':'▶';miniStatus.textContent=on?'Playing now':'Ready to play';mini.classList.toggle('active',on||audio.currentTime>0)}
document.querySelectorAll('.song-play').forEach(btn=>btn.addEventListener('click',()=>{load(Number(btn.dataset.track),true);document.getElementById('listen').scrollIntoView({behavior:'smooth',block:'center'})}));
mainPlay.addEventListener('click',()=>{if(audio.paused){audio.play().then(()=>playing(true))}else{audio.pause();playing(false)}});miniPlay.addEventListener('click',()=>mainPlay.click());document.getElementById('prev').addEventListener('click',()=>load(index-1,true));document.getElementById('next').addEventListener('click',()=>load(index+1,true));document.getElementById('volume').addEventListener('input',e=>audio.volume=e.target.value);document.getElementById('muteBtn').addEventListener('click',e=>{audio.muted=!audio.muted;e.currentTarget.textContent=audio.muted?'🔇':'🔊'});audio.addEventListener('loadedmetadata',()=>duration.textContent=fmt(audio.duration));audio.addEventListener('timeupdate',()=>{current.textContent=fmt(audio.currentTime);if(audio.duration)progress.value=audio.currentTime/audio.duration*100});progress.addEventListener('input',()=>{if(audio.duration)audio.currentTime=progress.value/100*audio.duration});audio.addEventListener('play',()=>playing(true));audio.addEventListener('pause',()=>playing(false));audio.addEventListener('ended',()=>load(index+1,true));
load(0,false);
