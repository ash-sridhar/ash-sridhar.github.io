(function () {
  var P = window.PORTFOLIO;
  if (!P) return;
  var $ = function (s) { return document.querySelector(s); };
  var esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  };
  var byId = function (id) { return P.projects.filter(function (p) { return p.id === id; })[0]; };
  var order = ['vco', 'automation', 'switching', 'mcu', 'ecg', 'firmware'];
  var list = order.map(byId).filter(Boolean);

  $('#project-list').innerHTML = list.map(function (p) {
    return '<article class="proj"><div><p class="when">' + esc(p.period) + '</p>' +
      '<h3><button type="button" class="open" data-id="' + p.id + '">' + esc(p.title) + '</button></h3>' +
      '<p>' + esc(p.teaser) + '</p>' +
      '<ul class="tags">' + p.tags.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div>' +
      '<p class="metric"><strong>' + esc(p.metric) + '</strong><span>' + esc(p.metricLabel) + '</span></p></article>';
  }).join('');

  $('#discovery-summary').textContent = P.discovery.summary;

  function gallery(g) {
    if (!g || !g.length) return '';
    return '<div class="gallery">' + g.map(function (i) {
      return '<figure><a href="' + i.image + '" target="_blank" rel="noopener"><img src="' + i.image + '" alt="' + esc(i.alt) + '" loading="lazy"></a>' +
        '<figcaption>' + esc(i.caption) + '</figcaption></figure>';
    }).join('') + '</div>';
  }
  function video(v) {
    if (!v) return '';
    return '<figure class="vid"><video controls preload="none" poster="' + v.poster + '"><source src="' + v.src + '" type="video/mp4"></video>' +
      '<figcaption>' + esc(v.caption) + '</figcaption></figure>';
  }
  function section(h, b) { return '<h3>' + esc(h) + '</h3><p>' + esc(b) + '</p>'; }

  function projectHtml(p) {
    var specs = p.specs ? '<table><tbody>' + p.specs.map(function (r) {
      return '<tr><th scope="row">' + esc(r[0]) + '</th><td class="val">' + esc(r[1]) + '</td></tr>';
    }).join('') + '</tbody></table>' : '';
    return '<h2 id="dlg-title">' + esc(p.title) + '</h2><p class="when">' + esc(p.period) + '</p>' + specs +
      section('Challenge', p.challenge) + section('Approach', p.approach) +
      section('Outcome', p.outcome) + section('Takeaway', p.takeaway) +
      gallery(p.gallery) + video(p.video) +
      (p.resource ? '<p><a href="' + p.resource.url + '" target="_blank" rel="noopener">' + esc(p.resource.label) + '</a></p>' : '');
  }
  function discoveryHtml(d) {
    return '<h2 id="dlg-title">' + esc(d.title) + '</h2><p>' + esc(d.summary) + '</p>' +
      d.sections.map(function (s) { return section(s.heading.replace(/^\d+\s*\/\s*/, ''), s.body); }).join('') +
      video(d.video) + gallery(d.gallery);
  }

  var dlg = $('#dlg'), body = $('#dlg-body');
  function open(html) {
    body.innerHTML = html;
    dlg.showModal();
    dlg.scrollTop = 0;
    $('#dlg-close').focus();
  }
  $('#project-list').addEventListener('click', function (e) {
    var b = e.target.closest('.open');
    if (b) open(projectHtml(byId(b.getAttribute('data-id'))));
  });
  $('#discovery-open').addEventListener('click', function () { open(discoveryHtml(P.discovery)); });
  $('#dlg-close').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('close', function () { body.innerHTML = ''; });
})();
