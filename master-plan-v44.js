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
    ['04/09','Moskenes Camping','Lapphaugen / Narvik',330,5.5,'Retour','Début du retour par E10',''],
    ['05/09','Lapphaugen','Arvidsjaur',600,8,'Retour','Transit lapon',''],
    ['06/09','Arvidsjaur','Östersund',590,7.5,'Retour','Storsjöstrand',''],
    ['07/09','Östersund','Karlstad',570,7.2,'Retour','Lac Vänern',''],
    ['08/09','Karlstad','Lüneburg / Hambourg sud',780,9.3,'Très soutenue','Suède, Danemark, Allemagne',''],
    ['09/09','Lüneburg','Kessenich · Belgique',480,5.8,'Retour','Dernière nuit en route',''],
    ['10/09','Kessenich','Maison · Chevreuse',430,5.5,'IMPÉRATIF','Dormir à la maison, même tard',''],
    ['11/09','Chevreuse','Roadsurfer · Champlan',25,0.7,'Restitution','Nettoyage matin, restitution avant 17 h','']
  ];
  const WAYPOINTS=[
    ['Chevreuse',48.706,2.038],['Nuit 1',53.7,9.9],['Nuit 2',57.9,14.3],['Forsgården',60.675,17.074],['Nuit 4',64.5,20.5],['Abisko',68.354,18.832],['Hov Camping',68.341,14.117],['Uttakleiv',68.209,13.507],['Lofoten Beach Camp',68.089,13.236],['Moskenes Camping',67.901,13.046],['Lapphaugen',68.5,17.8],['Arvidsjaur',65.591,19.185],['Östersund',63.179,14.635],['Karlstad',59.38,13.50],['Lüneburg',53.248,10.414],['Kessenich',51.151,5.819],['Chevreuse',48.706,2.038],['Champlan',48.708,2.279]
  ];

  function seed(){
    if(typeof state==='undefined')return;
    state.itinerary=JSON.parse(JSON.stringify(ITINERARY));
    state.meta.return='11/09/2026 17:00';
    state.meta.to='Roadsurfer · Champlan';
    state.returnConstraint={homeArrival:'10/09/2026 soir',cleaning:'11/09/2026 matin',handover:'11/09/2026 avant 17:00'};
    if(typeof save==='function')save();
  }

  function constraintCard(){return `<section class="card" style="margin-bottom:12px;border:2px solid #b45309"><p class="eyebrow">CONTRAINTE NON NÉGOCIABLE</p><h2>Maison à Chevreuse le 10 septembre</h2><div class="grid"><div><b>10 septembre</b><p>Arrivée à la maison, même tardive. Aucune nuit intermédiaire autorisée.</p></div><div><b>11 septembre matin</b><p>Nettoyage intérieur/extérieur, vidanges, plein, inventaire et photos.</p></div><div><b>11 septembre avant 17 h</b><p>Restitution Roadsurfer à Champlan avec marge de sécurité.</p></div></div></section>`}

  function install(){
    seed();
    if(typeof renderDashboard==='function'){
      const baseDashboard=window.renderDashboard;
      window.renderDashboard=function(){baseDashboard();const app=document.getElementById('app');if(app)app.insertAdjacentHTML('afterbegin',constraintCard());};
    }
    if(typeof renderMap==='function'){
      window.renderMap=function(){
        byId('app').innerHTML=`<section class="card"><h2>Itinéraire révisé complet</h2><p class="muted">La ligne suit les grandes étapes du voyage. Les distances routières détaillées figurent dans l’onglet Itinéraire.</p><div id="map-canvas" class="map"></div></section>`;
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