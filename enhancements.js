'use strict';

const ROADBOOK_WAYPOINTS = [
  ['Départ — Saint-Rémy-lès-Chevreuse',48.706,2.071],
  ['Hambourg',53.551,9.994],
  ['Jönköping',57.782,14.161],
  ['Gävle',60.674,17.141],
  ['Umeå / Skellefteå',64.751,20.952],
  ['Kiruna / Abisko',68.350,18.830],
  ['Kabelvåg / Svolvær',68.210,14.475],
  ['Leknes / Ballstad',68.148,13.611],
  ['Reine / Sørvågen',67.917,13.070],
  ['Fauske',67.259,15.394],
  ['Mosjøen',65.837,13.190],
  ['Trondheim',63.430,10.395],
  ['Lillehammer / Vinstra',61.115,10.466],
  ['Göteborg',57.708,11.974],
  ['Hanovre / Münster',52.375,9.732],
  ['Arrivée — Champlan',48.709,2.279]
];

const VAN_SPEC_GROUPS = [
  ['Identification',[['Catégorie','Roadsurfer Cozy Cottage'],['Type','Camping-car semi-intégré'],['Constructeur','Variable selon le véhicule remis'],['Places carte grise','3'],['Couchages','2 + 1'],['Puissance indicative','140 ch'],['Norme antipollution','Euro 6'],['Permis','Permis B']]],
  ['Dimensions',[['Longueur','699 cm'],['Avec porte-vélos rabattu','733 cm'],['Avec porte-vélos déplié','780 cm'],['Hauteur','315 cm'],['Largeur avec rétroviseurs','274 cm'],['Lit fixe','194 × 201 cm'],['Garage sous le lit','205 × 82,5 × 110 cm'],['Banquette arrière','97 × 48 cm; étendue 106 × 48 cm']]],
  ['Eau, énergie et confort',[['Eau propre','95 L'],['Eaux usées','73 L'],['Branchement 12 V','Oui'],['Branchement 230 V','Uniquement sur secteur'],['Chauffage','Chauffage autonome à air, généralement au diesel'],['Climatisation','En conduite et à l’arrêt'],['Eau chaude','Oui'],['Douche et WC','Salle d’eau intégrée'],['Cuisine','Cuisine équipée et grand réfrigérateur']]],
  ['Conduite et sécurité',[['Navigation','GPS / système de navigation'],['Multimédia','Bluetooth, USB, radio, Apple CarPlay, Android Auto'],['Caméra de recul','Oui'],['Régulateur de vitesse','Oui'],['ISOFIX','2 sièges enfants sur la banquette arrière'],['Équipement sécurité','Gilet, triangle et trousse de secours']]],
  ['Équipement inclus',[['Extérieur','Table et 2 chaises'],['Énergie','Câble secteur 20 m et adaptateur'],['Gaz','Bouteille ou réservoir de gaz'],['Stationnement','Cales de nivellement'],['Entretien','Pelle, balayette et réservoir d’eau'],['Internet / Wi-Fi','Non inclus']]]
];

const BOOKING_DETAILS = [
  ['Prise en charge','24 août 2026 à 16:00'],['Retour','11 septembre 2026 à 17:00'],['Agence','33 route de Versailles, 91160 Champlan'],['Durée','18 nuits'],['Kilométrage','Illimité'],['Conducteurs inclus','2'],['Option','Porte-vélos pour 2 vélos'],['Couverture','Basic - franchise 3 000 €'],['Montant total','2 195 €'],['Déjà payé','1 914 €'],['Solde indiqué','281 €'],['Caution demandée','800 € par carte de crédit; American Express non acceptée']
];

