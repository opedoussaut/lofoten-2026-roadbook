'use strict';

(function installDetailedVanProfile(){
  const PROFILE={
    bookingCategory:'Roadsurfer Cozy Cottage',
    referenceModel:'KNAUS VAN TI PLUS',
    status:'Modèle de référence — véhicule exact à confirmer lors de la remise',
    modelNotice:'La réservation porte sur la catégorie Cozy Cottage. Roadsurfer peut remettre un véhicule comparable ou supérieur; le modèle, l’immatriculation et les caractéristiques exactes doivent donc être vérifiés à Champlan le 24 août.',
    type:'Camping-car semi-intégré',
    seats:'3 places route adultes',
    beds:'2 couchages adultes + 1 couchage enfant',
    engine:'Diesel · 140 ch · Euro 6',
    transmission:'Manuelle ou automatique selon le véhicule remis',
    adblue:'Oui — niveau à contrôler au départ et plein à restituer',
    bodyLength:'6,99 m',
    foldedRackLength:'7,33 m avec porte-vélos replié',
    deployedRackLength:'7,80 m avec porte-vélos déployé',
    height:'3,15 m de référence',
    widthMirrors:'2,74 m avec rétroviseurs',
    maxWeight:'PTAC de référence 3 500 kg — valeur de la carte grise prioritaire',
    payload:'Environ 260 kg annoncés par Roadsurfer, passagers, bagages et eau compris selon leurs conditions',
    freshWater:'95 L',
    wasteWater:'73 L',
    gas:'PROPANE — pas de butane pour la Scandinavie',
    gasSystem:'Installation 30 mbar',
    gasBottle:'Compartiment de référence prévu pour jusqu’à 2 bouteilles de 11 kg. Le nombre, le format, le remplissage et le raccord doivent être vérifiés à la remise.',
    gasUse:'Gaz prévu au minimum pour les deux feux de cuisson. Chauffage annoncé au diesel en Europe continentale; vérifier sur le véhicule remis le fonctionnement exact du chauffage et de l’eau chaude.',
    gpsLength:'7,80 m',
    gpsWidth:'2,74 m',
    gpsHeight:'3,25 m',
    gpsWeight:'3,50 t',
    gpsNote:'Profil volontairement prudent: porte-vélos déployé et marge de 10 cm sur la hauteur.',
    ferryGps:'Conserver «éviter les ferries» activé tous les jours sauf le 4 septembre, puis forcer manuellement le terminal de Moskenes et le terminal de Bodø.'
  };

  const PICKUP=[
    'Photographier les quatre côtés, le toit visible, le pare-brise, les jantes, les rétroviseurs et chaque défaut avant de quitter Champlan.',
    'Photographier la carte grise et relever PTAC, longueur, largeur, hauteur, carburant et immatriculation.',
    'Mesurer ou confirmer la hauteur réelle avec antenne, lanterneau et tout équipement de toit.',
    'Confirmer la longueur porte-vélos replié et déployé; saisir la valeur la plus défavorable dans le GPS.',
    'Vérifier niveau de carburant et AdBlue, kilométrage, pression des pneus indiquée sur l’étiquette du véhicule et présence du kit anti-crevaison.',
    'Compter les bouteilles de propane, vérifier leur niveau, le type de raccord, le détendeur 30 mbar et la fermeture générale.',
    'Tester chauffage, eau chaude, réfrigérateur, plaques de cuisson, pompe à eau, éclairage, prises 230 V/USB et panneau de contrôle.',
    'Localiser remplissage eau propre, vidange eaux grises, cassette WC, coupe-batterie, disjoncteur et branchement électrique extérieur.',
    'Contrôler câble électrique, adaptateur CEE, cales, tuyau ou raccord de remplissage, table, chaises et accessoires inclus.',
    'Tester lit, transformation du couchage enfant, stores, moustiquaires, lanterneaux, marchepied, soute et verrouillage du porte-vélos.',
    'Demander une démonstration de la bascule frigorifique 12 V / 230 V / gaz si le modèle remis utilise plusieurs sources.',
    'Noter le numéro d’assistance Roadsurfer et l’emplacement du triangle, des gilets, de l’extincteur et de la trousse de secours.'
  ];

  const DAILY=[
    'Avant de partir: fermer lanterneaux, fenêtres, tiroirs, placards, réfrigérateur et porte de soute; rentrer marchepied et accessoires extérieurs.',
    'Contrôler visuellement pneus, porte-vélos, rétroviseurs, feux et éventuelles fuites sous le véhicule.',
    'Garder le poids bas et réparti; 95 L d’eau représentent environ 95 kg, donc éviter le plein complet lors des longues journées si un remplissage sûr est prévu à l’arrivée.',
    'Ne jamais se fier uniquement au GPS: respecter la signalisation locale de hauteur, largeur, poids et interdictions camping-car.',
    'Pour Paddy: ventilation avant chaque départ, eau accessible lors des pauses, température contrôlée et arrêt toutes les deux heures environ lors des longues étapes.',
    'Par vent fort dans les Lofoten: réduire la vitesse, tenir fermement le volant et éviter d’ouvrir simultanément portes, lanterneaux et grand auvent.'
  ];

  const RETURN=[
    'Faire le plein de diesel et d’AdBlue selon les conditions Roadsurfer.',
    'Vider les eaux grises et la cassette WC dans des installations autorisées; rincer et remettre le produit demandé.',
    'Fermer le gaz et vérifier que les bouteilles et accessoires sont présents.',
    'Nettoyer cuisine, réfrigérateur, salle d’eau, WC, couchages, cabine, sol, soute et porte-vélos.',
    'Retirer nourriture, déchets, poils de Paddy et effets personnels; vérifier tous les rangements.',
    'Photographier intérieur, extérieur, kilométrage, jauges, carburant, AdBlue et absence de nouveaux dommages.',
    'Revenir à Champlan avant 17 h le 11 septembre avec une marge suffisante.'
  ];

  function list(items){return `<ul>${items.map(item=>`<li>${esc(item)}</li>`).join('')}</ul>`;}
  function meter(label,key,reverse=false){
    const value=Number(state.van?.[key]??0);
    return `<div class="card"><div class="range-row"><b>${esc(label)}</b><input data-vankey="${esc(key)}" type="range" min="0" max="100" value="${value}"><output>${value}%</output></div>${reverse?'<small class="muted">Pour les eaux grises, 0 % = vide.</small>':''}</div>`;
  }

  function seed(){
    state.vehicleProfile={...PROFILE};
    state.van=state.van||{fuel:100,water:100,grey:0,battery:100,toilet:'OK',next:'Contrôle complet avant départ'};
    save();
  }

  function renderVanDetailed(){
    const p=state.vehicleProfile||PROFILE;
    byId('app').innerHTML=`
      <section class="card" style="border:2px solid #0f766e;margin-bottom:12px">
        <p class="eyebrow">FICHE CAMPING-CAR — SOURCE UNIQUE</p>
        <div class="map-heading"><div><h1>${esc(p.bookingCategory)}</h1><h3>${esc(p.referenceModel)}</h3></div><span class="van-badge">${esc(p.status)}</span></div>
        <p class="muted">${esc(p.modelNotice)}</p>
        <div class="spec-grid">
          <section><h3>Configuration</h3><dl class="spec-list"><div><dt>Type</dt><dd>${esc(p.type)}</dd></div><div><dt>Places route</dt><dd>${esc(p.seats)}</dd></div><div><dt>Couchages</dt><dd>${esc(p.beds)}</dd></div><div><dt>Boîte</dt><dd>${esc(p.transmission)}</dd></div></dl></section>
          <section><h3>Motorisation</h3><dl class="spec-list"><div><dt>Moteur</dt><dd>${esc(p.engine)}</dd></div><div><dt>AdBlue</dt><dd>${esc(p.adblue)}</dd></div><div><dt>PTAC</dt><dd>${esc(p.maxWeight)}</dd></div><div><dt>Charge utile</dt><dd>${esc(p.payload)}</dd></div></dl></section>
          <section><h3>Dimensions de référence</h3><dl class="spec-list"><div><dt>Carrosserie</dt><dd>${esc(p.bodyLength)}</dd></div><div><dt>Porte-vélos replié</dt><dd>${esc(p.foldedRackLength)}</dd></div><div><dt>Porte-vélos déployé</dt><dd>${esc(p.deployedRackLength)}</dd></div><div><dt>Hauteur</dt><dd>${esc(p.height)}</dd></div><div><dt>Largeur</dt><dd>${esc(p.widthMirrors)}</dd></div></dl></section>
          <section><h3>Profil GPS conseillé</h3><dl class="spec-list"><div><dt>Longueur</dt><dd>${esc(p.gpsLength)}</dd></div><div><dt>Largeur</dt><dd>${esc(p.gpsWidth)}</dd></div><div><dt>Hauteur</dt><dd>${esc(p.gpsHeight)}</dd></div><div><dt>Poids</dt><dd>${esc(p.gpsWeight)}</dd></div></dl><p class="muted">${esc(p.gpsNote)}</p></section>
          <section><h3>Eau</h3><dl class="spec-list"><div><dt>Eau propre</dt><dd>${esc(p.freshWater)}</dd></div><div><dt>Eaux grises</dt><dd>${esc(p.wasteWater)}</dd></div></dl><p class="muted">Un plein d’eau propre ajoute environ 95 kg au véhicule.</p></section>
          <section><h3>Gaz et chauffage</h3><dl class="spec-list"><div><dt>Gaz</dt><dd>${esc(p.gas)}</dd></div><div><dt>Pression</dt><dd>${esc(p.gasSystem)}</dd></div><div><dt>Bouteilles</dt><dd>${esc(p.gasBottle)}</dd></div></dl><p class="muted">${esc(p.gasUse)}</p></section>
        </div>
        <div class="popup-warning"><b>Réglage GPS pour votre itinéraire:</b> ${esc(p.ferryGps)}</div>
      </section>

      <section class="card" style="margin-bottom:12px"><p class="eyebrow">DIMENSIONS À GARDER SOUS LES YEUX</p><div class="grid"><div><b>Hauteur GPS</b><p style="font-size:1.5rem;margin:.3rem 0">3,25 m</p></div><div><b>Largeur</b><p style="font-size:1.5rem;margin:.3rem 0">2,74 m</p></div><div><b>Longueur</b><p style="font-size:1.5rem;margin:.3rem 0">7,80 m</p></div><div><b>Poids</b><p style="font-size:1.5rem;margin:.3rem 0">3,50 t</p></div></div></section>

      <h2>Niveaux pendant le voyage</h2>
      <div class="grid">${meter('Carburant','fuel')}${meter('Eau propre','water')}${meter('Eaux grises','grey',true)}${meter('Batterie cellule','battery')}</div>
      <section class="card" style="margin-top:12px"><div class="form"><label>Toilettes<select id="toilet"><option>OK</option><option>À vider</option><option>À traiter</option></select></label><label>Action suivante<input id="van-next" value="${esc(state.van.next||'')}"></label></div><button id="save-van" class="primary">Enregistrer les niveaux</button></section>

      <details class="card" style="margin-top:12px" open><summary><b>Check-list complète de prise en charge à Champlan</b></summary>${list(PICKUP)}</details>
      <details class="card" style="margin-top:12px"><summary><b>Routine avant chaque départ</b></summary>${list(DAILY)}</details>
      <details class="card" style="margin-top:12px"><summary><b>Nettoyage et restitution du 11 septembre</b></summary>${list(RETURN)}</details>

      <section class="card" style="margin-top:12px"><h2>Documentation utile</h2><div class="toolbar"><a class="btn primary" href="https://roadsurfer.com/fr/camping-cars/cozy-cottage/" target="_blank" rel="noopener">Roadsurfer Cozy Cottage ↗</a><a class="btn" href="https://roadsurfer.com/fr/videos/" target="_blank" rel="noopener">Vidéos d’utilisation Roadsurfer ↗</a><a class="btn" href="https://www.knaus.com/fr-fr/camping-cars/vanti-plus/" target="_blank" rel="noopener">KNAUS VAN TI PLUS ↗</a></div><p class="muted">Les documents du véhicule réellement remis et les indications de sa carte grise restent prioritaires sur cette fiche de référence.</p></section>`;

    byId('toilet').value=state.van.toilet||'OK';
    document.querySelectorAll('[data-vankey]').forEach(range=>range.oninput=()=>range.nextElementSibling.value=range.value+'%');
    byId('save-van').onclick=()=>{
      document.querySelectorAll('[data-vankey]').forEach(range=>state.van[range.dataset.vankey]=+range.value);
      state.van.toilet=byId('toilet').value;
      state.van.next=byId('van-next').value;
      save();autoSync();renderVanDetailed();
    };
  }

  seed();
  window.renderVan=renderVanDetailed;
})();
