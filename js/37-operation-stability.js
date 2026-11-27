// v4.46 — renew ordinary board contracts without touching special or accepted missions.
function refreshBoard446(){let day=day421();expire14();let ordinary=q=>!q.trade&&!q.city&&!q.hero16&&!q.rival17&&!q.citizen14&&templates.some(t=>t[0]===q.name);for(let q of state.quests.filter(q=>q.status==='open'&&ordinary(q))){q.posted446??=day;if(day-q.posted446>=5){q.status='expired';q.finished=state.time;if(selectedQuest===q.id)selectedQuest=null}}let open=state.quests.filter(q=>q.status==='open');let safe=templates.filter(t=>t[4]<40&&t[3]<=480&&!state.quests.some(q=>q.name===t[0]&&['open',...liveStatuses].includes(q.status)));let count=open.filter(q=>ordinary(q)&&q.difficulty<40&&q.duration<=480).length;while(count<2&&safe.length){if(open.length>=4){let old=open.find(q=>ordinary(q)&&q.difficulty>=40);if(!old)break;old.status='expired';old.finished=state.time;open=open.filter(q=>q!==old);if(selectedQuest===old.id)selectedQuest=null}let t=safe.splice(rand(0,safe.length-1),1)[0],q={id:++state.serial,name:t[0],type:t[1],reward:t[2],duration:t[3],difficulty:t[4],status:'open',party:[],posted446:day,report:[],policy:'safe',threshold:40,prep:0,stage:'이동'};state.quests.push(q);open.push(q);count++}for(let q of state.quests.filter(q=>q.status==='open'&&ordinary(q))){q.posted446??=day;q.reward=Math.max(q.reward,Math.round((450+q.difficulty*10+Math.ceil(q.duration/480)*100)/5)*5)}}
const add446base=addQuests;addQuests=function(){refreshBoard446();add446base();refreshBoard446();normalize()};
// Do not create an event that has no affordable response.
const story446base=dailyStory;dailyStory=function(){story446base();let v=state.story,c=state.contract14,e=storyEvents.find(x=>x.id===v.pending?.id),i=incident14.find(x=>x.id===c.pending?.id);if(e&&!e.opts.some(storyOptionOK)){v.seen[e.id]=day421();v.pending=null;log('사건 종료: 현재 가능한 대응이 없음 · '+e.title)}if(i&&!i.opts.some(incidentReady14)){c.pending=null;log('시민 사건 종료: 현재 가능한 대응이 없음 · '+i.title)}};
render();

// v4.47 — bounded autonomous dispatch and expired ordinary contract cleanup.
const arrive447base=arrive;arrive=function(n,reason='방문'){if(reason==='일일 방문'&&day421()-(state.lastApplicant422??-14)<14)return 0;return arrive447base(n,reason)};
function clean447(){let cutoff=state.time-60*1440;state.quests=state.quests.filter(q=>!(q.status==='expired'&&Number.isFinite(q.finished)&&q.finished<=cutoff&&!(q.party?.length)&&!q.trade&&!q.city&&!q.hero16&&!q.rival17&&!q.citizen14&&templates.some(t=>t[0]===q.name)));}
const add447base=addQuests;addQuests=function(){add447base();clean447()};
render();

// v4.48 — archive routine daily work notices without removing mission records.
const clean448base=clean447;clean447=function(){clean448base();const cutoff=state.time-120*1440;state.routine448??={};state.logs=state.logs.filter(x=>{if(x.time<cutoff&&/^지아: .+ · 직원들이 일상 업무를 처리했다\.$/.test(x.text)){let y=Math.floor(x.time/(120*1440))+1;state.routine448[y]=(state.routine448[y]||0)+1;return false}return true})};

// v4.49: recurring guild service revenue, recorded once per game day.
const daily449base=dailyEconomy;
dailyEconomy=function(){daily449base();let day=Math.floor(state.time/1440);if(state.economy.serviceDay449===day)return;state.economy.serviceDay449=day;let reputation=clamp(state.rep,0,100);let amount=balance462.service.base+Math.floor(reputation/balance462.service.reputationDivisor);if(state.economy.staff.slice(1).every(p=>p.mode==='휴무'))amount=0;if(amount)cash(amount,'접수·정보 서비스','길드 일상 서비스');};

// v4.50 — release candidate: event pacing and resilient ending archive.
const story450base=dailyStory;dailyStory=function(){let day=day421(),v=state.story,c=state.contract14;if(c.pending&&day>=c.pending.expires)c.pending=null;if(day-Math.max(v.lastSpawn??-99,c.lastIncident??-99)<balance462.eventMinimumDays)return;story450base()};
archive437=function(){try{let a=JSON.parse(localStorage.getItem('asteria-final437')||'[]');return Array.isArray(a)?a.filter(e=>e&&typeof e.guild==='string'&&typeof e.career==='string'&&typeof e.rel==='string'):[]}catch{return []}};
const render450base=render;render=function(){render450base();if(!state?.final437)return;let e=state.final437,a=archive437();if(!a.some(x=>x.guild===e.guild&&x.career===e.career&&x.rel===e.rel&&x.partner===e.partner)){a.push(e);try{localStorage.setItem('asteria-final437',JSON.stringify(a))}catch{}}};

// v4.51 — preserve the current pagination when a detail view rerenders.
const pages451=new Map();
pager444=function(parent,items,size){if(!items.length)return;const key=screen+'|'+parent.className+'|'+(typeof questTab22==='undefined'?'':screen==='의뢰'?questTab22:'');let page=Math.min(pages451.get(key)||0,Math.ceil(items.length/size)-1),bar=node444('div','pager444'),prev=node444('button','','‹'),next=node444('button','','›'),label=node444('span');prev.setAttribute('aria-label','이전 페이지');next.setAttribute('aria-label','다음 페이지');bar.append(prev,label,next);parent.append(bar);function show(){pages451.set(key,page);items.forEach((x,i)=>x.hidden=i<page*size||i>=(page+1)*size);label.textContent=(page+1)+' / '+Math.ceil(items.length/size);prev.disabled=page===0;next.disabled=(page+1)*size>=items.length;bar.hidden=items.length<=size}prev.onclick=()=>{if(page>0){page--;show()}};next.onclick=()=>{if((page+1)*size<items.length){page++;show()}};show()};
// A stale selected quest must not strand the player on an empty detail view.
const render451base=render;render=function(){if(state&&selectedQuest&&!state.quests.some(q=>q.id===selectedQuest))selectedQuest=null;render451base();let app=$('#app');if(!app)return;app.classList.toggle('journal451',!!state&&!state.dialogue&&!state.final437);};render();

