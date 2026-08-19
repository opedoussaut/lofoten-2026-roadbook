'use strict';

// V100 — one safe A/B switch for every tab.
// Prevents legacy route handlers from rendering the Dashboard when the user
// changes variant from another tab. The current tab is always rebuilt through
// the normal show(active) pipeline so all later decorators run again.
(function installVariantSwitchV100(){
  document.addEventListener('click',event=>{
    const button=event.target?.closest?.('[data-route-variant]');
    if(!button)return;
    const variant=button.dataset.routeVariant;
    if(!['A','B'].includes(variant))return;

    // Capture the click before legacy onclick handlers can replace the DOM.
    event.preventDefault();
    event.stopPropagation();
    if(typeof event.stopImmediatePropagation==='function')event.stopImmediatePropagation();

    state.routeVariant=variant;
    state.routePlanVersion=state.routePlanVersion||'v100-safe-switch';
    try{if(typeof save==='function')save();}catch{}

    // Re-render exactly the tab the user is currently looking at. This is
    // important because renderItinerary/renderMap are wrapped by later modules.
    try{
      if(typeof show==='function' && typeof active!=='undefined'){
        show(active);
      }else if(typeof window.renderDashboard==='function'){
        window.renderDashboard();
      }
    }catch(error){
      console.error('V100 variant switch failed',error);
      try{if(typeof show==='function')show('dashboard');}catch{}
    }
  },true);
})();
