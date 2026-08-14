'use strict';

(function installUnifiedPlanV90(){
  if(typeof state==='undefined') return;
  const VERSION='v90-activity-led-authoritative';
  const G=q=>`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
  const P=id=>`https://park4night.com/fr/place/${id}`;
  const E=v=>typeof esc==='function'?esc(v):String(v??'');

  const CORE=[
    {date:'30/08',from:'Kiruna / Jukkasjärvi',to:'Stave Camping · Andøya',km:470,h:7.0,type:'ARRIVÉE VESTERÅLEN',activity:'Repos avant Måtinden',objective:'Route vers Andøya. Installation face à l’océan. Aucune randonnée ce jour-là.',paddy:'Grande promenade seulement; préserver les jambes pour demain.'},
    {date:'31/08',from:'Stave Camping · Andøya',to:'Hov Camping · Gimsøy',km:260,h:4.2,type:'MVP #1 · MUST DO',activity:'Måtinden — Baugtua A/R',objective:'Départ tôt → Baugtua → Måtinden A/R (≈3–4 h, 7,6 km) → route vers Hov.',paddy:'✅ Paddy fait Måtinden en laisse courte + harnais. Rester très loin des falaises. Pas de traversée Stave–Bleik.'},
    {date:'01/09',from:'Hov Camping · Gimsøy',to:'Hov Camping · Gimsøy',km:35,h:0.8,type:'JOUR OFF',activity:'Kayak Henningsvær OU Hov plage/sauna/chevaux · Hoven option',objective:'Une seule activité principale. Hoven seulement si Sorya veut une 3e randonnée.',paddy:'Kayak : garde à organiser. Hoven/plage : ✅ avec Paddy.'},
    {date:'02/09',from:'Hov Camping · Gimsøy',to:'Lofoten Beach Camp · Skagsanden',km:110,h:2.5,type:'BALADE + ART',activity:'Haukland → Uttakleiv + Vikten / Glasshytta',objective:'Ancienne route côtière Haukland–Uttakleiv, puis Vikten / Glasshytta + plage, puis Skagsanden.',paddy:'✅ Balade facile avec laisse près des animaux. Pas de sommet supplémentaire.'},
    {date:'03/09',from:'Lofoten Beach Camp · Skagsanden',to:'Moskenes Camping',km:70,h:2.0,type:'JOUR OFF · VILLAGES',activity:'Nusfjord → Hamnøy → Sakrisøy → Reine',objective:'Journée photo / villages / récupération. Kayak Reinefjord seulement si mer favorable.',paddy:'✅ Selon règles locales des sites visités. Aucun sommet.'},
    {date:'04/09',from:'Moskenes Camping',to:'Moskenes Camping',km:15,h:0.5,type:'MVP #2 · MUST DO',activity:'Reinebringen — escaliers Sherpa',objective:'Reinebringen sur la meilleure fenêtre météo, puis Reine / Å relax.',paddy:'❌ Paddy ne fait pas Reinebringen. Prévoir une garde/supervision sûre.'},
    {date:'05/09',from:'Moskenes Camping',to:'Lofoten Est · Lyngvær / Gimsøy',km:95,h:2.0,type:'JOKER MÉTÉO',activity:'Rattrapage MVP / kayak / Å / plage / repos',objective:'Journée tampon destinée à sauver Måtinden ou Reinebringen si météo défavorable, sinon activité douce et retour progressif vers l’est.',paddy:'Aucune grosse randonnée ajoutée. Cette journée protège les MVP existants.'},
    {date:'06/09',from:'Lofoten Est · Lyngvær / Gimsøy',to:'Kiruna / Jukkasjärvi',km:410,h:5.8,type:'RETOUR',activity:'Aucune activité sportive',objective:'E10 → Narvik → Abisko → Kiruna/Jukkasjärvi.',paddy:'Pauses régulières.'}
  ];

  const OUT_A=[
    {date:'25/08',from:'Chevreuse',to:'Osnabrück',km:680,h:7.0,type:'TRANSIT A',activity:'Transit',objective:'Départ tôt. Axe nord-est, pauses planifiées.',paddy:'Pause toutes les ~2 h.'},
    {date:'26/08',from:'Osnabrück',to:'Malmö',km:700,h:7.8,type:'TRANSIT A',activity:'Transit',objective:'Danemark par les ponts puis Malmö.',paddy:'Pas de détour urbain.'},
    {date:'27/08',from:'Malmö',to:'Södertälje / Trosa',km:620,h:6.8,type:'TRANSIT A',activity:'Transit',objective:'Remontée rapide de la Suède, contourner Stockholm.',paddy:'Nuit calme au sud de Stockholm.'},
    {date:'28/08',from:'Södertälje / Trosa',to:'Umeå',km:665,h:7.5,type:'TRANSIT A',activity:'Transit',objective:'E4 plein nord.',paddy:'Deux vraies promenades.'},
    {date:'29/08',from:'Umeå',to:'Kiruna / Jukkasjärvi',km:600,h:7.0,type:'TRANSIT A',activity:'Transit',objective:'Entrée en Laponie.',paddy:'Soirée récupération avant Andøya.'}
  ];
  const OUT_B=[
    {date:'25/08',from:'Chevreuse',to:'Münster / Osnabrück',km:650,h:6.7,type:'TRANSIT B',activity:'Transit',objective:'Première journée soutenue mais plus douce.',paddy:'Grande promenade à l’arrivée.'},
    {date:'26/08',from:'Münster / Osnabrück',to:'Malmö',km:700,h:7.8,type:'TRANSIT B',activity:'Transit',objective:'Danemark par les ponts.',paddy:'Pas de détour urbain.'},
    {date:'27/08',from:'Malmö',to:'Trosa / Södertälje',km:620,h:6.8,type:'TRANSIT B',activity:'Transit',objective:'Suède méridionale puis E4.',paddy:'Nuit calme côté nature.'},
    {date:'28/08',from:'Trosa / Södertälje',to:'Umeå',km:665,h:7.5,type:'TRANSIT B',activity:'Transit',objective:'E4 nord.',paddy:'Pauses structurées.'},
    {date:'29/08',from:'Umeå',to:'Kiruna / Jukkasjärvi',km:600,h:7.0,type:'TRANSIT B',activity:'Transit',objective:'Laponie.',paddy:'Soirée récupération avant Andøya.'}
  ];
  const RETURN=[
    {date:'07/09',from:'Kiruna / Jukkasjärvi',to:'Umeå',km:600,h:7.0,type:'RETOUR',activity:'Transit',objective:'Axe rapide suédois.',paddy:'Pauses toutes les ~2 h.'},
    {date:'08/09',from:'Umeå',to:'Södertälje / Trosa',km:665,h:7.5,type:'RETOUR',activity:'Transit',objective:'E4 plein sud, contourner Stockholm.',paddy:'Nuit calme.'},
    {date:'09/09',from:'Södertälje / Trosa',to:'Malmö',km:620,h:6.8,type:'RETOUR',activity:'Transit',objective:'Sud Suède.',paddy:'Promenade mer/forêt.'},
    {date:'10/09',from:'Malmö',to:'Osnabrück',km:700,h:7.8,type:'RETOUR',activity:'Transit',objective:'Øresund + Grand Belt + Allemagne.',paddy:'Marge trafic et pauses.'},
    {date:'11/09',from:'Osnabrück',to:'Chevreuse',km:680,h:7.0,type:'MAISON',activity:'Retour maison',objective:'Arrivée maison. Nettoyage léger.',paddy:'Grande pause au milieu.'},
    {date:'12/09',from:'Chevreuse',to:'Restitution van avant 16:00',km:25,h:0.7,type:'RESTITUTION',activity:'Restitution',objective:'Plein, AdBlue si nécessaire, eau/vidanges, photos.',paddy:'Large marge avant 16:00.'}
  ];

  const ACTIVITIES=[
    {rank:'MVP #1 · MUST DO',name:'Måtinden — Baugtua aller-retour',date:'31/08',base:'Stave Camping · Andøya',duration:'≈3–4 h · 7,6 km A/R · ≈400–500 m D+',paddy:'✅ Oui',why:'Ouverture spectaculaire du séjour. La date et la nuit de Stave sont construites autour de cette randonnée.',url:'https://www.visitnorway.com/listings/m%C3%A5tind-%28408-masl%29-in-vester%C3%A5len/228686/'},
    {rank:'MVP #2 · MUST DO',name:'Reinebringen — escaliers Sherpa',date:'04/09',base:'Moskenes Camping · 2 nuits',duration:'≈1–2 h · ≈2 km A/R · 484 m',paddy:'❌ Non',why:'Deux nuits à Moskenes + le 05/09 joker donnent une vraie fenêtre météo.',url:'https://reinebringen.no/'},
    {rank:'MVP #3 · OPTION',name:'Hoven',date:'01/09',base:'Hov Camping',duration:'≈2 h · 4 km A/R · 367 m',paddy:'✅ Oui',why:'Seulement si Sorya souhaite une troisième randonnée. Départ quasiment depuis le camping.',url:'https://visitlofoten.com/en/guide/hoven-367-m-a-sl/'},
    {rank:'BALADE DOUCE',name:'Haukland → Uttakleiv par l’ancienne route côtière',date:'02/09',base:'Hov → Skagsanden',duration:'≈1,5–2 h · ≈8 km A/R',paddy:'✅ Oui',why:'Plages et photos, sans transformer la journée en randonnée montagne.',url:'https://visitlofoten.com/en/topic/beaches-in-lofoten/haukland-beach/'},
    {rank:'MUST DO PHOTO / ART',name:'Vikten · Glasshytta + plage',date:'02/09',base:'En route vers Skagsanden',duration:'≈1–2 h',paddy:'✅ Extérieur',why:'Stop panoramique et artistique après Haukland/Uttakleiv.',url:'https://glasshyttavikten.no/'},
    {rank:'JOUR OFF',name:'Nusfjord + Hamnøy + Sakrisøy + Reine',date:'03/09',base:'Skagsanden → Moskenes',duration:'Journée',paddy:'✅ Selon règles',why:'Journée photo et villages sans sommet.',url:'https://visitlofoten.com/en/destination/flakstad/'},
    {rank:'OPTION MER',name:'Kayak guidé Henningsvær',date:'01/09',base:'Hov Camping',duration:'≈2 h',paddy:'Garde à organiser',why:'Option principale de la journée OFF si mer favorable.',url:'https://xxlofoten.no/en/experiences/kayak-henningsvaer'},
    {rank:'OPTION MER / JOKER',name:'Kayak Reinefjord',date:'03/09 ou 05/09',base:'Moskenes / Reine',duration:'≈2 h',paddy:'Garde à organiser',why:'Complément météo, jamais une obligation.',url:'https://booking.visitlofoten.com/experiences/moskenes/saga-adventures-lofoten/explore-reine-fjord-by-kayak?lang=en'}
  ];

  const NIGHTS={
    '25/08':[
      {kind:'camping',name:'Campingpark Kronensee',url:'https://www.campingpark-kronensee.de/',note:'Lac + forêt, vrai camping de récupération.'},
      {kind:'nature',name:'Camping Niedersachsenhof',url:G('Camping Niedersachsenhof Osnabrück'),note:'Rural et calme.'},
      {kind:'free',name:'Dümmer See · parking autorisé',url:G('Dümmer See Wohnmobil Parkplatz'),note:'Gratuit uniquement si la signalisation locale autorise la nuit.'}
    ],
    '26/08':[
      {kind:'camping',name:'First Camp Sibbarp Malmö',url:'https://en.firstcamp.se/destinations/sibbarp-malmoe',note:'Mer + services complets.',p4n:P('15339')},
      {kind:'nature',name:'Sibbarp · emplacement mer',url:G('Sibbarp Malmö motorhome'),note:'Aire autorisée proche de la côte.'},
      {kind:'free',name:'Lernacken / côte Øresund · parking autorisé',url:G('Lernacken Malmö parking'),note:'Seulement si la signalisation du jour permet la nuit.'}
    ],
    '27/08':[
      {kind:'camping',name:'Farstanäs Camping',url:'https://www.sodertalje.se/kultur-och-fritid/natur-och-friluftsliv/farstanas-camping/',note:'Réserve naturelle + plage.'},
      {kind:'nature',name:'Trosa Havsbad Camping',url:'https://camping.se/en/camping/2623/Trosa-Havsbad-Camping',note:'Baltique et plage.'},
      {kind:'free',name:'Rastplats Tystberga / E4',url:G('Rastplats Tystberga E4 Sweden'),note:'Boisé et pratique; vérifier limite et panneaux.'}
    ],
    '28/08':[
      {kind:'camping',name:'First Camp Nydala Umeå',url:'https://en.firstcamp.se/destinations/nydala-umea',note:'Lac + services complets.',p4n:P('115801')},
      {kind:'nature',name:'Kvarkenfisk Ställplats',url:G('Kvarkenfisk Umeå ställplats'),note:'Mer + horizon du golfe de Botnie.'},
      {kind:'free',name:'Rastplats Täfteböle / E4',url:G('Rastplats Täfteböle E4'),note:'Forêt; gratuit si règles locales compatibles.'}
    ],
    '29/08':[
      {kind:'camping',name:'Camp Ripan',url:'https://ripan.se/en/rooms/camping/',note:'Excellent reset confort.',p4n:P('78440')},
      {kind:'nature',name:'Björkliden Camping',url:'https://bjorkliden.com/en/stay-travel/accommodation/camping/',note:'Montagne spectaculaire.',p4n:P('133328')},
      {kind:'free',name:'E10 · Tornehamn / Bessejohka',url:G('Tornehamn Bessejohka E10 Sweden'),note:'Seulement si le stationnement nocturne est autorisé.'}
    ],
    '30/08':[
      {kind:'camping',name:'Stave Camping · Andøya',url:'https://www.stavecamping.no/beach-camping',note:'Base choisie pour protéger Måtinden.'},
      {kind:'nature',name:'Midnattsol Camping · Bleik',url:'https://www.midnattsolcamping.com/en',note:'Plage de Bleik, proche Baugtua.'},
      {kind:'free',name:'Baugtua / Bleik · parking autorisé du jour',url:G('Baugtua Bleik Andoya parking'),note:'Seulement si la signalisation autorise explicitement la nuit.'}
    ],
    '31/08':[
      {kind:'camping',name:'Hov Camping · Gimsøy',url:'https://hovgard.no/en/camping-caravanning/',note:'★★★★★ Base famille : plage, sauna, chevaux, restaurant.'},
      {kind:'nature',name:'Lyngvær Lofoten Bobilcamping',url:'https://lofoten-bobilcamping.no/en-hjemmeside/',note:'Alternative nature testée/appréciée.',p4n:P('12131')},
      {kind:'free',name:'Austnesfjorden · parking routier autorisé',url:G('Austnesfjorden viewpoint Lofoten'),note:'Uniquement si la nuit est autorisée par la signalisation.'}
    ],
    '01/09':null,
    '02/09':[
      {kind:'camping',name:'Lofoten Beach Camp',url:'https://www.lofotenbeachcamp.no/',note:'Skagsanden, douche/recharge + plage.',p4n:P('60796')},
      {kind:'nature',name:'Ramberg Resort Camping',url:'https://www.rambergresort.no/campsite',note:'Plage calme et belle lumière.'},
      {kind:'free',name:'Vikten coastal road · spot légal à confirmer',url:P('60765'),note:'Très beau mais petit/exposé; vérifier panneaux et conditions.',p4n:P('60765')}
    ],
    '03/09':[
      {kind:'camping',name:'Moskenes Camping',url:'https://moskenescamping.no/',note:'Base idéale pour Reine et fenêtre météo Reinebringen.',p4n:P('12139')},
      {kind:'nature',name:'Sørvågen motorhome area',url:G('Sørvågen motorhome parking'),note:'Positionnement pratique près de Reine.'},
      {kind:'free',name:'Moskenes port parking',url:P('59230'),note:'Seulement si la réglementation locale du jour permet la nuit.',p4n:P('59230')}
    ],
    '04/09':null,
    '05/09':[
      {kind:'camping',name:'Lyngvær Lofoten Bobilcamping',url:'https://lofoten-bobilcamping.no/en-hjemmeside/',note:'Excellent pour dernière nuit et départ E10.',p4n:P('12131')},
      {kind:'nature',name:'Hov Camping · Gimsøy',url:'https://hovgard.no/en/camping-caravanning/',note:'Océan + calme.'},
      {kind:'free',name:'Austnesfjorden · parking routier autorisé',url:G('Austnesfjorden viewpoint Lofoten'),note:'Uniquement si la nuit est autorisée.'}
    ],
    '06/09':null,
    '07/09':null,'08/09':null,'09/09':null,'10/09':null,'11/09':null
  };
  NIGHTS['01/09']=NIGHTS['31/08'];
  NIGHTS['04/09']=NIGHTS['03/09'];
  NIGHTS['06/09']=NIGHTS['29/08'];
  NIGHTS['07/09']=NIGHTS['28/08'];
  NIGHTS['08/09']=NIGHTS['27/08'];
  NIGHTS['09/09']=NIGHTS['26/08'];
  NIGHTS['10/09']=NIGHTS['25/08'];
  NIGHTS['11/09']=[];

  const variants={A:{label:'A · Aller soutenu',out:OUT_A},B:{label:'B · Road trip confort',out:OUT_B}};
  if(!['A','B'].includes(state.routeVariant)) state.routeVariant='B';
  const rows=()=>[...variants[state.routeVariant].out,...CORE,...RETURN];

  function syncState(){
    state.routePlanVersion=VERSION;
    state.itinerary=rows().map(d=>[d.date,d.from,d.to,d.km,d.h,d.type,`${d.activity} · ${d.objective}`,d.paddy]);
    state.activities=ACTIVITIES.map(a=>[`${a.rank} · ${a.name}`,a.base,'Activité prioritaire',`${a.date} · ${a.duration}`,a.why,a.paddy,'','']);
    state.familyPriorities={version:VERSION,fixed:['Måtinden','Reinebringen'],optional:['Hoven'],soft:['Haukland → Uttakleiv','Vikten','Villages','Kayak'],rule:'Les activités Lofoten pilotent l’itinéraire. Les itinéraires A/B ne modifient que le transit.'};
    state.routePolicy=state.routePolicy||{};
    state.routePolicy.lofoten='30/08 Andøya; 31/08 Måtinden; Hov 2 nuits; 02/09 Haukland-Uttakleiv + Vikten; Moskenes 2 nuits; 04/09 Reinebringen; 05/09 joker météo; départ 06/09.';
  }
  syncState();
  try{localStorage.setItem('lofoten-pwa-v1',JSON.stringify(state));}catch{}

  const kindLabel=k=>k==='camping'?'🏕️ Camping Premium':k==='nature'?'🌿 Nature Premium':'🌲 Nature Free Premium';
  function nightsHtml(date){
    const opts=NIGHTS[date]||[];
    if(!opts.length)return '';
    return `<details class="card" style="margin:8px 0 14px"><summary><b>3 options pour la nuit du ${E(date)}</b></summary>${opts.map(o=>`<div style="padding:10px 0;border-top:1px solid rgba(120,120,120,.18)"><b>${kindLabel(o.kind)}</b><br><a href="${E(o.url)}" target="_blank" rel="noopener">${E(o.name)} ↗</a>${o.p4n?` · <a href="${E(o.p4n)}" target="_blank" rel="noopener">Park4Night ↗</a>`:''}<div class="muted">${E(o.note)}</div></div>`).join('')}</details>`;
  }
  function routeButtons(){return `<div class="toolbar"><button class="btn ${state.routeVariant==='A'?'primary':''}" data-route-v90="A">🚀 A · Soutenu</button><button class="btn ${state.routeVariant==='B'?'primary':''}" data-route-v90="B">🌿 B · Confort</button></div>`;}
  function bindRoute(){document.querySelectorAll('[data-route-v90]').forEach(b=>b.onclick=()=>{state.routeVariant=b.dataset.routeV90;syncState();if(typeof save==='function')save();renderItinerary();});}
  function totalHours(){return rows().reduce((s,d)=>s+d.h,0).toFixed(1);}
  function totalDistance(){return rows().reduce((s,d)=>s+d.km,0);}

  window.renderDashboard=function(){
    byId('app').innerHTML=`<section class="card priority-banner"><p class="eyebrow">ROADBOOK V90 · ACTIVITÉS → ITINÉRAIRE</p><h2>${E(variants[state.routeVariant].label)}</h2><p><b>Principe :</b> Måtinden et Reinebringen sont verrouillés. Hoven reste optionnel. Les nuits, transferts et journées OFF sont positionnés pour rendre ces activités possibles.</p>${routeButtons()}<div class="grid" style="margin-top:12px">${typeof card==='function'?card('Distance',`${totalDistance().toLocaleString('fr-FR')} km`):''}${typeof card==='function'?card('Conduite',`${totalHours()} h`):''}${typeof card==='function'?card('Lofoten','6 nuits','+ 1 nuit Andøya'):''}${typeof card==='function'?card('MVP','2 MUST DO','Måtinden + Reinebringen'):''}</div></section><section class="card" style="margin-top:12px"><h2>🔒 Backbone activités</h2>${ACTIVITIES.slice(0,6).map(a=>`<p><b>${E(a.date)} · ${E(a.rank)} — ${E(a.name)}</b><br><span class="muted">${E(a.why)}</span></p>`).join('')}</section>`;
    bindRoute();
  };

  window.renderItinerary=function(){
    const items=rows().map(d=>`<article class="card" style="margin-bottom:10px"><p class="eyebrow">${E(d.date)} · ${E(d.type)}</p><h3>${E(d.from)} → ${E(d.to)}</h3><p><b>🚐 ${E(d.km)} km · ${E(String(d.h).replace('.',','))} h</b></p><p><b>🎯 ${E(d.activity)}</b><br>${E(d.objective)}</p><p class="muted"><b>Paddy :</b> ${E(d.paddy)}</p></article>${nightsHtml(d.date)}`).join('');
    byId('app').innerHTML=`<section class="card priority-banner"><p class="eyebrow">ITINÉRAIRE SYNCHRONISÉ V90</p><h2>${E(variants[state.routeVariant].label)}</h2><p>A/B changent uniquement le transit. Le bloc Andøya + Lofoten du 30/08 au 06/09 est identique pour garantir les activités.</p>${routeButtons()}</section>${items}`;
    bindRoute();
  };

  window.renderFamily=function(){
    byId('app').innerHTML=`<section class="card priority-banner"><p class="eyebrow">MVP ACTIVITÉS · AUTORITATIF</p><h2>Ces activités pilotent le roadbook</h2><p>Si météo ou fatigue imposent un changement, on déplace les transferts ou on utilise le 05/09 joker. On ne remplace pas silencieusement un MVP par une autre randonnée.</p></section><section class="hike-grid">${ACTIVITIES.map(a=>`<article class="hike-card planned"><div class="hike-card-head"><div><span class="hike-island">${E(a.date)} · ${E(a.base)}</span><h3>${E(a.name)}</h3></div><span class="hike-status">${E(a.rank)}</span></div><p><b>${E(a.duration)}</b> · Paddy : ${E(a.paddy)}</p><p>${E(a.why)}</p><div class="toolbar"><a class="btn primary" href="${E(a.url)}" target="_blank" rel="noopener">Source / détail ↗</a></div></article>`).join('')}</section>`;
  };

  const eyebrow=document.querySelector('.hero .eyebrow'); if(eyebrow)eyebrow.textContent='ROADBOOK VIVANT · V90';
  const heroP=document.querySelector('.hero h1 + p'); if(heroP)heroP.textContent='Olivier, Sorya & Paddy · itinéraire piloté par les activités · 3 options premium par nuit · MVP protégés · restitution 12/09 avant 16:00';
})();
