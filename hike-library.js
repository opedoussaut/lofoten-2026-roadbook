'use strict';

const LOFOTEN_HIKES = [
  {
    key:'reinebringen',
    name:'Reinebringen',
    title:'Reinebringen (448m)',
    island:'Moskenesøy',
    altitude:'448 m',
    distance:'2 km aller-retour',
    duration:'~2 h',
    effort:'3,5/5',
    grade:'Modérée, très raide',
    caution:'Environ 1 970 marches; descente exigeante pour les genoux; fréquentation et stationnement à anticiper.',
    url:'https://lofotenhikes.com/hike/reinebringen-448m/'
  },
  {
    key:'ryten',
    name:'Ryten / Kvalvika',
    title:'Ryten (543m)',
    island:'Moskenesøy',
    altitude:'543 m',
    distance:'7,3 km aller-retour',
    duration:'~5 h',
    effort:'3/5',
    grade:'Modérée',
    caution:'Terrain humide et boueux possible; sommet exposé au vent; bien distinguer la bifurcation vers Kvalvika.',
    url:'https://lofotenhikes.com/hike/ryten-543m/'
  },
  {
    key:'festvagtinden',
    name:'Festvågtind',
    title:'Festvågtinden (541m)',
    island:'Austvågøy',
    altitude:'541 m',
    distance:'2,3 km aller-retour',
    duration:'~2–3 h',
    effort:'3,5/5',
    grade:'Courte mais raide',
    caution:'Premier tronçon rocheux et très raide; rochers glissants lorsqu’ils sont mouillés; partir tôt pour le parking.',
    url:'https://lofotenhikes.com/hike/festvagtinden-541m/'
  },
  {
    key:'mannen',
    name:'Mannen',
    title:'Mannen (400m)',
    island:'Vestvågøy',
    altitude:'400 m',
    distance:'4,1 km aller-retour',
    duration:'~3 h',
    effort:'3/5',
    grade:'Modérée',
    caution:'Crête finale plus étroite et exposée; éviter par vent fort, pluie ou terrain glissant.',
    url:'https://lofotenhikes.com/hike/mannen-400m/'
  },
  {
    key:'haen',
    name:'Håen / Håheia',
    title:'Håen (Håheia) 438m',
    island:'Værøy',
    altitude:'438 m',
    distance:'5,7 km aller-retour',
    duration:'~3 h',
    effort:'2/5',
    grade:'Modérée, montée douce',
    caution:'Værøy impose une traversée en ferry; rester très loin des falaises sommitales, particulièrement avec enfants ou chien.',
    url:'https://lofotenhikes.com/hike/haen-haheia-438m/'
  }
];

function hikeSourceForName(name){
  const n=String(name||'').toLowerCase();
  return LOFOTEN_HIKES.find(h=>n.includes(h.key)||n.includes(h.name.toLowerCase().split(' / ')[0])||h.name.toLowerCase().includes(n));
}

function hikeCard(h,planned=false){
  return `<article class="hike-card ${planned?'planned':''}">
    <div class="hike-card-head"><div><span class="hike-island">${esc(h.island)}</span><h3>${esc(h.title)}</h3></div>${planned?'<span class="hike-status">Planifiée</span>':'<span class="hike-status alt">Alternative</span>'}</div>
    <div class="hike-metrics"><span><b>${esc(h.distance)}</b><small>Distance</small></span><span><b>${esc(h.duration)}</b><small>Durée</small></span><span><b>${esc(h.altitude)}</b><small>Sommet</small></span><span><b>${esc(h.effort)}</b><small>Effort</small></span></div>
    <p><b>${esc(h.grade)}</b></p><p class="muted">${esc(h.caution)}</p>
    <div class="toolbar"><a class="btn primary" href="${h.url}" target="_blank" rel="noopener">Fiche LofotenHikes ↗</a>${planned?`<button class="remove-hike" data-hike="${h.key}">Retirer du plan</button>`:`<button class="add-hike" data-hike="${h.key}">Ajouter au plan</button>`}</div>
  </article>`;
}

