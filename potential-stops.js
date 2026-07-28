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
      name:'Park4Night #359873 — deuxième nuit · Vätterledens Camping',
      source:'Park4Night',
      url:'https://park4night.com/fr/place/359873',
      reference:'359873',
      stopIndex:1,
      status:'selected',
      priority:'second-night',
      previousStage:'Alveslohe — Park4Night #664943',
      distanceFromPrevious:'≈ 640 km',
      driveTimeFromPrevious:'≈ 7 h 30 à 8 h 30 hors pauses et attente éventuelle au ferry',
      notes:'Spot retenu pour la deuxième nuit : Vätterledens Camping à Vättersmålen, près du lac Vättern et de Gränna. Environ 640 km depuis Alveslohe selon l’itinéraire retenu à travers le Danemark. Camping naturel et calme, adapté à une nuit de transit, mais certains emplacements sont en pente et l’E4 peut être audible. La fiche annonce une fermeture au 15 août : notre passage étant prévu le 26 août, il faut impérativement confirmer l’ouverture directement auprès du camping avant le départ et conserver un plan B.',
      services:['Animaux autorisés','Eau potable','Toilettes','Douches','Électricité possible','Laverie','Baignade et randonnées à proximité','60 places annoncées'],
      price:'220 SEK annoncés pour le camping-car + 40 SEK pour l’électricité',
      openingWarning:'Fiche Park4Night : fermeture annoncée au 15 août — à confirmer pour le 26 août 2026',
      rating:'4,08/5 sur 12 avis affichés',
      lat:57.9250,
      lon:14.3221
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
      name:'Park4Night #347908 — ancienne option deuxième nuit',
      source:'Park4Night',
      url:'https://park4night.com/fr/place/347908',
      reference:'347908',
      stopIndex:1,
      status:'backup',
      priority:'review',
      notes:'Ancienne option pour la deuxième nuit, conservée comme solution de secours après sélection de Vätterledens Camping.',
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
    else if(['664943','359873','347908'].includes(candidate.reference)){
      state.savedCamperStops[index]=Object.assign({},state.savedCamperStops[index],candidate);
      changed=true;
    }
  });

  if(changed&&typeof save==='function')save();
})();