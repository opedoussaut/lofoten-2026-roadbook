'use strict';

const CAMPSITE_BASES={
  hov:{name:'Hov Camping',lat:68.341,lon:14.117},
  uttakleiv:{name:'Uttakleiv',lat:68.209,lon:13.507},
  beach:{name:'Lofoten Beach Camp',lat:68.089,lon:13.236},
  moskenes:{name:'Moskenes Camping',lat:67.901,lon:13.046}
};

const FAMILY_HIKES=[
 {key:'haukland-uttakleiv',name:'Haukland → Uttakleiv par l’ancienne route côtière',island:'Vestvågøy',rating:4.6,reviews:'643 avis AllTrails',distance:'8 km A/R',duration:'~2 h 10',altitude:'≈219 m D+ selon l’itinéraire complet',effort:'1,5/5',grade:'Facile à modérée',paddy:'Excellent choix, en laisse près des animaux',caution:'Choisir l’ancienne route côtière au niveau de la mer et revenir par le même chemin pour éviter la variante montagneuse. Parking payant possible à Uttakleiv.',url:'https://visitlofoten.com/en/activity/hiking/hike-to-himmeltinden-931-m/',traceUrl:'https://www.alltrails.com/poi/norway/nordland/leknes/uttakleivstranda',fallbackUrl:'https://www.alltrails.com/poi/norway/nordland/leknes/hauklandstranda',fallbackLabel:'Avis et conditions',lat:68.199,lon:13.529},
 {key:'tjeldbergtinden',name:'Tjeldbergtinden depuis Åvika',island:'Austvågøy',rating:4.8,reviews:'38 avis AllTrails',distance:'4,3 km A/R',duration:'~2 h 10 à 3 h',altitude:'367 m · ≈396 m D+',effort:'3/5',grade:'Modérée, sections raides',paddy:'Seulement par terrain sec; Paddy peut être porté dans les passages raides',caution:'Remplace Hoven. Plusieurs avis signalent une montée raide et parfois très boueuse, mais aussi un stationnement facile et de très belles vues. Faire Linken seulement si Sorya ou Paddy ne sont pas à l’aise.',url:'https://lofotenhikes.com/hike/tjeldbergtinden-367m/',traceUrl:'https://www.alltrails.com/trail/norway/nordland/tjeldbergtinden-fra-avika',fallbackUrl:'https://visitlofoten.com/en/10-popular-hikes-in-lofoten/',fallbackLabel:'Visit Lofoten',lat:68.238,lon:14.521},
 {key:'kvalvika',name:'Kvalvika Beach',island:'Moskenesøy',rating:4.6,reviews:'155 avis AllTrails',distance:'Route familiale à confirmer · variantes de 4 à 9 km',duration:'~3 h à 4 h',altitude:'≈180 à 530 m D+ selon la variante',effort:'2,5/5',grade:'Modérée, terrain irrégulier',paddy:'Oui, mais peut devoir être porté sur certains passages',caution:'Sentier rocheux et souvent boueux. Travaux de renforcement annoncés à l’été 2026; respecter les déviations. Ne pas confondre la courte approche de la plage avec la grande boucle AllTrails.',url:'https://lofotenhikes.com/hike/kvalvika-beach/',traceUrl:'https://www.alltrails.com/trail/norway/nordland/fredvang-kvalvika',fallbackUrl:'https://visitlofoten.com/en/guide/kvalvika-and-ryten-543-m/',fallbackLabel:'Visit Lofoten',lat:68.091,lon:13.124},
 {key:'holandsmaelen',name:'Holandsmælen',island:'Vestvågøy',rating:4.6,reviews:'note AllTrails',distance:'5,6 km A/R',duration:'~2 h 36 à 3 h',altitude:'434 m · ≈434 m D+',effort:'2,5/5',grade:'Modérée à soutenue',paddy:'Possible si énergie, terrain sec et vent faible',caution:'Montée progressive avec quelques sections plus raides; sentier non balisé par endroits, brouillard et terrain humide possibles.',url:'https://lofotenhikes.com/hike/holandsmaelen-434m/',traceUrl:'https://lofotenhikes.com/hike/holandsmaelen-434m/#route-map',fallbackUrl:'https://www.outdooractive.com/en/route/hiking-trail/lofoten/holandsmaelen/56037245/',fallbackLabel:'Carte Outdooractive',lat:68.184,lon:13.562},
 {key:'linken',name:'Linken Svolvær',island:'Austvågøy',rating:4.3,reviews:'83 avis AllTrails',distance:'3,8 km A/R',duration:'~1 h',altitude:'152 m',effort:'1/5',grade:'Facile',paddy:'Oui, terrain sec et laisse',caution:'La meilleure solution de repli familiale si Tjeldbergtinden est trop boueux, trop raide ou venteux. Départ à pied depuis le centre de Svolvær.',url:'https://visitlofoten.com/en/guide/linken-in-svolvaer-105-m/',traceUrl:'https://www.alltrails.com/norway/nordland/svolvaer/dogs-leash',fallbackUrl:'https://lofotenhikes.com/hike/linken-svolvaer-105m/',fallbackLabel:'LofotenHikes',lat:68.235,lon:14.565}
];

