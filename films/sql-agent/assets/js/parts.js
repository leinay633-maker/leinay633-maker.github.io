// 《执行结果能教会模型多少》各段共用的部件：1501 格记分板、4 步轨道、动作签、结果表、电话题卡、区间条、HUD 判定签条，和对勾、叉、锁几个小图标。
// 颜色语义见 DESIGN.md：紫 = 执行结果对上了、成立；琥珀 = 外面给的（老师、金标、BIRD 题目）；红粉 = 错、不成立、不查就交；灰虚线 = 探索、观察。
// 数都从 window.EFA（scripts/make_data.py 生成）取，别手抄。部件的 up() 每帧都要调：没到时刻的元素靠它藏起来。
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
  P.fs = (v, d = 1) => (v > 0 ? "+" : v < 0 ? "−" : "") + Math.abs(v).toFixed(d);
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
  // 角上的等宽小标（EXPLORATORY · 探索、SEED 42 · 抽查、PROJECT · 项目判分……）；默认 x 是右边缘，left 为 true 时是左边缘
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
  const polyPart = (ctx, pts, p) => {
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
    polyPart(ctx, [[x - s * 0.42, y + s * 0.02], [x - s * 0.12, y + s * 0.32], [x + s * 0.44, y - s * 0.34]], p);
  };
  P.cross = (ctx, x, y, s, color, p = 1, lw = 2) => {
    if (p <= 0) return;
    ctx.strokeStyle = color;
    ctx.lineWidth = lw;
    ctx.lineCap = "round";
    const h = s * 0.34;
    polyPart(ctx, [[x - h, y - h], [x + h, y + h]], Math.min(1, p * 2));
    if (p > 0.5) polyPart(ctx, [[x + h, y - h], [x - h, y + h]], (p - 0.5) * 2);
  };
  // 锁：中心 (x, y)，高约 s
  P.lock = (ctx, x, y, s, color) => {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = Math.max(1.5, s / 11);
    const r = s * 0.22;
    ctx.beginPath();
    ctx.moveTo(x - r, y - s * 0.04);
    ctx.lineTo(x - r, y - s * 0.2);
    ctx.arc(x, y - s * 0.2, r, Math.PI, 0);
    ctx.lineTo(x + r, y - s * 0.04);
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

  // ---- 1501 格记分板 ----
  // 11 个库各一块（EFA.blocks 的顺序，大块在前），块内 10 列，从下往上一行行填，缺的格留在顶上；块底对齐，像一排柱子。
  // 块上方写题数，块下写库名。主线题那格（blocks[k].main）外面一圈琥珀细框。
  // 模式：none（全暗）、bEx / bPj（0/1）、ptrEx / ptrPj / rlbEx / rlbPj（三个 seed 里对了几次，0–3 分三档亮度）。
  // set(mode, t0, dur)：从左到右逐块扫过去换模式；新亮的格闪一下白，原来亮、现在暗的格闪一下红粉。
  P.BOARD = { cell: 11, gap: 3, cols: 10, bgap: 12 };
  const splitName = (s) => {
    if (s.length <= 10) return [s];
    let best = null;
    for (let i = 0; i < s.length; i++)
      if (s[i] === "_") {
        const a = s.slice(0, i + 1);
        const b = s.slice(i + 1);
        const m = Math.max(a.length, b.length);
        if (!best || m < best[0]) best = [m, a, b];
      }
    return best ? [best[1], best[2]] : [s];
  };
  P.board = (parent, x, y, opts = {}) => {
    const o = { ...P.BOARD, ...opts };
    const B = EFA.blocks;
    const pitch = o.cell + o.gap;
    const bw = o.cols * pitch - o.gap;
    const rowsOf = (b) => Math.ceil(b.n / o.cols);
    const H = Math.max(...B.map(rowsOf)) * pitch - o.gap;
    const W = B.length * bw + (B.length - 1) * o.bgap;
    const bx = (k) => k * (bw + o.bgap);
    const box = K.at(K.el("div", "", parent), x, y, W, H);
    box.style.position = "absolute";
    box.style.transformOrigin = "0 0";
    const PAD = 8;
    const ctx = K.canvas(box, -PAD, -PAD, W + 2 * PAD, H + 2 * PAD);
    const cnt = B.map((b, k) => P.ctr(box, bx(k) + bw / 2, H - rowsOf(b) * pitch - 30, String(b.n), P.MONO20, P.GRAY[2]));
    const names = B.map((b, k) => splitName(b.db).map((s, j) => P.ctr(box, bx(k) + bw / 2, H + 12 + j * 24, s, P.MONO20, P.DIM)));
    const cells = [];
    let mainCell = null;
    B.forEach((b, k) => {
      for (let i = 0; i < b.n; i++) {
        const r = Math.floor(i / o.cols);
        const c = i % o.cols;
        const cl = { k, i, x: bx(k) + c * pitch, y: H - o.cell - r * pitch, h: K.hash(k * 7.3 + 1, i * 1.7) };
        cells.push(cl);
        if (i === b.main) mainCell = cl;
      }
    });
    const modes = [{ t: -1e9, mode: o.mode || "none", dur: 0 }];
    const val = (mode, k, i) => (mode === "none" ? 0 : +B[k][mode][i]);
    const tri = (mode) => mode !== "none" && mode[0] !== "b";
    const colOf = (mode, v) => {
      if (!v) return P.OFF;
      if (!tri(mode)) return C.main[1];
      return v === 1 ? K.mixHex(C.main[0], C.main[1], 0.45) : v === 2 ? C.main[1] : C.main[2];
    };
    const sw = (m, cl) => m.t + m.dur * (0.78 * (cl.k / (B.length - 1)) + 0.22 * cl.h);
    return {
      el: box,
      W,
      H,
      bw,
      bx,
      pitch,
      cell: o.cell,
      cells,
      mainCell,
      // 某格中心在 parent 里的坐标（不含 place 的变换）
      at: (cl) => [x + cl.x + o.cell / 2, y + cl.y + o.cell / 2],
      set(mode, t0, dur = 0.9) {
        modes.push({ t: t0, mode, dur });
        modes.sort((p, q) => p.t - q.t);
        return this;
      },
      place(dx, dy, s = 1) {
        K.tf(box, `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) scale(${s.toFixed(4)})`);
      },
      // fx：ring 主线题琥珀框的不透明度；labels 标签不透明度；blockA(k) 块的不透明度系数；over(cl) 返回描边色或 null
      up(t, a, fx = {}) {
        ctx.clearRect(0, 0, W + 2 * PAD, H + 2 * PAD);
        const la = a * (fx.labels == null ? 1 : fx.labels);
        for (const e of cnt) K.vis(e, la);
        for (const ls of names) for (const e of ls) K.vis(e, la);
        if (a <= 0.002) return;
        for (const cl of cells) {
          let cur = 0;
          for (let j = modes.length - 1; j > 0; j--)
            if (t >= sw(modes[j], cl)) {
              cur = j;
              break;
            }
          const m = modes[cur];
          const v = val(m.mode, cl.k, cl.i);
          let fill = colOf(m.mode, v);
          let flash = 0;
          let flashCol = "#ffffff";
          if (cur > 0) {
            const ts = sw(m, cl);
            const p = K.prog(t, ts, ts + 0.3);
            if (p < 1) {
              const pm = modes[cur - 1];
              const pv = val(pm.mode, cl.k, cl.i);
              fill = K.mix(colOf(pm.mode, pv), fill, p);
              if (!pv && v) flash = 1 - p;
              else if (pv && !v) {
                flash = 1 - p;
                flashCol = C.red[2];
              }
            }
          }
          ctx.globalAlpha = a * (fx.blockA ? fx.blockA(cl.k) : 1);
          ctx.fillStyle = fill;
          ctx.fillRect(PAD + cl.x, PAD + cl.y, o.cell, o.cell);
          if (flash > 0.01) {
            ctx.fillStyle = K.rgba(flashCol, 0.6 * flash);
            ctx.fillRect(PAD + cl.x, PAD + cl.y, o.cell, o.cell);
          }
          if (fx.over) {
            const oc = fx.over(cl);
            if (oc) {
              ctx.strokeStyle = oc;
              ctx.lineWidth = 1;
              ctx.strokeRect(PAD + cl.x + 0.5, PAD + cl.y + 0.5, o.cell - 1, o.cell - 1);
            }
          }
        }
        if (fx.ring > 0.002 && mainCell) {
          ctx.globalAlpha = a * fx.ring;
          ctx.strokeStyle = C.amb[1];
          ctx.lineWidth = 1.5;
          ctx.strokeRect(PAD + mainCell.x - 3, PAD + mainCell.y - 3, o.cell + 6, o.cell + 6);
        }
        ctx.globalAlpha = 1;
      },
    };
  };

  // ---- 动作签 ----
  // 灰底白字：SCHEMA 看表、QUERY 试跑、FINISH 提交。
  // up(t, a, tOn, tone, toneOn)：tone 为 main 时边框渐变成紫、带一圈微光（先查再交的那一步）；red 时变红粉
  P.ACT = { schema: ["SCHEMA", "看表"], query: ["QUERY", "试跑"], finish: ["FINISH", "提交"] };
  P.act = (parent, x, y, kind, w = 220, h = 50) => {
    const box = K.at(K.el("div", "act", parent), x, y, w, h);
    box.setAttribute("data-layout-allow-occlusion", "");
    const [en, zh] = P.ACT[kind];
    const e1 = P.tx(box, 14, 9, en, '700 26px/30px "HF Mono", "HF Sans", monospace', C.text);
    const e2 = P.tx(box, 14 + en.length * 15.6 + 12, 11, zh, '500 24px/28px "HF Sans", sans-serif', C.gray);
    return {
      el: box,
      up(t, a, tOn, tone = null, toneOn = tOn) {
        const p = K.eo(K.prog(t, tOn, tOn + 0.3));
        const A = a * p;
        K.vis(box, A);
        K.vis(e1, A);
        K.vis(e2, A);
        K.tf(box, p < 1 ? `translateY(${(-10 * (1 - p)).toFixed(1)}px)` : "none");
        const q = tone ? K.eo(K.prog(t, toneOn, toneOn + 0.3)) : 0;
        const tc = tone === "red" ? C.red : C.main;
        const bc = q > 0 ? K.mix("#3a3e46", tc[1], q) : "#3a3e46";
        if (box._bc !== bc) {
          box.style.borderColor = bc;
          box._bc = bc;
        }
        const g = q * (0.45 + 0.55 * (1 - K.prog(t, toneOn + 0.3, toneOn + 1.4)));
        const sh = g > 0.01 ? `0 0 ${(4 + 10 * g).toFixed(1)}px ${K.rgba(tc[2], 0.5 * g)}` : "none";
        if (box._sh !== sh) {
          box.style.boxShadow = sh;
          box._sh = sh;
        }
      },
    };
  };

  // ---- 4 步轨道 ----
  // 一排 4 格，格上方 STEP 1–4。steps[i] = { a, t, sql, tone, toneT }：a 是 schema / query / finish，
  // 或 none（这一格该查却没查：红粉虚线框，写 NO QUERY）。tone 为 main 的动作签描紫边。
  // up(t, a, tGhost)：tGhost 之后，没用到的格画灰虚线（表示还能用、没用）。
  P.rail = (parent, x, y, w, steps, opts = {}) => {
    const h = opts.h || 136;
    const gap = opts.gap || 36;
    const cw = (w - gap * 3) / 4;
    const sx = (i) => x + i * (cw + gap);
    const ctx = K.canvas(parent, x - 8, y - 8, w + 16, h + 16);
    const nos = [0, 1, 2, 3].map((i) => P.tx(parent, sx(i) + 18, y + 12, `STEP ${i + 1}`, P.MONO20, P.DIM));
    const items = [0, 1, 2, 3].map((i) => {
      const s = steps[i];
      if (!s) return null;
      if (s.a === "none") return { s, none: P.tx(parent, sx(i) + 18, y + 54, "NO QUERY · 没查", '700 24px/30px "HF Mono", "HF Sans", monospace', C.red[1]) };
      const act = P.act(parent, sx(i) + 16, y + 44, s.a, Math.min(260, cw - 32));
      let q = null;
      if (s.sql) {
        q = P.tx(parent, sx(i) + 18, y + 102, s.sql, P.MONO20, C.gray);
        q.style.width = cw - 36 + "px";
        q.style.overflow = "hidden";
        q.style.textOverflow = "ellipsis";
        // 超宽的部分被省略号裁掉了，检查器按全文宽度算会误报和下一格重叠
        q.setAttribute("data-layout-allow-overlap", "");
      }
      return { s, act, q };
    });
    return {
      cw,
      h,
      sx,
      items,
      up(t, a, tGhost = 1e9) {
        ctx.clearRect(0, 0, w + 16, h + 16);
        nos.forEach((e, i) => {
          K.vis(e, a);
          K.col(e, items[i] && t >= items[i].s.t ? C.gray : P.DIM);
        });
        for (const it of items) {
          if (!it) continue;
          if (it.none) {
            K.vis(it.none, a * K.eo(K.prog(t, it.s.t, it.s.t + 0.3)));
            continue;
          }
          it.act.up(t, a, it.s.t, it.s.tone, it.s.toneT == null ? it.s.t : it.s.toneT);
          if (it.q) K.vis(it.q, a * K.prog(t, it.s.t + 0.15, it.s.t + 0.45));
        }
        if (a <= 0.002) return;
        ctx.globalAlpha = a;
        ctx.lineWidth = 1;
        for (let i = 0; i < 4; i++) {
          const it = items[i];
          const bx = sx(i) - x + 8;
          const on = it ? K.eo(K.prog(t, it.s.t, it.s.t + 0.3)) : 0;
          K.rr(ctx, bx + 0.5, 8.5, cw - 1, h - 1, 10);
          if (it && it.none && on > 0) {
            ctx.fillStyle = K.rgba(C.red[0], 0.4 * on);
            ctx.fill();
            ctx.setLineDash([6, 5]);
            ctx.strokeStyle = K.mix("#2a2d33", C.red[1], on);
            ctx.stroke();
            ctx.setLineDash([]);
          } else if (on > 0) {
            ctx.fillStyle = K.rgba("#ffffff", 0.03 * on);
            ctx.fill();
            ctx.strokeStyle = K.mix("#2a2d33", "#4a4f58", on);
            ctx.stroke();
          } else if (!it && t >= tGhost) {
            ctx.setLineDash([6, 5]);
            ctx.strokeStyle = K.mix("#2a2d33", P.GRAY[2], K.eo(K.prog(t, tGhost, tGhost + 0.3)));
            ctx.stroke();
            ctx.setLineDash([]);
          } else {
            ctx.strokeStyle = "#2a2d33";
            ctx.stroke();
          }
          const nx = items[i + 1];
          if (i < 3 && it && nx && t >= nx.s.t - 0.1) {
            const p = K.eo(K.prog(t, nx.s.t - 0.1, nx.s.t + 0.2));
            P.arrow(ctx, bx + cw + 6, 8 + h / 2, bx + cw + 6 + (gap - 12) * p, 8 + h / 2, "#6b707a", 7);
          }
        }
        ctx.globalAlpha = 1;
      },
    };
  };

  // ---- 结果表 ----
  // cols、rows 照 EFA 里的执行结果；数值保留 3 位小数。表头等宽 20 px，格子等宽 22 px。
  // up(t, a, tOn, fx)：fx.red = { cols: [j], t } 整列红粉；fx.rowT[i] 是第 i 行出现的时刻（缺省按 tOn 起每行隔 0.12 秒）；
  // fx.hl(i, j) 返回某格的字色（null 用默认）。
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

  // ---- 电话题卡 ----
  // 琥珀描边（题目是 BIRD 给的）。左上 BIRD · bird-dev:13 · california_schools；英文原题两行，中文一行，evidence 一行等宽小字。
  // hl(key, p) 把 phone / top3 / sat 三个关键词点成琥珀亮档，p 是 0–1。
  P.QH = 244;
  P.qcard = (parent, x, y, w) => {
    const M = EFA.mainTask;
    const pn = K.panel(parent, x, y, w, P.QH, C.amb[1], `BIRD · ${M.id} · ${M.db}`);
    pn.lab.style.color = C.amb[1];
    const kw = { phone: [], top3: [], sat: [] };
    const base = new Map();
    const line = (yy, parts, font, color) => {
      const ln = K.at(K.el("div", "rline", pn.el), 26, yy);
      ln.setAttribute("data-layout-allow-occlusion", "");
      ln.style.font = font;
      ln.style.color = color;
      ln.style.whiteSpace = "normal";
      ln.style.width = w - 52 + "px";
      for (const [s, k] of parts) {
        const sp = K.el("span", "", ln, s);
        if (k) {
          kw[k].push(sp);
          base.set(sp, color);
        }
      }
      return ln;
    };
    line(52, [["Please list the "], ["phone numbers", "phone"], [" of the schools with the "], ["top 3", "top3"], [" "], ["SAT excellence rate", "sat"], ["."]], '500 28px/38px "HF Sans", sans-serif', "#c9c4bb");
    line(134, [["列出 "], ["SAT 优秀率", "sat"], ["前 3", "top3"], [" 的学校的"], ["电话", "phone"]], '700 34px/44px "HF Sans", sans-serif', C.text);
    P.tx(pn.el, 26, 196, "EVIDENCE · " + M.evidence, P.MONO20, C.gray);
    return {
      el: pn.el,
      h: P.QH,
      up: pn.up,
      hl(key, p) {
        for (const sp of kw[key]) {
          const b = base.get(sp);
          K.col(sp, p > 0.002 ? K.mix(b, C.amb[2], p) : b);
          const ts = p > 0.3 ? `0 0 10px ${K.rgba(C.amb[2], 0.35 * p)}` : "none";
          if (sp._ts !== ts) {
            sp.style.textShadow = ts;
            sp._ts = ts;
          }
          const bb = p > 0.002 ? `1px solid ${K.rgba(C.amb[1], p)}` : "1px solid transparent";
          if (sp._bb !== bb) {
            sp.style.borderBottom = bb;
            sp._bb = bb;
          }
        }
      },
    };
  };

  // ---- 区间条 ----
  // d = { m, lo, hi }，单位百分点。轴 [min, max] 映射到宽 w，每 1 点一根 1 px 刻度、每 2 点一个数；0 线贯穿。
  // up(t, a, tOn)：区间从均值往两头长出来，0.45 秒后下界端点发光。
  // lo > 0 整段紫；lo ≤ 0 < m 区间灰白、0 左边那段和下界端点红粉；hi < 0 整段红粉。
  P.ci = (parent, x, y, w, d, opts = {}) => {
    const min = opts.min == null ? -6 : opts.min;
    const max = opts.max == null ? 6 : opts.max;
    const H = 104;
    const PADX = 24;
    const ctx = K.canvas(parent, x - PADX, y - 8, w + 2 * PADX, H + 16);
    const X = (v) => PADX + ((v - min) / (max - min)) * w;
    const BY = 58;
    const mT = P.ctr(parent, x + X(d.m) - PADX, y + 2, P.fs(d.m), '800 40px/44px "HF Mono", "HF Sans", monospace', C.text);
    const bT = P.tx(parent, x + X(d.hi) - PADX + 18, y + BY - 21, `[${P.fs(d.lo)}, ${P.fs(d.hi)}]`, P.MONO24, C.gray);
    const ticks = [];
    for (let v = Math.ceil(min); v <= max; v++) if (v % 2 === 0) ticks.push(P.ctr(parent, x + X(v) - PADX, y + BY + 18, v === 0 ? "0" : P.fs(v, 0), P.MONO20, v === 0 ? C.gray : P.DIM));
    const lowTier = d.lo > 0 ? C.main : C.red;
    const barTier = d.lo > 0 ? C.main : d.hi < 0 ? C.red : null;
    return {
      up(t, a, tOn) {
        ctx.clearRect(0, 0, w + 2 * PADX, H + 16);
        const g = K.eo(K.prog(t, tOn, tOn + 0.45));
        const A = a * K.prog(t, tOn - 0.2, tOn + 0.1);
        K.vis(mT, A);
        K.vis(bT, a * K.prog(t, tOn + 0.3, tOn + 0.6));
        for (const e of ticks) K.vis(e, A);
        if (A <= 0.002) return;
        P.glow(mT, t, tOn, barTier || [C.text, C.text, C.text]);
        K.col(bT, barTier ? barTier[2] : C.gray);
        ctx.globalAlpha = A;
        // 轴和刻度
        ctx.fillStyle = "#2a2d33";
        ctx.fillRect(X(min), 8 + BY, X(max) - X(min), 1);
        for (let v = Math.ceil(min); v <= max; v++) {
          ctx.fillStyle = v === 0 ? "#8a8f98" : "#3a3e46";
          ctx.fillRect(Math.round(X(v)), 8 + BY + 4, 1, v % 2 === 0 ? 8 : 4);
        }
        ctx.fillStyle = "#8a8f98";
        ctx.fillRect(Math.round(X(0)), 8 + BY - 34, 1, 50);
        // 区间
        const lo = K.lerp(d.m, d.lo, g);
        const hi = K.lerp(d.m, d.hi, g);
        const segC = (v0, v1, col) => {
          if (v1 <= v0) return;
          ctx.fillStyle = col;
          ctx.fillRect(X(v0), 8 + BY - 3, X(v1) - X(v0), 6);
        };
        if (barTier) segC(lo, hi, barTier[1]);
        else {
          segC(Math.max(lo, 0), hi, "#c9c4bb");
          segC(lo, Math.min(hi, 0), C.red[1]);
        }
        // 端点
        const cap = (v, col) => {
          ctx.fillStyle = col;
          ctx.fillRect(Math.round(X(v)) - 1, 8 + BY - 12, 2, 24);
        };
        if (g > 0.05) {
          cap(hi, barTier ? barTier[2] : "#c9c4bb");
          const lg = K.prog(t, tOn + 0.45, tOn + 0.75) * (0.55 + 0.45 * (1 - K.prog(t, tOn + 0.75, tOn + 2)));
          ctx.save();
          ctx.shadowColor = lowTier[2];
          ctx.shadowBlur = 14 * lg;
          cap(lo, lowTier[2]);
          ctx.restore();
        }
        // 均值点
        ctx.fillStyle = C.text;
        ctx.beginPath();
        ctx.arc(X(d.m), 8 + BY, 6, 0, 6.283);
        ctx.fill();
        ctx.globalAlpha = 1;
      },
      X: (v) => x + X(v) - PADX,
    };
  };

  // ---- HUD 右上的判定签条 ----
  // 14 张签按版本分组，组上写版本号，右对齐在版本牌下面。P.vShow 起显示（开场第 13 句收进来），之后全片常驻。
  // P.vLight[i] 是第 i 张（从 0 数）点亮的时刻：成立的亮紫，不成立的亮红粉；更差的（区间整段在 0 下面）加向下小箭头。
  // 点亮后签条下面一行读数停 4 秒。P.vGlow 起成立的 5 张发光（收尾用）；P.vHide 起签条淡出（收尾挪到画面中间时用）。
  P.vShow = 1e9;
  P.vHide = 1e9;
  P.vLight = new Array(14).fill(1e9);
  P.vGlow = 1e9;
  P.vWorse = (v) => (v.hi != null ? v.hi < 0 : v.m < 0);
  P.vStatus = (v) => (v.ok ? "成立" : P.vWorse(v) ? "更差" : "不成立");
  P.vNums = (v) => (v.lo == null ? v.note : `${P.fs(v.m)} [${P.fs(v.lo)}, ${P.fs(v.hi)}]`);
  K.hudParts.push((root) => {
    const V = EFA.verdicts;
    const TW = 26;
    const TH = 20;
    const TG = 4;
    const GG = 16;
    const XR = 1856;
    const YL = 120;
    const YT = 148;
    const M = 12;
    const groups = [];
    V.forEach((v, i) => {
      let g = groups[groups.length - 1];
      if (!g || g.v !== v.v) groups.push((g = { v: v.v, ids: [] }));
      g.ids.push(i);
    });
    const slots = [];
    let xr = XR;
    for (let gi = groups.length - 1; gi >= 0; gi--) {
      const g = groups[gi];
      const tagsW = g.ids.length * TW + (g.ids.length - 1) * TG;
      g.w = Math.max(tagsW, g.v.length * 10.8);
      g.x = xr - g.w;
      g.ids.forEach((id, j) => (slots[id] = g.x + (g.w - tagsW) / 2 + j * (TW + TG)));
      xr = g.x - GG;
    }
    const X0 = xr + GG - M;
    const CW = XR - X0 + M;
    const ctx = K.canvas(root, X0, YT - M, CW, TH + 2 * M);
    const HF = '500 18px/22px "HF Mono", "HF Sans", monospace';
    const labs = groups.map((g) => P.ctr(root, g.x + g.w / 2, YL, g.v, HF, "#7a7f88"));
    const call = P.txr(root, XR, YT + TH + 12, "", HF, C.gray);
    P.vSlots = { slots, groups, TW, TH, YT };
    return (t, endFade) => {
      const a = Math.min(K.prog(t, P.vShow, P.vShow + 0.4), 1 - K.prog(t, P.vHide, P.vHide + 0.4)) * endFade;
      for (const e of labs) K.vis(e, a);
      ctx.clearRect(0, 0, CW, TH + 2 * M);
      let last = -1;
      V.forEach((v, i) => {
        if (t >= P.vLight[i] && (last < 0 || P.vLight[i] >= P.vLight[last])) last = i;
      });
      const tl = last >= 0 ? P.vLight[last] : 0;
      const ca = last >= 0 ? Math.min(K.prog(t, tl, tl + 0.3), 1 - K.prog(t, tl + 3.6, tl + 4)) : 0;
      if (ca > 0) {
        const v = V[last];
        K.put(call, `${v.v} · ${v.zh} · ${P.vNums(v)} · ${P.vStatus(v)}`);
        K.col(call, v.ok ? C.main[2] : C.red[2]);
      }
      K.vis(call, a * ca);
      if (a <= 0.002) return;
      ctx.globalAlpha = a;
      ctx.lineWidth = 1;
      V.forEach((v, i) => {
        const x = slots[i] - X0;
        const y = M;
        const p = K.eo(K.prog(t, P.vLight[i], P.vLight[i] + 0.3));
        const tier = v.ok ? C.main : C.red;
        K.rr(ctx, x + 0.5, y + 0.5, TW - 1, TH - 1, 3);
        ctx.fillStyle = p > 0 ? K.mix("#14161b", v.ok ? tier[1] : tier[0], p) : "#14161b";
        ctx.fill();
        ctx.strokeStyle = p > 0 ? K.mix("#2a2d33", tier[1], p) : "#2a2d33";
        ctx.stroke();
        const flash = P.pulse(t, P.vLight[i], 0.1, 0.9);
        const gl = v.ok && t >= P.vGlow ? K.prog(t, P.vGlow, P.vGlow + 0.5) * (0.55 + 0.45 * Math.cos((t - P.vGlow) * 2.4)) : 0;
        const glow = Math.max(flash, gl);
        if (glow > 0.01) {
          ctx.save();
          ctx.shadowColor = tier[2];
          ctx.shadowBlur = 12 * glow;
          ctx.strokeStyle = tier[2];
          ctx.stroke();
          ctx.restore();
        }
        if (P.vWorse(v) && p > 0.5) {
          ctx.fillStyle = C.red[2];
          ctx.beginPath();
          ctx.moveTo(x + TW / 2 - 5, y + 6);
          ctx.lineTo(x + TW / 2 + 5, y + 6);
          ctx.lineTo(x + TW / 2, y + 14);
          ctx.closePath();
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;
    };
  });
})();
