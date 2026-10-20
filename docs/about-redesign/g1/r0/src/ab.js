/* G1 REVIEW ARTIFACT: behaviour for the proposed /about page. Not production code. No analytics events.
   The one-line figure ([data-fig]):
   - without JavaScript both views are shown, one under the other, and the button stays hidden;
   - with JavaScript, view 1 (split) is shown; ONE button, whose label names the other view, switches it; focus stays on
     the button; a polite status line names the view now shown; no automatic change, nothing on load;
   - after a press the newly shown view settles in once (the line draws in 400 ms); under reduced motion (OS setting or
     ?motion=reduce) the switch is instant.
   Review flags: ?view=b opens on view 2; ?motion=reduce; ?banner=0 hides the review banner. */
(function () {
  var q = new URLSearchParams(location.search);
  if (q.get('banner') === '0') { var bn = document.querySelector('[data-banner]'); if (bn) bn.remove(); }
  var reduce = q.get('motion') === 'reduce' || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  if (q.get('motion') === 'reduce') document.documentElement.classList.add('ax-reduce');

  var fig = document.querySelector('[data-fig]');
  if (!fig) return;
  var a = fig.querySelector('[data-state="a"]'), b = fig.querySelector('[data-state="b"]');
  var tog = fig.querySelector('[data-tog]'), t = fig.querySelector('[data-tog-t]'), n = fig.querySelector('[data-fig-n]');
  var icJoin = fig.querySelector('[data-ico-join]'), icSplit = fig.querySelector('[data-ico-split]');
  var view = q.get('view') === 'b' ? 'b' : 'a';

  function show(v, animate) {
    view = v;
    a.classList.toggle('is-off', v !== 'a');
    b.classList.toggle('is-off', v !== 'b');
    var on = v === 'a' ? a : b;
    [a, b].forEach(function (s) { s.classList.remove('is-entering'); });
    if (animate && !reduce) { void on.offsetWidth; on.classList.add('is-entering'); }
    t.textContent = v === 'a' ? 'Join it into one line' : 'Show it split again';
    icJoin.hidden = v !== 'a'; icSplit.hidden = v === 'a';
    n.textContent = v === 'a' ? 'View 1 of 2: split across suppliers' : 'View 2 of 2: one line';
  }
  fig.classList.add('is-ready');
  tog.hidden = false;
  show(view, false);
  tog.addEventListener('click', function () { show(view === 'a' ? 'b' : 'a', true); });
})();
