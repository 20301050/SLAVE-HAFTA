/* Bouton « Haut de page » SLAVE HAFTA : apparaît après un peu de défilement, sur toutes les pages. */
(function () {
  if (document.querySelector('.sh-top')) return;
  var css = document.createElement('style');
  css.textContent = '.sh-top{position:fixed;right:max(18px,env(safe-area-inset-right,0px));bottom:calc(18px + env(safe-area-inset-bottom,0px));z-index:58;width:52px;height:52px;border-radius:50%;border:1px solid #D4AF37;background:#8B0000;color:#F1D27A;display:grid;place-items:center;cursor:pointer;box-shadow:0 10px 26px rgba(0,0,0,.35);opacity:0;transform:translateY(12px);pointer-events:none;transition:opacity .25s ease,transform .25s cubic-bezier(.23,1,.32,1),background .2s,color .2s}' +
    '.sh-top.on{opacity:1;transform:none;pointer-events:auto}' +
    '.sh-top:hover{background:#D4AF37;color:#6B0000}' +
    '.sh-top:focus-visible{outline:2px solid #F1D27A;outline-offset:3px}' +
    '.sh-top svg{width:22px;height:22px}' +
    '@media (prefers-reduced-motion:reduce){.sh-top{transition:none}}';
  document.head.appendChild(css);
  var b = document.createElement('button');
  b.type = 'button'; b.className = 'sh-top'; b.setAttribute('aria-label', 'Revenir en haut de la page'); b.title = 'Haut de page';
  b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  document.body.appendChild(b);
  var tick = false;
  function maj() { b.classList.toggle('on', scrollY > innerHeight * 0.8); tick = false; }
  addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(maj); } }, { passive: true });
  maj();
  b.addEventListener('click', function () {
    var lent = !matchMedia('(prefers-reduced-motion: reduce)').matches;
    scrollTo({ top: 0, behavior: lent ? 'smooth' : 'auto' });
    var cible = document.querySelector('nav a, a.brand, header a');
    if (cible) setTimeout(function () { cible.focus({ preventScroll: true }); }, lent ? 500 : 0);
  });
})();