const USEFUL_LINKS = [
  ['Routes & circulation',[
    ['Vegvesen Trafikk','État des routes, fermetures, webcams, ponts et tunnels','https://www.vegvesen.no/trafikk/'],
    ['Vegvesen traffic app','Alertes officielles pour itinéraires et zones','https://www.vegvesen.no/en/traffic-information/traffic-information/the-npras-traffic-app/'],
    ['OpenStreetMap','Carte routière générale et recherche de lieux','https://www.openstreetmap.org/'],
    ['Ferries Norway','Informations et planification des ferries','https://www.autopassferje.no/']
  ]],
  ['Van & camping-car',[
    ['Camping Code Norway','Règles officielles de camping responsable','https://www.visitnorway.com/hotels-more/caravan-camping/the-camping-code/'],
    ['Motorhome in Norway','Conseils officiels pour circuler en camping-car','https://www.visitnorway.com/hotels-more/caravan-camping/how-to-travel-in-norway-with-a-motorhome/'],
    ['Park4Night','Aires, parkings et services communautaires','https://park4night.com/'],
    ['Campercontact','Aires de camping-car et campings','https://www.campercontact.com/']
  ]],
  ['Randonnée & terrain',[
    ['UT.no','Itinéraires, refuges et cartes de randonnée en Norvège','https://ut.no/'],
    ['Norgeskart','Cartographie topographique officielle norvégienne','https://www.norgeskart.no/'],
    ['OpenTopoMap','Carte topographique mondiale','https://www.opentopomap.org/'],
    ['Varsom','Alertes avalanche, glissements et conditions naturelles','https://www.varsom.no/en/']
  ]],
  ['Météo & lumière',[
    ['Yr','Prévisions météo norvégiennes','https://www.yr.no/'],
    ['MET Norway','Service météorologique officiel','https://www.met.no/en'],
    ['Windy','Vent, pluie et couverture nuageuse','https://www.windy.com/'],
    ['Sunrise Sunset','Heures de lever, coucher et lumière','https://www.timeanddate.com/sun/']
  ]],
  ['Paddy & urgences',[
    ['Mattilsynet','Règles officielles pour voyager avec un chien en Norvège','https://www.mattilsynet.no/en/animals/travelling-with-dogs-cats-and-ferrets-from-eu-countries-to-norway'],
    ['Urgences Norvège','112 police, 113 ambulance, 110 pompiers','https://www.visitnorway.com/plan-your-trip/safety-first/'],
    ['Traffic information phone','Information routière en anglais : +47 22 175 175','https://www.vegvesen.no/en/about-us/contact-us/traffic-control-centres/'],
    ['Google Maps vets','Rechercher un vétérinaire à proximité','https://www.google.com/maps/search/veterinarian/']
  ]]
];

function numberedIcon(n, kind='road'){
  return L.divIcon({className:'numbered-marker '+kind,html:`<span>${n}</span>`,iconSize:[30,30],iconAnchor:[15,15]});
}

function clearCurrentMap(){
  if(leafletMap){leafletMap.remove();leafletMap=null;}
}

function renderMapEnhanced(){
  clearCurrentMap();
  byId('app').innerHTML=`
    <section class="card map-panel">
      <div class="map-heading">
        <div><h2>Cartes du voyage</h2><p class="muted">Itinéraire routier calculé sur le réseau OpenStreetMap et carte topographique pour les randonnées.</p></div>
        <div class="map-tabs"><button id="road-view" class="primary">🚐 Roadmap</button><button id="hike-view">🥾 Randonnée</button></div>
      </div>
      <div id="map-summary" class="map-summary"></div>
      <div id="route-status" class="status">Préparation de la carte…</div>
      <div id="map-canvas" class="map map-large"></div>
      <div id="map-legend" class="map-legend"></div>
    </section>`;
  byId('road-view').onclick=showRoadMap;
  byId('hike-view').onclick=showHikingMap;
  showRoadMap();
}

function baseMap(center,zoom,topo=false){
  clearCurrentMap();
  leafletMap=L.map('map-canvas',{zoomControl:true}).setView(center,zoom);
  const road=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap contributors'});
  const hiking=L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',{maxZoom:17,attribution:'© OpenStreetMap contributors, SRTM | OpenTopoMap'});
  (topo?hiking:road).addTo(leafletMap);
  L.control.layers({'Route — OpenStreetMap':road,'Topo — OpenTopoMap':hiking}).addTo(leafletMap);
}

