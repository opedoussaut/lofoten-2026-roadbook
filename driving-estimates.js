'use strict';

(function installDrivingEstimates(){
  const LEGS=[
    {date:'25/08',from:'Chevreuse',to:'Park4Night #53279',km:900,time:'9 h 30–10 h 30',level:'very-long',note:'Départ très tôt. Ajouter les pauses et la promenade de Paddy.'},
    {date:'26/08',from:'Park4Night #53279',to:'Park4Night #84058',km:620,time:'7 h 30–8 h 30',level:'long',note:'Ponts danois et circulation possibles.'},
    {date:'27/08',from:'Park4Night #84058',to:'Forsgården #188958',km:435,time:'5 h 30–6 h',level:'normal',note:'Étape raisonnable.'},
    {date:'28/08',from:'Forsgården #188958',to:'Park4Night #140798',km:500,time:'5 h 45–6 h 30',level:'normal',note:'E4 vers le nord.'},
    {date:'29/08',from:'Park4Night #140798',to:'Abisko Mountain Lodge',km:690,time:'8 h–8 h 45',level:'long',note:'Longue traversée de Laponie; ravitailler avant les secteurs isolés.'},
    {date:'30/08',from:'Abisko Mountain Lodge',to:'Hov Camping',km:355,time:'5 h–5 h 45',level:'normal',note:'Narvik puis E10, sans compter les arrêts panoramiques.'},
    {date:'31/08',from:'Hov Camping',to:'Hov Camping',km:0,time:'Journée locale',level:'local',note:'Henningsvær et plages de l’est.'},
    {date:'01/09',from:'Hov Camping',to:'Uttakleiv',km:80,time:'1 h 30–1 h 45',level:'short',note:'Route lente et arrêts photo.'},
    {date:'02/09',from:'Uttakleiv',to:'Lofoten Beach Camp',km:55,time:'1 h–1 h 15',level:'short',note:'Le détour MUST DO de Vikten #60765 peut ajouter du temps.'},
    {date:'03/09',from:'Lofoten Beach Camp',to:'Moskenes Camping',km:50,time:'1 h–1 h 15',level:'short',note:'Garder la journée pour Nusfjord, Ramberg, Hamnøy et Reine.'},
    {date:'04/09',from:'Moskenes Camping',to:'Saltstraumen Camping',km:45,time:'5 h 30–7 h au total',level:'ferry',note:'Ferry Moskenes–Bodø ≈ 3 h 15, plus check-in, attente et trajet Bodø–Saltstraumen.'},
    {date:'05/09',from:'Saltstraumen Camping',to:'Topcamp Mosjøen',km:360,time:'5 h 30–6 h 30',level:'normal',note:'Retour plein sud par la Norvège et l’E6.'},
    {date:'06/09',from:'Mosjøen',to:'Øysand Camping · Trondheim',km:390,time:'5 h 45–6 h 30',level:'normal',note:'Étape E6, arrivée au sud de Trondheim.'},
    {date:'07/09',from:'Øysand Camping',to:'Lillehammer Camping',km:375,time:'5 h–5 h 45',level:'normal',note:'E6 par Dovrefjell et Gudbrandsdalen.'},
    {date:'08/09',from:'Lillehammer Camping',to:'Hirtshals Camping via Larvik',km:300,time:'9 h–10 h 30 au total',level:'ferry',note:'Environ 4 h de route vers Larvik, check-in 1 h avant, puis ferry Larvik–Hirtshals ≈ 3 h 45.'},
    {date:'09/09',from:'Hirtshals Camping',to:'Campingplatz Münster',km:830,time:'8 h 30–9 h 30',level:'very-long',note:'Très longue journée par le Danemark et l’Allemagne. Départ impératif tôt.'},
    {date:'10/09',from:'Münster',to:'Maison · Chevreuse',km:690,time:'7 h–8 h 30',level:'critical',note:'ARRIVÉE OBLIGATOIRE À LA MAISON, même tardive. Prévoir pauses, carburant et trafic.'},
    {date:'11/09',from:'Maison · Chevreuse',to:'Roadsurfer · Champlan',km:25,time:'30–45 min',level:'handover',note:'Matin: nettoyage, vidanges, plein, inventaire. Départ vers Champlan avec large marge avant 17 h.'}
  ];

  function badge(level){return ({'very-long':'Très longue','long':'Longue','normal':'Normale','short':'Courte','local':'Locale','critical':'IMPÉRATIF','handover':'Restitution','ferry':'Route + ferry'})[level]||level}
  function html(){const travel=LEGS.filter(l=>l.date!=='11/09').reduce((s,l)=>s+l.km,0);return `<section class="card driving-estimates"><div class="nightly-options-heading"><div><p class="eyebrow">PLAN DE CONDUITE · RETOUR PAR LA NORVÈGE</p><h2>Chevreuse le 10 septembre au soir</h2></div><p class="muted">≈ ${travel.toLocaleString('fr-FR')} km routiers hors excursions locales</p></div><div class="popup-warning"><b>Contrainte absolue :</b> dormir à la maison à Chevreuse le 10 septembre. Le retour suit la Norvège par Bodø, l’E6, Trondheim et Lillehammer, puis quitte la Norvège par Larvik.</div><div class="table-wrap"><table><thead><tr><th>Date</th><th>Départ</th><th>Arrivée</th><th>Distance</th><th>Conduite / traversée</th><th>Niveau</th><th>Remarque</th></tr></thead><tbody>${LEGS.map(l=>`<tr class="${l.level==='critical'?'danger-row':''}"><td>${esc(l.date)}</td><td>${esc(l.from)}</td><td><b>${esc(l.to)}</b></td><td>≈ ${l.km} km</td><td>${esc(l.time)}</td><td>${esc(badge(l.level))}</td><td>${esc(l.note)}</td></tr>`).join('')}</tbody></table></div><p class="muted">Les temps sont des ordres de grandeur pour un camping-car. Ils excluent les pauses, embouteillages, travaux, ravitaillements et éventuels retards de ferry. Les journées des 25 août, 29 août, 8, 9 et 10 septembre demandent une vraie discipline horaire.</p></section>`}
  function install(){if(typeof renderItinerary!=='function')return;const base=window.renderItinerary;window.renderItinerary=function(){base();const app=document.getElementById('app');if(app)app.insertAdjacentHTML('afterbegin',html());}}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();