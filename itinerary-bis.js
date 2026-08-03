'use strict';

(function installItineraryBis(){
  const P=(id)=>`https://park4night.com/fr/place/${id}`;

  const RETURN_ROWS=[
    ['04/09','Moskenes Camping','Rognan Fjordcamp',115,6,'Ferry direct + route','Traversée Moskenes–Bodø puis E6 vers un fjord calme','Viser la traversée directe de milieu de journée; réservation indispensable'],
    ['05/09','Rognan Fjordcamp','Korgen Camping',205,3.5,'Récupération','Étape courte après le ferry · promenade le long de la Røssåga','Prolonger jusqu’à Mosjøen seulement si tout le monde est en pleine forme'],
    ['06/09','Korgen Camping','Tråsåvika Camping',440,6.5,'Retour Norvège','E6 puis nuit sur le Trondheimsfjord','Arrivée avant la fermeture de la réception'],
    ['07/09','Tråsåvika Camping','Sveastranda Camping',405,6.2,'Retour Norvège','Dovrefjell puis rive du lac Mjøsa','Pause longue à mi-journée pour Paddy'],
    ['08/09','Sveastranda Camping','Larkollen Camping',250,3.8,'Récupération','Courte étape vers l’Oslofjord','Après-midi libre et vraie promenade côtière'],
    ['09/09','Larkollen Camping','Campingpark Südheide',1040,11.8,'Très soutenue','Ponts uniquement après la Norvège · destination pensée pour Paddy','Départ vers 06:00; arrivée impérativement avant l’heure limite du camping'],
    ['10/09','Campingpark Südheide','Maison · Chevreuse',820,9.2,'IMPÉRATIF','Dormir à la maison, même tard','Pauses courtes mais régulières; aucune nuit intermédiaire'],
    ['11/09','Chevreuse','Roadsurfer · Champlan',25,0.7,'Restitution','Nettoyage matin, vidanges, plein et photos','Départ avec marge avant 17 h']
  ];

  const RETURN_NIGHTS={
    '04/09':{
      date:'04/09',label:'Nuit 11 · 4 septembre',route:'Moskenes → ferry direct → Bodø → Rognan',
      preferred:{name:'Rognan Fjordcamp',url:'https://rognanfjordcamp.no/',role:'Fjord abrité, emplacements touristiques au bord de l’eau, promenades faciles et chiens admis. Demander une place calme loin de l’aire de jeux.',status:'preferred',calm:'5/5',paddy:'Petite promenade au bord du fjord dès l’arrivée; aucune nouvelle longue conduite après la traversée.'},
      alternatives:[
        {name:'Saltstraumen Camping',url:'https://saltstraumen-camping.no/',role:'Alternative la plus courte après Bodø; nature spectaculaire, animaux acceptés et sentiers accessibles.',status:'alternative'},
        {name:'Saltdal Turistsenter · Storjord',url:'https://isaltdal.no/camping/?lang=en',role:'Alternative forestière près de Junkerdalsura avec sentiers aménagés.',status:'alternative'}
      ]
    },
    '05/09':{
      date:'05/09',label:'Nuit 12 · 5 septembre',route:'Rognan → Saltfjellet → Korgen',
      preferred:{name:'Korgen Camping',url:'https://korgen-camping.no/',role:'Choisi spécialement pour le silence: en retrait de l’E6, sans bruit de circulation et directement sur la rivière Røssåga.',status:'preferred',calm:'5/5',paddy:'Étape courte, puis marche plate au bord de la rivière et soirée sans stimulation.'},
      alternatives:[
        {name:'Yttervik · Ranfjord',url:'https://visityttervik.no/en/',role:'Alternative fjord au sud de Mo i Rana si la journée doit rester encore plus courte.',status:'alternative'},
        {name:'Topcamp Mosjøen',url:'https://topcamp.no/en/topcamp-mosjoen',role:'Alternative avec davantage de services mais moins isolée.',status:'alternative'}
      ]
    },
    '06/09':{
      date:'06/09',label:'Nuit 13 · 6 septembre',route:'Korgen → Trondheimsfjord',
      preferred:{name:'Tråsåvika Camping',url:'https://trasavika.no/en/home',role:'Emplacements au bord du Trondheimsfjord, plage et environnement naturel; camping ouvert jusqu’au 20 septembre.',status:'preferred',calm:'4.5/5',paddy:'Demander un emplacement en bordure, éloigné du playground; balade courte sur la plage avant le repos.'},
      alternatives:[
        {name:'Øysand Camping',url:'https://oysandcamping.no/',role:'Alternative ouverte toute l’année, plage de sable et accès simple depuis l’E6.',status:'alternative'},
        {name:'Viggja Kro & Camping',url:'https://www.google.com/maps/search/Viggja+Kro+Camping+Norway',role:'Alternative locale si Tråsåvika est complet.',status:'alternative'}
      ]
    },
    '07/09':{
      date:'07/09',label:'Nuit 14 · 7 septembre',route:'Trondheimsfjord → lac Mjøsa',
      preferred:{name:'Sveastranda Camping',url:'https://www.sveastranda.no/en',role:'Camping calme ouvert toute l’année, zone visiteurs au bord du lac, sentiers, chiens admis et espace de baignade canine.',status:'preferred',calm:'4.5/5',paddy:'Réserver la zone touristique près de l’eau, puis marche douce le long de Mjøsa.'},
      alternatives:[
        {name:'Hekshusstranda Camping',url:'https://www.visitnorway.com/listings/hekshusstranda-camping-kapp-mj%C3%B8sa/18144/',role:'Alternative paisible et pittoresque avec plage sur le lac Mjøsa.',status:'alternative'},
        {name:'Lillehammer Turistsenter',url:'https://camping.no/en/campingplasser/254217',role:'Alternative calme avec panorama sur le lac et accès pratique.',status:'alternative'}
      ]
    },
    '08/09':{
      date:'08/09',label:'Nuit 15 · 8 septembre',route:'Mjøsa → Oslofjord',
      preferred:{name:'Larkollen Camping',url:'https://www.larkollencamping.no/',role:'Grande coupure au bord de l’Oslofjord, plage et chemins côtiers; ouvert jusqu’à fin septembre.',status:'preferred',calm:'4.5/5',paddy:'Demander une parcelle extérieure éloignée de la réception et du playground; longue promenade tranquille avant la grosse étape du lendemain.'},
      alternatives:[
        {name:'Thorrud Camping · lac Eikern',url:'https://www.visitnorway.com/listings//thorrud-camping/279822/',role:'Alternative extrêmement calme au bord d’un lac, ouverte jusqu’au 15 septembre.',status:'alternative'},
        {name:'Utne Camping · Sarpsborg',url:'https://camping.no/en/campingplasser/750872',role:'Alternative plus proche de l’E6 et ouverte toute l’année, mais moins exceptionnelle.',status:'alternative'}
      ]
    },
    '09/09':{
      date:'09/09',label:'Nuit 16 · 9 septembre',route:'Larkollen → Suède → Danemark → Südheide',
      preferred:{name:'Campingpark Südheide',url:'https://en.campingpark-suedheide.de/',role:'Destination récupération: forêt, ruisseau, silence nocturne obligatoire, parc canin clôturé, douche pour chien et promenades.',status:'preferred',calm:'5/5',paddy:'Départ très tôt; pauses toutes les 2 à 2 h 30. Réserver et communiquer l’immatriculation pour une arrivée fluide avant 20:00.'},
      alternatives:[
        {name:'Campingplatz Stover Strand',url:'https://www.camping-stover-strand.de/',role:'Alternative nature sur l’Elbe si l’arrivée à Südheide devient impossible.',status:'alternative'},
        {name:'Elbepark Bunthaus',url:'https://www.hamburg-travel.com/see-explore/green-hamburg/campgrounds/camper-van-site-elbepark-bunthaus-hamburg/',role:'Alternative plus au nord, au bord de l’Elbe.',status:'alternative'}
      ]
    },
    '10/09':{
      date:'10/09',label:'Nuit 17 · 10 septembre',route:'Südheide → domicile à Chevreuse',
      preferred:{name:'Maison · Chevreuse',url:'https://www.google.com/maps/search/Chevreuse+France',role:'ARRIVÉE OBLIGATOIRE, même tardive.',status:'preferred',calm:'5/5',paddy:'Retour dans son environnement familier; sortie courte avant le coucher.'},
      alternatives:[
        {name:'Aucune alternative planifiée',url:'https://www.google.com/maps/search/Chevreuse+France',role:'Continuer jusqu’à la maison.',status:'alternative'},
        {name:'Aucune nuit en route',url:'https://www.google.com/maps/search/Chevreuse+France',role:'Le 11 au matin est réservé au nettoyage.',status:'alternative'}
      ]
    }
  };

  const WAYPOINTS=[
    ['Chevreuse',48.706,2.038],['Nuit 1',53.7,9.9],['Nuit 2',57.9,14.3],['Forsgården',60.675,17.074],['Nuit 4',64.5,20.5],['Abisko',68.354,18.832],['Hov Camping',68.341,14.117],['Uttakleiv',68.209,13.507],['Lofoten Beach Camp',68.089,13.236],['Moskenes',67.901,13.046],['Bodø · ferry',67.280,14.405],['Rognan Fjordcamp',67.103,15.407],['Korgen Camping',66.075,13.839],['Tråsåvika',63.31,9.89],['Sveastranda',60.889,10.676],['Larkollen',59.310,10.686],['Campingpark Südheide',52.672,9.936],['Chevreuse',48.706,2.038],['Champlan',48.708,2.279]
  ];

  const FERRY={
    title:'Ferry direct Moskenes → Bodø · vendredi 4 septembre',
    target:'Cible recommandée: traversée directe de milieu de journée, probablement 11:00 → 14:30 selon l’horaire été 2026; confirmer au moment de réserver.',
    bookingUrl:'https://www.torghatten.no/en/our-routes/18-782',
    checkIn:'Être dans la file réservée au moins 45 minutes avant; viser 60 à 75 minutes de marge avec le camping-car.',
    vehicle:'Réserver la catégorie 6,01–8 m pour le Cozy Cottage de référence à 7,80 m porte-vélos déployé; corriger si le véhicule réellement remis dépasse 8 m.',
    price:'Tarif officiel affiché: 1 302 NOK pour un véhicule conventionnel de 6,01–8 m, plus 170 NOK de réservation, avant éventuelle remise AutoPASS.',
    petRule:'Torghatten autorise l’animal soit dans le véhicule, soit dans une cage du local pour chiens.',
    paddy:[
      'Faire une promenade calme de 45 à 60 minutes avant de rejoindre la file, avec pipi juste avant l’embarquement.',
      'Éviter un gros repas dans les 2 à 3 heures précédentes; proposer de l’eau sans le faire boire excessivement.',
      'Installer son plaid familier, son harnais et une gamelle d’eau anti-débordement.',
      'Choisir le véhicule seulement si la température, la ventilation et les consignes de l’équipage sont adaptées; sinon utiliser le local chiens avec son plaid.',
      'Demander avant l’embarquement si l’accès au pont véhicules est possible pendant la traversée; ne pas le supposer.'
    ]
  };

  function seed(){
    if(typeof state==='undefined')return;
    const common=(state.itinerary||[]).filter(row=>['25/08','26/08','27/08','28/08','29/08','30/08','31/08','01/09','02/09','03/09'].includes(row[0]));
    state.itineraryBis=[...JSON.parse(JSON.stringify(common)),...JSON.parse(JSON.stringify(RETURN_ROWS))];
    const commonNights={};
    Object.keys(state.nightlyOptions||{}).forEach(date=>{
      if(['25/08','26/08','27/08','28/08','29/08','30/08','31/08','01/09','02/09','03/09'].includes(date))commonNights[date]=JSON.parse(JSON.stringify(state.nightlyOptions[date]));
    });
    state.nightlyOptionsBis={...commonNights,...JSON.parse(JSON.stringify(RETURN_NIGHTS))};
    state.itineraryBisMeta={
      key:'bis',
      label:'Plan B · ferry Moskenes–Bodø',
      description:'Progression continue vers l’ouest dans les Lofoten, sortie directe par Moskenes, puis retour par la Norvège sans refaire l’E10.',
      paddy:'Moins de route arctique et davantage d’étapes de récupération; la traversée maritime reste le point à valider selon la tolérance de Paddy.',
      ferry:FERRY,
      waypoints:WAYPOINTS
    };
    if(!state.activeRoutePlan)state.activeRoutePlan='main';
    if(typeof save==='function')save();
  }

  window.LOFOTEN_ITINERARY_BIS={RETURN_ROWS,RETURN_NIGHTS,WAYPOINTS,FERRY};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',seed);else seed();
})();
