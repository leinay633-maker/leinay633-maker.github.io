// 第 4 章 · 超额从哪来。真实数据取 CR；小票和中性化流程分别标比喻、示意。
K.scene("s4", (si, win) => {
  const C = K.C;
  const MONO = P.mono;
  const SANS = P.sans;
  const L = (n) => K.seg(n).t0 - 0.08;
  const at = (n, s, k = 1) => K.w(n, s, k) - 0.08;
  const on = (t, a, d = 0.35) => K.eo(K.prog(t, a, a + d));
  const show = (e, a, t, ta, d = 0.3) => P.vin(e, a, a * K.prog(t, ta, ta + d));
  const AD = CR.attr.dev;
  const ST = AD.styles;
  const GROSS = CR.activeDev + CR.costs.S2P2.drag;
  const RESIDUAL = GROSS - AD.total;
  const RAW = P.mean(CR.ic.dev.raw);
  const NEUTRAL = P.mean(CR.ic.dev.neutral);
  const R2 = Object.values(CR.ic).map((x) => x.r2);
  const NLAB = CR.ic.dev.neutral.filter((x) => x != null).length;
  // 任务给定的复核值；CR 没存 HAC t 统计量。
  const NW = { t: 9.3, lag: 4 };
  const T = Object.fromEntries(Array.from({ length: 16 }, (_, i) => [i + 54, L(i + 54)]));
  T[54] = win.t0 + 0.02;
  const A = {
    edge: at(54, "超额"), question: at(54, "哪来"),
    risk: at(55, "风险模型"), split: at(55, "拆成"), style: at(55, "风格"),
    industry: at(55, "航业"), stock: at(55, "个股"),
    receipt: at(56, "小票"), total: at(56, "总价"), unpack: at(56, "拆开"), two: at(56, "两样"),
    frozen: at(57, "冻结"), mean: at(57, "平均"), twoStyles: at(57, "两类"),
    rv: at(58, "特质波动低"), market: at(58, "扣掉市场"), own: at(58, "自己的波动"),
    liq: at(59, "换手率低"), traded: at(59, "成交的股份"), shares: at(59, "股份"), float: at(59, "流通股"), ratio: at(59, "比例小"),
    contribution: at(60, "年化贡献"), rvC: at(60, "12.5%"), liqC: at(60, "9.2%"),
    combine: at(61, "合计"), all: at(61, "12.2%"), more: at(61, "比"),
    net: at(62, "5.8%"), addCost: at(62, "加回"), cost: at(62, "成本"),
    gross: at(62, "8.8%"), specific: at(62, "个股"), residual: at(62, "负3.5%"),
    explain: at(63, "全部"), explainStyle: at(63, "风格"),
    score: at(64, "打分"), daily: at(64, "每天"), regressIndustry: at(64, "航业"),
    six: at(64, "六个风格"), regress: at(64, "回归"), leave: at(64, "留下"), unexplained: at(64, "解释不了"),
    ic: at(65, "ic"), dev: at(65, "开发期"), raw: at(65, "0.086"),
    drop: at(65, "降到"), neutral: at(65, "0.021"), quarter: at(65, "四分之一"),
    remains: at(66, "剩下"), significant: at(66, "显著"), revisit: at(66, "前面"),
    stockAgain: at(66, "个股"), negative: at(66, "负"),
    weak: at(67, "偏弱"), pool: at(67, "合格池"), poolV: at(67, "负4.7%"),
    uncut: at(67, "不截前"), top: at(67, "1800只"), allStocks: at(67, "全部股票"), broad: at(67, "8.9%"),
    amount: at(68, "成交额"), worse: at(68, "表现"), avoid: at(68, "躲开"), win: at(68, "跑赢"),
    learned: at(69, "学会"), lowRV: at(69, "特质波动低"), quiet: at(69, "换手冷清"),
    known: at(69, "早有人研究"), independent: at(69, "不算独立"), ability: at(69, "选股能力"),
  };

  // ---- HUD ----
  K.plans.push({
    t0: win.t0, t1: win.t1, chip: "04", chap: "超额从哪来",
    lab: "WHERE THE EDGE CAME FROM · 超额从哪来",
    tele: (t) => {
      if (t >= T[67]) return `▸ POOL EW ${P.pct(CR.bench.pool)}/YR · ALL LISTED ${P.pct(CR.bench.broad, 1, true)}/YR · 2020–2024`;
      if (t >= T[65]) return `▸ RANK IC ${K.fmt(RAW, 3)} → ${K.fmt(NEUTRAL, 3)} · NEUTRALIZED ON INDUSTRY + ${Object.keys(ST).length} STYLES`;
      if (t >= A.more) return `▸ STYLE + INDUSTRY ${P.pct(AD.total, 1, true)} · NET ACTIVE ${P.pct(CR.activeDev)}` + (t >= T[63] ? ` · RESIDUAL ≈ ${P.pct(RESIDUAL)}` : "");
      if (t >= T[57]) return `▸ MEAN ACTIVE EXPOSURE · RESIDUAL VOL ${P.fn(ST.residual_vol[0])} SD · LIQUIDITY ${P.fn(ST.liquidity[0])} SD`;
      return "▸ RISK MODEL · STYLE · INDUSTRY · STOCK-SPECIFIC";
    },
    titles: [
      { t: T[54], text: "开发期的超额，{从哪来}" },
      { t: T[55], text: "用风险模型，{拆成三块}" },
      { t: T[56], text: "拆开{一张小票}" },
      { t: T[57], text: "平均偏向{两类股票}", color: C.amb[2] },
      { t: T[58], text: "{特质波动低}，扣掉市场以后", color: C.amb[2] },
      { t: T[59], text: "{换手率低}，股份交易得少", color: C.amb[2] },
      { t: T[60], text: "这两项的{年化贡献}", color: C.amb[2] },
      { t: T[61], text: "风格加行业，{比实际还多}", color: C.amb[2] },
      { t: T[62], text: "个股层面，{剩下多少}" },
      { t: T[63], text: "开发期超额，可以全部用{风格解释}", color: C.amb[2] },
      { t: T[64], text: "再看打分，{只留残差}" },
      { t: T[65], text: "开发期 IC，只剩{约四分之一}" },
      { t: T[66], text: "剩余 IC 显著，{组合剩余仍为负}" },
      { t: T[67], text: "用来比较的{基准也偏弱}", color: C.amb[2] },
      { t: T[68], text: "{成交额}越靠前，表现越差", color: C.amb[2] },
      { t: T[69], text: "主要学会了{已知的风格}", color: C.amb[2] },
    ],
  });
  K.plates.push({ t0: win.t0, t1: win.t1, text: "ATTRIBUTION · DEV 2020–2024" });
  P.dock.push({ t0: win.t0, t1: win.t1, st: { lit: { warm: 0.35, dev: 1 }, lock: 1, folds: 1, days: P.PAPER_DONE } });

  // ================= A：累计主动收益，拆成三块（54–55）=================
  const pA = K.panel(si, 140, 236, 1640, 540, C.main[1], "CUMULATIVE ACTIVE · DEV 2020–2024");
  const cvA = P.layer(si);
  const cumA = P.cum(CR.series.dev.active);
  const aHead = P.tx(si, 180, 302, "开发期 · 年化主动收益", SANS(40, 800), C.text);
  const aNum = P.txr(si, 1736, 320, P.pct(CR.activeDev), MONO(110), C.main[2]);
  const aUnit = P.txr(si, 1732, 444, "每年 · 已扣成本", SANS(26), C.gray);
  const aNote = P.tx(si, 180, 736, "逐日相加 · VS 0.95 × POOL EW", P.MONO20, C.gray);
  const aQ = P.tx(si, 1280, 584, "从哪里来？", SANS(40, 800), C.main[2]);
  const aYears = Array.from({ length: 5 }, (_, i) => P.ctr(si, 280 + i * 220, 680, String(2020 + i), P.MONO20, C.gray));
  const aNames = ["风格", "行业", "个股"];
  const aTimes = [A.style, A.industry, A.stock];
  const aSlots = aNames.map((s, i) => ({
    title: P.ctr(si, 450 + i * 510, 502, s, SANS(40, 800), P.DIM),
    num: P.ctr(si, 450 + i * 510, 560, "··", MONO(64), P.DIM),
  }));
  const upA = (t) => {
    const a = pA.up(t, T[54], T[56] - 0.1, 0.3);
    const split = on(t, A.split);
    const curveA = a * (1 - 0.82 * on(t, A.risk, 0.8));
    show(aHead, a, t, T[54]);
    K.put(aHead, t >= A.risk ? "风险模型 · 拆开主动收益" : "开发期 · 年化主动收益");
    show(aNum, a, t, A.edge);
    P.glow(aNum, t, A.edge, C.main);
    show(aUnit, a, t, A.edge + 0.15);
    K.vis(aQ, a * on(t, A.question) * (1 - on(t, A.split)));
    P.vin(aNote, a, a);
    aYears.forEach((e) => P.vin(e, a, curveA));
    aSlots.forEach((e, i) => {
      show(e.title, a, t, A.split + i * 0.06);
      show(e.num, a, t, A.split + i * 0.06);
      K.col(e.title, P.lightCol(t, aTimes[i], i < 2 ? C.amb[2] : C.text));
    });
    if (!cvA.begin(a)) return;
    const ctx = cvA.ctx;
    ctx.globalAlpha = curveA;
    ctx.fillStyle = "#3a3e46";
    ctx.fillRect(240, 580, 1000, 1);
    P.drawCurve(ctx, cumA, { x: 240, w: 1000, y0: 580, scale: 490, p: on(t, T[54], 1.25), color: C.main[1], lw: 2.5 });
    const p = on(t, A.edge, 0.6);
    if (p > 0) {
      const ey = 580 - cumA[cumA.length - 1] * 490;
      ctx.fillStyle = C.main[2];
      ctx.beginPath(); ctx.arc(1240, ey, 4 * p, 0, 6.283); ctx.fill();
    }
    aSlots.forEach((e, i) => {
      ctx.globalAlpha = a * split;
      const x = 235 + i * 510;
      ctx.fillStyle = "#0d0f14";
      K.rr(ctx, x, 482, 430, 174, 10); ctx.fill();
      const band = 0.18 * on(t, aTimes[i], 0.22) + 0.22 * P.pulse(t, aTimes[i], 0.12, 0.4);
      ctx.fillStyle = K.rgba(i < 2 ? C.amb[2] : C.text, band); ctx.fill();
      ctx.strokeStyle = P.lightCol(t, aTimes[i], i < 2 ? C.amb[1] : C.text, "#3a3e46");
      ctx.lineWidth = 1; ctx.stroke();
    });
  };

  // ================= B：小票比喻（56）=================
  const pB = K.panel(si, 140, 236, 1640, 540, P.GRAY[2], "RECEIPT · 拆开才看得清");
  const cvB = P.layer(si);
  const bTag = P.tag(si, 1754, 252, "比喻 · METAPHOR");
  const bHead = P.tx(si, 220, 310, "一张小票", SANS(40, 800), C.text);
  const bTotal = P.tx(si, 274, 410, "总价", SANS(40, 800), C.text);
  const bNormal = P.tx(si, 274, 474, "看着正常", SANS(52, 800), C.text);
  const bUnpack = P.tx(si, 1040, 310, "拆开以后", SANS(40, 800), P.DIM);
  const bRows = ["项目 A", "项目 B", "其他"].map((s, i) => P.tx(si, 1040, 390 + i * 94, s, SANS(26), P.DIM));
  const bMain = P.tx(si, 1040, 696, "两样东西，占了大头", SANS(32, 800), C.text);
  const upB = (t) => {
    const a = pB.up(t, T[56], T[57] - 0.1, 0.3);
    P.vin(bTag, a, a);
    show(bHead, a, t, A.receipt);
    show(bTotal, a, t, A.total);
    show(bNormal, a, t, A.total + 0.2);
    show(bUnpack, a, t, T[56] + 0.2);
    K.col(bUnpack, P.lightCol(t, A.unpack));
    bRows.forEach((e, i) => {
      show(e, a, t, T[56] + 0.25 + i * 0.08);
      K.col(e, P.lightCol(t, i < 2 ? A.two : A.unpack, i < 2 ? C.text : C.gray));
    });
    show(bMain, a, t, A.two);
    if (!cvB.begin(a)) return;
    const ctx = cvB.ctx;
    ctx.globalAlpha = a;
    const r = on(t, A.receipt);
    ctx.fillStyle = "#12151b"; ctx.strokeStyle = "#8a8f98"; ctx.lineWidth = 1;
    K.rr(ctx, 242, 376, 620, 294 * r, 8); ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#3a3e46";
    for (let x = 268; x < 840; x += 16) ctx.fillRect(x, 592, 8, 1);
    if (on(t, A.unpack) > 0) P.arrow(ctx, 895, 516, 1000, 516, C.gray, 10);
    bRows.forEach((e, i) => {
      ctx.fillStyle = "#1c2028"; ctx.fillRect(1040, 436 + i * 94, 650, 18);
      const q = on(t, A.unpack + i * 0.1, 0.7);
      const high = i < 2 ? on(t, A.two + i * 0.1) : 0;
      ctx.fillStyle = K.mix("#4a4f58", "#c9c4bb", high);
      ctx.fillRect(1040, 436 + i * 94, [604, 522, 90][i] * q, 18);
    });
  };

  // ================= C：六个暴露与两项贡献（57–60）=================
  const STYLE = [["size", "规模"], ["beta", "beta"], ["momentum", "动量"], ["residual_vol", "特质波动"], ["liquidity", "流动性"], ["reversal", "反转"]];
  const pC = K.panel(si, 140, 236, 800, 540, C.amb[1], "MEAN ACTIVE EXPOSURE · 标准差");
  const pC2 = K.panel(si, 980, 236, 800, 540, C.amb[1], "STYLE · 组合偏向与年化贡献");
  const cvC = P.layer(si);
  const cHead = P.tx(si, 180, 300, "六个风格的平均主动暴露", SANS(36, 800), C.text);
  const cRows = STYLE.map(([key, name], i) => ({
    name: P.tx(si, 178, 368 + i * 52, name, key === "beta" ? MONO(26, 700) : SANS(26), P.DIM),
    val: P.txr(si, 904, 369 + i * 52, "··", MONO(26, 700), P.DIM), key,
  }));
  const cTicks = [-1.5, 0, 1.5].map((v) => P.ctr(si, 594 + v * 144, 700, P.fn(v, 1), P.MONO20, C.gray));
  const cUnit = P.tx(si, 180, 738, "相对基准 · SD · 负值向左", P.MONO20, C.gray);
  const cFocus = P.tx(si, 1020, 302, "两类偏向", SANS(40, 800), C.amb[2]);
  const cLine1 = P.tx(si, 1020, 364, "扣掉市场涨跌以后", SANS(28), C.text);
  const cLine2 = P.tx(si, 1020, 405, "它自己的波动小", SANS(28), C.text);
  const cDef = P.tx(si, 1020, 454, "只扣了市场，没扣行业", P.MONO20, C.gray);
  const cOther = [["规模", ST.size[1]], ["beta", ST.beta[1]], ["动量", ST.momentum[1]], ["反转", ST.reversal[1]], ["行业", AD.industry]].map(([name, v], i) => {
    const x = i % 2 ? 1400 : 1020, y = 364 + Math.floor(i / 2) * 45;
    return { v, name: P.tx(si, x, y, name, name === "beta" ? MONO(24, 700) : SANS(24), C.gray),
      val: P.txr(si, i % 2 ? 1738 : 1328, y, P.pct(v, 1, true), MONO(26, 700), v < 0 ? C.gray : C.amb[2]) };
  });
  const cReceipt = P.tx(si, 1020, 510, "年化贡献 · 每年", P.MONO20, P.DIM);
  const cItems = [{ key: "residual_vol", label: "特质波动低", t: A.rvC, y: 558 }, { key: "liquidity", label: "换手率低", t: A.liqC, y: 658 }].map((d) => ({ ...d,
    labelEl: P.tx(si, 1020, d.y + 8, d.label, SANS(28, 800), P.DIM),
    numEl: P.txr(si, 1738, d.y - 12, "··", MONO(72), P.DIM),
  }));
  const upC = (t) => {
    const a = pC.up(t, T[57], T[61] - 0.1, 0.3);
    pC2.up(t, T[57], T[61] - 0.1, 0.3);
    show(cHead, a, t, A.frozen);
    cRows.forEach((e, i) => {
      show(e.name, a, t, A.mean + i * 0.06); show(e.val, a, t, A.mean + i * 0.06);
      const high = i === 3 || i === 4;
      const focused = t >= T[59] ? i === 4 : t >= T[58] ? i === 3 : high;
      const tc = high ? A.twoStyles : A.mean;
      K.col(e.name, P.lightCol(t, tc, focused ? C.amb[2] : C.gray));
      K.col(e.val, P.lightCol(t, tc, focused ? C.amb[2] : C.gray));
      K.put(e.val, t < A.mean ? "··" : P.fs(ST[e.key][0], 2));
    });
    cTicks.forEach((e) => show(e, a, t, A.mean));
    show(cUnit, a, t, A.mean); show(cFocus, a, t, T[57] + 0.25);
    K.put(cFocus, t >= T[60] ? "两项贡献，逐项填进来" : t >= T[59] ? "流动性 · 换手率低" : t >= T[58] ? "特质波动低" : "两类偏向");
    const defA = a * (1 - on(t, T[60]));
    show(cLine1, defA, t, t >= T[59] ? A.traded : A.market);
    show(cLine2, defA, t, t >= T[59] ? A.float : A.own);
    show(cDef, defA, t, t >= T[59] ? A.ratio : A.market + 0.3);
    K.put(cLine1, t >= T[59] ? "换手率 = 每天成交的股份" : "扣掉市场涨跌以后");
    K.put(cLine2, t >= T[59] ? "÷ 流通股" : "它自己的波动小");
    K.put(cDef, t >= T[59] ? "风险模型口径 · 21 日平均换手率的对数" : "只扣了市场，没扣行业");
    cOther.forEach((d, i) => { show(d.name, a, t, A.contribution + i * 0.1); show(d.val, a, t, A.contribution + i * 0.1); });
    show(cReceipt, a, t, T[57] + 0.3); K.col(cReceipt, P.lightCol(t, A.contribution, C.text));
    cItems.forEach((d, i) => {
      show(d.labelEl, a, t, T[57] + 0.35 + i * 0.1);
      K.col(d.labelEl, P.lightCol(t, i === 0 ? A.rv : A.liq, C.amb[2]));
      show(d.numEl, a, t, T[57] + 0.35 + i * 0.1);
      K.put(d.numEl, t < d.t ? "··" : P.pct(ST[d.key][1], 1, true));
      if (t >= d.t) P.glow(d.numEl, t, d.t, C.amb);
      else { K.col(d.numEl, P.DIM); d.numEl.style.textShadow = "none"; d.numEl._ts = "none"; }
    });
    if (!cvC.begin(a)) return;
    const ctx = cvC.ctx;
    ctx.globalAlpha = a;
    const X0 = 594, S = 144;
    ctx.fillStyle = "#3a3e46"; ctx.fillRect(X0, 350, 1, 338); ctx.fillRect(X0 - 216, 687, 432, 1);
    for (const v of [-1.5, -1, -0.5, 0, 0.5, 1, 1.5]) ctx.fillRect(X0 + v * S, 687, 1, 7);
    STYLE.forEach(([key], i) => {
      const y = 376 + i * 52;
      const g = on(t, A.mean + i * 0.06, 0.55), v = ST[key][0];
      const selected = i === 3 || i === 4;
      const focused = t >= T[59] ? i === 4 : t >= T[58] ? i === 3 : selected;
      ctx.fillStyle = "#151820"; ctx.fillRect(X0 - 216, y, 432, 26);
      if (key === "liquidity") {
        ctx.fillStyle = K.rgba(C.amb[2], 0.38 * P.pulse(t, A.ratio, 0.1, 0.4));
        ctx.fillRect(X0 - 216, y, 432, 26);
      }
      // 暴露是居中横条：负暴露向左；冰蓝描出叙述中的两种外部风格。
      ctx.fillStyle = selected ? K.mix("#4a4f58", C.amb[1], on(t, A.twoStyles) * (focused ? 1 : 0.45)) : "#4a4f58";
      ctx.fillRect(X0 + Math.min(0, v * S * g), y, Math.abs(v) * S * g, 26);
      const focusT = i === 3 ? A.rv : A.liq;
      if (selected && focused && t >= focusT) {
        ctx.strokeStyle = C.amb[2]; ctx.lineWidth = 1; ctx.strokeRect(166.5, y - 8.5, 751, 44);
      }
    });
    ctx.globalAlpha = defA;
    [[A.shares, 1134, 360, 246], [A.float, 1014, 402, 210]].forEach(([tk, x, y, w]) => {
      const band = 0.16 * on(t, tk, 0.16) + 0.24 * P.pulse(t, tk, 0.1, 0.4);
      ctx.fillStyle = K.rgba(C.amb[2], band);
      ctx.fillRect(x, y, w, 42);
    });
    ctx.globalAlpha = a;
    ctx.fillStyle = "#2a2d33"; ctx.fillRect(1020, 546, 718, 1); ctx.fillRect(1020, 646, 718, 1);
    cItems.forEach((d) => {
      const q = on(t, d.t, 0.65);
      ctx.fillStyle = "#1c2028"; ctx.fillRect(1020, d.y + 66, 718, 8);
      ctx.fillStyle = C.amb[1]; ctx.fillRect(1020, d.y + 66, (ST[d.key][1] / ST.residual_vol[1]) * 718 * q, 8);
    });
  };

  // ================= D：归因瀑布与结论（61–63）=================
  const pD = K.panel(si, 140, 236, 1640, 540, C.amb[1], "ATTRIBUTION · 风格、个股与成本");
  const cvD = P.layer(si);
  const W = [
    { x: 370, name: "风格 + 行业", v: AD.total, from: 0, to: AD.total, t: A.all, col: C.amb[1], tier: C.amb },
    { x: 680, name: "个股剩余", v: RESIDUAL, from: AD.total, to: GROSS, t: A.residual, col: C.gray, tier: P.GRAY },
    { x: 980, name: "加回成本", v: GROSS, from: 0, to: GROSS, t: A.gross, col: "#c9c4bb", tier: [C.text, C.gray, C.text] },
    { x: 1280, name: "成本", v: -CR.costs.S2P2.drag, from: GROSS, to: CR.activeDev, t: A.cost, col: C.red[1], tier: C.red },
    { x: 1570, name: "主动收益", v: CR.activeDev, from: 0, to: CR.activeDev, t: A.more, col: C.main[1], tier: C.main },
  ];
  const dVals = W.map((d, i) => P.ctr(si, d.x, i === 0 ? 308 : 332, "··", MONO(i === 0 ? 96 : 64), P.DIM));
  const dNames = W.map((d) => P.ctr(si, d.x, 666, d.name, SANS(26, 800), C.gray));
  const dUnit = P.txr(si, 1736, 286, "年化 · % / 年", P.MONO20, C.gray);
  const dMore = P.ctr(si, 870, 418, "风格加行业，比实际主动收益还多", SANS(28, 800), C.amb[2]);
  const dApprox = P.tx(si, 180, 746, `近似 · 归因 ${AD.days} 天、主动收益 ${CR.series.dev.active.length} 天 · VS 0.95 × POOL EW`, P.MONO20, C.gray);
  const dConclusion = P.say(si, 350, 706, 1330, 63, "开发期的超额，可以全部用风格来解释", SANS(30, 800));
  const upD = (t) => {
    const a = pD.up(t, T[61], T[64] - 0.1, 0.3);
    dVals.forEach((e, i) => {
      const d = W[i];
      P.vin(e, a, a); K.put(e, t < d.t ? "··" : P.pct(d.v, 1, i < 2 || i === 3));
      if (t >= d.t) P.glow(e, t, d.t, d.tier);
      else { K.col(e, P.DIM); e.style.textShadow = "none"; e._ts = "none"; }
      P.vin(dNames[i], a, a);
      K.col(dNames[i], P.lightCol(t, d.t, i === 3 ? C.red[2] : i === 0 ? C.amb[2] : i === 1 ? C.gray : C.text));
    });
    P.vin(dUnit, a, a); show(dMore, a * (1 - on(t, T[62])), t, A.more); P.vin(dApprox, a, a);
    show(dConclusion.el, a, t, T[63]);
    if (a > 0) { dConclusion.paint(t); dConclusion.spans.slice(14).forEach((e) => K.col(e, P.lightCol(t, A.explainStyle, C.amb[2]))); }
    if (!cvD.begin(a)) return;
    const ctx = cvD.ctx;
    ctx.globalAlpha = a;
    const Y = (v) => 650 - v * 1800, bw = 132;
    ctx.fillStyle = "#4a4f58"; ctx.fillRect(220, 650, 1490, 1);
    W.forEach((d, i) => {
      ctx.strokeStyle = "#2a2d33"; ctx.lineWidth = 1; ctx.strokeRect(d.x - bw / 2 + 0.5, 450.5, bw - 1, 199);
      const q = on(t, d.t, 0.6);
      if (q <= 0) return;
      const end = K.lerp(d.from, d.to, q), y0 = Y(d.from), y1 = Y(end);
      ctx.fillStyle = d.col; ctx.fillRect(d.x - bw / 2, Math.min(y0, y1), bw, Math.max(1, Math.abs(y1 - y0)));
      ctx.fillStyle = d.tier[2]; ctx.fillRect(d.x - bw / 2, y1, bw, 2);
      if (i === 1 || i === 3) P.arrow(ctx, d.x + bw / 2 + 16, y0, d.x + bw / 2 + 16, y1, d.tier[2], 8);
    });
    const connectors = [[436, 614, AD.total, A.residual], [746, 914, GROSS, A.residual], [1046, 1214, GROSS, A.cost], [1346, 1504, CR.activeDev, A.cost]];
    connectors.forEach(([x0, x1, v, ta]) => {
      const p = on(t, ta, 0.5);
      if (!p) return;
      ctx.strokeStyle = "#8a8f98"; ctx.setLineDash([4, 4]); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x0, Y(v)); ctx.lineTo(x0 + (x1 - x0) * p, Y(v)); ctx.stroke(); ctx.setLineDash([]);
    });
    const netPulse = P.pulse(t, A.net, 0.15, 0.8);
    if (netPulse > 0) { ctx.globalAlpha = a * netPulse; ctx.strokeStyle = C.main[2]; ctx.lineWidth = 1; ctx.strokeRect(1494.5, Y(CR.activeDev) - 10.5, 151, 660 - Y(CR.activeDev)); }
    if (t >= A.explain) { ctx.globalAlpha = a * on(t, A.explain); ctx.fillStyle = "#152334"; ctx.fillRect(180, 701, 1560, 42); ctx.fillStyle = C.amb[1]; ctx.fillRect(180, 701, 3, 42); }
  };

  // ================= E：中性化三步示意（64）=================
  const pE = K.panel(si, 140, 236, 1640, 540, P.GRAY[2], "SCORE NEUTRALIZATION · 每天回归取残差");
  const cvE = P.layer(si);
  const eTag = P.tag(si, 1754, 252, "ILLUSTRATIVE · 示意");
  const eSteps = [
    { x: 185, w: 350, title: "分数", sub: "当天截面的模型打分", t: A.score, tier: C.main },
    { x: 650, w: 620, title: "对行业和六个风格回归", sub: "行业哑变量 + 六项风格暴露", t: A.regressIndustry, tier: C.amb },
    { x: 1380, w: 350, title: "留残差", sub: "解释不了的那部分", t: A.leave, tier: C.main },
  ];
  const eHead = eSteps.map((d) => P.ctr(si, d.x + d.w / 2, 356, d.title, SANS(d.w > 400 ? 36 : 40, 800), P.DIM));
  const eSub = eSteps.map((d) => P.ctr(si, d.x + d.w / 2, 416, d.sub, P.MONO20, P.DIM));
  const eStyles = STYLE.map(([, s], i) => P.ctr(si, 764 + (i % 3) * 196, 490 + Math.floor(i / 3) * 55, s, s === "beta" ? MONO(24, 700) : SANS(24), P.DIM));
  const eNote = P.tx(si, 230, 672, "分数截尾 → 对暴露回归 → 取残差", SANS(30, 800), C.text);
  const eLabel = P.tx(si, 230, 722, "原 5 日标签保留 · 残差再与标签算秩相关", P.MONO20, C.gray);
  const upE = (t) => {
    const a = pE.up(t, T[64], T[65] - 0.1, 0.3);
    P.vin(eTag, a, a);
    eSteps.forEach((d, i) => { P.vin(eHead[i], a, a); P.vin(eSub[i], a, a); K.col(eHead[i], P.lightCol(t, d.t, d.tier[2])); K.col(eSub[i], P.lightCol(t, d.t, C.gray)); });
    eStyles.forEach((e, i) => { P.vin(e, a, a); K.col(e, P.lightCol(t, A.six + i * 0.06, C.amb[2])); });
    show(eNote, a, t, A.daily); show(eLabel, a, t, A.unexplained);
    if (!cvE.begin(a)) return;
    const ctx = cvE.ctx;
    ctx.globalAlpha = a;
    eSteps.forEach((d, i) => {
      ctx.fillStyle = "#11141a"; ctx.strokeStyle = P.lightCol(t, d.t, d.tier[1], "#3a3e46"); ctx.lineWidth = 1;
      K.rr(ctx, d.x, 330, d.w, 286, 10); ctx.fill(); ctx.stroke();
      if (i === 1) STYLE.forEach((s, k) => { ctx.strokeStyle = K.mix("#2a2d33", C.amb[1], on(t, A.six + k * 0.06)); ctx.strokeRect(682.5 + (k % 3) * 196, 482.5 + Math.floor(k / 3) * 55, 163, 39); });
      else for (let k = 0; k < 8; k++) {
        const h = (28 + 64 * K.hash(k, 4)) * (i === 2 ? 0.36 : 1), q = on(t, d.t + k * 0.045, 0.5);
        ctx.fillStyle = q > 0 ? K.mix("#2a2d33", d.tier[1], q) : "#2a2d33";
        ctx.fillRect(d.x + 45 + k * 33, 574 - h * q, 19, Math.max(2, h * q));
      }
    });
    [[551, 634, A.regress], [1286, 1364, A.leave]].forEach(([x0, x1, ta]) => { const q = on(t, ta, 0.4); if (q > 0) P.arrow(ctx, x0, 470, x0 + (x1 - x0) * q, 470, C.text, 10); });
  };

  // ================= F：两根独立 IC 柱（65）=================
  const pF = K.panel(si, 140, 236, 1640, 540, C.main[1], "RANK IC · 中性化前后 · 开发期");
  const cvF = P.layer(si);
  const fNum = [P.ctr(si, 420, 300, "··", MONO(96), P.DIM), P.ctr(si, 890, 454, "··", MONO(96), P.DIM)];
  const fLab = [P.ctr(si, 420, 674, "中性化前", SANS(30, 800), C.gray), P.ctr(si, 890, 674, "中性化后", SANS(30, 800), C.gray)];
  const fScope = P.tx(si, 1194, 310, "DEV · 2020–2024", P.MONO24, C.gray);
  const fQuarter = P.tx(si, 1194, 378, "约四分之一", SANS(52, 800), C.main[2]);
  const fQuarterL = P.tx(si, 1194, 456, "开发期中性化后的平均 IC", SANS(26), C.gray);
  const fR2 = P.tx(si, 1194, 556, `R² ${K.fmt(Math.min(...R2), 2)}–${K.fmt(Math.max(...R2), 2)}`, MONO(36, 700), C.amb[2]);
  const fR2L = P.tx(si, 1194, 612, "三段分数对暴露的截面 R²", P.MONO20, C.gray);
  const fNote = P.tx(si, 180, 736, "分数中性化后，重新与原标签算 IC", P.MONO20, C.gray);
  const upF = (t) => {
    const a = pF.up(t, T[65], T[66] - 0.1, 0.3);
    [RAW, NEUTRAL].forEach((v, i) => {
      const ta = i ? A.neutral : A.raw;
      P.vin(fNum[i], a, a); P.vin(fLab[i], a, a); K.put(fNum[i], t < ta ? "··" : K.fmt(v, 3));
      K.col(fLab[i], P.lightCol(t, ta, i ? C.main[2] : C.amb[2]));
      if (t >= ta) P.glow(fNum[i], t, ta, i ? C.main : C.amb);
      else { K.col(fNum[i], P.DIM); fNum[i].style.textShadow = "none"; fNum[i]._ts = "none"; }
    });
    show(fScope, a, t, A.dev); show(fQuarter, a, t, A.quarter); show(fQuarterL, a, t, A.quarter);
    show(fR2, a, t, A.drop); show(fR2L, a, t, A.drop + 0.2); P.vin(fNote, a, a);
    if (!cvF.begin(a)) return;
    const ctx = cvF.ctx;
    ctx.globalAlpha = a; ctx.fillStyle = "#2a2d33"; ctx.fillRect(1136, 300, 1, 420);
    [RAW, NEUTRAL].forEach((v, i) => {
      const x = i ? 890 : 420, q = on(t, i ? A.neutral : A.raw, 0.65), h = v * 2500;
      ctx.strokeStyle = "#3a3e46"; ctx.lineWidth = 1; ctx.strokeRect(x - 100 + 0.5, 650 - h + 0.5, 199, h - 1);
      ctx.fillStyle = i ? C.main[1] : C.amb[1]; ctx.fillRect(x - 100, 650 - h * q, 200, h * q);
      ctx.fillStyle = "#8a8f98"; ctx.fillRect(x - 150, 650, 300, 1);
    });
    const q = on(t, A.drop, 0.5);
    if (q > 0) P.arrow(ctx, 588, 502, 588 + 120 * q, 502, C.gray, 10);
  };

  // ================= G：逐日残差 IC，与组合剩余对照（66）=================
  const pG = K.panel(si, 140, 236, 1000, 540, C.main[1], "NEUTRALIZED RANK IC · 开发期");
  const pG2 = K.panel(si, 1180, 236, 600, 540, P.GRAY[2], "STOCK-SPECIFIC · 回看归因");
  const cvG = P.layer(si);
  const gNW = P.tx(si, 180, 302, `Newey–West t ≈ ${K.fmt(NW.t, 1)}`, MONO(36, 700), C.main[2]);
  const gLag = P.tx(si, 180, 354, `滞后 ${NW.lag} 天`, P.MONO20, C.gray);
  const gMean = P.tx(si, 180, 628, K.fmt(NEUTRAL, 3), MONO(96), C.main[2]);
  const gMeanL = P.tx(si, 540, 682, "平均 IC", SANS(30, 800), C.text);
  const gN = P.tx(si, 180, 740, `${K.fmt(NLAB)} 个有标签的交易日 · 一天一根`, P.MONO20, C.gray);
  const gSpec = P.ctr(si, 1480, 312, "个股层面的剩余", SANS(36, 800), C.text);
  const gNeg = P.ctr(si, 1480, 378, "··", MONO(96), P.DIM);
  const gUnit = P.ctr(si, 1480, 492, "每年 · 近似", P.MONO20, C.gray);
  const gStill = P.ctr(si, 1480, 678, "组合层面仍为负", SANS(30, 800), C.gray);
  const gApprox = P.ctr(si, 1480, 740, `归因 ${AD.days} 天 / 主动 ${CR.series.dev.active.length} 天`, P.MONO20, C.gray);
  const neutralScale = 180 / Math.max(...CR.ic.dev.neutral.map((v) => Math.abs(v || 0)));
  const upG = (t) => {
    const a = pG.up(t, T[66], T[67] - 0.1, 0.3); pG2.up(t, T[66], T[67] - 0.1, 0.3);
    show(gNW, a, t, A.significant); show(gLag, a, t, A.significant);
    show(gMean, a, t, A.remains); show(gMeanL, a, t, A.remains); P.glow(gMean, t, A.significant, C.main); P.vin(gN, a, a);
    P.vin(gSpec, a, a); P.vin(gNeg, a, a); P.vin(gUnit, a, a);
    K.put(gNeg, t < A.stockAgain ? "··" : P.pct(RESIDUAL)); K.col(gNeg, P.lightCol(t, A.stockAgain, C.gray));
    show(gStill, a, t, A.negative); show(gApprox, a, t, A.revisit);
    if (!cvG.begin(a)) return;
    const ctx = cvG.ctx;
    ctx.globalAlpha = a;
    P.drawStrip(ctx, CR.ic.dev.neutral, { x: 210, w: 870, y0: 520, scale: neutralScale, p: K.prog(t, T[66], A.significant), fill: 1, col: (v) => v >= 0 ? K.rgba(C.main[1], 0.62) : "#4a4f58" });
    ctx.fillStyle = "#8a8f98"; ctx.fillRect(210, 520, 870, 1);
    ctx.fillStyle = C.main[2]; ctx.fillRect(210, 520 - NEUTRAL * neutralScale, 870 * on(t, A.significant, 0.65), 2);
    const back = on(t, A.revisit, 0.4);
    if (back > 0) P.arrow(ctx, 1148, 538, 1148 + 24 * back, 538, C.gray, 7);
    ctx.fillStyle = "#3a3e46"; ctx.fillRect(1340, 550, 280, 1);
    const ng = on(t, A.negative, 0.65);
    ctx.fillStyle = C.gray; ctx.fillRect(1434, 550, 92, Math.abs(RESIDUAL) * 2300 * ng);
    if (ng > 0) P.arrow(ctx, 1552, 552, 1552, 552 + Math.abs(RESIDUAL) * 2300 * ng, C.gray, 8);
  };

  // ================= H：基准两柱，按成交额分四段（67–68）=================
  const pH = K.panel(si, 140, 236, 1640, 540, C.amb[1], "BENCHMARK · 2020–2024 · 等权几何年化");
  const cvH = P.layer(si);
  const hTwo = [
    { x: 560, v: CR.bench.pool, name: "合格池等权", sub: `按成交额取前 ${K.fmt(P.POOL.n)} 只`, t: A.poolV },
    { x: 1330, v: CR.bench.broad, name: "全部股票等权", sub: `不截前 ${K.fmt(P.POOL.n)} 只`, t: A.broad },
  ];
  const hVals = hTwo.map((d) => P.ctr(si, d.x, 310, "··", MONO(96), P.DIM));
  const hNames = hTwo.map((d) => P.ctr(si, d.x, 650, d.name, SANS(36, 800), C.text));
  const hSubs = hTwo.map((d) => P.ctr(si, d.x, 704, d.sub, P.MONO24, C.gray));
  const hZero = P.tx(si, 180, 530, "0", P.MONO20, C.gray);
  const BANDS = Object.entries(CR.bench.bands).map(([range, v], i) => ({ x: 385 + i * 385, v, name: range === "1801+" ? "1801 名以后" : range.replace("-", "–") + " 名", t: A.amount + i * 0.22 }));
  const hBandVals = BANDS.map((d) => P.ctr(si, d.x, 306, "··", MONO(64), P.DIM));
  const hBandNames = BANDS.map((d) => P.ctr(si, d.x, 654, d.name, MONO(28, 700), C.gray));
  const hLesson = P.ctr(si, 960, 700, "躲开最热门的那批，本身就能跑赢它", SANS(30, 800), C.text);
  const hNote = P.tx(si, 180, 746, "2020–2024 · 等权几何年化 · 按成交额排名分段", P.MONO20, C.gray);
  const upH = (t) => {
    const a = pH.up(t, T[67], T[69] - 0.1, 0.3), bandP = on(t, T[68], 0.45);
    const a2 = a * (1 - bandP), a4 = a * bandP;
    hTwo.forEach((d, i) => {
      P.vin(hVals[i], a2, a2); P.vin(hNames[i], a2, a2); show(hSubs[i], a2, t, i ? A.top : A.pool);
      K.put(hVals[i], t < d.t ? "··" : P.pct(d.v, 1, true)); K.col(hVals[i], t >= d.t ? (d.v < 0 ? C.gray : C.amb[2]) : P.DIM);
      K.col(hNames[i], P.lightCol(t, i ? A.top : A.pool, C.amb[2]));
    });
    BANDS.forEach((d, i) => {
      P.vin(hBandVals[i], a4, a4); P.vin(hBandNames[i], a4, a4); K.put(hBandVals[i], t < d.t ? "··" : P.pct(d.v, 1, true));
      K.col(hBandVals[i], t >= d.t ? (d.v < 0 ? C.gray : C.amb[2]) : P.DIM);
      K.col(hBandNames[i], P.lightCol(t, i < 2 ? A.worse : A.avoid, i < 2 ? C.text : C.amb[2]));
    });
    P.vin(hZero, a, a); K.at(hZero, 180, 530 - 20 * bandP);
    show(hLesson, a4, t, A.avoid); P.vin(hNote, a, a);
    if (!cvH.begin(a)) return;
    const ctx = cvH.ctx;
    const bar = (d, aa, scale, bw, zero) => {
      ctx.globalAlpha = aa;
      const hh = d.v * scale * on(t, d.t, 0.75);
      ctx.fillStyle = "#151820"; ctx.fillRect(d.x - bw / 2, 400, bw, 232);
      if (d === hTwo[1]) {
        const band = 0.2 * on(t, A.top, 0.22) + 0.15 * P.pulse(t, A.top, 0.1, 0.35);
        ctx.fillStyle = K.rgba(C.amb[2], band);
        ctx.fillRect(d.x - bw / 2, 400, bw, 232);
        ctx.strokeStyle = K.rgba(C.amb[2], on(t, A.allStocks, 0.18));
        ctx.lineWidth = 2; ctx.strokeRect(d.x - bw / 2 + 1, 401, bw - 2, 230);
      }
      ctx.fillStyle = d.v < 0 ? "#6b707a" : C.amb[1]; ctx.fillRect(d.x - bw / 2, hh > 0 ? zero - hh : zero, bw, Math.max(1, Math.abs(hh)));
      ctx.fillStyle = d.v < 0 ? C.gray : C.amb[2]; ctx.fillRect(d.x - bw / 2, zero - hh, bw, 2);
    };
    hTwo.forEach((d) => bar(d, a2, 1200, 224, 550)); BANDS.forEach((d) => bar(d, a4, 740, 148, 530));
    ctx.globalAlpha = a; ctx.fillStyle = "#8a8f98"; ctx.fillRect(220, 550 - 20 * bandP, 1490, 1);
    if (bandP > 0 && t >= A.worse) {
      ctx.globalAlpha = a4 * on(t, A.worse); ctx.strokeStyle = C.gray; ctx.lineWidth = 1;
      for (const d of BANDS.slice(0, 2)) ctx.strokeRect(d.x - 83.5, 522.5, 167, Math.abs(d.v) * 740 + 16);
    }
    if (bandP > 0 && t >= A.win) {
      ctx.globalAlpha = a4 * on(t, A.win); ctx.strokeStyle = C.amb[1]; ctx.lineWidth = 1;
      for (const d of BANDS.slice(2)) ctx.strokeRect(d.x - 82.5, 530 - d.v * 740 - 7.5, 165, d.v * 740 + 15);
    }
  };

  // ================= I：已知风格，不能算独立选股能力（69）=================
  const pI = K.panel(si, 140, 236, 1640, 540, C.amb[1], "CONCLUSION · 模型主要学会了什么");
  const cvI = P.layer(si);
  const iHead = P.tx(si, 200, 302, "模型主要挑了这两类股票", SANS(40, 800), C.text);
  const iTiles = [P.tile(si, 270, 390, 620, 134, "特质波动低", "扣掉市场后的自身波动", 40), P.tile(si, 1030, 390, 620, 134, "换手冷清", "风险模型里的流动性风格", 40)];
  const iKnown = P.say(si, 600, 590, 900, 69, "这类风格早有人研究", SANS(40, 800));
  const iAnswer = P.say(si, 410, 674, 1250, 69, "不算独立的选股能力", SANS(52, 900));
  const upI = (t) => {
    const a = pI.up(t, T[69], win.t1 - 0.3, 0.3);
    show(iHead, a, t, A.learned); iTiles.forEach((d, i) => d.up(t, a, i ? A.quiet : A.lowRV, C.amb));
    show(iKnown.el, a, t, T[69] + 0.2); show(iAnswer.el, a, t, T[69] + 0.3);
    if (a > 0) { iKnown.paint(t, C.amb[2]); iAnswer.paint(t); }
    if (!cvI.begin(a)) return;
    const ctx = cvI.ctx, q = on(t, A.known, 0.6);
    ctx.globalAlpha = a;
    if (q > 0) { ctx.strokeStyle = C.amb[1]; ctx.lineWidth = 1; P.poly(ctx, [[580, 536], [580, 558], [1340, 558], [1340, 536]], q); }
    const r = on(t, A.ability, 0.45);
    if (r > 0) { ctx.fillStyle = C.main[1]; ctx.fillRect(410, 744, 1050 * r, 2); }
  };

  return (t) => {
    upA(t < T[56] + 0.35 ? t : -1);
    upB(t > T[56] - 0.2 && t < T[57] + 0.35 ? t : -1);
    upC(t > T[57] - 0.2 && t < T[61] + 0.35 ? t : -1);
    upD(t > T[61] - 0.2 && t < T[64] + 0.35 ? t : -1);
    upE(t > T[64] - 0.2 && t < T[65] + 0.35 ? t : -1);
    upF(t > T[65] - 0.2 && t < T[66] + 0.35 ? t : -1);
    upG(t > T[66] - 0.2 && t < T[67] + 0.35 ? t : -1);
    upH(t > T[67] - 0.2 && t < T[69] + 0.35 ? t : -1);
    upI(t > T[69] - 0.2 ? t : -1);
  };
});
