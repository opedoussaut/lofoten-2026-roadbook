'use strict';

(function addVerifiedPark4NightLinks(){
  const LINKS={
    'Stover Strand Camping':'https://park4night.com/fr/place/104067',
    'Camping Land an der Elbe Hamburg (Stover Strand)':'https://park4night.com/fr/place/55668',
    'Campingpark Kronensee':'https://park4night.com/fr/place/139973',
    'First Camp Sibbarp Malmö':'https://park4night.com/fr/place/15339',
    'First Camp Sibbarp - Malmö':'https://park4night.com/fr/place/15339',
    'First Camp Nydala Umeå':'https://park4night.com/fr/place/115801',
    'First Camp Nydala - Umeå':'https://park4night.com/fr/place/115801',
    'Camp Ripan':'https://park4night.com/fr/place/78440',
    'Björkliden Camping':'https://park4night.com/fr/place/133328',
    'Lyngvær Lofoten Bobilcamping':'https://park4night.com/fr/place/12131',
    'Lyngvær Lofoten Bobilcamp':'https://park4night.com/fr/place/12131',
    'Uttakleiv Beach camping area':'https://park4night.com/fr/place/38914',
    'Uttakleiv':'https://park4night.com/fr/place/38914',
    'Lofoten Beach Camp':'https://park4night.com/fr/place/60796',
    'Moskenes Camping':'https://park4night.com/fr/place/12139',
    'Moskenes port parking':'https://park4night.com/fr/place/59230',
    'Vikten coastal road · spot légal à confirmer':'https://park4night.com/fr/place/60765',
    'Björkliden · E10 rest area':'https://park4night.com/fr/place/80825'
  };

  const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
  const entries=Object.entries(LINKS).map(([name,url])=>({name,url,key:norm(name)}));

  function decorate(){
    const app=document.getElementById('app');
    if(!app)return;
    const cards=app.querySelectorAll('article, .card, details');
    cards.forEach(card=>{
      const text=norm(card.textContent);
      const match=entries.find(e=>text.includes(e.key));
      if(!match||card.querySelector(`a[data-p4n-url="${match.url}"]`))return;
      const a=document.createElement('a');
      a.href=match.url;
      a.target='_blank';
      a.rel='noopener';
      a.className='btn';
      a.dataset.p4nUrl=match.url;
      a.textContent='🅿️ Park4Night ↗';
      a.style.marginLeft='8px';
      const firstLink=card.querySelector('a[href]');
      if(firstLink) firstLink.insertAdjacentElement('afterend',a); else card.appendChild(a);
    });
  }

  const observer=new MutationObserver(()=>decorate());
  document.addEventListener('DOMContentLoaded',()=>{
    const app=document.getElementById('app');
    if(app)observer.observe(app,{childList:true,subtree:true});
    decorate();
  });
})();
