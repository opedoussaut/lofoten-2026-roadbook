'use strict';

const FAMILY_HIKES=[
 {key:'linken',name:'Linken Svolvær',island:'Austvågøy',distance:'3,8 km A/R',duration:'~1 h',altitude:'152 m',effort:'1/5',grade:'Facile',paddy:'Oui, si terrain sec et tenu en laisse',caution:'Courte montée vers un point de vue accessible; bonnes chaussures même sur ce parcours facile.',url:'https://lofotenhikes.com/hike/linken-svolvaer-105m/',lat:68.235,lon:14.565},
 {key:'hoven',name:'Hoven',island:'Gimsøy',distance:'3,8 km A/R',duration:'~2–2 h 30',altitude:'367 m',effort:'2/5',grade:'Facile à modérée',paddy:'Oui, selon vent et terrain',caution:'Pente herbeuse régulière sans passage technique; éviter par vent fort ou sol très humide.',url:'https://lofotenhikes.com/hike/hoven-367m/',lat:68.322,lon:14.116},
 {key:'kvalvika',name:'Kvalvika Beach',island:'Moskenesøy',distance:'4 km A/R',duration:'~3 h',altitude:'180 m de dénivelé',effort:'2,5/5',grade:'Facile mais terrain irrégulier',paddy:'Oui, avec vigilance',caution:'Sentier rocheux et parfois boueux; descente vers la plage et retour plus fatigants qu’une simple promenade.',url:'https://lofotenhikes.com/hike/kvalvika-beach/',lat:68.091,lon:13.124},
 {key:'bunes',name:'Bunes Beach',island:'Moskenesøy',distance:'5,6 km A/R',duration:'~2–4 h',altitude:'80 m',effort:'1,5/5',grade:'Facile',paddy:'Oui, sous réserve des règles du bateau',caution:'Accès uniquement par bateau depuis Reine vers Vindstad; vérifier horaires, météo et retour avant de partir.',url:'https://visitlofoten.com/en/guide/bunes-beach-hiking-trail-in-lofoten/',lat:67.997,lon:12.948},
 {key:'holandsmaelen',name:'Holandsmælen',island:'Vestvågøy',distance:'5–6 km A/R',duration:'~2–3 h',altitude:'434 m',effort:'2,5/5',grade:'Modérée accessible',paddy:'Selon énergie et météo',caution:'Montée progressive avec quelques sections plus raides; privilégier une journée sèche et peu venteuse.',url:'https://lofotenhikes.com/hike/holandsmaelen-434m/',lat:68.184,lon:13.562},
 {key:'haen-family',name:'Håen / Håheia',island:'Værøy',distance:'5,7 km A/R',duration:'~3 h',altitude:'438 m',effort:'2/5',grade:'Facile à modérée',paddy:'Oui, mais jamais près des falaises',caution:'Ancienne route militaire agréable; ferry nécessaire et falaises sommitales extrêmement abruptes.',url:'https://lofotenhikes.com/hike/haen-haheia-438m/',lat:67.663,lon:12.667}
];

function familyHikePlanned(h){
 return state.activities.some(a=>String(a[0]).toLowerCase().includes(h.name.toLowerCase().split(' / ')[0]));
}

function sourceForFamilyHike(h){
 if(typeof hikeSourceForName!=='function')return null;
 return hikeSourceForName(h.name)||LOFOTEN_HIKES.find(x=>x.key===h.key.replace('-family',''))||null;
}

function sourceButtons(h){
 const source=sourceForFamilyHike(h);
 if(!source)return `<a class="btn primary" href="${h.url}" target="_blank" rel="noopener">Description détaillée ↗</a>`;
 return `<a class="btn" href="${source.url}" target="_blank" rel="noopener">Description LofotenHikes ↗</a><a class="btn primary" href="${source.traceUrl||source.url}" target="_blank" rel="noopener">🗺️ Tracé 2D/3D ↗</a>${source.fallbackUrl?`<a class="btn" href="${source.fallbackUrl}" target="_blank" rel="noopener">${esc(source.fallbackLabel||'Source complémentaire')} ↗</a>`:''}`;
}

function familyHikeCard(h){
 const planned=familyHikePlanned(h),source=sourceForFamilyHike(h);
 return `<article class="hike-card family-card ${planned?'planned':''}">
   <div class="hike-card-head"><div><span class="hike-island">${esc(h.island)}</span><h3>${esc(h.name)}</h3></div><span class="hike-status ${planned?'':'alt'}">${planned?'Planifiée':'Option famille'}</span></div>
   <div class="hike-metrics"><span><b>${esc(h.distance)}</b><small>Distance</small></span><span><b>${esc(h.duration)}</b><small>Durée</small></span><span><b>${esc(h.altitude)}</b><small>Altitude / dénivelé</small></span><span><b>${esc(h.effort)}</b><small>Effort</small></span></div>
   <p><b>${esc(h.grade)}</b> · Paddy : ${esc(h.paddy)}</p>
   <p class="muted">${esc(h.caution)}</p>
   <div class="toolbar">${sourceButtons(h)}${planned?`<button class="remove-family-hike" data-key="${h.key}">Retirer</button>`:`<button class="add-family-hike" data-key="${h.key}">Ajouter au programme famille</button>`}</div>
   ${source&&typeof weatherButton==='function'?weatherButton(source,'family'):''}
 </article>`;
}

