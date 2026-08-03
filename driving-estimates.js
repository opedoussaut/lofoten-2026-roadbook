'use strict';

(function installDrivingEstimates(){
  const LEGS=[
    {date:'25/08',from:'Saint-Rémy-lès-Chevreuse',to:'Park4Night #53279',km:900,time:'9 h 30–10 h 30',note:'hors pauses'},
    {date:'26/08',from:'Park4Night #53279',to:'Park4Night #84058',km:620,time:'7 h 30–8 h 30',note:'ponts et trafic danois/suédois possibles'},
    {date:'27/08',from:'Park4Night #84058',to:'Forsgården #188958',km:435,time:'5 h 30–6 h',note:'hors pauses'},
    {date:'28/08',from:'Forsgården #188958',to:'Park4Night #140798',km:500,time:'5 h 45–6 h 30',note:'hors pauses'},
    {date:'29/08',from:'Park4Night #140798',to:'Abisko Mountain Lodge',km:690,time:'8 h–8 h 45',note:'longue journée; ravitaillement avant la Laponie'},
    {date:'30/08',from:'Abisko Mountain Lodge',to:'Hov Camping, Gimsøy',km:355,time:'5 h–5 h 45',note:'Narvik puis E10; nombreux arrêts panoramiques possibles'},
    {date:'31/08',from:'Hov Camping',to:'Hov Camping',km:0,time:'0 h',note:'journée locale; kilomètres d’excursion non inclus'},
    {date:'01/09',from:'Hov Camping',to:'Uttakleiv',km:80,time:'1 h 30–1 h 45',note:'route lente et arrêts photo'},
    {date:'02/09',from:'Uttakleiv',to:'Lofoten Beach Camp, Skagsanden',km:55,time:'1 h–1 h 15',note:'hors détours Unstad/Vikten'},
    {date:'03/09',from:'Lofoten Beach Camp',to:'Moskenes Camping',km:50,time:'1 h–1 h 15',note:'hors visites Nusfjord, Hamnøy et Reine'},
    {date:'04/09',from:'Moskenes Camping',to:'Moskenes Camping',km:0,time:'0 h',note:'journée locale; excursions non incluses'},
    {date:'05/09',from:'Moskenes Camping',to:'Saltstraumen Camping',km:45,time:'4 h 30–5 h 30',note:'inclut environ 3 h 15 de ferry Moskenes–Bodø, hors attente'},
    {date:'06/09',from:'Saltstraumen Camping',to:'Storvika',km:115,time:'2 h 30–3 h 30',note:'route 17, arrêts panoramiques et horaires de ferry à ajouter'},
    {date:'07/09',from:'Storvika',to:'Topcamp Havblikk, Nesna',km:175,time:'4 h 30–5 h 30',note:'plusieurs ferries; marge indispensable'},
    {date:'08/09',from:'Nesna',to:'Région de Trondheim',km:480,time:'7 h 30–8 h 30',note:'estimation selon ferries et itinéraire choisi'},
    {date:'09/09',from:'Région de Trondheim',to:'Sjoa Camping',km:285,time:'4 h 15–4 h 45',note:'E6 et Dovrefjell'},
    {date:'10/09',from:'Sjoa Camping',to:'Ställplats Lerum',km:515,time:'6 h 45–7 h 30',note:'via Oslo; trafic possible'},
    {date:'11/09',from:'Ställplats Lerum',to:'Champlan / restitution 17 h',km:1320,time:'14 h–15 h 30',note:'ALERTE: irréaliste en une seule journée avec restitution à 17 h'}
  ];

  function html(){
    const total=LEGS.reduce((sum,l)=>sum+l.km,0);
    return `<section class="card driving-estimates"><div class="nightly-options-heading"><div><p class="eyebrow">CONDUITE ENTRE LES CHOIX PRÉFÉRÉS</p><h2>Distances et temps estimés</h2></div><p class="muted">≈ ${total.toLocaleString('fr-FR')} km hors excursions locales</p></div><div class="table-wrap"><table><thead><tr><th>Date</th><th>Départ</th><th>Arrivée</th><th>Distance</th><th>Conduite</th><th>Remarque</th></tr></thead><tbody>${LEGS.map(l=>`<tr${l.date==='11/09'?' class="danger-row"':''}><td>${esc(l.date)}</td><td>${esc(l.from)}</td><td>${esc(l.to)}</td><td><b>≈ ${l.km} km</b></td><td><b>${esc(l.time)}</b></td><td>${esc(l.note)}</td></tr>`).join('')}</tbody></table></div><div class="popup-warning"><b>Ordres de grandeur :</b> ces durées excluent les pauses, ravitaillements, promenades avec Paddy et la plupart des attentes de ferry. La route 17 peut facilement ajouter 1 à 2 heures à une journée.</div></section>`;
  }

  function install(){
    if(typeof renderItinerary!=='function')return;
    const base=window.renderItinerary;
    window.renderItinerary=function(){base();const app=document.getElementById('app');if(app)app.insertAdjacentHTML('afterbegin',html());};
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
