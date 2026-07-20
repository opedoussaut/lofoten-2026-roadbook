'use strict';

let camperLayers={};
let camperResults=[];

const CAMPER_TYPES={
  caravan:{label:'Aires camping-car',icon:'🚐',default:true},
  camp:{label:'Campings',icon:'🏕️',default:true},
  parking:{label:'Parkings / nuits candidates',icon:'🅿️',default:true},
  rest:{label:'Aires de repos',icon:'🛣️',default:true},
  dump:{label:'Vidange',icon:'♻️',default:true},
  water:{label:'Eau potable',icon:'💧',default:true},
  toilets:{label:'Toilettes',icon:'🚻',default:true},
  shower:{label:'Douches',icon:'🚿',default:false},
  laundry:{label:'Laveries',icon:'🧺',default:false},
  grocery:{label:'Supermarchés',icon:'🛒',default:false},
  fuel:{label:'Carburant',icon:'⛽',default:false},
  lpg:{label:'GPL',icon:'🔥',default:false},
  pharmacy:{label:'Pharmacies',icon:'💊',default:false},
  vet:{label:'Vétérinaires',icon:'🐾',default:false}
};

const COUNTRY_GUIDES={
  FR:{name:'France',rule:'Dormir dans un véhicule légalement stationné est généralement distinct du camping, mais les arrêtés locaux et panneaux priment. Ne rien déployer hors du véhicule.',links:[['Camping-Car Park','https://www.campingcarpark.com/fr_FR/'],['Aires CCar','https://www.aires-camping-cars.com/']]},
  DE:{name:'Allemagne',rule:'Une nuit de repos destinée à rétablir l’aptitude à conduire est généralement admise sur un stationnement légal; toute installation de camping reste interdite hors emplacement autorisé.',links:[['Bordatlas','https://www.bordatlas.de/'],['Stellplatz Europe','https://www.stellplatz.app/en']]},
  DK:{name:'Danemark',rule:'Les parkings et aires de repos peuvent permettre une nuit si rien ne l’interdit, à condition de rester en mode stationnement: pas de table, auvent, cales ou installation extérieure.',links:[['VisitDenmark camping-car','https://www.visitdenmark.com/denmark/plan-your-trip/plan-your-trip-faq'],['DK-Stellplätze','https://www.dk-camp.dk/en/catalogues/dk-stellplaetze-publication/']]},
  SE:{name:'Suède',rule:'Le droit d’accès à la nature ne couvre pas les véhicules. Interdiction de rouler ou stationner hors route. Les aires de repos autorisent souvent jusqu’à 24 h en semaine, sous réserve des panneaux.',links:[['Trafikverket – aires de repos','https://www.trafikverket.se/resa-och-trafik/vag/rastplatser/'],['Ställplatsappen','https://stallplatsappen.se/']]},
  NO:{name:'Norvège',rule:'Le droit de passage ne donne pas le droit de conduire ou stationner dans la nature. Utiliser routes, parkings, aires ou campings autorisés; panneaux et restrictions locales priment.',links:[['Bobilplassen','https://bobilplassen.no/welcome-to-bobilplassen/'],['Statens vegvesen – parking','https://www.vegvesen.no/en/traffic-information/traffic-information/drive-safe-in-norway/drive-safe-in-norway/parking-in-norway/']]}
};

function countryForStop(p){
  const name=String(p?.[0]||'').toLowerCase(),lat=Number(p?.[1]),lon=Number(p?.[2]);
  if(name.includes('champlan')||name.includes('saint-rémy'))return 'FR';
  if(name.includes('hambourg')||name.includes('hanovre')||name.includes('münster'))return 'DE';
  if(lat>54.5&&lat<57.8&&lon>8&&lon<13)return 'DK';
  if((lat>55&&lat<69.2&&lon>10&&lon<24)||name.includes('jönköping')||name.includes('gävle')||name.includes('umeå')||name.includes('skellefteå')||name.includes('kiruna')||name.includes('göteborg'))return 'SE';
  return 'NO';
}

