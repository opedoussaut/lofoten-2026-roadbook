'use strict';

(function restoreRoadbookState(){
  const preserved=window.__LOFOTEN_PRESERVED_STATE;
  if(!preserved||typeof state==='undefined')return;

  // Only restore user-entered/personal runtime data. Route structure, itinerary,
  // nightly options and app metadata are authoritative in the current codebase
  // and must never be overwritten by stale local/GitHub snapshots (e.g. V82).
  const always=['current','journal','expenses','gps','van'];
  always.forEach(key=>{
    if(preserved[key]!==undefined)state[key]=JSON.parse(JSON.stringify(preserved[key]));
  });

  state.storageArchitectureVersion='github-v2-authoritative-route';
  state.updatedAt=preserved.updatedAt||state.updatedAt;
  localStorage.setItem('lofoten-pwa-v1',JSON.stringify(state));
})();
