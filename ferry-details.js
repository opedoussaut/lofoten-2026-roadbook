'use strict';

(function installFerryDetails(){
  const DETAILS={
    route:'Moskenes → Bodø',
    date:'Vendredi 4 septembre 2026',
    operator:'Torghatten Nord · route 18-782',
    recommended:'11:00 → 14:30',
    duration:'3 h 30',
    directAlternatives:['06:00 → 09:15 · 3 h 15','15:30 → 18:45 · 3 h 15','19:30 → 23:00 · 3 h 30','23:30 → 02:45 · 3 h 15'],
    vehicleClass:'Camping-car diesel de 6,01 à 8,00 m',
    fare:1302,
    reservation:170,
    total:1472,
    minCheckIn:'10:15 pour le départ recommandé de 11:00',
    comfortableArrival:'09:45 recommandé avec Paddy et le camping-car',
    bookingDeadline:'20:00 la veille au plus tard, sous réserve de disponibilité',
    bookingUrl:'https://www.torghatten.no/en/booking/find-tickets?date=2026-09-04&from=NSR%3AStopPlace%3A47301&to=NSR%3AStopPlace%3A49735',
    routeUrl:'https://www.torghatten.no/en/our-routes/18-782',
    timetableUrl:'https://cdn.sanity.io/files/ufla9djl/production/b34cfed064c57ef3db2db26791796455b7ee5ecd.pdf',
    contactBodo:'bodo@thn.no',
    contactLandegode:'landegode@torghatten.no'
  };

  const PET_EMAIL_SUBJECT='Moskenes–Bodø 4 September 2026 — dog must remain with owners';
  const PET_EMAIL_BODY=`Hello,\n\nWe plan to travel from Moskenes to Bodø on 4 September 2026 with a small 3 kg dog and a motorhome under 8 metres.\n\nOur non-negotiable condition is that our dog remains physically with us for the entire crossing. We will not leave him alone in the vehicle and we will not place him alone in a crate or dog room.\n\nCan you please confirm in writing whether there is a designated indoor or outdoor passenger area where we may remain together with our dog for the whole crossing? Please also confirm which direct departure and vessel allow this.\n\nThank you.`;

  function mailto(address){return `mailto:${address}?subject=${encodeURIComponent(PET_EMAIL_SUBJECT)}&body=${encodeURIComponent(PET_EMAIL_BODY)}`;}

  function seed(){
    state.ferryBooking=Object.assign({
      status:'NON VALIDÉ — confirmation écrite requise pour que Paddy reste avec nous',
      selectedDeparture:'11:00 → 14:30',
      bookingReference:'',
      petTogetherConfirmed:false,
      booked:false,
      confirmationNote:'',
      updatedAt:null
    },state.ferryBooking||{});
    const row=(state.itinerary||[]).find(item=>item[0]==='04/09');
    if(row)row[7]='Condition absolue : Paddy reste physiquement avec nous pendant toute la traversée. Ferry non validé sans confirmation écrite de Torghatten.';
  }

  function cardHtml(){
    const booking=state.ferryBooking||{};
    const petOk=Boolean(booking.petTogetherConfirmed);
    return `<section id="ferry-detail-card" class="card" style="border:3px solid ${petOk?'#0f766e':'#b91c1c'};margin:12px 0">
      <p class="eyebrow">FERRY UNIQUE DU VOYAGE · DOSSIER COMPLET</p>
      <div class="nightly-options-heading"><div><h2>${esc(DETAILS.route)}</h2><p>${esc(DETAILS.date)} · ${esc(DETAILS.operator)}</p></div><div style="text-align:right"><b>${esc(DETAILS.recommended)}</b><br><span>${esc(DETAILS.duration)}</span></div></div>

      <div class="popup-warning" style="border-left-color:#b91c1c;background:rgba(185,28,28,.1)"><b>RÈGLE NON NÉGOCIABLE — PADDY RESTE AVEC NOUS.</b><br>Laisser Paddy seul dans le camping-car ou seul dans une cage/local chiens est exclu. La FAQ officielle publiée pour cette ligne ne mentionne actuellement que ces deux options. La traversée reste donc <b>NON VALIDÉE</b> tant que Torghatten n’a pas confirmé par écrit un espace où Olivier, Sorya et Paddy peuvent rester ensemble pendant toute la traversée.</div>

      <div class="spec-grid" style="margin-top:14px">
        <section><h3>Départ recommandé</h3><dl class="spec-list"><div><dt>Traversée directe</dt><dd>${esc(DETAILS.recommended)}</dd></div><div><dt>Durée</dt><dd>${esc(DETAILS.duration)}</dd></div><div><dt>Présence au quai</dt><dd>${esc(DETAILS.minCheckIn)}</dd></div><div><dt>Marge confortable</dt><dd>${esc(DETAILS.comfortableArrival)}</dd></div></dl></section>
        <section><h3>Prix attendu</h3><dl class="spec-list"><div><dt>Catégorie</dt><dd>${esc(DETAILS.vehicleClass)}</dd></div><div><dt>Billet véhicule</dt><dd>${DETAILS.fare.toLocaleString('fr-FR')} NOK</dd></div><div><dt>Garantie de place</dt><dd>${DETAILS.reservation.toLocaleString('fr-FR')} NOK</dd></div><div><dt>Total attendu</dt><dd><strong>${DETAILS.total.toLocaleString('fr-FR')} NOK</strong></dd></div></dl><p class="muted">Sous réserve de la longueur réelle du camping-car remis et des conditions appliquées lors de la réservation.</p></section>
        <section><h3>Réservation</h3><p>Réserver directement sur le site Torghatten. La réservation garantit une place sur la capacité ouverte à la vente si vous êtes dans la file <b>Reserved/Prepaid</b> au moins 45 minutes avant le départ.</p><p><b>Date limite publiée :</b> ${esc(DETAILS.bookingDeadline)}.</p><p class="muted">Ne pas attendre la veille : réserver dès réception de la confirmation écrite concernant Paddy et après confirmation de la longueur exacte du véhicule.</p></section>
        <section><h3>Autres traversées directes le vendredi</h3><ul>${DETAILS.directAlternatives.map(item=>`<li>${esc(item)}</li>`).join('')}</ul><p class="muted">Éviter les traversées via Værøy/Røst : elles sont nettement plus longues. Torghatten recommande les traversées directes entre Moskenes et Bodø.</p></section>
      </div>

      <section class="card" style="margin-top:12px;border:2px solid ${petOk?'#0f766e':'#b91c1c'}">
        <h3>${petOk?'✅ Paddy avec nous — confirmation enregistrée':'⛔ Paddy avec nous — confirmation écrite manquante'}</h3>
        <p>Écrire aux navires/opérateurs avant de réserver et demander une réponse explicite sur un espace passagers intérieur ou extérieur autorisé aux chiens avec leurs propriétaires.</p>
        <div class="toolbar"><a class="btn primary" href="${mailto(DETAILS.contactBodo)}">Écrire à MF Bodø ↗</a><a class="btn" href="${mailto(DETAILS.contactLandegode)}">Écrire à MF Landegode ↗</a></div>
        <div class="form" style="margin-top:12px"><label><input id="ferry-pet-confirmed" type="checkbox" ${petOk?'checked':''}> Confirmation écrite reçue : Paddy peut rester avec nous pendant toute la traversée</label><label>Réponse / conditions reçues<textarea id="ferry-confirmation-note" placeholder="Copier ici la réponse de Torghatten">${esc(booking.confirmationNote||'')}</textarea></label></div>
      </section>

      <section class="card" style="margin-top:12px">
        <h3>Suivi de réservation</h3>
        <div class="form"><label>Départ retenu<select id="ferry-departure"><option>11:00 → 14:30</option><option>06:00 → 09:15</option><option>15:30 → 18:45</option><option>19:30 → 23:00</option><option>23:30 → 02:45</option></select></label><label>Référence de réservation<input id="ferry-reference" value="${esc(booking.bookingReference||'')}" placeholder="Référence Torghatten"></label><label><input id="ferry-booked" type="checkbox" ${booking.booked?'checked':''}> Réservation effectuée</label></div>
        <div class="toolbar"><button id="ferry-save" class="primary">Enregistrer dans GitHub</button><a class="btn ${petOk?'primary':''}" href="${DETAILS.bookingUrl}" target="_blank" rel="noopener">Réserver chez Torghatten ↗</a><a class="btn" href="${DETAILS.routeUrl}" target="_blank" rel="noopener">Page officielle de la ligne ↗</a><a class="btn" href="${DETAILS.timetableUrl}" target="_blank" rel="noopener">Horaires PDF 2026 ↗</a></div>
        ${petOk?'':'<div class="popup-warning"><b>Ne pas finaliser la réservation avant la confirmation écrite concernant Paddy.</b></div>'}
      </section>

      <details class="card" style="margin-top:12px"><summary><b>Procédure au terminal de Moskenes</b></summary><ol><li>Arriver idéalement à 09:45 pour le départ de 11:00.</li><li>Se placer dans les voies intérieures marquées <b>Reserved/Prepaid</b> ou <b>Reservert</b>.</li><li>Avoir la réservation, l’immatriculation et les informations de tous les passagers disponibles.</li><li>La traversée dépasse 20 milles nautiques : l’enregistrement des passagers est obligatoire.</li><li>Faire une promenade calme avec Paddy avant l’entrée dans la file, mais <b>Paddy embarque ensuite avec nous et reste avec nous</b>.</li><li>À bord : café et boissons disponibles; Wi-Fi et salon selon le navire.</li></ol></details>
    </section>`;
  }

  function bind(){
    const departure=byId('ferry-departure');if(departure)departure.value=state.ferryBooking.selectedDeparture||DETAILS.recommended;
    const saveButton=byId('ferry-save');if(!saveButton)return;
    saveButton.onclick=()=>{
      const confirmed=Boolean(byId('ferry-pet-confirmed')?.checked);
      const booked=Boolean(byId('ferry-booked')?.checked);
      if(booked&&!confirmed){alert('Réservation non validée : Paddy doit rester avec vous et la confirmation écrite de Torghatten manque.');return;}
      state.ferryBooking={
        status:confirmed?'VALIDÉ — Paddy reste avec nous':'NON VALIDÉ — confirmation écrite requise pour que Paddy reste avec nous',
        selectedDeparture:byId('ferry-departure')?.value||DETAILS.recommended,
        bookingReference:byId('ferry-reference')?.value.trim()||'',
        petTogetherConfirmed:confirmed,
        booked,
        confirmationNote:byId('ferry-confirmation-note')?.value.trim()||'',
        updatedAt:new Date().toISOString()
      };
      save();autoSync();renderItinerary();
    };
  }

  seed();
  const base=window.renderItinerary;
  window.renderItinerary=function(){
    base();
    const old=Array.from(document.querySelectorAll('section.card')).find(section=>section.textContent.includes('SEUL FERRY DU VOYAGE'));
    const holder=document.createElement('div');holder.innerHTML=cardHtml();
    const card=holder.firstElementChild;
    if(old)old.replaceWith(card);
    else{
      const first=byId('app')?.querySelector('section.card');
      if(first)first.insertAdjacentElement('afterend',card);
      else byId('app')?.prepend(card);
    }
    bind();
  };
})();
