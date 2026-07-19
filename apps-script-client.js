/* Google Apps Script synchronization layer */
(function(){
'use strict';
const ENDPOINT=()=>String((window.LOFOTEN_CONFIG||{}).appsScriptUrl||'').trim();
const PASS_KEY='lofoten-apps-script-key';
let timer=null;

function getKey(force){
  let key=sessionStorage.getItem(PASS_KEY)||localStorage.getItem(PASS_KEY)||'';
  if(force||!key){
    key=prompt('Phrase secrète du roadbook Google Drive :',key)||'';
    key=key.trim();
    if(key)localStorage.setItem(PASS_KEY,key);
  }
  return key;
}

async function call(action,payload){
  const url=ENDPOINT();
  if(!url)throw new Error("L’URL Google Apps Script n’est pas encore configurée.");
  const key=getKey(false);
  if(!key)throw new Error('Phrase secrète requise.');
  const response=await fetch(url,{method:'POST',redirect:'follow',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({action,key,...payload})});
  const text=await response.text();
  let result;
  try{result=JSON.parse(text)}catch{throw new Error('Réponse Apps Script illisible. Vérifie que le déploiement autorise « Toute personne ».')}
  if(!result.ok)throw new Error(result.error||'Erreur Apps Script');
  return result;
}

window.googleLogin=function(){
  if(!ENDPOINT())return alert("Ajoute d’abord l’URL /exec du déploiement Apps Script dans config.js.");
  getKey(true);
  window.pullAll();
};

window.pushAll=async function(){
  try{
    setSync('local','Enregistrement dans Drive…');
    await call('save',{state});
    setSync('online','Synchronisé avec Drive');
  }catch(err){
    console.error(err);setSync('local','Erreur Drive');alert(err.message);
  }
};

window.pullAll=async function(){
  try{
    setSync('local','Chargement depuis Drive…');
    const result=await call('load',{});
    if(result.state){
      state=Object.assign(clone(initial),result.state);
      save();
      show(active);
      setSync('online','Chargé depuis Drive');
    }else{
      setSync('online','Drive prêt — première sauvegarde');
    }
  }catch(err){
    console.error(err);setSync('local','Erreur Drive');alert(err.message);
  }
};

window.autoSync=function(){
  if(!ENDPOINT()||!localStorage.getItem(PASS_KEY))return;
  clearTimeout(timer);
  timer=setTimeout(()=>window.pushAll(),1200);
};

window.renderSync=function(){
  const configured=Boolean(ENDPOINT());
  byId('app').innerHTML=`<div class="grid"><section class="card"><h2>Google Drive via Apps Script</h2><p>${configured?'Le backend est configuré. Utilise la phrase secrète créée dans Google Sheets.':'Le backend est prêt, mais son URL de déploiement doit encore être ajoutée dans config.js.'}</p><div class="toolbar"><button id="sync-login" class="primary">Connecter Drive</button><button id="sync-push">Enregistrer maintenant</button><button id="sync-pull">Charger depuis Drive</button><button id="sync-forget">Oublier la phrase secrète</button></div><p class="muted">${configured?'URL Apps Script configurée':'URL Apps Script manquante'}</p></section><section class="card"><h2>Sauvegarde de secours</h2><div class="toolbar"><button id="export-json">Exporter JSON</button><button id="import-json">Importer JSON</button><button id="reset-all" class="danger">Tout réinitialiser</button></div></section></div>`;
  byId('sync-login').onclick=window.googleLogin;
  byId('sync-push').onclick=window.pushAll;
  byId('sync-pull').onclick=window.pullAll;
  byId('sync-forget').onclick=()=>{localStorage.removeItem(PASS_KEY);sessionStorage.removeItem(PASS_KEY);setSync('local','Phrase secrète oubliée')};
  byId('export-json').onclick=exportJSON;
  byId('import-json').onclick=()=>byId('json-file').click();
  byId('reset-all').onclick=()=>{if(confirm('Tout effacer localement ?')){state=clone(initial);save();show('dashboard')}};
};

window.addEventListener('DOMContentLoaded',()=>{
  const top=byId('google-login');
  if(top){top.textContent='Connexion Drive';top.onclick=window.googleLogin;}
  if(ENDPOINT()&&localStorage.getItem(PASS_KEY))setSync('online','Drive configuré');
});
})();
