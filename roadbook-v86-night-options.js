'use strict';

(function installV86NightOptions(){
  const G=q=>`https://www.google.com/maps/search/${encodeURIComponent(q)}`;
  const EXTRA={
    'Lofoten Est':[
      {kind:'camping',name:'Lyngvær Lofoten Bobilcamping',url:'https://lofoten-bobilcamping.no/en-hjemmeside/',note:'Camping Premium · emplacement camping-car face au Vestfjord, services et accès simple.'},
      {kind:'nature',name:'Hov Camping · Gimsøy',url:'https://hovgard.no/en/camping-caravanning/',note:'Nature Premium · océan, plage et Hoven; choisir un emplacement périphérique et calme.'},
      {kind:'free',name:'Austnesfjorden · parking routier autorisé du jour',url:G('Austnesfjorden viewpoint Lofoten'),note:'Nature Free Premium · vue fjord/montagnes. Nuit uniquement si la signalisation locale autorise explicitement le stationnement.'}
    ],
    'Lofoten Centre':[
      {kind:'camping',name:'Reineholmen / Ballstad Motorhome Camp',url:'https://book.reineholmen.no/en/',note:'Camping Premium · petite île, mer et services modernes.'},
      {kind:'nature',name:'Uttakleiv Beach camping area',url:'https://visitlofoten.com/en/topic/uttakleiv-beach/',note:'Nature Premium · nuit signature organisée et autorisée au bord de l’océan.'},
      {kind:'free',name:'Vestvågøy · parking côtier autorisé du jour',url:G('Vestvågøy Lofoten scenic parking'),note:'Nature Free Premium · choisir uniquement un parking légal sans panneau no camping/no overnight.'}
    ],
    'Kiruna':[
      {kind:'camping',name:'Camp Ripan · Kiruna',url:'https://ripan.se/en/rooms/camping/',note:'Camping Premium · vrai reset confort après la route, services complets et accès facile.'},
      {kind:'nature',name:'Björkliden Camping',url:'https://bjorkliden.com/en/stay-travel/accommodation/camping/',note:'Nature Premium · montagne et lac Torneträsk, très beau réveil et environnement calme.'},
      {kind:'free',name:'Tornehamn / Bessejohka · E10',url:G('Tornehamn Bessejohka E10 Sweden'),note:'Nature Free Premium · option montagne gratuite seulement si la signalisation locale autorise la nuit.'}
    ],
    'Kiruna / Jukkasjärvi':[
      {kind:'camping',name:'Camp Ripan · Kiruna',url:'https://ripan.se/en/rooms/camping/',note:'Camping Premium · vrai reset confort après la route, services complets et accès facile.'},
      {kind:'nature',name:'Björkliden Camping',url:'https://bjorkliden.com/en/stay-travel/accommodation/camping/',note:'Nature Premium · montagne et lac Torneträsk, très beau réveil et environnement calme.'},
      {kind:'free',name:'Tornehamn / Bessejohka · E10',url:G('Tornehamn Bessejohka E10 Sweden'),note:'Nature Free Premium · option montagne gratuite seulement si la signalisation locale autorise la nuit.'}
    ]
  };

  const label=o=>o.kind==='camping'?'🏕️ Camping Premium':o.kind==='nature'?'🌿 Nature Premium':'🌲 Nature Free Premium';
  const html=opts=>`<details open data-v86-night-options><summary><b>3 options pour la nuit</b></summary>${opts.map(o=>`<article style="padding:10px 0;border-top:1px solid rgba(120,120,120,.2)"><b>${label(o)}</b><br><a href="${o.url}" target="_blank" rel="noopener">${o.name} ↗</a><p class="muted" style="margin:4px 0 0">${o.note}</p></article>`).join('')}</details>`;

  function repair(){
    document.querySelectorAll('#app article.card').forEach(card=>{
      const heading=card.querySelector('h2');
      if(!heading||card.querySelector('details'))return;
      const txt=heading.textContent||'';
      const dest=txt.includes('→')?txt.split('→').pop().trim():'';
      const opts=EXTRA[dest];
      if(!opts)return;
      card.insertAdjacentHTML('beforeend',html(opts));
    });

    document.querySelectorAll('#app details').forEach(details=>{
      const articles=[...details.querySelectorAll('article')];
      if(articles.length!==3)return;
      articles.forEach((a,i)=>{
        const b=a.querySelector('b');
        if(!b)return;
        const expected=i===0?'🏕️ Camping Premium':i===1?'🌿 Nature Premium':'🌲 Nature Free Premium';
        if(!/Camping Premium|Nature Premium|Nature Free Premium/.test(b.textContent||''))b.textContent=expected;
      });
    });
  }

  const wrap=name=>{
    const original=window[name];
    if(typeof original!=='function'||original.__v86nightwrapped)return;
    const wrapped=function(...args){const out=original.apply(this,args);setTimeout(repair,0);return out;};
    wrapped.__v86nightwrapped=true;
    window[name]=wrapped;
    try{eval(`${name}=window['${name}']`);}catch{}
  };

  wrap('renderItinerary');
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(repair,0));else setTimeout(repair,0);
})();