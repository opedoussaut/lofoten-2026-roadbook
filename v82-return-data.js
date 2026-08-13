'use strict';
(function installV82ReturnData(){
  if(typeof state==='undefined')return;
  const VERSION='v82-return-12-sept';
  state.meta=state.meta||{};
  state.meta.return='12/09/2026 16:00';
  state.meta.returnConstraint='Restitution Roadsurfer · Champlan le 12 septembre 2026 à 16:00';

  const TANGLOPPEN={name:'Tangloppen Camping · Ishøj / Copenhague',url:'https://www.dk-camp.dk/en/campsites/tangloppen-camping',role:'Nuit retour choisie : plage à 500 m, emplacements camping-car, chiens acceptés, ouverte jusqu’au 4 octobre 2026.',calm:'4/5',paddy:'✅ Chiens acceptés. Bonne promenade après la route.',address:'Tangloppen 2, 2635 Ishøj, Denmark'};
  const CITYCAMP={name:'Copenhagen CityCamp',url:'https://www.citycamp.dk/en/english',role:'Alternative très centrale, ouverte jusqu’au 13 septembre 2026.',calm:'3/5',paddy:'Politique animaux à confirmer avant arrivée.',address:'Prags Boulevard 69, 2300 København S, Denmark'};
  const NIEDERSACHSENHOF={name:'Camping Niedersachsenhof · Osnabrück',url:'https://erleben.osnabrueck.de/de/stadt-erleben/sehenswertes/wohnmobilstellplatz-auf-dem-campingplatz-niedersachsenhof-osnabrueck/',role:'Nuit retour choisie : camping toute l’année, services camping-car complets, réservation recommandée.',calm:'4/5',paddy:'✅ Animaux admis gratuitement.',address:'Nordstraße 107/109, 49074 Osnabrück, Germany'};
  const SCHLOSSWALL={name:'Wohnmobilstellplatz Schlosswallhalle · Osnabrück',url:'https://erleben.osnabrueck.de/de/stadt-erleben/sehenswertes/wohnmobilstellplatz-an-der-schlosswallhalle/',role:'Alternative urbaine ouverte toute l’année, 7 places, 18 €.',calm:'3/5',paddy:'✅ Animaux admis.',address:'Heinrichstraße 48, 49080 Osnabrück, Germany'};
  const HOME={name:'Maison · Chevreuse',url:'https://www.google.com/maps/search/Chevreuse+France',role:'Dernière nuit à la maison avant restitution du camping-car.',calm:'5/5',paddy:'Retour dans son environnement familier.'};

  const days={
    '09/09':['09/09','Topcamp Ekeberg · Oslo','Tangloppen Camping · Ishøj',620,6.7,'Retour équilibré','Oslo → Göteborg → Malmö → pont de l’Øresund → Ishøj','Journée encore soutenue mais sans étape extrême. Promenade de plage avec Paddy à l’arrivée.'],
    '10/09':['10/09','Tangloppen Camping · Ishøj','Camping Niedersachsenhof · Osnabrück',675,6.3,'Retour équilibré','Ishøj → Storebælt → Kolding → Flensburg → Hambourg → Osnabrück','Zéro ferry : conserver les ponts et l’autoroute. Soirée calme au camping.'],
    '11/09':['11/09','Camping Niedersachsenhof · Osnabrück','Maison · Chevreuse',700,6.8,'Retour maison','Osnabrück → Ruhr → Belgique → Île-de-France','Arrivée à la maison avec une journée entière de marge avant la restitution.'],
    '12/09':['12/09','Maison · Chevreuse','Roadsurfer · Champlan',25,0.7,'Restitution 16:00','Nettoyage final → vidanges → carburant / AdBlue → photos → Champlan','Objectif : camping-car prêt avant 13:30 et départ de Chevreuse vers 14:00 au plus tard. Restitution contractuelle à 16:00.']
  };
  function replace(date,row){if(!Array.isArray(state.itinerary))state.itinerary=[];const i=state.itinerary.findIndex(r=>Array.isArray(r)&&r[0]===date);if(i>=0)state.itinerary[i]=row;else state.itinerary.push(row);}
  Object.entries(days).forEach(([d,r])=>replace(d,r));
  state.itinerary=state.itinerary.filter(r=>!Array.isArray(r)||!['10/09','11/09'].includes(r[0])||days[r[0]]).sort((a,b)=>{const p=x=>{const[d,m]=String(x[0]).split('/').map(Number);return m*100+d};return p(a)-p(b)});

  state.nightlyOptions=state.nightlyOptions||{};
  state.nightlyOptions['09/09']={preferred:TANGLOPPEN,alternatives:[CITYCAMP]};
  state.nightlyOptions['10/09']={preferred:NIEDERSACHSENHOF,alternatives:[SCHLOSSWALL]};
  state.nightlyOptions['11/09']={preferred:HOME,alternatives:[]};
  delete state.nightlyOptions['12/09'];

  state.routePolicy=state.routePolicy||{};
  state.routePolicy.return2026='Restitution 12/09 à 16:00. Retour rééquilibré : Oslo → Copenhague/Ishøj → Osnabrück → Chevreuse → Champlan.';
  state.routePolicy.noFerry='Aucun ferry pendant tout le voyage : Øresund + Storebælt sur le retour sud.';
  state.returnPlan={version:VERSION,deadline:'12/09/2026 16:00',oldPlannedKm:8272,newPlannedKm:8292,deltaKm:20,benefit:'La distance totale reste presque identique, mais le bloc Oslo→Chevreuse passe de 2 longues journées à 3 journées d’environ 620–700 km.'};
  if(state.current)state.current.decision='Retour confirmé le 12 septembre à 16:00 : utiliser le jour supplémentaire pour Oslo → Ishøj/Copenhague → Osnabrück → Chevreuse, puis restitution à Champlan.';
  state.returnPlanVersion=VERSION;
  if(typeof save==='function')save();
  window.V82={version:VERSION,points:{'09/09':{name:'Tangloppen Camping',lat:55.6133,lon:12.3870},'10/09':{name:'Camping Niedersachsenhof',lat:52.3027,lon:8.0378},'11/09':{name:'Maison · Chevreuse',lat:48.706,lon:2.038},'12/09':{name:'Roadsurfer · Champlan',lat:48.708,lon:2.279}}};
})();