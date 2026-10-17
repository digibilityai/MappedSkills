/* G1 REVIEW ARTIFACT: behaviour for the proposed /how-it-works page. Not production code.
   1. One sequencer for every [data-seq] block, mirroring the shared production useSequence rules
      (components/cplus/ai-seo/Sequence.tsx, used unchanged by /ai-seo, /conversion-optimization and /lead-generation):
      - step 1 is on screen from the start (never a blank block); once the block has been in view for DWELL_MS, later
        steps follow every STEP_MS (1.5 s, HW-D07: the /ai-seo and /conversion-optimization timing);
      - plays ONCE and keeps the finished state; no loop, no Pause, Play or Replay, no live region, no focus movement;
      - in a [data-pick] block each number becomes a real <button>: choosing one stops the sequence and shows that step;
      - [data-from="k"] elements inside a block appear once step k is reached (the working sheet filling in);
      - without JavaScript, or with reduced motion (OS setting or ?motion=reduce), every block is shown complete;
      - leaving the screen or hiding the tab pauses a running sequence; it resumes on return.
   2. The priority sort (the live PrioritySort behaviour): one aria-pressed toggle, a polite status line, focus stays on
      the button, cards glide once (FLIP, Web Animations) and simply appear under reduced motion. Without JavaScript the
      sorted groups are the page and the toggle stays hidden.
   Review flags: ?motion=reduce static; ?step=N freezes every sequence at step N; ?banner=0 hides the review banner;
   ?sorted=1 opens the priority sort sorted. */
(function () {
  var STEP_MS = 1500, DWELL_MS = 300;
  var q = new URLSearchParams(location.search);
  if (q.get('banner') === '0') { var cb = document.querySelector('[data-banner]'); if (cb) cb.remove(); }
  var reduce = q.get('motion') === 'reduce' || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  var frozen = parseInt(q.get('step'), 10);

  [].forEach.call(document.querySelectorAll('[data-seq]'), function (root) {
    var items = [].slice.call(root.querySelectorAll('[data-i]'));
    var froms = [].slice.call(root.querySelectorAll('[data-from]'));
    var n = items.length, i = 0, timer = null, dwell = null, state = 'idle', inView = false;

    if (root.hasAttribute('data-pick')) {
      items.forEach(function (li, j) {
        var s = li.querySelector('.hx-n'); if (!s) return;
        var b = document.createElement('button');
        b.type = 'button'; b.className = s.className; b.innerHTML = s.innerHTML;
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
        var b = li.querySelector('button.hx-n');
        if (j === k) { li.setAttribute('aria-current', 'step'); if (b) b.setAttribute('aria-current', 'step'); }
        else { li.removeAttribute('aria-current'); if (b) b.removeAttribute('aria-current'); }
      });
      froms.forEach(function (f) { f.classList.toggle('is-shown', +f.getAttribute('data-from') <= k); });
      root.setAttribute('data-at', k);
      root.style.setProperty('--hx-p', n > 1 ? k / (n - 1) : 1);
    }
    function stop() { clearTimeout(timer); clearTimeout(dwell); timer = dwell = null; }
    function select(j) { stop(); state = 'manual'; i = j; paint(j); froms.forEach(function (f) { f.classList.toggle('is-shown', +f.getAttribute('data-from') <= j); }); }
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

  /* ---- priority sort ---- */
  [].forEach.call(document.querySelectorAll('[data-ps]'), function (ps) {
    var btn = ps.querySelector('.hx-ps-btn'), pile = ps.querySelector('[data-ps-pile]'), hint = ps.querySelector('[data-ps-hint]');
    var status = ps.querySelector('[data-ps-status]');
    var lanes = {}; [].forEach.call(ps.querySelectorAll('[data-lane]'), function (ul) { lanes[ul.getAttribute('data-lane')] = ul; });
    var cards = [].slice.call(ps.querySelectorAll('.hx-pc')).sort(function (a, b) { return a.getAttribute('data-o') - b.getAttribute('data-o'); });
    cards.forEach(function (c) { c.setAttribute('data-home', c.parentNode.getAttribute('data-lane')); });
    var sorted = false;
    function place(toSorted) {
      if (toSorted) cards.forEach(function (c) { lanes[c.getAttribute('data-home')].appendChild(c); });
      else cards.forEach(function (c) { pile.appendChild(c); });
      ps.setAttribute('data-sorted', String(toSorted));
      btn.setAttribute('aria-pressed', String(toSorted));
      hint.hidden = toSorted;
    }
    function press() {
      var before = new Map(); cards.forEach(function (c) { before.set(c, c.getBoundingClientRect()); });
      sorted = !sorted; place(sorted);
      status.textContent = sorted ? 'Sorted into three groups: fix first, later, and not worth doing.' : 'Showing the findings in the order they were found.';
      if (reduce) return;
      cards.forEach(function (c, k) {
        var a = before.get(c), b = c.getBoundingClientRect();
        var dx = a.left - b.left, dy = a.top - b.top;
        if ((Math.abs(dx) < 1 && Math.abs(dy) < 1) || typeof c.animate !== 'function') return;
        c.animate([{ transform: 'translate(' + dx + 'px,' + dy + 'px)' }, { transform: 'none' }], { duration: 560, delay: k * 35, easing: 'cubic-bezier(.2,.75,.2,1)', fill: 'backwards' });
      });
    }
    btn.hidden = false;
    btn.addEventListener('click', press);
    place(false);
    if (q.get('sorted') === '1') { sorted = true; place(true); }
  });
})();
