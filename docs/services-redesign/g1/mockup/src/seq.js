/* G1 REVIEW ARTIFACT: behaviour for the proposed /services page. Not production code. No analytics events.
   1. One sequencer for [data-seq] blocks, following the shared production rules (components/cplus/ai-seo/Sequence.tsx,
      as used on /ai-seo, /conversion-optimization and /how-it-works):
      - step 1 is on screen from the start; once the block has been in view for DWELL_MS, later steps follow every
        STEP_MS (1.5 s); plays ONCE and keeps the finished state; no loop, no Pause/Play/Replay, no focus movement;
      - in a [data-pick] block each number becomes a real <button>: choosing one stops the sequence and shows that step;
      - without JavaScript, or with reduced motion (OS setting or ?motion=reduce), the block is shown complete;
      - leaving the screen or hiding the tab pauses a running sequence; it resumes on return.
   2. The problem selector ([data-sel]): hidden without JavaScript (the grouped services are the page). Three aria-pressed
      buttons, single choice, press again to clear. The chosen group is marked "Start here"; nothing is hidden or dimmed.
      A status line names the starting point and links to it.
   Review flags: ?motion=reduce static; ?step=N freezes the sequence at step N; ?pick=cap|cv|ms preselects a problem;
   ?banner=0 hides the review banner. */
(function () {
  var STEP_MS = 1500, DWELL_MS = 300;
  var q = new URLSearchParams(location.search);
  if (q.get('banner') === '0') { var bn = document.querySelector('[data-banner]'); if (bn) bn.remove(); }
  var reduce = q.get('motion') === 'reduce' || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  var frozen = parseInt(q.get('step'), 10);

  [].forEach.call(document.querySelectorAll('[data-seq]'), function (root) {
    var items = [].slice.call(root.querySelectorAll('[data-i]'));
    var n = items.length, i = 0, timer = null, dwell = null, state = 'idle', inView = false;

    if (root.hasAttribute('data-pick')) {
      items.forEach(function (li, j) {
        var s = li.querySelector('.sx-n'); if (!s) return;
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
        var b = li.querySelector('button.sx-n');
        if (j === k) { li.setAttribute('aria-current', 'step'); if (b) b.setAttribute('aria-current', 'step'); }
        else { li.removeAttribute('aria-current'); if (b) b.removeAttribute('aria-current'); }
      });
      root.setAttribute('data-at', k);
      root.style.setProperty('--sx-p', n > 1 ? k / (n - 1) : 1);
    }
    function stop() { clearTimeout(timer); clearTimeout(dwell); timer = dwell = null; }
    function select(j) { stop(); state = 'manual'; i = j; paint(j); }
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

  /* ---- problem selector ---- */
  var OUT = {
    cap: { id: 'sx-g-cap', name: 'Get found', rest: ': four services, just below.' },
    cv: { id: 'sx-g-cv', name: 'Get enquiries', rest: ': two services, just below.' },
    ms: { id: 'sx-g-ms', name: 'See what’s working', rest: '. It’s part of every service.' }
  };
  [].forEach.call(document.querySelectorAll('[data-sel]'), function (sel) {
    var btns = [].slice.call(sel.querySelectorAll('.sx-opt'));
    var out = sel.querySelector('[data-sel-out]');
    var groups = {}; [].forEach.call(document.querySelectorAll('[data-g]'), function (g) { groups[g.getAttribute('data-g')] = g; });
    function choose(key) {
      btns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-for') === key)); });
      Object.keys(groups).forEach(function (k) { groups[k].classList.toggle('is-pick', k === key); });
      out.textContent = '';
      if (!key) return;
      var o = OUT[key], a = document.createElement('a');
      a.href = '#' + o.id; a.textContent = o.name;
      out.appendChild(document.createTextNode('Start with '));
      out.appendChild(a);
      out.appendChild(document.createTextNode(o.rest));
    }
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.getAttribute('data-for');
        choose(b.getAttribute('aria-pressed') === 'true' ? null : k);
      });
    });
    sel.hidden = false;
    var pre = q.get('pick'); if (OUT[pre]) choose(pre);
  });
})();
