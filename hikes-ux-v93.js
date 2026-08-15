'use strict';

// V93 — presentation-only refinement for the Hikes tab.
// Keeps HIKE_V92 data and the synchronized itinerary untouched.
(function installHikeUxV93(){
  if(typeof HIKE_V92==='undefined') return;

  const esc93=v=>typeof esc==='function'?esc(v):String(v??'');
  const fixed93=n=>Number(n).toFixed(6);
  const googleDrive93=p=>`https://www.google.com/maps/dir/?api=1&destination=${fixed93(p.lat)},${fixed93(p.lon)}&travelmode=driving`;
  const topo93=p=>`https://www.opentopomap.org/#map=15/${fixed93(p.lat)}/${fixed93(p.lon)}`;
  const link93=(url,label,primary=false)=>`<a class="btn ${primary?'primary':''}" href="${url}" target="_blank" rel="noopener">${label} ↗</a>`;
  const coords93=p=>`${fixed93(p.lat)}, ${fixed93(p.lon)}`;

  function bindCopyGps(){
    document.querySelectorAll('[data-copy-gps]').forEach(button=>{
      button.onclick=async()=>{
        const value=button.dataset.copyGps||'';
        try{
          await navigator.clipboard.writeText(value);
          const previous=button.textContent;
          button.textContent='✅ GPS copié';
          setTimeout(()=>button.textContent=previous,1400);
        }catch{
          // Fallback for browsers/pages where Clipboard API is unavailable.
          const input=document.createElement('input');
          input.value=value;input.setAttribute('readonly','');
          input.style.position='fixed';input.style.opacity='0';
          document.body.appendChild(input);input.select();
          try{document.execCommand('copy');button.textContent='✅ GPS copié';setTimeout(()=>button.textContent='📋 Copier GPS',1400);}catch{}
          input.remove();
        }
      };
    });
  }

  window.renderHikes=function(){
    const app=byId('app'); if(!app)return;
    const cards=HIKE_V92.map(h=>{
      const gps=coords93(h.trailhead);
      return `<article class="card" data-hike-card="${esc93(h.key)}" style="margin-top:12px">
        <div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start;flex-wrap:wrap">
          <div><p class="eyebrow">${esc93(h.priority)} · ${esc93(h.planned)}</p><h2 style="margin:3px 0">🥾 ${esc93(h.title)}</h2><p class="muted">${esc93(h.area)} · ${esc93(h.why)}</p></div>
          <div><strong>${esc93(h.distance)}</strong><br><span class="muted">${esc93(h.duration)} · ${esc93(h.elevation)}</span></div>
        </div>
        <div class="grid" style="margin-top:10px">
          <div><p><b>Niveau :</b> ${esc93(h.difficulty)}</p><p><b>Exposition :</b> ${esc93(h.exposure)}</p><p><b>Paddy :</b> ${esc93(h.paddy)}</p></div>
          <div><p><b>Départ :</b> ${esc93(h.trailhead.name)}</p><p><b>Option la moins chère :</b> ${esc93(h.cheapest)}</p></div>
        </div>
        <div style="padding:12px;border-radius:10px;background:rgba(21,48,71,.06);margin-top:10px"><b>🚐 Stationnement / accès RV</b><br>${esc93(h.parking)}</div>
        <p style="margin-top:10px"><b>Itinéraire terrain :</b> ${esc93(h.route)}</p>
        <p><b>Décision météo :</b> ${esc93(h.conditions)}</p>
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:10px;padding:10px 12px;border-radius:10px;background:rgba(21,48,71,.04)">
          <span class="muted"><b>GPS départ</b></span>
          <code style="user-select:all;cursor:text;padding:4px 7px;border-radius:6px;background:rgba(21,48,71,.08)">${gps}</code>
          <button class="btn" type="button" data-copy-gps="${gps}">📋 Copier GPS</button>
        </div>
        <div class="toolbar" style="margin-top:10px">
          ${link93(googleDrive93(h.trailhead),'🚐 Naviguer vers le départ',true)}
          ${link93(topo93(h.trailhead),'⛰️ Carte topo')}
          ${link93(h.source,'🥾 Description / trace')}
        </div>
      </article>`;
    }).join('');

    app.innerHTML=`<section class="card"><p class="eyebrow">RANDONNÉES · GUIDE TERRAIN</p><h1>🥾 Randonnées</h1><p>Chaque fiche garde uniquement les actions utiles sur le terrain : <b>navigation jusqu’au départ</b>, <b>carte topographique</b>, <b>description/trace</b> et <b>coordonnées GPS copiables</b>. Aucun doublon de carte ou de navigation.</p><div class="popup-warning"><b>Règle parking :</b> privilégier marche ou vélo depuis la base dès que réaliste. Quand un tarif n’est pas confirmé, le roadbook indique de vérifier sur place plutôt que d’inventer un prix.</div></section>${cards}`;
    bindCopyGps();
  };

  // Replace only the Hikes route handler; all other tabs remain chained as before.
  if(typeof show==='function'){
    const previousShow=show;
    show=function(id){
      if(id!=='hikes') return previousShow(id);
      active=id;
      document.querySelectorAll('#nav button').forEach(button=>button.classList.toggle('active',button.dataset.tab===id));
      window.renderHikes();
    };
  }
})();
