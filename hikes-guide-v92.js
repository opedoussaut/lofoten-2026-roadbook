'use strict';

// V92 — field-ready hike guide. This module is informational only: it does not mutate
// the authoritative itinerary. The itinerary remains owned by unified-plan-v90.js.

if (typeof tabs !== 'undefined' && !tabs.some(([id]) => id === 'hikes')) {
  const itineraryIndex = tabs.findIndex(([id]) => id === 'itinerary');
  tabs.splice(itineraryIndex >= 0 ? itineraryIndex + 1 : 2, 0, ['hikes', 'Randonnées']);
}

const HIKE_V92 = [
  {
    key:'matinden', priority:'MVP #1 · MUST DO', planned:'31/08', title:'Måtinden — Baugtua aller-retour', area:'Andøya · Vesterålen',
    distance:'≈ 7,6 km A/R', duration:'≈ 3–4 h', elevation:'408 m · ≈ 400–500 m D+', difficulty:'Modérée', exposure:'Sommet bordé de falaises verticales',
    paddy:'✅ Oui sur Baugtua A/R · laisse courte + harnais · rester très loin du bord.',
    why:'Ouverture spectaculaire du séjour et randonnée déjà protégée par l’itinéraire.',
    trailhead:{name:'Baugtua trailhead',lat:69.235670,lon:15.948500},
    cheapest:'Depuis Stave Camping : court transfert jusqu’à Baugtua. Utiliser uniquement le stationnement du départ / zones explicitement autorisées ; ne pas créer une place sur l’accotement.',
    parking:'Petit départ très recherché : partir tôt. Coût à vérifier sur la signalisation le jour même ; le roadbook ne suppose pas qu’un parking non signalé est gratuit.',
    route:'Départ raide puis terrain plus ouvert. Ne pas faire la traversée côtière intégrale Stave–Bleik avec Paddy.',
    conditions:'Éviter brouillard, vent fort, pluie soutenue et sol très détrempé. Les falaises imposent une marge de sécurité importante.',
    source:'https://www.visitnorway.com/listings/m%C3%A5tind-%28408-masl%29-in-vester%C3%A5len/228686/'
  },
  {
    key:'hoven', priority:'MVP #3 · OPTION', planned:'01/09', title:'Hoven — depuis Hov / Lofoten Links', area:'Gimsøy · Lofoten',
    distance:'≈ 4 km A/R', duration:'≈ 2 h', elevation:'367 m', difficulty:'Facile à modérée', exposure:'Peu technique, mais sommet exposé au vent',
    paddy:'✅ Très bon choix avec Paddy si terrain correct.', why:'Option idéale si Sorya veut une troisième randonnée ; départ quasiment depuis votre base.',
    trailhead:{name:'Hov / Lofoten Links',lat:68.339380,lon:14.113230},
    cheapest:'Dormir à Hov Camping puis partir à pied : coût parking additionnel = 0 NOK et aucun déplacement du camping-car.',
    parking:'Ne déplacer le RV que si nécessaire. Si vous n’êtes pas à Hov, utiliser les emplacements visiteurs autorisés du secteur Hov/Lofoten Links.',
    route:'Début potentiellement marécageux après la pluie, puis montée régulière avec quelques passages rocheux.',
    conditions:'Bonne randonnée de repli par météo correcte ; renoncer si rafales fortes ou terrain saturé.',
    source:'https://visitlofoten.com/en/guide/hoven-367-m-a-sl/'
  },
  {
    key:'haukland-uttakleiv', priority:'BALADE DOUCE · PROTÉGÉE', planned:'02/09', title:'Haukland → Uttakleiv — ancienne route côtière', area:'Vestvågøy · Lofoten',
    distance:'≈ 8 km A/R', duration:'≈ 1,5–2 h', elevation:'Quasi niveau mer', difficulty:'Facile', exposure:'Côte ouverte, mais pas de crête',
    paddy:'✅ Oui · excellente balade avec Paddy ; laisse près des animaux.', why:'La balade famille du programme : plages, photos et récupération entre les randonnées.',
    trailhead:{name:'Haukland Beach',lat:68.199000,lon:13.529000},
    cheapest:'Si vous passez par Uttakleiv/Haukland, garer le camping-car une seule fois sur un parking officiel et faire l’ancienne route côtière en aller-retour. Éviter de payer deux parkings.',
    parking:'Haukland et Uttakleiv sont très fréquentés et les règles/tarifs peuvent évoluer. Utiliser le parking officiel choisi et vérifier le tarif affiché avant de partir.',
    route:'Suivre l’ancienne route côtière au niveau de la mer. Ne pas transformer cette journée en Mannen/Himmeltinden si l’objectif est une journée douce.',
    conditions:'Très bonne option par météo moyenne ; prudence au vent et sur chaussée humide.',
    source:'https://visitlofoten.com/en/topic/beaches-in-lofoten/haukland-beach/'
  },
  {
    key:'reinebringen', priority:'MVP #2 · MUST DO', planned:'04/09', title:'Reinebringen — escaliers Sherpa', area:'Reine · Moskenesøy',
    distance:'≈ 2 km A/R (+ accès)', duration:'≈ 1–2 h', elevation:'484 m', difficulty:'Très raide', exposure:'Très fréquenté · pente très raide · marches',
    paddy:'❌ Paddy ne fait pas Reinebringen.', why:'Panorama iconique ; les deux nuits à Moskenes donnent une vraie fenêtre météo.',
    trailhead:{name:'Reinebringen trailhead',lat:67.922330,lon:13.078360},
    cheapest:'Depuis Moskenes Camping : vélo jusqu’à Reine / départ de la randonnée. C’est l’option parking la moins chère : 0 NOK de parking et pas de stress de place.',
    parking:'Si vélo impossible : utiliser un parking public désigné à Reine/Moskenes et accepter le tarif affiché. Ne pas chercher une place gratuite improvisée au bord de l’E10.',
    route:'Escaliers Sherpa presque continus. Départ très tôt recommandé pour limiter chaleur, fréquentation et difficulté de stationnement.',
    conditions:'Ne pas partir sous forte pluie, vent violent ou mauvaise visibilité. Prévoir eau et chaussures adhérentes.',
    source:'https://reinebringen.no/'
  },
  {
    key:'ryten-kvalvika', priority:'PLAN B MÉTÉO', planned:'03–05/09', title:'Ryten / Kvalvika', area:'Fredvang · Moskenesøy',
    distance:'≈ 7–9 km selon départ', duration:'≈ 3–5 h', elevation:'543 m · D+ variable', difficulty:'Modérée', exposure:'Terrain boueux + rebord spectaculaire au sommet',
    paddy:'✅ Possible en laisse ; prévoir de le porter sur passages boueux/rocheux.', why:'Plan B fort si un MVP tombe à l’eau ; pas à ajouter en plus d’une journée déjà chargée.',
    trailhead:{name:'Fredvang / Innersand area',lat:68.091000,lon:13.124000},
    cheapest:'Depuis Lofoten Beach Camp, l’approche à vélo est possible pour Olivier (environ 13–15 km selon le départ exact) et évite le parking payant. Pour la famille, RV plus simple.',
    parking:'Les départs autour de Fredvang/Innersand utilisent des parkings organisés, souvent privés/payants. Choisir le parking officiel le plus proche du départ retenu et vérifier le prix le jour même.',
    route:'Choisir le tracé exact la veille : les variantes Kvalvika/Ryten ne partent pas toutes du même parking.',
    conditions:'Très sensible à la boue, au vent et aux nuages bas. Ne pas approcher les rebords par vent fort.',
    source:'https://visitlofoten.com/en/guide/kvalvika-and-ryten-543-m/'
  },
  {
    key:'festvagtinden', priority:'OPTION SPORTIVE', planned:'Fenêtre Henningsvær', title:'Festvågtinden — Henningsvær', area:'Austvågøy · Henningsvær',
    distance:'≈ 3 km A/R', duration:'≈ 2–3 h', elevation:'541 m', difficulty:'Soutenue', exposure:'Raide · blocs · terrain glissant',
    paddy:'⚠️ Pas notre choix familial prioritaire ; à envisager seulement si terrain sec et confort suffisant.', why:'Vue exceptionnelle sur Henningsvær mais plus exigeante que Hoven.',
    trailhead:{name:'Festvågtinden trailhead',lat:68.164300,lon:14.206500},
    cheapest:'Combiner la randonnée avec votre visite de Henningsvær et ne payer/occuper qu’un stationnement pour les deux activités.',
    parking:'Stationnement limité autour du départ. Utiliser uniquement les parkings désignés ; ne pas bloquer la route étroite vers Henningsvær.',
    route:'Montée courte mais très raide, avec terrain rocheux. Descente plus exigeante qu’elle n’en a l’air.',
    conditions:'Terrain sec + vent faible. À écarter après forte pluie.',
    source:'https://lofotenhikes.com/hike/festvagtind-541m/'
  },
  {
    key:'mannen', priority:'OPTION SPORTIVE', planned:'Fenêtre Haukland', title:'Mannen — au-dessus de Haukland', area:'Vestvågøy',
    distance:'≈ 4–5 km A/R', duration:'≈ 2–3 h', elevation:'400 m', difficulty:'Modérée', exposure:'Crête et sensation de vide',
    paddy:'⚠️ Possible seulement avec vent faible, terrain sec et contrôle parfait en laisse.', why:'Très belle vue Haukland/Uttakleiv, mais ne doit pas remplacer la balade douce prévue si fatigue.',
    trailhead:{name:'Haukland area',lat:68.199000,lon:13.529000},
    cheapest:'Même stratégie que Haukland : si le RV est déjà stationné officiellement pour la plage, ne pas changer de parking. À vélo depuis une base proche = 0 NOK additionnel.',
    parking:'Utiliser le parking officiel Haukland et vérifier le tarif affiché.',
    route:'Montée rapide vers la crête ; attention à l’exposition et aux zones humides.',
    conditions:'Uniquement terrain sec et vent faible.',
    source:'https://lofotenhikes.com/hike/mannen-400m/'
  },
  {
    key:'holandsmaelen', priority:'OPTION CALME', planned:'Fenêtre Vestvågøy', title:'Holandsmælen', area:'Vestvågøy',
    distance:'≈ 5,6 km A/R', duration:'≈ 2,5–3 h', elevation:'434 m · ≈ 434 m D+', difficulty:'Modérée', exposure:'Moins fréquenté · orientation plus importante',
    paddy:'✅ Possible si énergie, terrain sec et vent faible.', why:'Alternative plus calme aux classiques, à garder comme joker et non comme obligation.',
    trailhead:{name:'Holandsmælen area',lat:68.184000,lon:13.562000},
    cheapest:'Depuis Haukland/Uttakleiv, vélo possible pour Olivier sur quelques kilomètres : parking additionnel = 0 NOK.',
    parking:'Si RV : utiliser le stationnement autorisé le plus proche du départ et vérifier la signalisation ; ne pas se garer sur terrain privé.',
    route:'Montée progressive, sentier parfois peu évident. Télécharger une trace hors ligne avant de partir.',
    conditions:'Brouillard et terrain humide peuvent rendre l’orientation nettement moins confortable.',
    source:'https://lofotenhikes.com/hike/holandsmaelen-434m/'
  },
  {
    key:'linken', priority:'PLAN B 1 H', planned:'Fenêtre Svolvær', title:'Linken — Svolvær', area:'Austvågøy · Svolvær',
    distance:'≈ 3,8 km A/R', duration:'≈ 1 h', elevation:'≈ 152 m', difficulty:'Facile', exposure:'Faible à modérée',
    paddy:'✅ Oui en laisse.', why:'Excellent plan B si kayak annulé ou si la météo ne permet pas une grande randonnée.',
    trailhead:{name:'Linken / Svolvær',lat:68.235000,lon:14.565000},
    cheapest:'À combiner avec une visite de Svolvær : laisser le RV sur votre stationnement de ville et rejoindre le départ à pied si possible.',
    parking:'Choisir un parking public autorisé en ville et vérifier restrictions/tarifs. Le but est d’éviter un deuxième stationnement uniquement pour la randonnée.',
    route:'Courte randonnée avec vue rapide sur Svolvær.',
    conditions:'Bonne option par météo imparfaite ; éviter simplement les sols très glissants.',
    source:'https://visitlofoten.com/en/guide/linken-in-svolvaer-105-m/'
  }
];

