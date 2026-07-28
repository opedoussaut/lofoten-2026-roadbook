'use strict';

(function initNorwayTolls(){
  const EPASS='https://www.epass24.com/';
  const DEFAULTS={
    vehicle:{booking:'3641456462',category:'Cozy Cottage',make:'Knaus',model:'Van TI 640/650 Vansation — MAN TGE',fuel:'Diesel',euro:'Euro 6d-Final / Euro 6E',gvwr:'À vérifier sur la carte grise (champ F.2, généralement ≈ 3 500 kg)',length:'6,99 m — indiquer 7,80 m avec porte-vélos plié',width:'2,74 m avec rétroviseurs',height:'3,01 m',plate:''},
    rental:{pickup:'2026-08-24',return:'2026-09-11',rentalSelected:false,registered:false,removed:false},
    pickupChecks:{plate:false,registration:false,f2:false,fuel:false,euro:false,dimensions:false,photos:false,water:false,gas:false,electricCable:false,waterHose:false,damage:false},
    borderChecks:{account:false,registered:false,rental:false,dates:false,plate:false},
    notes:'Roadsurfer ne préenregistre pas le véhicule. L’immatriculation est remise le jour du départ.'
  };
  const CITIES=['Bergen','Bodø','Førde','Harstad','Haugesund','Nord-Jæren','Kristiansand','Trondheim','Oslo / Bærum'];
  const PICKUP_LABELS={plate:'Immatriculation récupérée',registration:'Carte grise récupérée',f2:'PTAC / champ F.2 vérifié',fuel:'Carburant confirmé : diesel',euro:'Norme Euro confirmée',dimensions:'Dimensions vérifiées',photos:'Photos complètes du véhicule',water:'Niveau d’eau vérifié',gas:'Gaz vérifié',electricCable:'Câble électrique présent',waterHose:'Tuyau d’eau présent',damage:'État et dommages consignés'};
  const BORDER_LABELS={account:'Compte Epass24 créé',registered:'Véhicule enregistré sur Epass24',rental:'Option Rental sélectionnée',dates:'Dates exactes de location saisies',plate:'Plaque vérifiée caractère par caractère'};

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
    const today=new Date();
    const pickup=new Date('2026-08-24T08:00:00');
    const ret=new Date('2026-09-11T08:00:00');
    const days=Math.ceil((pickup-today)/86400000);
    let message=days>1?`Dans ${days} jours : préparer le compte Epass24 et le check-in Roadsurfer.`:days>=0?'Départ imminent : récupérer la plaque et enregistrer le van sur Epass24.':today<=ret?'Voyage en cours : vérifier Epass24 avant l’entrée en Norvège.':'Après restitution : supprimer le véhicule du compte Epass24.';
    return `<div class="toll-reminder"><b>⏰ Rappel</b><span>${esc(message)}</span></div>`;
  }
  function renderNorwayTolls(){
    seed(); const t=state.norwayTolls;
    byId('app').innerHTML=`
      <section class="card toll-hero"><div><p class="eyebrow">NORWAY TOLL ASSISTANT</p><h2>🇳🇴 Péages norvégiens · Roadsurfer</h2><p>Guide opérationnel pour le Cozy Cottage, de la prise en charge à la restitution.</p></div><a class="btn primary" href="${EPASS}" target="_blank" rel="noopener">Ouvrir Epass24 ↗</a></section>
      ${reminderHtml()}
      <div class="grid toll-grid">
        <section class="card"><h2>🚐 Véhicule</h2><div class="toll-specs">
          <label>Réservation<input data-toll-field="booking" value="${esc(t.vehicle.booking)}"></label>
          <label>Immatriculation<input data-toll-field="plate" placeholder="À saisir au retrait" value="${esc(t.vehicle.plate)}"></label>
          <p><b>${esc(t.vehicle.make)} ${esc(t.vehicle.model)}</b></p><p>Carburant : ${esc(t.vehicle.fuel)}</p><p>Norme : ${esc(t.vehicle.euro)}</p><p>PTAC : ${esc(t.vehicle.gvwr)}</p><p>Longueur : ${esc(t.vehicle.length)}</p><p>Largeur : ${esc(t.vehicle.width)}</p><p>Hauteur : ${esc(t.vehicle.height)}</p>
        </div></section>
        <section class="card"><h2>📍 Règle Roadsurfer</h2><p>${esc(t.notes)}</p><div class="popup-warning"><b>Important :</b> créez l’enregistrement Epass24 uniquement après réception de la plaque, choisissez <b>Rental</b> et saisissez les dates exactes.</div><p>Sans paiement, la facture est envoyée à Roadsurfer puis refacturée, avec d’éventuels frais ou majorations.</p></section>
      </div>
      <div class="grid toll-grid">
        <section class="card"><h2>🔑 Pickup checklist · 24 août</h2>${checklist('pickupChecks',PICKUP_LABELS)}</section>
        <section class="card"><h2>🇳🇴 Avant la frontière</h2>${checklist('borderChecks',BORDER_LABELS)}<div class="toolbar"><button id="check-norway-distance" class="primary">Vérifier ma distance de la Norvège</button></div><div id="norway-distance-status" class="status">GPS non vérifié</div></section>
      </div>
      <section class="card"><h2>🛣️ Où sont les péages ?</h2><p>Routes, ponts, tunnels et centres-villes signalés par des panneaux bleus « automatisk bomstasjon ». Le système Toll-by-Plate scanne automatiquement la plaque.</p><div class="toll-city-list">${CITIES.map(c=>`<span>${esc(c)}</span>`).join('')}</div><h3>Routes privées</h3><p>Sur certaines routes isolées, une petite station, une boîte métallique ou un formulaire peut remplacer le péage automatique. Suivre les instructions sur place et conserver une preuve de paiement.</p></section>
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
        const border={lat:59.1,lon:11.4};
        const d=typeof distance==='function'?distance({lat:pos.coords.latitude,lon:pos.coords.longitude},border):0;
        out.innerHTML=d<25?'<b>⚠️ Frontière proche.</b> Vérifiez maintenant Epass24, Rental, les dates et la plaque.':`Frontière norvégienne la plus proche estimée à environ ${Math.round(d)} km.`;
      },err=>out.textContent='Erreur GPS : '+err.message,{enableHighAccuracy:true,timeout:15000});
    };
  }
  function install(){
    seed();
    if(typeof tabs!=='undefined'&&!tabs.some(x=>x[0]==='tolls'))tabs.splice(tabs.length-1,0,['tolls','Péages 🇳🇴']);
    if(typeof show==='function'){
      const baseShow=show;
      window.show=function(id){if(id==='tolls'){active=id;document.querySelectorAll('#nav button').forEach(b=>b.classList.toggle('active',b.dataset.tab===id));renderNorwayTolls();return;}baseShow(id);};
    }
    window.renderNorwayTolls=renderNorwayTolls;
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{});
  install();
})();