async function showRoadMap(){
  byId('road-view').classList.add('primary');byId('hike-view').classList.remove('primary');
  baseMap([59.8,11.5],4,false);
  const waypointLatLngs=ROADBOOK_WAYPOINTS.map(x=>[x[1],x[2]]);
  ROADBOOK_WAYPOINTS.forEach((p,i)=>L.marker([p[1],p[2]],{icon:numberedIcon(i+1)}).addTo(leafletMap).bindPopup(`<b>Étape ${i+1}</b><br>${esc(p[0])}`));
  leafletMap.fitBounds(waypointLatLngs,{padding:[25,25]});
  byId('map-summary').innerHTML=`<div><strong>${totalKm().toLocaleString('fr-FR')} km</strong><span>distance planifiée</span></div><div><strong>${state.itinerary.length}</strong><span>journées</span></div><div><strong>Calcul…</strong><span>route réelle OSM</span></div>`;
  byId('route-status').textContent='Calcul du trajet réel sur les routes OpenStreetMap…';
  byId('map-legend').innerHTML=`<span><i class="line-road"></i>Route calculée par OSRM</span><span>Le calcul est automobile standard : vérifier les restrictions de hauteur, largeur, poids et météo avant chaque étape.</span><a target="_blank" rel="noopener" href="https://www.openstreetmap.org/directions">Ouvrir le planificateur OSM ↗</a>`;
  try{
    const coordinates=ROADBOOK_WAYPOINTS.map(p=>`${p[2]},${p[1]}`).join(';');
    const url=`https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson&steps=false`;
    const response=await fetch(url);
    if(!response.ok)throw new Error('Service de routage indisponible');
    const data=await response.json();
    if(data.code!=='Ok'||!data.routes?.[0])throw new Error(data.message||'Aucun itinéraire trouvé');
    const route=data.routes[0];
    const latLngs=route.geometry.coordinates.map(([lon,lat])=>[lat,lon]);
    L.polyline(latLngs,{weight:5,opacity:.9}).addTo(leafletMap);
    leafletMap.fitBounds(latLngs,{padding:[25,25]});
    const km=Math.round(route.distance/1000);
    const hours=route.duration/3600;
    byId('map-summary').innerHTML=`<div><strong>${km.toLocaleString('fr-FR')} km</strong><span>route calculée</span></div><div><strong>${hours.toFixed(1)} h</strong><span>conduite théorique sans pauses</span></div><div><strong>${ROADBOOK_WAYPOINTS.length}</strong><span>étapes principales</span></div>`;
    byId('route-status').textContent='Itinéraire routier chargé. Zoome pour voir les routes suivies.';
  }catch(error){
    L.polyline(waypointLatLngs,{weight:5,opacity:.75,dashArray:'10 7'}).addTo(leafletMap);
    byId('route-status').textContent='Le service de routage n’a pas répondu. Affichage temporaire du corridor entre étapes; réessaie plus tard.';
  }
}

function showHikingMap(){
  byId('hike-view').classList.add('primary');byId('road-view').classList.remove('primary');
  baseMap([68.08,13.45],9,true);
  const bounds=[];
  state.activities.forEach((a,i)=>{const lat=Number(a[6]),lon=Number(a[7]);if(Number.isFinite(lat)&&Number.isFinite(lon)){bounds.push([lat,lon]);L.marker([lat,lon],{icon:numberedIcon(i+1,'hike')}).addTo(leafletMap).bindPopup(`<b>${esc(a[0])}</b><br>${esc(a[2])} · ${esc(a[3])}<br>${esc(a[4])}<br>Paddy : ${esc(a[5])}`)}});
  if(state.gps.points.length>1){const pts=state.gps.points.map(p=>[p.lat,p.lon]);L.polyline(pts,{weight:4}).addTo(leafletMap);bounds.push(...pts)}
  if(bounds.length)leafletMap.fitBounds(bounds,{padding:[25,25],maxZoom:11});
  byId('map-summary').innerHTML=`<div><strong>${state.activities.length}</strong><span>activités familiales</span></div><div><strong>${state.olivier.length}</strong><span>options sportives</span></div><div><strong>${state.gps.points.length}</strong><span>points GPS enregistrés</span></div>`;
  byId('route-status').textContent='Fond topographique OpenTopoMap. Vérifier chaque sentier sur UT.no et les conditions terrain.';
  byId('map-legend').innerHTML=`<span><i class="dot-hike"></i>Activités et points de départ</span><span>Le fond topographique aide à lire le relief, mais ne remplace pas la vérification UT.no, météo et conditions terrain.</span><a target="_blank" rel="noopener" href="https://ut.no/">Ouvrir UT.no ↗</a>`;
}

