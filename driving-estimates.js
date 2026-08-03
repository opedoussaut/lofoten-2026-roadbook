'use strict';

(function installDrivingEstimates(){
  const LEGS=[
    {date:'25/08',from:'Chevreuse',to:'Park4Night #53279',km:900,time:'9 h 30–10 h 30',level:'very-long',note:'Départ très tôt. Ajouter les pauses et la promenade de Paddy.',recovery:'Nuit confirmée.'},
    {date:'26/08',from:'Park4Night #53279',to:'Park4Night #84058',km:620,time:'7 h 30–8 h 30',level:'long',note:'Ponts danois et circulation possibles.',recovery:'Nuit confirmée.'},
    {date:'27/08',from:'Park4Night #84058',to:'Forsgården #188958',km:435,time:'5 h 30–6 h',level:'normal',note:'Étape raisonnable.',recovery:'Rivière et petite aire.'},
    {date:'28/08',from:'Forsgården #188958',to:'Park4Night #140798',km:500,time:'5 h 45–6 h 30',level:'normal',note:'E4 vers le nord.',recovery:'Nuit confirmée.'},
    {date:'29/08',from:'Park4Night #140798',to:'Abisko Mountain Lodge',km:690,time:'8 h–8 h 45',level:'long',note:'Longue traversée de Laponie; ravitailler avant les secteurs isolés.',recovery:'Lodge et vraie récupération.'},
    {date:'30/08',from:'Abisko Mountain Lodge',to:'Hov Camping',km:355,time:'5 h–5 h 45',level:'normal',note:'Narvik puis E10, sans compter les arrêts panoramiques.',recovery:'Plage arctique.'},
    {date:'31/08',from:'Hov Camping',to:'Hov Camping',km:0,time:'Journée locale',level:'local',note:'Henningsvær et plages de l’est.',recovery:'Deuxième nuit sans refaire le camp.'},
    {date:'01/09',from:'Hov Camping',to:'Uttakleiv',km:80,time:'1 h 30–1 h 45',level:'short',note:'Route lente et arrêts photo.',recovery:'Nuit signature.'},
    {date:'02/09',from:'Uttakleiv',to:'Lofoten Beach Camp',km:55,time:'1 h–1 h 15',level:'short',note:'Le détour MUST DO de Vikten #60765 peut ajouter du temps.',recovery:'Plage et services.'},
    {date:'03/09',from:'Lofoten Beach Camp',to:'Moskenes Camping',km:50,time:'1 h–1 h 15',level:'short',note:'Garder la journée pour Nusfjord, Ramberg, Hamnøy et Reine.',recovery:'Vestfjord.'},

    {date:'04/09',from:'Moskenes Camping',to:'Nikkaluokta Sarri',km:570,time:'9 h–10 h 15',level:'very-long',note:'E10 par Svolvær, Narvik et Kiruna, puis route de montagne jusqu’au terminus de Nikkaluokta. Zéro ferry.',recovery:'Silence arctique 5/5 · courte marche avec Paddy au pied du Kebnekaise.'},
    {date:'05/09',from:'Nikkaluokta',to:'Camp Gielas · Arvidsjaur',km:430,time:'6 h–7 h',level:'long',note:'Retour vers Kiruna puis E10/E45 par Gällivare et Jokkmokk.',recovery:'Réserver Premium Lake, loin de l’entrée et des équipements.'},
    {date:'06/09',from:'Camp Gielas',to:'Yttervik · Ranfjord',km:355,time:'5 h–6 h',level:'normal',note:'Route 95, E45 puis E12; retour en Norvège par Umbukta.',recovery:'Fjord + montagne · calme 5/5 · promenade lente au bord de l’eau.'},
    {date:'07/09',from:'Yttervik',to:'Tråsåvika Camping',km:500,time:'7 h 30–8 h 30',level:'long',note:'E6 plein sud par Mosjøen, Grong et Trondheim, puis détour court vers le fjord.',recovery:'Plage privée et sentiers voisins · calme 4,5/5.'},
    {date:'08/09',from:'Tråsåvika',to:'Larkollen Camping',km:590,time:'8 h 30–9 h 45',level:'very-long',note:'E6 par Dovrefjell, Lillehammer et Oslo; prévoir le trafic autour de la capitale.',recovery:'Oslofjord, mer et rupture complète avec l’autoroute.'},
    {date:'09/09',from:'Larkollen Camping',to:'Campingpark Südheide',km:1040,time:'11 h–12 h 30',level:'critical',note:'Très longue étape sans ferry: Suède, pont de l’Øresund, Grand Belt, Jutland puis nord de l’Allemagne. Départ vers 05 h 30–06 h.',recovery:'Calme obligatoire 22 h–7 h, parc canin clôturé, douche pour chien et rivière.'},
    {date:'10/09',from:'Campingpark Südheide',to:'Maison · Chevreuse',km:820,time:'8 h 30–10 h',level:'critical',note:'Départ très tôt. ARRIVÉE OBLIGATOIRE À LA MAISON, même tardive.',recovery:'Nuit à la maison; aucune autre étape.'},
    {date:'11/09',from:'Maison · Chevreuse',to:'Roadsurfer · Champlan',km:25,time:'30–45 min',level:'handover',note:'Matin: nettoyage, vidanges, plein, inventaire et photos. Restitution avant 17 h.',recovery:'Fin du voyage.'}
  ];

  function badge(level){return ({'very-long':'Très longue','long':'Longue','normal':'Normale','short':'Courte','local':'Locale','critical':'IMPÉRATIF','handover':'Restitution'})[level]||level;}
  function html(){
    const travel=LEGS.filter(l=>l.date!=='11/09').reduce((s,l)=>s+l.km,0);
    return `<section class="card driving-estimates"><div class="nightly-options-heading"><div><p class="eyebrow">PLAN DE CONDUITE · ZÉRO FERRY</p><h2>Longues routes, nuits réellement réparatrices</h2></div><p class="muted">≈ ${travel.toLocaleString('fr-FR')} km routiers hors excursions locales</p></div><div class="popup-warning"><b>Principe du retour :</b> chaque étape de nuit a été déplacée vers un site exceptionnel et calme. La contrepartie est une très longue journée le 9 septembre afin de préserver l’arrivée à Chevreuse le 10 au soir.</div><div class="table-wrap"><table><thead><tr><th>Date</th><th>Départ</th><th>Arrivée</th><th>Distance</th><th>Conduite</th><th>Niveau</th><th>Route</th><th>Récupération / Paddy</th></tr></thead><tbody>${LEGS.map(l=>`<tr class="${l.level==='critical'?'danger-row':''}"><td>${esc(l.date)}</td><td>${esc(l.from)}</td><td><b>${esc(l.to)}</b></td><td>≈ ${l.km} km</td><td>${esc(l.time)}</td><td>${esc(badge(l.level))}</td><td>${esc(l.note)}</td><td>${esc(l.recovery)}</td></tr>`).join('')}</tbody></table></div><p class="muted">Estimations prudentes pour un camping-car. Elles excluent les pauses longues, travaux, trafic, ravitaillements et promenades. Les 4, 8, 9 et 10 septembre nécessitent une discipline horaire stricte.</p></section>`;
  }
  function install(){if(typeof renderItinerary!=='function')return;const base=window.renderItinerary;window.renderItinerary=function(){base();const app=document.getElementById('app');if(app)app.insertAdjacentHTML('afterbegin',html());};}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();