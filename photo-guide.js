'use strict';

(function installPhotoGuide(){
  if(typeof tabs!=='undefined'&&!tabs.some(([id])=>id==='photos')){
    const mapIndex=tabs.findIndex(([id])=>id==='map');
    tabs.splice(mapIndex>=0?mapIndex:3,0,['photos','Photos']);
  }

  const itinerary=[
    {name:'Moskenes',lat:67.9006,lon:13.0460},
    {name:'Å',lat:67.8805,lon:12.9822},
    {name:'Reine',lat:67.9324,lon:13.0890},
    {name:'Hamnøy',lat:67.9464,lon:13.1337},
    {name:'Flakstad',lat:68.1038,lon:13.3031},
    {name:'Hauklandstranda',lat:68.1984,lon:13.5280},
    {name:'Henningsvær',lat:68.1515,lon:14.2018},
    {name:'Narvik',lat:68.4385,lon:17.4272}
  ];

  const must=[
    {name:'Å i Lofoten',lat:67.8805,lon:12.9822,note:'Village final de la E10, cabanes rouges et ambiance de bout du monde.'},
    {name:'Reine',lat:67.9324,lon:13.0890,note:'Un des villages iconiques des Lofoten.'},
    {name:'Hamnøy',lat:67.9464,lon:13.1337,note:'Rorbuer rouges et montagnes, incontournable photo et visite.'},
    {name:'Haukland Beach',lat:68.1984,lon:13.5280,note:'Plage spectaculaire, belle lumière en fin de journée.'},
    {name:'Henningsvær',lat:68.1515,lon:14.2018,note:'Village de pêcheurs et port très photogénique.'},
    {name:'Svolvær',lat:68.2343,lon:14.5686,note:'Capitale pratique des Lofoten et passage obligé à l’est.'}
  ];

  const optional=[
    {name:'Moskenes',lat:67.9006,lon:13.0460},
    {name:'Nusfjord',lat:68.0346,lon:13.3483},
    {name:'Vikten',lat:68.1298,lon:13.2938},
    {name:'Eggum',lat:68.3098,lon:13.6529},
    {name:'Unstad',lat:68.2684,lon:13.5757},
    {name:'Borg / Lofotr',lat:68.2077,lon:13.7364},
    {name:'Gimsøy / Hov',lat:68.3408,lon:14.1152},
    {name:'Laukvika',lat:68.3837,lon:14.4893},
    {name:'Austnesfjorden',lat:68.2775,lon:14.4897},
    {name:'Kabelvåg',lat:68.2100,lon:14.4777},
    {name:'Fiskebøl',lat:68.4265,lon:14.8086}
  ];

  const photos=[
    {name:'Å — rorbuer & bout de la E10',lat:67.8798,lon:12.9816,best:'soir / lumière douce'},
    {name:'Reine — vue village & Olstinden',lat:67.9329,lon:13.0894,best:'matin ou blue hour'},
    {name:'Sakrisøy — rorbuer jaunes',lat:67.9417,lon:13.1129,best:'matin calme'},
    {name:'Hamnøy Bridge — vue classique',lat:67.9468,lon:13.1327,best:'lever du jour / blue hour'},
    {name:'Fredvang Bridges',lat:68.0708,lon:13.1730,best:'soir / ciel dramatique'},
    {name:'Kvalvika viewpoint',lat:68.0877,lon:13.1188,best:'fin de journée'},
    {name:'Skagsanden Beach',lat:68.0894,lon:13.2386,best:'coucher du soleil / poses longues'},
    {name:'Flakstad Beach',lat:68.1033,lon:13.3009,best:'soir / vagues'},
    {name:'Vikten coastal viewpoint',lat:68.1300,lon:13.2974,best:'coucher du soleil'},
    {name:'Uttakleiv Beach — Dragon’s Eye',lat:68.2093,lon:13.5033,best:'marée basse / coucher du soleil'},
    {name:'Haukland Beach',lat:68.1984,lon:13.5280,best:'soir / lumière rasante'},
    {name:'Unstad Beach',lat:68.2683,lon:13.5755,best:'soir / surf'},
    {name:'Eggum coastal view',lat:68.3099,lon:13.6530,best:'soir / soleil de minuit hors saison'},
    {name:'Borg / Vestvågøy countryside',lat:68.2078,lon:13.7365,best:'lumière dorée'},
    {name:'Hov / Gimsøy beach',lat:68.3408,lon:14.1152,best:'coucher du soleil'},
    {name:'Henningsvær — harbour viewpoint',lat:68.1515,lon:14.2018,best:'matin / soir'},
    {name:'Henningsvær football field viewpoint',lat:68.1541,lon:14.2028,best:'drone si réglementation et vent permettent'},
    {name:'Austnesfjorden viewpoint',lat:68.2775,lon:14.4897,best:'matin / météo claire'},
    {name:'Svolvær harbour / Lamholmen',lat:68.2343,lon:14.5686,best:'blue hour'}
  ];

  const gmaps=p=>`https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lon}`;
  const iconHtml=(symbol,bg)=>L.divIcon({className:'photo-map-icon',html:`<div style="width:30px;height:30px;border-radius:50%;background:${bg};border:2px solid white;box-shadow:0 2px 8px #0007;display:flex;align-items:center;justify-content:center;font-size:16px">${symbol}</div>`,iconSize:[30,30],iconAnchor:[15,15]});

  function ensureLeaflet(){
    if(window.L)return Promise.resolve();
    if(window.__photoLeafletPromise)return window.__photoLeafletPromise;
    window.__photoLeafletPromise=new Promise((resolve,reject)=>{
      if(!document.querySelector('link[data-photo-leaflet]')){
        const css=document.createElement('link');css.rel='stylesheet';css.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';css.dataset.photoLeaflet='1';document.head.appendChild(css);
      }
      const s=document.createElement('script');s.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';s.onload=resolve;s.onerror=reject;document.head.appendChild(s);
    });
    return window.__photoLeafletPromise;
  }

  async function drawPhotoMap(){
    await ensureLeaflet();
    const holder=document.getElementById('photo-map');if(!holder)return;
    if(window.__lofotenPhotoMap){try{window.__lofotenPhotoMap.remove();}catch{}}
    const map=window.__lofotenPhotoMap=L.map('photo-map',{preferCanvas:true}).setView([68.15,13.75],8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© OpenStreetMap'}).addTo(map);
    const groups={photo:L.layerGroup().addTo(map),must:L.layerGroup().addTo(map),optional:L.layerGroup().addTo(map),route:L.layerGroup().addTo(map)};
    const routePoints=itinerary.map(p=>[p.lat,p.lon]);
    L.polyline(routePoints,{weight:4,opacity:.85}).addTo(groups.route);
    itinerary.forEach((p,i)=>L.circleMarker([p.lat,p.lon],{radius:5,weight:2,fillOpacity:1}).bindTooltip(`${i+1}. ${p.name}`).addTo(groups.route));
    must.forEach(p=>L.marker([p.lat,p.lon],{icon:iconHtml('●','#dc2626')}).bindPopup(`<b>${p.name}</b><br>${p.note||''}<br><a href="${gmaps(p)}" target="_blank" rel="noopener">Ouvrir dans Google Maps ↗</a>`).addTo(groups.must));
    optional.forEach(p=>L.marker([p.lat,p.lon],{icon:iconHtml('●','#eab308')}).bindPopup(`<b>${p.name}</b><br>Optionnel<br><a href="${gmaps(p)}" target="_blank" rel="noopener">Ouvrir dans Google Maps ↗</a>`).addTo(groups.optional));
    photos.forEach(p=>L.marker([p.lat,p.lon],{icon:iconHtml('📷','#0ea5e9')}).bindPopup(`<b>${p.name}</b><br>📷 ${p.best}<br><a href="${gmaps(p)}" target="_blank" rel="noopener">Ouvrir dans Google Maps ↗</a>`).addTo(groups.photo));
    L.control.layers(null,{'📷 Spots photo':groups.photo,'🔴 Incontournables':groups.must,'🟡 Optionnels':groups.optional,'🚐 Itinéraire':groups.route},{collapsed:false}).addTo(map);
    const bounds=L.latLngBounds([...routePoints,...photos.map(p=>[p.lat,p.lon])]);map.fitBounds(bounds,{padding:[20,20]});
  }

  function renderPhotos(){
    byId('app').innerHTML=`
      <section class="card">
        <p class="eyebrow">CARTE PHOTO · LOFOTEN</p>
        <h1>📷 Itinéraire Lofotens</h1>
        <p>Carte reconstruite à partir de tes captures : <b>📷 spots photo</b>, <b>🔴 lieux incontournables</b>, <b>🟡 lieux optionnels</b> et itinéraire de référence.</p>
        <div class="popup-warning"><b>Important :</b> les positions ont été identifiées visuellement à partir des captures. Les spots évidents sont précis; quelques marqueurs secondaires pourront être affinés si tu retrouves la carte source originale.</div>
        <div id="photo-map" class="map" style="height:68vh;min-height:520px;margin-top:12px"></div>
      </section>
      <section class="card" style="margin-top:12px"><h2>📷 Spots photo (${photos.length})</h2><div class="grid">${photos.map(p=>`<article class="card"><h3>${esc(p.name)}</h3><p>${esc(p.best)}</p><a class="btn" href="${gmaps(p)}" target="_blank" rel="noopener">Google Maps ↗</a></article>`).join('')}</div></section>`;
    setTimeout(()=>drawPhotoMap().catch(err=>{console.error(err);const el=byId('photo-map');if(el)el.innerHTML='<p class="status">Carte momentanément indisponible.</p>';}),0);
  }

  window.renderPhotos=renderPhotos;
  try{renderPhotos=window.renderPhotos;}catch{}

  if(typeof show==='function'){
    const previousShow=show;
    show=function(id){
      if(id!=='photos')return previousShow(id);
      active=id;
      document.querySelectorAll('#nav button').forEach(button=>button.classList.toggle('active',button.dataset.tab===id));
      renderPhotos();
    };
  }
})();