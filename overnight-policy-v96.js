'use strict';

// V96 — Overnight selection policy clarification.
// This layer is intentionally conservative: it does not alter the itinerary or MVP activities.
// It removes the notion that an ordinary/day parking can be presented as an overnight option
// and explains the new split between SLEEP and SERVICE stops.
(function installOvernightPolicyV96(){
  const E=v=>typeof esc==='function'?esc(v):String(v??'');
  const DAY_PARKING_WORDS=['parking gratuit jour/nuit','parking routier','day parking','parking autorisé du jour'];

  function scrubDayParking(){
    document.querySelectorAll('.p4n-quality-v95').forEach(block=>{
      block.querySelectorAll('div').forEach(row=>{
        const text=(row.textContent||'').toLowerCase();
        if(DAY_PARKING_WORDS.some(x=>text.includes(x))){
          // Remove the nearest option row, never the whole details block.
          const option=[...block.children].find(el=>el.contains(row) && el!==block.querySelector('summary'));
          if(option && option.tagName!=='SUMMARY') option.remove();
        }
      });
    });
  }

  function addPolicy(){
    const app=document.getElementById('app'); if(!app)return;
    const first=app.querySelector('.priority-banner');
    if(first&&!app.querySelector('[data-overnight-policy-v96]')){
      first.insertAdjacentHTML('afterend',`<section class="card" data-overnight-policy-v96 style="margin:10px 0">
        <p class="eyebrow">NUITS · POLITIQUE V96</p>
        <p><b>Hors Lofoten :</b> priorité aux lieux réellement tranquilles pour dormir — petite aire nature, accueil privé / ferme, camping rural — plutôt qu’aux parkings urbains ou de journée. Park4Night ≥4★ reste un minimum, mais la qualité des commentaires et le caractère calme/nature passent avant l’équipement.</p>
        <p><b>Dans les Lofoten :</b> le choix de la base est d’abord dicté par Måtinden, Reinebringen, kayak et nos autres activités ; parmi les bases compatibles, on retient le meilleur lieu de nuit réellement adapté au camping-car.</p>
        <p><b>Services ≠ nuit :</b> eau propre, vidange eaux grises et cassette/WC seront affichées comme <em>arrêts techniques</em> séparés sur l’axe. Un point de service n’est jamais présenté comme un endroit où dormir sauf si l’hébergement nocturne est lui-même vérifié.</p>
      </section>`);
    }
    scrubDayParking();
  }

  const previous=window.renderItinerary;
  if(typeof previous==='function'){
    window.renderItinerary=function(){previous();addPolicy();};
    try{renderItinerary=window.renderItinerary}catch{}
  }
})();
