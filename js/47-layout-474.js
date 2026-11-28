/* v4.74 approved game layout */
(function(){
const original=render;
// Mood follows actual character condition, never the selected menu.
jiaExpression=function(){try{if(!state)return 'neutral';const l=life34(),energy=init32().energy,stress=l.stats.스트레스??0;if(energy<35)return 'tired';if(stress>=80)return 'sad';if(state.dialogue?.kind==='intro')return 'happy';return 'neutral'}catch(e){return 'neutral'}};
function orientation475(){
 const rotated=matchMedia('(orientation: portrait)').matches&&(matchMedia('(pointer: coarse)').matches||navigator.maxTouchPoints>0);
 document.documentElement.classList.toggle('autoLandscape482',rotated);
 const app=$('#app');if(app)app.inert=false;
}
window.addEventListener('resize',orientation475);window.addEventListener('orientationchange',orientation475);orientation475();

function element(tag,cls,html){const x=document.createElement(tag);x.className=cls;if(html!==undefined)x.innerHTML=html;return x}
function action(label,fn,icon){const b=element('button','nav474');b.type='button';if(icon){const i=element('img','');i.src='assets/ui/'+icon+'.webp';i.alt='';b.append(i)}b.append(element('span','',label));b.onclick=fn;return b}
function panelTabs(){const t=element('div','tabs474');for(const [label,fn] of [['의뢰',()=>quest419('open')],['이벤트',()=>go('이야기')],['마을',()=>go('외출')],['기타',()=>go('더보기')]]){const b=action(label,fn);if((label==='의뢰'&&['길드','의뢰'].includes(screen))||(label==='이벤트'&&screen==='이야기')||(label==='마을'&&['외출','마을 교류'].includes(screen))||(label==='기타'&&screen==='더보기'))b.classList.add('active474');t.append(b)}return t}
function freshPlan(){const p=element('section','plan40');p.append(element('h2','','월간 일정'));const w=element('div','weeks40');life34().schedule.forEach((v,i)=>{const l=element('label','');const b=action(esc(v)+' ▾',()=>pickSlot419(i));b.className='slot419';const im=element('img','activity43');im.src=scenes30[lifeActivities40[v]?.[1]||'guild'];im.alt='';l.append(im,element('small','',(i+1)+'주'),b);w.append(l)});p.append(w);const b=action('이번 달 시작 ▸',()=>{go('길드');begin34()});b.className='primary wide';p.append(b);return p}
render=function(){original();const app=$('#app'),m=$('main');if(!app)return;app.classList.remove('layout474','detail475'); if(!state){const v=app.querySelector('.title small');if(v)v.textContent='v5.07 · 길의 등불';} orientation475();if(!state||!m||batch34||state.dialogue||state.final437)return;
const home=screen==='길드',l=life34(),stage=m.querySelector('.stage43'),controls=m.querySelector('.controls43');if(home&&(!stage||!controls))return;
const hero=stage?.querySelector('.lifehero40'),oldMeters=stage?.querySelector('.meters40');const bg=hero?.querySelector('.scene30')?.getAttribute('src')||'assets/scenes/new-guild.webp';
const art=element('div','art474');if(hero){const j=hero.querySelector('.jia40');if(j)art.append(j);const label=hero.querySelector('.heroLabel40');if(label)art.append(label)}else{art.innerHTML='<div class="jia40 standing45">'+portrait('지아 메르벨')+'</div><div class="heroLabel40"><h1>지아 메르벨</h1><span>'+esc(guildStage433())+'</span><small>남은 기간 '+Math.max(0,1200-Math.floor(state.time/1440))+'일</small></div>'}
const meters=oldMeters||element('div','meters40',meter40('체력',l.stats.체력)+meter40('기력',init32().energy)+meter40('스트레스',l.stats.스트레스));art.prepend(meters);
const right=element('section','right474'),panel=element('div','panel474'),body=element('div','body474'),bottom=element('div','schedule474'),nav=element('div','navGrid474');
let plan=controls?.querySelector('.plan40');if(plan){plan.querySelector('h2').textContent='월간 일정';bottom.append(plan)}
if(home){const dock=controls.querySelector('.dock472');const menu=dock?.querySelector('.menu40');if(menu){for(const b of [...menu.querySelectorAll('button')]){const label=b.getAttribute('aria-label')||b.textContent.trim();const img=b.querySelector('img');if(!img)continue;const s=element('span','label474',esc(label));b.replaceChildren(img,s);nav.append(b)}}const extra=dock?.querySelector('.homeExtra444');if(extra){const q=extra.querySelector('.quiet40');if(q){q.classList.add('extra474');body.append(q);q.hidden=true}}dock?.remove();for(const ch of [...controls.children]){if(ch!==plan)body.append(ch)}const rep=body.querySelector('.reports472');if(rep){rep.open=true;const inner=rep.querySelector('.mission421');if(inner)inner.style.display='block'}if(!body.querySelector('.quest419')&&!body.textContent.trim())body.append(element('p','empty474','새로운 소식을 기다리고 있어요.'))}
else{for(const ch of [...m.children])body.append(ch);/* Detail screens reserve the full panel for gameplay; monthly scheduling is on home. */}
if(!nav.children.length){for(const [n,k,s] of [['능력치','magic','능력치'],['마을','city','외출'],['직원','users','직원'],['소지품','bag','소지품'],['길드 운영','guild','길드 운영']]){const b=action(n,()=>go(s),k);b.disabled=!!(l.run||blocked34()||!state.introDone);nav.append(b)}}
if(!bottom.children.length){const b=action(home?'월간 일정':'길드 · 월간 일정',()=>go('길드'));bottom.append(b)}
const wallet=element('div','wallet474','<span>보유금</span> <strong>'+money(l.wallet)+'</strong>');panel.append(panelTabs(),body);right.append(wallet,panel,bottom);
const left=element('div','left474');left.append(art,nav);m.replaceChildren(left,right);m.style.setProperty('--bg474','url("'+bg+'")');app.classList.add('layout474');app.classList.toggle('detail475',!home);
const h=app.querySelector('header');if(h){const e=h.querySelector('.eyebrow');if(e){e.replaceChildren(element('div','brand474','<strong>길의 등불</strong><small>'+month40()+'</small>'));const links=element('div','header474');links.append(action('기록',()=>go('인생 기록')),action('생활',()=>lifePage424('요리')),action('설정',()=>go('더보기')));if(l.run||blocked34())links.querySelectorAll('button').forEach(b=>b.disabled=true);e.append(links)}h.querySelector('.hud')?.remove();}
const version=app.querySelector('.title small');if(version)version.textContent='v5.07 · 길의 등불';
};render();
})();

/* v4.75: readable mission reports and wider landscape play */
(function(){
 const previousFinish=finish;
 finish=function(q){const before=queue19.length;previousFinish(q);for(const item of queue19.slice(before)){if(item.name!==q.name)continue;item.questId=q.id;item.report=(q.report||[]).slice(-5).map(x=>x.text);if(q.status==='success'&&!q.trade)item.text='성공 · 길드 수수료 '+money(Math.floor(q.reward*(q.feeAtDispatch??state.fee)/100));else if(q.status==='failed')item.text='실패 · 예치금 반환';}};
 const previousIssue=issue;
 issue=function(q,t,urgent=false){const before=queue19.length;previousIssue(q,t,urgent);if(urgent)for(const item of queue19.slice(before)){item.questId=q.id;item.report=(q.report||[]).slice(-4).map(x=>x.text)}};
 function labelMood(p){if(!p)return '';const morale=p.social?.morale??p.morale??60;let reasons=[];if(p.arrears>0)reasons.push('급여 체불');if((p.hp??100)<65)reasons.push('부상·건강 저하');if((p.fatigue??0)>=65)reasons.push('피로 누적');if(morale<35){reasons.push('사기 '+Math.round(morale)+'/100');if(state.facility<20)reasons.push('시설 상태 저하');}return reasons.join(' · ')}
 const previous=render;
 render=function(){previous();const app=$('#app');if(!app)return;app.classList.toggle('detail475',!!state&&screen!=='길드'&&!state.dialogue&&!state.final437);if(!state)return;
 const box=app.querySelector('.result19');if(box){const rows=box.querySelectorAll('.resultRow472');rows.forEach((row,i)=>{const x=resultsVisible472[i];if(!x)return;const q=state.quests.find(q=>q.id===x.questId)||[...state.quests].reverse().find(q=>q.name===x.name&&['success','failed','missing','delayed'].includes(q.status));const lines=x.report||q?.report?.slice(-5).map(r=>r.text)||[];if(lines.length){const detail=document.createElement('div');detail.className='reason475';detail.textContent=lines.join(' / ');row.append(detail)}if(q?.status==='failed'){const p=document.createElement('small');p.className='reason475';p.textContent='의뢰 실패로 참여 모험가의 사기가 감소할 수 있습니다.';row.append(p)}})}
 const d=state.dialogue;if(d){const p=state.economy?.staff?.find(p=>p.name===d.name)||state.people.find(p=>p.name===d.name);const reason=labelMood(p);const art=app.querySelector('.dialogue-art');if(reason&&art){const s=document.createElement('div');s.className='mood475';s.textContent=reason;art.append(s)}}
 app.querySelectorAll('.staff419 section').forEach((el,i)=>{const reason=labelMood(state.economy?.staff?.[i+1]);if(reason){const s=document.createElement('small');s.className='mood475';s.textContent=reason;el.querySelector('div')?.append(s)}});
 };render();
})();

