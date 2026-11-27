// v4.71: keep visual navigation, concise operational UI and readable type.
icons458['마을']='city'; icons458['마을 지도']='city'; icons458['장비']='sword'; icons458['재정·시설']='guild';
const render471base=render;
render=function(){
 render471base(); if(!state||batch34||state.dialogue||state.final437)return;
 const m=$('main'); if(!m)return;
 if(screen==='길드'){
  const hero=m.querySelector('.lifehero40'); const bg=hero?.querySelector('.scene30');
  if(bg){bg.onerror=function(){this.onerror=null;this.src='assets/scenes/new-guild.webp'}; if(!life34().run && guildStage433()==='새로운 출발') bg.src='assets/scenes/new-guild.webp';}
  const label=hero?.querySelector('.heroLabel40'); if(label&&!life34().run){label.querySelector('span')?.remove(); label.querySelector('small')?.remove();}
  m.querySelectorAll('.menu40 button').forEach(b=>{const t=b.textContent.trim(); if(t==='마을'||t==='외출'){b.setAttribute('aria-label','마을'); if(!b.querySelector('.art458'))b.prepend(image458('city'));b.classList.add('icon458');}});
  m.querySelector('.mission421 > .row > small')?.remove();
 }
 if(screen==='외출'){
  const map=m.querySelector('.mapart420'); if(map)map.onerror=function(){this.onerror=null;this.src='assets/scenes/new-city.webp'};
 }
 m.querySelectorAll('.townguide421,.board421-note').forEach(e=>e.remove());
 // Keep story, warnings, task requirements and player decisions intact.
 m.querySelectorAll('p').forEach(e=>{if(['일상 업무는 직원들이 처리합니다.','마을 지도의 장소를 눌러 방문하세요. 방문한 장소에서 주민과 대화하고 상품을 확인할 수 있습니다.'].includes(e.textContent.trim()))e.remove()});
}; render();
