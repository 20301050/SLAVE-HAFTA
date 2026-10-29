/* Panier SLAVE HAFTA (maquette) : compteur dans la barre du haut + tiroir panier.
   Les articles sont gardés dans ce navigateur seulement. */
(function () {
  var KEY = 'sh-panier';
  function lire() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return memoire; } }
  function ecrire(l) { memoire = l; try { localStorage.setItem(KEY, JSON.stringify(l)); } catch (e) {} }
  var memoire = [];

  var css = document.createElement('style');
  css.textContent = [
    '.sh-cart{position:relative;display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;background:none;border:1px solid rgba(201,168,76,.5);border-radius:50%;color:#F5F0E8;cursor:pointer;transition:border-color .2s ease,transform .12s ease}',
    '.sh-cart:hover{border-color:#D4AF37}.sh-cart:active{transform:scale(.95)}',
    '.sh-cart:focus-visible{outline:2px solid #D4AF37;outline-offset:3px}',
    '.sh-cart svg{width:19px;height:19px}',
    '.sh-count{position:absolute;top:-4px;right:-4px;min-width:20px;height:20px;padding:0 5px;border-radius:999px;background:#C9A84C;color:#2a0000;font:700 11px/20px Lato,Arial,sans-serif;text-align:center;font-variant-numeric:tabular-nums}',
    '.sh-count.pop{animation:shPop .35s cubic-bezier(.23,1,.32,1)}',
    '@keyframes shPop{0%{transform:scale(.6)}60%{transform:scale(1.15)}100%{transform:scale(1)}}',
    '.sh-veil{position:fixed;inset:0;z-index:60;background:rgba(20,0,0,.55);opacity:0;transition:opacity .25s ease}',
    '.sh-veil.on{opacity:1}',
    '.sh-drawer{position:fixed;top:0;right:0;bottom:0;z-index:61;width:min(400px,100%);display:flex;flex-direction:column;background:#2a0000;color:#F5F0E8;border-left:1px solid rgba(201,168,76,.45);transform:translateX(100%);transition:transform .3s cubic-bezier(.23,1,.32,1);padding:calc(24px + env(safe-area-inset-top,0px)) max(24px,env(safe-area-inset-right,0px)) calc(24px + env(safe-area-inset-bottom,0px)) 24px;font-family:Lato,Arial,sans-serif}',
    '.sh-drawer.on{transform:none}',
    '.sh-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}',
    '.sh-head h2{margin:0;font:600 26px "Playfair Display",Georgia,serif;color:#D4AF37}',
    '.sh-x{width:44px;height:44px;background:none;border:1px solid rgba(201,168,76,.5);color:#F5F0E8;font-size:20px;cursor:pointer}',
    '.sh-list{list-style:none;margin:0;padding:0;flex:1;overflow:auto;display:grid;align-content:start;gap:14px}',
    '.sh-item{display:grid;grid-template-columns:64px minmax(0,1fr) auto;gap:12px;align-items:center;padding-bottom:14px;border-bottom:1px solid rgba(201,168,76,.2)}',
    '.sh-item img{width:64px;height:84px;object-fit:cover;object-position:50% 20%;display:block}',
    '.sh-item b{display:block;font:600 16px "Playfair Display",Georgia,serif}',
    '.sh-item small{font-size:12px;opacity:.75}',
    '.sh-item .p{font-variant-numeric:tabular-nums;color:#D4AF37}',
    '.sh-rm{background:none;border:0;color:#F5F0E8;opacity:.6;font-size:12px;text-decoration:underline;cursor:pointer;padding:4px 0}',
    '.sh-empty{opacity:.75;font-style:italic;font-family:"Cormorant Garamond",Georgia,serif;font-size:20px}',
    '.sh-foot{border-top:1px solid rgba(201,168,76,.45);padding-top:16px;display:grid;gap:12px}',
    '.sh-total{display:flex;justify-content:space-between;font:600 20px "Playfair Display",Georgia,serif;font-variant-numeric:tabular-nums}',
    '.sh-note{margin:0;font-size:12px;opacity:.75}',
    '.sh-go{min-height:48px;background:#C9A84C;color:#2a0000;border:0;font:700 12px Lato,Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;cursor:pointer}',
    '.sh-go:hover{background:#D4AF37}',
    '.sh-msg{margin:0;color:#D4AF37;font-size:14px}',
    '.sh-toast{position:fixed;left:50%;bottom:calc(24px + env(safe-area-inset-bottom,0px));z-index:70;transform:translate(-50%,20px);opacity:0;background:#2a0000;color:#F5F0E8;border:1px solid #C9A84C;padding:12px 20px;font:14px Lato,Arial,sans-serif;transition:opacity .2s ease,transform .25s cubic-bezier(.23,1,.32,1);pointer-events:none}',
    '.sh-toast.on{opacity:1;transform:translate(-50%,0)}',
    '@media (prefers-reduced-motion:reduce){.sh-drawer,.sh-veil,.sh-toast{transition:none}.sh-count.pop{animation:none}}'
  ].join('');
  document.head.appendChild(css);

  var veil = document.createElement('div'); veil.className = 'sh-veil'; veil.hidden = true;
  var dr = document.createElement('aside'); dr.className = 'sh-drawer'; dr.hidden = true;
  dr.setAttribute('role', 'dialog'); dr.setAttribute('aria-modal', 'true'); dr.setAttribute('aria-label', 'Votre panier');
  dr.innerHTML = '<div class="sh-head"><h2>Votre panier</h2><button class="sh-x" type="button" aria-label="Fermer le panier">×</button></div>' +
    '<ul class="sh-list"></ul><div class="sh-foot"><div class="sh-total"><span>Total</span><span class="sh-sum">0 €</span></div>' +
    '<p class="sh-note">Précommande : chaque pièce est brodée après votre commande. Délai indiqué à titre d’exemple : 4 à 6 semaines.</p>' +
    '<button class="sh-go" type="button">Passer la commande</button><p class="sh-msg" role="status" aria-live="polite"></p></div>';
  var toast = document.createElement('div'); toast.className = 'sh-toast'; toast.setAttribute('role', 'status'); toast.setAttribute('aria-live', 'polite');
  document.body.appendChild(veil); document.body.appendChild(dr); document.body.appendChild(toast);

  var dernierFocus = null;
  function euros(n) { return n.toLocaleString('fr-FR') + ' €'; }
  function rendre() {
    var l = lire(), ul = dr.querySelector('.sh-list'), tot = 0;
    ul.innerHTML = '';
    if (!l.length) { ul.innerHTML = '<li class="sh-empty">Votre panier est vide pour l’instant.</li>'; }
    l.forEach(function (a, i) {
      tot += a.prix;
      var li = document.createElement('li'); li.className = 'sh-item';
      li.innerHTML = '<img alt="" src="' + a.img + '"><div><b></b><small></small></div><div style="text-align:right"><div class="p">' + euros(a.prix) + '</div><button class="sh-rm" type="button">Retirer</button></div>';
      li.querySelector('b').textContent = a.nom;
      li.querySelector('small').textContent = 'Taille ' + a.taille;
      li.querySelector('.sh-rm').addEventListener('click', function () { var x = lire(); x.splice(i, 1); ecrire(x); rendre(); compter(); });
      ul.appendChild(li);
    });
    dr.querySelector('.sh-sum').textContent = euros(tot);
    dr.querySelector('.sh-go').disabled = !l.length;
  }
  function compter(pop) {
    var n = lire().length;
    document.querySelectorAll('.sh-count').forEach(function (c) {
      c.textContent = n; c.hidden = !n;
      if (pop) { c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop'); }
    });
    document.querySelectorAll('.sh-cart').forEach(function (b) { b.setAttribute('aria-label', 'Panier, ' + n + (n > 1 ? ' articles' : ' article')); });
  }
  function ouvrir() {
    dernierFocus = document.activeElement; rendre(); dr.querySelector('.sh-msg').textContent = '';
    veil.hidden = false; dr.hidden = false;
    requestAnimationFrame(function () { veil.classList.add('on'); dr.classList.add('on'); dr.querySelector('.sh-x').focus(); });
  }
  function fermer() {
    veil.classList.remove('on'); dr.classList.remove('on');
    setTimeout(function () { veil.hidden = true; dr.hidden = true; }, 300);
    if (dernierFocus) dernierFocus.focus();
  }
  veil.addEventListener('click', fermer);
  dr.querySelector('.sh-x').addEventListener('click', fermer);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !dr.hidden) fermer(); });
  dr.querySelector('.sh-go').addEventListener('click', function () {
    var l = lire(); if (!l.length) return;
    fermer();
    if (window.shCommande) window.shCommande(l, function () { ecrire([]); rendre(); compter(); });
  });
  document.querySelectorAll('.sh-cart').forEach(function (b) { b.addEventListener('click', ouvrir); });

  var tt;
  window.shAjouter = function (article) {
    var l = lire(); l.push(article); ecrire(l); compter(true);
    toast.textContent = article.nom + ' (taille ' + article.taille + ') ajoutée au panier';
    toast.classList.add('on'); clearTimeout(tt); tt = setTimeout(function () { toast.classList.remove('on'); }, 2400);
  };
  window.shOuvrirPanier = ouvrir;
  memoire = lire();
  compter();
})();
