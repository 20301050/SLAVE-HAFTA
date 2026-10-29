/* SLAVE HAFTA : tunnel de commande (coordonnées, livraison, paiement, confirmation) et guide des tailles.
   Maquette : aucune donnée n'est envoyée, aucun paiement n'est réalisé. */
(function () {
  var css = document.createElement('style');
  css.textContent = [
    '.ck{position:fixed;inset:0;z-index:80;background:#F5F0E8;color:#4a0000;overflow:auto;font-family:Lato,Arial,sans-serif;opacity:0;transition:opacity .25s ease}',
    '.ck.on{opacity:1}',
    '.ck-top{position:sticky;top:0;z-index:2;background:#8B0000;color:#fff;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:calc(12px + env(safe-area-inset-top,0px)) max(16px,env(safe-area-inset-right,0px)) 12px max(16px,env(safe-area-inset-left,0px))}',
    '.ck-top b{font:700 16px "Playfair Display",Georgia,serif;letter-spacing:.28em;color:#D4AF37}',
    '.ck-x{min-height:44px;padding:0 16px;background:none;border:1px solid rgba(212,175,55,.6);color:#fff;font:700 11px Lato,Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;cursor:pointer}',
    '.ck-steps{list-style:none;margin:0;padding:18px max(16px,env(safe-area-inset-right,0px)) 0 max(16px,env(safe-area-inset-left,0px));display:flex;justify-content:center;gap:clamp(10px,3vw,40px);font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#9b7b6b}',
    '.ck-steps li{display:flex;align-items:center;gap:8px}',
    '.ck-steps i{display:grid;place-items:center;width:26px;height:26px;border-radius:50%;border:1px solid #C9A84C;font-style:normal;font-weight:700}',
    '.ck-steps li.on{color:#8B0000}.ck-steps li.on i{background:#8B0000;border-color:#8B0000;color:#fff}',
    '.ck-steps li.ok i{background:#C9A84C;border-color:#C9A84C;color:#4a0000}',
    '@media (max-width:560px){.ck-steps span{display:none}}',
    '.ck-in{max-width:1100px;margin:0 auto;padding:clamp(20px,4vw,40px) max(16px,env(safe-area-inset-right,0px)) 60px max(16px,env(safe-area-inset-left,0px));display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);gap:clamp(20px,4vw,48px);align-items:start}',
    '@media (max-width:820px){.ck-in{grid-template-columns:minmax(0,1fr)}.ck-sum{order:-1}}',
    '.ck h2{margin:0 0 16px;font:600 clamp(24px,3vw,32px) "Playfair Display",Georgia,serif;color:#8B0000}',
    '.ck h3{margin:22px 0 10px;font:600 18px "Playfair Display",Georgia,serif;color:#8B0000}',
    '.ck-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}',
    '.ck-grid .full{grid-column:1/-1}',
    '@media (max-width:520px){.ck-grid{grid-template-columns:minmax(0,1fr)}}',
    '.ck label.f{display:grid;gap:6px;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#8B0000}',
    '.ck input,.ck select{font:16px Lato,Arial,sans-serif;color:#4a0000;background:#fff;border:1px solid rgba(139,0,0,.25);padding:11px 12px;min-height:46px;width:100%}',
    '.ck input:focus-visible,.ck select:focus-visible,.ck button:focus-visible{outline:2px solid #C9A84C;outline-offset:2px}',
    '.ck input[aria-invalid="true"]{border-color:#b3121b;background:#fff4f4}',
    '.opt{display:flex;align-items:center;gap:12px;padding:14px;border:1px solid rgba(139,0,0,.2);background:#fff;cursor:pointer;margin-bottom:10px}',
    '.cb{margin:-4px 0 12px;padding:16px;border:1px solid rgba(139,0,0,.2);border-top:0;background:#fff}.cb[hidden]{display:none}.cb .ck-grid{margin-top:4px}.cb-num{position:relative}.cb-num input{padding-right:110px;letter-spacing:.06em;font-variant-numeric:tabular-nums}.cb-num .cb-ic{position:absolute;right:10px;bottom:13px;display:flex;gap:4px}.cb-num .cb-ic span{font:700 9px Lato,Arial,sans-serif;letter-spacing:.08em;color:#8B0000;border:1px solid rgba(139,0,0,.3);padding:3px 5px}.cb-lock{display:flex;align-items:center;gap:6px;margin:12px 0 0;font-size:12px;color:#7a5a4a}.ck{color-scheme:light}.opt input{width:20px;height:20px;min-height:0;padding:0;margin:0;border:0;accent-color:#8B0000;flex:none}',
    '.opt div{flex:1;min-width:0}.opt b{display:block;font:600 16px "Playfair Display",Georgia,serif}.opt small{color:#7a5a4a}',
    '.opt em{font-style:normal;font-weight:700;white-space:nowrap;font-variant-numeric:tabular-nums}',
    '.opt:has(input:checked){border-color:#8B0000;box-shadow:inset 0 0 0 1px #8B0000}',
    '.pay-ic{display:flex;gap:6px}.pay-ic span{font-size:10px;font-weight:700;letter-spacing:.08em;border:1px solid rgba(139,0,0,.3);padding:3px 6px;color:#8B0000}',
    '.ck-err{min-height:1.2em;margin:8px 0 0;color:#b3121b;font-size:14px}',
    '.ck-nav{display:flex;justify-content:space-between;gap:12px;margin-top:22px;flex-wrap:wrap}',
    '.ck-btn{min-height:50px;padding:0 26px;background:#8B0000;color:#fff;border:0;font:700 12px Lato,Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;cursor:pointer;transition:background-color .2s ease,transform .12s ease}',
    '.ck-btn:hover{background:#6B0000}.ck-btn:active{transform:scale(.98)}',
    '.ck-back{min-height:50px;padding:0 18px;background:none;border:1px solid rgba(139,0,0,.3);color:#8B0000;font:700 12px Lato,Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;cursor:pointer}',
    '.ck-note{margin:14px 0 0;padding:12px 14px;background:#fff;border-left:3px solid #C9A84C;font-size:14px;line-height:1.55}',
    '.ck-sum{background:#fff;border:1px solid rgba(201,168,76,.5);padding:20px;position:sticky;top:90px}',
    '.ck-sum ul{list-style:none;margin:0 0 14px;padding:0;display:grid;gap:12px}',
    '.ck-sum li{display:grid;grid-template-columns:52px minmax(0,1fr) auto;gap:10px;align-items:center}',
    '.ck-sum img{width:52px;height:70px;object-fit:cover;object-position:50% 20%;background:#efe7da}',
    '.ck-sum li b{display:block;font:600 15px "Playfair Display",Georgia,serif}.ck-sum li small{color:#7a5a4a}',
    '.ck-row{display:flex;justify-content:space-between;padding:6px 0;font-variant-numeric:tabular-nums}',
    '.ck-row.tot{border-top:1px solid rgba(139,0,0,.2);margin-top:6px;padding-top:12px;font:700 20px "Playfair Display",Georgia,serif;color:#8B0000}',
    '.ck-done{grid-column:1/-1;text-align:center;display:grid;justify-items:center;gap:14px;padding:30px 0}',
    '.ck-done .seal{width:84px;height:84px;border-radius:50%;display:grid;place-items:center;background:#8B0000;color:#D4AF37;font:700 34px "Playfair Display",Georgia,serif}',
    '.ck-done p{margin:0;max-width:52ch;line-height:1.6}',
    '.ck-done .num{font:700 22px "Playfair Display",Georgia,serif;color:#8B0000;letter-spacing:.06em}',
    /* guide des tailles */
    '.sg{position:fixed;inset:0;z-index:85;display:grid;place-items:center;background:rgba(30,0,0,.6);padding:16px;opacity:0;transition:opacity .2s ease}',
    '.sg.on{opacity:1}',
    '.sg-box{width:min(680px,100%);max-height:90vh;overflow:auto;background:#F5F0E8;color:#4a0000;padding:clamp(18px,4vw,32px);border:1px solid #C9A84C;font-family:Lato,Arial,sans-serif;position:relative}',
    '.sg-box h2{margin:0 0 6px;font:600 28px "Playfair Display",Georgia,serif;color:#8B0000}',
    '.sg-box p{margin:0 0 14px;line-height:1.55;font-size:15px}',
    '.sg-x{position:absolute;top:10px;right:10px;width:44px;height:44px;background:none;border:1px solid rgba(139,0,0,.3);color:#8B0000;font-size:20px;cursor:pointer}',
    '.sg-tab{overflow-x:auto;margin:6px 0 16px}',
    '.sg table{width:100%;border-collapse:collapse;font-variant-numeric:tabular-nums;font-size:15px;min-width:420px}',
    '.sg th,.sg td{padding:10px 8px;text-align:center;border-bottom:1px solid rgba(139,0,0,.15)}',
    '.sg thead th{background:#8B0000;color:#fff;font-size:11px;letter-spacing:.14em;text-transform:uppercase}',
    '.sg tbody th{font:700 16px "Playfair Display",Georgia,serif;color:#8B0000}',
    '.sg ol{margin:0;padding-left:20px;line-height:1.6;font-size:15px}',
    '.guide-btn{display:inline-flex;align-items:center;gap:8px;align-self:flex-start;min-height:42px;padding:9px 16px;background:rgba(212,175,55,.12);border:1px solid #D4AF37;border-radius:999px;color:#F1D27A;font:700 11px Lato,Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;text-decoration:none;cursor:pointer;transition:background .2s,color .2s}.guide-btn svg{width:18px;height:18px;flex:none}.guide-btn:hover{background:#D4AF37;color:#2a0000}',
    '@media (prefers-reduced-motion:reduce){.ck,.sg{transition:none}.ck-btn{transition:none}}'
  ].join('');
  document.head.appendChild(css);

  function euros(n) { return n.toLocaleString('fr-FR', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }) + ' €'; }
  function esc(t) { var d = document.createElement('div'); d.textContent = t; return d.innerHTML; }

  /* ---------- Guide des tailles ---------- */
  var sg = document.createElement('div'); sg.className = 'sg'; sg.hidden = true;
  sg.setAttribute('role', 'dialog'); sg.setAttribute('aria-modal', 'true'); sg.setAttribute('aria-labelledby', 'sg-t');
  sg.innerHTML = '<div class="sg-box"><button class="sg-x" type="button" aria-label="Fermer le guide des tailles">×</button>' +
    '<h2 id="sg-t">Guide des tailles</h2><p>Nos pièces suivent les tailles françaises. Mesures du corps en centimètres.</p>' +
    '<div class="sg-tab"><table><thead><tr><th scope="col">Taille</th><th scope="col">Taille FR</th><th scope="col">Poitrine (cm)</th><th scope="col">Taille (cm)</th><th scope="col">Hanches (cm)</th></tr></thead><tbody>' +
    '<tr><th scope="row">XS</th><td>34</td><td>80 – 84</td><td>62 – 66</td><td>88 – 92</td></tr>' +
    '<tr><th scope="row">S</th><td>36</td><td>84 – 88</td><td>66 – 70</td><td>92 – 96</td></tr>' +
    '<tr><th scope="row">M</th><td>38</td><td>88 – 92</td><td>70 – 74</td><td>96 – 100</td></tr>' +
    '<tr><th scope="row">L</th><td>40</td><td>92 – 96</td><td>74 – 78</td><td>100 – 104</td></tr>' +
    '<tr><th scope="row">XL</th><td>42</td><td>96 – 100</td><td>78 – 82</td><td>104 – 108</td></tr>' +
    '</tbody></table></div>' +
    '<p><b>Czapka :</b> S/M pour un tour de tête de 54 à 56 cm, L/XL de 57 à 59 cm.</p>' +
    '<h3 style="margin:0 0 8px;font:600 18px Playfair Display,Georgia,serif;color:#8B0000">Comment se mesurer</h3>' +
    '<ol><li><b>Poitrine</b> : autour de la partie la plus forte, mètre bien à l’horizontale.</li><li><b>Taille</b> : au creux de la taille, au-dessus du nombril.</li><li><b>Hanches</b> : autour de la partie la plus large.</li></ol>' +
    '<p style="margin-top:14px">Entre deux tailles ? Prenez la plus grande pour les vestes et tailleurs, la plus petite pour les pièces fluides.</p></div>';
  document.body.appendChild(sg);
  var sgPrev = null;
  function guideOuvrir() { sgPrev = document.activeElement; sg.hidden = false; requestAnimationFrame(function () { sg.classList.add('on'); sg.querySelector('.sg-x').focus(); }); }
  function guideFermer() { sg.classList.remove('on'); setTimeout(function () { sg.hidden = true; }, 200); if (sgPrev && sgPrev.focus) sgPrev.focus(); }
  sg.addEventListener('click', function (e) { if (e.target === sg) guideFermer(); });
  sg.querySelector('.sg-x').addEventListener('click', guideFermer);
  window.shGuide = guideOuvrir;

  /* ---------- Tunnel de commande ---------- */
  var LIV = [
    { id: 'dom', nom: 'Livraison à domicile', info: 'Colissimo, suivi par e-mail', prix: 6.9 },
    { id: 'relais', nom: 'Point relais', info: 'Retrait près de chez vous', prix: 4.9 },
    { id: 'eu', nom: 'Europe (Pologne, Italie…)', info: 'Colissimo international', prix: 14.9 }
  ];
  var ck = document.createElement('div'); ck.className = 'ck'; ck.hidden = true;
  ck.setAttribute('role', 'dialog'); ck.setAttribute('aria-modal', 'true'); ck.setAttribute('aria-label', 'Commande');
  document.body.appendChild(ck);
  var etat = {}, panier = [], viderPanier = null, ckPrev = null;

  function sousTotal() { return panier.reduce(function (s, a) { return s + a.prix; }, 0); }
  function fraisLiv() { var l = LIV.filter(function (x) { return x.id === etat.liv; })[0] || LIV[0]; return (l.id !== 'eu' && sousTotal() >= 300) ? 0 : l.prix; }

  function resume() {
    var st = sousTotal(), fl = fraisLiv();
    return '<aside class="ck-sum" aria-label="Récapitulatif"><h3 style="margin-top:0">Votre commande</h3><ul>' +
      panier.map(function (a) { return '<li><img alt="" src="' + esc(a.img) + '"><div><b>' + esc(a.nom) + '</b><small>Taille ' + esc(a.taille) + '</small></div><span>' + euros(a.prix) + '</span></li>'; }).join('') +
      '</ul><div class="ck-row"><span>Sous-total</span><span>' + euros(st) + '</span></div>' +
      '<div class="ck-row"><span>Livraison</span><span>' + (fl === 0 ? 'Offerte' : euros(fl)) + '</span></div>' +
      '<div class="ck-row tot"><span>Total</span><span>' + euros(st + fl) + '</span></div>' +
      '<p class="ck-note">Précommande : votre pièce est brodée après la commande. Expédition sous 4 à 6 semaines (délai indicatif).</p></aside>';
  }
  function steps(n) {
    var noms = ['Coordonnées', 'Livraison', 'Paiement'];
    return '<ol class="ck-steps">' + noms.map(function (t, i) { return '<li class="' + (i + 1 === n ? 'on' : (i + 1 < n ? 'ok' : '')) + '"' + (i + 1 === n ? ' aria-current="step"' : '') + '><i>' + (i + 1 < n ? '✓' : i + 1) + '</i><span>' + t + '</span></li>'; }).join('') + '</ol>';
  }
  function cadre(n, corps) {
    ck.innerHTML = '<div class="ck-top"><b>SLAVE HAFTA</b><button class="ck-x" type="button">Retour à la boutique</button></div>' + (n ? steps(n) : '') + '<div class="ck-in">' + corps + '</div>';
    ck.querySelector('.ck-x').addEventListener('click', fermer);
    ck.scrollTop = 0;
  }
  function champ(id, lab, type, ac, full, val) {
    return '<label class="f' + (full ? ' full' : '') + '">' + lab + '<input id="' + id + '" type="' + type + '" autocomplete="' + ac + '" value="' + esc(val || '') + '" required></label>';
  }

  function etape1() {
    cadre(1, '<form id="ck-f1" novalidate><h2>Vos coordonnées</h2><div class="ck-grid">' +
      champ('ck-prenom', 'Prénom', 'text', 'given-name', false, etat.prenom) + champ('ck-nom', 'Nom', 'text', 'family-name', false, etat.nom) +
      champ('ck-mail', 'E-mail', 'email', 'email', true, etat.mail) + champ('ck-tel', 'Téléphone', 'tel', 'tel', true, etat.tel) +
      champ('ck-adr', 'Adresse', 'text', 'street-address', true, etat.adr) + champ('ck-cp', 'Code postal', 'text', 'postal-code', false, etat.cp) +
      champ('ck-ville', 'Ville', 'text', 'address-level2', false, etat.ville) +
      '<label class="f full">Pays<select id="ck-pays" autocomplete="country-name"><option>France</option><option>Pologne</option><option>Belgique</option><option>Italie</option><option>Allemagne</option><option>Autre pays de l’UE</option></select></label>' +
      '</div><p class="ck-err" role="alert"></p><div class="ck-nav"><span></span><button class="ck-btn" type="submit">Continuer vers la livraison</button></div></form>' + resume());
    if (etat.pays) ck.querySelector('#ck-pays').value = etat.pays;
    ck.querySelector('#ck-f1').addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true, ids = ['ck-prenom', 'ck-nom', 'ck-mail', 'ck-tel', 'ck-adr', 'ck-cp', 'ck-ville'];
      ids.forEach(function (id) { var i = ck.querySelector('#' + id), v = i.value.trim() && i.checkValidity(); i.setAttribute('aria-invalid', v ? 'false' : 'true'); if (!v) ok = false; });
      if (!ok) { ck.querySelector('.ck-err').textContent = 'Merci de remplir les champs en rouge (e-mail au format prenom@exemple.fr).'; ck.querySelector('[aria-invalid="true"]').focus(); return; }
      etat.prenom = ck.querySelector('#ck-prenom').value.trim(); etat.nom = ck.querySelector('#ck-nom').value.trim(); etat.mail = ck.querySelector('#ck-mail').value.trim();
      etat.tel = ck.querySelector('#ck-tel').value.trim(); etat.adr = ck.querySelector('#ck-adr').value.trim(); etat.cp = ck.querySelector('#ck-cp').value.trim();
      etat.ville = ck.querySelector('#ck-ville').value.trim(); etat.pays = ck.querySelector('#ck-pays').value;
      if (etat.pays !== 'France' && etat.liv !== 'eu') etat.liv = 'eu';
      etape2();
    });
  }

  function etape2() {
    if (!etat.liv) etat.liv = 'dom';
    var opts = LIV.map(function (l) {
      var p = (l.id !== 'eu' && sousTotal() >= 300) ? 'Offerte' : euros(l.prix);
      return '<label class="opt"><input type="radio" name="ck-liv" value="' + l.id + '"' + (etat.liv === l.id ? ' checked' : '') + '><div><b>' + l.nom + '</b><small>' + l.info + '</small></div><em>' + p + '</em></label>';
    }).join('');
    cadre(2, '<form id="ck-f2"><h2>Livraison</h2><p style="margin:0 0 14px">Livraison à <b>' + esc(etat.prenom + ' ' + etat.nom) + '</b>, ' + esc(etat.adr + ', ' + etat.cp + ' ' + etat.ville + ', ' + etat.pays) + '.</p>' + opts +
      '<p class="ck-note">Livraison offerte en France dès 300 € d’achat.</p>' +
      '<div class="ck-nav"><button class="ck-back" type="button">← Coordonnées</button><button class="ck-btn" type="submit">Continuer vers le paiement</button></div></form>' + resume());
    ck.querySelectorAll('input[name="ck-liv"]').forEach(function (r) { r.addEventListener('change', function () { etat.liv = r.value; etape2(); var c = ck.querySelector('input[value="' + r.value + '"]'); if (c) c.focus(); }); });
    ck.querySelector('.ck-back').addEventListener('click', etape1);
    ck.querySelector('#ck-f2').addEventListener('submit', function (e) { e.preventDefault(); etape3(); });
  }

  function carteBloc() {
    return '<div class="cb" role="group" aria-label="Informations de la carte">' +
      '<div class="ck-grid">' +
      '<label class="f full">Titulaire de la carte<input id="cb-nom" type="text" autocomplete="off" placeholder="Prénom Nom"></label>' +
      '<label class="f full cb-num">Numéro de carte<input id="cb-num" type="text" inputmode="numeric" autocomplete="off" placeholder="1234 1234 1234 1234"><span class="cb-ic" aria-hidden="true"><span>CB</span><span>VISA</span><span>MC</span></span></label>' +
      '<label class="f">Date d’expiration<input id="cb-exp" type="text" inputmode="numeric" autocomplete="off" placeholder="MM/AA"></label>' +
      '<label class="f">Code de sécurité (CVC)<input id="cb-cvc" type="text" inputmode="numeric" autocomplete="off" placeholder="123"></label>' +
      '</div>' +
      '<p class="cb-lock"><span aria-hidden="true">🔒</span> Paiement chiffré et sécurisé · 3D Secure</p>' +
      '<button type="button" class="ck-back cb-test" id="cb-test" style="margin-top:12px">Remplir avec la carte de test</button>' +
      '</div>';
  }

  function etape3() {
    if (!etat.pay) etat.pay = 'carte';
    var tot = sousTotal() + fraisLiv();
    var pay = [
      { id: 'carte', nom: 'Carte bancaire', info: 'Paiement sécurisé', ic: '<span>CB</span><span>VISA</span><span>MC</span>' },
      { id: 'paypal', nom: 'PayPal', info: 'Payez avec votre compte PayPal', ic: '<span>PAYPAL</span>' },
      { id: 'trois', nom: 'En 3 fois sans frais', info: '3 × ' + euros(Math.round(tot / 3 * 100) / 100), ic: '<span>3X</span>' }
    ].map(function (p) { return '<label class="opt"><input type="radio" name="ck-pay" value="' + p.id + '"' + (etat.pay === p.id ? ' checked' : '') + '><div><b>' + p.nom + '</b><small>' + p.info + '</small></div><span class="pay-ic">' + p.ic + '</span></label>' + (p.id === 'carte' ? carteBloc() : ''); }).join('');
    cadre(3, '<form id="ck-f3"><h2>Paiement</h2>' + pay +
      '<p class="ck-note"><b>Maquette :</b> aucun paiement réel et rien n’est enregistré. N’entrez pas une vraie carte : utilisez la carte de test 4242 4242 4242 4242. Sur le vrai site, ces champs seront fournis par Stripe ou PayPal (paiement sécurisé).</p>' +
      '<label class="opt" style="margin-top:12px"><input type="checkbox" id="ck-cgv"><div><small>J’accepte les <b style="display:inline;font:inherit;text-decoration:underline">conditions générales de vente</b> et je comprends que ma pièce est fabriquée après la commande.</small></div></label>' +
      '<p class="ck-err" role="alert"></p>' +
      '<div class="ck-nav"><button class="ck-back" type="button">← Livraison</button><button class="ck-btn" type="submit">Payer ' + euros(tot) + '</button></div></form>' + resume());
    var cb = ck.querySelector('.cb');
    function majCb() { cb.hidden = etat.pay !== 'carte'; }
    ck.querySelectorAll('input[name="ck-pay"]').forEach(function (r) { r.addEventListener('change', function () { etat.pay = r.value; majCb(); }); });
    majCb();
    var cn = ck.querySelector('#cb-num'), ce = ck.querySelector('#cb-exp'), cc = ck.querySelector('#cb-cvc');
    cn.addEventListener('input', function () { var d = cn.value.replace(/\D/g, '').slice(0, 16); cn.value = d.replace(/(\d{4})(?=\d)/g, '$1 '); cn.removeAttribute('aria-invalid'); });
    ce.addEventListener('input', function () { var d = ce.value.replace(/\D/g, '').slice(0, 4); ce.value = d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d; ce.removeAttribute('aria-invalid'); });
    cc.addEventListener('input', function () { cc.value = cc.value.replace(/\D/g, '').slice(0, 3); cc.removeAttribute('aria-invalid'); });
    ck.querySelector('#cb-test').addEventListener('click', function () { ck.querySelector('#cb-nom').value = (etat.prenom + ' ' + etat.nom).trim(); cn.value = '4242 4242 4242 4242'; ce.value = '12/29'; cc.value = '123'; });
    ck.querySelector('.ck-nav .ck-back').addEventListener('click', etape2);
    ck.querySelector('#ck-f3').addEventListener('submit', function (e) {
      e.preventDefault();
      if (etat.pay === 'carte') {
        var bad = null, m = /^(\d{2})\/(\d{2})$/.exec(ce.value);
        [['#cb-nom', ck.querySelector('#cb-nom').value.trim().length > 1], ['#cb-num', cn.value.replace(/\s/g, '').length === 16], ['#cb-exp', !!m && +m[1] >= 1 && +m[1] <= 12], ['#cb-cvc', cc.value.length === 3]].forEach(function (t) { var el = ck.querySelector(t[0]); if (!t[1]) { el.setAttribute('aria-invalid', 'true'); if (!bad) bad = el; } });
        if (bad) { ck.querySelector('.ck-err').textContent = 'Vérifiez les informations de la carte (ou cliquez sur « Remplir avec la carte de test »).'; bad.focus(); return; }
      }
      if (!ck.querySelector('#ck-cgv').checked) { ck.querySelector('.ck-err').textContent = 'Merci d’accepter les conditions générales de vente pour continuer.'; ck.querySelector('#ck-cgv').focus(); return; }
      fin(tot);
    });
  }

  function fin(tot) {
    var num = 'SH-' + new Date().getFullYear() + '-' + String(Math.floor(1000 + Math.random() * 9000));
    var nb = panier.length;
    cadre(0, '<div class="ck-done"><div class="seal" aria-hidden="true">✓</div><h2 style="margin:0">Merci ' + esc(etat.prenom) + ' !</h2>' +
      '<p class="num">Commande ' + num + '</p>' +
      '<p>Votre précommande de <b>' + nb + (nb > 1 ? ' pièces' : ' pièce') + '</b> (' + euros(tot) + ') est confirmée. Un e-mail de confirmation sera envoyé à <b>' + esc(etat.mail) + '</b>.</p>' +
      '<p>Votre pièce va être brodée dans notre atelier. Expédition sous 4 à 6 semaines (délai indicatif).</p>' +
      '<p style="font-size:13px;color:#7a5a4a">Maquette : aucune commande réelle, aucun e-mail envoyé.</p>' +
      '<button class="ck-btn" type="button" id="ck-fin">Retour à la boutique</button></div>');
    ck.querySelector('#ck-fin').addEventListener('click', fermer);
    if (viderPanier) viderPanier();
  }

  function fermer() { ck.classList.remove('on'); setTimeout(function () { ck.hidden = true; ck.innerHTML = ''; }, 250); document.body.style.overflow = ''; if (ckPrev && ckPrev.focus) ckPrev.focus(); }
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (!sg.hidden) guideFermer(); else if (!ck.hidden) fermer();
  });

  window.shCommande = function (articles, vider) {
    panier = articles.slice(); viderPanier = vider; ckPrev = document.activeElement;
    ck.hidden = false; document.body.style.overflow = 'hidden';
    etape1();
    requestAnimationFrame(function () { ck.classList.add('on'); var f = ck.querySelector('#ck-prenom'); if (f) f.focus(); });
  };
})();
