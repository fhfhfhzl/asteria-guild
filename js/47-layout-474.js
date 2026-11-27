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
render=function(){original();const app=$('#app'),m=$('main');if(!app)return;app.classList.remove('layout474','detail475'); if(!state){const v=app.querySelector('.title small');if(v)v.textContent='v4.83 · 길의 등불';} orientation475();if(!state||!m||batch34||state.dialogue||state.final437)return;
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
 const entries=[['홈','길드','home',()=>leave('길드')],['의뢰','의뢰','book',quest],['이야기','이야기','mail',()=>leave('이야기')],['직원','직원','users',()=>leave('직원')],['소지품','소지품','bag',()=>leave('소지품')],['메뉴','더보기','settings',()=>leave('더보기')]];
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
  if(state.dialogue.kind!=='intro'){
   const footer=speech.querySelector('.vnFooter427'),choices=document.createElement('div');choices.className='choices479';
   for(const select of [...(footer?.querySelectorAll('select')||[])]){
    const group=document.createElement('div');group.className='choiceGroup479';group.setAttribute('aria-label',select.getAttribute('aria-label')||'대화 선택');
    let options=[...select.options].filter(opt=>opt.value&&!opt.disabled);
    if(select.getAttribute('aria-label')==='대화 주제'){
     const d=state.dialogue;
     if(lastTalk480!==d){lastTalk480=d;topics480=[];for(const opt of options){topics480.push(opt.textContent)}for(let i=topics480.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[topics480[i],topics480[j]]=[topics480[j],topics480[i]]}topics480=topics480.slice(0,3)}
     options=topics480.map(t=>options.find(o=>o.textContent===t)).filter(Boolean);
    }
    for(const opt of options.slice(0,Math.max(0,3-choices.querySelectorAll('button').length))){const b=document.createElement('button');b.type='button';b.textContent=opt.textContent;b.onclick=()=>{select.value=opt.value;select.dispatchEvent(new Event('change',{bubbles:true}))};group.append(b)}
    if(group.children.length)choices.append(group);select.hidden=true;
   }
   if(choices.children.length)stage.insertBefore(choices,speech);
  }
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