function camperIcon(kind){return L.divIcon({className:'camper-marker',html:`<span class="${kind}">${CAMPER_TYPES[kind]?.icon||'•'}</span>`,iconSize:[32,32],iconAnchor:[16,16]})}
function camperKind(tags={}){
  if(tags.tourism==='caravan_site')return 'caravan';
  if(tags.tourism==='camp_site')return 'camp';
  if(tags.highway==='rest_area'||tags.highway==='services')return 'rest';
  if(tags.amenity==='parking')return 'parking';
  if(tags.amenity==='sanitary_dump_station')return 'dump';
  if(tags.amenity==='drinking_water'||tags.amenity==='water_point')return 'water';
  if(tags.amenity==='toilets')return 'toilets';
  if(tags.amenity==='shower')return 'shower';
  if(tags.shop==='laundry'||tags.amenity==='laundry')return 'laundry';
  if(['supermarket','convenience'].includes(tags.shop))return 'grocery';
  if(tags.amenity==='fuel'&&(tags.lpg==='yes'||tags['fuel:lpg']==='yes'))return 'lpg';
  if(tags.amenity==='fuel')return 'fuel';
  if(tags.amenity==='pharmacy')return 'pharmacy';
  if(tags.amenity==='veterinary')return 'vet';
  return 'parking';
}
function amenityLine(tags={}){
  const items=[];const yes=(k,label)=>{if(['yes','customers','public','designated'].includes(tags[k]))items.push(label)};
  yes('power_supply','électricité');yes('drinking_water','eau potable');yes('water_point','eau');yes('sanitary_dump_station','vidange');yes('toilets','toilettes');yes('shower','douches');yes('internet_access','Wi-Fi');
  if(tags.fee==='no')items.push('gratuit');else if(tags.fee==='yes')items.push('payant');
  if(tags.maxstay)items.push(`durée max ${tags.maxstay}`);if(tags.surface)items.push(`sol ${tags.surface}`);
  return items.length?items.join(' · '):'Équipements non renseignés dans OpenStreetMap';
}
function parkingWarning(kind,tags={}){
  if(kind==='parking'||kind==='rest')return `<div class="popup-warning"><b>À vérifier sur place :</b> ce point indique un stationnement, pas une autorisation garantie de dormir. Lire tous les panneaux et rester en mode parking.</div>`;
  if(tags.access==='private'||tags.access==='customers')return `<div class="popup-warning">Accès limité : ${esc(tags.access)}.</div>`;
  return '';
}
function ensureSavedStops(){if(!Array.isArray(state.savedCamperStops))state.savedCamperStops=[]}

function renderCountryGuide(stopIndex){
  const box=byId('country-guide');if(!box)return;
  const indices=stopIndex==='all'?[...new Set(ROADBOOK_WAYPOINTS.map(p=>countryForStop(p)))]:[countryForStop(ROADBOOK_WAYPOINTS[Number(stopIndex)])];
  box.innerHTML=indices.map(code=>{const g=COUNTRY_GUIDES[code];return `<article><h4>${esc(g.name)}</h4><p>${esc(g.rule)}</p><div>${g.links.map(([n,u])=>`<a href="${u}" target="_blank" rel="noopener">${esc(n)} ↗</a>`).join(' · ')}</div></article>`}).join('');
}

function renderSavedStops(){
  ensureSavedStops();const box=byId('saved-camper-stops');if(!box)return;
  box.innerHTML=state.savedCamperStops.length?state.savedCamperStops.map((s,i)=>`<div class="saved-stop"><div><b>${esc(s.name||'Lieu enregistré')}</b><small>${esc(s.source||'Lien externe')} · étape ${Number(s.stopIndex)+1}</small></div><div><a href="${esc(s.url)}" target="_blank" rel="noopener">Ouvrir ↗</a><button class="danger remove-saved-stop" data-index="${i}">×</button></div></div>`).join(''):'<p class="muted">Aucun lieu Park4Night, Campercontact ou autre encore enregistré.</p>';
  document.querySelectorAll('.remove-saved-stop').forEach(b=>b.onclick=()=>{state.savedCamperStops.splice(Number(b.dataset.index),1);save();autoSync();renderSavedStops();showSavedMarkers()});
}
function showSavedMarkers(){
  if(!leafletMap)return;if(camperLayers.saved)camperLayers.saved.clearLayers();else camperLayers.saved=L.layerGroup().addTo(leafletMap);
  ensureSavedStops();state.savedCamperStops.forEach(s=>{const lat=Number(s.lat),lon=Number(s.lon);if(Number.isFinite(lat)&&Number.isFinite(lon))L.marker([lat,lon],{icon:camperIcon('caravan')}).addTo(camperLayers.saved).bindPopup(`<b>⭐ ${esc(s.name)}</b><br>${esc(s.source)}<br><a href="${esc(s.url)}" target="_blank" rel="noopener">Ouvrir la fiche ↗</a>`)});
}

