'use strict';

(function preserveRoadbookState(){
  try{
    const raw=localStorage.getItem('lofoten-pwa-v1');
    window.__LOFOTEN_PRESERVED_STATE=raw?JSON.parse(raw):null;
  }catch{
    window.__LOFOTEN_PRESERVED_STATE=null;
  }
})();
