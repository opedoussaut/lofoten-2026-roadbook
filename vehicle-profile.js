'use strict';

(function installVehicleProfile(){
  const PROFILE={
    bookingCategory:'Roadsurfer Cozy Cottage',
    referenceModel:'KNAUS VAN TI PLUS',
    modelNotice:'La réservation garantit la catégorie Cozy Cottage, pas nécessairement un exemplaire précis. Roadsurfer peut remettre un véhicule comparable ou supérieur. Le modèle et l’immatriculation exacts doivent être confirmés à Champlan le 24 août.',
    type:'Camping-car semi-intégré',
    seats:'3 adultes',
    beds:'2 adultes + 1 enfant',
    engine:'Diesel · 140 ch · Euro 6',
    transmission:'Manuelle ou automatique selon le véhicule remis',
    adblue:'Oui — niveau à vérifier et plein à restituer',
    bodyLength:'6,99 m',
    foldedRackLength:'7,33 m',
    deployedRackLength:'7,80 m',
    height:'3,15 m',
    widthMirrors:'2,74 m avec rétroviseurs',
    maxWeight:'PTAC de référence 3 500 kg — confirmer sur la carte grise',
    freshWater:'95 L',
    wasteWater:'73 L',
    payload:'260 kg annoncés par Roadsurfer, passagers, bagages et eau compris selon leurs conditions',
    gas:'PROPANE — pas butane pour la Scandinavie',
    gasSystem:'Installation 30 mbar',
    gasBottle:'Compartiment de référence KNAUS prévu jusqu’à 2 bouteilles de 11 kg. Roadsurfer fournit la/les bouteille(s), mais le nombre, le format et le raccord exacts doivent être contrôlés à la remise.',
    gasUse:'La bouteille alimente au minimum les deux feux de cuisson. Le chauffage est annoncé par Roadsurfer comme fonctionnant au diesel en Europe continentale; vérifier sur le véhicule remis si l’eau chaude utilise également le gaz.',
    sygicLength:'7,80 m',
    sygicWidth:'2,74 m',
    sygicHeight:'3,25 m',
    sygicWeight:'3,50 t',
    sygicNote:'Profil volontairement conservateur : porte-vélos déployé et marge de 10 cm sur la hauteur.'
  };

  function seed(){
    if(typeof state==='undefined')return;
    state.vehicleProfile=JSON.parse(JSON.stringify(PROFILE));
    if(typeof save==='function')save();
  }

  function profileHtml(compact=false){
    const p=state.vehicleProfile||PROFILE;
    return `<section class="card" style="margin-bottom:12px;border:2px solid #0f766e">
      <p class="eyebrow">VÉHICULE RÉSERVÉ</p>
      <h2>${esc(p.bookingCategory)} · référence ${esc(p.referenceModel)}</h2>
      <p class="muted">${esc(p.modelNotice)}</p>
      <div class="grid">
        <div><b>Motorisation</b><p>${esc(p.engine)}<br>${esc(p.transmission)}<br>AdBlue : ${esc(p.adblue)}</p></div>
        <div><b>Dimensions réelles de référence</b><p>Carrosserie ${esc(p.bodyLength)}<br>Porte-vélos replié ${esc(p.foldedRackLength)}<br>Porte-vélos déployé ${esc(p.deployedRackLength)}<br>Hauteur ${esc(p.height)}<br>Largeur ${esc(p.widthMirrors)}</p></div>
        <div><b>Profil GPS camping-car</b><p>Longueur <strong>${esc(p.sygicLength)}</strong><br>Largeur <strong>${esc(p.sygicWidth)}</strong><br>Hauteur <strong>${esc(p.sygicHeight)}</strong><br>Poids <strong>${esc(p.sygicWeight)}</strong><br><span class="muted">${esc(p.sygicNote)}</span></p></div>
        <div><b>Gaz cellule</b><p><strong>${esc(p.gas)}</strong><br>${esc(p.gasSystem)}<br>${esc(p.gasBottle)}</p></div>
      </div>
      ${compact?'':`<div class="popup-warning"><b>Usage du gaz :</b> ${esc(p.gasUse)}<br><b>À la prise en charge :</b> photographier la carte grise, mesurer la hauteur affichée, relever le poids autorisé, le nombre de bouteilles, leur contenu, leur raccord et le fonctionnement du chauffage/eau chaude avant de quitter Champlan.</div>`}
    </section>`;
  }

  function install(){
    seed();
    if(typeof renderDashboard==='function'){
      const baseDashboard=window.renderDashboard;
      window.renderDashboard=function(){baseDashboard();const app=document.getElementById('app');if(app)app.insertAdjacentHTML('afterbegin',profileHtml(true));};
    }
    if(typeof renderVan==='function'){
      const baseVan=window.renderVan;
      window.renderVan=function(){baseVan();const app=document.getElementById('app');if(app)app.insertAdjacentHTML('afterbegin',profileHtml(false));};
    }
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
