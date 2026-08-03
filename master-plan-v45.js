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
    ['04/09','Moskenes Camping','Saltstraumen Camping',45,6,'Retour Norvège','Ferry Moskenes–Bodø puis Saltstraumen',''],
    ['05/09','Saltstraumen Camping','Topcamp Mosjøen',360,6,'Retour Norvège','E6 plein sud',''],
    ['06/09','Topcamp Mosjøen','Øysand Camping · Trondheim',390,6.2,'Retour Norvège','E6 vers Trondheim',''],
    ['07/09','Øysand Camping','Lillehammer Camping',375,5.4,'Retour Norvège','Dovrefjell et Gudbrandsdalen',''],
    ['08/09','Lillehammer Camping','Hirtshals Camping',300,9.5,'Route + ferry','Larvik–Hirtshals',''],
    ['09/09','Hirtshals Camping','Campingplatz Münster',830,9,'Très soutenue','Danemark puis Allemagne',''],
    ['10/09','Campingplatz Münster','Maison · Chevreuse',690,8,'IMPÉRATIF','Dormir à la maison, même tard',''],
    ['11/09','Chevreuse','Roadsurfer · Champlan',25,0.7,'Restitution','Nettoyage matin, restitution avant 17 h','']
  ];
  const WAYPOINTS=[
    ['Chevreuse',48.706,2.038],['Nuit 1',53.7,9.9],['Nuit 2',57.9,14.3],['Forsgården',60.675,17.074],['Nuit 4',64.5,20.5],['Abisko',68.354,18.832],['Hov Camping',68.341,14.117],['Uttakleiv',68.209,13.507],['Lofoten Beach Camp',68.089,13.236],['Moskenes Camping',67.901,13.046],['Bodø',67.280,14.405],['Saltstraumen',67.235,14.621],['Mosjøen',65.834,13.220],['Øysand',63.321,10.172],['Lillehammer',61.115,10.466],['Larvik',59.052,10.035],['Hirtshals',57.594,9.959],['Münster',51.962,7.625],['Chevreuse',48.706,2.038],['Champlan',48.708,2.279]
  ];

  function seed(){
    if(typeof state==='undefined')return;
    state.itinerary=JSON.parse(JSON.stringify(ITINERARY));
    state.meta.return='11/09/2026 17:00';
    state.meta.to='Roadsurfer · Champlan';
    state.returnConstraint={route:'Retour par la Norvège',homeArrival:'10/09/2026 soir',cleaning:'11/09/2026 matin',handover:'11/09/2026 avant 17:00'};
    if(typeof save==='function')save();
  }

  function constraintCard(){return `<section class="card" style="margin-bottom:12px;border:2px solid #b45309"><p class="eyebrow">CONTRAINTE NON NÉGOCIABLE</p><h2>Retour par la Norvège · maison le 10 septembre</h2><div class="grid"><div><b>4–8 septembre</b><p>Moskenes–Bodø, E6 par Mosjøen, Trondheim et Lillehammer, puis ferry Larvik–Hirtshals.</p></div><div><b>10 septembre</b><p>Arrivée à la maison, même tardive. Aucune nuit intermédiaire autorisée.</p></div><div><b>11 septembre</b><p>Nettoyage le matin puis restitution Roadsurfer à Champlan avant 17 h.</p></div></div></section>`}

  function install(){
    seed();
    if(typeof renderDashboard==='function'){
      const baseDashboard=window.renderDashboard;
      window.renderDashboard=function(){baseDashboard();const app=document.getElementById('app');if(app)app.insertAdjacentHTML('afterbegin',constraintCard());};
    }
    if(typeof renderMap==='function'){
      window.renderMap=function(){
        byId('app').innerHTML=`<section class="card"><h2>Itinéraire complet · retour par la Norvège</h2><p class="muted">La ligne suit les grandes étapes du voyage, y compris Moskenes–Bodø et Larvik–Hirtshals.</p><div id="map-canvas" class="map"></div></section>`;
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