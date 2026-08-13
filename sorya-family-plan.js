'use strict';

// V81 bootstrap. Wait until all legacy deferred modules have loaded, then load the
// authoritative family plan last so Dashboard, Itinerary, Map and Activities agree.
(function bootV81(){
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
      await loadScript('v81-plan-data.js?v=81');
      await loadScript('v81-activities.js?v=81');
      await loadScript('v81-itinerary.js?v=81');
      await loadScript('v81-map.js?v=81');
      await loadScript('v81-dashboard.js?v=81');
      const version=document.querySelector('.hero .eyebrow');
      if(version)version.textContent='ROADBOOK VIVANT · V81';
      if(typeof show==='function')show(typeof active==='string'?active:'dashboard');
    }catch(error){
      console.error('V81 roadbook bootstrap failed',error);
    }
  },{once:true});
})();