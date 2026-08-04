'use strict';

const KEY='lofoten-pwa-v1';
const tabs=[
  ['dashboard','Synthèse'],
  ['itinerary','Itinéraire'],
  ['family','Activités'],
  ['map','Carte'],
  ['van','Camping-car'],
  ['journal','Journal'],
  ['budget','Budget'],
  ['sync','Sauvegarde']
];

const initial={
  meta:{pickup:'24/08/2026 16:00',start:'25/08/2026 06:00',return:'11/09/2026 17:00',from:'Chevreuse',to:'Roadsurfer · Champlan'},
  current:{date:'2026-08-25',place:'Chevreuse',weather:'À vérifier',olivier:5,sorya:5,paddy:5,decision:'Suivre l’itinéraire officiel à un seul ferry'},
  itinerary:[],nightlyOptions:{},activities:[],
  olivier:[['Reinebringen','Très raide; sortie individuelle uniquement.'],['Ryten / Kvalvika','Longue sortie, terrain humide possible.'],['Festvågtind','Raide et potentiellement exposé.'],['Mannen','Crête, sensation de vide possible.']],
  van:{fuel:100,water:100,grey:0,battery:100,toilet:'OK',next:'Contrôle complet avant départ'},
  journal:[],expenses:[],gps:{km:0,points:[]},updatedAt:null
};

const clone=value=>JSON.parse(JSON.stringify(value));
let state=load();
let active='dashboard';
let watchId=null;

function load(){
  try{return Object.assign(clone(initial),JSON.parse(localStorage.getItem(KEY)||'{}'));}
  catch{return clone(initial);}
}

function save(){
  state.updatedAt=new Date().toISOString();
  localStorage.setItem(KEY,JSON.stringify(state));
  setSync('local','Sauvegardé sur cet appareil');
}

function autoSync(){}