function h92fixed(n){return Number(n).toFixed(6)}
function h92google(p){return `https://www.google.com/maps/search/?api=1&query=${h92fixed(p.lat)},${h92fixed(p.lon)}`}
function h92drive(p){return `https://www.google.com/maps/dir/?api=1&destination=${h92fixed(p.lat)},${h92fixed(p.lon)}&travelmode=driving`}
function h92topo(p){return `https://www.opentopomap.org/#map=15/${h92fixed(p.lat)}/${h92fixed(p.lon)}`}
function h92osm(p){return `https://www.openstreetmap.org/?mlat=${h92fixed(p.lat)}&mlon=${h92fixed(p.lon)}#map=16/${h92fixed(p.lat)}/${h92fixed(p.lon)}`}
function h92link(url,label,primary=false){return `<a class="btn ${primary?'primary':''}" href="${url}" target="_blank" rel="noopener">${label} ↗</a>`}
function h92esc(v){return typeof esc==='function'?esc(v):String(v??'')}

function renderHikes(){
  const app=byId('app'); if(!app)return;
  const cards=HIKE_V92.map(h=>`<article class="card" style="margin-top:12px">
    <div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start;flex-wrap:wrap">
      <div><p class="eyebrow">${h92esc(h.priority)} · ${h92esc(h.planned)}</p><h2 style="margin:3px 0">🥾 ${h92esc(h.title)}</h2><p class="muted">${h92esc(h.area)} · ${h92esc(h.why)}</p></div>
      <div><strong>${h92esc(h.distance)}</strong><br><span class="muted">${h92esc(h.duration)} · ${h92esc(h.elevation)}</span></div>
    </div>
    <div class="grid" style="margin-top:10px">
      <div><p><b>Niveau :</b> ${h92esc(h.difficulty)}</p><p><b>Exposition :</b> ${h92esc(h.exposure)}</p><p><b>Paddy :</b> ${h92esc(h.paddy)}</p></div>
      <div><p><b>Départ :</b> ${h92esc(h.trailhead.name)}</p><p><b>Option la moins chère :</b> ${h92esc(h.cheapest)}</p></div>
    </div>
    <div style="padding:12px;border-radius:10px;background:rgba(21,48,71,.06);margin-top:10px"><b>🚐 Stationnement / accès RV</b><br>${h92esc(h.parking)}</div>
    <p style="margin-top:10px"><b>Itinéraire terrain :</b> ${h92esc(h.route)}</p><p><b>Décision météo :</b> ${h92esc(h.conditions)}</p>
    <div class="toolbar" style="margin-top:10px">
      ${h92link(h92drive(h.trailhead),'🚐 Aller au départ',true)}
      ${h92link(h92google(h.trailhead),'🅿️ Départ / parking')}
      ${h92link(h92topo(h.trailhead),'⛰️ Carte topo')}
      ${h92link(h92osm(h.trailhead),'🗺️ OpenStreetMap')}
      ${h92link(h.source,'📚 Description / trace')}
    </div>
  </article>`).join('');

  app.innerHTML=`<section class="card"><p class="eyebrow">RANDONNÉES · GUIDE TERRAIN V92</p><h1>🥾 Randonnées</h1><p>Cette section <b>ne pilote pas l’itinéraire</b> : elle détaille les randonnées déjà synchronisées avec lui. Priorité fixe : <b>Måtinden + Reinebringen</b>. Hoven est l’option familiale n°3 ; les autres restent des plans B / opportunités météo.</p><div class="popup-warning"><b>Règle parking :</b> privilégier marche ou vélo depuis la base dès que réaliste. Quand un tarif n’est pas confirmé, le roadbook dit explicitement « vérifier sur place » plutôt que d’inventer un prix.</div></section>${cards}`;
}

if(typeof show==='function'){
  const h92PreviousShow=show;
  show=function(id){
    if(id!=='hikes')return h92PreviousShow(id);
    active=id;
    document.querySelectorAll('#nav button').forEach(button=>button.classList.toggle('active',button.dataset.tab===id));
    renderHikes();
  };
}
