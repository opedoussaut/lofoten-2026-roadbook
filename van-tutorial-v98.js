'use strict';
(function installVanTutorialV98(){
  const TUTORIAL='https://tutorial.roadsurfer.com/fr/cozy-cottage/pdf-preview';
  const HELP='https://rent-help.roadsurfer.com/hc/fr-fr/sections/31837960546067-Cozy-Cottage-Knaus-VAN-TI-PLUS';
  const PARKING='https://roadsurfer.com/fr/location-van-amenage/france/paris/#adresse';
  function updateState(){
    if(typeof state==='undefined')return;
    state.vehicleProfile=state.vehicleProfile||{};
    Object.assign(state.vehicleProfile,{bookingCategory:'Roadsurfer Cozy Cottage',referenceModel:'Van TI Plus 650 MEG Platinum Selection - VW Crafter 2 (exemple de catégorie)',status:'Ou véhicule similaire — fabricant et couleur selon disponibilité',modelNotice:'La catégorie Cozy Cottage est confirmée. Le fabricant, la couleur et le véhicule exact sont attribués selon disponibilité au retrait. Vérifier modèle, immatriculation et caractéristiques du véhicule réellement remis.',height:'3,10 m — valeur opérationnelle communiquée par Roadsurfer',widthMirrors:'2,80 m avec rétroviseurs — valeur Roadsurfer',gpsHeight:'3,20 m minimum conseillé',gpsWidth:'2,80 m',gpsNote:'Roadsurfer indique 3,10 m de hauteur totale et 2,80 m avec rétroviseurs. Garder une marge; ne jamais tenter un passage signalé à 3,10 m. Revalider ces dimensions sur le véhicule remis.'});
    try{if(typeof save==='function')save();}catch{}
  }
  function card(){return `<section class="card" data-van-tutorial-v98 style="border:2px solid #0f766e;margin-bottom:12px">
    <p class="eyebrow">ROADsurfer · PICK-UP & TUTORIEL</p>
    <h2>🚐 Cozy Cottage</h2>
    <p><b>Réservation:</b> Van TI Plus 650 MEG Platinum Selection - VW Crafter 2 <b>ou similaire</b>. <b>Fabricant et couleur selon disponibilité.</b></p>
    <div class="grid">
      <div class="card"><b>📅 Retrait</b><p>24/08/2026 · 16:00</p><small class="muted">Pick-up Pass activable uniquement une fois arrivé à l'agence.</small></div>
      <div class="card"><b>📍 Agence</b><p>33 route de Versailles<br>91160 Champlan</p><small class="muted">Stationnement et circulation dans l'agence interdits pour raisons d'assurance.</small></div>
      <div class="card"><b>📐 Gabarit communiqué</b><p>3,10 m haut<br>2,80 m avec rétroviseurs</p><small class="muted">Utiliser 3,20 m comme marge de planification et revalider au retrait.</small></div>
      <div class="card"><b>💧 Eau douce</b><p>100 L</p><small class="muted">Le tutoriel montre la ServiceBox côté conducteur pour le Van TI Plus 650 MEG.</small></div>
    </div>
    <div class="toolbar" style="margin:12px 0">
      <a class="btn primary" href="${TUTORIAL}" target="_blank" rel="noopener">📘 Tutoriel complet Roadsurfer ↗</a>
      <a class="btn" href="${HELP}" target="_blank" rel="noopener">🆘 Help Center Cozy Cottage ↗</a>
      <a class="btn" href="${PARKING}" target="_blank" rel="noopener">🅿️ Parking près de l'agence ↗</a>
    </div>
    <details open><summary><b>✅ Check-list arrivée agence</b></summary><ul>
      <li>Se garer à proximité, pas dans l'agence.</li>
      <li>Arriver quelques minutes avant 16:00.</li>
      <li>Activer le Pick-up Pass uniquement une fois physiquement sur place.</li>
      <li>Préparer permis, pièce d'identité et documents demandés.</li>
      <li>Confirmer le fabricant, le modèle exact, la couleur et l'immatriculation du véhicule réellement remis.</li>
      <li>Photographier carrosserie, jantes, rétroviseurs, pare-brise, toit visible et intérieur avant départ.</li>
      <li>Confirmer PTAC, hauteur, largeur, longueur, kilométrage, carburant et AdBlue.</li>
    </ul></details>
    <details><summary><b>⚡ Aide-mémoire Cozy Cottage</b></summary><ul>
      <li><b>Eau:</b> vérifier que les leviers eau propre/eaux grises sont fermés avant remplissage.</li>
      <li><b>Si l'eau coule sous le véhicule:</b> vérifier vidanges + vanne antigel.</li>
      <li><b>Gaz/cuisson:</b> bouteille ouverte, sécurité de rupture de tuyau enfoncée, robinet « casserole » ouvert. Fermer après cuisson et pendant la conduite.</li>
      <li><b>Réfrigérateur:</b> utiliser le mode Auto.</li>
      <li><b>Eau chaude:</b> pompe active, chauffe-eau rempli, puis Truma Eco/Boost/Hot; environ 20 min.</li>
      <li><b>Fenêtres:</b> ne pas dépasser 90°.</li>
      <li><b>Vidanges:</b> eau propre et eaux grises via la ServiceBox sur la variante Van TI Plus montrée dans le tutoriel.</li>
    </ul></details>
    <p class="muted">Le tutoriel Roadsurfer couvre plusieurs variantes Cozy Cottage. Les commandes et caractéristiques du véhicule réellement remis restent prioritaires.</p>
  </section>`;}
  function correctVisible(app){
    app.querySelectorAll('dt').forEach(dt=>{const dd=dt.nextElementSibling;if(!dd)return;const t=(dt.textContent||'').trim();if(t==='Hauteur')dd.textContent='3,10 m — à revalider au retrait';if(t==='Largeur')dd.textContent='2,80 m avec rétroviseurs — à revalider';});
    app.querySelectorAll('b').forEach(b=>{const p=b.parentElement?.querySelector('p');if(!p)return;const t=(b.textContent||'').trim();if(t==='Hauteur GPS')p.textContent='3,20 m';if(t==='Largeur')p.textContent='2,80 m';});
  }
  function decorate(){
    const app=document.getElementById('app');if(!app)return;
    const text=app.textContent||'';
    if(!text.includes('FICHE CAMPING-CAR')&&!text.includes('Niveaux pendant le voyage'))return;
    correctVisible(app);
    if(app.querySelector('[data-van-tutorial-v98]'))return;
    app.insertAdjacentHTML('afterbegin',card());
  }
  updateState();
  new MutationObserver(decorate).observe(document.documentElement,{childList:true,subtree:true});
  setTimeout(decorate,0);
})();
