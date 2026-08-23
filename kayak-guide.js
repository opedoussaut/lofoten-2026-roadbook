'use strict';

// Calm-water kayaking guide for the Lofoten roadbook.
// Core prices and rental conditions checked for the 2026 trip on 12 Aug 2026.
// Haukland Beach 2-person sit-on-top option checked and added on 23 Aug 2026.

if (typeof tabs !== 'undefined' && !tabs.some(([id]) => id === 'kayak')) {
  const droneIndex = tabs.findIndex(([id]) => id === 'drone');
  const mapIndex = tabs.findIndex(([id]) => id === 'map');
  const insertAt = droneIndex >= 0 ? droneIndex + 1 : (mapIndex >= 0 ? mapIndex + 1 : 4);
  tabs.splice(insertAt, 0, ['kayak', 'Kayak']);
}

const KAYAK_LINKS = {
  visitLofoten: 'https://visitlofoten.com/en/topic/kayaking-in-lofoten/',
  lofotenDivingRental: 'https://lofoten-diving.no/book-kayak-rental-in-lofoten/',
  lofotenDivingTour: 'https://booking.visitlofoten.com/experiences/vestvagoy/lofoten-diving/half-day-kayak-tour-in-lofoten/107694',
  lofotenAktiv: 'https://www.lofoten-aktiv.no/en/kayak-trips/kayak-rental',
  sagaReine: 'https://booking.visitlofoten.com/experiences/moskenes/saga-adventures-lofoten/explore-reine-fjord-by-kayak?lang=en',
  reineRorbuer2h: 'https://visitlofoten.com/en/activity/kayak-trip/evening-tour-with-kayak-from-reine/',
  reineRorbuer3h: 'https://visitlofoten.com/en/activity/water-activities/3-hour-morning-or-evening-guided-kayak-tour-summer/',
  henningsvaer: 'https://booking.visitlofoten.com/experiences/vagan/xxlofoten/natursafari-kajakk-henningsvaer?lang=en',
  svolvaer: 'https://booking.visitlofoten.com/experiences/vagan/xxlofoten/kajakktur-fra-svolvaer/118472?lang=en',
  reinePaddlingFaq: 'https://reinepaddling.no/en/contact/faq/',
  hauklandTandem: 'https://www.hauklandbeach.no/sit-on-kayak-2-person.html',
  hauklandBooking: 'https://www.hauklandbeach.no/bookactivity.html'
};

function kayakLink(url, label, primary=false) {
  return `<a href="${url}" target="_blank" rel="noopener" class="${primary ? 'primary' : ''}" style="display:inline-block;text-decoration:none;margin:4px 6px 4px 0">${label} ↗</a>`;
}

function kayakPill(text, tone='neutral') {
  const bg = tone === 'good' ? 'rgba(35,140,80,.14)' : tone === 'warn' ? 'rgba(190,120,0,.14)' : 'rgba(21,48,71,.08)';
  return `<span style="display:inline-block;padding:4px 8px;border-radius:999px;background:${bg};font-size:.9em;font-weight:650;margin:2px 4px 2px 0">${text}</span>`;
}