function specTable(rows){return `<dl class="spec-list">${rows.map(([k,v])=>`<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>`}

function renderVanEnhanced(){
  const meter=(label,key,max=100)=>`<div class="card"><div class="range-row"><b>${label}</b><input data-vankey="${key}" type="range" min="0" max="${max}" value="${state.van[key]}"><output>${state.van[key]}%</output></div></div>`;
  byId('app').innerHTML=`
    <div class="grid">${meter('Carburant','fuel')}${meter('Eau propre','water')}${meter('Eaux grises','grey')}${meter('Batterie','battery')}</div>
    <section class="card" style="margin-top:12px"><div class="form"><label>Toilettes<select id="toilet"><option>OK</option><option>À vider</option><option>À traiter</option></select></label><label>Action suivante<input id="van-next" value="${esc(state.van.next)}"></label></div><button id="save-van" class="primary">Enregistrer</button></section>
    <section class="card van-profile"><div class="map-heading"><div><h2>Cozy Cottage — fiche véhicule</h2><p class="muted">Caractéristiques officielles de la catégorie. Le constructeur et certains détails peuvent varier selon le véhicule remis à Champlan.</p></div><span class="van-badge">3 places · 2+1 couchages</span></div><div class="spec-grid">${VAN_SPEC_GROUPS.map(([title,rows])=>`<section><h3>${esc(title)}</h3>${specTable(rows)}</section>`).join('')}</div></section>
    <section class="card"><h2>Réservation et prise en charge</h2><div class="booking-grid">${BOOKING_DETAILS.map(([k,v])=>`<div><span>${esc(k)}</span><strong>${esc(v)}</strong></div>`).join('')}</div><div class="status warning"><b>Documents originaux à emporter :</b> confirmation de réservation, pièce d’identité, permis de chaque conducteur et carte de crédit pour la caution.</div></section>
    <section class="card"><h2>Charge utile — point critique</h2><p>Charge utile annoncée : <b>260 kg</b>, après plein de carburant, équipement camping de base et conducteur de 75 kg. Un réservoir d’eau propre plein représente environ <b>95 kg</b>. Passagers, Paddy, bagages, nourriture, vélos et eaux stockées doivent rester dans la marge disponible.</p><p class="muted">La hauteur de 3,15 m, la largeur de 2,74 m avec rétroviseurs et la longueur pouvant atteindre 7,80 m avec porte-vélos déplié doivent être prises en compte pour tunnels, parkings, ferries et routes étroites.</p></section>`;
  byId('toilet').value=state.van.toilet;
  document.querySelectorAll('[data-vankey]').forEach(r=>r.oninput=()=>r.nextElementSibling.value=r.value+'%');
  byId('save-van').onclick=()=>{document.querySelectorAll('[data-vankey]').forEach(r=>state.van[r.dataset.vankey]=+r.value);state.van.toilet=byId('toilet').value;state.van.next=byId('van-next').value;save();autoSync();renderVanEnhanced()};
}

function renderLinks(){
  byId('app').innerHTML=`<section class="card"><h2>Liens utiles</h2><p class="muted">Ressources pratiques à consulter avant et pendant le voyage. Les services officiels sont privilégiés.</p><div class="links-grid">${USEFUL_LINKS.map(([cat,items])=>`<section class="link-group"><h3>${esc(cat)}</h3>${items.map(([name,desc,url])=>`<a class="useful-link" href="${url}" target="_blank" rel="noopener"><span><b>${esc(name)}</b><small>${esc(desc)}</small></span><strong>↗</strong></a>`).join('')}</section>`).join('')}</div></section>`;
}

const originalInit=init;
init=function(){
  if(!tabs.some(t=>t[0]==='links'))tabs.splice(tabs.length-1,0,['links','Liens utiles']);
  originalInit();
};

show=function(id){
  active=id;
  document.querySelectorAll('#nav button').forEach(b=>b.classList.toggle('active',b.dataset.tab===id));
  const views={dashboard:renderDashboard,itinerary:renderItinerary,family:renderFamily,map:renderMapEnhanced,van:renderVanEnhanced,journal:renderJournal,budget:renderBudget,assistant:renderAssistant,links:renderLinks,sync:renderSync};
  (views[id]||renderDashboard)();
};