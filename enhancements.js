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
        <div><h2>Cartes du voyage</h2><p class="muted">Roadmap complète et carte topographique pour les randonnées.</p></div>
        <div class="map-tabs"><button id="road-view" class="primary">🚐 Roadmap</button><button id="hike-view">🥾 Randonnée</button></div>
      </div>
      <div id="map-summary" class="map-summary"></div>
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

function showRoadMap(){
  byId('road-view').classList.add('primary');byId('hike-view').classList.remove('primary');
  baseMap([59.8,11.5],4,false);
  const route=ROADBOOK_WAYPOINTS.map(x=>[x[1],x[2]]);
  L.polyline(route,{weight:5,opacity:.8,dashArray:'10 7'}).addTo(leafletMap);
  ROADBOOK_WAYPOINTS.forEach((p,i)=>L.marker([p[1],p[2]],{icon:numberedIcon(i+1)}).addTo(leafletMap).bindPopup(`<b>Étape ${i+1}</b><br>${esc(p[0])}`));
  leafletMap.fitBounds(route,{padding:[25,25]});
  const planned=totalKm();
  byId('map-summary').innerHTML=`<div><strong>${planned.toLocaleString('fr-FR')} km</strong><span>distance planifiée</span></div><div><strong>${state.itinerary.length}</strong><span>journées de route</span></div><div><strong>${ROADBOOK_WAYPOINTS.length}</strong><span>points principaux</span></div>`;
  byId('map-legend').innerHTML=`<span><i class="line-road"></i>Route générale indicative</span><span>Les routes exactes doivent être vérifiées dans Vegvesen/OpenStreetMap avant chaque étape.</span><a target="_blank" rel="noopener" href="https://www.openstreetmap.org/directions">Ouvrir le planificateur OSM ↗</a>`;
}

function showHikingMap(){
  byId('hike-view').classList.add('primary');byId('road-view').classList.remove('primary');
  baseMap([68.08,13.45],9,true);
  const bounds=[];
  state.activities.forEach((a,i)=>{const lat=Number(a[6]),lon=Number(a[7]);if(Number.isFinite(lat)&&Number.isFinite(lon)){bounds.push([lat,lon]);L.marker([lat,lon],{icon:numberedIcon(i+1,'hike')}).addTo(leafletMap).bindPopup(`<b>${esc(a[0])}</b><br>${esc(a[2])} · ${esc(a[3])}<br>${esc(a[4])}<br>Paddy : ${esc(a[5])}`)}});
  if(state.gps.points.length>1){const pts=state.gps.points.map(p=>[p.lat,p.lon]);L.polyline(pts,{weight:4}).addTo(leafletMap);bounds.push(...pts)}
  if(bounds.length)leafletMap.fitBounds(bounds,{padding:[25,25],maxZoom:11});
  byId('map-summary').innerHTML=`<div><strong>${state.activities.length}</strong><span>activités familiales</span></div><div><strong>${state.olivier.length}</strong><span>options sportives</span></div><div><strong>${state.gps.points.length}</strong><span>points GPS enregistrés</span></div>`;
  byId('map-legend').innerHTML=`<span><i class="dot-hike"></i>Activités et points de départ</span><span>Le fond topographique aide à lire le relief, mais ne remplace pas la vérification UT.no, météo et conditions terrain.</span><a target="_blank" rel="noopener" href="https://ut.no/">Ouvrir UT.no ↗</a>`;
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
  const views={dashboard:renderDashboard,itinerary:renderItinerary,family:renderFamily,map:renderMapEnhanced,van:renderVan,journal:renderJournal,budget:renderBudget,assistant:renderAssistant,links:renderLinks,sync:renderSync};
  (views[id]||renderDashboard)();
};
