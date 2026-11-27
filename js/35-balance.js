// v4.41: paced growth, bounded event cadence and calendar consistency.
const balance462=window.__gameData['balance'];
const growth441base=grow34;
grow34=function(a){const l=life34(),before={...l.stats};growth441base(a);const actual=l.run?.actual41||a;const x=lifeActivities40[actual];if(!x)return;const credit=l.growth441??={};for(const k of Object.keys(l.stats)){if(k==='스트레스')continue;const delta=l.stats[k]-(before[k]||0);if(delta<=0)continue;const rate=x[0]==='교육'?balance462.growth.education:x[0]==='휴식'?balance462.growth.rest:balance462.growth.other;credit[k]=(credit[k]||0)+delta*rate;const gain=Math.floor(credit[k]+1e-8);credit[k]-=gain;l.stats[k]=Math.min(100,(before[k]||0)+gain)}};
const story441base=dailyStory;dailyStory=function(){const day=day421(),v=state.story,c=state.contract14;if(c.pending&&day>=c.pending.expires)c.pending=null;if(day-Math.max(v.lastSpawn??-99,c.lastIncident??-99)<14)return;story441base()};
const history441base=finish34;finish34=function(){history441base();};
const render441base=render;render=function(){render441base();if(!state||state.dialogue||batch34||state.final437||screen!=='길드')return;const p=document.querySelector('.estimate41');if(p){p.textContent=p.textContent.replace(/ · 성장.*/, '')+' · 성장: 교육 집중 시 유리'}};
render();

// v4.42 — sustainable contracts and operating costs.
function fairReward442(q){if(q.trade||q.city||q.hero16||q.rival17||q.citizen14?.kind==='긴급'||q.status!=='open')return;const floor= Math.round((balance462.reward.base+q.difficulty*balance462.reward.difficulty+Math.ceil(q.duration/480)*balance462.reward.duration)/5)*5;q.reward=Math.max(q.reward,floor)}
const quests442base=addQuests;addQuests=function(){quests442base();for(const q of state.quests)fairReward442(q)};
const applicant442base=makeApplicant;makeApplicant=function(){let p=applicant442base();p.salary=Math.round((balance462.salary.base+p.skill*balance462.salary.skill)/50)*50;return p};
const normalize442base=normalize;normalize=function(s=state){let v=normalize442base(s);if(v&&!v.balance442){for(const q of v.quests)fairReward442(q);v.balance442=true}return v};
const career442base=career437;career437=function(){let s=life34().stats;const v=k=>Number(s[k])||0;let a=[['길드장',v('경영'),0],['대마법사',v('마법')*.7+v('지식')*.3, v('마법')],['검사',v('검술')*.7+v('체력')*.3,v('검술')],['학자',v('지식'),v('지식')],['상인',v('경영')*.45+v('사교성')*.55,v('사교성')],['예술가',v('예술')*.7+v('감수성')*.3,v('예술')],['요리사',v('요리'),v('요리')],['역사 연구가',v('지식')*.5+Math.min(8,expeditionData431().records.length)*6.25,expeditionData431().records.length>=4?100:0],['여행가',v('견문'),v('견문')]];return a.filter(x=>x[0]==='길드장'||x[2]>=balance462.careerMinimum).sort((x,y)=>y[1]-x[1])[0][0]};
render();
