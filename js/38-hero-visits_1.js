// v4.52 — optional recurring hero encounters, separate from historical quests.
const visitors452=[
{id:'kael',place:'길드',lines:['안녕하세요. 잠시 들렀습니다. 의뢰를 마친 분들은 무사히 돌아왔나요?','오늘은 검을 손질하고 돌아갈 생각입니다. 길드도 평온한 하루를 보내면 좋겠군요.','다시 뵙네요. 지난번에 들려주신 길드 이야기가 기억납니다.']},
{id:'kai',place:'장비점',lines:['마력 탐지 장비를 좀 살펴보고 있었어. 작은 오차도 중요하거든.','여기 장비는 생각보다 잘 관리되어 있네.','또 만났네. 연구할 만한 자료가 있으면 알려 줘.']},
{id:'ren',place:'시장',lines:['뭐야, 너도 장 보러 왔어? 여기 물건값은 잘 비교해야 돼.','숙박비도 만만치 않더라. 괜히 비싼 데 갈 필요는 없잖아.','또 보네. 길드 일은 잘 돼 가냐?']},
{id:'asha',place:'행정청',lines:['지역의 소식을 확인하고 있었어요. 길드에서 본 상황도 궁금하군요.','숲과 마을이 함께 안전할 방법을 생각하고 있어요.','오랜만이에요. 길드가 어떻게 지내는지 들려주시겠어요?']},
{id:'sion',place:'광장',lines:['여기서 잠깐 쉬고 있었어. 오늘은 꽤 조용하네.','이상한 일이 생기면 혼자 해결하려고 하지 마.','또 만났네. 오늘은 좀 쉬어도 되지 않겠어?']},
{id:'sera',place:'치료원',lines:['오늘은 치료원에 들렀어요. 모두 무사히 돌아왔으면 좋겠어요.','길드장님도 식사를 거르시면 안 돼요.','다시 만나서 반가워요. 요즘은 잘 지내세요?']},
{id:'luna',place:'찻집',lines:['차를 마시면서 기록을 정리하고 있었어. 잠깐 같이 앉을래?','평범한 하루도 기록해 두면 나중에는 소중해지지.','또 만났네. 그동안 어떤 일이 있었어?']},
{id:'eileen',place:'상점',lines:['여기 구경할 만한 물건이 많네. 너도 뭐 찾는 거 있어?','활을 손질하고 나니 시간이 좀 남았어.','어머, 또 만났네. 오늘은 어떤 이야기를 들려줄 거야?']}
];
const pairs452={kael:'eileen',kai:'sera',ren:'luna',asha:'sion',sion:'asha',sera:'kai',luna:'ren',eileen:'kael'};
function visit452(){if(!state?.introDone||state.final437)return null;let day=Math.floor(state.time/1440);if(day<5)return null;let slot=Math.floor((day-5)/7),v=visitors452[slot%8],pair=Math.floor(slot/8)%2===1&&slot%2===0;return {slot,day,v,ids:pair?[v.id,pairs452[v.id]]:[v.id]}}
function visitData452(){return state.visits452??={seen:{},counts:{}}}
function hero452(id){return heroEvents.find(h=>h.id===id)}
function visitButton452(){let a=visit452();if(!a||visitData452().seen[a.slot])return '';return `<button class="visit452" onclick="openVisit452()" aria-label="${esc(a.ids.map(id=>hero452(id).name).join(' · '))} 만나기" title="${esc(a.v.place)}"><span class="faces452">${a.ids.map(id=>portrait(hero452(id).name)).join('')}</span><small>${esc(a.v.place)}</small></button>`}
let visitScene452=null;
function openVisit452(){let a=visit452();if(!a||state.dialogue||batch34||life34().run||blocked34()||visitData452().seen[a.slot])return;visitScene452={...a,step:0};drawVisit452()}
function drawVisit452(){let a=visitScene452;if(!a)return;document.querySelector('.visitScene452')?.remove();let id=a.ids[a.step],h=hero452(id),v=visitors452.find(x=>x.id===id),n=visitData452().counts[id]||0,d=document.createElement('dialog');d.className='visitScene452';let bg=townPlaces413.find(x=>x[0]===a.v.place)?.[1]||'guild';d.innerHTML=`<div class="visitStage452">${scene30(bg,a.v.place)}<div class="visitCast452">${a.ids.map(x=>`<div class="${x===id?'speaking452':''}">${portrait(hero452(x).name)}</div>`).join('')}</div></div><div class="visitSpeech452"><b>${esc(h.name)}</b><p>${esc(v.lines[n%v.lines.length])}</p><button class="primary" onclick="nextVisit452()" aria-label="다음 대사">›</button></div>`;d.addEventListener('cancel',e=>{e.preventDefault();d.remove();visitScene452=null});document.body.append(d);d.showModal()}
function nextVisit452(){let a=visitScene452;if(!a)return;if(++a.step<a.ids.length){drawVisit452();return}let d=visitData452();if(!d.seen[a.slot]){d.seen[a.slot]=true;for(let id of a.ids){d.counts[id]=(d.counts[id]||0)+1;let r=relation34(hero452(id).name);r.aff=clamp(r.aff+2,0,100);r.talks++}log(a.ids.map(id=>hero452(id).name).join(' · ')+'와 마을에서 만났다.');save()}visitScene452=null;document.querySelector('.visitScene452')?.remove();render()}
const render452base=render;render=function(){render452base();if(!state||state.dialogue||batch34||state.final437||life34().run||blocked34())return;let m=$('main'),a=visit452();if(!m||!a||visitData452().seen[a.slot])return;let button=visitButton452();if(screen==='길드'){let target=m.querySelector('.lifehero40');if(target)target.insertAdjacentHTML('beforeend',button)}if(screen==='외출'){let map=m.querySelector('.townplan419');if(map){let i=townPlaces413.findIndex(x=>x[0]===a.v.place);if(i>=0){let pin=map.querySelectorAll('.pin419')[i];if(pin){let el=document.createElement('div');el.className='visitMap452';el.style.left=pin.style.left;el.style.top=pin.style.top;el.innerHTML=button;map.append(el)}}}else if(townPlace413===a.v.place){let target=m.querySelector('.shopart419');if(target)target.insertAdjacentHTML('beforeend',button)}}};render();

