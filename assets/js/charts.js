// 讲解页的图表。按容器的实际像素宽度画 SVG，窗口宽度变了就重画，所以手机上字号不会被缩小。
// 颜色都走 explainer.css 里的变量（f1/f2/f3/fdim、s1/s2/s3/sdim），深色模式自动跟着换。
(function () {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';

  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function txt(parent, x, y, s, cls, anchor) {
    const t = el('text', { x: x, y: y, class: cls, 'text-anchor': anchor || 'start' }, parent);
    t.textContent = s;
    return t;
  }
  const minus = (s) => String(s).replace(/-/g, '−');
  const sgn = (v, d) => (v >= 0 ? '+' : '−') + Math.abs(v).toFixed(d);
  const fixed = (d) => (v) => minus(v.toFixed(d));

  // 提示框：整页共用一个
  let tip;
  function getTip() {
    if (!tip) {
      tip = document.createElement('div');
      tip.className = 'cx-tip';
      tip.hidden = true;
      document.body.appendChild(tip);
    }
    return tip;
  }
  function moveTip(e) {
    const t = getTip();
    const pad = 14;
    const r = t.getBoundingClientRect();
    let x = e.clientX + pad;
    let y = e.clientY + pad;
    if (x + r.width > innerWidth - 8) x = e.clientX - r.width - pad;
    if (y + r.height > innerHeight - 8) y = e.clientY - r.height - pad;
    t.style.left = Math.max(8, x) + 'px';
    t.style.top = Math.max(8, y) + 'px';
  }
  function hover(target, html, washEl) {
    const show = (e) => {
      const t = getTip();
      t.innerHTML = typeof html === 'function' ? html(e) : html;
      t.hidden = false;
      moveTip(e);
      if (washEl) washEl.classList.add('hot');
    };
    target.addEventListener('pointerenter', show);
    target.addEventListener('pointermove', (e) => {
      if (typeof html === 'function') getTip().innerHTML = html(e);
      moveTip(e);
    });
    target.addEventListener('pointerleave', () => {
      getTip().hidden = true;
      if (washEl) washEl.classList.remove('hot');
    });
  }
  // 手机上点空白处收起提示框
  document.addEventListener('pointerdown', (e) => {
    if (tip && !e.target.closest('.cx-chart')) tip.hidden = true;
  });

  // 柱子只把远离基线的一端做成圆角
  function hBarPath(xa, xb, y, h, r) {
    const len = Math.abs(xb - xa);
    r = Math.min(r, len, h / 2);
    const y0 = y - h / 2, y1 = y + h / 2;
    if (xb >= xa) return `M${xa},${y0}H${xb - r}Q${xb},${y0} ${xb},${y0 + r}V${y1 - r}Q${xb},${y1} ${xb - r},${y1}H${xa}Z`;
    return `M${xa},${y0}H${xb + r}Q${xb},${y0} ${xb},${y0 + r}V${y1 - r}Q${xb},${y1} ${xb + r},${y1}H${xa}Z`;
  }
  function vBarPath(x, w, yb, yt, r) {
    const len = Math.abs(yb - yt);
    r = Math.min(r, len, w / 2);
    if (yt <= yb) return `M${x},${yb}V${yt + r}Q${x},${yt} ${x + r},${yt}H${x + w - r}Q${x + w},${yt} ${x + w},${yt + r}V${yb}Z`;
    return `M${x},${yb}V${yt - r}Q${x},${yt} ${x + r},${yt}H${x + w - r}Q${x + w},${yt} ${x + w},${yt - r}V${yb}Z`;
  }

  function mount(id, draw) {
    const host = typeof id === 'string' ? document.getElementById(id) : id;
    if (!host) return;
    host.classList.add('cx-chart');
    let lastW = 0;
    const render = () => {
      const w = Math.round(host.clientWidth);
      if (!w || w === lastW) return;
      lastW = w;
      host.textContent = '';
      draw(host, w, w < 560);
    };
    render();
    if ('ResizeObserver' in window) {
      let raf = 0;
      new ResizeObserver(() => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(render);
      }).observe(host);
    } else {
      addEventListener('resize', render);
    }
  }
  function svgFor(host, W, H, aria) {
    return el('svg', { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: 'img', 'aria-label': aria || '' }, host);
  }
  const linear = (d0, d1, r0, r1) => (v) => r0 + ((v - d0) / (d1 - d0)) * (r1 - r0);

  // 哑铃图：每行一个对象，两个点是同一对象在两种条件下的值
  // o: rows[{name,a,b}], names[两种条件], short[首行点上的短标注], domain, ticks, tickFmt, valFmt
  function dumbbell(id, o) {
    mount(id, (host, W, compact) => {
      const L = compact ? 78 : 100, R = 18, T = 44, rh = compact ? 30 : 34;
      const H = T + o.rows.length * rh + 6;
      const svg = svgFor(host, W, H, o.aria);
      const X = linear(o.domain[0], o.domain[1], L, W - R);
      const tf = o.tickFmt || fixed(2), vf = o.valFmt || fixed(4);
      o.ticks.forEach((t) => {
        el('line', { x1: X(t), x2: X(t), y1: T - 6, y2: H - 6, class: 'cx-grid' }, svg);
        txt(svg, X(t), 12, tf(t), 'cx-tick', 'middle');
      });
      o.rows.forEach((r, i) => {
        const y = T + i * rh + rh / 2;
        const wash = el('rect', { x: 0, y: y - rh / 2, width: W, height: rh, rx: 6, class: 'cx-wash' }, svg);
        txt(svg, L - 12, y + 4, r.name, r.strong ? 'cx-lbl strong' : 'cx-lbl', 'end');
        el('line', { x1: X(r.a), x2: X(r.b), y1: y, y2: y, class: 'cx-link' }, svg);
        el('circle', { cx: X(r.b), cy: y, r: 5.5, class: 'cx-dot f2' }, svg);
        el('circle', { cx: X(r.a), cy: y, r: 5.5, class: 'cx-dot f1' }, svg);
        if (i === 0 && o.short) {
          txt(svg, X(r.a), y - 12, o.short[0], 'cx-ann', 'middle');
          txt(svg, X(r.b), y - 12, o.short[1], 'cx-ann', 'middle');
        }
        const hit = el('rect', { x: 0, y: y - rh / 2, width: W, height: rh, class: 'cx-hit' }, svg);
        hover(hit, `<b>${r.name}</b><br>${o.names[0]} ${vf(r.a)}<br>${o.names[1]} ${vf(r.b)}<br>差 ${sgn(r.b - r.a, 4)}`, wash);
      });
    });
  }

  // 横向条：可正可负；sides 是零线左右的说明，ref 是一条虚线参考线
  // o: rows[{name,v,cls,strong,tip}], domain, ticks, tickFmt, valFmt, sides, ref{v,label}, left
  function hbars(id, o) {
    mount(id, (host, W, compact) => {
      const L = o.left || (compact ? 76 : 92), R = o.right || 54;
      const T = o.sides ? 42 : 26, rh = o.rh || 32, bh = 14;
      const B = o.ref ? 24 : 6;
      const H = T + o.rows.length * rh + B;
      const svg = svgFor(host, W, H, o.aria);
      const X = linear(o.domain[0], o.domain[1], L, W - R);
      const tf = o.tickFmt || fixed(2), vf = o.valFmt || fixed(3);
      const yEnd = T + o.rows.length * rh;
      o.ticks.forEach((t) => {
        el('line', { x1: X(t), x2: X(t), y1: T - 6, y2: yEnd, class: 'cx-grid' }, svg);
        txt(svg, X(t), 12, tf(t), 'cx-tick', 'middle');
      });
      if (o.sides) {
        txt(svg, X(0) - 6, T - 12, o.sides[0], 'cx-ann', 'end');
        txt(svg, X(0) + 6, T - 12, o.sides[1], 'cx-ann', 'start');
      }
      o.rows.forEach((r, i) => {
        const y = T + i * rh + rh / 2;
        const wash = el('rect', { x: 0, y: y - rh / 2, width: W, height: rh, rx: 6, class: 'cx-wash' }, svg);
        txt(svg, L - 10, y + 4, r.name, r.strong ? 'cx-lbl strong' : 'cx-lbl', 'end');
        el('path', { d: hBarPath(X(0), X(r.v), y, bh, 4), class: r.cls || 'f1' }, svg);
        const lab = r.label || vf(r.v);
        if (r.v >= 0) txt(svg, X(r.v) + 6, y + 4, lab, 'cx-val', 'start');
        else txt(svg, X(0) + 6, y + 4, lab, 'cx-val', 'start');
        const hit = el('rect', { x: 0, y: y - rh / 2, width: W, height: rh, class: 'cx-hit' }, svg);
        hover(hit, r.tip || `<b>${r.name}</b><br>${lab}`, wash);
      });
      el('line', { x1: X(0), x2: X(0), y1: T - 6, y2: yEnd, class: 'cx-base' }, svg);
      if (o.ref) {
        el('line', { x1: X(o.ref.v), x2: X(o.ref.v), y1: T - 6, y2: yEnd + 4, class: 'cx-ref' }, svg);
        txt(svg, X(o.ref.v), H - 4, o.ref.label, 'cx-ann', 'middle');
      }
    });
  }

  // 分组竖条：groups 是横轴上的组，series 是每组里并排的几根
  // o: groups[], series[{name,cls,vals}], max, ticks, tickFmt, valFmt, labelGroups[], height
  function vgroups(id, o) {
    mount(id, (host, W, compact) => {
      const H = o.height || (compact ? 230 : 270);
      const L = 46, R = 10, T = 22, B = 34;
      const svg = svgFor(host, W, H, o.aria);
      const Y = linear(o.min || 0, o.max, H - B, T);
      const vf = o.valFmt || fixed(2);
      o.ticks.forEach((t) => {
        el('line', { x1: L, x2: W - R, y1: Y(t), y2: Y(t), class: t === (o.min || 0) ? 'cx-base' : 'cx-grid' }, svg);
        txt(svg, L - 8, Y(t) + 4, o.tickFmt(t), 'cx-tick', 'end');
      });
      const bw = (W - L - R) / o.groups.length, gap = 2;
      const w = Math.max(8, Math.min(30, (bw - 14) / o.series.length - gap));
      const total = o.series.length * w + (o.series.length - 1) * gap;
      o.groups.forEach((g, gi) => {
        const cx = L + bw * gi + bw / 2;
        const wash = el('rect', { x: cx - bw / 2 + 3, y: T - 6, width: bw - 6, height: H - T - B + 6, rx: 6, class: 'cx-wash' }, svg);
        o.series.forEach((s, si) => {
          const x = cx - total / 2 + si * (w + gap);
          const v = s.vals[gi];
          el('path', { d: vBarPath(x, w, Y(0), Y(v), 4), class: s.cls }, svg);
          if (o.labelGroups && o.labelGroups.includes(gi)) txt(svg, x + w / 2, Y(Math.max(v, 0)) - 6, vf(v), 'cx-val', 'middle');
        });
        txt(svg, cx, H - B + 20, g, 'cx-lbl', 'middle');
        const hit = el('rect', { x: cx - bw / 2, y: 0, width: bw, height: H, class: 'cx-hit' }, svg);
        hover(hit, `<b>${o.groupTip ? o.groupTip(g) : g}</b>` + o.series.map((s) => `<br>${s.name} ${vf(s.vals[gi])}`).join(''), wash);
      });
    });
  }

  // 名次图：每列一种测试，每条线一个模型；窄屏只在右边标名字
  // o: cols[], colsShort[], models[{name,cls:'1'|'2'|'3'|'dim',ranks[],vals[],tie[]}], n, valFmt, valName
  function bump(id, o) {
    mount(id, (host, W, compact) => {
      const n = o.n || o.models.length;
      const L = compact ? 22 : 112, R = compact ? 96 : 112, T = 46, B = 18;
      const H = T + (n - 1) * (compact ? 46 : 52) + B;
      const svg = svgFor(host, W, H, o.aria);
      const cols = compact && o.colsShort ? o.colsShort : o.cols;
      const X = (i) => L + (i * (W - L - R)) / (cols.length - 1);
      const Y = (r) => T + ((r - 1) * (H - T - B)) / (n - 1);
      const vf = o.valFmt || fixed(4);
      cols.forEach((c, i) => {
        el('line', { x1: X(i), x2: X(i), y1: T - 14, y2: H - B + 8, class: 'cx-grid' }, svg);
        txt(svg, X(i), 16, c, 'cx-lbl strong', 'middle');
      });
      const order = o.models.filter((m) => m.cls === 'dim').concat(o.models.filter((m) => m.cls !== 'dim'));
      order.forEach((m) => {
        const d = m.ranks.map((r, i) => (i ? 'L' : 'M') + X(i) + ',' + Y(r)).join('');
        el('path', { d: d, class: 'cx-line s' + m.cls }, svg);
      });
      order.forEach((m) => {
        m.ranks.forEach((r, i) => {
          el('circle', { cx: X(i), cy: Y(r), r: 5.5, class: 'cx-dot f' + m.cls }, svg);
          const hit = el('circle', { cx: X(i), cy: Y(r), r: 16, class: 'cx-hit' }, svg);
          const tie = m.tie && m.tie[i] ? `（${m.tie[i]}）` : '';
          hover(hit, `<b>${m.name}</b> · ${o.cols[i]}<br>${o.valName || '值'} ${vf(m.vals[i])}<br>第 ${r} 名${tie}`);
        });
        const cls = m.cls === 'dim' ? 'cx-lbl' : 'cx-lbl strong';
        if (!compact) txt(svg, X(0) - 14, Y(m.ranks[0]) + 4, m.name, cls, 'end');
        txt(svg, X(cols.length - 1) + 12, Y(m.ranks[m.ranks.length - 1]) + 4, m.name, cls, 'start');
      });
    });
  }

  // 折线图：带十字线和逐点提示；x 可以按 log2 取刻度（pass@k 用）
  // o: series[{name,cls:'1'|'2'|'3'|'dim',pts:[[x,y]],dash,markers,label}], x{domain,ticks,fmt,log2},
  //    y{domain,ticks,fmt}, height, refs[{y,label}], valFmt, xName, endLabels
  function lines(id, o) {
    mount(id, (host, W, compact) => {
      const H = o.height || (compact ? 240 : 300);
      const L = o.left || 50, R = o.endLabels ? (compact ? 86 : 110) : 16, T = 14, B = 30;
      const svg = svgFor(host, W, H, o.aria);
      const tx = o.x.log2 ? (v) => Math.log2(v) : (v) => v;
      const X = linear(tx(o.x.domain[0]), tx(o.x.domain[1]), L, W - R);
      const xs = (v) => X(tx(v));
      const Y = linear(o.y.domain[0], o.y.domain[1], H - B, T);
      const yf = o.y.fmt || fixed(2), xf = o.x.fmt || ((v) => String(v));
      const vf = o.valFmt || yf;
      o.y.ticks.forEach((t) => {
        el('line', { x1: L, x2: W - R, y1: Y(t), y2: Y(t), class: t === o.y.domain[0] ? 'cx-base' : 'cx-grid' }, svg);
        txt(svg, L - 8, Y(t) + 4, yf(t), 'cx-tick', 'end');
      });
      const xt = compact && o.x.ticksCompact ? o.x.ticksCompact : o.x.ticks;
      xt.forEach((t) => txt(svg, xs(t), H - B + 18, xf(t), 'cx-tick', 'middle'));
      (o.refs || []).forEach((r) => {
        el('line', { x1: L, x2: W - R, y1: Y(r.y), y2: Y(r.y), class: 'cx-ref' }, svg);
        if (r.label) txt(svg, W - R - 4, Y(r.y) - 6, r.label, 'cx-ann', 'end');
      });
      const order = o.series.filter((s) => s.cls === 'dim').concat(o.series.filter((s) => s.cls !== 'dim'));
      order.forEach((s) => {
        const d = s.pts.map((p, i) => (i ? 'L' : 'M') + xs(p[0]).toFixed(1) + ',' + Y(p[1]).toFixed(1)).join('');
        el('path', { d: d, class: 'cx-line s' + s.cls + (s.dash ? ' dash' : '') }, svg);
        if (s.markers) s.pts.forEach((p) => el('circle', { cx: xs(p[0]), cy: Y(p[1]), r: 4.5, class: 'cx-dot f' + s.cls }, svg));
      });
      if (o.endLabels) {
        // 末端标注按 y 排开，避免挤在一起
        const labs = o.series.filter((s) => s.label !== false).map((s) => {
          const p = s.pts[s.pts.length - 1];
          return { s: s, y: Y(p[1]) + 4 };
        }).sort((a, b) => a.y - b.y);
        for (let i = 1; i < labs.length; i++) if (labs[i].y - labs[i - 1].y < 15) labs[i].y = labs[i - 1].y + 15;
        labs.forEach((l) => {
          const p = l.s.pts[l.s.pts.length - 1];
          txt(svg, xs(p[0]) + 8, l.y, l.s.label || l.s.name, l.s.cls === 'dim' ? 'cx-lbl' : 'cx-lbl strong', 'start');
        });
      }
      // 十字线
      const cross = el('line', { x1: 0, x2: 0, y1: T, y2: H - B, class: 'cx-cross', visibility: 'hidden' }, svg);
      const dots = o.series.map((s) => el('circle', { r: 4.5, class: 'cx-dot f' + s.cls, visibility: 'hidden' }, svg));
      const hit = el('rect', { x: L, y: T, width: W - R - L, height: H - T - B, class: 'cx-hit' }, svg);
      const nearest = (pts, xv) => {
        let best = pts[0], bd = Infinity;
        for (const p of pts) {
          const d = Math.abs(tx(p[0]) - xv);
          if (d < bd) { bd = d; best = p; }
        }
        return best;
      };
      hover(hit, (e) => {
        const r = svg.getBoundingClientRect();
        const px = ((e.clientX - r.left) / r.width) * W;
        const xv = tx(o.x.domain[0]) + ((px - L) / (W - R - L)) * (tx(o.x.domain[1]) - tx(o.x.domain[0]));
        const ref = nearest(o.series[0].pts, xv);
        cross.setAttribute('x1', xs(ref[0]));
        cross.setAttribute('x2', xs(ref[0]));
        cross.setAttribute('visibility', 'visible');
        let html = `<b>${o.xName ? o.xName(ref[0]) : xf(ref[0])}</b>`;
        o.series.forEach((s, i) => {
          const p = nearest(s.pts, tx(ref[0]));
          dots[i].setAttribute('cx', xs(p[0]));
          dots[i].setAttribute('cy', Y(p[1]));
          dots[i].setAttribute('visibility', 'visible');
          html += `<br><i style="background:var(--c${s.cls === 'dim' ? 'dim' : s.cls})"></i>${s.name} ${vf(p[1])}`;
        });
        return html;
      });
      hit.addEventListener('pointerleave', () => {
        cross.setAttribute('visibility', 'hidden');
        dots.forEach((d) => d.setAttribute('visibility', 'hidden'));
      });
    });
  }

  // 区间图：每行一个点估计加一条置信区间
  // o: rows[{name,v,lo,hi,cls,strong}], domain, ticks, ticksCompact, tickFmt, valFmt, valName
  function intervals(id, o) {
    mount(id, (host, W, compact) => {
      const L = compact ? 80 : 118, R = 22, T = 30, rh = 68;
      const H = T + rh * o.rows.length;
      const svg = svgFor(host, W, H, o.aria);
      const X = linear(o.domain[0], o.domain[1], L, W - R);
      const tf = o.tickFmt || ((v) => (v === 0 ? '0' : sgn(v, 0)));
      const vf = o.valFmt || ((v) => sgn(v, 2));
      (compact && o.ticksCompact ? o.ticksCompact : o.ticks).forEach((t) => {
        el('line', { x1: X(t), x2: X(t), y1: T - 8, y2: H - 8, class: t === 0 ? 'cx-base' : 'cx-grid' }, svg);
        txt(svg, X(t), 12, tf(t), 'cx-tick', 'middle');
      });
      o.rows.forEach((r, i) => {
        const y = T + i * rh + 24;
        const n = r.cls || '1';
        const wash = el('rect', { x: 0, y: y - rh / 2 + 4, width: W, height: rh - 8, rx: 6, class: 'cx-wash' }, svg);
        txt(svg, L - 10, y + 4, r.name, r.strong === false ? 'cx-lbl' : 'cx-lbl strong', 'end');
        el('line', { x1: X(r.lo), x2: X(r.hi), y1: y, y2: y, class: 'cx-line s' + n }, svg);
        [r.lo, r.hi].forEach((v) => {
          el('line', { x1: X(v), x2: X(v), y1: y - 5, y2: y + 5, class: 'cx-line s' + n }, svg);
          txt(svg, X(v), y - 10, vf(v), 'cx-ann', 'middle');
        });
        el('circle', { cx: X(r.v), cy: y, r: 6, class: 'cx-dot f' + n }, svg);
        txt(svg, X(r.v), y + 23, vf(r.v), 'cx-val', 'middle');
        const hit = el('rect', { x: 0, y: y - rh / 2 + 4, width: W, height: rh - 8, class: 'cx-hit' }, svg);
        hover(hit, `<b>${r.name}</b><br>${o.valName || '点估计'} ${vf(r.v)}<br>95% 区间 ${vf(r.lo)} 至 ${vf(r.hi)}`, wash);
      });
    });
  }

  // 讲解片：点了封面才插入网页原片的 iframe
  function bindFilms() {
    document.querySelectorAll('.video-cover[data-film]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const frame = document.createElement('iframe');
        frame.className = 'video-frame';
        frame.src = btn.dataset.film + (btn.dataset.film.includes('?') ? '&' : '?') + 'autoplay=1';
        frame.title = btn.dataset.title || '讲解片';
        frame.allow = 'autoplay; fullscreen';
        frame.allowFullscreen = true;
        btn.replaceWith(frame);
        frame.focus();
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bindFilms);
  else bindFilms();

  window.Charts = { dumbbell, hbars, vgroups, bump, lines, intervals, sgn, fixed, minus };
})();
