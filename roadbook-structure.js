'use strict';

(function reorganizeRoadbook(){
  const NAV_LABELS={dashboard:'Synthèse',itinerary:'Trajet & nuits',family:'Activités',map:'Carte',van:'Camping-car',journal:'Journal',budget:'Budget',assistant:'Assistant',sync:'Sauvegarde'};
  const MAIN_WAYPOINTS=[
    ['Chevreuse',48.706,2.038],['Nuit 1',53.7,9.9],['Nuit 2',57.9,14.3],['Forsgården',60.675,17.074],['Nuit 4',64.5,20.5],['Abisko',68.354,18.832],['Hov Camping',68.341,14.117],['Uttakleiv',68.209,13.507],['Lofoten Beach Camp',68.089,13.236],['Moskenes Camping',67.901,13.046],['Narvik',68.438,17.427],['Nikkaluokta',67.851,19.013],['Camp Gielas',65.591,19.185],['Yttervik',66.17,13.98],['Tråsåvika',63.31,9.89],['Larkollen',59.33,10.67],['Malmö',55.605,13.003],['Copenhague',55.676,12.568],['Campingpark Südheide',52.672,9.936],['Chevreuse',48.706,2.038],['Champlan',48.708,2.279]
  ];

  function relabelNav(){document.querySelectorAll('#nav button[data-tab]').forEach(button=>{const label=NAV_LABELS[button.dataset.tab];if(label)button.textContent=label;});}
  function sumKm(rows){return (rows||[]).reduce((sum,row)=>sum+(Number(row[3])||0),0);}
  function activeKey(){return state.activeRoutePlan==='bis'?'bis':'main';}
  function routePlan(key=activeKey()){
    if(key==='bis')return {
      key:'bis',label:'Plan B · ferry Moskenes–Bodø',short:'Ferry direct · aucun retour sur l’E10',
      description:state.itineraryBisMeta?.description||'Sortie directe des Lofoten par Moskenes puis retour par la Norvège.',
      paddy:state.itineraryBisMeta?.paddy||'Moins de route arctique, avec une traversée maritime à valider pour Paddy.',
      rows:state.itineraryBis||[],nights:state.nightlyOptionsBis||{},waypoints:state.itineraryBisMeta?.waypoints||[],ferry:state.itineraryBisMeta?.ferry||null
    };
    return {
      key:'main',label:'Plan A · zéro ferry',short:'Route intégrale · détour par la Laponie',
      description:'Retour entièrement routier par Narvik, Nikkaluokta et Arvidsjaur, puis retour en Norvège.',
      paddy:'Aucune traversée maritime, mais davantage de kilomètres arctiques et plusieurs très longues journées.',
      rows:state.itinerary||[],nights:state.nightlyOptions||{},waypoints:MAIN_WAYPOINTS,ferry:null
    };
  }
  function switchPlan(key,rerender){state.activeRoutePlan=key==='bis'?'bis':'main';save();rerender();}
  function planSelector(rerender){
    const key=activeKey();
    return `<div class="toolbar" style="margin:10px 0 4px">
      <button class="${key==='main'?'primary':''}" data-route-plan="main">Plan A · zéro ferry</button>
      <button class="${key==='bis'?'primary':''}" data-route-plan="bis">Plan B · ferry direct</button>
    </div>`;
  }
  function bindPlanSelector(rerender){document.querySelectorAll('[data-route-plan]').forEach(button=>button.onclick=()=>switchPlan(button.dataset.routePlan,rerender));}

  function currentStage(){
    const iso=String(state.current?.date||'');const parts=iso.split('-');const date=parts.length===3?`${parts[2]}/${parts[1]}`:'';
    return routePlan().rows.find(row=>row[0]===date)||null;
  }

  function renderDashboardClean(){
    const plan=routePlan();const stage=currentStage();const profile=state.vehicleProfile||{};
    byId('app').innerHTML=`
      <section class="card" style="margin-bottom:12px;border-left:5px solid #b45309">
        <p class="eyebrow">LES TROIS POINTS À RETENIR</p>
        <div class="grid">
          <div><b>10 septembre</b><p>Arrivée obligatoire à la maison à Chevreuse, même tardive.</p></div>
          <div><b>11 septembre</b><p>Nettoyage, vidanges et plein le matin; restitution à Champlan avant 17 h.</p></div>
          <div><b>Plan actif</b><p>${esc(plan.label)}<br><span class="muted">Le changement de plan se fait dans Trajet & nuits ou Carte.</span></p></div>
        </div>
      </section>
      <div class="grid">
        ${card('Départ',state.meta.start,state.meta.from)}${card('Arrivée maison','10/09/2026 soir','Chevreuse')}${card('Restitution',state.meta.return,state.meta.to)}${card('Distance du plan actif',sumKm(plan.rows).toLocaleString('fr-FR')+' km','hors excursions et traversée maritime')}
      </div>
      ${stage?`<section class="card" style="margin-top:12px"><p class="eyebrow">ÉTAPE DU JOUR · ${esc(plan.label)}</p><h2>${esc(stage[1])} → ${esc(stage[2])}</h2><p><b>≈ ${esc(stage[3])} km · ${esc(stage[4])} h</b> · ${esc(stage[5])}</p><p>${esc(stage[6]||'')}</p></section>`:''}
      <div class="grid" style="margin-top:12px">
        <section class="card"><h2>État actuel</h2><div class="form"><label>Date<input id="c-date" type="date" value="${esc(state.current.date)}"></label><label>Position<input id="c-place" value="${esc(state.current.place)}"></label><label>Météo<input id="c-weather" value="${esc(state.current.weather)}"></label><label>Énergie Olivier /5<input id="c-o" type="number" min="1" max="5" value="${state.current.olivier}"></label><label>Énergie Sorya /5<input id="c-s" type="number" min="1" max="5" value="${state.current.sorya}"></label><label>Énergie Paddy /5<input id="c-p" type="number" min="1" max="5" value="${state.current.paddy}"></label></div><label>Décision<textarea id="c-decision">${esc(state.current.decision)}</textarea></label><button id="save-current" class="primary">Enregistrer</button></section>
        <section class="card"><h2>Suivi GPS</h2><p class="muted">La trace enregistrée complète le roadbook; elle ne remplace pas le GPS camping-car.</p><div class="toolbar"><button id="gps-start" class="primary">Démarrer</button><button id="gps-stop">Arrêter</button><button id="gps-reset" class="danger">Réinitialiser</button></div><div id="gps-status" class="status">Suivi inactif · ${(state.gps.km||0).toFixed(1)} km enregistrés</div></section>
      </div>`;
    byId('save-current').onclick=()=>{state.current={date:byId('c-date').value,place:byId('c-place').value,weather:byId('c-weather').value,olivier:+byId('c-o').value,sorya:+byId('c-s').value,paddy:+byId('c-p').value,decision:byId('c-decision').value};save();autoSync();renderDashboardClean();};
    byId('gps-start').onclick=startGPS;byId('gps-stop').onclick=stopGPS;byId('gps-reset').onclick=()=>{if(confirm('Effacer la trace GPS ?')){state.gps={km:0,points:[]};save();renderDashboardClean();}};
  }

  function optionHtml(option,preferred=false){
    if(!option)return '';
    return `<div style="margin-bottom:8px"><a class="btn ${preferred?'primary':''}" href="${esc(option.url)}" target="_blank" rel="noopener">${preferred?'⭐ ':''}${esc(option.name)} ↗</a>${option.role?`<p class="muted" style="margin:6px 0 0">${esc(option.role)}</p>`:''}${preferred&&option.calm?`<p style="margin:4px 0 0"><b>Calme ${esc(option.calm)}</b>${option.paddy?` · ${esc(option.paddy)}`:''}</p>`:''}</div>`;
  }

  function ferryPanel(ferry){
    if(!ferry)return '';
    return `<section class="card" style="margin:12px 0;border:2px solid #2563eb">
      <p class="eyebrow">TRAVERSÉE ET CONFORT DE PADDY</p><h3>${esc(ferry.title)}</h3>
      <p><b>${esc(ferry.target)}</b></p>
      <div class="grid"><div><b>Réservation</b><p>${esc(ferry.checkIn)}</p><a class="btn primary" href="${esc(ferry.bookingUrl)}" target="_blank" rel="noopener">Horaires et réservation ↗</a></div><div><b>Camping-car</b><p>${esc(ferry.vehicle)}</p><p>${esc(ferry.price)}</p></div><div><b>Règle animaux</b><p>${esc(ferry.petRule)}</p></div></div>
      <details><summary><b>Protocole Paddy avant et pendant la traversée</b></summary><ol>${(ferry.paddy||[]).map(item=>`<li>${esc(item)}</li>`).join('')}</ol></details>
    </section>`;
  }

  function stageCard(row,index,plan){
    const [date,from,to,km,hours,type,planA,planB]=row;const night=plan.nights?.[date];const alternatives=night?.alternatives||[];const isHome=date==='10/09';const isReturn=date==='11/09';const isFerry=plan.key==='bis'&&date==='04/09';
    return `<article class="card" style="margin-bottom:12px;${isHome?'border:2px solid #b45309;':''}">
      <div class="nightly-options-heading"><div><p class="eyebrow">ÉTAPE ${index+1} · ${esc(date)}</p><h2>${esc(from)} → ${esc(to)}</h2></div><div style="text-align:right"><b>≈ ${esc(km)} km${isFerry?' routiers':''}</b><br><span>${esc(hours)} h · ${esc(type)}</span></div></div>
      <p>${esc(planA||'')}</p>${planB?`<p class="muted"><b>Plan de repli :</b> ${esc(planB)}</p>`:''}
      ${isFerry?ferryPanel(plan.ferry):''}
      ${night?`<div style="margin-top:10px"><p class="muted" style="margin-bottom:6px">NUIT PRÉFÉRÉE</p>${optionHtml(night.preferred,true)}</div>${alternatives.length?`<details style="margin-top:10px"><summary><b>Voir les deux alternatives</b></summary><div style="margin-top:10px">${alternatives.map(option=>optionHtml(option,false)).join('')}</div></details>`:''}`:''}
      ${isHome?'<div class="popup-warning" style="margin-top:12px"><b>Objectif impératif :</b> continuer jusqu’à la maison; aucune nuit intermédiaire.</div>':''}${isReturn?'<div class="popup-warning" style="margin-top:12px"><b>Journée de restitution :</b> nettoyage, vidanges, plein, photos et départ vers Champlan avec marge.</div>':''}
    </article>`;
  }

  function renderItineraryClean(){
    const plan=routePlan();const other=routePlan(plan.key==='main'?'bis':'main');const rows=plan.rows||[];const saving=sumKm(routePlan('main').rows)-sumKm(routePlan('bis').rows);
    byId('app').innerHTML=`
      <section class="card" style="margin-bottom:12px">
        <div class="nightly-options-heading"><div><p class="eyebrow">DEUX PLANS, UNE SEULE VUE</p><h1>Trajet et nuits</h1></div><div style="text-align:right"><b>${sumKm(rows).toLocaleString('fr-FR')} km routiers</b><br><span>${Object.keys(plan.nights||{}).length} nuits planifiées</span></div></div>
        ${planSelector(renderItineraryClean)}
        <h3>${esc(plan.label)}</h3><p>${esc(plan.description)}</p><p><b>Paddy :</b> ${esc(plan.paddy)}</p>
        ${state.itineraryBis?.length?`<div class="popup-warning"><b>Comparaison :</b> le plan ferry économise environ ${Math.max(0,saving).toLocaleString('fr-FR')} km routiers et supprime le retour vers Narvik/Kiruna après Moskenes. Il ajoute une traversée de 3 h 15 à 3 h 30, à choisir seulement si Paddy la tolère bien.</div>`:'<p class="muted">Le plan ferry est en cours de chargement.</p>'}
      </section>
      ${rows.map((row,index)=>stageCard(row,index,plan)).join('')}
      ${plan.key==='main'?`<details class="card" style="margin-top:12px"><summary><b>Mode édition avancée du plan A</b></summary><p class="muted">Le plan B reste une variante protégée pour éviter une modification accidentelle.</p><div class="toolbar"><button id="add-leg" class="primary">Ajouter une étape</button></div>${editableTable(rows,['Date','Départ','Arrivée','Km','Heures','Type','Plan A','Plan B'],'itinerary')}</details>`:''}`;
    bindPlanSelector(renderItineraryClean);
    if(plan.key==='main'){
      bindEditable('itinerary',renderItineraryClean);const add=byId('add-leg');if(add)add.onclick=()=>{state.itinerary.push(['Date','Départ','Arrivée',0,0,'Normale','Plan A','Plan B']);save();renderItineraryClean();};
    }
  }

  function renderMapClean(){
    const plan=routePlan();const points=plan.waypoints||[];
    byId('app').innerHTML=`<section class="card"><div class="nightly-options-heading"><div><p class="eyebrow">CARTE DU PLAN ACTIF</p><h2>${esc(plan.label)}</h2></div><div style="text-align:right"><b>${sumKm(plan.rows).toLocaleString('fr-FR')} km routiers</b></div></div>${planSelector(renderMapClean)}<p>${esc(plan.description)}</p><div id="map-canvas" class="map"></div></section>`;
    bindPlanSelector(renderMapClean);
    setTimeout(()=>{
      if(typeof L==='undefined'||!points.length)return;
      if(window.leafletMap){try{window.leafletMap.remove();}catch(e){}}
      window.leafletMap=L.map('map-canvas').setView([60,10],4);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© OpenStreetMap'}).addTo(window.leafletMap);
      const pts=points.map(w=>[w[1],w[2]]);L.polyline(pts,{weight:4}).addTo(window.leafletMap);
      points.forEach((w,i)=>L.marker([w[1],w[2]]).addTo(window.leafletMap).bindPopup(`<b>${i}. ${esc(w[0])}</b>`));window.leafletMap.fitBounds(pts,{padding:[20,20]});
    },0);
  }

  function renderVanClean(){
    const p=state.vehicleProfile||{};const meter=(label,key)=>`<div class="card"><div class="range-row"><b>${label}</b><input data-vankey="${key}" type="range" min="0" max="100" value="${state.van[key]}"><output>${state.van[key]}%</output></div></div>`;
    byId('app').innerHTML=`<section class="card" style="margin-bottom:12px;border:2px solid #0f766e"><p class="eyebrow">FICHE VÉHICULE — SOURCE UNIQUE</p><h1>${esc(p.bookingCategory||'Roadsurfer Cozy Cottage')}</h1><h3>Modèle de référence : ${esc(p.referenceModel||'à confirmer à la remise')}</h3><p class="muted">${esc(p.modelNotice||'Le véhicule exact sera confirmé à Champlan.')}</p><div class="grid"><div><b>Motorisation</b><p>${esc(p.engine||'Diesel')}<br>${esc(p.transmission||'À confirmer')}<br>AdBlue : ${esc(p.adblue||'Oui')}</p></div><div><b>Dimensions de référence</b><p>Carrosserie ${esc(p.bodyLength||'—')}<br>Porte-vélos déployé ${esc(p.deployedRackLength||'—')}<br>Hauteur ${esc(p.height||'—')}<br>Largeur ${esc(p.widthMirrors||'—')}<br>PTAC ${esc(p.maxWeight||'—')}</p></div><div><b>Profil Sygic</b><p>Longueur <strong>${esc(p.sygicLength||'—')}</strong><br>Largeur <strong>${esc(p.sygicWidth||'—')}</strong><br>Hauteur <strong>${esc(p.sygicHeight||'—')}</strong><br>Poids <strong>${esc(p.sygicWeight||'—')}</strong></p></div><div><b>Gaz</b><p><strong>${esc(p.gas||'PROPANE')}</strong><br>${esc(p.gasSystem||'30 mbar')}<br>${esc(p.gasBottle||'Bouteilles à vérifier à la remise')}</p></div></div><div class="popup-warning"><b>À confirmer à Champlan :</b> modèle exact, hauteur réelle, carte grise, PTAC, boîte de vitesses, nombre et raccord des bouteilles, fonctionnement chauffage/eau chaude.</div></section><h2>Niveaux pendant le voyage</h2><div class="grid">${meter('Carburant','fuel')}${meter('Eau propre','water')}${meter('Eaux grises','grey')}${meter('Batterie','battery')}</div><section class="card" style="margin-top:12px"><div class="form"><label>Toilettes<select id="toilet"><option>OK</option><option>À vider</option><option>À traiter</option></select></label><label>Action suivante<input id="van-next" value="${esc(state.van.next)}"></label></div><button id="save-van" class="primary">Enregistrer</button></section><section class="card" style="margin-top:12px"><p class="eyebrow">CHECK-LIST DE RESTITUTION</p><div class="grid"><div><b>Technique</b><p>Carburant · AdBlue · eau propre · eaux grises · cassette WC · gaz fermé.</p></div><div><b>Nettoyage</b><p>Cabine · cuisine · salle d’eau · couchages · sol · soute · extérieur.</p></div><div><b>Preuves</b><p>Photos intérieur/extérieur · kilométrage · carburant · AdBlue · absence de dégâts.</p></div></div></section>`;
    byId('toilet').value=state.van.toilet;document.querySelectorAll('[data-vankey]').forEach(r=>r.oninput=()=>r.nextElementSibling.value=r.value+'%');byId('save-van').onclick=()=>{document.querySelectorAll('[data-vankey]').forEach(r=>state.van[r.dataset.vankey]=+r.value);state.van.toilet=byId('toilet').value;state.van.next=byId('van-next').value;save();autoSync();renderVanClean();};
  }

  function install(){window.renderDashboard=renderDashboardClean;window.renderItinerary=renderItineraryClean;window.renderMap=renderMapClean;window.renderVan=renderVanClean;relabelNav();}
  install();document.addEventListener('DOMContentLoaded',()=>{relabelNav();});
})();
