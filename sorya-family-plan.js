'use strict';

// V82 bootstrap. Load the authoritative family plan, then the confirmed
// 12 September return extension last so every visible tab uses the latest trip.
(function bootV82(){
  async function loadScript(src){
    await new Promise((resolve,reject)=>{
      const script=document.createElement('script');
      script.src=src;
      script.onload=resolve;
      script.onerror=reject;
      document.head.appendChild(script);
    });
  }
  window.addEventListener('load',async()=>{
    try{
      await loadScript('v81-plan-data.js?v=82');
      await loadScript('v81-activities.js?v=82');
      await loadScript('v81-itinerary.js?v=82');
      await loadScript('v81-map.js?v=82');
      await loadScript('v81-dashboard.js?v=82');
      await loadScript('v82-return-data.js?v=82');
      await loadScript('v82-itinerary.js?v=82');
      await loadScript('v82-map.js?v=82');
      await loadScript('v82-dashboard.js?v=82');
      const version=document.querySelector('.hero .eyebrow');
      if(version)version.textContent='ROADBOOK VIVANT · V82';
      const subtitle=document.querySelector('.hero h1 + p');
      if(subtitle)subtitle.textContent='Olivier, Sorya & Paddy · Andøya + Lofoten · rythme famille · retour 12/09 16:00 · zéro ferry';
      if(typeof show==='function')show(typeof active==='string'?active:'dashboard');
    }catch(error){
      console.error('V82 roadbook bootstrap failed',error);
    }
  },{once:true});
})();