// 第 4 章：信号在哪。组阵只表达组状态，不臆造单条奖励；所有状态由绝对时间计算。
K.scene("s4", (si, win) => {
  const C = K.C, S = EFA.signal, V9 = EFA.k.v09, V10 = EFA.k.v10, V11 = EFA.k.v11;
  const NG = V9.groups, NP = V9.perGroup, NQ = EFA.k.v05.pool;
  const MONO = P.mono, SANS = P.sans;
  const L = (n) => K.seg(n).t0 - 0.08;
  const at = (n, s, k = 1) => K.w(n, s, k) - 0.08;
  const T = {};
  for (let n = 71; n <= 89; n++) T[n] = L(n);
  const W = {
    rloo: at(71, "RLOO"),
    n16: at(72, "16"), n8: at(72, "8"), one: at(72, "记1"), zero: at(72, "0"),
    peer: at(73, "另外7条"), mean: at(73, "平均"), up: at(73, "加强"), down: at(73, "压低"),
    n8b: at(74, "8条"), allC: at(74, "全对"), allF: at(74, "全错"), no: at(74, "没有信号"),
    p16: at(75, "16%"), p19: at(75, "19%"),
    m14: at(76, "1.4"), lower: at(76, "下界"), lo01: at(76, "负0.1"), fail: at(76, "没过线"),
    notUse: at(77, "不再"), small: at(77, "少量"), lora: at(77, "Lora"), adapter: at(77, "附加参数"), full: at(77, "更新全部参数"),
    sample4: at(78, "4张"), train4: at(78, "4张", 2), m42: at(78, "4.2"), below: at(78, "零下面"),
    lr: at(79, "学习率"), single: at(79, "一个值"), blame: at(79, "不能全怪"),
    two: at(80, "两个模型"), noquery: at(80, "没查数据"), finish: at(80, "提交"), preview: at(80, "结果"), revise: at(80, "再改"),
    habit: at(81, "先查再交"), gone: at(81, "训没了"),
    back: at(82, "回到Lora"), only: at(82, "只换了训练题"),
    eight: at(83, "8"), from1: at(83, "1"), to7: at(83, "7"), boundary: at(83, "边界题"), quarter: at(83, "四分之一"),
    pre: at(84, "预采样"), pick: at(84, "挑题"), train: at(84, "训练时"), fresh: at(84, "再做一组"), mix: at(84, "有对有错"), dense: at(84, "密了"),
    boundOnly: at(85, "边界题"), n200: at(85, "200步"), p45: at(85, "45%"), p49: at(85, "49%"),
    m26: at(86, "2.6"), lo07: at(86, "0.7"), pass: at(86, "过线了"),
    ordinary: at(87, "普通"), online: at(87, "在线"), better: at(87, "更好"), notHold: at(87, "没成立"),
    n400: at(88, "400步"), explore: at(88, "探索"), m09: at(88, "0.9"), cross: at(88, "跨零"),
    last: at(89, "最后"), twoTenths: at(89, "两成"),
  };
  P.vLight[6] = W.lo01; P.vLight[7] = W.lo01; P.vLight[8] = W.below;
  P.vLight[9] = T[79]; P.vLight[10] = W.pass; P.vLight[11] = W.notHold;
  K.plans.push({
    t0: win.t0, t1: win.t1, chip: "04", chap: "信号在哪", lab: "WHERE THE SIGNAL IS · v0.9 → v0.11",
    tele: (t) => t < T[75] ? "▸ RLOO · 16 TASKS × 8 SAMPLES · LEAVE-ONE-OUT BASELINE"
      : t < T[77] ? "▸ v0.9 · SIGNAL 16–19% · PROJECT +1.4 [−0.1, +2.8]"
      : t < T[80] ? "▸ v0.10 · 4 SAMPLE / 4 TRAIN · FULL − LORA −4.2"
      : t < T[82] ? "▸ v0.10 · QUERY MISSING · FINISH → RESULT PREVIEW → REVISE"
      : t < T[85] ? "▸ v0.11 · 6,682 × 8 PRE-SAMPLES · KEEP TASKS WITH 1–7 CORRECT"
      : t < T[88] ? "▸ RLOO 16 × 8 · SIGNAL 45–49% · +2.6 [+0.7, +4.7]"
      : "▸ EXPLORATORY · 200 → 400 STEPS · +0.9 [−0.4, +2.2]",
    titles: [
      { t: T[71], text: "在线强化学习：{RLOO}" },
      { t: T[72], text: "{16} 组，每组 {8} 条" },
      { t: T[73], text: "和{同组平均}比" },
      { t: T[74], text: "全对或全错，{没有信号}", color: C.red[2] },
      { t: T[75], text: "有信号的组，只有 {16–19%}" },
      { t: T[76], text: "均值涨了，{还没过线}", color: C.red[2] },
      { t: T[77], text: "LoRA → {全参数}" },
      { t: T[78], text: "整个区间都在{零下面}", color: C.red[2] },
      { t: T[79], text: "学习率{只试了一个值}", color: C.gray },
      { t: T[80], text: "两个模型，{都没查}", color: C.red[2] },
      { t: T[81], text: "先查再交，{又训没了}", color: C.red[2] },
      { t: T[82], text: "回到 LoRA，{只换训练题}" },
      { t: T[83], text: "留下{边界题}" },
      { t: T[84], text: "预采样挑题，{训练再采样}" },
      { t: T[85], text: "信号密到 {45–49%}" },
      { t: T[86], text: "比离线起点高，{过线了}" },
      { t: T[87], text: "比普通 RL 更好？{未成立}", color: C.red[2] },
      { t: T[88], text: "续训这段，{只算探索}", color: C.gray },
      { t: T[89], text: "到最后，只剩{两成左右}", color: C.gray },
    ],
  });
  K.plates.push({ t0: win.t0, t1: win.t1, text: "v0.9 → v0.11" });
  const pOn = (t, t0, d = 0.3) => K.prog(t, t0, t0 + d);
  const flash = (t, on, dur = 0.7) => Math.min(K.prog(t, on, on + 0.1), 1 - K.prog(t, on + dur - 0.2, on + dur));
  const pane = (p, t, a, b, mult = 1) => {
    p.up(t, a, b - 0.28, 0.28, mult);
    const v = P.win(t, a, b - 0.28, 0.3, 0.28) * mult;
    K.vis(p.el, v); return v;
  };
  const show = (e, a, t, t0, d = 0.3) => K.vis(e, a * pOn(t, t0, d));
  const text = (x, y, s, f = SANS(28), c = C.text) => P.tx(si, x, y, s, f, c);
  const big = (x, y, s, c = C.text) => text(x, y, s, MONO(96), c);
  const tickFont = '500 20px "HF Mono", "HF Sans", monospace';
  const quietPurple = K.mixHex(C.main[0], C.main[1], 0.4);
  const seedColors = [K.mixHex(C.main[0], C.main[1], 0.65), C.main[1], C.main[2]];
  const graySeeds = ["#69717d", "#9aa1ab", "#c9c4bb"];
  const pctRange = (v) => `${Math.round(Math.min(...v))}–${Math.round(Math.max(...v))}%`;
  const pctLine = (v) => v.map((x) => x.toFixed(1)).join(" / ") + "%";
  const ciText = (d) => `[${P.fs(d.lo)}, ${P.fs(d.hi)}]`;
  const lastPct = S.RLb.map((r) => r.slice(-20).reduce((a, v) => a + v, 0) / 20 / NG * 100);
  // 20 步尾随均值；不足 20 步时只用已经发生的训练步。
  const smooth = (r) => r.map((_, i) => {
    const lo = Math.max(0, i - 19); let sum = 0;
    for (let j = lo; j <= i; j++) sum += r[j];
    return sum / (i - lo + 1) / NG;
  });
  const curves9 = S.RL9.map(smooth), curvesB = S.RLb.map(smooth);
  // 组的顺序重排，只从 example 取三种状态的真实数量。
  const groups = (ctx, t, ex, a, z, cfg = {}) => {
    if (a <= 0.002) return;
    const baseX = cfg.x == null ? 176 : cfg.x, dxSmall = cfg.dxSmall || 120, ySmall = cfg.ySmall || 328;
    const on = cfg.on == null ? W.n8 : cfg.on;
    const lit = pOn(t, on, 0.7), countLit = pOn(t, cfg.countOn == null ? W.n16 : cfg.countOn, 0.45);
    const scan = ((Math.max(0, t - on) / 2.6) % 1) * NG;
    ctx.save(); ctx.font = tickFont; ctx.textBaseline = "top"; ctx.lineWidth = 1;
    for (let i = 0; i < NG; i++) {
      const x = K.lerp(baseX + (i % 4) * 242, baseX + (i % 8) * dxSmall, z);
      const y = K.lerp(354 + Math.floor(i / 4) * 118, ySmall + Math.floor(i / 8) * 94, z);
      const gw = K.lerp(226, dxSmall - 12, z), gh = K.lerp(94, 76, z);
      const cell = K.lerp(18, 9, z), pitch = K.lerp(25, Math.min(12, (dxSmall - 24) / NP), z);
      const state = i < ex.inf ? "inf" : i < ex.inf + ex.allC ? "allC" : "allF";
      const reveal = lit * K.eo(K.c01(countLit * NG - i));
      const noSignal = cfg.noSignal ? pOn(t, cfg.noSignal, 0.4) : 0;
      const focus = state === "inf" ? 1 : 1 - 0.6 * noSignal;
      ctx.globalAlpha = a;
      ctx.strokeStyle = state === "inf" ? K.mix("#2a2d33", C.main[1], reveal) : "#33373f";
      K.rr(ctx, x + 0.5, y + 0.5, gw, gh, 7); ctx.stroke();
      ctx.fillStyle = C.gray; ctx.fillText(String(i + 1).padStart(2, "0"), x + 8, y + 8);
      if (noSignal > 0 && state !== "inf") {
        ctx.globalAlpha = a * noSignal; ctx.fillStyle = C.gray; ctx.textAlign = "right";
        ctx.fillText("A=0", x + gw - 8, y + 8); ctx.textAlign = "left";
      }
      ctx.globalAlpha = a * focus;
      for (let j = 0; j < NP; j++) {
        const cx = x + 8 + j * pitch, cy = y + K.lerp(49, 43, z);
        ctx.fillStyle = state === "allC" ? K.mix("#1c1f26", C.main[1], reveal)
          : state === "inf" ? K.mix("#1c1f26", quietPurple, reveal) : "#1c1f26";
        ctx.fillRect(cx, cy, cell, cell);
        if (state === "inf" && reveal > 0) {
          ctx.save(); ctx.beginPath(); ctx.rect(cx, cy, cell, cell); ctx.clip();
          ctx.strokeStyle = K.rgba(C.main[2], 0.7 * reveal); ctx.lineWidth = 1;
          for (let k = -cell; k < cell * 2; k += 5) {
            ctx.beginPath(); ctx.moveTo(cx + k, cy + cell); ctx.lineTo(cx + k + cell, cy); ctx.stroke();
          }
          ctx.restore();
        }
      }
      if (Math.abs(scan - i - 0.5) < 0.7 && lit > 0) {
        ctx.globalAlpha = a * 0.45 * (1 - Math.abs(scan - i - 0.5) / 0.7);
        ctx.fillStyle = state === "inf" ? C.main[2] : C.gray; ctx.fillRect(x + 8, y + gh - 8, gw - 16, 1);
      }
    }
    ctx.restore();
  };
  // P.ci 自动把跨零下界染红；这里独立画，使探索段的全部区间保持灰色。
  const interval = (ctx, x, y, w, d, a, t, on, opts = {}) => {
    if (a <= 0.002) return;
    const min = opts.min == null ? -2 : opts.min, max = opts.max == null ? 6 : opts.max;
    const X = (v) => x + (v - min) / (max - min) * w, g = K.eo(pOn(t, on, 0.55));
    ctx.save(); ctx.globalAlpha = a; ctx.lineWidth = 1; ctx.fillStyle = "#33373f"; ctx.fillRect(x, y, w, 1);
    ctx.font = tickFont; ctx.textBaseline = "top"; ctx.textAlign = "center";
    for (let v = Math.ceil(min); v <= max; v++) {
      ctx.fillStyle = v === 0 ? C.gray : "#454b55"; ctx.fillRect(Math.round(X(v)), y + 5, 1, 6);
      if (opts.ticks && (v === 0 || v % 2 === 0)) ctx.fillText(v === 0 ? "0" : P.fs(v, 0), X(v), y + 16);
    }
    ctx.fillStyle = C.gray; ctx.fillRect(Math.round(X(0)), y - 24, 1, 43);
    if (!opts.ticks) ctx.fillText("0", X(0), y + 15);
    if (g > 0) {
      const lo = K.lerp(d.m, d.lo, g), hi = K.lerp(d.m, d.hi, g);
      const whole = opts.gray ? "#9aa1ab" : d.lo > 0 ? C.main[1] : d.hi < 0 ? C.red[1] : "#c9c4bb";
      ctx.fillStyle = whole; ctx.fillRect(X(lo), y - 2, X(hi) - X(lo), 4);
      if (!opts.gray && lo < 0 && hi > 0) { ctx.fillStyle = C.red[1]; ctx.fillRect(X(lo), y - 2, X(0) - X(lo), 4); }
      const lowC = opts.gray ? C.gray : d.lo > 0 ? C.main[2] : C.red[2];
      ctx.fillStyle = lowC; ctx.shadowColor = lowC; ctx.shadowBlur = opts.gray ? 0 : 10 * pOn(t, opts.lowOn == null ? on + 0.5 : opts.lowOn);
      ctx.fillRect(Math.round(X(lo)) - 1, y - 11, 2, 22); ctx.shadowBlur = 0;
      ctx.fillStyle = opts.gray ? C.gray : d.hi < 0 ? C.red[2] : d.lo > 0 ? C.main[2] : C.gray;
      ctx.fillRect(Math.round(X(hi)) - 1, y - 9, 2, 18);
      ctx.fillStyle = C.text; ctx.beginPath(); ctx.arc(X(d.m), y, 5, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  };
  const curve = (ctx, t, a, plot, cfg) => {
    if (a <= 0.002) return;
    const { x, y, w, h } = plot, max = cfg.max || 200;
    const X = (step) => x + step / max * w, Y = (p) => y + (1 - p) * h;
    ctx.save(); ctx.globalAlpha = a; ctx.lineWidth = 1; ctx.font = tickFont; ctx.textBaseline = "middle";
    [0, 0.5, 1].forEach((v) => {
      ctx.fillStyle = "#242831"; ctx.fillRect(x, Y(v), w, 1); ctx.fillStyle = C.gray;
      ctx.textAlign = "right"; ctx.fillText(`${Math.round(v * 100)}%`, x - 16, Y(v));
    });
    ctx.textAlign = "center";
    [0, 100, 200, 300, 400].filter((s) => s <= max + 0.1).forEach((s) => {
      ctx.fillStyle = "#454b55"; ctx.fillRect(X(s), y + h, 1, 8);
      ctx.fillStyle = C.gray; ctx.fillText(String(s), X(s), y + h + 23);
    });
    if (cfg.ext > 0) {
      ctx.globalAlpha = a * cfg.ext;
      P.dashRect(ctx, X(200) + 1, y - 10, Math.max(1, X(max) - X(200) - 1), h + 20, P.GRAY[1], 5);
      ctx.globalAlpha = a;
    }
    const draw = (rows, cols, n, mult, focus = 0) => rows.forEach((row, k) => {
      const count = Math.min(row.length, Math.floor(n)); if (!count) return;
      ctx.save(); ctx.beginPath(); ctx.rect(x, y - 1, w + 1, h + 2); ctx.clip();
      ctx.globalAlpha = Math.max(a * mult, 0.95 * focus); ctx.strokeStyle = cols[k]; ctx.lineWidth = 1.4 + 4.6 * focus; ctx.beginPath();
      for (let i = 0; i < count; i++) {
        if (i === 0) ctx.moveTo(X(i + 1), Y(row[i])); else ctx.lineTo(X(i + 1), Y(row[i]));
      }
      ctx.stroke(); ctx.fillStyle = cols[k]; ctx.beginPath(); ctx.arc(X(count), Y(row[count - 1]), 3.2, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    });
    draw(curves9, graySeeds, cfg.n9, cfg.rl9A == null ? 1 : cfg.rl9A, cfg.rl9Flash || 0);
    if (cfg.nb > 0) draw(curvesB, cfg.ext > 0 ? graySeeds : seedColors, cfg.nb, 1);
    const cursor = (Math.max(0, t - cfg.start) % 3.1) / 3.1;
    ctx.globalAlpha = a * 0.35; ctx.fillStyle = C.gray; ctx.fillRect(x + w * cursor, y, 1, h);
    if (cfg.tail > 0) { ctx.globalAlpha = a * cfg.tail; P.dashRect(ctx, X(380), y + h * 0.68, X(400) - X(380), h * 0.32 + 2, C.gray, 3); }
    ctx.restore();
  };
  // A · 同题 8 次 → 全对/全错没有信号 → v0.9 曲线和跨零区间。
  const pGA = K.panel(si, 140, 230, 1020, 630, P.GRAY[2], "RLOO · 同题一组");
  const pRA = K.panel(si, 1200, 230, 580, 630, P.GRAY[2], "REWARD · 组内相对奖励");
  const pCA = K.panel(si, 140, 560, 1020, 300, P.GRAY[2], "SIGNAL · 有信号的组 / 16");
  const cvA = P.layer(si);
  const gaHead = text(176, 282, "同题一组", SANS(42));
  const gaMeta = P.txr(si, 1128, 294, `第 ${S.example.RL9.step} 步 · 状态重排`, P.MONO20, C.gray);
  const gaLegend = text(176, 818, `${S.example.RL9.inf} 有信号 / ${S.example.RL9.allC} 全对 / ${S.example.RL9.allF} 全错`, P.MONO20, C.gray);
  const raHead = text(1236, 286, "组内相对奖励", SANS(42));
  const rloo = big(1236, 366, "RLOO"), batch = big(1236, 356, `${NG} × ${NP}`);
  const r1 = text(1236, 496, "1", MONO(72), C.main[2]), r1l = text(1320, 520, "做对", SANS(28));
  const r0 = text(1508, 496, "0", MONO(72), C.red[2]), r0l = text(1592, 520, "做错", SANS(28));
  const fa = text(1236, 622, "A = 自己的奖励", MONO(24, 500), C.gray);
  const fb = text(1236, 660, `  − 同组另外 ${NP - 1} 条的平均`, MONO(24, 500), C.gray);
  const posA = text(1236, 726, "A > 0 · 加强", MONO(28, 600), P.DIM);
  const negA = text(1236, 778, "A < 0 · 压低", MONO(28, 600), P.DIM);
  const noA = text(1236, 742, "全对 / 全错 → A = 0", MONO(28, 600), C.text);
  const sigA = big(1236, 354, pctRange(S.pct.RL9));
  const sigSeedsA = text(1236, 472, pctLine(S.pct.RL9), P.MONO20, C.gray);
  const sigMetaA = text(1236, 512, "前 200 步 · 三个种子", P.MONO24, C.gray);
  const ciLabA = text(1236, 484, "PROJECT · 项目判分 · RL − 离线起点", P.MONO20, C.gray);
  const ciMeanA = big(1236, 530, P.fs(V9.rlMinusPtr.m));
  const ciRangeA = text(1236, 750, ciText(V9.rlMinusPtr), MONO(24, 500), C.gray);
  const ciLowA = text(1236, 794, `下界 ${P.fs(V9.rlMinusPtr.lo)} · 未过线`, SANS(28), C.red[2]);
  const caTitle = text(176, 602, "信号占比", SANS(40));
  const caMeta = P.txr(si, 1128, 586, "20-STEP MEAN · 训练步 →", P.MONO20, C.gray);
  const upA = (t) => {
    const old = K.lerp(1, 0.22, pOn(t, T[76], 0.5));
    const a = pane(pGA, t, win.t0, T[77], old), ar = pane(pRA, t, win.t0, T[77]), ac = pane(pCA, t, T[75] + 0.55, T[77], old);
    const z = K.eio(pOn(t, T[75] + 0.08, 0.42)); pGA.el.style.height = K.lerp(630, 300, z).toFixed(2) + "px";
    K.vis(gaHead, a); K.vis(gaMeta, a);
    K.put(gaHead, t < W.n16 ? "同题一组" : t < W.n8 ? `${NG} 道题` : `${NG} 组 × ${NP} 条`);
    gaHead.style.font = t < W.n16 ? SANS(42) : MONO(40, 700);
    K.at(gaHead, 176, K.lerp(282, 276, z)); K.at(gaMeta, 1128, K.lerp(294, 288, z));
    K.at(gaLegend, 176, K.lerp(818, 506, z)); show(gaLegend, a, t, W.n8, 0.5);
    K.vis(raHead, ar); K.put(raHead, t < T[75] ? "组内相对奖励" : "有信号的组");
    K.vis(rloo, ar * pOn(t, W.rloo) * (1 - pOn(t, W.n16, 0.25)));
    const mech = ar * (1 - pOn(t, T[75] - 0.2, 0.2));
    show(batch, mech, t, W.n16); K.put(batch, t < W.n8 ? `${NG} 题` : `${NG} × ${NP}`);
    show(r1, mech, t, W.one); show(r1l, mech, t, W.one); show(r0, mech, t, W.zero); show(r0l, mech, t, W.zero);
    P.glow(r1, t, W.one, C.main); P.glow(r0, t, W.zero, C.red);
    show(fa, mech, t, T[73]); show(fb, mech, t, W.peer);
    const meanFlash = flash(t, W.mean);
    K.col(fb, K.mix(C.gray, C.text, meanFlash));
    const az = mech * (1 - pOn(t, W.no - 0.15, 0.15));
    show(posA, az, t, W.up); show(negA, az, t, W.down);
    K.col(posA, P.lightCol(t, W.up, C.main[2])); K.col(negA, P.lightCol(t, W.down, C.red[2])); show(noA, mech, t, W.no);
    const result = ar * pOn(t, T[75]), zCI = K.eio(pOn(t, T[76], 0.5));
    show(sigA, result, t, W.p16); K.put(sigA, t < W.p19 ? `${Math.round(Math.min(...S.pct.RL9))}%` : pctRange(S.pct.RL9));
    sigA.style.font = MONO(K.lerp(96, 60, zCI)); K.at(sigA, 1236, K.lerp(354, 350, zCI));
    K.at(sigSeedsA, 1236, K.lerp(472, 428, zCI)); show(sigSeedsA, result, t, W.p19);
    K.vis(sigMetaA, result * (1 - zCI)); show(ciLabA, result, t, T[76]); show(ciMeanA, result, t, W.m14);
    show(ciRangeA, result, t, W.m14 + 0.3); show(ciLowA, result, t, W.lo01); K.col(ciMeanA, C.text);
    K.vis(caTitle, ac); K.vis(caMeta, ac);
    if (!cvA.begin(Math.max(a, ar, ac))) return;
    const ctx = cvA.ctx;
    // 先淡掉 4×4 排布，再淡入 8×2；直接插值坐标会让组框在重排途中相撞。
    if (t < T[75] + 0.2) groups(ctx, t, S.example.RL9, a * (1 - pOn(t, T[75], 0.18)), 0, { noSignal: W.no });
    else groups(ctx, t, S.example.RL9, a * pOn(t, T[75] + 0.26, 0.24), 1, { noSignal: W.no });
    interval(ctx, 1236, 702, 508, V9.rlMinusPtr, result, t, W.m14, { min: -1, max: 4, ticks: true, lowOn: W.lo01 });
    curve(ctx, t, ac, { x: 248, y: 664, w: 840, h: 124 }, { n9: 200 * pOn(t, T[75] + 0.55, 2.4), start: T[75] + 0.55 });
    ctx.save(); ctx.globalAlpha = mech;
    const peerFlash = flash(t, W.peer, 0.8);
    ctx.fillStyle = K.rgba(C.main[2], 0.48 * peerFlash); ctx.fillRect(205, 392, 176, 42);
    for (let peerIndex = 1; peerIndex < NP; peerIndex++) {
      ctx.fillStyle = K.rgba(C.main[2], 0.85 * flash(t, W.peer + (peerIndex - 1) * 0.07, 0.5));
      ctx.fillRect(184 + peerIndex * 25, 403, 18, 18);
    }
    ctx.fillStyle = K.rgba(C.main[2], 0.4 * meanFlash); ctx.fillRect(205, 384, 176, 16);
    ctx.fillStyle = K.rgba(C.main[1], meanFlash); ctx.fillRect(205, 388, 176, 3);
    ctx.fillStyle = K.rgba(C.main[1], 0.5 * meanFlash); ctx.fillRect(1230, 654, 508, 44);
    ctx.globalAlpha = result;
    const lowFocus = flash(t, W.lower), lowX = 1236 + (V9.rlMinusPtr.lo + 1) / 5 * 508, zeroX = 1236 + 508 / 5;
    ctx.fillStyle = K.rgba(C.red[2], 0.4 * lowFocus); ctx.fillRect(lowX - 42, 670, 84, 64);
    ctx.fillStyle = K.rgba(C.text, 0.85 * lowFocus); ctx.fillRect(zeroX - 2, 676, 4, 50);
    ctx.fillStyle = K.rgba(C.red[2], lowFocus); ctx.beginPath(); ctx.arc(lowX, 702, 6 + 14 * lowFocus, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = K.rgba(C.red[1], 0.4 * flash(t, W.fail)); ctx.fillRect(1230, 788, 508, 48);
    ctx.restore();
    if (a > 0 && t >= W.allC && t < T[75]) {
      ctx.save(); ctx.globalAlpha = a;
      [W.allC, W.allF].forEach((tt, k) => {
        const p = P.pulse(t, tt, 0.15, 1.2); if (p <= 0) return;
        const first = k === 0 ? S.example.RL9.inf : S.example.RL9.inf + S.example.RL9.allC;
        const count = k === 0 ? S.example.RL9.allC : S.example.RL9.allF;
        for (let i = first; i < first + count; i++) {
          ctx.strokeStyle = K.rgba(C.text, 0.65 * p); ctx.strokeRect(176 + (i % 4) * 242 + 0.5, 354 + Math.floor(i / 4) * 118 + 0.5, 226, 94);
        }
      }); ctx.restore();
    }
  };
  // B · 参数结构与 4+4 卡，下面留出正式比较的区间。
  const pMB = K.panel(si, 140, 230, 740, 410, P.GRAY[2], "PARAMETERS · 更新范围");
  const pGB = K.panel(si, 920, 230, 860, 410, P.GRAY[2], "ASYNC · 采样 / 训练");
  const pIB = K.panel(si, 140, 670, 1640, 190, P.GRAY[2], "PROJECT · 项目判分 · 全参数 − LoRA");
  const cvB = P.layer(si);
  const loraB = text(176, 294, "LoRA", SANS(42)), fullB = text(552, 294, "全参数", SANS(42));
  const matrixTag = text(176, 604, "ILLUSTRATIVE · 参数结构示意", P.MONO20, C.gray);
  const lrL = text(176, 550, `LoRA · ${V10.lrLora}`, P.MONO24, C.gray), lrF = text(552, 550, `全参数 · ${V10.lrFull}`, P.MONO24, C.gray);
  const lrNote = text(176, 586, "学习率只试了一个值", SANS(26));
  const sampleN = text(956, 294, "4 × 采样", MONO(40, 700)), trainN = text(956, 466, "4 × 训练", MONO(40, 700));
  const gpuCards = Array.from({ length: 8 }, (_, i) => {
    const x = 956 + (i % 4) * 198, y = i < 4 ? 358 : 530;
    return { x, y, tt: i < 4 ? W.sample4 : W.train4,
      name: text(x + 20, y + 24, i < 4 ? "采样" : "训练", SANS(28), P.DIM),
      id: P.txr(si, x + 160, y + 8, String(i + 1).padStart(2, "0"), P.MONO20, C.gray) };
  });
  const bMean = big(176, 728, P.fs(V10.rlfMinusRl.m), C.red[2]);
  const bRange = text(628, 800, ciText(V10.rlfMinusRl), P.MONO24, C.gray);
  const bWait = text(176, 744, "全参数 − LoRA", SANS(40), P.DIM), bBelow = P.txr(si, 1744, 800, "整个区间 < 0", P.MONO24, C.red[2]);
  const upB = (t) => {
    const a = pane(pMB, t, T[77], T[80]), ag = pane(pGB, t, T[77], T[80]), ai = pane(pIB, t, T[77] + 0.2, T[80]);
    K.vis(loraB, a); K.vis(fullB, a); K.col(loraB, P.lightCol(t, W.adapter, C.text)); K.col(fullB, P.lightCol(t, W.full, C.text));
    const replaceFlash = flash(t, W.notUse), adapterFlash = flash(t, W.small, 0.8), loraDim = flash(t, W.lora);
    K.vis(loraB, a * (1 - 0.6 * loraDim));
    if (replaceFlash > 0) K.col(loraB, K.mix(P.DIM, C.text, replaceFlash));
    K.vis(matrixTag, a * (1 - pOn(t, W.lr))); show(lrL, a, t, W.lr); show(lrF, a, t, W.lr); show(lrNote, a, t, W.single);
    K.vis(sampleN, ag); K.vis(trainN, ag); K.col(sampleN, P.lightCol(t, W.sample4, C.text)); K.col(trainN, P.lightCol(t, W.train4, C.text));
    gpuCards.forEach((c, i) => { K.vis(c.name, ag); K.vis(c.id, ag); K.col(c.name, P.lightCol(t, c.tt + (i % 4) * 0.07, C.text)); });
    K.vis(bWait, ai * (1 - pOn(t, W.m42, 0.2))); show(bMean, ai, t, W.m42); show(bRange, ai, t, W.m42 + 0.3); show(bBelow, ai, t, W.below); P.glow(bMean, t, W.m42, C.red);
    if (!cvB.begin(Math.max(a, ag, ai))) return;
    const ctx = cvB.ctx; ctx.save(); ctx.globalAlpha = a; ctx.lineWidth = 1;
    ctx.fillStyle = K.rgba(C.gray, 0.5 * replaceFlash); ctx.fillRect(168, 288, 292, 60);
    ctx.fillStyle = K.rgba(C.main[2], 0.55 * adapterFlash); ctx.fillRect(438, 366, 38, 164);
    [176, 552].forEach((x, full) => {
      ctx.globalAlpha = a * (full ? 1 : 1 - 0.7 * loraDim);
      const p = pOn(t, full ? W.full : W.adapter, 0.6);
      for (let r = 0; r < 10; r++) for (let c = 0; c < 14; c++) {
        const u = K.c01(p * 1.5 - c / 28 - r / 40);
        ctx.fillStyle = full ? K.mix("#252931", "#b2b7bf", u) : "#252931"; ctx.fillRect(x + c * 18, 372 + r * 15, 14, 11);
      }
      ctx.strokeStyle = "#5a5f68"; ctx.strokeRect(x - 1.5, 370.5, 253, 153);
      if (!full) { ctx.strokeRect(x + 272.5, 370.5, 17, 153); ctx.fillStyle = K.mix("#252931", C.text, p); ctx.fillRect(x + 276, 375, 10, 144 * p); }
      if (!full) for (let adapterIndex = 0; adapterIndex < 10; adapterIndex++) {
        ctx.fillStyle = K.rgba(C.main[2], flash(t, W.small + adapterIndex * 0.055, 0.5));
        ctx.fillRect(x + 276, 375 + adapterIndex * 14.4, 10, 12);
      }
    });
    P.arrow(ctx, 488, 446, 528, 446, C.gray, 8);
    gpuCards.forEach((c, i) => {
      const p = pOn(t, c.tt + (i % 4) * 0.07); ctx.globalAlpha = ag;
      K.rr(ctx, c.x + 0.5, c.y + 0.5, 173, 81, 10); ctx.strokeStyle = K.mix("#33373f", C.gray, p); ctx.stroke();
      ctx.fillStyle = K.mix("#15181e", "#333841", p * 0.7); ctx.fill();
      for (let j = 0; j < 6; j++) { ctx.fillStyle = p > 0 ? C.gray : "#454b55"; ctx.fillRect(c.x + 20 + j * 22, c.y + 74, 12, 1); }
      if (i < 4 && t >= W.train4) P.arrow(ctx, c.x + 86, 448, c.x + 86, 448 + 58 * pOn(t, W.train4, 0.5), C.gray, 6);
    });
    interval(ctx, 628, 755, 1090, V10.rlfMinusRl, ai, t, W.m42, { min: -8, max: 2, ticks: true });
    if (t >= W.single) { ctx.globalAlpha = a * pOn(t, W.single); P.dashRect(ctx, 162, 542, 696, 78, C.gray, 8); }
    ctx.restore();
  };
  // C · QUERY 空位与提交后的预览，只画行为结构，不冒充某道题的真实 SQL。
  const pHC = K.panel(si, 140, 230, 1640, 630, P.GRAY[2], "BEHAVIOR · 全参数异步设置");
  pHC.el.style.borderStyle = "dashed";
  pHC.el.style.borderColor = P.GRAY[1];
  const previewBox = K.panel(si, 952, 574, 516, 126, P.GRAY[2], "FEEDBACK · 提交之后");
  const cvC = P.layer(si);
  const cHead = text(176, 288, "测试题都没查数据", SANS(42));
  const cTwo = big(176, 364, "2"), cModels = text(264, 410, "个模型", SANS(32));
  const cObs = P.tag(si, 1744, 248, "NOT TESTED · 行为观察");
  const railC = P.rail(si, 680, 350, 1064, [
    { a: "none", t: W.noquery }, { a: "finish", t: W.finish }, { a: "finish", t: W.revise },
  ], { h: 142, gap: 28 });
  const cRailTag = text(680, 514, "ILLUSTRATIVE · 动作关系示意", P.MONO20, C.gray);
  const cPreview = P.tx(previewBox.el, 24, 50, "结果预览 → 再改", SANS(32), C.text);
  const cPreviewNote = text(680, 742, "FINISH 之后才出现结果预览", SANS(28), C.gray);
  const cHabit = text(176, 634, "先查再交", SANS(48)), cGone = text(176, 714, "又被训没了", SANS(42), C.red[2]);
  const upC = (t) => {
    const a = pane(pHC, t, T[80], T[82]), av = pane(previewBox, t, T[80] + 0.2, T[82]);
    K.vis(cHead, a); K.col(cHead, P.lightCol(t, W.noquery, C.red[2], C.text));
    show(cTwo, a, t, W.two); show(cModels, a, t, W.two); K.vis(cObs, a); railC.up(t, a, T[80] + 0.3); K.vis(cRailTag, a);
    P.vin(cPreview, av); K.col(cPreview, P.lightCol(t, W.preview, C.text));
    K.vis(cPreviewNote, a); K.col(cPreviewNote, P.lightCol(t, W.revise, C.gray));
    K.vis(cHabit, a); show(cGone, a, t, W.gone);
    K.col(cHabit, t >= W.gone ? P.lightCol(t, W.gone, C.red[2], C.text) : P.lightCol(t, W.habit, C.text));
    if (!cvC.begin(a)) return;
    const ctx = cvC.ctx; ctx.save(); ctx.globalAlpha = a; ctx.lineWidth = 1;
    const pv = pOn(t, W.preview, 0.6);
    if (pv > 0) {
      ctx.strokeStyle = C.gray; ctx.beginPath(); ctx.moveTo(1078, 492); ctx.lineTo(1078, 558); ctx.lineTo(1180, 558); ctx.lineTo(1180, 574); ctx.stroke();
      P.arrow(ctx, 1396, 574, 1396, 492 + 82 * (1 - pOn(t, W.revise, 0.55)), C.gray, 8);
      ctx.fillStyle = C.text; ctx.fillRect(1075, 492 + 62 * pv, 6, 6);
    }
    const gone = pOn(t, W.gone);
    if (gone > 0) {
      ctx.strokeStyle = C.red[2]; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(176, 668); ctx.lineTo(176 + 212 * gone, 668); ctx.stroke();
      P.cross(ctx, 468, 740, 38, C.red[2], gone, 3);
    }
    ctx.restore();
  };
  // D · 6,682 × 8 = 53,456 个点。缺少逐题 ID，固定重排，只表达真实边界题数量。
  const pPD = K.panel(si, 140, 230, 1640, 420, P.GRAY[2], "TASK FILTER · 训练题筛选");
  const pFD = K.panel(si, 140, 680, 1640, 180, P.GRAY[2], "RESAMPLE · 训练时重新做一组");
  const cvD = P.layer(si);
  const dHead = text(176, 286, "只换训练题", SANS(42)), dMode = big(176, 350, "LoRA");
  const dRule = text(176, 462, "回到相同的更新方式", SANS(26), C.gray);
  const dQuarter = text(176, 508, "约四分之一", SANS(36), C.main[2]);
  const dMeta = P.txr(si, 1744, 286, `${K.fmt(NQ)} × ${NP} = ${K.fmt(NQ * NP)} 点`, P.MONO24, C.gray);
  const dNote = text(540, 320, "分布重排 · 八点仅表示采样次数，不表示单次对错", P.MONO20, C.gray);
  const dSeeds = V11.boundary.map((n, i) => text(176, 554 + i * 28, `S${42 + i} · ${K.fmt(n)} · ${V11.boundaryPct[i].toFixed(1)}%`, MONO(22, 500), C.gray));
  const flowNodes = [
    { x: 176, label: "预采样", sub: "看同题的八次结果", tt: W.pre },
    { x: 700, label: "只挑边界题", sub: "保留对过、也错过的题", tt: W.pick },
    { x: 1224, label: "训练时再采样", sub: "新一组轨迹 → 训练", tt: W.fresh },
  ].map((r) => ({ ...r, e: text(r.x, 732, r.label, SANS(32), P.DIM), s: text(r.x, 786, r.sub, SANS(24), P.DIM) }));
  const order = Array.from({ length: NQ }, (_, i) => i).sort((a, b) => K.hash(a, 9) - K.hash(b, 9));
  const rank = new Uint32Array(NQ); order.forEach((i, j) => rank[i] = j);
  const upD = (t) => {
    const a = pane(pPD, t, T[82], T[85]), af = pane(pFD, t, T[82] + 0.2, T[85]);
    K.vis(dHead, a); K.col(dHead, P.lightCol(t, W.only, C.text)); K.vis(dMode, a);
    const isBoundary = t >= W.from1;
    K.put(dMode, isBoundary ? `1–${NP - 1}` : t >= W.eight ? `${NP} 次` : "LoRA"); K.col(dMode, isBoundary ? C.main[2] : C.text);
    K.put(dRule, isBoundary ? `做对次数 / ${NP} 次采样` : t >= W.eight ? "每道训练题都做一遍预采样" : "只改变训练题的选择");
    K.vis(dRule, a); show(dQuarter, a, t, W.quarter); K.vis(dMeta, a); K.vis(dNote, a);
    dSeeds.forEach((e, i) => show(e, a, t, W.boundary + i * 0.12));
    flowNodes.forEach((r, i) => {
      K.vis(r.e, af); K.vis(r.s, af); K.col(r.e, P.lightCol(t, r.tt, i === 1 ? C.main[2] : C.text)); K.col(r.s, P.lightCol(t, r.tt + 0.2, C.gray));
    });
    if (!cvD.begin(Math.max(a, af))) return;
    const ctx = cvD.ctx; ctx.save(); ctx.lineWidth = 1;
    const select = pOn(t, W.from1, 1.0), sample = pOn(t, W.eight, 0.7), scan = (Math.max(0, t - T[82]) % 3.4) / 3.4;
    const seed = t < W.pre ? 0 : t < W.fresh ? 1 : 2;
    const previous = Math.max(0, seed - 1), sw = seed === 0 ? 1 : pOn(t, seed === 1 ? W.pre : W.fresh, 0.45);
    const selectedN = Math.round(K.lerp(V11.boundary[previous], V11.boundary[seed], sw));
    for (let i = 0; i < NQ; i++) {
      const r = Math.floor(i / 128), c = i % 128, x = 540 + c * 9.3, y = 350 + r * 5.4;
      const kept = rank[i] < selectedN, lit = select * K.c01(select * NQ / 2 - rank[i] / 2);
      ctx.globalAlpha = a * (0.55 + 0.45 * sample);
      ctx.fillStyle = kept ? K.mix("#4e463a", C.main[1], lit) : K.mix("#4e463a", "#282c34", select);
      for (let j = 0; j < NP; j++) ctx.fillRect(x + (j % 4) * 2.15, y + Math.floor(j / 4) * 2.15, 2, 2);
    }
    ctx.globalAlpha = a * 0.45; ctx.fillStyle = C.gray; ctx.fillRect(540 + scan * 1190, 344, 1, 290);
    if (select > 0) { ctx.globalAlpha = a * select; ctx.fillStyle = C.gray; ctx.fillRect(164, 560 + seed * 28, 3, 16); }
    ctx.globalAlpha = af;
    P.arrow(ctx, 472, 758, 650, 758, t >= W.pick ? C.gray : P.GRAY[1], 8);
    P.arrow(ctx, 1006, 758, 1170, 758, t >= W.train ? C.gray : P.GRAY[1], 8);
    flowNodes.forEach((r, i) => { ctx.fillStyle = K.mix("#33373f", i === 1 ? C.main[1] : C.gray, pOn(t, r.tt)); ctx.fillRect(r.x, 834, 448 * pOn(t, r.tt, 0.75), 2); });
    const den = pOn(t, W.dense, 0.65);
    if (den > 0) {
      ctx.globalAlpha = af * den;
      for (let i = 0; i < NP; i++) {
        ctx.fillStyle = quietPurple; ctx.fillRect(1638 + (i % 4) * 23, 746 + Math.floor(i / 4) * 23, 16, 16);
        ctx.strokeStyle = C.main[2]; ctx.beginPath(); ctx.moveTo(1638 + (i % 4) * 23, 762 + Math.floor(i / 4) * 23); ctx.lineTo(1654 + (i % 4) * 23, 746 + Math.floor(i / 4) * 23); ctx.stroke();
      }
    }
    ctx.restore();
  };
  // E · 边界题曲线与两种对照，续训段单独画灰虚线，不混进正式判定。
  const pGE = K.panel(si, 140, 230, 940, 300, P.GRAY[2], "BOUNDARY TASKS · 组状态");
  const pRE = K.panel(si, 1120, 230, 660, 300, P.GRAY[2], "SIGNAL · 前 200 步");
  const pCE = K.panel(si, 140, 560, 1640, 300, P.GRAY[2], "SIGNAL · 有信号的组 / 16");
  const cvE = P.layer(si);
  const eHead = text(176, 276, `${NG} 组 × ${NP} 条`, MONO(40, 700));
  const eMeta = P.txr(si, 1048, 288, `第 ${S.example.RLb.step} 步 · 重排`, P.MONO20, C.gray);
  const eLegend = text(176, 506, `${S.example.RLb.inf} 有信号 / ${S.example.RLb.allC} 全对 / ${S.example.RLb.allF} 全错`, P.MONO20, C.gray);
  const eRightHead = text(1156, 286, "有信号的组", SANS(40)), eBig = big(1156, 346, pctRange(S.pct.RLb200));
  const eDetail = text(1156, 456, pctLine(S.pct.RLb200), P.MONO24, C.gray);
  const eStamp = P.txr(si, 1744, 384, "成立", SANS(32), C.main[2]);
  const eTail = text(1156, 486, pctLine(lastPct), P.MONO20, C.gray);
  const eCurveHead = text(176, 602, "同样采样，先把题筛一遍", SANS(40));
  const eCurveMeta = P.txr(si, 1744, 608, "20-STEP MEAN · 训练步 →", P.MONO20, C.gray);
  const eExplore = P.tag(si, 1744, 576, "EXPLORATORY · 续训");
  const eMethods = text(1156, 578, "v0.9 灰 / v0.11 紫", P.MONO20, C.gray);
  const eSeedKeys = graySeeds.map((_, i) => text(760 + i * 120, 578, `S${42 + i}`, P.MONO20, C.gray));
  const upE = (t) => {
    const bg = K.lerp(1, 0.22, pOn(t, T[86], 0.4));
    const graphFocus = t < T[88] ? bg : K.lerp(0.22, 1, pOn(t, T[88], 0.4));
    const a = pane(pGE, t, T[85], win.t1 - 0.05, bg), ar = pane(pRE, t, T[85], win.t1 - 0.05), ac = pane(pCE, t, T[85], win.t1 - 0.05, graphFocus);
    K.vis(eHead, a); K.vis(eMeta, a); K.vis(eLegend, a);
    const phase = t < T[86] ? "signal" : t < T[87] ? "pass" : t < T[88] ? "fail" : t < T[89] ? "extra" : "tail";
    const explore = pOn(t, T[88], 0.4), isExtra = phase === "extra" || phase === "tail";
    K.put(pRE.lab, phase === "signal" ? "SIGNAL · 前 200 步" : isExtra ? "EXPLORATORY · 续训" : "PROJECT · 项目判分");
    pRE.el.style.borderStyle = isExtra ? "dashed" : "solid"; pRE.el.style.borderColor = isExtra ? P.GRAY[1] : K.rgba(P.GRAY[2], 0.55);
    K.vis(eRightHead, ar); K.vis(eBig, ar); K.vis(eDetail, ar);
    K.vis(eTail, phase === "tail" ? ar * pOn(t, W.twoTenths) : 0); K.vis(eStamp, phase === "pass" ? ar * pOn(t, W.pass) : 0);
    eBig.style.font = phase === "fail" ? SANS(60) : phase === "tail" ? MONO(64) : MONO(96); K.at(eBig, 1156, phase === "tail" ? 358 : 346);
    eBig.style.textShadow = "none"; eBig._ts = null;
    if (phase === "signal") {
      K.put(eRightHead, "有信号的组"); K.put(eBig, t < W.p45 ? "前 200 步" : t < W.p49 ? `${Math.round(Math.min(...S.pct.RLb200))}%` : pctRange(S.pct.RLb200));
      eBig.style.font = t < W.p45 ? MONO(60) : MONO(96); K.col(eBig, C.main[2]); K.vis(eBig, ar * pOn(t, W.n200));
      K.put(eDetail, pctLine(S.pct.RLb200)); show(eDetail, ar, t, W.p49);
    } else if (phase === "pass") {
      K.put(eRightHead, "比离线起点"); K.put(eBig, P.fs(V11.rlbMinusPtr.m)); K.vis(eBig, ar * pOn(t, W.m26)); P.glow(eBig, t, W.m26, C.main);
      K.put(eDetail, ciText(V11.rlbMinusPtr)); show(eDetail, ar, t, W.m26 + 0.25);
    } else if (phase === "fail") {
      K.put(eRightHead, "比普通在线 RL"); K.put(eBig, t < W.notHold ? "尚未证明" : "未成立");
      K.col(eBig, t < W.notHold ? C.gray : C.red[2]);
      K.put(eDetail, `${P.fs(V11.rlbMinusRl9.m)} ${ciText(V11.rlbMinusRl9)}`); show(eDetail, ar, t, W.ordinary);
    } else if (phase === "extra") {
      K.put(eRightHead, "续训只算探索"); K.put(eBig, P.fs(V11.at400.m)); K.col(eBig, C.text); eBig.style.textShadow = "none"; show(eBig, ar, t, W.m09);
      K.put(eDetail, ciText(V11.at400)); show(eDetail, ar, t, W.m09 + 0.25);
    } else {
      K.put(eRightHead, "末段的信号占比"); K.put(eBig, "两成左右"); K.col(eBig, C.text); eBig.style.textShadow = "none"; show(eBig, ar, t, W.twoTenths);
      K.put(eDetail, "末 20 步 · S42 / S43 / S44");
    }
    K.vis(eCurveHead, ac); K.put(eCurveHead, isExtra ? "信号也会被训稀" : "同样采样，先把题筛一遍");
    K.vis(eCurveMeta, ac); K.vis(eExplore, ac * explore); K.vis(eMethods, ac);
    K.put(eMethods, isExtra ? "v0.9 / v0.11 · 灰" : "v0.9 灰 / v0.11 紫"); eSeedKeys.forEach((e) => K.vis(e, ac));
    if (!cvE.begin(Math.max(a, ar, ac))) return;
    const ctx = cvE.ctx;
    groups(ctx, t, S.example.RLb, a, 1, { x: 176, dxSmall: 110, ySmall: 328, on: T[85], countOn: T[85] });
    const extend = K.eio(pOn(t, W.n400, 0.8)), max = K.lerp(200, S.RLb[0].length, extend);
    const nb = t < T[88] ? 200 * pOn(t, T[85], 2.2) : 200 + 200 * pOn(t, W.n400, 2.0);
    const ordinaryFlash = Math.max(flash(t, W.ordinary, 0.8), flash(t, W.online, 0.8));
    curve(ctx, t, ac, { x: 248, y: 668, w: 1440, h: 122 }, { max, n9: 200, nb, rl9A: 0.24, rl9Flash: ordinaryFlash, ext: explore * extend, tail: pOn(t, W.last), start: T[85] });
    ctx.save(); ctx.globalAlpha = ar;
    const negativeX = 1156 + (V11.rlbMinusRl9.lo + 2) / 8 * 588, zeroX = 1156 + 2 / 8 * 588;
    ctx.fillStyle = K.rgba(C.red[1], 0.6 * flash(t, W.better)); ctx.fillRect(negativeX, 484, zeroX - negativeX, 40);
    ctx.restore();
    if (phase === "pass") interval(ctx, 1156, 492, 588, V11.rlbMinusPtr, ar, t, W.m26, { lowOn: W.lo07 });
    else if (phase === "fail") interval(ctx, 1156, 492, 588, V11.rlbMinusRl9, ar, t, W.ordinary);
    else if (phase === "extra") interval(ctx, 1156, 492, 588, V11.at400, ar, t, W.m09, { gray: true });
    ctx.save(); ctx.globalAlpha = ac; eSeedKeys.forEach((_, i) => { ctx.fillStyle = isExtra ? graySeeds[i] : seedColors[i]; ctx.fillRect(730 + i * 120, 590, 20, 2); }); ctx.restore();
  };
  return (t) => { upA(t); upB(t); upC(t); upD(t); upE(t); };
});
