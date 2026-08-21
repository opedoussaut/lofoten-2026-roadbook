'use strict';

// V103 — comprehensive Lofoten paragliding resource page.
// Research refreshed 21 Aug 2026. The page is intentionally conservative:
// a documented site is evidence of flying activity, never a day-specific go decision.

if (typeof tabs !== 'undefined' && !tabs.some(([id]) => id === 'paragliding')) {
  const kayakIndex = tabs.findIndex(([id]) => id === 'kayak');
  const mapIndex = tabs.findIndex(([id]) => id === 'map');
  tabs.splice(kayakIndex >= 0 ? kayakIndex + 1 : (mapIndex >= 0 ? mapIndex : 4), 0, ['paragliding', 'Parapente']);
}

const PG103_LINKS = {
  visitorRules: 'https://nlf.no/grener/hps/for-visiting-pilots/',
  nlfHps: 'https://nlf.no/grener/hps/',
  nlfUseful: 'https://nlf.no/grener/hps/nyttige-lenker/',
  nlfSafety: 'https://nlf.no/grener/hps/sikkerhet--utdanning/sikkerhetssystemet/',
  nlfLearning: 'https://nlf.no/grener/hps/sikkerhet--utdanning/annet-laremateriell/',
  clubStatus: 'https://nlf.no/grener/hps/klubbsider/klubbrevisjon/',
  calendar: 'https://kalender.nlf.no/',
  haugheia: 'https://nlf.no/en/Nyhetsvisning/2026/haugheia-leknes-lofoten/',
  flightlog: 'https://flightlog.org/',
  flyparaglider: 'https://flyparaglider.com/',
  airspaceMap: 'https://luftrom.info/',
  xcontest: 'https://www.xcontest.org/world/en/',
  avinorAis: 'https://partner.avinor.no/en/ais/homepage/',
  ippc: 'https://ippc.no/ippc/index.jsp',
  windy: 'https://www.windy.com/',
  windfinderLeknes: 'https://www.windfinder.com/forecast/leknes',
  windfinderSvolvaer: 'https://www.windfinder.com/forecast/svolvaer_lufthavn_helle',
  yr: 'https://www.yr.no/en',
  guideArticle: 'https://www.expemag.com/article/livres-et-films/hike-fly-in-lofoten',
  guideShop: 'https://www.auvieuxcampeur.fr/hike-and-fly-in-lofoten.html',
  xcmag: 'https://xcmag.com/magazine-articles/adventure-and-inspiration/love-and-loss-in-the-lofoten-islands/',
  rockOutdoor: 'https://paragliding.rocktheoutdoor.com/voyages/voler-en-parapente-lofoten/',
  festSpot: 'https://xn--vindn-qra.no/paragliding-spot/nordland/v%C3%A5gan/kabelv%C3%A5g-lofoten-henningsv%C3%A6r---festv%C3%A5gtinden-b8f3cc',
  festHike: 'https://visitlofoten.com/en/guide/festvagtinden-541-m/',
  glomtindReport: 'https://gjeldnes.com/2015/06/30/flying-and-climbing-lofoten/',
  help113: 'https://norskluftambulanse.no/en/hjelp113/'
};

