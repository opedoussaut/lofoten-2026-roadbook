'use strict';
(function installVanOfficialTutorialV115(){
  const TUTORIAL='https://tutorial.roadsurfer.com/fr/cozy-cottage/pdf-preview';
  const CHAPTERS=[
    ['1','Bienvenue'],['2','Faire le plein et charger'],['3',"L'équipement"],['4','La cuisine'],['5',"Vidanger l'eau douce et les eaux usées"],['6','La salle de bain'],['7','Le lit'],['8','Les occultations'],['9','Les sièges avant pivotent'],['10','Utilisation des fonctions de camping'],['11',"L'alimentation électrique"],['12','Le store'],['13','Informations importantes'],['14','Informations sur les retours']
  ];

  function applyOfficialFacts(){
    try{
      if(typeof state!=='undefined'){
        state.vehicleProfile=state.vehicleProfile||{};
        Object.assign(state.vehicleProfile,{
          freshWater:'100 L',
          wasteWater:'73 L',
          maxWeight:'PTAC de référence 3 500 kg — carte grise F.2 prioritaire',
          payload:'≈260 kg de marge brute de référence jusqu’au PTAC. Attention : la masse en ordre de marche KNAUS inclut déjà 75 kg de conducteur et l’eau en position conduite; ne pas les compter deux fois. Carte grise et pesée prioritaires.'
        });
        if(typeof save==='function')save();
      }
    }catch{}
  }

  function correctVisibleFacts(app){
    app.querySelectorAll('dt').forEach(dt=>{
      const dd=dt.nextElementSibling;if(!dd)return;
      const t=(dt.textContent||'').trim();
      if(t==='Eau propre')dd.textContent='100 L';
      if(t==='Eaux grises')dd.textContent='73 L';
      if(t==='PTAC')dd.textContent='3 500 kg de référence · carte grise F.2 prioritaire';
      if(t==='Charge utile')dd.textContent='≈260 kg de marge brute · conducteur 75 kg + eau conduite déjà inclus dans la masse de référence';
    });
  }

  function tutorialBlock(){
    return `<section class="card" data-van-official-tutorial-v115 style="margin-top:12px;border:1px solid #99f6e4;background:linear-gradient(180deg,#f0fdfa 0%,#ffffff 100%)">
      <p class="eyebrow">DOCUMENT OFFICIEL ROADsurfer · COZY COTTAGE</p>
      <div class="map-heading"><div><h2 style="margin-bottom:4px">📚 Tutoriel complet · 103 pages</h2><p class="muted" style="margin:0">Le guide Roadsurfer officiel est directement référencé dans la fiche camping-car.</p></div><span class="van-badge">14 chapitres</span></div>
      <div class="toolbar" style="margin:12px 0">
        <a class="btn primary" href="${TUTORIAL}" target="_blank" rel="noopener">📘 Ouvrir le tutoriel Roadsurfer ↗</a>
      </div>
      <details open>
        <summary><b>🧭 Sommaire du tutoriel</b></summary>
        <div class="spec-grid" style="margin-top:10px">
          ${CHAPTERS.map(([n,title])=>`<section><b>${n}. ${title}</b></section>`).join('')}
        </div>
      </details>
      <details>
        <summary><b>🚐 Variantes couvertes par le PDF</b></summary>
        <p>Le document Roadsurfer indique qu'il couvre plusieurs variantes du Cozy Cottage, notamment les Knaus Van TI 650 MEG, Van TI Plus 650 MEG Platinum Selection, Van Ti 640 MEG Vansation / Fiat 650 MEG Vansation, ainsi que certaines pages Bürstner Lyseo 690G.</p>
        <p class="muted">À la prise en charge et pendant le voyage, utiliser en priorité les instructions correspondant au véhicule réellement remis et à son écran de commande.</p>
      </details>
      <details>
        <summary><b>⚠️ Repères importants du tutoriel</b></summary>
        <ul>
          <li>Le tutoriel précise une hauteur totale opérationnelle de <b>3,1 m</b> et une largeur avec rétroviseurs de <b>2,8 m</b>.</li>
          <li>Le réservoir d'eau douce est présenté avec une capacité de <b>100 L</b>.</li>
          <li>Les prises 230 V nécessitent une alimentation extérieure; les ports USB et prises 12 V de la cellule restent utilisables sans branchement extérieur.</li>
          <li>Le store ne doit pas être utilisé en cas de vent ou de pluie et doit être rentré la nuit ou lors d'une absence prolongée.</li>
          <li>Le tutoriel recommande de surveiller la batterie cellule chaque soir avant d'utiliser le chauffage autonome.</li>
        </ul>
        <p class="muted">Ces repères sont issus du tutoriel Roadsurfer. En cas d'écart avec la carte grise, le contrat, l'étiquette du véhicule ou l'équipement réellement installé, ces derniers restent prioritaires.</p>
      </details>
    </section>`;
  }

  function decorate(){
    const app=document.getElementById('app');
    if(!app)return;
    const text=app.textContent||'';
    if(!text.includes('FICHE CAMPING-CAR')&&!text.includes('Cozy Cottage · WI RS 4849')&&!text.includes('Niveaux pendant le voyage'))return;
    applyOfficialFacts();
    correctVisibleFacts(app);
    if(app.querySelector('[data-van-official-tutorial-v115]'))return;
    const host=app.querySelector('[data-van-tutorial-v98]')||app.querySelector('.card');
    if(!host)return;
    host.insertAdjacentHTML('beforeend',tutorialBlock());
    correctVisibleFacts(app);
  }

  applyOfficialFacts();
  new MutationObserver(decorate).observe(document.documentElement,{childList:true,subtree:true});
  setTimeout(decorate,0);
})();
