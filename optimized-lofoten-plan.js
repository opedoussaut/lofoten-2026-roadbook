'use strict';

(function installOptimizedLofotenPlan(){
  const PLAN_VERSION='v65-max-lofoten';
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
    ['02/09','Uttakleiv','Lofoten Beach Camp',55,1.2,'Lofoten Centre-Ouest','Kvalvika ou Holandsmælen puis plage de Skagsanden','Ne choisir qu’une randonnée; arrivée assez tôt au camping'],
    ['03/09','Lofoten Beach Camp','Moskenes Camping',50,1.2,'Lofoten Ouest','Nusfjord, Hamnøy, Sakrisøy, Reine et Å','Olivier peut faire Reinebringen tôt uniquement si les conditions sont parfaites'],
    ['04/09','Moskenes Camping','Lofoten Beach Camp',50,1.2,'Journée météo Lofoten','Matinée libre à Reine/Å puis retour tranquille par Ramberg et Flakstad','Dernière journée complète dans les Lofoten; rattraper la randonnée prioritaire manquée'],
    ['05/09','Lofoten Beach Camp','Abisko Mountain Lodge',380,5.7,'Retour 100 % route','E10 vers Leknes, Svolvær, Narvik puis Abisko','Trois pauses; aucune traversée maritime'],
    ['06/09','Abisko Mountain Lodge','First Camp Nydala · Umeå',690,8.1,'Retour soutenu','E10 par Kiruna et Gällivare puis E4 vers Umeå','Grande journée assumée pour gagner deux jours dans les Lofoten'],
    ['07/09','Umeå','Gävle Camping Engesberg',467,5.3,'Retour','E4 le long du golfe de Botnie jusqu’à Gävle','Arrivée dans un camping côtier calme'],
    ['08/09','Gävle','First Camp Sibbarp · Malmö',716,7.5,'Retour soutenu','E4 vers Stockholm puis Jönköping et Malmö','Longue journée; pauses toutes les deux heures'],
    ['09/09','Malmö','Campingplatz Waldwinkel · Bramsche',705,7.2,'Ponts + Allemagne','Øresund, Copenhague, Grand Belt, Kolding, Flensburg puis nord-ouest de l’Allemagne','Aucun ferry; arrivée dans un site calme et boisé'],
    ['10/09','Campingplatz Waldwinkel · Bramsche','Maison · Chevreuse',685,7,'Arrivée maison','Pays-Bas ou Ruhr, Belgique puis Île-de-France selon trafic','Départ tôt; arrivée obligatoire à la maison, même tardive'],
    ['11/09','Chevreuse','Roadsurfer · Champlan',25,0.7,'Restitution','Nettoyage, vidanges, plein, AdBlue et photos','Départ avec une large marge avant 17 h']
  ];

  const NIGHTS={
    '25/08':{preferred:{name:'Park4Night #53279',url:P('53279'),role:'Première nuit confirmée.',calm:'4/5',paddy:'Promenade calme dès l’arrivée.'},alternatives:[]},
    '26/08':{preferred:{name:'Park4Night #84058',url:P('84058'),role:'Étape confirmée dans le sud de la Suède.',calm:'4/5',paddy:'Choisir la zone la plus éloignée de la circulation.'},alternatives:[]},
    '27/08':{preferred:{name:'Forsgården · Park4Night #188958',url:P('188958'),role:'Petite aire nature près de Gävle.',calm:'4.5/5',paddy:'Marche facile au bord de l’eau.'},alternatives:[]},
    '28/08':{preferred:{name:'Park4Night #140798',url:P('140798'),role:'Étape avant la Laponie.',calm:'4/5',paddy:'Dernière sortie tranquille avant le coucher.'},alternatives:[]},
    '29/08':{preferred:{name:'Abisko Mountain Lodge',url:'https://www.abiskomountainlodge.se/',role:'Nuit à Abisko avant l’entrée dans les Lofoten.',calm:'5/5',paddy:'Récupération complète après la longue traversée.'},alternatives:[]},
    '30/08':{preferred:{name:'Hov Camping',url:'https://hovgard.no/en/camping-caravanning/',role:'Base de deux nuits sur Gimsøy.',calm:'4.5/5',paddy:'Deux nuits au même endroit pour limiter les changements.'},alternatives:[]},
    '31/08':{preferred:{name:'Hov Camping',url:'https://hovgard.no/en/camping-caravanning/',role:'Seconde nuit sans refaire le camp.',calm:'4.5/5',paddy:'Journée locale et repos.'},alternatives:[]},
    '01/09':{preferred:{name:'Uttakleiv · Park4Night #38914',url:P('38914'),role:'Nuit signature sur la côte.',calm:'4.5/5',paddy:'Promenade littorale adaptée selon le vent.'},alternatives:[{name:'Haukland Beach',url:'https://visitlofoten.com/en/topic/haukland-beach/',role:'Repli proche si Uttakleiv est trop exposé.'}]},
    '02/09':{preferred:{name:'Lofoten Beach Camp',url:'https://www.lofotenbeachcamp.no/',role:'Camping directement sur la plage de Skagsanden, ouvert jusqu’au 1er novembre.',calm:'4/5',paddy:'Chiens admis en laisse; choisir une zone périphérique.'},alternatives:[{name:'Ramberg Resort Camping',url:'https://www.rambergresort.no/campsite',role:'Alternative calme sur Ramberg Beach, ouverte jusqu’au 30 septembre.'}]},
    '03/09':{preferred:{name:'Moskenes Camping',url:'https://moskenescamping.no/',role:'Base pratique pour Reine, Sørvågen et Å.',calm:'4/5',paddy:'Soirée calme après les villages de l’ouest.'},alternatives:[]},
    '04/09':{preferred:{name:'Lofoten Beach Camp',url:'https://www.lofotenbeachcamp.no/',role:'Dernière nuit dans les Lofoten et meilleur positionnement pour le retour routier.',calm:'4/5',paddy:'Grande promenade de plage avant la longue route du lendemain.'},alternatives:[{name:'Ramberg Resort Camping',url:'https://www.rambergresort.no/campsite',role:'Alternative plus calme si le Beach Camp est animé.'}]},
    '05/09':{preferred:{name:'Abisko Mountain Lodge',url:'https://www.abiskomountainlodge.se/',role:'Étape connue après la sortie des Lofoten par l’E10.',calm:'5/5',paddy:'Récupération immédiate dans un environnement calme.'},alternatives:[{name:'Abisko Turiststation',url:'https://www.swedishtouristassociation.com/facilities/stf-abisko-turiststation/',role:'Alternative proche du parc national.'}]},
    '06/09':{preferred:{name:'First Camp Nydala · Umeå',url:'https://en.firstcamp.se/destinations/nydala-umea',role:'Camping ouvert toute l’année, emplacements camping-car et services de vidange.',calm:'4/5',paddy:'Réserver un emplacement dans le coin le plus calme.'},alternatives:[]},
    '07/09':{preferred:{name:'Gävle Camping Engesberg',url:'https://www.campinggavle.se/',role:'Camping familial côtier ouvert toute l’année, avec auto-enregistrement tardif.',calm:'4.5/5',paddy:'Plage et chemins de promenade autour du site.'},alternatives:[{name:'Forsgården · Park4Night #188958',url:P('188958'),role:'Alternative déjà connue si vous préférez l’aire nature.'}]},
    '08/09':{preferred:{name:'First Camp Sibbarp · Malmö',url:'https://en.firstcamp.se/destinations/sibbarp-malmo',role:'Camping côtier ouvert toute l’année avant le pont de l’Øresund.',calm:'4/5',paddy:'Promenade littorale en laisse après la route.'},alternatives:[{name:'Falsterbo Resort',url:'https://falsterboresort.se/en/',role:'Alternative plus calme au sud de Malmö.'}]},
    '09/09':{preferred:{name:'Campingplatz Waldwinkel · Bramsche',url:'https://campingplatz-waldwinkel.de/campingplatz-waldwinkel-bramsche-in-niedersachsen/',role:'Camping boisé ouvert toute l’année, bien placé pour la dernière étape.',calm:'4.5/5',paddy:'Forêt et longues promenades; animaux acceptés.'},alternatives:[]},
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
    {date:'02 & 04/09',name:'Lofoten Beach Camp',lat:68.089,lon:13.236},
    {date:'03/09',name:'Moskenes',lat:67.901,lon:13.046},
    {date:'05/09',name:'Abisko',lat:68.354,lon:18.832},
    {date:'06/09',name:'First Camp Nydala · Umeå',lat:63.860,lon:20.343},
    {date:'07/09',name:'Gävle Camping Engesberg',lat:60.733,lon:17.291},
    {date:'08/09',name:'First Camp Sibbarp · Malmö',lat:55.578,lon:12.910},
    {date:'09/09',name:'Campingplatz Waldwinkel · Bramsche',lat:52.396,lon:8.000},
    {date:'10/09',name:'Maison · Chevreuse',lat:48.706,lon:2.038},
    {date:'11/09',name:'Roadsurfer · Champlan',lat:48.708,lon:2.279}
  ];

  const ROAD_GROUPS=[
    [[2.038,48.706],[9.99,53.55],[9.45,54.79],[10.39,55.40],[12.57,55.68],[14.30,57.90],[17.074,60.675],[20.50,64.50],[22.154,65.584],[20.226,67.856],[18.832,68.354],[17.427,68.438],[14.568,68.235],[14.117,68.341],[13.507,68.209],[13.236,68.089],[13.046,67.901]],
    [[13.046,67.901],[13.236,68.089]],
    [[13.236,68.089],[14.568,68.235],[17.427,68.438],[18.832,68.354]],
    [[18.832,68.354],[20.226,67.856],[22.154,65.584],[20.952,64.750],[20.343,63.860]],
    [[20.343,63.860],[18.068,59.329],[17.291,60.733]],
    [[17.291,60.733],[18.068,59.329],[14.162,57.783],[13.003,55.605],[12.910,55.578]],
    [[12.910,55.578],[12.568,55.676],[10.39,55.40],[9.50,55.49],[9.45,54.79],[9.99,53.55],[8.000,52.396]],
    [[8.000,52.396],[7.46,51.51],[6.96,50.94],[5.57,50.63],[4.35,50.85],[2.038,48.706],[2.279,48.708]]
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
    state.activeRoutePlan='max-lofoten-road-only';
    state.routePlanVersion=PLAN_VERSION;
    state.routePolicy={noFerry:'Aucun ferry pendant tout le voyage',lofoten:'Six nuits dans les Lofoten du 30 août au 5 septembre',returnRoute:'E10 vers Abisko puis Umeå, Gävle, Malmö et Bramsche',home:'Chevreuse le 10 septembre',paddy:'Paddy reste toujours avec Olivier et Sorya; pauses et nuits calmes prioritaires'};
    if(state.current)state.current.decision='Maximiser les Lofoten jusqu’au 5 septembre puis retour routier soutenu';
    delete state.ferryBooking;
    save();
  }

  function renderDashboardOptimized(){
    const stage=currentStage();
    byId('app').innerHTML=`
      <section class="card" style="border-left:5px solid #0f766e;margin-bottom:12px"><p class="eyebrow">PLAN OFFICIEL · LOFOTEN PRIORITAIRES</p><h2>Six nuits et cinq journées complètes dans les Lofoten</h2><p>Arrivée le 30 août, dernière nuit le 4 septembre et départ le 5 septembre. Le retour est volontairement plus dense mais reste réparti sur six jours et sans aucun ferry.</p></section>
      <div class="grid">${card('Séjour Lofoten','30/08 → 05/09','6 nuits')}${card('Journées complètes','31/08 → 04/09','5 journées')}${card('Retour routier','05/09 → 10/09','6 étapes')}${card('Distance planifiée',totalKm().toLocaleString('fr-FR')+' km','hors excursions')}</div>
      ${stage?`<section class="card" style="margin-top:12px"><p class="eyebrow">ÉTAPE DU JOUR</p><h2>${esc(stage[1])} → ${esc(stage[2])}</h2><p><b>≈ ${esc(stage[3])} km · ${esc(stage[4])} h de conduite</b></p><p>${esc(stage[6])}</p><p class="muted">${esc(stage[7])}</p></section>`:''}
      <section class="card" style="margin-top:12px"><h2>Compromis assumé</h2><p>Le gain de deux journées dans les Lofoten est obtenu grâce aux étapes Abisko–Umeå, Gävle–Malmö et Malmö–Bramsche. Les temps indiqués sont des temps de conduite; prévoir les pauses de Paddy, les repas, le carburant et le trafic en plus.</p></section>`;
  }

  function renderItineraryOptimized(){
    byId('app').innerHTML=`<section class="card" style="margin-bottom:12px"><div class="nightly-options-heading"><div><p class="eyebrow">ITINÉRAIRE OPTIMISÉ · LOFOTEN D’ABORD</p><h1>Trajet, nuits et journées sur place</h1></div><div style="text-align:right"><b>${totalKm().toLocaleString('fr-FR')} km</b><br><span>zéro ferry</span></div></div><div class="popup-warning"><b>Optimisation :</b> au lieu de repartir le 3 septembre, vous restez dans l’archipel jusqu’au matin du 5 septembre. Cela ajoute deux journées complètes sur place sans sacrifier l’arrivée à Chevreuse le 10.</div></section>${ITINERARY.map((row,index)=>{const [date,from,to,km,hours,type,goal,paddy]=row;const night=NIGHTS[date];const lofoten=['30/08','31/08','01/09','02/09','03/09','04/09'].includes(date);const longReturn=['06/09','08/09','09/09','10/09'].includes(date);return `<article class="card" style="margin-bottom:12px;${lofoten?'border:2px solid #0f766e;':''}${longReturn?'border-left:5px solid #b45309;':''}"><div class="nightly-options-heading"><div><p class="eyebrow">ÉTAPE ${index+1} · ${esc(date)}${lofoten?' · LOFOTEN':''}</p><h2>${esc(from)} → ${esc(to)}</h2></div><div style="text-align:right"><b>≈ ${esc(km)} km</b><br><span>${esc(hours)} h · ${esc(type)}</span></div></div><p>${esc(goal)}</p><p class="muted"><b>Paddy :</b> ${esc(paddy)}</p>${date==='04/09'?'<div class="popup-warning"><b>Journée météo essentielle :</b> utiliser cette journée pour la randonnée 4–5 étoiles empêchée par la pluie, le vent ou la fatigue, plutôt que d’ajouter une activité moyenne.</div>':''}${date==='05/09'?'<div class="popup-warning"><b>Fin du séjour Lofoten :</b> départ après une dernière promenade sur la plage, puis E10 vers Narvik et Abisko.</div>':''}${night?`<p class="muted" style="margin:10px 0 4px">NUIT PRÉFÉRÉE</p>${nightOption(night.preferred,true)}${night.alternatives?.length?`<details><summary><b>Voir l’alternative</b></summary>${night.alternatives.map(x=>nightOption(x,false)).join('')}</details>`:''}`:''}${date==='10/09'?'<div class="popup-warning"><b>Objectif impératif :</b> dormir à la maison à Chevreuse.</div>':''}</article>`;}).join('')}`;
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

  async function drawOptimizedMap(){
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
      status.innerHTML='<b>Carte optimisée chargée.</b> Le tracé suit les routes, conserve six nuits dans les Lofoten et ne comporte aucun segment maritime.';
    }catch(error){
      console.error(error);
      status.innerHTML='<b>Le calcul routier est momentanément indisponible.</b> Aucun trait droit trompeur n’est affiché. <button id="retry-route">Réessayer</button>';
      const retry=byId('retry-route');if(retry)retry.onclick=drawOptimizedMap;
    }
  }

  function renderMapOptimized(){
    byId('app').innerHTML=`<section class="card"><p class="eyebrow">CARTE · LOFOTEN MAXIMISÉES</p><h2>Six nuits dans l’archipel, puis retour accéléré</h2><p>Le retour part de Lofoten Beach Camp le 5 septembre, rejoint Abisko, Umeå, Gävle, Malmö et Bramsche, puis Chevreuse. Le trajet utilise uniquement les routes et les ponts.</p><div id="route-status" class="status">Calcul de l’itinéraire routier…</div><div id="map-canvas" class="map" style="margin-top:12px"></div><div class="popup-warning"><b>GPS camping-car :</b> conserver « éviter les ferries » et vérifier les dimensions 7,80 m × 2,74 m × 3,25 m · 3,50 t.</div></section>`;
    setTimeout(drawOptimizedMap,0);
  }

  migrate();
  window.renderDashboard=renderDashboardOptimized;
  window.renderItinerary=renderItineraryOptimized;
  window.renderMap=renderMapOptimized;
  try{renderDashboard=renderDashboardOptimized;renderItinerary=renderItineraryOptimized;renderMap=renderMapOptimized;}catch{}
})();