/* v4.76: compact chrome, preserve character area */
(function(){
const previous=render;
render=function(){previous();const app=$('#app');if(!app?.classList.contains('layout474')||!state)return;
 const m=app.querySelector('main'),wallet=m?.querySelector('.wallet474'),header=app.querySelector('.header474');if(wallet&&header)header.prepend(wallet);
 const art=m?.querySelector('.art474'),label=art?.querySelector('.heroLabel40');if(label&&!label.querySelector('small')){const s=document.createElement('small');s.textContent='남은 기간 '+Math.max(0,1200-Math.floor(state.time/1440))+'일';label.append(s)}
 const tabs=m?.querySelector('.tabs474');if(tabs&&!tabs.querySelector('.home476')){const b=document.createElement('button');b.className='home476';b.type='button';b.textContent='길드';b.onclick=()=>go('길드');if(screen==='길드')b.classList.add('active474');tabs.prepend(b)}
 const bottom=m?.querySelector('.schedule474');if(screen!=='길드'&&bottom&&!bottom.querySelector('.plan40'))bottom.hidden=true;
 const extra=m?.querySelector('.extra474');if(extra){const b=document.createElement('button');b.type='button';b.className='more476';b.textContent='더보기';b.onclick=()=>{extra.hidden=!extra.hidden;b.setAttribute('aria-expanded',String(!extra.hidden))};b.setAttribute('aria-expanded','false');tabs?.after(b)}
};render();
})();

/* v4.77: landscape RPG home, fixed navigation and dedicated planning */
(function(){
const prev=render;
let planning=false;
function el(tag,cls,txt){const x=document.createElement(tag);x.className=cls||'';if(txt!==undefined)x.textContent=txt;return x}
function button(label,fn,src,sub){const b=el('button','tile477');b.type='button';if(src){const i=el('img');i.src=src;i.alt='';i.onerror=()=>{i.onerror=null;i.src='assets/scenes/new-guild.webp'};b.append(i)}const t=el('span','name477',label);b.append(t);if(sub)b.append(el('small','sub477',sub));b.onclick=fn;return b}
function leave(s){planning=false;go(s)}
function openPlan(){planning=true;go('길드')}
function quest(){planning=false;quest419('open')}
function caption(l){if(blocked34())return '먼저 진행 중인 사건을 확인해 보자.';if(l.run)return '이번 달 일정을 진행하고 있어.';if(l.last)return '한 달 동안의 결과를 확인하자.';if(init32().energy<35)return '조금 지쳤어. 휴식도 필요하겠지.';if((l.stats.스트레스||0)>=80)return '잠시 마음을 가라앉힐 시간이 필요해.';return '이번 달에는 무엇을 해 볼까?'}
render=function(){
 prev();const app=$('#app');if(!app)return;app.classList.remove('rpg477','home477','planning477');if(!state||!app.classList.contains('layout474')||state.dialogue||state.final437){planning=false;return}
 const m=app.querySelector('main'),left=m?.querySelector('.left474'),right=m?.querySelector('.right474'),art=left?.querySelector('.art474'),panel=right?.querySelector('.panel474'),body=panel?.querySelector('.body474');if(!m||!left||!right||!art||!panel||!body)return;
 const l=life34(),home=screen==='길드',plan=right.querySelector('.schedule474 .plan40'),ready=home&&!!plan&&!l.run&&!blocked34()&&!l.last&&state.introDone;
 if(!home||!ready)planning=false;
 app.classList.add('rpg477');app.classList.toggle('home477',ready&&!planning);app.classList.toggle('planning477',ready&&planning);
 const h=app.querySelector('header .eyebrow'),links=h?.querySelector('.header474'),wallet=links?.querySelector('.wallet474')||right.querySelector('.wallet474');
 const meters=art.querySelector('.meters40');
 if(h&&links){const stats=el('div','stats477');if(meters)stats.append(meters);if(wallet)stats.append(wallet);links.replaceWith(stats)}
 const label=art.querySelector('.heroLabel40');if(label&&home){label.replaceChildren(el('h1','','지아 메르벨'),el('p','line477',caption(l)),el('small','','남은 기간 '+Math.max(0,1200-Math.floor(state.time/1440))+'일'))}
 left.querySelector('.navGrid474')?.remove();
 const tabs=panel.querySelector('.tabs474');tabs?.remove();panel.querySelector('.more476')?.remove();
 const extra=body.querySelector('.extra474');if(extra)extra.hidden=true;
 if(ready&&!planning){const grid=el('div','cards477');const n=state.quests.filter(q=>q.status==='open').length;grid.append(button('생활',()=>{planning=false;lifePage424('요리')},scenes30.rest),button('월간 일정',openPlan,scenes30.study,'이번 달 계획'),button('마을 교류',()=>leave('외출'),scenes30.city),button('길드 관리',()=>leave('길드 운영'),scenes30.guild));panel.replaceChildren(grid);right.querySelector('.schedule474')?.remove();}
 else if(ready&&planning){const p=el('div','heading477');p.append(el('h2','','월간 일정'),button('닫기',()=>{planning=false;render()}));panel.replaceChildren(p,plan);right.querySelector('.schedule474')?.remove();}
 else{const p=el('div','heading477');p.append(el('h2','',home?'길드 소식':screen));if(!home)p.append(button('홈',()=>leave('길드')));panel.prepend(p);if(home&&extra&&extra.children.length){extra.hidden=false;body.append(extra)}right.querySelector('.schedule474')?.remove();}
 const old=app.querySelector('.dock477');old?.remove();const dock=el('div','dock477');dock.setAttribute('aria-label','주 메뉴');
 const locked=!!(l.run||blocked34());
 const entries=[['홈','길드','home',()=>leave('길드')],['마을','외출','city',()=>leave('외출')],['관리','길드 운영','guild',()=>leave('길드 운영')],['소지품','소지품','bag',()=>leave('소지품')],['메뉴','더보기','settings',()=>leave('더보기')]];
 for(const [n,s,k,fn] of entries){const b=button(n,fn,'assets/ui/'+k+'.webp');if(screen===s)b.classList.add('selected477');b.disabled=locked&&!['길드','의뢰'].includes(s);dock.append(b)}
 app.append(dock);
 if(screen==='더보기'){const quick=el('div','quick477');for(const [n,fn] of [['능력치',()=>leave('능력치')],['마을',()=>leave('외출')],['길드 운영',()=>leave('길드 운영')],['생활',()=>{planning=false;lifePage424('요리')}],['인생 기록',()=>leave('인생 기록')],['신문',()=>leave('신문')]])quick.append(button(n,fn));body.prepend(quick)}
 const oldNav=app.querySelector('nav:not(.dock477)');if(oldNav)oldNav.hidden=true;
};render();
})();

/* v4.79: home-only Jia; full content and visual-novel dialogue */
(function(){
const previous=render;
let lastTalk480=null, topics480=[];
render=function(){
 previous();const app=$('#app');if(!app)return;
 if(!state?.dialogue){lastTalk480=null;topics480=[]}
 app.classList.remove('full479','talk479','intro479');
 if(!state||batch34||state.final437)return;
 if(state.dialogue){
  const box=app.querySelector('.dialogue'),art=box?.querySelector('.dialogue-art'),speech=box?.querySelector('.dialogue-text'),stage=box?.querySelector('.vnStage422');
  if(!box||!art||!speech||!stage)return;
  app.classList.add('talk479');app.classList.toggle('intro479',state.dialogue.kind==='intro');
  const img=art.querySelector('img');if(img){img.addEventListener('load',()=>{art.classList.toggle('wideSprite479',img.naturalWidth>=img.naturalHeight)},{once:true});if(img.complete)art.classList.toggle('wideSprite479',img.naturalWidth>=img.naturalHeight)}

  return;
 }
 if(!app.classList.contains('rpg477'))return;
 if(screen==='길드'&&!app.classList.contains('planning477'))return;
 const m=app.querySelector('main'),left=m?.querySelector('.left474');if(!m||!left)return;
 app.classList.add('full479');left.remove();
 const heading=m.querySelector('.heading477');if(heading){const duplicate=[...heading.querySelectorAll('button')].find(b=>b.textContent.trim()==='홈');duplicate?.remove()}
};render();
})();

