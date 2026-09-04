'use strict';
(function(){
  const DATA_URL='expenses-current.json';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const euro=n=>Number(n||0).toLocaleString('fr-FR',{minimumFractionDigits:2,maximumFractionDigits:2})+' €';
  const dateFr=v=>{const p=String(v||'').split('-');return p.length===3?`${p[2]}/${p[1]}/${p[0]}`:v||'—';};
  async function renderLiveBudget(){
    const app=document.getElementById('app');
    if(!app)return;
    try{
      const res=await fetch(DATA_URL+'?v=125',{cache:'no-store'});
      if(!res.ok)throw new Error('HTTP '+res.status);
      const payload=await res.json();
      const expenses=Array.isArray(payload.expenses)?payload.expenses:[];
      const total=expenses.reduce((s,r)=>s+(Number(r?.[1])||0),0);
      const byCat={};expenses.forEach(r=>{const c=r?.[0]||'Autre';byCat[c]=(byCat[c]||0)+(Number(r?.[1])||0);});
      const cards=Object.entries(byCat).sort((a,b)=>b[1]-a[1]).map(([c,a])=>`<div class="card kpi"><span class="muted">${esc(c)}</span><br><strong>${euro(a)}</strong><br><span>${total?Math.round(a/total*100):0}% du total</span></div>`).join('');
      const rows=[...expenses].sort((a,b)=>String(b?.[4]||'').localeCompare(String(a?.[4]||''))).map(r=>`<tr><td><b>${dateFr(r?.[4])}</b></td><td>${esc(r?.[0]||'')}</td><td><b>${euro(r?.[1])}</b></td><td>${esc(r?.[2]||'—')}</td><td>${esc(r?.[3]||'')}</td></tr>`).join('');
      app.innerHTML=`<div class="stack"><section class="card"><p class="eyebrow">BUDGET RÉEL · SOURCE ROADBOOK</p><h2>Total : ${euro(total)}</h2><p>${expenses.length} dépenses enregistrées. Cette vue charge la copie vérifiée stockée dans le même dépôt que le site, sans dépendance externe.</p></section><section class="grid">${cards}</section><section class="card"><div class="table-wrap"><table><thead><tr><th>Date</th><th>Catégorie</th><th>Montant</th><th>Lieu</th><th>Détail</th></tr></thead><tbody>${rows}</tbody></table></div></section></div>`;
    }catch(err){
      app.innerHTML=`<section class="card"><h2>Budget</h2><p>Impossible de charger la source de dépenses actualisée (${esc(err.message)}).</p></section>`;
    }
  }
  document.addEventListener('click',e=>{
    const b=e.target.closest('#nav button');
    if(b&&b.dataset.tab==='budget')setTimeout(renderLiveBudget,0);
  },true);
})();
