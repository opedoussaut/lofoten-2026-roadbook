'use strict';

(function installDetailedVanProfile(){
  const FAQ_URL='https://rent-help.roadsurfer.com/hc/fr-fr/sections/31837960546067-Cozy-Cottage-Knaus-VAN-TI-PLUS';
  const ACCOUNT_URL='https://account.roadsurfer.com/fr?redirect_to=overview&redirect_booking_number=3641456462';
  const PROFILE={
    bookingCategory:'Roadsurfer Cozy Cottage',referenceModel:'KNAUS VAN TI PLUS',status:'Véhicule attribué · contrat signé 24/08/2026',
    modelNotice:'Le contrat Roadsurfer confirme le véhicule Cozy Cottage immatriculé WI RS 4849, première mise en circulation le 03/07/2023, diesel, avec 50 613 km au départ. Les dimensions techniques ci-dessous restent celles du profil Cozy Cottage / KNAUS VAN TI PLUS et le profil GPS conserve volontairement une marge de sécurité.',
    bookingNumber:'3641456462',plate:'WI RS 4849',vin:'WV3ZZZSZ0P9051241',firstRegistration:'03/07/2023',startMileage:'50 613 km',fuelType:'Diesel',
    pickup:'24/08/2026 · 16:00 · 33 route de Versailles, 91160 Champlan',return:'12/09/2026 · 16:00 · 33 route de Versailles, 91160 Champlan',
    rentalTotal:'2 285 € · intégralement payé',deposit:'800 € · payé le 24/08/2026',protection:'Basic protection · franchise 3 000 € · 2 conducteurs inclus',mileagePlan:'Kilométrage illimité',bikeRack:'Porte-vélos 2 vélos · réservé',
    type:'Camping-car semi-intégré',seats:'3 places route adultes',beds:'2 couchages adultes + 1 couchage enfant',engine:'Diesel · 140 ch · Euro 6',transmission:'Manuelle ou automatique selon le véhicule remis',adblue:'Oui — niveau à contrôler et plein à restituer selon les conditions Roadsurfer',
    bodyLength:'6,99 m',foldedRackLength:'7,33 m avec porte-vélos replié',deployedRackLength:'7,80 m avec porte-vélos déployé',height:'3,15 m de référence',widthMirrors:'2,74 m avec rétroviseurs',maxWeight:'PTAC de référence 3 500 kg — valeur de la carte grise prioritaire',payload:'Environ 260 kg annoncés par Roadsurfer, passagers, bagages et eau compris selon leurs conditions',
    freshWater:'95 L',wasteWater:'73 L',gas:'PROPANE — pas de butane pour la Scandinavie',gasSystem:'Installation 30 mbar',gasBottle:'Compartiment de référence prévu pour jusqu’à 2 bouteilles de 11 kg. Le nombre, le format, le remplissage et le raccord du véhicule réel restent prioritaires.',gasUse:'Gaz prévu au minimum pour les deux feux de cuisson. Chauffage annoncé au diesel en Europe continentale; utiliser les commandes et consignes du véhicule réellement remis.',
    gpsLength:'7,80 m',gpsWidth:'2,74 m',gpsHeight:'3,25 m',gpsWeight:'3,50 t',gpsNote:'Profil volontairement prudent: porte-vélos déployé et marge de 10 cm sur la hauteur.',
    ferryGps:'Conserver « éviter les ferries » activé pendant tout le voyage. Le 6 septembre, imposer Björkliden → Abisko → Kiruna → Gällivare → Storuman → Hemavan → Mo i Rana. Le 9 septembre, imposer Göteborg → Malmö → pont de l’Øresund → pont du Grand Belt → Kolding → Flensburg.'
  };

  const EXISTING_DAMAGE=[
    'Arrière · pare-chocs : fracture > 30 mm, dommage ajouté au contrat le 24/08/2026 (#660354), lié à un ancien dommage latéral.',
    'Côté gauche · porte de soute/garage : fracture au niveau du joint caoutchouc (#239091).',
    'Côté gauche · paroi : deux rayures de 30 mm à 9 cm (#520393 et #581002) et une fracture/fissure > 30 mm (#581015).',
    'Côté droit · rétroviseurs : plusieurs rayures, dont côté passager (#110811 et #356899).',
    'Côté droit · porte d’entrée : rayure > 9 cm (#239221).',
    'Côté droit · fixation de pare-chocs : rayure importante d’environ 30 cm dans l’angle inférieur (#578410).',
    'Côté droit · paroi : longue rayure sur tout le côté (#580985) + rayure sur l’angle supérieur arrière (#641025).',
    'Cabine · siège droit : petite déchirure < 8 mm (#238998).',
    'Cabine · siège gauche : cache plastique arrière détaché côté droit (#352154).',
    'Cabine · occultant pare-brise gauche : cassé (#520405).',
    'Cellule · banquette arrière / lit inférieur : petite fracture < 30 mm (#239025).',
    'Cellule · porte de chambre : marque de brûlure (#581149).',
    'Soute · porte de salle d’eau : détachée, dommage ajouté au contrat le 24/08/2026 (#660129).',
    'Inventaire · un trousseau de clés est indiqué manquant depuis le 19/08/2026 (#654551).'
  ];

  const PICKUP=[
    'Conserver le contrat Roadsurfer du 24/08/2026 et les photos/vidéos de départ jusqu’au remboursement définitif de la caution.',
    'Le véhicule contractuel est WI RS 4849, VIN WV3ZZZSZ0P9051241, 50 613 km au départ, diesel.',
    'Si un défaut supplémentaire est découvert pendant les premières heures, le photographier immédiatement et le signaler à Roadsurfer via le compte client / aide sur la route.',
    'Vérifier régulièrement le porte-vélos et ses fixations même lorsqu’il est vide; il est explicitement inclus dans le contrat.',
    'La liste « dommages préexistants » ci-dessous fait foi comme mémo rapide, mais le PDF du contrat Roadsurfer reste la référence complète.'
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
    'Retour contractuel : samedi 12 septembre 2026 à 16:00, 33 route de Versailles, 91160 Champlan. Arriver avec une marge confortable.',
    'Faire le plein de diesel et d’AdBlue selon les conditions Roadsurfer.',
    'Vider les eaux grises et la cassette WC uniquement dans des installations autorisées; rincer selon les instructions du véhicule.',
    'Fermer le gaz et vérifier que bouteilles, raccords, câbles et accessoires sont présents.',
    'Nettoyer cuisine, réfrigérateur, salle d’eau, WC, couchages, cabine, sol, soute et porte-vélos.',
    'Retirer nourriture, déchets, poils de Paddy et effets personnels; vérifier tous les rangements.',
    'Photographier intérieur, extérieur, kilométrage, jauges, carburant, AdBlue et absence de nouveaux dommages juste avant la remise des clés.',
    'Comparer les zones sensibles avec la liste contractuelle des dommages préexistants afin d’éviter toute confusion au retour.',
    'La caution de 800 € est annoncée comme débloquée après retour sans nouveau dommage; Roadsurfer précise que des dommages cachés peuvent encore être constatés dans les 48 h.'
  ];

  const FAQ_CRITICAL=[
    ['Contrat et assistance','Réservation 3641456462. En cas de problème, utiliser en priorité « Aide sur la route » dans le compte client Roadsurfer pour les fonctions du véhicule, accident, déclaration digitale et contact d’urgence.'],
    ['Pays autorisés','Les CGV Roadsurfer d’avril 2026 autorisent notamment les États membres de l’UE, l’Islande, la Norvège, la Suisse et le Royaume-Uni. Votre itinéraire France → Allemagne → Danemark → Suède → Norvège reste donc dans la zone autorisée.'],
    ['Chauffage et eau chaude','Le Cozy Cottage est annoncé avec un chauffage auxiliaire à air fonctionnant au diesel en Europe continentale. Le chauffage de l’habitacle et la production d’eau chaude peuvent avoir des commandes distinctes.'],
    ['Réfrigérateur et énergie','Identifier le mode actif du réfrigérateur et savoir quand utiliser 12 V, 230 V ou gaz sur le modèle remis. Vérifier quelles prises fonctionnent sans branchement extérieur et surveiller la batterie cellule chaque soir.'],
    ['Eau et toilettes','Distinguer clairement eau propre, eaux grises et cassette WC. Ne jamais vidanger au sol. Fermer le clapet des toilettes avant de sortir la cassette et utiliser uniquement les produits compatibles.'],
    ['Gaz','Fermer la bouteille avant toute manipulation. Ne rien modifier sur le détendeur ou les raccords; fermer le gaz avant le plein de carburant et lorsque les instructions du véhicule l’exigent.'],
    ['Auvent et vent','Ne jamais rouler avec l’auvent sorti. Le rentrer dès que vous quittez le camping-car et immédiatement en cas de vent, rafales ou pluie forte.'],
    ['Conduite et manœuvres','Le véhicule est beaucoup plus haut, large et long qu’une voiture. Sorya descend pour guider toute manœuvre serrée; Olivier s’arrête immédiatement s’il perd le contact visuel.'],
    ['Paddy','Paddy reste avec vous, attaché de façon sûre pendant la conduite. Protéger les tissus, aspirer les poils et contrôler la température intérieure; le chauffage ou une fenêtre entrouverte ne rendent jamais acceptable de le laisser seul.'],
    ['Panne ou dommage','S’arrêter en sécurité, documenter avec photos et contacter Roadsurfer via l’aide sur la route avant toute réparation non urgente. Ne pas engager de dépense importante sans instruction lorsque la situation le permet.']
  ];

  function list(items){return `<ul>${items.map(item=>`<li>${esc(item)}</li>`).join('')}</ul>`;}
  function meter(label,key,reverse=false){const value=Number(state.van?.[key]??0);return `<div class="card"><div class="range-row"><b>${esc(label)}</b><input data-vankey="${esc(key)}" type="range" min="0" max="100" value="${value}"><output>${value}%</output></div>${reverse?'<small class="muted">Pour les eaux grises, 0 % = vide.</small>':''}</div>`;}
  function seed(){state.vehicleProfile={...(state.vehicleProfile||{}),...PROFILE};state.van=state.van||{fuel:100,water:100,grey:0,battery:100,toilet:'OK',next:'Contrôle quotidien'};save();}

  function renderVanDetailed(){
    const p=state.vehicleProfile||PROFILE;
    byId('app').innerHTML=`
      <section class="card" style="border:2px solid #0f766e;margin-bottom:12px">
        <p class="eyebrow">FICHE CAMPING-CAR · CONTRAT ROADsurfer 24/08/2026</p>
        <div class="map-heading"><div><h1>${esc(p.bookingCategory)}</h1><h3>${esc(p.referenceModel)}</h3></div><span class="van-badge">${esc(p.status)}</span></div>
        <p class="muted">${esc(p.modelNotice)}</p>
        <div class="spec-grid">
          <section><h3>Identité véhicule</h3><dl class="spec-list"><div><dt>Plaque</dt><dd>${esc(p.plate)}</dd></div><div><dt>VIN</dt><dd>${esc(p.vin)}</dd></div><div><dt>1re immatriculation</dt><dd>${esc(p.firstRegistration)}</dd></div><div><dt>Kilométrage départ</dt><dd>${esc(p.startMileage)}</dd></div><div><dt>Carburant</dt><dd>${esc(p.fuelType)}</dd></div></dl></section>
          <section><h3>Contrat</h3><dl class="spec-list"><div><dt>Réservation</dt><dd>${esc(p.bookingNumber)}</dd></div><div><dt>Prix total</dt><dd>${esc(p.rentalTotal)}</dd></div><div><dt>Caution</dt><dd>${esc(p.deposit)}</dd></div><div><dt>Protection</dt><dd>${esc(p.protection)}</dd></div><div><dt>Kilométrage</dt><dd>${esc(p.mileagePlan)}</dd></div><div><dt>Accessoire</dt><dd>${esc(p.bikeRack)}</dd></div></dl></section>
          <section><h3>Dates et agence</h3><dl class="spec-list"><div><dt>Départ</dt><dd>${esc(p.pickup)}</dd></div><div><dt>Retour</dt><dd>${esc(p.return)}</dd></div></dl><div class="toolbar"><a class="btn primary" href="${ACCOUNT_URL}" target="_blank" rel="noopener">Compte Roadsurfer ↗</a></div></section>
          <section><h3>Configuration</h3><dl class="spec-list"><div><dt>Type</dt><dd>${esc(p.type)}</dd></div><div><dt>Places route</dt><dd>${esc(p.seats)}</dd></div><div><dt>Couchages</dt><dd>${esc(p.beds)}</dd></div><div><dt>Boîte</dt><dd>${esc(p.transmission)}</dd></div></dl></section>
          <section><h3>Motorisation</h3><dl class="spec-list"><div><dt>Moteur</dt><dd>${esc(p.engine)}</dd></div><div><dt>AdBlue</dt><dd>${esc(p.adblue)}</dd></div><div><dt>PTAC</dt><dd>${esc(p.maxWeight)}</dd></div><div><dt>Charge utile</dt><dd>${esc(p.payload)}</dd></div></dl></section>
          <section><h3>Dimensions</h3><dl class="spec-list"><div><dt>Carrosserie</dt><dd>${esc(p.bodyLength)}</dd></div><div><dt>Porte-vélos replié</dt><dd>${esc(p.foldedRackLength)}</dd></div><div><dt>Porte-vélos déployé</dt><dd>${esc(p.deployedRackLength)}</dd></div><div><dt>Hauteur</dt><dd>${esc(p.height)}</dd></div><div><dt>Largeur</dt><dd>${esc(p.widthMirrors)}</dd></div></dl></section>
          <section><h3>Profil GPS</h3><dl class="spec-list"><div><dt>Longueur</dt><dd>${esc(p.gpsLength)}</dd></div><div><dt>Largeur</dt><dd>${esc(p.gpsWidth)}</dd></div><div><dt>Hauteur</dt><dd>${esc(p.gpsHeight)}</dd></div><div><dt>Poids</dt><dd>${esc(p.gpsWeight)}</dd></div></dl><p class="muted">${esc(p.gpsNote)}</p></section>
          <section><h3>Eau</h3><dl class="spec-list"><div><dt>Eau propre</dt><dd>${esc(p.freshWater)}</dd></div><div><dt>Eaux grises</dt><dd>${esc(p.wasteWater)}</dd></div></dl><p class="muted">Un plein ajoute environ 95 kg.</p></section>
          <section><h3>Gaz et chauffage</h3><dl class="spec-list"><div><dt>Gaz</dt><dd>${esc(p.gas)}</dd></div><div><dt>Pression</dt><dd>${esc(p.gasSystem)}</dd></div><div><dt>Bouteilles</dt><dd>${esc(p.gasBottle)}</dd></div></dl><p class="muted">${esc(p.gasUse)}</p></section>
        </div>
        <div class="popup-warning"><b>Réglage GPS pour votre itinéraire:</b> ${esc(p.ferryGps)}</div>
      </section>

      <section class="card" style="margin-bottom:12px;border-left:5px solid #b45309">
        <p class="eyebrow">ÉTAT INITIAL CONTRACTUEL · À CONSERVER</p>
        <h2>Dommages déjà présents au départ</h2>
        <p><strong>Important :</strong> ces défauts sont déjà enregistrés dans le contrat Roadsurfer et ne doivent pas être confondus avec de nouveaux dommages au retour.</p>
        ${list(EXISTING_DAMAGE)}
      </section>

      <section class="card" style="margin-bottom:12px"><p class="eyebrow">DIMENSIONS À GARDER SOUS LES YEUX</p><div class="grid"><div><b>Hauteur GPS</b><p style="font-size:1.5rem;margin:.3rem 0">3,25 m</p></div><div><b>Largeur</b><p style="font-size:1.5rem;margin:.3rem 0">2,74 m</p></div><div><b>Longueur</b><p style="font-size:1.5rem;margin:.3rem 0">7,80 m</p></div><div><b>Poids</b><p style="font-size:1.5rem;margin:.3rem 0">3,50 t</p></div></div></section>

      <section class="card" style="margin-bottom:12px"><p class="eyebrow">ROADsurfer · POINTS CRITIQUES</p><h2>Résumé opérationnel Cozy Cottage</h2><p class="muted">Les informations du contrat signé, la carte grise et les instructions du véhicule sont prioritaires sur les valeurs génériques.</p>${FAQ_CRITICAL.map(([title,text])=>`<details style="margin:8px 0"><summary><b>${esc(title)}</b></summary><p>${esc(text)}</p></details>`).join('')}<div class="toolbar"><a class="btn primary" href="${FAQ_URL}" target="_blank" rel="noopener">FAQ Cozy Cottage complète ↗</a><a class="btn" href="https://roadsurfer.com/fr/faq/location-van-amenage/modes-d-emplois/" target="_blank" rel="noopener">Modes d’emploi ↗</a><a class="btn" href="https://www.youtube.com/watch?v=obZbZCGYPIA" target="_blank" rel="noopener">Vidéo Knaus VAN TI PLUS ↗</a></div></section>

      <h2>Niveaux pendant le voyage</h2><div class="grid">${meter('Carburant','fuel')}${meter('Eau propre','water')}${meter('Eaux grises','grey',true)}${meter('Batterie cellule','battery')}</div>
      <section class="card" style="margin-top:12px"><div class="form"><label>Toilettes<select id="toilet"><option>OK</option><option>À vider</option><option>À traiter</option></select></label><label>Action suivante<input id="van-next" value="${esc(state.van.next||'')}"></label></div><button id="save-van" class="primary">Enregistrer les niveaux</button></section>
      <details class="card" style="margin-top:12px"><summary><b>Contrat et contrôles de départ</b></summary>${list(PICKUP)}</details>
      <details class="card" style="margin-top:12px"><summary><b>Routine avant chaque départ</b></summary>${list(DAILY)}</details>
      <details class="card" style="margin-top:12px" open><summary><b>Restitution · samedi 12 septembre avant 16:00</b></summary>${list(RETURN)}</details>
      <section class="card" style="margin-top:12px"><h2>Documentation utile</h2><div class="toolbar"><a class="btn primary" href="${ACCOUNT_URL}" target="_blank" rel="noopener">Compte / aide Roadsurfer ↗</a><a class="btn" href="https://roadsurfer.com/fr/camping-cars/cozy-cottage/" target="_blank" rel="noopener">Cozy Cottage ↗</a><a class="btn" href="https://roadsurfer.com/fr/videos/" target="_blank" rel="noopener">Vidéos Roadsurfer ↗</a><a class="btn" href="https://www.knaus.com/fr-fr/camping-cars/vanti-plus/" target="_blank" rel="noopener">KNAUS VAN TI PLUS ↗</a></div></section>`;

    byId('toilet').value=state.van.toilet||'OK';
    document.querySelectorAll('[data-vankey]').forEach(range=>range.oninput=()=>range.nextElementSibling.value=range.value+'%');
    byId('save-van').onclick=()=>{document.querySelectorAll('[data-vankey]').forEach(range=>state.van[range.dataset.vankey]=+range.value);state.van.toilet=byId('toilet').value;state.van.next=byId('van-next').value;save();autoSync();renderVanDetailed();};
  }

  seed();window.renderVan=renderVanDetailed;
})();