/* v4.81: measure artwork bounds instead of scaling transparent padding */
(function(){
const prev=render,cache=new Map();
function fit(img,stage){
 if(!img.naturalWidth||!stage.clientHeight)return;
 let bounds=cache.get(img.currentSrc||img.src);
 if(!bounds){
  try{const c=document.createElement('canvas');c.width=160;c.height=Math.max(1,Math.round(160*img.naturalHeight/img.naturalWidth));const ctx=c.getContext('2d',{willReadFrequently:true});ctx.drawImage(img,0,0,c.width,c.height);const data=ctx.getImageData(0,0,c.width,c.height).data;let x0=c.width,y0=c.height,x1=-1,y1=-1;for(let y=0;y<c.height;y++)for(let x=0;x<c.width;x++){if(data[(y*c.width+x)*4+3]>45){x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y)}}if(x1>=0)bounds={x0:x0/c.width,x1:(x1+1)/c.width,y0:y0/c.height,y1:(y1+1)/c.height};}catch(e){}
  bounds=bounds||{x0:0,x1:1,y0:0,y1:1};cache.set(img.currentSrc||img.src,bounds);
 }
 const H=stage.clientHeight,W=stage.clientWidth,visibleH=Math.max(.1,bounds.y1-bounds.y0),visibleW=Math.max(.1,bounds.x1-bounds.x0);
 const cropped=(img.naturalWidth/img.naturalHeight)*(visibleW/visibleH)>.85;
 const artHeight=H*(cropped?1.05:1.65)/visibleH;
 const artWidth=artHeight*img.naturalWidth/img.naturalHeight;
 img.style.setProperty('height',artHeight+'px','important');img.style.setProperty('width',artWidth+'px','important');
 img.style.setProperty('top',(H*.025-artHeight*bounds.y0)+'px','important');
 img.style.setProperty('left',(W/2-artWidth*(bounds.x0+bounds.x1)/2)+'px','important');img.style.setProperty('transform','none','important');
}
function refresh(){const stage=document.querySelector('#app.talk479 .vnStage422'),img=stage?.querySelector('.dialogue-art img');if(!img)return;const run=()=>fit(img,stage);if(img.complete)requestAnimationFrame(run);else img.addEventListener('load',()=>requestAnimationFrame(run),{once:true});}
render=function(){prev();refresh()};window.addEventListener('resize',refresh);render();
})();

/* v4.83: always-visible conversation controls, independent of speech overflow */
(function(){
const prev=render;
render=function(){
 prev();const app=$('#app'),d=state?.dialogue;if(!app?.classList.contains('talk479')||!d||d.kind==='intro')return;
 const stage=app.querySelector('.vnStage422'),speech=stage?.querySelector('.dialogue-text');if(!speech)return;
 const bar=document.createElement('div');bar.className='talkActions483';
 const add=(label,fn)=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.onclick=fn;bar.append(b)};
 const footer=speech.querySelector('.vnFooter427');
 if(footer){for(const b of [...footer.querySelectorAll('button')]){const code=b.getAttribute('onclick')||'';if(code.includes('nextTalk')||code.includes('endTalk'))b.hidden=true}}
 if(d.step===1)add('다음 대사 ›',()=>nextTalk());
 add('대화 마치기',()=>endTalk());
 stage.append(bar);
};render();
})();

/* v4.84: actionable quest inbox, archive in settings, compact staff overview */
(function(){
const prev=render;
function node(tag,cls,txt){const e=document.createElement(tag);e.className=cls||'';if(txt!==undefined)e.textContent=txt;return e}
function btn(txt,fn){const b=node('button','',txt);b.type='button';b.onclick=fn;return b}
function inbox(){showStory(state.story.pending?'사건':'메인 이야기')}

render=function(){
 prev();const app=$('#app');if(!app)return;app.classList.remove('staff484','quest484','archive484','compact484');
 if(!state||!app.classList.contains('rpg477')||state.dialogue||state.final437)return;
 app.classList.add('compact484');
 const body=app.querySelector('.body474'),art=app.querySelector('.art474'),heading=app.querySelector('.heading477');
 if(art&&!app.classList.contains('full479')){
  const b=btn('',inbox);b.className='mail484';b.setAttribute('aria-label','퀘스트');b.title='퀘스트';
  const i=node('img');i.src='assets/ui/mail.webp';i.alt='';b.append(i);art.append(b);
 }
 if(screen==='이야기'&&body){
  const archive=storyTab==='연대기';app.classList.add(archive?'archive484':'quest484');
  const h=heading?.querySelector('h2');if(h)h.textContent=archive?'연대기':'퀘스트';
  const tabs=body.querySelector('.story-tabs');if(tabs){const prev=tabs.previousElementSibling;if(prev?.matches('p.muted'))prev.remove();const title=tabs.previousElementSibling;if(title?.matches('h2'))title.remove();tabs.remove()}
  if(!archive){
   const cards=[...body.querySelectorAll(':scope > .card')];
   if(storyTab==='메인 이야기')for(const card of cards){const small=card.querySelector(':scope > small');if(small&&['완료','진행 중','미해금'].includes(small.textContent.trim()))card.remove()}
   const switcher=node('div','questSwitch484');
   if(state.story.pending&&storyTab!=='사건')switcher.append(btn('확인할 사건',()=>showStory('사건')));
   if(storyTab==='사건')switcher.append(btn('진행 중인 퀘스트',()=>showStory('메인 이야기')));
   if(switcher.children.length)body.prepend(switcher);
  }else{heading?.append(btn('설정',()=>go('더보기')))}
 }
 if(screen==='더보기'&&body){
  const buttons=[...body.querySelectorAll('button')];for(const b of buttons)if(['메인 이야기','메인 스토리'].includes(b.textContent.trim()))b.remove();
  const quick=body.querySelector('.quick477')||body;quick.prepend(btn('연대기',()=>showStory('연대기')));
 }
 if(screen==='의뢰'&&body&&state.story.pending){body.prepend(btn('확인할 사건',()=>showStory('사건')))}
 if(screen==='직원'&&body){
  app.classList.add('staff484');body.querySelector('.back32')?.remove();const grid=body.querySelector('.staff419');if(grid){const title=grid.previousElementSibling;if(title?.matches('h2'))title.remove();for(const card of grid.querySelectorAll('section')){const info=card.querySelector(':scope > div');const extra=card.querySelector('.staffStory439');if(info&&extra&&extra!==info)info.append(extra)}}
 }
 
};render();
})();

/* v4.86: fixed content frame, sliding lists only */
(function(){
const previous=render,railPositions489=new Map();
function el(tag,cls,t){const e=document.createElement(tag);e.className=cls||'';if(t!==undefined)e.textContent=t;return e}
function button(t,fn){const b=el('button','',t);b.type='button';b.onclick=fn;return b}
function swipe(target,prev,next){let start=null,block=0;const xy=t=>document.documentElement.classList.contains('autoLandscape482')?[t.clientY,-t.clientX]:[t.clientX,t.clientY];target.addEventListener('touchstart',e=>{start=e.touches.length===1&&!e.target.closest('input,select,textarea')?xy(e.touches[0]):null},{passive:true});target.addEventListener('touchmove',e=>{if(!start)return;let [x,y]=xy(e.touches[0]);if(Math.abs(x-start[0])>15&&Math.abs(x-start[0])>Math.abs(y-start[1])*1.2)e.preventDefault()},{passive:false});target.addEventListener('touchend',e=>{if(!start)return;let [x,y]=xy(e.changedTouches[0]),dx=x-start[0],dy=y-start[1];start=null;if(Math.abs(dx)>30&&Math.abs(dx)>Math.abs(dy)*1.2){block=Date.now()+350;(dx<0?next:prev)()}},{passive:true});target.addEventListener('touchcancel',()=>start=null);target.addEventListener('click',e=>{if(Date.now()<block){e.preventDefault();e.stopImmediatePropagation()}},true)}
function rail(parent,items,count){
 if(!items.length)return;
 const wrap=el('div','list486'),viewport=el('div','viewport486'),track=el('div','track486');viewport.append(track);
 items[0].before(wrap);wrap.append(viewport);
 items.forEach(x=>{x.hidden=false;track.append(x)});
 track.style.setProperty('--count486',count);
 const railKey=screen+'|'+parent.className+'|'+(screen==='의뢰'?questTab22:'');let max=Math.max(0,items.length-count),index=Math.min(max,railPositions489.get(railKey)||0);
 const prev=button('‹',()=>move(-1)),next=button('›',()=>move(1));prev.className='prev486';next.className='next486';prev.setAttribute('aria-label','이전 항목');next.setAttribute('aria-label','다음 항목');wrap.append(prev,next);
 function move(d){index=Math.max(0,Math.min(max,index+d));railPositions489.set(railKey,index);const step=(track.children[0]?.offsetWidth||0)+6;track.style.transform='translateX('+(-index*step)+'px)';prev.disabled=index===0;next.disabled=index===max;prev.hidden=next.hidden=max===0}
 swipe(viewport,()=>move(-1),()=>move(1));move(0);requestAnimationFrame(()=>move(0));
}
function detailsButton(d){const b=button(d.querySelector('summary')?.textContent.trim()||'안내',()=>{const modal=el('dialog','info486');const close=button('닫기',()=>modal.close());const content=el('div','infoBody486');const original=[...d.children].filter(e=>e.tagName!=='SUMMARY');original.forEach(e=>content.append(e));modal.append(content,close);document.body.append(modal);modal.addEventListener('close',()=>{original.forEach(e=>d.append(e));modal.remove()},{once:true});modal.showModal()});b.className='infoButton486';d.before(b);d.hidden=true;return b}
render=function(){
 previous();const app=$('#app');if(!app)return;app.classList.remove('frame486','questList486','questDetail486');
 if(!state||!app.classList.contains('full479')||state.dialogue||state.final437)return;
 const body=app.querySelector('.body474'),head=app.querySelector('.heading477');if(!body)return;app.classList.add('frame486');
 const tools=el('div','tools486');head?.append(tools);
 if(screen==='의뢰'){
  body.querySelectorAll('.back32,.board421-note').forEach(e=>e.remove());
  const tabs=body.querySelector('.tabs22');if(tabs)tools.append(tabs);
  const detail=selectedQuest&&body.querySelector('button[onclick^="dispatch("]')?.closest('.card');
  if(detail){
   app.classList.add('questDetail486');
   const q=state.quests.find(q=>q.id===selectedQuest);
   const back=button('‹ 목록',()=>{selectedQuest=null;render()});tools.prepend(back);
   // Move the actual dispatch form, keeping the existing IDs, handlers and rules.
   const form=el('div','dispatch486'),info=el('section','questInfo486'),actions=el('section','questActions486');
   const img=el('img','questImage486');img.src=scenes30[q?.type==='채집'?'study':q?.type==='토벌'?'training':'quest'];img.alt='';info.append(img);
   let inForm=false;
   for(const ch of [...detail.children]){if(ch.matches('label,details,select,input,button')||ch.textContent.includes('파견 인원')||ch.textContent.includes('식량 필요'))inForm=true;(inForm?actions:info).append(ch)}
   const party=el('div','party487'),policy=el('div','policy487'),footer=el('div','dispatchFooter487');
   for(const lab of [...actions.querySelectorAll('label')]){if(lab.querySelector('input[name="party"]'))party.append(lab)}
   for(const item of [...actions.children]){if(item.matches('details,select,label')&&!item.querySelector('input[name="party"]'))policy.append(item);else if(item.matches('button')||item.textContent.includes('식량 필요'))footer.append(item)}
   if(party.children.length)actions.append(party);
   if(policy.children.length){for(const d of policy.querySelectorAll('details')){d.open=true;d.querySelector('summary')?.remove()}actions.append(policy)}
   if(footer.children.length)actions.append(footer);
   form.append(info,actions);body.replaceChildren(form);
   return;
  }
  app.classList.add('questList486');
  for(const d of [...body.children].filter(x=>x.matches('details.extra444,details.fold22,details.group21')))tools.append(detailsButton(d));
  const grid=body.querySelector('.quests444');
  if(grid){
   grid.querySelectorAll('.pager444').forEach(e=>e.remove());
   const cards=[...grid.querySelectorAll('.quest23')];
   for(const card of cards){
    const name=card.querySelector('.qtext23 b')?.textContent;const q=state.quests.find(x=>x.name===name&&x.status==='open');
    const img=el('img','questImage486');img.src=scenes30[q?.type==='채집'?'study':q?.type==='토벌'?'training':q?.type==='호위'?'travel':'quest'];img.alt='';card.prepend(img);
   }
   body.querySelectorAll(':scope > h2').forEach(e=>e.remove());
   rail(grid,cards,4);
  }else if(questTab22==='active'){const cards=[...body.children].filter(e=>!e.hidden&&e.matches('.card,details.card,.mission421'));if(cards.length)rail(body,cards,3)}
 }else{
  body.querySelectorAll('.pager444').forEach(p=>{const parent=p.parentElement;const items=[...parent.children].filter(e=>e!==p);p.remove();if(items.length)rail(parent,items,4)});
  body.querySelectorAll('.invPager459').forEach(p=>{p.querySelector('small')?.remove();const bs=p.querySelectorAll('button');if(bs.length===2){const g=body.querySelector('.invGrid459');if(g)swipe(g,()=>{if(!bs[0].disabled)bs[0].click()},()=>{if(!bs[1].disabled)bs[1].click()});if(bs[0].disabled&&bs[1].disabled)p.hidden=true}});
  if(screen==='이야기'&&storyTab!=='연대기')body.querySelectorAll(':scope > h2').forEach(e=>e.remove());
 }
};render();
})();

