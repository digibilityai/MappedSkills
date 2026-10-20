/* G1 review flags only (no analytics, nothing the page needs): ?banner=0 hides the review banner; ?empty=1 shows the empty state. */
(function () {
  var qs = new URLSearchParams(location.search);
  if (qs.get('banner') === '0') document.querySelectorAll('[data-banner]').forEach(function (n) { n.remove(); });
  if (qs.get('empty') === '1') { document.querySelector('[data-list]').remove();
    var l = document.querySelector('.bl-lede'); if (l) l.textContent = 'Nothing is published here yet.'; }
})();
