const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const nav=$('#navbar');addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>18),{passive:true});
const panel=$('#searchPanel'),input=$('#search'),results=$('#results');
$('#searchOpen').onclick=()=>{panel.classList.add('open');setTimeout(()=>input.focus(),50)};
$('#searchClose').onclick=()=>panel.classList.remove('open');
document.addEventListener('keydown',e=>{if(e.key==='Escape')panel.classList.remove('open')});
const cards=$$('.song-card');
function search(q=''){q=q.toLowerCase().trim();const m=cards.filter(c=>!q||c.dataset.search.includes(q));results.innerHTML=m.length?m.map(c=>`<a class="result" href="#songs"><b>${c.querySelector('h3').textContent}</b><small>${c.querySelector('small').textContent}</small></a>`).join(''):'<div class="result">Tidak ditemukan.</div>'}
input.oninput=e=>search(e.target.value);search();
$$('.play').forEach(b=>b.onclick=()=>{const c=b.closest('.song-card');b.textContent='❚❚';setTimeout(()=>b.textContent='▶',900);});
const tr={id:{home:'Beranda',songs:'Lagu',genres:'Genre',map:'Peta Musik',about:'Tentang',hero:'Temukan lagu yang pas buat belajar, jalan sore, ngobrol, atau menikmati waktu sendiri.',collection:'Playlist untuk suasana chill, dreamy, happy, dan sedikit nostalgic.',about:'Wimusikal adalah ruang kecil untuk menemukan lagu, mood, dan cerita yang terasa dekat dengan kehidupan sehari-hari.'},en:{home:'Home',songs:'Songs',genres:'Genres',map:'Music Map',about:'About',hero:'Find songs for studying, afternoon walks, hanging out, or enjoying your own time.',collection:'Curated playlists for chill, dreamy, happy, and slightly nostalgic moments.',about:'Wimusikal is a little space to discover songs, moods, and stories close to everyday life.'}};
let lang=localStorage.getItem('wimusikal-lang')||'id';function apply(){const t=tr[lang];$$('[data-i18n]').forEach(e=>e.textContent=t[e.dataset.i18n]);$('#lang').textContent=lang==='id'?'ID / EN':'EN / ID'}$('#lang').onclick=()=>{lang=lang==='id'?'en':'id';localStorage.setItem('wimusikal-lang',lang);apply()};apply();
$$('img').forEach(img=>img.onerror=()=>{img.style.opacity='0';img.parentElement.style.background='radial-gradient(circle at 30% 20%,rgba(180,140,255,.5),transparent 35%),linear-gradient(135deg,#2a173b,#11101c)'});
