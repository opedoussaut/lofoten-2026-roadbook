'use strict';

let camperLayers={};
let camperResults=[];

const CAMPER_TYPES={
  caravan:{label:'Aires camping-car',icon:'🚐'},
  camp:{label:'Campings',icon:'🏕️'},
  dump:{label:'Vidange',icon:'♻️'},
  water:{label:'Eau potable',icon:'💧'},
  toilets:{label:'Toilettes',icon:'🚻'},
  shower:{label:'Douches',icon:'🚿'}
};

function camperIcon(kind){
  return L.divIcon({className:'camper-marker',html:`<span class="${kind}">${CAMPER_TYPES[kind]?.icon||'•'}</span>`,iconSize:[32,32],iconAnchor:[16,16]});
}

function camperKind(tags={}){
  if(tags.tourism==='caravan_site')return 'caravan';
  if(tags.tourism==='camp_site')return 'camp';
  if(tags.amenity==='sanitary_dump_station')return 'dump';
  if(tags.amenity==='drinking_water'||tags.amenity==='water_point')return 'water';
  if(tags.amenity==='toilets')return 'toilets';
  if(tags.amenity==='shower')return 'shower';
  return 'caravan';
}

function amenityLine(tags={}){
  const items=[];
  const yes=(k,label)=>{if(['yes','customers','public'].includes(tags[k]))items.push(label)};
  yes('power_supply','électricité');yes('drinking_water','eau potable');yes('water_point','remplissage eau');yes('sanitary_dump_station','vidange');yes('toilets','toilettes');yes('shower','douches');yes('internet_access','Wi-Fi');
  if(tags.fee==='no')items.push('gratuit');else if(tags.fee==='yes')items.push('payant');
  return items.length?items.join(' · '):'Équipements non renseignés dans OpenStreetMap';
}

function renderMapWithCamper(){
  clearCurrentMap();
  byId('app').innerHTML=`
    <section class="card map-panel">
      <div class="map-heading">
        <div><h2>Cartes du voyage</h2><p class="muted">Itinéraire complet avec services van autour de chaque étape, plus carte topographique des randonnées.</p></div>
        <div class="map-tabs"><button id="road-view" class="primary">🚐 Roadmap & étapes</button><button id="hike-view">🥾 Randonnée</button></div>
      </div>
      <div id="road-tools" class="road-tools">
        <div class="stop-selector"><label>Afficher les services autour de <select id="service-stop"><option value="all">Toutes les étapes planifiées</option>${ROADBOOK_WAYPOINTS.map((p,i)=>`<option value="${i}">${i+1}. ${esc(p[0])}</option>`).join('')}</select></label><label>Rayon <select id="service-radius"><option value="5">5 km</option><option value="10">10 km</option><option value="15" selected>15 km</option><option value="25">25 km</option></select></label><button id="load-services" class="primary">Charger les services</button></div>
        <fieldset class="service-filters"><legend>Afficher sur la roadmap</legend>${Object.entries(CAMPER_TYPES).map(([key,v])=>`<label><input type="checkbox" data-service-filter="${key}" checked> <span>${v.icon} ${v.label}</span></label>`).join('')}</fieldset>
        <div class="toolbar"><a class="btn" href="https://park4night.com/en" target="_blank" rel="noopener">Park4Night ↗</a><a class="btn" href="https://camperstop.com/fr/" target="_blank" rel="noopener">Camperstop ↗</a></div>
      </div>
      <div id="map-summary" class="map-summary"></div>
      <div id="route-status" class="status">Préparation de la carte…</div>
      <div id="map-canvas" class="map map-large"></div>
      <div id="map-legend" class="map-legend"></div>
    </section>`;
  byId('road-view').onclick=showRoadMapIntegrated;
  byId('hike-view').onclick=()=>{byId('road-tools').hidden=true;showHikingMap()};
  byId('load-services').onclick=loadServicesForStops;
  document.querySelectorAll('[data-service-filter]').forEach(cb=>cb.onchange=applyServiceFilters);
  showRoadMapIntegrated();
}

