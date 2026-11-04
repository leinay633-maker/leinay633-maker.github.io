// 讲解片网页原片的播放器。画面由片子自己的 GSAP 时间线画，这里每一帧都按音轨的 currentTime 跳到对应时刻，
// 所以拖动、卡顿以后音画也不会错开。片子原本靠 HyperFrames 运行时按 data-start / data-duration 显示各段，
// 网页上没有那个运行时，由 render() 把时间窗外的段落 display:none。
(() => {
  'use strict';
  window.__timelines = window.__timelines || {};
  const root = document.getElementById('root');
  const audio = document.getElementById('mix');
  const FILM = window.FILM || { chapters: [] };
  const D = window.TIMING.duration;
  const chapters = FILM.chapters || [];
  const clips = [...root.querySelectorAll('.clip[data-start]')].map((el) => ({
    el,
    t0: +el.dataset.start,
    t1: +el.dataset.start + +el.dataset.duration,
    on: true,
  }));
  const params = new URLSearchParams(location.search);
  let tl = null;
  let cur = 0;
  let dragging = false;
  let started = false;

  // 等比缩放、居中
  function fit() {
    const s = Math.min(innerWidth / 1920, innerHeight / 1080);
    root.style.transform = `translate(${(innerWidth - 1920 * s) / 2}px, ${(innerHeight - 1080 * s) / 2}px) scale(${s})`;
  }
  addEventListener('resize', fit);
  fit();

  // 控件
  const fmt = (s) => {
    s = Math.max(0, Math.floor(s));
    return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  };
  const chapterAt = (t) => {
    let c = chapters[0];
    for (const x of chapters) if (x.t <= t + 0.01) c = x;
    return c;
  };
  const ui = document.createElement('div');
  ui.className = 'fp-ui';
  ui.innerHTML = `
    <div class="fp-bar" role="slider" tabindex="0" aria-label="播放进度" aria-valuemin="0" aria-valuemax="${Math.round(D)}">
      <div class="fp-track"></div><div class="fp-buf"></div><div class="fp-fill"></div>
      ${chapters.slice(1).map((c) => `<div class="fp-tick" style="left:${(c.t / D) * 100}%"></div>`).join('')}
      <div class="fp-knob"></div><div class="fp-pop" hidden></div>
    </div>
    <div class="fp-row">
      <button class="fp-btn fp-play" type="button">播放</button>
      <span class="fp-time">0:00 / ${fmt(D)}</span>
      <span class="fp-chap"></span>
      <button class="fp-btn fp-cap" type="button" aria-pressed="true" title="字幕（C）">字幕</button>
      <button class="fp-btn fp-full" type="button" title="全屏（F）">全屏</button>
    </div>`;
  document.body.append(ui);
  const big = document.createElement('button');
  big.className = 'fp-big';
  big.type = 'button';
  big.textContent = '播放';
  big.hidden = true;
  const wait = document.createElement('div');
  wait.className = 'fp-wait';
  wait.textContent = '加载中…';
  document.body.append(big, wait);

  const $ = (s) => ui.querySelector(s);
  const bar = $('.fp-bar'), fill = $('.fp-fill'), buf = $('.fp-buf'), knob = $('.fp-knob'), pop = $('.fp-pop');
  const playBtn = $('.fp-play'), timeEl = $('.fp-time'), chapEl = $('.fp-chap'), capBtn = $('.fp-cap'), fullBtn = $('.fp-full');
  if (!document.fullscreenEnabled) fullBtn.hidden = true;

  function paint() {
    const p = (cur / D) * 100;
    fill.style.width = p + '%';
    knob.style.left = p + '%';
    timeEl.textContent = `${fmt(cur)} / ${fmt(D)}`;
    const c = chapterAt(cur);
    if (c && chapEl.textContent !== c.title) chapEl.textContent = c.title;
    playBtn.textContent = audio.paused ? '播放' : '暂停';
    bar.setAttribute('aria-valuenow', Math.round(cur));
    if (audio.buffered.length) buf.style.width = (audio.buffered.end(audio.buffered.length - 1) / D) * 100 + '%';
  }

  function render(t) {
    cur = Math.max(0, Math.min(D - 0.001, t));
    for (const c of clips) {
      const on = cur >= c.t0 && cur < c.t1;
      if (on !== c.on) {
        c.on = on;
        c.el.style.display = on ? '' : 'none';
      }
    }
    if (tl) tl.time(cur, false);
    paint();
  }

  function loop() {
    if (!audio.paused && !dragging) render(audio.currentTime);
    requestAnimationFrame(loop);
  }

  async function play() {
    if (!tl) return;
    if (cur >= D - 0.1) render(0);
    if (Math.abs(audio.currentTime - cur) > 0.2) audio.currentTime = cur;
    started = true;
    try {
      await audio.play();
      big.hidden = true;
    } catch (e) {
      big.hidden = false;
    }
    paint();
    poke();
  }
  function pause() {
    audio.pause();
    paint();
    poke();
  }
  const toggle = () => (audio.paused ? play() : pause());
  function seek(t, commit) {
    render(t);
    if (commit !== false) {
      try { audio.currentTime = cur; } catch (e) {}
    }
  }

  // 控件闲置三秒后淡出
  let idle = 0;
  function poke() {
    document.body.classList.remove('fp-idle');
    clearTimeout(idle);
    if (!audio.paused) idle = setTimeout(() => document.body.classList.add('fp-idle'), 3000);
  }
  addEventListener('pointermove', poke);
  addEventListener('pointerdown', poke);

  // 进度条：拖动时只画面跟着走，松手再让音轨跳过去
  const posToT = (e) => {
    const r = bar.getBoundingClientRect();
    return Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * D;
  };
  bar.addEventListener('pointerdown', (e) => {
    dragging = true;
    bar.classList.add('drag');
    bar.setPointerCapture(e.pointerId);
    seek(posToT(e), false);
  });
  bar.addEventListener('pointermove', (e) => {
    const t = posToT(e);
    const c = chapterAt(t);
    pop.hidden = false;
    pop.textContent = fmt(t) + (c ? '　' + c.title : '');
    const r = bar.getBoundingClientRect();
    const w = pop.offsetWidth / 2;
    pop.style.left = Math.max(w, Math.min(r.width - w, e.clientX - r.left)) + 'px';
    if (dragging) seek(t, false);
  });
  const endDrag = (e) => {
    if (!dragging) return;
    dragging = false;
    bar.classList.remove('drag');
    seek(posToT(e));
  };
  bar.addEventListener('pointerup', endDrag);
  bar.addEventListener('pointercancel', endDrag);
  bar.addEventListener('pointerleave', () => { if (!dragging) pop.hidden = true; });
  bar.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      seek(cur + (e.key === 'ArrowLeft' ? -5 : 5));
    }
  });

  playBtn.addEventListener('click', toggle);
  big.addEventListener('click', play);
  capBtn.addEventListener('click', () => {
    const off = root.classList.toggle('nocap');
    capBtn.setAttribute('aria-pressed', String(!off));
  });
  fullBtn.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen().catch(() => {});
  });
  // 点画面本身也能暂停、继续
  root.addEventListener('click', toggle);
  addEventListener('keydown', (e) => {
    if (e.target.closest && e.target.closest('button') && (e.key === ' ' || e.key === 'Enter')) return;
    if (e.key === ' ' || e.key === 'k') { e.preventDefault(); toggle(); }
    else if (e.key === 'ArrowLeft') seek(cur - 5);
    else if (e.key === 'ArrowRight') seek(cur + 5);
    else if (e.key === 'c') capBtn.click();
    else if (e.key === 'f') fullBtn.click();
  });

  audio.addEventListener('waiting', () => { if (started) wait.hidden = false; });
  audio.addEventListener('playing', () => { wait.hidden = true; });
  audio.addEventListener('pause', paint);
  audio.addEventListener('progress', paint);
  audio.addEventListener('ended', () => {
    render(D);
    big.textContent = '重播';
    big.hidden = false;
    paint();
    poke();
  });

  function onReady() {
    tl = window.__timelines.main;
    wait.hidden = true;
    const t0 = parseFloat(params.get('t')) || 0;
    render(t0);
    requestAnimationFrame(loop);
    if (params.get('autoplay') === '1') play();
    else big.hidden = false;
    window.__filmReady = true;
  }
  // GSAP 时间线自带 then（播完才 resolve），buildFilm() 的 Promise 会跟着等一条暂停的时间线，永远不 resolve。
  // 所以不等它的返回值，改成看 __timelines.main 什么时候注册上。
  window.buildFilm().catch((err) => {
    const box = document.getElementById('err');
    box.textContent = 'build error: ' + (err && err.stack ? err.stack : err);
    box.style.display = 'block';
    wait.hidden = true;
    console.error(err);
  });
  (function waitTimeline() {
    if (window.__timelines.main) onReady();
    else requestAnimationFrame(waitTimeline);
  })();

  // 截图核对用：?t= 指定起始时刻；window.__seek(t) 直接跳帧
  window.__seek = (t) => render(t);
})();
