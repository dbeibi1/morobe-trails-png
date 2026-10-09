/* Shared validation and calculation rules, independent of the page layout. */
(function (root) {
  'use strict';
  function localDate(date = new Date()) {
    return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
  }
  function validDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const [y, m, d] = value.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return y >= 1000 && date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
  }
  function validGroup(value) {
    return String(value).trim() !== '' && Number.isInteger(Number(value)) && Number(value) >= 1 && Number(value) <= 20;
  }
  function estimate(tour, people) {
    if (!tour || !validGroup(people)) throw new Error('Choose a tour and a whole-number group size from 1 to 20.');
    return tour.price * Number(people);
  }
  function kina(amount) { return 'K' + Number(amount).toLocaleString('en-PG'); }
  function validateEnquiry(data, tours, today = localDate()) {
    const errors = {};
    if (!data.name.trim() || data.name.trim().length > 80) errors.name = 'Enter your full name, up to 80 characters.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()) || data.email.length > 254) errors.email = 'Enter a valid email address.';
    if (!tours.some(tour => tour.id === data.tour)) errors.tour = 'Choose a tour from the list.';
    if (!validDate(data.date) || data.date < today) errors.date = 'Choose today or a future date.';
    if (!validGroup(data.people)) errors.people = 'Enter a whole number from 1 to 20.';
    if (data.message.length > 1500) errors.message = 'Keep your message within 1500 characters.';
    return errors;
  }
  function draft(data, tour) {
    return ['TOUR ENQUIRY', '', 'Name: ' + data.name.trim(), 'Email: ' + data.email.trim(), 'Tour: ' + tour.name,
      'Preferred date: ' + data.date, 'Group size: ' + Number(data.people),
      'Sample price per person: ' + kina(tour.price), 'Estimated group total: ' + kina(estimate(tour, data.people)), '',
      'Message: ' + (data.message.trim() || 'No additional message.'), '',
      'This is a draft for an imaginary company. Sample estimate only. No message has been sent and no booking is confirmed.'].join('\n');
  }
  async function copyDraft(text, clipboard) {
    if (!clipboard || typeof clipboard.writeText !== 'function') return false;
    try { await clipboard.writeText(text); return true; } catch (_) { return false; }
  }
  root.MorobeCore = Object.freeze({ localDate, validDate, validGroup, estimate, kina, validateEnquiry, draft, copyDraft });
})(typeof window !== 'undefined' ? window : globalThis);
