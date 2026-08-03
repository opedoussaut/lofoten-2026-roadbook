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
    {date:'04/09',from:'Moskenes Camping',to:'Camp Ripan · Kiruna',km:503,time:'7 h 45–8 h 45',level:'long',note:'E10 par Leknes, Svolvær, Narvik et la frontière suédoise. Zéro ferry.'},
    {date:'05/09',from:'Kiruna',to:'Camp Gielas · Arvidsjaur',km:366,time:'5 h–5 h 30',level:'normal',note:'E10 puis E45 par Gällivare et Jokkmokk.'},
    {date:'06/09',from:'Arvidsjaur',to:'Mo Camping · Mo i Rana',km:338,time:'4 h 45–5 h 30',level:'normal',note:'Route 95, E45 puis E12; retour en Norvège par Umbukta.'},
    {date:'07/09',from:'Mo i Rana',to:'Øysand Camping · Trondheim sud',km:470,time:'7 h–8 h',level:'long',note:'E6 plein sud, passage du Saltfjellet puis Mosjøen et Grong.'},
    {date:'08/09',from:'Øysand Camping',to:'Utne Camping · Sarpsborg',km:568,time:'8 h–9 h',level:'long',note:'Très longue traversée norvégienne par Dovrefjell, Lillehammer et Oslo.'},
    {date:'09/09',from:'Sarpsborg',to:'Wohnmobilhafen Hamburg Süd',km:720,time:'9 h–10 h 30',level:'very-long',note:'Aucun ferry: E6 vers Göteborg et Malmö, pont de l’Øresund, pont du Grand Belt puis Jutland.'},
    {date:'10/09',from:'Hambourg',to:'Maison · Chevreuse',km:913,time:'9 h 30–11 h',level:'critical',note:'ARRIVÉE OBLIGATOIRE À LA MAISON, même tardive. Départ très tôt et pauses courtes.'},
    {date:'11/09',from:'Maison · Chevreuse',to:'Roadsurfer · Champlan',km:25,time:'30–45 min',level:'handover',note:'Matin: nettoyage, vidanges, plein, inventaire et photos. Restitution avant 17 h.'}
  ];

  function badge(level){return ({'very-long':'Très longue','long':'Longue','normal':'Normale','short':'Courte','local':'Locale','critical':'IMPÉRATIF','handover':'Restitution'})[level]||level}
  function html(){const travel=LEGS.filter(l=>l.date!=='11/09').reduce((s,l)=>s+l.km,0);return `<section class="card driving-estimates"><div class="nightly-options-heading"><div><p class="eyebrow">PLAN DE CONDUITE · ZÉRO FERRY</p><h2>Chevreuse le 10 septembre au soir</h2></div><p class="muted">≈ ${travel.toLocaleString('fr-FR')} km routiers hors excursions locales</p></div><div class="popup-warning"><b>Point géographique important :</b> l’E6 entre Narvik et Fauske traverse le Tysfjord par ferry. Pour respecter “zéro ferry”, le plan contourne donc par Kiruna et Arvidsjaur, revient en Norvège à Mo i Rana, puis suit la Norvège jusqu’à Sarpsborg.</div><div class="table-wrap"><table><thead><tr><th>Date</th><th>Départ</th><th>Arrivée</th><th>Distance</th><th>Conduite</th><th>Niveau</th><th>Remarque</th></tr></thead><tbody>${LEGS.map(l=>`<tr class="${l.level==='critical'?'danger-row':''}"><td>${esc(l.date)}</td><td>${esc(l.from)}</td><td><b>${esc(l.to)}</b></td><td>≈ ${l.km} km</td><td>${esc(l.time)}</td><td>${esc(badge(l.level))}</td><td>${esc(l.note)}</td></tr>`).join('')}</tbody></table></div><p class="muted">Les durées sont volontairement prudentes pour un camping-car et excluent les pauses longues, travaux, trafic, ravitaillements et promenades. Les 8, 9 et 10 septembre sont trois journées exigeantes consécutives.</p></section>`}
  function install(){if(typeof renderItinerary!=='function')return;const base=window.renderItinerary;window.renderItinerary=function(){base();const app=document.getElementById('app');if(app)app.insertAdjacentHTML('afterbegin',html());}}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();