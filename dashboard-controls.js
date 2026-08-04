'use strict';

(function preserveOperationalDashboard(){
  const base=window.renderDashboard;
  if(typeof base!=='function')return;

  function renderDashboardWithControls(){
    base();
    const app=byId('app');
    if(!app)return;
    app.insertAdjacentHTML('beforeend',`
      <div class="grid" style="margin-top:12px">
        <section class="card">
          <h2>État actuel</h2>
          <div class="form">
            <label>Date<input id="c-date" type="date" value="${esc(state.current.date)}"></label>
            <label>Position<input id="c-place" value="${esc(state.current.place)}"></label>
            <label>Météo<input id="c-weather" value="${esc(state.current.weather)}"></label>
            <label>Énergie Olivier /5<input id="c-o" type="number" min="1" max="5" value="${state.current.olivier}"></label>
            <label>Énergie Sorya /5<input id="c-s" type="number" min="1" max="5" value="${state.current.sorya}"></label>
            <label>Énergie Paddy /5<input id="c-p" type="number" min="1" max="5" value="${state.current.paddy}"></label>
          </div>
          <label>Décision<textarea id="c-decision">${esc(state.current.decision)}</textarea></label>
          <button id="save-current" class="primary">Enregistrer</button>
        </section>
        <section class="card">
          <h2>Suivi GPS</h2>
          <p class="muted">La trace est enregistrée localement puis synchronisée dans le dépôt GitHub privé.</p>
          <div class="toolbar"><button id="gps-start" class="primary">Démarrer</button><button id="gps-stop">Arrêter</button><button id="gps-reset" class="danger">Réinitialiser</button></div>
          <div id="gps-status" class="status">Suivi inactif · ${(state.gps.km||0).toFixed(1)} km</div>
        </section>
      </div>`);

    byId('save-current').onclick=()=>{
      state.current={
        date:byId('c-date').value,
        place:byId('c-place').value,
        weather:byId('c-weather').value,
        olivier:+byId('c-o').value,
        sorya:+byId('c-s').value,
        paddy:+byId('c-p').value,
        decision:byId('c-decision').value
      };
      save();autoSync();renderDashboardWithControls();
    };
    byId('gps-start').onclick=startGPS;
    byId('gps-stop').onclick=stopGPS;
    byId('gps-reset').onclick=()=>{if(confirm('Effacer la trace GPS ?')){state.gps={km:0,points:[]};save();renderDashboardWithControls();}};
  }

  window.renderDashboard=renderDashboardWithControls;
  try{renderDashboard=renderDashboardWithControls;}catch{}
})();
