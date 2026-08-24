'use strict';
(function installVanTutorialV98(){
  const TUTORIAL='https://tutorial.roadsurfer.com/fr/cozy-cottage/pdf-preview';
  const HELP='https://rent-help.roadsurfer.com/hc/fr-fr/sections/31837960546067-Cozy-Cottage-Knaus-VAN-TI-PLUS';
  const ACCOUNT='https://account.roadsurfer.com/fr?redirect_to=overview&redirect_booking_number=3641456462';
  function updateState(){
    if(typeof state==='undefined')return;
    state.vehicleProfile=state.vehicleProfile||{};
    Object.assign(state.vehicleProfile,{
      bookingCategory:'Roadsurfer Cozy Cottage',
      referenceModel:'Cozy Cottage · référence technique KNAUS Van TI Plus / VW Crafter',
      status:'Véhicule attribué · contrat signé 24/08/2026',
      modelNotice:'Véhicule contractuel confirmé : WI RS 4849, VIN WV3ZZZSZ0P9051241, diesel, première immatriculation 03/07/2023, 50 613 km au départ. Les dimensions et équipements ci-dessous proviennent de la fiche/tutoriel de la catégorie Cozy Cottage; la carte grise et le véhicule réel restent prioritaires.',
      bookingNumber:'3641456462',plate:'WI RS 4849',vin:'WV3ZZZSZ0P9051241',firstRegistration:'03/07/2023',startMileage:'50 613 km',fuelType:'Diesel',
      pickup:'24/08/2026 · 16:00 · Champlan',return:'12/09/2026 · 16:00 · Champlan',rentalTotal:'2 285 € · payé',deposit:'800 € · payé',protection:'Basic protection · franchise 3 000 € · 2 conducteurs inclus',mileagePlan:'Kilométrage illimité',bikeRack:'Porte-vélos 2 vélos',
      type:'Semi-intégré',seats:'4 sièges physiques · 3 places autorisées',beds:'2 adultes + 1 enfant',engine:'Diesel · au moins 140 ch · Euro 6d-Final / Euro 6E',transmission:'Automatique selon fiche catégorie',adblue:'Oui — contrôler et restituer selon conditions',
      bodyLength:'6,99 m',foldedRackLength:'7,33 m avec porte-vélos replié',deployedRackLength:'7,80 m avec porte-vélos déployé',height:'3,01 m fiche catégorie · 3,10 m valeur opérationnelle check-in',widthMirrors:'2,74 m fiche catégorie · 2,80 m valeur opérationnelle check-in',maxWeight:'PTAC à confirmer sur carte grise',payload:'À calculer selon PTAC, passagers, eau, vélos et bagages',
      freshWater:'95 L',wasteWater:'73 L',gas:'2 × 11 kg',gasSystem:'Installation gaz de la catégorie Cozy Cottage',gasBottle:'2 bouteilles de 11 kg',gasUse:'Cuisine, eau chaude et chauffage selon configuration du véhicule réel; suivre en priorité les consignes du véhicule et du tutoriel.',
      gpsLength:'7,80 m',gpsWidth:'2,80 m',gpsHeight:'3,20 m',gpsWeight:'3,50 t',gpsNote:'Profil prudent de navigation : 7,80 m × 2,80 m × 3,20 m. La signalisation locale et la carte grise restent prioritaires.',
      ferryGps:'FERRIES: toujours déclarer 7,80 m de longueur. Pour la route, conserver 3,20 m de hauteur et 2,80 m de largeur dans le profil GPS.'
    });
    try{if(typeof save==='function')save();}catch{}
  }
  function card(){return `<section class="card" data-van-tutorial-v98 style="border:2px solid #0f766e;margin-bottom:12px">
    <p class="eyebrow">ROADsurfer · CONTRAT SIGNÉ · TUTORIEL · FICHE TECHNIQUE</p>
    <h2>🚐 Cozy Cottage · WI RS 4849</h2>
    <p><b>Contrat 3641456462 :</b> véhicule attribué et pris en charge le 24/08/2026. Diesel · 50 613 km au départ · première immatriculation 03/07/2023.</p>
    <div class="grid">
      <div class="card"><b>🪪 Véhicule</b><p><b>WI RS 4849</b><br>VIN WV3ZZZSZ0P9051241</p><small class="muted">Le contrat Roadsurfer est la référence d'identité du véhicule.</small></div>
      <div class="card"><b>📅 Retour</b><p><b>12/09/2026 · 16:00</b><br>33 route de Versailles<br>91160 Champlan</p><small class="muted">Prévoir une vraie marge d'arrivée.</small></div>
      <div class="card"><b>🛡️ Contrat</b><p>Caution <b>800 €</b><br>Franchise de base <b>3 000 €</b><br>Kilométrage illimité</p><small class="muted">2 conducteurs inclus · porte-vélos 2 vélos.</small></div>
      <div class="card"><b>📐 Profil route</b><p><b>3,20 m</b> haut<br><b>2,80 m</b> large<br><b>7,80 m</b> long</p><small class="muted">Valeurs prudentes de navigation.</small></div>
    </div>
    <div class="toolbar" style="margin:12px 0">
      <a class="btn primary" href="${ACCOUNT}" target="_blank" rel="noopener">🆘 Compte / aide Roadsurfer ↗</a>
      <a class="btn" href="${TUTORIAL}" target="_blank" rel="noopener">📘 Tutoriel complet ↗</a>
      <a class="btn" href="${HELP}" target="_blank" rel="noopener">Help Center Cozy Cottage ↗</a>
    </div>
    <details open><summary><b>⚠️ À garder en tête pendant le voyage</b></summary><ul>
      <li>Le contrat contient une liste détaillée de dommages préexistants; elle est reproduite dans la fiche camping-car juste en dessous.</li><li>Deux dommages ont été ajoutés le jour du départ : fracture du pare-chocs arrière (#660354) et porte de salle d'eau/soute détachée (#660129).</li><li>Un trousseau de clés est indiqué manquant depuis le 19/08/2026 (#654551).</li><li>Photographier immédiatement tout nouveau défaut découvert et le signaler à Roadsurfer via l'aide sur la route.</li><li>Au retour, refaire des photos complètes avant la remise des clés.</li></ul></details>
    <details><summary><b>📐 Spécifications Roadsurfer Cozy Cottage</b></summary>
      <div class="spec-grid">
        <section><h3>Dimensions</h3><p>Carrosserie: <b>6,99 m</b><br>Porte-vélos replié: <b>7,33 m</b><br>Porte-vélos déployé / ferry: <b>7,80 m</b><br>Hauteur fiche catégorie: <b>3,01 m</b><br>Largeur miroirs fiche catégorie: <b>2,74 m</b></p></section>
        <section><h3>Conduite</h3><p>Diesel · ≥140 ch<br>Boîte automatique selon fiche catégorie<br>Euro 6d-Final / Euro 6E<br>Navigation, CarPlay/Android Auto, régulateur, caméra de recul</p></section>
        <section><h3>Vie à bord</h3><p>3 places route autorisées<br>2+1 couchages<br>2 sièges Isofix<br>2 chaises + 1 table extérieure<br>Réfrigérateur <b>142 L</b></p></section>
        <section><h3>Eau / énergie</h3><p>Eau propre <b>95 L</b><br>Eaux grises <b>73 L</b><br>Douche intérieure + WC + eau chaude<br>12 V + 230 V sur branchement<br>CEE + adaptateur Schuko</p></section>
        <section><h3>Gaz / confort</h3><p>2 × 11 kg gaz<br>2 feux gaz<br>Climatisation conduite<br>Clim auxiliaire à l'arrêt<br>Chauffage stationnaire selon configuration<br>Store</p></section>
        <section><h3>Vélos</h3><p>Thule Lift V16<br>2 vélos<br>Charge totale max <b>50 kg</b><br>Max par rail <b>30 kg</b></p></section>
      </div>
    </details>
    <details><summary><b>⚡ Aide-mémoire Cozy Cottage</b></summary><ul>
      <li><b>Eau:</b> vérifier que les leviers eau propre/eaux grises sont fermés avant remplissage.</li><li><b>Si l'eau coule sous le véhicule:</b> vérifier vidanges + vanne antigel.</li><li><b>Gaz/cuisson:</b> bouteille ouverte, sécurité de rupture de tuyau enfoncée, robinet « casserole » ouvert. Fermer après cuisson et pendant la conduite.</li><li><b>Réfrigérateur:</b> utiliser le mode Auto.</li><li><b>Eau chaude:</b> pompe active, chauffe-eau rempli, puis Truma Eco/Boost/Hot; environ 20 min.</li><li><b>Fenêtres:</b> ne pas dépasser 90°.</li><li><b>Vidanges:</b> eau propre et eaux grises via la ServiceBox sur la variante Van TI Plus montrée dans le tutoriel.</li></ul></details>
    <p class="muted">Le tutoriel Roadsurfer couvre plusieurs variantes Cozy Cottage. Le contrat signé, la carte grise et les caractéristiques du véhicule réellement remis ont priorité.</p>
  </section>`;}
  function correctVisible(app){
    app.querySelectorAll('dt').forEach(dt=>{const dd=dt.nextElementSibling;if(!dd)return;const t=(dt.textContent||'').trim();if(t==='Hauteur')dd.textContent='3,01 m fiche · 3,10 m check-in';if(t==='Largeur')dd.textContent='2,74 m fiche · 2,80 m check-in';if(t==='Eau propre')dd.textContent='95 L';if(t==='Eaux grises')dd.textContent='73 L';if(t==='Porte-vélos déployé')dd.textContent='7,80 m · longueur prudente';});
    app.querySelectorAll('b').forEach(b=>{const p=b.parentElement?.querySelector('p');if(!p)return;const t=(b.textContent||'').trim();if(t==='Hauteur GPS')p.textContent='3,20 m';if(t==='Largeur')p.textContent='2,80 m';if(t==='Longueur')p.textContent='7,80 m';});
  }
  function decorate(){const app=document.getElementById('app');if(!app)return;const text=app.textContent||'';if(!text.includes('FICHE CAMPING-CAR')&&!text.includes('Niveaux pendant le voyage'))return;correctVisible(app);if(app.querySelector('[data-van-tutorial-v98]'))return;app.insertAdjacentHTML('afterbegin',card());}
  updateState();new MutationObserver(decorate).observe(document.documentElement,{childList:true,subtree:true});setTimeout(decorate,0);
})();