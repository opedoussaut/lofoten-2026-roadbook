'use strict';

// V108 — bad weather field guide for Lofoten.
// Informational only: this module never mutates the authoritative itinerary.
(function installBadWeather(){
  if(typeof tabs === 'undefined' || typeof show !== 'function') return;

  const TAB_ID='badweather';
  if(!tabs.some(([id])=>id===TAB_ID)){
    const hikesIndex=tabs.findIndex(([id])=>id==='hikes');
    tabs.splice(hikesIndex>=0?hikesIndex+1:2,0,[TAB_ID,'Mauvais temps']);
  }

  const OPTIONS={
    rain:[
      {type:'🥾 Balade basse',title:'Haukland → Uttakleiv par l’ancienne route côtière',area:'Vestvågøy',paddy:'✅ Très bon choix avec Paddy',text:'Quasi au niveau de la mer, sans crête. Excellent remplacement d’une randonnée de sommet sous pluie légère à modérée si le vent reste raisonnable. Faire demi-tour si embruns, vagues ou rafales rendent la côte inconfortable.',maps:'https://www.google.com/maps/search/?api=1&query=Haukland+Beach+Lofoten',source:'https://visitlofoten.com/en/topic/beaches-in-lofoten/haukland-beach/'},
      {type:'🥾 Micro-balade',title:'Linken à Svolvær',area:'Svolvær',paddy:'✅ Oui en laisse',text:'Courte sortie d’environ une heure déjà présente dans le roadbook. À garder pour pluie faible et visibilité acceptable, pas pour pluie torrentielle ou terrain saturé.',maps:'https://www.google.com/maps/search/?api=1&query=Linken+Svolvaer+Norway',source:'https://visitlofoten.com/en/guide/linken-in-svolvaer-105-m/'},
      {type:'🌊 Côte + artisanat',title:'Vikten + Glasshytta',area:'Flakstadøya',paddy:'✅ Balade extérieure possible',text:'Voir le travail du verre puis faire seulement une petite promenade côtière si les conditions restent calmes. Éviter les montées vers Hustinden/Tverrfjellet sur terrain détrempé.',maps:'https://www.google.com/maps/search/?api=1&query=Glasshytta+Vikten+Lofoten',source:'https://visitlofoten.com/en/activity/gallery/glasshytta-pa-vikten/'},
      {type:'📷 Roadtrip photo',title:'Ramberg → Flakstad → Hamnøy → Reine',area:'Flakstad / Moskenesøy',paddy:'✅ Arrêts très courts',text:'La pluie peut donner des ambiances spectaculaires : nuages bas, cabanes rouges, plages et reflets. Faire une journée de petits arrêts plutôt qu’une randonnée engagée.'}
    ],
    heavy:[
      {type:'🏛️ Musée',title:'Lofotr Viking Museum',area:'Borg · Vestvågøy',paddy:'⚠️ Vérifier la politique animaux avant la visite',text:'Excellent plan de vraie pluie. Du 16 août au 15 septembre 2026 : ouvert tous les jours 10:00–17:00. Tarif adulte 2026 indiqué par le musée : 265 NOK sur cette période.',maps:'https://www.google.com/maps/search/?api=1&query=Lofotr+Viking+Museum',source:'https://www.lofotr.no/finn-oss/'},
      {type:'🐟 Musée + aquarium + art',title:'SKREI · Kabelvåg',area:'Storvågan · Kabelvåg',paddy:'⚠️ Prévoir une solution pour Paddy / vérifier sur place',text:'Le meilleur “gros plan B” culturel : le nouvel Otolith, Lofoten Aquarium, Lofoten Museum et Gallery Espolin réunis dans le même secteur. En 2026, le site officiel annonce l’ensemble ouvert tous les jours de mai à octobre, 10:00–18:00. Billet combiné adulte : 375 NOK.',maps:'https://www.google.com/maps/search/?api=1&query=SKREI+Museum+Kabelvag+Norway',source:'https://www.museumnord.no/en/our-venues/skrei/'},
      {type:'🔥 Artisanat',title:'Glasshytta på Vikten',area:'Vikten · Flakstadøya',paddy:'⚠️ Extérieur facile ; intérieur à vérifier',text:'Atelier de soufflage de verre historique avec boutique et café. Très adapté à une journée humide, puis courte sortie mer uniquement si le vent est gérable.',maps:'https://www.google.com/maps/search/?api=1&query=Glasshytta+Vikten+Lofoten',source:'https://visitlofoten.com/en/activity/gallery/glasshytta-pa-vikten/'},
      {type:'🎨 Villages + galeries',title:'Henningsvær sous la pluie',area:'Austvågøy',paddy:'✅ Très simple en extérieur',text:'Transformer la journée en promenade urbaine : port, galeries, cafés, boutiques et photos de rue. Beaucoup plus rationnel que forcer Festvågtinden sur roche mouillée.',maps:'https://www.google.com/maps/search/?api=1&query=Henningsvaer+Norway',source:'https://visitlofoten.com/en/10-things-to-do-in-lofoten-on-rainy-days/'}
    ],
    storm:[
      {type:'🛑 Priorité sécurité',title:'Pas de sommet',area:'Toutes les îles',paddy:'✅ Sorties hygiène très courtes seulement',text:'Pluie forte + vent fort + nuages bas : supprimer Reinebringen, Måtinden, Ryten, Festvågtinden, Mannen, Hoven et Holandsmælen. La visibilité, l’adhérence et l’exposition deviennent les facteurs dominants.'},
      {type:'🏛️ Refuge journée',title:'SKREI ou Lofotr',area:'Kabelvåg / Borg',paddy:'⚠️ Organisation à prévoir',text:'Choisir l’option intérieure la plus proche plutôt que multiplier les kilomètres. SKREI permet facilement plusieurs heures au même endroit ; Lofotr constitue une autre excellente demi-journée.'},
      {type:'🚐 Camping-car',title:'Trouver un emplacement abrité',area:'Selon votre position',paddy:'✅ Avec vous',text:'Éviter les parkings directement exposés à l’océan ou aux rafales latérales. Vérifier la direction du vent, stationner légalement dans une zone plus protégée et profiter du mauvais temps comme vraie journée de récupération.'},
      {type:'❌ À annuler',title:'Kayak · parapente · drone',area:'Conditions ventées',paddy:'—',text:'Sous mauvais temps sévère, ne pas chercher à “sauver” ces activités. Pour le kayak, la mer et le vent comptent davantage que la pluie seule ; pour parapente et drone, les rafales et la visibilité rendent la décision évidente.'}
    ]
  };

  function bwEsc(v){return typeof esc==='function'?esc(v):String(v??'')}
  function bwLink(url,label){return url?`<a class="btn" href="${url}" target="_blank" rel="noopener">${bwEsc(label)} ↗</a>`:''}
  function card(o){return `<article class="card" style="margin-top:10px">
    <p class="eyebrow">${bwEsc(o.type)} · ${bwEsc(o.area)}</p>
    <h3 style="margin:4px 0 7px">${bwEsc(o.title)}</h3>
    <p>${bwEsc(o.text)}</p>
    <p class="muted"><strong>Paddy :</strong> ${bwEsc(o.paddy||'À évaluer')}</p>
    <div>${bwLink(o.maps,'Maps')} ${bwLink(o.source,'Source')}</div>
  </article>`}

  function renderBadWeather(mode='rain'){
    const app=typeof byId==='function'?byId('app'):document.getElementById('app'); if(!app)return;
    const labels={rain:['🌦️ Pluie','Pluie faible/modérée · vent gérable'],heavy:['🌧️ Forte pluie','Pluie soutenue · privilégier bas/indoor'],storm:['💨 Tempête','Pluie + vent fort / visibilité mauvaise']};
    app.innerHTML=`<section class="card">
      <p class="eyebrow">PLAN B MÉTÉO · V108</p>
      <h2 style="margin:4px 0 8px">🌧️ Mauvais temps : randonnées & alternatives</h2>
      <p style="max-width:920px">Le but n’est pas de perdre une journée : <strong>on change le type de journée</strong>. Choisissez le niveau de météo ci-dessous. Ce guide est volontairement conservateur pour les sommets exposés des Lofoten.</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px">
        ${Object.entries(labels).map(([id,l])=>`<button type="button" data-bw-mode="${id}" class="${id===mode?'primary':''}">${l[0]}</button>`).join('')}
      </div>
      <div style="margin-top:12px;padding:12px 14px;border-radius:12px;background:rgba(21,48,71,.08)"><strong>${labels[mode][0]} :</strong> ${labels[mode][1]}</div>
    </section>
    <section style="margin-top:12px">${OPTIONS[mode].map(card).join('')}</section>
    <section class="card" style="margin-top:12px;border-top:4px solid #876c3d">
      <h3 style="margin:2px 0 6px">⚠️ Règle simple pour vos grandes randonnées</h3>
      <p style="margin-bottom:0"><strong>Reinebringen, Måtinden, Ryten, Festvågtinden, Mannen et les crêtes ne sont pas des objectifs à “cocher” sous forte pluie.</strong> Gardez-les pour une fenêtre météo correcte. Haukland–Uttakleiv et les visites culturelles existent précisément pour protéger les journées de voyage sans prendre de risque inutile.</p>
    </section>`;
    document.querySelectorAll('[data-bw-mode]').forEach(btn=>btn.onclick=()=>renderBadWeather(btn.dataset.bwMode));
  }

  const previousShow=show;
  show=function(id){
    if(id!==TAB_ID)return previousShow(id);
    active=id;
    document.querySelectorAll('#nav button').forEach(button=>button.classList.toggle('active',button.dataset.tab===id));
    renderBadWeather('rain');
  };
})();