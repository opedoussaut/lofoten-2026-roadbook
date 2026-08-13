'use strict';
(function installV82Dashboard(){
  if(!window.V82)return;
  const base=window.renderDashboard,E=v=>typeof esc==='function'?esc(v):String(v??'');
  function renderDashboardV82(){if(typeof base==='function')base();const app=byId('app');if(!app)return;app.insertAdjacentHTML('afterbegin',`<section class="card" style="border-left:5px solid #2563eb;margin-bottom:12px"><p class="eyebrow">RETOUR CONFIRMÉ · V82</p><h2>Roadsurfer Champlan · 12 septembre à 16:00</h2><p>Le jour ajouté est utilisé pour lisser le retour, pas pour ajouter une journée sportive : Oslo → Ishøj/Copenhague → Osnabrück → Chevreuse → Champlan.</p><div class="grid" style="margin-top:10px">${card('Restitution','12/09 · 16:00','Champlan')}${card('Distance totale',`${totalKm().toLocaleString('fr-FR')} km`,'≈ +20 km vs ancien plan')}${card('Max retour sud','≈ 700 km/jour','ancien pic : 1 062 km')}${card('Dernière nuit','Maison · Chevreuse','11 septembre')}</div></section>`);}
  window.renderDashboard=renderDashboardV82;try{renderDashboard=renderDashboardV82}catch{}
})();