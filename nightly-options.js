'use strict';

(function initNightlyOptions(){
  const P=(id)=>`https://park4night.com/fr/place/${id}`;
  const NIGHTS={
    '25/08':{date:'25/08',label:'Nuit 1 · 25 août',route:'Chevreuse → nord de l’Allemagne',preferred:{name:'Park4Night #53279',url:P('53279'),role:'Choix confirmé',status:'preferred'},alternatives:[{name:'Park4Night #417435',url:P('417435'),role:'Alternative 1',status:'alternative'},{name:'Park4Night #453901',url:P('453901'),role:'Alternative 2',status:'alternative'}]},
    '26/08':{date:'26/08',label:'Nuit 2 · 26 août',route:'Nord Allemagne → sud Suède',preferred:{name:'Park4Night #84058',url:P('84058'),role:'Choix confirmé',status:'preferred'},alternatives:[{name:'Park4Night #698010',url:P('698010'),role:'Alternative 1',status:'alternative'},{name:'Park4Night #391481',url:P('391481'),role:'Alternative 2',status:'alternative'}]},
    '27/08':{date:'27/08',label:'Nuit 3 · 27 août',route:'Sud Suède → région de Gävle',preferred:{name:'Forsgården · Park4Night #188958',url:P('188958'),role:'Choix confirmé',status:'preferred'},alternatives:[{name:'Park4Night #214874',url:P('214874'),role:'Alternative 1',status:'alternative'},{name:'Park4Night #76491',url:P('76491'),role:'Alternative 2',status:'alternative'}]},
    '28/08':{date:'28/08',label:'Nuit 4 · 28 août',route:'Gävle → nord de la Suède',preferred:{name:'Park4Night #140798',url:P('140798'),role:'Choix confirmé',status:'preferred'},alternatives:[{name:'Park4Night #260263',url:P('260263'),role:'Alternative 1',status:'alternative'},{name:'Park4Night #698541',url:P('698541'),role:'Alternative 2',status:'alternative'}]},
    '29/08':{date:'29/08',label:'Nuit 5 · 29 août',route:'Nord Suède → Abisko',preferred:{name:'Abisko Mountain Lodge',url:'https://www.abiskomountainlodge.se/',role:'Choix confirmé · lodge',status:'preferred'},alternatives:[{name:'Park4Night #133328',url:P('133328'),role:'Alternative 1',status:'alternative'},{name:'Park4Night #88528',url:P('88528'),role:'Alternative 2',status:'alternative'}]},
    '30/08':{date:'30/08',label:'Nuit 6 · 30 août',route:'Abisko → Gimsøy, Lofoten',preferred:{name:'Hov Camping',url:'https://hovgard.no/en/camping-caravanning/',role:'Plage arctique · services complets',status:'preferred'},alternatives:[{name:'Sandsletta Camping',url:'https://sandsletta.no/',role:'Alternative nature et fjord',status:'alternative'},{name:'Kabelvåg Feriehus & Camping',url:P('84297'),role:'Alternative services',status:'alternative'}]},
    '31/08':{date:'31/08',label:'Nuit 7 · 31 août',route:'Base Lofoten Est',preferred:{name:'Hov Camping',url:'https://hovgard.no/en/camping-caravanning/',role:'Seconde nuit sans refaire le camp',status:'preferred'},alternatives:[{name:'Sandsletta Camping',url:'https://sandsletta.no/',role:'Alternative météo Est',status:'alternative'},{name:'Kabelvåg Feriehus & Camping',url:P('84297'),role:'Alternative pratique',status:'alternative'}]},
    '01/09':{date:'01/09',label:'Nuit 8 · 1 septembre',route:'Gimsøy → Uttakleiv',preferred:{name:'Uttakleiv · Park4Night #38914',url:P('38914'),role:'Nuit signature du voyage',status:'preferred'},alternatives:[{name:'Haukland Beach area',url:'https://visitlofoten.com/en/topic/haukland-beach/',role:'Alternative plage voisine',status:'alternative'},{name:'Unstad Arctic Surf',url:'https://www.unstadarcticsurf.com/',role:'Alternative océan et surf',status:'alternative'}]},
    '02/09':{date:'02/09',label:'Nuit 9 · 2 septembre',route:'Uttakleiv → Flakstad',preferred:{name:'Lofoten Beach Camp · Skagsanden',url:'https://www.lofotenbeachcamp.no/',role:'Camping directement sur la plage',status:'preferred'},alternatives:[{name:'Ramberg Gjestegård',url:'https://ramberg-gjestegard.no/',role:'Alternative plage et services',status:'alternative'},{name:'Vikten · Park4Night #60765',url:P('60765'),role:'Alternative sauvage · vérifier le vent',status:'alternative'}]},
    '03/09':{date:'03/09',label:'Nuit 10 · 3 septembre',route:'Flakstad → Moskenes',preferred:{name:'Moskenes Camping',url:'https://moskenescamping.no/',role:'Balcon sur le Vestfjord',status:'preferred'},alternatives:[{name:'Reine Rorbuer / parking local',url:'https://visitlofoten.com/en/reine/',role:'Alternative proche de Reine',status:'alternative'},{name:'Sørvågen Camping',url:'https://www.google.com/maps/search/camping+Sørvågen+Norway',role:'Alternative au sud',status:'alternative'}]},

    '04/09':{
      date:'04/09',label:'Nuit 11 · 4 septembre',route:'Moskenes → Narvik → Nikkaluokta · zéro ferry',
      preferred:{name:'Nikkaluokta Sarri · pied du Kebnekaise',url:'https://nikkaluokta.com/en/accomodation/camping',role:'Fin de route au cœur des montagnes · vraie nuit d’exception',status:'preferred',calm:'5/5',paddy:'Immense environnement naturel pour une sortie calme; laisse indispensable près de la faune et des rennes.'},
      alternatives:[
        {name:'Björkliden Camping',url:'https://kirunalapland.se/en/activities/bjorkliden-camping/',role:'Montagne et lac Torneträsk, directement sur l’E10',status:'alternative',calm:'4,5/5',paddy:'Promenades faciles dans un environnement montagnard.'},
        {name:'Camp Ripan · Kiruna',url:'https://ripan.se/en/rooms-category/camping-en/',role:'Repli confortable avec spa et services',status:'alternative',calm:'3,5/5',paddy:'Sentier du Luossavaara accessible depuis le camp.'}
      ]
    },
    '05/09':{
      date:'05/09',label:'Nuit 12 · 5 septembre',route:'Nikkaluokta → Gällivare → Arvidsjaur',
      preferred:{name:'Camp Gielas · emplacement Premium Lake',url:'https://www.campgielas.se/boende/camping/',role:'Emplacement au bord de l’eau dans la forêt lapone',status:'preferred',calm:'4,5/5',paddy:'Choisir explicitement Premium Lake, loin de l’entrée et des équipements familiaux.'},
      alternatives:[
        {name:'Kraja Camping · Arjeplog',url:'https://www.kraja.se/',role:'Lac, sauna et étape plus avancée vers la Norvège',status:'alternative',calm:'4/5',paddy:'Demander un emplacement périphérique au bord du lac.'},
        {name:'Arctic Camp Jokkmokk · zone calme 10 places',url:'https://arcticcampjokkmokk.se/camping/',role:'Petite zone séparée conçue pour les nuits tranquilles',status:'alternative',calm:'5/5',paddy:'Chiens admis; sélectionner la petite zone séparée avec son propre service house.'}
      ]
    },
    '06/09':{
      date:'06/09',label:'Nuit 13 · 6 septembre',route:'Arvidsjaur → Storuman → Ranfjord · retour en Norvège',
      preferred:{name:'Yttervik · Ranfjord',url:'https://visityttervik.no/en/english/',role:'Fjord et montagnes, refuge dédié au calme et à la récupération',status:'preferred',calm:'5/5',paddy:'Petite promenade au bord du fjord avant le coucher; demander une place éloignée de l’E6.'},
      alternatives:[
        {name:'Korgen Camping',url:'https://korgen-camping.no/',role:'Rivière Røssåga et vallée boisée',status:'alternative',calm:'4,5/5',paddy:'Terrain idéal pour une promenade lente au bord de l’eau.'},
        {name:'Bjerka Camping',url:'https://www.google.com/maps/search/Bjerka+Camping+Norway',role:'Petite étape nature au sud de Mo i Rana',status:'alternative',calm:'4/5',paddy:'Préférer une place éloignée de la route.'}
      ]
    },
    '07/09':{
      date:'07/09',label:'Nuit 14 · 7 septembre',route:'Yttervik → Trondheimsfjord',
      preferred:{name:'Tråsåvika Camping · Trondheimsfjord',url:'https://trasavika.no/en/home',role:'Plage privée, fjord et terrain de promenade',status:'preferred',calm:'4,5/5',paddy:'Arriver avant la nuit pour une courte marche sur la plage et dans les sentiers voisins.'},
      alternatives:[
        {name:'Øysand Camping',url:'https://oysandcamping.no/',role:'Grande plage de sable au sud de Trondheim',status:'alternative',calm:'4/5',paddy:'Demander une place au fond du camping, loin de l’accès E6.'},
        {name:'Storsand Gård Camping',url:'https://www.google.com/maps/search/Storsand+Gard+Camping+Norway',role:'Camp de fjord dans un cadre rural',status:'alternative',calm:'4/5',paddy:'Bon repli nature si Tråsåvika est complet.'}
      ]
    },
    '08/09':{
      date:'08/09',label:'Nuit 15 · 8 septembre',route:'Trondheimsfjord → Oslofjord sud',
      preferred:{name:'Larkollen Camping · Oslofjord',url:'https://www.larkollencamping.no/',role:'Cap côtier, mer et vraie coupure après la longue E6',status:'preferred',calm:'4,5/5',paddy:'Réserver une place quotidienne en bord extérieur, pas près du restaurant ni de l’aire de jeux.'},
      alternatives:[
        {name:'Utne Camping · Sarpsborg',url:'https://camping.no/en/campingplasser/750872',role:'Repli direct sur l’axe, ouvert toute l’année',status:'alternative',calm:'3,5/5',paddy:'Demander une place intérieure éloignée de l’E6.'},
        {name:'Topcamp Bogstad · Oslo',url:'https://topcamp.no/en/topcamp-bogstad',role:'Lac et forêt avant la traversée d’Oslo',status:'alternative',calm:'3,5/5',paddy:'Promenade au bord du lac; moins isolé que Larkollen.'}
      ]
    },
    '09/09':{
      date:'09/09',label:'Nuit 16 · 9 septembre',route:'Larkollen → Suède → Danemark → Südheide · ponts uniquement',
      preferred:{name:'Campingpark Südheide · Winsen (Aller)',url:'https://en.campingpark-suedheide.de/',role:'Forêt, rivière Örtze et silence nocturne obligatoire',status:'preferred',calm:'5/5',paddy:'Parc canin clôturé, douche pour chien, promenades et baignade canine; nuit calme 22 h–7 h.'},
      alternatives:[
        {name:'Camping Allerblick · Winsen',url:'https://www.campingplatz-winsen.de/',role:'Terrain boisé directement sur l’Aller',status:'alternative',calm:'4,5/5',paddy:'Rive de l’Aller pour une sortie courte après la route.'},
        {name:'Campingplatz Stover Strand · Elbe',url:'https://www.camping-stover-strand.de/',role:'Plage de l’Elbe au sud-est de Hambourg',status:'alternative',calm:'4/5',paddy:'Choisir une place éloignée des zones de loisirs et de la digue principale.'}
      ]
    },
    '10/09':{date:'10/09',label:'Nuit 17 · 10 septembre',route:'Südheide → domicile à Chevreuse',preferred:{name:'Maison · Chevreuse',url:'https://www.google.com/maps/search/Chevreuse+France',role:'ARRIVÉE OBLIGATOIRE, même tardive',status:'preferred'},alternatives:[{name:'Aucune alternative planifiée',url:'https://www.google.com/maps/search/Chevreuse+France',role:'Objectif impératif : dormir à la maison',status:'alternative'},{name:'Aucune nuit en route',url:'https://www.google.com/maps/search/Chevreuse+France',role:'Continuer jusqu’à Chevreuse',status:'alternative'}]}
  };

  function seed(){
    if(typeof state==='undefined')return;
    state.nightlyOptions=JSON.parse(JSON.stringify(NIGHTS));
    state.savedCamperStops=[];
    Object.values(NIGHTS).forEach((night,nightIndex)=>{
      const all=[night.preferred,...night.alternatives];
      all.forEach((option,i)=>state.savedCamperStops.push({name:`${night.date} · ${option.name}`,source:option.url.includes('park4night')?'Park4Night':'Site externe',url:option.url,reference:`night-${night.date}-${i}`,stopIndex:nightIndex,status:i===0?'selected':'backup',priority:i===0?'night-preferred':`night-alternative-${i}`,date:night.date,notes:[option.role,option.calm?`Calme ${option.calm}`:'',option.paddy||''].filter(Boolean).join(' · ')}));
    });
    if(typeof save==='function')save();
  }

  function optionCard(option,index){
    const preferred=option.status==='preferred';
    const linkLabel=option.url.includes('park4night.com')?'Ouvrir Park4Night ↗':'Ouvrir ↗';
    const details=`${option.calm?`<p><b>Calme :</b> ${esc(option.calm)}</p>`:''}${option.paddy?`<p><b>Paddy :</b> ${esc(option.paddy)}</p>`:''}`;
    return `<article class="night-choice ${preferred?'preferred-choice':'alternative-choice'}"><div class="night-choice-rank">${preferred?'⭐ PRÉFÉRÉ':'ALT. '+index}</div><h4>${esc(option.name)}</h4><p>${esc(option.role)}</p>${details}<a class="btn ${preferred?'primary':''}" href="${esc(option.url)}" target="_blank" rel="noopener">${linkLabel}</a></article>`;
  }

  function panelHtml(){
    const nights=Object.values(state.nightlyOptions||{}).sort((a,b)=>a.date.split('/').reverse().join('').localeCompare(b.date.split('/').reverse().join('')));
    return `<section class="card nightly-options-panel"><div class="nightly-options-heading"><div><p class="eyebrow">NUITS 2026 · RETOUR ZÉRO FERRY</p><h2>Exceptionnel, silencieux et adapté à Paddy</h2></div><p class="muted">Après chaque longue journée, priorité à la nature, au calme nocturne et à une promenade simple avec Paddy.</p></div>${nights.map(n=>`<div class="night-choice-day"><div class="night-choice-day-head"><h3>${esc(n.label)}</h3><span>${esc(n.route)}</span></div><div class="night-choice-grid">${optionCard(n.preferred,0)}${n.alternatives.map((o,i)=>optionCard(o,i+1)).join('')}</div></div>`).join('')}</section>`;
  }

  function install(){seed();if(typeof renderItinerary!=='function')return;const base=window.renderItinerary;window.renderItinerary=function(){base();const app=document.getElementById('app');if(app)app.insertAdjacentHTML('afterbegin',panelHtml());};}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();