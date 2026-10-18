(() => {
  'use strict';
  const model = window.PORTFOLIO;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const escapeHTML = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const root = document.documentElement;
  let filter = 'all';

  // Theme choice persists on the device. Initial render prefers system setting.
  let theme = 'dark';
  try { theme = localStorage.getItem('portfolio-theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'); } catch(e) {}
  function setTheme(value) {
    theme = value;
    root.dataset.theme = value;
    $('#theme-toggle').setAttribute('aria-label', value === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    $('.theme-icon').textContent = value === 'light' ? '☾' : '☼';
    try { localStorage.setItem('portfolio-theme', value); } catch(e) {}
  }
  setTheme(theme);
  $('#theme-toggle').addEventListener('click', () => setTheme(theme === 'dark' ? 'light' : 'dark'));

  const filterContainer = $('#project-filters');
  const grid = $('#project-grid');
  const dialog = $('#project-dialog');
  const dialogContent = $('#dialog-content');
  let lastTrigger = null;
  model.filters.forEach(f => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'filter-btn' + (f.id === filter ? ' active' : '');
    button.textContent = f.label;
    button.dataset.filter = f.id;
    button.setAttribute('aria-pressed', String(f.id === filter));
    button.addEventListener('click', () => {
      filter = f.id;
      $$('.filter-btn', filterContainer).forEach(b => {
        b.classList.toggle('active', b.dataset.filter === filter);
        b.setAttribute('aria-pressed', String(b.dataset.filter === filter));
      });
      renderProjects();
    });
    filterContainer.append(button);
  });

  function renderProjects() {
    const shown = model.projects.filter(p => filter === 'all' || p.category === filter);
    $('#project-count').textContent = `${String(shown.length).padStart(2, '0')} PROJECT${shown.length === 1 ? '' : 'S'}`;
    grid.innerHTML = '';
    shown.forEach(p => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'project-card';
      button.setAttribute('aria-label', `Read case study: ${p.title}`);
      button.innerHTML = `
        <div class="project-thumb"><img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.imageAlt)}" width="600" height="380" loading="lazy">${p.featured ? '<span class="project-featured">FEATURED WORK ↗</span>' : ''}</div>
        <div class="project-inner"><div class="project-caption"><span>${escapeHTML(p.eyebrow.toUpperCase())}</span><span>${escapeHTML(p.number)} / ${String(model.projects.length).padStart(2, '0')}</span></div>
        <h3>${escapeHTML(p.title)}</h3><p>${escapeHTML(p.teaser)}</p>
        <div class="project-tags-small">${p.tags.slice(0,3).map(tag => `<span>${escapeHTML(tag)}</span>`).join('')}</div>
        <div class="project-foot"><div><div class="project-metric">${escapeHTML(p.metric)}</div><div class="meta-label">${escapeHTML(p.metricLabel.toUpperCase())}</div></div><span class="project-arrow" aria-hidden="true">↗</span></div></div>`;
      button.addEventListener('click', () => openProject(p, button));
      grid.appendChild(button);
    });
  }


  // Gallery entries are real project screenshots / slides, each linked to its full-size source.
  function evidenceGallery(gallery) {
    if(!Array.isArray(gallery) || !gallery.length) return '';
    return `<section class="project-evidence" aria-label="Original project images"><h3>Design evidence / project gallery</h3>
      <p class="evidence-intro">Actual CAD screenshots and presentation slides from this project. Select an image to view it full size.</p>
      <div class="evidence-grid">${gallery.map(g => `<a class="evidence-item" href="${escapeHTML(g.image)}" target="_blank" rel="noopener" aria-label="Open full-size image: ${escapeHTML(g.alt)}"><figure><img src="${escapeHTML(g.image)}" alt="${escapeHTML(g.alt)}" loading="lazy"><figcaption>${escapeHTML(g.caption)}</figcaption></figure></a>`).join('')}</div></section>`;
  }
  function specsTable(specs) {
    if(!Array.isArray(specs) || !specs.length) return '';
    return `<section class="project-specs"><h3>Measured / verified results</h3><table class="specs-table"><tbody>${specs.map(([label,value])=>`<tr><td>${escapeHTML(label)}</td><td>${escapeHTML(value)}</td></tr>`).join('')}</tbody></table></section>`;
  }
  function resourceLink(resource){
    return resource?.url && resource?.label ? `<a class="case-resource" href="${escapeHTML(resource.url)}" target="_blank" rel="noopener">${escapeHTML(resource.label)} ↗</a>` : '';
  }

  function openProject(p, trigger) {
    lastTrigger = trigger;
    $('#dialog-number').textContent = `CASE STUDY / ${p.number}`;
    const sections = [['The challenge', p.challenge], ['The approach', p.approach], ['The outcome', p.outcome], ['What I learned', p.takeaway]];
    dialogContent.innerHTML = `<img class="dialog-image" src="${escapeHTML(p.image)}" alt="${escapeHTML(p.imageAlt)}">
      <div class="dialog-body"><div class="dialog-eyebrow"><span>${escapeHTML(p.eyebrow.toUpperCase())}</span><span>${escapeHTML(p.period.toUpperCase())}</span></div>
      <h2 id="dialog-title">${escapeHTML(p.title)}</h2><p class="dialog-lede">${escapeHTML(p.teaser)}</p>
      <div class="dialog-tags">${p.tags.map(tag => `<span>${escapeHTML(tag)}</span>`).join('')}</div>
      <div class="dialog-metric"><b>${escapeHTML(p.metric)}</b><span>${escapeHTML(p.metricLabel)}</span></div>
      ${sections.map(([heading, text]) => `<article><h3>${escapeHTML(heading)}</h3><p>${escapeHTML(text)}</p></article>`).join('')}
      ${specsTable(p.specs)}
      ${evidenceGallery(p.gallery)}
      ${resourceLink(p.resource)}
      <div class="dialog-disclaimer">${p.gallery?.length ? 'Gallery images are from the project design files or presentation. Any oscillator values shown are simulated results, not measurements from fabricated silicon.' : 'Project header art is an original conceptual vector illustration. Technical figures are based on my project documentation and resume.'}</div></div>`;
    if (typeof dialog.showModal === 'function') { dialog.showModal(); $('#close-dialog').focus(); }
    else { dialog.setAttribute('open', ''); }
  }
  $('#close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { if(lastTrigger) lastTrigger.focus(); });
  renderProjects();
  $('#hero-project-count').textContent = String(model.projects.length).padStart(2, '0');

  // Simple SVG instrument — designed as an interactive illustration, not a simulation.
  const slider = $('#freq-slider');
  const wave = $('#wave-path');
  const glow = $('#wave-glow');
  const refWave = $('#reference-path');
  let progress = 0;
  let requestID = null;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function drawSignal() {
    const frequency = Number(slider.value);
    $('#freq-value').textContent = frequency;
    slider.style.background = `linear-gradient(to right,var(--mint) ${(frequency-450)}%,var(--line) ${(frequency-450)}%)`;
    const cycles = 3.5 + (frequency - 450) / 100 * 1.5;
    const width = 600, points = 380, d = [];
    for(let i=0;i<=points;i++) {
      const x = i / points * width;
      const phase = (i/points)*cycles*Math.PI*2 + progress;
      const y = 145 - 92 * Math.tanh(5.4*Math.sin(phase));
      d.push(`${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`);
    }
    const path = d.join(' ');
    wave.setAttribute('d',path); glow.setAttribute('d',path);
    const reference = [];
    for(let i=0;i<=points;i++) {
      const x=i/points*width;
      const y=145-52*Math.sin(i/points*cycles*Math.PI*2 + progress);
      reference.push(`${i ? 'L':'M'}${x.toFixed(1)},${y.toFixed(1)}`);
    }
    refWave.setAttribute('d',reference.join(' '));
  }
  slider.addEventListener('input', drawSignal);
  drawSignal();
  if (!reducedMotion) {
    let lastTime = 0;
    const animate = time => {
      if(time-lastTime > 33) { progress+=.035; drawSignal(); lastTime = time; }
      requestID = window.requestAnimationFrame(animate);
    };
    const observer = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting) { if(!requestID) requestID = window.requestAnimationFrame(animate); }
      else if(requestID) { window.cancelAnimationFrame(requestID); requestID = null; }
    });
    observer.observe($('.instrument-panel'));
  }

  // Mobile navigation and active section indication.
  const toggle = $('#menu-toggle');
  const menu = $('#mobile-nav');
  function closeMenu() { menu.hidden=true; toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation'); }
  toggle.addEventListener('click', () => {
    menu.hidden = !menu.hidden;
    toggle.setAttribute('aria-expanded',String(!menu.hidden));
    toggle.setAttribute('aria-label',menu.hidden ? 'Open navigation' : 'Close navigation');
  });
  $$('#mobile-nav a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if(e.key === 'Escape' && !menu.hidden) closeMenu(); });
  const sections = ['about','work','discovery','experience','roadmap','contact'].map(id => document.getElementById(id));
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => { if(entry.isIntersecting) $$('.desktop-nav a').forEach(a => a.classList.toggle('active', a.dataset.nav === entry.target.id)); });
  },{rootMargin:'-20% 0px -65% 0px'});
  sections.forEach(s => sectionObserver.observe(s));
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    $('#scroll-progress').style.width = `${max ? window.scrollY/max*100 : 0}%`;
  };
  window.addEventListener('scroll',updateProgress,{passive:true});
  window.addEventListener('resize',updateProgress);
  updateProgress();
  $('#year').textContent = String(new Date().getFullYear());

  // Content-driven links, so basic updates only require content.js.
  const person = model.person;
  $('#email-link').href = 'mailto:' + person.email;
  $('#linkedin-link').href = person.linkedin;
  if($('#email-text')) $('#email-text').textContent = person.email;
  $$('.header-resume,.resume-actions a,.resume-fallback a').forEach(a => {
    if(a.getAttribute('href')?.includes('Resume.pdf')) a.href = person.resume;
  });
  $('#discovery-summary').textContent = model.discovery.summary;
  $('#discovery-title').textContent = model.discovery.title;
  $('#discovery-status').lastChild.textContent = ' ' + model.discovery.status.toUpperCase();
  $('#discovery-image').src = model.discovery.image;
  $('#discovery-image').alt = model.discovery.imageAlt;
  if (model.discovery.sections?.length) {
    $('#discovery-note').textContent = 'Read the full project feature, including the process, decisions, and results.';
    const readButton = document.createElement('button');
    readButton.type = 'button';
    readButton.className = 'discovery-read';
    readButton.textContent = 'Read complete feature ↗';
    readButton.addEventListener('click', () => {
      lastTrigger = readButton;
      $('#dialog-number').textContent = 'ECE 1100 / DISCOVERY PROJECT';
      dialogContent.innerHTML = `<img class="dialog-image" src="${escapeHTML(model.discovery.image)}" alt="${escapeHTML(model.discovery.imageAlt)}">
        <div class="dialog-body"><div class="dialog-eyebrow"><span>DISCOVERY PROJECT</span><span>GEORGIA TECH / ECE 1100</span></div>
        <h2 id="dialog-title">${escapeHTML(model.discovery.title)}</h2><p class="dialog-lede">${escapeHTML(model.discovery.summary)}</p>
        ${model.discovery.sections.map(s => `<article><h3>${escapeHTML(s.heading)}</h3><p>${escapeHTML(s.body)}</p></article>`).join('')}
        ${evidenceGallery(model.discovery.gallery)}
        <div class="dialog-disclaimer">These figures are my own Altium design screenshots and 3D CAD rendering. Timing values discussed in this case study are calculated, unless otherwise noted.</div></div>`;
      dialog.showModal(); $('#close-dialog').focus();
    });
    $('#discovery-action').append(readButton);
  }

  // Respect user motion preferences. Intersection-based reveal is purely decorative.
  if(!reducedMotion && 'IntersectionObserver' in window){
    $$('.section-heading,.about-copy,.identity-card,.project-card,.roadmap-card,.timeline-item,.contact-shell').forEach(el => el.classList.add('reveal'));
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('in-view'); revealObserver.unobserve(entry.target); } }),{rootMargin:'0px 0px -50px 0px',threshold:.08});
    $$('.reveal').forEach(el => revealObserver.observe(el));
  }
})();
