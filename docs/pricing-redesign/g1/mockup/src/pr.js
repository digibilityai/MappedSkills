/* G1 REVIEW ARTIFACT: the proposed /pricing page needs no JavaScript. This file only handles the review flag
   ?banner=0, which hides the review banner. No analytics events. */
(function () {
  if (new URLSearchParams(location.search).get('banner') === '0') { var bn = document.querySelector('[data-banner]'); if (bn) bn.remove(); }
})();
