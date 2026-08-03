'use strict';

(function initNightlyOptions(){
  const p=(name,url,role='Choix préféré')=>({name,url,role,status:'preferred'});
  const a=(name,url,role)=>({name,url,role,status:'alternative'});
  const NIGHTS={
    '25/08':{date:'25/08',label:'Nuit 1 · 25 août',route:'Saint-Rémy-lès-Chevreuse → nord de l’Allemagne',preferred:p('Park4Night #53279','https://park4night.com/fr/place/53279'),alternatives:[a('Park4Night #417435','https://park4night.com/fr/place/417435','Alternative 1'),a('Park4Night #453901','https://park4night.com/fr/place/453901','Alternative 2')]},
    '26/08':{date:'26/08',label:'Nuit 2 · 26 août',route:'Nord de l’Allemagne → sud de la Suède / Vättern',preferred:p('Park4Night #84058','https://park4night.com/fr/place/84058'),alternatives:[a('Park4Night #698010','https://park4night.com/fr/place/698010','Alternative 1'),a('Park4Night #391481','https://park4night.com/fr/place/391481','Alternative 2')]},
    '27/08':{date:'27/08',label:'Nuit 3 · 27 août',route:'Vättern → Gävle',preferred:p('Park4Night #188958','https://park4night.com/fr/place/188958'),alternatives:[a('Park4Night #214874','https://park4night.com/fr/place/214874','Alternative 1'),a('Park4Night #76491','https://park4night.com/fr/place/76491','Alternative 2')]},
    '28/08':{date:'28/08',label:'Nuit 4 · 28 août',route:'Gävle → Umeå / Skellefteå',preferred:p('Park4Night #140798','https://park4night.com/fr/place/140798'),alternatives:[a('Park4Night #260263','https://park4night.com/fr/place/260263','Alternative 1'),a('Park4Night #698541','https://park4night.com/fr/place/698541','Alternative 2')]},
    '29/08':{date:'29/08',label:'Nuit 5 · 29 août',route:'Umeå / Skellefteå → Abisko',preferred:p('Abisko Mountain Lodge','https://www.abiskomountainlodge.se/','Choix préféré · lodge'),alternatives:[a('Park4Night #133328','https://park4night.com/fr/place/133328','Alternative 1'),a('Park4Night #88528','https://park4night.com/fr/place/88528','Alternative 2')]},
    '30/08':{date:'30/08',label:'Nuit 6 · 30 août',route:'Abisko → Gimsøy / Lofoten',preferred:p('Hov Camping','https://hovgard.no/en/camping-caravanning/'),alternatives:[a('Kabelvåg Feriehus & Camping #84297','https://park4night.com/fr/place/84297','Alternative services'),a('Sandsletta Camping','https://sandsletta.no/','Alternative calme au bord de l’eau')]},
    '31/08':{date:'31/08',label:'Nuit 7 · 31 août',route:'Gimsøy et est des Lofoten',preferred:p('Hov Camping','https://hovgard.no/en/camping-caravanning/'),alternatives:[a('Kabelvåg Feriehus & Camping #84297','https://park4night.com/fr/place/84297','Alternative services'),a('Sandsletta Camping','https://sandsletta.no/','Alternative nature')]},
    '01/09':{date:'01/09',label:'Nuit 8 · 1 septembre',route:'Gimsøy → Uttakleiv',preferred:p('Uttakleiv #38914','https://park4night.com/fr/place/38914'),alternatives:[a('Lofoten Beach Camp','https://www.lofotenbeachcamp.no/','Alternative plage aménagée'),a('Hov Camping','https://hovgard.no/en/camping-caravanning/','Alternative si météo à l’ouest')]},
    '02/09':{date:'02/09',label:'Nuit 9 · 2 septembre',route:'Uttakleiv → Flakstad / Ramberg',preferred:p('Lofoten Beach Camp','https://www.lofotenbeachcamp.no/'),alternatives:[a('Ramberg Gjestegård','https://ramberg-gjestegard.no/','Alternative plage'),a('Skårungen Camping','https://www.skaarungen.no/','Alternative équipée')]},
    '03/09':{date:'03/09',label:'Nuit 10 · 3 septembre',route:'Flakstad → Moskenes',preferred:p('Moskenes Camping','https://moskenescamping.no/'),alternatives:[a('Sørvågen Camping','https://www.sorvagencamping.no/','Alternative sud Lofoten'),a('Reine Rorbuer / secteur Reine','https://www.classicnorway.com/hotels/reine-rorbuer/','Alternative confort')]},
    '04/09':{date:'04/09',label:'Nuit 11 · 4 septembre',route:'Sud des Lofoten · journée météo flexible',preferred:p('Moskenes Camping','https://moskenescamping.no/'),alternatives:[a('Sørvågen Camping','https://www.sorvagencamping.no/','Alternative 1'),a('Lofoten Beach Camp','https://www.lofotenbeachcamp.no/','Alternative si meilleure météo au nord')]},
    '05/09':{date:'05/09',label:'Nuit 12 · 5 septembre',route:'Ferry Moskenes–Bodø → Saltstraumen',preferred:p('Saltstraumen Camping','https://saltstraumen-camping.no/'),alternatives:[a('Bodøsjøen Camping','https://www.bodocamping.no/','Alternative proche Bodø'),a('Geitvågen Bad og Camping','https://geitvagen.no/','Alternative littorale')]},
    '06/09':{date:'06/09',label:'Nuit 13 · 6 septembre',route:'Saltstraumen → Storvika · route 17',preferred:p('Storvika #23954','https://park4night.com/fr/place/23954'),alternatives:[a('Furøy Camping','https://www.furoycamp.no/','Alternative face au fjord'),a('Reipå Camping','https://reipacamping.com/','Alternative équipée')]},
    '07/09':{date:'07/09',label:'Nuit 14 · 7 septembre',route:'Storvika → Nesna · Helgelandskysten',preferred:p('Topcamp Havblikk, Nesna','https://topcamp.no/topcamp-havblikk'),alternatives:[a('Yttervik Camping','https://yttervik.no/','Alternative littorale'),a('Krokstrand Fjellpark','https://krokstrand.no/','Alternative montagne / E6')]},
    '08/09':{date:'08/09',label:'Nuit 15 · 8 septembre',route:'Nesna → Levanger · retour accéléré mais agréable',preferred:p('Levanger Camping','https://camping.no/en/campingplasser/2092375','Choix préféré · ouvert toute l’année'),alternatives:[a('Hauganfjæra Camping','https://camping.no/en/campingplasser/738477','Alternative bord de mer'),a('Høgkjølen Fjellcamp','https://camping.no/en/campingplasser/1555808','Alternative ouverte toute l’année')]},
    '09/09':{date:'09/09',label:'Nuit 16 · 9 septembre',route:'Levanger → Sarpsborg / frontière suédoise',preferred:p('Utne Camping, Sarpsborg','https://camping.no/en/campingplasser/750872','Choix préféré · ouvert toute l’année'),alternatives:[a('Flisa Camping','https://camping.no/en/campingplasser/2097844','Alternative ouverte toute l’année'),a('Topcamp Mjøsa','https://camping.no/en/campingplasser/2056573','Alternative au bord du lac')]},
    '10/09':{date:'10/09',label:'Nuit 17 · 10 septembre',route:'Sarpsborg → Weserbergland / Hanovre',preferred:p('Schrappmühle #657695','https://park4night.com/fr/place/657695','Choix préféré · nuit calme avant restitution'),alternatives:[a('Hanover #617937','https://park4night.com/fr/place/617937','Alternative gratuite et calme'),a('Wohnmobilstellplatz Hannover Nord','https://www.wohnmobilstellplatz-hannover.de/','Alternative équipée')]}
  };

  function seed(){
    if(typeof state==='undefined')return;
    state.nightlyOptions=NIGHTS;
    if(!Array.isArray(state.savedCamperStops))state.savedCamperStops=[];
    state.savedCamperStops=state.savedCamperStops.filter(s=>!String(s.priority||'').startsWith('night-')&&!String(s.reference||'').startsWith('premium-2026-'));
    Object.values(NIGHTS).forEach((night,nightIndex)=>{
      [night.preferred,...night.alternatives].forEach((option,i)=>state.savedCamperStops.push({name:`${night.date} · ${option.name} — ${i===0?'choix préféré':'alternative '+i}`,source:option.url.includes('park4night.com')?'Park4Night':'Site officiel',url:option.url,reference:`night-${night.date}-${i}`,stopIndex:nightIndex,status:i===0?'selected':'backup',priority:i===0?'night-preferred':`night-alternative-${i}`,date:night.date,notes:option.role}));
    });
    if(typeof save==='function')save();
  }

  function optionCard(option,index){
    const preferred=option.status==='preferred';
    const label=option.url.includes('park4night.com')?'Ouvrir Park4Night ↗':'Ouvrir le site ↗';
    return `<article class="night-choice ${preferred?'preferred-choice':'alternative-choice'}"><div class="night-choice-rank">${preferred?'⭐ PRÉFÉRÉ':'ALT. '+index}</div><h4>${esc(option.name)}</h4><p>${esc(option.role)}</p><a class="btn ${preferred?'primary':''}" href="${esc(option.url)}" target="_blank" rel="noopener">${label}</a></article>`;
  }
  function panelHtml(){return `<section class="card nightly-options-panel"><div class="nightly-options-heading"><div><p class="eyebrow">CHOIX DE NUIT</p><h2>Préféré + alternatives</h2></div><p class="muted">Un choix principal et deux solutions de repli par nuit.</p></div>${Object.values(NIGHTS).map(n=>`<div class="night-choice-day"><div class="night-choice-day-head"><h3>${esc(n.label)}</h3><span>${esc(n.route)}</span></div><div class="night-choice-grid">${optionCard(n.preferred,0)}${n.alternatives.map((o,i)=>optionCard(o,i+1)).join('')}</div></div>`).join('')}</section>`;}
  function install(){seed();if(typeof renderItinerary!=='function')return;const base=renderItinerary;window.renderItinerary=function(){base();const app=document.getElementById('app');if(app)app.insertAdjacentHTML('afterbegin',panelHtml());};}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