function renderMapWithCamper(){
  clearCurrentMap();ensureSavedStops();
  byId('app').innerHTML=`<section class="card map-panel"><div class="map-heading"><div><h2>Roadmap & copilote van</h2><p class="muted">Route complète, étapes, nuits possibles et services critiques dans chaque pays traversé.</p></div><div class="map-tabs"><button id="road-view" class="primary">🚐 Itinéraire</button><button id="hike-view">🥾 Randonnée</button></div></div>
  <div id="road-tools" class="road-tools"><div class="stop-selector"><label>Zone <select id="service-stop"><option value="all">Toutes les étapes</option>${ROADBOOK_WAYPOINTS.map((p,i)=>`<option value="${i}">${i+1}. ${esc(p[0])}</option>`).join('')}</select></label><label>Rayon <select id="service-radius"><option value="5">5 km</option><option value="10" selected>10 km</option><option value="15">15 km</option><option value="25">25 km</option></select></label><button id="load-services" class="primary">Charger autour des étapes</button></div>
  <fieldset class="service-filters"><legend>Afficher / masquer</legend>${Object.entries(CAMPER_TYPES).map(([k,v])=>`<label><input type="checkbox" data-service-filter="${k}" ${v.default?'checked':''}> <span>${v.icon} ${v.label}</span></label>`).join('')}</fieldset>
  <div class="toolbar source-links"><a class="btn" href="https://park4night.com/en" target="_blank" rel="noopener">Park4Night ↗</a><a class="btn" href="https://www.campercontact.com/en" target="_blank" rel="noopener">Campercontact ↗</a><a class="btn" href="https://camperstop.com/fr/" target="_blank" rel="noopener">Camperstop ↗</a><a class="btn" href="https://ioverlander.com/" target="_blank" rel="noopener">iOverlander ↗</a></div>
  <details class="country-details" open><summary>Règles et sources par pays</summary><div id="country-guide" class="country-guide"></div></details>
  <details class="manual-stop"><summary>⭐ Enregistrer un lieu trouvé sur Park4Night ou ailleurs</summary><div class="manual-stop-grid"><label>Nom<input id="saved-name" placeholder="Ex. aire près de Jönköping"></label><label>Source<select id="saved-source"><option>Park4Night</option><option>Campercontact</option><option>Camperstop</option><option>iOverlander</option><option>Autre</option></select></label><label>Lien public ou identifiant<input id="saved-url" placeholder="https://… ou ID"></label><label>Associer à l’étape<select id="saved-step">${ROADBOOK_WAYPOINTS.map((p,i)=>`<option value="${i}">${i+1}. ${esc(p[0])}</option>`).join('')}</select></label><label>Latitude facultative<input id="saved-lat" inputmode="decimal" placeholder="57.7089"></label><label>Longitude facultative<input id="saved-lon" inputmode="decimal" placeholder="11.9746"></label><button id="save-external-stop" class="primary">Enregistrer</button></div><div id="saved-camper-stops"></div></details></div>
  <div id="map-summary" class="map-summary"></div><div id="route-status" class="status">Préparation de la carte…</div><div id="map-canvas" class="map map-large"></div><div id="map-legend" class="map-legend"></div></section>`;
  byId('road-view').onclick=showRoadMapIntegrated;byId('hike-view').onclick=()=>{byId('road-tools').hidden=true;showHikingMap()};byId('load-services').onclick=loadServicesForStops;
  byId('service-stop').onchange=()=>renderCountryGuide(byId('service-stop').value);document.querySelectorAll('[data-service-filter]').forEach(cb=>cb.onchange=applyServiceFilters);
  byId('save-external-stop').onclick=()=>{let url=byId('saved-url').value.trim();if(!url)return alert('Ajoute au minimum le lien public ou l’identifiant.');if(!/^https?:\/\//i.test(url))url=`https://park4night.com/en/search?query=${encodeURIComponent(url)}`;state.savedCamperStops.push({name:byId('saved-name').value.trim()||'Lieu enregistré',source:byId('saved-source').value,url,stopIndex:Number(byId('saved-step').value),lat:byId('saved-lat').value,lon:byId('saved-lon').value});save();autoSync();renderSavedStops();showSavedMarkers();byId('saved-name').value='';byId('saved-url').value='';byId('saved-lat').value='';byId('saved-lon').value=''};
  renderCountryGuide('all');renderSavedStops();showRoadMapIntegrated();
}

async function showRoadMapIntegrated(){
  byId('road-view').classList.add('primary');byId('hike-view').classList.remove('primary');byId('road-tools').hidden=false;baseMap([59.8,11.5],4,false);camperLayers={};camperResults=[];
  Object.keys(CAMPER_TYPES).forEach(k=>camperLayers[k]=L.layerGroup().addTo(leafletMap));showSavedMarkers();
  const pts=ROADBOOK_WAYPOINTS.map(x=>[x[1],x[2]]);ROADBOOK_WAYPOINTS.forEach((p,i)=>L.marker([p[1],p[2]],{icon:numberedIcon(i+1)}).addTo(leafletMap).bindPopup(`<b>Étape ${i+1}</b><br>${esc(p[0])}<br>${COUNTRY_GUIDES[countryForStop(p)].name}<br><button class="popup-service" data-stop="${i}">Services autour</button>`));
  leafletMap.on('popupopen',e=>{const b=e.popup.getElement()?.querySelector('.popup-service');if(b)b.onclick=()=>{byId('service-stop').value=b.dataset.stop;renderCountryGuide(b.dataset.stop);loadServicesForStops()}});leafletMap.fitBounds(pts,{padding:[25,25]});
  byId('map-summary').innerHTML=`<div><strong>${totalKm().toLocaleString('fr-FR')} km</strong><span>distance planifiée</span></div><div><strong>${ROADBOOK_WAYPOINTS.length}</strong><span>étapes</span></div><div><strong>0</strong><span>points visibles</span></div>`;
  byId('map-legend').innerHTML=`<span><i class="line-road"></i>Route</span>${Object.values(CAMPER_TYPES).filter(v=>v.default).map(v=>`<span>${v.icon} ${v.label}</span>`).join('')}`;byId('route-status').textContent='Calcul de la route réelle…';
  try{const coordinates=ROADBOOK_WAYPOINTS.map(p=>`${p[2]},${p[1]}`).join(';');const r=await fetch(`https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson&steps=false`);if(!r.ok)throw Error();const d=await r.json(),route=d.routes?.[0];if(!route)throw Error();const ll=route.geometry.coordinates.map(([lon,lat])=>[lat,lon]);L.polyline(ll,{weight:5,opacity:.9}).addTo(leafletMap);leafletMap.fitBounds(ll,{padding:[25,25]});byId('map-summary').children[0].innerHTML=`<strong>${Math.round(route.distance/1000).toLocaleString('fr-FR')} km</strong><span>route calculée</span>`;byId('route-status').textContent='Choisis une étape et les catégories utiles, puis charge les points.'}catch{L.polyline(pts,{weight:5,opacity:.75,dashArray:'10 7'}).addTo(leafletMap);byId('route-status').textContent='Route détaillée indisponible; corridor et étapes affichés.'}
}

function selectedServiceTypes(){return [...document.querySelectorAll('[data-service-filter]:checked')].map(x=>x.dataset.serviceFilter)}
function applyServiceFilters(){Object.entries(camperLayers).forEach(([k,l])=>{if(k==='saved')return;const c=document.querySelector(`[data-service-filter="${k}"]`)?.checked;if(c&&!leafletMap.hasLayer(l))l.addTo(leafletMap);if(!c&&leafletMap.hasLayer(l))leafletMap.removeLayer(l)});updateServiceCount()}
function updateServiceCount(){const e=new Set(selectedServiceTypes()),v=camperResults.filter(x=>e.has(x.kind)).length,c=byId('map-summary')?.children;if(c?.[2])c[2].innerHTML=`<strong>${v}</strong><span>points visibles</span>`}

async function loadServicesForStops(){
  if(!leafletMap)return;const types=selectedServiceTypes();if(!types.length)return byId('route-status').textContent='Coche au moins une catégorie.';Object.entries(camperLayers).forEach(([k,l])=>{if(k!=='saved')l.clearLayers()});camperResults=[];
  const choice=byId('service-stop').value,radius=Number(byId('service-radius').value)*1000,stops=choice==='all'?ROADBOOK_WAYPOINTS:[ROADBOOK_WAYPOINTS[Number(choice)]];byId('route-status').textContent=`Recherche autour de ${choice==='all'?'toutes les étapes':stops[0][0]}…`;
  const q=[];const add=(f,p)=>q.push(`nwr${f}(around:${radius},${p[1]},${p[2]});`);stops.forEach(p=>types.forEach(t=>{
    if(t==='caravan')add('["tourism"="caravan_site"]',p);if(t==='camp')add('["tourism"="camp_site"]',p);
    if(t==='parking'){add('["amenity"="parking"]["fee"="no"]',p);add('["amenity"="parking"]["motorhome"="yes"]',p);add('["amenity"="parking"]["caravan"="yes"]',p)}
    if(t==='rest'){add('["highway"="rest_area"]',p);add('["highway"="services"]',p)}if(t==='dump')add('["amenity"="sanitary_dump_station"]',p);
    if(t==='water'){add('["amenity"="drinking_water"]',p);add('["amenity"="water_point"]',p)}if(t==='toilets')add('["amenity"="toilets"]',p);if(t==='shower')add('["amenity"="shower"]',p);
    if(t==='laundry'){add('["shop"="laundry"]',p);add('["amenity"="laundry"]',p)}if(t==='grocery'){add('["shop"="supermarket"]',p);add('["shop"="convenience"]',p)}
    if(t==='fuel')add('["amenity"="fuel"]',p);if(t==='lpg'){add('["amenity"="fuel"]["fuel:lpg"="yes"]',p);add('["amenity"="fuel"]["lpg"="yes"]',p)}if(t==='pharmacy')add('["amenity"="pharmacy"]',p);if(t==='vet')add('["amenity"="veterinary"]',p);
  }));
  const query=`[out:json][timeout:55];(${q.join('')});out center tags;`;
  try{const r=await fetch('https://overpass-api.de/api/interpreter',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},body:'data='+encodeURIComponent(query)});if(!r.ok)throw Error();const d=await r.json(),seen=new Set();d.elements.forEach(el=>{const id=`${el.type}/${el.id}`;if(seen.has(id))return;seen.add(id);const lat=el.lat??el.center?.lat,lon=el.lon??el.center?.lon;if(!Number.isFinite(lat)||!Number.isFinite(lon))return;const tags=el.tags||{},kind=camperKind(tags);if(!types.includes(kind))return;if(['private','no'].includes(tags.access))return;const name=tags.name||CAMPER_TYPES[kind].label.replace(/s$/,'');const website=tags.website||tags['contact:website'],osm=`https://www.openstreetmap.org/${el.type}/${el.id}`;const details=[amenityLine(tags),tags.opening_hours?`Horaires : ${esc(tags.opening_hours)}`:'',tags.access?`Accès : ${esc(tags.access)}`:''].filter(Boolean).join('<br>');L.marker([lat,lon],{icon:camperIcon(kind)}).addTo(camperLayers[kind]).bindPopup(`<b>${esc(name)}</b><br>${details}${parkingWarning(kind,tags)}<br><a href="${osm}" target="_blank" rel="noopener">OSM ↗</a>${website?` · <a href="${esc(website)}" target="_blank" rel="noopener">Site ↗</a>`:''}`);camperResults.push({kind,lat,lon})});applyServiceFilters();if(choice!=='all')leafletMap.setView([stops[0][1],stops[0][2]],Math.max(leafletMap.getZoom(),10));byId('route-status').textContent=camperResults.length?`${camperResults.length} points trouvés. Les parkings simples restent des candidats à contrôler sur place.`:'Aucun résultat. Augmente le rayon ou consulte les bases communautaires.'}catch(e){console.error(e);byId('route-status').textContent='OpenStreetMap/Overpass ne répond pas actuellement. Réessaie avec une seule étape et un rayon plus petit.'}
}

renderMapEnhanced=renderMapWithCamper;