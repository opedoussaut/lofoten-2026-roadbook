'use strict';

(function seedMustDoStops(){
  if(typeof state==='undefined')return;
  if(!Array.isArray(state.activities))state.activities=[];
  const name='MUST DO · Vikten coastal road viewpoint — Park4Night #60765';
  const exists=state.activities.some(a=>String(a?.[0]||'').includes('#60765'));
  if(!exists){
    state.activities.push([
      name,
      'Flakstadøya · Vikten',
      'MUST DO',
      '1–2 h au coucher du soleil',
      'Belvédère côtier très exposé au vent, sol irrégulier; ne pas bloquer les zones de croisement. Vue exceptionnelle sur la mer et les montagnes. Arriver tôt, vérifier odeurs agricoles et stabilité avant de rester.',
      'Oui, tenu en laisse près de la falaise',
      68.1300,
      13.2974
    ]);
  }
  if(!state.mustDoStops||!Array.isArray(state.mustDoStops))state.mustDoStops=[];
  if(!state.mustDoStops.some(x=>x.reference==='60765')){
    state.mustDoStops.push({
      reference:'60765',
      name:'Vikten coastal road viewpoint',
      date:'02/09',
      url:'https://park4night.com/fr/place/60765',
      lat:68.1300,
      lon:13.2974,
      role:'must-do scenic stop — not an additional overnight option',
      reason:'One of the strongest west-facing sea-and-mountain viewpoints on Flakstadøya, ideal for sunset and photography.',
      warning:'Only 3–4 campers, uneven and exposed; occasional farm-waste smell reported. Keep Lofoten Beach Camp as the single overnight choice.'
    });
  }
  if(typeof save==='function')save();
})();
