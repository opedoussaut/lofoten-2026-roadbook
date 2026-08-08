'use strict';

(function enhanceBudget(){
  const FIXED_TRIP_COSTS=[
    {
      category:'Location camping-car',
      label:'Roadsurfer · Cozy Cottage',
      amount:2195,
      status:'Payé intégralement',
      note:'18 nuits · 24 août 2026 16:00 → 11 septembre 2026 17:00',
      detail:[
        ['Location Cozy Cottage',1802],
        ['Porte-vélos (2 vélos)',126],
        ['Frais de réservation',99],
        ['Frais de voyage',119],
        ['Retour à 17 h',49]
      ],
      payments:[['Paiement initial',1914,'27/02/2026'],['Solde après modification',281,'10/07/2026']]
    }
  ];

  function euro(value){return Number(value||0).toLocaleString('fr-FR',{minimumFractionDigits:2,maximumFractionDigits:2})+' €';}

  window.renderBudget=function renderBudget(){
    const variableTotal=(state.expenses||[]).reduce((sum,row)=>sum+(Number(row[1])||0),0);
    const fixedTotal=FIXED_TRIP_COSTS.reduce((sum,item)=>sum+item.amount,0);
    const grandTotal=fixedTotal+variableTotal;
    const fixedHtml=FIXED_TRIP_COSTS.map(item=>`<section class="card" style="margin-top:12px;border-left:5px solid #15803d">
      <div class="nightly-options-heading">
        <div><p class="eyebrow">COÛT FIXE · ${esc(item.category).toUpperCase()}</p><h2>${esc(item.label)}</h2><p>${esc(item.note)}</p></div>
        <div style="text-align:right"><div class="expense-total">${euro(item.amount)}</div><b style="color:#15803d">✓ ${esc(item.status)}</b></div>
      </div>
      <div class="grid" style="margin-top:10px">
        <div><h3>Détail du tarif</h3>${item.detail.map(row=>`<p style="display:flex;justify-content:space-between;gap:16px"><span>${esc(row[0])}</span><b>${euro(row[1])}</b></p>`).join('')}<hr><p style="display:flex;justify-content:space-between;gap:16px"><b>Total Roadsurfer</b><b>${euro(item.amount)}</b></p></div>
        <div><h3>Paiements</h3>${item.payments.map(row=>`<p style="display:flex;justify-content:space-between;gap:16px"><span>${esc(row[0])}<br><small class="muted">${esc(row[2])}</small></span><b>${euro(row[1])}</b></p>`).join('')}<hr><p><b style="color:#15803d">Solde restant : 0,00 €</b></p><p class="muted">La caution Roadsurfer de 800 € n’est pas comptée comme dépense : elle est seulement bloquée temporairement lors de la prise en charge.</p></div>
      </div>
    </section>`).join('');

    byId('app').innerHTML=`
      <div class="grid">
        <div class="card kpi"><span class="muted">Coûts fixes déjà payés</span><br><strong>${euro(fixedTotal)}</strong><br><span>Roadsurfer inclus</span></div>
        <div class="card kpi"><span class="muted">Dépenses voyage enregistrées</span><br><strong>${euro(variableTotal)}</strong><br><span>Carburant, campings, courses, péages…</span></div>
        <div class="card kpi"><span class="muted">Budget dépensé / engagé</span><br><strong>${euro(grandTotal)}</strong><br><span>Coûts fixes + dépenses enregistrées</span></div>
        <div class="card"><h3>Ajouter une dépense</h3><div class="form"><label>Catégorie<input id="e-cat" placeholder="Carburant, camping…"></label><label>Montant<input id="e-amount" type="number" step="0.01" placeholder="€"></label><label>Lieu<input id="e-place" placeholder="Lieu"></label><label>Note<input id="e-note" placeholder="Note"></label></div><button id="e-add" class="primary">Ajouter</button></div>
      </div>
      ${fixedHtml}
      <section class="card" style="margin-top:12px"><p class="eyebrow">DÉPENSES VARIABLES</p><h2>Dépenses du voyage</h2>${editableTable(state.expenses||[],['Catégorie','Montant €','Lieu','Note','Date'],'expenses')}</section>`;

    bindEditable('expenses',renderBudget);
    byId('e-add').onclick=()=>{
      state.expenses.push([byId('e-cat').value,Number(byId('e-amount').value)||0,byId('e-place').value,byId('e-note').value,new Date().toISOString().slice(0,10)]);
      save();autoSync();renderBudget();
    };
  };
})();
