'use strict';

(function decorateSevenHourPlan(){
  let running=false;

  function isBis(){return typeof state!=='undefined'&&state.activeRoutePlan==='bis';}

  function secondFerryPanel(){
    const ferry=state?.itineraryBisMeta?.secondFerry;
    if(!ferry)return '';
    return `<section class="card second-ferry-panel" style="margin:12px 0;border:2px solid #2563eb">
      <p class="eyebrow">SECONDE TRAVERSÉE · PLAFOND 7 H</p>
      <h3>${esc(ferry.title)}</h3>
      <p><b>${esc(ferry.target)}</b></p>
      <div class="grid">
        <div><b>Réservation</b><p>${esc(ferry.checkIn)}</p><a class="btn primary" href="${esc(ferry.bookingUrl)}" target="_blank" rel="noopener">Horaires Color Line ↗</a></div>
        <div><b>Paddy</b><p>${esc(ferry.petRule)}</p></div>
        <div><b>Option recommandée</b><p>${esc(ferry.paddy)}</p></div>
      </div>
    </section>`;
  }

  function decorate(){
    if(running)return;
    running=true;
    try{
      document.querySelectorAll('[data-route-plan="bis"]').forEach(button=>button.textContent='Plan B · ferries · ≤ 7 h');
      if(!isBis())return;

      document.querySelectorAll('#app h1,#app h2,#app h3,#app p,#app span,#app b').forEach(node=>{
        if(node.children.length)return;
        const text=node.textContent||'';
        if(text.trim()==='Plan B · ferry Moskenes–Bodø')node.textContent='Plan B · ferries · maximum 7 h de conduite';
        if(text.trim()==='Ferry direct · aucun retour sur l’E10')node.textContent='Deux traversées courtes · aucune journée au-delà de 7 h';
      });

      document.querySelectorAll('#app .popup-warning').forEach(box=>{
        if((box.textContent||'').trim().startsWith('Comparaison:')||(box.textContent||'').trim().startsWith('Comparaison :')){
          box.innerHTML='<b>Comparaison :</b> le Plan B supprime le retour vers Narvik/Kiruna et redistribue le retour avec deux traversées courtes. La conduite planifiée reste comprise entre 2 h et 6 h 50 par jour; les pauses, attentes, météo et embouteillages s’ajoutent à ce temps de volant.';
        }
      });

      const topCard=[...document.querySelectorAll('#app > section.card')].find(card=>(card.textContent||'').includes('Trajet et nuits'));
      if(topCard&&!topCard.querySelector('.seven-hour-rule')){
        topCard.insertAdjacentHTML('beforeend','<div class="popup-warning seven-hour-rule" style="margin-top:12px"><b>Règle Plan B :</b> maximum 7 h de conduite pure par jour. Pour rendre cette limite possible tout en dormant à Chevreuse le 10 septembre, le plan utilise Moskenes–Bodø le 4 septembre et Larvik–Hirtshals le 8 septembre.</div>');
      }

      const stage8=[...document.querySelectorAll('#app article.card')].find(card=>{
        const eyebrow=card.querySelector('.eyebrow');
        return eyebrow&&(eyebrow.textContent||'').includes('08/09');
      });
      if(stage8&&!stage8.querySelector('.second-ferry-panel')){
        const preferred=[...stage8.querySelectorAll('p')].find(p=>(p.textContent||'').trim()==='NUIT PRÉFÉRÉE');
        if(preferred&&preferred.parentElement)preferred.parentElement.insertAdjacentHTML('beforebegin',secondFerryPanel());
        else stage8.insertAdjacentHTML('beforeend',secondFerryPanel());
      }
    }finally{running=false;}
  }

  function install(){
    decorate();
    const app=document.getElementById('app');
    if(app)new MutationObserver(()=>queueMicrotask(decorate)).observe(app,{childList:true,subtree:true});
    const nav=document.getElementById('nav');
    if(nav)new MutationObserver(()=>queueMicrotask(decorate)).observe(nav,{childList:true,subtree:true});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();