'use strict';

// V118 — actual itinerary followed during the trip.
(function installActualItinerary(){
  if(typeof tabs==='undefined'||typeof show!=='function') return;
  const TAB_ID='actual';
  if(!tabs.some(([id])=>id===TAB_ID)){
    const itineraryIndex=tabs.findIndex(([id])=>id==='itinerary');
    tabs.splice(itineraryIndex>=0?itineraryIndex+1:1,0,[TAB_ID,'Itinéraire réel']);
  }

  const FALLBACK=[
    {day:1,date:'2026-08-25',from:'Paris / Chevreuse',to:'Bispingen',via:['France','Belgique','Allemagne'],distanceKm:900,overnight:'Wohnmobilstellplatz im Naturschutzpark Bispingen',activities:['Grande étape de liaison','Étape nature calme'],status:'Réalisé'},
    {day:2,date:'2026-08-26',from:'Bispingen',to:'Malmö / sud de la Suède',via:['Allemagne','Danemark','Suède'],distanceKm:null,overnight:'Région de Malmö',activities:['Traversée du Danemark','Entrée en Suède'],status:'Réalisé · distance exacte à récupérer'},
    {day:3,date:'2026-08-27',from:'Malmö / sud de la Suède',to:'Suède centrale / étape vers le nord',via:['Remontée de la Suède'],distanceKm:null,overnight:'À préciser avec la trace réelle',activities:['Transit vers le nord'],status:'Réalisé · détails à compléter'},
    {day:4,date:'2026-08-28',from:'Étape en Suède centrale',to:'Umeå',via:['Coop','Skuleskogen National Park'],distanceKm:null,overnight:'Umeå / environs',activities:['Brouillard très dense','Courses','Randonnée à Skuleskogen National Park','Panne / assistance à Umeå'],status:'Réalisé · fin de journée perturbée par la panne'}
  ];

  function x(v){return typeof esc==='function'?esc(v):String(v??'');}
  function renderActual(){
    const app=typeof byId==='function'?byId('app'):document.getElementById('app');if(!app)return;
    const rows=FALLBACK.map(d=>`<tr><td><b>J${d.day}</b><br><span class="muted">${x(d.date)}</span></td><td>${x(d.from)}</td><td>${x(d.via.join(' → '))}</td><td>${x(d.to)}</td><td>${d.distanceKm?`${d.distanceKm} km`:'—'}</td><td>${x(d.activities.join(' · '))}</td><td>${x(d.overnight)}</td><td>${x(d.status)}</td></tr>`).join('');
    app.innerHTML=`<section class="card"><p class="eyebrow">LOFOTEN 2026 · LE VOYAGE TEL QU’IL S’EST PASSÉ</p><h2>🧭 Itinéraire réel</h2><p>Cette vue est volontairement séparée de l’itinéraire prévu. Elle retrace uniquement ce qui a réellement été fait. Les informations incertaines restent vides plutôt que d’être inventées et seront enrichies au fil du voyage.</p><div class="table-wrap"><table><thead><tr><th>Jour</th><th>Départ</th><th>Passage / étape</th><th>Arrivée</th><th>Km réels</th><th>Ce qu’on a fait</th><th>Nuit</th><th>État</th></tr></thead><tbody>${rows}</tbody></table></div></section><section class="card" style="margin-top:12px"><h3>Prochaine consolidation</h3><p>Les traces GPS ou un export Strava permettront de compléter les kilomètres exacts, les randonnées et les points de passage sans modifier le récit humain du journal.</p></section>`;
  }
  const previousShow=show;
  show=function(id){if(id!==TAB_ID)return previousShow(id);active=id;document.querySelectorAll('#nav button').forEach(b=>b.classList.toggle('active',b.dataset.tab===id));renderActual();};
})();
