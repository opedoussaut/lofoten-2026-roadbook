'use strict';

(function installNorwayReturnPlan(){
  const PLAN_VERSION='v66-norway-return';
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
    ['05/09','Lofoten Beach Camp','Abisko Mountain Lodge',380,5.7,'Sortie des Lofoten','E10 vers Leknes, Svolvær, Narvik puis Abisko','Trois pauses; aucune traversée maritime'],
    ['06/09','Abisko Mountain Lodge','Rana Camping · Mo i Rana',852,10.6,'Très longue étape','Abisko → Kiruna → Gällivare → Storuman → Hemavan → E12 → Mo i Rana','Journée exceptionnelle; départ très tôt, quatre vraies pauses et aucun objectif touristique'],
    ['07/09','Mo i Rana','Halland Camping · Rennebu',560,7.8,'Norvège E6','Saltfjellet, Mosjøen, Grong, Trondheim puis Rennebu','Arrivée au calme au sud de Trondheim; longue promenade pour Paddy'],
    ['08/09','Rennebu','Topcamp Ekeberg · Oslo',450,6.2,'Norvège intérieure','Dovrefjell, Gudbrandsdalen puis Oslo','Journée plus équilibrée; arrivée avant la fermeture de la réception'],
    ['09/09','Oslo','Wohnmobilhafen Hamburg Süd',1062,10.6,'Très longue étape','E6 par Göteborg et Malmö, pont de l’Øresund, Grand Belt, Kolding et Flensburg','Aucun ferry; départ avant l’aube et pauses toutes les deux heures'],
    ['10/09','Hamburg Süd','Maison · Chevreuse',913,9.5,'Arrivée très tardive acceptée','A1/A7 vers Brême puis Pays-Bas ou Ruhr, Belgique et Île-de-France selon trafic','Arrivée possible entre 22 h et minuit; priorité absolue à la sécurité'],
    ['11/09','Chevreuse','Roadsurfer · Champlan',25,0.7,'Restitution','Nettoyage, vidanges, plein, AdBlue et photos','Départ avec une large marge avant 17 h']
  ];

  const RETURN_NIGHTS={
    '05/09':{preferred:{name:'Abisko Mountain Lodge',url:'https://www.abiskomountainlodge.se/',role:'Étape connue après la sortie des Lofoten par l’E10.',calm:'5/5',paddy:'Récupération immédiate après la première journée de retour.'},alternatives:[]},
    '06/09':{preferred:{name:'Rana Camping',url:'https://mocamping.no/',role:'Camping pour bobil au bord de la rivière, ouvert en septembre.',calm:'4/5',paddy:'Klokkerhagen offre de longs chemins de promenade.'},alternatives:[{name:'Røssvoll Camping',url:'https://www.rossvollcamping.no/en/',role:'Alternative calme à 10 km au nord de Mo i Rana.'}]},
    '07/09':{preferred:{name:'Halland Camping · Rennebu',url:'https://www.hallandcamping.no/accommodation/camping',role:'Emplacements camping-car au calme, au sud de Trondheim.',calm:'4.5/5',paddy:'Demander un emplacement périphérique et garder Paddy en laisse.'},alternatives:[]},
    '08/09':{preferred:{name:'Topcamp Ekeberg · Oslo',url:'https://topcamp.no/en/topcamp-ekeberg/stay',role:'Camping ouvert jusqu’au 15 septembre, pratique avant la grande étape vers Hambourg.',calm:'3.5/5',paddy:'Promenade à Ekebergparken avant le coucher.'},alternatives:[{name:'Sjølyst Marina motorhome parking',url:'https://bobilparkering.no/en/pages/bobil-parkering',role:'Alternative ouverte jusqu’au 15 septembre, mais plus urbaine et potentiellement plus bruyante.'}]},
    '09/09':{preferred:{name:'Wohnmobilhafen Hamburg Süd',url:'https://www.hamburg-travel.com/see-explore/green-hamburg/campgrounds/wohnmobilhafen-hamburg-sued/',role:'Ouvert toute l’année, à 2 km de l’A1 avec services complets.',calm:'3.5/5',paddy:'Promenade sur la digue après l’arrivée.'},alternatives:[{name:'Elbepark Bunthaus',url:'https://www.hamburg-travel.com/see-explore/green-hamburg/campgrounds/camper-van-site-elbepark-bunthaus-hamburg/',role:'Alternative plus nature au bord de l’Elbe.'}]},
    '10/09':{preferred:{name:'Maison · Chevreuse',url:'https://www.google.com/maps/search/Chevreuse+France',role:'Arrivée obligatoire, même très tardive.',calm:'5/5',paddy:'Retour dans son environnement familier.'},alternatives:[]}
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
    {date:'06/09',name:'Rana Camping',lat:66.324,lon:14.125},
    {date:'07/09',name:'Halland Camping',lat:62.820,lon:9.870},
    {date:'08/09',name:'Topcamp Ekeberg',lat:59.900,lon:10.784},
    {date:'09/09',name:'Wohnmobilhafen Hamburg Süd',lat:53.483,lon:10.018},
    {date:'10/09',name:'Maison · Chevreuse',lat:48.706,lon:2.038},
    {date:'11/09',name:'Roadsurfer · Champlan',lat:48.708,lon:2.279}
  ];

  const ROAD_GROUPS=[
    [[2.038,48.706],[9.99,53.55],[9.45,54.79],[10.39,55.40],[12.57,55.68],[14.30,57.90],[17.074,60.675],[20.50,64.50],[22.154,65.584],[20.226,67.856],[18.832,68.354],[17.427,68.438],[14.568,68.235],[14.117,68.341],[13.507,68.209],[13.236,68.089],[13.046,67.901]],
    [[13.046,67.901],[13.236,68.089],[14.568,68.235],[17.427,68.438],[18.832,68.354]],
    [[18.832,68.354],[20.226,67.856],[20.652,67.134],[20.65,66.39],[19.17,65.59],[17.11,65.10],[15.09,65.82],[14.125,66.324]],
    [[14.125,66.324],[13.50,65.84],[13.18,65.32],[12.21,64.47],[10.40,63.43],[9.87,62.82]],
    [[9.87,62.82],[10.13,61.11],[10.75,59.91],[10.784,59.900]],
    [[10.784,59.900],[11.974,57.709],[12.910,55.578],[12.568,55.676],[10.39,55.40],[9.50,55.49],[9.45,54.79],[10.018,53.483]],
    [[10.018,53.483],[8.80,53.08],[7.46,51.51],[6.96,50.94],[5.57,50.63],[4.35,50.85],[2.038,48.706],[2.279,48.708]]
  ];

  function cloneData(v){return JSON.parse(JSON.stringify(v));}
  function totalKm(){return ITINERARY.reduce((sum,row)=>sum+(Number(row[3])||0),0);}
  function optionHtml(option,preferred=false){
    if(!option)return '';
    return `<div style="margin:8px 0"><a class="btn ${preferred?'primary':''}" href="${esc(option.url)}" target="_blank" rel="noopener">${preferred?'⭐ ':''}${esc(option.name)} ↗</a><p class="muted" style="margin:6px 0 0">${esc(option.role||'')}</p>${preferred?`<p style="margin:4px 0 0"><b>Calme ${esc(option.calm||'—')}</b> · ${esc(option.paddy||'')}</p>`:''}</div>`;
  }
  function currentStage(){
    const parts=String(state.current?.date||'').split('-');
    const date=parts.length===3?`${parts[2]}/${parts[1]}`:'';
    return ITINERARY.find(row=>row[0]===date)||null;
  }

  function migrate(){
    if(state.routePlanVersion===PLAN_VERSION)return;
    const existingNights=state.nightlyOptions||{};
    state.itinerary=cloneData(ITINERARY);
    state.nightlyOptions=Object.assign({},existingNights,cloneData(RETURN_NIGHTS));
    state.activeRoutePlan='norway-heavy-road-only';
    state.routePlanVersion=PLAN_VERSION;
    state.routePolicy={noFerry:'Aucun ferry pendant tout le voyage',norwayReturn:'Sortie obligatoire par la Suède jusqu’à Mo i Rana, puis retour majoritairement norvégien par l’E6, Trondheim et Oslo',home:'Chevreuse le 10 septembre, arrivée très tardive acceptée',paddy:'Paddy reste toujours avec Olivier et Sorya; pauses toutes les deux heures sur les longues étapes'};
    if(state.current)state.current.decision='Conserver 6 nuits dans les Lofoten puis rentrer par Mo i Rana, Trondheim et Oslo sans ferry';
    save();
  }

  function renderDashboardNorway(){
    const stage=currentStage();
    byId('app').innerHTML=`<section class="card" style="border-left:5px solid #0f766e;margin-bottom:12px"><p class="eyebrow">PLAN OFFICIEL · 6 NUITS LOFOTEN · RETOUR NORVÈGE</p><h2>Suède uniquement pour contourner Tysfjord</h2><p>Le retour quitte Abisko par l’intérieur de la Suède, rentre en Norvège à Mo i Rana, puis suit l’E6 par Trondheim et Oslo. Aucun ferry n’est utilisé.</p></section><div class="grid">${card('Nuits Lofoten','6','30 août → 5 septembre')}${card('Retour Norvège','Mo i Rana → Trondheim → Oslo','7–9 septembre')}${card('Arrivée maison','10/09 très tard','Chevreuse')}${card('Distance planifiée',totalKm().toLocaleString('fr-FR')+' km','hors excursions')}</div>${stage?`<section class="card" style="margin-top:12px"><p class="eyebrow">ÉTAPE DU JOUR</p><h2>${esc(stage[1])} → ${esc(stage[2])}</h2><p><b>≈ ${esc(stage[3])} km · ${esc(stage[4])} h de conduite pure</b></p><p>${esc(stage[6])}</p><p class="muted">${esc(stage[7])}</p></section>`:''}<section class="card" style="margin-top:12px"><div class="popup-warning"><b>Point clé :</b> un retour entièrement norvégien depuis Narvik reste impossible sans ferry à Tysfjord. Le détour Abisko–Storuman–Mo i Rana est la seule façon de retrouver l’E6 norvégienne sans traversée maritime.</div></section>`;
  }

  function renderItineraryNorway(){
    byId('app').innerHTML=`<section class="card" style="margin-bottom:12px"><div class="nightly-options-heading"><div><p class="eyebrow">ITINÉRAIRE OPTIMISÉ · RETOUR NORVÈGE</p><h1>Six nuits dans les Lofoten, arrivée tardive acceptée</h1></div><div style="text-align:right"><b>${totalKm().toLocaleString('fr-FR')} km</b><br><span>zéro ferry</span></div></div><div class="popup-warning"><b>Rythme assumé :</b> le 6, le 9 et le 10 septembre sont de très longues journées. Les durées affichées sont de la conduite pure et n’incluent ni pauses, ni carburant, ni trafic.</div></section>${ITINERARY.map((row,index)=>{const [date,from,to,km,hours,type,goal,paddy]=row;const night=(state.nightlyOptions||{})[date];const critical=['06/09','09/09','10/09'].includes(date);return `<article class="card" style="margin-bottom:12px;${critical?'border:3px solid #b45309;':''}"><div class="nightly-options-heading"><div><p class="eyebrow">ÉTAPE ${index+1} · ${esc(date)}</p><h2>${esc(from)} → ${esc(to)}</h2></div><div style="text-align:right"><b>≈ ${esc(km)} km</b><br><span>${esc(hours)} h · ${esc(type)}</span></div></div><p>${esc(goal)}</p><p class="muted"><b>Paddy :</b> ${esc(paddy)}</p>${date==='06/09'?'<div class="popup-warning"><b>Contournement sans ferry :</b> Abisko → Kiruna → Gällivare → Storuman → Hemavan → Mo i Rana. Ne pas laisser le GPS repartir vers Narvik et Bognes.</div>':''}${night?`<p class="muted" style="margin:10px 0 4px">NUIT PRÉFÉRÉE</p>${optionHtml(night.preferred,true)}${night.alternatives?.length?`<details><summary><b>Voir les alternatives</b></summary>${night.alternatives.map(x=>optionHtml(x,false)).join('')}</details>`:''}`:''}${date==='10/09'?'<div class="popup-warning"><b>Arrivée tardive acceptée :</b> viser une arrivée entre 22 h et minuit, mais s’arrêter immédiatement si la fatigue devient dangereuse.</div>':''}</article>`;}).join('')}`;
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
  async function route(coords){
    const chain=coords.map(([lon,lat])=>`${lon},${lat}`).join(';');
    const response=await fetch(`https://router.project-osrm.org/route/v1/driving/${chain}?overview=full&geometries=geojson&steps=false&continue_straight=true`,{cache:'no-store'});
    if(!response.ok)throw new Error(`OSRM ${response.status}`);
    const data=await response.json();
    if(data.code!=='Ok'||!data.routes?.[0])throw new Error('Itinéraire routier indisponible');
    return data.routes[0].geometry.coordinates.map(([lon,lat])=>[lat,lon]);
  }
  async function draw(){
    const status=byId('route-status');
    try{
      await loadLeaflet();
      if(window.__roadMap){try{window.__roadMap.remove();}catch{}}
      const map=window.__roadMap=L.map('map-canvas',{preferCanvas:true}).setView([58,11],4);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© OpenStreetMap'}).addTo(map);
      const routes=[];for(const group of ROAD_GROUPS)routes.push(await route(group));
      routes.forEach(points=>L.polyline(points,{weight:4,opacity:.9}).addTo(map));
      STOPS.forEach((stop,index)=>L.marker([stop.lat,stop.lon]).addTo(map).bindPopup(`<b>${index+1}. ${esc(stop.name)}</b><br>${esc(stop.date)}`));
      map.fitBounds(routes.flat(),{padding:[24,24]});
      status.innerHTML='<b>Retour Norvège sans ferry chargé.</b> Le tracé contourne Tysfjord par Storuman et l’E12, rejoint Mo i Rana, puis descend par Trondheim et Oslo.';
    }catch(error){console.error(error);status.innerHTML='<b>Le calcul routier est momentanément indisponible.</b> Aucun trait droit trompeur n’est affiché. <button id="retry-route">Réessayer</button>';const retry=byId('retry-route');if(retry)retry.onclick=draw;}
  }
  function renderMapNorway(){
    byId('app').innerHTML=`<section class="card"><p class="eyebrow">CARTE ROUTIÈRE · RETOUR NORVÈGE</p><h2>Lofoten → Abisko → Storuman → Mo i Rana → Trondheim → Oslo</h2><p>La brève boucle suédoise entre Abisko et Mo i Rana sert uniquement à contourner les deux traversées de Tysfjord. Le reste du retour scandinave privilégie la Norvège.</p><div id="route-status" class="status">Calcul de l’itinéraire routier…</div><div id="map-canvas" class="map" style="margin-top:12px"></div><div class="popup-warning"><b>GPS camping-car :</b> activer « éviter les ferries » et imposer Storuman puis Mo i Rana le 6 septembre; sinon le GPS risque de proposer Bognes–Skarberget.</div></section>`;
    setTimeout(draw,0);
  }

  migrate();
  window.renderDashboard=renderDashboardNorway;
  window.renderItinerary=renderItineraryNorway;
  window.renderMap=renderMapNorway;
  try{renderDashboard=renderDashboardNorway;renderItinerary=renderItineraryNorway;renderMap=renderMapNorway;}catch{}
})();
