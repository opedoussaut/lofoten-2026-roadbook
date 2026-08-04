'use strict';

(function installDetailedVanProfile(){
  const FAQ_URL='https://rent-help.roadsurfer.com/hc/fr-fr/sections/31837960546067-Cozy-Cottage-Knaus-VAN-TI-PLUS';
  const PROFILE={
    bookingCategory:'Roadsurfer Cozy Cottage',referenceModel:'KNAUS VAN TI PLUS',status:'Modèle de référence — véhicule exact à confirmer lors de la remise',
    modelNotice:'La réservation porte sur la catégorie Cozy Cottage. Roadsurfer peut remettre un véhicule comparable ou supérieur; le modèle, l’immatriculation et les caractéristiques exactes doivent donc être vérifiés à Champlan le 24 août.',
    type:'Camping-car semi-intégré',seats:'3 places route adultes',beds:'2 couchages adultes + 1 couchage enfant',engine:'Diesel · 140 ch · Euro 6',transmission:'Manuelle ou automatique selon le véhicule remis',adblue:'Oui — niveau à contrôler au départ et plein à restituer',
    bodyLength:'6,99 m',foldedRackLength:'7,33 m avec porte-vélos replié',deployedRackLength:'7,80 m avec porte-vélos déployé',height:'3,15 m de référence',widthMirrors:'2,74 m avec rétroviseurs',maxWeight:'PTAC de référence 3 500 kg — valeur de la carte grise prioritaire',payload:'Environ 260 kg annoncés par Roadsurfer, passagers, bagages et eau compris selon leurs conditions',
    freshWater:'95 L',wasteWater:'73 L',gas:'PROPANE — pas de butane pour la Scandinavie',gasSystem:'Installation 30 mbar',gasBottle:'Compartiment de référence prévu pour jusqu’à 2 bouteilles de 11 kg. Le nombre, le format, le remplissage et le raccord doivent être vérifiés à la remise.',gasUse:'Gaz prévu au minimum pour les deux feux de cuisson. Chauffage annoncé au diesel en Europe continentale; vérifier sur le véhicule remis le fonctionnement exact du chauffage et de l’eau chaude.',
    gpsLength:'7,80 m',gpsWidth:'2,74 m',gpsHeight:'3,25 m',gpsWeight:'3,50 t',gpsNote:'Profil volontairement prudent: porte-vélos déployé et marge de 10 cm sur la hauteur.',
    ferryGps:'Conserver « éviter les ferries » activé pendant tout le voyage. Le 6 septembre, imposer Björkliden → Abisko → Kiruna → Gällivare → Storuman → Hemavan → Mo i Rana. Le 9 septembre, imposer Göteborg → Malmö → pont de l’Øresund → pont du Grand Belt → Kolding → Flensburg.'
  };

  const PICKUP=[
    'Photographier et filmer les quatre côtés, le toit visible, le pare-brise, les jantes, les rétroviseurs, le dessous accessible, l’intérieur et chaque défaut avant de quitter Champlan.',
    'Photographier la carte grise et relever PTAC, dimensions, carburant, AdBlue, kilométrage, immatriculation et numéro d’assistance.',
    'Mesurer ou confirmer la hauteur réelle avec antenne, lanterneau et tout équipement de toit; confirmer la longueur porte-vélos replié et déployé.',
    'Tester chauffage, eau chaude, réfrigérateur, deux feux de cuisson, pompe à eau, éclairage, prises, batterie cellule et panneau de contrôle.',
    'Demander une démonstration complète du réfrigérateur et identifier clairement ses modes 12 V, 230 V et gaz si le véhicule remis en possède plusieurs.',
    'Tester remplissage eau propre, vidange eaux grises, cassette WC, coupe-batterie, disjoncteur, branchement CEE et câble électrique.',
    'Compter les bouteilles de propane et vérifier niveau, raccord, détendeur 30 mbar, fermeture générale et procédure de changement.',
    'Tester lit, stores, moustiquaires, lanterneaux, marchepied, soute, porte-vélos, auvent et caméra de recul.',
    'Contrôler câble CEE, adaptateurs, cales, raccord de remplissage, table, chaises, kit anti-crevaison, triangle, gilets, extincteur et trousse de secours.',
    'Faire corriger immédiatement le relevé de dommages si une anomalie n’est pas inscrite; conserver toutes les photos horodatées jusqu’à la clôture de la location.'
  ];

  const DAILY=[
    'Avant de partir: fermer lanterneaux, fenêtres, tiroirs, placards, réfrigérateur, porte de soute et cassette WC; rentrer marchepied et auvent.',
    'Contrôler visuellement pneus, porte-vélos, rétroviseurs, feux, raccords et éventuelles fuites sous le véhicule.',
    'Garder le poids bas et réparti; 95 L d’eau représentent environ 95 kg. Éviter le plein complet pendant les longues étapes lorsqu’un remplissage fiable est prévu à l’arrivée.',
    'Ne jamais se fier uniquement au GPS: respecter la signalisation locale de hauteur, largeur, poids et interdictions camping-car.',
    'Pour Paddy: harnais ou système de retenue adapté pendant la conduite, eau aux pauses, température surveillée et arrêt au minimum toutes les deux heures.',
    'Ne jamais laisser Paddy seul dans le camping-car. Il reste physiquement avec Olivier et Sorya pendant tout le voyage.',
    'Par vent fort: réduire la vitesse, éviter l’auvent et tenir portes et lanterneaux. Sur une route étroite, ralentir avant le croisement plutôt que mordre l’accotement.'
  ];

  const RETURN=[
    'Faire le plein de diesel et d’AdBlue selon les conditions Roadsurfer.',
    'Vider les eaux grises et la cassette WC uniquement dans des installations autorisées; rincer selon les instructions du véhicule.',
    'Fermer le gaz et vérifier que bouteilles, raccords, câbles et accessoires sont présents.',
    'Nettoyer cuisine, réfrigérateur, salle d’eau, WC, couchages, cabine, sol, soute et porte-vélos.',
    'Retirer nourriture, déchets, poils de Paddy et effets personnels; vérifier tous les rangements.',
    'Photographier intérieur, extérieur, kilométrage, jauges, carburant, AdBlue et absence de nouveaux dommages.',
    'Revenir à Champlan avant 17 h le 11 septembre avec une marge suffisante.'
  ];

  const FAQ_CRITICAL=[
    ['Avant de rouler','Le centre d’aide et la vidéo du Knaus VAN TI PLUS couvrent notamment cuisine, salle d’eau, lit, ordinateur de bord, chauffage, frein à main, stores, bouteilles de gaz, branchements extérieurs, réservoirs et auvent. Revoir ces chapitres avant la prise en charge puis demander une démonstration sur le véhicule réellement remis.'],
    ['Chauffage et eau chaude','Le Cozy Cottage est annoncé avec un chauffage auxiliaire à air fonctionnant au diesel en Europe continentale. Le chauffage de l’habitacle et la production d’eau chaude peuvent avoir des commandes distinctes: les tester séparément à Champlan.'],
    ['Réfrigérateur et énergie','Identifier le mode actif du réfrigérateur et savoir quand utiliser 12 V, 230 V ou gaz sur le modèle remis. Vérifier quelles prises fonctionnent sans branchement extérieur et surveiller la batterie cellule chaque soir.'],
    ['Eau et toilettes','Distinguer clairement eau propre, eaux grises et cassette WC. Ne jamais vidanger au sol. Fermer le clapet des toilettes avant de sortir la cassette et utiliser uniquement les produits compatibles indiqués lors de la remise.'],
    ['Gaz','Fermer la bouteille avant toute manipulation et suivre la démonstration Roadsurfer pour le changement. Ne rien modifier sur le détendeur ou les raccords; fermer le gaz avant le plein de carburant et lorsque les instructions du véhicule l’exigent.'],
    ['Auvent et vent','Ne jamais rouler avec l’auvent sorti. Le rentrer dès que vous quittez le camping-car et immédiatement en cas de vent, rafales ou pluie forte.'],
    ['Conduite et manœuvres','Le véhicule est beaucoup plus haut, large et long qu’une voiture. Sorya descend pour guider toute manœuvre serrée; Olivier s’arrête immédiatement s’il perd le contact visuel.'],
    ['Paddy','Paddy reste avec vous, attaché de façon sûre pendant la conduite. Protéger les tissus, aspirer les poils et contrôler la température intérieure; le chauffage ou une fenêtre entrouverte ne rendent jamais acceptable de le laisser seul.'],
    ['Panne ou dommage','S’arrêter en sécurité, documenter avec photos et contacter l’assistance indiquée dans les documents de location avant toute réparation non urgente. Ne pas engager de dépense importante sans instruction lorsque la situation le permet.']
  ];

  function list(items){return `<ul>${items.map(item=>`<li>${esc(item)}</li>`).join('')}</ul>`;}
  function meter(label,key,reverse=false){const value=Number(state.van?.[key]??0);return `<div class="card"><div class="range-row"><b>${esc(label)}</b><input data-vankey="${esc(key)}" type="range" min="0" max="100" value="${value}"><output>${value}%</output></div>${reverse?'<small class="muted">Pour les eaux grises, 0 % = vide.</small>':''}</div>`;}
  function seed(){state.vehicleProfile={...(state.vehicleProfile||{}),...PROFILE};state.van=state.van||{fuel:100,water:100,grey:0,battery:100,toilet:'OK',next:'Contrôle complet avant départ'};save();}

  function renderVanDetailed(){
    const p=state.vehicleProfile||PROFILE;
    byId('app').innerHTML=`
      <section class="card" style="border:2px solid #0f766e;margin-bottom:12px"><p class="eyebrow">FICHE CAMPING-CAR — SOURCE UNIQUE</p><div class="map-heading"><div><h1>${esc(p.bookingCategory)}</h1><h3>${esc(p.referenceModel)}</h3></div><span class="van-badge">${esc(p.status)}</span></div><p class="muted">${esc(p.modelNotice)}</p>
      <div class="spec-grid"><section><h3>Configuration</h3><dl class="spec-list"><div><dt>Type</dt><dd>${esc(p.type)}</dd></div><div><dt>Places route</dt><dd>${esc(p.seats)}</dd></div><div><dt>Couchages</dt><dd>${esc(p.beds)}</dd></div><div><dt>Boîte</dt><dd>${esc(p.transmission)}</dd></div></dl></section><section><h3>Motorisation</h3><dl class="spec-list"><div><dt>Moteur</dt><dd>${esc(p.engine)}</dd></div><div><dt>AdBlue</dt><dd>${esc(p.adblue)}</dd></div><div><dt>PTAC</dt><dd>${esc(p.maxWeight)}</dd></div><div><dt>Charge utile</dt><dd>${esc(p.payload)}</dd></div></dl></section><section><h3>Dimensions</h3><dl class="spec-list"><div><dt>Carrosserie</dt><dd>${esc(p.bodyLength)}</dd></div><div><dt>Porte-vélos replié</dt><dd>${esc(p.foldedRackLength)}</dd></div><div><dt>Porte-vélos déployé</dt><dd>${esc(p.deployedRackLength)}</dd></div><div><dt>Hauteur</dt><dd>${esc(p.height)}</dd></div><div><dt>Largeur</dt><dd>${esc(p.widthMirrors)}</dd></div></dl></section><section><h3>Profil GPS</h3><dl class="spec-list"><div><dt>Longueur</dt><dd>${esc(p.gpsLength)}</dd></div><div><dt>Largeur</dt><dd>${esc(p.gpsWidth)}</dd></div><div><dt>Hauteur</dt><dd>${esc(p.gpsHeight)}</dd></div><div><dt>Poids</dt><dd>${esc(p.gpsWeight)}</dd></div></dl><p class="muted">${esc(p.gpsNote)}</p></section><section><h3>Eau</h3><dl class="spec-list"><div><dt>Eau propre</dt><dd>${esc(p.freshWater)}</dd></div><div><dt>Eaux grises</dt><dd>${esc(p.wasteWater)}</dd></div></dl><p class="muted">Un plein ajoute environ 95 kg.</p></section><section><h3>Gaz et chauffage</h3><dl class="spec-list"><div><dt>Gaz</dt><dd>${esc(p.gas)}</dd></div><div><dt>Pression</dt><dd>${esc(p.gasSystem)}</dd></div><div><dt>Bouteilles</dt><dd>${esc(p.gasBottle)}</dd></div></dl><p class="muted">${esc(p.gasUse)}</p></section></div>
      <div class="popup-warning"><b>Réglage GPS pour votre itinéraire:</b> ${esc(p.ferryGps)}</div></section>

      <section class="card" style="margin-bottom:12px"><p class="eyebrow">DIMENSIONS À GARDER SOUS LES YEUX</p><div class="grid"><div><b>Hauteur GPS</b><p style="font-size:1.5rem;margin:.3rem 0">3,25 m</p></div><div><b>Largeur</b><p style="font-size:1.5rem;margin:.3rem 0">2,74 m</p></div><div><b>Longueur</b><p style="font-size:1.5rem;margin:.3rem 0">7,80 m</p></div><div><b>Poids</b><p style="font-size:1.5rem;margin:.3rem 0">3,50 t</p></div></div></section>

      <section class="card" style="margin-bottom:12px"><p class="eyebrow">FAQ ROADsurfer — LES POINTS CRITIQUES POUR VOUS TROIS</p><h2>Résumé opérationnel Cozy Cottage</h2><p class="muted">Synthèse pratique pour Olivier, Sorya et Paddy. Les consignes du véhicule réellement remis, la carte grise et le centre d’aide Roadsurfer restent prioritaires.</p>${FAQ_CRITICAL.map(([title,text])=>`<details style="margin:8px 0"><summary><b>${esc(title)}</b></summary><p>${esc(text)}</p></details>`).join('')}<div class="toolbar"><a class="btn primary" href="${FAQ_URL}" target="_blank" rel="noopener">FAQ Cozy Cottage complète ↗</a><a class="btn" href="https://roadsurfer.com/fr/faq/location-van-amenage/modes-d-emplois/" target="_blank" rel="noopener">Page officielle des modes d’emploi ↗</a><a class="btn" href="https://www.youtube.com/watch?v=obZbZCGYPIA" target="_blank" rel="noopener">Vidéo Knaus VAN TI PLUS ↗</a></div></section>

      <h2>Niveaux pendant le voyage</h2><div class="grid">${meter('Carburant','fuel')}${meter('Eau propre','water')}${meter('Eaux grises','grey',true)}${meter('Batterie cellule','battery')}</div><section class="card" style="margin-top:12px"><div class="form"><label>Toilettes<select id="toilet"><option>OK</option><option>À vider</option><option>À traiter</option></select></label><label>Action suivante<input id="van-next" value="${esc(state.van.next||'')}"></label></div><button id="save-van" class="primary">Enregistrer les niveaux</button></section>
      <details class="card" style="margin-top:12px" open><summary><b>Check-list complète de prise en charge à Champlan</b></summary>${list(PICKUP)}</details><details class="card" style="margin-top:12px"><summary><b>Routine avant chaque départ</b></summary>${list(DAILY)}</details><details class="card" style="margin-top:12px"><summary><b>Nettoyage et restitution du 11 septembre</b></summary>${list(RETURN)}</details>
      <section class="card" style="margin-top:12px"><h2>Documentation utile</h2><div class="toolbar"><a class="btn primary" href="https://roadsurfer.com/fr/camping-cars/cozy-cottage/" target="_blank" rel="noopener">Roadsurfer Cozy Cottage ↗</a><a class="btn" href="https://roadsurfer.com/fr/videos/" target="_blank" rel="noopener">Vidéos Roadsurfer ↗</a><a class="btn" href="https://www.knaus.com/fr-fr/camping-cars/vanti-plus/" target="_blank" rel="noopener">KNAUS VAN TI PLUS ↗</a></div></section>`;

    byId('toilet').value=state.van.toilet||'OK';
    document.querySelectorAll('[data-vankey]').forEach(range=>range.oninput=()=>range.nextElementSibling.value=range.value+'%');
    byId('save-van').onclick=()=>{document.querySelectorAll('[data-vankey]').forEach(range=>state.van[range.dataset.vankey]=+range.value);state.van.toilet=byId('toilet').value;state.van.next=byId('van-next').value;save();autoSync();renderVanDetailed();};
  }

  seed();window.renderVan=renderVanDetailed;
})();
