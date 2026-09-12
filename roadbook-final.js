'use strict';

(() => {
  const VERSION = '2026-final-1';
  const TABS = [['introduction','Introduction'],['route','Plan vs Reality'],['stories','Daily Stories'],['gaston','Gaston'],['budget','Budget']];
  const CATEGORIES = {'Transport':'Vehicle rental','Courses / alimentation':'Food & groceries','Camping / nuit':'Campsites','Péage / pont / tunnel':'Tolls, bridges & tunnels','Carburant':'Fuel','Services camping-car':'Motorhome services','Restaurant / café':'Restaurants & cafés','Activité / visite':'Activities & visits','Kayak':'Kayaking','Parking':'Parking','Achats / souvenirs':'Shopping & souvenirs','Transport / autre':'Other transport','Transport public':'Public transport','Achats Paddy':'Paddy supplies'};
  const app = document.querySelector('#app');
  const nav = document.querySelector('#nav');
  const menu = document.querySelector('#menu');
  document.querySelector('.skip-link').addEventListener('click',e=>{e.preventDefault();app.focus();});
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money = cents => (cents / 100).toLocaleString('en-IE', {style:'currency',currency:'EUR'});
  const date = value => new Date(value + 'T12:00:00Z').toLocaleDateString('en-GB', {day:'numeric',month:'short',timeZone:'UTC'});
  const link = (url,label) => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>`;
  const heading = (eyebrow,title,description) => `<header class="page-heading"><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="lead">${description}</p></header>`;
  const stat = (number,label,note='') => `<div class="stat"><strong>${number}</strong><span>${label}</span>${note?`<small>${note}</small>`:''}</div>`;
  let journal, plans, expenseLabels, renderNumber = 0, variant = 'B';
  let budgetRows = [], categoryFilter = '';
  async function json(path) {
    const response = await fetch(`${path}?v=${VERSION}`, {cache:'no-store'});
    if (!response.ok) throw new Error(`Cannot load ${path}`);
    return response.json();
  }
  function locationState() {
    const [raw,sub] = location.hash.replace(/^#/, '').split('/');
    const aliases = {adventure:'introduction',home:'introduction',journal:'stories',story:'stories',van:'gaston'};
    const candidate = aliases[raw] || raw;
    return {tab:TABS.some(([id])=>id===candidate)?candidate:'introduction',day:Math.min(18,Math.max(1,Number((sub||'').replace('day-',''))||1))};
  }
  function closeMenu() {nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}
  menu.addEventListener('click', () => {const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
  nav.addEventListener('click',closeMenu);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();menu.focus();}});

  function introduction() {
    return `<section class="expedition-hero">
      <img src="assets/crew-hero.webp" width="1672" height="941" fetchpriority="high" alt="Cartoon Olivier guides the way, Sorya carries her camera and Paddy rides as the VIP beside Gaston in the Lofoten Islands.">
      <div class="hero-copy"><p class="eyebrow">Paris → Lofoten → Paris</p><h1>A long way<br>for a little dog.</h1><p>Olivier, Sorya, Paddy and Gaston.<br>Eighteen days. Nearly 8,700 kilometres.<br>A few changes of plan.</p><a class="button sun" href="#stories">Read our adventure <span aria-hidden="true">↗</span></a></div>
      <div class="hero-stamp">25 AUG — 11 SEP<br><b>2026</b><br>HOME, AT LAST.</div>
    </section>
    <div class="stat-strip">${stat('≈8,700','kilometres travelled')}${stat('18','days of adventure')}${stat('7','countries crossed')}${stat('1','very important Pomeranian')}</div>
    <section class="wrap introduction-copy"><p class="eyebrow">Welcome aboard</p><div class="editorial-grid"><h2>The mountains were the destination.<br>The rest became the story.</h2><div><p>We set out from the Paris region for the Lofoten Islands with a campervan called Gaston, an enthusiastic itinerary and a small Pomeranian whose requirements were refreshingly clear: company, walks and somewhere peaceful to sleep.</p><p>We found mountains rising from the sea, Swedish forests, wild moose and reindeer, nearly two thousand steps above Reine and fjords best explored one paddle stroke at a time. We also found garages, closed cafés, headwinds and a spectacular amount of traffic on the way home.</p><p>This is our roadbook as we lived it — the plan, the detours, the brilliant days and the ones when simply arriving was enough. Paddy is the thread through it all.</p></div></div></section>
    <section class="crew-section"><div class="wrap"><p class="eyebrow">The expedition, officially</p><h2>Meet the crew.</h2><div class="crew-grid">
      <article class="crew-card"><span class="crew-no">01</span><p class="role">The guide</p><h3>Olivier</h3><p>Driver, route architect and outdoor enthusiast. Can turn a short forest stop into a four-hour walk. Also responsible for remembering where Gaston is parked.</p><span class="crew-credit">Maps · mountains · early starts</span></article>
      <article class="crew-card"><span class="crew-no">02</span><p class="role">The sherpa & photographer</p><h3>Sorya</h3><p>The eye behind the photographs, a determined climber of Reinebringen's steps and Paddy's first-class transport when the terrain calls for it.</p><span class="crew-credit">Camera · patience · serious legwork</span></article>
      <article class="crew-card paddy"><span class="crew-no" aria-hidden="true">🐾</span><p class="role">The VIP guest</p><h3>Paddington</h3><p>Paddy to his friends. A small, sometimes anxious Pomeranian with enormous influence over campsite selection and a firm commitment to travelling together.</p><span class="crew-credit">Walks · cuddles · executive decisions</span></article>
      <article class="crew-card"><span class="crew-no">04</span><p class="role">The rolling home</p><h3>Gaston</h3><p>Nearly seven metres of shelter and stubbornness. Occasionally communicated through warning lights. Completed his most important task: bringing everyone home.</p><a href="#gaston">Read his dossier ↗</a></article>
    </div></div></section>
    <section class="wrap"><p class="eyebrow">Three pages to dog-ear</p><div class="chapter-links"><a href="#stories/day-9"><span>DAY 09 · THE HIGH POINT</span><h3>The guide, the sherpa and the VIP</h3><p>The day everything aligned above Reine.</p></a><a href="#stories/day-16"><span>DAY 16 · THE PERFECT PAUSE</span><h3>Drive, drive, drive — then exhale</h3><p>Feddet turns a transfer into a holiday evening.</p></a><a href="#stories/day-18"><span>DAY 18 · THE LAST MILE</span><h3>Gaston brings everyone home</h3><p>The final traffic wall, and the end of the loop.</p></a></div></section>`;
  }

  function route() {
    const plan=plans[variant],plannedKm=plan.rows.reduce((sum,row)=>sum+row[1],0);
    const choices=[['Hoven / Festvågtind','Priority summit in eastern Lofoten','No 2026 ascent recorded; Henningsvær revisited on foot.'],['Mannen / Haukland','Mannen if calm, coastal loop as fallback','About 8 km on the Haukland–Uttakleiv coast, 31 August.'],['Holandsmælen / Ryten / Kvalvika','Protected hiking days and a weather reserve','No completed ascent recorded; the actual programme included villages, beaches and kayaking.'],['Reinebringen','Weather-dependent summit, initially later in the week','Completed early on 2 September, with Sorya carrying Paddy.'],['Vindstad / Bunes','Later addition: boat and beach hike','Abandoned on 3 September because of wind; Nusfjord and Myrland instead.'],['Paragliding','Activity ambition, dependent on conditions','No completed 2026 flight recorded. Earlier flights remain memories, not new trip achievements.'],['Return journey','Bypass Stockholm; south through Malmö and Germany','Two nights in Stockholm, then Feddet, Alfsee and a final drive through the Netherlands.']];
    return `<section class="wrap">${heading('The itinerary, annotated','The plan met the road.','Two saved planning options. One actual journey, shaped by weather, fatigue, curiosity and the needs of the whole crew.')}
      <div class="route-controls"><span>Compare our saved plan:</span><div class="segmented" aria-label="Saved planning option">${['A','B'].map(id=>`<button data-variant="${id}" aria-pressed="${id===variant}">${esc(plans[id].label)}</button>`).join('')}</div></div>
      <div class="comparison-summary"><article><p class="eyebrow">${esc(plan.label)} · planned</p><strong>${plannedKm.toLocaleString('en-GB')} km</strong><p>${plan.nights} Lofoten nights · arrive ${plan.arrival}<br>Saved road-only stage estimates, through 11 September.</p></article><article class="actual"><p class="eyebrow">What we actually lived</p><strong>≈8,700 km</strong><p>6 Lofoten nights · arrive 30 August<br>Home on 11 September; final fuel and handover preparations on 12 September.</p></article></div>
      <p class="small-note">The plans total ${plannedKm.toLocaleString('en-GB')} km before the 25 km handover allowance. The actual total is a rounded recollection including local driving, so the difference is indicative, not a measured detour total. Option B was the saved default.</p>
      <h2>Day by day, side by side.</h2><div class="table-scroll" tabindex="0" role="region" aria-label="Daily planned versus actual itinerary"><table class="route-table"><thead><tr><th scope="col">Day</th><th scope="col">${esc(plan.label)} · original intention</th><th scope="col">Actual route & night</th></tr></thead><tbody>${journal.entries.map((e,i)=>`<tr><th scope="row"><a href="#stories/day-${e.day}">Day ${e.day}</a><small>${date(e.date)}</small></th><td><b>${esc(plan.rows[i][0])}</b><p>${esc(plan.rows[i][3])}</p><small>Planned: ${plan.rows[i][1]} km · ${plan.rows[i][2]} h driving</small></td><td><b>${esc(e.place)}</b><p>${esc(e.night)}</p><a class="text-link" href="#stories/day-${e.day}">Read the day ↗</a></td></tr>`).join('')}</tbody></table></div>
      <div class="section-gap"><p class="eyebrow">The changes that mattered</p><h2>Less checklist. More journey.</h2><div class="table-scroll" tabindex="0" role="region" aria-label="Activity plans and actual choices"><table><thead><tr><th>Place / activity</th><th>What was planned</th><th>What happened</th></tr></thead><tbody>${choices.map(r=>`<tr>${r.map((v,i)=>i?`<td>${esc(v)}</td>`:`<th scope="row">${esc(v)}</th>`).join('')}</tr>`).join('')}</tbody></table></div></div>
      <aside class="margin-note"><b>Our most useful route rule</b><p>The no-ferry road journey survived. The rest of the schedule stayed negotiable. When the wind or the driver's energy said stop, we changed the day.</p></aside></section>`;
  }

  function stories(day) {
    return `<section class="wrap journal-wrap">${heading('25 August – 11 September 2026','Eighteen days. All the stories.','From the 4:30 a.m. escape to the final Parisian traffic jam. Pick a day, or settle in for the whole journey.')}
      <div class="journal-tools"><div class="day-picker" aria-label="Choose a story">${journal.entries.map(e=>`<a href="#stories/day-${e.day}" ${e.day===day?'aria-current="true"':''} aria-label="Day ${e.day}: ${esc(e.title)}">${String(e.day).padStart(2,'0')}</a>`).join('')}</div><div class="toolbar"><button id="expand-stories" class="button secondary">Open all stories</button><button id="print-stories" class="button secondary">Print journal</button></div></div>
      <div class="journal-list">${journal.entries.map(e=>`<details class="story" id="day-${e.day}" ${e.day===day?'open':''}><summary><span class="day-badge">${String(e.day).padStart(2,'0')}</span><span class="story-heading"><span class="eyebrow">${date(e.date)} · ${esc(e.phase)}</span><h2>${esc(e.title)}</h2><span class="story-teaser">${esc(e.summary)}</span></span><span class="expand-icon" aria-hidden="true">+</span></summary><div class="story-content"><div class="story-facts"><p><b>Route</b>${esc(e.place)}</p><p><b>Night</b>${esc(e.night)}</p>${e.weather?`<p><b>Weather remembered</b>${esc(e.weather)}</p>`:''}</div><div class="prose">${e.paragraphs.map(p=>`<p>${esc(p)}</p>`).join('')}</div><details class="story-note"><summary>From the trip notes</summary><p>${esc(e.fieldNote)}</p>${(e.sources||[]).map(s=>`<p>${link(s.url,s.label)}</p>`).join('')}</details><div class="story-navigation">${e.day>1?`<a href="#stories/day-${e.day-1}">← Day ${e.day-1}</a>`:'<span></span>'}${e.day<18?`<a href="#stories/day-${e.day+1}">Day ${e.day+1} →</a>`:'<a href="#introduction">Back to the crew ↑</a>'}</div></div></details>`).join('')}</div>
      <aside class="margin-note"><b>Paddy's place in the story</b><p>He never needed a kilometre target. A walk, a calm evening and his people nearby were usually enough to tell us whether we had chosen well.</p></aside></section>`;
  }

  function specGroup(title,rows) {return `<article class="spec-group"><h3>${title}</h3><dl>${rows.map(([k,v])=>`<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl></article>`;}
  function gaston() {
    const damage=['Rear bumper fracture and existing side damage.','Left garage-door seal area damaged; scratches and a crack on the left wall.','Right mirror scratches; entry-door scratch; lower bumper fixing scratched.','Long scratch along the right wall and another on the upper rear corner.','Small tear in the passenger seat; loose plastic trim behind the driver’s seat.','Broken left windscreen blind.','Small fracture in the rear bench / lower bed; burn mark on the bedroom door.','Detached washroom door noted in the pickup record.','A missing key set already listed before departure.'];
    return `<section class="wrap">${heading('The fourth traveller','Gaston. Slightly dramatic.<br>Utterly indispensable.','Our Roadsurfer Cozy Cottage gave us a kitchen, a bed, a refuge from the weather — and a running lesson in patience.')}
      <div class="odometer"><div><p class="eyebrow">Mission completed</p><strong>≈8,700<span> km</span></strong><p>Paris → Lofoten → Paris, with everyone safely home.</p></div><div class="odometer-readings"><p><span>Pickup odometer · recorded</span><b>50,613 km</b></p><p><span>Return odometer · estimated</span><b>≈59,313 km</b></p><small>50,613 + approximately 8,700. Exact return reading not recorded; excludes any separately unmeasured handover driving.</small></div></div>
      <div class="spec-grid">${specGroup('Identity & crew',[['Rental category','Roadsurfer Cozy Cottage'],['Reference model','Knaus Van TI Plus'],['Type','Semi-integrated motorhome'],['First registration','3 July 2023'],['Road seats','3'],['Sleeping capacity','2 adults + 1 child'],['Mileage allowance','Unlimited'],['Bike rack','Two-bike rack']])}${specGroup('Engine & dimensions',[['Fuel / engine profile','Diesel · 140 hp · Euro 6'],['Transmission','Exact type not recorded'],['Body length','6.99 m'],['With rack folded / extended','7.33 m / 7.80 m'],['Height reference','3.15 m'],['Width including mirrors','2.74 m'],['Maximum mass reference','3,500 kg'],['Advertised payload reference','Approximately 260 kg']])}${specGroup('Our rolling home',[['Fresh water','95 L'],['Grey water','73 L'],['Gas profile','Propane · 30 mbar'],['Bottle compartment reference','Up to two 11 kg bottles'],['Cooking','Two gas burners'],['Comfort','Hot water, shower and cassette toilet'],['Electricity','12 V system; 230 V on hook-up'],['Heating profile','Auxiliary diesel air heating'],['Fridge','Large fridge; unreliable during the return']])}</div>
      <p class="small-note">Identity and pickup mileage come from the stored handover profile. Dimensions, capacities, engine and payload are the saved category/model references, not newly measured specifications. Actual registration documents and fitted equipment remain authoritative.</p>
      <div class="section-gap"><p class="eyebrow">The mechanical subplot</p><h2>Four complaints. One successful mission.</h2><ol class="incident-list"><li><span>28–29 AUG</span><div><h3>The yellow engine light</h3><p>Near Umeå, the warning prompted a stop and contact with Roadsurfer. After several attempts, Auto Star diagnosed an EGR-valve problem and said the journey could continue, with attention to any loss of performance.</p><a href="#stories/day-5">The three-garage morning ↗</a></div></li><li><span>31 AUG</span><div><h3>The uncooperative step</h3><p>The step became stuck during the Lofoten chapter. One more practical problem to track while moving between campsites.</p></div></li><li><span>03 SEP</span><div><h3>The broken door strut</h3><p>A strut broke at the end of the Nusfjord / Myrland day. The door still closed; the damaged parts needed attention.</p></div></li><li><span>RETURN LEG</span><div><h3>The fridge's final argument</h3><p>Flashing and unreliable operation made access to electricity increasingly important. The issue remained to be reported at the rental depot; the trip account does not claim it was repaired.</p></div></li></ol></div>
      <div class="handover-grid"><article class="card"><p class="eyebrow">12 September · the epilogue</p><h3>One last spruce-up.</h3><p>Gaston was emptied on arrival home. Cleaning and the repair report were the final tasks before the scheduled return to Roadsurfer in Champlan on 12 September, by 16:00.</p><p>The final fill-up is now recorded: <b>€130.84</b> at Intermarché Magny-les-Hameaux on 12 September at 07:50 — 56.42 L of diesel. The completed vehicle handover and deposit outcome are not yet documented.</p><a href="#budget">View the complete budget ↗</a></article><article class="card"><p class="eyebrow">The size of the responsibility</p><h3>Our saved GPS profile.</h3><p>Length 7.80 m · width 2.74 m · height 3.25 m · weight 3.50 t. This was the conservative trip profile, including a height allowance and extended-rack length.</p><p>Our main route used the bridges, with ferries avoided. Electricity, quiet surroundings and somewhere to walk Paddy mattered more as the return progressed.</p></article></div>
      <details class="archive-note"><summary>Pre-existing condition recorded at pickup</summary><p>These were already in the departure record and are separate from the incidents during our journey.</p><ul>${damage.map(d=>`<li>${esc(d)}</li>`).join('')}</ul></details>
      <aside class="margin-note"><b>Gaston gets the last word</b><p>He did not finish with a flawless report card. He finished with all his passengers home. On this expedition, that was the result that counted.</p></aside></section>`;
  }

  async function budget(token) {
    const [payload,labels]=await Promise.all([json('expenses-current.json'),expenseLabels?Promise.resolve(expenseLabels):json('expense-labels-en.json')]);
    if(token!==renderNumber)return;
    expenseLabels=labels;
    const translations=new Map(labels.entries.map(e=>[e.sourceSignature,e]));
    budgetRows=payload.expenses.map((r,i)=>{const t=translations.get(JSON.stringify(r));return {id:i,date:r[4],category:CATEGORIES[r[0]]||'Other recorded expense',cents:Math.round(Number(r[1])*100),place:t?.place||r[2]||'Not recorded',note:t?.note||'New entry in the expense log; English detail pending.'};});
    const total=budgetRows.reduce((s,r)=>s+r.cents,0),rental=budgetRows.filter(r=>r.category==='Vehicle rental').reduce((s,r)=>s+r.cents,0),categories={};
    budgetRows.forEach(r=>{categories[r.category]=(categories[r.category]||0)+r.cents;});
    app.innerHTML=`<section class="wrap">${heading('The expedition ledger','The price of going north.','Recorded trip costs, including the final fuel fill before returning Gaston. The bank reconciliation can still refine this total.')}
      <div class="budget-hero"><div><p class="eyebrow">Recorded total · 12 September edition</p><strong>${money(total)}</strong><p>${budgetRows.length} entries · refundable deposit excluded</p></div><div class="budget-splits"><p><span>Vehicle rental in the ledger</span><b>${money(rental)}</b></p><p><span>Other recorded costs</span><b>${money(total-rental)}</b></p></div></div>
      <div class="category-chart" role="group" aria-label="Expense totals by category">${Object.entries(categories).sort((a,b)=>b[1]-a[1]).map(([cat,cents])=>`<div class="category-row"><span>${esc(cat)}</span><div class="bar" aria-hidden="true"><i style="width:${cents/total*100}%"></i></div><b>${money(cents)}</b><small>${(cents/total*100).toFixed(1)}%</small></div>`).join('')}</div>
      <div class="section-gap"><div class="ledger-heading"><h2>Every recorded expense.</h2><label>Category<select id="budget-category"><option value="">All categories</option>${Object.keys(categories).sort().map(c=>`<option value="${esc(c)}" ${c===categoryFilter?'selected':''}>${esc(c)}</option>`).join('')}</select></label></div><p id="ledger-count" class="small-note" aria-live="polite"></p><div class="table-scroll" tabindex="0" role="region" aria-label="Detailed expense ledger"><table class="expense-table"><thead><tr><th>Date posted</th><th>Category</th><th>Merchant / place</th><th>Detail</th><th class="amount">EUR</th></tr></thead><tbody id="expense-rows"></tbody><tfoot><tr><th colspan="4">Displayed total</th><td class="amount" id="filtered-total"></td></tr></tfoot></table></div></div>
      <details class="archive-note"><summary>What is included, and what still needs reconciliation?</summary><p>Dates are the recorded payment or posting dates, which can differ from the day of the stay or activity. Foreign-currency payments keep the original euro conversions. Net fuel refunds are counted once, and declined payments are excluded.</p><p>The Day 13 story records a 415 SEK campsite payment that is absent from this ledger. Other unlisted campsite payments or card adjustments may also remain to reconcile. The older vehicle profile quotes €2,285 for the rental, while the expense ledger records €2,195; the budget uses the ledger amount pending reconciliation.</p><p>The final €130.84 diesel fill on 12 September is included. Deposits, declined operations and the refunded €16 diagnostic attempt are not additional holiday costs.</p></details></section>`;
    fillExpenseRows();
    document.querySelector('#budget-category').addEventListener('change',e=>{categoryFilter=e.target.value;fillExpenseRows();});
  }
  function fillExpenseRows() {
    const rows=budgetRows.filter(r=>!categoryFilter||r.category===categoryFilter).sort((a,b)=>b.date.localeCompare(a.date)||a.id-b.id);
    document.querySelector('#expense-rows').innerHTML=rows.map(r=>`<tr><td>${date(r.date)}</td><td>${esc(r.category)}</td><td>${esc(r.place)}</td><td>${esc(r.note)}</td><td class="amount">${money(r.cents)}</td></tr>`).join('');
    document.querySelector('#filtered-total').textContent=money(rows.reduce((s,r)=>s+r.cents,0));
    document.querySelector('#ledger-count').textContent=`${rows.length} of ${budgetRows.length} recorded entries`;
  }
  async function render() {
    const token=++renderNumber,{tab,day}=locationState();
    nav.innerHTML=TABS.map(([id,label])=>`<a href="#${id}" ${id===tab?'aria-current="page"':''}>${label}</a>`).join('');
    document.title=`${TABS.find(([id])=>id===tab)[1]} · Lofoten 2026 — The Paddy Expedition`;
    app.setAttribute('aria-busy','true');
    try {
      if(tab==='introduction') app.innerHTML=introduction();
      else if(tab==='gaston') app.innerHTML=gaston();
      else if(tab==='budget') {app.innerHTML='<div class="wrap"><p role="status">Opening the expedition ledger…</p></div>';await budget(token);}
      else {
        app.innerHTML='<div class="wrap"><p role="status">Opening the roadbook…</p></div>';
        if(!journal)journal=await json('journal-en.json');
        if(tab==='route'&&!plans)plans=await json('route-plans-en.json');
        if(token!==renderNumber)return;
        app.innerHTML=tab==='route'?route():stories(day);
        if(tab==='route')document.querySelectorAll('[data-variant]').forEach(b=>b.addEventListener('click',()=>{variant=b.dataset.variant;render();}));
        if(tab==='stories') {
          document.querySelector('#expand-stories').addEventListener('click',e=>{const all=[...document.querySelectorAll('.story')],open=!all.every(s=>s.open);all.forEach(s=>s.open=open);e.target.textContent=open?'Close all stories':'Open all stories';});
          document.querySelector('#print-stories').addEventListener('click',()=>{document.querySelectorAll('.story').forEach(s=>s.open=true);window.print();});
        }
      }
      if(token!==renderNumber)return;
      if(tab==='stories'&&location.hash.includes('/day-'))document.querySelector(`#day-${day}`)?.scrollIntoView({block:'start'});else window.scrollTo(0,0);
    } catch(error) {
      if(token===renderNumber){app.innerHTML='<section class="wrap"><h1>The roadbook could not be loaded.</h1><p>Please check your connection and try again.</p><button class="button" id="retry">Try again</button></section>';document.querySelector('#retry').addEventListener('click',render);}
    } finally {if(token===renderNumber)app.setAttribute('aria-busy','false');}
  }
  window.addEventListener('hashchange',render);
  render();
  if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
})();
