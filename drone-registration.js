'use strict';

// Personal UAS operator registration details for the Drone tab.
// Only the public operator number is stored here. Never add the confidential Remote ID suffix.

const DRONE_OPERATOR_REGISTRATION = {
  country: 'France',
  status: 'Enregistré',
  validUntil: '11/08/2031',
  operatorNumber: 'FRAg9nl5bhaxpovg',
  dsacSite: 'DSAC/S - Siège'
};

function renderDroneOperatorRegistration() {
  const app = byId('app');
  if (!app || app.querySelector('[data-drone-registration]')) return;

  const info = DRONE_OPERATOR_REGISTRATION;
  const section = document.createElement('section');
  section.className = 'card';
  section.dataset.droneRegistration = 'true';
  section.style.marginTop = '12px';
  section.innerHTML = `
    <div style="display:flex;justify-content:space-between;gap:14px;align-items:flex-start;flex-wrap:wrap">
      <div>
        <p class="eyebrow">ALPHATANGO · EXPLOITANT UAS FRANCE</p>
        <h3 style="margin:0 0 6px">🪪 Mes identifiants drone</h3>
        <p class="muted" style="margin:0">À garder disponible pendant le voyage et à utiliser pour l’identification réglementaire du DJI Mini 3 Pro.</p>
      </div>
      <span style="display:inline-block;padding:6px 10px;border-radius:999px;background:rgba(35,140,80,.14);font-weight:700">✅ ${info.status}</span>
    </div>

    <div class="grid" style="margin-top:12px">
      <div style="padding:12px;border-radius:12px;background:rgba(21,48,71,.07)">
        <div class="muted" style="font-size:.88em">NUMÉRO D’EXPLOITANT UAS À APPOSER SUR LE DRONE</div>
        <div style="font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:1.25em;font-weight:800;letter-spacing:.04em;margin-top:5px;word-break:break-all">${info.operatorNumber}</div>
        <p class="muted" style="margin:8px 0 0">Utiliser ce numéro public sur l’étiquette du drone.</p>
      </div>
      <div>
        <p><strong>Pays d’enregistrement :</strong> ${info.country}</p>
        <p><strong>Site DSAC-IR :</strong> ${info.dsacSite}</p>
        <p><strong>Validité :</strong> jusqu’au ${info.validUntil}</p>
        <p><strong>Statut :</strong> ${info.status}</p>
      </div>
    </div>

    <div style="padding:10px 12px;border-radius:10px;background:rgba(190,120,0,.14);margin-top:12px">
      <strong>🔐 Important :</strong> ce roadbook ne contient que le numéro exploitant public. Ne jamais ajouter ici ni imprimer sur l’étiquette les éventuels <strong>3 caractères secrets</strong> utilisés pour l’identification électronique / Remote ID.
    </div>

    <div style="margin-top:12px">
      <strong>Avant de décoller :</strong>
      <span style="display:inline-block;margin:4px 5px 0 0">☐ étiquette lisible</span>
      <span style="display:inline-block;margin:4px 5px 0 0">☐ numéro identique à AlphaTango</span>
      <span style="display:inline-block;margin:4px 5px 0 0">☐ enregistrement encore valide</span>
      <span style="display:inline-block;margin:4px 5px 0 0">☐ aucun suffixe secret affiché</span>
    </div>`;

  const intro = app.querySelector('section.card');
  if (intro) intro.insertAdjacentElement('afterend', section);
  else app.prepend(section);
}

if (typeof renderDrone === 'function') {
  const renderDroneBase = renderDrone;
  renderDrone = function() {
    renderDroneBase();
    renderDroneOperatorRegistration();
  };
}
