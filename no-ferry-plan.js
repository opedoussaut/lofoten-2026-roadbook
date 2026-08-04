'use strict';

(function installNoFerryPlan(){
  const PLAN_VERSION='v63-road-only';
  const P=id=>`https://park4night.com/fr/place/${id}`;

  const ITINERARY=[
    ['25/08','Chevreuse','Park4Night #53279',900,10,'Transit long','Départ très tôt vers le nord de l’Allemagne','Pauses régulières et promenade calme de Paddy avant la nuit'],
    ['26/08','Park4Night #53279','Park4Night #84058',620,8,'Transit long','Danemark par les ponts puis sud de la Suède','Aucun ferry; pause longue au milieu de journée'],
    ['27/08','Park4Night #84058','Forsgården #188958',435,5.8,'Transit','Étape plus douce vers Gävle','Arrivée assez tôt pour une promenade au calme'],
    ['28/08','Forsgården #188958','Park4Night #140798',500,6.2,'Transit','Remontée vers le nord par l’E4','Ravitaillement avant les secteurs isolés'],
    ['29/08','Park4Night #140798','Abisko Mountain Lodge',690,8.5,'Transit long','Grande traversée de la Laponie','Dernière très longue étape avant les Lofoten'],
    ['30/08','Abisko Mountain Lodge','Hov Camping · Gimsøy',355,5.5,'Arrivée Lofoten','Narvik puis E10 jusqu’à Gimsøy','Installation pour deux nuits sans déplacer le camping-car'],
    ['31/08','Hov Camping','Hov Camping',35,1,'Lofoten Est','Henningsvær puis Linken ou Tjeldbergtinden selon météo','Journée locale; Paddy reste avec vous sur l’option retenue'],
    ['01/09','Hov Camping','Uttakleiv',80,1.7,'Lofoten Centre','Haukland → Uttakleiv par l’ancienne route côtière','Peu de conduite et grande promenade familiale'],
    ['02/09','Uttakleiv','Moskenes Camping',95,2.5,'Lofoten Ouest','Kvalvika ou Holandsmælen le matin, puis Hamnøy, Reine et Å','Ne choisir qu’une randonnée; conserver du temps calme pour Paddy'],
    ['03/09','Moskenes Camping','Abisko Mountain Lodge',409,6,'Retour 100 % route','Retour vers l’est par toute l’E10: Leknes, Svolvær, Narvik puis frontière suédoise','Trois pauses; aucune traversée maritime'],
    ['04/09','Abisko Mountain Lodge','First Camp Arcus · Luleå',433,5.2,'Laponie suédoise','E10 par Kiruna et Gällivare puis E4 vers Luleå','Arrivée en bord de rivière pour une vraie promenade'],
    ['05/09','Luleå','First Camp Fläsian · Sundsvall',525,6.2,'Suède E4','Descente régulière le long du golfe de Botnie','Pauses toutes les deux heures et sortie longue à l’arrivée'],
    ['06/09','Sundsvall','First Camp Ånnaboda · Örebro',441,5.5,'Suède centrale','E4/E18 vers Örebro, sans traverser Stockholm-centre','Nuit nature à l’ouest d’Örebro'],
    ['07/09','Örebro','First Camp Sibbarp · Malmö',481,5.4,'Sud de la Suède','E20/E4 vers Malmö','Arrivée tôt, promenade côtière et récupération'],
    ['08/09','Malmö','Campingpark Südheide',600,6.5,'Ponts + Allemagne','Pont de l’Øresund, Copenhague, Grand Belt, Kolding, Flensburg puis Hambourg','Aucun ferry; pauses courtes mais régulières'],
    ['09/09','Campingpark Südheide','Camping Officiel Arlon',520,5.8,'Allemagne + Belgique','Hanovre, Kassel, Cologne, Trèves puis Ardenne belge','Nuit verte et calme avec promenade en forêt'],
    ['10/09','Camping Officiel Arlon','Maison · Chevreuse',390,4.5,'Arrivée maison','Dernière étape courte par Luxembourg, Reims et l’Île-de-France','Arrivée obligatoire à la maison, même tardive'],
    ['11/09','Chevreuse','Roadsurfer · Champlan',25,0.7,'Restitution','Nettoyage, vidanges, plein, AdBlue et photos','Départ avec une large marge avant 17 h']
  ];

  const NIGHTS={
    '25/08':{preferred:{name:'Park4Night #53279',url:P('53279'),role:'Première nuit confirmée.',calm:'4/5',paddy:'Promenade calme dès l’arrivée.'},alternatives:[]},
    '26/08':{preferred:{name:'Park4Night #84058',url:P('84058'),role:'Étape confirmée dans le sud de la Suède.',calm:'4/5',paddy:'Choisir la zone la plus éloignée de la circulation.'},alternatives:[]},
    '27/08':{preferred:{name:'Forsgården · Park4Night #188958',url:P('188958'),role:'Petite aire nature près de Gävle.',calm:'4.5/5',paddy:'Marche facile au bord de l’eau.'},alternatives:[]},
    '28/08':{preferred:{name:'Park4Night #140798',url:P('140798'),role:'Étape avant la Laponie.',calm:'4/5',paddy:'Dernière sortie tranquille avant le coucher.'},alternatives:[]},
    '29/08':{preferred:{name:'Abisko Mountain Lodge',url:'https://www.abiskomountainlodge.se/',role:'Nuit lodge confirmée à Abisko.',calm:'5/5',paddy:'Récupération complète après la longue traversée.'},alternatives:[]},
    '30/08':{preferred:{name:'Hov Camping',url:'https://hovgard.no/en/camping-caravanning/',role:'Base de deux nuits sur Gimsøy.',calm:'4.5/5',paddy:'Deux nuits au même endroit pour limiter les changements.'},alternatives:[]},
    '31/08':{preferred:{name:'Hov Camping',url:'https://hovgard.no/en/camping-caravanning/',role:'Seconde nuit sans refaire le camp.',calm:'4.5/5',paddy:'Journée locale et repos.'},alternatives:[]},
    '01/09':{preferred:{name:'Uttakleiv · Park4Night #38914',url:P('38914'),role:'Nuit signature sur la côte.',calm:'4.5/5',paddy:'Promenade littorale adaptée selon le vent.'},alternatives:[]},
    '02/09':{preferred:{name:'Moskenes Camping',url:'https://moskenescamping.no/',role:'Dernière nuit dans les Lofoten avant le retour routier.',calm:'4/5',paddy:'Soirée calme avant la longue E10.'},alternatives:[]},
    '03/09':{preferred:{name:'Abisko Mountain Lodge',url:'https://www.abiskomountainlodge.se/',role:'Étape logique après la traversée routière complète des Lofoten.',calm:'5/5',paddy:'Lieu connu et récupération immédiate.'},alternatives:[{name:'Abisko Turiststation',url:'https://www.swedishtouristassociation.com/facilities/stf-abisko-turiststation/',role:'Alternative proche du parc national.'}]},
    '04/09':{preferred:{name:'First Camp Arcus · Luleå',url:'https://firstcamp.se/destinationer/arcus-lulea',role:'Camping en bord de rivière, pratique sans traverser le centre.',calm:'4/5',paddy:'Demander un emplacement périphérique.'},alternatives:[]},
    '05/09':{preferred:{name:'First Camp Fläsian · Sundsvall',url:'https://firstcamp.se/destinationer/flasian-sundsvall',role:'Étape côtière au sud de Sundsvall.',calm:'4/5',paddy:'Promenade en bord de mer après l’E4.'},alternatives:[]},
    '06/09':{preferred:{name:'First Camp Ånnaboda · Örebro',url:'https://firstcamp.se/destinationer/annaboda-orebro',role:'Nuit nature hors du centre d’Örebro.',calm:'4.5/5',paddy:'Forêt et chemins faciles.'},alternatives:[]},
    '07/09':{preferred:{name:'First Camp Sibbarp · Malmö',url:'https://firstcamp.se/destinationer/sibbarp-malmo',role:'Camping côtier bien placé avant l’Øresund.',calm:'4/5',paddy:'Promenade littorale en laisse.'},alternatives:[{name:'Falsterbo Resort',url:'https://falsterboresort.se/en/',role:'Alternative plus calme au sud de Malmö.'}]},
    '08/09':{preferred:{name:'Campingpark Südheide',url:'https://en.campingpark-suedheide.de/',role:'Forêt, ruisseau et parc canin clôturé.',calm:'5/5',paddy:'Emplacement calme puis promenade en forêt.'},alternatives:[]},
    '09/09':{preferred:{name:'Camping Officiel Arlon',url:'https://campingofficielarlon.be/en/',role:'Camping vert et calme dans les Ardennes.',calm:'5/5',paddy:'Bonnes possibilités de promenade vers la forêt.'},alternatives:[]},
    '10/09':{preferred:{name:'Maison · Chevreuse',url:'https://www.google.com/maps/search/Chevreuse+France',role:'Arrivée obligatoire.',calm:'5/5',paddy:'Retour dans son environnement familier.'},alternatives:[]}
  };

  const STOPS=[
    {date:'25/08',name:'Chevreuse',lat:48.706,lon:2.038},
    {date:'25/08',name:'Nuit 1',lat:53.70,lon:9.90},
    {date:'26/08',name:'Nuit 2',lat:57.90,lon:14.30},
    {date:'27/08',name:'Forsgården',lat:60.675,lon:17.074},
    {date:'28/08',name:'Nuit 4',lat:64.50,lon:20.50},
    {date:'29/08',name:'Abisko',lat:68.354,lon:18.832},
    {date:'30-31/08',name:'Hov Camping',lat:68.341,lon:14.117},
    {date:'01/09',name:'Uttakleiv',lat:68.209,lon:13.507},
    {date:'02/09',name:'Moskenes',lat:67.901,lon:13.046},
    {date:'03/09',name:'Abisko',lat:68.354,lon:18.832},
    {date:'04/09',name:'Luleå',lat:65.584,lon:22.154},
    {date:'05/09',name:'Sundsvall',lat:62.390,lon:17.306},
    {date:'06/09',name:'Ånnaboda · Örebro',lat:59.291,lon:14.916},
    {date:'07/09',name:'Malmö · Sibbarp',lat:55.578,lon:12.910},
    {date:'08/09',name:'Campingpark Südheide',lat:52.672,lon:9.936},
    {date:'09/09',name:'Camping Officiel Arlon',lat:49.683,lon:5.817},
    {date:'10/09',name:'Maison · Chevreuse',lat:48.706,lon:2.038},
    {date:'11/09',name:'Roadsurfer · Champlan',lat:48.708,lon:2.279}
  ];

  const ROAD_GROUPS=[
    [[2.038,48.706],[9.99,53.55],[9.45,54.79],[10.39,55.40],[12.57,55.68],[13.00,55.61],[14.30,57.90],[17.074,60.675],[20.50,64.50],[22.154,65.584],[20.226,67.856],[18.832,68.354],[17.427,68.438],[14.568,68.235],[14.117,68.341],[13.507,68.209],[13.046,67.901]],
    [[13.046,67.901],[13.507,68.209],[14.568,68.235],[17.427,68.438],[18.832,68.354]],
    [[18.832,68.354],[20.226,67.856],[22.154,65.584]],
    [[22.154,65.584],[20.263,63.825],[17.306,62.390]],
    [[17.306,62.390],[15.213,59.275],[14.916,59.291]],
    [[14.916,59.291],[14.162,57.782],[13.003,55.605],[12.910,55.578]],
    [[12.910,55.578],[12.568,55.676],[10.39,55.40],[10.388,55.403],[9.50,55.49],[9.45,54.79],[9.43,54.79],[9.99,53.55],[9.936,52.672]],
    [[9.936,52.672],[9.735,52.375],[9.48,51.31],[6.96,50.94],[6.64,49.75],[5.817,49.683]],
    [[5.817,49.683],[4.03,49.26],[2.038,48.706],[2.279,48.708]]
  ];

  function cloneData(value){return JSON.parse(JSON.stringify(value));}
  function totalKm(){return ITINERARY.reduce((sum,row)=>sum+(Number(row[3])||0),0);}
  function currentStage(){
    const parts=String(state.current?.date||'').split('-');
    const date=parts.length===3?`${parts[2]}/${parts[1]}`:'';
    return ITINERARY.find(row=>row[0]===date)||null;
  }
  function nightOption(option,preferred=false){
    if(!option)return '';
    return `<div style="margin:8px 0"><a class="btn ${preferred?'primary':''}" href="${esc(option.url)}" target="_blank" rel="noopener">${preferred?'⭐ ':''}${esc(option.name)} ↗</a><p class="muted" style="margin:6px 0 0">${esc(option.role||'')}</p>${preferred?`<p style="margin:4px 0 0"><b>Calme ${esc(option.calm||'—')}</b> · ${esc(option.paddy||'')}</p>`:''}</div>`;
  }

  function migrate(){
    if(state.routePlanVersion===PLAN_VERSION)return;
    state.itinerary=cloneData(ITINERARY);
    state.nightlyOptions=cloneData(NIGHTS);
    state.activeRoutePlan='road-only';
    state.routePlanVersion=PLAN_VERSION;
    state.routePolicy={noFerry:'Aucun ferry pendant tout le voyage',returnRoute:'E10 vers Narvik et Abisko, puis Suède par E4',home:'Chevreuse le 10 septembre',paddy:'Paddy reste toujours avec Olivier et Sorya; calme et pauses prioritaires'};
    if(state.current)state.current.decision='Suivre l’itinéraire 100 % routier via l’E10 et la Suède';
    delete state.ferryBooking;
    save();
  }

  function renderDashboardRoadOnly(){
    const stage=currentStage();
    byId('app').innerHTML=`
      <section class="card" style="border-left:5px solid #0f766e;margin-bottom:12px"><p class="eyebrow">PLAN OFFICIEL UNIQUE · ZÉRO FERRY</p><h2>Lofoten → Narvik → Abisko → Suède</h2><p>Le voyage est désormais entièrement routier. Le retour commence le 3 septembre par l’E10, sans Moskenes–Bodø et sans le ferry Bognes–Skarberget.</p></section>
      <div class="grid">${card('Départ',state.meta.start,state.meta.from)}${card('Arrivée maison','10/09/2026 soir','Chevreuse')}${card('Restitution',state.meta.return,state.meta.to)}${card('Distance planifiée',totalKm().toLocaleString('fr-FR')+' km','hors excursions')}</div>
      ${stage?`<section class="card" style="margin-top:12px"><p class="eyebrow">ÉTAPE DU JOUR</p><h2>${esc(stage[1])} → ${esc(stage[2])}</h2><p><b>≈ ${esc(stage[3])} km · ${esc(stage[4])} h de conduite</b></p><p>${esc(stage[6])}</p><p class="muted">${esc(stage[7])}</p></section>`:''}
      <section class="card" style="margin-top:12px"><h2>Règles fixes</h2><div class="grid"><div><b>Traversées</b><p>Aucun ferry, même court.</p></div><div><b>Retour</b><p>Départ de Moskenes le 3 septembre par l’E10.</p></div><div><b>Paddy</b><p>Reste avec vous; pauses et nuits calmes.</p></div><div><b>Échéance</b><p>Maison le 10; restitution le 11 avant 17 h.</p></div></div></section>`;
  }

  function renderItineraryRoadOnly(){
    byId('app').innerHTML=`<section class="card" style="margin-bottom:12px"><div class="nightly-options-heading"><div><p class="eyebrow">ITINÉRAIRE OFFICIEL · 100 % ROUTE</p><h1>Trajet, nuits et rythme</h1></div><div style="text-align:right"><b>${totalKm().toLocaleString('fr-FR')} km</b><br><span>zéro ferry</span></div></div><div class="popup-warning"><b>Changement majeur :</b> la dernière nuit dans les Lofoten est le 2 septembre à Moskenes. Le 3 septembre, retour vers l’est par l’E10 jusqu’à Abisko. Cette journée remplace entièrement le ferry et évite aussi le ferry routier Bognes–Skarberget.</div></section>${ITINERARY.map((row,index)=>{const [date,from,to,km,hours,type,goal,paddy]=row;const night=NIGHTS[date];return `<article class="card" style="margin-bottom:12px;${date==='03/09'?'border:3px solid #0f766e':''}${date==='10/09'?';border:2px solid #b45309':''}"><div class="nightly-options-heading"><div><p class="eyebrow">ÉTAPE ${index+1} · ${esc(date)}</p><h2>${esc(from)} → ${esc(to)}</h2></div><div style="text-align:right"><b>≈ ${esc(km)} km</b><br><span>${esc(hours)} h · ${esc(type)}</span></div></div><p>${esc(goal)}</p><p class="muted"><b>Paddy :</b> ${esc(paddy)}</p>${date==='03/09'?'<div class="popup-warning"><b>Sortie des Lofoten sans ferry :</b> E10 vers Leknes, Svolvær, Narvik, Riksgränsen et Abisko. Prévoir une vraie pause à Svolvær ou Narvik.</div>':''}${night?`<p class="muted" style="margin:10px 0 4px">NUIT PRÉFÉRÉE</p>${nightOption(night.preferred,true)}${night.alternatives?.length?`<details><summary><b>Voir l’alternative</b></summary>${night.alternatives.map(x=>nightOption(x,false)).join('')}</details>`:''}`:''}${date==='10/09'?'<div class="popup-warning"><b>Objectif impératif :</b> dormir à la maison à Chevreuse.</div>':''}</article>`;}).join('')}`;
  }

  function loadLeaflet(){
    if(window.L)return Promise.resolve();
    if(window.__leafletPromise)return window.__leafletPromise;
    window.__leafletPromise=new Promise((resolve,reject)=>{
      if(!document.querySelector('link[data-leaflet]')){const css=document.createElement('link');css.rel='stylesheet';css.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';css.dataset.leaflet='1';document.head.appendChild(css);}
      const script=document.createElement('script');script.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';script.onload=resolve;script.onerror=()=>reject(new Error('Leaflet indisponible'));document.head.appendChild(script);
    });
    return window.__leafletPromise;
  }

  async function osrmRoute(coords){
    const chain=coords.map(([lon,lat])=>`${lon},${lat}`).join(';');
    const response=await fetch(`https://router.project-osrm.org/route/v1/driving/${chain}?overview=full&geometries=geojson&steps=false&continue_straight=true`,{cache:'no-store'});
    if(!response.ok)throw new Error(`OSRM ${response.status}`);
    const data=await response.json();
    if(data.code!=='Ok'||!data.routes?.[0])throw new Error('Itinéraire routier indisponible');
    return data.routes[0].geometry.coordinates.map(([lon,lat])=>[lat,lon]);
  }

  async function drawRoadOnlyMap(){
    const status=byId('route-status');
    try{
      await loadLeaflet();
      if(window.__roadMap){try{window.__roadMap.remove();}catch{}}
      const map=window.__roadMap=L.map('map-canvas',{preferCanvas:true}).setView([58,11],4);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© OpenStreetMap'}).addTo(map);
      const routes=[];
      for(const group of ROAD_GROUPS)routes.push(await osrmRoute(group));
      routes.forEach(points=>L.polyline(points,{weight:4,opacity:.9}).addTo(map));
      STOPS.forEach((stop,index)=>L.marker([stop.lat,stop.lon]).addTo(map).bindPopup(`<b>${index+1}. ${esc(stop.name)}</b><br>${esc(stop.date)}`));
      map.fitBounds(routes.flat(),{padding:[24,24]});
      status.innerHTML='<b>Carte 100 % routière chargée.</b> Le tracé suit l’E10 vers Narvik et Abisko, puis la Suède, l’Øresund et le Grand Belt. Aucun segment maritime n’est utilisé.';
    }catch(error){
      console.error(error);
      status.innerHTML='<b>Le calcul routier est momentanément indisponible.</b> Aucun trait droit trompeur n’est affiché. <button id="retry-route">Réessayer</button>';
      const retry=byId('retry-route');if(retry)retry.onclick=drawRoadOnlyMap;
    }
  }

  function renderMapRoadOnly(){
    byId('app').innerHTML=`<section class="card"><p class="eyebrow">CARTE ROUTIÈRE · ZÉRO FERRY</p><h2>Retour des Lofoten par l’E10 et la Suède</h2><p>Le tracé suit les routes réelles. Il passe par Narvik, Abisko, Kiruna, Luleå, Sundsvall, Örebro, Malmö, Copenhague, le Grand Belt, Flensburg, l’Allemagne, Arlon et Chevreuse.</p><div id="route-status" class="status">Calcul de l’itinéraire routier…</div><div id="map-canvas" class="map" style="margin-top:12px"></div><div class="popup-warning"><b>Avant chaque départ :</b> conserver « éviter les ferries » dans le GPS camping-car et vérifier la proposition du jour, surtout entre les Lofoten et le sud de la Scandinavie.</div></section>`;
    setTimeout(drawRoadOnlyMap,0);
  }

  migrate();
  window.renderDashboard=renderDashboardRoadOnly;
  window.renderItinerary=renderItineraryRoadOnly;
  window.renderMap=renderMapRoadOnly;
  try{renderDashboard=renderDashboardRoadOnly;renderItinerary=renderItineraryRoadOnly;renderMap=renderMapRoadOnly;}catch{}
})();
