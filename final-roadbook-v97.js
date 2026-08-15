'use strict';

// V97 — final production layer for overnight stops + RV service network.
// Display-only. Does not mutate itinerary dates, MVP activities, route variants or specialist tabs.
(function installFinalRoadbookV97(){
  const P=id=>`https://park4night.com/fr/place/${id}`;
  const E=v=>typeof esc==='function'?esc(v):String(v??'');

  const SLEEP={
    osnabruck:[
      {kind:'farm',name:'Scharfe Hegge · accueil privé rural',rating:5.00,reviews:'39 avis',p4n:P('563633'),preferred:true,note:'Petit accueil privé rural et calme. Eau/électricité disponibles. Peu de places : excellent choix si disponible.'},
      {kind:'farm',name:'Hotel Busch Atter · ferme / hôtel',rating:4.50,reviews:'Park4Night',p4n:P('636645'),note:'Accueil camping-car sur propriété privée, animaux acceptés, eau/toilettes/douches/électricité. Pratique après une longue journée et bien plus agréable qu’un parking urbain.'},
      {kind:'camping',name:'Campingplatz Dümmer-See C10',rating:4.65,reviews:'34 avis',p4n:P('83085'),note:'Lac, sanitaires modernes et très bons retours. Demander une zone calme si possible.'}
    ],
    malmo:[
      {kind:'farm',name:'Ellygården · ferme',rating:4.61,reviews:'239 avis',p4n:P('288068'),preferred:true,note:'Notre choix transit sud-Suède : ferme, champs, œufs frais, accueil très apprécié. Très calme malgré un léger bruit routier possible. 15–20 € environ selon électricité.'},
      {kind:'nature',name:'Stamhems ställplats · Skåne',rating:4.47,reviews:'≈243 avis',p4n:P('425039'),note:'Aire structurée avec beaucoup d’avis, calme globalement bon. Backup fiable si la ferme est complète.'}
    ],
    trosa:[
      {kind:'nature',name:'Nyköping · Regeringsvägen',rating:4.60,reviews:'5 avis',p4n:P('517031'),preferred:true,note:'Très calme la nuit selon les avis, terrain plat, environnement promenade/runes. Ce n’est pas un parking de journée proposé comme nuit : les avis confirment explicitement l’usage nocturne.'},
      {kind:'camping',name:'Trosa Havsbad Camping',rating:4.11,reviews:'≈57 avis',p4n:P('75896'),note:'Plage et environnement nature. Plus cher, mais vrai camping si vous voulez douche/recharge.'}
    ],
    umea:[
      {kind:'free',name:'Umeå · petit lac en forêt',rating:4.80,reviews:'5 avis',p4n:P('521860'),preferred:true,note:'Option nature pure : très calme, petite pinède et lac, aucun service. Chemin non goudronné : uniquement si sec et confortable pour le RV.'},
      {kind:'nature',name:'Baggböle · Umeå',rating:4.39,reviews:'Park4Night',p4n:P('270899'),note:'Petit spot nature très bien noté, capacité limitée. Arriver avant le soir.'}
    ],
    kiruna:[
      {kind:'free',name:'Kiruna · nature près de l’IRF',rating:4.19,reviews:'≈21 avis',p4n:P('334421'),preferred:true,note:'Calme, nature et accès pavé. Vérifier l’état du site en arrivant et repartir si déchets ou dégradation.'},
      {kind:'camping',name:'ICEHOTEL · Jukkasjärvi motorhome package',rating:4.50,reviews:'Park4Night',p4n:P('590700'),note:'Backup confort avec services et cadre unique si besoin de recharge complète.'}
    ],
    andoya:[
      {kind:'camping',name:'Midnattsol Camping · Bleik',rating:4.30,reviews:'≈190 avis',p4n:P('14678'),preferred:true,note:'Choisi pour Måtinden : plage de Bleik + proximité Baugtua. Les commentaires 2026 sont globalement très bons ; sanitaires parfois chargés quand complet.'},
      {kind:'free',name:'Andøya · FV82 spot nature',rating:4.38,reviews:'≈24 avis',p4n:P('101817'),note:'Très calme la nuit, vue ouverte, plusieurs retours 2026 à 5★. Aucun service : parfait si on a fait le plein/vidange avant.'}
    ],
    lofotenEast:[
      {kind:'camping',name:'Lyngvær Lofoten Bobilcamp',rating:4.18,reviews:'≈260 avis',p4n:P('12131'),preferred:true,note:'Base compatible avec le programme Lofoten : vues, services et accès kayak. Prix élevé, mais emplacement et logistique très solides.'},
      {kind:'nature',name:'Henningsvær · Hellandsgata',rating:4.11,reviews:'≈27 avis',p4n:P('349363'),note:'Simple et calme la nuit selon les retours 2026. À utiliser si l’activité Henningsvær impose cette zone.'}
    ],
    flakstad:[
      {kind:'camping',name:'Lofoten Beach Camp · Skagsanden',rating:4.12,reviews:'nombreux avis',p4n:P('60796'),preferred:true,note:'Le meilleur compromis pour notre journée Haukland/Vikten : plage spectaculaire + douche/recharge. Cher mais cohérent avec le programme.'},
      {kind:'free',name:'Ramberg · gravel spot',rating:4.22,reviews:'≈27 avis',p4n:P('420393'),note:'Gratuit, calme et bien noté. Aucun service ; premium par tranquillité et position, pas par équipement.'}
    ],
    reine:[
      {kind:'nature',name:'Seaside caravan parking · Hamnøy/Reine',rating:4.65,reviews:'≈190 avis',p4n:P('506255'),preferred:true,note:'Choix final pour Reine/Reinebringen : vues exceptionnelles, avis 2026 très forts, possibilité de rejoindre Reine et Reinebringen à vélo.'}
    ]
  };

  const BY_DATE={
    '25/08':'osnabruck','26/08':'malmo','27/08':'trosa','28/08':'umea','29/08':'kiruna',
    '30/08':'andoya','31/08':'lofotenEast','01/09':'lofotenEast','02/09':'flakstad','03/09':'reine',
    '04/09':'reine','05/09':'lofotenEast','06/09':'kiruna','07/09':'umea','08/09':'trosa','09/09':'malmo','10/09':'osnabruck'
  };

  // Technical service stops only: NEVER presented as sleeping recommendations.
  const SERVICES={
    '26/08':[
      {name:'CITTI-PARK Flensburg',rating:4.28,p4n:P('290174'),services:'🚰 eau potable · 🩶 eaux grises · ⚫ cassette/eaux noires',cost:'Vidanges gratuites · ~1 € / 100 L eau',note:'Très gros volume d’avis. Utiliser uniquement comme arrêt technique avant le Danemark.'}
    ],
    '27/08':[
      {name:'Norrköping · Stuvaregränd',rating:4.84,p4n:P('522481'),services:'🚰 eau potable · 🩶 eaux grises · ⚫ cassette/eaux noires',cost:'Gratuit',note:'95 avis et nombreux retours 2026 très positifs. Très proche de l’E4.'}
    ],
    '28/08':[
      {name:'Härnösand · Jaktstigen',rating:4.70,p4n:P('339275'),services:'🚰 eau potable · 🩶 eaux grises · ⚫ cassette/eaux noires',cost:'Gratuit',note:'Centre de service municipal à ~1,5 km de l’E4. 150+ avis, très fiable.'}
    ],
    '30/08':[
      {name:'Narvik · Circle K Fagernesveien',rating:4.43,p4n:P('132397'),services:'🩶 eaux grises · ⚫ cassette/eaux noires · 🚰 eau fraîche selon accès robinet',cost:'Vidanges gratuites',note:'Très pratique sur l’E10 vers Andøya. Retours 2026 : vidanges fiables ; pour l’eau potable, une clé de robinet peut être nécessaire. Si doute, faire uniquement les vidanges et remplir au camping.'}
    ],
    '06/09':[
      {name:'Narvik · Circle K Fagernesveien',rating:4.43,p4n:P('132397'),services:'🩶 eaux grises · ⚫ cassette/eaux noires · 🚰 eau fraîche selon accès robinet',cost:'Vidanges gratuites',note:'Même point au retour. Excellent endroit pour repartir vers la Suède avec les réservoirs vidés.'}
    ],
    '07/09':[
      {name:'Härnösand · Jaktstigen',rating:4.70,p4n:P('339275'),services:'🚰 eau potable · 🩶 eaux grises · ⚫ cassette/eaux noires',cost:'Gratuit',note:'Arrêt technique idéal entre Umeå et le sud de la Suède.'}
    ],
    '08/09':[
      {name:'Norrköping · Stuvaregränd',rating:4.84,p4n:P('522481'),services:'🚰 eau potable · 🩶 eaux grises · ⚫ cassette/eaux noires',cost:'Gratuit',note:'Permet de dormir ensuite dans un lieu calme sans service.'}
    ],
    '10/09':[
      {name:'CITTI-PARK Flensburg',rating:4.28,p4n:P('290174'),services:'🚰 eau potable · 🩶 eaux grises · ⚫ cassette/eaux noires',cost:'Vidanges gratuites · ~1 € / 100 L eau',note:'Dernier gros reset technique avant l’Allemagne.'}
    ]
  };

  const kindLabel=k=>k==='farm'?'🌾 Ferme / accueil privé':k==='camping'?'🏕️ Camping Premium':k==='free'?'🌲 Nature gratuite Premium':'🌿 Nature Premium';
  const stars=r=>Number(r).toFixed(2).replace('.',',');

  function sleepHtml(date){
    const key=BY_DATE[date],opts=SLEEP[key]||[];
    if(!opts.length)return '';
    return `<details class="card final-night-v97" style="margin:8px 0 10px" open>
      <summary><b>🌙 Nuit du ${E(date)} · sélection finale calme / nature</b></summary>
      <div style="padding:8px 0"><span style="padding:4px 8px;border-radius:999px;background:rgba(35,140,80,.12);font-weight:750">PARK4NIGHT ≥ 4★</span> <span class="muted">Nuit réelle vérifiée · pas de parking de journée</span></div>
      ${opts.map(o=>`<div style="padding:11px 0;border-top:1px solid rgba(120,120,120,.18)"><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><b>${kindLabel(o.kind)}</b>${o.preferred?'<span style="font-weight:750">⭐ CHOIX CONSEILLÉ</span>':''}<span style="padding:3px 7px;border-radius:999px;background:rgba(35,140,80,.12);font-weight:700">★ ${stars(o.rating)}/5</span><span class="muted">${E(o.reviews)}</span></div><p style="margin:6px 0 4px"><a href="${E(o.p4n)}" target="_blank" rel="noopener"><b>${E(o.name)} ↗</b></a></p><div class="muted">${E(o.note)}</div></div>`).join('')}
    </details>`;
  }

  function serviceHtml(date){
    const opts=SERVICES[date]||[]; if(!opts.length)return '';
    return `<details class="card final-service-v97" style="margin:0 0 14px"><summary><b>🚰 Arrêt technique RV sur l’étape</b></summary>${opts.map(o=>`<div style="padding:11px 0;border-top:1px solid rgba(120,120,120,.18)"><p style="margin:0 0 4px"><a href="${E(o.p4n)}" target="_blank" rel="noopener"><b>${E(o.name)} ↗</b></a> · <b>★ ${stars(o.rating)}/5</b></p><div>${E(o.services)}</div><div><b>${E(o.cost)}</b></div><div class="muted">${E(o.note)} · <b>Service seulement — ne pas dormir ici.</b></div></div>`).join('')}</details>`;
  }

  function decorate(){
    const app=document.getElementById('app'); if(!app)return;
    // Remove every interim overnight recommendation layer so there is one authority only.
    app.querySelectorAll('.p4n-quality-v95,.final-night-v97,.final-service-v97,[data-overnight-policy-v96],[data-p4n-policy-v95]').forEach(el=>el.remove());
    const first=app.querySelector('.priority-banner');
    if(first){
      first.insertAdjacentHTML('afterend',`<section class="card" data-final-policy-v97 style="margin:10px 0"><p class="eyebrow">NUITS + SERVICES · FINAL V97</p><p><b>Règle sommeil :</b> hors Lofoten, priorité ferme / accueil privé / nature calme ; dans les Lofoten, priorité à la base qui sert nos activités, puis au meilleur lieu de nuit compatible. Aucun parking de journée n’est accepté comme nuit.</p><p><b>Règle technique :</b> eau propre, eaux grises et cassette sont gérées par des arrêts de service séparés. Cela nous permet de dormir gratuitement et sans équipement dès que la meilleure option est en pleine nature.</p></section>`);
    }
    [...app.querySelectorAll('article.card')].forEach(article=>{
      const text=article.querySelector('.eyebrow')?.textContent||'';
      const m=text.match(/(\d{2}\/\d{2})/); if(!m)return;
      const date=m[1], html=sleepHtml(date)+serviceHtml(date);
      if(html)article.insertAdjacentHTML('afterend',html);
    });
  }

  const previous=window.renderItinerary;
  if(typeof previous==='function'){
    window.renderItinerary=function(){previous();decorate();};
    try{renderItinerary=window.renderItinerary}catch{}
  }
})();
