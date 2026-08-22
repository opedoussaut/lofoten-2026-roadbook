'use strict';

// V107 — souvenir book blueprint.
// The tab is designed to evolve during the trip: it reads existing roadbook state
// (journal, GPS, expenses and itinerary) without changing the authoritative itinerary.
(function installTripBook(){
  if(typeof tabs === 'undefined' || typeof show !== 'function') return;

  const TAB_ID = 'book';
  if(!tabs.some(([id]) => id === TAB_ID)){
    const journalIndex = tabs.findIndex(([id]) => id === 'journal');
    tabs.splice(journalIndex >= 0 ? journalIndex + 1 : tabs.length - 2, 0, [TAB_ID, 'Livre souvenir']);
  }

  const CHAPTERS = [
    ['01','Le départ','Pourquoi les Lofoten, préparation, camping-car, carte de la grande route vers le Nord.'],
    ['02','La route vers le cercle arctique','Belgique, Allemagne, Danemark, Suède : les premières nuits et les paysages qui changent.'],
    ['03','Vesterålen & Andøya','Måtinden, Bleik, Stave, premières lumières arctiques, mer et falaises.'],
    ['04','Entrée dans les Lofoten','Gimsøy, Hov, plages, cabanes rouges et premières grandes vues.'],
    ['05','Au cœur des îles','Haukland, Uttakleiv, Henningsvær, Svolvær, kayak et journées météo-variable.'],
    ['06','Moskenesøy','Reine, Hamnøy, Sakrisøy, Reinebringen et les paysages iconiques du voyage.'],
    ['07','Voler au-dessus des Lofoten','Parapente, spots repérés, fenêtres météo, décisions de sécurité et images aériennes.'],
    ['08','La vie en camping-car','Nos meilleurs spots de nuit, petits-déjeuners face à la mer, cuisine, Paddy et quotidien nomade.'],
    ['09','Les jours de mauvais temps','Ce que la pluie a changé : balades basses, villages, cafés, musées, photos dramatiques et plans B.'],
    ['10','Le retour par la Norvège','La longue descente, fjords, Trondheim, Oslo et les dernières étapes avant la maison.'],
    ['11','Le voyage en chiffres','Kilomètres, randonnées, dénivelé, nuits, carburant, budget, photos, latitude maximale et statistiques.'],
    ['12','Ce que nous garderons','Moments forts, surprises, ce que nous referions, notre top 10 et une dernière double page photo.']
  ];

  const PHOTO_THEMES = [
    'Photo de couverture : une image très forte, simple, avec beaucoup d’espace visuel.',
    '1 grande photo d’ouverture par chapitre, idéalement en double page.',
    'Portraits naturels d’Olivier, Sorya et Paddy pour donner une vraie dimension humaine au livre.',
    'Détails du voyage : chaussures boueuses, café, cartes, camping-car, nourriture, panneaux, pluie sur les vitres.',
    'Séries cohérentes : montagnes, plages, villages, routes, lumières, parapente, kayak, nuits.',
    'Conserver aussi les photos de mauvais temps : elles raconteront mieux le voyage que 100 % de ciel bleu.'
  ];

  function bEsc(value){
    if(typeof esc === 'function') return esc(value);
    return String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  }

  function sumExpenses(){
    return (state.expenses || []).reduce((sum,row)=>sum + (Number(row?.[1]) || 0),0);
  }

  function itineraryKm(){
    if(typeof totalKm === 'function') return totalKm();
    return (state.itinerary || []).reduce((sum,row)=>sum + (Number(row?.[3]) || 0),0);
  }

  function metric(label,value,sub){
    return `<div class="card kpi"><span class="muted">${bEsc(label)}</span><br><strong>${bEsc(value)}</strong>${sub?`<br><span>${bEsc(sub)}</span>`:''}</div>`;
  }

  function chapterRows(){
    return CHAPTERS.map(ch=>`<article style="display:grid;grid-template-columns:52px minmax(0,1fr);gap:12px;padding:12px 0;border-bottom:1px solid rgba(127,127,127,.18)">
      <div style="font-size:1.35rem;font-weight:800;opacity:.45">${ch[0]}</div>
      <div><h3 style="margin:0 0 4px">${bEsc(ch[1])}</h3><p class="muted" style="margin:0">${bEsc(ch[2])}</p></div>
    </article>`).join('');
  }

  function renderBook(){
    const app = typeof byId === 'function' ? byId('app') : document.getElementById('app');
    if(!app) return;

    const journalCount=(state.journal||[]).length;
    const gpsKm=Number(state.gps?.km||0);
    const expenseCount=(state.expenses||[]).length;
    const itineraryDays=(state.itinerary||[]).length;

    app.innerHTML=`
      <section class="card">
        <p class="eyebrow">LOFOTEN 2026 · LIVRE SOUVENIR · V107</p>
        <h2 style="margin:4px 0 8px">📖 Transformer le roadbook en vrai livre de voyage</h2>
        <p style="max-width:920px">Objectif : à la fin du séjour, produire un <strong>beau livre photo imprimable</strong>, construit à partir du roadbook plutôt qu’un simple export de pages. Le récit combinera journal, itinéraire, cartes, photos, randonnées, météo, statistiques et petites histoires du voyage.</p>
        <div style="padding:12px 14px;border-radius:12px;background:rgba(21,48,71,.08);margin-top:12px"><strong>Concept éditorial :</strong> un carnet de route très visuel, sobre et premium, avec de grandes images, peu de texte par page et les données du roadbook utilisées comme matière narrative.</div>
      </section>

      <div class="grid" style="margin-top:12px">
        ${metric('Étapes déjà structurées',itineraryDays,'dans l’itinéraire')}
        ${metric('Journal',journalCount,'entrées disponibles')}
        ${metric('GPS enregistré',`${gpsKm.toFixed(1)} km`,'trace réelle capturée')}
        ${metric('Budget saisi',`${sumExpenses().toFixed(2)} €`,`${expenseCount} dépenses`)}
      </div>

      <section class="card" style="margin-top:12px">
        <p class="eyebrow">FORMAT CIBLE</p>
        <h2 style="margin:4px 0 8px">Un objet que vous aurez envie de garder</h2>
        <div class="grid">
          <div><h3>Format recommandé</h3><p><strong>Grand carré ≈ 28 × 28 cm</strong> ou paysage proche de A4, couverture rigide, papier photo mat ou satiné. Viser environ <strong>80 à 120 pages</strong> selon le nombre d’images réellement fortes.</p></div>
          <div><h3>Direction artistique</h3><p>Style magazine / Apple Books : beaucoup d’espace, doubles pages panoramiques, typographie simple, cartes fines, petits blocs de données et aucune surcharge décorative.</p></div>
          <div><h3>Rythme</h3><p>Alterner grandes images, séries de 2–4 photos, cartes de progression, pages journal et quelques doubles pages “moment fort”.</p></div>
          <div><h3>Texte</h3><p>Conserver les notes brutes du terrain. À la fin du voyage, elles serviront à générer des textes courts et vrais plutôt qu’un récit reconstruit de mémoire.</p></div>
        </div>
      </section>

      <section class="card" style="margin-top:12px">
        <p class="eyebrow">SOMMAIRE PROVISOIRE</p>
        <h2 style="margin:4px 0 8px">12 chapitres</h2>
        ${chapterRows()}
      </section>

      <section class="card" style="margin-top:12px">
        <p class="eyebrow">À CAPTURER PENDANT LE VOYAGE</p>
        <h2 style="margin:4px 0 8px">📷 La matière qui fera la différence</h2>
        <ul style="padding-left:20px;margin-bottom:0">${PHOTO_THEMES.map(t=>`<li style="margin:7px 0">${bEsc(t)}</li>`).join('')}</ul>
      </section>

      <section class="card" style="margin-top:12px">
        <p class="eyebrow">WORKFLOW FIN DE VOYAGE</p>
        <h2 style="margin:4px 0 8px">Du roadbook au livre imprimé</h2>
        <div class="grid">
          <div><strong>1 · Consolider</strong><p class="muted">Journal, GPS, itinéraire final, budget, randonnées réellement faites, météo et anecdotes.</p></div>
          <div><strong>2 · Sélectionner</strong><p class="muted">Créer une sélection courte d’environ 150–250 photos vraiment fortes, pas des milliers d’images.</p></div>
          <div><strong>3 · Composer</strong><p class="muted">Générer le récit, les légendes, cartes, statistiques et la maquette chapitre par chapitre.</p></div>
          <div><strong>4 · Imprimer</strong><p class="muted">Exporter une version haute définition puis choisir le service d’impression et commander le livre.</p></div>
        </div>
      </section>

      <section class="card" style="margin-top:12px;border-top:4px solid #496a58">
        <h2 style="margin:2px 0 6px">🎯 Le principe à garder pendant le voyage</h2>
        <p style="margin-bottom:0">Ne cherchez pas à “écrire le livre” chaque soir. Continuez simplement à utiliser le roadbook et le journal. <strong>Les petites notes, décisions météo, lieux de nuit et moments inattendus sont exactement ce qui donnera une âme au livre final.</strong></p>
      </section>`;
  }

  const previousShow = show;
  show = function(id){
    if(id !== TAB_ID) return previousShow(id);
    active = id;
    document.querySelectorAll('#nav button').forEach(button => button.classList.toggle('active', button.dataset.tab === id));
    renderBook();
  };
})();