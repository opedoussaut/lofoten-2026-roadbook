'use strict';

let camperLayer=null;

function camperIcon(kind){
  const symbols={caravan:'🚐',camp:'🏕️',dump:'♻️',water:'💧',toilets:'🚻',shower:'🚿'};
  return L.divIcon({
    className:'camper-marker',
    html:`<span class="${kind}">${symbols[kind]||'•'}</span>`,
    iconSize:[32,32],iconAnchor:[16,16]
  });
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
  const yes=(k,label)=>{if(tags[k]==='yes'||tags[k]==='customers'||tags[k]==='public')items.push(label)};
  yes('power_supply','électricité');yes('drinking_water','eau potable');yes('water_point','remplissage eau');yes('sanitary_dump_station','vidange');yes('toilets','toilettes');yes('shower','douches');yes('internet_access','Wi-Fi');
  if(tags.fee==='no')items.push('gratuit');else if(tags.fee==='yes')items.push('payant');
  return items.length?items.join(' · '):'Équipements non renseignés dans OpenStreetMap';
}

function renderMapWithCamper(){
  clearCurrentMap();
  byId('app').innerHTML=`
    <section class="card map-panel">
      <div class="map-heading">
        <div><h2>Cartes du voyage</h2><p class="muted">Route complète, randonnées et services pour le camping-car.</p></div>
        <div class="map-tabs"><button id="road-view" class="primary">🚐 Roadmap</button><button id="hike-view">🥾 Randonnée</button><button id="camper-view">🅿️ Aires & services</button></div>
      </div>
      <div id="map-summary" class="map-summary"></div>
      <div id="route-status" class="status">Préparation de la carte…</div>
      <div id="camper-tools" class="camper-tools" hidden>
        <button id="search-camper" class="primary">Rechercher dans cette zone</button>
        <a class="btn" href="https://park4night.com/en" target="_blank" rel="noopener">Park4Night ↗</a>
        <a class="btn" href="https://camperstop.com/fr/" target="_blank" rel="noopener">Camperstop ↗</a>
      </div>
      <div id="map-canvas" class="map map-large"></div>
      <div id="map-legend" class="map-legend"></div>
    </section>`;
  byId('road-view').onclick=()=>{byId('camper-tools').hidden=true;showRoadMap()};
  byId('hike-view').onclick=()=>{byId('camper-tools').hidden=true;showHikingMap()};
  byId('camper-view').onclick=showCamperMap;
  showRoadMap();
}

function showCamperMap(){
  byId('road-view').classList.remove('primary');byId('hike-view').classList.remove('primary');byId('camper-view').classList.add('primary');
  byId('camper-tools').hidden=false;
  baseMap([68.08,13.45],9,false);
  camperLayer=L.layerGroup().addTo(leafletMap);
  byId('map-summary').innerHTML=`<div><strong>OSM</strong><span>données ouvertes</span></div><div><strong>6</strong><span>types de services</span></div><div><strong>Zone visible</strong><span>recherche à la demande</span></div>`;
  byId('route-status').textContent='Déplace ou zoome la carte, puis recherche les aires et services dans la zone visible.';
  byId('map-legend').innerHTML='<span>🚐 Aire camping-car</span><span>🏕️ Camping</span><span>♻️ Vidange</span><span>💧 Eau</span><span>🚻 Toilettes</span><span>🚿 Douches</span>';
  byId('search-camper').onclick=loadCamperAmenities;
  loadCamperAmenities();
}

async function loadCamperAmenities(){
  if(!leafletMap||!camperLayer)return;
  const b=leafletMap.getBounds();
  const area=(b.getNorth()-b.getSouth())*(b.getEast()-b.getWest());
  if(area>25){byId('route-status').textContent='Zone trop vaste. Zoome davantage avant de rechercher les services.';return;}
  byId('route-status').textContent='Recherche des aires et équipements OpenStreetMap…';
  camperLayer.clearLayers();
  const bbox=[b.getSouth(),b.getWest(),b.getNorth(),b.getEast()].join(',');
  const query=`[out:json][timeout:25];(nwr["tourism"="caravan_site"](${bbox});nwr["tourism"="camp_site"](${bbox});nwr["amenity"="sanitary_dump_station"](${bbox});nwr["amenity"="drinking_water"](${bbox});nwr["amenity"="water_point"](${bbox});nwr["amenity"="toilets"](${bbox});nwr["amenity"="shower"](${bbox}););out center tags;`;
  try{
    const response=await fetch('https://overpass-api.de/api/interpreter',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},body:'data='+encodeURIComponent(query)});
    if(!response.ok)throw new Error('Overpass indisponible');
    const data=await response.json();
    let count=0;
    data.elements.forEach(el=>{
      const lat=el.lat??el.center?.lat,lon=el.lon??el.center?.lon;if(!Number.isFinite(lat)||!Number.isFinite(lon))return;
      const tags=el.tags||{},kind=camperKind(tags),name=tags.name||({caravan:'Aire camping-car',camp:'Camping',dump:'Station de vidange',water:'Point d’eau',toilets:'Toilettes',shower:'Douche'}[kind]);
      const website=tags.website||tags['contact:website'];
      const osm=`https://www.openstreetmap.org/${el.type}/${el.id}`;
      const details=[amenityLine(tags),tags.opening_hours?`Horaires : ${esc(tags.opening_hours)}`:'',tags.access?`Accès : ${esc(tags.access)}`:''].filter(Boolean).join('<br>');
      const links=`<br><a href="${osm}" target="_blank" rel="noopener">Voir dans OSM ↗</a>${website?` · <a href="${esc(website)}" target="_blank" rel="noopener">Site ↗</a>`:''}`;
      L.marker([lat,lon],{icon:camperIcon(kind)}).addTo(camperLayer).bindPopup(`<b>${esc(name)}</b><br>${details}${links}`);count++;
    });
    byId('map-summary').innerHTML=`<div><strong>${count}</strong><span>points trouvés</span></div><div><strong>OpenStreetMap</strong><span>source libre</span></div><div><strong>${leafletMap.getZoom()}</strong><span>niveau de zoom</span></div>`;
    byId('route-status').textContent=count?`${count} aires et services trouvés. Les équipements dépendent de la qualité des données OSM.`:'Aucun point trouvé dans cette zone. Essaie une zone voisine ou consulte Park4Night/Camperstop.';
  }catch(error){
    console.error(error);byId('route-status').textContent='Le service OpenStreetMap ne répond pas actuellement. Utilise les boutons Park4Night ou Camperstop, puis réessaie.';
  }
}

renderMapEnhanced=renderMapWithCamper;
