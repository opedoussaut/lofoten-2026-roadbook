'use strict';

// V99 — keep the map visible when switching route variant A/B.
// roadbook-plan.js historically re-rendered the dashboard after every variant change.
// This wrapper only changes the click behaviour while the map is being rendered.
(function installMapVariantFixV99(){
  const previous=window.renderMap;
  if(typeof previous!=='function') return;

  function bindMapVariantButtons(){
    document.querySelectorAll('[data-route-variant]').forEach(button=>{
      button.onclick=()=>{
        const variant=button.dataset.routeVariant;
        if(!['A','B'].includes(variant)) return;
        state.routeVariant=variant;
        try{ if(typeof save==='function') save(); }catch{}
        // Re-render the current map instead of jumping back to the dashboard.
        window.renderMap();
      };
    });
  }

  window.renderMap=function(){
    previous();
    bindMapVariantButtons();
    // Leaflet drawing is asynchronous; rebind once more after the old module finishes its setup.
    setTimeout(bindMapVariantButtons,25);
  };
  try{renderMap=window.renderMap}catch{}
})();
