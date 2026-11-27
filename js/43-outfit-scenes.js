// v4.66: outfit and location graphics; existing prices and effects are unchanged.
const outfits466={'외출복':'outing','정장':'formal','여행복':'travel'};
const portrait466base=portraitPath;portraitPath=function(n){if(n==='지아 메르벨'&&state){let k=outfits466[personal40().outfit];if(k)return 'assets/outfits/'+k+'.webp'}return portrait466base(n)};
const category466base=category459;category459=function(n){return n==='여행복'?'의상':category466base(n)};
const art466base=art459;art459=function(n){let k={'연습용 활':'bow','휴대용 등불':'lantern','잉크와 펜':'ink','마력 연구 입문서':'book'}[n];return k?`<img class="itemArt459" src="assets/equipment-art/${k}.webp" alt="">`:art466base(n)};
const places466={'시장':'market','항구':'harbor','치료원':'clinic','식당':'inn','찻집':'tea','의상점':'clothes','약초상':'alchemy','행정청':'office','영웅협회':'library'};
const render466base=render;render=function(){render466base();if(!state||batch34||state.final437)return;let m=$('main');if(!m)return;if(screen==='길드'&&!state.dialogue&&!life34().run){let i=['새로운 출발','재건 중인 길드','신뢰받는 길드','지역의 중심'].indexOf(guildStage433());let bg=m.querySelector('.lifehero40 .scene30');if(bg&&i>=0)bg.src='assets/locations/guild-'+i+'.webp';let k=outfits466[personal40().outfit];if(k)m.querySelector('.lifehero40')?.classList.add('outfit466')}
if(screen==='외출'&&!state.dialogue&&townPlace413){let k=places466[townPlace413];if(townPlace413==='길드')k=['spring','summer','autumn','winter'][Math.floor(Math.floor(state.time/1440)%120/30)];let bg=m.querySelector('.shopart419 .scene30,.townstage413 .scene30');if(k&&bg)bg.src='assets/locations/'+k+'.webp'}
if(screen==='소지품'&&!state.dialogue){let h=m.querySelector('.invHead459');if(h){let b=document.createElement('button');b.textContent='평상복';b.onclick=()=>outfit40('평상복');b.disabled=personal40().outfit==='평상복';h.append(b)}}};render();
