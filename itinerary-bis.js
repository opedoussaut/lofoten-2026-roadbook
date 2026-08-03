'use strict';

(function installItineraryBis(){
  const RETURN_ROWS=[
    ['04/09','Moskenes Camping','Rognan Fjordcamp',115,2,'2 h conduite + ferry','Moskenes–Bodø puis courte remontée vers un fjord calme','Traversée directe réservée; 45 à 75 min de marge au terminal'],
    ['05/09','Rognan Fjordcamp','Korgen Camping',205,3.5,'Récupération','Étape volontairement courte après le ferry · rivière Røssåga','Ne pas prolonger: priorité au repos de Paddy'],
    ['06/09','Korgen Camping','Tråsåvika Camping',440,6.5,'Retour Norvège','E6 puis nuit sur le Trondheimsfjord','Deux vraies pauses de 25 à 35 min pour Paddy'],
    ['07/09','Tråsåvika Camping','Sveastranda Camping',405,6.2,'Retour Norvège','Dovrefjell puis rive du lac Mjøsa','Grande pause promenade à mi-journée'],
    ['08/09','Sveastranda Camping','Tornby Strand Camping · Hirtshals',290,4.5,'4 h 30 conduite + ferry','Route vers Larvik puis traversée courte Larvik–Hirtshals','Réserver une traversée permettant une arrivée calme avant la nuit'],
    ['09/09','Tornby Strand Camping','Campingplatz Waldwinkel · Osnabrücker Land',705,6.8,'Transit plafonné','Danemark puis Allemagne · nuit calme entre prairies et forêt','Temps de volant cible 6 h 45; pauses toutes les 2 h à 2 h 15'],
    ['10/09','Campingplatz Waldwinkel','Maison · Chevreuse',685,6.8,'IMPÉRATIF · plafond 7 h','Dernière étape équilibrée jusqu’à la maison','Départ tôt; le plafond concerne la conduite pure, hors pauses et trafic'],
    ['11/09','Chevreuse','Roadsurfer · Champlan',25,0.7,'Restitution','Nettoyage matin, vidanges, plein et photos','Départ avec marge avant 17 h']
  ];

  const RETURN_NIGHTS={
    '04/09':{
      date:'04/09',label:'Nuit 11 · 4 septembre',route:'Moskenes → ferry direct → Bodø → Rognan',
      preferred:{name:'Rognan Fjordcamp',url:'https://rognanfjordcamp.no/',role:'Fjord abrité, emplacements au bord de l’eau, promenades faciles et chiens admis. Demander une place calme loin de l’aire de jeux.',status:'preferred',calm:'5/5',paddy:'Petite promenade au bord du fjord dès l’arrivée; aucune nouvelle longue conduite après la traversée.'},
      alternatives:[
        {name:'Saltstraumen Camping',url:'https://saltstraumen-camping.no/',role:'Alternative la plus courte après Bodø; nature spectaculaire et accès simple.',status:'alternative'},
        {name:'Saltdal Turistsenter · Storjord',url:'https://isaltdal.no/camping/?lang=en',role:'Alternative forestière près de Junkerdalsura.',status:'alternative'}
      ]
    },
    '05/09':{
      date:'05/09',label:'Nuit 12 · 5 septembre',route:'Rognan → Saltfjellet → Korgen',
      preferred:{name:'Korgen Camping',url:'https://korgen-camping.no/',role:'En retrait de l’E6, sans bruit de circulation et directement sur la rivière Røssåga.',status:'preferred',calm:'5/5',paddy:'Étape courte, marche plate au bord de la rivière et soirée sans stimulation.'},
      alternatives:[
        {name:'Yttervik · Ranfjord',url:'https://visityttervik.no/en/',role:'Alternative fjord au sud de Mo i Rana.',status:'alternative'},
        {name:'Topcamp Mosjøen',url:'https://topcamp.no/en/topcamp-mosjoen',role:'Alternative avec davantage de services mais moins isolée.',status:'alternative'}
      ]
    },
    '06/09':{
      date:'06/09',label:'Nuit 13 · 6 septembre',route:'Korgen → Trondheimsfjord',
      preferred:{name:'Tråsåvika Camping',url:'https://trasavika.no/en/home',role:'Emplacements au bord du Trondheimsfjord, plage et environnement naturel.',status:'preferred',calm:'4.5/5',paddy:'Demander un emplacement en bordure, éloigné du playground; balade courte sur la plage.'},
      alternatives:[
        {name:'Øysand Camping',url:'https://oysandcamping.no/',role:'Alternative ouverte toute l’année, plage de sable et accès simple depuis l’E6.',status:'alternative'},
        {name:'Viggja Kro & Camping',url:'https://www.google.com/maps/search/Viggja+Kro+Camping+Norway',role:'Alternative locale si Tråsåvika est complet.',status:'alternative'}
      ]
    },
    '07/09':{
      date:'07/09',label:'Nuit 14 · 7 septembre',route:'Trondheimsfjord → lac Mjøsa',
      preferred:{name:'Sveastranda Camping',url:'https://www.sveastranda.no/en',role:'Camping calme ouvert toute l’année, zone visiteurs au bord du lac, sentiers et chiens admis.',status:'preferred',calm:'4.5/5',paddy:'Réserver la zone touristique près de l’eau, puis marche douce le long de Mjøsa.'},
      alternatives:[
        {name:'Hekshusstranda Camping',url:'https://www.visitnorway.com/listings/hekshusstranda-camping-kapp-mj%C3%B8sa/18144/',role:'Alternative paisible avec plage sur le lac Mjøsa.',status:'alternative'},
        {name:'Lillehammer Turistsenter',url:'https://camping.no/en/campingplasser/254217',role:'Alternative pratique avec panorama sur le lac.',status:'alternative'}
      ]
    },
    '08/09':{
      date:'08/09',label:'Nuit 15 · 8 septembre',route:'Mjøsa → Larvik → ferry → Hirtshals',
      preferred:{name:'Tornby Strand Camping',url:'https://www.tornbystrandcamping.dk/en/',role:'Camping entre plage, dunes, forêt et nature à quelques minutes de Hirtshals. Demander une parcelle périphérique loin des piscines et du playground.',status:'preferred',calm:'4.5/5',paddy:'Après la traversée, seulement une courte promenade dans la nature puis repos complet.'},
      alternatives:[
        {name:'Hirtshals Camping',url:'https://hirtshals-camping.dk/en/',role:'Alternative la plus proche du port, ouverte en septembre et chiens admis.',status:'alternative'},
        {name:'Tannisby Camping',url:'https://www.google.com/maps/search/Tannisby+Camping+Denmark',role:'Alternative plus au sud dans les dunes si l’horaire le permet.',status:'alternative'}
      ]
    },
    '09/09':{
      date:'09/09',label:'Nuit 16 · 9 septembre',route:'Hirtshals → Osnabrücker Land',
      preferred:{name:'Campingplatz Waldwinkel',url:'https://pages.et4.de/en/osnabruecker-land/terminal/detail/Hotel/h_32876/campingplatz-waldwinkel-',role:'Camping officiellement décrit comme calme et idyllique entre prairies et forêts, avec petit lac, animaux admis, ouverture annuelle et caisse 24 h.',status:'preferred',calm:'5/5',paddy:'Choisir un emplacement en lisière, faire une promenade lente en forêt, puis maintenir une soirée très calme.'},
      alternatives:[
        {name:'Campingplatz Bullerby am Attersee',url:'https://erleben.osnabrueck.de/de/stadt-erleben/sehenswertes/wohnmobilstellplatz-auf-dem-campingplatz-bullerby-am-attersee/',role:'Alternative entre forêt et lac, animaux admis et adaptée aux camping-cars de plus de 8 m.',status:'alternative'},
        {name:'Campingplatz Niedersachsenhof',url:'https://pages.et4.de/en/osnabruecker-land/streaming/detail/Hotel/h_74481/camping-site-niedersachsenhof-osnabrueck',role:'Alternative rurale entourée de terres agricoles et de forêt, ouverte toute l’année.',status:'alternative'}
      ]
    },
    '10/09':{
      date:'10/09',label:'Nuit 17 · 10 septembre',route:'Osnabrücker Land → domicile à Chevreuse',
      preferred:{name:'Maison · Chevreuse',url:'https://www.google.com/maps/search/Chevreuse+France',role:'ARRIVÉE OBLIGATOIRE, même tardive.',status:'preferred',calm:'5/5',paddy:'Retour dans son environnement familier; sortie courte avant le coucher.'},
      alternatives:[
        {name:'Aucune alternative planifiée',url:'https://www.google.com/maps/search/Chevreuse+France',role:'Continuer jusqu’à la maison.',status:'alternative'},
        {name:'Aucune nuit en route',url:'https://www.google.com/maps/search/Chevreuse+France',role:'Le 11 au matin est réservé au nettoyage.',status:'alternative'}
      ]
    }
  };

  const WAYPOINTS=[
    ['Chevreuse',48.706,2.038],['Nuit 1',53.7,9.9],['Nuit 2',57.9,14.3],['Forsgården',60.675,17.074],['Nuit 4',64.5,20.5],['Abisko',68.354,18.832],['Hov Camping',68.341,14.117],['Uttakleiv',68.209,13.507],['Lofoten Beach Camp',68.089,13.236],['Moskenes',67.901,13.046],['Bodø · ferry',67.280,14.405],['Rognan Fjordcamp',67.103,15.407],['Korgen Camping',66.075,13.839],['Tråsåvika',63.31,9.89],['Sveastranda',60.889,10.676],['Larvik · ferry',59.052,10.035],['Tornby Strand',57.55,9.88],['Campingplatz Waldwinkel',52.45,8.20],['Chevreuse',48.706,2.038],['Champlan',48.708,2.279]
  ];

  const FERRY={
    title:'Plan ferry optimisé · Moskenes–Bodø puis Larvik–Hirtshals',
    target:'Deux traversées courtes permettent de plafonner chaque journée de retour à 7 h de conduite pure: Moskenes–Bodø le 4 septembre et Larvik–Hirtshals le 8 septembre.',
    bookingUrl:'https://www.torghatten.no/en/our-routes/18-782',
    checkIn:'Moskenes: file réservée au moins 45 minutes avant. Larvik: arrivée au terminal Color Line au moins 60 minutes avant.',
    vehicle:'Réserver la longueur et la hauteur réelles du Cozy Cottage, porte-vélos compris. Couper impérativement le gaz pendant chaque traversée.',
    price:'Tarifs dynamiques; confirmer les deux traversées dans les systèmes officiels avant de figer les nuits.',
    petRule:'Moskenes–Bodø: véhicule ou local chiens selon Torghatten. Larvik–Hirtshals: Paddy peut rester dans le véhicule, utiliser le chenil ou rester avec vous sur le pont extérieur réservé pendant la saison avril–septembre.',
    paddy:[
      'Faire une promenade calme de 45 à 60 minutes avant chaque embarquement, avec pipi juste avant la file.',
      'Éviter un gros repas dans les 2 à 3 heures précédentes et proposer de l’eau sans excès.',
      'Pour Larvik–Hirtshals, privilégier le pont extérieur avec Paddy si la météo est douce et stable; vous devez rester avec lui pendant toute la traversée.',
      'Préparer le véhicule comme solution de repli seulement si température et ventilation sont satisfaisantes.',
      'Après chaque débarquement, limiter la conduite restante et rejoindre directement le camping calme prévu.'
    ]
  };

  const SECOND_FERRY={
    title:'Larvik → Hirtshals · 8 septembre',
    target:'Traversée courte de l’après-midi ou du soir à choisir selon l’horaire 2026, après environ 4 h 30 de conduite depuis Sveastranda.',
    bookingUrl:'https://www.colorline.com/timetable',
    checkIn:'Arriver au terminal de Larvik au moins 60 minutes avant le départ.',
    petRule:'Sur les liaisons Norvège–Danemark, le chien peut rester dans le véhicule, utiliser le chenil ou rester avec ses maîtres sur le pont extérieur; cette dernière option est recommandée seulement d’avril à septembre.',
    paddy:'Réserver «pet in car» pour pouvoir l’emmener sur le pont extérieur, rester avec lui en permanence, prévoir harnais, coupe-vent, plaid et eau.'
  };

  function seed(){
    if(typeof state==='undefined')return;
    const commonDates=['25/08','26/08','27/08','28/08','29/08','30/08','31/08','01/09','02/09','03/09'];
    const common=(state.itinerary||[]).filter(row=>commonDates.includes(row[0]));
    state.itineraryBis=[...JSON.parse(JSON.stringify(common)),...JSON.parse(JSON.stringify(RETURN_ROWS))];
    const commonNights={};
    Object.keys(state.nightlyOptions||{}).forEach(date=>{if(commonDates.includes(date))commonNights[date]=JSON.parse(JSON.stringify(state.nightlyOptions[date]));});
    state.nightlyOptionsBis={...commonNights,...JSON.parse(JSON.stringify(RETURN_NIGHTS))};
    state.itineraryBisMeta={
      key:'bis',
      label:'Plan B · ferries · maximum 7 h de conduite',
      description:'Progression continue vers l’ouest dans les Lofoten, sortie directe par Moskenes, retour par la Norvège puis seconde traversée Larvik–Hirtshals pour équilibrer les deux derniers jours.',
      paddy:'Aucune journée ne dépasse 7 h de conduite planifiée. Les deux traversées sont courtes et chaque nuit privilégie le silence, l’eau ou la forêt.',
      maxDailyDriving:'7 h de conduite pure, hors pauses, attente ferry et trafic',
      ferry:FERRY,
      secondFerry:SECOND_FERRY,
      waypoints:WAYPOINTS
    };
    if(!state.activeRoutePlan)state.activeRoutePlan='main';
    if(typeof save==='function')save();
  }

  window.LOFOTEN_ITINERARY_BIS={RETURN_ROWS,RETURN_NIGHTS,WAYPOINTS,FERRY,SECOND_FERRY};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',seed);else seed();
})();