const PG103_SPOTS = [
  {
    name: 'Haugheia · Leknes',
    status: 'CURRENT LOCAL EVIDENCE',
    tone: 'good',
    area: 'Vestvågøy',
    summary: 'NLF published “Haugheia, Leknes, Lofoten — flying on Haugheia” on 5 Aug 2026. This is the strongest current public signal in our research that local HPS activity is happening here.',
    use: 'First place to investigate locally because the evidence is current. Must still verify the precise launch, landing, site rules and the Leknes TIZ procedure with local pilots.',
    mapQuery: 'Haugheia Leknes Lofoten Norway',
    links: [[PG103_LINKS.haugheia, 'NLF · Haugheia 05/08/2026'], [PG103_LINKS.nlfHps, 'NLF HPS news']]
  },
  {
    name: 'Festvågtinden · Henningsvær',
    status: 'DOCUMENTED PG SITE',
    tone: 'good',
    area: 'Austvågøy',
    summary: 'Flightlog-derived site information describes a launch above Henningsvær around 520 m. A published Lofoten PG expedition also records a spectacular flight following the ridges toward Kallestranda, Rørvikstranda and Lyngværstranda.',
    use: 'High-value site to research, but the hike itself is steep, eroded and exposed in places. Crowds, loose rock, launch geometry, rotor and the Svolvær/Helle TIZ all matter.',
    mapQuery: 'Festvågtinden Henningsvær Norway',
    links: [[PG103_LINKS.festSpot, 'Flightlog-derived site page'], [PG103_LINKS.festHike, 'Official hike info'], [PG103_LINKS.rockOutdoor, 'French expedition report']]
  },
  {
    name: 'Glomtind / Glåmtinden',
    status: 'HISTORIC FLYING EVIDENCE',
    tone: 'warn',
    area: 'Austvågøy',
    summary: 'A 2015 pilot report covering Svolvær–Leknes calls Glomtind the main launch used during a week of speedflying and foot-launch flying.',
    use: 'Useful terrain reference and a candidate for local validation. Treat the old report as evidence only, not as current site authorization or a modern PG site briefing.',
    mapQuery: 'Glåmtinden Lofoten Norway',
    links: [[PG103_LINKS.glomtindReport, 'Pilot report']]
  },
  {
    name: 'Vikten',
    status: 'TRIP-REPORT DISCOVERY',
    tone: 'warn',
    area: 'Flakstadøy',
    summary: 'The Rock The Outdoor Lofoten expedition describes a quiet area near Vikten reached by an easy hike with a broad grassy take-off and sea views. The authors deliberately avoid publishing an exact launch.',
    use: 'A good candidate to ask locals about. Respect the deliberate lack of precise public coordinates and do not reverse-engineer a launch without land/site validation.',
    mapQuery: 'Vikten Flakstad Lofoten Norway',
    links: [[PG103_LINKS.rockOutdoor, 'Expedition report']]
  },
  {
    name: 'Sautinden · Laupstad',
    status: 'EXPEDITION AREA',
    tone: 'warn',
    area: 'Austvågøy',
    summary: 'Sautinden/Laupstad appears in Lofoten hike-and-fly expedition material. It is mountain terrain where orientation, sea breeze and lee-side effects can change quickly.',
    use: 'Scout only after checking recent Flightlog/Flyparaglider activity and asking the local club for current launch/landing knowledge.',
    mapQuery: 'Sautinden Laupstad Norway',
    links: [[PG103_LINKS.rockOutdoor, 'Expedition report'], [PG103_LINKS.flightlog, 'Search Flightlog']]
  },
  {
    name: 'Volandstinden · Fredvang / Ramberg',
    status: 'VIDEO TERRAIN REFERENCE',
    tone: 'warn',
    area: 'Flakstadøy',
    summary: 'Corey Symes published a hike-and-fly / speedflying video from Volandstinden (457 m) with useful local terrain and weather-resource context.',
    use: 'Excellent visual reconnaissance. Speedflying footage does not automatically establish suitability for a normal paraglider, so confirm everything independently.',
    mapQuery: 'Volandstinden Lofoten Norway',
    links: [['https://www.youtube.com/watch?v=uLfrSaX2aX0', 'Watch Volandstinden video']]
  },
  {
    name: 'Gimsøy / Hov',
    status: 'SCOUTING AREA ONLY',
    tone: 'neutral',
    area: 'Gimsøy',
    summary: 'Very useful roadbook observation zone because we already spend time around Hov and can see the wind, cloud base and coastal flow without committing to a hike.',
    use: 'Do not treat as a verified launch. Use it to meet/localize pilots, observe conditions and cross-check Flightlog/Flyparaglider.',
    mapQuery: 'Hov Gimsøy Lofoten Norway',
    links: [[PG103_LINKS.flightlog, 'Flightlog'], [PG103_LINKS.flyparaglider, 'Flyparaglider']]
  },
  {
    name: 'Haukland / Uttakleiv',
    status: 'SCOUTING AREA ONLY',
    tone: 'neutral',
    area: 'Vestvågøy',
    summary: 'Spectacular coastal relief and large visual landing areas, but the west coast is exposed to maritime wind, acceleration, rotor and rapidly changing cloud.',
    use: 'Great place to understand the day’s coastal flow; not a launch recommendation. The Leknes airspace environment also needs checking.',
    mapQuery: 'Haukland Beach Lofoten Norway',
    links: [[PG103_LINKS.airspaceMap, 'NLF airspace map'], [PG103_LINKS.windfinderLeknes, 'Leknes wind']]
  },
  {
    name: 'Andøya · Bleik / Stave',
    status: 'EXTENSION / LOCAL VALIDATION',
    tone: 'neutral',
    area: 'Andøya',
    summary: 'Andøya is covered by the dedicated Hike & Fly in Lofoten guidebook and has dramatic coastal terrain. It belongs in our resource map if the roadtrip extends north.',
    use: 'Use the guidebook plus Vesterålen/local pilot knowledge. Maritime wind and exposed terrain make a local briefing especially valuable.',
    mapQuery: 'Bleik Andøya Norway',
    links: [[PG103_LINKS.guideArticle, '39-route guidebook overview'], [PG103_LINKS.clubStatus, 'Current club status']]
  }
];

