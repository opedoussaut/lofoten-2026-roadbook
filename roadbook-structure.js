'use strict';

(function reorganizeRoadbook(){
  const NAV_LABELS={
    dashboard:'Synthèse',
    itinerary:'Trajet & nuits',
    family:'Activités',
    map:'Carte',
    van:'Camping-car',
    journal:'Journal',
    budget:'Budget',
    assistant:'Assistant',
    sync:'Sauvegarde'
  };

  function relabelNav(){
    document.querySelectorAll('#nav button[data-tab]').forEach(button=>{
      const label=NAV_LABELS[button.dataset.tab];
      if(label)button.textContent=label;
    });
  }

  function routeTotal(){
    return (state.itinerary||[]).reduce((sum,row)=>sum+(Number(row[3])||0),0);
  }

  function currentStage(){
    const iso=String(state.current?.date||'');
    const parts=iso.split('-');
    const date=parts.length===3?`${parts[2]}/${parts[1]}`:'';
    return (state.itinerary||[]).find(row=>row[0]===date)||null;
  }

  function renderDashboardClean(){
    const stage=currentStage();
    const profile=state.vehicleProfile||{};
    byId('app').innerHTML=`
      <section class="card" style="margin-bottom:12px;border-left:5px solid #b45309">
        <p class="eyebrow">LES TROIS POINTS À RETENIR</p>
        <div class="grid">
          <div><b>10 septembre</b><p>Arrivée obligatoire à la maison à Chevreuse, même tardive.</p></div>
          <div><b>11 septembre</b><p>Nettoyage, vidanges et plein le matin; restitution à Champlan avant 17 h.</p></div>
          <div><b>Véhicule</b><p>${esc(profile.bookingCategory||'Cozy Cottage')} · ${esc(profile.referenceModel||'modèle à confirmer')}<br><span class="muted">Tous les détails sont regroupés dans l’onglet Camping-car.</span></p></div>
        </div>
      </section>

      <div class="grid">
        ${card('Départ',state.meta.start,state.meta.from)}
        ${card('Arrivée maison','10/09/2026 soir','Chevreuse')}
        ${card('Restitution',state.meta.return,state.meta.to)}
        ${card('Distance planifiée',routeTotal().toLocaleString('fr-FR')+' km','hors excursions locales')}
      </div>

      ${stage?`<section class="card" style="margin-top:12px"><p class="eyebrow">ÉTAPE DU JOUR</p><h2>${esc(stage[1])} → ${esc(stage[2])}</h2><p><b>≈ ${esc(stage[3])} km · ${esc(stage[4])} h</b> · ${esc(stage[5])}</p><p>${esc(stage[6]||'')}</p></section>`:''}

      <div class="grid" style="margin-top:12px">
        <section class="card">
          <h2>État actuel</h2>
          <div class="form">
            <label>Date<input id="c-date" type="date" value="${esc(state.current.date)}"></label>
            <label>Position<input id="c-place" value="${esc(state.current.place)}"></label>
            <label>Météo<input id="c-weather" value="${esc(state.current.weather)}"></label>
            <label>Énergie Olivier /5<input id="c-o" type="number" min="1" max="5" value="${state.current.olivier}"></label>
            <label>Énergie Sorya /5<input id="c-s" type="number" min="1" max="5" value="${state.current.sorya}"></label>
            <label>Énergie Paddy /5<input id="c-p" type="number" min="1" max="5" value="${state.current.paddy}"></label>
          </div>
          <label>Décision<textarea id="c-decision">${esc(state.current.decision)}</textarea></label>
          <button id="save-current" class="primary">Enregistrer</button>
        </section>

        <section class="card">
          <h2>Suivi GPS</h2>
          <p class="muted">La trace enregistrée complète le roadbook; elle ne remplace pas le GPS camping-car.</p>
          <div class="toolbar"><button id="gps-start" class="primary">Démarrer</button><button id="gps-stop">Arrêter</button><button id="gps-reset" class="danger">Réinitialiser</button></div>
          <div id="gps-status" class="status">Suivi inactif · ${(state.gps.km||0).toFixed(1)} km enregistrés</div>
        </section>
      </div>`;

    byId('save-current').onclick=()=>{
      state.current={date:byId('c-date').value,place:byId('c-place').value,weather:byId('c-weather').value,olivier:+byId('c-o').value,sorya:+byId('c-s').value,paddy:+byId('c-p').value,decision:byId('c-decision').value};
      save();autoSync();renderDashboardClean();
    };
    byId('gps-start').onclick=startGPS;
    byId('gps-stop').onclick=stopGPS;
    byId('gps-reset').onclick=()=>{if(confirm('Effacer la trace GPS ?')){state.gps={km:0,points:[]};save();renderDashboardClean();}};
  }

  function nightLink(option,preferred=false){
    if(!option)return '';
    const cls=preferred?'primary':'';
    return `<a class="btn ${cls}" href="${esc(option.url)}" target="_blank" rel="noopener">${preferred?'⭐ ':''}${esc(option.name)} ↗</a>`;
  }

  function stageCard(row,index){
    const [date,from,to,km,hours,type,planA,planB]=row;
    const night=state.nightlyOptions?.[date];
    const alternatives=night?.alternatives||[];
    const isHome=date==='10/09';
    const isReturn=date==='11/09';
    return `<article class="card" style="margin-bottom:12px;${isHome?'border:2px solid #b45309;':''}">
      <div class="nightly-options-heading">
        <div><p class="eyebrow">ÉTAPE ${index+1} · ${esc(date)}</p><h2>${esc(from)} → ${esc(to)}</h2></div>
        <div style="text-align:right"><b>≈ ${esc(km)} km</b><br><span>${esc(hours)} h · ${esc(type)}</span></div>
      </div>
      <p>${esc(planA||'')}</p>
      ${planB?`<p class="muted"><b>Plan de repli :</b> ${esc(planB)}</p>`:''}
      ${night?`<div style="margin-top:10px"><p class="muted" style="margin-bottom:6px">NUIT PRÉFÉRÉE</p>${nightLink(night.preferred,true)}</div>
        ${alternatives.length?`<details style="margin-top:10px"><summary><b>Voir les deux alternatives</b></summary><div class="toolbar" style="margin-top:10px">${alternatives.map(option=>nightLink(option,false)).join('')}</div></details>`:''}`:''}
      ${isHome?'<div class="popup-warning" style="margin-top:12px"><b>Objectif impératif :</b> continuer jusqu’à la maison; aucune nuit intermédiaire.</div>':''}
      ${isReturn?'<div class="popup-warning" style="margin-top:12px"><b>Journée de restitution :</b> nettoyage, vidanges, plein, photos et départ vers Champlan avec marge.</div>':''}
    </article>`;
  }

  function renderItineraryClean(){
    const rows=state.itinerary||[];
    const nights=Object.keys(state.nightlyOptions||{}).length;
    byId('app').innerHTML=`
      <section class="card" style="margin-bottom:12px">
        <div class="nightly-options-heading"><div><p class="eyebrow">PLAN UNIQUE</p><h1>Trajet et nuits</h1></div><div style="text-align:right"><b>${routeTotal().toLocaleString('fr-FR')} km</b><br><span>${nights} nuits planifiées</span></div></div>
        <p class="muted">Chaque journée ne figure qu’une seule fois : conduite, objectif, nuit préférée et alternatives sont regroupés dans la même fiche.</p>
      </section>
      ${rows.map(stageCard).join('')}
      <details class="card" style="margin-top:12px">
        <summary><b>Mode édition avancée</b></summary>
        <p class="muted">À utiliser uniquement pour modifier directement les lignes du trajet.</p>
        <div class="toolbar"><button id="add-leg" class="primary">Ajouter une étape</button></div>
        ${editableTable(rows,['Date','Départ','Arrivée','Km','Heures','Type','Plan A','Plan B'],'itinerary')}
      </details>`;

    bindEditable('itinerary',renderItineraryClean);
    const add=byId('add-leg');
    if(add)add.onclick=()=>{state.itinerary.push(['Date','Départ','Arrivée',0,0,'Normale','Plan A','Plan B']);save();renderItineraryClean();};
  }

  function renderVanClean(){
    const p=state.vehicleProfile||{};
    const meter=(label,key)=>`<div class="card"><div class="range-row"><b>${label}</b><input data-vankey="${key}" type="range" min="0" max="100" value="${state.van[key]}"><output>${state.van[key]}%</output></div></div>`;
    byId('app').innerHTML=`
      <section class="card" style="margin-bottom:12px;border:2px solid #0f766e">
        <p class="eyebrow">FICHE VÉHICULE — SOURCE UNIQUE</p>
        <h1>${esc(p.bookingCategory||'Roadsurfer Cozy Cottage')}</h1>
        <h3>Modèle de référence : ${esc(p.referenceModel||'à confirmer à la remise')}</h3>
        <p class="muted">${esc(p.modelNotice||'Le véhicule exact sera confirmé à Champlan.')}</p>
        <div class="grid">
          <div><b>Motorisation</b><p>${esc(p.engine||'Diesel')}<br>${esc(p.transmission||'À confirmer')}<br>AdBlue : ${esc(p.adblue||'Oui')}</p></div>
          <div><b>Dimensions de référence</b><p>Carrosserie ${esc(p.bodyLength||'—')}<br>Porte-vélos déployé ${esc(p.deployedRackLength||'—')}<br>Hauteur ${esc(p.height||'—')}<br>Largeur ${esc(p.widthMirrors||'—')}<br>PTAC ${esc(p.maxWeight||'—')}</p></div>
          <div><b>Profil Sygic</b><p>Longueur <strong>${esc(p.sygicLength||'—')}</strong><br>Largeur <strong>${esc(p.sygicWidth||'—')}</strong><br>Hauteur <strong>${esc(p.sygicHeight||'—')}</strong><br>Poids <strong>${esc(p.sygicWeight||'—')}</strong></p></div>
          <div><b>Gaz</b><p><strong>${esc(p.gas||'PROPANE')}</strong><br>${esc(p.gasSystem||'30 mbar')}<br>${esc(p.gasBottle||'Bouteilles à vérifier à la remise')}</p></div>
        </div>
        <div class="popup-warning"><b>À confirmer à Champlan :</b> modèle exact, hauteur réelle, carte grise, PTAC, boîte de vitesses, nombre et raccord des bouteilles, fonctionnement chauffage/eau chaude.</div>
      </section>

      <h2>Niveaux pendant le voyage</h2>
      <div class="grid">${meter('Carburant','fuel')}${meter('Eau propre','water')}${meter('Eaux grises','grey')}${meter('Batterie','battery')}</div>
      <section class="card" style="margin-top:12px">
        <div class="form"><label>Toilettes<select id="toilet"><option>OK</option><option>À vider</option><option>À traiter</option></select></label><label>Action suivante<input id="van-next" value="${esc(state.van.next)}"></label></div>
        <button id="save-van" class="primary">Enregistrer</button>
      </section>

      <section class="card" style="margin-top:12px">
        <p class="eyebrow">CHECK-LIST DE RESTITUTION</p>
        <div class="grid">
          <div><b>Technique</b><p>Carburant · AdBlue · eau propre · eaux grises · cassette WC · gaz fermé.</p></div>
          <div><b>Nettoyage</b><p>Cabine · cuisine · salle d’eau · couchages · sol · soute · extérieur.</p></div>
          <div><b>Preuves</b><p>Photos intérieur/extérieur · kilométrage · carburant · AdBlue · absence de dégâts.</p></div>
        </div>
      </section>`;

    byId('toilet').value=state.van.toilet;
    document.querySelectorAll('[data-vankey]').forEach(r=>r.oninput=()=>r.nextElementSibling.value=r.value+'%');
    byId('save-van').onclick=()=>{
      document.querySelectorAll('[data-vankey]').forEach(r=>state.van[r.dataset.vankey]=+r.value);
      state.van.toilet=byId('toilet').value;
      state.van.next=byId('van-next').value;
      save();autoSync();renderVanClean();
    };
  }

  function install(){
    window.renderDashboard=renderDashboardClean;
    window.renderItinerary=renderItineraryClean;
    window.renderVan=renderVanClean;
    relabelNav();
  }

  install();
  document.addEventListener('DOMContentLoaded',()=>{relabelNav();});
})();
