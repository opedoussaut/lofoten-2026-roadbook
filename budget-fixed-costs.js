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

  // On ne comptabilise ici que les courses réellement destinées à être consommées
  // pendant le road trip. Équipement, vêtements, jeux et achats durables sont exclus.
  const PRETRIP_GROCERIES=[
    {
      category:'Courses · petit-déjeuner / snack',
      label:'Biscuits Bjorg céréales raisin',
      quantity:'5 paquets sur 10',
      amount:17.90,
      note:'Commande Amazon du 08/08/2026 · 3,58 € / paquet'
    },
    {
      category:'Courses · boissons',
      label:'Nescafé Espresso Intenso soluble',
      quantity:'2 boîtes sur 5',
      amount:11.84,
      note:'Commande Amazon du 04/08/2026 · 5,92 € / boîte'
    },
    {
      category:'Courses · divers',
      label:'Autres courses pour le road trip',
      quantity:'Estimation globale',
      amount:250,
      note:'Budget complémentaire prévu pour les autres consommables du voyage'
    }
  ];

  function euro(value){return Number(value||0).toLocaleString('fr-FR',{minimumFractionDigits:2,maximumFractionDigits:2})+' €';}

  window.renderBudget=function renderBudget(){
    const variableTotal=(state.expenses||[]).reduce((sum,row)=>sum+(Number(row[1])||0),0);
    const fixedTotal=FIXED_TRIP_COSTS.reduce((sum,item)=>sum+item.amount,0);
    const groceriesTotal=PRETRIP_GROCERIES.reduce((sum,item)=>sum+item.amount,0);
    const grandTotal=fixedTotal+groceriesTotal+variableTotal;

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

    const groceryRows=PRETRIP_GROCERIES.map(item=>`<tr><td>${esc(item.category)}</td><td><b>${esc(item.label)}</b><br><span class="muted">${esc(item.quantity)}</span></td><td>${euro(item.amount)}</td><td>${esc(item.note)}</td></tr>`).join('');

    byId('app').innerHTML=`
      <div class="grid">
        <div class="card kpi"><span class="muted">Coûts fixes déjà payés</span><br><strong>${euro(fixedTotal)}</strong><br><span>Roadsurfer inclus</span></div>
        <div class="card kpi"><span class="muted">Courses Lofoten prévues</span><br><strong>${euro(groceriesTotal)}</strong><br><span>Courses déjà achetées + estimation des courses diverses</span></div>
        <div class="card kpi"><span class="muted">Dépenses voyage enregistrées</span><br><strong>${euro(variableTotal)}</strong><br><span>Carburant, campings, courses, péages…</span></div>
        <div class="card kpi"><span class="muted">Budget dépensé / engagé</span><br><strong>${euro(grandTotal)}</strong><br><span>Coûts fixes + courses Lofoten + dépenses enregistrées</span></div>
      </div>
      ${fixedHtml}
      <section class="card" style="margin-top:12px">
        <p class="eyebrow">COURSES AVANT DÉPART · LOFOTEN</p><h2>Courses destinées au voyage</h2>
        <div class="table-wrap"><table><thead><tr><th>Catégorie</th><th>Article / quantité voyage</th><th>Montant affecté</th><th>Note</th></tr></thead><tbody>${groceryRows}</tbody></table></div>
        <p class="muted" style="margin-top:10px">Seuls les consommables prévus pour être utilisés pendant le road trip sont comptés ici. Les jeux, vêtements, chaussures, accessoires pour Paddy et autres équipements durables restent hors budget Lofoten.</p>
      </section>
      <div class="card" style="margin-top:12px"><h3>Ajouter une dépense</h3><div class="form"><label>Catégorie<input id="e-cat" placeholder="Carburant, camping…"></label><label>Montant<input id="e-amount" type="number" step="0.01" placeholder="€"></label><label>Lieu<input id="e-place" placeholder="Lieu"></label><label>Note<input id="e-note" placeholder="Note"></label></div><button id="e-add" class="primary">Ajouter</button></div>
      <section class="card" style="margin-top:12px"><p class="eyebrow">DÉPENSES VARIABLES</p><h2>Dépenses du voyage</h2>${editableTable(state.expenses||[],['Catégorie','Montant €','Lieu','Note','Date'],'expenses')}</section>`;

    bindEditable('expenses',renderBudget);
    byId('e-add').onclick=()=>{
      state.expenses.push([byId('e-cat').value,Number(byId('e-amount').value)||0,byId('e-place').value,byId('e-note').value,new Date().toISOString().slice(0,10)]);
      save();autoSync();renderBudget();
    };
  };
})();
