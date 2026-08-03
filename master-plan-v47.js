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
    ['04/09','Moskenes Camping','Nikkaluokta Sarri',570,9.6,'Retour zéro ferry','Terminus routier au pied du Kebnekaise · silence 5/5',''],
    ['05/09','Nikkaluokta','Camp Gielas · Premium Lake',430,6.5,'Retour zéro ferry','Emplacement lac et forêt lapone',''],
    ['06/09','Camp Gielas','Yttervik · Ranfjord',355,5.5,'Retour Norvège','Fjord, montagnes et récupération',''],
    ['07/09','Yttervik','Tråsåvika Camping',500,8,'Retour Norvège','Plage privée sur le Trondheimsfjord',''],
    ['08/09','Tråsåvika','Larkollen Camping',590,9.1,'Très soutenue','Oslofjord et vraie coupure après l’E6',''],
    ['09/09','Larkollen Camping','Campingpark Südheide',1040,11.8,'IMPÉRATIF','Ponts uniquement · parc canin et calme nocturne',''],
    ['10/09','Campingpark Südheide','Maison · Chevreuse',820,9.2,'IMPÉRATIF','Dormir à la maison, même tard',''],
    ['11/09','Chevreuse','Roadsurfer · Champlan',25,0.7,'Restitution','Nettoyage matin, restitution avant 17 h','']
  ];

  const WAYPOINTS=[
    ['Chevreuse',48.706,2.038],['Nuit 1',53.7,9.9],['Nuit 2',57.9,14.3],['Forsgården',60.675,17.074],['Nuit 4',64.5,20.5],['Abisko',68.354,18.832],['Hov Camping',68.341,14.117],['Uttakleiv',68.209,13.507],['Lofoten Beach Camp',68.089,13.236],['Moskenes Camping',67.901,13.046],['Narvik',68.438,17.427],['Nikkaluokta',67.851,19.013],['Camp Gielas',65.591,19.185],['Yttervik',66.17,13.98],['Tråsåvika',63.31,9.89],['Larkollen',59.33,10.67],['Malmö',55.605,13.003],['Copenhague',55.676,12.568],['Campingpark Südheide',52.672,9.936],['Chevreuse',48.706,2.038],['Champlan',48.708,2.279]
  ];

  function seed(){
    if(typeof state==='undefined')return;
    state.itinerary=JSON.parse(JSON.stringify(ITINERARY));
    state.meta.return='11/09/2026 17:00';
    state.meta.to='Roadsurfer · Champlan';
    state.returnConstraint={route:'Zéro ferry · nuits exceptionnelles et silencieuses',homeArrival:'10/09/2026 soir',cleaning:'11/09/2026 matin',handover:'11/09/2026 avant 17:00',paddy:'Priorité absolue au calme et à une promenade facile après chaque longue étape'};
    if(typeof save==='function')save();
  }

  function constraintCard(){
    return `<section class="card" style="margin-bottom:12px;border:2px solid #b45309"><p class="eyebrow">CONTRAINTE NON NÉGOCIABLE</p><h2>Zéro ferry · maison le 10 · nuits calmes pour Paddy</h2><div class="grid"><div><b>4–8 septembre</b><p>Chaque nuit est désormais une destination de récupération: montagne, lac, fjord ou mer, loin des parkings urbains.</p></div><div><b>9 septembre</b><p>Très longue conduite jusqu’à Südheide pour obtenir un camping silencieux avec parc canin et réduire la dernière étape.</p></div><div><b>10–11 septembre</b><p>Maison à Chevreuse le 10; nettoyage le 11 matin puis restitution à Champlan avant 17 h.</p></div></div></section>`;
  }

  function install(){
    seed();
    if(typeof renderDashboard==='function'){
      const baseDashboard=window.renderDashboard;
      window.renderDashboard=function(){baseDashboard();const app=document.getElementById('app');if(app)app.insertAdjacentHTML('afterbegin',constraintCard());};
    }
    if(typeof renderMap==='function'){
      window.renderMap=function(){
        byId('app').innerHTML=`<section class="card"><h2>Itinéraire complet · zéro ferry · nuits exceptionnelles</h2><p class="muted">Le retour reste entièrement routier mais évite désormais les campings urbains: Nikkaluokta, lac Gielas, Ranfjord, Trondheimsfjord, Oslofjord et Südheide.</p><div id="map-canvas" class="map"></div></section>`;
        setTimeout(()=>{
          if(typeof L==='undefined')return;
          if(window.leafletMap){try{window.leafletMap.remove();}catch(e){}}
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