const OLIVIER_SELECTION=[
 {key:'reinebringen',rating:5,why:'Panorama emblématique sur Reine et le Reinefjord.'},
 {key:'ryten',rating:5,why:'Vue exceptionnelle sur Kvalvika avec une montée plus progressive que beaucoup de sommets des Lofoten.'},
 {key:'festvagtinden',rating:4.5,why:'Sommet court et spectaculaire au-dessus de Henningsvær.'},
 {key:'mannen',rating:4.7,why:'Crête panoramique au-dessus de Haukland, à réserver au terrain sec et au vent faible.'}
];

const FAMILY_ACCESS={
 'haukland-uttakleiv':{base:'uttakleiv',estimate:'Départ directement depuis votre nuit à Uttakleiv',familyMode:'À pied — aucun véhicule nécessaire',bike:'Vélo inutile pour la famille',note:'Faire l’ancienne route côtière en aller-retour depuis le camping.'},
 tjeldbergtinden:{base:'hov',estimate:'≈ 40–45 km par route, aller simple',familyMode:'Camping-car nécessaire; combiner avec Svolvær',bike:'Non pour Olivier depuis Hov: largement au-delà de 15 km',note:'Départ très tôt pour le stationnement et uniquement par terrain sec.'},
 kvalvika:{base:'beach',estimate:'≈ 13–15 km par route jusqu’au départ choisi',familyMode:'Camping-car recommandé avec Sorya et Paddy',bike:'Possible pour Olivier, mais à la limite haute de 15 km',note:'Le kilométrage dépend du parking/trailhead retenu à Fredvang ou Innersand.'},
 holandsmaelen:{base:'uttakleiv',estimate:'≈ 5–7 km par route, aller simple',familyMode:'Court transfert en camping-car; à pied seulement si vous acceptez d’ajouter beaucoup de route',bike:'Très bonne option vélo pour Olivier',note:'Sécuriser le vélo au départ et conserver de l’énergie pour la randonnée.'},
 linken:{base:'hov',estimate:'≈ 40–45 km par route, aller simple',familyMode:'Camping-car nécessaire; à faire avec la visite de Svolvær',bike:'Non depuis Hov: trop loin avant une randonnée',note:'Solution familiale de repli plus facile que Tjeldbergtinden.'}
};

const SPORT_ACCESS={
 reinebringen:{base:'moskenes',estimate:'≈ 5–6 km par route, aller simple',familyMode:'Camping-car possible, mais stationnement tendu',bike:'Excellent en vélo pour Olivier; partir avant l’affluence',note:'Éclairage avant/arrière, antivol et équipement réfléchissant pour un départ très matinal.'},
 ryten:{base:'beach',estimate:'≈ 13–15 km par route selon le trailhead',familyMode:'Camping-car recommandé pour une sortie famille',bike:'Possible en vélo, mais proche de votre limite de 15 km aller',note:'Vérifier le trailhead exact la veille et partir très tôt; terrain souvent humide.'},
 festvagtinden:{base:'hov',estimate:'≈ 30–35 km par route, aller simple',familyMode:'Camping-car nécessaire vers Henningsvær',bike:'Non depuis Hov avant une randonnée raide',note:'Le parking est limité; départ matinal indispensable.'},
 mannen:{base:'uttakleiv',estimate:'≈ 3–4 km jusqu’à Haukland, aller simple',familyMode:'À pied possible par la route côtière, sinon court transfert',bike:'Option vélo idéale pour Olivier',note:'Le vélo évite de déplacer le camping-car; seulement par vent faible et terrain sec.'}
};

function stars(rating){if(rating>=4.75)return '★★★★★';if(rating>=4.25)return '★★★★½';return '★★★★';}
function fixed(value,digits=6){return Number(value).toFixed(digits);}
function osmPoint(lat,lon,zoom=15){return `https://www.openstreetmap.org/?mlat=${fixed(lat)}&mlon=${fixed(lon)}#map=${zoom}/${fixed(lat)}/${fixed(lon)}`;}
function topoPoint(lat,lon,zoom=15){return `https://www.opentopomap.org/#map=${zoom}/${fixed(lat)}/${fixed(lon)}`;}
function googlePoint(lat,lon){return `https://www.google.com/maps/search/?api=1&query=${fixed(lat)},${fixed(lon)}`;}
function googleRoute(base,lat,lon,mode='driving'){return `https://www.google.com/maps/dir/?api=1&origin=${fixed(base.lat)},${fixed(base.lon)}&destination=${fixed(lat)},${fixed(lon)}&travelmode=${mode}`;}
function coordinateButtons(h){return `<a class="btn" href="${topoPoint(h.lat,h.lon)}" target="_blank" rel="noopener">⛰️ Carte topo ↗</a><a class="btn" href="${osmPoint(h.lat,h.lon)}" target="_blank" rel="noopener">📍 OpenStreetMap ↗</a><a class="btn" href="${googlePoint(h.lat,h.lon)}" target="_blank" rel="noopener">Google Maps ↗</a>`;}

