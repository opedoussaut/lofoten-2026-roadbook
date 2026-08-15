'use strict';

// V92 — opportunistic paragliding guide. It never changes the itinerary.
if (typeof tabs !== 'undefined' && !tabs.some(([id]) => id === 'paragliding')) {
  const kayakIndex=tabs.findIndex(([id])=>id==='kayak');
  const mapIndex=tabs.findIndex(([id])=>id==='map');
  tabs.splice(kayakIndex>=0?kayakIndex+1:(mapIndex>=0?mapIndex:4),0,['paragliding','Parapente']);
}

const PG92_AREAS=[
 {name:'Gimsøy / Hov',lat:68.339,lon:14.113,role:'Zone à observer pendant les 2 nuits à Hov : relief modéré, grande visibilité sur la côte. Aucune décision de décollage sans validation locale du terrain, de l’atterrissage et de l’aérologie.',fit:'Très bon créneau de reconnaissance car vous êtes déjà sur place.'},
 {name:'Haukland / Uttakleiv / Vestvågøy',lat:68.199,lon:13.529,role:'Secteur spectaculaire mais exposé aux accélérations, au vent de mer et aux rotors selon orientation. À considérer uniquement comme zone de scouting.',fit:'Peut se combiner avec la balade côtière du 02/09 sans modifier le programme.'},
 {name:'Ramberg / Flakstad',lat:68.089,lon:13.236,role:'Reliefs côtiers et grandes plages potentiellement intéressants pour observer les cycles de vent et les possibilités d’atterrissage. Ne pas présumer qu’un champ/plage est utilisable sans autorisation.',fit:'Bon scouting visuel pendant les arrêts plage/Vikten.'},
 {name:'Andøya / Stave–Bleik',lat:69.23567,lon:15.9485,role:'Relief très spectaculaire mais météo maritime et falaises : uniquement reconnaissance / information locale. Måtinden reste d’abord une randonnée.',fit:'Ne doit jamais compromettre le MVP Måtinden du 31/08.'}
];

function pg92fixed(n){return Number(n).toFixed(6)}
function pg92map(p){return `https://www.openstreetmap.org/?mlat=${pg92fixed(p.lat)}&mlon=${pg92fixed(p.lon)}#map=13/${pg92fixed(p.lat)}/${pg92fixed(p.lon)}`}
function pg92topo(p){return `https://www.opentopomap.org/#map=13/${pg92fixed(p.lat)}/${pg92fixed(p.lon)}`}
function pg92google(p){return `https://www.google.com/maps/search/?api=1&query=${pg92fixed(p.lat)},${pg92fixed(p.lon)}`}
function pg92link(url,label,primary=false){return `<a class="btn ${primary?'primary':''}" href="${url}" target="_blank" rel="noopener">${label} ↗</a>`}
function pg92esc(v){return typeof esc==='function'?esc(v):String(v??'')}

function renderParagliding(){
 const app=byId('app');if(!app)return;
 const areas=PG92_AREAS.map(a=>`<article class="card" style="margin-top:12px"><h3>🪂 ${pg92esc(a.name)}</h3><p>${pg92esc(a.role)}</p><p class="muted"><b>Pourquoi dans le roadbook :</b> ${pg92esc(a.fit)}</p><div class="toolbar">${pg92link(pg92topo(a),'⛰️ Relief',true)}${pg92link(pg92map(a),'🗺️ OSM')}${pg92link(pg92google(a),'📍 Satellite / accès')}</div></article>`).join('');
 app.innerHTML=`
 <section class="card"><p class="eyebrow">OPTION OPPORTUNISTE · NE PILOTE PAS LE VOYAGE</p><h1>🪂 Parapente</h1><p>Le parapente est traité comme une <b>opportunité météo</b>, jamais comme une contrainte de l’itinéraire. Une zone indiquée ici n’est <b>pas</b> une recommandation de décollage : elle sert à préparer le scouting du relief et des accès.</p><div class="popup-warning"><b>Go / no-go indispensable :</b> confirmer le site avec une source locale / pilote local, vérifier espace aérien et restrictions temporaires, autorisation du terrain de décollage et de l’atterrissage, vent au sol + en altitude, rafales, rotor, brise de mer, plafond, pluie et possibilité de sortie sûre. Les Lofoten sont un environnement maritime et montagneux : ne jamais extrapoler les conditions d’une plage à une crête.</div></section>
 <div class="grid" style="margin-top:12px"><section class="card"><h3>✅ Workflow le jour J</h3><p><b>1.</b> Regarder d’abord si la journée prévue est compatible avec le programme famille.</p><p><b>2.</b> Identifier orientation + atterrissage avant de monter.</p><p><b>3.</b> Vérifier l’espace aérien officiel et les NOTAM / restrictions temporaires.</p><p><b>4.</b> Chercher une validation locale récente du site.</p><p><b>5.</b> Faire un vrai point météo au décollage et garder un plan de renoncement simple.</p></section><section class="card"><h3>🔗 Outils</h3><div class="toolbar">${pg92link('https://avinor.no/en/ais/','✈️ Avinor AIS',true)}${pg92link('https://www.nlf.no/','🇳🇴 Fédération aérienne norvégienne')}${pg92link('https://www.windy.com/','🌬️ Windy')}</div><p class="muted">Utiliser ces liens comme points d’entrée ; les procédures et cartes officielles du jour ont priorité.</p></section></div>
 ${areas}`;
}

if(typeof show==='function'){
 const pg92PreviousShow=show;
 show=function(id){if(id!=='paragliding')return pg92PreviousShow(id);active=id;document.querySelectorAll('#nav button').forEach(button=>button.classList.toggle('active',button.dataset.tab===id));renderParagliding();};
}
