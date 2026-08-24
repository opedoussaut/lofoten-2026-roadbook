'use strict';

// V102 — isolated last-minute ideas.
// This tab is intentionally independent from state.itinerary: nothing shown here
// changes the official roadbook until Olivier explicitly decides to adopt an option.
(function installLastMinuteOptions(){
  if(typeof tabs === 'undefined' || typeof show !== 'function') return;

  const TAB_ID = 'lastminute';
  if(!tabs.some(([id]) => id === TAB_ID)){
    const itineraryIndex = tabs.findIndex(([id]) => id === 'itinerary');
    tabs.splice(itineraryIndex >= 0 ? itineraryIndex + 1 : 2, 0, [TAB_ID, 'Dernière minute']);
  }

  const LAST_MINUTE_OPTIONS = [
    {
      id: 'day1-luneburger-heide',
      tag: 'J1 · pousser sans ferry',
      title: '🌸 Lüneburger Heide — Oberhaverbeck',
      summary: 'Option pour une grosse première journée de route : viser environ 9–10 h de voyage réel, puis finir directement dans la lande en fleurs plutôt que sur une aire d’autoroute.',
      why: [
        'Très faible détour par rapport à la remontée vers Hambourg puis le Danemark.',
        'Fin août correspond normalement à la grande période de floraison de la bruyère.',
        'Balade immédiate au coucher du soleil avec Paddy, sans reprendre le camping-car.'
      ],
      planA: {
        name: 'Parkplatz / Wohnmobilstellplatz Oberhaverbeck',
        status: 'PLAN A · sans réservation',
        badge: 'Premier arrivé, premier servi',
        address: 'Oberhaverbeck, 29646 Bispingen, Allemagne',
        coords: '53.14538, 9.92141',
        price: 'Budget indicatif : env. 15 € / 24 h selon les tarifs affichés sur place',
        details: 'Aire simple au bord immédiat de la lande. Chiens admis. Eau et vidange cassette disponibles ; services plus limités qu’un camping. Emplacements parfois irréguliers : cales utiles.',
        booking: 'Pas de réservation : arriver et prendre une place disponible.',
        maps: 'https://www.google.com/maps/search/?api=1&query=53.14538%2C9.92141',
        source: 'https://stellplatz.info/wohnmobilstellplatz/parkplatz-oberhaverbeck'
      },
      planB: {
        name: 'Hof Bockelmann — Wohnmobil Stellplätze',
        status: 'PLAN B · réservable',
        badge: 'Même secteur, beaucoup plus sécurisant',
        address: 'Oberhaverbeck 1–1a, 29646 Bispingen, Allemagne',
        details: 'Seulement 6 emplacements camping-car, mais réservables. Chaque emplacement a l’électricité ; eau fraîche + vidange, douche/WC, cuisine campeurs, laverie et Wi-Fi. Arrivée à partir de 15 h. Séjour max. 3 nuits.',
        paddy: '🐾 Paddy : animaux autorisés sur l’emplacement camping-car, mais pas dans la partie ferme.',
        booking: 'Réservation / disponibilité directement sur le site officiel du Hof Bockelmann.',
        maps: 'https://www.google.com/maps/search/?api=1&query=Hof+Bockelmann%2C+Oberhaverbeck+1%2C+29646+Bispingen%2C+Germany',
        source: 'https://www.hof-bockelmann.de/wohnmobil-stellplaetze/',
        reserve: 'https://www.hof-bockelmann.de/buchen/',
        park4night: 'https://park4night.com/fr/place/205207'
      },
      strategy: 'Ma stratégie : garder Plan A comme choix n°1 pour le côté spontané et sauvage. Si vous voulez supprimer tout stress après une journée de 850 km environ, réserver Hof Bockelmann ; vous restez pratiquement dans le même décor et pouvez quand même profiter de la Heide.'
    }
  ];

  function lmEsc(value){
    if(typeof esc === 'function') return esc(value);
    return String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  }

  function link(url,label,primary=false){
    return `<a href="${url}" target="_blank" rel="noopener" class="${primary ? 'primary' : ''}" style="display:inline-block;text-decoration:none;margin:4px 6px 4px 0">${lmEsc(label)} ↗</a>`;
  }

  function bulletList(items){
    return `<ul style="margin:8px 0 0;padding-left:20px">${items.map(item => `<li style="margin:5px 0">${lmEsc(item)}</li>`).join('')}</ul>`;
  }

  function optionCard(place, kind){
    const isA = kind === 'A';
    return `<section class="card" style="border-top:4px solid ${isA ? '#496a58' : '#876c3d'}">
      <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start;flex-wrap:wrap">
        <div>
          <p class="eyebrow">${lmEsc(place.status)}</p>
          <h3 style="margin:4px 0 5px">${lmEsc(place.name)}</h3>
          <span style="display:inline-block;padding:4px 9px;border-radius:999px;background:rgba(127,127,127,.12);font-size:.88rem;font-weight:650">${lmEsc(place.badge)}</span>
        </div>
      </div>
      <p style="margin-bottom:6px"><strong>📍 ${lmEsc(place.address)}</strong>${place.coords ? `<br><span class="muted">GPS : ${lmEsc(place.coords)}</span>` : ''}</p>
      ${place.price ? `<p class="muted">${lmEsc(place.price)}</p>` : ''}
      <p>${lmEsc(place.details)}</p>
      ${place.paddy ? `<p>${lmEsc(place.paddy)}</p>` : ''}
      <div style="padding:10px 12px;border-radius:10px;background:rgba(127,127,127,.08);margin:10px 0"><strong>${isA ? 'Réservation' : 'Sécurisation'} :</strong> ${lmEsc(place.booking)}</div>
      <div>
        ${link(place.maps,'Ouvrir dans Maps',true)}
        ${place.reserve ? link(place.reserve,'Réserver / vérifier') : ''}
        ${place.park4night ? link(place.park4night,'Park4Night') : ''}
        ${link(place.source,'Fiche source')}
      </div>
    </section>`;
  }

  function renderLastMinute(){
    const app = typeof byId === 'function' ? byId('app') : document.getElementById('app');
    if(!app) return;

    app.innerHTML = `<section class="card">
      <p class="eyebrow">IDÉES AJOUTÉES À LA DERNIÈRE MINUTE · V102</p>
      <h2 style="margin-bottom:6px">✨ Options de dernière minute</h2>
      <p style="max-width:900px">Zone tampon pour les bonnes idées trouvées juste avant le départ. <strong>Ces options ne modifient pas l’itinéraire officiel</strong> : elles restent ici jusqu’à ce que vous décidiez explicitement d’en intégrer une au roadbook.</p>
    </section>
    ${LAST_MINUTE_OPTIONS.map(option => `<section class="card" style="margin-top:12px">
      <p class="eyebrow">${lmEsc(option.tag)}</p>
      <h2 style="margin-bottom:6px">${lmEsc(option.title)}</h2>
      <p>${lmEsc(option.summary)}</p>
      <h3 style="margin-bottom:4px">Pourquoi elle vaut le coup</h3>
      ${bulletList(option.why)}
      <div class="grid" style="margin-top:14px">
        ${optionCard(option.planA,'A')}
        ${optionCard(option.planB,'B')}
      </div>
      <div style="margin-top:14px;padding:14px 16px;border-radius:12px;background:rgba(21,48,71,.08)">
        <strong>🎯 Décision terrain</strong><br>${lmEsc(option.strategy)}
      </div>
    </section>`).join('')}`;
  }

  const previousShow = show;
  show = function(id){
    if(id !== TAB_ID) return previousShow(id);
    active = id;
    document.querySelectorAll('#nav button').forEach(button => button.classList.toggle('active', button.dataset.tab === id));
    renderLastMinute();
  };
})();
