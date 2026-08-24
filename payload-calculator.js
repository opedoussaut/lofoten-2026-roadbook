'use strict';

(function installPayloadCalculator(){
  const DEFAULTS={
    ptac:3500,
    payloadLimit:260,
    baselineDriver:75,
    baselineWater:20,
    items:{
      olivier:75,
      sorya:75,
      paddy:3,
      water:20,
      groceries:0,
      luggage:0,
      photo:0,
      electronics:0,
      outdoor:0,
      camping:0,
      gas:0,
      misc:0
    }
  };

  const ITEMS=[
    ['olivier','Olivier','Conducteur : 75 kg sont déjà inclus dans la masse de référence KNAUS'],
    ['sorya','Sorya','Passagère : poids complet à ajouter'],
    ['paddy','Paddy','Poids complet à ajouter'],
    ['water','Eau propre','20 L sont déjà inclus dans la masse en ordre de marche de référence'],
    ['groceries','Courses & boissons','Nourriture, bouteilles, conserves…'],
    ['luggage','Sacs de voyage & vêtements','Tous les sacs embarqués'],
    ['photo','Matériel photo & drone','Boîtiers, objectifs, drone, trépieds…'],
    ['electronics','Ordinateurs & électronique','PC, chargeurs, batteries…'],
    ['outdoor','Randonnée & sport','Chaussures, sacs, équipement outdoor…'],
    ['camping','Accessoires de camping','Mobilier et accessoires ajoutés'],
    ['gas','Gaz ajouté hors configuration remise','À compter seulement s’il s’ajoute à la configuration déjà incluse'],
    ['misc','Divers','Souvenirs, achats en route, imprévus…']
  ];

  const nf=new Intl.NumberFormat('fr-FR',{maximumFractionDigits:1});

  function clone(value){return JSON.parse(JSON.stringify(value));}

  function ensureState(){
    const current=state.payloadCalculator||{};
    state.payloadCalculator={
      ptac:Number(current.ptac)||DEFAULTS.ptac,
      payloadLimit:Number(current.payloadLimit)||DEFAULTS.payloadLimit,
      baselineDriver:Number(current.baselineDriver)||DEFAULTS.baselineDriver,
      baselineWater:Number(current.baselineWater)||DEFAULTS.baselineWater,
      items:{...clone(DEFAULTS.items),...(current.items||{})}
    };
  }

  function num(value){
    const parsed=Number(String(value??'').replace(',','.'));
    return Number.isFinite(parsed)&&parsed>=0?parsed:0;
  }

  function totals(){
    ensureState();
    const cfg=state.payloadCalculator;
    const i=cfg.items;
    const referenceMass=Math.max(0,num(cfg.ptac)-num(cfg.payloadLimit));

    // KNAUS “mass in running order” already includes a statutory 75 kg driver
    // and the model's driving fill of fresh water. Only the deltas are added.
    const driverDelta=num(i.olivier)-num(cfg.baselineDriver);
    const waterDelta=num(i.water)-num(cfg.baselineWater);
    const otherLoad=['sorya','paddy','groceries','luggage','photo','electronics','outdoor','camping','gas','misc']
      .reduce((sum,key)=>sum+num(i[key]),0);
    const addedLoad=driverDelta+waterDelta+otherLoad;
    const totalMass=referenceMass+addedLoad;
    const remaining=num(cfg.ptac)-totalMass;
    const grossCapacity=num(cfg.ptac)-referenceMass;
    return {driverDelta,waterDelta,otherLoad,addedLoad,referenceMass,totalMass,remaining,grossCapacity,ratio:grossCapacity?addedLoad/grossCapacity:0};
  }

  function inputRow([key,label,note]){
    const value=num(state.payloadCalculator.items[key]);
    return `<label class="payload-row"><span><b>${esc(label)}</b><small>${esc(note)}</small></span><span class="payload-input"><input data-payload-item="${esc(key)}" type="number" min="0" step="0.5" inputmode="decimal" value="${value}"><em>${key==='water'?'L':'kg'}</em></span></label>`;
  }

  function renderSection(){
    ensureState();
    const cfg=state.payloadCalculator;
    return `
      <section id="payload-calculator" class="card payload-card">
        <p class="eyebrow">WI RS 4849 · PTAC · MASSE DE RÉFÉRENCE · CHARGE RÉELLEMENT AJOUTÉE</p>
        <div class="map-heading"><div><h2>⚖️ Calculateur de charge utile</h2><p class="muted">Calcul corrigé pour éviter de compter deux fois le conducteur et l’eau déjà inclus dans la masse en ordre de marche.</p></div><span id="payload-status" class="payload-badge">Calcul en cours</span></div>

        <div class="payload-reference-grid">
          <label><span>PTAC de référence</span><span class="payload-input"><input id="payload-ptac" type="number" min="1" step="1" value="${num(cfg.ptac)}"><em>kg</em></span></label>
          <label><span>Capacité brute jusqu’au PTAC</span><span class="payload-input"><input id="payload-limit" type="number" min="1" step="1" value="${num(cfg.payloadLimit)}"><em>kg</em></span></label>
        </div>

        <div class="popup-warning payload-factbox"><b>Correction importante :</b> la masse en ordre de marche KNAUS inclut déjà <b>75 kg pour le conducteur</b> et l’eau propre en position conduite. Olivier ne doit donc pas être ajouté une seconde fois à 100 %, et avec 20 L d’eau il n’y a pas 20 kg supplémentaires à ajouter.</div>
        <p class="muted payload-source-note"><b>Véhicule réel :</b> Cozy Cottage WI RS 4849, première immatriculation 03/07/2023. Le contrat Roadsurfer reçu confirme l’identité du véhicule mais ne donne pas les champs de masse de la carte grise. Le calcul conserve donc pour l’instant le PTAC 3 500 kg et la capacité opérationnelle d’environ 260 kg déjà utilisée comme référence. La valeur exacte F.2/G/G.1 de la carte grise ou une pesée restent prioritaires.</p>

        <div class="payload-kpis">
          <div><span>Masse véhicule de référence</span><strong id="payload-kpi-empty">—</strong><small>PTAC − capacité brute</small></div>
          <div><span>Charge ajoutée vs référence</span><strong id="payload-kpi-loaded">—</strong><small>conducteur/eau corrigés</small></div>
          <div><span>Masse totale estimée</span><strong id="payload-kpi-total">—</strong></div>
          <div><span>Marge sous PTAC</span><strong id="payload-kpi-remaining">—</strong></div>
          <div><span>Capacité brute de référence</span><strong id="payload-kpi-limit">—</strong></div>
        </div>

        <div class="payload-progress" aria-label="Utilisation de la capacité disponible"><span id="payload-progress-bar"></span></div>
        <p id="payload-message" class="payload-message"></p>

        <details class="payload-baseline" open><summary><b>🧮 Ce qui est déjà compris dans la référence</b></summary><ul>
          <li><b>Conducteur :</b> 75 kg réglementaires. Si Olivier pèse 80 kg, le calcul n’ajoute que +5 kg; s’il pèse 70 kg, il retranche 5 kg.</li>
          <li><b>Eau propre en conduite :</b> 20 L de référence. Avec 50 L, le calcul ajoute +30 kg; avec le plein de 100 L, +80 kg.</li>
          <li><b>Carburant / fluides / équipement de série :</b> compris dans la notion KNAUS de masse en ordre de marche.</li>
          <li><b>Sorya, Paddy, bagages, courses et matériel :</b> ajoutés intégralement.</li>
        </ul></details>

        <div class="payload-water-presets" aria-label="Raccourcis eau propre">
          <b>Eau propre :</b>
          <button type="button" data-water-preset="20">Conduite 20 L</button>
          <button type="button" data-water-preset="50">50 L</button>
          <button type="button" data-water-preset="100">Plein 100 L</button>
        </div>

        <div class="payload-items">${ITEMS.map(inputRow).join('')}</div>

        <div class="toolbar payload-toolbar">
          <button id="payload-save" class="primary" type="button">Enregistrer les poids</button>
          <button id="payload-reset" type="button">Réinitialiser l’estimation</button>
        </div>
        <div class="popup-warning"><b>Contrôle réel indispensable :</b> seule une pesée du camping-car chargé confirme la masse totale et la répartition par essieu. La carte grise, la plaque constructeur et les limites d’essieux du véhicule remis restent prioritaires.</div>
      </section>`;
  }

  function refreshSummary(){
    const cfg=state.payloadCalculator;
    const result=totals();
    const limit=result.grossCapacity;
    const remaining=result.remaining;
    const over=Math.max(0,-remaining);
    const usedPct=limit?Math.round(result.addedLoad/limit*100):0;
    const status=byId('payload-status');
    const message=byId('payload-message');
    const bar=byId('payload-progress-bar');

    byId('payload-kpi-limit').textContent=`${nf.format(limit)} kg`;
    byId('payload-kpi-empty').textContent=`${nf.format(result.referenceMass)} kg`;
    byId('payload-kpi-loaded').textContent=`${nf.format(result.addedLoad)} kg`;
    byId('payload-kpi-total').textContent=`${nf.format(result.totalMass)} kg`;
    byId('payload-kpi-remaining').textContent=`${nf.format(remaining)} kg`;

    let level='safe';
    let label='Marge confortable';
    let text=`${nf.format(remaining)} kg restent sous le PTAC de référence.`;
    if(over>0){
      level='danger';label='PTAC potentiellement dépassé';
      text=`Dépassement estimé de ${nf.format(over)} kg. Réduire le chargement ou l’eau avant de rouler et contrôler la masse réelle.`;
    }else if(remaining<25){
      level='danger';label='Marge très faible';
      text=`Il ne reste que ${nf.format(remaining)} kg sous le PTAC. Une pesée est fortement recommandée avant une longue étape.`;
    }else if(remaining<50){
      level='warn';label='Marge limitée';
      text=`Il reste ${nf.format(remaining)} kg sous le PTAC. Attention aux achats, à l’eau ajoutée et au matériel pris en route.`;
    }

    status.className=`payload-badge ${level}`;
    status.textContent=label;
    message.className=`payload-message ${level}`;
    message.textContent=text;
    bar.className=level;
    bar.style.width=`${Math.min(100,Math.max(0,usedPct))}%`;
    byId('payload-kpi-remaining').className=level;
  }

  function readInputs(){
    ensureState();
    state.payloadCalculator.ptac=num(byId('payload-ptac')?.value);
    state.payloadCalculator.payloadLimit=num(byId('payload-limit')?.value);
    document.querySelectorAll('[data-payload-item]').forEach(input=>{
      state.payloadCalculator.items[input.dataset.payloadItem]=num(input.value);
    });
  }

  function bindSection(){
    const root=byId('payload-calculator');
    if(!root)return;

    root.querySelectorAll('input').forEach(input=>input.addEventListener('input',()=>{
      readInputs();refreshSummary();
    }));

    root.querySelectorAll('[data-water-preset]').forEach(button=>button.onclick=()=>{
      const input=root.querySelector('[data-payload-item="water"]');
      input.value=button.dataset.waterPreset;
      readInputs();refreshSummary();
    });

    byId('payload-save').onclick=()=>{
      readInputs();save();autoSync();refreshSummary();
      const button=byId('payload-save');
      const original=button.textContent;
      button.textContent='✓ Enregistré';
      setTimeout(()=>{if(button)button.textContent=original;},1200);
    };

    byId('payload-reset').onclick=()=>{
      state.payloadCalculator=clone(DEFAULTS);
      save();autoSync();
      byId('payload-calculator').outerHTML=renderSection();
      bindSection();refreshSummary();
    };

    refreshSummary();
  }

  function inject(){
    if(active!=='van'||byId('payload-calculator'))return;
    const app=byId('app');
    if(!app)return;
    const anchor=[...app.querySelectorAll('section.card')].find(section=>section.textContent.includes('DIMENSIONS À GARDER SOUS LES YEUX'));
    if(anchor)anchor.insertAdjacentHTML('afterend',renderSection());
    else app.insertAdjacentHTML('beforeend',renderSection());
    bindSection();
  }

  function installStyles(){
    if(byId('payload-calculator-styles'))return;
    const style=document.createElement('style');
    style.id='payload-calculator-styles';
    style.textContent=`
      .payload-card{margin-bottom:12px;border:2px solid #c7a44a}
      .payload-reference-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:10px;margin:14px 0 6px}
      .payload-reference-grid>label,.payload-row{display:flex;align-items:center;justify-content:space-between;gap:12px;border:1px solid #d8e0e5;border-radius:10px;padding:10px;background:#fff}
      .payload-source-note{margin-top:10px}.payload-factbox{margin:12px 0 8px}
      .payload-input{display:flex;align-items:center;gap:5px;white-space:nowrap}
      .payload-input input{width:92px;text-align:right;margin:0}
      .payload-input em{font-style:normal;color:#5d6c76;min-width:20px}
      .payload-kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:9px;margin:14px 0}
      .payload-kpis>div{background:#f5f8fa;border-radius:10px;padding:11px;display:flex;flex-direction:column;gap:3px}
      .payload-kpis span,.payload-kpis small{color:#5d6c76;font-size:.82rem}
      .payload-kpis strong{font-size:1.25rem}
      .payload-progress{height:14px;background:#e4e9ec;border-radius:999px;overflow:hidden;margin:10px 0 6px}
      .payload-progress span{display:block;height:100%;width:0;transition:width .2s ease;background:#2f855a}
      .payload-progress span.warn{background:#c47b16}.payload-progress span.danger{background:#c43d35}
      .payload-badge{display:inline-flex;align-items:center;padding:6px 9px;border-radius:999px;background:#e6f4ec;color:#25633f;font-size:.82rem;font-weight:700}
      .payload-badge.warn{background:#fff2d8;color:#8a570c}.payload-badge.danger{background:#fde5e2;color:#9e2f29}
      .payload-message{font-weight:600;margin:6px 0 12px;color:#25633f}.payload-message.warn{color:#8a570c}.payload-message.danger,.payload-kpis strong.danger{color:#9e2f29}.payload-kpis strong.warn{color:#8a570c}
      .payload-water-presets{display:flex;align-items:center;flex-wrap:wrap;gap:7px;margin:10px 0}
      .payload-water-presets button{padding:6px 10px}
      .payload-baseline{margin:10px 0}.payload-baseline ul{margin-bottom:0}
      .payload-items{display:grid;grid-template-columns:repeat(auto-fit,minmax(310px,1fr));gap:8px;margin-top:10px}
      .payload-row span:first-child{display:flex;flex-direction:column}.payload-row small{color:#6b7780;margin-top:2px}
      .payload-toolbar{margin-top:14px}
      @media(max-width:560px){.payload-items{grid-template-columns:1fr}.payload-row{align-items:flex-start}.payload-input input{width:78px}.payload-kpis{grid-template-columns:repeat(2,1fr)}}
    `;
    document.head.appendChild(style);
  }

  ensureState();
  installStyles();

  const originalRenderVan=window.renderVan;
  window.renderVan=function renderVanWithPayload(){
    originalRenderVan();
    inject();
  };

  document.addEventListener('DOMContentLoaded',()=>{
    const app=byId('app');
    if(!app)return;
    const observer=new MutationObserver(()=>{
      if(active==='van'&&!byId('payload-calculator'))queueMicrotask(inject);
    });
    observer.observe(app,{childList:true});
  });
})();
