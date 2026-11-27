// Ordered source loader: retains original classic-script scope and hoisting.
(async function(){
  const files = [
  "js/01-core.js",
  "js/02-economy.js",
  "js/03-equipment.js",
  "js/04-social.js",
  "js/05-world.js",
  "js/06-history.js",
  "js/07-story.js",
  "js/08-endings.js",
  "js/09-interface.js",
  "js/10-monsters.js",
  "js/11-citizen-quests.js",
  "js/12-life-events.js",
  "js/13-hero-stories.js",
  "js/14-competition-economy.js",
  "js/15-presentation.js",
  "js/16-save.js",
  "js/16-onboarding.js",
  "js/17-schedule.js",
  "js/18-jia-life.js",
  "js/19-character-art.js",
  "js/20-town-life.js",
  "js/21-town-interface.js",
  "js/22-landscape.js",
  "js/23-recruit-dialogue.js",
  "js/24-personal-routes.js",
  "js/25-visual-novel.js",
  "js/26-atmosphere.js",
  "js/27-competitions.js",
  "js/28-hero-commissions.js",
  "js/29-archive.js",
  "js/30-development.js",
  "js/31-campaign-ending.js",
  "js/32-main-story.js",
  "js/33-staff-stories.js",
  "js/34-adventurer-stories.js",
  "js/35-balance.js",
  "js/36-compact-ui.js",
  "js/37-operation-stability.js",
  "js/38-hero-visits.js",
  "js/39-hero-vignettes.js",
  "js/40-illustrated-ui.js",
  "js/41-inventory.js",
  "js/42-item-art.js",
  "js/43-outfit-scenes.js",
  "js/44-event-cg.js"
];
  try {
    const dataNames = ["characters","staff-dialogues","monsters","shop-items","hero-dialogues","hero-paired","hero-serious","hero-sad","hero-surprised","hero-tired","story-events","campaign-chapters","balance","citizen-events"];
    const dataPromise = Promise.all(dataNames.map(async name => { const path='data/'+name+'.json'; const response=await fetch(path); if(!response.ok) throw new Error(path+' : '+response.status); return [name,await response.json()]; }));
    const partsPromise = Promise.all(files.map(async path => {
      const response = await fetch(path);
      if (!response.ok) throw new Error(path + ' : ' + response.status);
      return response.text();
    }));
    const [entries,parts] = await Promise.all([dataPromise,partsPromise]);
    window.__gameData=Object.fromEntries(entries);
    const source = document.createElement('script');
    source.textContent = parts.join('\n') + '\n//# sourceURL=asteria-game-runtime.js';
    document.body.append(source);
  } catch (error) {
    document.getElementById('app').textContent = '게임을 불러오지 못했습니다. VS Code Live Server로 index.html을 열어 주세요. (' + error.message + ')';
    console.error(error);
  }
})();
