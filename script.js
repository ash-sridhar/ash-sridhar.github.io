(function () {
  document.querySelectorAll('a[href^="http"]').forEach(function (a) { a.target = '_blank'; a.rel = 'noopener noreferrer'; });
  var P = window.PORTFOLIO, d = document;
  var $ = function (s) { return d.querySelector(s); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var still = matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* Power-on intro: a VCO chirps up to lock, the name decodes, then the board powers on */
  var rt = d.documentElement, boot = $('#boot');
  function runBoot() {
    var boot = $('#boot'); if (!boot) return;
    var bt = $('#boot-trace'), bm = $('#boot-mhz'), led = $('#boot-led'), bn = $('#boot-name'), post = $('#boot-post'), t0 = performance.now(), over = false, nm = 'Ashwath Sridhar', gl = '01ABCDEF#%&/<>=+';
    [['POWER', '1.8 V OK', 250], ['BIAS', 'STABLE', 650], ['VCO', 'LOCKED', 1050], ['DRC', '0 VIOLATIONS', 1450], ['LVS', 'MATCH', 1750]].forEach(function (l) {
      setTimeout(function () { if (!over) post.insertAdjacentHTML('beforeend', '<li><span>' + l[0] + '</span><b>' + l[1] + '</b></li>'); }, l[2]);
    });
    var finish = function (ev) {
      if (ev && ev.type === 'keydown' && (ev.repeat || ev.key === 'p' || ev.key === 'P')) return;
      if (over) return; over = true; removeEventListener('keydown', finish); boot.classList.add('go'); rt.classList.add('booted');
      try { sessionStorage.setItem('booted', '1'); } catch (x) {}
      setTimeout(function () { boot.remove(); }, 1100);
    };
    addEventListener('keydown', finish); boot.addEventListener('pointerdown', finish);
    var frame = function (now) {
      if (over) return;
      var t = now - t0, p = Math.min(1, t / 1700), ez = 1 - Math.pow(1 - p, 3), sd = '';
      for (var x = 0; x <= 600 * p; x += 3) {
        var u = x / 600, v = Math.sin(2 * Math.PI * (3 * u + 22 * u * u));
        sd += (x ? 'L' : 'M') + x + ' ' + (90 - 55 * Math.sign(v) * Math.min(1, Math.abs(v) * 5)).toFixed(1);
      }
      bt.setAttribute('d', sd || 'M0 90'); bm.textContent = (500 * ez).toFixed(1); led.classList.toggle('on', p >= 1);
      var q = Math.max(0, Math.min(1, (t - 1000) / 900)), out = '';
      if (t > 1000) for (var i = 0; i < nm.length; i++) out += (nm[i] === ' ' || i < nm.length * q) ? nm[i] : gl[Math.floor(Math.random() * gl.length)];
      bn.textContent = out;
      if (t > 2500) finish(); else requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }
  var bootTpl = boot ? boot.outerHTML : null;
  if (boot && !rt.classList.contains('booted')) runBoot();
  function cycle() {
    if (!bootTpl || still || (typeof dlg !== 'undefined' && dlg && dlg.open)) return;
    var old = $('#boot'); if (old) old.remove();
    scrollTo(0, 0); rt.classList.remove('booted');
    d.body.insertAdjacentHTML('afterbegin', bootTpl); setTimeout(runBoot, 0);
  }
  $('#cycle').addEventListener('click', cycle);
  d.addEventListener('keydown', function (e) {
    if ((e.key === 'p' || e.key === 'P') && !e.ctrlKey && !e.metaKey && !e.altKey && !/INPUT|TEXTAREA/.test((d.activeElement || {}).tagName || '')) cycle();
  });

  /* Oscilloscope: slider sweeps the 450 to 550 MHz design band (illustrative) */
  var path = $('#trace'), slider = $('#freq'), f = 500, ph = 0;
  function draw() {
    var c = 3 + 4 * (f - 450) / 100, s = '';
    for (var x = 0; x <= 600; x += 4) {
      var v = Math.sin(c * 2 * Math.PI * x / 600 + ph);
      s += (x ? 'L' : 'M') + x + ' ' + (75 - 52 * Math.sign(v) * Math.min(1, Math.abs(v) * 4)).toFixed(1);
    }
    path.setAttribute('d', s);
  }
  function loop() { ph -= f / 9000; draw(); requestAnimationFrame(loop); }
  slider.addEventListener('input', function () { f = +slider.value; $('#val').textContent = f.toFixed(1); if (still) draw(); });
  draw(); if (!still) loop();

  /* Projects as components */
  var lensOf = { vco: ['analog'], switching: ['analog', 'test'], automation: ['test'], ecg: ['analog', 'test'], mcu: ['embedded'], firmware: ['embedded'] };
  var refs = { vco: 'U2', automation: 'U3', switching: 'Q1', mcu: 'U4', ecg: 'R1', firmware: 'U5' };
  var order = ['vco', 'automation', 'switching', 'mcu', 'ecg', 'firmware'];
  var byId = function (id) { return P.projects.filter(function (p) { return p.id === id; })[0]; };
  var list = order.map(byId).filter(Boolean);
  var grid = $('#grid');
  grid.innerHTML = list.map(function (p) {
    return '<article class="card" data-id="' + p.id + '" data-ref="' + refs[p.id] + '" data-m="' + esc(p.metric) + '" data-l="' + esc(p.metricLabel) + '"><p class="when">' + esc(p.period) + '</p><h3><button type="button" class="open" data-id="' + p.id + '">' + esc(p.title) + '</button></h3><p>' + esc(p.teaser) + '</p><ul class="tags">' + p.tags.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul><p class="m"><strong>' + esc(p.metric) + '</strong><span>' + esc(p.metricLabel) + '</span></p></article>';
  }).join('');
  $('#disc-sum').textContent = P.discovery.summary;

  /* Metrics count up as each project scrolls into view */
  function count(el) {
    var txt = el.textContent, t1 = performance.now();
    function step(now) {
      var p = Math.min(1, (now - t1) / 900), ez = 1 - Math.pow(1 - p, 3);
      el.textContent = txt.replace(/\d+(\.\d+)?/g, function (m) { return (parseFloat(m) * ez).toFixed((m.split('.')[1] || '').length); });
      if (p < 1) requestAnimationFrame(step); else el.textContent = txt;
    }
    requestAnimationFrame(step);
  }
  if (!still && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { io.unobserve(en.target); count(en.target); } }); }, { threshold: .6 });
    d.querySelectorAll('.card .m strong').forEach(function (n) { io.observe(n); });
  }

  /* Layer viewer */
  var lpn = $('#layers-panel'), lbn = $('#layers-btn');
  lbn.addEventListener('click', function () { var o = lpn.hidden; lpn.hidden = !o; lbn.setAttribute('aria-expanded', o); });
  lpn.addEventListener('change', function (e) { rt.classList.toggle('no-' + e.target.dataset.layer, !e.target.checked); });

  /* Probe tooltip */
  var probe = $('#probe');
  grid.addEventListener('pointermove', function (e) {
    var c = e.target.closest('.card');
    if (!c) { probe.classList.remove('on'); return; }
    probe.innerHTML = 'PROBE ' + esc(c.dataset.ref) + '<br>' + c.dataset.m + '<br>' + c.dataset.l;
    probe.style.left = Math.min(e.clientX, innerWidth - 260) + 'px'; probe.style.top = e.clientY + 'px'; probe.classList.add('on');
  });
  grid.addEventListener('pointerleave', function () { probe.classList.remove('on'); });

  /* Net highlight */
  var lb = d.querySelectorAll('.lens button');
  lb.forEach(function (b) {
    b.addEventListener('click', function () {
      lb.forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
      var k = b.dataset.lens;
      d.querySelectorAll('.card').forEach(function (c) {
        var hit = k === 'all' || (lensOf[c.dataset.id] || []).indexOf(k) > -1;
        c.classList.toggle('dim', !hit); c.style.order = hit ? 0 : 1;
      });
    });
  });

  /* Board: background traces, rail and signal head, all driven by one rAF-throttled scroll handler */
  var board = $('#main'), svg = $('#bgtr'), rail = $('#rail'), lit = $('#lit'), head = $('#head'), secs = [].slice.call(d.querySelectorAll('.sec'));
  var NS = 'http://www.w3.org/2000/svg', bands = [], pads = [], lastY = 0, boardTop = 0, railH = 1, vh = innerHeight, tick = false;
  function mk(t, a) { var e = d.createElementNS(NS, t); for (var k in a) e.setAttribute(k, a[k]); svg.appendChild(e); return e; }
  function measure() {
    vh = innerHeight; boardTop = board.getBoundingClientRect().top + scrollY;
    var pts = secs.map(function (e) { return parseFloat(getComputedStyle(e).getPropertyValue('--pt')) || 150; });
    pads = secs.map(function (e, i) { return e.offsetTop + pts[i] + 22; });
    lastY = pads[pads.length - 1]; railH = lastY + 2; rail.style.height = railH + 'px';
    svg.setAttribute('height', 0);
    var W = board.clientWidth, H = board.scrollHeight, seed = 23, small = W < 700;
    function rnd() { seed = seed * 16807 % 2147483647; return seed / 2147483647; }
    svg.setAttribute('width', W); svg.setAttribute('height', H); svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H); svg.innerHTML = ''; bands = [];
    var bl0 = board.getBoundingClientRect(), rg = d.createRange(), hr = [];
    rg.selectNodeContents(d.querySelector('.hero h1'));
    if (rg.getClientRects) hr = [].slice.call(rg.getClientRects()).map(function (r) { var ih = r.height * .12; return { l: r.left - bl0.left - 4, r: r.right - bl0.left + 4, t: r.top - bl0.top + ih, b: r.bottom - bl0.top - ih }; });
    function inText(x, y) { return hr.some(function (r) { return x > r.l && x < r.r && y > r.t && y < r.b; }); }
    function add(ops, x0, y0, cls, w) {
      var x = x0, y = y0, d = 'M' + x + ' ' + y, vs = [];
      ops.forEach(function (o) {
        if (o[0] === 'h') { x = o[1]; d += 'H' + x; }
        else if (o[0] === 'd') { x += o[1]; y += o[2]; d += 'L' + x + ' ' + y; }
        else if (o[0] === 'v') { y = o[1]; d += 'V' + y; }
        else vs.push([x, y]);
      });
      var dim = mk('path', { d: d, 'class': 'dim' }), lt = mk('path', { d: d, 'class': 'lt ' + (cls || '') }), len = lt.getTotalLength();
      dim.style.setProperty('--len', len); if (w) { dim.style.strokeWidth = w; lt.style.strokeWidth = w; } lt.style.strokeDasharray = '0 ' + len;
      bands.push({ y: y0, len: len, lt: lt, v: vs.filter(function (p) { return !inText(p[0], p[1]); }).map(function (p) { return mk('circle', { cx: p[0], cy: p[1], r: 7 }); }) });
    }
    /* Hero: five distinct buses behind the introduction, kept off the lead text and ending at the chip */
    var bl = board.getBoundingClientRect(), rel = function (el) { var r = el.getBoundingClientRect(); return { t: r.top - bl.top, b: r.bottom - bl.top, l: r.left - bl.left, r: r.right - bl.left }; };
    var lead = d.querySelector('.hero .lead'), ld = rel(lead), col = rel(lead.parentNode), sc = rel(d.querySelector('.hero .scope'));
    var stacked = sc.l < col.r + 10, e = stacked ? sc.r : sc.l - 10, g = small ? 40 : 60, gx = stacked ? W - 10 : (col.r + sc.l) / 2;
    function clear(lo, hi) { if (hi < ld.t - 14 || lo > ld.b + 14) return 0; var up = ld.t - 14 - hi, dn = ld.b + 14 - lo; return (lo + up >= 8 && Math.abs(up) < Math.abs(dn)) ? up : dn; }
    function hero(ops, y0, lo, hi) { add(ops, 0, y0 + clear(lo, hi), 'bk'); }
    hero([['h', e * .2], ['d', g, g], ['o'], ['h', e * .6], ['d', g, -g], ['o'], ['h', e]], 90, 90, 90 + g);
    hero([['h', e * .15], ['d', g, g], ['h', e * .5], ['d', g, -g], ['h', e * .72], ['d', g, g], ['o'], ['h', e]], 150, 150, 150 + g);
    hero([['h', e * .28], ['d', g, -g], ['o'], ['h', e * .7], ['d', g, g], ['o'], ['h', e]], 330, 330 - g, 330);
    hero([['h', e * .1], ['d', g, g], ['h', e * .46], ['d', g, -g], ['o'], ['h', e]], 400, 400, 400 + g);
    add([['v', 520], ['o']], gx, 0, 'bk');
    /* Gaps between sections: a freshly composed set of traces in each, kept clear of text */
    secs.forEach(function (e, i) {
      var t = e.offsetTop + 10, u = pts[i] - 50, n = small ? 2 : (rnd() < .5 ? 2 : 3), k;
      var sp = Math.min(72, Math.floor((u - 12) / (n - 1))), dir = [], amp = [], m = Math.max(8, Math.floor((sp - 24) / 2));
      for (k = 0; k < n; k++) { dir[k] = k === 0 ? 1 : k === n - 1 ? -1 : (rnd() < .5 ? 1 : -1); amp[k] = Math.max(8, Math.min(12 + Math.floor(rnd() * 3) * 5, sp - 24)); }
      for (k = 0; k < n - 1; k++) if (dir[k] === 1 && dir[k + 1] === -1) { amp[k] = Math.min(amp[k], m); amp[k + 1] = Math.min(amp[k + 1], m); }
      for (k = 0; k < n; k++) {
        var y = t + 6 + k * sp, a = amp[k], s = dir[k] * a, xa = W * (.05 + rnd() * .22), xb = xa + W * (.12 + rnd() * .18), xc = xb + W * (.1 + rnd() * .15), w = 4 + Math.floor(rnd() * 3), kind = Math.floor(rnd() * 5), x0 = 0, ops;
        if (kind === 0) ops = [['h', xa], ['d', a, s], ['h', xb], ['d', a, -s], ['h', W]];
        else if (kind === 1) ops = [['h', xa], ['d', a, s], ['o'], ['h', W]];
        else if (kind === 2) ops = [['h', xa], ['d', a, s], ['h', xb], ['d', a, -s], ['h', xc], ['d', a, s], ['h', xc + W * .1], ['d', a, -s], ['h', W]];
        else if (kind === 3) ops = [['h', xa], ['d', a, s], ['h', xb], ['o']];
        else { x0 = xa; ops = [['o'], ['h', xb], ['d', a, s], ['h', W - W * .06], ['o']]; }
        add(ops, x0, y, '', w);
      }
    });
    update();
  }
  function update() {
    tick = false;
    var max = Math.max(1, d.documentElement.scrollHeight - vh), hy = scrollY + vh * .55 - boardTop;
    if (max - scrollY < vh * .4) { var t = 1 - (max - scrollY) / (vh * .4); hy += (lastY - hy) * t; }
    hy = still ? lastY : Math.max(0, Math.min(lastY, hy));
    lit.style.transform = 'scaleY(' + (hy / railH) + ')'; head.style.transform = 'translateY(' + hy + 'px)';
    pads.forEach(function (p, i) { secs[i].classList.toggle('on', hy >= p - 4); });
    bands.forEach(function (b) {
      var fr = still ? 1 : Math.max(0, Math.min(1, (hy - (b.y - 30)) / Math.max(40, Math.min(260, lastY - (b.y - 30)))));
      b.lt.style.strokeDasharray = (fr * b.len) + ' ' + b.len;
      b.v.forEach(function (c, n) { c.classList.toggle('on', fr > (n + 1) / (b.v.length + 1)); });
    });
    var tl = d.querySelector('.tps');
    if (tl) {
      var tr = tl.getBoundingClientRect();
      tl.style.setProperty('--rp', still ? 1 : Math.max(0, Math.min(1, (vh * .62 - tr.top - 28) / Math.max(1, tr.height - 56))));
      tl.querySelectorAll('li').forEach(function (li) { li.classList.toggle('on', still || li.getBoundingClientRect().top + 28 < vh * .62); });
    }
  }
  addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener('resize', measure); addEventListener('load', measure);
  if (window.ResizeObserver) { var lastH = 0; new ResizeObserver(function () { var bh = board.scrollHeight; if (Math.abs(bh - lastH) > 1) { lastH = bh; measure(); } }).observe(board); }
  if (d.fonts && d.fonts.ready) d.fonts.ready.then(measure);
  measure();

  /* Case-study dialog */
  function sec(h, b) { return '<h3>' + esc(h) + '</h3><p>' + esc(b) + '</p>'; }
  function gal(g) { return g && g.length ? '<div class="gal">' + g.map(function (i) { return '<figure><a href="' + i.image + '" target="_blank" rel="noopener"><img src="' + i.image + '" alt="' + esc(i.alt) + '" loading="lazy"></a><figcaption>' + esc(i.caption) + '</figcaption></figure>'; }).join('') + '</div>' : ''; }
  function vid(v) { return v ? '<figure class="vid"><video controls preload="none" poster="' + v.poster + '"><source src="' + v.src + '" type="video/mp4"></video><figcaption>' + esc(v.caption) + '</figcaption></figure>' : ''; }
  function proj(p) {
    var t = p.specs ? '<table><tbody>' + p.specs.map(function (r) { return '<tr><th scope="row">' + esc(r[0]) + '</th><td>' + esc(r[1]) + '</td></tr>'; }).join('') + '</tbody></table>' : '';
    var g = p.gallery || [];
    var badges = p.id === 'vco' ? '<ul class="badges"><li>DRC: 0 violations</li><li>LVS: match</li><li>Corners: tt, ff, ss</li><li>Sweep: 0 to 70 °C</li></ul>' : '';
    return '<h2 id="dlg-title">' + esc(p.title) + '</h2><p class="when">' + esc(p.period) + '</p>' + badges + t + sec('Challenge', p.challenge) + sec('Approach', p.approach) + sec('Outcome', p.outcome) + sec('Takeaway', p.takeaway) + gal(g) + vid(p.video) + (p.resource ? '<p><a href="' + p.resource.url + '" target="_blank" rel="noopener noreferrer">' + esc(p.resource.label) + '</a></p>' : '');
  }
  function disc(x) { return '<h2 id="dlg-title">' + esc(x.title) + '</h2><p>' + esc(x.summary) + '</p>' + x.sections.map(function (s) { return sec(s.heading.replace(/^\d+\s*\/\s*/, ''), s.body); }).join('') + vid(x.video) + gal(x.gallery); }
  var dlg = $('#dlg');
  function show(h, from) {
    probe.classList.remove('on'); $('#dbody').innerHTML = h; dlg.classList.remove('out'); dlg.showModal(); dlg.scrollTop = 0; rt.classList.add('zoomed');
    if (from) { var f = from.getBoundingClientRect(), r = dlg.getBoundingClientRect(); dlg.style.transformOrigin = (f.left + f.width / 2 - r.left) + 'px ' + (f.top + f.height / 2 - r.top) + 'px'; }
    $('#dlg-x').focus();
  }
  function closeDlg() {
    if (!dlg.open || dlg.classList.contains('out')) return;
    if (still) { dlg.close(); return; }
    dlg.classList.add('out'); setTimeout(function () { dlg.close(); }, 230);
  }
  grid.addEventListener('click', function (e) { var b = e.target.closest('.open'); if (b) show(proj(byId(b.dataset.id)), b.closest('.card')); });
  $('#disc-open').addEventListener('click', function () { show(disc(P.discovery), this); });
  $('#dlg-x').addEventListener('click', closeDlg);
  dlg.addEventListener('click', function (e) { if (e.target === dlg) closeDlg(); });
  dlg.addEventListener('cancel', function (e) { e.preventDefault(); closeDlg(); });
  dlg.addEventListener('close', function () { $('#dbody').innerHTML = ''; dlg.classList.remove('out'); rt.classList.remove('zoomed'); });
})();
