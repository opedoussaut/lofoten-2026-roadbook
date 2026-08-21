'use strict';

// V105 — Vindnå / Flightlog route-aware takeoff inventory.
// Checked 21 Aug 2026 against the current Nordland municipality index and spot pages.
// These records are planning references only; local validation, current site rules,
// airspace/NOTAM and a full launch/landing assessment remain mandatory.
(function addVindnaRouteInventory(){
  const V='https://xn--vindn-qra.no/paragliding-spot/nordland/';

  const CORE=[
    {
      name:'Andøya · Bleik — Latmannsstarten bak kirkegården', area:'Andøy · Bleik', route:'30–31/08 · base Andøya / secteur Bleik', fit:'SUR NOTRE SÉJOUR', tone:'good', altitude:'45 m ASL · ~20 m de dénivelé',
      note:'Départ bas sous Ramnan, juste derrière le cimetière de Bleik. Vindnå indique que ce « Latmannsstarten » fonctionne particulièrement avec vent de sud-ouest; monter ~40–80 m peut suffire. Plusieurs autres départs existent le long du relief.',
      caution:'Ne pas atterrir sur le golf. Vérifier aussi le terrain, les propriétaires, l’aérologie maritime et les autres zones de départ avec les pilotes locaux.',
      url:V+'and%C3%B8y/bleik-and%C3%B8ya--bleik-%28latmannsstarten-bak-kirkeg%C3%A5rden%29-f9bbca', map:'Bleik kirkegård Andøya Norway'
    },
    {
      name:'Andøya · Ramnan — Alomarfjellet', area:'Andøy · Andenes / Bleik', route:'30–31/08 · proche du corridor Bleik–Andenes', fit:'TRÈS PROCHE', tone:'good', altitude:'Voir fiche Vindnå',
      note:'Deuxième spot actuellement indexé par Vindnå dans la commune d’Andøy. À garder avec Bleik comme alternative de relief/orientation pendant notre passage sur Andøya.',
      caution:'La fiche publique est moins descriptive que Bleik : demander une validation locale du décollage, de l’atterrissage et de l’orientation avant de monter.',
      url:V+'and%C3%B8y/andenes-and%C3%B8ya--ramnan-%28alomarfjellet%29-dfb2a7', map:'Ramnan Alomarfjellet Andøya Norway'
    },
    {
      name:'Hoven — Gimsøya — Lofoten', area:'Vågan · Gimsøysand', route:'01/09 · directement à notre base Hov Camping', fit:'À NOTRE CAMPING', tone:'good', altitude:'371 m ASL',
      note:'Vindnå décrit plusieurs possibilités de départ pendant la montée et au sommet. Le sentier part près du golf; le site est donc extrêmement pratique pour une reconnaissance sans ajouter de route.',
      caution:'Éviter les greens du golf et le camping pour l’atterrissage lorsqu’ils sont occupés. « Beaucoup d’atterrissages » dans une ancienne fiche ne remplace pas l’autorisation et la reconnaissance du jour.',
      url:V+'v%C3%A5gan/gims%C3%B8ysand-hoven-gims%C3%B8ya---lofoten-bebd80', map:'Hoven Gimsøy Lofoten Norway'
    },
    {
      name:'Festvågtinden — Henningsvær', area:'Vågan · Kabelvåg / Henningsvær', route:'01/09 · notre option Henningsvær / kayak', fit:'SUR JOURNÉE PLANIFIÉE', tone:'good', altitude:'520 m ASL · ~520 m de dénivelé',
      note:'Décollage documenté au-dessus de Henningsvær; la fiche le décrit comme un très beau départ avec vue spectaculaire. C’est aussi cohérent avec les récits de vol déjà intégrés au roadbook.',
      caution:'Montée raide/exposée, fréquentation, rotor et environnement Svolvær/Helle à contrôler. Ne pas transformer notre journée off en grosse mission si la fenêtre n’est pas évidente.',
      url:V+'v%C3%A5gan/kabelv%C3%A5g-lofoten-henningsv%C3%A6r---festv%C3%A5gtinden-b8f3cc', map:'Festvågtinden Henningsvær Norway'
    },
    {
      name:'Tjeldbergtind — Svolvær', area:'Vågan · Svolvær', route:'01/09 ou 05/09 · Lofoten Est', fit:'PROCHE', tone:'warn', altitude:'368 m ASL',
      note:'Spot Vindnå/Flightlog proche de Svolvær. La fiche publie deux zones d’atterrissage, une au nord et une au sud du relief.',
      caution:'Proximité immédiate de Svolvær/Helle : contrôler espace aérien et procédure locale. Les coordonnées d’atterrissage historiques doivent être reconnues au sol avant le vol.',
      url:V+'v%C3%A5gan/svolv%C3%A6r-tjeldbergtind--svolv%C3%A6r-f1a731', map:'Tjeldbergtind Svolvær Norway'
    },
    {
      name:'Haugheia — Leknes / Gravdal', area:'Vestvågøy · Gravdal', route:'02/09 · corridor Haukland/Uttakleiv → Skagsanden', fit:'SUR NOTRE CORRIDOR', tone:'good', altitude:'120 m ASL · ~120 m de dénivelé',
      note:'Petit relief herbeux avec vue vers Nappstraumen, court accès à pied et possibilité de top-landing décrite par la fiche. C’est le seul spot Vindnå actuellement indexé pour Vestvågøy et il a aussi une activité NLF récente en 2026.',
      caution:'La fiche demande explicitement de prévenir la tour de Leknes lors du vol. Utiliser la procédure/numéro officiellement valides le jour J plutôt que de dépendre d’un ancien numéro copié dans une base.',
      url:V+'vestv%C3%A5g%C3%B8y/gravdal-lofoten-leknes-haugheia-dd9935', map:'Haugheia Gravdal Leknes Lofoten Norway'
    },
    {
      name:'Ryten — Kvalvika', area:'Flakstad · Fredvang', route:'02–03/09 · Skagsanden / Fredvang', fit:'TRÈS PROCHE', tone:'good', altitude:'543 m ASL · ~543 m de dénivelé',
      note:'Seul spot Vindnå actuellement indexé pour Flakstad. La fiche cite des atterrissages possibles à Kvalvika, dans les zones marécageuses au sud, à Innersand et à Bergland.',
      caution:'Danger explicitement signalé : câble/fil à Innersand. Pour Bergland, parler au propriétaire. Une plage spectaculaire n’est pas automatiquement un atterrissage simple avec vent maritime.',
      url:V+'flakstad/fredvang-lofoten--kvalvika--ryten-d1761d', map:'Ryten Kvalvika Fredvang Lofoten Norway'
    }
  ];

  const TRANSIT=[
    {name:'Sortland · Holmstaddalen — Durmålskollen',area:'Sortland',route:'30–31/08 · corridor Vesterålen',fit:'TRANSIT',tone:'warn',altitude:'298 m ASL · ~250 m',note:'Petit relief décrit pour plouf, soaring et thermique, avec grandes zones d’atterrissage.',caution:'Le site est dans Skagen TIZ. De juin à septembre, ne pas utiliser les champs cultivés sans accord explicite du propriétaire.',url:V+'sortland/sortland-holmstaddalen---durm%C3%A5lskollen-caef7b',map:'Durmålskollen Holmstaddalen Sortland Norway'},
    {name:'Hadsel · Sandnesåsen',area:'Hadsel · Stokmarknes',route:'30–31/08 · si passage Sortland/Stokmarknes',fit:'TRANSIT PROCHE',tone:'neutral',altitude:'111 m ASL · ~105 m',note:'Petite colline; la fiche mentionne des conditions ludiques avec sud-est adapté.',caution:'Demander l’autorisation avant toute utilisation de terres agricoles / gonflage.',url:V+'hadsel/stokmarknes-hadsel-sandnes%C3%A5sen-a665f9',map:'Sandnesåsen Stokmarknes Norway'},
    {name:'Hadsel · Ongstad — Varheia (Haugheia)',area:'Hadsel · Melbu',route:'30–31/08 · si route/ferry par Melbu',fit:'TRANSIT PROCHE',tone:'neutral',altitude:'312 m ASL',note:'Décrit comme un grand secteur de top-landing avec de nombreuses possibilités d’atterrissage et usage historique pour cours/tandem.',caution:'Valider l’état actuel du site et les propriétaires; ne pas confondre avec Haugheia de Leknes.',url:V+'hadsel/melbu-hadsel-ongstad---varheia-%28haugheia%29-fe5b89',map:'Varheia Ongstad Melbu Norway'},
    {name:'Hadsel · Husbykollen',area:'Hadsel · Melbu',route:'30–31/08 · si route/ferry par Melbu',fit:'TRANSIT',tone:'neutral',altitude:'515 m ASL · ~500 m',note:'Accès pédestre par une crête depuis le secteur de Melbu selon la fiche.',caution:'Ajouter seulement si le passage par Melbu est retenu et si la fenêtre justifie la randonnée.',url:V+'hadsel/melbu-hadsel-husbykollen-df83ec',map:'Husbykollen Melbu Norway'},
    {name:'Hadsel · Storheia',area:'Hadsel · Melbu',route:'30–31/08 · si route/ferry par Melbu',fit:'TRANSIT',tone:'neutral',altitude:'509 m ASL · ~480 m',note:'Spot de relief du secteur Melbu, référencé par Vindnå/Flightlog.',caution:'Fiche historique : demander des informations récentes au club local avant de considérer le site.',url:V+'hadsel/melbu-hadsel-storheia-b48608',map:'Storheia Melbu Hadsel Norway'},
    {name:'Hadsel · Finnsæterkollen',area:'Hadsel · Stokmarknes / Melbu',route:'30–31/08 · Vesterålen',fit:'PETIT DÉTOUR',tone:'neutral',altitude:'380 m ASL',note:'La fiche décrit un site de vent d’ouest, efficace même dans des conditions marginales, avec 3–4 départs possibles en montant.',caution:'Le commentaire sur « 2 m/s » vient d’une fiche historique et ne constitue jamais un seuil de sécurité universel.',url:V+'hadsel/stokmarknes-hadsel-finns%C3%A6terkollen-a2ec1a',map:'Finnsæterkollen Hadsel Norway'},
    {name:'Hadsel · Ørnheia',area:'Hadsel · Stokmarknes',route:'30–31/08 · Vesterålen',fit:'PETIT DÉTOUR',tone:'neutral',altitude:'380 m ASL · ~350 m',note:'Départ référencé derrière Ørnheihytta ou orienté vers Stokmarknes.',caution:'Information très succincte : reconnaissance locale indispensable.',url:V+'hadsel/stokmarknes-hadsel-%C3%B8rnheia-fb38dd',map:'Ørnheia Stokmarknes Norway'},
    {name:'Hadsel · Stålberget',area:'Hadsel · Stokmarknes',route:'30–31/08 · Vesterålen',fit:'PETIT DÉTOUR',tone:'neutral',altitude:'602 m ASL · ~600 m',note:'Grand plateau sommital; accès possible depuis Vatndalen ou Flatset, avec atterrissages décrits au nord et à l’ouest.',caution:'Montée plus importante : faible priorité dans notre roadtrip sauf excellente fenêtre.',url:V+'hadsel/stokmarknes-hadsel-st%C3%A5lberget-e8eada',map:'Stålberget Stokmarknes Norway'},
    {name:'Hadsel · Langøya — Hallartinden',area:'Hadsel · Stokmarknes / Langøya',route:'30–31/08 · Vesterålen',fit:'DÉTOUR',tone:'neutral',altitude:'Altitude Vindnå à revalider',note:'Référencé comme montagne de vol et potentiel départ de distance vers Sortland.',caution:'La valeur d’altitude affichée par la fiche est manifestement non exploitable : utiliser topo/GPS et validation locale.',url:V+'hadsel/stokmarknes-hadsel-lang%C3%B8ya---hallartinden-e1fe8e',map:'Hallartinden Langøya Norway'},
    {name:'Narvik · Fagernesfjellet',area:'Narvik',route:'30/08 et 06/09 · axe Kiruna ↔ Vesterålen/Lofoten',fit:'SUR TRANSIT',tone:'warn',altitude:'650 m ASL · ~650 m',note:'Spot de Narvikfjellet directement proche de notre axe de transit.',caution:'La fiche avertit que les atterrissages en ville sont exigeants et interdit l’atterrissage dans la zone industrielle LKAB; les détails publiés datent en partie de 2018 et doivent être revalidés.',url:V+'narvik/narvik--fagernesfjellet-a4b8ea',map:'Fagernesfjellet Narvik Norway'},
    {name:'Narvik · Fagernesfjellet — Linken',area:'Narvik',route:'30/08 et 06/09 · axe Kiruna ↔ Vesterålen/Lofoten',fit:'SUR TRANSIT',tone:'warn',altitude:'1001 m ASL · ~1000 m',note:'Variante haute, historiquement accessible via remontées; la fiche mentionne aussi la possibilité de monter plus haut.',caution:'Même problème d’atterrissages difficiles à Narvik + vent de vallée possible au terrain malgré du calme au départ. Vérifier aussi le fonctionnement saisonnier des remontées.',url:V+'narvik/narvik--fagernesfjellet--linken-f41efd',map:'Linken Fagernesfjellet Narvik Norway'}
  ];

  function e(v){ return typeof pg103esc==='function' ? pg103esc(v) : String(v??''); }
  function link(url,label,primary=false){ return typeof pg103link==='function' ? pg103link(url,label,primary) : `<a href="${url}" target="_blank" rel="noopener">${e(label)} ↗</a>`; }
  function pill(text,tone){ return typeof pg103pill==='function' ? pg103pill(text,tone) : `<strong>${e(text)}</strong>`; }
  function gmap(q){ return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`; }

  function row(s){
    return `<tr>
      <td><strong>${e(s.name)}</strong><br><span class="muted">${e(s.area)}</span></td>
      <td>${pill(s.fit,s.tone)}<br><span class="muted">${e(s.route)}</span></td>
      <td>${e(s.altitude)}</td>
      <td>${e(s.note)}<br><span class="muted"><strong>Attention :</strong> ${e(s.caution)}</span></td>
      <td><div class="toolbar">${link(s.url,'🌬️ Vindnå',true)}${link(gmap(s.map),'📍 Carte')}</div></td>
    </tr>`;
  }

  function renderInventory(){
    return `
      <section class="card" style="margin-top:12px" id="vindna-route-inventory">
        <div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start;flex-wrap:wrap">
          <div>
            <p class="eyebrow">VINDNÅ / FLIGHTLOG · INVENTAIRE CALÉ SUR NOTRE ITINÉRAIRE</p>
            <h2 style="margin-bottom:6px">🗺️ Tous les décollages Vindnå utiles à notre voyage</h2>
            <p class="muted" style="max-width:950px">Inventaire vérifié le 21/08/2026. Vindnå indique que ses données de sites proviennent de Flightlog.org. Les fiches sont excellentes pour préparer un vol, mais certaines informations peuvent être historiques : toujours revalider localement les accès, propriétaires, atterrissages, procédures radio et restrictions.</p>
          </div>
          <div>${link('https://xn--vindn-qra.no/paragliding-spot/nordland','Tous les spots Nordland',true)}</div>
        </div>
        <div style="padding:12px;border-radius:10px;background:rgba(35,140,80,.12);margin-top:10px">
          <strong>Couverture Vindnå directement sur notre séjour :</strong> Andøy 2/2 · Vågan 3/3 · Vestvågøy 1/1 · Flakstad 1/1 = <strong>7 spots cœur de voyage</strong> ci-dessous. L’index Nordland ne liste actuellement pas Moskenes comme commune avec un spot : cela signifie seulement « pas de fiche Vindnå indexée », pas « pas de site de vol ».
        </div>
      </section>

      <section class="card" style="margin-top:12px">
        <h3>⭐ 7 spots cœur de voyage — à garder en haut de la liste</h3>
        <div class="table-wrap"><table>
          <thead><tr><th>Décollage</th><th>Fit roadbook</th><th>Altitude</th><th>Info utile</th><th>Liens</th></tr></thead>
          <tbody>${CORE.map(row).join('')}</tbody>
        </table></div>
      </section>

      <details class="card" style="margin-top:12px">
        <summary style="cursor:pointer;font-weight:800;font-size:1.05em">🚐 Afficher aussi les 11 spots du corridor Vesterålen / Narvik</summary>
        <p class="muted" style="margin-top:10px">Ce groupe n’est pas prioritaire pour les journées Lofoten. Il devient utile si une fenêtre exceptionnelle apparaît pendant les transits Andøya ↔ Lofoten ou Kiruna ↔ Narvik, ou si nous choisissons l’axe Melbu/Fiskebøl.</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Décollage</th><th>Fit roadbook</th><th>Altitude</th><th>Info utile</th><th>Liens</th></tr></thead>
          <tbody>${TRANSIT.map(row).join('')}</tbody>
        </table></div>
      </details>

      <section class="card" style="margin-top:12px">
        <h3>🎯 Ordre de scouting recommandé</h3>
        <p><strong>Andøya :</strong> Bleik Latmannsstarten → Ramnan seulement si meilleure orientation / info locale.</p>
        <p><strong>Gimsøy / Vågan :</strong> Hoven est imbattable logistiquement depuis notre camping; Festvågtinden si Henningsvær + météo parfaite; Tjeldbergtind comme option Svolvær.</p>
        <p><strong>Vestvågøy / Flakstad :</strong> Haugheia est une option courte et documentée; Ryten/Kvalvika est spectaculaire mais plus engagé et l’atterrissage doit être préparé avec soin.</p>
        <p><strong>Transit :</strong> ne jamais sacrifier Måtinden, Reinebringen ou une bonne fenêtre Lofoten pour un détour Hadsel/Narvik. Ces sites servent de bonus météo.</p>
      </section>`;
  }

  if(typeof renderParagliding!=='function') return;
  const previous=renderParagliding;
  renderParagliding=function(){
    previous();
    const app=typeof byId==='function'?byId('app'):document.getElementById('app');
    if(!app || app.querySelector('#vindna-route-inventory')) return;
    app.insertAdjacentHTML('beforeend',renderInventory());
  };
})();
