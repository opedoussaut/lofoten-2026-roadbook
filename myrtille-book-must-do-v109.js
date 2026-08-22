'use strict';

// V109 — protected MUST DO: buy Myrtille Heissat's Hike & Fly in Lofoten.
// Kept as an overlay after the authoritative itinerary sync so it cannot be lost.
(function installMyrtilleBookMustDo(){
  if(typeof state === 'undefined') return;

  const ACTIVITY_KEY = 'Hike & Fly in Lofoten';
  const activity = [
    'MUST DO · Acheter “Hike & Fly in Lofoten” — Myrtille Heissat',
    'Haukland Beach Café · secours Unstad Arctic Surf',
    'MUST DO · souvenir / parapente',
    '02/09 · 10–20 min',
    'Acheter 1 exemplaire du livre de Myrtille. Demandes de réservation envoyées le 22/08/2026 à Haukland Beach Café et Unstad Arctic Surf. Priorité Haukland puisque déjà sur l’itinéraire ; Unstad = plan B.',
    '✅ Paddy peut accompagner selon règles du lieu',
    68.1990,
    13.5290
  ];

  if(!Array.isArray(state.activities)) state.activities=[];
  if(!state.activities.some(a => String(a?.[0] || '').includes(ACTIVITY_KEY))) state.activities.push(activity);

  if(!Array.isArray(state.mustDoStops)) state.mustDoStops=[];
  if(!state.mustDoStops.some(x => x.reference === 'MYRTILLE-BOOK')){
    state.mustDoStops.push({
      reference:'MYRTILLE-BOOK',
      name:'Buy Hike & Fly in Lofoten — Myrtille Heissat',
      date:'02/09',
      role:'MUST DO souvenir + paragliding reference',
      primary:{
        name:'Haukland Beach Café',
        email:'hei@hauklandbeach.no',
        phone:'+47 408 49 949',
        address:'Uttakleivveien 72, 8370 Haukland, Norway',
        status:'Reservation requested by email 22/08/2026'
      },
      backup:{
        name:'Unstad Arctic Surf',
        email:'hello@unstadsurf.com',
        phone:'+47 970 61 201',
        address:'Unstadveien 105, N-8363 Bøstad, Norway',
        status:'Reservation requested by email 22/08/2026'
      },
      note:'Myrtille confirmed the book is sold physically at Haukland Beach or Unstad Arctic Surf; no digital edition.'
    });
  }

  // Make the Haukland itinerary row explicitly carry the MUST DO so it is visible on the day.
  if(Array.isArray(state.itinerary)){
    const row=state.itinerary.find(r => String(r?.[0] || '') === '02/09');
    if(row && !String(row[6] || '').includes(ACTIVITY_KEY)){
      row[6]=`${row[6]} · MUST DO: acheter “Hike & Fly in Lofoten” de Myrtille à Haukland Beach Café (Unstad en plan B).`;
    }
  }

  if(typeof save === 'function') save();
})();
