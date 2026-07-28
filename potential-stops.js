'use strict';

(function seedPotentialStops(){
  const firstCandidate={
    name:'Park4Night #697896 — premier arrêt potentiel',
    source:'Park4Night',
    url:'https://park4night.com/fr/place/697896',
    reference:'697896',
    stopIndex:0,
    status:'candidate',
    priority:'review',
    notes:'Premier arrêt potentiel du voyage. Ouvrir la fiche Park4Night pour vérifier la localisation, les avis récents, les services et les restrictions avant de le sélectionner.',
    lat:'',
    lon:''
  };

  if(typeof state==='undefined')return;
  if(!Array.isArray(state.savedCamperStops))state.savedCamperStops=[];
  const exists=state.savedCamperStops.some(stop=>
    String(stop.reference||'').includes('697896')||
    String(stop.url||'').includes('/place/697896')
  );
  if(!exists){
    state.savedCamperStops.push(firstCandidate);
    if(typeof save==='function')save();
  }
})();