function plannedSportHikes(){
 return LOFOTEN_HIKES.filter(h=>state.olivier.some(x=>hikeSourceForName(x[0])?.key===h.key));
}

function bindSportButtons(){
 document.querySelectorAll('.add-hike').forEach(button=>button.onclick=()=>{
   const h=LOFOTEN_HIKES.find(x=>x.key===button.dataset.hike);if(!h)return;
   if(!state.olivier.some(x=>hikeSourceForName(x[0])?.key===h.key))state.olivier.push([h.name,h.caution]);
   save();autoSync();renderFamilyPriority();
 });
 document.querySelectorAll('.remove-hike').forEach(button=>button.onclick=()=>{
   const key=button.dataset.hike;state.olivier=state.olivier.filter(x=>hikeSourceForName(x[0])?.key!==key);
   save();autoSync();renderFamilyPriority();
 });
}

function renderFamilyPriority(){
 const plannedSport=plannedSportHikes();
 const quiet=LOFOTEN_HIKES.filter(h=>h.quiet&&!plannedSport.some(p=>p.key===h.key));
 const classics=LOFOTEN_HIKES.filter(h=>!h.quiet&&!plannedSport.some(p=>p.key===h.key));
 byId('app').innerHTML=`
   <section class="card priority-banner"><h2>Randonnées : partie essentielle du voyage</h2><p>Le programme principal privilégie les sorties compatibles avec Sorya et Paddy. Les randonnées sportives d’Olivier restent des bonus séparés, sans réduire le temps familial.</p></section>

   <section class="card hike-library">
     <div class="map-heading"><div><h2>Randonnées famille recommandées</h2><p class="muted">Les distances, durées, altitudes ou dénivelés, niveaux d’effort, contraintes pour Paddy et liens sources sont conservés.</p></div><div class="toolbar"><a class="btn" href="https://lofotenhikes.com/difficulty/easy/" target="_blank" rel="noopener">Randonnées faciles ↗</a><a class="btn" href="https://lofotenhikes.com/map/" target="_blank" rel="noopener">Carte LofotenHikes ↗</a></div></div>
     <div class="hike-grid">${FAMILY_HIKES.map(familyHikeCard).join('')}</div>
   </section>

   <section class="card hike-library bonus-section">
     <h2>Randonnées sportives prévues pour Olivier</h2>
     <p class="muted">Fiches complètes avec distance, durée, sommet, effort, fréquentation, risques, description principale, tracé 2D/3D et source complémentaire.</p>
     <div class="hike-grid">${plannedSport.length?plannedSport.map(h=>hikeCard(h,true)).join(''):'<p class="status">Aucune randonnée sportive actuellement planifiée.</p>'}</div>
   </section>

   <section class="card hike-library">
     <h2>Pépites calmes et alternatives</h2>
     <p class="muted">Options moins fréquentées à conserver dans le roadbook selon la météo, la fatigue et le temps disponible.</p>
     <div class="hike-grid">${quiet.map(h=>hikeCard(h,false)).join('')}</div>
   </section>

   <section class="card hike-library">
     <h2>Grands classiques à décider sur place</h2>
     <p class="muted">Options plus fréquentées ou plus exigeantes. Elles ne remplacent pas le programme famille.</p>
     <div class="hike-grid">${classics.map(h=>hikeCard(h,false)).join('')}</div>
   </section>

   <section class="card"><h2>Autres activités famille déjà prévues</h2>${editableTable(state.activities,['Activité','Secteur','Catégorie','Durée','Terrain','Paddy','Latitude','Longitude'],'activities')}</section>`;

 bindEditable('activities',renderFamilyPriority);
 document.querySelectorAll('.add-family-hike').forEach(b=>b.onclick=()=>{const h=FAMILY_HIKES.find(x=>x.key===b.dataset.key);if(!h||familyHikePlanned(h))return;state.activities.push([h.name,h.island,'Famille randonnée',h.duration,h.grade,h.paddy,h.lat,h.lon]);save();autoSync();renderFamilyPriority();});
 document.querySelectorAll('.remove-family-hike').forEach(b=>b.onclick=()=>{const h=FAMILY_HIKES.find(x=>x.key===b.dataset.key);if(!h)return;state.activities=state.activities.filter(a=>!String(a[0]).toLowerCase().includes(h.name.toLowerCase().split(' / ')[0]));save();autoSync();renderFamilyPriority();});
 bindSportButtons();
 if(typeof bindWeatherButtons==='function')bindWeatherButtons();
}

renderFamily=renderFamilyPriority;