function renderFamilyEnhanced(){
  const planned=LOFOTEN_HIKES.filter(h=>state.olivier.some(x=>hikeSourceForName(x[0])?.key===h.key));
  const alternatives=LOFOTEN_HIKES.filter(h=>!planned.some(p=>p.key===h.key));
  byId('app').innerHTML=`
    <section class="card"><h2>Activités famille — Sorya & Paddy en priorité</h2>${editableTable(state.activities,['Activité','Secteur','Catégorie','Durée','Terrain','Paddy','Latitude','Longitude'],'activities')}</section>
    <section class="card hike-library"><div class="map-heading"><div><h2>Randonnées prévues — Olivier</h2><p class="muted">Chaque fiche renvoie vers LofotenHikes pour le parcours, le parking, le terrain 3D et les conditions actualisées.</p></div><div class="toolbar"><a class="btn" href="https://lofotenhikes.com/all-hikes/" target="_blank" rel="noopener">Toutes les randonnées ↗</a><a class="btn" href="https://lofotenhikes.com/map/" target="_blank" rel="noopener">Carte LofotenHikes ↗</a><a class="btn" href="https://lofotenhikes.com/compare-hikes/" target="_blank" rel="noopener">Comparer ↗</a></div></div>
      <div class="hike-grid">${planned.length?planned.map(h=>hikeCard(h,true)).join(''):'<p class="status">Aucune randonnée sportive planifiée.</p>'}</div>
    </section>
    <section class="card hike-library"><h2>Changer de randonnée pendant le voyage</h2><p class="muted">Choisis une alternative selon l’île, la météo, le vent, la fatigue et le temps disponible. L’ajout est sauvegardé dans le roadbook et synchronisé avec Drive.</p><div class="hike-grid">${alternatives.map(h=>hikeCard(h,false)).join('')}</div></section>`;
  bindEditable('activities',renderFamilyEnhanced);
  document.querySelectorAll('.add-hike').forEach(button=>button.onclick=()=>{
    const h=LOFOTEN_HIKES.find(x=>x.key===button.dataset.hike);if(!h)return;
    if(!state.olivier.some(x=>hikeSourceForName(x[0])?.key===h.key))state.olivier.push([h.name,h.caution]);
    save();autoSync();renderFamilyEnhanced();
  });
  document.querySelectorAll('.remove-hike').forEach(button=>button.onclick=()=>{
    const key=button.dataset.hike;
    state.olivier=state.olivier.filter(x=>hikeSourceForName(x[0])?.key!==key);
    save();autoSync();renderFamilyEnhanced();
  });
}

function showHikingMapEnhanced(){
  byId('hike-view').classList.add('primary');byId('road-view').classList.remove('primary');
  baseMap([68.08,13.45],9,true);
  const bounds=[];
  state.activities.forEach((a,i)=>{
    const lat=Number(a[6]),lon=Number(a[7]);
    if(Number.isFinite(lat)&&Number.isFinite(lon)){
      bounds.push([lat,lon]);
      const source=hikeSourceForName(a[0]);
      const link=source?`<br><a href="${source.url}" target="_blank" rel="noopener">Fiche LofotenHikes ↗</a>`:'';
      L.marker([lat,lon],{icon:numberedIcon(i+1,'hike')}).addTo(leafletMap).bindPopup(`<b>${esc(a[0])}</b><br>${esc(a[2])} · ${esc(a[3])}<br>${esc(a[4])}<br>Paddy : ${esc(a[5])}${link}`);
    }
  });
  if(state.gps.points.length>1){const pts=state.gps.points.map(p=>[p.lat,p.lon]);L.polyline(pts,{weight:4}).addTo(leafletMap);bounds.push(...pts)}
  if(bounds.length)leafletMap.fitBounds(bounds,{padding:[25,25],maxZoom:11});
  const plannedCount=LOFOTEN_HIKES.filter(h=>state.olivier.some(x=>hikeSourceForName(x[0])?.key===h.key)).length;
  byId('map-summary').innerHTML=`<div><strong>${state.activities.length}</strong><span>activités familiales</span></div><div><strong>${plannedCount}</strong><span>randonnées sourcées</span></div><div><strong>${state.gps.points.length}</strong><span>points GPS enregistrés</span></div>`;
  byId('route-status').textContent='Fond topographique OpenTopoMap. Ouvre la fiche LofotenHikes avant le départ pour le parking, le parcours et les conditions.';
  byId('map-legend').innerHTML=`<span><i class="dot-hike"></i>Activités et points de départ</span><span>Comparer météo, effort et exposition avant de changer le plan.</span><a target="_blank" rel="noopener" href="https://lofotenhikes.com/map/">Carte LofotenHikes ↗</a>`;
}

renderFamily=renderFamilyEnhanced;
showHikingMap=showHikingMapEnhanced;
