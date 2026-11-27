// v4.21: compact landscape rebuild, reduced repetition, lighter recruitment, visual-novel town flow.
const MAX_OPEN_QUESTS421 = 4;
const DAILY_HIRE_CHANCE421 = 0.4;
function day421(){return Math.floor((state?.time||0)/1440)}
function recentMission421(){
  if(!state) return '';
  let recent=[...state.quests].filter(q=>['success','failed'].includes(q.status)).sort((a,b)=>(b.finished||0)-(a.finished||0)).slice(0,3);
  if(!recent.length) return '<p class="muted">아직 보고할 의뢰 결과가 없습니다.</p>';
  return recent.map(q=>`<div class="report421"><b>${esc(q.name)}</b><small>${q.status==='success'?'성공':'실패'}${q.finished?` · ${esc(date(q.finished).split(' · ')[0])}`:''}</small></div>`).join('');
}

const addQuests421base = addQuests;
addQuests = function(){
  if(!state) return;
  normalize();
  let liveNames = new Set(state.quests.filter(q=>['open','active','delayed','missing','rescuing'].includes(q.status)).map(q=>q.name));
  let openCount = state.quests.filter(q=>q.status==='open').length;
  let pool = templates.filter(t=>!liveNames.has(t[0]));
  while(openCount < MAX_OPEN_QUESTS421 && pool.length){
    let idx = rand(0, pool.length-1);
    let t = pool.splice(idx,1)[0];
    state.quests.push({id:++state.serial,name:t[0],type:t[1],reward:t[2],duration:t[3],difficulty:t[4],status:'open',party:[]});
    openCount++;
  }
};

const arrive421base = arrive;
arrive = function(count, reason='방문'){
  let scaled = count;
  if(/첫 방문/.test(reason)) scaled = rand(2,3);
  else if(/일일 방문/.test(reason)) scaled = Math.random() < DAILY_HIRE_CHANCE421 ? 1 : 0;
  else if(/모집 공고/.test(reason)) scaled = rand(2,4) + (facilityLevel('hall')>2?1:0);
  scaled = Math.max(0, Math.min(scaled, APPLICANT_CAP - state.applicants.length));
  return arrive421base(scaled, reason);
};

recruit = function(){
  if(state.fund<500||state.applicants.length>=APPLICANT_CAP)return;
  cash(-500,'모집','모집 공고');
  let n=arrive(rand(2,4),'모집 공고');
  advance(30);
  if(!interrupt){notice=n?('새로운 지원자 '+n+'명이 찾아왔습니다.'): '이번에는 눈에 띄는 지원자가 없었습니다.';render()}
};

const daily32421base = daily32;
daily32 = function(){
  daily32421base();
  if(!state || state.dialogue) return;
  let a=init32(), pending=a.pending;
  if(pending?.type==='hire'){
    let last=a.lastHireOffer421??-99;
    let today=day421();
    if(today-last<3){ a.pending=null; }
    else a.lastHireOffer421=today;
  }
  save();
};

const makeApplicant421base = makeApplicant;
makeApplicant = function(){
  let p = makeApplicant421base();
  const extraJobs=['유적 안내인','행상 경비','등반가','필경사 모험가','구조 보조원','연금 조수','항로 정찰자','심부름꾼'];
  if(Math.random()<0.35) p.profile.job = pick(extraJobs);
  return p;
};

const render421base = render;
render = function(){
  render421base();
  if(!state || state.dialogue || batch34) return;
  const app = $('#app');
  const m = $('main');
  if(!app || !m) return;
  app.classList.add('v421');

  if(screen==='길드'){
    let menu = m.querySelector('.menu40');
    if(menu){
      let btns=[...menu.querySelectorAll('button')];
      btns.forEach(b=>{
        let t=b.textContent.trim();
        if(t==='길드 운영') b.textContent='직원';
        if(t==='외출') b.textContent='마을';
        if(t==='기록·설정') b.textContent='기록';
      });
      let op=btns.find(b=>b.textContent.trim()==='직원');
      if(op) op.setAttribute('onclick',"go('직원')");
    }
    let qStrip = m.querySelector('.quest419');
    if(qStrip && !m.querySelector('.mission421')){
      let mission = document.createElement('section');
      mission.className='card mission421';
      mission.innerHTML=`<div class="row"><h3>간단 의뢰 결과</h3><small>최근 보고</small></div>${recentMission421()}`;
      qStrip.after(mission);
    }
  }

  if(screen==='직원'){
    let cards=m.querySelectorAll('.staff419 section');
    cards.forEach(sec=>{
      let btn=sec.querySelector('button');
      if(btn) btn.textContent='대화';
    });
  }

  if(screen==='의뢰' && questTab22==='open'){
    let cards=[...m.querySelectorAll('.quest23, :scope > .card')].filter(el=>!(el.classList.contains('tutorial21')||el.classList.contains('mission421')));
    let questCards=cards.filter(el=>el.matches('.quest23') || (el.querySelector('button[onclick^="selectedQuest="]') || el.querySelector('button[onclick^="dispatch("]')));
    questCards.forEach((el,i)=>el.hidden = i>=MAX_OPEN_QUESTS421);
    if(questCards.length>MAX_OPEN_QUESTS421 && !m.querySelector('.board421-note')){
      let note=document.createElement('p');
      note.className='muted board421-note';
      note.textContent='의뢰 게시판은 한 번에 최대 4건만 정리해 보여 줍니다. 새로운 의뢰는 기존 의뢰가 마무리되면 갱신됩니다.';
      let tabs=m.querySelector('.tabs22');
      if(tabs) tabs.after(note);
    }
  }

  if(screen==='외출'){
    if(!townPlace413){
      let map = m.querySelector('.townplan419');
      if(map && !m.querySelector('.townguide421')){
        map.insertAdjacentHTML('afterend', `<p class="muted townguide421">마을 지도의 장소를 눌러 방문하세요. 방문한 장소에서 주민과 대화하고 상품을 확인할 수 있습니다.</p>`);
      }
    } else {
      let placeData = townPlaces413.find(x=>x[0]===townPlace413);
      let shop = m.querySelector('.shop419');
      let speech = m.querySelector('.speech419');
      if(placeData && shop){
        let [placeName] = placeData;
        let residents = residents34.filter(p=>residentAvailable34(p) && location418(p)===placeName);
        if(!townPerson413 && residents[0]) townPerson413 = residents[0][0];
        let art = shop.querySelector('.shopart419');
        if(art && !art.querySelector('.vn421-cast')){
          let cast = document.createElement('div');
          cast.className='vn421-cast';
          cast.innerHTML = residents.map((p,i)=>`<button class="${p[0]===townPerson413?'active':''}" onclick="townSelect413(${residents34.findIndex(x=>x[0]===p[0])})">${portrait(p[0])}<span>${esc(p[0].split(' ')[0])}</span></button>`).join('');
          art.append(cast);
        }
      }
      if(speech){
        speech.querySelectorAll('.action419').forEach(x=>x.remove());
        speech.querySelectorAll('button[hidden]').forEach(b=>b.hidden=false);
        speech.classList.add('vn421-dialogue');
        let header=speech.querySelector('h3');
        if(header){ header.textContent = townPerson413 || townPlace413; }
      }
    }
  }
};
render();

