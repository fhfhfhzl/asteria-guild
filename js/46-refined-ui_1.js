// v4.72: compact home; keep navigation and reports accessible.
const render472base=render;
render=function(){render472base();if(!state||batch34||state.dialogue||state.final437)return;const app=$('#app'),m=$('main');if(!m||screen!=='길드')return;
 const ctr=m.querySelector('.controls43');if(!ctr)return;
 const menu=ctr.querySelector('.menu40'),extra=ctr.querySelector('.homeExtra444'),report=ctr.querySelector('.mission421');
 if(report){let d=document.createElement('details');d.className='reports472';let s=document.createElement('summary');let count=report.querySelectorAll('.report421').length;s.textContent='최근 의뢰'+(count?' · '+count+'건':'');d.append(s);report.before(d);d.append(report);report.querySelector('h3')?.remove();}
 const dock=document.createElement('div');dock.className='dock472';if(menu)dock.append(menu);if(extra)dock.append(extra);if(dock.children.length)ctr.append(dock);
 ctr.querySelectorAll('.plan40 h2').forEach(e=>e.textContent='월간 일정');ctr.querySelectorAll('.weeks40 label small').forEach((e,i)=>e.textContent=(i+1)+'주');
 ctr.querySelectorAll('.run43 > small').forEach(e=>e.textContent='진행 중');
};render();
