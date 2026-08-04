'use strict';

(function restoreRoadbookState(){
  const preserved=window.__LOFOTEN_PRESERVED_STATE;
  if(!preserved||typeof state==='undefined')return;

  const always=['current','journal','expenses','gps','van'];
  always.forEach(key=>{if(preserved[key]!==undefined)state[key]=JSON.parse(JSON.stringify(preserved[key]));});

  if(preserved.storageArchitectureVersion==='github-v1'){
    const mutable=['meta','itinerary','nightlyOptions','activities','olivier','routePolicy','vehicleProfile','activeRoutePlan','hikeSelectionVersion'];
    mutable.forEach(key=>{if(preserved[key]!==undefined)state[key]=JSON.parse(JSON.stringify(preserved[key]));});
  }

  state.storageArchitectureVersion='github-v1';
  state.updatedAt=preserved.updatedAt||state.updatedAt;
  localStorage.setItem('lofoten-pwa-v1',JSON.stringify(state));
})();
