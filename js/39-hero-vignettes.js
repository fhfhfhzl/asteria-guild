// v4.53 — recurring character-specific vignettes, with authored paired exchanges.
const episodes453=__gameData["hero-dialogues"];
const paired453=__gameData["hero-paired"];
function script453(a){let id=a.v.id,n=visitData452().counts[id]||0;if(a.ids.length===2){let key=['kael','eileen'].includes(id)?'kael':['kai','sera'].includes(id)?'kai':['ren','luna'].includes(id)?'ren':'asha';return {title:'함께 보내는 시간',lines:paired453[key].map(([id,text],i)=>({id,text,mood:i===2?'smile':'neutral'}))}}let ep=episodes453[id][n%episodes453[id].length];return {title:ep[0],lines:ep.slice(1).map((text,i)=>({id,text,mood:i===1?'smile':'neutral'}))}}
function art453(id,mood){let h=hero452(id);return mood==='smile'?`<div class="portrait"><img src="assets/heroes/${id}-smile.webp" alt="${esc(h.name)}"></div>`:portrait(h.name)}
openVisit452=function(){let a=visit452();if(!a||state.dialogue||batch34||life34().run||blocked34()||visitData452().seen[a.slot])return;visitScene452={...a,step:0,script:script453(a)};drawVisit452()};
drawVisit452=function(){let a=visitScene452;if(!a)return;document.querySelector('.visitScene452')?.remove();let line=a.script.lines[a.step],h=hero452(line.id),d=document.createElement('dialog');d.className='visitScene452 visitScene453';let bg=townPlaces413.find(x=>x[0]===a.v.place)?.[1]||'guild';d.innerHTML=`<div class="visitStage452">${scene30(bg,a.v.place)}<div class="visitCast452">${a.ids.map(id=>`<div class="${id===line.id?'speaking452':''}">${art453(id,id===line.id?line.mood:'neutral')}</div>`).join('')}</div></div><div class="visitSpeech452"><small>${esc(a.v.place)} · ${esc(a.script.title)}</small><b>${esc(h.name)}</b><p>${esc(line.text)}</p><button class="primary" onclick="nextVisit452()" aria-label="다음 대사">›</button></div>`;d.addEventListener('cancel',e=>{e.preventDefault();d.remove();visitScene452=null});document.body.append(d);d.showModal()};
nextVisit452=function(){let a=visitScene452;if(!a)return;if(++a.step<a.script.lines.length){drawVisit452();return}let d=visitData452();if(!d.seen[a.slot]){d.seen[a.slot]=true;for(let id of a.ids){d.counts[id]=(d.counts[id]||0)+1;let r=relation34(hero452(id).name);r.aff=clamp(r.aff+2,0,100);r.talks++}log(a.ids.map(id=>hero452(id).name).join(' · ')+'와 만났다 · '+a.script.title);save()}visitScene452=null;document.querySelector('.visitScene452')?.remove();render()};
render();

// v4.54 — authored serious expressions and additional daily scenes.
const seriousTopics454=new Set(['검술','왕국','연구','기록','의뢰','지역','구마','치료','역사','궁술','안전','훈련','환자','기록 보존']);
const extra454=__gameData["hero-serious"];
for(const id of Object.keys(extra454))episodes453[id].push(extra454[id]);
const script454base=script453;script453=function(a){const s=script454base(a);if(a.ids.length===1&&seriousTopics454.has(s.title))s.lines[0].mood='serious';if(a.ids.length===2){for(const line of s.lines){if(line.id==='kael'&&line.text.includes('생각'))line.mood='serious';}}return s};
const art454base=art453;art453=function(id,mood){if(mood==='serious'&&Object.prototype.hasOwnProperty.call(extra454,id))return `<div class="portrait"><img src="assets/heroes/${id}-serious.webp" alt="${esc(hero452(id).name)}"></div>`;return art454base(id,mood)};

// v4.56 — quiet, melancholy expressions and individual reflective scenes.
const sad455=__gameData["hero-sad"];
for(const id of Object.keys(sad455))episodes453[id].push(sad455[id]);
const script455base=script453;script453=function(a){let s=script455base(a);if(a.ids.length===1&&s.title===sad455[a.v.id]?.[0]){s.lines.forEach(l=>l.mood='sad');}return s};
const art455base=art453;art453=function(id,mood){if(mood==='sad'&&Object.hasOwn(sad455,id))return `<div class="portrait"><img src="assets/heroes/${id}-sad.webp" alt="${esc(hero452(id).name)}"></div>`;return art455base(id,mood)};

// v4.56 — eight lighthearted visits; explicit expression mapping.
const surprise456=__gameData["hero-surprised"];
for(const id of Object.keys(surprise456))episodes453[id].push(surprise456[id]);
const script456base=script453;script453=function(a){const s=script456base(a);if(a.ids.length===1&&s.title===surprise456[a.v.id]?.[0]){s.lines[0].mood='surprised';s.lines[1].mood='smile'}return s};
const art456base=art453;art453=function(id,mood){if(mood==='surprised'&&Object.prototype.hasOwnProperty.call(surprise456,id))return `<div class="portrait"><img src="assets/heroes/${id}-surprised.webp" alt="${esc(hero452(id).name)}"></div>`;return art456base(id,mood)};

// v4.57 — tired expressions and quiet rest scenes.
const tired457=__gameData["hero-tired"];
for(const id of Object.keys(tired457))episodes453[id].push(tired457[id]);
const script457base=script453;script453=function(a){const s=script457base(a);if(a.ids.length===1&&s.title===tired457[a.v.id]?.[0]){s.lines[0].mood='tired';s.lines[1].mood='smile'}return s};
const art457base=art453;art453=function(id,mood){if(mood==='tired'&&Object.prototype.hasOwnProperty.call(tired457,id))return `<div class="portrait"><img src="assets/heroes/${id}-tired.webp" alt="${esc(hero452(id).name)}"></div>`;return art457base(id,mood)};

