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

  const PRETRIP_PURCHASES=[
    {
      category:'Nourriture',
      label:'Biscuits Bjorg céréales raisin',
      quantity:'5 paquets sur 10',
      amount:17.90,
      currency:'EUR',
      note:'Commande Amazon du 08/08/2026 · 3,58 € / paquet'
    },
    {
      category:'Nourriture',
      label:'Nescafé Espresso Intenso soluble',
      quantity:'2 boîtes sur 5',
      amount:11.84,
      currency:'EUR',
      note:'Commande Amazon du 04/08/2026 · 5,92 € / boîte'
    },
    {
      category:'Équipement',
      label:'Casquette running technique Sierre-Zinal 2026',
      quantity:'1 casquette sur 2',
      amount:45,
      currency:'CHF',
      note:'Prix boutique : 45 CHF pièce · montant débité en EUR et part des frais de port à réconcilier'
    }
  ];

  function euro(value){return Number(value||0).toLocaleString('fr-FR',{minimumFractionDigits:2,maximumFractionDigits:2})+' €';}
  function money(value,currency){
    if(currency==='CHF')return Number(value||0).toLocaleString('fr-FR',{minimumFractionDigits:2,maximumFractionDigits:2})+' CHF';
    return euro(value);
  }

  window.renderBudget=function renderBudget(){
    const variableTotal=(state.expenses||[]).reduce((sum,row)=>sum+(Number(row[1])||0),0);
    const fixedTotal=FIXED_TRIP_COSTS.reduce((sum,item)=>sum+item.amount,0);
    const prepEuroTotal=PRETRIP_PURCHASES.filter(item=>item.currency==='EUR').reduce((sum,item)=>sum+item.amount,0);
    const prepChfTotal=PRETRIP_PURCHASES.filter(item=>item.currency==='CHF').reduce((sum,item)=>sum+item.amount,0);
    const grandTotal=fixedTotal+prepEuroTotal+variableTotal;

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

    const prepRows=PRETRIP_PURCHASES.map(item=>`<tr><td>${esc(item.category)}</td><td><b>${esc(item.label)}</b><br><span class="muted">${esc(item.quantity)}</span></td><td>${money(item.amount,item.currency)}</td><td>${esc(item.note)}</td></tr>`).join('');

    byId('app').innerHTML=`
      <div class="grid">
        <div class="card kpi"><span class="muted">Coûts fixes déjà payés</span><br><strong>${euro(fixedTotal)}</strong><br><span>Roadsurfer inclus</span></div>
        <div class="card kpi"><span class="muted">Achats préparation confirmés</span><br><strong>${euro(prepEuroTotal)}</strong>${prepChfTotal?`<br><strong>+ ${money(prepChfTotal,'CHF')}</strong>`:''}<br><span>Uniquement la part affectée aux Lofoten</span></div>
        <div class="card kpi"><span class="muted">Dépenses voyage enregistrées</span><br><strong>${euro(variableTotal)}</strong><br><span>Carburant, campings, courses, péages…</span></div>
        <div class="card kpi"><span class="muted">Budget dépensé / engagé</span><br><strong>${euro(grandTotal)}</strong>${prepChfTotal?`<br><strong>+ ${money(prepChfTotal,'CHF')}</strong>`:''}<br><span>Sans convertir arbitrairement les CHF</span></div>
      </div>
      ${fixedHtml}
      <section class="card" style="margin-top:12px">
        <p class="eyebrow">ACHATS AVANT DÉPART · CONFIRMÉS</p><h2>Préparation du voyage</h2>
        <div class="table-wrap"><table><thead><tr><th>Catégorie</th><th>Article / quantité voyage</th><th>Montant affecté</th><th>Note</th></tr></thead><tbody>${prepRows}</tbody></table></div>
        <p class="muted" style="margin-top:10px">Climbing District est explicitement exclu. Pour la casquette Sierre-Zinal, le budget conserve le prix d’achat de 45 CHF tant que le montant réellement débité en euros et la part des frais de port ne sont pas disponibles.</p>
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
