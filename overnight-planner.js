'use strict';

(function initOvernightPlanner(){
  const DAY5={
    day:5,
    date:'29/08',
    destination:'Kiruna / Abisko',
    primary:{
      name:'Abisko Mountain Lodge',
      type:'Lodge / nuit confort',
      status:'À confirmer',
      icon:'🏨',
      url:'https://www.abiskomountainlodge.se/',
      note:'Option principale pour la nuit du jour 5. Réserver l’hébergement et demander explicitement si le camping-car peut rester sur le parking pendant la nuit. Ne pas considérer le stationnement nocturne comme confirmé sans réponse écrite du lodge.',
      checks:['Parking camping-car accepté pour les clients','Hauteur/longueur du véhicule acceptées','Paddy autorisé dans la chambre','Heure d’arrivée tardive possible','Restaurant et petit-déjeuner disponibles']
    },
    backup:{
      name:'Park4Night #696328 — Abisko, Träskvägen',
      type:'Plan B — petit emplacement panoramique',
      status:'Plan B',
      icon:'🅱️',
      url:'https://park4night.com/fr/place/696328',
      lat:68.3516,
      lon:18.8374,
      note:'Petit emplacement gratuit annoncé pour un seul véhicule, près de la route descendant vers le port, avec vue sur le lac Torneträsk et les montagnes. Très récent et sans recul communautaire suffisant : vérifier panneaux, accès et situation sur place.',
      services:['🐾 Animaux admis','📶 3G/4G','🌄 Point de vue','💰 Gratuit','🚐 1 place']
    },
    warning:'Le parc national d’Abisko ne propose pas d’emplacements pour camping-cars ou caravanes et la nuit dans les parkings longue durée pour voitures n’y est pas autorisée.'
  };

  function seed(){
    if(typeof state==='undefined')return;
    if(!state.overnights||typeof state.overnights!=='object')state.overnights={};
    if(!state.overnights.day5)state.overnights.day5=DAY5;
    if(!Array.isArray(state.savedCamperStops))state.savedCamperStops=[];
    const exists=state.savedCamperStops.some(s=>String(s.reference||'').includes('696328')||String(s.url||'').includes('/place/696328'));
    if(!exists){
      state.savedCamperStops.push({name:'Park4Night #696328 — Abisko Plan B',source:'Park4Night',url:DAY5.backup.url,reference:'696328',stopIndex:4,status:'backup',priority:'day5-backup',notes:DAY5.backup.note,lat:DAY5.backup.lat,lon:DAY5.backup.lon});
    }
    if(typeof save==='function')save();
  }

  function plannerHtml(){
    const d=state.overnights?.day5||DAY5;
    return `<section class="card overnight-planner"><div class="overnight-title"><div><p class="eyebrow">PLANIFICATEUR DE NUIT</p><h2>Jour 5 · ${esc(d.date)} · ${esc(d.destination)}</h2></div><span class="overnight-state">Décision à confirmer</span></div><div class="overnight-grid"><article class="overnight-option primary-overnight"><div class="overnight-option-head"><span>${d.primary.icon}</span><div><small>OPTION PRINCIPALE</small><h3>${esc(d.primary.name)}</h3><p>${esc(d.primary.type)}</p></div></div><p>${esc(d.primary.note)}</p><ul>${d.primary.checks.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><div class="toolbar"><a class="btn primary" href="${esc(d.primary.url)}" target="_blank" rel="noopener">Ouvrir le lodge ↗</a><button id="confirm-day5-lodge" type="button">Marquer comme confirmé</button></div></article><article class="overnight-option backup-overnight"><div class="overnight-option-head"><span>${d.backup.icon}</span><div><small>PLAN B</small><h3>${esc(d.backup.name)}</h3><p>${esc(d.backup.type)}</p></div></div><p>${esc(d.backup.note)}</p><div class="overnight-services">${d.backup.services.map(x=>`<span>${esc(x)}</span>`).join('')}</div><div class="toolbar"><a class="btn" href="${esc(d.backup.url)}" target="_blank" rel="noopener">Park4Night ↗</a><a class="btn" href="https://www.google.com/maps?q=${d.backup.lat},${d.backup.lon}" target="_blank" rel="noopener">Carte ↗</a></div></article></div><div class="popup-warning"><b>Important :</b> ${esc(d.warning)}</div></section>`;
  }

  function bindPlanner(){
    const button=document.getElementById('confirm-day5-lodge');
    if(!button)return;
    const confirmed=state.overnights?.day5?.primary?.status==='Confirmé';
    button.textContent=confirmed?'✓ Lodge confirmé':'Marquer comme confirmé';
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
      const app=document.getElementById('app');
      if(app)app.insertAdjacentHTML('afterbegin',plannerHtml());
      bindPlanner();
    };
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