function esc(value){
  return String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
function byId(id){return document.getElementById(id);}
function totalKm(){return (state.itinerary||[]).reduce((sum,row)=>sum+(Number(row[3])||0),0);}

function setSync(mode,message){
  const dot=byId('sync-dot'),label=byId('sync-label');
  if(!dot||!label)return;
  dot.className=`dot ${mode==='online'?'online':'offline'}`;
  label.textContent=message||(mode==='online'?'Synchronisé':'Sauvegarde locale');
}

function card(label,value,sub=''){
  return `<div class="card kpi"><span class="muted">${esc(label)}</span><br><strong>${esc(value)}</strong>${sub?`<br><span>${esc(sub)}</span>`:''}</div>`;
}

function renderNav(){
  const nav=byId('nav');
  nav.innerHTML='';
  tabs.forEach(([id,label])=>{
    const button=document.createElement('button');
    button.textContent=label;button.dataset.tab=id;button.onclick=()=>show(id);nav.appendChild(button);
  });
}

function show(id){
  active=id;
  document.querySelectorAll('#nav button').forEach(button=>button.classList.toggle('active',button.dataset.tab===id));
  const renderer={dashboard:renderDashboard,itinerary:renderItinerary,family:renderFamily,map:renderMap,van:renderVan,journal:renderJournal,budget:renderBudget,sync:renderSync}[id]||renderDashboard;
  renderer();
}

function editableTable(data,headers,name){
  return `<div class="table-wrap"><table><thead><tr>${headers.map(header=>`<th>${esc(header)}</th>`).join('')}<th></th></tr></thead><tbody>${data.map((row,index)=>`<tr>${row.map((value,column)=>`<td contenteditable="true" data-table="${esc(name)}" data-row="${index}" data-col="${column}">${esc(value)}</td>`).join('')}<td><button class="danger delete-row" data-table="${esc(name)}" data-row="${index}">×</button></td></tr>`).join('')}</tbody></table></div>`;
}

function bindEditable(name,rerender){
  const target=state[name];
  if(!Array.isArray(target))return;
  document.querySelectorAll(`[data-table="${name}"][contenteditable]`).forEach(cell=>cell.onblur=()=>{
    let value=cell.innerText.trim();
    if((name==='itinerary'&&(cell.dataset.col==='3'||cell.dataset.col==='4'))||(name==='expenses'&&cell.dataset.col==='1'))value=Number(value.replace(',','.'))||0;
    target[Number(cell.dataset.row)][Number(cell.dataset.col)]=value;save();autoSync();
  });
  document.querySelectorAll(`.delete-row[data-table="${name}"]`).forEach(button=>button.onclick=()=>{
    target.splice(Number(button.dataset.row),1);save();autoSync();rerender();
  });
}

function renderDashboard(){
  byId('app').innerHTML=`<div class="grid">${card('Départ',state.meta.start,state.meta.from)}${card('Restitution',state.meta.return,state.meta.to)}${card('Distance prévue',`${totalKm().toLocaleString('fr-FR')} km`)}${card('GPS enregistré',`${Number(state.gps?.km||0).toFixed(1)} km`)}</div>`;
}

function renderItinerary(){
  byId('app').innerHTML=`<section class="card"><h2>Itinéraire</h2>${editableTable(state.itinerary||[],['Date','Départ','Arrivée','Km','Heures','Type','Objectif','Paddy'],'itinerary')}</section>`;
  bindEditable('itinerary',renderItinerary);
}

function renderFamily(){
  byId('app').innerHTML=`<section class="card"><h2>Activités</h2>${editableTable(state.activities||[],['Activité','Secteur','Catégorie','Durée','Terrain','Paddy','Latitude','Longitude'],'activities')}</section>`;
  bindEditable('activities',renderFamily);
}

function renderMap(){
  byId('app').innerHTML='<section class="card"><h2>Carte</h2><p>Chargement du module cartographique…</p></section>';
}

function renderVan(){
  byId('app').innerHTML='<section class="card"><h2>Camping-car</h2><p>Chargement de la fiche détaillée…</p></section>';
}

function renderJournal(){
  const rows=(state.journal||[]).map((entry,index)=>`<tr><td>${esc(entry.date)}</td><td>${esc(entry.place)}</td><td>${esc(entry.km)}</td><td>${esc(entry.weather)}</td><td>${esc(entry.highlight)}</td><td>${esc(entry.issue)}</td><td><button class="danger" data-journal-index="${index}">×</button></td></tr>`).join('');
  byId('app').innerHTML=`<section class="card"><h2>Nouvelle entrée</h2><div class="form"><label>Date<input id="j-date" type="date" value="${esc(state.current?.date||new Date().toISOString().slice(0,10))}"></label><label>Lieu<input id="j-place" placeholder="Lieu"></label><label>Kilomètres<input id="j-km" type="number" placeholder="Km"></label><label>Météo<input id="j-weather" placeholder="Météo"></label></div><label>Moment fort<textarea id="j-highlight" placeholder="Moment fort"></textarea></label><label>Aléa ou décision<textarea id="j-issue" placeholder="Aléa / décision"></textarea></label><button id="j-add" class="primary">Ajouter au journal</button></section><section class="card" style="margin-top:12px"><div class="table-wrap"><table><thead><tr><th>Date</th><th>Lieu</th><th>Km</th><th>Météo</th><th>Moment fort</th><th>Aléa</th><th></th></tr></thead><tbody>${rows}</tbody></table></div></section>`;
  byId('j-add').onclick=()=>{
    state.journal.unshift({date:byId('j-date').value,place:byId('j-place').value,km:Number(byId('j-km').value)||0,weather:byId('j-weather').value,highlight:byId('j-highlight').value,issue:byId('j-issue').value});
    save();autoSync();renderJournal();
  };
  document.querySelectorAll('[data-journal-index]').forEach(button=>button.onclick=()=>{
    state.journal.splice(Number(button.dataset.journalIndex),1);save();autoSync();renderJournal();
  });
}

function renderBudget(){
  const total=(state.expenses||[]).reduce((sum,row)=>sum+(Number(row[1])||0),0);
  byId('app').innerHTML=`<div class="grid"><div class="card"><span class="muted">Dépenses enregistrées</span><div class="expense-total">${total.toFixed(2)} €</div></div><div class="card"><h3>Ajouter une dépense</h3><div class="form"><label>Catégorie<input id="e-cat" placeholder="Carburant, camping…"></label><label>Montant<input id="e-amount" type="number" step="0.01" placeholder="€"></label><label>Lieu<input id="e-place" placeholder="Lieu"></label><label>Note<input id="e-note" placeholder="Note"></label></div><button id="e-add" class="primary">Ajouter</button></div></div><section class="card" style="margin-top:12px">${editableTable(state.expenses||[],['Catégorie','Montant €','Lieu','Note','Date'],'expenses')}</section>`;
  bindEditable('expenses',renderBudget);
  byId('e-add').onclick=()=>{
    state.expenses.push([byId('e-cat').value,Number(byId('e-amount').value)||0,byId('e-place').value,byId('e-note').value,new Date().toISOString().slice(0,10)]);
    save();autoSync();renderBudget();
  };
}

function renderSync(){
  byId('app').innerHTML='<section class="card"><h2>Sauvegarde</h2><p>Chargement du module GitHub privé…</p></section>';
}

function startGPS(){
  if(!navigator.geolocation)return alert('GPS indisponible.');
  if(watchId!==null)return;
  const box=byId('gps-status');if(box)box.textContent='Recherche de position…';
  watchId=navigator.geolocation.watchPosition(position=>{
    const point={lat:position.coords.latitude,lon:position.coords.longitude,t:new Date().toISOString(),acc:position.coords.accuracy};
    const last=(state.gps.points||[]).at(-1);
    if(last&&point.acc<100){const delta=distance(last,point);if(delta<5)state.gps.km+=delta;}
    state.gps.points.push(point);save();autoSync();
    if(box)box.textContent=`GPS actif · précision ${Math.round(point.acc)} m · ${state.gps.km.toFixed(1)} km`;
  },error=>{if(box)box.textContent=`Erreur GPS : ${error.message}`;},{enableHighAccuracy:true,maximumAge:10000,timeout:20000});
}

function stopGPS(){
  if(watchId!==null)navigator.geolocation.clearWatch(watchId);
  watchId=null;
  const box=byId('gps-status');if(box)box.textContent='Suivi arrêté';
}

function distance(a,b){
  const radius=6371,dLat=(b.lat-a.lat)*Math.PI/180,dLon=(b.lon-a.lon)*Math.PI/180;
  const value=Math.sin(dLat/2)**2+Math.cos(a.lat*Math.PI/180)*Math.cos(b.lat*Math.PI/180)*Math.sin(dLon/2)**2;
  return 2*radius*Math.atan2(Math.sqrt(value),Math.sqrt(1-value));
}

function exportJSON(){
  const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),link=document.createElement('a');
  link.href=URL.createObjectURL(blob);link.download='lofoten-2026-roadbook.json';link.click();URL.revokeObjectURL(link.href);
}

function init(){
  renderNav();show('dashboard');
  const connect=byId('google-login');if(connect)connect.onclick=()=>show('sync');
  if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(console.warn);
}

document.addEventListener('DOMContentLoaded',init);

document.addEventListener('change',event=>{
  if(event.target?.id!=='json-file')return;
  const file=event.target.files?.[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=()=>{
    try{state=Object.assign(clone(initial),JSON.parse(reader.result));save();show('dashboard');}
    catch{alert('Sauvegarde JSON invalide.');}
  };
  reader.readAsText(file);
});
