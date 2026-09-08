'use strict';
(function(){
  const DATA_URL='journal-current.json?v=126';
  const DAY14_URL='journal-day14.json?v=127';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const dateFr=v=>{try{return new Intl.DateTimeFormat('fr-FR',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(v+'T12:00:00Z'))}catch{return v||''}};
  async function load(){
    const [r,d14]=await Promise.all([fetch(DATA_URL,{cache:'no-store'}),fetch(DAY14_URL,{cache:'no-store'})]);
    if(!r.ok)throw new Error('HTTP '+r.status);
    const p=await r.json();
    const base=Array.isArray(p.entries)?p.entries:[];
    if(d14.ok){const q=await d14.json();const extra=Array.isArray(q.entries)?q.entries:[];return [...extra,...base.filter(e=>!extra.some(x=>Number(x.day)===Number(e.day)))];}
    return base;
  }
  function paragraphs(entry){
    const raw=String(entry.highlight||'').replace(/^DAY\s+\d+\s+—\s*/,'');
    return raw.split(/\n\s*\n/).filter(Boolean).map(p=>`<p>${esc(p)}</p>`).join('');
  }
  async function renderStories(){
    const app=document.getElementById('app');if(!app)return;
    try{
      const entries=(await load()).slice().sort((a,b)=>(Number(b.day)||0)-(Number(a.day)||0));
      app.innerHTML=`<div class="stack"><section class="card"><p class="eyebrow">JOURNAL · VERSION VALIDÉE</p><h2>Les récits complets du voyage</h2><p>${entries.length} journées enregistrées · source vérifiée du roadbook.</p></section>${entries.map(e=>`<article class="card story-card"><p class="eyebrow">JOUR ${esc(e.day)} · ${esc(dateFr(e.date))}</p><h2>${esc(e.title||'Récit du jour')}</h2>${paragraphs(e)}</article>`).join('')}</div>`;
    }catch(err){app.innerHTML=`<section class="card"><h2>Récits</h2><p>Impossible de charger les récits actualisés (${esc(err.message)}).</p></section>`;}
  }
  async function renderRoute(){
    const app=document.getElementById('app');if(!app)return;
    try{
      const entries=(await load()).slice().sort((a,b)=>(Number(a.day)||0)-(Number(b.day)||0));
      app.innerHTML=`<div class="stack"><section class="card"><p class="eyebrow">ITINÉRAIRE RÉEL</p><h2>Du départ au jour ${esc(Math.max(...entries.map(e=>Number(e.day)||0)))}</h2>${entries.map(e=>`<article class="timeline-item"><div class="day-badge">J${esc(e.day)}</div><div><h3>${esc(dateFr(e.date))}</h3><p>${esc(e.place||'')}</p></div></article>`).join('')}</section></div>`;
    }catch(err){app.innerHTML=`<section class="card"><h2>Itinéraire</h2><p>Impossible de charger l’itinéraire réel actualisé (${esc(err.message)}).</p></section>`;}
  }
  document.addEventListener('click',e=>{
    const b=e.target.closest('#nav button');if(!b)return;
    if(b.dataset.tab==='story')setTimeout(renderStories,0);
    if(b.dataset.tab==='route')setTimeout(renderRoute,0);
  },true);
})();