function accessPanel(access,h,sport=false){
 if(!access)return '';
 const base=CAMPSITE_BASES[access.base];
 return `<div class="card" style="margin:10px 0;background:rgba(15,118,110,.06)">
   <p class="eyebrow">ACCÈS DEPUIS VOTRE CAMPING</p>
   <p><b>${esc(base.name)} → départ de ${esc(h.name||h.title)}</b><br>${esc(access.estimate)}</p>
   <p><b>Famille :</b> ${esc(access.familyMode)}<br><b>Vélo Olivier :</b> ${esc(access.bike)}</p>
   <p class="muted">${esc(access.note)}</p>
   <div class="toolbar"><a class="btn primary" href="${googleRoute(base,h.lat,h.lon,'driving')}" target="_blank" rel="noopener">🚐 Itinéraire routier ↗</a><a class="btn" href="${googleRoute(base,h.lat,h.lon,'bicycling')}" target="_blank" rel="noopener">🚲 Itinéraire vélo ↗</a><a class="btn" href="${osmPoint(base.lat,base.lon)}" target="_blank" rel="noopener">Voir le camping ↗</a></div>
   ${sport?'<p class="muted"><b>Départ très matinal :</b> préparer vêtements, frontale, eau, antivol, éclairages vélo et trace hors ligne la veille.</p>':''}
 </div>`;
}

function familyHikePlanned(h){return state.activities.some(a=>String(a[0]).toLowerCase().includes(h.name.toLowerCase().split(' depuis ')[0].split(' → ')[0].split(' / ')[0]));}
function sourceButtons(h){return `<a class="btn" href="${h.url}" target="_blank" rel="noopener">Description détaillée ↗</a>${h.traceUrl?`<a class="btn primary" href="${h.traceUrl}" target="_blank" rel="noopener">🗺️ Tracé et avis ↗</a>`:''}${h.fallbackUrl?`<a class="btn" href="${h.fallbackUrl}" target="_blank" rel="noopener">${esc(h.fallbackLabel||'Source complémentaire')} ↗</a>`:''}`;}

function familyHikeCard(h){
 const planned=familyHikePlanned(h);
 return `<article class="hike-card family-card planned">
   <div class="hike-card-head"><div><span class="hike-island">${esc(h.island)}</span><h3>${esc(h.name)}</h3></div><span class="hike-status">${stars(h.rating)} · ${String(h.rating).replace('.',',')}/5</span></div>
   <p class="muted" style="margin-top:6px"><b>Base de la note :</b> ${esc(h.reviews)}</p>
   <div class="hike-metrics"><span><b>${esc(h.distance)}</b><small>Distance</small></span><span><b>${esc(h.duration)}</b><small>Durée</small></span><span><b>${esc(h.altitude)}</b><small>Altitude / dénivelé</small></span><span><b>${esc(h.effort)}</b><small>Effort</small></span></div>
   <p><b>${esc(h.grade)}</b> · Paddy : ${esc(h.paddy)}</p><p class="muted">${esc(h.caution)}</p>
   ${accessPanel(FAMILY_ACCESS[h.key],h,false)}
   <div class="toolbar">${sourceButtons(h)}${coordinateButtons(h)}${planned?`<button class="remove-family-hike" data-key="${h.key}">Retirer du programme</button>`:`<button class="add-family-hike" data-key="${h.key}">Ajouter au programme</button>`}</div>
 </article>`;
}

function selectedSportHikes(){return OLIVIER_SELECTION.map(selection=>{const h=LOFOTEN_HIKES.find(item=>item.key===selection.key);return h?{...h,rating:selection.rating,why:selection.why}:null;}).filter(Boolean);}

