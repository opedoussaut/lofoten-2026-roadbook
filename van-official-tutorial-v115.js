'use strict';
(function installVanOfficialTutorialV115(){
  const TUTORIAL='https://tutorial.roadsurfer.com/fr/cozy-cottage/pdf-preview';
  const CHAPTERS=[
    ['1','Bienvenue'],['2','Faire le plein et charger'],['3',"L'équipement"],['4','La cuisine'],['5',"Vidanger l'eau douce et les eaux usées"],['6','La salle de bain'],['7','Le lit'],['8','Les occultations'],['9','Les sièges avant pivotent'],['10','Utilisation des fonctions de camping'],['11',"L'alimentation électrique"],['12','Le store'],['13','Informations importantes'],['14','Informations sur les retours']
  ];

  function tutorialBlock(){
    return `<section class="card" data-van-official-tutorial-v115 style="margin-top:12px;border:1px solid #99f6e4;background:linear-gradient(180deg,#f0fdfa 0%,#ffffff 100%)">
      <p class="eyebrow">DOCUMENT OFFICIEL ROADsurfer · COZY COTTAGE</p>
      <div class="map-heading"><div><h2 style="margin-bottom:4px">📚 Tutoriel complet · 103 pages</h2><p class="muted" style="margin:0">Le guide Roadsurfer officiel est maintenant directement référencé dans la fiche camping-car.</p></div><span class="van-badge">14 chapitres</span></div>
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
          <li>Le réservoir d'eau douce est présenté dans ce PDF avec une capacité de <b>100 L</b>.</li>
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
    if(app.querySelector('[data-van-official-tutorial-v115]'))return;
    const host=app.querySelector('[data-van-tutorial-v98]')||app.querySelector('.card');
    if(!host)return;
    host.insertAdjacentHTML('beforeend',tutorialBlock());
  }

  new MutationObserver(decorate).observe(document.documentElement,{childList:true,subtree:true});
  setTimeout(decorate,0);
})();
