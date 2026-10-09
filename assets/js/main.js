(function () {
  'use strict';
  const tours = window.MorobeTours;
  const core = window.MorobeCore;
  const $ = selector => document.querySelector(selector);
  const escape = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const params = new URLSearchParams(window.location.search);
  const toggle = $('.menu-toggle');
  const nav = $('#site-nav');
  toggle.hidden = false;
  nav.classList.add('enhanced');
  function closeMenu() { toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); }
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('is-open')) { closeMenu(); toggle.focus(); } });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  window.matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);

  function card(tour, full = true) {
    return `<article class="tour-card"><a class="tour-photo" href="contact.html?tour=${escape(tour.id)}"><img src="assets/images/${escape(tour.image)}" alt="${escape(tour.alt)}" loading="lazy" width="1500" height="1000"><span class="tour-category">${escape(tour.category)}</span></a><div class="tour-card-body"><p class="tour-duration">${escape(tour.duration)} · Sample experience</p><h3>${escape(tour.name)}</h3><p>${escape(tour.description)}</p>${full ? `<details><summary>Itinerary &amp; inclusions</summary><h4>Sample itinerary</h4><ol>${tour.itinerary.map(item => `<li>${escape(item)}</li>`).join('')}</ol><h4>Sample inclusions</h4><ul>${tour.inclusions.map(item => `<li>${escape(item)}</li>`).join('')}</ul><p class="small-note">Access, host permission, transport, weather, and availability would need to be checked with a real operator.</p></details>` : ''}<div class="tour-card-bottom"><span><strong>${core.kina(tour.price)}</strong><small>sample price / person</small></span><a class="text-link" href="contact.html?tour=${escape(tour.id)}">Enquire <span aria-hidden="true">↗</span></a></div></div></article>`;
  }
  if ($('#featured-tours')) $('#featured-tours').innerHTML = [tours[0], tours[2], tours[4]].map(tour => card(tour, false)).join('');
  if ($('#tour-list')) {
    let category = ['Nature','Culture','Coast'].includes(params.get('category')) ? params.get('category') : 'All';
    function renderTours() {
      const query = $('#tour-search').value.trim().toLowerCase();
      const filtered = tours.filter(tour => (category === 'All' || tour.category === category) && `${tour.name} ${tour.description} ${tour.category}`.toLowerCase().includes(query));
      $('#tour-list').innerHTML = filtered.map(tour => card(tour)).join('');
      $('#no-tours').hidden = filtered.length !== 0;
      $('#tour-count').textContent = `${filtered.length} of ${tours.length} sample tours`;
      document.querySelectorAll('[data-category]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.category === category)));
    }
    document.querySelectorAll('[data-category]').forEach(button => button.addEventListener('click', () => { category = button.dataset.category; renderTours(); }));
    $('#tour-search').addEventListener('input', renderTours);
    renderTours();
  }
  ['#calc-tour', '#enquiry-tour'].forEach(selector => {
    const select = $(selector);
    if (!select) return;
    tours.forEach(tour => { const option = document.createElement('option'); option.value = tour.id; option.textContent = `${tour.name} · ${core.kina(tour.price)} / person`; select.append(option); });
    if (tours.some(tour => tour.id === params.get('tour'))) select.value = params.get('tour');
  });
  if ($('#calculator-form')) {
    function calculate() {
      const tour = tours.find(item => item.id === $('#calc-tour').value);
      const people = $('#calc-people').value;
      const valid = Boolean(tour) && core.validGroup(people);
      $('#calc-people').setAttribute('aria-invalid', String(!valid));
      $('#calc-error').textContent = valid ? '' : 'Enter a whole number from 1 to 20.';
      $('#estimate-total').textContent = valid ? core.kina(core.estimate(tour, people)) : 'Check group size';
      $('#estimate-breakdown').textContent = valid ? `${core.kina(tour.price)} × ${Number(people)} ${Number(people) === 1 ? 'person' : 'people'}` : '';
      $('#estimate-enquiry').hidden = !valid;
      if (valid) $('#estimate-enquiry').href = `contact.html?tour=${encodeURIComponent(tour.id)}&people=${Number(people)}`;
    }
    $('#calculator-form').addEventListener('submit', event => { event.preventDefault(); calculate(); if (!core.validGroup($('#calc-people').value)) $('#calc-people').focus(); });
    $('#calc-tour').addEventListener('change', calculate);
    $('#calc-people').addEventListener('input', calculate);
    calculate();
  }
  if ($('#enquiry-form')) {
    const fields = ['name','email','tour','date','people','message'];
    const form = $('#enquiry-form');
    $('#enquiry-date').min = core.localDate();
    if (core.validGroup(params.get('people'))) $('#enquiry-people').value = params.get('people');
    form.addEventListener('input', () => { $('#enquiry-preview').hidden = true; $('#form-status').textContent = ''; });
    form.addEventListener('change', () => { $('#enquiry-preview').hidden = true; });
    form.addEventListener('submit', event => {
      event.preventDefault();
      $('#enquiry-date').min = core.localDate();
      const data = Object.fromEntries(fields.map(name => [name, $(`#enquiry-${name}`).value]));
      const errors = core.validateEnquiry(data, tours);
      fields.forEach(name => { $(`#error-${name}`).textContent = errors[name] || ''; $(`#enquiry-${name}`).setAttribute('aria-invalid', String(Boolean(errors[name]))); });
      const first = fields.find(name => errors[name]);
      if (first) { $('#enquiry-preview').hidden = true; $('#form-status').textContent = 'Please correct the marked fields. No enquiry has been prepared.'; $(`#enquiry-${first}`).focus(); return; }
      const tour = tours.find(item => item.id === data.tour);
      const text = core.draft(data, tour);
      $('#draft-text').value = text;
      $('#email-draft').href = `mailto:?subject=${encodeURIComponent('Tour enquiry: ' + tour.name)}&body=${encodeURIComponent(text)}`;
      $('#copy-status').textContent = '';
      $('#enquiry-preview').hidden = false;
      $('#form-status').textContent = 'Your draft is ready below. No message has been sent.';
      $('#draft-text').focus();
    });
    $('#copy-draft').addEventListener('click', async () => {
      const copied = await core.copyDraft($('#draft-text').value, navigator.clipboard);
      $('#copy-status').textContent = copied ? 'Enquiry copied. You can paste it into your chosen application.' : 'Automatic copying is unavailable. The draft is selected. Press Ctrl+C, or use your device’s Copy command.';
      if (!copied) { $('#draft-text').focus(); $('#draft-text').select(); }
    });
  }
  if ($('#gallery-list')) {
    fetch('assets/images/attribution.json').then(response => { if (!response.ok) throw new Error('Credits unavailable'); return response.json(); }).then(images => {
      $('#gallery-list').innerHTML = images.map((image, index) => `<figure class="journal-photo"><img src="assets/images/${escape(image.filename)}" alt="${escape(image.alt || image.caption)}" loading="lazy" width="${image.width || 1500}" height="${image.height || 1000}"><figcaption><span class="eyebrow">FRAME ${String(index + 1).padStart(2,'0')}</span><h2>${escape(image.title || image.filename)}</h2><p>${escape(image.caption)}</p></figcaption></figure>`).join('');
      $('#image-credits').innerHTML = images.map(image => `<article><h3>${escape(image.title || image.filename)}</h3><p>${escape(image.author)}. ${escape(image.display_date || 'Date not recorded')}. ${escape(image.changes || 'Resized for the website; layout crops may apply.')}<br><a href="${escape(image.source_url)}">Original source</a> · <a href="${escape(image.license_url)}">${escape(image.license_name)}</a></p></article>`).join('');
    }).catch(() => { $('#gallery-list').textContent = 'The photo journal could not load. Refresh the page or open ASSET_CREDITS.md in the source package for image credits.'; });
  }
})();