function renderKayak() {
  const app = byId('app');
  if (!app) return;

  app.innerHTML = `
    <section class="card">
      <div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start;flex-wrap:wrap">
        <div>
          <p class="eyebrow">EAUX CALMES · LOCATION · GUIDES · PLAN MÉTÉO</p>
          <h2 style="margin-bottom:6px">🛶 Kayak — meilleurs spots des Lofoten</h2>
          <p class="muted" style="max-width:900px">Priorité aux fjords, ports et archipels abrités. L'objectif n'est pas de chercher la mer ouverte : même un endroit réputé calme doit être validé le jour même selon vent, rafales, courant, trafic et température de l'eau.</p>
        </div>
        <div style="min-width:235px">
          ${kayakLink(KAYAK_LINKS.visitLofoten, 'Guide kayak Visit Lofoten', true)}
        </div>
      </div>
    </section>

    <div class="grid" style="margin-top:12px">
      <section class="card">
        <h3>⭐ Notre plan recommandé</h3>
        <p><strong>1 — Ballstad en autonomie, si certification acceptée</strong><br>Kayak double Lofoten Diving · 4 h · <strong>700 NOK total pour 2</strong>.</p>
        <p><strong>2 — Reinefjord avec guide</strong><br>Saga Adventures · 3 h · <strong>1 175 NOK / personne</strong>.</p>
        <p><strong>3 — Haukland Beach, sit-on-top tandem à deux</strong><br>Option très simple à garder sous le coude quand la mer est vraiment calme. Hauklandstranda propose officiellement un <strong>sit-on-top 2 personnes</strong>; prix, durée et éventuelles exigences d'expérience sont à confirmer au moment de la réservation.</p>
        <div style="padding:12px;border-radius:10px;background:rgba(35,140,80,.12);margin-top:10px">
          <strong>Budget du combo Ballstad + Reine : 3 050 NOK pour 2.</strong><br>
          <span class="muted">Une sortie libre et économique dans l'archipel protégé de Ballstad + une sortie iconique à Reine avec un guide local. Haukland reste un bonus spontané si les conditions sont parfaites.</span>
        </div>
        <div style="margin-top:10px">
          ${kayakLink(KAYAK_LINKS.lofotenDivingRental, 'Lofoten Diving — location', true)}
          ${kayakLink(KAYAK_LINKS.sagaReine, 'Saga — Reinefjord')}
          ${kayakLink(KAYAK_LINKS.hauklandTandem, 'Haukland — sit-on-top 2 pers.')}
        </div>
      </section>

      <section class="card">
        <h3>🪪 Peut-on louer sans guide ?</h3>
        <p><strong>Pour les kayaks de mer autonomes vérifiés à Ballstad et Kabelvåg, une qualification reconnue est demandée.</strong></p>
        <p>${kayakPill('NPF WetCard 16 h', 'good')} ${kayakPill('EPP2', 'good')} ${kayakPill('BCU 2-Star / Coastal', 'good')} ${kayakPill('ou équivalent', 'good')}</p>
        <p>Si tu as un brevet français ou une autre certification, <strong>envoyer une copie au loueur avant le voyage</strong> et demander confirmation écrite de l'équivalence.</p>
        <p><strong>Haukland :</strong> la page officielle confirme la location d'un sit-on-top 2 personnes mais n'affiche pas, dans les informations publiques vérifiées, les exigences de qualification. <strong>À confirmer directement avant de compter dessus.</strong></p>
        <p class="muted">Sans certification reconnue pour un kayak de mer : prévoir une sortie guidée. Le sit-on-top de Haukland est une option distincte, à valider selon les règles du loueur et surtout les conditions du jour.</p>
      </section>
    </div>

    <section class="card" style="margin-top:12px">
      <h3>🏆 Spots à privilégier pour de l'eau calme</h3>
      <div class="table-wrap"><table>
        <thead><tr><th>Priorité</th><th>Zone</th><th>Calme potentiel</th><th>Pourquoi</th><th>Format conseillé</th></tr></thead>
        <tbody>
          <tr><td>1</td><td><strong>Reinefjord</strong></td><td>★★★★½</td><td>Paysage maximal, relief très spectaculaire, sections bien abritées.</td><td>Guidé pour une première découverte ; Reine–Sakrisøy–Hamnøy.</td></tr>
          <tr><td>2</td><td><strong>Henningsvær harbour</strong></td><td>★★★★★</td><td>Port intérieur et chenaux protégés, très photogéniques.</td><td>Guidé ; excellent premier paddle.</td></tr>
          <tr><td>3</td><td><strong>Ballstad archipelago</strong></td><td>★★★★½</td><td>Petites îles et passages permettant d'adapter la route au vent.</td><td><strong>Meilleur choix autonome</strong> si certification acceptée.</td></tr>
          <tr><td>4</td><td><strong>Ørsvågvær / Sandvika</strong></td><td>★★★★½</td><td>Criques, petites plages et îlots près de Kabelvåg.</td><td>Autonome si qualifié, rester côté sous le vent.</td></tr>
          <tr><td>5</td><td><strong>Svolvær harbour</strong></td><td>★★★★★</td><td>Très bon plan B, accès immédiat et zones protégées.</td><td>Guidé facile ; surveiller le trafic bateau.</td></tr>
          <tr><td>Bonus</td><td><strong>Haukland Beach</strong></td><td>★★ selon météo</td><td>Location tandem sit-on-top directement à la plage, très pratique, mais côte ouest exposée à la houle et au vent.</td><td><strong>Seulement par mer calme</strong>, rester près du rivage et suivre les consignes du loueur.</td></tr>
          <tr><td>—</td><td><strong>Unstad / Uttakleiv / côte ouest</strong></td><td>★–★★</td><td>Face à l'océan, houle et exposition supérieures.</td><td><strong>À éviter</strong> si le critère principal est l'eau calme.</td></tr>
        </tbody>
      </table></div>
    </section>

    <section class="card" style="margin-top:12px">
      <h3>💳 Location sans guide — prix 2026</h3>
      <div class="table-wrap"><table>
        <thead><tr><th>Opérateur</th><th>Base</th><th>Single</th><th>Double</th><th>Durée</th><th>Conditions importantes</th></tr></thead>
        <tbody>
          <tr>
            <td><strong>Lofoten Diving</strong></td><td>Ballstad</td><td>500 NOK / 4 h<br>1 000 NOK / 24 h</td><td><strong>700 NOK / 4 h</strong><br>1 200 NOK / 24 h</td><td>4 h ou 24 h</td>
            <td>Certification + expérience requises, savoir nager, PFD obligatoire. <strong>Notre choix pour un tandem autonome à deux.</strong></td>
          </tr>
          <tr>
            <td><strong>Lofoten Aktiv</strong></td><td>Kabelvåg</td><td>635 NOK / jour</td><td>1 270 NOK / jour</td><td>1–7 jours</td>
            <td>Certification reconnue. En été, au moins un kayak single pour chaque double : <strong>deux personnes seules ne peuvent donc pas simplement partir avec un seul double.</strong></td>
          </tr>
          <tr>
            <td><strong>Hauklandstranda AS</strong></td><td>Haukland Beach</td><td>—</td><td><strong>Sit-on-top 2 personnes</strong></td><td>À vérifier</td>
            <td>Option officielle directement à Haukland. Tarif et exigences non affichés sur la page publique vérifiée. Côte exposée : <strong>option uniquement par conditions calmes</strong>. Tél. (+47) 408 49 949.</td>
          </tr>
        </tbody>
      </table></div>
      <div style="margin-top:10px">
        ${kayakLink(KAYAK_LINKS.lofotenDivingRental, 'Réserver Lofoten Diving', true)}
        ${kayakLink(KAYAK_LINKS.lofotenAktiv, 'Lofoten Aktiv')}
        ${kayakLink(KAYAK_LINKS.hauklandTandem, 'Haukland — tandem sit-on-top')}
        ${kayakLink(KAYAK_LINKS.hauklandBooking, 'Haukland — disponibilités')}
      </div>
    </section>

    <section class="card" style="margin-top:12px">
      <h3>🧭 Sorties guidées — prix 2026</h3>
      <div class="table-wrap"><table>
        <thead><tr><th>Zone</th><th>Opérateur</th><th>Prix / pers.</th><th>Durée</th><th>Pour nous</th></tr></thead>
        <tbody>
          <tr><td><strong>Reinefjord</strong></td><td>Saga Adventures</td><td><strong>1 175 NOK</strong></td><td>3 h</td><td>🥇 Meilleur compromis paysage / prix. Guide adapte le parcours aux conditions.</td></tr>
          <tr><td><strong>Reine</strong></td><td>Reine Rorbuer</td><td>1 200 NOK</td><td>2 h</td><td>Drysuit, bottes étanches, PFD et dry bag explicitement inclus.</td></tr>
          <tr><td><strong>Reine</strong></td><td>Reine Rorbuer</td><td>1 400 NOK</td><td>3 h</td><td>Plus de temps sur l'eau, même avantage équipement thermique.</td></tr>
          <tr><td><strong>Henningsvær</strong></td><td>XXLofoten</td><td>1 095 NOK</td><td>2 h</td><td>Très beau port et chenaux, tandem stable, bon choix calme.</td></tr>
          <tr><td><strong>Svolvær</strong></td><td>XXLofoten</td><td>1 095 NOK</td><td>2 h</td><td>Niveau Easy, excellent fallback si la météo est moyenne.</td></tr>
          <tr><td><strong>Ballstad</strong></td><td>Lofoten Diving</td><td>1 290 NOK</td><td>3 h</td><td>Très bon choix guidé dans l'archipel protégé.</td></tr>
        </tbody>
      </table></div>
      <div style="margin-top:10px">
        ${kayakLink(KAYAK_LINKS.sagaReine, 'Saga — Reinefjord', true)}
        ${kayakLink(KAYAK_LINKS.reineRorbuer2h, 'Reine Rorbuer — 2 h')}
        ${kayakLink(KAYAK_LINKS.reineRorbuer3h, 'Reine Rorbuer — 3 h')}
        ${kayakLink(KAYAK_LINKS.henningsvaer, 'XXLofoten — Henningsvær')}
        ${kayakLink(KAYAK_LINKS.svolvaer, 'XXLofoten — Svolvær')}
        ${kayakLink(KAYAK_LINKS.lofotenDivingTour, 'Lofoten Diving — guidé')}
      </div>
    </section>

    <div class="grid" style="margin-top:12px">
      <section class="card">
        <h3>🌦️ Décision le jour J</h3>
        <p><strong>Certification confirmée + journée calme :</strong><br>Ballstad, double 4 h.</p>
        <p><strong>Mer parfaitement calme à Haukland :</strong><br>le sit-on-top tandem devient une excellente activité bonus, très facile à décider au dernier moment.</p>
        <p><strong>Pas de certification reconnue :</strong><br>Reinefjord guidé ; Ballstad guidé si on veut une deuxième session. Vérifier séparément les conditions de location du sit-on-top à Haukland.</p>
        <p><strong>Météo moyenne mais envie de pagayer :</strong><br>Svolvær ou Henningsvær avec guide.</p>
        <p><strong>Vent / houle côté océan :</strong><br>ne pas choisir Haukland, Unstad ou Uttakleiv ; changer de côte ou d'activité.</p>
      </section>

      <section class="card">
        <h3>💰 Budgets pour deux</h3>
        <p><strong>Plan idéal :</strong> Ballstad autonome + Saga Reinefjord = <strong>3 050 NOK</strong>.</p>
        <p><strong>Alternative Reine équipement thermique :</strong> Ballstad autonome + Reine Rorbuer 2 h = <strong>3 100 NOK</strong>.</p>
        <p><strong>Sans certification :</strong> Ballstad guidé + Saga Reinefjord = <strong>4 930 NOK</strong>.</p>
        <p><strong>Haukland tandem :</strong> tarif à vérifier dans la réservation en ligne ou par téléphone.</p>
        <p class="muted">Tarifs principaux vérifiés le 12/08/2026 ; option Haukland vérifiée le 23/08/2026. Disponibilité et prix restent à recontrôler avant réservation.</p>
      </section>
    </div>

    <div class="grid" style="margin-top:12px">
      <section class="card">
        <h3>🛶 Avec notre propre kayak</h3>
        <p>Reine Paddling indique qu'il est possible de rejoindre une sortie guidée avec son propre kayak pour <strong>380 NOK</strong> selon sa FAQ actuelle, si le kayak est considéré comme <em>sea-worthy</em>.</p>
        <p><strong>Kayak gonflable :</strong> ne pas supposer qu'il sera accepté. Contacter l'opérateur et obtenir une validation explicite avant de compter sur cette option.</p>
        ${kayakLink(KAYAK_LINKS.reinePaddlingFaq, 'FAQ Reine Paddling', true)}
      </section>

      <section class="card">
        <h3>🧊 Sécurité eau froide</h3>
        <p>• PFD porté en permanence.</p>
        <p>• S'habiller pour la <strong>température de l'eau</strong>, pas seulement pour l'air.</p>
        <p>• En autonomie : protection thermique, téléphone/VHF protégé, plan de retour et maîtrise de l'auto-sauvetage.</p>
        <p>• Rester près de la côte et conserver des sorties faciles si le vent se lève.</p>
        <p>• Vérifier conditions locales juste avant le départ ; un fjord abrité peut devenir désagréable avec des rafales canalisées par le relief.</p>
      </section>
    </div>

    <section class="card" style="margin-top:12px">
      <h3>✅ Action avant le départ</h3>
      <p><strong>1.</strong> Retrouver notre preuve de qualification kayak et l'envoyer à Lofoten Diving pour confirmation d'équivalence.</p>
      <p><strong>2.</strong> Si acceptée, garder Ballstad comme sortie autonome prioritaire et réserver selon la météo.</p>
      <p><strong>3.</strong> Garder une réservation Reinefjord modifiable/annulable afin de positionner la sortie sur la meilleure fenêtre météo du séjour.</p>
      <p><strong>4.</strong> Pour Haukland, vérifier la disponibilité du sit-on-top 2 personnes et demander le prix + les conditions de location. Ne le retenir que si la mer est vraiment calme.</p>
      <div style="margin-top:10px">
        ${kayakLink(KAYAK_LINKS.hauklandTandem, 'Haukland — fiche tandem', true)}
        ${kayakLink(KAYAK_LINKS.hauklandBooking, 'Voir les disponibilités')}
      </div>
      <p class="muted">Sources : Visit Lofoten, Lofoten Diving, Lofoten Aktiv, Saga Adventures, Reine Rorbuer, XXLofoten, Reine Paddling et Hauklandstranda AS. Tarifs principaux vérifiés le 12 août 2026 ; option Haukland vérifiée le 23 août 2026.</p>
    </section>`;
}

// Extend the roadbook router without modifying the core application.
if (typeof show === 'function') {
  const showRoadbookWithDrone = show;
  show = function(id) {
    if (id !== 'kayak') return showRoadbookWithDrone(id);
    active = id;
    document.querySelectorAll('#nav button').forEach(button => button.classList.toggle('active', button.dataset.tab === id));
    renderKayak();
  };
}
