// 《机器学习选股，扣掉成本还剩多少》各段共用的部件：1800 格合格池、时间轴（HUD 底部常驻，也能画大的）、
// 逐日竖条、累计曲线、区间条、表格、规则牌，和对勾、叉、锁几个小图标。
// 颜色语义见 DESIGN.md：橙 = 冻结方案自己的东西；冰蓝 = 合格池、基准、市场和风格；红粉 = 成本、闸门拦截；灰虚线 = 只报告、示意。
// 涨跌不用红绿：负数带负号（U+2212），用灰色画、柱子朝下。数都从 window.CR（scripts/make_data.py 生成）取，别手抄。
// 部件的 up() 每帧都要调：没到时刻的元素靠它藏起来。
(() => {
  const P = (window.P = {});
  const C = K.C;
  const PUNCT = new Set([..."，。：；、！？,.;:!? “”‘’（）"]);
  P.DIM = "#5a5f67";
  P.MONO20 = '500 20px/26px "HF Mono", "HF Sans", monospace';
  P.MONO24 = '500 24px/30px "HF Mono", "HF Sans", monospace';
  P.GRAY = ["#2a2d33", "#5a5f68", "#8a8f98"];
  P.OFF = "#1c1f26";

  // ---- 小工具 ----
  P.win = (t, a, b, fi = 0.3, fo = 0.3) => Math.min(K.prog(t, a, a + fi), 1 - K.prog(t, b, b + fo));
  P.pulse = (t, a, up = 0.12, down = 0.7) => (t < a ? 0 : t < a + up ? (t - a) / up : Math.max(0, 1 - (t - a - up) / down));
  P.lightCol = (t, tOn, to = C.text, from = P.DIM) => K.mix(from, to, K.eo(K.prog(t, tOn, tOn + 0.3)));
  // 数字亮起：常档到亮档，落定时一阵微光
  P.glow = (el, t, tOn, tier) => {
    const lit = K.eo(K.prog(t, tOn, tOn + 0.3));
    K.col(el, K.mix(tier[1], tier[2], lit));
    const g = lit * (0.35 + 0.65 * (1 - K.prog(t, tOn + 0.3, tOn + 1.4)));
    const ts = g > 0.02 ? `0 0 ${(6 + 16 * g).toFixed(1)}px ${K.rgba(tier[2], 0.25 + 0.4 * g)}` : "none";
    if (el._ts !== ts) {
      el.style.textShadow = ts;
      el._ts = ts;
    }
  };
  // 定位文字。画布压在文字上方是有意的，检查器把画布当不透明，所以每个字块都声明一下
  P.tx = (parent, x, y, text, font, color) => {
    const e = K.at(K.el("div", "tx", parent, text), x, y);
    e.setAttribute("data-layout-allow-occlusion", "");
    if (font) e.style.font = font;
    if (color) e.style.color = color;
    return e;
  };
  // 右对齐（x 是右边缘）、居中（x 是中线）
  P.txr = (parent, xr, y, text, font, color) => {
    const e = P.tx(parent, xr, y, text, font, color);
    e.style.transform = "translateX(-100%)";
    return e;
  };
  P.ctr = (parent, xc, y, text, font, color) => {
    const e = P.tx(parent, xc, y, text, font, color);
    e.style.transform = "translateX(-50%)";
    return e;
  };
  // 带正负号的数，负号用 U+2212
  P.fs = (v, d = 2) => (v > 0 ? "+" : v < 0 ? "−" : "") + Math.abs(v).toFixed(d);
  // 只给负数带号
  P.fn = (v, d = 2) => (v < 0 ? "−" : "") + Math.abs(v).toFixed(d);
  P.pct = (v, d = 1, sign = false) => (sign ? P.fs(v * 100, d) : P.fn(v * 100, d)) + "%";
  // 字体串：等宽、黑体
  P.mono = (px, wt = 800) => `${wt} ${px}px/${Math.round(px * 1.08)}px "HF Mono", "HF Sans", monospace`;
  P.sans = (px, wt = 700) => `${wt} ${px}px/${Math.round(px * 1.25)}px "HF Sans", sans-serif`;
  // 面板里的子元素：面板藏着时一起藏（K.vis 会把 visibility 写死成 visible，盖过父元素的 hidden）
  P.vin = (e, a, p = 1) => K.vis(e, a > 0.002 ? p : 0);
  // 全屏画布：建在这一层的面板之后（面板底色不透明，会盖住先建的画布），文字建在画布之后。
  // begin(a) 清掉上一帧，a 为 0 时返回 false，这一帧不用画
  P.layer = (si) => {
    const ctx = K.canvas(si, 0, 0, 1920, 1080);
    let dirty = false;
    return {
      ctx,
      begin(a) {
        if (dirty) ctx.clearRect(0, 0, 1920, 1080);
        dirty = a > 0.002;
        ctx.globalAlpha = 1;
        return dirty;
      },
    };
  };
  P.arrow = (ctx, x0, y0, x1, y1, color, head = 8) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    if (!head) return;
    const a = Math.atan2(y1 - y0, x1 - x0);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 - head * Math.cos(a) + (head / 2) * Math.sin(a), y1 - head * Math.sin(a) - (head / 2) * Math.cos(a));
    ctx.lineTo(x1 - head * Math.cos(a) - (head / 2) * Math.sin(a), y1 - head * Math.sin(a) + (head / 2) * Math.cos(a));
    ctx.closePath();
    ctx.fill();
  };
  P.dashRect = (ctx, x, y, w, h, color, r = 8) => {
    ctx.setLineDash([6, 5]);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    K.rr(ctx, x + 0.5, y + 0.5, w - 1, h - 1, r);
    ctx.stroke();
    ctx.setLineDash([]);
  };
  // 角上的等宽小标（ILLUSTRATIVE · 示意、REPORT ONLY · 只报告……）；默认 x 是右边缘，left 为 true 时是左边缘
  P.tag = (parent, x, y, text, color = P.GRAY[2], left = false) => {
    const e = K.at(K.el("div", "extag", parent, text), x, y);
    if (!left) e.style.transform = "translateX(-100%)";
    e.style.color = color;
    e.style.borderColor = K.rgba(color, 0.55);
    e.setAttribute("data-layout-allow-occlusion", "");
    return e;
  };

  // ---- 小图标（画在画布上）----
  // 折线画到 p 的比例
  P.poly = (ctx, pts, p) => {
    const segs = [];
    let L = 0;
    for (let i = 1; i < pts.length; i++) {
      const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
      segs.push(l);
      L += l;
    }
    let left = L * K.c01(p);
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length && left > 0; i++) {
      const f = Math.min(1, left / segs[i - 1]);
      ctx.lineTo(pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * f, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * f);
      left -= segs[i - 1];
    }
    ctx.stroke();
  };
  // 对勾、叉：中心 (x, y)，边长 s，p 是画出来的比例
  P.check = (ctx, x, y, s, color, p = 1, lw = 2) => {
    if (p <= 0) return;
    ctx.strokeStyle = color;
    ctx.lineWidth = lw;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    P.poly(ctx, [[x - s * 0.42, y + s * 0.02], [x - s * 0.12, y + s * 0.32], [x + s * 0.44, y - s * 0.34]], p);
  };
  P.cross = (ctx, x, y, s, color, p = 1, lw = 2) => {
    if (p <= 0) return;
    ctx.strokeStyle = color;
    ctx.lineWidth = lw;
    ctx.lineCap = "round";
    const h = s * 0.34;
    P.poly(ctx, [[x - h, y - h], [x + h, y + h]], Math.min(1, p * 2));
    if (p > 0.5) P.poly(ctx, [[x + h, y - h], [x - h, y + h]], (p - 0.5) * 2);
  };
  // 锁：中心 (x, y)，高约 s；open 0–1 时锁梁抬起
  P.lock = (ctx, x, y, s, color, open = 0) => {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = Math.max(1.5, s / 11);
    const r = s * 0.22;
    const lift = s * 0.16 * K.c01(open);
    ctx.beginPath();
    ctx.moveTo(x - r, y - s * 0.04 - lift);
    ctx.lineTo(x - r, y - s * 0.2 - lift);
    ctx.arc(x, y - s * 0.2 - lift, r, Math.PI, 0);
    ctx.lineTo(x + r, y - s * 0.04 - lift * (open > 0 ? 2.2 : 1));
    ctx.stroke();
    K.rr(ctx, x - s * 0.36, y - s * 0.06, s * 0.72, s * 0.5, Math.max(2, s * 0.08));
    ctx.fill();
  };

  // ---- 按词对时 ----
  // 第 n 句里一段原文每个字念到的时刻（按送配音的写法对；标点取前一个字的时刻）
  P.charTimes = (n, text) => {
    const cs = K.chars(n);
    const isP = (c) => PUNCT.has(c);
    const want = [...text].filter((c) => !isP(c)).map((c) => c.toLowerCase());
    let start = -1;
    const m = Math.min(3, want.length);
    for (let i = 0; i + m <= cs.length && start < 0; i++) {
      let ok = true;
      for (let j = 0; j < m; j++) if (cs[i + j][0] !== want[j]) ok = false;
      if (ok) start = i;
    }
    if (start < 0) {
      K.missing.push(`${n}:${text.slice(0, 6)}`);
      start = 0;
    }
    const out = [];
    let k = start;
    let last = cs[start] ? cs[start][1] : K.seg(n).t0;
    for (const c of text) {
      if (!isP(c) && k < cs.length && cs[k][0] === c.toLowerCase()) {
        last = cs[k][1];
        k++;
      }
      out.push(last);
    }
    return out;
  };
  // 念到哪个字亮哪个字的一段话。返回 { el, paint(t, color) }；el 宽度固定、自动换行
  P.say = (parent, x, y, w, n, text, font) => {
    const el = K.at(K.el("div", "ans", parent), x, y, w);
    el.setAttribute("data-layout-allow-occlusion", "");
    if (font) el.style.font = font;
    const spans = [...text].map((c) => K.el("span", "", el, c));
    const times = P.charTimes(n, text);
    return {
      el,
      spans,
      times,
      t0: times[0],
      t1: times[times.length - 1],
      paint(t, color = C.text) {
        spans.forEach((s, i) => K.col(s, P.lightCol(t, times[i] - 0.04, color)));
      },
    };
  };

  // ---- 日期和序列 ----
  // "200102"（逐日序列里的写法）或 "2026-10-19" → 带小数的年份
  P.yr = (d) => {
    let y, m, dd;
    if (d.length === 6) {
      y = 2000 + +d.slice(0, 2);
      m = +d.slice(2, 4);
      dd = +d.slice(4, 6);
    } else {
      y = +d.slice(0, 4);
      m = +d.slice(5, 7);
      dd = +d.slice(8, 10);
    }
    const a = Date.UTC(y, 0, 1);
    return y + (Date.UTC(y, m - 1, dd) - a) / (Date.UTC(y + 1, 0, 1) - a);
  };
  // 逐日相加（null 当 0）
  P.cum = (arr) => {
    let s = 0;
    return arr.map((v) => (s += v || 0));
  };
  P.mean = (arr) => {
    const v = arr.filter((x) => x != null);
    return v.reduce((s, x) => s + x, 0) / v.length;
  };
  P.sd = (arr) => {
    const v = arr.filter((x) => x != null);
    const m = P.mean(v);
    return Math.sqrt(v.reduce((s, x) => s + (x - m) * (x - m), 0) / (v.length - 1));
  };

  // 逐日竖条：每天一根 1 px 竖线，从 y0（零线）往上或往下。o = { x, y0, w, scale（每 1 个单位多少 px）, p（从左往右画到哪）, col(v, i) }
  // n 根平铺在宽 w 里，按真实天数画；null 的那天空着
  P.drawStrip = (ctx, vals, o) => {
    const n = vals.length;
    const pitch = o.w / n;
    const upto = Math.floor(n * K.c01(o.p == null ? 1 : o.p));
    const bw = Math.max(1, Math.floor(pitch * (o.fill || 0.8)));
    for (let i = 0; i < upto; i++) {
      const v = vals[i];
      if (v == null) continue;
      const h = v * o.scale;
      const x = Math.round(o.x + i * pitch);
      ctx.fillStyle = o.col(v, i);
      if (h >= 0) ctx.fillRect(x, Math.round(o.y0 - h), bw, Math.max(1, Math.round(h)));
      else ctx.fillRect(x, Math.round(o.y0), bw, Math.max(1, Math.round(-h)));
    }
  };
  // 折线：ys 平铺在宽 w 里，y0 是零线，往上为正。p 是画到哪（末端带一小段插值）。返回末端坐标
  P.drawCurve = (ctx, ys, o) => {
    const n = ys.length;
    const P_ = K.c01(o.p == null ? 1 : o.p) * (n - 1);
    const last = Math.floor(P_);
    const X = (i) => o.x + (i / (n - 1)) * o.w;
    const Y = (v) => o.y0 - v * o.scale;
    ctx.strokeStyle = o.color;
    ctx.lineWidth = o.lw || 1.5;
    ctx.lineJoin = "round";
    if (o.dash) ctx.setLineDash(o.dash);
    ctx.beginPath();
    ctx.moveTo(X(0), Y(ys[0]));
    for (let i = 1; i <= last; i++) ctx.lineTo(X(i), Y(ys[i]));
    let ex = X(last);
    let ey = Y(ys[last]);
    if (last < n - 1) {
      const f = P_ - last;
      ex = X(last + f);
      ey = Y(ys[last] + (ys[last + 1] - ys[last]) * f);
      ctx.lineTo(ex, ey);
    }
    ctx.stroke();
    ctx.setLineDash([]);
    return [ex, ey];
  };
  // 两条折线之间填色（a 在上、b 在下也行），画到 p
  P.fillBetween = (ctx, ya, yb, o, color) => {
    const n = ya.length;
    const upto = Math.max(1, Math.floor(K.c01(o.p == null ? 1 : o.p) * (n - 1)));
    const X = (i) => o.x + (i / (n - 1)) * o.w;
    const Y = (v) => o.y0 - v * o.scale;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(X(0), Y(ya[0]));
    for (let i = 1; i <= upto; i++) ctx.lineTo(X(i), Y(ya[i]));
    for (let i = upto; i >= 0; i--) ctx.lineTo(X(i), Y(yb[i]));
    ctx.closePath();
    ctx.fill();
  };

  // ---- 1800 格合格池 ----
  // 60 列 × 30 行，按 10-19 收盘的打分排：左上第一格分数最高，逐行往右往下。打分越高格子越亮（灰阶）。
  // 不按成交额排（流动性是换手率，不是成交额，见 DESIGN.md）。24 只持仓的名次在 CR.grid.held，都在前 34 名。
  P.POOL = { cols: 60, rows: 30, n: 1800 };
  P.HELD = new Set(CR.grid.held);
  P.poolXY = (i, x, y, pitch) => [x + (i % 60) * pitch, y + Math.floor(i / 60) * pitch];
  // o = { x, y, cell, gap, fill（按名次从前往后铺开的进度 0–1）, held（24 格变橙 0–1）, heldT（每格变橙的时刻函数，可选）,
  //       dim（非持仓压暗 0–1）, check(i) → 0–1（成交打勾，可选）, t }
  P.drawPool = (ctx, o) => {
    const pitch = o.cell + o.gap;
    const fill = o.fill == null ? 1 : o.fill;
    const base = ctx.globalAlpha;
    for (let i = 0; i < 1800; i++) {
      // 铺开：名次 i 在 fill 走到 i/1800 时出现，0.06 的过渡
      const ap = K.c01((fill * 1.06 - i / 1800) / 0.06);
      if (ap <= 0) continue;
      const [px, py] = P.poolXY(i, o.x, o.y, pitch);
      const lum = 1 - i / 1799;
      let col = K.mixHex("#22252b", "#7d828c", Math.pow(lum, 1.6));
      let a = ap;
      const h = P.HELD.has(i);
      const hp = h ? (o.heldT ? o.heldT(i) : o.held || 0) : 0;
      if (!h && o.dim) a *= 1 - 0.65 * o.dim;
      ctx.globalAlpha = base * a;
      if (hp > 0) {
        col = K.mixHex(col, C.main[1], hp);
        ctx.save();
        ctx.shadowColor = C.main[2];
        ctx.shadowBlur = 8 * hp;
        ctx.fillStyle = col;
        ctx.fillRect(px, py, o.cell, o.cell);
        ctx.restore();
      } else {
        ctx.fillStyle = col;
        ctx.fillRect(px, py, o.cell, o.cell);
      }
      const ck = o.check ? o.check(i) : 0;
      if (ck > 0) P.check(ctx, px + o.cell / 2, py + o.cell / 2, o.cell * 0.8, C.bg, ck, Math.max(1.5, o.cell / 9));
    }
    ctx.globalAlpha = base;
  };
  // 前 n 名的括号：画在第一行格子下沿，两端短竖线
  P.poolBracket = (ctx, o, n, color) => {
    const pitch = o.cell + o.gap;
    const x0 = o.x;
    const x1 = o.x + n * pitch - o.gap;
    const y = o.y + o.cell + 3;
    ctx.fillStyle = color;
    ctx.fillRect(x0, y + 6, x1 - x0, 1);
    ctx.fillRect(x0, y, 1, 7);
    ctx.fillRect(x1 - 1, y, 1, 7);
  };

  // ---- 时间轴 ----
  // 2016 起每年 1 个单位；2026-10-09 之后断开，模拟盘那 73 天放大成 1.05 个单位，总长 12 个单位
  P.TL = [
    { k: "warm", a: "2016-01-04", b: "2019-12-31", zh: "训练预热" },
    { k: "dev", a: "2020-01-02", b: "2024-12-31", zh: "开发期 · 10 折" },
    { k: "hold", a: "2025-01-02", b: "2025-12-31", zh: "保留期" },
    { k: "supp", a: "2026-01-05", b: "2026-10-09", zh: "补做" },
    { k: "paper", a: "2026-10-19", b: "2026-12-31", zh: "模拟盘" },
  ];
  P.TLU = 12;
  P.tlU = (d) => {
    const y = P.yr(d);
    if (y < 2026.785) return y - 2016;
    const p = (y - P.yr("2026-10-19")) / (P.yr("2026-12-31") - P.yr("2026-10-19"));
    return 10.95 + 1.05 * K.c01(p);
  };
  // 模拟盘到 12-31 的交易日数（研究文档的约数），账本已记的天数从 CR.forward.ledger 来
  P.PAPER_DAYS = 54;
  P.PAPER_DONE = CR.forward.ledger.length;
  const TICKS = [
    ["2016-01-04", "2016"],
    ["2020-01-02", "2020"],
    ["2025-01-02", "2025"],
    ["2026-01-05", "2026"],
    ["2026-10-19", "10-19"],
    ["2026-12-31", "12-31"],
  ];
  // 时间轴部件。big 为 true 是开场、第 3 章、第 5 章用的大号，否则是 HUD 底部的小号。
  // up(t, a, st)：st = { lit: { warm, dev, hold, supp, paper }（0–1，亮成主色）, lock（锁出现 0–1）, open（锁打开 0–1）,
  //   folds（10 折刻度 0–1）, days（模拟盘点亮的天数，可带小数）, sweep（一颗亮点从左扫到右 0–1）, ch（底下的章号 0–1）}
  P.timeline = (parent, x, y, w, big = false) => {
    const bh = big ? 14 : 6;
    const U = (d) => x + (P.tlU(d) / P.TLU) * w;
    const pad = 30;
    const ctx = K.canvas(parent, x - pad, y - 40, w + 2 * pad, 80);
    const OX = x - pad;
    const OY = y - 40;
    const fz = big ? '700 26px/32px "HF Sans", sans-serif' : '600 20px/26px "HF Sans", sans-serif';
    const fm = big ? '500 22px/28px "HF Mono", "HF Sans", monospace' : '500 18px/24px "HF Mono", "HF Sans", monospace';
    const segs = P.TL.map((s) => {
      const x0 = U(s.a);
      const x1 = U(s.b);
      const lab = P.ctr(parent, (x0 + x1) / 2, y - bh / 2 - (big ? 44 : 30), s.zh, fz, P.DIM);
      return { ...s, x0, x1, lab };
    });
    const ticks = TICKS.map(([d, s]) => {
      const e = P.ctr(parent, U(d), y + bh / 2 + (big ? 12 : 6), s, fm, "#7d828c");
      return { x: U(d), e };
    });
    const folds = CR.folds.map((f) => U(f[2]));
    return {
      segs,
      U,
      up(t, a, st = {}) {
        ctx.clearRect(0, 0, w + 2 * pad, 80);
        const lit = st.lit || {};
        for (const s of segs) {
          const p = lit[s.k] || 0;
          P.vin(s.lab, a, a);
          K.col(s.lab, p > 0.01 ? K.mix("#8a8f98", C.main[2], p) : "#8a8f98");
        }
        for (const k of ticks) P.vin(k.e, a, a);
        if (a <= 0.002) return;
        ctx.globalAlpha = a;
        const cy = y - OY;
        // 底线
        ctx.fillStyle = "#2a2d33";
        ctx.fillRect(segs[0].x0 - OX, cy, segs[3].x1 - segs[0].x0, 1);
        // 断开处两道斜线
        const bx = (segs[3].x1 + segs[4].x0) / 2 - OX;
        ctx.strokeStyle = "#5a5f68";
        ctx.lineWidth = 1;
        for (const dx of [-3, 3]) {
          ctx.beginPath();
          ctx.moveTo(bx + dx - 3, cy + 6);
          ctx.lineTo(bx + dx + 3, cy - 6);
          ctx.stroke();
        }
        for (const s of segs) {
          const p = lit[s.k] || 0;
          const x0 = s.x0 - OX;
          const ww = Math.max(2, s.x1 - s.x0);
          ctx.fillStyle = "#1c2028";
          ctx.fillRect(x0, cy - bh / 2, ww, bh);
          ctx.strokeStyle = "#3a3e46";
          ctx.strokeRect(x0 + 0.5, cy - bh / 2 + 0.5, ww - 1, bh - 1);
          if (p > 0.01) {
            ctx.save();
            ctx.fillStyle = K.rgba(C.main[1], 0.25 + 0.75 * p);
            ctx.shadowColor = C.main[2];
            ctx.shadowBlur = 8 * p;
            ctx.fillRect(x0, cy - bh / 2, ww, bh);
            ctx.restore();
          }
        }
        // 年份刻度
        for (let yy = 2016; yy <= 2026; yy++) {
          const xx = U(`${yy}-01-02`) - OX;
          ctx.fillStyle = "#3a3e46";
          ctx.fillRect(Math.round(xx), cy + bh / 2, 1, big ? 8 : 5);
        }
        // 10 折：开发期里每折测试段的起点一根短竖线
        if (st.folds > 0) {
          ctx.globalAlpha = a * st.folds;
          ctx.fillStyle = C.text;
          for (const fx of folds) ctx.fillRect(Math.round(fx - OX), cy - bh / 2 - (big ? 6 : 4), 1, bh + (big ? 12 : 8));
          ctx.globalAlpha = a;
        }
        // 2025 的锁
        if (st.lock > 0) {
          const s = segs[2];
          ctx.globalAlpha = a * st.lock;
          const col = st.open > 0.5 ? C.text : C.gray;
          ctx.fillStyle = C.bg;
          ctx.fillRect((s.x0 + s.x1) / 2 - OX - (big ? 14 : 9), cy - (big ? 16 : 10), big ? 28 : 18, big ? 26 : 18);
          P.lock(ctx, (s.x0 + s.x1) / 2 - OX, cy - 1, big ? 26 : 16, col, st.open || 0);
          ctx.globalAlpha = a;
        }
        // 模拟盘的交易日：54 根细刻度，已记账的亮
        {
          const s = segs[4];
          const n = P.PAPER_DAYS;
          const pitch = (s.x1 - s.x0) / n;
          const done = st.days || 0;
          for (let i = 0; i < n; i++) {
            const on = K.c01(done - i);
            ctx.fillStyle = on > 0 ? K.mix("#3a3e46", C.main[2], on) : "#2a2d33";
            ctx.fillRect(Math.round(s.x0 - OX + i * pitch + pitch / 2), cy + bh / 2 + 2, 1, big ? 7 : 4);
          }
        }
        // 扫过的亮点
        if (st.sweep > 0 && st.sweep < 1) {
          const sx = segs[0].x0 + (segs[4].x1 - segs[0].x0) * st.sweep - OX;
          ctx.save();
          ctx.fillStyle = C.main[2];
          ctx.shadowColor = C.main[2];
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(sx, cy, big ? 6 : 4, 0, 6.283);
          ctx.fill();
          ctx.restore();
        }
        ctx.globalAlpha = 1;
      },
    };
  };
  // HUD 底部常驻的小时间轴：各章往 P.dock 里推 { t0, t1, st }（st 是对象，或 t → 对象的函数）。
  // 前后相接的两段之间不淡出。章节卡、片名卡上不推就不显示。内容区要让出 y 800 以下。
  P.dock = [];
  P.DOCK_Y = 846;
  K.hudParts.push((root) => {
    const tl = P.timeline(root, 330, P.DOCK_Y, 1260, false);
    return (t, endFade) => {
      const d = P.dock.find((r) => t >= r.t0 && t < r.t1);
      if (!d) {
        tl.up(t, 0);
        return;
      }
      const contIn = P.dock.some((r) => Math.abs(r.t1 - d.t0) < 1e-6);
      const contOut = P.dock.some((r) => Math.abs(r.t0 - d.t1) < 1e-6);
      const aIn = contIn ? 1 : K.prog(t, d.t0, d.t0 + 0.35);
      const aOut = contOut ? 1 : 1 - K.prog(t, d.t1 - 0.3, d.t1);
      tl.up(t, Math.min(aIn, aOut) * endFade, typeof d.st === "function" ? d.st(t) : d.st);
    };
  });

  // ---- 规则牌 ----
  // 圆角小牌：上面一行粗黑体标题，下面一行等宽小字。tOn 前暗着，念到时边框和字点亮成 tier（默认暖白）。
  // up(t, a, tOn, tier)
  P.tile = (parent, x, y, w, h, title, sub, size = 30) => {
    const box = K.at(K.el("div", "", parent), x, y, w, h);
    box.style.position = "absolute";
    box.style.borderRadius = "10px";
    box.style.border = "1px solid #2a2d33";
    box.style.background = "#0d0f14";
    box.style.visibility = "hidden";
    box.setAttribute("data-layout-allow-occlusion", "");
    const tt = P.tx(box, 20, sub ? 14 : (h - size * 1.3) / 2, title, P.sans(size, 800), P.DIM);
    const ss = sub ? P.tx(box, 20, 18 + size * 1.3, sub, P.MONO20, P.DIM) : null;
    return {
      el: box,
      tt,
      ss,
      up(t, a, tOn, tier = [C.text, C.text, C.text]) {
        const p = K.eo(K.prog(t, tOn, tOn + 0.3));
        K.vis(box, a);
        if (a <= 0.002) return 0;
        K.col(tt, K.mix(P.DIM, tier[2], p));
        if (ss) K.col(ss, K.mix(P.DIM, K.mixHex(tier[1], "#8a8f98", 0.4), p));
        const bc = K.mix("#2a2d33", tier[1], p * 0.8);
        if (box._bc !== bc) {
          box.style.borderColor = bc;
          box._bc = bc;
        }
        const pu = P.pulse(t, tOn, 0.1, 0.9);
        const sh = pu > 0.02 ? `0 0 ${(14 * pu).toFixed(1)}px ${K.rgba(tier[2], 0.45 * pu)}` : "none";
        if (box._sh !== sh) {
          box.style.boxShadow = sh;
          box._sh = sh;
        }
        return p;
      },
    };
  };

  // ---- 表格 ----
  // cols 是表头，rows 是二维数组（数字按 3 位小数写，字符串照写）。up(t, a, tOn, fx)：
  // fx.rowT[i] 是第 i 行出现的时刻；fx.hl(i, j) 返回那一格的颜色（可选）；fx.red = { cols, t } 把几列标成红粉（成本列）
  P.table = (parent, x, y, cols, rows, opts = {}) => {
    const widths = opts.widths || cols.map(() => 220);
    const rh = opts.rh || 40;
    const W = widths.reduce((s, v) => s + v, 0);
    const H = (rows.length + 1) * rh + 6;
    const xs = [];
    let acc = 0;
    for (const v of widths) {
      xs.push(acc);
      acc += v;
    }
    const ctx = K.canvas(parent, x - 4, y - 4, W + 8, H + 8);
    const headCol = opts.head || C.gray;
    const head = cols.map((c, j) => P.tx(parent, x + xs[j] + 14, y + 8, c, '600 20px/26px "HF Mono", "HF Sans", monospace', headCol));
    const fmt = (v) => (typeof v === "number" ? v.toFixed(3) : String(v));
    const cells = rows.map((r, i) => r.map((v, j) => P.tx(parent, x + xs[j] + 14, y + (i + 1) * rh + 6, fmt(v), '500 22px/28px "HF Mono", "HF Sans", monospace', C.text)));
    return {
      W,
      H,
      xs,
      rh,
      cells,
      // 第 i 行（0 起）第 j 列格子的左中点
      cellAt: (i, j) => [x + xs[j], y + (i + 1) * rh + 20],
      up(t, a, tOn, fx = {}) {
        ctx.clearRect(0, 0, W + 8, H + 8);
        const pin = K.eo(K.prog(t, tOn, tOn + 0.3));
        const A = a * pin;
        const red = fx.red ? K.eo(K.prog(t, fx.red.t, fx.red.t + 0.3)) : 0;
        const isRed = (j) => fx.red && fx.red.cols.includes(j);
        head.forEach((e, j) => {
          K.vis(e, A);
          K.col(e, isRed(j) && red > 0 ? K.mix(headCol, C.red[2], red) : headCol);
        });
        cells.forEach((r, i) => {
          const rt = fx.rowT ? fx.rowT[i] : tOn + 0.15 + i * 0.12;
          const ra = a * K.prog(t, rt, rt + 0.2);
          r.forEach((e, j) => {
            K.vis(e, ra);
            const hc = fx.hl ? fx.hl(i, j) : null;
            K.col(e, hc || (isRed(j) && red > 0 ? K.mix(C.text, C.red[2], red) : C.text));
          });
        });
        if (A <= 0.002) return;
        ctx.globalAlpha = A;
        for (const j of fx.red ? fx.red.cols : []) {
          if (red <= 0) continue;
          ctx.fillStyle = K.rgba(C.red[1], 0.14 * red);
          ctx.fillRect(4 + xs[j], 4, widths[j], H);
          ctx.strokeStyle = K.rgba(C.red[1], 0.8 * red);
          ctx.lineWidth = 1;
          ctx.strokeRect(4 + xs[j] + 0.5, 4.5, widths[j] - 1, H - 1);
        }
        ctx.strokeStyle = "#3a3e46";
        ctx.lineWidth = 1;
        ctx.strokeRect(4.5, 4.5, W - 1, H - 1);
        ctx.fillStyle = "#3a3e46";
        ctx.fillRect(4, 4 + rh, W, 1);
        for (let i = 2; i <= rows.length; i++) {
          ctx.fillStyle = "#1f2229";
          ctx.fillRect(4, 4 + i * rh, W, 1);
        }
        for (let j = 1; j < cols.length; j++) {
          ctx.fillStyle = "#1f2229";
          ctx.fillRect(4 + xs[j], 4, 1, H);
        }
        ctx.globalAlpha = 1;
      },
    };
  };

  // ---- 区间条 ----
  // 信息比率的 95% 区间。d = { m, lo, hi }；轴 [min, max] 映射到宽 w，每 0.5 一根 1 px 刻度、每 1 一个数；0 线贯穿。
  // up(t, a, tOn)：区间从估计值往两头长出来。估计值的点用 tier（冻结方案默认橙），区间条一律暖白：跨零不用红粉，负数不用红粉。
  P.ci = (parent, x, y, w, d, opts = {}) => {
    const min = opts.min == null ? -3 : opts.min;
    const max = opts.max == null ? 3 : opts.max;
    const tier = opts.tier || C.main;
    const H = 104;
    const PADX = 24;
    const ctx = K.canvas(parent, x - PADX, y - 8, w + 2 * PADX, H + 16);
    const X = (v) => PADX + ((v - min) / (max - min)) * w;
    const BY = 58;
    const mT = P.ctr(parent, x + X(d.m) - PADX, y + 2, P.fn(d.m), '800 40px/44px "HF Mono", "HF Sans", monospace', C.text);
    const bT = P.tx(parent, x + X(d.hi) - PADX + 18, y + BY - 21, `[${P.fn(d.lo)}, ${P.fs(d.hi)}]`, P.MONO24, C.gray);
    const ticks = [];
    for (let v = Math.ceil(min); v <= max; v++) ticks.push(P.ctr(parent, x + X(v) - PADX, y + BY + 18, v === 0 ? "0" : P.fs(v, 0), P.MONO20, v === 0 ? C.gray : P.DIM));
    return {
      up(t, a, tOn) {
        ctx.clearRect(0, 0, w + 2 * PADX, H + 16);
        const g = K.eo(K.prog(t, tOn, tOn + 0.45));
        const A = a * K.prog(t, tOn - 0.2, tOn + 0.1);
        K.vis(mT, A);
        K.vis(bT, a * K.prog(t, tOn + 0.3, tOn + 0.6));
        for (const e of ticks) K.vis(e, A);
        if (A <= 0.002) return;
        P.glow(mT, t, tOn, tier);
        ctx.globalAlpha = A;
        ctx.fillStyle = "#2a2d33";
        ctx.fillRect(X(min), 8 + BY, X(max) - X(min), 1);
        for (let v = min; v <= max + 1e-9; v += 0.5) {
          const whole = Math.abs(v - Math.round(v)) < 1e-9;
          ctx.fillStyle = Math.abs(v) < 1e-9 ? "#8a8f98" : "#3a3e46";
          ctx.fillRect(Math.round(X(v)), 8 + BY + 4, 1, whole ? 8 : 4);
        }
        ctx.fillStyle = "#8a8f98";
        ctx.fillRect(Math.round(X(0)), 8 + BY - 34, 1, 50);
        const lo = K.lerp(d.m, d.lo, g);
        const hi = K.lerp(d.m, d.hi, g);
        ctx.fillStyle = "#c9c4bb";
        ctx.fillRect(X(lo), 8 + BY - 3, X(hi) - X(lo), 6);
        if (g > 0.05) {
          ctx.fillRect(Math.round(X(lo)) - 1, 8 + BY - 12, 2, 24);
          ctx.fillRect(Math.round(X(hi)) - 1, 8 + BY - 12, 2, 24);
        }
        ctx.save();
        ctx.fillStyle = tier[2];
        ctx.shadowColor = tier[2];
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(X(d.m), 8 + BY, 7, 0, 6.283);
        ctx.fill();
        ctx.restore();
        ctx.globalAlpha = 1;
      },
      X: (v) => x + X(v) - PADX,
    };
  };
})();
