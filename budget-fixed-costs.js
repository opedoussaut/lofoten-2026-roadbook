'use strict';

// V119 — budget réel uniquement. Les dépenses sont saisies principalement par conversation
// et synchronisées dans state.expenses / expenses/expenses.json.
(function enhanceBudget(){
  const EXPENSE_CATEGORIES=['Carburant','Camping / nuit','Courses / alimentation','Restaurant / café','Péage / pont / tunnel','Parking','Services camping-car','Activité / visite','Kayak','Transport','Paddy','Autre'];
  function euro(v){return Number(v||0).toLocaleString('fr-FR',{minimumFractionDigits:2,maximumFractionDigits:2})+' €';}
  function dateFr(v){if(!v)return '—';const p=String(v).split('-');return p.length===3?`${p[2]}/${p[1]}/${p[0]}`:v;}
  function normalizedCategory(v){const s=String(v||'Autre');return EXPENSE_CATEGORIES.includes(s)?s:'Autre';}

  window.renderBudget=function renderBudget(){
    const expenses=(state.expenses||[]).slice().sort((a,b)=>String(b?.[4]||'').localeCompare(String(a?.[4]||''));
    const total=expenses.reduce((s,r)=>s+(Number(r?.[1])||0),0);
    const byCategory={};
    expenses.forEach(r=>{const c=normalizedCategory(r?.[0]);byCategory[c]=(byCategory[c]||0)+(Number(r?.[1])||0);});
    const categories=Object.entries(byCategory).sort((a,b)=>b[1]-a[1]);
    const firstDate=expenses.length?expenses.reduce((m,r)=>!m||String(r[4])<m?String(r[4]):m,''):'';
    const lastDate=expenses.length?expenses.reduce((m,r)=>!m||String(r[4])>m?String(r[4]):m,''):'';
    const days=firstDate&&lastDate?Math.max(1,Math.round((new Date(lastDate)-new Date(firstDate))/86400000)+1):0;
    const avg=days?total/days:0;
    const categoryCards=categories.map(([c,a])=>`<div class="card kpi"><span class="muted">${esc(c)}</span><br><strong>${euro(a)}</strong><br><span>${total?Math.round(a/total*100):0}% du total</span></div>`).join('');
    const rows=expenses.map(r=>`<tr><td><b>${dateFr(r?.[4])}</b></td><td>${esc(r?.[0]||'')}</td><td><b>${euro(r?.[1])}</b></td><td>${esc(r?.[2]||'—')}</td><td>${esc(r?.[3]||'')}</td></tr>`).join('');

    byId('app').innerHTML=`
      <section class="card" style="border-left:5px solid #153047"><p class="eyebrow">BUDGET RÉEL · LOFOTEN 2026</p><h2 style="margin-bottom:4px">💳 Ce que le voyage a réellement coûté jusqu’ici</h2><p class="muted">Aucun budget prévisionnel : uniquement les dépenses réellement engagées et enregistrées pendant le séjour.</p><div class="expense-total" style="font-size:2.4rem;margin-top:12px">${euro(total)}</div><p><b>${expenses.length}</b> dépense${expenses.length>1?'s':''} enregistrée${expenses.length>1?'s':''}${days?` · ${days} jour${days>1?'s':''} suivi${days>1?'s':''} · moyenne ${euro(avg)}/jour`:''}</p></section>
      <section style="margin-top:12px"><div class="grid">${categoryCards||'<div class="card"><p>Aucune dépense enregistrée.</p></div>'}</div></section>
      <section class="card" style="margin-top:12px"><p class="eyebrow">HISTORIQUE COMPLET</p><h2>Dépenses engagées</h2><p class="muted">Les montants en devise d’origine, tickets, précisions ou conversions sont conservés dans le détail lorsque l’information est disponible.</p><div class="table-wrap"><table><thead><tr><th>Date</th><th>Catégorie</th><th>Montant</th><th>Lieu</th><th>Détail</th></tr></thead><tbody>${rows}</tbody></table></div></section>
      <section class="card" style="margin-top:12px;background:rgba(21,48,71,.06)"><h3 style="margin-top:0">🎙️ Saisie pendant le voyage</h3><p style="margin-bottom:0">Cette page est pensée comme un tableau de bord de consultation. Les nouvelles dépenses peuvent être dictées dans la conversation puis ajoutées au roadbook et synchronisées avec GitHub, sans ressaisie manuelle dans cette page.</p></section>`;
  };
})();