function sportCard(h){
 return `<article class="hike-card planned">
   <div class="hike-card-head"><div><span class="hike-island">${esc(h.island)}</span><h3>${esc(h.title)}</h3></div><span class="hike-status">${stars(h.rating)} · ${String(h.rating).replace('.',',')}/5</span></div>
   <div class="hike-metrics"><span><b>${esc(h.distance)}</b><small>Distance</small></span><span><b>${esc(h.duration)}</b><small>Durée</small></span><span><b>${esc(h.altitude)}</b><small>Sommet / D+</small></span><span><b>${esc(h.effort)}</b><small>Effort</small></span></div>
   <p><b>${esc(h.grade)}</b> · ${esc(h.crowd||'Fréquentation variable')}</p><p>${esc(h.why)}</p><p class="muted">${esc(h.caution)}</p>
   ${accessPanel(SPORT_ACCESS[h.key],h,true)}
   <div class="toolbar"><a class="btn" href="${h.url}" target="_blank" rel="noopener">Description LofotenHikes ↗</a><a class="btn primary" href="${h.traceUrl||h.url}" target="_blank" rel="noopener">🗺️ Tracé 2D/3D ↗</a>${h.fallbackUrl?`<a class="btn" href="${h.fallbackUrl}" target="_blank" rel="noopener">${esc(h.fallbackLabel||'Source complémentaire')} ↗</a>`:''}${coordinateButtons(h)}</div>
   ${typeof weatherButton==='function'?weatherButton(h,'selected'):''}
 </article>`;
}

function seedSelection(){
 if(state.hikeSelectionVersion==='v68-access-maps')return;
 const selectedNames=FAMILY_HIKES.map(h=>h.name.toLowerCase().split(' depuis ')[0].split(' → ')[0].split(' / ')[0]);
 state.activities=state.activities.filter(a=>{const category=String(a[2]||'').toLowerCase();const name=String(a[0]||'').toLowerCase();return !category.includes('randonnée')&&!selectedNames.some(key=>name.includes(key))&&!name.includes('hoven');});
 FAMILY_HIKES.forEach(h=>state.activities.push([h.name,h.island,`Famille randonnée ${String(h.rating).replace('.',',')}★`,h.duration,h.grade,h.paddy,h.lat,h.lon]));
 state.olivier=selectedSportHikes().map(h=>[h.name,h.caution]);
 state.hikeSelectionVersion='v68-access-maps';
 save();
}

function renderFamilyPriority(){
 const sport=selectedSportHikes();
 byId('app').innerHTML=`
   <section class="card priority-banner"><h2>Randonnées avec accès depuis vos campings</h2><p>Chaque fiche indique maintenant s’il faut déplacer le camping-car, partir à pied ou utiliser le vélo d’Olivier. Les distances d’accès sont des estimations de planification: ouvrir l’itinéraire routier ou vélo avant le départ pour vérifier le trailhead exact.</p></section>
   <section class="card hike-library"><div class="map-heading"><div><h2>Famille · Sorya, Olivier et Paddy</h2><p class="muted">Cinq randonnées entre 4,3 et 4,8/5, avec accès, cartes topographiques et navigation.</p></div><div class="toolbar"><a class="btn" href="https://lofotenhikes.com/difficulty/easy/" target="_blank" rel="noopener">Randonnées faciles ↗</a><a class="btn" href="https://lofotenhikes.com/map/" target="_blank" rel="noopener">Carte LofotenHikes ↗</a></div></div><div class="hike-grid">${FAMILY_HIKES.map(familyHikeCard).join('')}</div></section>
   <section class="card hike-library bonus-section"><h2>Olivier · sélection sportive avec accès vélo</h2><p class="muted">Le vélo est retenu lorsque l’approche estimée reste dans votre seuil de 10 à 15 km par trajet. Reinebringen et Mannen sont les meilleures combinaisons vélo + randonnée; Ryten est à la limite; Festvågtinden exige le camping-car depuis Hov.</p><div class="hike-grid">${sport.map(sportCard).join('')}</div></section>
   <section class="card"><h2>Autres activités famille déjà prévues</h2>${editableTable(state.activities.filter(a=>!String(a[2]||'').toLowerCase().includes('randonnée')),['Activité','Secteur','Catégorie','Durée','Terrain','Paddy','Latitude','Longitude'],'activities-other')}</section>`;
 document.querySelectorAll('.remove-family-hike').forEach(b=>b.onclick=()=>{const h=FAMILY_HIKES.find(x=>x.key===b.dataset.key);if(!h)return;state.activities=state.activities.filter(a=>!String(a[0]).toLowerCase().includes(h.name.toLowerCase().split(' depuis ')[0].split(' → ')[0].split(' / ')[0]));save();autoSync();renderFamilyPriority();});
 document.querySelectorAll('.add-family-hike').forEach(b=>b.onclick=()=>{const h=FAMILY_HIKES.find(x=>x.key===b.dataset.key);if(!h||familyHikePlanned(h))return;state.activities.push([h.name,h.island,`Famille randonnée ${String(h.rating).replace('.',',')}★`,h.duration,h.grade,h.paddy,h.lat,h.lon]);save();autoSync();renderFamilyPriority();});
 if(typeof bindWeatherButtons==='function')bindWeatherButtons();
}

seedSelection();
renderFamily=renderFamilyPriority;
