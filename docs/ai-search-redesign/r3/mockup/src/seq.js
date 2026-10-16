/* R3 REVIEW ARTIFACT: one sequencer for the journey, the industry example, the scenario and the reporting steps. Not production code.
   - Without JavaScript (or with ?motion=reduce / prefers-reduced-motion) every element is shown complete and nothing moves.
   - Otherwise it starts once the block has been in view for 400 ms, highlights one step at a time every 2000 ms, plays ONCE and stops on the
     last step, which stays highlighted. No loop, no toolbar, no live region, no focus movement; the active step carries aria-current="step".
   - Each numbered step is a real <button> (keyboard and touch). Choosing one, or an industry chip, stops the sequence immediately and shows
     that choice. Leaving the screen or hiding the tab pauses it; it resumes on return unless the visitor has chosen something.
   Review flags: ?motion=reduce static; ?step=N freezes every sequence at step N; ?ind=N picks the industry; ?banner=0 hides the consent banner. */
(function () {
  var STEP_MS = 2000, DWELL_MS = 400;
  var q = new URLSearchParams(location.search);
  if (q.get('banner') === '0') { var cb = document.querySelector('[data-consent]'); if (cb) cb.remove(); }
  var reduce = q.get('motion') === 'reduce' || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  var frozen = parseInt(q.get('step'), 10);

  [].forEach.call(document.querySelectorAll('[data-seq]'), function (root) {
    var panels = [].slice.call(root.querySelectorAll('[data-panel]'));
    var chipsWrap = root.querySelector('[data-chips]');
    var chips = chipsWrap ? [].slice.call(chipsWrap.querySelectorAll('[data-ind]')) : [];
    var cur = Math.min(Math.max(parseInt(q.get('ind'), 10) || 0, 0), Math.max(panels.length - 1, 0));
    function items() { return [].slice.call((panels.length ? panels[cur] : root).querySelectorAll('[data-i]')); }
    var n = items().length, i = -1, timer = null, dwell = null, state = 'idle', inView = false;

    /* numbered steps become real buttons */
    if (root.hasAttribute('data-pick')) {
      items().forEach(function (li, j) {
        var s = li.querySelector('.ax-st-n'); if (!s) return;
        var b = document.createElement('button');
        b.type = 'button'; b.className = s.className; b.textContent = s.textContent;
        b.setAttribute('aria-label', li.getAttribute('data-label') || ('Step ' + (j + 1)));
        b.addEventListener('click', function () { select(j); });
        s.parentNode.replaceChild(b, s);
      });
    }
    function paint(k) {
      items().forEach(function (li, j) {
        li.classList.toggle('is-seen', j <= k);
        li.classList.toggle('is-done', j < k);
        li.classList.toggle('is-on', j === k);
        if (j === k) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
        var b = li.querySelector('button.ax-st-n'); if (b) { if (j === k) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current'); }
      });
      root.style.setProperty('--ax-p', n > 1 ? Math.max(0, k) / (n - 1) * 100 : 100);
    }
    function stop() { clearTimeout(timer); clearTimeout(dwell); timer = dwell = null; }
    function select(j) { stop(); state = 'manual'; root.classList.add('is-all'); i = j; paint(j); }
    function tick() {
      if (i < n - 1) { i++; paint(i); timer = setTimeout(tick, STEP_MS); } else { state = 'done'; timer = null; }
    }
    function run() { state = 'running'; clearTimeout(timer); if (i < 0) tick(); else timer = setTimeout(tick, STEP_MS); }
    function pause() { clearTimeout(timer); timer = null; if (state === 'running') state = 'paused'; }
    function showPanel() { panels.forEach(function (p, j) { p.hidden = j !== cur; }); chips.forEach(function (c, j) { c.setAttribute('aria-pressed', j === cur ? 'true' : 'false'); }); }

    root.classList.add('is-armed');
    if (panels.length) showPanel();
    if (chipsWrap) {
      chipsWrap.hidden = false;
      chips.forEach(function (c, j) { c.addEventListener('click', function () { stop(); state = 'manual'; cur = j; showPanel(); root.classList.add('is-all'); i = n - 1; paint(n - 1); }); });
    }
    if (reduce) root.classList.add('is-static', 'is-all');
    if (frozen >= 1 && frozen <= n) { state = 'manual'; i = frozen - 1; paint(i); return; }
    if (reduce) return;
    paint(-1);

    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        inView = e.intersectionRect.height >= Math.min(e.boundingClientRect.height * 0.4, innerHeight * 0.45);
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
