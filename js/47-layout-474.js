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
render=function(){original();const app=$('#app'),m=$('main');if(!app)return;app.classList.remove('layout474','detail475'); if(!state){const v=app.querySelector('.title small');if(v)v.textContent='v4.88 · 길의 등불';} orientation475();if(!state||!m||batch34||state.dialogue||state.final437)return;
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
const version=app.querySelector('.title small');if(version)version.textContent='v4.74 · 길의 등불';
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
 if(ready&&!planning){const grid=el('div','cards477');const n=state.quests.filter(q=>q.status==='open').length;grid.append(button('의뢰 게시판',quest,scenes30.quest,n+'건 접수 가능'),button('월간 일정',openPlan,scenes30.study,'이번 달 계획'),button('마을 교류',()=>leave('외출'),scenes30.city),button('길드 운영',()=>leave('길드 운영'),scenes30.guild));panel.replaceChildren(grid);right.querySelector('.schedule474')?.remove();}
 else if(ready&&planning){const p=el('div','heading477');p.append(el('h2','','월간 일정'),button('닫기',()=>{planning=false;render()}));panel.replaceChildren(p,plan);right.querySelector('.schedule474')?.remove();}
 else{const p=el('div','heading477');p.append(el('h2','',home?'길드 소식':screen));if(!home)p.append(button('홈',()=>leave('길드')));panel.prepend(p);if(home&&extra&&extra.children.length){extra.hidden=false;body.append(extra)}right.querySelector('.schedule474')?.remove();}
 const old=app.querySelector('.dock477');old?.remove();const dock=el('div','dock477');dock.setAttribute('aria-label','주 메뉴');
 const locked=!!(l.run||blocked34());
 const entries=[['홈','길드','home',()=>leave('길드')],['의뢰','의뢰','book',quest],['직원','직원','users',()=>leave('직원')],['소지품','소지품','bag',()=>leave('소지품')],['메뉴','더보기','settings',()=>leave('더보기')]];
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
let pageKey='',page=0;
function node(tag,cls,txt){const e=document.createElement(tag);e.className=cls||'';if(txt!==undefined)e.textContent=txt;return e}
function btn(txt,fn){const b=node('button','',txt);b.type='button';b.onclick=fn;return b}
function inbox(){showStory(state.story.pending?'사건':'메인 이야기')}
function paginate(body){
 if(body.querySelector('.rail485'))return;
 const key=screen+'|'+(screen==='이야기'?storyTab:'')+'|'+(screen==='의뢰'?questTab22:'')+'|'+(selectedPerson??'')+'|'+(selectedQuest??'');
 if(key!==pageKey){pageKey=key;page=0}
 // Preserve existing live nodes and their handlers. Unwrap only known list containers.
 const list=[...body.children].filter(e=>!e.hidden);
 if(!list.length||body.clientHeight<40)return;
 const overflow=body.scrollHeight>body.clientHeight+4;
 if(!overflow)return;
 const height=Math.max(50,body.clientHeight-30),groups=[];let group=[],used=0;
 for(const e of list){
  const cost=e.offsetHeight+8;
  if(group.length&&used+cost>height){groups.push(group);group=[];used=0}
  group.push(e);used+=cost;
 }
 if(group.length)groups.push(group);
 // Long standalone forms remain readable rather than being clipped.
 if(groups.length<2){body.classList.add('long485');return}
 page=Math.min(page,groups.length-1);
 const rail=node('div','rail485'),track=node('div','track485');
 for(const g of groups){const slide=node('section','slide485');g.forEach(e=>slide.append(e));track.append(slide)}
 rail.append(track);body.append(rail);body.classList.add('paged485');
 const controls=node('div','pages484');const label=node('span','','');
 const back=btn('‹',()=>show(page-1)),next=btn('›',()=>show(page+1));
 back.setAttribute('aria-label','이전 페이지');next.setAttribute('aria-label','다음 페이지');
 controls.append(back,label,next);body.after(controls);
 function show(i,animate=true){page=Math.max(0,Math.min(groups.length-1,i));track.style.transition=animate?'transform .22s ease':'none';track.style.transform='translateX('+(-page*100)+'%)';label.textContent=(page+1)+' / '+groups.length;back.disabled=page===0;next.disabled=page===groups.length-1;[...track.children].forEach((e,k)=>{e.inert=k!==page;e.setAttribute('aria-hidden',String(k!==page))});}
 let gesture=null,suppress=0;
 function coords(t){return document.documentElement.classList.contains('autoLandscape482')?{x:t.clientY,y:-t.clientX}:{x:t.clientX,y:t.clientY}}
 rail.addEventListener('touchstart',e=>{if(e.touches.length!==1||e.target.closest('input,select,textarea,[contenteditable]')){gesture=null;return}gesture=coords(e.touches[0])},{passive:true});
 rail.addEventListener('touchmove',e=>{if(!gesture||e.touches.length!==1)return;const p=coords(e.touches[0]),dx=p.x-gesture.x,dy=p.y-gesture.y;if(Math.abs(dx)>12&&Math.abs(dx)>Math.abs(dy)*1.2){e.preventDefault();track.style.transition='none';const edge=(page===0&&dx>0)||(page===groups.length-1&&dx<0);track.style.transform='translateX(calc('+(-page*100)+'% + '+(edge?dx*.2:dx)+'px))'}},{passive:false});
 rail.addEventListener('touchend',e=>{if(!gesture)return;const p=coords(e.changedTouches[0]),dx=p.x-gesture.x,dy=p.y-gesture.y;gesture=null;if(Math.abs(dx)>36&&Math.abs(dx)>Math.abs(dy)*1.2){suppress=Date.now()+350;show(page+(dx<0?1:-1))}else show(page)},{passive:true});
 rail.addEventListener('touchcancel',()=>{gesture=null;show(page)},{passive:true});
 rail.addEventListener('click',e=>{if(Date.now()<suppress){e.preventDefault();e.stopImmediatePropagation()}},true);
 show(page,false);
}
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
const previous=render;
function el(tag,cls,t){const e=document.createElement(tag);e.className=cls||'';if(t!==undefined)e.textContent=t;return e}
function button(t,fn){const b=el('button','',t);b.type='button';b.onclick=fn;return b}
function swipe(target,prev,next){let start=null,block=0;const xy=t=>document.documentElement.classList.contains('autoLandscape482')?[t.clientY,-t.clientX]:[t.clientX,t.clientY];target.addEventListener('touchstart',e=>{start=e.touches.length===1&&!e.target.closest('input,select,textarea')?xy(e.touches[0]):null},{passive:true});target.addEventListener('touchmove',e=>{if(!start)return;let [x,y]=xy(e.touches[0]);if(Math.abs(x-start[0])>15&&Math.abs(x-start[0])>Math.abs(y-start[1])*1.2)e.preventDefault()},{passive:false});target.addEventListener('touchend',e=>{if(!start)return;let [x,y]=xy(e.changedTouches[0]),dx=x-start[0],dy=y-start[1];start=null;if(Math.abs(dx)>30&&Math.abs(dx)>Math.abs(dy)*1.2){block=Date.now()+350;(dx<0?next:prev)()}},{passive:true});target.addEventListener('touchcancel',()=>start=null);target.addEventListener('click',e=>{if(Date.now()<block){e.preventDefault();e.stopImmediatePropagation()}},true)}
function rail(parent,items,count){
 if(!items.length)return;
 const wrap=el('div','list486'),viewport=el('div','viewport486'),track=el('div','track486');viewport.append(track);
 items[0].before(wrap);wrap.append(viewport);
 items.forEach(x=>{x.hidden=false;track.append(x)});
 track.style.setProperty('--count486',count);
 let index=0,max=Math.max(0,items.length-count);
 const prev=button('‹',()=>move(-1)),next=button('›',()=>move(1));prev.className='prev486';next.className='next486';prev.setAttribute('aria-label','이전 항목');next.setAttribute('aria-label','다음 항목');wrap.append(prev,next);
 function move(d){index=Math.max(0,Math.min(max,index+d));const step=(track.children[0]?.offsetWidth||0)+6;track.style.transform='translateX('+(-index*step)+'px)';prev.disabled=index===0;next.disabled=index===max;prev.hidden=next.hidden=max===0}
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
 prev();const app=$('#app');if(!state||!app?.classList.contains('frame486')||state.dialogue)return;
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
  d.topicIds488=ids.slice(0,3);
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
