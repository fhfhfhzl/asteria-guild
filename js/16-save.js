// Persistence, validation and recovery (classic-script scope).
const REC20=KEY+'-previous';let saveError20='', recovery20=false;
const norm19final=normalize;normalize=function(s=state){s=norm19final(s);if(s){s.guide20??={hidden:false};}return s};
function parse20(raw){try{let x=JSON.parse(raw);if(!valid(x))return null;let ids=new Set();for(let p of x.people){if(!Number.isFinite(p.id)||ids.has(p.id))return null;ids.add(p.id)}return normalize(x)}catch(e){return null}}
read=function(){try{let raw=localStorage.getItem(KEY),s=parse20(raw);recovery20=false;if(s)return s;s=parse20(localStorage.getItem(REC20));recovery20=!!s;return s}catch(e){return null}};
save=function(){if(!state)return false;try{normalize();let raw=JSON.stringify(state),old=localStorage.getItem(KEY);if(old&&old!==raw&&parse20(old)){try{localStorage.setItem(REC20,old)}catch(e){}}localStorage.setItem(KEY,raw);saveError20='';return true}catch(e){saveError20='자동 저장 실패 · JSON 백업을 내려받으세요.';notice=saveError20;return false}};
function recover20(){if(state?.dialogue)return;try{let old=parse20(localStorage.getItem(REC20));if(!old){alert('복구할 이전 저장이 없습니다.');return}if(!confirm('직전 자동 저장으로 되돌릴까요? 현재 진행은 JSON으로 먼저 백업할 수 있습니다.'))return;state=old;screen=state.dialogue?'대화':'길드';selectedQuest=null;selectedPerson=null;save();render()}catch(e){alert('이전 저장을 읽지 못했습니다.')}}
