
const audio = document.getElementById('audio');
const cover = document.getElementById('cover');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const fill = document.getElementById('fill');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

let i = 0;
let playing = false;

const playlist = [
{ title:'Largado às Traças', artist:'Zé Neto & Cristiano', src:'musicas/zeneto.mp3', cover:'capas/zeneto.jpg' },
{ title:'Infiel', artist:'Marília Mendonça', src:'musicas/marilia.mp3', cover:'capas/marilia.jpg' },
{ title:'Cê Que Sabe', artist:'Cristiano Araújo', src:'musicas/cristiano.mp3', cover:'capas/cristiano.jpg' }
];

function formatTime(time){
  if(!time) return '0:00';
  const m=Math.floor(time/60);
  const s=Math.floor(time%60).toString().padStart(2,'0');
  return `${m}:${s}`;
}

audio.addEventListener('timeupdate', () => {
  if(!audio.duration) return;
  const percent = (audio.currentTime / audio.duration) * 100;
  fill.style.width = percent + '%';
  currentTimeEl.innerText = formatTime(audio.currentTime);
  durationEl.innerText = formatTime(audio.duration);
});

function seek(e){
  const bar = e.currentTarget;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / bar.offsetWidth) * audio.duration;
}

function play(index){
  i=index;
  audio.src=playlist[i].src;
  cover.src=playlist[i].cover;
  title.innerText=playlist[i].title;
  artist.innerText=playlist[i].artist;
  audio.play();
  playing=true;
}

function toggle(){
  if(!audio.src) play(i);
  else playing ? audio.pause() : audio.play();
  playing = !playing;
}

function next(){ play((i+1)%playlist.length); }
function prev(){ play((i-1+playlist.length)%playlist.length); }
