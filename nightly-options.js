'use strict';

(function initNightlyOptions(){
  const FIRST_NIGHT={
    date:'25/08',
    label:'Nuit 1 · 25 août',
    route:'Saint-Rémy-lès-Chevreuse → nord de l’Allemagne',
    preferred:{
      name:'Park4Night #53279',
      url:'https://park4night.com/fr/place/53279',
      role:'Choix préféré',
      status:'preferred'
    },
    alternatives:[
      {name:'Park4Night #417435',url:'https://park4night.com/fr/place/417435',role:'Alternative 1',status:'alternative'},
      {name:'Park4Night #453901',url:'https://park4night.com/fr/place/453901',role:'Alternative 2',status:'alternative'}
    ]
  };

  function seed(){
    if(typeof state==='undefined')return;
    if(!state.nightlyOptions||typeof state.nightlyOptions!=='object')state.nightlyOptions={};
    state.nightlyOptions['25/08']=FIRST_NIGHT;

    if(!Array.isArray(state.savedCamperStops))state.savedCamperStops=[];
    const ids=['550355','178968','174287','53279','417435','453901'];
    state.savedCamperStops=state.savedCamperStops.filter(s=>{
      const ref=String(s.reference||'');
      const url=String(s.url||'');
      const isOldFirstNight=ref==='premium-2026-08-25';
      return !isOldFirstNight&&!ids.some(id=>ref.includes(id)||url.includes('/place/'+id));
    });
    state.savedCamperStops.push(
      {name:'25/08 · Park4Night #53279 — choix préféré',source:'Park4Night',url:FIRST_NIGHT.preferred.url,reference:'53279',stopIndex:0,status:'selected',priority:'night-preferred',date:'25/08',notes:'Choix préféré pour la première nuit.'},
      {name:'25/08 · Park4Night #417435 — alternative 1',source:'Park4Night',url:FIRST_NIGHT.alternatives[0].url,reference:'417435',stopIndex:0,status:'backup',priority:'night-alternative-1',date:'25/08',notes:'Première alternative pour la première nuit.'},
      {name:'25/08 · Park4Night #453901 — alternative 2',source:'Park4Night',url:FIRST_NIGHT.alternatives[1].url,reference:'453901',stopIndex:0,status:'backup',priority:'night-alternative-2',date:'25/08',notes:'Deuxième alternative pour la première nuit.'}
    );
    if(typeof save==='function')save();
  }

  function optionCard(option,index){
    const preferred=option.status==='preferred';
    return `<article class="night-choice ${preferred?'preferred-choice':'alternative-choice'}">
      <div class="night-choice-rank">${preferred?'⭐ PRÉFÉRÉ':'ALT. '+index}</div>
      <h4>${esc(option.name)}</h4>
      <p>${esc(option.role)}</p>
      <a class="btn ${preferred?'primary':''}" href="${esc(option.url)}" target="_blank" rel="noopener">Ouvrir Park4Night ↗</a>
    </article>`;
  }

  function panelHtml(){
    const nights=Object.values(state.nightlyOptions||{});
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
