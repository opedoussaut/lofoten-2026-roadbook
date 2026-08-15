'use strict';

// V95 — Park4Night quality gate for every overnight stop.
// IMPORTANT: display-only override. It does NOT alter route dates, MVP activities or itinerary logic.
// Selection rule: Park4Night average >= 4.0/5 AND recent comments must not reveal a material
// legality, security, RV-access, hygiene or noise problem. Fewer than 3 options is preferable
// to lowering the quality bar.

(function installOvernightQualityV95(){
  const P=id=>`https://park4night.com/fr/place/${id}`;
  const E=v=>typeof esc==='function'?esc(v):String(v??'');

  const VERIFIED={
    osnabruck:[
      {kind:'camping',name:'Campingplatz Dümmer-See C10',rating:4.65,reviews:'34 avis',p4n:P('83085'),preferred:true,
       note:'Très bon niveau de confort : sanitaires modernes et très propres, accueil apprécié, lac à proximité. Quelques commentaires signalent de l’animation le samedi : demander une zone calme si possible.'},
      {kind:'nature',name:'Scharfe Hegge · accueil privé rural',rating:5.00,reviews:'39 avis',p4n:P('563633'),preferred:false,
       note:'Petit accueil privé très bien noté, rural et calme, avec eau/électricité. Seulement quelques places : excellente alternative si disponible.'},
      {kind:'nature',name:'Wohnmobil-Wiese Dümmer-See',rating:4.26,reviews:'≈62 avis',p4n:P('270452'),preferred:false,
       note:'Prairie d’ancienne ferme, proche du lac et généralement très appréciée. Un commentaire 2026 signale un souci de douche : bon backup, derrière C10.'}
    ],
    malmo:[
      {kind:'camping',name:'Stamhems ställplats · Skåne',rating:4.47,reviews:'≈243 avis',p4n:P('425039'),preferred:true,
       note:'Aire structurée avec services et douches, gros volume d’avis. Quelques nuisances possibles liées aux autres campeurs, mais le retour global reste très solide.'},
      {kind:'nature',name:'Ribersborgsstigen · Malmö',rating:4.59,reviews:'≈66 avis',p4n:P('146510'),preferred:false,
       note:'Excellent compromis mer/parc/ville, pratique à vélo ou bus. Les commentaires 2026 sont très favorables et l’endroit est apprécié avec un chien.'},
      {kind:'free',name:'Spot nature au sud-est de Malmö',rating:4.07,reviews:'≈27 avis',p4n:P('159965'),preferred:false,
       note:'Option gratuite nature validée >4★. Petit espace, sol parfois irrégulier et un peu de bruit routier : seulement si l’accès du RV est confortable le jour J.'}
    ],
    trosa:[
      {kind:'camping',name:'Trosa Havsbad Camping',rating:4.11,reviews:'≈57 avis',p4n:P('75896'),preferred:true,
       note:'Plage, sanitaires récents et beaucoup de retours 2026 très positifs. Plus cher que les alternatives ; demander un emplacement nature plutôt qu’une zone asphaltée.'},
      {kind:'free',name:'Gustavsbergsgatan · Trosa',rating:4.04,reviews:'≈48 avis',p4n:P('83644'),preferred:false,
       note:'Aire gratuite proche du port. Correcte pour une nuit ; quelques commentaires évoquent scooters/ados le soir et entretien matinal. Passe le seuil, mais reste un backup plutôt qu’un choix premium n°1.'}
    ],
    umea:[
      {kind:'camping',name:'Tvistevägen · aire officielle Umeå',rating:4.20,reviews:'5 avis',p4n:P('377723'),preferred:false,
       note:'Aire payante pratique pour gros camping-cars. Peu d’avis ; calme variable en journée, donc pas notre premier choix si on veut de la nature.'},
      {kind:'nature',name:'Baggböle · Umeå',rating:4.39,reviews:'avis Park4Night',p4n:P('270899'),preferred:true,
       note:'Petit spot proche de la nature et bien évalué, adapté à une halte calme. Capacité limitée : arriver avant le soir.'},
      {kind:'free',name:'Spot lac/nature Umeå',rating:4.80,reviews:'5 avis',p4n:P('521860'),preferred:false,
       note:'Très belle option gratuite et calme. Accès non goudronné : à retenir uniquement si le chemin est sec et clairement confortable pour le camping-car.'}
    ],
    kiruna:[
      {kind:'camping',name:'ICEHOTEL · Jukkasjärvi motorhome package',rating:4.50,reviews:'avis Park4Night',p4n:P('590700'),preferred:true,
       note:'Choix confort/premium : électricité et accès aux services du site selon le forfait. Plus cher, mais nettement supérieur aux campings précédemment retenus sous 4★.'},
      {kind:'free',name:'Kiruna · spot nature près de l’IRF',rating:4.19,reviews:'≈21 avis',p4n:P('334421'),preferred:false,
       note:'Calme et nature, accès pavé. Quelques retours anciens signalent des déchets : vérifier l’état du lieu avant de s’installer et partir si le site s’est dégradé.'}
    ],
    andoya:[
      {kind:'camping',name:'Midnattsol Camping · Bleik',rating:4.30,reviews:'≈190 avis',p4n:P('14678'),preferred:true,
       note:'Notre meilleur compromis pour Måtinden : plage de Bleik et proximité de Baugtua. Commentaires 2026 globalement bons ; sanitaires parfois jugés sous-dimensionnés quand le camping est plein.'},
      {kind:'free',name:'Andøya · FV82 spot nature',rating:4.38,reviews:'≈24 avis',p4n:P('101817'),preferred:false,
       note:'Très calme la nuit, vue ouverte et plusieurs retours 2026 à 5★. Aucun service ; plus éloigné de Baugtua que Bleik, donc vrai plan B gratuit.'},
      {kind:'free',name:'Andenes · Tore Hundsgate',rating:4.26,reviews:'≈47 avis',p4n:P('127686'),preferred:false,
       note:'Parking gratuit jour/nuit, central et facile d’accès. Les commentaires juillet 2026 le trouvent calme et pratique ; moins “nature” mais fiable comme fallback.'}
    ],
    lofotenEast:[
      {kind:'camping',name:'Lyngvær Lofoten Bobilcamp',rating:4.18,reviews:'≈260 avis',p4n:P('12131'),preferred:true,
       note:'Meilleur choix vérifié du secteur pour notre programme : vues, sanitaires/services, kayak possible depuis le site. Prix élevé et avis récents partagés sur les douches/service, mais la majorité des retours 2026 restent très bons.'},
      {kind:'nature',name:'Henningsvær · Hellandsgata',rating:4.11,reviews:'≈27 avis',p4n:P('349363'),preferred:false,
       note:'Aire payante simple, calme la nuit selon les commentaires 2026, assez large pour des camping-cars. Environ 20 min à pied du village ; pas de services.'},
      {kind:'free',name:'Gimsøy · Barstrandveien',rating:5.00,reviews:'1 avis',p4n:P('678069'),preferred:false,lowConfidence:true,
       note:'Gratuit et proche de notre zone, mais seulement 1 avis à ce jour. À considérer uniquement comme backup après vérification sur place : deux places, bord de route, aucun service.'}
    ],
    flakstad:[
      {kind:'camping',name:'Lofoten Beach Camp · Skagsanden',rating:4.12,reviews:'nombreux avis',p4n:P('60796'),preferred:true,
       note:'Plage spectaculaire + services. Les commentaires 2026 sont globalement positifs ; principal reproche : prix élevé et certains extras. Reste le meilleur camping vérifié sur notre journée Haukland/Vikten.'},
      {kind:'free',name:'Ramberg · gravel spot',rating:4.22,reviews:'≈27 avis',p4n:P('420393'),preferred:false,
       note:'Option gratuite légale rapportée comme calme la nuit avec de nombreux avis 2025–2026 positifs. Aucun service et aspect “gravière” : premium par tranquillité/fiabilité, pas par équipement.'}
    ],
    reine:[
      {kind:'camping',name:'Seaside caravan parking · Hamnøy/Reine',rating:4.65,reviews:'≈190 avis',p4n:P('506255'),preferred:true,
       note:'Très forte recommandation : emplacements aménagés face au fjord, vues exceptionnelles, commentaires juin 2026 massivement à 5★. Reine et Reinebringen sont facilement accessibles à vélo.'}
    ]
  };

  const BY_DATE={
    '25/08':'osnabruck','26/08':'malmo','27/08':'trosa','28/08':'umea','29/08':'kiruna',
    '30/08':'andoya','31/08':'lofotenEast','01/09':'lofotenEast','02/09':'flakstad','03/09':'reine',
    '04/09':'reine','05/09':'lofotenEast','06/09':'kiruna','07/09':'umea','08/09':'trosa',
    '09/09':'malmo','10/09':'osnabruck'
  };

  const REJECTED=[
    'First Camp Sibbarp Malmö (<4★)', 'First Camp Nydala Umeå (<4★)', 'Camp Ripan (<4★)',
    'Björkliden Camping (<4★)', 'Hov Camping (<4★)', 'Moskenes Camping (<4★)',
    'Moskenes port parking (<4★)', 'Ramberg Gjestegård (<4★)',
    'Malmö Limhamnsvägen (>=4★ mais commentaire 2026 de cambriolage)',
    'Abisko E10 (>=4★ mais nuit signalée interdite)'
  ];

  const label=k=>k==='camping'?'🏕️ Camping / Aire Premium':k==='nature'?'🌿 Nature Premium':'🌲 Nature Free Premium';
  const stars=r=>`${Number(r).toFixed(2).replace('.',',')}/5`;

  function optionHtml(o){
    return `<div style="padding:12px 0;border-top:1px solid rgba(120,120,120,.18)">
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <b>${label(o.kind)}</b>${o.preferred?'<span style="font-weight:750">⭐ PRÉFÉRÉ</span>':''}
        <span style="padding:3px 7px;border-radius:999px;background:rgba(35,140,80,.12);font-weight:700">★ ${stars(o.rating)}</span>
        <span class="muted">${E(o.reviews)}</span>${o.lowConfidence?'<span style="padding:3px 7px;border-radius:999px;background:rgba(190,120,0,.14);font-weight:700">⚠ peu d’avis</span>':''}
      </div>
      <p style="margin:7px 0 5px"><a href="${E(o.p4n)}" target="_blank" rel="noopener"><b>${E(o.name)} ↗</b></a></p>
      <div class="muted">${E(o.note)}</div>
    </div>`;
  }

  function missingCategories(options){
    const present=new Set(options.map(o=>o.kind));
    const labels=[];
    if(!present.has('camping'))labels.push('Camping / Aire Premium');
    if(!present.has('nature'))labels.push('Nature Premium');
    if(!present.has('free'))labels.push('Nature Free Premium');
    if(!labels.length)return '';
    return `<div style="padding:10px 0;border-top:1px solid rgba(120,120,120,.18)" class="muted"><b>Qualité avant quantité :</b> aucune option ${E(labels.join(' / '))} supplémentaire n’a passé simultanément le seuil Park4Night ≥4★ et la revue des commentaires. Je préfère laisser la catégorie vide plutôt que proposer un mauvais spot.</div>`;
  }

  function qualityDetails(date){
    const key=BY_DATE[date];
    if(!key)return '';
    const options=(VERIFIED[key]||[]).filter(o=>o.rating>=4);
    return `<details class="card p4n-quality-v95" style="margin:8px 0 14px" open>
      <summary><b>🌙 Nuit du ${E(date)} · sélection Park4Night vérifiée</b></summary>
      <div style="padding:10px 0"><span style="padding:4px 8px;border-radius:999px;background:rgba(35,140,80,.12);font-weight:750">QUALITÉ ≥ 4,0/5</span> <span class="muted">Commentaires récents relus · contrôle 15/08/2026</span></div>
      ${options.map(optionHtml).join('')}${missingCategories(options)}
    </details>`;
  }

  function decorate(){
    const app=document.getElementById('app');
    if(!app)return;
    const first=app.querySelector('.priority-banner');
    if(first&&!app.querySelector('[data-p4n-policy-v95]')){
      first.insertAdjacentHTML('afterend',`<section class="card" data-p4n-policy-v95 style="margin:10px 0"><p class="eyebrow">PARK4NIGHT QUALITY GATE · V95</p><p><b>Règle :</b> aucun lieu recommandé sous 4,0/5. La note seule ne suffit pas : commentaires récents relus pour sécurité, légalité de la nuit, bruit, propreté et accès camping-car. Si une catégorie n’a aucun bon candidat, elle reste vide.</p><details><summary>Voir quelques lieux explicitement rejetés</summary><p class="muted">${REJECTED.map(E).join(' · ')}</p></details></section>`);
    }
    [...app.querySelectorAll('article.card')].forEach(article=>{
      const eyebrow=article.querySelector('.eyebrow')?.textContent||'';
      const m=eyebrow.match(/(\d{2}\/\d{2})/);
      if(!m)return;
      let next=article.nextElementSibling;
      while(next && next.matches('details.card') && !next.classList.contains('p4n-quality-v95')){
        const doomed=next; next=next.nextElementSibling; doomed.remove();
      }
      if(article.nextElementSibling?.classList?.contains('p4n-quality-v95'))return;
      const html=qualityDetails(m[1]);
      if(html)article.insertAdjacentHTML('afterend',html);
    });
  }

  const previous=window.renderItinerary;
  if(typeof previous==='function'){
    window.renderItinerary=function(){ previous(); decorate(); };
    try{renderItinerary=window.renderItinerary}catch{}
  }
})();
