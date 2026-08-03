'use strict';

const FAMILY_HIKES=[
 {key:'haukland-uttakleiv',name:'Haukland → Uttakleiv par l’ancienne route côtière',island:'Vestvågøy',rating:5,distance:'4 km aller · 8 km A/R',duration:'~2 h à 2 h 30 A/R',altitude:'Quasi plat · <50 m D+',effort:'1/5',grade:'Très facile',paddy:'Excellent choix, en laisse près des animaux',caution:'Ancienne route gravillonnée au niveau de la mer. Vérifier vent et pluie; demi-tour possible à tout moment.',url:'https://visitlofoten.com/en/activity/hiking/hike-to-himmeltinden-931-m/',traceUrl:'https://visitlofoten.com/en/activity/hiking/hike-to-himmeltinden-931-m/',fallbackUrl:'https://booking.visitlofoten.com/experiences/vagan/lofoten-insight/lofotens-strandhoydepunkter-og-kystvandring?lang=en',fallbackLabel:'Description de la marche côtière',lat:68.199,lon:13.529},
 {key:'hoven',name:'Hoven',island:'Gimsøy',rating:5,distance:'4 km A/R',duration:'~2 h',altitude:'367 m · ≈367 m D+',effort:'2/5',grade:'Facile à modérée',paddy:'Oui, excellent choix selon Visit Lofoten',caution:'Quelques sections plus raides et terrain parfois humide. Éviter par vent fort ou sol détrempé.',url:'https://lofotenhikes.com/hike/hoven-367m/',traceUrl:'https://lofotenhikes.com/hike/hoven-367m/#route-map',fallbackUrl:'https://visitlofoten.com/en/guide/hoven-367-m-a-sl/',fallbackLabel:'Visit Lofoten',lat:68.322,lon:14.116},
 {key:'kvalvika',name:'Kvalvika Beach',island:'Moskenesøy',rating:4.5,distance:'6 km A/R',duration:'~3 h',altitude:'≈180 m D+',effort:'2,5/5',grade:'Facile à modérée',paddy:'Oui, mais peut devoir être porté sur certains passages',caution:'Sentier rocheux et parfois boueux. Travaux de renforcement annoncés à l’été 2026; respecter les déviations et garder Paddy en laisse.',url:'https://lofotenhikes.com/hike/kvalvika-beach/',traceUrl:'https://lofotenhikes.com/hike/kvalvika-beach/#route-map',fallbackUrl:'https://visitlofoten.com/en/guide/kvalvika-and-ryten-543-m/',fallbackLabel:'Visit Lofoten',lat:68.091,lon:13.124},
 {key:'holandsmaelen',name:'Holandsmælen',island:'Vestvågøy',rating:4.5,distance:'5 à 6 km A/R',duration:'~2 h 30 à 3 h',altitude:'434 m · ≈434 m D+',effort:'2,5/5',grade:'Modérée accessible',paddy:'Possible si énergie, terrain sec et vent faible',caution:'Montée progressive avec quelques sections plus raides; sentier non balisé par endroits et brouillard possible.',url:'https://lofotenhikes.com/hike/holandsmaelen-434m/',traceUrl:'https://lofotenhikes.com/hike/holandsmaelen-434m/#route-map',fallbackUrl:'https://www.outdooractive.com/en/route/hiking-trail/lofoten/holandsmaelen/56037245/',fallbackLabel:'Carte Outdooractive',lat:68.184,lon:13.562},
 {key:'linken',name:'Linken Svolvær',island:'Austvågøy',rating:4,distance:'3,8 km A/R',duration:'~1 h',altitude:'152 m · ≈152 m D+',effort:'1/5',grade:'Facile',paddy:'Oui, terrain sec et laisse',caution:'Courte montée vers un beau point de vue. Bon choix lors d’une fenêtre météo courte.',url:'https://lofotenhikes.com/hike/linken-svolvaer-105m/',traceUrl:'https://lofotenhikes.com/hike/linken-svolvaer-105m/#route-map',fallbackUrl:'https://visitlofoten.com/en/topic/hiking-in-lofoten-6/',fallbackLabel:'Visit Lofoten',lat:68.235,lon:14.565}
];

