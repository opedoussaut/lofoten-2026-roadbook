'use strict';

// V110 — persistent Claude route workspace link on the Hikes tab.
(function installClaudeHikeWorkspace(){
  const CLAUDE_URL='https://claude.ai/code/artifact/e6dcb80a-cc5d-41f5-a549-f96bde2c2f56';

  function workspaceCard(){
    return `<section class="card" data-claude-hike-workspace="v110" style="margin:0 0 14px;border:2px solid rgba(99,102,241,.45)">
      <p class="eyebrow">GPX · STRAVA · SUUNTO</p>
      <h2 style="margin:3px 0">🧭 Lofoten 2026 · Route workspace</h2>
      <p>Workspace Claude utilisé pour préparer et synchroniser les traces de randonnée <b>LFT2026P0 / P1 / P2</b> vers Strava et Suunto.</p>
      <div class="toolbar">
        <a class="btn primary" href="${CLAUDE_URL}" target="_blank" rel="noopener">🤖 Ouvrir le workspace Claude ↗</a>
      </div>
      <p class="muted" style="margin-top:8px">À utiliser comme point d’accès pour les GPX validés et la synchronisation des routes avant les randonnées.</p>
    </section>`;
  }

  function decorate(){
    const app=document.getElementById('app');
    if(!app || document.querySelector('[data-claude-hike-workspace="v110"]')) return;
    app.insertAdjacentHTML('afterbegin',workspaceCard());
  }

  const base=window.renderHikes;
  if(typeof base==='function'){
    window.renderHikes=function(){base();decorate();};
    try{renderHikes=window.renderHikes}catch(e){}
  }

  // Covers a Hikes tab already open during a hot reload.
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',()=>setTimeout(()=>{
      const active=(location.hash||'').replace('#','');
      if(active==='hikes') decorate();
    },0));
  }
})();