function pg103esc(v) {
  return typeof esc === 'function' ? esc(v) : String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}

function pg103link(url, label, primary=false) {
  return `<a class="btn ${primary ? 'primary' : ''}" href="${url}" target="_blank" rel="noopener">${label} ↗</a>`;
}

function pg103pill(text, tone='neutral') {
  const bg = tone === 'good' ? 'rgba(35,140,80,.14)' : tone === 'warn' ? 'rgba(190,120,0,.15)' : 'rgba(21,48,71,.08)';
  return `<span style="display:inline-block;padding:4px 8px;border-radius:999px;background:${bg};font-size:.82em;font-weight:750;letter-spacing:.02em;margin:2px 4px 2px 0">${text}</span>`;
}

function pg103mapLink(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function pg103video(id, title, why, featured=false) {
  return `<article class="card" style="margin-top:12px;${featured ? 'border:2px solid rgba(35,140,80,.35)' : ''}">
    <div style="position:relative;width:100%;aspect-ratio:16/9;border-radius:12px;overflow:hidden;background:#000;margin-bottom:12px">
      <iframe src="https://www.youtube-nocookie.com/embed/${id}" title="${pg103esc(title)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe>
    </div>
    <h3 style="margin-bottom:6px">${featured ? '⭐ ' : '🎬 '}${pg103esc(title)}</h3>
    <p class="muted">${pg103esc(why)}</p>
    ${pg103link(`https://www.youtube.com/watch?v=${id}`, 'Ouvrir sur YouTube', featured)}
  </article>`;
}

function pg103spotCard(s) {
  const sourceLinks = s.links.map(([url,label], i) => pg103link(url, label, i === 0)).join('');
  return `<article class="card" style="margin-top:12px">
    <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start;flex-wrap:wrap">
      <div><h3 style="margin-bottom:4px">🪂 ${pg103esc(s.name)}</h3><p class="muted" style="margin-top:0">${pg103esc(s.area)}</p></div>
      <div>${pg103pill(s.status, s.tone)}</div>
    </div>
    <p>${pg103esc(s.summary)}</p>
    <p class="muted"><strong>Comment l'utiliser :</strong> ${pg103esc(s.use)}</p>
    <div class="toolbar">${pg103link(pg103mapLink(s.mapQuery), '📍 Carte')}${sourceLinks}</div>
  </article>`;
}

function renderParagliding() {
  const app = byId('app');
  if (!app) return;

  const spots = PG103_SPOTS.map(pg103spotCard).join('');

  app.innerHTML = `
    <section class="card">
      <div style="display:flex;justify-content:space-between;gap:16px;align-items:flex-start;flex-wrap:wrap">
        <div style="max-width:900px">
          <p class="eyebrow">LOFOTEN 2026 · HIKE & FLY · AIRSPACE · MÉTÉO · VIDÉOS</p>
          <h1 style="margin-bottom:8px">🪂 Parapente — centre de ressources</h1>
          <p>Cette page sert à <strong>préparer et décider</strong>, pas à déclarer un site “flyable”. Aux Lofoten, relief maritime, brises, accélérations, rotors, plafonds bas et espace aérien autour de Leknes/Svolvær peuvent transformer une belle montagne en mauvais choix.</p>
        </div>
        <div>${pg103link(PG103_LINKS.visitorRules, '🇳🇴 Règles NLF visiteurs', true)}</div>
      </div>
      <div class="popup-warning" style="margin-top:12px"><strong>Principe du roadbook :</strong> un spot documenté prouve qu'on y a volé, pas que l'on peut y voler aujourd'hui. Validation locale + airspace/NOTAM + météo réelle + décollage + atterrissage restent obligatoires avant toute décision.</div>
    </section>

    <div class="grid" style="margin-top:12px">
      <section class="card">
        <h3>⭐ Ressource n°1 : topo dédié Lofoten</h3>
        <p><strong>Hike & Fly in Lofoten — Myrtille Heissat (2025)</strong></p>
        <p>Topo de <strong>118 pages avec 39 itinéraires</strong> Lofoten + Andøya, conçu spécifiquement pour la randonnée et le vol. C'est la meilleure base pour passer d'un simple pin de carte à un vrai projet hike-and-fly.</p>
        <div class="toolbar">
          ${pg103link(PG103_LINKS.guideArticle, 'Présentation du topo', true)}
          ${pg103link(PG103_LINKS.guideShop, 'Vieux Campeur')}
          ${pg103link(PG103_LINKS.xcmag, 'Cross Country · histoire du guide')}
        </div>
      </section>

      <section class="card">
        <h3>🤝 Local knowledge 2026</h3>
        <p><strong>Lofoten Paragliderklubb</strong> est listé par NLF comme <strong>nouveau et opérationnel</strong>. Un cours PP2 du club a encore été organisé en juillet 2026.</p>
        <p><strong>Vesterålen Paragliderklubb</strong> est également listé opérationnel, utile pour Andøya/Vesterålen.</p>
        <p class="muted">Priorité : trouver un pilote local avant un nouveau site. Un message ou une rencontre vaut davantage qu'une ancienne trace GPS.</p>
        <div class="toolbar">
          ${pg103link(PG103_LINKS.clubStatus, 'Statut clubs NLF', true)}
          ${pg103link(PG103_LINKS.calendar, 'Calendrier NLF')}
          ${pg103link(PG103_LINKS.nlfHps, 'Actualités HPS')}
        </div>
      </section>
    </div>

    <section class="card" style="margin-top:12px">
      <h3>🪪 Pour voler en Norvège comme pilote français</h3>
      <div class="table-wrap"><table>
        <thead><tr><th>À avoir / vérifier</th><th>Ce que dit la source officielle NLF</th><th>Action roadtrip</th></tr></thead>
        <tbody>
          <tr><td><strong>Licence valide</strong></td><td>Un pilote étranger visiteur membre d'une organisation étrangère et titulaire d'une licence valide peut voler comme guest pilot jusqu'à 6 mois.</td><td>Licence accessible hors ligne + originale si possible.</td></tr>
          <tr><td><strong>IPPI</strong></td><td>La Norvège reconnaît le système IPPI.</td><td>Prendre la carte IPPI si disponible avec la licence française.</td></tr>
          <tr><td><strong>Assurance RC tiers</strong></td><td>Preuve de third-party insurance à présenter sur demande.</td><td>PDF hors ligne + numéro d'assistance.</td></tr>
          <tr><td><strong>Règles locales</strong></td><td>Le pilote reste soumis aux lois/règles norvégiennes et aux restrictions d'espace aérien.</td><td>Club local + Flightlog/Flyparaglider avant chaque nouveau site.</td></tr>
        </tbody>
      </table></div>
      <div class="toolbar" style="margin-top:10px">${pg103link(PG103_LINKS.visitorRules, 'Source officielle NLF', true)}${pg103link(PG103_LINKS.nlfSafety, 'Système sécurité / réglementation')}</div>
    </section>

    <section class="card" style="margin-top:12px">
      <h3>✈️ Espace aérien : point critique aux Lofoten</h3>
      <p>Les AIP 2026 publiées par Avinor montrent notamment <strong>LEKNES TIZ</strong> et <strong>SVOLVÆR/HELLE TIZ</strong> jusqu'à <strong>3 500 ft AMSL</strong> (classe G). Ne pas interpréter “classe G” comme “je peux décoller sans procédure” : les exigences applicables pendant les horaires AFIS doivent être vérifiées dans l'AIP du jour.</p>
      <div style="padding:12px;border-radius:10px;background:rgba(190,120,0,.12);margin:10px 0">
        <strong>Avant chaque vol :</strong> 1) NLF/HPS airspace map pour la vue d'ensemble → 2) Avinor AIS/AIP pour la règle → 3) IPPC pour les NOTAM et restrictions temporaires → 4) confirmation locale si un TIZ/CTR ou une procédure radio est concerné.
      </div>
      <div class="toolbar">
        ${pg103link(PG103_LINKS.airspaceMap, '🗺️ NLF/HPS airspace map', true)}
        ${pg103link(PG103_LINKS.avinorAis, '✈️ Avinor AIS / AIP')}
        ${pg103link(PG103_LINKS.ippc, '🚨 IPPC / NOTAM')}
      </div>
    </section>

    <section class="card" style="margin-top:12px">
      <h3>🌦️ Météo — croiser modèle + observation</h3>
      <div class="table-wrap"><table>
        <thead><tr><th>Outil</th><th>À quoi il sert</th><th>À regarder</th></tr></thead>
        <tbody>
          <tr><td><strong>Windy</strong></td><td>Comparer l'évolution spatiale et les modèles.</td><td>Vent surface/altitude, rafales, nuages bas, pluie, fronts.</td></tr>
          <tr><td><strong>Windfinder Leknes</strong></td><td>Prévision + station locale.</td><td>Écart prévision/observation, rafales et bascule de direction.</td></tr>
          <tr><td><strong>Windfinder Svolvær/Helle</strong></td><td>Très utile côté Austvågøy.</td><td>Vent observé à l'aéroport, tendances et rafales.</td></tr>
          <tr><td><strong>Yr</strong></td><td>Météo norvégienne grand public.</td><td>Pluie, nuages, évolution horaire ; jamais seul pour décider d'un vol.</td></tr>
          <tr><td><strong>Observation terrain</strong></td><td>La couche qui tranche.</td><td>Nuages sur les crêtes, mer, fumées/drapeaux, cycles, moutons, dérive, rotor.</td></tr>
        </tbody>
      </table></div>
      <div class="toolbar" style="margin-top:10px">
        ${pg103link(PG103_LINKS.windy, '🌬️ Windy', true)}
        ${pg103link(PG103_LINKS.windfinderLeknes, 'Leknes · Windfinder')}
        ${pg103link(PG103_LINKS.windfinderSvolvaer, 'Svolvær/Helle · Windfinder')}
        ${pg103link(PG103_LINKS.yr, 'Yr')}
        ${pg103link(PG103_LINKS.nlfLearning, 'NLF · comprendre les données météo')}
      </div>
    </section>

    <section class="card" style="margin-top:12px">
      <h3>🧭 Sites & secteurs à investiguer</h3>
      <p class="muted"><strong>Le code couleur porte sur la qualité de l'évidence publique, jamais sur la sécurité du vol.</strong> “Current local evidence” = activité récente documentée ; “documented” = historique de vol public ; “scouting” = zone intéressante à observer seulement.</p>
    </section>
    ${spots}

    <section class="card" style="margin-top:12px">
      <h3>🔎 Où chercher les traces, décos et infos locales</h3>
      <div class="grid">
        <div><p><strong>Flightlog.org</strong><br><span class="muted">Base historique norvégienne. NLF la cite encore comme ressource officielle utile.</span></p>${pg103link(PG103_LINKS.flightlog, 'Flightlog', true)}</div>
        <div><p><strong>Flyparaglider</strong><br><span class="muted">Autre ressource explicitement recommandée dans les liens HPS de NLF.</span></p>${pg103link(PG103_LINKS.flyparaglider, 'Flyparaglider')}</div>
        <div><p><strong>XContest</strong><br><span class="muted">Chercher les vols récents dans le rayon Lofoten/Andøya et identifier les pilotes actifs.</span></p>${pg103link(PG103_LINKS.xcontest, 'XContest')}</div>
        <div><p><strong>Rock The Outdoor</strong><br><span class="muted">Très bon récit français : Festvågtinden, Vikten et autres secteurs avec retours réels de terrain.</span></p>${pg103link(PG103_LINKS.rockOutdoor, 'Lire le reportage')}</div>
      </div>
      <div class="toolbar" style="margin-top:10px">${pg103link(PG103_LINKS.nlfUseful, 'Tous les liens utiles NLF', true)}</div>
    </section>

    <section class="card" style="margin-top:12px">
      <p class="eyebrow">À REGARDER AVANT DE PARTIR</p>
      <h2>🎥 Vidéos utiles Lofoten</h2>
      <p>La vidéo est particulièrement utile ici pour comprendre <strong>l'échelle du relief, les formes de décollage, la proximité de la mer, les lignes de crête et les atterrissages</strong>. Elle complète les topos mais ne remplace pas le briefing du jour.</p>
    </section>

    ${pg103video('Wqjq_auvHB8', 'Vidéo Lofoten — repère prioritaire', 'Vidéo que tu as identifiée comme particulièrement utile. Elle est intégrée directement dans le roadbook pour pouvoir la retrouver immédiatement pendant la préparation.', true)}
    ${pg103video('lqKpVlT_CuQ', 'Lofoten, Norway — Hike and fly Paragliding', 'Vidéo d’Adam Holm (2016). Bonne reconnaissance visuelle de l’ambiance hike-and-fly et du terrain lofotien.')}
    ${pg103video('uLfrSaX2aX0', 'Hike and Fly Lofoten — Volandstinden', 'Corey Symes : terrain autour de Volandstinden/Fredvang-Ramberg et ressources météo locales citées dans la description. Attention : la vidéo est aussi orientée speedflying.')}

    <div class="grid" style="margin-top:12px">
      <section class="card">
        <h3>✅ Workflow GO / NO-GO</h3>
        <p><strong>1.</strong> Site / propriétaire / restrictions locales confirmés.</p>
        <p><strong>2.</strong> Atterrissage identifié <em>avant</em> la montée + plan B.</p>
        <p><strong>3.</strong> Airspace NLF puis AIP Avinor puis NOTAM IPPC.</p>
        <p><strong>4.</strong> Prévision comparée sur plusieurs modèles.</p>
        <p><strong>5.</strong> Vent réellement observé près du secteur.</p>
        <p><strong>6.</strong> Nuages / pluie / plafond / évolution du front.</p>
        <p><strong>7.</strong> Orientation du relief : vent météo + brise de mer + rotor potentiel.</p>
        <p><strong>8.</strong> Décision au déco indépendante du fait d'avoir porté la voile jusque-là.</p>
      </section>

      <section class="card">
        <h3>🛑 Raisons simples de renoncer</h3>
        <p>• Écart important entre météo prévue et vent observé.</p>
        <p>• Vent travers / arrière / rafaleux ou déco sous le vent.</p>
        <p>• Nuages qui collent ou descendent sur les crêtes.</p>
        <p>• Pluie ou front approchant.</p>
        <p>• Atterrissage non confirmé ou déjà trop turbulent.</p>
        <p>• Doute sur TIZ / NOTAM / procédure radio.</p>
        <p>• Nouveau site sans information locale récente.</p>
        <p class="muted">Aux Lofoten, redescendre à pied reste toujours un plan parfaitement valide.</p>
      </section>
    </div>

    <div class="grid" style="margin-top:12px">
      <section class="card">
        <h3>🎒 Kit hike & fly à ne pas oublier</h3>
        <p>Licence + IPPI + assurance hors ligne · casque · secours contrôlé · téléphone chargé · batterie externe · carte offline · couche chaude / imperméable · gants · eau / calories · mini trousse de secours · moyen fiable de partager la position.</p>
        <p class="muted">Si une radio aéronautique devait être nécessaire pour une procédure, vérifier droits, fréquence et procédure avec le club/AFIS ; ne pas improviser une utilisation VHF.</p>
      </section>

      <section class="card">
        <h3>🆘 Urgence Norvège</h3>
        <p><strong>110</strong> incendie · <strong>112</strong> police / secours · <strong>113</strong> ambulance / urgence médicale.</p>
        <p><strong>Hjelp 113</strong> (Norsk Luftambulanse) affiche les coordonnées et centralise les numéros d'urgence. Très utile avec un numéro étranger ; l'app peut être installée avant le voyage et le numéro étranger activé une fois en Norvège.</p>
        ${pg103link(PG103_LINKS.help113, 'Installer / comprendre Hjelp 113', true)}
      </section>
    </div>

    <section class="card" style="margin-top:12px">
      <h3>📌 Notre stratégie pendant le roadtrip</h3>
      <p><strong>Le parapente reste opportuniste.</strong> On ne dégrade pas l'itinéraire pour poursuivre une prévision incertaine. Quand un créneau apparaît, on ouvre cette page, regarde d'abord Haugheia / Flightlog / local pilots, puis espace aérien, météo et seulement ensuite un sommet potentiel.</p>
      <p class="muted">Recherche actualisée le 21/08/2026. Les règles, NOTAM, accès aux terrains et conditions changent : les sources officielles et informations locales du jour ont toujours priorité.</p>
    </section>`;
}

if (typeof show === 'function') {
  const pg103PreviousShow = show;
  show = function(id) {
    if (id !== 'paragliding') return pg103PreviousShow(id);
    active = id;
    document.querySelectorAll('#nav button').forEach(button => button.classList.toggle('active', button.dataset.tab === id));
    renderParagliding();
  };
}
