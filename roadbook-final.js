'use strict';

(function installFinalRoadbook(){
  const P=id=>`https://park4night.com/fr/place/${id}`;
  const COMMON_DATES=['25/08','26/08','27/08','28/08','29/08','30/08','31/08','01/09','02/09','03/09'];

  const ITINERARY=[
    ['25/08','Chevreuse','Park4Night #53279',900,10,'Transit','Départ très tôt vers le nord de l’Allemagne','Pauses régulières et promenade de Paddy avant la nuit'],
    ['26/08','Park4Night #53279','Park4Night #84058',620,8,'Transit','Danemark, ponts puis sud de la Suède','Éviter les raccourcis urbains avec le camping-car'],
    ['27/08','Park4Night #84058','Forsgården #188958',435,5.8,'Transit','Étape plus douce vers Gävle','Arrivée suffisamment tôt pour une promenade au calme'],
    ['28/08','Forsgården #188958','Park4Night #140798',500,6.2,'Transit','Remontée vers le nord par l’E4','Ravitaillement avant les secteurs isolés'],
    ['29/08','Park4Night #140798','Abisko Mountain Lodge',690,8.5,'Soutenue','Grande traversée de la Laponie','Dernière longue étape avant les Lofoten'],
    ['30/08','Abisko Mountain Lodge','Hov Camping · Gimsøy',355,5.5,'Lofoten','Narvik puis arrivée spectaculaire par l’E10','Installation pour deux nuits sans déplacer le van'],
    ['31/08','Hov Camping','Hov Camping',0,0,'Journée locale','Henningsvær et plages de l’est','Journée sans conduite longue pour Paddy'],
    ['01/09','Hov Camping','Uttakleiv',80,1.7,'Lofoten','Progression vers l’ouest: Haukland, Uttakleiv et environs','Nuit signature sur la côte'],
    ['02/09','Uttakleiv','Lofoten Beach Camp',55,1.2,'Lofoten','Vikten MUST DO puis Flakstad','Peu de conduite, beaucoup de temps dehors'],
    ['03/09','Lofoten Beach Camp','Moskenes Camping',50,1.2,'Lofoten','Nusfjord, Hamnøy, Reine, Sørvågen et Å','Aucun retour vers l’est après Moskenes'],
    ['04/09','Moskenes Camping','Rognan Fjordcamp',115,2,'Ferry + route','Ferry Moskenes–Bodø puis courte route vers un fjord calme','45 à 75 min de marge au terminal; conduite pure ≈2 h'],
    ['05/09','Rognan Fjordcamp','Korgen Camping',205,3.5,'Récupération','Étape courte par Saltfjellet','Ne pas prolonger: priorité au repos de Paddy'],
    ['06/09','Korgen Camping','Tråsåvika Camping',440,6.5,'Retour Norvège','E6 puis nuit sur le Trondheimsfjord','Deux pauses de 25 à 35 min pour Paddy'],
    ['07/09','Tråsåvika Camping','Sveastranda Camping',405,6.2,'Retour Norvège','Dovrefjell puis lac Mjøsa','Grande pause promenade à mi-journée'],
    ['08/09','Sveastranda Camping','Tornby Strand Camping · Hirtshals',290,4.5,'Route + ferry','Route vers Larvik puis ferry Larvik–Hirtshals','Arrivée calme dans les dunes; conduite pure ≈4 h 30'],
    ['09/09','Tornby Strand Camping','Campingplatz Waldwinkel · Osnabrücker Land',705,6.8,'Transit plafonné','Danemark puis Allemagne','Pauses toutes les 2 h à 2 h 15'],
    ['10/09','Campingplatz Waldwinkel','Maison · Chevreuse',685,6.8,'IMPÉRATIF · ≤7 h','Dernière étape équilibrée jusqu’à la maison','Départ tôt; pauses et trafic s’ajoutent au temps de volant'],
    ['11/09','Chevreuse','Roadsurfer · Champlan',25,0.7,'Restitution','Nettoyage, vidanges, plein, AdBlue et photos','Départ avec marge avant 17 h']
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
    '04/09':{preferred:{name:'Rognan Fjordcamp',url:'https://rognanfjordcamp.no/',role:'Fjord abrité et emplacements au bord de l’eau. Demander une place loin de l’aire de jeux.',calm:'5/5',paddy:'Petite promenade au bord du fjord dès l’arrivée.'},alternatives:[{name:'Saltstraumen Camping',url:'https://saltstraumen-camping.no/',role:'Alternative la plus courte après Bodø.'},{name:'Saltdal Turistsenter · Storjord',url:'https://isaltdal.no/camping/?lang=en',role:'Alternative forestière.'}]},
    '05/09':{preferred:{name:'Korgen Camping',url:'https://korgen-camping.no/',role:'En retrait de l’E6, sur la rivière Røssåga.',calm:'5/5',paddy:'Marche plate au bord de la rivière et soirée sans stimulation.'},alternatives:[{name:'Yttervik · Ranfjord',url:'https://visityttervik.no/en/',role:'Alternative fjord.'},{name:'Topcamp Mosjøen',url:'https://topcamp.no/en/topcamp-mosjoen',role:'Alternative avec davantage de services.'}]},
    '06/09':{preferred:{name:'Tråsåvika Camping',url:'https://trasavika.no/en/home',role:'Emplacements au bord du Trondheimsfjord et plage.',calm:'4.5/5',paddy:'Demander un emplacement en bordure, éloigné du playground.'},alternatives:[{name:'Øysand Camping',url:'https://oysandcamping.no/',role:'Alternative plage et accès E6.'},{name:'Viggja Kro & Camping',url:'https://www.google.com/maps/search/Viggja+Kro+Camping+Norway',role:'Alternative locale.'}]},
    '07/09':{preferred:{name:'Sveastranda Camping',url:'https://www.sveastranda.no/en',role:'Zone visiteurs au bord du lac Mjøsa, chiens admis.',calm:'4.5/5',paddy:'Réserver près de l’eau et marcher doucement le long du lac.'},alternatives:[{name:'Hekshusstranda Camping',url:'https://www.visitnorway.com/listings/hekshusstranda-camping-kapp-mj%C3%B8sa/18144/',role:'Alternative paisible sur Mjøsa.'},{name:'Lillehammer Turistsenter',url:'https://camping.no/en/campingplasser/254217',role:'Alternative pratique.'}]},
    '08/09':{preferred:{name:'Tornby Strand Camping',url:'https://www.tornbystrandcamping.dk/en/',role:'Plage, dunes et forêt près de Hirtshals. Demander une parcelle périphérique.',calm:'4.5/5',paddy:'Courte promenade dans les dunes puis repos complet.'},alternatives:[{name:'Hirtshals Camping',url:'https://hirtshals-camping.dk/en/',role:'Alternative la plus proche du port.'},{name:'Tannisby Camping',url:'https://www.google.com/maps/search/Tannisby+Camping+Denmark',role:'Alternative dans les dunes.'}]},
    '09/09':{preferred:{name:'Campingplatz Waldwinkel',url:'https://pages.et4.de/en/osnabruecker-land/terminal/detail/Hotel/h_32876/campingplatz-waldwinkel-',role:'Camping calme entre prairies et forêts, petit lac et arrivée autonome.',calm:'5/5',paddy:'Emplacement en lisière, marche lente en forêt et soirée très calme.'},alternatives:[{name:'Campingplatz Bullerby am Attersee',url:'https://erleben.osnabrueck.de/de/stadt-erleben/sehenswertes/wohnmobilstellplatz-auf-dem-campingplatz-bullerby-am-attersee/',role:'Alternative forêt et lac.'},{name:'Campingplatz Niedersachsenhof',url:'https://pages.et4.de/en/osnabruecker-land/streaming/detail/Hotel/h_74481/camping-site-niedersachsenhof-osnabrueck',role:'Alternative rurale.'}]},
    '10/09':{preferred:{name:'Maison · Chevreuse',url:'https://www.google.com/maps/search/Chevreuse+France',role:'Arrivée obligatoire, même tardive.',calm:'5/5',paddy:'Retour dans son environnement familier.'},alternatives:[]}
  };

  const WAYPOINTS=[
    ['Chevreuse',48.706,2.038],['Nuit 1',53.7,9.9],['Nuit 2',57.9,14.3],['Forsgården',60.675,17.074],['Nuit 4',64.5,20.5],['Abisko',68.354,18.832],['Hov Camping',68.341,14.117],['Uttakleiv',68.209,13.507],['Lofoten Beach Camp',68.089,13.236],['Moskenes',67.901,13.046],['Bodø · ferry',67.280,14.405],['Rognan',67.103,15.407],['Korgen',66.075,13.839],['Tråsåvika',63.31,9.89],['Sveastranda',60.889,10.676],['Larvik · ferry',59.052,10.035],['Tornby Strand',57.55,9.88],['Waldwinkel',52.45,8.20],['Chevreuse',48.706,2.038],['Champlan',48.708,2.279]
  ];

  const FERRIES={
    '04/09':{
      title:'Moskenes → Bodø',
      url:'https://www.torghatten.no/en/our-routes/18-782',
      timing:'Traversée directe à réserver; arrivée dans la file 45 min minimum avant, 60 à 75 min recommandées.',
      paddy:'Promenade de 45 à 60 min avant l’embarquement. Confirmer avec l’équipage la solution la plus confortable: véhicule ventilé ou local chiens.'
    },
    '08/09':{
      title:'Larvik → Hirtshals',
      url:'https://www.colorline.com/timetable',
      timing:'Arrivée au terminal au moins 60 min avant. Choisir une traversée permettant une installation calme à Tornby.',
      paddy:'Privilégier le pont extérieur avec Paddy si la météo est douce et si la réservation le permet; rester avec lui en permanence.'
    }
  };

  const PROFILE={
    bookingCategory:'Roadsurfer Cozy Cottage',referenceModel:'KNAUS VAN TI PLUS',
    modelNotice:'La catégorie est garantie, mais le modèle exact doit être confirmé à Champlan le 24 août.',
    engine:'Diesel · 140 ch · Euro 6',transmission:'Manuelle ou automatique selon le véhicule remis',adblue:'Oui',
    bodyLength:'6,99 m',deployedRackLength:'7,80 m',height:'3,15 m',widthMirrors:'2,74 m',maxWeight:'3 500 kg à confirmer sur la carte grise',
    sygicLength:'7,80 m',sygicWidth:'2,74 m',sygicHeight:'3,25 m',sygicWeight:'3,50 t',
    gas:'PROPANE',gasSystem:'30 mbar',gasBottle:'Jusqu’à 2 bouteilles de 11 kg sur le modèle de référence; vérifier le montage réel à la remise.'
  };

  const NAV=[['dashboard','Synthèse'],['itinerary','Itinéraire'],['map','Carte'],['family','Activités'],['van','Camping-car'],['journal','Journal'],['budget','Budget'],['sync','Sauvegarde']];
  let leafletPromise=null;

  function deepCopy(value){return JSON.parse(JSON.stringify(value));}
  function totalKm(){return ITINERARY.reduce((sum,row)=>sum+(Number(row[3])||0),0);}
  function dateFromIso(iso){const parts=String(iso||'').split('-');return parts.length===3?`${parts[2]}/${parts[1]}`:'';}
  function currentStage(){return ITINERARY.find(row=>row[0]===dateFromIso(state.current?.date));}
  function externalLink(option,preferred=false){
    if(!option)return '';
    return `<div style="margin:8px 0"><a class="btn ${preferred?'primary':''}" href="${esc(option.url)}" target="_blank" rel="noopener">${preferred?'⭐ ':''}${esc(option.name)} ↗</a>${option.role?`<p class="muted" style="margin:6px 0 0">${esc(option.role)}</p>`:''}${preferred&&option.calm?`<p style="margin:4px 0 0"><b>Calme ${esc(option.calm)}</b> · ${esc(option.paddy||'')}</p>`:''}</div>`;
  }

  function seed(){
    state.itinerary=deepCopy(ITINERARY);
    state.nightlyOptions=deepCopy(NIGHTS);
    state.vehicleProfile=deepCopy(PROFILE);
    state.meta.return='11/09/2026 17:00';
    state.meta.to='Roadsurfer · Champlan';
    state.routeVersion='v53-single';
    delete state.itineraryBis;
    delete state.nightlyOptionsBis;
    delete state.itineraryBisMeta;
    delete state.activeRoutePlan;
    delete state.savedCamperStops;
    delete state.returnConstraint;
    save();
  }

  function renderNavFinal(){
    const nav=byId('nav');
    nav.innerHTML='';
    NAV.forEach(([id,label])=>{
      const button=document.createElement('button');
      button.textContent=label;
      button.dataset.tab=id;
      button.onclick=()=>show(id);
      nav.appendChild(button);
    });
  }

  function showFinal(id){
    active=id;
    document.querySelectorAll('#nav button').forEach(button=>button.classList.toggle('active',button.dataset.tab===id));
    const renderers={dashboard:renderDashboardFinal,itinerary:renderItineraryFinal,map:renderMapFinal,family:renderFamilyFinal,van:renderVanFinal,journal:renderJournal,budget:renderBudget,sync:renderSync};
    (renderers[id]||renderDashboardFinal)();
  }

  function renderDashboardFinal(){
    const stage=currentStage();
    byId('app').innerHTML=`
      <section class="card" style="border-left:5px solid #2563eb;margin-bottom:12px">
        <p class="eyebrow">ITINÉRAIRE OFFICIEL UNIQUE</p>
        <h2>Lofoten vers l’ouest · retour par deux ferries</h2>
        <div class="grid">
          <div><b>Confort</b><p>Aucune journée de retour ne dépasse 7 h de conduite planifiée.</p></div>
          <div><b>Paddy</b><p>Pauses régulières, traversées courtes et nuits sélectionnées pour leur calme.</p></div>
          <div><b>Échéance</b><p>Maison à Chevreuse le 10 septembre; restitution à Champlan le 11 avant 17 h.</p></div>
        </div>
      </section>
      <div class="grid">
        ${card('Départ',state.meta.start,state.meta.from)}
        ${card('Distance routière',totalKm().toLocaleString('fr-FR')+' km','hors traversées maritimes et excursions')}
        ${card('Ferries','2','Moskenes–Bodø · Larvik–Hirtshals')}
        ${card('Restitution',state.meta.return,state.meta.to)}
      </div>
      ${stage?`<section class="card" style="margin-top:12px"><p class="eyebrow">ÉTAPE DU JOUR · ${esc(stage[0])}</p><h2>${esc(stage[1])} → ${esc(stage[2])}</h2><p><b>≈ ${esc(stage[3])} km · ${esc(stage[4])} h de conduite</b> · ${esc(stage[5])}</p><p>${esc(stage[6])}</p></section>`:''}
      <div class="grid" style="margin-top:12px">
        <section class="card"><h2>État actuel</h2><div class="form">
          <label>Date<input id="c-date" type="date" value="${esc(state.current.date)}"></label>
          <label>Position<input id="c-place" value="${esc(state.current.place)}"></label>
          <label>Météo<input id="c-weather" value="${esc(state.current.weather)}"></label>
          <label>Énergie Olivier /5<input id="c-o" type="number" min="1" max="5" value="${state.current.olivier}"></label>
          <label>Énergie Sorya /5<input id="c-s" type="number" min="1" max="5" value="${state.current.sorya}"></label>
          <label>Énergie Paddy /5<input id="c-p" type="number" min="1" max="5" value="${state.current.paddy}"></label>
        </div><label>Décision du jour<textarea id="c-decision">${esc(state.current.decision)}</textarea></label><button id="save-current" class="primary">Enregistrer</button></section>
        <section class="card"><h2>Suivi GPS</h2><p class="muted">La trace complète le roadbook; elle ne remplace pas Sygic.</p><div class="toolbar"><button id="gps-start" class="primary">Démarrer</button><button id="gps-stop">Arrêter</button><button id="gps-reset" class="danger">Réinitialiser</button></div><div id="gps-status" class="status">${(state.gps.km||0).toFixed(1)} km enregistrés</div></section>
      </div>`;
    byId('save-current').onclick=()=>{state.current={date:byId('c-date').value,place:byId('c-place').value,weather:byId('c-weather').value,olivier:+byId('c-o').value,sorya:+byId('c-s').value,paddy:+byId('c-p').value,decision:byId('c-decision').value};save();autoSync();renderDashboardFinal();};
    byId('gps-start').onclick=startGPS;byId('gps-stop').onclick=stopGPS;byId('gps-reset').onclick=()=>{if(confirm('Effacer la trace GPS ?')){state.gps={km:0,points:[]};save();renderDashboardFinal();}};
  }

  function ferryPanel(date){
    const ferry=FERRIES[date];
    if(!ferry)return '';
    return `<section class="card" style="margin:12px 0;border:2px solid #2563eb"><p class="eyebrow">TRAVERSÉE</p><h3>${esc(ferry.title)}</h3><p>${esc(ferry.timing)}</p><p><b>Paddy :</b> ${esc(ferry.paddy)}</p><a class="btn primary" href="${esc(ferry.url)}" target="_blank" rel="noopener">Horaires et réservation ↗</a></section>`;
  }

  function stageCard(row,index){
    const [date,from,to,km,hours,type,goal,backup]=row;
    const night=NIGHTS[date];
    const critical=date==='10/09'||date==='11/09';
    return `<article class="card" style="margin-bottom:12px;${critical?'border:2px solid #b45309':''}">
      <div class="nightly-options-heading"><div><p class="eyebrow">JOUR ${index+1} · ${esc(date)}</p><h2>${esc(from)} → ${esc(to)}</h2></div><div style="text-align:right"><b>≈ ${esc(km)} km</b><br><span>${esc(hours)} h · ${esc(type)}</span></div></div>
      <p>${esc(goal)}</p><p class="muted"><b>Cadre :</b> ${esc(backup)}</p>
      ${ferryPanel(date)}
      ${night?`<div style="margin-top:10px"><p class="muted" style="margin-bottom:4px">NUIT PRÉFÉRÉE</p>${externalLink(night.preferred,true)}${night.alternatives?.length?`<details><summary><b>Voir les alternatives</b></summary>${night.alternatives.map(option=>externalLink(option,false)).join('')}</details>`:''}</div>`:''}
      ${date==='10/09'?'<div class="popup-warning"><b>Obligation :</b> poursuivre jusqu’à la maison, même en cas d’arrivée tardive.</div>':''}
    </article>`;
  }

  function renderItineraryFinal(){
    byId('app').innerHTML=`<section class="card" style="margin-bottom:12px"><div class="nightly-options-heading"><div><p class="eyebrow">PLAN UNIQUE</p><h1>Itinéraire et nuits</h1></div><div style="text-align:right"><b>${totalKm().toLocaleString('fr-FR')} km</b><br><span>Retour plafonné à 7 h de conduite</span></div></div><p>Progression continue vers l’ouest dans les Lofoten, sortie directe par Moskenes, puis retour équilibré avec deux traversées courtes.</p></section>${ITINERARY.map(stageCard).join('')}`;
  }

  function loadLeaflet(){
    if(window.L)return Promise.resolve();
    if(leafletPromise)return leafletPromise;
    leafletPromise=new Promise((resolve,reject)=>{
      if(!document.querySelector('link[data-leaflet]')){
        const link=document.createElement('link');link.rel='stylesheet';link.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';link.dataset.leaflet='1';document.head.appendChild(link);
      }
      const script=document.createElement('script');script.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';script.onload=resolve;script.onerror=reject;document.head.appendChild(script);
    });
    return leafletPromise;
  }

  function renderMapFinal(){
    byId('app').innerHTML=`<section class="card"><p class="eyebrow">CARTE LÉGÈRE</p><h2>Itinéraire officiel</h2><p class="muted">La bibliothèque cartographique se charge uniquement à l’ouverture de cet onglet.</p><div id="map-status" class="status">Chargement de la carte…</div><div id="map-canvas" class="map"></div></section>`;
    loadLeaflet().then(()=>{
      const canvas=byId('map-canvas');if(!canvas)return;
      byId('map-status').remove();
      if(leafletMap){try{leafletMap.remove();}catch(error){}}
      leafletMap=L.map('map-canvas').setView([60,10],4);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© OpenStreetMap'}).addTo(leafletMap);
      const points=WAYPOINTS.map(point=>[point[1],point[2]]);
      L.polyline(points,{weight:4}).addTo(leafletMap);
      WAYPOINTS.forEach((point,index)=>L.marker([point[1],point[2]]).addTo(leafletMap).bindPopup(`<b>${index+1}. ${esc(point[0])}</b>`));
      state.activities.forEach(activity=>{const lat=Number(activity[6]),lon=Number(activity[7]);if(Number.isFinite(lat)&&Number.isFinite(lon))L.circleMarker([lat,lon],{radius:5}).addTo(leafletMap).bindPopup(`<b>${esc(activity[0])}</b><br>${esc(activity[4])}`);});
      leafletMap.fitBounds(points,{padding:[20,20]});
    }).catch(()=>{const status=byId('map-status');if(status)status.textContent='Carte indisponible hors connexion lors du premier chargement.';});
  }

  function renderFamilyFinal(){
    byId('app').innerHTML=`<section class="card"><p class="eyebrow">ACTIVITÉS COMMUNES</p><h1>Sorya et Paddy en priorité</h1><p>Aucune activité commune très raide, aérienne ou exposée. La durée est adaptée à la météo et à l’énergie de Paddy.</p></section><div class="grid">${state.activities.map(activity=>`<article class="card"><h3>${esc(activity[0])}</h3><p><b>${esc(activity[1])} · ${esc(activity[3])}</b></p><p>${esc(activity[4])}</p><p>Paddy : ${esc(activity[5])}</p></article>`).join('')}</div><h2 style="margin-top:18px">Options sportives d’Olivier</h2><div class="grid">${state.olivier.map(option=>`<article class="card"><h3>${esc(option[0])}</h3><p>${esc(option[1])}</p></article>`).join('')}</div>`;
  }

  function renderVanFinal(){
    const p=state.vehicleProfile;
    const meter=(label,key)=>`<div class="card"><div class="range-row"><b>${label}</b><input data-vankey="${key}" type="range" min="0" max="100" value="${state.van[key]}"><output>${state.van[key]}%</output></div></div>`;
    byId('app').innerHTML=`<section class="card" style="border:2px solid #0f766e;margin-bottom:12px"><p class="eyebrow">FICHE UNIQUE DU CAMPING-CAR</p><h1>${esc(p.bookingCategory)}</h1><h3>Modèle de référence : ${esc(p.referenceModel)}</h3><p class="muted">${esc(p.modelNotice)}</p><div class="grid"><div><b>Motorisation</b><p>${esc(p.engine)}<br>${esc(p.transmission)}<br>AdBlue : ${esc(p.adblue)}</p></div><div><b>Dimensions</b><p>Carrosserie ${esc(p.bodyLength)}<br>Porte-vélos déployé ${esc(p.deployedRackLength)}<br>Hauteur ${esc(p.height)}<br>Largeur ${esc(p.widthMirrors)}<br>PTAC ${esc(p.maxWeight)}</p></div><div><b>Profil Sygic</b><p>Longueur <strong>${esc(p.sygicLength)}</strong><br>Largeur <strong>${esc(p.sygicWidth)}</strong><br>Hauteur <strong>${esc(p.sygicHeight)}</strong><br>Poids <strong>${esc(p.sygicWeight)}</strong></p></div><div><b>Gaz</b><p><strong>${esc(p.gas)}</strong><br>${esc(p.gasSystem)}<br>${esc(p.gasBottle)}</p></div></div><div class="popup-warning"><b>À confirmer à Champlan :</b> modèle exact, carte grise, hauteur réelle, PTAC, boîte de vitesses et montage des bouteilles.</div></section><h2>Niveaux</h2><div class="grid">${meter('Carburant','fuel')}${meter('Eau propre','water')}${meter('Eaux grises','grey')}${meter('Batterie','battery')}</div><section class="card" style="margin-top:12px"><div class="form"><label>Toilettes<select id="toilet"><option>OK</option><option>À vider</option><option>À traiter</option></select></label><label>Action suivante<input id="van-next" value="${esc(state.van.next)}"></label></div><button id="save-van" class="primary">Enregistrer</button></section><section class="card" style="margin-top:12px"><p class="eyebrow">RESTITUTION</p><div class="grid"><div><b>Technique</b><p>Diesel · AdBlue · eaux grises · cassette WC · gaz fermé.</p></div><div><b>Nettoyage</b><p>Cabine · cuisine · salle d’eau · couchages · sol · soute · extérieur.</p></div><div><b>Preuves</b><p>Photos · kilométrage · niveaux · absence de dégâts.</p></div></div></section>`;
    byId('toilet').value=state.van.toilet;
    document.querySelectorAll('[data-vankey]').forEach(input=>input.oninput=()=>input.nextElementSibling.value=input.value+'%');
    byId('save-van').onclick=()=>{document.querySelectorAll('[data-vankey]').forEach(input=>state.van[input.dataset.vankey]=+input.value);state.van.toilet=byId('toilet').value;state.van.next=byId('van-next').value;save();autoSync();renderVanFinal();};
  }

  seed();
  renderNav=renderNavFinal;
  show=showFinal;
  renderDashboard=renderDashboardFinal;
  renderItinerary=renderItineraryFinal;
  renderMap=renderMapFinal;
  renderFamily=renderFamilyFinal;
  renderVan=renderVanFinal;
})();
