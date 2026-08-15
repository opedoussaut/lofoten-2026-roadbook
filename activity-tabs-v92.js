'use strict';

// V92 navigation cleanup. Keep itinerary and all existing specialist tabs intact,
// remove only the old generic Activities tab, and group dedicated outdoor tabs.
(function normalizeActivityTabs(){
  if(typeof tabs==='undefined')return;
  for(let i=tabs.length-1;i>=0;i--){if(tabs[i][0]==='family'||tabs[i][0]==='hikes'||tabs[i][0]==='kayak'||tabs[i][0]==='paragliding')tabs.splice(i,1);}
  const itineraryIndex=tabs.findIndex(([id])=>id==='itinerary');
  const insertAt=itineraryIndex>=0?itineraryIndex+1:1;
  tabs.splice(insertAt,0,['hikes','Randonnées'],['kayak','Kayak'],['paragliding','Parapente']);
})();
