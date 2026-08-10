'use strict';

// DJI Mini 3 Pro field guide for the Lofoten roadbook.
// Sources are deliberately limited to official DJI and Norwegian authorities.

if (typeof tabs !== 'undefined' && !tabs.some(([id]) => id === 'drone')) {
  const mapIndex = tabs.findIndex(([id]) => id === 'map');
  tabs.splice(mapIndex >= 0 ? mapIndex + 1 : 4, 0, ['drone', 'Drone']);
}

const DRONE_LINKS = {
  avinorMap: 'https://experience.arcgis.com/experience/9d098dbc738e436f9525fdb4ef443f61',
  avinorRules: 'https://www.avinor.no/en/practical-info/drone/drone-regulations/',
  caaNorway: 'https://www.luftfartstilsynet.no/en/drones/no-drone-zones/',
  visitingNorway: 'https://www.luftfartstilsynet.no/en/drones/flying-in-norway/',
  nsmMap: 'https://registrering.sensor.nsm.cloudgis.no',
  protectedAreas: 'https://kartkatalog.miljodirektoratet.no/MapService/Details/vern?lang=en-us',
  djiGuide: 'https://repair.dji.com/help/content?customId=en-us03400006840&documentType=artical&lang=en&paperDocType=paper&re=US&spaceId=34',
  djiSupport: 'https://www.dji.com/support/product/mini-3-pro'
};

function droneStep(n, title, text) {
  return `<div style="display:grid;grid-template-columns:34px 1fr;gap:10px;align-items:start;margin:12px 0">
    <div style="width:30px;height:30px;border-radius:50%;display:grid;place-items:center;background:#153047;color:white;font-weight:700">${n}</div>
    <div><strong>${title}</strong><div class="muted" style="margin-top:3px">${text}</div></div>
  </div>`;
}

function droneLink(url, label, primary=false) {
  return `<a href="${url}" target="_blank" rel="noopener" class="${primary?'primary':''}" style="display:inline-block;text-decoration:none;margin:4px 6px 4px 0">${label} ↗</a>`;
}

