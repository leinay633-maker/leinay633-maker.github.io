// 科普片仪表盘风格的公用件：配色、缓动、按词对时、HUD、字幕、面板、数卡。全部按时间 t 计算，可任意跳帧。
// 从《一行简历》拷来，主色换成紫，系列标换成本片的；右上角是版本牌，牌下的判定签条由 parts.js 挂进 K.hudParts。
(() => {
  const K = (window.K = {});
  const T = () => window.TIMING;
  K.missing = [];
  K.C = {
    bg: "#07080c",
    text: "#ece6dc",
    gray: "#8a8f98",
    dim: "#4a4f58",
    hud: "#5a5f68",
    line: "#1c2028",
    main: ["#3b2a5c", "#a371f7", "#d2a8ff"],
    amb: ["#5a3d1c", "#f0a040", "#ffc27a"],
    red: ["#4a1d2a", "#e5486e", "#ff6b8b"],
  };

  K.clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  K.c01 = (v) => K.clamp(v, 0, 1);
  K.lerp = (a, b, p) => a + (b - a) * p;
  K.prog = (t, a, b) => (b <= a ? (t >= a ? 1 : 0) : K.c01((t - a) / (b - a)));
  K.eo = (p) => 1 - Math.pow(1 - K.c01(p), 3);
  K.eio = (p) => {
    p = K.c01(p);
    return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
  };
  K.back = (p) => {
    p = K.c01(p);
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2);
  };
  K.hash = (a, b = 0) => {
    const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
    return s - Math.floor(s);
  };
  K.hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  K.mix = (a, b, p) => {
    const x = K.hex(a);
    const y = K.hex(b);
    p = K.c01(p);
    return `rgb(${Math.round(x[0] + (y[0] - x[0]) * p)},${Math.round(x[1] + (y[1] - x[1]) * p)},${Math.round(x[2] + (y[2] - x[2]) * p)})`;
  };
  K.mixHex = (a, b, p) => {
    const x = K.hex(a);
    const y = K.hex(b);
    p = K.c01(p);
    return "#" + [0, 1, 2].map((k) => Math.round(x[k] + (y[k] - x[k]) * p).toString(16).padStart(2, "0")).join("");
  };
  K.rgba = (h, a) => {
    const x = K.hex(h);
    return `rgba(${x[0]},${x[1]},${x[2]},${K.c01(a).toFixed(3)})`;
  };
  K.fmt = (v, d = 0) => {
    const [i, f] = v.toFixed(d).split(".");
    return i.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (f ? "." + f : "");
  };
  // 震屏：给定时刻起 dur 秒内的水平位移
  K.shakes = [];
  K.shake = (t0, amp = 6, dur = 0.3) => K.shakes.push({ t0, amp, dur });
  K.shakeAt = (t) => {
    let x = 0;
    for (const s of K.shakes) {
      if (t < s.t0 || t > s.t0 + s.dur) continue;
      const p = (t - s.t0) / s.dur;
      x += s.amp * (1 - p) * Math.sin(p * Math.PI * 7);
    }
    return x;
  };

  // ---- DOM ----
  K.el = (tag, cls, parent, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    if (parent) parent.appendChild(e);
    return e;
  };
  K.at = (e, x, y, w, h) => {
    e.style.left = x + "px";
    e.style.top = y + "px";
    if (w != null) e.style.width = w + "px";
    if (h != null) e.style.height = h + "px";
    return e;
  };
  K.txt = (parent, cls, x, y, text) => {
    const e = K.at(K.el("div", "tx " + cls, parent, text), x, y);
    e.style.visibility = "hidden";
    return e;
  };
  K.put = (e, s) => {
    if (e._s !== s) {
      e.textContent = s;
      e._s = s;
      e._h = null;
    }
  };
  K.html = (e, s) => {
    if (e._h !== s) {
      e.innerHTML = s;
      e._h = s;
      e._s = null;
    }
  };
  K.vis = (e, a) => {
    a = K.c01(a);
    const on = a > 0.002;
    const v = on ? "visible" : "hidden";
    if (e.style.visibility !== v) e.style.visibility = v;
    const o = on ? a.toFixed(3) : "0";
    if (e.style.opacity !== o) e.style.opacity = o;
  };
  K.tf = (e, s) => {
    if (e._tf !== s) {
      e.style.transform = s;
      e._tf = s;
    }
  };
  K.col = (e, c) => {
    if (e._c !== c) {
      e.style.color = c;
      e._c = c;
    }
  };
  K.canvas = (parent, x, y, w, h) => {
    const c = K.at(K.el("canvas", "cv", parent), x, y, w, h);
    c.setAttribute("data-layout-ignore", "");
    c.width = w;
    c.height = h;
    return c.getContext("2d");
  };
  K.rr = (ctx, x, y, w, h, r) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  };

  // ---- 按词对时 ----
  const PUNCT = new Set([..."，。：；、！？,.;:!? "]);
  K.charTimes = {};
  K.seg = (n) => T().segments.find((s) => s.n === n);
  K.chars = (n) => {
    if (K.charTimes[n]) return K.charTimes[n];
    const out = [];
    for (const w of K.seg(n).words) {
      const cs = [...w.text].filter((c) => !PUNCT.has(c));
      const step = (w.t1 - w.t0) / Math.max(cs.length, 1);
      cs.forEach((c, i) => out.push([c.toLowerCase(), w.t0 + step * i]));
    }
    return (K.charTimes[n] = out);
  };
  // 第 n 句里 needle 第 k 次出现时念到的时刻（按送配音的写法找，比如 Deep Infer）
  K.w = (n, needle, k = 1) => {
    const cs = K.chars(n);
    const want = [...needle].filter((c) => !PUNCT.has(c)).map((c) => c.toLowerCase());
    let found = 0;
    for (let i = 0; i + want.length <= cs.length; i++) {
      let ok = true;
      for (let j = 0; j < want.length; j++) {
        if (cs[i + j][0] !== want[j]) {
          ok = false;
          break;
        }
      }
      if (ok && ++found === k) return cs[i][1];
    }
    K.missing.push(`${n}:${needle}`);
    return K.seg(n).t0;
  };

  // ---- 场景注册 ----
  K.scenes = [];
  K.scene = (id, build) => K.scenes.push({ id, build });

  // ---- 文字解码 ----
  const GLYPH = "0123456789%#▓▒░SQLBRT查交筛判对错";
  K.scramble = (text, p, seed) => {
    const chars = [...text];
    const solved = Math.floor(K.c01(p) * (chars.length + 3));
    let s = "";
    for (let i = 0; i < chars.length; i++) {
      if (i < solved - 3 || chars[i] === " ") s += chars[i];
      else if (i < solved) s += GLYPH[Math.floor(K.hash(seed, i * 13.7 + solved) * GLYPH.length)];
    }
    return s;
  };
  // "一天 {155 万亿} token" → 带关键词颜色的 HTML
  K.rich = (text, color) =>
    text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/\{([^}]*)\}/g, (_, k) => `<span class="kw" style="color:${color}">${k}</span>`);
  K.plain = (text) => text.replace(/[{}]/g, "");

  // ---- HUD 和字幕 ----
  // plans:  { t0, t1, chip, chap, lab, tele, titles: [{ t, text, color }] }
  // plates: { t0, t1, text }，右上角版本牌，如 RUN LOG · v0.3 → v0.12；前后相接时只把字解码换掉
  // hudParts: (root) => (t, endFade) => void，常驻 HUD 上的额外部件（判定签条）
  K.plans = [];
  K.plates = [];
  K.hudParts = [];
  K.hud = (si) => {
    const root = K.el("div", "hud", si);
    const bar = K.el("div", "pbar", root);
    const corners = ["tl", "tr", "bl", "br"].map((c) => K.el("div", "crn crn-" + c, root));
    const tl = K.el("div", "tlb", root);
    const row1 = K.el("div", "tl-r1", tl);
    const chip = K.el("span", "chip", row1);
    const chap = K.el("span", "chap", row1);
    const lab = K.el("div", "tl-lab", tl);
    const ttl = K.el("div", "tl-ttl", tl);
    const tag = K.el("div", "tag", root);
    tag.innerHTML = '<span class="dot"></span>EXEC FEEDBACK · 4B SQL AGENT';
    const plate = K.el("div", "plate", root);
    const tele = K.el("div", "tele", root);
    const tc = K.el("div", "tcode", root);
    const extras = K.hudParts.map((b) => b(root));
    const cap = K.el("div", "cap", root);
    const capT = K.el("span", "cap-t", cap);
    const total = T().duration;
    const caps = T().captions;
    return (t) => {
      const endFade = 1 - K.prog(t, total - 0.7, total);
      for (const u of extras) u(t, endFade);
      K.tf(bar, `scaleX(${(t / total).toFixed(5)})`);
      const reg = K.eo(K.prog(t, 0.05, 0.5));
      const arm = 10 + 22 * reg;
      for (const c of corners) {
        c.style.width = c.style.height = arm.toFixed(1) + "px";
        K.vis(c, reg * endFade);
      }
      K.vis(tag, K.prog(t, 0.2, 0.6) * endFade);
      const f = Math.floor(t * 30 + 1e-6);
      K.put(tc, `TC ${String(Math.floor(f / 1800)).padStart(2, "0")}:${String(Math.floor(f / 30) % 60).padStart(2, "0")}:${String(f % 30).padStart(2, "0")}`);
      K.vis(tc, K.prog(t, 0.2, 0.6) * endFade);

      const pl = K.plates.find((r) => t >= r.t0 && t < r.t1);
      if (pl) {
        const contIn = K.plates.some((r) => Math.abs(r.t1 - pl.t0) < 1e-6);
        const contOut = K.plates.some((r) => Math.abs(r.t0 - pl.t1) < 1e-6);
        const p = K.prog(t, pl.t0, pl.t0 + 0.4);
        K.put(plate, contIn && p < 1 ? K.scramble(pl.text, p, Math.floor(t * 30)) : pl.text);
        const aIn = contIn ? 1 : K.prog(t, pl.t0, pl.t0 + 0.3);
        const aOut = contOut ? 1 : 1 - K.prog(t, pl.t1 - 0.25, pl.t1);
        K.vis(plate, Math.min(aIn, aOut) * endFade);
      } else K.vis(plate, 0);

      const plan = K.plans.find((p) => t >= p.t0 && t < p.t1);
      if (!plan) {
        K.vis(tl, 0);
        K.vis(tele, 0);
      } else {
        const a = Math.min(K.prog(t, plan.t0, plan.t0 + 0.3), 1 - K.prog(t, plan.t1 - 0.25, plan.t1)) * endFade;
        K.vis(tl, a);
        K.vis(tele, a);
        K.put(chip, plan.chip);
        K.put(chap, plan.chap);
        K.put(lab, plan.lab);
        K.put(tele, typeof plan.tele === "function" ? plan.tele(t) : plan.tele);
        let i = -1;
        for (let k = 0; k < plan.titles.length; k++) if (t >= plan.titles[k].t) i = k;
        if (i < 0) K.put(ttl, "");
        else {
          const ti = plan.titles[i];
          const p = K.prog(t, ti.t, ti.t + 0.42);
          if (p < 1) {
            K.put(ttl, K.scramble(K.plain(ti.text), p, Math.floor(t * 30)));
            K.col(ttl, K.C.text);
          } else {
            K.html(ttl, K.rich(ti.text, ti.color || K.C.main[2]));
            K.col(ttl, K.C.text);
          }
        }
      }

      let cur = null;
      for (const c of caps) if (c.t0 <= t && t < c.t1) cur = c;
      if (cur) {
        K.put(capT, cur.text);
        K.vis(cap, Math.min(K.prog(t, cur.t0, cur.t0 + 0.06), 1 - K.prog(t, cur.t1 - 0.06, cur.t1)) * endFade);
      } else K.vis(cap, 0);
    };
  };

  // ---- 面板 ----
  K.panel = (parent, x, y, w, h, accent, label) => {
    const p = K.at(K.el("div", "pnl", parent), x, y, w, h);
    p.style.borderColor = K.rgba(accent, 0.55);
    // 面板上方压着透明的画布（游标、高亮带），检查器把画布当不透明，这里声明是有意叠放
    p.setAttribute("data-layout-allow-occlusion", "");
    p.style.visibility = "hidden";
    const corners = ["tl", "tr", "bl", "br"].map((c) => {
      const e = K.el("div", "pc pc-" + c, p);
      e.style.borderColor = accent;
      return e;
    });
    const lab = label ? K.el("div", "pl", p, label) : null;
    return {
      el: p,
      lab,
      // 返回当前不透明度；t1 之后用 out 秒淡出，mult 用来降成背景虚影，dy、dx 是整块挪动的距离
      up(t, t0, t1 = 1e9, out = 0.35, mult = 1, dy = 0, dx = 0) {
        const pin = K.prog(t, t0, t0 + 0.35);
        const a = Math.min(K.eo(pin), 1 - K.prog(t, t1, t1 + out)) * mult;
        K.vis(p, a);
        const mv = Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05 ? `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) ` : "";
        K.tf(p, mv + `scale(${(0.985 + 0.015 * K.eo(pin)).toFixed(4)})`);
        const arm = 8 + 20 * K.eo(K.prog(t, t0 + 0.08, t0 + 0.5));
        for (const c of corners) c.style.width = c.style.height = arm.toFixed(1) + "px";
        return a;
      },
    };
  };

  // 数字从 from 滚到 to
  K.roll = (t, t0, dur, from, to, d = 0) => K.fmt(K.lerp(from, to, K.eo(K.prog(t, t0, t0 + dur))), d);

  // 大数字：tOn 前暗档，之后亮档加一阵微光
  K.bigNum = (el, t, tOn, tier, text) => {
    const lit = K.eo(K.prog(t, tOn, tOn + 0.3));
    K.put(el, text);
    K.col(el, K.mix(tier[0], tier[2], lit));
    const glow = lit * (0.35 + 0.65 * (1 - K.prog(t, tOn + 0.3, tOn + 1.4)));
    el.style.textShadow = glow > 0.02 ? `0 0 ${(6 + 16 * glow).toFixed(1)}px ${K.rgba(tier[2], 0.25 + 0.4 * glow)}` : "none";
  };

  // 卡片里的一行：左边说明，右边数值。tOn 之前暗着，之后点亮
  K.row = (parent, x, y, w, left, right, tier) => {
    const r = K.at(K.el("div", "crow", parent), x, y, w);
    const l = K.el("span", "crow-l", r, left);
    const v = K.el("span", "crow-v", r, right);
    return {
      el: r,
      l,
      v,
      up(t, tOn, aParent = 1) {
        const p = K.eo(K.prog(t, tOn, tOn + 0.3));
        K.col(l, K.mix("#5a5f67", K.C.text, p));
        // K.mix 出来的是 rgb() 串，不能再喂给 K.mix，暗档先算成 hex
        K.col(v, K.mix(K.mixHex(tier[0], tier[1], 0.4), tier[2], p));
        v.style.textShadow = p > 0.5 ? `0 0 ${(10 * (1 - K.prog(t, tOn + 0.3, tOn + 1.2))).toFixed(1)}px ${K.rgba(tier[2], 0.6)}` : "none";
        K.vis(r, aParent);
      },
    };
  };
})();