const OLIVIER_SELECTION=[
 {key:'reinebringen',rating:5,why:'Panorama emblématique sur Reine et le Reinefjord.'},
 {key:'ryten',rating:5,why:'Vue exceptionnelle sur Kvalvika avec une montée plus progressive que beaucoup de sommets des Lofoten.'},
 {key:'festvagtinden',rating:4.5,why:'Sommet court et spectaculaire au-dessus de Henningsvær.'},
 {key:'mannen',rating:4.5,why:'Crête panoramique au-dessus de Haukland, à réserver au terrain sec et au vent faible.'}
];

function stars(rating){
 const full=Math.floor(rating),half=rating%1>=.5;
 return `${'★'.repeat(full)}${half?'½':''}`;
}

function familyHikePlanned(h){
 return state.activities.some(a=>String(a[0]).toLowerCase().includes(h.name.toLowerCase().split(' → ')[0].split(' / ')[0]));
}

function sourceButtons(h){
 return `<a class="btn" href="${h.url}" target="_blank" rel="noopener">Description détaillée ↗</a>${h.traceUrl?`<a class="btn primary" href="${h.traceUrl}" target="_blank" rel="noopener">🗺️ Tracé 2D/3D ↗</a>`:''}${h.fallbackUrl?`<a class="btn" href="${h.fallbackUrl}" target="_blank" rel="noopener">${esc(h.fallbackLabel||'Source complémentaire')} ↗</a>`:''}`;
}

function familyHikeCard(h){
 const planned=familyHikePlanned(h);
 return `<article class="hike-card family-card planned">
   <div class="hike-card-head"><div><span class="hike-island">${esc(h.island)}</span><h3>${esc(h.name)}</h3></div><span class="hike-status">${stars(h.rating)} · ${String(h.rating).replace('.',',')}/5</span></div>
   <div class="hike-metrics"><span><b>${esc(h.distance)}</b><small>Distance</small></span><span><b>${esc(h.duration)}</b><small>Durée</small></span><span><b>${esc(h.altitude)}</b><small>Altitude / dénivelé</small></span><span><b>${esc(h.effort)}</b><small>Effort</small></span></div>
   <p><b>${esc(h.grade)}</b> · Paddy : ${esc(h.paddy)}</p>
   <p class="muted">${esc(h.caution)}</p>
   <div class="toolbar">${sourceButtons(h)}${planned?`<button class="remove-family-hike" data-key="${h.key}">Retirer du programme</button>`:`<button class="add-family-hike" data-key="${h.key}">Ajouter au programme</button>`}</div>
 </article>`;
}

function selectedSportHikes(){
 return OLIVIER_SELECTION.map(selection=>{
   const h=LOFOTEN_HIKES.find(item=>item.key===selection.key);
   return h?{...h,rating:selection.rating,why:selection.why}:null;
 }).filter(Boolean);
}

function sportCard(h){
 return `<article class="hike-card planned">
   <div class="hike-card-head"><div><span class="hike-island">${esc(h.island)}</span><h3>${esc(h.title)}</h3></div><span class="hike-status">${stars(h.rating)} · ${String(h.rating).replace('.',',')}/5</span></div>
   <div class="hike-metrics"><span><b>${esc(h.distance)}</b><small>Distance</small></span><span><b>${esc(h.duration)}</b><small>Durée</small></span><span><b>${esc(h.altitude)}</b><small>Sommet / D+</small></span><span><b>${esc(h.effort)}</b><small>Effort</small></span></div>
   <p><b>${esc(h.grade)}</b> · ${esc(h.crowd||'Fréquentation variable')}</p>
   <p>${esc(h.why)}</p>
   <p class="muted">${esc(h.caution)}</p>
   <div class="toolbar"><a class="btn" href="${h.url}" target="_blank" rel="noopener">Description LofotenHikes ↗</a><a class="btn primary" href="${h.traceUrl||h.url}" target="_blank" rel="noopener">🗺️ Tracé 2D/3D ↗</a>${h.fallbackUrl?`<a class="btn" href="${h.fallbackUrl}" target="_blank" rel="noopener">${esc(h.fallbackLabel||'Source complémentaire')} ↗</a>`:''}</div>
   ${typeof weatherButton==='function'?weatherButton(h,'selected'):''}
 </article>`;
}

