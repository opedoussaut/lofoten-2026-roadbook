'use strict';

// V113 — additional Lofoten paragliding / hike & fly video supplied for field reference.
(function addLofotenFlyingVideoV113(){
  const VIDEO_ID='OGcBiPr8-Sg';
  const VIDEO_URL='https://youtu.be/OGcBiPr8-Sg?si=OdrXrTcWRzrQKEWw';

  if(typeof renderParagliding!=='function')return;
  const previousRenderParagliding=renderParagliding;

  renderParagliding=function(){
    previousRenderParagliding();
    const app=typeof byId==='function'?byId('app'):document.getElementById('app');
    if(!app||app.querySelector(`[data-pg-video-id="${VIDEO_ID}"]`))return;

    const previousVideo=app.querySelector('[data-pg-video-id="UF8pMoXnweI"]');
    const heading=Array.from(app.querySelectorAll('h2')).find(h=>h.textContent.includes('Vidéos utiles Lofoten'));
    const anchor=previousVideo||heading?.closest('section.card');
    if(!anchor)return;

    const card=document.createElement('section');
    card.className='card';
    card.style.marginTop='12px';
    card.dataset.pgVideoId=VIDEO_ID;
    card.innerHTML=`
      <p class="eyebrow">VIDÉO LOFOTEN · À VOIR</p>
      <h2>🎥 Reconnaissance parapente / hike & fly</h2>
      <p>Nouvelle vidéo ajoutée à la bibliothèque parapente pour préparer les vols dans les Lofoten. À utiliser pour la <strong>reconnaissance visuelle du relief, des décollages, des lignes de vol et de l’environnement</strong>, en complément des ressources de sites et de la météo du jour.</p>
      <div style="position:relative;width:100%;aspect-ratio:16/9;border-radius:12px;overflow:hidden;background:#000;margin:12px 0">
        <iframe src="https://www.youtube-nocookie.com/embed/${VIDEO_ID}" title="Lofoten paragliding video ${VIDEO_ID}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe>
      </div>
      <div class="toolbar">
        <a class="btn primary" href="${VIDEO_URL}" target="_blank" rel="noopener">▶️ Voir sur YouTube ↗</a>
      </div>
      <p class="muted" style="margin-top:10px"><strong>Rappel sécurité :</strong> une vidéo n’est jamais un briefing de site. Vérifier le décollage, l’atterrissage, les restrictions, l’aérologie et les conditions réelles avant tout vol.</p>`;

    anchor.insertAdjacentElement('afterend',card);
  };
})();
