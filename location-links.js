'use strict';

(function installLocationLinks(){
  const POINTS={
    '25/08':{name:'Nuit 1',lat:53.70,lon:9.90},
    '26/08':{name:'Nuit 2',lat:57.90,lon:14.30},
    '27/08':{name:'Forsgården',lat:60.675,lon:17.074},
    '28/08':{name:'Nuit 4',lat:64.50,lon:20.50},
    '29/08':{name:'Abisko Mountain Lodge',lat:68.354,lon:18.832},
    '30/08':{name:'Hov Camping',lat:68.341,lon:14.117},
    '31/08':{name:'Hov Camping',lat:68.341,lon:14.117},
    '01/09':{name:'Uttakleiv',lat:68.209,lon:13.507},
    '02/09':{name:'Lofoten Beach Camp',lat:68.089,lon:13.236},
    '03/09':{name:'Moskenes Camping',lat:67.901,lon:13.046},
    '04/09':{name:'Lofoten Beach Camp',lat:68.089,lon:13.236},
    '05/09':{name:'Björkliden Camping',lat:68.407,lon:18.687},
    '06/09':{name:'Rana Camping',lat:66.324,lon:14.125},
    '07/09':{name:'Halland Camping',lat:62.820,lon:9.870},
    '08/09':{name:'Topcamp Ekeberg',lat:59.900,lon:10.784},
    '09/09':{name:'Wohnmobilhafen Hamburg Süd',lat:53.483,lon:10.018},
    '10/09':{name:'Maison · Chevreuse',lat:48.706,lon:2.038},
    '11/09':{name:'Roadsurfer · Champlan',lat:48.708,lon:2.279}
  };

  const fixed=value=>Number(value).toFixed(6);
  const osm=(p,zoom=15)=>`https://www.openstreetmap.org/?mlat=${fixed(p.lat)}&mlon=${fixed(p.lon)}#map=${zoom}/${fixed(p.lat)}/${fixed(p.lon)}`;
  const google=p=>`https://www.google.com/maps/dir/?api=1&destination=${fixed(p.lat)},${fixed(p.lon)}&travelmode=driving`;

  function addLinks(){
    document.querySelectorAll('#app article.card').forEach(article=>{
      const eyebrow=article.querySelector('.eyebrow')?.textContent||'';
      const match=eyebrow.match(/(\d{2}\/\d{2})/);
      if(!match||article.querySelector('[data-location-links]'))return;
      const point=POINTS[match[1]];
      if(!point)return;
      article.insertAdjacentHTML('beforeend',`<div class="toolbar" data-location-links style="margin-top:10px"><a class="btn primary" href="${google(point)}" target="_blank" rel="noopener">🚐 Navigation Google Maps ↗</a><a class="btn" href="${osm(point)}" target="_blank" rel="noopener">📍 OpenStreetMap ↗</a><span class="muted">${fixed(point.lat)}, ${fixed(point.lon)}</span></div>`);
    });
  }

  const baseItinerary=window.renderItinerary;
  if(typeof baseItinerary==='function'){
    window.renderItinerary=function(){baseItinerary();addLinks();};
    try{renderItinerary=window.renderItinerary;}catch{}
  }
})();