function seedSelection(){
 if(state.hikeSelectionVersion==='v56')return;
 const selectedNames=FAMILY_HIKES.map(h=>h.name.toLowerCase().split(' → ')[0].split(' / ')[0]);
 state.activities=state.activities.filter(a=>{
   const category=String(a[2]||'').toLowerCase();
   const name=String(a[0]||'').toLowerCase();
   return !category.includes('randonnée')&&!selectedNames.some(key=>name.includes(key));
 });
 FAMILY_HIKES.forEach(h=>state.activities.push([h.name,h.island,`Famille randonnée ${String(h.rating).replace('.',',')}★`,h.duration,h.grade,h.paddy,h.lat,h.lon]));
 state.olivier=selectedSportHikes().map(h=>[h.name,h.caution]);
 state.hikeSelectionVersion='v56';
 save();
}

function renderFamilyPriority(){
 const sport=selectedSportHikes();
 byId('app').innerHTML=`
   <section class="card priority-banner"><h2>Sélection randonnée 4 à 5 étoiles uniquement</h2><p>Le score est une appréciation éditoriale du roadbook combinant qualité du paysage, intérêt de l’expérience, cohérence avec votre itinéraire et adéquation au groupe. Ce n’est pas une note copiée d’une plateforme unique.</p></section>

   <section class="card hike-library">
     <div class="map-heading"><div><h2>Famille · Sorya, Olivier et Paddy</h2><p class="muted">Cinq randonnées retenues, toutes notées de 4 à 5 étoiles, avec priorité à la sécurité, au confort de Paddy et au plaisir partagé.</p></div><div class="toolbar"><a class="btn" href="https://lofotenhikes.com/difficulty/easy/" target="_blank" rel="noopener">Randonnées faciles ↗</a><a class="btn" href="https://lofotenhikes.com/map/" target="_blank" rel="noopener">Carte LofotenHikes ↗</a></div></div>
     <div class="hike-grid">${FAMILY_HIKES.map(familyHikeCard).join('')}</div>
   </section>

   <section class="card hike-library bonus-section">
     <h2>Olivier · sélection sportive 4,5 à 5 étoiles</h2>
     <p class="muted">Quatre sorties seulement. Elles restent optionnelles et ne doivent pas réduire les journées famille ni imposer un rythme à Sorya ou Paddy.</p>
     <div class="hike-grid">${sport.map(sportCard).join('')}</div>
   </section>

   <section class="card"><h2>Autres activités famille déjà prévues</h2>${editableTable(state.activities.filter(a=>!String(a[2]||'').toLowerCase().includes('randonnée')),['Activité','Secteur','Catégorie','Durée','Terrain','Paddy','Latitude','Longitude'],'activities-other')}</section>`;

 document.querySelectorAll('.remove-family-hike').forEach(b=>b.onclick=()=>{const h=FAMILY_HIKES.find(x=>x.key===b.dataset.key);if(!h)return;state.activities=state.activities.filter(a=>!String(a[0]).toLowerCase().includes(h.name.toLowerCase().split(' → ')[0].split(' / ')[0]));save();autoSync();renderFamilyPriority();});
 document.querySelectorAll('.add-family-hike').forEach(b=>b.onclick=()=>{const h=FAMILY_HIKES.find(x=>x.key===b.dataset.key);if(!h||familyHikePlanned(h))return;state.activities.push([h.name,h.island,`Famille randonnée ${String(h.rating).replace('.',',')}★`,h.duration,h.grade,h.paddy,h.lat,h.lon]);save();autoSync();renderFamilyPriority();});
 if(typeof bindWeatherButtons==='function')bindWeatherButtons();
}

seedSelection();
renderFamily=renderFamilyPriority;
