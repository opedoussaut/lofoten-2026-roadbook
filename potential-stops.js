'use strict';

(function seedPotentialStops(){
  const candidates=[
    {
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
    },
    {
      name:'Park4Night #347908 — arrêt potentiel 2',
      source:'Park4Night',
      url:'https://park4night.com/fr/place/347908',
      reference:'347908',
      stopIndex:0,
      status:'candidate',
      priority:'review',
      notes:'Deuxième arrêt potentiel. Vérifier la localisation exacte, les avis récents, les services, l’accès et les restrictions avant de l’associer définitivement à une étape.',
      lat:'',
      lon:''
    },
    {
      name:'Park4Night #565906 — arrêt potentiel 3 pratique',
      source:'Park4Night',
      url:'https://park4night.com/fr/place/565906',
      reference:'565906',
      stopIndex:0,
      status:'candidate',
      priority:'efficient',
      notes:'Arrêt moins remarquable visuellement, mais potentiellement efficace et pratique pour une étape de transit. Vérifier l’accès, les avis récents, les services, le bruit et les restrictions avant validation.',
      lat:'',
      lon:''
    }
  ];

  if(typeof state==='undefined')return;
  if(!Array.isArray(state.savedCamperStops))state.savedCamperStops=[];

  let changed=false;
  candidates.forEach(candidate=>{
    const exists=state.savedCamperStops.some(stop=>
      String(stop.reference||'').includes(candidate.reference)||
      String(stop.url||'').includes(`/place/${candidate.reference}`)
    );
    if(!exists){state.savedCamperStops.push(candidate);changed=true;}
  });

  if(changed&&typeof save==='function')save();
})();