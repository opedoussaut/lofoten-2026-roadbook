'use strict';

// V106 — add another high-value Lofoten flying video and treat the creator
// as a recurring video resource rather than an isolated clip.
(function addLofotenCreatorSeries(){
  const VIDEO_ID='UF8pMoXnweI';
  const VIDEO_URL=`https://www.youtube.com/watch?v=${VIDEO_ID}`;

  if (typeof renderParagliding !== 'function') return;
  const previousRenderParagliding=renderParagliding;

  renderParagliding=function(){
    previousRenderParagliding();
    const app=typeof byId==='function'?byId('app'):document.getElementById('app');
    if(!app)return;

    const existing=app.querySelector(`[data-pg-video-id="${VIDEO_ID}"]`);
    if(existing)return;

    const heading=Array.from(app.querySelectorAll('h2')).find(h=>h.textContent.includes('Vidéos utiles Lofoten'));
    if(!heading)return;

    const introCard=heading.closest('section.card');
    if(!introCard)return;

    const wrap=document.createElement('section');
    wrap.className='card';
    wrap.style.marginTop='12px';
    wrap.dataset.pgVideoId=VIDEO_ID;
    wrap.innerHTML=`
      <p class="eyebrow">SÉRIE À EXPLORER</p>
      <h2>🎥 Un créateur à suivre pour les vols Lofoten</h2>
      <p>Cette vidéo est ajoutée comme <strong>point d’entrée vers une série de contenus de vol dans les Lofoten</strong>. L’intérêt est de pouvoir comparer plusieurs décollages, reliefs, orientations et ambiances météo publiés par le même pilote/créateur, plutôt que de s’appuyer sur un seul vol spectaculaire.</p>
      <div style="position:relative;width:100%;aspect-ratio:16/9;border-radius:12px;overflow:hidden;background:#000;margin:12px 0">
        <iframe src="https://www.youtube-nocookie.com/embed/${VIDEO_ID}" title="Lofoten flying video ${VIDEO_ID}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe>
      </div>
      <div class="toolbar">
        <a class="btn primary" href="${VIDEO_URL}" target="_blank" rel="noopener">▶️ Ouvrir la vidéo sur YouTube ↗</a>
        <a class="btn" href="https://www.youtube.com/results?search_query=Lofoten+paragliding+hike+fly" target="_blank" rel="noopener">🔎 Rechercher d’autres vols Lofoten ↗</a>
      </div>
      <p class="muted" style="margin-top:10px"><strong>Usage roadbook :</strong> ouvrir la vidéo sur YouTube puis le profil du créateur pour parcourir ses autres vols Lofoten. Les vidéos servent à la reconnaissance visuelle du terrain et des lignes de vol, jamais comme briefing de site actuel.</p>`;

    introCard.insertAdjacentElement('afterend',wrap);
  };
})();