function renderDrone() {
  const app = byId('app');
  if (!app) return;

  app.innerHTML = `
    <section class="card">
      <div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start;flex-wrap:wrap">
        <div>
          <p class="eyebrow">DJI MINI 3 PRO · REMISE EN MAIN</p>
          <h2 style="margin-bottom:6px">🚁 Drone — tutoriel + zones de vol</h2>
          <p class="muted" style="max-width:850px">Mémo terrain conçu pour reprendre le drone après plusieurs mois sans voler. Le Mini 3 Pro pèse moins de 249 g avec la batterie standard ; la batterie Plus le fait dépasser 249 g et change les règles applicables.</p>
        </div>
        <div style="min-width:220px">
          ${droneLink(DRONE_LINKS.djiGuide,'Guide officiel DJI',true)}
          ${droneLink(DRONE_LINKS.djiSupport,'Support Mini 3 Pro')}
        </div>
      </div>
    </section>

    <div class="grid" style="margin-top:12px">
      <section class="card">
        <h3>🔧 1. Avant le voyage — remise en service</h3>
        ${droneStep(1,'Batteries','Charge complètement la batterie du drone et la radiocommande. Après un stockage long, vérifie qu’aucune batterie n’est gonflée, fissurée ou anormalement chaude.')}
        ${droneStep(2,'Hélices','Déplie le drone et inspecte les 8 pales : aucune fissure, déformation ou jeu. Vérifie visuellement les vis. Remplace toute hélice douteuse avant le départ.')}
        ${droneStep(3,'Gimbal + optique','Retire impérativement la protection de nacelle avant d’allumer. Nettoie doucement l’objectif et vérifie que la nacelle bouge librement.')}
        ${droneStep(4,'Carte microSD','Insère une carte microSD fiable, vérifie l’espace libre et formate-la dans DJI Fly après avoir sauvegardé son contenu.')}
        ${droneStep(5,'Firmware','À la maison, connecte DJI Fly à Internet, allume drone + radiocommande et installe les mises à jour proposées. Fais cela avant le roadtrip, pas sur un spot de vol.')}
        ${droneStep(6,'Appairage','Si le drone n’est plus lié : DJI Fly → vue caméra → ··· → Control → Re-pair to Aircraft, puis maintiens le bouton Power du drone jusqu’au bip de liaison.')}
      </section>

      <section class="card">
        <h3>⚡ 2. Allumer / éteindre</h3>
        <p><strong>Drone :</strong> bouton batterie <strong>1 pression courte + maintien ~2 s</strong>. Les LED s’allument et le drone effectue son auto-test.</p>
        <p><strong>Radiocommande :</strong> même séquence, <strong>1 pression courte + maintien ~2 s</strong>.</p>
        <p><strong>Ordre pratique :</strong> radiocommande → drone → attendre la connexion DJI Fly. Pour éteindre : drone puis radiocommande, même séquence de bouton.</p>
        <div style="padding:10px 12px;border-radius:10px;background:rgba(180,120,0,.12);margin-top:10px"><strong>Important :</strong> ne jamais mettre le drone sous tension avec la protection de nacelle en place.</div>
      </section>
    </div>

    <div class="grid" style="margin-top:12px">
      <section class="card">
        <h3>🛫 3. Décollage — séquence simple</h3>
        ${droneStep(1,'Position','Sol plat, dégagé, drone orienté avec l’arrière vers toi. Pas de décollage depuis le toit du camping-car.')}
        ${droneStep(2,'GPS / Home Point','Attends une bonne réception GNSS et surtout la confirmation que le Home Point est enregistré avant de partir loin.')}
        ${droneStep(3,'RTH','Dans Safety, règle l’altitude RTH au-dessus du plus haut obstacle local sans dépasser la limite réglementaire. Dans les Lofoten, attention aux reliefs : 120 m se mesure depuis le point du sol le plus proche, pas simplement depuis le point de décollage.')}
        ${droneStep(4,'Contrôle','Vérifie batterie, satellites, stockage, absence d’alerte, vent, personnes, oiseaux et espace de retour.')}
        ${droneStep(5,'Décoller','Pour la reprise, utilise le bouton Takeoff dans DJI Fly et monte seulement à 2–3 m. Reste 20–30 s en stationnaire pour vérifier stabilité, commandes et image.')}
      </section>

      <section class="card">
        <h3>🎮 4. Commandes essentielles — Mode 2</h3>
        <div class="table-wrap"><table><thead><tr><th>Stick</th><th>Mouvement</th><th>Effet</th></tr></thead><tbody>
          <tr><td>Gauche</td><td>↑ / ↓</td><td>Monter / descendre</td></tr>
          <tr><td>Gauche</td><td>← / →</td><td>Rotation (yaw) gauche / droite</td></tr>
          <tr><td>Droit</td><td>↑ / ↓</td><td>Avancer / reculer</td></tr>
          <tr><td>Droit</td><td>← / →</td><td>Translation gauche / droite</td></tr>
        </tbody></table></div>
        <p class="muted" style="margin-top:10px">Premier vol de reprise : reste en mode Normal. Fais monter/descendre, carré lent, rotation 360°, éloignement de 20–30 m, retour manuel puis atterrissage.</p>
      </section>
    </div>

    <div class="grid" style="margin-top:12px">
      <section class="card">
        <h3>🏠 5. Return-to-Home (RTH)</h3>
        <p><strong>Déclencher :</strong> touche RTH dans DJI Fly ou maintien du bouton RTH de la radiocommande.</p>
        <p><strong>Mini 3 Pro :</strong> au-delà de 50 m du Home Point il monte à l’altitude RTH réglée (sauf s’il est déjà plus haut), puis revient. Entre 5 et 50 m il revient à son altitude actuelle. À moins de 5 m il atterrit directement.</p>
        <p><strong>Avant chaque vol :</strong> confirme le Home Point et l’altitude RTH. Ne suppose jamais que RTH contournera tous les obstacles.</p>
      </section>

      <section class="card">
        <h3>⚠️ 6. Points de vigilance Mini 3 Pro</h3>
        <p>• Évitement d’obstacles vers l’avant, l’arrière et le bas, mais <strong>pas de détection latérale</strong> : une translation de côté peut frapper une falaise, un arbre ou un câble.</p>
        <p>• Garde toujours le drone en vue directe (VLOS). Le retour vidéo n’est pas un substitut.</p>
        <p>• En montagne, garde une marge batterie importante pour le retour face au vent.</p>
        <p>• <strong>Arrêt moteur d’urgence :</strong> uniquement pour une vraie urgence. DJI permet un CSC avec les deux sticks dans les coins pendant ~1,5 s selon le réglage Safety → Advanced Settings.</p>
      </section>
    </div>

    <section class="card" style="margin-top:12px">
      <h3>🗺️ 7. Carte officielle — où peut-on voler ?</h3>
      <p>La carte Avinor ci-dessous est la référence opérationnelle pour l’espace aérien et les zones autour des aéroports. <strong>Dans les Lofoten, vérifie tout particulièrement Leknes et Svolvær :</strong> sans autorisation du contrôle aérien, le vol est interdit dans un rayon de 5 km autour d’un aéroport norvégien.</p>
      <div style="height:min(68vh,680px);min-height:430px;border-radius:12px;overflow:hidden;border:1px solid rgba(127,127,127,.25);background:#eef2f4">
        <iframe title="Carte drone officielle Avinor" src="${DRONE_LINKS.avinorMap}" style="width:100%;height:100%;border:0" loading="lazy" referrerpolicy="no-referrer"></iframe>
      </div>
      <div style="margin-top:10px">
        ${droneLink(DRONE_LINKS.avinorMap,'Ouvrir la carte Avinor en plein écran',true)}
        ${droneLink(DRONE_LINKS.caaNorway,'Zones interdites — CAA Norway')}
        ${droneLink(DRONE_LINKS.nsmMap,'Carte NSM photo/vidéo')}
        ${droneLink(DRONE_LINKS.protectedAreas,'Carte des espaces protégés')}
      </div>
      <p class="muted" style="margin-top:8px">La carte Avinor ne suffit pas à elle seule : il faut aussi vérifier les restrictions photo/vidéo NSM, les espaces naturels protégés, les NOTAM/urgences, zones militaires, prisons, ambassades et éventuelles restrictions locales.</p>
    </section>

    <div class="grid" style="margin-top:12px">
      <section class="card">
        <h3>🇳🇴 8. Checklist légale Norvège — Mini 3 Pro &lt;249 g</h3>
        <p>☐ Utiliser la <strong>batterie standard</strong> si tu veux rester sous 249 g.</p>
        <p>☐ Comme le drone a une caméra, être enregistré comme <strong>opérateur UAS dans ton pays EASA</strong> (France) et apposer le numéro opérateur sur le drone.</p>
        <p>☐ Pour un drone &lt;250 g avec caméra, la Norvège exige l’enregistrement opérateur ; l’examen A1/A3 n’est pas obligatoire pour cette classe, mais reste recommandé.</p>
        <p>☐ Drone toujours en vue (VLOS), jamais au-dessus d’une foule, maximum 120 m du point du sol le plus proche.</p>
        <p>☐ Obtenir l’accord du propriétaire pour le lieu de décollage/atterrissage.</p>
        <p>☐ Pour un aéronef étranger utilisant photo/vidéo en Norvège, effectuer la notification/les formalités NSM et vérifier leur carte des zones capteurs.</p>
        <p>☐ Vérifier Avinor + espaces protégés + restrictions temporaires <strong>juste avant chaque vol</strong>.</p>
        <p>☐ À moins de 5 km d’un aéroport : ne pas décoller sans autorisation du service de contrôle aérien. Avinor recommande NinoxDrone2/Avidrone selon l’aéroport.</p>
        <div style="margin-top:10px">${droneLink(DRONE_LINKS.visitingNorway,'Règles visiteurs — CAA Norway',true)} ${droneLink(DRONE_LINKS.avinorRules,'6 règles Avinor')}</div>
      </section>

      <section class="card">
        <h3>✅ 9. Vol de reprise conseillé — 10 minutes</h3>
        <p><strong>0–2 min :</strong> stationnaire à 2–3 m, yaw gauche/droite.</p>
        <p><strong>2–4 min :</strong> carré lent à 5–10 m devant toi.</p>
        <p><strong>4–6 min :</strong> monter à 20 m, partir à 30–40 m, revenir manuellement.</p>
        <p><strong>6–8 min :</strong> tester RTH dans une zone totalement dégagée, puis reprendre le contrôle.</p>
        <p><strong>8–10 min :</strong> atterrissage manuel précis et arrêt.</p>
        <p class="muted">Fais ce vol test en France avant le départ. L’objectif est de retrouver les automatismes sans les contraintes du vent, du relief et des spots touristiques des Lofoten.</p>
      </section>
    </div>

    <section class="card" style="margin-top:12px">
      <h3>Sources officielles</h3>
      <p class="muted">DJI Mini 3 Pro Beginner’s Guide & Support · Luftfartstilsynet / CAA Norway · Avinor Drone Map & Drone Rules · NSM airborne sensor rules · Norwegian Environment Agency protected-area mapping. Vérifié pour le roadbook le 10 août 2026.</p>
    </section>`;
}

// Extend the existing router without modifying the core roadbook logic.
if (typeof show === 'function') {
  const showRoadbookCore = show;
  show = function(id) {
    if (id !== 'drone') return showRoadbookCore(id);
    active = id;
    document.querySelectorAll('#nav button').forEach(button => button.classList.toggle('active', button.dataset.tab === id));
    renderDrone();
  };
}