async function showRoadMapIntegrated(){
  byId('road-view').classList.add('primary');byId('hike-view').classList.remove('primary');byId('road-tools').hidden=false;
  baseMap([59.8,11.5],4,false);
  camperLayers={};camperResults=[];
  Object.keys(CAMPER_TYPES).forEach(k=>camperLayers[k]=L.layerGroup().addTo(leafletMap));
  const waypointLatLngs=ROADBOOK_WAYPOINTS.map(x=>[x[1],x[2]]);
  ROADBOOK_WAYPOINTS.forEach((p,i)=>L.marker([p[1],p[2]],{icon:numberedIcon(i+1)}).addTo(leafletMap).bindPopup(`<b>Étape ${i+1}</b><br>${esc(p[0])}<br><button class="popup-service" data-stop="${i}">Voir les services autour</button>`));
  leafletMap.on('popupopen',e=>{const b=e.popup.getElement()?.querySelector('.popup-service');if(b)b.onclick=()=>{byId('service-stop').value=b.dataset.stop;loadServicesForStops()}});
  leafletMap.fitBounds(waypointLatLngs,{padding:[25,25]});
  byId('map-summary').innerHTML=`<div><strong>${totalKm().toLocaleString('fr-FR')} km</strong><span>distance planifiée</span></div><div><strong>${ROADBOOK_WAYPOINTS.length}</strong><span>étapes principales</span></div><div><strong>0</strong><span>services chargés</span></div>`;
  byId('route-status').textContent='Calcul du trajet réel sur les routes OpenStreetMap…';
  byId('map-legend').innerHTML=`<span><i class="line-road"></i>Route réelle</span>${Object.values(CAMPER_TYPES).map(v=>`<span>${v.icon} ${v.label}</span>`).join('')}`;
  try{
    const coordinates=ROADBOOK_WAYPOINTS.map(p=>`${p[2]},${p[1]}`).join(';');
    const response=await fetch(`https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson&steps=false`);
    if(!response.ok)throw new Error('Routage indisponible');
    const data=await response.json();const route=data.routes?.[0];if(!route)throw new Error('Aucune route');
    const latLngs=route.geometry.coordinates.map(([lon,lat])=>[lat,lon]);
    L.polyline(latLngs,{weight:5,opacity:.9}).addTo(leafletMap);leafletMap.fitBounds(latLngs,{padding:[25,25]});
    byId('map-summary').innerHTML=`<div><strong>${Math.round(route.distance/1000).toLocaleString('fr-FR')} km</strong><span>route calculée</span></div><div><strong>${(route.duration/3600).toFixed(1)} h</strong><span>sans pauses</span></div><div><strong>0</strong><span>services chargés</span></div>`;
    byId('route-status').textContent='Route chargée. Choisis une étape ou toutes les étapes, puis charge les services souhaités.';
  }catch(e){L.polyline(waypointLatLngs,{weight:5,opacity:.75,dashArray:'10 7'}).addTo(leafletMap);byId('route-status').textContent='Route détaillée indisponible; corridor affiché. Les services restent utilisables.';}
}

function selectedServiceTypes(){return [...document.querySelectorAll('[data-service-filter]:checked')].map(x=>x.dataset.serviceFilter)}

function applyServiceFilters(){
  Object.entries(camperLayers).forEach(([kind,layer])=>{
    const checked=document.querySelector(`[data-service-filter="${kind}"]`)?.checked;
    if(checked&&!leafletMap.hasLayer(layer))layer.addTo(leafletMap);
    if(!checked&&leafletMap.hasLayer(layer))leafletMap.removeLayer(layer);
  });
  updateServiceCount();
}