/* v4.87: compact fixed feature frames */
(function(){
const prev=render;
render=function(){
 prev();const app=$('#app');app?.classList.remove('inventory487','operation487');if(!state||!app?.classList.contains('frame486')||state.dialogue)return;
 const body=app.querySelector('.body474'),head=app.querySelector('.heading477');if(!body||!head)return;
 body.querySelectorAll(':scope > .back32').forEach(b=>b.remove());
 const h=head.querySelector('h2');
 for(const x of [...body.children])if(x.matches('h2')&&x.textContent.trim()===h?.textContent.trim())x.remove();
 if(screen==='소지품'){
  app.classList.add('inventory487');
  const inv=body.querySelector('.invHead459');if(inv){inv.querySelector('h2')?.remove();inv.remove()}
  const tabs=body.querySelector('.invTabs459');if(tabs)head.querySelector('.tools486')?.append(tabs);
 }
 if(screen==='길드 운영'){
  app.classList.add('operation487');
  const menu=body.querySelector('.menu40');if(menu)menu.classList.add('operationGrid487');
 }
};render();
})();

/* v4.88: direct dialogue actions, stable randomized topic IDs and correct return screen */
(function(){
const originalLines=linesFor;
linesFor=function(d){
 if(!d||d.kind==='intro')return originalLines(d);
 if(d.talkSnapshot488&&Array.isArray(d.talkSnapshot488.q))return d.talkSnapshot488;
 const t=originalLines(d);if(!t)return t;
 if(d===state?.dialogue)d.talkSnapshot488={g:t.g,q:t.q.map(x=>[...x])};
 return d.talkSnapshot488||t;
};
const start=dialogueStart;
dialogueStart=function(d){
 if(d.kind==='staff'&&!state.dialogue)d.returnTo=screen;
 return start(d);
};
function randomTopics488(d,t,rng=Math.random){
 if(!Array.isArray(d.topicIds488)){
  const ids=t.q.map((_,i)=>i).filter(i=>!d.asked.includes(i));
  for(let i=ids.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[ids[i],ids[j]]=[ids[j],ids[i]]}
  const memory=state.talkMemory?.[d.kind==='member'||d.kind==='interview'?'person:'+d.id:d.kind+':'+(d.hero||d.name)];ids.sort((a,b)=>(memory?.topics?.[t.q[a][0]]||0)-(memory?.topics?.[t.q[b][0]]||0));d.topicIds488=ids.slice(0,3);
 }
 return d.topicIds488.filter(i=>Number.isInteger(i)&&t.q[i]&&!d.asked.includes(i)).slice(0,3);
}
const prev=render;
render=function(){
 prev();const app=$('#app'),d=state?.dialogue;if(!app?.classList.contains('talk479')||!d||d.kind==='intro')return;
 const stage=app.querySelector('.vnStage422'),speech=stage?.querySelector('.dialogue-text'),bar=stage?.querySelector('.talkActions483');
 if(!stage||!speech||!bar)return;
 stage.querySelectorAll('.choices479').forEach(e=>e.remove());
 const footer=speech.querySelector('.vnFooter427');if(footer)footer.hidden=true;
 const choices=document.createElement('div');choices.className='choices479 direct488';const group=document.createElement('div');group.className='choiceGroup479';
 function add(label,fn){const b=document.createElement('button');b.type='button';b.textContent=label;b.onclick=fn;group.append(b)}
 const t=linesFor(d);
 if(t&&d.step===0){
  for(const i of randomTopics488(d,t))add(t.q[i][0],()=>chooseTalk(i));
 }else if(t&&d.step===1&&!['hero','hero16'].includes(d.kind)&&!d.replies?.[d.last]){
  replyOptions12(d).slice(0,3).forEach((label,i)=>add(label,()=>reply12(i)));
 }
 if(group.children.length){choices.append(group);stage.insertBefore(choices,speech)}
 if(d.step===0&&t&&!group.children.length){const p=document.createElement('p');p.className='talkDone488';p.textContent='이번에 나눌 이야기는 모두 마쳤어요.';speech.append(p)}
};render();
})();

