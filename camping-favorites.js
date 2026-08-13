'use strict';

// Personal campsite favourites for the Lofoten roadbook.
// Keeps the audited route unchanged while surfacing places already tested and loved.

(function installCampingFavorites(){
  const LYNGVAER = {
    name: 'Lyngvær Lofoten Bobilcamping',
    url: 'https://lofoten-bobilcamping.no/en-hjemmeside/',
    role: '⭐ Déjà testé et beaucoup aimé. Alternative prioritaire à Hov, particulièrement pratique pour Henningsvær / Svolvær. Le camping officiel fonctionne sans réservation : drop-in uniquement.',
    calm: '4.5/5',
    paddy: 'Bon choix avec Paddy : promenade du soir au bord de l’eau et environnement côtier.',
    personal: 'TESTÉ & AIMÉ',
    booking: 'Pas de réservation · drop-in uniquement',
    phone: '+47 932 82 961',
    email: 'lofoten.bobilcamping@outlook.com'
  };

  function addAlternative(date){
    if (typeof state === 'undefined' || !state.nightlyOptions || !state.nightlyOptions[date]) return false;
    const night = state.nightlyOptions[date];
    if (!Array.isArray(night.alternatives)) night.alternatives = [];

    const index = night.alternatives.findIndex(option => option && option.name === LYNGVAER.name);
    if (index >= 0) {
      night.alternatives[index] = {...night.alternatives[index], ...LYNGVAER};
      return false;
    }

    // Put our personally tested fallback first, without replacing Hov as preferred.
    night.alternatives.unshift({...LYNGVAER});
    return true;
  }

  let changed = false;
  changed = addAlternative('30/08') || changed;
  changed = addAlternative('31/08') || changed;

  if (typeof state !== 'undefined') {
    state.campingFavorites = state.campingFavorites || {};
    state.campingFavorites.lyngvaer = {...LYNGVAER, preferredBase: 'Hov Camping', nights: ['30/08','31/08']};
  }

  if (changed && typeof save === 'function') save();
})();
