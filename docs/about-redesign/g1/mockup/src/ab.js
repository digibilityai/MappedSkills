/* G1 R1 REVIEW ARTIFACT: the proposed /about page needs no JavaScript (R1 removed the figure toggle; the comparison
   is still). This file only handles the review flag ?banner=0, which hides the review banner. No analytics events. */
(function () {
  if (new URLSearchParams(location.search).get('banner') === '0') { var bn = document.querySelector('[data-banner]'); if (bn) bn.remove(); }
})();
