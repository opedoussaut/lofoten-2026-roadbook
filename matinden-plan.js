'use strict';

// Måtinden opening option selected for the 2026 roadbook.
// Standard Baugtua out-and-back route only: the full Stave–Bleik coastal traverse
// contains rocky scrambling sections that are not appropriate for Paddy.

(function installMatindenPlan(){
  if (typeof state === 'undefined') return;

  const VERSION = 'v79-matinden-stave';
  const STAVE = {
    name: 'Stave Camping · Andøya',
    url: 'https://www.stavecamping.no/beach-camping',
    role: 'Base choisie pour découvrir Andøya avant les Lofoten. Camping face à l’océan, à quelques minutes du départ de Måtinden. Emplacements camping-car sans réservation.',
    calm: '4.5/5',
    paddy: 'Paddy reste avec nous. Pour les hébergements en dur, certaines catégories interdisent les animaux ; ici nous utilisons notre propre camping-car.',
    address: 'Stavedalsveien 521, 8489 Nordmela, Andøya',
    booking: 'Camping-car : pas de réservation requise',
    phone: '+47 926 01 257',
    email: 'booking@stavecamping.no'
  };
  const MIDNATTSOL = {
    name: 'Midnattsol Camping · Bleik',
    url: 'https://www.midnattsolcamping.com/en',
    role: 'Alternative à Stave, directement à Bleik et très proche du départ Baugtua.',
    calm: '4.5/5',
    paddy: 'Alternative pratique si Stave est complet ou si la météo rend la côte de Stave trop exposée.'
  };

  const HIKE = {
    name: 'Måtinden — Baugtua aller-retour',
    area: 'Andøya · Vesterålen',
    category: 'Randonnée',
    duration: '≈3–4 h · 7,6 km A/R · ≈400–500 m D+',
    terrain: 'Départ raide, terrain parfois humide et rocheux, puis plateau. Sommet très exposé aux falaises. Ne pas prendre le sentier côtier intégral Stave–Bleik avec Paddy.',
    paddy: '✅ Oui — laisse courte + harnais tout le long. Moutons/faune possibles ; porter Paddy si un passage devient trop rocheux ou boueux.',
    lat: 69.235670,
    lon: 15.948500,
    trailUrl: 'https://www.visitnorway.com/listings/m%C3%A5tind-%28408-masl%29-in-vester%C3%A5len/228686/',
    trailhead: 'Baugtua, Fv976 entre Stave et Bleik'
  };

  let changed = false;

  function replaceDay(date, row){
    if (!Array.isArray(state.itinerary)) state.itinerary = [];
    const index = state.itinerary.findIndex(item => Array.isArray(item) && item[0] === date);
    if (index < 0) { state.itinerary.push(row); changed = true; return; }
    if (JSON.stringify(state.itinerary[index]) !== JSON.stringify(row)) {
      state.itinerary[index] = row;
      changed = true;
    }
  }

  // The Andøya detour replaces only the first Hov night. Hov remains a major base.
  replaceDay('30/08',[
    '30/08','Abisko Mountain Lodge','Stave Camping · Andøya',345,5.2,'Arrivée Vesterålen',
    'Abisko → Narvik → Sortland → route panoramique d’Andøya → Stave',
    'Installation face à l’océan. Repos après la route ; Måtinden est gardé pour le lendemain matin avec Paddy.'
  ]);
  replaceDay('31/08',[
    '31/08','Stave Camping · Andøya','Hov Camping · Gimsøy',260,4.2,'Måtinden + arrivée Lofoten',
    'Départ tôt → Baugtua → Måtinden A/R → route vers Svolvær/Henningsvær → Hov',
    'Paddy fait Måtinden en laisse courte. Henningsvær seulement si horaire et météo restent confortables ; priorité à une arrivée sereine à Hov.'
  ]);

  if (!state.nightlyOptions) state.nightlyOptions = {};
  const new30 = {preferred:{...STAVE}, alternatives:[{...MIDNATTSOL}]};
  if (JSON.stringify(state.nightlyOptions['30/08']) !== JSON.stringify(new30)) {
    state.nightlyOptions['30/08'] = new30;
    changed = true;
  }

  // Keep Hov as the preferred 31 Aug night and preserve Lyngvær as tested-and-loved fallback.
  if (!state.nightlyOptions['31/08']) state.nightlyOptions['31/08'] = {preferred:{},alternatives:[]};
  state.nightlyOptions['31/08'].preferred = {
    name:'Hov Camping',
    url:'https://hovgard.no/en/camping-caravanning/',
    role:'Première nuit dans les Lofoten après Måtinden. Hov reste l’un de nos campings prioritaires.',
    calm:'4.5/5',
    paddy:'Arrivée, plage et récupération après la randonnée et la route.'
  };

  // Make the hike visible in the Activities tab without duplicating it on repeated loads.
  if (!Array.isArray(state.activities)) state.activities = [];
  const activityRow = [HIKE.name,HIKE.area,HIKE.category,HIKE.duration,HIKE.terrain,HIKE.paddy,HIKE.lat,HIKE.lon];
  const activityIndex = state.activities.findIndex(row => Array.isArray(row) && String(row[0]||'').toLowerCase().includes('måtinden'));
  if (activityIndex < 0) { state.activities.push(activityRow); changed = true; }
  else if (JSON.stringify(state.activities[activityIndex]) !== JSON.stringify(activityRow)) { state.activities[activityIndex] = activityRow; changed = true; }

  state.matindenPlan = {
    version: VERSION,
    selected: true,
    date: '31/08/2026',
    camping: {...STAVE},
    hike: {...HIKE},
    dogRule: 'Paddy : oui sur Baugtua A/R, en laisse courte + harnais. Éviter la traversée côtière Stave–Bleik.'
  };

  state.routePolicy = state.routePolicy || {};
  state.routePolicy.lofoten = '1 nuit sur Andøya le 30 août, puis 5 nuits dans les Lofoten du 31 août au 5 septembre.';
  if (state.current) state.current.decision = 'Ajouter Andøya et Måtinden au début : Stave Camping le 30 août, Måtinden avec Paddy le 31, puis Hov Camping et itinéraire Lofoten habituel.';

  if (changed && typeof save === 'function') save();
})();