function updateServiceCount(){
  const enabled=new Set(selectedServiceTypes());
  const visible=camperResults.filter(x=>enabled.has(x.kind)).length;
  const cards=byId('map-summary')?.children;if(cards?.[2])cards[2].innerHTML=`<strong>${visible}</strong><span>services visibles</span>`;
}

async function loadServicesForStops(){
  if(!leafletMap)return;
  const types=selectedServiceTypes();if(!types.length){byId('route-status').textContent='Coche au moins un type de service.';return;}
  Object.values(camperLayers).forEach(l=>l.clearLayers());camperResults=[];
  const choice=byId('service-stop').value,radius=Number(byId('service-radius').value)*1000;
  const stops=choice==='all'?ROADBOOK_WAYPOINTS:[ROADBOOK_WAYPOINTS[Number(choice)]];
  byId('route-status').textContent=`Recherche autour de ${choice==='all'?'toutes les étapes':stops[0][0]}…`;
  const clauses=[];
  const add=(filter,p)=>clauses.push(`nwr${filter}(around:${radius},${p[1]},${p[2]});`);
  stops.forEach(p=>types.forEach(t=>{
    if(t==='caravan')add('["tourism"="caravan_site"]',p);
    if(t==='camp')add('["tourism"="camp_site"]',p);
    if(t==='dump')add('["amenity"="sanitary_dump_station"]',p);
    if(t==='water'){add('["amenity"="drinking_water"]',p);add('["amenity"="water_point"]',p)}
    if(t==='toilets')add('["amenity"="toilets"]',p);
    if(t==='shower')add('["amenity"="shower"]',p);
  }));
  const query=`[out:json][timeout:40];(${clauses.join('')});out center tags;`;
  try{
    const response=await fetch('https://overpass-api.de/api/interpreter',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},body:'data='+encodeURIComponent(query)});
    if(!response.ok)throw new Error('Overpass indisponible');
    const data=await response.json(),seen=new Set();
    data.elements.forEach(el=>{
      const id=`${el.type}/${el.id}`;if(seen.has(id))return;seen.add(id);
      const lat=el.lat??el.center?.lat,lon=el.lon??el.center?.lon;if(!Number.isFinite(lat)||!Number.isFinite(lon))return;
      const tags=el.tags||{},kind=camperKind(tags);if(!types.includes(kind))return;
      const name=tags.name||CAMPER_TYPES[kind].label.replace(/s$/,'');
      const website=tags.website||tags['contact:website'];
      const osm=`https://www.openstreetmap.org/${el.type}/${el.id}`;
      const details=[amenityLine(tags),tags.opening_hours?`Horaires : ${esc(tags.opening_hours)}`:'',tags.access?`Accès : ${esc(tags.access)}`:''].filter(Boolean).join('<br>');
      const links=`<br><a href="${osm}" target="_blank" rel="noopener">Voir dans OSM ↗</a>${website?` · <a href="${esc(website)}" target="_blank" rel="noopener">Site ↗</a>`:''}`;
      L.marker([lat,lon],{icon:camperIcon(kind)}).addTo(camperLayers[kind]).bindPopup(`<b>${esc(name)}</b><br>${details}${links}`);
      camperResults.push({kind,lat,lon});
    });
    applyServiceFilters();
    if(choice!=='all')leafletMap.setView([stops[0][1],stops[0][2]],Math.max(leafletMap.getZoom(),10));
    byId('route-status').textContent=camperResults.length?`${camperResults.length} services trouvés autour ${choice==='all'?'des étapes planifiées':'de cette étape'}. Décoche les catégories inutiles.`:'Aucun service trouvé avec ces filtres. Augmente le rayon ou consulte Park4Night/Camperstop.';
  }catch(e){console.error(e);byId('route-status').textContent='Le service OpenStreetMap ne répond pas actuellement. Réessaie ou consulte Park4Night/Camperstop.';}
}

renderMapEnhanced=renderMapWithCamper;
