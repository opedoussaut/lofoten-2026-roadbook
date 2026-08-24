'use strict';
(function installVanOfficialTutorialV117(){
  const TUTORIAL='https://tutorial.roadsurfer.com/fr/cozy-cottage/pdf-preview';
  const EXACT_HELP='https://rent-help.roadsurfer.com/hc/fr-fr/sections/15863265716627-Cozy-Cottage-Knaus-VAN-TI-PLUS-';
  const EXACT_VIDEO='https://youtu.be/obZbZCGYPIA?si=H92gIENiauSaWXBr&t=3';

  const EXACT_STEPS=[
    ['💧','Remplir l’eau','PDF p. 6','ServiceBox côté conducteur. Ouvrir avec la clé, puis remplir par le bouchon bleu. Capacité du réservoir : 100 L.'],
    ['❄️','Vanne antigel','PDF p. 9','Pour que l’eau fonctionne, le levier bleu doit être dans la position montrée et le bouton bleu enfoncé. Si l’eau coule sous le véhicule au remplissage, vérifier cette vanne et les vidanges.'],
    ['🛑','Frein à main + fenêtres','PDF p. 13','Le levier de frein à main peut retomber même serré. Pour le desserrer : remonter sous tension, appuyer sur le bouton puis abaisser. Ne jamais ouvrir les fenêtres au-delà de 90°.'],
    ['🚰','Pompe à eau / niveau','PDF p. 17','Les deux variantes d’écran Knaus sont montrées. Vérifier le niveau d’eau puis activer la pompe avec le symbole robinet. Une fois votre écran identifié, ignorer l’autre.'],
    ['🔥','Gaz + plaque de cuisson','PDF p. 23','Ouvrir la bouteille, enfoncer la sécurité noire sur le tuyau, ouvrir le robinet « casserole » dans le tiroir cuisine, puis allumer le brûleur.'],
    ['🚿','Vidange eau propre + eaux grises','PDF p. 33','Les deux leviers de vidange sont dans la ServiceBox. Vérifier qu’ils sont bien fermés avant de remplir ou d’utiliser l’eau.'],
    ['♨️','Eau chaude / douche','PDF p. 42','Ouvrir le gaz, mettre le levier gris « chaudière » sous l’évier en position verticale, pompe à eau active, remplir le chauffe-eau en faisant couler brièvement l’eau chaude puis lancer le Truma. Environ 20 min.'],
    ['🖥️','Panneaux de commande','PDF p. 67','Au-dessus de la porte : niveau batterie, eau propre, eaux usées, pompe à eau et interrupteur principal. L’écran Truma commande chauffage, ventilation et chauffe-eau.'],
    ['💡','Marchepied + lumière extérieure','PDF p. 92','Commande du marchepied à côté de la porte cellule. Lumière extérieure au-dessus de la porte, avec interrupteur I / II / 0 selon le mode.']
  ];

  const SHARED_STEPS=[
    ['⛽','Diesel + AdBlue','PDF p. 3–4','Les deux sont à rendre pleins. Les bouchons se trouvent sous le cache côté porte conducteur.'],
    ['🔌','Branchement 230 V','PDF p. 11','Prise extérieure côté conducteur. Le câble de 20 m et l’adaptateur font partie de l’équipement.'],
    ['❄️','Réfrigérateur','PDF p. 14–15','Utiliser le mode Auto. Le tutoriel indique gaz à l’arrêt, batterie en roulant et 230 V lorsqu’il est branché.']
  ];

  function applyOfficialFacts(){
    try{
      if(typeof state!=='undefined'){
        state.vehicleProfile=state.vehicleProfile||{};
        Object.assign(state.vehicleProfile,{
          tutorialModel:'KNAUS VAN TI PLUS',
          tutorialVariant:'Knaus Van TI Plus 650 MEG Platinum Selection',
          freshWater:'100 L',
          wasteWater:'73 L',
          maxWeight:'PTAC de référence 3 500 kg — carte grise F.2 prioritaire'
        });
        if(typeof save==='function')save();
      }
    }catch{}
  }

  function correctVisibleFacts(app){
    app.querySelectorAll('dt').forEach(dt=>{
      const dd=dt.nextElementSibling;if(!dd)return;
      const t=(dt.textContent||'').trim();
      if(t==='Eau propre')dd.textContent='100 L';
      if(t==='Eaux grises')dd.textContent='73 L';
      if(t==='PTAC')dd.textContent='3 500 kg de référence · carte grise F.2 prioritaire';
    });
  }

  function stepCard([icon,title,page,text]){
    return `<section class="card" style="margin:0;padding:12px"><div style="display:flex;gap:10px;align-items:flex-start"><span style="font-size:1.35rem">${icon}</span><div><b>${title}</b><div><small class="muted">${page}</small></div><p style="margin:6px 0 0">${text}</p></div></div></section>`;
  }

  function tutorialBlock(){
    return `<section class="card" data-van-official-tutorial-v117 style="border:2px solid #0f766e;margin-bottom:12px;background:linear-gradient(180deg,#ecfdf5 0%,#ffffff 40%)">
      <p class="eyebrow">TUTORIEL FILTRÉ · NOTRE CAMPING-CAR UNIQUEMENT</p>
      <div class="map-heading"><div><h2 style="margin-bottom:4px">🚐 KNAUS VAN TI PLUS</h2><p style="margin:0"><b>Bloc à suivre dans le PDF :</b> « Knaus - Van TI Plus 650 MEG Platinum Selection »</p></div><span class="van-badge">WI RS 4849</span></div>

      <div class="popup-warning" style="margin:12px 0"><b>À ignorer dans le PDF :</b> Bürstner Lyseo 690G, Knaus Van TI 650 MEG, Knaus Van TI 640 MEG Vansation et Knaus Van TI Fiat 650 MEG Vansation. Roadsurfer classe actuellement le Cozy Cottage sous <b>Knaus VAN TI PLUS</b>; ce sont donc les blocs VAN TI PLUS qu’il faut suivre.</div>

      <div class="toolbar" style="margin:12px 0">
        <a class="btn primary" href="${EXACT_VIDEO}" target="_blank" rel="noopener">▶️ Vidéo Roadsurfer · Knaus VAN TI PLUS ↗</a>
        <a class="btn" href="${EXACT_HELP}" target="_blank" rel="noopener">🆘 Aide Knaus VAN TI PLUS ↗</a>
        <a class="btn" href="${TUTORIAL}" target="_blank" rel="noopener">📘 PDF complet 103 pages ↗</a>
      </div>

      <h3 style="margin-top:16px">Les pages vraiment utiles pour notre VAN TI PLUS</h3>
      <div class="spec-grid" style="margin-top:10px">${EXACT_STEPS.map(stepCard).join('')}</div>

      <details style="margin-top:12px">
        <summary><b>➕ Instructions communes au Cozy Cottage qui restent utiles</b></summary>
        <div class="spec-grid" style="margin-top:10px">${SHARED_STEPS.map(stepCard).join('')}</div>
      </details>

      <details style="margin-top:10px">
        <summary><b>🖥️ Pourquoi il y a encore deux écrans dans certaines pages ?</b></summary>
        <p>Roadsurfer précise lui-même que le Cozy Cottage Knaus existe avec deux écrans de commande différents. Le PDF montre donc les deux. Il suffit d’identifier celui installé dans WI RS 4849 puis de ne regarder que cette illustration pour la pompe à eau et les niveaux.</p>
      </details>

      <p class="muted" style="margin-top:12px">Le PDF complet reste disponible seulement comme référence secondaire. Pour le voyage, cette fiche filtrée doit être le point d’entrée.</p>
    </section>`;
  }

  function decorate(){
    const app=document.getElementById('app');
    if(!app)return;
    const text=app.textContent||'';
    if(!text.includes('FICHE CAMPING-CAR')&&!text.includes('Cozy Cottage · WI RS 4849')&&!text.includes('Niveaux pendant le voyage'))return;
    applyOfficialFacts();
    correctVisibleFacts(app);
    if(app.querySelector('[data-van-official-tutorial-v117]'))return;
    app.insertAdjacentHTML('afterbegin',tutorialBlock());
    correctVisibleFacts(app);
  }

  applyOfficialFacts();
  new MutationObserver(decorate).observe(document.documentElement,{childList:true,subtree:true});
  setTimeout(decorate,0);
})();
