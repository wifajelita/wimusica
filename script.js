const nav=document.querySelector('.navbar');
const items=document.querySelectorAll('.reveal');
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.12});
items.forEach(x=>io.observe(x));
addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>18));
document.querySelectorAll('.magnetic').forEach(b=>{
 b.addEventListener('pointermove',e=>{if(innerWidth<=700)return;const r=b.getBoundingClientRect();const x=(e.clientX-r.left-r.width/2)*.12,y=(e.clientY-r.top-r.height/2)*.12;b.style.transform=`translate(${x}px,${y}px)`});
 b.addEventListener('pointerleave',()=>b.style.transform='');
});
document.querySelectorAll('.song-card').forEach(c=>{
 c.addEventListener('pointermove',e=>{if(innerWidth<=700)return;const r=c.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(700px) rotateX(${y*-2.5}deg) rotateY(${x*3}deg) translateY(-9px)`});
 c.addEventListener('pointerleave',()=>c.style.transform='');
});
