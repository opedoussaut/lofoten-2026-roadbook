'use strict';

// V94 — AllTrails-first enhancement for hike execution.
// This module is informational only and does NOT mutate itinerary dates/bases.

(function installAllTrailsFirstHikes(){
  if(typeof HIKE_V92==='undefined' || !Array.isArray(HIKE_V92)) return;

  const ALLTRAILS={
    matinden:{
      url:'https://www.alltrails.com/norway/nordland/bleik',
      label:'Måtinden from Bauktuva',
      verified:'Exact route is listed as the #1 Bleik trail on AllTrails; open it from this page.',
      metrics:'≈ 4.7 mi / 7.6 km · ≈ 1,719 ft / 524 m D+ · ≈ 3 h 09'
    },
    hoven:{
      url:'https://www.alltrails.com/trail/norway/nordland/hoven?u=i',
      label:'Gimsøy – Hoven',
      verified:'Direct AllTrails route.',
      metrics:'Map, elevation profile, reviews and conditions available in AllTrails.'
    },
    'haukland-uttakleiv':{
      url:'https://www.alltrails.com/poi/norway/nordland/leknes/uttakleivstranda',
      label:'Haukland – Uttakleiv',
      verified:'Exact trail is listed as #1 on the Uttakleiv AllTrails page.',
      metrics:'≈ 5.0 mi / 8.0 km · ≈ 718 ft / 219 m D+ · ≈ 2 h 10'
    },
    reinebringen:{
      url:'https://www.alltrails.com/trail/norway/nordland/reinebringen?u=i',
      label:'Reinebringen',
      verified:'Direct AllTrails route.',
      metrics:'Full route map, elevation profile, recent reviews and conditions.'
    },
    'ryten-kvalvika':{
      url:'https://www.alltrails.com/trail/norway/nordland/topptur-til-ryten?u=i',
      label:'Ryten / Kvalvika',
      verified:'Direct AllTrails route used for the Ryten/Kvalvika option.',
      metrics:'Route map, elevation profile and reviews available in AllTrails.'
    },
    festvagtinden:{
      url:'https://www.alltrails.com/trail/norway/nordland/festvagtinden',
      label:'Festvågtinden',
      verified:'Direct AllTrails route.',
      metrics:'≈ 1.5 mi / 2.4 km · ≈ 1,637 ft / 499 m D+ · out-and-back'
    },
    mannen:{
      url:'https://www.alltrails.com/poi/norway/nordland/leknes/hauklandstranda',
      label:'Mannen on Vestvågøy',
      verified:'Exact trail is the top AllTrails route from Haukland Beach.',
      metrics:'≈ 2.6 mi / 4.2 km · ≈ 1,204 ft / 367 m D+'
    },
    holandsmaelen:{
      url:'https://www.alltrails.com/trail/norway/nordland/holandsmelen?u=i',
      label:'Holandsmelen',
      verified:'Direct AllTrails route.',
      metrics:'≈ 3.5 mi / 5.6 km · ≈ 2 h 36 · hard on AllTrails'
    },
    linken:{
      url:'https://www.alltrails.com/norway/nordland/svolvaer/hiking',
      label:'Linken in Svolvær',
      verified:'Exact trail is listed in the Svolvær AllTrails hiking page.',
      metrics:'≈ 4.6 mi / 7.4 km · ≈ 1 h 53'
    }
  };

  HIKE_V92.forEach(h=>{ if(ALLTRAILS[h.key]) h.alltrails=ALLTRAILS[h.key]; });

  const E=v=>typeof esc==='function'?esc(v):String(v??'');
  const fixed=n=>Number(n).toFixed(6);
  const drive=p=>`https://www.google.com/maps/dir/?api=1&destination=${fixed(p.lat)},${fixed(p.lon)}&travelmode=driving`;
  const topo=p=>`https://www.opentopomap.org/#map=15/${fixed(p.lat)}/${fixed(p.lon)}`;
  const link=(url,label,primary=false)=>`<a class="btn ${primary?'primary':''}" href="${url}" target="_blank" rel="noopener">${label} ↗</a>`;

  window.renderHikes=function(){
    const app=byId('app'); if(!app)return;
    const cards=HIKE_V92.map(h=>{
      const at=h.alltrails;
      const gps=`${fixed(h.trailhead.lat)}, ${fixed(h.trailhead.lon)}`;
      return `<article class="card" style="margin-top:12px">
        <div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start;flex-wrap:wrap">
          <div><p class="eyebrow">${E(h.priority)} · ${E(h.planned)}</p><h2 style="margin:3px 0">🥾 ${E(h.title)}</h2><p class="muted">${E(h.area)} · ${E(h.why)}</p></div>
          <div><strong>${E(h.distance)}</strong><br><span class="muted">${E(h.duration)} · ${E(h.elevation)}</span></div>
        </div>
        <div class="grid" style="margin-top:10px">
          <div><p><b>Niveau :</b> ${E(h.difficulty)}</p><p><b>Exposition :</b> ${E(h.exposure)}</p><p><b>Paddy :</b> ${E(h.paddy)}</p></div>
          <div><p><b>Départ :</b> ${E(h.trailhead.name)}</p><p><b>Option la moins chère :</b> ${E(h.cheapest)}</p></div>
        </div>
        ${at?`<div style="padding:12px;border-radius:10px;background:rgba(35,140,80,.10);margin-top:10px"><b>🥾 AllTrails Premium</b><br>${E(at.label)} · ${E(at.metrics)}<br><span class="muted">${E(at.verified)}</span></div>`:''}
        <div style="padding:12px;border-radius:10px;background:rgba(21,48,71,.06);margin-top:10px"><b>🚐 Stationnement / accès RV</b><br>${E(h.parking)}</div>
        <p style="margin-top:10px"><b>Itinéraire terrain :</b> ${E(h.route)}</p><p><b>Décision météo :</b> ${E(h.conditions)}</p>
        <div class="toolbar" style="margin-top:10px">
          ${at?link(at.url,'🥾 AllTrails · carte / profil / trace',true):''}
          ${link(drive(h.trailhead),'🚐 Naviguer vers le départ',!at)}
          ${link(topo(h.trailhead),'⛰️ Carte topo')}
          <button class="btn copy-hike-gps" data-gps="${gps}">📋 Copier GPS · ${gps}</button>
        </div>
      </article>`;
    }).join('');

    app.innerHTML=`<section class="card"><p class="eyebrow">RANDONNÉES · ALLTRAILS FIRST · V94</p><h1>🥾 Randonnées</h1><p><b>AllTrails devient la source opérationnelle principale</b> lorsqu’un itinéraire exact est vérifié. Utilise ton compte Premium pour la carte détaillée, le profil d’altitude, les avis/conditions et les fonctions hors ligne disponibles dans ton compte. Les cartes topo du roadbook restent un contrôle secondaire.</p><div class="popup-warning"><b>Attention aux variantes :</b> pour Måtinden, Haukland–Uttakleiv, Mannen et Linken, le bouton ouvre actuellement la page AllTrails qui contient l’itinéraire exact lorsqu’une URL directe fiable n’a pas pu être confirmée. Le nom de l’itinéraire à sélectionner est affiché dans la fiche.</div></section>${cards}`;

    document.querySelectorAll('.copy-hike-gps').forEach(btn=>btn.onclick=async()=>{
      const text=btn.dataset.gps||'';
      try{await navigator.clipboard.writeText(text);const old=btn.textContent;btn.textContent='✅ GPS copié';setTimeout(()=>btn.textContent=old,1400)}
      catch{window.prompt('Copier les coordonnées GPS :',text)}
    });
  };

  try{renderHikes=window.renderHikes}catch{}
})();
