'use strict';

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

function stars(rating){
 if(rating>=4.75)return '★★★★★';
 if(rating>=4.25)return '★★★★½';
 return '★★★★';
}

function familyHikePlanned(h){
 return state.activities.some(a=>String(a[0]).toLowerCase().includes(h.name.toLowerCase().split(' depuis ')[0].split(' → ')[0].split(' / ')[0]));
}

function sourceButtons(h){
 return `<a class="btn" href="${h.url}" target="_blank" rel="noopener">Description détaillée ↗</a>${h.traceUrl?`<a class="btn primary" href="${h.traceUrl}" target="_blank" rel="noopener">🗺️ Tracé et avis ↗</a>`:''}${h.fallbackUrl?`<a class="btn" href="${h.fallbackUrl}" target="_blank" rel="noopener">${esc(h.fallbackLabel||'Source complémentaire')} ↗</a>`:''}`;
}

function familyHikeCard(h){
 const planned=familyHikePlanned(h);
 return `<article class="hike-card family-card planned">
   <div class="hike-card-head"><div><span class="hike-island">${esc(h.island)}</span><h3>${esc(h.name)}</h3></div><span class="hike-status">${stars(h.rating)} · ${String(h.rating).replace('.',',')}/5</span></div>
   <p class="muted" style="margin-top:6px"><b>Base de la note :</b> ${esc(h.reviews)}</p>
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
 if(state.hikeSelectionVersion==='v57')return;
 const selectedNames=FAMILY_HIKES.map(h=>h.name.toLowerCase().split(' depuis ')[0].split(' → ')[0].split(' / ')[0]);
 state.activities=state.activities.filter(a=>{
   const category=String(a[2]||'').toLowerCase();
   const name=String(a[0]||'').toLowerCase();
   return !category.includes('randonnée')&&!selectedNames.some(key=>name.includes(key))&&!name.includes('hoven');
 });
 FAMILY_HIKES.forEach(h=>state.activities.push([h.name,h.island,`Famille randonnée ${String(h.rating).replace('.',',')}★`,h.duration,h.grade,h.paddy,h.lat,h.lon]));
 state.olivier=selectedSportHikes().map(h=>[h.name,h.caution]);
 state.hikeSelectionVersion='v57';
 save();
}

function renderFamilyPriority(){
 const sport=selectedSportHikes();
 byId('app').innerHTML=`
   <section class="card priority-banner"><h2>Sélection randonnée basée sur des notes communautaires vérifiables</h2><p>Hoven est retirée du programme. Son unique avis LofotenHikes porte sur le stationnement, pas sur le sentier, mais nous écartons quand même cette option afin d’éviter une mauvaise surprise avec le camping-car.</p></section>

   <section class="card hike-library">
     <div class="map-heading"><div><h2>Famille · Sorya, Olivier et Paddy</h2><p class="muted">Cinq randonnées entre 4,3 et 4,8/5. Les notes affichées viennent désormais de communautés de randonneurs lorsqu’un volume d’avis identifiable est disponible.</p></div><div class="toolbar"><a class="btn" href="https://lofotenhikes.com/difficulty/easy/" target="_blank" rel="noopener">Randonnées faciles ↗</a><a class="btn" href="https://lofotenhikes.com/map/" target="_blank" rel="noopener">Carte LofotenHikes ↗</a></div></div>
     <div class="hike-grid">${FAMILY_HIKES.map(familyHikeCard).join('')}</div>
   </section>

   <section class="card hike-library bonus-section">
     <h2>Olivier · sélection sportive 4,5 à 5 étoiles</h2>
     <p class="muted">Quatre sorties seulement. Elles restent optionnelles et ne doivent pas réduire les journées famille ni imposer un rythme à Sorya ou Paddy.</p>
     <div class="hike-grid">${sport.map(sportCard).join('')}</div>
   </section>

   <section class="card"><h2>Autres activités famille déjà prévues</h2>${editableTable(state.activities.filter(a=>!String(a[2]||'').toLowerCase().includes('randonnée')),['Activité','Secteur','Catégorie','Durée','Terrain','Paddy','Latitude','Longitude'],'activities-other')}</section>`;

 document.querySelectorAll('.remove-family-hike').forEach(b=>b.onclick=()=>{const h=FAMILY_HIKES.find(x=>x.key===b.dataset.key);if(!h)return;state.activities=state.activities.filter(a=>!String(a[0]).toLowerCase().includes(h.name.toLowerCase().split(' depuis ')[0].split(' → ')[0].split(' / ')[0]));save();autoSync();renderFamilyPriority();});
 document.querySelectorAll('.add-family-hike').forEach(b=>b.onclick=()=>{const h=FAMILY_HIKES.find(x=>x.key===b.dataset.key);if(!h||familyHikePlanned(h))return;state.activities.push([h.name,h.island,`Famille randonnée ${String(h.rating).replace('.',',')}★`,h.duration,h.grade,h.paddy,h.lat,h.lon]);save();autoSync();renderFamilyPriority();});
 if(typeof bindWeatherButtons==='function')bindWeatherButtons();
}

seedSelection();
renderFamily=renderFamilyPriority;
