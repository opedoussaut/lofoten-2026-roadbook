'use strict';

(function installGitHubStorage(){
  const DATA_REPO='opedoussaut/lofoten-2026-data';
  const API_ROOT=`https://api.github.com/repos/${DATA_REPO}`;
  const AUTH_KEY='lofoten-github-auth-v1';
  const DIRTY_KEY='lofoten-github-dirty-v1';
  const LAST_SYNC_KEY='lofoten-github-last-sync-v1';
  const HASHES_KEY='lofoten-github-hashes-v1';
  const MIGRATION_KEY='lofoten-github-migration-v1';
  const DEVICE_KEY='lofoten-github-device-v1';
  const SYNC_DELAY=60000;

  let token='';
  let syncTimer=null;
  let syncing=false;
  let suppressDirty=false;
  let syncError='';
  let lastCommit='';
  let deviceName=localStorage.getItem(DEVICE_KEY)||'';

  const originalSave=save;
  const originalSetSync=setSync;

  function now(){return new Date().toISOString();}
  function isDirty(){return localStorage.getItem(DIRTY_KEY)==='1';}
  function setDirty(value){localStorage.setItem(DIRTY_KEY,value?'1':'0');updateHeader();}
  function lastSync(){return localStorage.getItem(LAST_SYNC_KEY)||'';}
  function getHashes(){try{return JSON.parse(localStorage.getItem(HASHES_KEY)||'{}')}catch{return {}}}
  function setHashes(value){localStorage.setItem(HASHES_KEY,JSON.stringify(value));}

  function bytesToBase64(bytes){
    let binary='';
    for(let i=0;i<bytes.length;i+=0x8000)binary+=String.fromCharCode(...bytes.subarray(i,i+0x8000));
    return btoa(binary);
  }
  function base64ToBytes(value){
    const binary=atob(value.replace(/\n/g,''));
    const bytes=new Uint8Array(binary.length);
    for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
    return bytes;
  }
  function encodeText(value){return bytesToBase64(new TextEncoder().encode(value));}
  function decodeText(value){return new TextDecoder().decode(base64ToBytes(value));}

  async function digest(value){
    const hash=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value));
    return bytesToBase64(new Uint8Array(hash));
  }

  async function deriveKey(pin,salt){
    const source=await crypto.subtle.importKey('raw',new TextEncoder().encode(pin),'PBKDF2',false,['deriveKey']);
    return crypto.subtle.deriveKey({name:'PBKDF2',salt,iterations:180000,hash:'SHA-256'},source,{name:'AES-GCM',length:256},false,['encrypt','decrypt']);
  }
  async function rememberToken(value,pin){
    const salt=crypto.getRandomValues(new Uint8Array(16));
    const iv=crypto.getRandomValues(new Uint8Array(12));
    const key=await deriveKey(pin,salt);
    const cipher=await crypto.subtle.encrypt({name:'AES-GCM',iv},key,new TextEncoder().encode(value));
    localStorage.setItem(AUTH_KEY,JSON.stringify({salt:bytesToBase64(salt),iv:bytesToBase64(iv),cipher:bytesToBase64(new Uint8Array(cipher))}));
  }
  async function unlockToken(pin){
    const stored=JSON.parse(localStorage.getItem(AUTH_KEY)||'null');
    if(!stored)throw new Error('Aucun jeton mémorisé sur cet appareil.');
    const key=await deriveKey(pin,base64ToBytes(stored.salt));
    const clear=await crypto.subtle.decrypt({name:'AES-GCM',iv:base64ToBytes(stored.iv)},key,base64ToBytes(stored.cipher));
    return new TextDecoder().decode(clear);
  }

  async function api(path,options={}){
    if(!token)throw new Error('GitHub n’est pas déverrouillé sur cet appareil.');
    const response=await fetch(`${API_ROOT}${path}`,{
      ...options,
      headers:{
        'Accept':'application/vnd.github+json',
        'Authorization':`Bearer ${token}`,
        'X-GitHub-Api-Version':'2022-11-28',
        ...(options.headers||{})
      }
    });
    if(response.status===404)return null;
    if(!response.ok){
      let detail='';
      try{detail=(await response.json()).message||''}catch{}
      if(response.status===401||response.status===403)throw new Error(`Accès GitHub refusé (${response.status}). Vérifier le jeton et son autorisation Contents: read and write sur ${DATA_REPO}.`);
      throw new Error(`GitHub ${response.status}${detail?` · ${detail}`:''}`);
    }
    if(response.status===204)return null;
    return response.json();
  }

  async function validateToken(){
    const repo=await api('');
    if(!repo||repo.full_name!==DATA_REPO)throw new Error('Le dépôt privé de données est inaccessible.');
    if(repo.visibility!=='private')throw new Error('Le dépôt de données doit rester privé.');
    return repo;
  }

  async function readRemote(path){
    const file=await api(`/contents/${path}?ref=main`);
    if(!file)return null;
    return {sha:file.sha,text:decodeText(file.content),json:JSON.parse(decodeText(file.content))};
  }

  async function writeRemote(path,text,message){
    const current=await api(`/contents/${path}?ref=main`);
    const body={message,content:encodeText(text),branch:'main'};
    if(current?.sha)body.sha=current.sha;
    return api(`/contents/${path}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
  }

  function geoJson(){
    const points=(state.gps?.points||[]).filter(p=>Number.isFinite(Number(p.lat))&&Number.isFinite(Number(p.lon)));
    const features=[];
    if(points.length===1){
      features.push({type:'Feature',properties:{recordedAt:points[0].time||null},geometry:{type:'Point',coordinates:[Number(points[0].lon),Number(points[0].lat)]}});
    }else if(points.length>1){
      features.push({type:'Feature',properties:{distanceKm:Number(state.gps?.km||0),pointCount:points.length,updatedAt:state.updatedAt||now()},geometry:{type:'LineString',coordinates:points.map(p=>[Number(p.lon),Number(p.lat)])}});
    }
    return {type:'FeatureCollection',features};
  }

  function remoteFiles(){
    const updatedAt=state.updatedAt||now();
    return {
      'trip/current.json':{
        meta:state.meta||{},current:state.current||{},routePolicy:state.routePolicy||{},updatedAt
      },
      'trip/plan.json':{
        activeRoutePlan:state.activeRoutePlan||'official',itinerary:state.itinerary||[],nightlyOptions:state.nightlyOptions||{},updatedAt
      },
      'trip/hikes.json':{
        activities:state.activities||[],olivier:state.olivier||[],selectionVersion:state.hikeSelectionVersion||null,updatedAt
      },
      'trip/van.json':{
        vehicleProfile:state.vehicleProfile||{},van:state.van||{},updatedAt
      },
      'journal/entries.json':{entries:state.journal||[],updatedAt},
      'expenses/expenses.json':{expenses:state.expenses||[],updatedAt},
      'gps/track.geojson':geoJson(),
      'backups/latest.json':{schemaVersion:1,updatedAt,state:JSON.parse(JSON.stringify(state))}
    };
  }

  async function pushToGitHub(force=false){
    if(syncing)return;
    if(!token)throw new Error('Déverrouiller GitHub avant la synchronisation.');
    if(!navigator.onLine)throw new Error('Hors ligne: les changements restent protégés sur cet appareil et seront envoyés au retour du réseau.');
    if(!force&&!isDirty())return;
    syncing=true;syncError='';setGitHubStatus('syncing','Synchronisation GitHub…');
    try{
      await validateToken();
      const files=remoteFiles();
      const hashes=getHashes();
      let changed=0;
      for(const [path,data] of Object.entries(files)){
        const text=JSON.stringify(data,null,2)+'\n';
        const hash=await digest(text);
        if(!force&&hashes[path]===hash)continue;
        const result=await writeRemote(path,text,`Roadbook sync · ${path} · ${new Date().toLocaleString('fr-FR')}`);
        hashes[path]=hash;
        lastCommit=result?.commit?.sha||lastCommit;
        changed++;
      }
      const syncedAt=now();
      const previousManifest=await readRemote('sync/manifest.json');
      const revision=Number(previousManifest?.json?.revision||0)+1;
      const manifest={schemaVersion:1,revision,updatedAt:syncedAt,updatedBy:deviceName||'roadbook-web',lastCommit,files:Object.keys(files)};
      const manifestResult=await writeRemote('sync/manifest.json',JSON.stringify(manifest,null,2)+'\n',`Roadbook sync manifest · revision ${revision}`);
      lastCommit=manifestResult?.commit?.sha||lastCommit;
      setHashes(hashes);
      localStorage.setItem(LAST_SYNC_KEY,syncedAt);
      setDirty(false);
      setGitHubStatus('online',changed?`GitHub synchronisé · ${changed} fichier${changed>1?'s':''}`:'GitHub à jour');
    }catch(error){
      syncError=error.message;setGitHubStatus('error','Erreur GitHub · données conservées localement');throw error;
    }finally{
      syncing=false;
      if(active==='sync')renderGitHubSync();
    }
  }

  function mergeRemoteFiles(parts){
    const backup=parts.backup?.state;
    if(backup&&typeof backup==='object')return Object.assign(clone(initial),backup);
    const merged=Object.assign(clone(initial),state);
    if(parts.current){merged.meta=parts.current.meta||merged.meta;merged.current=parts.current.current||merged.current;merged.routePolicy=parts.current.routePolicy||merged.routePolicy;}
    if(parts.plan){if(Array.isArray(parts.plan.itinerary)&&parts.plan.itinerary.length)merged.itinerary=parts.plan.itinerary;if(parts.plan.nightlyOptions&&Object.keys(parts.plan.nightlyOptions).length)merged.nightlyOptions=parts.plan.nightlyOptions;merged.activeRoutePlan=parts.plan.activeRoutePlan||merged.activeRoutePlan;}
    if(parts.hikes){if(Array.isArray(parts.hikes.activities)&&parts.hikes.activities.length)merged.activities=parts.hikes.activities;if(Array.isArray(parts.hikes.olivier)&&parts.hikes.olivier.length)merged.olivier=parts.hikes.olivier;merged.hikeSelectionVersion=parts.hikes.selectionVersion||merged.hikeSelectionVersion;}
    if(parts.van){merged.vehicleProfile=parts.van.vehicleProfile||merged.vehicleProfile;merged.van=parts.van.van||merged.van;}
    if(parts.journal?.entries)merged.journal=parts.journal.entries;
    if(parts.expenses?.expenses)merged.expenses=parts.expenses.expenses;
    return merged;
  }

  async function pullFromGitHub(){
    if(syncing)return;
    if(!token)throw new Error('Déverrouiller GitHub avant le chargement.');
    if(!navigator.onLine)throw new Error('Connexion internet nécessaire pour charger depuis GitHub.');
    if(isDirty()&&!confirm('Des changements locaux ne sont pas encore envoyés. Charger GitHub les remplacera sur cet appareil. Continuer ?'))return;
    syncing=true;syncError='';setGitHubStatus('syncing','Chargement depuis GitHub…');
    try{
      await validateToken();
      const [current,plan,hikes,van,journal,expenses,backup,manifest]=await Promise.all([
        readRemote('trip/current.json'),readRemote('trip/plan.json'),readRemote('trip/hikes.json'),readRemote('trip/van.json'),readRemote('journal/entries.json'),readRemote('expenses/expenses.json'),readRemote('backups/latest.json'),readRemote('sync/manifest.json')
      ]);
      const next=mergeRemoteFiles({current:current?.json,plan:plan?.json,hikes:hikes?.json,van:van?.json,journal:journal?.json,expenses:expenses?.json,backup:backup?.json});
      suppressDirty=true;
      state=next;
      state.updatedAt=manifest?.json?.updatedAt||state.updatedAt||now();
      localStorage.setItem(KEY,JSON.stringify(state));
      suppressDirty=false;
      localStorage.setItem(LAST_SYNC_KEY,manifest?.json?.updatedAt||now());
      setDirty(false);
      setGitHubStatus('online','Données chargées depuis GitHub');
      show(active==='sync'?'dashboard':active);
    }catch(error){syncError=error.message;setGitHubStatus('error','Échec du chargement GitHub');throw error;}
    finally{syncing=false;if(active==='sync')renderGitHubSync();}
  }

  function scheduleSync(){
    clearTimeout(syncTimer);
    if(!token||!navigator.onLine)return;
    syncTimer=setTimeout(()=>pushToGitHub(false).catch(console.warn),SYNC_DELAY);
  }

  save=function(){
    state.updatedAt=now();
    localStorage.setItem(KEY,JSON.stringify(state));
    if(!suppressDirty)setDirty(true);
    setGitHubStatus(token?'pending':'local',token?'Modification locale · GitHub en attente':'Sauvegardé localement · GitHub verrouillé');
    scheduleSync();
  };

  autoSync=function(){scheduleSync();};

  setSync=function(mode,msg){
    const dot=byId('sync-dot'),label=byId('sync-label');if(!dot||!label)return;
    const online=mode==='online'||mode==='pending'||mode==='syncing';
    dot.className=`dot ${online?'online':'offline'}`;
    label.textContent=msg||(token?(isDirty()?'GitHub en attente':'GitHub synchronisé'):'GitHub verrouillé');
  };

  function setGitHubStatus(mode,msg){setSync(mode,msg);updateHeader();}
  function updateHeader(){
    const button=byId('github-login')||byId('google-login');
    if(button)button.textContent=token?(isDirty()?'GitHub · à synchroniser':'GitHub · connecté'):(localStorage.getItem(AUTH_KEY)?'Déverrouiller GitHub':'Connecter GitHub');
  }

  function formatDate(value){if(!value)return 'Jamais';try{return new Intl.DateTimeFormat('fr-FR',{dateStyle:'medium',timeStyle:'short'}).format(new Date(value))}catch{return value}}
  function exportBackup(){
    const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),link=document.createElement('a');
    link.href=URL.createObjectURL(blob);link.download=`lofoten-2026-backup-${new Date().toISOString().slice(0,10)}.json`;link.click();URL.revokeObjectURL(link.href);
  }

  function authPanel(){
    const remembered=Boolean(localStorage.getItem(AUTH_KEY));
    if(token)return `<section class="card"><p class="eyebrow">CONNEXION ACTIVE</p><h2>Dépôt privé GitHub</h2><p><b>${DATA_REPO}</b></p><div class="grid">${card('Dernière synchronisation',formatDate(lastSync()))}${card('État local',isDirty()?'Changements en attente':'À jour')}${card('Appareil',deviceName||'Non nommé')}${card('Dernier commit',lastCommit?lastCommit.slice(0,10):'—')}</div><div class="toolbar" style="margin-top:12px"><button id="gh-push" class="primary">Synchroniser maintenant</button><button id="gh-pull">Charger depuis GitHub</button><button id="gh-export">Télécharger une sauvegarde</button><button id="gh-lock">Verrouiller</button><button id="gh-disconnect" class="danger">Oublier cet appareil</button></div>${syncError?`<div class="popup-warning"><b>Erreur :</b> ${esc(syncError)}</div>`:''}</section>`;
    if(remembered)return `<section class="card"><p class="eyebrow">GITHUB VERROUILLÉ</p><h2>Déverrouiller ce roadbook</h2><p>Le jeton est chiffré sur cet appareil. Saisir le code PIN choisi lors de la connexion.</p><div class="form"><label>Code PIN<input id="gh-pin-unlock" type="password" inputmode="numeric" autocomplete="current-password"></label><label>Nom de l’appareil<input id="gh-device-unlock" value="${esc(deviceName)}" placeholder="Téléphone Olivier"></label></div><button id="gh-unlock" class="primary">Déverrouiller GitHub</button>${syncError?`<div class="popup-warning"><b>Erreur :</b> ${esc(syncError)}</div>`:''}</section>`;
    return `<section class="card"><p class="eyebrow">PREMIÈRE CONNEXION</p><h2>Relier le roadbook au dépôt privé</h2><p>Créer un jeton GitHub finement limité au seul dépôt <b>${DATA_REPO}</b>, avec l’autorisation <b>Contents: Read and write</b>. Le jeton n’est jamais envoyé ailleurs que vers l’API GitHub et n’est jamais enregistré dans le dépôt public.</p><div class="form"><label>Jeton GitHub<input id="gh-token" type="password" autocomplete="off" placeholder="github_pat_…"></label><label>Nom de l’appareil<input id="gh-device" value="${esc(deviceName)}" placeholder="Téléphone Olivier"></label><label>Code PIN local<input id="gh-pin" type="password" inputmode="numeric" autocomplete="new-password" placeholder="4 caractères minimum"></label><label><input id="gh-remember" type="checkbox" checked> Mémoriser le jeton chiffré sur cet appareil</label></div><div class="toolbar"><button id="gh-connect" class="primary">Connecter GitHub</button><a class="btn" href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noopener">Créer le jeton ↗</a></div><div class="popup-warning"><b>Migration :</b> après connexion, utiliser «Synchroniser maintenant» pour envoyer le roadbook actuellement présent sur cet appareil vers le dépôt privé.</div>${syncError?`<div class="popup-warning"><b>Erreur :</b> ${esc(syncError)}</div>`:''}</section>`;
  }

  function renderGitHubSync(){
    byId('app').innerHTML=`<section class="card" style="border-left:5px solid #0f766e;margin-bottom:12px"><p class="eyebrow">SAUVEGARDE GITHUB UNIQUEMENT</p><h1>GitHub privé + fonctionnement hors ligne</h1><p>Chaque changement est enregistré immédiatement sur l’appareil. Dès que le réseau et la connexion GitHub sont disponibles, les fichiers privés sont synchronisés séquentiellement vers <b>${DATA_REPO}</b>.</p></section>${authPanel()}<section class="card" style="margin-top:12px"><h2>Fichiers synchronisés</h2><div class="spec-grid"><section><h3>Voyage</h3><p><code>trip/current.json</code><br><code>trip/plan.json</code><br><code>trip/hikes.json</code><br><code>trip/van.json</code></p></section><section><h3>Vie du voyage</h3><p><code>journal/entries.json</code><br><code>expenses/expenses.json</code><br><code>gps/track.geojson</code></p></section><section><h3>Récupération</h3><p><code>backups/latest.json</code><br><code>sync/manifest.json</code></p></section></div><div class="popup-warning"><b>Important :</b> le dépôt doit rester privé. Les photos originales et vidéos ne sont pas stockées ici; le dépôt contient les données opérationnelles du roadbook.</div></section>`;
    bindSyncUi();
  }

  renderSync=renderGitHubSync;

  function bindSyncUi(){
    const connect=byId('gh-connect');if(connect)connect.onclick=async()=>{
      try{
        const value=byId('gh-token').value.trim(),pin=byId('gh-pin').value,remember=byId('gh-remember').checked;
        if(!value)throw new Error('Saisir un jeton GitHub.');
        if(remember&&pin.length<4)throw new Error('Le code PIN doit contenir au moins 4 caractères.');
        token=value;deviceName=byId('gh-device').value.trim()||'roadbook-web';localStorage.setItem(DEVICE_KEY,deviceName);
        await validateToken();
        if(remember)await rememberToken(token,pin);else localStorage.removeItem(AUTH_KEY);
        setGitHubStatus('pending','GitHub connecté · synchronisation à lancer');renderGitHubSync();
      }catch(error){syncError=error.message;token='';renderGitHubSync();}
    };
    const unlock=byId('gh-unlock');if(unlock)unlock.onclick=async()=>{
      try{token=await unlockToken(byId('gh-pin-unlock').value);deviceName=byId('gh-device-unlock').value.trim()||deviceName||'roadbook-web';localStorage.setItem(DEVICE_KEY,deviceName);await validateToken();syncError='';setGitHubStatus(isDirty()?'pending':'online',isDirty()?'GitHub déverrouillé · changements en attente':'GitHub déverrouillé');renderGitHubSync();scheduleSync();}
      catch(error){token='';syncError='Code PIN incorrect ou jeton expiré.';renderGitHubSync();}
    };
    const push=byId('gh-push');if(push)push.onclick=()=>pushToGitHub(true).catch(error=>{syncError=error.message;renderGitHubSync();});
    const pull=byId('gh-pull');if(pull)pull.onclick=()=>pullFromGitHub().catch(error=>{syncError=error.message;renderGitHubSync();});
    const exp=byId('gh-export');if(exp)exp.onclick=exportBackup;
    const lock=byId('gh-lock');if(lock)lock.onclick=()=>{token='';clearTimeout(syncTimer);setGitHubStatus('local','GitHub verrouillé · données locales conservées');renderGitHubSync();};
    const disconnect=byId('gh-disconnect');if(disconnect)disconnect.onclick=()=>{if(!confirm('Oublier le jeton chiffré sur cet appareil ? Les données locales et GitHub ne seront pas supprimées.'))return;token='';localStorage.removeItem(AUTH_KEY);localStorage.removeItem(HASHES_KEY);setGitHubStatus('local','GitHub déconnecté');renderGitHubSync();};
  }

  function replaceHeaderButton(){
    const old=byId('google-login');if(!old)return;
    const button=old.cloneNode(true);old.replaceWith(button);button.id='github-login';button.textContent='Connecter GitHub';button.onclick=()=>show('sync');
  }

  function install(){
    replaceHeaderButton();
    if(!localStorage.getItem(MIGRATION_KEY)){localStorage.setItem(MIGRATION_KEY,'v1');setDirty(true);}
    updateHeader();
    setGitHubStatus('local',localStorage.getItem(AUTH_KEY)?'GitHub verrouillé · sauvegarde locale active':'Sauvegarde locale · GitHub à connecter');
    window.addEventListener('online',()=>{setGitHubStatus(token?'pending':'local',token?'Réseau revenu · synchronisation en attente':'Réseau revenu · GitHub verrouillé');scheduleSync();});
    window.addEventListener('offline',()=>setGitHubStatus('local','Hors ligne · changements protégés sur cet appareil'));
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'&&token&&isDirty()&&navigator.onLine)pushToGitHub(false).catch(console.warn);});
    window.addEventListener('beforeunload',()=>{if(token&&isDirty()&&navigator.onLine)navigator.sendBeacon?.('data:,');});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
  window.LOFOTEN_GITHUB_SYNC={push:pushToGitHub,pull:pullFromGitHub,repo:DATA_REPO};
})();
