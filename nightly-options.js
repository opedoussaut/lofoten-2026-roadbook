'use strict';

(function initNightlyOptions(){
  const NIGHTS={
    '25/08':{
      date:'25/08',label:'Nuit 1 · 25 août',route:'Saint-Rémy-lès-Chevreuse → nord de l’Allemagne',
      preferred:{name:'Park4Night #53279',url:'https://park4night.com/fr/place/53279',role:'Choix préféré',status:'preferred'},
      alternatives:[
        {name:'Park4Night #417435',url:'https://park4night.com/fr/place/417435',role:'Alternative 1',status:'alternative'},
        {name:'Park4Night #453901',url:'https://park4night.com/fr/place/453901',role:'Alternative 2',status:'alternative'}
      ]
    },
    '26/08':{
      date:'26/08',label:'Nuit 2 · 26 août',route:'Nord de l’Allemagne → sud de la Suède / région du Vättern',
      preferred:{name:'Park4Night #84058',url:'https://park4night.com/fr/place/84058',role:'Choix préféré',status:'preferred'},
      alternatives:[
        {name:'Park4Night #698010',url:'https://park4night.com/fr/place/698010',role:'Alternative 1',status:'alternative'},
        {name:'Park4Night #391481',url:'https://park4night.com/fr/place/391481',role:'Alternative 2',status:'alternative'}
      ]
    },
    '27/08':{
      date:'27/08',label:'Nuit 3 · 27 août',route:'Région du Vättern → Gävle',
      preferred:{name:'Park4Night #188958',url:'https://park4night.com/fr/place/188958',role:'Choix préféré',status:'preferred'},
      alternatives:[
        {name:'Park4Night #214874',url:'https://park4night.com/fr/place/214874',role:'Alternative 1',status:'alternative'},
        {name:'Park4Night #76491',url:'https://park4night.com/fr/place/76491',role:'Alternative 2',status:'alternative'}
      ]
    },
    '28/08':{
      date:'28/08',label:'Nuit 4 · 28 août',route:'Gävle → Umeå / Skellefteå',
      preferred:{name:'Park4Night #140798',url:'https://park4night.com/fr/place/140798',role:'Choix préféré',status:'preferred'},
      alternatives:[
        {name:'Park4Night #260263',url:'https://park4night.com/fr/place/260263',role:'Alternative 1',status:'alternative'},
        {name:'Park4Night #698541',url:'https://park4night.com/fr/place/698541',role:'Alternative 2',status:'alternative'}
      ]
    },
    '29/08':{
      date:'29/08',label:'Nuit 5 · 29 août',route:'Umeå / Skellefteå → Abisko',
      preferred:{name:'Abisko Mountain Lodge',url:'https://www.abiskomountainlodge.se/',role:'Choix préféré · lodge',status:'preferred'},
      alternatives:[
        {name:'Park4Night #133328',url:'https://park4night.com/fr/place/133328',role:'Alternative 1',status:'alternative'},
        {name:'Park4Night #88528',url:'https://park4night.com/fr/place/88528',role:'Alternative 2',status:'alternative'}
      ]
    }
  };

  function seed(){
    if(typeof state==='undefined')return;
    if(!state.nightlyOptions||typeof state.nightlyOptions!=='object')state.nightlyOptions={};
    Object.assign(state.nightlyOptions,NIGHTS);

    if(!Array.isArray(state.savedCamperStops))state.savedCamperStops=[];
    const ids=['550355','178968','174287','53279','417435','453901','84058','698010','391481','188958','214874','76491','140798','260263','698541','133328','88528'];
    state.savedCamperStops=state.savedCamperStops.filter(s=>{
      const ref=String(s.reference||'');
      const url=String(s.url||'');
      const oldPremium=['premium-2026-08-25','premium-2026-08-26','premium-2026-08-27','premium-2026-08-28','premium-2026-08-29'].includes(ref);
      return !oldPremium&&!ids.some(id=>ref===id||url.includes('/place/'+id));
    });

    Object.values(NIGHTS).forEach((night,nightIndex)=>{
      const preferredRef=night.preferred.name.includes('#')?night.preferred.name.split('#')[1]:'abisko-mountain-lodge';
      state.savedCamperStops.push({name:`${night.date} · ${night.preferred.name} — choix préféré`,source:night.preferred.name.includes('Park4Night')?'Park4Night':'Site officiel',url:night.preferred.url,reference:preferredRef,stopIndex:nightIndex,status:'selected',priority:'night-preferred',date:night.date,notes:`Choix préféré pour la nuit du ${night.date}.`});
      night.alternatives.forEach((option,i)=>state.savedCamperStops.push({name:`${night.date} · ${option.name} — alternative ${i+1}`,source:'Park4Night',url:option.url,reference:option.name.split('#')[1],stopIndex:nightIndex,status:'backup',priority:`night-alternative-${i+1}`,date:night.date,notes:`Alternative ${i+1} pour la nuit du ${night.date}.`}));
    });
    if(typeof save==='function')save();
  }

  function optionCard(option,index){
    const preferred=option.status==='preferred';
    const linkLabel=option.url.includes('park4night.com')?'Ouvrir Park4Night ↗':'Ouvrir le site officiel ↗';
    return `<article class="night-choice ${preferred?'preferred-choice':'alternative-choice'}">
      <div class="night-choice-rank">${preferred?'⭐ PRÉFÉRÉ':'ALT. '+index}</div>
      <h4>${esc(option.name)}</h4>
      <p>${esc(option.role)}</p>
      <a class="btn ${preferred?'primary':''}" href="${esc(option.url)}" target="_blank" rel="noopener">${linkLabel}</a>
    </article>`;
  }

  function panelHtml(){
    const nights=Object.values(state.nightlyOptions||{}).sort((a,b)=>String(a.date).localeCompare(String(b.date)));
    return `<section class="card nightly-options-panel">
      <div class="nightly-options-heading"><div><p class="eyebrow">CHOIX DE NUIT</p><h2>Préféré + alternatives</h2></div><p class="muted">Un choix principal et deux solutions de repli par nuit.</p></div>
      ${nights.map(n=>`<div class="night-choice-day"><div class="night-choice-day-head"><h3>${esc(n.label)}</h3><span>${esc(n.route||'')}</span></div><div class="night-choice-grid">${optionCard(n.preferred,0)}${(n.alternatives||[]).map((o,i)=>optionCard(o,i+1)).join('')}</div></div>`).join('')}
    </section>`;
  }

  function install(){
    seed();
    if(typeof renderItinerary!=='function')return;
    const base=renderItinerary;
    window.renderItinerary=function(){
      base();
      const app=document.getElementById('app');
      if(app)app.insertAdjacentHTML('afterbegin',panelHtml());
    };
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
