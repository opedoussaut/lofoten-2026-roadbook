'use strict';

(function installV85Fixes(){
  const replaceLabels=()=>{
    document.querySelectorAll('#app *').forEach(el=>{
      if(el.children.length===0&&el.textContent){
        el.textContent=el.textContent
          .replaceAll('Kiruna / Abisko','Kiruna / Jukkasjärvi')
          .replaceAll('Kiruna/Abisko','Kiruna/Jukkasjärvi');
      }
    });
  };

  const addBanner=()=>{
    const app=document.getElementById('app');
    if(!app||document.getElementById('v85-route-banner'))return;
    const banner=document.createElement('section');
    banner.id='v85-route-banner';
    banner.className='card';
    banner.style.cssText='border-left:5px solid #2563eb;margin-bottom:12px';
    banner.innerHTML=`<p class="eyebrow">CHOIX D’ITINÉRAIRE</p><h2>🚀 A · Fast Track &nbsp; / &nbsp; 🌿 B · Confort</h2><p><b>Abisko Mountain Lodge n’est plus une destination.</b> La nuit nord se fait côté Kiruna/Jukkasjärvi. Abisko reste seulement un passage possible sur l’E10 vers Narvik, sans arrêt imposé.</p><p class="muted">A maximise le temps aux Lofoten avec de longues journées à l’aller. B garde des journées de conduite plus régulières.</p>`;
    app.prepend(banner);
  };

  const wrap=(name)=>{
    const original=window[name];
    if(typeof original!=='function'||original.__v85wrapped)return;
    const wrapped=function(...args){const out=original.apply(this,args);setTimeout(()=>{replaceLabels();addBanner();},0);return out;};
    wrapped.__v85wrapped=true;
    window[name]=wrapped;
    try{eval(`${name}=window['${name}']`);}catch{}
  };

  wrap('renderDashboard');
  wrap('renderItinerary');
  wrap('renderMap');
})();
