'use strict';
(function installVanTutorialV98(){
  const TUTORIAL='https://tutorial.roadsurfer.com/fr/cozy-cottage/pdf-preview';
  const HELP='https://rent-help.roadsurfer.com/hc/fr-fr/sections/31837960546067-Cozy-Cottage-Knaus-VAN-TI-PLUS';
  const PARKING='https://roadsurfer.com/fr/location-van-amenage/france/paris/#adresse';
  function updateState(){
    if(typeof state==='undefined')return;
    state.vehicleProfile=state.vehicleProfile||{};
    Object.assign(state.vehicleProfile,{
      bookingCategory:'Roadsurfer Cozy Cottage',
      referenceModel:'Van TI Plus 650 MEG Platinum Selection - VW Crafter 2 (ou similaire)',
      status:'Catégorie confirmée — fabricant et couleur selon disponibilité au retrait',
      modelNotice:'La catégorie Cozy Cottage est confirmée. Roadsurfer indique Knaus Van Ti (Plus) 650 / VanTi 640 pour cette catégorie, mais le fabricant, la couleur et le véhicule exact restent dépendants de la disponibilité. Vérifier le véhicule réellement remis.',
      type:'Semi-intégré',seats:'4 sièges physiques · 3 places autorisées',beds:'2 adultes + 1 enfant',engine:'Diesel · au moins 140 ch · Euro 6d-Final / Euro 6E',transmission:'Automatique',adblue:'Oui — contrôler au départ et restituer selon conditions',
      bodyLength:'6,99 m',foldedRackLength:'7,33 m avec porte-vélos replié',deployedRackLength:'7,80 m avec porte-vélos déployé',height:'3,01 m fiche catégorie · 3,10 m valeur opérationnelle check-in',widthMirrors:'2,74 m fiche catégorie · 2,80 m valeur opérationnelle check-in',maxWeight:'PTAC à confirmer sur carte grise au retrait',payload:'À calculer sur le véhicule remis selon PTAC, passagers, eau, vélos et bagages',
      freshWater:'95 L',wasteWater:'73 L',gas:'2 × 11 kg',gasSystem:'Installation gaz de la catégorie Cozy Cottage',gasBottle:'2 bouteilles de 11 kg',gasUse:'Cuisine, eau chaude et chauffage selon configuration du véhicule remis; la fiche catégorie Roadsurfer indique chauffage stationnaire au gaz.',
      gpsLength:'7,80 m',gpsWidth:'2,80 m',gpsHeight:'3,20 m',gpsWeight:'PTAC carte grise',gpsNote:'Pour les ferries, Roadsurfer demande explicitement de déclarer 7,80 m. Pour la route, utiliser 3,20 m de hauteur de planification et 2,80 m de largeur, puis revalider les dimensions du véhicule réellement remis.',
      ferryGps:'FERRIES: toujours déclarer 7,80 m de longueur. Hauteur opérationnelle check-in 3,10 m; largeur avec rétroviseurs 2,80 m.'
    });
    try{if(typeof save==='function')save();}catch{}
  }
  function card(){return `<section class="card" data-van-tutorial-v98 style="border:2px solid #0f766e;margin-bottom:12px">
    <p class="eyebrow">ROADsurfer · PICK-UP · TUTORIEL · FICHE TECHNIQUE</p>
    <h2>🚐 Cozy Cottage</h2>
    <p><b>Réservation:</b> Van TI Plus 650 MEG Platinum Selection - VW Crafter 2 <b>ou similaire</b>. <b>Fabricant et couleur selon disponibilité.</b></p>
    <div class="grid">
      <div class="card"><b>📅 Retrait</b><p>24/08/2026 · 16:00</p><small class="muted">Pick-up Pass activable uniquement une fois arrivé à l'agence.</small></div>
      <div class="card"><b>📍 Agence</b><p>33 route de Versailles<br>91160 Champlan</p><small class="muted">Stationnement et circulation dans l'agence interdits pour raisons d'assurance.</small></div>
      <div class="card"><b>📐 Route / passages</b><p><b>3,10 m</b> haut check-in<br><b>2,80 m</b> rétroviseurs compris</p><small class="muted">Profil prudent GPS: 3,20 m × 2,80 m. Revalider au retrait.</small></div>
      <div class="card"><b>⛴️ Ferry</b><p><b>Déclarer 7,80 m</b></p><small class="muted">Instruction explicite Roadsurfer, même si le porte-vélos est replié.</small></div>
    </div>
    <div class="toolbar" style="margin:12px 0">
      <a class="btn primary" href="${TUTORIAL}" target="_blank" rel="noopener">📘 Tutoriel complet Roadsurfer ↗</a>
      <a class="btn" href="${HELP}" target="_blank" rel="noopener">🆘 Help Center Cozy Cottage ↗</a>
      <a class="btn" href="${PARKING}" target="_blank" rel="noopener">🅿️ Parking près de l'agence ↗</a>
    </div>
    <details open><summary><b>✅ Check-list arrivée agence</b></summary><ul>
      <li>Se garer à proximité, pas dans l'agence.</li><li>Arriver quelques minutes avant 16:00.</li><li>Activer le Pick-up Pass uniquement une fois physiquement sur place.</li><li>Préparer permis, pièce d'identité et documents demandés.</li><li>Confirmer fabricant, modèle exact, couleur, immatriculation et PTAC du véhicule réellement remis.</li><li>Photographier carrosserie, jantes, rétroviseurs, pare-brise, toit visible et intérieur avant départ.</li><li>Confirmer hauteur, largeur, longueur, kilométrage, carburant et AdBlue.</li></ul></details>
    <details><summary><b>📐 Spécifications Roadsurfer Cozy Cottage</b></summary>
      <div class="spec-grid">
        <section><h3>Dimensions</h3><p>Carrosserie: <b>6,99 m</b><br>Porte-vélos replié: <b>7,33 m</b><br>Porte-vélos déployé / ferry: <b>7,80 m</b><br>Hauteur fiche catégorie: <b>3,01 m</b><br>Largeur miroirs fiche catégorie: <b>2,74 m</b></p></section>
        <section><h3>Conduite</h3><p>Diesel · ≥140 ch<br>Boîte automatique<br>Euro 6d-Final / Euro 6E<br>Navigation, CarPlay/Android Auto, régulateur, caméra de recul</p></section>
        <section><h3>Vie à bord</h3><p>3 places route autorisées<br>2+1 couchages<br>2 sièges Isofix<br>2 chaises + 1 table extérieure<br>Réfrigérateur <b>142 L</b></p></section>
        <section><h3>Eau / énergie</h3><p>Eau propre <b>95 L</b><br>Eaux grises <b>73 L</b><br>Douche intérieure + WC + eau chaude<br>12 V + 230 V sur branchement<br>CEE + adaptateur Schuko</p></section>
        <section><h3>Gaz / confort</h3><p>2 × 11 kg gaz<br>2 feux gaz<br>Climatisation conduite<br>Clim auxiliaire à l'arrêt<br>Chauffage stationnaire gaz<br>Store</p></section>
        <section><h3>Vélos</h3><p>Thule Lift V16<br>2 vélos<br>Charge totale max <b>50 kg</b><br>Max par rail <b>30 kg</b></p></section>
      </div>
    </details>
    <details><summary><b>⚡ Aide-mémoire Cozy Cottage</b></summary><ul>
      <li><b>Eau:</b> vérifier que les leviers eau propre/eaux grises sont fermés avant remplissage.</li><li><b>Si l'eau coule sous le véhicule:</b> vérifier vidanges + vanne antigel.</li><li><b>Gaz/cuisson:</b> bouteille ouverte, sécurité de rupture de tuyau enfoncée, robinet « casserole » ouvert. Fermer après cuisson et pendant la conduite.</li><li><b>Réfrigérateur:</b> utiliser le mode Auto.</li><li><b>Eau chaude:</b> pompe active, chauffe-eau rempli, puis Truma Eco/Boost/Hot; environ 20 min.</li><li><b>Fenêtres:</b> ne pas dépasser 90°.</li><li><b>Vidanges:</b> eau propre et eaux grises via la ServiceBox sur la variante Van TI Plus montrée dans le tutoriel.</li></ul></details>
    <p class="muted">Le tutoriel Roadsurfer couvre plusieurs variantes Cozy Cottage. Les caractéristiques du véhicule réellement remis, sa carte grise et les consignes du check-in restent prioritaires.</p>
  </section>`;}
  function correctVisible(app){
    app.querySelectorAll('dt').forEach(dt=>{const dd=dt.nextElementSibling;if(!dd)return;const t=(dt.textContent||'').trim();if(t==='Hauteur')dd.textContent='3,01 m fiche · 3,10 m check-in';if(t==='Largeur')dd.textContent='2,74 m fiche · 2,80 m check-in';if(t==='Eau propre')dd.textContent='95 L';if(t==='Eaux grises')dd.textContent='73 L';if(t==='Porte-vélos déployé')dd.textContent='7,80 m · longueur à déclarer au ferry';});
    app.querySelectorAll('b').forEach(b=>{const p=b.parentElement?.querySelector('p');if(!p)return;const t=(b.textContent||'').trim();if(t==='Hauteur GPS')p.textContent='3,20 m';if(t==='Largeur')p.textContent='2,80 m';if(t==='Longueur')p.textContent='7,80 m';});
  }
  function decorate(){const app=document.getElementById('app');if(!app)return;const text=app.textContent||'';if(!text.includes('FICHE CAMPING-CAR')&&!text.includes('Niveaux pendant le voyage'))return;correctVisible(app);if(app.querySelector('[data-van-tutorial-v98]'))return;app.insertAdjacentHTML('afterbegin',card());}
  updateState();new MutationObserver(decorate).observe(document.documentElement,{childList:true,subtree:true});setTimeout(decorate,0);
})();
