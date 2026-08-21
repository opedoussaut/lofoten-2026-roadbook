'use strict';

// V104 — direct purchase link for the Hike & Fly in Lofoten guide.
// Keeps the independent ExpéMag review while making the author's Etsy listing
// the primary acquisition link in the Paragliding resource page.
(function upgradeParaglidingGuidePurchase(){
  const etsyUrl = 'https://www.etsy.com/listing/4458812543/hike-fly-in-lofoten';
  if (typeof PG103_LINKS !== 'undefined') {
    PG103_LINKS.guideShop = etsyUrl;
  }

  if (typeof renderParagliding !== 'function') return;
  const previousRenderParagliding = renderParagliding;
  renderParagliding = function(){
    previousRenderParagliding();
    const app = typeof byId === 'function' ? byId('app') : document.getElementById('app');
    if (!app) return;
    const anchors = Array.from(app.querySelectorAll('a'));
    const review = anchors.find(a => a.textContent.includes('Présentation du topo'));
    if (review) review.classList.remove('primary');
    const shop = anchors.find(a => a.textContent.includes('Vieux Campeur'));
    if (shop) {
      shop.href = etsyUrl;
      shop.textContent = '🛒 Acheter le topo · Etsy ↗';
      shop.classList.add('primary');
      shop.setAttribute('aria-label', 'Acheter Hike & Fly in Lofoten sur Etsy');
    }
  };
})();
