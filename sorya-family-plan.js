'use strict';

// Family-first Lofoten plan: Sorya + Paddy determine the shared itinerary.
// Olivier's solo hikes are intentionally kept out of the family roadbook.
// Sources checked 13 Aug 2026: Visit Lofoten / Visit Norway / Hov Gård / XXLofoten.

(function installSoryaFamilyPlan(){
  if (typeof state === 'undefined') return;

  const VERSION='v80-sorya-family-first';
  const LYNGVAER={
    name:'Lyngvær Lofoten Bobilcamping',
    url:'https://lofoten-bobilcamping.no/en-hjemmeside/',
    role:'⭐ TESTÉ & AIMÉ — alternative prioritaire si Hov est complet ou si nous voulons être plus proches de Henningsvær/Svolvær.',
    calm:'4.5/5',
    paddy:'Bon choix avec Paddy et promenade du soir au bord de l’eau.'
  };

  const HOV={
    name:'Hov Camping · Gimsøy',
    url:'https://hovgard.no/en/camping-caravanning/',
    role:'Base famille prioritaire pendant 2 nuits : plage, restaurant, sauna, chevaux et Hoven directement sur place.',
    calm:'5/5',
    paddy:'Excellent pour deux nuits sans refaire le camp ; plage et promenades faciles.'
  };

  const STAVE={
    name:'Stave Camping · Andøya',
    url:'https://www.stavecamping.no/beach-camping',
    role:'Nuit Andøya choisie avant Måtinden, face à l’océan et proche du départ Baugtua.',
    calm:'4.5/5',
    paddy:'Paddy reste avec nous dans le camping-car.'
  };

  const BEACH={
    name:'Lofoten Beach Camp · Skagsanden',
    url:'https://www.lofotenbeachcamp.no/',
    role:'Une nuit de transition panoramique entre Gimsøy et l’ouest des Lofoten.',
    calm:'4/5',
    paddy:'Plage et promenade ; choisir un emplacement périphérique si le camping est animé.'
  };

  const MOSKENES={
    name:'Moskenes Camping',
    url:'https://moskenescamping.no/',
    role:'Base de 2 nuits pour Reine, Hamnøy, Sakrisøy, Å et une vraie fenêtre météo pour Reinebringen.',
    calm:'4/5',
    paddy:'Deux nuits sans refaire le camp ; journées villages / fjord plus faciles.'
  };

  const MIDNATTSOL={name:'Midnattsol Camping · Bleik',url:'https://www.midnattsolcamping.com/en',role:'Alternative à Stave, directement sur la plage de Bleik et proche du départ Baugtua.',calm:'4.5/5',paddy:'Alternative simple si Stave est complet.'};
  const RAMBERG={name:'Ramberg Resort Camping',url:'https://www.rambergresort.no/campsite',role:'Alternative plus calme près de Ramberg Beach.',calm:'4.5/5',paddy:'Bonne promenade de plage.'};

  const FAMILY_ITINERARY={
    '30/08':['30/08','Abisko Mountain Lodge','Stave Camping · Andøya',345,5.2,'Arrivée Vesterålen','Abisko → Narvik → Sortland → route panoramique d’Andøya → Stave','Installation, plage et repos. Pas de randonnée ce jour-là : garder l’énergie pour Måtinden.'],
    '31/08':['31/08','Stave Camping · Andøya','Hov Camping · Gimsøy',260,4.2,'MVP #1 · Måtinden','Départ tôt → Baugtua → Måtinden A/R → route vers les Lofoten → Hov','Måtinden avec Paddy en laisse courte. Arrivée tranquille à Hov ; Henningsvær uniquement si tout le monde a encore envie.'],
    '01/09':['01/09','Hov Camping','Hov Camping',70,1.5,'Journée OFF · 2e nuit Hov','Choisir UNE activité : Henningsvær + kayak guidé, ou journée Hov plage/sauna/chevaux. Hoven seulement si Sorya veut une 3e randonnée.','Aucun objectif kilométrique. Garder une vraie journée de vacances et profiter du camping.'],
    '02/09':['02/09','Hov Camping','Lofoten Beach Camp',95,2.0,'Plages & balade douce','Haukland → Uttakleiv par l’ancienne route côtière, puis Unstad si envie → Skagsanden','La balade côtière ne compte pas comme une randonnée montagne. Café, plages, photos et rythme libre.'],
    '03/09':['03/09','Lofoten Beach Camp','Moskenes Camping',70,2.0,'Journée OFF · villages','Nusfjord → Hamnøy → Sakrisøy → Reine → Moskenes','Pas de sommet. Priorité aux villages, pauses café, photos et éventuellement kayak Reinefjord si la mer est meilleure ce jour-là.'],
    '04/09':['04/09','Moskenes Camping','Moskenes Camping',15,0.5,'MVP #2 · Reinebringen','Reinebringen tôt ou en fin de journée selon vent/pluie → Reine / Å en mode relax','Paddy ne fait PAS Reinebringen : randonnée uniquement si une solution de garde/supervision sûre est organisée. Journée flexible pour exploiter la meilleure fenêtre météo.'],
    '05/09':['05/09','Moskenes Camping','Björkliden Camping',420,6.2,'Sortie des Lofoten','E10 → Leknes → Svolvær → Narvik → Björkliden','Départ après cinq nuits Lofoten ; pauses régulières et aucune activité sportive prévue.']
  };

  function replaceDay(date,row){
    if(!Array.isArray(state.itinerary)) state.itinerary=[];
    const i=state.itinerary.findIndex(r=>Array.isArray(r)&&r[0]===date);
    if(i>=0) state.itinerary[i]=row; else state.itinerary.push(row);
  }
  Object.entries(FAMILY_ITINERARY).forEach(([date,row])=>replaceDay(date,row));

  state.nightlyOptions=state.nightlyOptions||{};
  state.nightlyOptions['30/08']={preferred:{...STAVE},alternatives:[{...MIDNATTSOL}]};
  state.nightlyOptions['31/08']={preferred:{...HOV},alternatives:[{...LYNGVAER}]};
  state.nightlyOptions['01/09']={preferred:{...HOV},alternatives:[{...LYNGVAER}]};
  state.nightlyOptions['02/09']={preferred:{...BEACH},alternatives:[{...RAMBERG}]};
  state.nightlyOptions['03/09']={preferred:{...MOSKENES},alternatives:[]};
  state.nightlyOptions['04/09']={preferred:{...MOSKENES},alternatives:[]};

  const MVP_HIKES=[
    {
      rank:1,status:'MUST DO',name:'Måtinden — Baugtua A/R',place:'Andøya · 31/08',level:'Modérée',time:'≈3–4 h',distance:'7,6 km A/R',gain:'≈400–500 m D+',
      paddy:'✅ OUI — route Baugtua uniquement, laisse courte + harnais. Rester très loin des falaises.',
      why:'Ouverture spectaculaire du séjour, vue océan + plages, et itinéraire compatible avec Paddy.',
      url:'https://www.visitnorway.com/listings/m%C3%A5tind-%28408-masl%29-in-vester%C3%A5len/228686/'
    },
    {
      rank:2,status:'MUST DO',name:'Reinebringen — escaliers Sherpa',place:'Reine · 04/09',level:'Modérée mais très raide',time:'≈2–3 h + marche depuis le parking',distance:'≈5,8 km A/R depuis Ytre Havn',gain:'484 m D+',
      paddy:'❌ NON — Visit Lofoten recommande explicitement de laisser les chiens à la maison. Ne faire la randonnée que si une solution sûre pour Paddy est organisée.',
      why:'Le panorama iconique que Sorya veut faire. Journée dédiée avec une seconde nuit à Moskenes pour choisir la meilleure fenêtre météo.',
      url:'https://reinebringen.no/'
    },
    {
      rank:3,status:'OPTION MVP',name:'Hoven — depuis Hov',place:'Gimsøy · 01/09',level:'Facile',time:'≈2 h A/R',distance:'4 km A/R',gain:'367 m',
      paddy:'✅ OUI — Visit Lofoten le cite comme un excellent choix avec un chien. Laisse près des animaux.',
      why:'La meilleure 3e randonnée : départ quasi sur place, 360° pour peu d’effort et aucun bouleversement du jour OFF.',
      url:'https://visitlofoten.com/en/guide/hoven-367-m-a-sl/'
    }
  ];

  const SECONDARY=[
    {name:'Haukland → Uttakleiv · ancienne route côtière',tag:'BALade',detail:'4 km environ à l’aller, presque plate au niveau de la mer. Parfaite le 02/09 ; ne compte pas comme randonnée montagne.',paddy:'✅ Oui, en laisse près des animaux.',url:'https://visitlofoten.com/en/guide/himmeltinden-931-m/'},
    {name:'Linken · Svolvær',tag:'REPLI 1 H',detail:'Petite sortie panoramique si le kayak est annulé et que Sorya veut juste marcher un peu.',paddy:'✅ Oui sur terrain sec et en laisse.',url:'https://visitlofoten.com/en/10-popular-hikes-in-lofoten/'},
    {name:'Ryten',tag:'PLAN B MÉTÉO',detail:'À garder uniquement si un MVP tombe à l’eau et si Sorya réclame une vraie 3e randonnée. 3–5 h ; travaux de sentier dans le parc jusqu’au 30/09/2026.',paddy:'✅ Oui en laisse ; certaines sections peuvent demander de porter Paddy.',url:'https://visitlofoten.com/en/guide/kvalvika-and-ryten-543-m/'}
  ];

  const LOCAL_ACTIVITIES=[
    {date:'01/09',name:'Kayak guidé Henningsvær',detail:'2 h · kayak tandem stable · à partir de 1 095 NOK/personne. À choisir comme activité principale de la journée OFF si mer et vent sont bons.',url:'https://xxlofoten.no/en/experiences/kayak-henningsvaer'},
    {date:'01/09',name:'Hov · plage + sauna + chevaux + restaurant',detail:'Alternative zéro pression sans quitter la base : sauna sur la plage, balade à cheval islandais, Låven et temps libre.',url:'https://hovgard.no/en/'},
    {date:'02/09',name:'Haukland / Uttakleiv / Unstad',detail:'Journée plages, ancienne route côtière, café et photos. Objectif : ralentir entre les deux bases.',url:'https://visitlofoten.com/en/topic/beaches-in-lofoten/haukland-beach/'},
    {date:'03/09',name:'Nusfjord + Hamnøy + Sakrisøy + Reine',detail:'Journée villages sans sommet. Option kayak Reinefjord si la météo marine est meilleure que le 01/09.',url:'https://visitlofoten.com/en/destination/nusfjord-lofotens-hidden-gem/'},
    {date:'03–04/09',name:'Kayak Reinefjord · option météo',detail:'À utiliser comme plan B / complément, pas comme obligation. Garder le programme réversible selon vent et fatigue.',url:'https://booking.visitlofoten.com/experiences/moskenes/saga-adventures-lofoten/explore-reine-fjord-by-kayak?lang=en'}
  ];

  // Activities tab becomes a curated family plan, not Olivier's personal sports list.
  state.activities=[
    ['MVP #1 · Måtinden — Baugtua A/R','Andøya','Randonnée Sorya + Paddy','31/08 · 3–4 h','Modérée · falaises au sommet','✅ Oui · laisse courte + harnais',69.23567,15.9485],
    ['MVP #2 · Reinebringen — escaliers Sherpa','Reine','Randonnée Sorya','04/09 · 2–3 h','Très raide · escaliers · météo sèche','❌ Paddy non recommandé',67.924,13.083],
    ['MVP #3 option · Hoven','Gimsøy / Hov','Randonnée Sorya + Paddy','01/09 · ≈2 h','Facile · quelques sections humides','✅ Excellent choix avec chien',68.33938,14.11323],
    ['Kayak guidé Henningsvær','Henningsvær','Activité famille','01/09 · 2 h','Kayak tandem guidé','Paddy : à organiser séparément',68.154,14.201],
    ['Haukland → Uttakleiv · route côtière','Vestvågøy','Balade douce','02/09 · ≈1–2 h','Plate · route gravillonnée','✅ Oui en laisse',68.199,13.529],
    ['Nusfjord + villages de Reine','Moskenesøy','Sightseeing / repos','03/09','Très facile','✅ Oui selon règles locales',68.034,13.348]
  ];

  // Olivier manages his solo hiking independently; remove it from the shared family page/state.
  state.olivier=[];
  state.olivierPlan='Randonnées solo gérées indépendamment par Olivier ; elles ne pilotent plus l’itinéraire famille.';

  state.familyPriorities={
    version:VERSION,
    philosophy:'Maximum 2 randonnées montagne planifiées pour Sorya, une 3e seulement si elle en a envie. Deux vraies journées à faible pression et deux bases de 2 nuits.',
    mvp:MVP_HIKES.map(h=>h.name),
    fixedHikes:['Måtinden','Reinebringen'],
    optionalHike:'Hoven',
    restDays:['01/09 à Hov','03/09 villages / Reine'],
    twoNightBases:['Hov Camping 31/08 + 01/09','Moskenes Camping 03/09 + 04/09']
  };
  state.routePolicy=state.routePolicy||{};
  state.routePolicy.lofoten='Famille-first : Stave 30/08, Hov 2 nuits (31/08–01/09), Lofoten Beach Camp 02/09, Moskenes 2 nuits (03–04/09), départ 05/09.';
  if(state.current) state.current.decision='Optimiser le séjour pour Sorya + Paddy : Måtinden et Reinebringen en MVP, Hoven facultatif, deux nuits à Hov, deux nuits à Moskenes et de vraies journées OFF.';
  state.soryaPlanVersion=VERSION;

  if(typeof save==='function') save();

  function link(url,label){return `<a class="btn" href="${url}" target="_blank" rel="noopener">${label} ↗</a>`;}
  function renderMvp(h){
    const tone=h.status==='MUST DO'?'rgba(15,118,110,.10)':'rgba(190,120,0,.10)';
    return `<article class="card" style="margin:0;background:${tone}">
      <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start;flex-wrap:wrap"><div><p class="eyebrow">MVP #${h.rank} · ${esc(h.status)}</p><h3 style="margin:0">${esc(h.name)}</h3><p class="muted">${esc(h.place)}</p></div><strong>${esc(h.level)}</strong></div>
      <div class="hike-metrics"><span><b>${esc(h.time)}</b><small>Durée</small></span><span><b>${esc(h.distance)}</b><small>Distance</small></span><span><b>${esc(h.gain)}</b><small>Dénivelé</small></span></div>
      <p>${esc(h.why)}</p><p><b>Paddy :</b> ${esc(h.paddy)}</p><div class="toolbar">${link(h.url,'Fiche officielle')}</div>
    </article>`;
  }

  function renderSoryaActivities(){
    const app=byId('app'); if(!app) return;
    app.innerHTML=`
      <section class="card priority-banner">
        <p class="eyebrow">PLAN FAMILLE · SORYA + PADDY</p>
        <h2>2 randonnées incontournables · 1 troisième seulement si envie</h2>
        <p>Le roadbook partagé n’est plus construit autour des sorties sportives d’Olivier. Objectif : <b>Måtinden + Reinebringen</b>, une éventuelle <b>Hoven</b>, deux bases de 2 nuits et des journées où l’on peut simplement profiter des Lofoten.</p>
      </section>
      <section class="card" style="margin-top:12px">
        <h2>⭐ Les 3 MVP pour Sorya</h2>
        <div class="grid">${MVP_HIKES.map(renderMvp).join('')}</div>
        <div style="padding:10px 12px;border-radius:10px;background:rgba(190,80,0,.10);margin-top:12px"><b>Reinebringen + Paddy :</b> Visit Lofoten et le site officiel Reinebringen déconseillent d’y emmener un chien. Ne pas prévoir Paddy sur cette randonnée.</div>
      </section>
      <section class="card" style="margin-top:12px">
        <h2>🌿 Options secondaires — aucune obligation</h2>
        <div class="table-wrap"><table><thead><tr><th>Option</th><th>Rôle</th><th>Pourquoi</th><th>Paddy</th><th></th></tr></thead><tbody>${SECONDARY.map(x=>`<tr><td><b>${esc(x.name)}</b></td><td>${esc(x.tag)}</td><td>${esc(x.detail)}</td><td>${esc(x.paddy)}</td><td>${link(x.url,'Voir')}</td></tr>`).join('')}</tbody></table></div>
      </section>
      <section class="card" style="margin-top:12px">
        <h2>🛶 Journées OFF / activités locales</h2>
        <div class="table-wrap"><table><thead><tr><th>Date</th><th>Activité</th><th>Programme</th><th></th></tr></thead><tbody>${LOCAL_ACTIVITIES.map(x=>`<tr><td><b>${esc(x.date)}</b></td><td><b>${esc(x.name)}</b></td><td>${esc(x.detail)}</td><td>${link(x.url,'Info')}</td></tr>`).join('')}</tbody></table></div>
      </section>
      <section class="card" style="margin-top:12px;background:rgba(15,118,110,.06)">
        <h2>🚐 Rythme retenu</h2>
        <p><b>30/08</b> Stave · <b>31/08–01/09</b> Hov (2 nuits) · <b>02/09</b> Lofoten Beach Camp · <b>03–04/09</b> Moskenes (2 nuits).</p>
        <p class="muted">Cela donne deux journées sans sommet obligatoire (01/09 et 03/09) et évite de refaire le camp tous les jours.</p>
      </section>`;
  }

  renderFamily=renderSoryaActivities;
})();
