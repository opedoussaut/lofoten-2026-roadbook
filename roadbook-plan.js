'use strict';

(function installRoadbookPlanV83(){
  const PLAN_VERSION='v83-ab-road-only-hike-protected';
  const DEFAULT_VARIANT='B';
  const GPS_RULE='Zéro ferry sur tout le voyage. Utiliser les ponts du Grand Belt et de l’Øresund. En Suède, rester sur l’axe routier rapide vers Stockholm/Umeå puis E10 via Kiruna–Abisko–Narvik. Vérifier la signalisation locale avant toute nuit gratuite.';
  const G=q=>`https://www.google.com/maps/search/${encodeURIComponent(q)}`;

  const ROUTES={
    A:{
      label:'A · Fast Track',subtitle:'On pousse fort à l’aller pour acheter une nuit supplémentaire aux Lofoten.',lofotenNights:8,
      rows:[
        ['25/08','Chevreuse','Hambourg / vallée de l’Elbe',900,9.0,'FAST','Longue journée assumée; pauses toutes les 2 h.','Arriver, sortir Paddy 30–45 min, dîner simple, sommeil prioritaire.'],
        ['26/08','Hambourg','Norrköping / Bråviken',940,9.5,'FAST','Journée la plus exigeante; Danemark par les ponts puis Suède.','Aucune activité touristique; choisir une nuit accessible même tard.'],
        ['27/08','Norrköping','Umeå',750,9.0,'FAST','Remontée E4 pure efficacité.','Grande pause déjeuner + 2 vraies promenades Paddy.'],
        ['28/08','Umeå','Kiruna / Abisko',600,7.0,'TRANSIT','Entrée en Laponie; possibilité de pousser vers Abisko si forme parfaite.','Nuit récupération avant les Lofoten.'],
        ['29/08','Kiruna / Abisko','Lofoten Est · Lyngvær / Gimsøy',410,5.8,'ARRIVÉE','Narvik puis E10; arrivée assez tôt pour profiter du soir.','Aucune grande randonnée ce jour.'],
        ['30/08','Lofoten Est','Lofoten Est',35,1.0,'RANDO','Hoven prioritaire ou Festvågtind si terrain sec et vent faible.','Départ tôt si Festvågtind; Hoven = option plus calme avec Paddy.'],
        ['31/08','Lofoten Est','Lofoten Centre · Haukland/Uttakleiv',85,1.7,'RANDO','Mannen si vent faible; sinon boucle Haukland–Uttakleiv.','Ne pas cumuler deux grosses randonnées.'],
        ['01/09','Lofoten Centre','Lofoten Centre',35,0.8,'RANDO','Holandsmælen = randonnée prioritaire calme et panoramique.','Fenêtre météo à protéger; terrain humide = chaussures adaptées.'],
        ['02/09','Lofoten Centre','Ramberg / Fredvang',55,1.2,'RANDO','Ryten/Kvalvika = journée forte, ~5 h.','Départ matin; vent et boue à surveiller.'],
        ['03/09','Ramberg / Fredvang','Reine / Moskenes',50,1.2,'OUEST','Nusfjord + villages; Reinebringen seulement si sec, bonne visibilité et départ très tôt.','Garder une vraie marge météo pour Reinebringen.'],
        ['04/09','Reine / Moskenes','Ramberg / Flakstad',50,1.2,'MÉTÉO','Journée joker randonnée: rattraper Reinebringen, Ryten ou Holandsmælen.','Une seule randonnée prioritaire + récupération.'],
        ['05/09','Ramberg / Flakstad','Lofoten Est · Lyngvær',95,2.0,'SORTIE','Retour progressif vers l’est; arrêt Vikten coucher de soleil si conditions calmes.','Dernière nuit Lofoten placée pour faciliter le départ.'],
        ['06/09','Lofoten Est','Kiruna',410,5.8,'RETOUR','E10 vers Narvik, Abisko, Kiruna.','Retour volontairement raisonnable.'],
        ['07/09','Kiruna','Umeå',600,7.0,'RETOUR','Axe rapide suédois.','Pauses toutes les 2 h.'],
        ['08/09','Umeå','Södertälje / Trosa',665,7.5,'RETOUR','E4 plein sud, contourner Stockholm.','Dormir au sud de Stockholm.'],
        ['09/09','Södertälje / Trosa','Malmö',620,6.8,'RETOUR','Sud Suède sans détour urbain.','Promenade mer/forêt à l’arrivée.'],
        ['10/09','Malmö','Osnabrück',700,7.8,'RETOUR','Øresund + Grand Belt + Allemagne.','Garder de la marge trafic.'],
        ['11/09','Osnabrück','Chevreuse',680,7.0,'MAISON','Dernière vraie journée route.','Arrivée maison, nettoyage léger.'],
        ['12/09','Chevreuse','Restitution van avant 16:00',25,0.7,'RESTITUTION','Plein, AdBlue si nécessaire, eau/vidanges, photos.','Large marge avant 16:00.']
      ]
    },
    B:{
      label:'B · Road Trip Confort',subtitle:'Étapes régulières, presque toujours 6–7 h 30, sept nuits Lofoten protégées.',lofotenNights:7,
      rows:[
        ['25/08','Chevreuse','Osnabrück',680,7.0,'TRANSIT','Première journée soutenue mais raisonnable.','Arrivée assez tôt pour une vraie marche avec Paddy.'],
        ['26/08','Osnabrück','Malmö',700,7.8,'TRANSIT','Danemark par les ponts puis Malmö.','Pas de détour urbain si fatigue.'],
        ['27/08','Malmö','Södertälje / Trosa',620,6.8,'TRANSIT','Remonter la Suède sans entrer dans Stockholm.','Nuit nature calme au sud de Stockholm.'],
        ['28/08','Södertälje / Trosa','Umeå',665,7.5,'TRANSIT','Longue mais régulière E4.','Pauses structurées.'],
        ['29/08','Umeå','Kiruna / Abisko',600,7.0,'TRANSIT','Laponie et grands espaces.','Soirée récupération.'],
        ['30/08','Kiruna / Abisko','Lofoten Est · Lyngvær / Gimsøy',410,5.8,'ARRIVÉE','Narvik puis E10; arrivée aux Lofoten sans stress.','Aucune grosse randonnée ce jour.'],
        ['31/08','Lofoten Est','Lofoten Est',35,1.0,'RANDO','Hoven prioritaire ou Festvågtind si sec + vent faible.','Départ tôt pour Festvågtind.'],
        ['01/09','Lofoten Est','Lofoten Centre · Haukland/Uttakleiv',85,1.7,'RANDO','Mannen si météo stable; sinon balade Haukland–Uttakleiv.','Paddy en laisse sur crêtes/exposition.'],
        ['02/09','Lofoten Centre','Ramberg / Fredvang',55,1.2,'RANDO','Holandsmælen OU Ryten/Kvalvika selon meilleure fenêtre météo.','Ne pas cumuler; protéger les jambes.'],
        ['03/09','Ramberg / Fredvang','Reine / Moskenes',50,1.2,'OUEST','Nusfjord + Reine; Reinebringen uniquement très tôt et terrain sec.','Parking/fréquentation à anticiper.'],
        ['04/09','Reine / Moskenes','Ramberg / Flakstad',50,1.2,'MÉTÉO','Joker randonnée prioritaire manquée.','Choix météo entre Reinebringen, Ryten et Holandsmælen.'],
        ['05/09','Ramberg / Flakstad','Lofoten Est · Lyngvær',95,2.0,'SORTIE','Retour progressif vers l’est; Vikten au coucher du soleil si timing.','Dernière nuit Lofoten bien placée.'],
        ['06/09','Lofoten Est','Kiruna',410,5.8,'RETOUR','E10 via Narvik et Abisko.','Journée douce.'],
        ['07/09','Kiruna','Umeå',600,7.0,'RETOUR','Axe rapide suédois.','Pauses toutes les 2 h.'],
        ['08/09','Umeå','Södertälje / Trosa',665,7.5,'RETOUR','E4 plein sud.','Contourner Stockholm.'],
        ['09/09','Södertälje / Trosa','Malmö',620,6.8,'RETOUR','Sud Suède.','Nuit mer/forêt.'],
        ['10/09','Malmö','Osnabrück',700,7.8,'RETOUR','Ponts puis Allemagne.','Garder 30–45 min de marge trafic.'],
        ['11/09','Osnabrück','Chevreuse',680,7.0,'MAISON','Retour maison.','Nettoyage léger à l’arrivée.'],
        ['12/09','Chevreuse','Restitution van avant 16:00',25,0.7,'RESTITUTION','Plein, AdBlue si nécessaire, eau/vidanges, photos.','Large marge avant 16:00.']
      ]
    }
  };

  const NIGHT_ZONES={
    'Hambourg / vallée de l’Elbe':[
      {kind:'camping',name:'Stover Strand Camping',url:'https://www.camping-stover-strand.de/en/',note:'Confort complet au bord de l’Elbe; bon reset après la première grosse étape.'},
      {kind:'nature',name:'Stover Strand · première ligne Elbe',url:'https://www.camping-stover-strand.de/en/43/pitches-and-accommodations/',note:'Vue fleuve, sensation nature, emplacement autorisé.'},
      {kind:'free',name:'Digue de l’Elbe · secteur rural Winsen/Hoopte',url:G('Hoopte Elbe Winsen Luhe'),note:'Gratuit potentiel, très calme et plat. Vérifier impérativement les panneaux de stationnement de nuit le jour même.'}
    ],
    'Osnabrück':[
      {kind:'camping',name:'Campingpark Kronensee',url:G('Campingpark Kronensee Osnabrück'),note:'Lac + forêt, vrai camping reposant.'},
      {kind:'nature',name:'Camping Niedersachsenhof',url:G('Camping Niedersachsenhof Osnabrück'),note:'Rural, simple, calme, accès facile.'},
      {kind:'free',name:'Dümmer See · parking nature périphérique',url:G('Dümmer See Wohnmobil Parkplatz'),note:'Chercher le secteur légal le plus calme côté nature; 0 € seulement si signalisation locale l’autorise.'}
    ],
    'Norrköping / Bråviken':[
      {kind:'camping',name:'First Camp Kolmården',url:'https://en.firstcamp.se/destinations/kolmarden-norrkoping',note:'Vue Bråviken, sanitaires et services.'},
      {kind:'nature',name:'Himmelstalund Ställplats',url:G('Himmelstalund ställplats Norrköping'),note:'Aire officielle, facile en arrivée tardive.'},
      {kind:'free',name:'Rastplats Herrbeta / E4',url:G('Rastplats Herrbeta E4 Sweden'),note:'Option gratuite officielle de transit; choisir la partie la plus éloignée de la chaussée et vérifier la limite 24 h.'}
    ],
    'Malmö':[
      {kind:'camping',name:'First Camp Sibbarp Malmö',url:'https://en.firstcamp.se/destinations/sibbarp-malmoe',note:'Mer, Øresund, très pratique.'},
      {kind:'nature',name:'Sibbarp · emplacement mer',url:G('Sibbarp Malmö motorhome'),note:'Rester sur une zone explicitement autorisée, côté littoral.'},
      {kind:'free',name:'Lernacken / côte Øresund · parking autorisé',url:G('Lernacken Malmö parking'),note:'Très belle lumière sur le pont; uniquement si la signalisation du jour autorise le stationnement nocturne.'}
    ],
    'Södertälje / Trosa':[
      {kind:'camping',name:'Farstanäs Camping',url:'https://www.sodertalje.se/kultur-och-fritid/natur-och-friluftsliv/farstanas-camping/',note:'Réserve naturelle + plage; excellent à l’aller avant fermeture saisonnière.'},
      {kind:'nature',name:'Trosa Havsbad Camping',url:'https://camping.se/en/camping/2623/Trosa-Havsbad-Camping',note:'Baltique, plage, sauna, très bon retour septembre.'},
      {kind:'free',name:'Rastplats Tystberga / E4',url:G('Rastplats Tystberga E4 Sweden'),note:'Gratuit, boisé, pratique et sans détour; vérifier limite et panneaux.'}
    ],
    'Umeå':[
      {kind:'camping',name:'First Camp Nydala Umeå',url:'https://en.firstcamp.se/destinations/nydala-umea',note:'Lac, services complets.'},
      {kind:'nature',name:'Kvarkenfisk Ställplats',url:G('Kvarkenfisk Umeå ställplats'),note:'Mer + horizon du golfe de Botnie, gros coup de cœur nature.'},
      {kind:'free',name:'Rastplats Täfteböle / E4',url:G('Rastplats Täfteböle E4'),note:'Forêt et calme, gratuit; vérifier la signalisation et choisir la zone la plus éloignée des poids lourds.'}
    ],
    'Kiruna / Abisko':[
      {kind:'camping',name:'Camp Ripan',url:'https://ripan.se/en/rooms/camping/',note:'Meilleur reset confort du transit nord.'},
      {kind:'nature',name:'Björkliden Camping',url:'https://bjorkliden.com/en/stay-travel/accommodation/camping/',note:'Montagnes, proche Abisko, fantastique au réveil.'},
      {kind:'free',name:'E10 · Tornehamn / Bessejohka',url:G('Tornehamn Bessejohka E10 Sweden'),note:'Option montagne exceptionnelle et gratuite si le panneau local autorise la nuit. Ne pas utiliser le parking STF Abisko pour dormir.'}
    ],
    'Lofoten Est · Lyngvær / Gimsøy':[
      {kind:'camping',name:'Lyngvær Lofoten Bobilcamping',url:'https://lofoten-bobilcamping.no/en-hjemmeside/',note:'Vestfjord + montagnes, services camping-car.'},
      {kind:'nature',name:'Hov Camping · Gimsøy',url:'https://hovgard.no/en/camping-caravanning/',note:'Océan ouvert, excellent pour Hoven et lumière du soir.'},
      {kind:'free',name:'Aire E10 / Austnesfjorden · spot autorisé du jour',url:G('Austnesfjorden viewpoint Lofoten'),note:'Chercher uniquement un parking routier clairement autorisé. Zéro hors-piste; vérifier panneau « no camping ».'}
    ],
    'Lofoten Centre · Haukland/Uttakleiv':[
      {kind:'camping',name:'Reineholmen / Ballstad Motorhome Camp',url:'https://book.reineholmen.no/en/',note:'Petite île, mer, services modernes.'},
      {kind:'nature',name:'Uttakleiv Beach camping area',url:'https://visitlofoten.com/en/topic/uttakleiv-beach/',note:'Nuit signature, organisée et autorisée.'},
      {kind:'free',name:'Vestvågøy · parking routier côtier autorisé',url:G('Vestvågøy Lofoten scenic parking'),note:'Gratuit seulement si aucune restriction locale; ne jamais dormir sur prairie/plage hors parking.'}
    ],
    'Ramberg / Fredvang':[
      {kind:'camping',name:'Lofoten Beach Camp',url:'https://www.lofotenbeachcamp.no/',note:'Skagsanden, idéal pour douche/recharge après Ryten.'},
      {kind:'nature',name:'Fredvang / Innersand overnight parking',url:'https://visitlofoten.com/en/parking-for-kvalvika-og-ryten/',note:'Parfait pour départ matinal Ryten/Kvalvika.'},
      {kind:'free',name:'Flakstadøya · aire routière panoramique autorisée',url:G('Flakstad Lofoten scenic parking'),note:'Choisir le jour même selon panneaux. Priorité calme + vue mer; pas de bivouac hors parking.'}
    ],
    'Reine / Moskenes':[
      {kind:'camping',name:'Moskenes Camping',url:'https://moskenescamping.no/',note:'Base pratique pour Reine, Sørvågen et Å.'},
      {kind:'nature',name:'Reine / Sørvågen motorhome area',url:G('Sørvågen motorhome parking'),note:'Positionnement utile pour Reinebringen très tôt.'},
      {kind:'free',name:'Moskenesøy · parking routier autorisé hors villages',url:G('Moskenesøy scenic parking Lofoten'),note:'Option 0 € seulement si signalisation locale compatible; éviter les parkings de départ de randonnée interdits la nuit.'}
    ],
    'Ramberg / Flakstad':[
      {kind:'camping',name:'Lofoten Beach Camp',url:'https://www.lofotenbeachcamp.no/',note:'Services + plage, excellent reset.'},
      {kind:'nature',name:'Ramberg Resort Camping',url:'https://www.rambergresort.no/campsite',note:'Plage calme, bonne alternative.'},
      {kind:'free',name:'Vikten coastal road · spot légal à confirmer',url:'https://park4night.com/fr/place/60765',note:'Vue mer exceptionnelle mais seulement 3–4 vans, exposé et irrégulier. Vérifier panneaux et ne jamais bloquer les croisements.'}
    ]
  };

  const HIKE_RULES=[
    ['Festvågtind','Départ tôt; rochers glissants mouillés; éviter pluie et vent fort.'],
    ['Hoven','Option calme et moins exposée; terrain souvent humide.'],
    ['Mannen','Crête finale exposée; uniquement vent faible et terrain sec.'],
    ['Holandsmælen','Priorité calme/panorama; brouillard et terrain humide = renoncer.'],
    ['Ryten / Kvalvika','~5 h; boue fréquente et sommet exposé au vent; départ matin.'],
    ['Reinebringen','Très fréquenté; ~1 970 marches; départ très tôt, sec et bonne visibilité uniquement.']
  ];

  function clone(v){return JSON.parse(JSON.stringify(v));}
  function variant(){return (state.routeVariant==='A'||state.routeVariant==='B')?state.routeVariant:DEFAULT_VARIANT;}
  function data(){return ROUTES[variant()];}
  function totalKm(){return data().rows.reduce((s,r)=>s+(Number(r[3])||0),0);}
  function selectVariant(v){state.routeVariant=v;state.routePlanVersion=PLAN_VERSION;save();renderDashboardPlan();}
  function optionsForDestination(dest){return NIGHT_ZONES[dest]||[];}
  function optionHtml(o){const icon=o.kind==='camping'?'🏕️':o.kind==='nature'?'🌿':'🌲';const label=o.kind==='camping'?'Camping premium':o.kind==='nature'?'Nature premium':'Nature premium FREE';return `<article style="padding:10px 0;border-top:1px solid rgba(120,120,120,.2)"><b>${icon} ${label}</b><br><a href="${esc(o.url)}" target="_blank" rel="noopener">${esc(o.name)} ↗</a><p class="muted" style="margin:4px 0 0">${esc(o.note)}</p></article>`;}
  function routeButtons(){const v=variant();return `<div class="toolbar"><button class="btn ${v==='A'?'primary':''}" data-route-variant="A">🚀 A · Fast Track</button><button class="btn ${v==='B'?'primary':''}" data-route-variant="B">🌿 B · Confort</button></div>`;}
  function bindVariantButtons(){document.querySelectorAll('[data-route-variant]').forEach(b=>b.onclick=()=>selectVariant(b.dataset.routeVariant));}
  function applyConsistency(){let changed=false;if(!state.routeVariant){state.routeVariant=DEFAULT_VARIANT;changed=true;}if(state.routePlanVersion!==PLAN_VERSION){state.routePlanVersion=PLAN_VERSION;state.activeRoutePlan='A/B road-only · hikes protected';state.routePolicy={noFerry:'Aucun ferry',travelWindow:'Départ Chevreuse 25/08 · retour maison 11/09 · restitution 12/09 avant 16:00',variantA:'Fast Track: longues journées à l’aller, 8 nuits Lofoten',variantB:'Confort: journées régulières, 7 nuits Lofoten',hikes:'Protéger Hoven/Festvågtind, Mannen, Holandsmælen, Ryten/Kvalvika et Reinebringen selon météo',freeNights:'Une option Nature Premium FREE par étape; vérifier toujours la signalisation locale'};changed=true;}if(changed)save();}

  function renderDashboardPlan(){const d=data();byId('app').innerHTML=`<section class="card" style="border-left:5px solid #0f766e;margin-bottom:12px"><p class="eyebrow">PLAN V83 · ZÉRO FERRY · 25 AOÛT → 12 SEPTEMBRE</p><h2>${esc(d.label)}</h2><p>${esc(d.subtitle)}</p>${routeButtons()}</section><div class="grid">${card('Nuits Lofoten',String(d.lofotenNights),variant()==='A'?'29 août → 5 septembre':'30 août → 5 septembre')}${card('Restitution','12/09 avant 16:00','Chevreuse la veille')}${card('Distance planifiée',totalKm().toLocaleString('fr-FR')+' km','hors excursions locales')}${card('Ferry','0','Ponts uniquement')}</div><section class="card" style="margin-top:12px"><p class="eyebrow">RANDONNÉES À PROTÉGER</p><h2>La météo décide, pas le calendrier</h2>${HIKE_RULES.map(x=>`<p><b>${esc(x[0])}</b> — ${esc(x[1])}</p>`).join('')}<div class="popup-warning"><b>Règle :</b> une seule grosse randonnée par jour. La journée du 4 septembre reste volontairement libre pour rattraper la meilleure fenêtre météo.</div></section>`;bindVariantButtons();}

  function renderItineraryPlan(){const d=data();byId('app').innerHTML=`<section class="card" style="margin-bottom:12px"><p class="eyebrow">ITINÉRAIRES A/B</p><h1>${esc(d.label)}</h1><p>${esc(d.subtitle)}</p>${routeButtons()}<div class="popup-warning"><b>Important :</b> les heures sont de la conduite pure. A accepte volontairement trois très longues journées à l’aller; B vise un rythme nettement plus régulier.</div></section>${d.rows.map((r,i)=>{const [date,from,to,km,hours,type,goal,paddy]=r;const opts=optionsForDestination(to);return `<article class="card" style="margin-bottom:12px"><div class="nightly-options-heading"><div><p class="eyebrow">ÉTAPE ${i+1} · ${esc(date)} · ${esc(type)}</p><h2>${esc(from)} → ${esc(to)}</h2></div><div style="text-align:right"><b>≈ ${esc(km)} km</b><br><span>≈ ${esc(hours)} h</span></div></div><p>${esc(goal)}</p><p class="muted"><b>Paddy / rythme :</b> ${esc(paddy)}</p>${opts.length?`<details open><summary><b>3 options pour la nuit</b></summary>${opts.map(optionHtml).join('')}</details>`:''}</article>`;}).join('')}`;bindVariantButtons();}

  async function loadLeaflet(){if(window.L)return;if(window.__leafletPromise)return window.__leafletPromise;window.__leafletPromise=new Promise((resolve,reject)=>{if(!document.querySelector('link[data-leaflet]')){const css=document.createElement('link');css.rel='stylesheet';css.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';css.dataset.leaflet='1';document.head.appendChild(css);}const s=document.createElement('script');s.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';s.onload=resolve;s.onerror=reject;document.head.appendChild(s);});return window.__leafletPromise;}
  const COORDS={Chevreuse:[48.706,2.038],'Hambourg / vallée de l’Elbe':[53.55,10.0],Osnabrück:[52.28,8.05],'Norrköping / Bråviken':[58.59,16.19],Malmö:[55.61,13.00],'Södertälje / Trosa':[58.90,17.55],Umeå:[63.83,20.26],'Kiruna / Abisko':[68.20,19.20],'Lofoten Est · Lyngvær / Gimsøy':[68.30,14.10],'Lofoten Est':[68.30,14.10],'Lofoten Centre · Haukland/Uttakleiv':[68.20,13.52],'Lofoten Centre':[68.18,13.52],'Ramberg / Fredvang':[68.09,13.23],'Reine / Moskenes':[67.92,13.08],'Ramberg / Flakstad':[68.09,13.24],Kiruna:[67.86,20.23],'Södertälje / Trosa':[58.90,17.55],Chevreuse:[48.706,2.038]};
  async function draw(){const status=byId('route-status');try{await loadLeaflet();if(window.__roadMap){try{window.__roadMap.remove();}catch{}}const map=window.__roadMap=L.map('map-canvas').setView([59,13],4);L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© OpenStreetMap'}).addTo(map);const pts=[];data().rows.forEach(r=>{const p=COORDS[r[2]]||COORDS[r[1]];if(p){pts.push(p);L.marker(p).addTo(map).bindPopup(`<b>${esc(r[0])}</b><br>${esc(r[2])}`);}});if(pts.length){L.polyline(pts,{weight:4,opacity:.9}).addTo(map);map.fitBounds(pts,{padding:[24,24]});}status.innerHTML=`<b>${esc(data().label)}</b> · tracé indicatif des étapes. Ouvrir le GPS pour le détail routier et conserver « éviter les ferries ».`;}catch(e){console.error(e);status.textContent='Carte momentanément indisponible.';}}
  function renderMapPlan(){byId('app').innerHTML=`<section class="card"><p class="eyebrow">CARTE · VARIANTES A/B</p><h2>${esc(data().label)}</h2>${routeButtons()}<p>${esc(GPS_RULE)}</p><div id="route-status" class="status">Chargement…</div><div id="map-canvas" class="map" style="margin-top:12px"></div></section>`;bindVariantButtons();setTimeout(draw,0);}

  applyConsistency();
  window.renderDashboard=renderDashboardPlan;window.renderItinerary=renderItineraryPlan;window.renderMap=renderMapPlan;
  try{renderDashboard=renderDashboardPlan;renderItinerary=renderItineraryPlan;renderMap=renderMapPlan;}catch{}
})();
