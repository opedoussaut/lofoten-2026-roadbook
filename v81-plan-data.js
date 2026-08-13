'use strict';
(function installV81PlanData(){
  if(typeof state==='undefined')return;
  const V='v81-family-authoritative';
  const camps={
    stave:{name:'Stave Camping · Andøya',url:'https://www.stavecamping.no/beach-camping',lat:69.20462,lon:15.86267,role:'Nuit Andøya avant Måtinden · océan · proche de Baugtua.',calm:'4.5/5',paddy:'Paddy avec nous dans le camping-car.'},
    midnattsol:{name:'Midnattsol Camping · Bleik',url:'https://www.midnattsolcamping.com/en',lat:69.278,lon:15.956,role:'Alternative simple à Stave, sur la plage de Bleik.',calm:'4.5/5',paddy:'Bonne alternative avec Paddy.'},
    hov:{name:'Hov Camping · Gimsøy',url:'https://hovgard.no/en/camping-caravanning/',lat:68.33867,lon:14.11016,role:'★★★★★ Base famille 2 nuits : plage, sauna, chevaux, restaurant et Hoven sur place.',calm:'5/5',paddy:'Excellent pour rester deux nuits sans refaire le camp.'},
    lyngvaer:{name:'Lyngvær Lofoten Bobilcamping',url:'https://lofoten-bobilcamping.no/en-hjemmeside/',lat:68.237,lon:14.286,role:'⭐ TESTÉ & AIMÉ · alternative prioritaire à Hov · drop-in.',calm:'4.5/5',paddy:'Bon choix avec Paddy.'},
    beach:{name:'Lofoten Beach Camp · Skagsanden',url:'https://www.lofotenbeachcamp.no/',lat:68.10384,lon:13.29151,role:'Une nuit panoramique entre Hov et l’ouest des Lofoten.',calm:'4/5',paddy:'Plage et promenade.'},
    ramberg:{name:'Ramberg Resort Camping',url:'https://www.rambergresort.no/campsite',lat:68.089,lon:13.231,role:'Alternative calme près de Ramberg Beach.',calm:'4.5/5',paddy:'Bonne promenade de plage.'},
    moskenes:{name:'Moskenes Camping',url:'https://moskenescamping.no/',lat:67.90013,lon:13.05241,role:'Base 2 nuits pour Reine / Å et vraie fenêtre météo pour Reinebringen.',calm:'4/5',paddy:'Deux nuits sans refaire le camp.'}
  };
  const days={
    '30/08':['30/08','Abisko Mountain Lodge','Stave Camping · Andøya',345,5.2,'Arrivée Vesterålen','Abisko → Narvik → Sortland → Andøya → Stave','Plage et repos. Pas de randonnée ce jour-là.'],
    '31/08':['31/08','Stave Camping · Andøya','Hov Camping · Gimsøy',260,4.2,'MVP #1 · Måtinden','Baugtua → Måtinden A/R → route sans ferry via Sortland / E10 → Hov','Paddy fait Måtinden avec laisse courte + harnais.'],
    '01/09':['01/09','Hov Camping','Hov Camping',35,0.8,'Journée OFF · 2e nuit Hov','Une seule activité : kayak Henningsvær OU Hov plage/sauna/chevaux. Hoven seulement si Sorya veut la 3e randonnée.','Aucun objectif kilométrique. Profiter du camping.'],
    '02/09':['02/09','Hov Camping','Lofoten Beach Camp · Skagsanden',110,2.5,'Plages · Vikten · balade douce','Haukland → Uttakleiv par l’ancienne route côtière → Vikten / Glasshytta → Skagsanden','Vikten remplace toute randonnée supplémentaire. Glasshytta : horaires septembre à reconfirmer.'],
    '03/09':['03/09','Lofoten Beach Camp · Skagsanden','Moskenes Camping',70,2.0,'Journée OFF · villages','Nusfjord → Hamnøy → Sakrisøy → Reine → Moskenes','Pas de sommet. Kayak Reinefjord seulement si mer favorable.'],
    '04/09':['04/09','Moskenes Camping','Moskenes Camping',15,0.5,'MVP #2 · Reinebringen','Reinebringen sur la meilleure fenêtre météo → Reine / Å relax','Paddy ne fait PAS Reinebringen. Prévoir une solution sûre de garde/supervision.'],
    '05/09':['05/09','Moskenes Camping','Björkliden Camping',420,6.2,'Sortie des Lofoten','E10 → Leknes → Svolvær → Narvik → Björkliden','Aucune activité sportive ; pauses régulières.']
  };
  function replace(date,row){if(!Array.isArray(state.itinerary))state.itinerary=[];const i=state.itinerary.findIndex(r=>Array.isArray(r)&&r[0]===date);if(i>=0)state.itinerary[i]=row;else state.itinerary.push(row);}
  Object.entries(days).forEach(([d,r])=>replace(d,r));
  state.itinerary.sort((a,b)=>{const p=x=>{const[d,m]=String(x[0]).split('/').map(Number);return m*100+d};return p(a)-p(b)});
  state.nightlyOptions=state.nightlyOptions||{};
  state.nightlyOptions['30/08']={preferred:{...camps.stave},alternatives:[{...camps.midnattsol}]};
  state.nightlyOptions['31/08']={preferred:{...camps.hov},alternatives:[{...camps.lyngvaer}]};
  state.nightlyOptions['01/09']={preferred:{...camps.hov},alternatives:[{...camps.lyngvaer}]};
  state.nightlyOptions['02/09']={preferred:{...camps.beach},alternatives:[{...camps.ramberg}]};
  state.nightlyOptions['03/09']={preferred:{...camps.moskenes},alternatives:[]};
  state.nightlyOptions['04/09']={preferred:{...camps.moskenes},alternatives:[]};
  function upsert(h){if(typeof LOFOTEN_HIKES==='undefined'||!Array.isArray(LOFOTEN_HIKES))return h;const i=LOFOTEN_HIKES.findIndex(x=>x.key===h.key);if(i>=0){Object.assign(LOFOTEN_HIKES[i],h);return LOFOTEN_HIKES[i]}LOFOTEN_HIKES.push(h);return h;}
  const hikes={
    matinden:upsert({key:'matinden',name:'Måtinden',title:'Måtinden (408 m) — Baugtua A/R',island:'Andøya · Vesterålen',altitude:'408 m · ≈400–500 m D+',distance:'7,6 km A/R',duration:'≈3–4 h',effort:'2,5/5',grade:'Modérée',crowd:'Populaire · départ tôt conseillé',caution:'Route Baugtua A/R uniquement avec Paddy. Début raide puis plateau. Falaises verticales au sommet : rester très loin du bord. Éviter la traversée Stave–Bleik avec Paddy.',lat:69.23567,lon:15.94850,url:'https://www.visitnorway.com/listings/m%C3%A5tind-%28408-masl%29-in-vester%C3%A5len/228687/',traceUrl:'https://www.openstreetmap.org/?mlat=69.23567&mlon=15.94850#map=14/69.23567/15.94850',fallbackUrl:'https://www.visitvesteralen.com/',fallbackLabel:'Visit Vesterålen'}),
    reinebringen:upsert({key:'reinebringen',name:'Reinebringen',title:'Reinebringen (484 m) — escaliers Sherpa',island:'Moskenesøy · Reine',altitude:'484 m',distance:'≈2 km A/R',duration:'≈1–2 h (+ accès parking)',effort:'3,5/5',grade:'Modérée mais très raide',crowd:'Très fréquentée',caution:'Près de 2 000 marches. Chaussures, eau, pas de hors-sentier. Éviter pluie forte, vent violent ou mauvaise visibilité. Le site officiel indique que la randonnée n’est pas adaptée aux chiens.',lat:67.92233,lon:13.07836,url:'https://reinebringen.no/',traceUrl:'https://www.openstreetmap.org/?mlat=67.92233&mlon=13.07836#map=15/67.92233/13.07836',fallbackUrl:'https://visitlofoten.com/en/guide/reinebringen-hike/',fallbackLabel:'Visit Lofoten'}),
    hoven:upsert({key:'hoven',name:'Hoven',title:'Hoven (367 m) — panorama depuis Hov',island:'Gimsøy',altitude:'367 m',distance:'4 km A/R',duration:'≈2 h A/R',effort:'2/5',grade:'Facile',crowd:'Plutôt calme',caution:'Début souvent marécageux après la pluie ; quelques passages plus raides et rocheux. Départ près du golf Lofoten Links.',lat:68.33938,lon:14.11323,url:'https://visitlofoten.com/en/guide/hoven-367-m-a-sl/',traceUrl:'https://www.openstreetmap.org/?mlat=68.33938&mlon=14.11323#map=15/68.33938/14.11323',fallbackUrl:'https://lofotenhikes.com/hike/hoven-367m/',fallbackLabel:'LofotenHikes'}),
    coast:upsert({key:'haukland-uttakleiv-coast',name:'Haukland → Uttakleiv',title:'Haukland → Uttakleiv — ancienne route côtière',island:'Vestvågøy',altitude:'Quasi niveau mer',distance:'≈8 km A/R',duration:'≈1,5–2 h A/R',effort:'1/5',grade:'Facile',crowd:'Variable',caution:'Rester sur l’ancienne route côtière gravillonnée. Ne pas transformer la balade en Mannen/Himmeltinden. Laisse près des animaux.',lat:68.199,lon:13.529,url:'https://visitlofoten.com/en/topic/beaches-in-lofoten/haukland-beach/',traceUrl:'https://www.openstreetmap.org/?mlat=68.199&mlon=13.529#map=14/68.199/13.529',fallbackUrl:'https://visitlofoten.com/en/topic/beaches-in-lofoten/',fallbackLabel:'Plages Visit Lofoten'}),
    linken:upsert({key:'linken',name:'Linken',title:'Linken — Svolvær',island:'Austvågøy · Svolvær',altitude:'≈152 m',distance:'≈3,8 km A/R',duration:'≈1 h',effort:'1/5',grade:'Facile',crowd:'Modérée',caution:'Solution de repli si kayak annulé ou météo moyenne. Terrain sec préférable.',lat:68.235,lon:14.565,url:'https://visitlofoten.com/en/guide/linken-in-svolvaer-105-m/',traceUrl:'https://www.openstreetmap.org/?mlat=68.235&mlon=14.565#map=15/68.235/14.565',fallbackUrl:'https://lofotenhikes.com/hike/linken-svolvaer-105m/',fallbackLabel:'LofotenHikes'})
  };
  hikes.ryten=(typeof LOFOTEN_HIKES!=='undefined'&&LOFOTEN_HIKES.find(h=>h.key==='ryten'))||null;
  const mvp=[
    {h:hikes.matinden,badge:'MVP #1 · MUST DO',date:'31/08',base:'Stave Camping',baseLat:camps.stave.lat,baseLon:camps.stave.lon,access:'≈5–10 min de route jusqu’à Baugtua',dog:'✅ Oui · laisse courte + harnais · loin des falaises.',why:'Ouverture spectaculaire du séjour.'},
    {h:hikes.reinebringen,badge:'MVP #2 · MUST DO',date:'04/09',base:'Moskenes Camping',baseLat:camps.moskenes.lat,baseLon:camps.moskenes.lon,access:'≈5–10 min jusqu’à Reine + parking',dog:'❌ Paddy non. Prévoir une garde/supervision sûre.',why:'Panorama iconique ; deux nuits donnent une vraie fenêtre météo.'},
    {h:hikes.hoven,badge:'MVP #3 · OPTION',date:'01/09',base:'Hov Camping',baseLat:camps.hov.lat,baseLon:camps.hov.lon,access:'Départ pratiquement sur place',dog:'✅ Excellent choix avec chien.',why:'La meilleure 3e randonnée si Sorya en veut une.'}
  ];
  const secondary=[
    {h:hikes.coast,badge:'BALADE DOUCE',date:'02/09',dog:'✅ Oui, en laisse près des animaux.',why:'Plages et photos ; ne compte pas comme randonnée montagne.'},
    {h:hikes.linken,badge:'PLAN B 1 H',date:'01/09',dog:'✅ Oui, en laisse.',why:'Repli si kayak annulé.'},
    ...(hikes.ryten?[{h:hikes.ryten,badge:'PLAN B MÉTÉO',date:'03–04/09',dog:'✅ Possible en laisse ; terrain boueux.',why:'Seulement si un MVP tombe à l’eau et si Sorya veut une 3e vraie randonnée.'}]:[])
  ];
  state.activities=[['MVP #1 · Måtinden — Baugtua A/R','Andøya','Randonnée Sorya + Paddy','31/08 · 3–4 h','Modérée · falaises','✅ Oui',69.23567,15.9485],['MVP #2 · Reinebringen — escaliers Sherpa','Reine','Randonnée Sorya','04/09 · 1–2 h','Très raide · escaliers','❌ Paddy non',67.92233,13.07836],['MVP #3 option · Hoven','Gimsøy','Randonnée Sorya + Paddy','01/09 · ≈2 h','Facile','✅ Oui',68.33938,14.11323],['Kayak guidé Henningsvær','Henningsvær','Activité famille','01/09 · 2 h','Guidé','Paddy : garde à organiser',68.154,14.201],['Haukland → Uttakleiv','Vestvågøy','Balade douce','02/09 · 1,5–2 h','Facile','✅ Oui',68.199,13.529],['Vikten · Glasshytta + plage','Flakstadøy','Art / sightseeing','02/09 · 1–2 h','Très facile','✅ extérieur',68.1008,13.6906],['Nusfjord + Hamnøy + Sakrisøy + Reine','Moskenesøy','Sightseeing / repos','03/09','Très facile','✅ selon règles',68.034,13.348]];
  state.olivier=[];state.olivierPlan='Randonnées solo gérées indépendamment par Olivier.';
  state.familyPriorities={version:V,fixedHikes:['Måtinden','Reinebringen'],optionalHike:'Hoven',restDays:['01/09 · Hov','03/09 · villages'],twoNightBases:['Hov 31/08 + 01/09','Moskenes 03/09 + 04/09'],vikten:'02/09 · Glasshytta + plage · horaires septembre à reconfirmer'};
  state.routePolicy=state.routePolicy||{};state.routePolicy.lofoten='Stave 30/08, Hov 2 nuits, Lofoten Beach Camp 02/09, Moskenes 2 nuits, départ 05/09.';
  if(state.current)state.current.decision='Måtinden + Reinebringen MVP, Hoven option, Vikten 02/09, 2 nuits Hov + 2 nuits Moskenes.';
  state.soryaPlanVersion=V;if(typeof save==='function')save();
  window.V81={version:V,camps,days,hikes,mvp,secondary};
})();