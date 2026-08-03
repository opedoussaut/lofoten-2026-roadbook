'use strict';

(function installOneFerryRoadbook(){
  const P=id=>`https://park4night.com/fr/place/${id}`;

  const ITINERARY=[
    ['25/08','Chevreuse','Park4Night #53279',900,10,'Transit','Départ très tôt vers le nord de l’Allemagne','Pauses régulières et promenade calme de Paddy avant la nuit'],
    ['26/08','Park4Night #53279','Park4Night #84058',620,8,'Transit','Danemark par les ponts puis sud de la Suède','Aucun ferry; éviter les raccourcis urbains'],
    ['27/08','Park4Night #84058','Forsgården #188958',435,5.8,'Transit','Étape plus douce vers Gävle','Arrivée assez tôt pour une promenade au calme'],
    ['28/08','Forsgården #188958','Park4Night #140798',500,6.2,'Transit','Remontée vers le nord par l’E4','Ravitaillement avant les secteurs isolés'],
    ['29/08','Park4Night #140798','Abisko Mountain Lodge',690,8.5,'Soutenue','Grande traversée de la Laponie','Dernière longue étape avant les Lofoten'],
    ['30/08','Abisko Mountain Lodge','Hov Camping · Gimsøy',355,5.5,'Lofoten','Narvik puis arrivée spectaculaire par l’E10','Installation pour deux nuits sans déplacer le camping-car'],
    ['31/08','Hov Camping','Hov Camping',0,0,'Journée locale','Henningsvær et plages de l’est','Journée sans longue conduite pour Paddy'],
    ['01/09','Hov Camping','Uttakleiv',80,1.7,'Lofoten','Progression continue vers l’ouest: Haukland puis Uttakleiv','Nuit signature sur la côte'],
    ['02/09','Uttakleiv','Lofoten Beach Camp',55,1.2,'Lofoten','Vikten MUST DO puis Flakstad','Peu de conduite et beaucoup de temps dehors'],
    ['03/09','Lofoten Beach Camp','Moskenes Camping',50,1.2,'Lofoten','Nusfjord, Hamnøy, Reine, Sørvågen et Å','Aucun retour vers l’est après Moskenes'],
    ['04/09','Moskenes Camping','Yttervik · Ranfjord',255,4,'Ferry unique + route','Ferry Moskenes–Bodø puis E6 jusqu’au Ranfjord','Seul ferry du voyage; promenade avant embarquement et après l’arrivée'],
    ['05/09','Yttervik · Ranfjord','Tråsåvika Camping',500,7,'Retour Norvège','E6 par Mosjøen et Grong jusqu’au Trondheimsfjord','Trois pauses, dont une vraie marche de 30 min pour Paddy'],
    ['06/09','Tråsåvika Camping','Larkollen Camping',590,7.5,'Retour Norvège','Dovrefjell, Lillehammer, Oslo puis Oslofjord','Journée la plus longue du retour; pauses toutes les 2 h'],
    ['07/09','Larkollen Camping','Falsterbo Resort',520,6.5,'Suède','E6 vers Göteborg puis côte ouest jusqu’à Falsterbo','Arrivée dans un environnement côtier calme'],
    ['08/09','Falsterbo Resort','Campingpark Südheide',650,7.25,'Danemark + Allemagne','Pont de l’Øresund, Grand Belt, Jutland et Flensburg','Aucun ferry; pauses courtes mais régulières'],
    ['09/09','Campingpark Südheide','Camping Officiel Arlon',520,5.8,'Transit confortable','Allemagne puis Ardenne belge','Nuit verte et calme avec bonnes promenades pour Paddy'],
    ['10/09','Camping Officiel Arlon','Maison · Chevreuse',390,4.5,'Arrivée maison','Dernière étape courte et maîtrisée','Arrivée obligatoire à la maison, même tardive'],
    ['11/09','Chevreuse','Roadsurfer · Champlan',25,0.7,'Restitution','Nettoyage, vidanges, plein, AdBlue et photos','Départ avec une large marge avant 17 h']
  ];

  const NIGHTS={
    '25/08':{preferred:{name:'Park4Night #53279',url:P('53279'),role:'Choix confirmé pour la première nuit.',calm:'4/5',paddy:'Promenade calme dès l’arrivée.'},alternatives:[{name:'Park4Night #417435',url:P('417435'),role:'Alternative 1.'},{name:'Park4Night #453901',url:P('453901'),role:'Alternative 2.'}]},
    '26/08':{preferred:{name:'Park4Night #84058',url:P('84058'),role:'Choix confirmé dans le sud de la Suède.',calm:'4/5',paddy:'Choisir la zone la plus éloignée de la circulation.'},alternatives:[{name:'Park4Night #698010',url:P('698010'),role:'Alternative 1.'},{name:'Park4Night #391481',url:P('391481'),role:'Alternative 2.'}]},
    '27/08':{preferred:{name:'Forsgården · Park4Night #188958',url:P('188958'),role:'Petite aire nature près de Gävle.',calm:'4.5/5',paddy:'Marche facile au bord de l’eau.'},alternatives:[{name:'Park4Night #214874',url:P('214874'),role:'Alternative 1.'},{name:'Park4Night #76491',url:P('76491'),role:'Alternative 2.'}]},
    '28/08':{preferred:{name:'Park4Night #140798',url:P('140798'),role:'Étape confirmée avant la Laponie.',calm:'4/5',paddy:'Dernière sortie tranquille avant le coucher.'},alternatives:[{name:'Park4Night #260263',url:P('260263'),role:'Alternative 1.'},{name:'Park4Night #698541',url:P('698541'),role:'Alternative 2.'}]},
    '29/08':{preferred:{name:'Abisko Mountain Lodge',url:'https://www.abiskomountainlodge.se/',role:'Nuit lodge confirmée à Abisko.',calm:'5/5',paddy:'Récupération complète après la longue traversée.'},alternatives:[{name:'Park4Night #133328',url:P('133328'),role:'Alternative 1.'},{name:'Park4Night #88528',url:P('88528'),role:'Alternative 2.'}]},
    '30/08':{preferred:{name:'Hov Camping',url:'https://hovgard.no/en/camping-caravanning/',role:'Plage arctique et services complets.',calm:'4.5/5',paddy:'Deux nuits au même endroit pour réduire les changements.'},alternatives:[{name:'Sandsletta Camping',url:'https://sandsletta.no/',role:'Alternative fjord et nature.'},{name:'Kabelvåg Feriehus & Camping',url:P('84297'),role:'Alternative pratique.'}]},
    '31/08':{preferred:{name:'Hov Camping',url:'https://hovgard.no/en/camping-caravanning/',role:'Seconde nuit sans refaire le camp.',calm:'4.5/5',paddy:'Journée locale et repos.'},alternatives:[{name:'Sandsletta Camping',url:'https://sandsletta.no/',role:'Alternative météo est.'},{name:'Kabelvåg Feriehus & Camping',url:P('84297'),role:'Alternative services.'}]},
    '01/09':{preferred:{name:'Uttakleiv · Park4Night #38914',url:P('38914'),role:'Nuit signature du voyage.',calm:'4.5/5',paddy:'Promenade littorale adaptée selon le vent.'},alternatives:[{name:'Haukland Beach',url:'https://visitlofoten.com/en/topic/haukland-beach/',role:'Plage voisine.'},{name:'Unstad Arctic Surf',url:'https://www.unstadarcticsurf.com/',role:'Alternative océan.'}]},
    '02/09':{preferred:{name:'Lofoten Beach Camp · Skagsanden',url:'https://www.lofotenbeachcamp.no/',role:'Camping directement sur la plage.',calm:'4.5/5',paddy:'Sortie sur la plage après la courte route.'},alternatives:[{name:'Ramberg Gjestegård',url:'https://ramberg-gjestegard.no/',role:'Alternative plage et services.'},{name:'Vikten · Park4Night #60765',url:P('60765'),role:'Alternative sauvage; vérifier le vent.'}]},
    '03/09':{preferred:{name:'Moskenes Camping',url:'https://moskenescamping.no/',role:'Dernière nuit dans les Lofoten avant le ferry.',calm:'4/5',paddy:'Soirée calme et préparation de la traversée.'},alternatives:[{name:'Reine / parking local',url:'https://visitlofoten.com/en/reine/',role:'Alternative proche.'},{name:'Sørvågen Camping',url:'https://www.google.com/maps/search/camping+Sørvågen+Norway',role:'Alternative au sud.'}]},
    '04/09':{preferred:{name:'Yttervik · Ranfjord',url:'https://visityttervik.no/en/',role:'Fjord, montagnes et environnement de récupération au sud de Mo i Rana.',calm:'5/5',paddy:'Promenade lente au bord du fjord après le ferry et la route.'},alternatives:[{name:'Korgen Camping',url:'https://korgen-camping.no/',role:'Alternative plus au sud, au bord de la rivière.'},{name:'Rognan Fjordcamp',url:'https://rognanfjordcamp.no/',role:'Alternative plus courte après Bodø.'}]},
    '05/09':{preferred:{name:'Tråsåvika Camping',url:'https://trasavika.no/en/home',role:'Emplacements au bord du Trondheimsfjord, plage et environnement naturel.',calm:'4.5/5',paddy:'Demander un emplacement périphérique éloigné du playground.'},alternatives:[{name:'Øysand Camping',url:'https://oysandcamping.no/',role:'Alternative plage et accès E6.'},{name:'Viggja Kro & Camping',url:'https://www.google.com/maps/search/Viggja+Kro+Camping+Norway',role:'Alternative locale.'}]},
    '06/09':{preferred:{name:'Larkollen Camping',url:'https://www.larkollencamping.no/',role:'Vraie coupure au bord de l’Oslofjord, avec chemins côtiers.',calm:'4.5/5',paddy:'Demander une parcelle extérieure loin de la réception et des jeux.'},alternatives:[{name:'Utne Camping · Sarpsborg',url:'https://camping.no/en/campingplasser/750872',role:'Alternative pratique plus proche de l’E6.'},{name:'Topcamp Bogstad · Oslo',url:'https://topcamp.no/en/topcamp-bogstad',role:'Alternative lac et services.'}]},
    '07/09':{preferred:{name:'Falsterbo Resort',url:'https://falsterboresort.se/en/',role:'Nature côtière, réserve de Ljungen, emplacements camping-car et silence de 23 h à 7 h.',calm:'4.5/5',paddy:'Douche pour chiens; promenade extérieure au camping, en laisse.'},alternatives:[{name:'First Camp Sibbarp · Malmö',url:'https://firstcamp.se/destinationer/sibbarp-malmo',role:'Alternative directe près du pont de l’Øresund.'},{name:'Lomma Camping',url:'https://www.google.com/maps/search/Lomma+Camping+Sweden',role:'Alternative au nord de Malmö.'}]},
    '08/09':{preferred:{name:'Campingpark Südheide',url:'https://en.campingpark-suedheide.de/',role:'Forêt, ruisseau, silence nocturne, parc canin clôturé et douche pour chien.',calm:'5/5',paddy:'Emplacement calme puis promenade douce en forêt.'},alternatives:[{name:'Campingplatz Stover Strand',url:'https://www.camping-stover-strand.de/',role:'Alternative nature sur l’Elbe.'},{name:'Elbepark Bunthaus',url:'https://www.hamburg-travel.com/see-explore/green-hamburg/campgrounds/camper-van-site-elbepark-bunthaus-hamburg/',role:'Alternative au bord de l’Elbe.'}]},
    '09/09':{preferred:{name:'Camping Officiel Arlon',url:'https://campingofficielarlon.be/en/',role:'Camping vert et calme dans les Ardennes, ouvert en septembre et bien placé pour la dernière étape.',calm:'5/5',paddy:'Bonnes possibilités de promenade vers la forêt.'},alternatives:[{name:'Camping Les Murets',url:'https://lesmurets.be/en/',role:'Alternative paisible au bord de l’Ourthe.'},{name:'Camping du Lac de Douzy',url:'https://www.ardennes.com/en/camping/camping-du-lac-de-douzy/',role:'Alternative au bord d’un lac, ouverte jusqu’à fin septembre.'}]},
    '10/09':{preferred:{name:'Maison · Chevreuse',url:'https://www.google.com/maps/search/Chevreuse+France',role:'Arrivée obligatoire, même tardive.',calm:'5/5',paddy:'Retour dans son environnement familier.'},alternatives:[]}
  };

  const STOPS=[
    {date:'25/08',name:'Chevreuse',lat:48.706,lon:2.038},
    {date:'25/08',name:'Nuit 1',lat:53.70,lon:9.90},
    {date:'26/08',name:'Nuit 2',lat:57.90,lon:14.30},
    {date:'27/08',name:'Forsgården',lat:60.675,lon:17.074},
    {date:'28/08',name:'Nuit 4',lat:64.50,lon:20.50},
    {date:'29/08',name:'Abisko',lat:68.354,lon:18.832},
    {date:'30/08',name:'Hov Camping',lat:68.341,lon:14.117},
    {date:'01/09',name:'Uttakleiv',lat:68.209,lon:13.507},
    {date:'02/09',name:'Lofoten Beach Camp',lat:68.089,lon:13.236},
    {date:'03/09',name:'Moskenes',lat:67.901,lon:13.046},
    {date:'04/09',name:'Bodø ferry terminal',lat:67.283,lon:14.376},
    {date:'04/09',name:'Yttervik · Ranfjord',lat:66.159,lon:13.997},
    {date:'05/09',name:'Tråsåvika',lat:63.310,lon:9.890},
    {date:'06/09',name:'Larkollen',lat:59.310,lon:10.686},
    {date:'07/09',name:'Falsterbo Resort',lat:55.394,lon:12.842},
    {date:'08/09',name:'Campingpark Südheide',lat:52.672,lon:9.936},
    {date:'09/09',name:'Camping Officiel Arlon',lat:49.683,lon:5.817},
    {date:'10/09',name:'Maison · Chevreuse',lat:48.706,lon:2.038},
    {date:'11/09',name:'Roadsurfer · Champlan',lat:48.708,lon:2.279}
  ];

  const ROAD_GROUPS=[
    [
      [2.038,48.706],[9.90,53.70],[9.45,54.79],[9.50,55.49],[10.39,55.40],[12.57,55.68],[13.00,55.61],[14.30,57.90],[17.074,60.675],[20.50,64.50],[18.832,68.354],[14.117,68.341],[13.507,68.209],[13.236,68.089],[13.046,67.901]
    ],
    [
      [14.376,67.283],[13.997,66.159],[9.890,63.310],[10.686,59.310],[11.97,57.71],[12.842,55.394],[12.568,55.676],[10.39,55.40],[9.45,54.79],[9.43,54.79],[9.94,53.55],[9.936,52.672]
    ],
    [
      [9.936,52.672],[6.96,50.94],[5.817,49.683],[2.038,48.706],[2.279,48.708]
    ]
  ];

  const FERRY={
    title:'Ferry unique Moskenes → Bodø · 4 septembre',
    url:'https://www.torghatten.no/en/our-routes/18-782',
    text:'Réserver une traversée directe. Arriver dans la file au moins 45 minutes avant; viser 60 à 75 minutes de marge avec le camping-car.',
    paddy:'Faire une promenade calme de 45 à 60 minutes avant l’embarquement. Confirmer avec l’équipage si Paddy reste dans le véhicule ventilé ou utilise le local chiens.'
  };

  const VEHICLE={
    category:'Roadsurfer Cozy Cottage',model:'KNAUS VAN TI PLUS · modèle de référence',engine:'Diesel 140 ch · Euro 6 · AdBlue',dimensions:'7,80 m × 2,74 m × 3,25 m dans le GPS',weight:'3,50 t',gas:'PROPANE · installation 30 mbar',notice:'Le véhicule exact doit être confirmé à Champlan: modèle, hauteur, PTAC, boîte, bouteilles et raccords.'
  };

  function seed(){
    state.itinerary=JSON.parse(JSON.stringify(ITINERARY));
    state.nightlyOptions=JSON.parse(JSON.stringify(NIGHTS));
    state.activeRoutePlan='official';
    state.meta.return='11/09/2026 17:00';
    state.meta.to='Roadsurfer · Champlan';
    state.routePolicy={singleFerry:'Moskenes–Bodø uniquement',home:'Chevreuse le 10 septembre',paddy:'Calme, pauses et nuits nature prioritaires'};
    save();
  }

  function totalKm(){return ITINERARY.reduce((sum,row)=>sum+(Number(row[3])||0),0);}
  function currentStage(){
    const parts=String(state.current?.date||'').split('-');
    const date=parts.length===3?`${parts[2]}/${parts[1]}`:'';
    return ITINERARY.find(row=>row[0]===date)||null;
  }
  function option(option,preferred=false){
    if(!option)return '';
    return `<div style="margin:8px 0"><a class="btn ${preferred?'primary':''}" href="${esc(option.url)}" target="_blank" rel="noopener">${preferred?'⭐ ':''}${esc(option.name)} ↗</a><p class="muted" style="margin:6px 0 0">${esc(option.role||'')}</p>${preferred?`<p style="margin:4px 0 0"><b>Calme ${esc(option.calm||'—')}</b> · ${esc(option.paddy||'')}</p>`:''}</div>`;
  }

  function renderDashboardOfficial(){
    const stage=currentStage();
    byId('app').innerHTML=`
      <section class="card" style="border-left:5px solid #0f766e;margin-bottom:12px"><p class="eyebrow">PLAN OFFICIEL UNIQUE</p><h2>Un seul ferry: Moskenes → Bodø</h2><p>Progression continue vers l’ouest dans les Lofoten, puis retour routier par la Norvège, la Suède, le Danemark, l’Allemagne et la Belgique.</p></section>
      <div class="grid">${card('Départ',state.meta.start,state.meta.from)}${card('Arrivée maison','10/09/2026 soir','Chevreuse')}${card('Restitution',state.meta.return,state.meta.to)}${card('Distance planifiée',totalKm().toLocaleString('fr-FR')+' km','hors excursions')}</div>
      ${stage?`<section class="card" style="margin-top:12px"><p class="eyebrow">ÉTAPE DU JOUR</p><h2>${esc(stage[1])} → ${esc(stage[2])}</h2><p><b>≈ ${esc(stage[3])} km · ${esc(stage[4])} h de conduite</b></p><p>${esc(stage[6])}</p><p class="muted">${esc(stage[7])}</p></section>`:''}
      <div class="grid" style="margin-top:12px"><section class="card"><h2>État actuel</h2><div class="form"><label>Date<input id="c-date" type="date" value="${esc(state.current.date)}"></label><label>Position<input id="c-place" value="${esc(state.current.place)}"></label><label>Météo<input id="c-weather" value="${esc(state.current.weather)}"></label><label>Énergie Olivier /5<input id="c-o" type="number" min="1" max="5" value="${state.current.olivier}"></label><label>Énergie Sorya /5<input id="c-s" type="number" min="1" max="5" value="${state.current.sorya}"></label><label>Énergie Paddy /5<input id="c-p" type="number" min="1" max="5" value="${state.current.paddy}"></label></div><label>Décision<textarea id="c-decision">${esc(state.current.decision)}</textarea></label><button id="save-current" class="primary">Enregistrer</button></section><section class="card"><h2>Suivi GPS</h2><p class="muted">La trace enregistrée complète le GPS camping-car.</p><div class="toolbar"><button id="gps-start" class="primary">Démarrer</button><button id="gps-stop">Arrêter</button><button id="gps-reset" class="danger">Réinitialiser</button></div><div id="gps-status" class="status">Suivi inactif · ${(state.gps.km||0).toFixed(1)} km</div></section></div>`;
    byId('save-current').onclick=()=>{state.current={date:byId('c-date').value,place:byId('c-place').value,weather:byId('c-weather').value,olivier:+byId('c-o').value,sorya:+byId('c-s').value,paddy:+byId('c-p').value,decision:byId('c-decision').value};save();autoSync();renderDashboardOfficial();};
    byId('gps-start').onclick=startGPS;byId('gps-stop').onclick=stopGPS;byId('gps-reset').onclick=()=>{if(confirm('Effacer la trace GPS ?')){state.gps={km:0,points:[]};save();renderDashboardOfficial();}};
  }

  function renderItineraryOfficial(){
    byId('app').innerHTML=`<section class="card" style="margin-bottom:12px"><div class="nightly-options-heading"><div><p class="eyebrow">ITINÉRAIRE OFFICIEL</p><h1>Trajet et nuits</h1></div><div style="text-align:right"><b>${totalKm().toLocaleString('fr-FR')} km</b><br><span>un seul ferry</span></div></div><div class="popup-warning"><b>Retour réaliste :</b> une seule traversée maritime, Moskenes–Bodø. Sans le second ferry, les 6 et 8 septembre sont planifiées autour de 7 h 15 à 7 h 30 de conduite pure; les pauses et le trafic s’ajoutent.</div></section>${ITINERARY.map((row,index)=>{const [date,from,to,km,hours,type,goal,paddy]=row;const night=NIGHTS[date];return `<article class="card" style="margin-bottom:12px;${date==='10/09'?'border:2px solid #b45309':''}"><div class="nightly-options-heading"><div><p class="eyebrow">ÉTAPE ${index+1} · ${esc(date)}</p><h2>${esc(from)} → ${esc(to)}</h2></div><div style="text-align:right"><b>≈ ${esc(km)} km</b><br><span>${esc(hours)} h · ${esc(type)}</span></div></div><p>${esc(goal)}</p><p class="muted"><b>Paddy :</b> ${esc(paddy)}</p>${date==='04/09'?`<section class="card" style="border:2px solid #2563eb;margin:12px 0"><p class="eyebrow">SEUL FERRY DU VOYAGE</p><h3>${esc(FERRY.title)}</h3><p>${esc(FERRY.text)}</p><p><b>Paddy :</b> ${esc(FERRY.paddy)}</p><a class="btn primary" href="${esc(FERRY.url)}" target="_blank" rel="noopener">Horaires et réservation ↗</a></section>`:''}${night?`<p class="muted" style="margin:10px 0 4px">NUIT PRÉFÉRÉE</p>${option(night.preferred,true)}${night.alternatives?.length?`<details><summary><b>Voir les alternatives</b></summary>${night.alternatives.map(x=>option(x,false)).join('')}</details>`:''}`:''}${date==='10/09'?'<div class="popup-warning"><b>Objectif impératif :</b> dormir à la maison à Chevreuse.</div>':''}</article>`;}).join('')}`;
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
    const url=`https://router.project-osrm.org/route/v1/driving/${chain}?overview=full&geometries=geojson&steps=false&continue_straight=true`;
    const response=await fetch(url,{cache:'no-store'});
    if(!response.ok)throw new Error(`OSRM ${response.status}`);
    const data=await response.json();
    if(data.code!=='Ok'||!data.routes?.[0])throw new Error('Itinéraire routier indisponible');
    return data.routes[0].geometry.coordinates.map(([lon,lat])=>[lat,lon]);
  }

  async function drawRoadMap(){
    const status=byId('route-status');
    try{
      await loadLeaflet();
      if(window.__roadMap){try{window.__roadMap.remove();}catch(e){}}
      const map=window.__roadMap=L.map('map-canvas',{preferCanvas:true}).setView([58,10],4);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© OpenStreetMap'}).addTo(map);
      const roadRoutes=await Promise.all(ROAD_GROUPS.map(osrmRoute));
      roadRoutes.forEach(points=>L.polyline(points,{weight:4,opacity:.9}).addTo(map));
      L.polyline([[67.901,13.046],[67.283,14.376]],{weight:4,dashArray:'9 9',opacity:.9}).addTo(map).bindPopup('<b>Ferry Moskenes–Bodø</b><br>Seule traversée maritime du voyage');
      STOPS.forEach((stop,index)=>L.marker([stop.lat,stop.lon]).addTo(map).bindPopup(`<b>${index+1}. ${esc(stop.name)}</b><br>${esc(stop.date)}`));
      const all=roadRoutes.flat().concat([[67.901,13.046],[67.283,14.376]]);
      map.fitBounds(all,{padding:[24,24]});
      status.innerHTML='<b>Carte routière chargée.</b> Les lignes suivent le réseau routier calculé par OSRM; le seul trait pointillé est le ferry Moskenes–Bodø.';
    }catch(error){
      console.error(error);
      status.innerHTML=`<b>La route n’a pas pu être calculée.</b> Aucun tracé droit de remplacement n’est affiché. <button id="retry-route">Réessayer</button>`;
      const retry=byId('retry-route');if(retry)retry.onclick=drawRoadMap;
    }
  }

  function renderMapOfficial(){
    byId('app').innerHTML=`<section class="card"><p class="eyebrow">CARTE ROUTIÈRE</p><h2>Itinéraire officiel suivant les routes</h2><p>La géométrie est calculée à l’ouverture de cet onglet. Elle suit les routes et les ponts; aucun second ferry n’est utilisé.</p><div id="route-status" class="status">Calcul de l’itinéraire routier…</div><div id="map-canvas" class="map" style="margin-top:12px"></div><p class="muted">La carte sert au roadbook. La navigation finale doit rester confiée au GPS camping-car avec les dimensions exactes du véhicule.</p></section>`;
    setTimeout(drawRoadMap,0);
  }

  function renderVanOfficial(){
    const meter=(label,key)=>`<div class="card"><div class="range-row"><b>${label}</b><input data-vankey="${key}" type="range" min="0" max="100" value="${state.van[key]}"><output>${state.van[key]}%</output></div></div>`;
    byId('app').innerHTML=`<section class="card" style="border:2px solid #0f766e;margin-bottom:12px"><p class="eyebrow">CAMPING-CAR</p><h1>${esc(VEHICLE.category)}</h1><h3>${esc(VEHICLE.model)}</h3><div class="grid"><div><b>Motorisation</b><p>${esc(VEHICLE.engine)}</p></div><div><b>Profil GPS</b><p>${esc(VEHICLE.dimensions)}<br>${esc(VEHICLE.weight)}</p></div><div><b>Gaz</b><p>${esc(VEHICLE.gas)}</p></div></div><div class="popup-warning">${esc(VEHICLE.notice)}</div></section><h2>Niveaux</h2><div class="grid">${meter('Carburant','fuel')}${meter('Eau propre','water')}${meter('Eaux grises','grey')}${meter('Batterie','battery')}</div><section class="card" style="margin-top:12px"><div class="form"><label>Toilettes<select id="toilet"><option>OK</option><option>À vider</option><option>À traiter</option></select></label><label>Action suivante<input id="van-next" value="${esc(state.van.next)}"></label></div><button id="save-van" class="primary">Enregistrer</button></section>`;
    byId('toilet').value=state.van.toilet;document.querySelectorAll('[data-vankey]').forEach(r=>r.oninput=()=>r.nextElementSibling.value=r.value+'%');byId('save-van').onclick=()=>{document.querySelectorAll('[data-vankey]').forEach(r=>state.van[r.dataset.vankey]=+r.value);state.van.toilet=byId('toilet').value;state.van.next=byId('van-next').value;save();autoSync();renderVanOfficial();};
  }

  function tidyNav(){
    const labels={dashboard:'Synthèse',itinerary:'Itinéraire',family:'Activités',map:'Carte',van:'Camping-car',journal:'Journal',budget:'Budget',sync:'Sauvegarde'};
    document.querySelectorAll('#nav button[data-tab]').forEach(button=>{if(button.dataset.tab==='assistant'){button.remove();return;}if(labels[button.dataset.tab])button.textContent=labels[button.dataset.tab];});
  }

  seed();
  window.renderDashboard=renderDashboardOfficial;
  window.renderItinerary=renderItineraryOfficial;
  window.renderMap=renderMapOfficial;
  window.renderVan=renderVanOfficial;
  document.addEventListener('DOMContentLoaded',tidyNav);
})();
