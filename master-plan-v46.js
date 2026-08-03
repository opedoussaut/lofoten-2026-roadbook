'use strict';

(function applyMasterPlan(){
  const ITINERARY=[
    ['25/08','Chevreuse','Park4Night #53279',900,10,'Transit','Nuit 1 confirmée',''],
    ['26/08','Park4Night #53279','Park4Night #84058',620,8,'Transit','Nuit 2 confirmée',''],
    ['27/08','Park4Night #84058','Forsgården #188958',435,5.8,'Transit','Rivière et petite aire',''],
    ['28/08','Forsgården #188958','Park4Night #140798',500,6.2,'Transit','Remontée vers le nord',''],
    ['29/08','Park4Night #140798','Abisko Mountain Lodge',690,8.5,'Soutenue','Laponie et nuit lodge',''],
    ['30/08','Abisko','Hov Camping · Gimsøy',355,5.5,'Lofoten','Arrivée spectaculaire aux Lofoten',''],
    ['31/08','Hov Camping','Hov Camping',0,0,'Lofoten','Henningsvær et plages Est',''],
    ['01/09','Hov Camping','Uttakleiv',80,1.7,'Lofoten','Nuit signature',''],
    ['02/09','Uttakleiv','Lofoten Beach Camp',55,1.2,'Lofoten','Vikten MUST DO et Flakstad',''],
    ['03/09','Lofoten Beach Camp','Moskenes Camping',50,1.2,'Lofoten','Nusfjord, Reine, Hamnøy, Å',''],
    ['04/09','Moskenes Camping','Camp Ripan · Kiruna',503,8.2,'Retour zéro ferry','E10 via Narvik puis Suède',''],
    ['05/09','Kiruna','Camp Gielas · Arvidsjaur',366,5.2,'Retour zéro ferry','Gällivare et Jokkmokk',''],
    ['06/09','Arvidsjaur','Mo Camping · Mo i Rana',338,5.1,'Retour Norvège','E12 et retour en Norvège',''],
    ['07/09','Mo i Rana','Øysand Camping · Trondheim sud',470,7.5,'Retour Norvège','E6 par Saltfjellet et Mosjøen',''],
    ['08/09','Øysand Camping','Utne Camping · Sarpsborg',568,8.5,'Très soutenue','Dovrefjell, Lillehammer, Oslo',''],
    ['09/09','Sarpsborg','Wohnmobilhafen Hamburg Süd',720,9.8,'Très soutenue','Ponts Øresund et Grand Belt, aucun ferry',''],
    ['10/09','Hambourg','Maison · Chevreuse',913,10.2,'IMPÉRATIF','Dormir à la maison, même tard',''],
    ['11/09','Chevreuse','Roadsurfer · Champlan',25,0.7,'Restitution','Nettoyage matin, restitution avant 17 h','']
  ];
  const WAYPOINTS=[
    ['Chevreuse',48.706,2.038],['Nuit 1',53.7,9.9],['Nuit 2',57.9,14.3],['Forsgården',60.675,17.074],['Nuit 4',64.5,20.5],['Abisko',68.354,18.832],['Hov Camping',68.341,14.117],['Uttakleiv',68.209,13.507],['Lofoten Beach Camp',68.089,13.236],['Moskenes Camping',67.901,13.046],['Narvik',68.438,17.427],['Kiruna',67.855,20.225],['Arvidsjaur',65.591,19.185],['Mo i Rana',66.312,14.142],['Øysand',63.321,10.172],['Sarpsborg',59.284,11.109],['Malmö',55.605,13.003],['Copenhague',55.676,12.568],['Hambourg',53.551,9.994],['Chevreuse',48.706,2.038],['Champlan',48.708,2.279]
  ];

  function seed(){
    if(typeof state==='undefined')return;
    state.itinerary=JSON.parse(JSON.stringify(ITINERARY));
    state.meta.return='11/09/2026 17:00';
    state.meta.to='Roadsurfer · Champlan';
    state.returnConstraint={route:'Zéro ferry · détour Kiruna/Arvidsjaur · retour en Norvège à Mo i Rana',homeArrival:'10/09/2026 soir',cleaning:'11/09/2026 matin',handover:'11/09/2026 avant 17:00'};
    if(typeof save==='function')save();
  }

  function constraintCard(){return `<section class="card" style="margin-bottom:12px;border:2px solid #b45309"><p class="eyebrow">CONTRAINTE NON NÉGOCIABLE</p><h2>Zéro ferry · maison le 10 septembre</h2><div class="grid"><div><b>4–6 septembre</b><p>Détour routier par Narvik, Kiruna et Arvidsjaur, car l’E6 traverse le Tysfjord par ferry.</p></div><div><b>6–9 septembre</b><p>Retour en Norvège à Mo i Rana, puis E6 par Trondheim, Oslo et Sarpsborg.</p></div><div><b>10–11 septembre</b><p>Maison à Chevreuse le 10; nettoyage le 11 matin puis restitution à Champlan avant 17 h.</p></div></div></section>`}

  function install(){
    seed();
    if(typeof renderDashboard==='function'){
      const baseDashboard=window.renderDashboard;
      window.renderDashboard=function(){baseDashboard();const app=document.getElementById('app');if(app)app.insertAdjacentHTML('afterbegin',constraintCard());};
    }
    if(typeof renderMap==='function'){
      window.renderMap=function(){
        byId('app').innerHTML=`<section class="card"><h2>Itinéraire complet · zéro ferry</h2><p class="muted">La ligne montre le détour obligatoire par la Suède au nord, le retour en Norvège à Mo i Rana, puis la sortie de Scandinavie uniquement par les ponts.</p><div id="map-canvas" class="map"></div></section>`;
        setTimeout(()=>{
          if(typeof L==='undefined')return;
          if(window.leafletMap){try{window.leafletMap.remove()}catch(e){}}
          window.leafletMap=L.map('map-canvas').setView([60,10],4);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© OpenStreetMap'}).addTo(window.leafletMap);
          const pts=WAYPOINTS.map(w=>[w[1],w[2]]);
          L.polyline(pts,{weight:4}).addTo(window.leafletMap);
          WAYPOINTS.forEach((w,i)=>L.marker([w[1],w[2]]).addTo(window.leafletMap).bindPopup(`<b>${i}. ${esc(w[0])}</b>`));
          window.leafletMap.fitBounds(pts,{padding:[20,20]});
        },0);
      };
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();