/* v4.89: preserve dispatch form state, clear obsolete popups, actionable notifications */
(function(){
const previous=render,previousSave=save;
let draft=null,saveAt=0,lastState=null;
save=function(){const ok=previousSave();if(ok)saveAt=Date.now();return ok};
function readDraft(){
 const form=document.querySelector('.dispatch486');if(!form||!state||screen!=='의뢰'||!selectedQuest)return;
 draft={id:selectedQuest,state,party:[...form.querySelectorAll('input[name="party"]:checked')].map(e=>e.value),policy:form.querySelector('#policy')?.value,threshold:form.querySelector('#threshold')?.value,prep:form.querySelector('#prep')?.checked};
}
document.addEventListener('change',e=>{if(e.target.closest('.dispatch486'))readDraft()});
render=function(){
 if(state!==lastState){draft=null;lastState=state}
 if(draft&&(draft.state!==state||screen!=='의뢰'||draft.id!==selectedQuest))draft=null;
 for(const d of document.querySelectorAll('dialog.info486')){if(d.open)d.close();else d.remove()}
 previous();
 const app=$('#app');if(!app||!state)return;
 const form=app.querySelector('.dispatch486');
 if(form&&draft&&draft.id===selectedQuest){
  form.querySelectorAll('input[name="party"]').forEach(e=>e.checked=draft.party.includes(e.value));
  for(const k of ['policy','threshold']){const e=form.querySelector('#'+k);if(e&&draft[k]!=null)e.value=draft[k]}
  const prep=form.querySelector('#prep');if(prep&&draft.prep!=null)prep.checked=draft.prep;
 }
 if(form){
  const q=state.quests.find(q=>q.id===selectedQuest);
  const info=form.querySelector('.questInfo486');
  if(q&&info){const risk=document.createElement('small');risk.className='risk489';risk.textContent='의뢰 난도 '+q.difficulty+' · 파견 전 식량과 인원 상태를 확인하세요.';info.append(risk)}
  if(notice){const n=document.createElement('div');n.className='dispatchNotice489';n.setAttribute('role','status');n.textContent=notice;form.querySelector('.questActions486')?.prepend(n)}
 }
 const mail=app.querySelector('.mail484');
 if(mail){const chapter=storyChapters[state.story.chapter],urgent=!!(state.story.pending||state.contract14?.pending||state.quests.some(q=>['missing','delayed'].includes(q.status))),ready=!!chapter&&chapter.goals.every(g=>g[1]());
 if(urgent||ready){const dot=document.createElement('span');dot.className='mailDot489';mail.append(dot);mail.setAttribute('aria-label',urgent?'확인할 긴급 사건':'완료 가능한 퀘스트')}}
 if(screen==='더보기'&&saveAt){const h=app.querySelector('.heading477');if(h){const s=document.createElement('small');s.className='saveTime489';s.textContent='최근 저장 '+new Date(saveAt).toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit'});h.append(s)}}
};
const goBase=go;
go=function(s){if(screen==='의뢰'&&s!=='의뢰')draft=null;return goBase(s)};
render();
})();

/* v4.90: actionable alerts and live resource previews */
(function(){
const previous=render;
function preview(form){
 const q=state.quests.find(x=>x.id===selectedQuest);if(!q)return;
 const ids=[...form.querySelectorAll('input[name="party"]:checked')].map(e=>+e.value),ps=state.people.filter(p=>ids.includes(p.id)&&available(p)),prep=form.querySelector('#prep')?.checked?1:0;
 const food=Math.max(1,Math.ceil(q.duration/480))*ps.length,cost=prep*100*ps.length,tradeCost=q.trade?.mode==='buy'?q.trade.total:0;
 const difficulty=Math.max(1,Math.round((q.baseDifficulty18??q.difficulty)*levels18[state.market18.level].risk));
 const score=power(ps)+teamBond(ps)+prep*8+(prep&&staffOn(2)?4:0)+Math.min(12,Math.max(0,ps.length-1)*4);
 let out=form.querySelector('.preview490');if(!out){out=document.createElement('div');out.className='preview490';form.querySelector('.questActions486')?.prepend(out)}
 const missing=!ps.length?'모험가를 선택하세요.':state.food<food?'식량 부족':state.fund<cost+tradeCost?'준비 자금 부족':q.trade&&!tradeReady(q)?'교역 조건 미충족':'';
 const retreat=difficulty>=45&&form.querySelector('#policy')?.value==='safe'&&(score<difficulty*.8||ps.some(p=>p.hp<=Number(form.querySelector('#threshold')?.value||40)));
 const assessment=!ps.length?'선택 대기':q.monsterId?'몬스터별 대응에 따라 달라짐':retreat?'현재 조건에서 철수 가능성 높음':score>=difficulty*1.3?'전력 여유':score>=difficulty?'전력 적정':'전력 부족';
 out.replaceChildren();
 for(const [label,value] of [['인원',ps.length+'명'],['식량',food+'/'+state.food],['준비비',money(cost)],['위험 평가',assessment]]){const cell=document.createElement('div');const small=document.createElement('small');small.textContent=label;const b=document.createElement('b');b.textContent=value;cell.append(small,b);out.append(cell)}
 const dispatchButton=form.querySelector('button[onclick^="dispatch("]');if(dispatchButton){dispatchButton.disabled=!!missing;dispatchButton.title=missing||'파견 확정'}
 if(missing){const m=document.createElement('small');m.className='warning490';m.textContent=missing;out.append(m)}
}
function schedulePreview(plan){
 const l=life34();let cost=0,wage=0;const stats={};
 for(const a of l.schedule){const x=lifeActivities40[a];if(!x)continue;cost+=x[3]*7;wage+=x[4]*7;if(x[2])stats[x[2]]=(stats[x[2]]||0)+7}
 const box=document.createElement('div');box.className='schedulePreview490';
 const text=document.createElement('span');text.textContent='4주 예정 · 활동비 '+money(cost)+' · 수입 '+money(wage)+' · 차액 '+(wage>=cost?'+':'−')+money(Math.abs(wage-cost));
 const note=document.createElement('small');note.textContent='휴식 대체·사건·잔여일에 따라 실제 결과는 달라집니다.';
 box.append(text,note);plan.querySelector('.weeks40')?.after(box);
}
render=function(){
 previous();const app=$('#app');if(!state||!app||state.dialogue||state.final437)return;
 const mail=app.querySelector('.mail484');if(mail){mail.onclick=()=>{
  if(state.quests.some(q=>['missing','delayed'].includes(q.status)))quest419('active');
  else if(state.story.pending)showStory('사건');
  else if(state.contract14?.pending)go('시민 사건');
  else showStory('메인 이야기');
 }}
 const form=app.querySelector('.dispatch486');if(form){preview(form);form.addEventListener('change',()=>preview(form))}
 const plan=app.querySelector('.plan40');if(plan&&app.classList.contains('planning477')&&!plan.querySelector('.schedulePreview490'))schedulePreview(plan);
};
render();
})();

/* v4.91: compact interactive onboarding, compatible with existing saves */
(function(){
const prev=render;
let activeModal=null;
const steps=[
 ['길드에 오신 것을 환영합니다','저는 접수 담당 에린이에요. 홈에서는 의뢰 게시판, 월간 일정, 마을 교류, 길드 운영을 선택할 수 있어요. 위쪽의 보유금은 지아의 개인 재산이며 길드 운영 자금과 구분돼요.','홈 확인',()=>go('길드')],
 ['첫 의뢰 선택','의뢰 게시판에서 낮은 난도의 의뢰를 선택하세요. 모험가의 체력과 피로를 확인하고 생존 우선 지침을 추천해요. 식량과 준비 비용을 확인한 뒤 파견을 확정하세요.','의뢰 게시판',()=>quest419('open')],
 ['월간 일정','홈에서 월간 일정을 선택하면 4주 동안 할 일을 정할 수 있어요. 업무, 교육, 교류, 휴식을 적절히 섞어 보세요. 시작하면 시간이 진행되고 의뢰도 함께 처리돼요.','월간 일정',()=>{go('길드');const b=[...document.querySelectorAll('.cards477 button')].find(e=>e.textContent.includes('월간 일정'));if(b)b.click()}],
 ['귀환과 긴급 사건','의뢰의 귀환·보고 탭에서 결과를 확인하세요. 실종이나 귀환 지연이 발생하면 구조를 검토해야 해요. 메일 아이콘에 빨간 점이 나타나면 확인할 사건이 있다는 뜻이에요.','귀환·보고',()=>quest419('active')],
 ['직원과 대화','직원 메뉴에서 면담을 할 수 있어요. 한 번에 최대 세 가지 질문이 나타나며 대화와 선택에 따라 신뢰도와 관계가 달라져요.','직원 목록',()=>go('직원')],
 ['모험가 영입과 길드 운영','길드 운영에서 모험가, 재정, 시설을 관리하세요. 모집한 모험가의 계약과 급여를 확인하고 운영 자금을 무리하게 쓰지 마세요.','길드 운영',()=>go('길드 운영')],
 ['자유로운 길드 생활','마을에서는 주민과 교류하고 물건을 구할 수 있어요. 소지품에서 지아의 물건을 관리하며 설정에서 연대기와 저장 관리를 확인할 수 있어요. 이제 길드를 운영해 보세요.','마치기',()=>go('길드')]
];
function data(){return state.tutorial491??={step:0,started:false,done:false,hidden:false}}
function make(tag,cls,t){const e=document.createElement(tag);e.className=cls||'';if(t!==undefined)e.textContent=t;return e}
function button(t,fn){const b=make('button','',t);b.type='button';b.onclick=fn;return b}
function close(){if(activeModal){const m=activeModal;activeModal=null;if(m.open)m.close();m.remove()}}
function show(){
 if(!state||state.dialogue||state.final437)return;
 close();const d=data();d.started=true;d.hidden=false;d.step=Math.max(0,Math.min(steps.length-1,d.step));save();
 const s=steps[d.step],m=make('dialog','tutorial491'),header=make('div','tutorialHead491'),layout=make('div','tutorialLayout491'),art=make('div','tutorialArt491'),info=make('div','tutorialInfo491'),actions=make('div','tutorialActions491');
 header.append(make('strong','','길드장 안내 · '+(d.step+1)+' / '+steps.length),button('×',()=>{d.hidden=true;save();close();render()}));
 art.innerHTML=bigArt419('에린 로웰');info.append(make('small','','에린 로웰'),make('h2','',s[0]),make('p','',s[1]));
 layout.append(art,info);
 const back=button('‹ 이전',()=>{d.step--;save();show()});back.disabled=d.step===0;
 const skip=button('건너뛰기',()=>{d.hidden=true;save();close();render()});
 const next=button(d.step===steps.length-1?'완료':'다음 ›',()=>{if(d.step===steps.length-1){d.done=true;d.hidden=true;save();close();render()}else{d.step++;save();show()}});
 const visit=button(s[2],()=>{const last=d.step===steps.length-1;if(last){d.done=true;d.hidden=true}else d.step++;save();close();s[3]()});visit.className='primary';
 actions.append(skip,back,next,visit);m.append(header,layout,actions);document.body.append(m);activeModal=m;
 m.addEventListener('cancel',e=>{e.preventDefault();d.hidden=true;save();close();render()});m.showModal();
}
const oldToggle=tutorialToggle21;
tutorialToggle21=function(v){if(!state)return;state.tutorial21.hidden=true;const d=data();if(v){d.hidden=true;save();close();render()}else{d.step=0;d.done=false;d.hidden=false;d.started=true;save();go('길드');show()}};
tutorialPanel21=function(){return ''};
render=function(){
 prev();const app=$('#app');if(!state||!app||state.dialogue||state.final437||batch34)return;
 const d=data();
 const h=app.querySelector('header .eyebrow');
 if(h&&!d.done&&!d.hidden){const b=button('?',show);b.className='tutorialHelp491';b.setAttribute('aria-label','길드장 튜토리얼');h.append(b)}
 if(screen==='더보기'){const body=app.querySelector('.body474');if(body){const existing=[...body.querySelectorAll('button')].filter(b=>b.textContent.includes('튜토리얼 다시 표시'));existing.forEach(b=>b.remove());const b=button('튜토리얼 다시 시작',()=>tutorialToggle21(false));(body.querySelector('.quick477')||body).prepend(b)}}
 if(state.introDone&&screen==='길드'&&!d.started&&!d.hidden&&!d.done&&!life34().run&&!blocked34()){
  d.started=true;save();requestAnimationFrame(()=>{if(state&&screen==='길드'&&!state.dialogue&&!activeModal&&!data().hidden)show()});
 }
};render();
})();

/* v4.93: explicit inventory category sizing, independent of old flex rules */
(function(){
const prev=render;
render=function(){
 prev();
 const tabs=document.querySelector('#app .invTabs459');if(!tabs)return;
 tabs.style.setProperty('display','grid','important');
 tabs.style.setProperty('grid-template-columns','repeat(6,max-content)','important');
 tabs.style.setProperty('gap','5px','important');
 tabs.style.setProperty('width','max-content','important');
 for(const b of tabs.querySelectorAll('button')){
  b.style.setProperty('width',b.textContent.trim()==='식품·약초'?'86px':'44px','important');
  b.style.setProperty('min-width',b.textContent.trim()==='식품·약초'?'86px':'44px','important');
  b.style.setProperty('max-width','none','important');
  b.style.setProperty('padding','5px 6px','important');
  b.style.setProperty('font-size','11px','important');
  b.style.setProperty('white-space','nowrap','important');
  b.style.setProperty('box-sizing','border-box','important');
 }
};render();
})();

/* v4.94: fixed town dashboard and inline citizen board */
(function(){
const prev=render;
function el(tag,cls,t){const e=document.createElement(tag);e.className=cls||'';if(t!==undefined)e.textContent=t;return e}
function btn(t,fn){const b=el('button','',t);b.type='button';b.onclick=fn;return b}
function sliding(grid,items,count){
 if(!items.length)return;
 grid.replaceChildren();const view=el('div','townView494'),track=el('div','townTrack494');view.append(track);grid.append(view);
 items.forEach(x=>{x.hidden=false;track.append(x)});track.style.setProperty('--townCount',count);
 let index=0,max=Math.max(0,items.length-count),start=null,block=0;
 const left=btn('‹',()=>move(-1)),right=btn('›',()=>move(1));left.className='townPrev494';right.className='townNext494';left.setAttribute('aria-label','이전 상품');right.setAttribute('aria-label','다음 상품');grid.append(left,right);
 function move(d){index=Math.max(0,Math.min(max,index+d));track.style.transform='translateX('+(-index*((items[0].offsetWidth||0)+5))+'px)';left.disabled=index===0;right.disabled=index===max;left.hidden=right.hidden=max===0}
 const xy=t=>document.documentElement.classList.contains('autoLandscape482')?[t.clientY,-t.clientX]:[t.clientX,t.clientY];
 view.addEventListener('touchstart',e=>{start=e.touches.length===1?xy(e.touches[0]):null},{passive:true});
 view.addEventListener('touchmove',e=>{if(start){const p=xy(e.touches[0]);if(Math.abs(p[0]-start[0])>12&&Math.abs(p[0]-start[0])>Math.abs(p[1]-start[1]))e.preventDefault()}},{passive:false});
 view.addEventListener('touchend',e=>{if(!start)return;const p=xy(e.changedTouches[0]),dx=p[0]-start[0],dy=p[1]-start[1];start=null;if(Math.abs(dx)>30&&Math.abs(dx)>Math.abs(dy)*1.2){block=Date.now()+350;move(dx<0?1:-1)}},{passive:true});
 view.addEventListener('click',e=>{if(Date.now()<block){e.preventDefault();e.stopImmediatePropagation()}},true);
 move(0);requestAnimationFrame(()=>move(0));
}
let citizenOpen=false;
render=function(){
 prev();const app=$('#app');if(!app)return;app.classList.remove('town494','citizen494');
 if(!state||state.dialogue||!app.classList.contains('frame486'))return;
 const body=app.querySelector('.body474'),head=app.querySelector('.heading477'),tools=head?.querySelector('.tools486');if(!body||!head)return;
 if(screen==='의뢰'){
  const buttons=[...tools?.querySelectorAll('.infoButton486')||[]];const other=buttons.find(b=>b.textContent.includes('기타 의뢰'));
  const d=[...body.querySelectorAll('details.extra444')].find(x=>x.querySelector('summary')?.textContent.includes('기타 의뢰'));
  if(other&&d){other.onclick=()=>{citizenOpen=!citizenOpen;render()};other.textContent=citizenOpen?'‹ 의뢰 목록':'기타 의뢰';
   if(citizenOpen&&!selectedQuest){app.classList.add('citizen494');const content=el('div','citizenContent494');const inside=d.querySelector('.extraBody444');if(inside){for(const e of [...inside.children])if(!e.hidden)content.append(e)}else for(const e of [...d.children])if(e.tagName!=='SUMMARY'&&!e.hidden)content.append(e);body.replaceChildren(content)}
  }
  return;
 }
 citizenOpen=false;
 if(screen!=='외출')return;
 app.classList.add('town494');
 const map=body.querySelector('.townplan419'),shop=body.querySelector('.shop419'),speech=body.querySelector('.speech419'),clock=body.querySelector('.townclock418'),wallet=body.querySelector('.townwallet413');
 const title=head.querySelector('h2');if(title)title.textContent=townPlace413||'벨로른';
 if(wallet)tools?.append(wallet);if(clock)tools?.append(clock);
 const back=btn('‹ 마을',()=>townBack413());if(townPlace413)tools?.prepend(back);
 const selector=el('select','townSelect494');selector.setAttribute('aria-label','마을 장소');selector.append(new Option('마을 지도',''));
 townPlaces413.forEach(([n],i)=>selector.append(new Option(n,String(i),false,n===townPlace413)));
 selector.onchange=()=>selector.value===''?townBack413():townOpen413(+selector.value);tools?.append(selector);
 if(map&&!shop){const extra=[...body.children].filter(x=>x!==map&&!x.hidden&&!x.matches('h2,h3,p.muted,.back32'));const frame=el('div','townMapFrame494');frame.append(map);if(extra.length){const side=el('div','townMapExtra494');extra.forEach(x=>side.append(x));frame.append(side)}body.replaceChildren(frame);return}
 if(!shop)return;
 const art=shop.querySelector('.shopart419'),goods=shop.querySelector('.shopgoods419');if(!art||!goods)return;
 const frame=el('div','townFrame494'),right=el('div','townRight494');frame.append(art,right);
 if(!open418(townPlace413)){
  const closed=el('div','townClosed494');closed.append(el('h3','','영업 종료'),el('p','',hourText418(townPlace413)),el('p','','영업시간에 다시 방문해 주세요.'));
  const wait=[...body.querySelectorAll('button')].find(b=>b.textContent.includes('1시간 기다리기'))||[...tools?.querySelectorAll('button')||[]].find(b=>b.textContent.includes('1시간 기다리기'));if(wait)closed.append(wait);
  closed.append(btn('다른 장소 선택',()=>townBack413()));right.append(closed);
 }else{
  const grid=goods.querySelector('.shopGrid459');goods.querySelectorAll('.page420').forEach(e=>e.remove());
  if(grid){const items=[...grid.querySelectorAll('.personalitem40')];sliding(grid,items,3)}
  right.append(goods);
  if(speech)right.append(speech);
 }
 body.replaceChildren(frame);
};render();
})();

/* v4.95: compact home shortcuts and unified management */
(function(){
const prev=render;
function el(t,c,txt){const e=document.createElement(t);e.className=c||'';if(txt!==undefined)e.textContent=txt;return e}
function button(label,fn,icon){const b=el('button','',label);b.type='button';b.onclick=fn;if(icon){const i=el('img');i.src='assets/ui/'+icon+'.webp';i.alt='';b.prepend(i)}return b}
render=function(){
 prev();const app=$('#app');if(!state||!app||state.dialogue||state.final437)return;
 const mail=app.querySelector('.mail484');
 if(mail){const art=mail.parentElement,strip=el('div','homeShortcuts495');mail.before(strip);strip.append(mail);
  const news=button('',()=>showNews33(),'mail');news.setAttribute('aria-label','신문');news.title='신문';news.className='news495';news.querySelector('img').style.display='none';news.append(el('span','newspaper495','▤'));
  const quests=button('',()=>quest419('open'),'book');quests.setAttribute('aria-label','의뢰 게시판');quests.title='의뢰 게시판';
  strip.append(news,quests);
 }
 const dock=app.querySelector('.dock477');if(dock&&['직원','생활','운영','모험가','장비','길드 운영'].includes(screen)){dock.querySelectorAll('button').forEach(b=>b.classList.toggle('selected477',b.textContent.trim()==='관리'))}
 const body=app.querySelector('.body474'),heading=app.querySelector('.heading477');if(!body)return;
 if(screen==='길드 운영'){
  const h=heading?.querySelector('h2');if(h)h.textContent='길드 관리';
  const menu=body.querySelector('.menu40');if(menu){
   menu.className='management495 management497';
   const entries=[['직원',()=>go('직원'),'users'],['생활',()=>lifePage424('요리'),'rest'],['재정·시설',()=>go('운영'),'guild'],['모험가',()=>go('모험가'),'users'],['의뢰 보고',()=>quest419('active'),'book'],['장비',()=>go('장비'),'bag'],['경쟁 길드',()=>go('경쟁'),'guild']];
   menu.replaceChildren(...entries.map(([n,f,i])=>{const b=button('',f,i);b.className='manageTile497';const label=el('span','manageLabel496',n);b.append(label);for(const [k,v] of Object.entries({background:'#f6e8ca',border:'1px solid #b69b69','border-radius':'6px','box-shadow':'0 1px 3px #392b2030',color:'#392b20',display:'flex','flex-direction':'column','align-items':'center','justify-content':'center',width:'100%',height:'100%','min-height':'0',padding:'5px',margin:'0'}))b.style.setProperty(k,v,'important');return b}));
  }
 }
 if(['직원','생활','운영','모험가','장비','경쟁'].includes(screen)&&heading){const back=button('‹ 관리',()=>go('길드 운영'));back.className='manageBack495';heading.querySelector('.tools486')?.prepend(back)}
 if(screen==='의뢰'||screen==='외출'||screen==='길드 운영'){
  for(const b of body.querySelectorAll('button')){const text=b.textContent.trim(),act=b.getAttribute('onclick')||'';if(/몬스터 의뢰.*80종|도감 기반 현장 의뢰/.test(text)||/^mOpen13\(/.test(act))b.hidden=true}
 }
 if(screen==='더보기'){
  const quick=body.querySelector('.quick477')||body;
  for(const b of [...quick.querySelectorAll('button')])if(['신문','생활','길드 운영'].includes(b.textContent.trim()))b.remove();
  quick.append(button('몬스터 도감',()=>showHistory('몬스터 도감'),'book'));
 }
};render();
})();

/* v4.98: life activities on a full-bleed scene */
(function(){
const prev=render,positions=new Map();
function node(t,c){const e=document.createElement(t);e.className=c;return e}
render=function(){
 prev();const app=$('#app');if(!app)return;app.classList.remove('life498');
 if(!state||state.dialogue||screen!=='생활')return;
 const body=app.querySelector('.body474'),grid=body?.querySelector('.lifeGrid424'),image=grid?.querySelector('img.scene30'),section=grid?.querySelector('section'),tabs=body?.querySelector('.lifeTabs424'),head=app.querySelector('.heading477');
 if(!body||!grid||!image||!section||!tabs)return;
 app.classList.add('life498');
 const stage=node('div','lifeStage498'),art=node('div','lifeArt498'),toolbar=node('div','lifeToolbar498'),panel=node('div','lifePanel498');
 art.append(image);toolbar.append(tabs);
 const wallet=node('small','lifeWallet498');wallet.textContent=money(life34().wallet);toolbar.append(wallet);
 const rows=[...section.children];
 if(rows.length&&rows.every(e=>e.classList.contains('lifeRow424'))){
  const viewport=node('div','lifeViewport498'),track=node('div','lifeTrack498');viewport.append(track);panel.append(viewport);rows.forEach(e=>track.append(e));
  const count=Math.min(3,rows.length),max=Math.max(0,rows.length-count),key=lifeTab424;track.style.setProperty('--lifeCount',count);
  let index=Math.min(max,positions.get(key)||0),start=null,block=0;
  const left=node('button','lifeArrow498 left498'),right=node('button','lifeArrow498 right498');
  left.textContent='‹';right.textContent='›';left.setAttribute('aria-label','이전 항목');right.setAttribute('aria-label','다음 항목');
  function move(d){index=Math.max(0,Math.min(max,index+d));positions.set(key,index);track.style.transform='translateX('+(-index*((rows[0].offsetWidth||0)+5))+'px)';left.disabled=index===0;right.disabled=index===max;left.hidden=right.hidden=max===0}
  left.onclick=()=>move(-1);right.onclick=()=>move(1);panel.append(left,right);
  const xy=t=>document.documentElement.classList.contains('autoLandscape482')?[t.clientY,-t.clientX]:[t.clientX,t.clientY];
  viewport.addEventListener('touchstart',e=>{start=e.touches.length===1?xy(e.touches[0]):null},{passive:true});
  viewport.addEventListener('touchmove',e=>{if(start&&e.touches.length===1){const p=xy(e.touches[0]);if(Math.abs(p[0]-start[0])>12&&Math.abs(p[0]-start[0])>Math.abs(p[1]-start[1]))e.preventDefault()}},{passive:false});
  viewport.addEventListener('touchend',e=>{if(!start)return;const p=xy(e.changedTouches[0]),dx=p[0]-start[0],dy=p[1]-start[1];start=null;if(Math.abs(dx)>30&&Math.abs(dx)>Math.abs(dy)*1.2){block=Date.now()+350;move(dx<0?1:-1)}},{passive:true});
  viewport.addEventListener('touchcancel',()=>start=null);
  viewport.addEventListener('click',e=>{if(Date.now()<block){e.preventDefault();e.stopImmediatePropagation()}},true);
  requestAnimationFrame(()=>move(0));
 }else{panel.append(section)}
 stage.append(art,toolbar,panel);body.replaceChildren(stage);
 const h=head?.querySelector('h2');if(h)h.textContent='나의 생활';
};render();
})();

/* v4.99: settings as compact, fixed dashboard */
(function(){
const prev=render;
let category='기록';
function el(t,c,txt){const e=document.createElement(t);e.className=c||'';if(txt!==undefined)e.textContent=txt;return e}
function button(t,fn){const b=el('button','',t);b.type='button';b.onclick=fn;return b}
render=function(){
 prev();const app=$('#app');if(!app)return;app.classList.remove('settings499');
 if(!state||state.dialogue||screen!=='더보기')return;
 const body=app.querySelector('.body474'),head=app.querySelector('.heading477');if(!body||!head)return;
 app.classList.add('settings499');const h=head.querySelector('h2');if(h)h.textContent='설정 및 기록';
 const original=[...body.children],quick=body.querySelector('.quick477'),group=body.querySelector('details.group21');
 const frame=el('div','settingsFrame499'),tabs=el('div','settingsTabs499'),content=el('div','settingsContent499');
 const categories=['기록','환경설정','저장 관리'];
 for(const t of categories){const b=button(t,()=>{category=t;render()});if(category===t)b.className='active499';tabs.append(b)}
 function tile(label,icon,fn){const b=button('',fn);b.className='settingTile499';const i=el('img');i.src='assets/ui/'+icon+'.webp';i.alt='';i.onerror=()=>{i.style.display='none'};b.append(i,el('span','',label));return b}
 if(category==='기록'){
  const cards=el('div','settingCards499');
  const entries=[['연대기','book',()=>showStory('연대기')],['인생 기록','book',()=>go('인생 기록')],['능력치','magic',()=>go('능력치')],['몬스터 도감','book',()=>showHistory('몬스터 도감')],['엔딩 기록','book',()=>go('엔딩')],['역사 및 도감','book',()=>go('역사')],['영웅 이야기','book',()=>go('영웅 이야기')],['인간관계','users',()=>go('관계')]];
  for(const [n,i,f] of entries)cards.append(tile(n,i,f));content.append(cards);
 }else if(category==='저장 관리'){
  const cards=el('div','settingCards499 saveCards499');
  cards.append(tile('현재 JSON 백업','bag',()=>backup()),tile('JSON 가져오기','book',()=>$('#import').click()),tile('직전 자동 저장 복구','clock',()=>recover20()));content.append(cards);
 }else{
  const cards=el('div','settingCards499 environment499');cards.append(tile('튜토리얼 다시 시작','book',()=>tutorialToggle21(false)));
  const candidates=[...body.querySelectorAll('button,input[type="checkbox"],select')].filter(e=>!e.closest('.quick477')&&!e.closest('.lines22'));
  const seen=new Set();
  for(const e of candidates){
   const code=e.getAttribute('onclick')||e.getAttribute('onchange')||'';
   if(!/toggle|setting|audio|sound|motion|speed|theme/i.test(code)||/tutorial|guide|backup|recover/i.test(code))continue;
   const item=e.tagName==='INPUT'?(e.closest('label')||e):e;
   if(seen.has(item)||seen.has(code))continue;seen.add(item);seen.add(code);
   const wrap=el('div','settingControl499');wrap.append(item);cards.append(wrap);
  }
  content.append(cards);
 }
 frame.append(tabs,content);body.replaceChildren(frame);
};render();
})();

/* v5.00: full-screen title with separate compact settings */
(function(){
const prev=render;
let settings=false;
function el(t,c,txt){const e=document.createElement(t);e.className=c||'';if(txt!==undefined)e.textContent=txt;return e}
function btn(t,fn){const b=el('button','',t);b.type='button';b.onclick=fn;return b}
render=function(){
 prev();const app=$('#app');if(!app)return;app.classList.toggle('title500',!state);
 if(state){settings=false;return}
 const title=app.querySelector('.title');if(!title)return;
 const controls=title.querySelector('.av-settings');
 const actions=[...title.querySelectorAll('button')].filter(b=>!b.closest('.av-settings')&&/^(새로운 이야기|이어하기|저장 데이터 가져오기)$/.test(b.textContent.trim()));
 const stage=el('div','titleStage500'),art=el('img','titleArt500');art.src='assets/scenes/new-guild.webp';art.alt='';
 const shade=el('div','titleShade500'),brand=el('div','titleBrand500'),menu=el('div','titleMenu500'),version=el('small','titleVersion500','v5.07 · 길의 등불');
 brand.append(el('small','','ASTERIA CHRONICLES'),el('h1','','길의 등불'),el('p','','떠나는 사람에게 길을 밝히고, 돌아오는 사람에게 불을 밝혀 두리라.'));
 if(!settings){
  for(const b of actions)menu.append(b);
  menu.append(btn('환경설정',()=>{settings=true;render()}));
 }else{
  const pane=el('div','titleSettings500'),head=el('div','titleSettingsHead500');head.append(el('h2','','환경설정'),btn('닫기',()=>{settings=false;render()}));pane.append(head);
  const source=controls||(()=>{const x=el('div','');x.innerHTML=settingsPanel19();return x.firstElementChild})();
  const fields=el('div','titleFields500');
  for(const x of [...source.children])if(x.matches('label,button'))fields.append(x);
  pane.append(fields);menu.append(pane);
 }
 stage.append(art,shade,brand,menu,version);title.replaceChildren(stage);
};render();
})();

/* v5.01: anchored icons and in-game speed selection */
(function(){
const prev=render;
render=function(){
 prev();const app=$('#app');if(!app)return;
 for(const select of app.querySelectorAll('select[onchange*="setting19"][onchange*="speed"]')){
  const group=document.createElement('div');group.className='speed501';group.setAttribute('role','group');group.setAttribute('aria-label','대사 출력 속도');
  for(const option of select.options){const b=document.createElement('button');b.type='button';b.textContent=option.textContent;b.className=option.value===select.value?'active501':'';b.onclick=()=>{select.value=option.value;select.dispatchEvent(new Event('change',{bubbles:true}));};group.append(b)}
  select.replaceWith(group);
 }
 for(const b of app.querySelectorAll('.management497>button,.settingCards499>.settingTile499,.dock477>button')){
  const img=b.querySelector('img');if(!img)continue;b.classList.add('anchor501');img.classList.add('anchoredIcon501');
 }
};render();
})();

(function(){const prev=render;render=function(){prev();const app=$('#app');if(!app)return;app.classList.toggle('roster502',!!state&&screen==='모험가'&&!selectedPerson&&!state.dialogue);if(!app.classList.contains('roster502'))return;const list=app.querySelector('#member-list');if(!list)return;for(const b of list.querySelectorAll('.visual23')){const img=b.querySelector('img');if(img)img.loading='eager';} };render()})();

/* v5.03 compact town, world and rotated-safe selects */
(function(){
const prev=render;
function el(t,c){const e=document.createElement(t);e.className=c;return e}
function enhance(root){for(const s of root.querySelectorAll('select:not([multiple]):not([hidden])')){
if(s.dataset.custom503||s.closest('[hidden]'))continue;s.dataset.custom503='1';
const b=el('button','select503');b.type='button';b.textContent=(s.selectedOptions[0]?.textContent||'선택')+' ▾';b.disabled=s.disabled;
s.style.setProperty('display','none','important');s.after(b);
b.onclick=()=>{document.querySelector('.picker503')?.remove();const overlay=el('div','picker503'),panel=el('div','pickerPanel503');overlay.append(panel);const close=el('button','');close.textContent='닫기';close.onclick=()=>overlay.remove();panel.append(close);
for(const o of s.options){const x=el('button',o.selected?'primary':'');x.type='button';x.textContent=o.textContent;x.disabled=o.disabled;x.onclick=()=>{s.value=o.value;b.textContent=o.textContent+' ▾';overlay.remove();s.dispatchEvent(new Event('change',{bubbles:true}));};panel.append(x)}overlay.onclick=e=>{if(e.target===overlay)overlay.remove()};(b.closest('dialog[open]')||document.body).append(overlay);};
}}
render=function(){prev();const app=$('#app');if(!app)return;app.classList.toggle('world503',!!state&&screen==='세계'&&worldTab==='지도');
if(app.classList.contains('world503')){const body=app.querySelector('.body474');if(body){const map=body.querySelector('.world-map');const card=map?.closest('.card');const buttons=[...body.querySelectorAll('button[onclick^="selectRegion"]')].filter(b=>!map?.contains(b));if(card&&buttons.length){const frame=el('div','worldFrame503'),list=el('div','worldList503');buttons.forEach(b=>list.append(b));frame.append(card,list);body.replaceChildren(frame);}}}
enhance(app);};
new MutationObserver(()=>{for(const d of document.querySelectorAll('dialog[open]'))enhance(d)}).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['open']});render();
})();

(function(){const prev=render;render=function(){prev();const app=$('#app');if(!app)return;const body=app.querySelector('.body474');if(!body)return;
app.classList.toggle('policy504',!!body.querySelector('#guild-fee'));
const finance=[...body.querySelectorAll('.card')].find(c=>c.querySelector('.value')&&c.textContent.includes('현재 운영 자금'));
app.classList.toggle('finance504',!!finance);
if(finance){const grid=finance.nextElementSibling,ledger=grid?.nextElementSibling;if(grid?.classList.contains('grid')&&ledger){const frame=document.createElement('div');frame.className='financeFrame504';const left=document.createElement('div');left.className='financeStats504';finance.before(frame);left.append(finance,grid);frame.append(left,ledger);}}
const closed=body.querySelector('.townClosed494');if(closed){closed.parentElement.classList.add('closed504');const art=body.querySelector('.shopart419');if(art){for(const p of art.querySelectorAll('.portrait,button'))p.style.setProperty('display','none','important');}}
};render()})();

/* v5.05: discrete pages, no swipe tracks */
(function(){
const prev=render;
function page(root,items,count){
 if(!root||items.length<=count||root.dataset.paged505)return;
 root.dataset.paged505='1';let index=0;const bar=document.createElement('div');bar.className='pageNav505';
 const a=document.createElement('button'),b=document.createElement('button'),label=document.createElement('span');a.textContent='‹ 이전 페이지';b.textContent='다음 페이지 ›';a.type=b.type='button';bar.append(a,label,b);
 root.after(bar);root.classList.add('paged505');
 function draw(){items.forEach((e,i)=>{if(i>=index*count&&i<(index+1)*count)e.style.removeProperty('display');else e.style.setProperty('display','none','important')});label.textContent=(index+1)+' / '+Math.ceil(items.length/count);a.disabled=index===0;b.disabled=(index+1)*count>=items.length}
 a.onclick=()=>{index--;draw()};b.onclick=()=>{index++;draw()};draw();
}
function apply(){
 const app=document.querySelector('#app');if(!app)return;
 for(const track of app.querySelectorAll('.lifeTrack498')){const panel=track.closest('.lifePanel498');panel?.querySelectorAll('.lifeArrow498').forEach(e=>e.remove());const clone=track.cloneNode(false);clone.className='staticTrack505';while(track.firstChild)clone.append(track.firstChild);const viewport=track.parentElement;viewport.replaceWith(clone);page(clone,[...clone.children],3)}
 for(const grid of app.querySelectorAll('.shopGrid459')){const items=[...grid.querySelectorAll('.personalitem40')];if(!items.length)continue;const fresh=document.createElement('div');fresh.className='staticShop505';items.forEach(e=>{e.style.removeProperty('display');e.hidden=false;fresh.append(e)});grid.replaceWith(fresh);page(fresh,items,3)}
 for(const e of app.querySelectorAll('.shopgoods419 .page420,.shopgoods419 [class*="Arrow"]'))e.remove();
 const body=app.querySelector('.body474');if(!body)return;
 const ledger=body.querySelector('.financeFrame504>.card');if(ledger){const logs=[...ledger.querySelectorAll('.log')];if(logs.length){const list=document.createElement('div');list.className='ledger505';ledger.append(list);logs.forEach(e=>list.append(e));page(list,logs,2)}}
 for(const list of body.querySelectorAll('#member-list,.worldList503'))page(list,[...list.children].filter(e=>!e.hidden),list.id==='member-list'?4:4);
}
render=function(){prev();apply()};render();
})();
