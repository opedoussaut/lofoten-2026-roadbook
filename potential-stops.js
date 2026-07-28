'use strict';

(function seedPotentialStops(){
  const candidates=[
    {
      name:'Park4Night #664943 — première nuit · Alveslohe',
      source:'Park4Night',
      url:'https://park4night.com/fr/place/664943',
      reference:'664943',
      stopIndex:0,
      status:'selected',
      priority:'first-night',
      previousStage:'Saint-Rémy-lès-Chevreuse',
      distanceFromPrevious:'≈ 900 km',
      driveTimeFromPrevious:'≈ 9 h 30 à 10 h 30 hors pauses',
      notes:'Nouveau spot retenu pour la première nuit : grand parking gratuit près de la piscine extérieure à Alveslohe, annoncé calme et proche de l’A7. Environ 900 km depuis Saint-Rémy-lès-Chevreuse. Attention : la fiche Park4Night le classe « parking jour uniquement » ; vérifier impérativement la signalisation et l’autorisation de nuit à l’arrivée. Sol partiellement herbe/gravier, potentiellement moins adapté après forte pluie.',
      services:['Gratuit','25 places annoncées','Ouvert toute l’année','Proche A7','Poubelles et sacs pour chiens signalés','Piscine extérieure à proximité'],
      lat:53.7830,
      lon:9.9179
    },
    {
      name:'Park4Night #697896 — ancien premier arrêt potentiel',
      source:'Park4Night',
      url:'https://park4night.com/fr/place/697896',
      reference:'697896',
      stopIndex:0,
      status:'backup',
      priority:'review',
      notes:'Ancienne option pour la première nuit, conservée comme solution de secours.',
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
    },
    {
      name:'Park4Night #153403 — arrêt potentiel 4 pratique',
      source:'Park4Night',
      url:'https://park4night.com/fr/place/153403',
      reference:'153403',
      stopIndex:0,
      status:'candidate',
      priority:'efficient',
      notes:'Arrêt de transit choisi pour son efficacité plutôt que pour son cadre. Vérifier les avis récents, l’autorisation de nuit, le bruit, la sécurité, les services et les restrictions avant validation.',
      lat:'',
      lon:''
    }
  ];

  if(typeof state==='undefined')return;
  if(!Array.isArray(state.savedCamperStops))state.savedCamperStops=[];

  let changed=false;
  candidates.forEach(candidate=>{
    const index=state.savedCamperStops.findIndex(stop=>
      String(stop.reference||'').includes(candidate.reference)||
      String(stop.url||'').includes(`/place/${candidate.reference}`)
    );
    if(index<0){state.savedCamperStops.push(candidate);changed=true;}
    else if(candidate.reference==='664943'){
      state.savedCamperStops[index]=Object.assign({},state.savedCamperStops[index],candidate);
      changed=true;
    }
  });

  if(changed&&typeof save==='function')save();
})();