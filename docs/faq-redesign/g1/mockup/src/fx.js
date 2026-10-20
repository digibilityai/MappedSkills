/* G1 REVIEW ARTIFACT: progressive enhancement only, as the live FaqTools. The native <details> work with no JavaScript.
   1. "Open all answers" / "Close all answers": one button, label re-derived whenever a disclosure is toggled.
   2. A #q-… address (on load or hashchange) opens that question. Focus is never moved.
   Review flags: ?banner=0 hides the review banner and the "New" markers; ?open=all opens every answer. No analytics. */
(function () {
  var qs = new URLSearchParams(location.search);
  if (qs.get('banner') === '0') document.querySelectorAll('[data-banner], .fx-new').forEach(function (n) { n.remove(); });
  var items = [].slice.call(document.querySelectorAll('#fx-body details'));
  var btn = document.querySelector('.fx-all'), label = btn.querySelector('.fx-all-t'), pm = btn.querySelector('.fx-pm');
  var status = document.querySelector('[data-status]');
  btn.hidden = false;
  function allOpen() { return items.every(function (d) { return d.open; }); }
  function sync() { var o = allOpen(); label.textContent = o ? 'Close all answers' : 'Open all answers'; pm.classList.toggle('is-open', o); }
  btn.addEventListener('click', function () {
    var next = !allOpen();
    items.forEach(function (d) { d.open = next; });
    sync();
    status.textContent = next ? 'All ' + items.length + ' answers are open.' : 'All ' + items.length + ' answers are closed.';
  });
  function openFromHash() {
    var id = decodeURIComponent(location.hash.slice(1));
    if (id.indexOf('q-') !== 0) return;
    var el = document.getElementById(id);
    if (el && el.tagName === 'DETAILS') el.open = true;
  }
  document.addEventListener('toggle', sync, true);
  window.addEventListener('hashchange', openFromHash);
  if (qs.get('open') === 'all') items.forEach(function (d) { d.open = true; });
  openFromHash(); sync();
})();
