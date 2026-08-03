'use strict';

(function finalizeRoadbookStructure(){
  function rerenderActive(){
    if(typeof active==='undefined')return;
    const renderers={dashboard:window.renderDashboard,itinerary:window.renderItinerary,family:window.renderFamily,map:window.renderMap,van:window.renderVan,journal:window.renderJournal,budget:window.renderBudget,assistant:window.renderAssistant,sync:window.renderSync};
    const render=renderers[active];
    if(typeof render==='function')render();
  }

  document.addEventListener('DOMContentLoaded',()=>{
    const script=document.createElement('script');
    script.src='roadbook-structure.js?v=51-final';
    script.onload=rerenderActive;
    document.body.appendChild(script);
  });
})();
