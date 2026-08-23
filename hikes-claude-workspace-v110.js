'use strict';

// V111 — Claude synthetic hike overview pinned at the very top of the Hikes tab.
(function installClaudeHikeOverview(){
  const CLAUDE_URL='https://claude.ai/code/artifact/e6dcb80a-cc5d-41f5-a549-f96bde2c2f56';

  function overviewCard(){
    return `<section class="card" data-claude-hike-overview="v111" style="margin:0 0 14px;border:2px solid rgba(99,102,241,.5)">
      <p class="eyebrow">VUE SYNTHÉTIQUE · RANDONNÉES LOFOTEN</p>
      <h1 style="margin:3px 0">🗺️ Synthèse des randonnées Lofoten</h1>
      <p>Vue synthétique créée par <b>Claude</b> pour comparer rapidement nos randonnées Lofoten, leurs priorités <b>P0 / P1 / P2</b>, les tracés et les éléments utiles à la préparation.</p>
      <div class="toolbar" style="margin-top:10px">
        <a class="btn primary" href="${CLAUDE_URL}" target="_blank" rel="noopener">🤖 Ouvrir la vue synthétique Claude ↗</a>
      </div>
      <p class="muted" style="margin-top:8px">À consulter en premier avant les fiches détaillées ci-dessous.</p>
    </section>`;
  }

  function decorate(){
    const app=document.getElementById('app');
    if(!app) return;
    app.querySelectorAll('[data-claude-hike-overview],[data-claude-hike-workspace]').forEach(el=>el.remove());
    app.insertAdjacentHTML('afterbegin',overviewCard());
  }

  // Wrap the final Hikes renderer (this script is loaded last).
  const baseRender=window.renderHikes;
  if(typeof baseRender==='function'){
    window.renderHikes=function(){
      baseRender();
      decorate();
    };
    try{renderHikes=window.renderHikes}catch(e){}
  }

  // Also wrap the final tab dispatcher so the card is re-pinned after every Hikes render.
  if(typeof show==='function'){
    const baseShow=show;
    show=function(id){
      const result=baseShow(id);
      if(id==='hikes') setTimeout(decorate,0);
      return result;
    };
    try{window.show=show}catch(e){}
  }
})();
