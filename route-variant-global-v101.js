'use strict';

// V101 — one authoritative A/B switch handler for the whole app.
// Intercepts both legacy and V90 route buttons before their tab-specific onclick handlers run.
(function installGlobalVariantSwitchV101(){
  function variantFrom(target){
    const button=target?.closest?.('[data-route-variant],[data-route-v90]');
    if(!button)return null;
    const v=button.dataset.routeVariant||button.dataset.routeV90;
    return ['A','B'].includes(v)?{button,variant:v}:null;
  }

  document.addEventListener('click',event=>{
    const hit=variantFrom(event.target);
    if(!hit)return;

    // Stop every legacy per-tab handler. Those handlers re-render the wrong view.
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    state.routeVariant=hit.variant;
    try{
      if(typeof state.routePlanVersion!=='undefined' && !state.routePlanVersion) state.routePlanVersion='v101-global-switch';
      if(typeof save==='function') save();
    }catch(e){console.warn('Variant save failed',e);}

    // Rebuild exactly the tab the user is currently viewing. show() is the single
    // normal rendering pipeline and therefore reapplies every late-loaded decorator.
    const current=(typeof active==='string'&&active)||document.querySelector('#nav button.active')?.dataset.tab||'dashboard';
    try{
      if(typeof show==='function') show(current);
      else {
        const fallback={dashboard:window.renderDashboard,itinerary:window.renderItinerary,map:window.renderMap}[current];
        if(typeof fallback==='function') fallback();
      }
    }catch(e){
      console.error('Variant re-render failed',e);
      try{ if(typeof show==='function') show(current); }catch{}
    }
  },true);
})();
