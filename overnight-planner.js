'use strict';

(function initPremiumOvernightPlanner(){
  const ABISKO={
    day:5,
    date:'29/08',
    destination:'Abisko',
    primary:{
      name:'Abisko Mountain Lodge',
      type:'Nuit arctique premium',
      status:'À confirmer',
      icon:'🏔️',
      url:'https://www.abiskomountainlodge.se/',
      note:'Notre seul choix affiché pour cette nuit : une vraie pause au pied des montagnes avant l’arrivée aux Lofoten. Réserver le lodge et demander une confirmation écrite pour le stationnement du camping-car et l’accueil de Paddy.',
      checks:['Parking du camping-car confirmé par écrit','Paddy accepté','Heure d’arrivée compatible','Restaurant réservé si souhaité']
    }
  };

  function seed(){
    if(typeof state==='undefined')return;
    if(!state.overnights||typeof state.overnights!=='object')state.overnights={};
    state.overnights.day5=Object.assign({},ABISKO,state.overnights.day5||{}, {primary:Object.assign({},ABISKO.primary,state.overnights.day5?.primary||{})});
    delete state.overnights.day5.backup;
    if(typeof save==='function')save();
  }

  function plannerHtml(){
    const d=state.overnights?.day5||ABISKO;
    return `<section class="card overnight-planner"><div class="overnight-title"><div><p class="eyebrow">MODE EXPÉRIENCE PREMIUM</p><h2>Une seule nuit recommandée par jour</h2></div><span class="overnight-state">Plan B masqué</span></div><p>Le roadbook n’affiche désormais que le meilleur choix retenu pour chaque nuit. Les alternatives ne seront ajoutées qu’à ta demande.</p><article class="overnight-option primary-overnight"><div class="overnight-option-head"><span>${d.primary.icon}</span><div><small>NUIT DU ${esc(d.date)}</small><h3>${esc(d.primary.name)}</h3><p>${esc(d.primary.type)}</p></div></div><p>${esc(d.primary.note)}</p><ul>${d.primary.checks.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><div class="toolbar"><a class="btn primary" href="${esc(d.primary.url)}" target="_blank" rel="noopener">Ouvrir le site ↗</a><button id="confirm-day5-lodge" type="button">Marquer comme confirmé</button></div></article></section>`;
  }

  function cleanItineraryTable(){
    const table=document.querySelector('#app table');
    if(!table)return;
    const headers=table.querySelectorAll('thead th');
    if(headers[6])headers[6].textContent='Expérience / nuit';
    if(headers[7])headers[7].style.display='none';
    table.querySelectorAll('tbody tr').forEach(row=>{
      const cells=row.children;
      if(cells[7])cells[7].style.display='none';
    });
  }

  function bindPlanner(){
    const button=document.getElementById('confirm-day5-lodge');
    if(!button)return;
    const confirmed=state.overnights?.day5?.primary?.status==='Confirmé';
    button.textContent=confirmed?'✓ Confirmé':'Marquer comme confirmé';
    button.classList.toggle('primary',confirmed);
    button.onclick=()=>{
      state.overnights.day5.primary.status=confirmed?'À confirmer':'Confirmé';
      save();
      renderItinerary();
    };
  }

  function install(){
    seed();
    if(typeof renderItinerary!=='function')return;
    const base=renderItinerary;
    window.renderItinerary=function(){
      base();
      cleanItineraryTable();
      const app=document.getElementById('app');
      if(app)app.insertAdjacentHTML('afterbegin',plannerHtml());
      bindPlanner();
    };
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();