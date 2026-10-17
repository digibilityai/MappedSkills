/* G1 REVIEW ARTIFACT: one sequencer for every journey on the proposed /lead-generation page. Not production code.
   Based on the approved Conversion Optimization G1 sequencer, with the owner's Lead Generation rule from the annotated PDF
   (instruction 7): journey points auto-progress with a gap of 2 seconds (2000 ms). The 1.5 s CO/AI Search timing is NOT used.
   - The first step is on screen from the start (never a blank block). Once the block is in view, later steps follow every 2000 ms.
   - Plays ONCE and keeps the finished state. No loop, no Pause, Play or Replay, no live region, no focus movement.
   - Each numbered step in a [data-pick] block is a real <button>: choosing one stops the sequence and shows that step,
     with everything else in the block revealed.
   - Without JavaScript, or with reduced motion (OS setting or ?motion=reduce), every block is shown complete and nothing moves.
   - Leaving the screen or hiding the tab pauses a running sequence; it resumes on return.
   Review flags: ?motion=reduce static; ?step=N freezes every sequence at step N; ?banner=0 hides the review banner. */
(function () {
  var STEP_MS = 2000, DWELL_MS = 300;
  var q = new URLSearchParams(location.search);
  if (q.get('banner') === '0') { var cb = document.querySelector('[data-banner]'); if (cb) cb.remove(); }
  var reduce = q.get('motion') === 'reduce' || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  var frozen = parseInt(q.get('step'), 10);

  [].forEach.call(document.querySelectorAll('[data-seq]'), function (root) {
    var items = [].slice.call(root.querySelectorAll('[data-i]'));
    var figs = [].slice.call(root.querySelectorAll('[data-fig]'));
    var n = items.length, i = 0, timer = null, dwell = null, state = 'idle', inView = false;

    if (root.hasAttribute('data-pick')) {
      items.forEach(function (li, j) {
        var s = li.querySelector('.lx-n'); if (!s) return;
        var b = document.createElement('button');
        b.type = 'button'; b.className = s.className; b.textContent = s.textContent;
        b.setAttribute('aria-label', 'Show step ' + (j + 1) + ': ' + (li.getAttribute('data-label') || ''));
        b.addEventListener('click', function () { select(j); });
        s.parentNode.replaceChild(b, s);
      });
    }
    function paint(k) {
      items.forEach(function (li, j) {
        li.classList.toggle('is-seen', j <= k);
        li.classList.toggle('is-done', j < k);
        li.classList.toggle('is-on', j === k);
        var b = li.querySelector('button.lx-n');
        if (j === k) { li.setAttribute('aria-current', 'step'); if (b) b.setAttribute('aria-current', 'step'); }
        else { li.removeAttribute('aria-current'); if (b) b.removeAttribute('aria-current'); }
      });
      figs.forEach(function (f, j) { f.classList.toggle('is-on', j === Math.min(k, figs.length - 1)); });
      root.setAttribute('data-at', k);
      root.style.setProperty('--lx-p', n > 1 ? k / (n - 1) : 1);
    }
    function stop() { clearTimeout(timer); clearTimeout(dwell); timer = dwell = null; }
    function select(j) { stop(); state = 'manual'; root.classList.add('is-all'); i = j; paint(j); }
    function tick() { if (i < n - 1) { i++; paint(i); timer = setTimeout(tick, STEP_MS); } else { state = 'done'; timer = null; root.classList.add('is-complete'); } }
    function run() { state = 'running'; clearTimeout(timer); timer = setTimeout(tick, STEP_MS); }
    function pause() { clearTimeout(timer); timer = null; if (state === 'running') state = 'paused'; }

    if (reduce) { root.classList.add('is-static', 'is-all'); return; }
    root.classList.add('is-armed');
    if (frozen >= 1 && frozen <= n) { state = 'manual'; root.classList.add('is-frozen'); i = frozen - 1; paint(i); return; }
    paint(0);

    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        inView = e.isIntersecting && e.intersectionRect.height >= Math.min(e.boundingClientRect.height * 0.5, innerHeight * 0.4);
        clearTimeout(dwell);
        if (inView) dwell = setTimeout(function () { if (state === 'idle' || state === 'paused') run(); }, DWELL_MS);
        else if (state === 'running') pause();
      });
    }, { threshold: [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1] }).observe(root);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden && state === 'running') pause();
      else if (!document.hidden && inView && state === 'paused') run();
    });
  });
})();
