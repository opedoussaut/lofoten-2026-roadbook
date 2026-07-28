'use strict';

(function initNorwayTolls(){
  const EPASS='https://www.epass24.com/';
  const DEFAULTS={
    vehicle:{
      booking:'3641456462',
      category:'Cozy Cottage',
      model:'Knaus Van TI 640 MEG Vansation',
      baseVehicle:'MAN TGE',
      fuel:'Diesel',
      euro:'Euro 6d-Final / Euro 6E',
      gvwr:'Environ 3 500 kg — confirmer sur la carte grise, champ F.2',
      bodyLength:'6,99 m',
      travelLength:'7,80 m avec porte-vélos plié (information Roadsurfer)',
      width:'2,74 m rétroviseurs compris',
      height:'3,01 m',
      plate:'',
      pickup:'24 août 2026 vers 16:00 — Paris South (Orly)',
      return:'11 septembre 2026 vers 17:00 — Champlan'
    },
    rental:{pickup:'2026-08-24',return:'2026-09-11',removed:false},
    pickupChecks:{plate:false,registration:false,f2:false,fuel:false,euro:false,dimensions:false,photos:false,water:false,gas:false,electricCable:false,waterHose:false,damage:false},
    borderChecks:{account:false,registered:false,rental:false,dates:false,plate:false,payment:false},
    notes:'Roadsurfer ne communique l’immatriculation et la carte grise qu’au moment de la remise du véhicule. Roadsurfer ne préenregistre pas le camper auprès d’AutoPASS ou d’Epass24.'
  };
  const CITIES=['Bergen','Bodø','Førde','Harstad','Haugesund','Nord-Jæren','Kristiansand','Trondheim','Oslo / Bærum'];
  const PICKUP_LABELS={plate:'Immatriculation récupérée',registration:'Carte grise récupérée',f2:'PTAC / champ F.2 vérifié',fuel:'Carburant confirmé : diesel',euro:'Norme Euro 6d-Final / Euro 6E confirmée',dimensions:'Dimensions vérifiées avec l’équipe Roadsurfer',photos:'Photos complètes du véhicule',water:'Niveau d’eau vérifié',gas:'Gaz vérifié',electricCable:'Câble électrique présent',waterHose:'Tuyau d’eau présent',damage:'État et dommages consignés'};
  const BORDER_LABELS={account:'Compte Epass24 créé',registered:'Véhicule enregistré sur Epass24',rental:'Type Rental sélectionné',dates:'Période 24/08/2026 → 11/09/2026 saisie',plate:'Plaque vérifiée caractère par caractère',payment:'Moyen de paiement ajouté et valide'};

  function seed(){
    if(typeof state==='undefined')return;
    state.norwayTolls=Object.assign({},DEFAULTS,state.norwayTolls||{});
    state.norwayTolls.vehicle=Object.assign({},DEFAULTS.vehicle,state.norwayTolls.vehicle||{});
    state.norwayTolls.rental=Object.assign({},DEFAULTS.rental,state.norwayTolls.rental||{});
    state.norwayTolls.pickupChecks=Object.assign({},DEFAULTS.pickupChecks,state.norwayTolls.pickupChecks||{});
    state.norwayTolls.borderChecks=Object.assign({},DEFAULTS.borderChecks,state.norwayTolls.borderChecks||{});
    if(typeof save==='function')save();
  }
  function checklist(group,labels){
    return Object.entries(labels).map(([key,label])=>`<label class="toll-check"><input type="checkbox" data-toll-group="${group}" data-toll-key="${key}" ${state.norwayTolls[group][key]?'checked':''}><span>${esc(label)}</span></label>`).join('');
  }
  function reminderHtml(){
    const today=new Date(),pickup=new Date('2026-08-24T16:00:00'),ret=new Date('2026-09-11T17:00:00');
    const days=Math.ceil((pickup-today)/86400000);
    let message=days>1?`Dans ${days} jours : créez le compte Epass24, mais attendez la remise du van pour ajouter la plaque.`:days>=0?'Jour du retrait : récupérez la plaque et la carte grise, puis enregistrez immédiatement le van sur Epass24.':today<=ret?'Voyage en cours : vérifiez que Rental, les dates et le moyen de paiement sont corrects.':'Après restitution : supprimez le véhicule ou clôturez la période Rental.';
    return `<div class="toll-reminder"><b>⏰ Rappel</b><span>${esc(message)}</span></div>`;
  }
  function spec(label,value){return `<div class="toll-spec-row"><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`;}
  function renderNorwayTolls(){
    seed(); const t=state.norwayTolls;
    byId('app').innerHTML=`
      <section class="card toll-hero"><div><p class="eyebrow">NORWAY TOLL ASSISTANT</p><h2>🇳🇴 Péages norvégiens · Roadsurfer</h2><p>Tout ce qu’il faut faire avant, pendant et après le voyage.</p></div><a class="btn primary" href="${EPASS}" target="_blank" rel="noopener">Ouvrir Epass24 ↗</a></section>
      ${reminderHtml()}
      <section class="card"><h2>🚐 Notre camper confirmé par Roadsurfer</h2><div class="toll-specs">
        ${spec('Réservation',t.vehicle.booking)}${spec('Catégorie Roadsurfer',t.vehicle.category)}${spec('Modèle',t.vehicle.model)}${spec('Porteur',t.vehicle.baseVehicle)}${spec('Carburant',t.vehicle.fuel)}${spec('Norme antipollution',t.vehicle.euro)}${spec('PTAC',t.vehicle.gvwr)}${spec('Longueur cellule',t.vehicle.bodyLength)}${spec('Longueur communiquée avec porte-vélos',t.vehicle.travelLength)}${spec('Largeur',t.vehicle.width)}${spec('Hauteur',t.vehicle.height)}${spec('Retrait',t.vehicle.pickup)}${spec('Restitution',t.vehicle.return)}
        <label>Immatriculation — à saisir le 24 août<input data-toll-field="plate" placeholder="Ex. AB-123-CD" value="${esc(t.vehicle.plate)}"></label>
      </div></section>
      <div class="grid toll-grid">
        <section class="card"><h2>📍 Ce que Roadsurfer a confirmé</h2><p>${esc(t.notes)}</p><div class="popup-warning"><b>Procédure :</b> créez le compte Epass24 à l’avance, puis ajoutez le véhicule après le retrait. Sélectionnez impérativement <b>Rental</b> et renseignez exactement la période de location.</div><p>En cas de non-paiement, la facture est envoyée à Roadsurfer puis refacturée, avec des frais administratifs et d’éventuelles majorations.</p></section>
        <section class="card"><h2>💳 Comment le péage fonctionne</h2><p>Les stations sont automatiques et sans barrière. La plaque est photographiée et le passage est facturé via le système Toll-by-Plate.</p><p>Un badge AutoPASS peut donner une remise, mais il doit être commandé et reçu à l’avance. Avec une plaque connue seulement au retrait, <b>Epass24 est la solution opérationnelle</b>.</p></section>
      </div>
      <div class="grid toll-grid">
        <section class="card"><h2>🔑 Pickup checklist · Orly · 24 août</h2>${checklist('pickupChecks',PICKUP_LABELS)}</section>
        <section class="card"><h2>🇳🇴 Avant d’entrer en Norvège</h2>${checklist('borderChecks',BORDER_LABELS)}<div class="toolbar"><button id="check-norway-distance" class="primary">Vérifier ma distance de la frontière</button></div><div id="norway-distance-status" class="status">GPS non vérifié</div></section>
      </div>
      <section class="card"><h2>🛣️ Où sont les péages ?</h2><p>Sur certaines routes, certains ponts, tunnels et dans plusieurs zones urbaines. Repérez les panneaux bleus « automatisk bomstasjon ».</p><div class="toll-city-list">${CITIES.map(c=>`<span>${esc(c)}</span>`).join('')}</div><h3>Péages privés</h3><p>Sur certaines routes isolées, le paiement peut se faire auprès d’une petite station, d’une borne, d’une boîte métallique ou via un formulaire. Suivez les instructions affichées et gardez une preuve de paiement.</p></section>
      <section class="card"><h2>✅ Après restitution</h2><label class="toll-check"><input id="toll-removed" type="checkbox" ${t.rental.removed?'checked':''}><span>Véhicule supprimé du compte Epass24 ou période Rental clôturée</span></label><p class="muted">Cette étape évite de payer les passages du locataire suivant.</p></section>`;
    bind();
  }
  function bind(){
    document.querySelectorAll('[data-toll-group]').forEach(el=>el.onchange=()=>{state.norwayTolls[el.dataset.tollGroup][el.dataset.tollKey]=el.checked;save();});
    document.querySelectorAll('[data-toll-field]').forEach(el=>el.onchange=()=>{state.norwayTolls.vehicle[el.dataset.tollField]=el.value.trim();save();});
    const removed=byId('toll-removed'); if(removed)removed.onchange=()=>{state.norwayTolls.rental.removed=removed.checked;save();};
    const gps=byId('check-norway-distance'); if(gps)gps.onclick=()=>{
      const out=byId('norway-distance-status');
      if(!navigator.geolocation){out.textContent='GPS indisponible.';return;}
      out.textContent='Localisation en cours…';
      navigator.geolocation.getCurrentPosition(pos=>{
        const border={lat:59.10,lon:11.40};
        const d=typeof distance==='function'?distance({lat:pos.coords.latitude,lon:pos.coords.longitude},border):0;
        out.innerHTML=d<25?'<b>⚠️ Frontière proche.</b> Vérifiez Epass24, Rental, les dates, la plaque et le paiement.':`Point de frontière de référence à environ ${Math.round(d)} km.`;
      },err=>out.textContent='Erreur GPS : '+err.message,{enableHighAccuracy:true,timeout:15000});
    };
  }
  function install(){
    seed();
    const nav=document.getElementById('nav');
    if(nav&&!nav.querySelector('[data-tab="tolls"]')){
      const sync=nav.querySelector('[data-tab="sync"]');
      const b=document.createElement('button');
      b.textContent='Péages 🇳🇴'; b.dataset.tab='tolls';
      b.onclick=()=>{active='tolls';document.querySelectorAll('#nav button').forEach(x=>x.classList.toggle('active',x===b));renderNorwayTolls();};
      nav.insertBefore(b,sync||null);
    }
    window.renderNorwayTolls=renderNorwayTolls;
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
