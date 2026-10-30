/* Menu mobile SLAVE HAFTA : bouton ☰ visible sur petit écran, panneau avec les catégories, Notre histoire et Contact. */
(function () {
  var cart = document.querySelector('.sh-cart');
  var src = document.getElementById('dd-menu');
  if (!cart) return;

  var css = document.createElement('style');
  css.textContent = [
    '.sh-burger{display:none;width:44px;height:44px;align-items:center;justify-content:center;background:none;border:1px solid rgba(201,168,76,.5);border-radius:50%;color:#F5F0E8;cursor:pointer;font-size:18px;line-height:1}',
    '.sh-burger:focus-visible{outline:2px solid #D4AF37;outline-offset:3px}',
    '@media (max-width:760px){.sh-burger{display:inline-flex}}',
    '.sh-mm{position:fixed;inset:0;z-index:62;background:#6B0000;color:#F5F0E8;overflow:auto;padding:calc(20px + env(safe-area-inset-top,0px)) max(20px,env(safe-area-inset-right,0px)) calc(28px + env(safe-area-inset-bottom,0px)) max(20px,env(safe-area-inset-left,0px));font-family:Lato,Arial,sans-serif;opacity:0;transform:translateY(-8px);transition:opacity .2s ease,transform .25s cubic-bezier(.23,1,.32,1)}',
    '.sh-mm.on{opacity:1;transform:none}',
    '.sh-mm-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px}',
    '.sh-mm-top b{font:700 17px "Playfair Display",Georgia,serif;letter-spacing:.3em;color:#D4AF37}',
    '.sh-mm-x{width:44px;height:44px;background:none;border:1px solid rgba(201,168,76,.5);color:#F5F0E8;font-size:20px;cursor:pointer}',
    '.sh-mm h3{margin:22px 0 8px;font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:#C9A84C;font-weight:700}',
    '.sh-mm ul{list-style:none;margin:0;padding:0}',
    '.sh-mm a{display:block;padding:11px 0;border-bottom:1px solid rgba(201,168,76,.2);color:#F5F0E8;text-decoration:none;font:600 20px "Playfair Display",Georgia,serif}',
    '.sh-mm a[aria-current]{color:#D4AF37}',
    '.sh-mm .grid2{display:grid;grid-template-columns:1fr 1fr;column-gap:16px}',
    '@media (prefers-reduced-motion:reduce){.sh-mm{transition:none}}'
  ].join('');
  document.head.appendChild(css);

  var b = document.createElement('button');
  b.type = 'button'; b.className = 'sh-burger'; b.setAttribute('aria-label', 'Ouvrir le menu'); b.setAttribute('aria-expanded', 'false');
  b.textContent = '☰';
  cart.parentNode.insertBefore(b, cart);

  var here = location.pathname.split('/').pop() || 'index.html';
  function lien(txt, href) { return '<li><a href="' + href + '"' + (href === here ? ' aria-current="page"' : '') + '>' + txt + '</a></li>'; }
  var cats = '', caps = '';
  if (src) {
    var cols = src.querySelectorAll('.dd-col');
    if (cols[0]) cols[0].querySelectorAll('ul a').forEach(function (a) { cats += lien(a.textContent, a.getAttribute('href')); });
    if (cols[1]) cols[1].querySelectorAll('ul a').forEach(function (a) { caps += lien(a.textContent, a.getAttribute('href')); });
  }
  var mm = document.createElement('div');
  mm.className = 'sh-mm'; mm.hidden = true; mm.setAttribute('role', 'dialog'); mm.setAttribute('aria-modal', 'true'); mm.setAttribute('aria-label', 'Menu');
  mm.innerHTML = '<div class="sh-mm-top"><b>SLAVE HAFTA</b><button class="sh-mm-x" type="button" aria-label="Fermer le menu">×</button></div>' +
    '<ul>' + lien('Accueil', 'index.html') + lien('Notre histoire', 'histoire.html') + lien('La précommande', 'precommande.html') + '</ul>' +
    (cats ? '<h3>La collection</h3><ul class="grid2">' + cats + '</ul>' : '') +
    (caps ? '<h3>Capsule · édition limitée</h3><ul class="grid2">' + caps + '</ul>' : '') +
    '<h3>Contact</h3><ul>' + lien('Nous écrire', '#') + '</ul>';
  document.body.appendChild(mm);

  function ouvrir() { mm.hidden = false; b.setAttribute('aria-expanded', 'true'); requestAnimationFrame(function () { mm.classList.add('on'); mm.querySelector('.sh-mm-x').focus(); }); }
  function fermer() { mm.classList.remove('on'); b.setAttribute('aria-expanded', 'false'); setTimeout(function () { mm.hidden = true; }, 220); b.focus(); }
  b.addEventListener('click', ouvrir);
  mm.querySelector('.sh-mm-x').addEventListener('click', fermer);
  mm.addEventListener('click', function (e) { if (e.target.tagName === 'A') fermer(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !mm.hidden) fermer(); });
})();
