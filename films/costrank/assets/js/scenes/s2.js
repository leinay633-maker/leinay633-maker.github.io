// 第 2 章 · 先写规则，再看结果（第 28–40 句）。
// A 射箭画靶的比喻；B 1521 次登记试验的真实条带；C 原地保留到章末的 2 × 2。
// 主要检验、块抽样和功效都只连接 S4P4 与 S2P2；另外两格直到第 40 句才填数。
K.scene("s2", (si, win) => {
  const C = K.C;
  const MONO = P.mono;
  const SANS = P.sans;
  const L = (n) => K.seg(n).t0 - 0.08;
  const at = (n, s, k = 1) => K.w(n, s, k) - 0.08;
  const WHITE = ["#73716d", "#c9c4bb", C.text];
  const MUTED = "#7d828c";
  const on = (t, a) => K.prog(t, a, a + 0.3);
  const hide = (els, a) => els.forEach((e) => P.vin(e, a, a));
  const band = (ctx, t, tm, x, y, w, h, color, strength = 0.34) => {
    const p = K.eo(K.prog(t, tm, tm + 0.22));
    const fade = 1 - K.prog(t, tm + 0.22, tm + 0.8);
    if (p <= 0 || fade <= 0) return;
    ctx.save();
    ctx.globalAlpha *= strength * fade;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w * p, h);
    ctx.restore();
  };

  // ---- 逐词时刻 ----
  const t28 = win.t0;
  const tRepeat = at(28, "反复试");
  const tPretty = at(28, "好看");
  const tArrow = at(28, "射箭");
  const tTarget = at(28, "画个靶子");
  const t29 = L(29);
  const tRegister = at(29, "登记");
  const tFail = at(29, "失败");
  const tDebug = at(29, "调试");
  const tTrials = at(29, "1521");
  const tTrialsSaid = at(29, "次");
  const t30 = L(30);
  const tMean = at(30, "平均值");
  const tVol = at(30, "波动");
  const tFrozenPoint = at(30, "冻结方案");
  const tAnnual = at(30, "年化");
  const tSharpe = at(30, "0.22");
  const t31 = L(31);
  const tEstimate = at(31, "估算");
  const tLuck = at(31, "运气");
  const tHighest = at(31, "最高值");
  const tExpected = at(31, "2.74");
  const t32 = L(32);
  const tPost = at(32, "事后");
  const tPicked = at(32, "漂亮曲线");
  const tNew = at(32, "新数据");
  const tRetest = at(32, "检验");
  const t33 = L(33);
  const tSignal = at(33, "信号");
  const tPortfolio = at(33, "组合");
  const tFour = at(33, "四种搭配");
  const tData = at(33, "数据");
  const tLedger = at(33, "账本");
  const t34 = L(34);
  const tBefore = at(34, "之前");
  const tPrimary = at(34, "主要检验");
  const tConditions = at(34, "冻结条件");
  const tWritten = at(34, "写好了");
  const t35 = L(35);
  const tComplex = at(35, "复杂方案");
  const tFactors = at(35, "因子");
  const tRisk = at(35, "风险模型");
  const tSimple = at(35, "简单方案");
  const tTen = at(35, "10个");
  const tCost = at(35, "成本");
  const tTurnover = at(35, "换手");
  const t36 = L(36);
  const tIR = at(36, "信息比率");
  const t054 = at(36, "0.54");
  const t041 = at(36, "0.41");
  const tDiff = at(36, "0.13");
  const t37 = L(37);
  const tBlock = at(37, "20天");
  const tPair = at(37, "两条收益");
  const tResample = at(37, "反复抽");
  const tCount = at(37, "一万次");
  const tP = at(37, "0.84");
  const tNoDiff = at(37, "没分出");
  const t38 = L(38);
  const tGap = at(38, "差距");
  const tMDE = at(38, "1.73");
  const tPower = at(38, "八成");
  const t39 = L(39);
  const tNotUseless = at(39, "不等于");
  const tFourRules = at(39, "四条");
  const tOneRule = at(39, "一条");
  const tByRule = at(39, "照规则");
  const tFreeze = at(39, "冻结", 2);
  const t40 = L(40);
  const tBest = at(40, "最高");
  const tFactorCost = at(40, "因子库");
  const t118 = at(40, "1.18");
  const tNotCandidate = at(40, "不是事先定的候选");
  const tReport = at(40, "只报告");

  const N = CR.trials.sharpe.length;
  const valid = CR.trials.sharpe.map((v, i) => ({ v, i })).filter((p) => p.v !== null).sort((a, b) => a.v - b.v || a.i - b.i);
  const missing = N - valid.length;
  const frozenValue = CR.trials.sharpe[CR.trials.frozen];
  const conditions = [
    CR.conditions["primary_p_below_0.05"],
    CR.conditions.ridge_point_estimate_positive,
    CR.conditions.s4p4_not_below_s2p4_and_s4p2_cost,
    CR.conditions.s4p4_fallback_at_most_5pct && CR.conditions.tracking_errors_at_least_2pct,
  ];
  const passed = conditions.filter(Boolean).length;

  // ---- HUD：读数按旁白推进，不先交代结果 ----
  const tele = (t) => {
    if (t >= tP + 0.65) return `▸ ${P.fn(CR.cells.S4P4)} VS ${P.fn(CR.cells.S2P2)} · Δ ${P.fs(CR.primary.diff)} · SE ${P.fn(CR.primary.se)} · P ${P.fn(CR.primary.p)}` + (t >= tMDE + 0.65 ? ` · MDE ${P.fn(CR.primary.mde)}` : "");
    if (t >= t33) return "▸ 2 × 2 · SIGNAL S2 / S4 × PORTFOLIO P2 / P4 · SAME DATA · SAME LEDGER";
    if (t >= tTrialsSaid) return `▸ TRIALS ${N} · ${valid.length} WITH SHARPE` + (t >= tExpected + 0.65 ? ` · E[MAX | NO SKILL] ≈ ${P.fn(CR.trials.expectedMax)}` : "");
    return "▸ TRIALS · EVERY CONFIG REGISTERED";
  };
  const titles = [
    { t: t28, text: "先射箭，再围着箭{画靶子}" },
    { t: t29, text: "试过的配置，{全部登记}" },
    { t: t30, text: "冻结配置的{年化夏普}" },
    { t: t31, text: "纯靠运气，也能挑出{好看的最高值}" },
    { t: t32, text: "事后挑出来，要用{新数据}检验" },
    { t: t33, text: "信号 × 组合，{四种搭配}" },
    { t: t34, text: "主要检验，{只设一个}" },
    { t: t35, text: "复杂方案，对{简单方案}" },
    { t: t36, text: "信息比率的差，{有多大}" },
    { t: t37, text: "成块重抽，{两条收益一起}" },
    { t: t38, text: "多大的差，才有{八成把握}" },
    { t: t39, text: "照规则，{冻结简单方案}" },
    { t: t40, text: "四格里最高的，{只报告}" },
  ];
  K.plans.push({ t0: win.t0, t1: win.t1, chip: "02", chap: "先写规则，再看结果", lab: "RULES BEFORE RESULTS · 先写规则，再看结果", tele, titles });
  K.plates.push({ t0: win.t0, t1: win.t1, text: "v0.4 · 2 × 2 · 1 PRIMARY TEST" });
  P.dock.push({ t0: win.t0, t1: win.t1, st: (t) => ({ lit: { dev: 1, warm: 0.35, hold: P.pulse(t, tNew, 0.12, 0.8) }, lock: 1, folds: 1, days: P.PAPER_DONE }) });

  // ================= A：先射箭，再画靶（第 28 句，全部是比喻/示意）=================
  const pA1 = K.panel(si, 140, 236, 800, 540, C.gray, "REPEATED TRIALS · 同一段历史");
  const pA2 = K.panel(si, 980, 236, 800, 540, C.gray, "AFTER THE SHOT · 围着箭画靶");
  const cvA = P.layer(si);
  const aTitle = P.tx(si, 190, 304, "反复试同一段历史", SANS(40, 800), C.text);
  const aPick = P.tx(si, 190, 660, "再挑一条好看的", SANS(30, 800), C.text);
  const aWall = P.tx(si, 1030, 304, "同一面墙", SANS(40, 800), MUTED);
  const aTarget = P.ctr(si, 1380, 686, "箭先钉住，靶心跟着画", SANS(30, 800), C.text);
  const aIll = P.tag(si, 910, 727, "ILLUSTRATIVE · 示意");
  const aMet = P.tag(si, 1750, 727, "比喻 · METAPHOR");
  const curveA = Array.from({ length: 14 }, (_, i) => {
    let sum = 0;
    return Array.from({ length: 57 }, (_, j) => {
      sum += (K.hash(i + 71, j + 13) - 0.46) * 15;
      return [200 + j / 56 * 680, 560 - sum - j * (i === 9 ? 1.7 : 0.3)];
    });
  });
  const upA = (t) => {
    const a = pA1.up(t, t28, t29 - 0.1, 0.3);
    pA2.up(t, t28, t29 - 0.1, 0.3);
    hide([aTitle, aWall, aIll, aMet], a);
    P.vin(aPick, a, a * on(t, tPretty));
    P.vin(aTarget, a, a * on(t, tTarget));
    if (!cvA.begin(a)) return;
    const ctx = cvA.ctx;
    ctx.globalAlpha = a;
    ctx.fillStyle = "#2a2d33";
    ctx.fillRect(200, 612, 680, 1);
    ctx.fillRect(200, 394, 1, 218);
    ctx.strokeStyle = "#2a2d33";
    ctx.lineWidth = 1;
    ctx.strokeRect(1030.5, 384.5, 690, 267);
    for (let y = 451; y < 651; y += 67) {
      ctx.beginPath();
      ctx.moveTo(1031, y + 0.5);
      ctx.lineTo(1720, y + 0.5);
      ctx.stroke();
    }
    for (let i = 0; i < 4; i++) ctx.fillRect(1118 + i * 172, 385, 1, 266);
    for (let i = 0; i < curveA.length; i++) {
      const p = K.prog(t, tRepeat + i * 0.07, tPretty + 0.4 + i * 0.025);
      const picked = i === 9 ? on(t, tPretty) : 0;
      ctx.strokeStyle = K.mixHex("#3a3e46", C.text, picked);
      ctx.lineWidth = picked > 0 ? 2 : 1;
      P.poly(ctx, curveA[i], p);
    }
    const shot = K.eo(K.prog(t, tArrow, tArrow + 0.4));
    if (shot > 0) {
      const tipX = K.lerp(1080, 1390, shot);
      const tipY = K.lerp(602, 513, shot);
      P.arrow(ctx, tipX - 126, tipY + 36, tipX, tipY, C.text, 15);
      P.poly(ctx, [[tipX - 113, tipY + 32], [tipX - 125, tipY + 21], [tipX - 126, tipY + 36], [tipX - 135, tipY + 46]], 1);
    }
    const ring = K.prog(t, tTarget - 0.35, tTarget + 0.55);
    for (let i = 0; i < 4; i++) {
      const q = K.c01((ring * 1.35 - i * 0.11) / 0.9);
      if (q <= 0) continue;
      ctx.strokeStyle = i ? "#8a8f98" : C.text;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(1390, 513, 34 + i * 36, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * q);
      ctx.stroke();
    }
    if (shot >= 1) {
      ctx.fillStyle = C.text;
      ctx.beginPath();
      ctx.arc(1390, 513, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  // ================= B：真实登记试验（第 29–32 句）=================
  const pB = K.panel(si, 140, 236, 1640, 540, C.gray, "TRIAL REGISTRY · 所有配置都留下记录");
  const cvB = P.layer(si);
  const TX = (v) => 190 + (v + 2.5) / 6 * 1188;
  // 横坐标保留真实夏普；近邻之间找最低空行，只改变纵向堆叠。
  let near = [];
  const dots = valid.map((p) => {
    const x = TX(p.v);
    near = near.filter((q) => x - q.x < 4.8);
    const used = new Set(near.map((q) => q.row));
    let row = 0;
    while (used.has(row)) row++;
    const q = { ...p, x, row, y: 632 - row * 4.9 };
    near.push(q);
    return q;
  });
  const frozen = dots.find((p) => p.i === CR.trials.frozen);
  const bIntro = P.tx(si, 190, 303, "试过的配置全部登记", SANS(40, 800), C.text);
  const bFormula = [
    P.tx(si, 190, 304, "夏普 =", SANS(30, 800), C.text),
    P.tx(si, 322, 304, "每天收益的平均值", SANS(30, 700), C.text),
    P.tx(si, 596, 304, "÷ 波动", SANS(30, 700), C.text),
    P.tx(si, 736, 304, "× √252", MONO(30, 700), C.text),
  ];
  const bEstimate = P.tx(si, 190, 304, "按登记试验估算 · 无技能时最大值的期望", SANS(28, 700), C.text);
  const bExplain = P.tx(si, 190, 346, "纯靠运气挑出的最高值，平均能到哪里", P.MONO20, MUTED);
  const bTotal = P.txr(si, 1740, 302, "··", MONO(100), C.text);
  const bTotalL = P.tx(si, 1430, 420, "次配置 · 全部登记", SANS(26, 700), C.text);
  const bFailure = P.tx(si, 1430, 467, "失败 · 没跑完的情景", SANS(22, 700), MUTED);
  const bDebug = P.tx(si, 1430, 504, "调试也登记", SANS(22, 700), MUTED);
  const bFreezeL = P.tx(si, 1430, 563, "冻结配置 · 年化夏普", SANS(22, 700), MUTED);
  const bFreezeV = P.tx(si, 1424, 600, "··", MONO(82), C.main[2]);
  const bValid = P.tx(si, 190, 692, "有年化夏普 · ··", P.MONO20, MUTED);
  const bNull = P.tx(si, 190, 726, "无夏普 · ··", P.MONO20, MUTED);
  const bAxisL = P.txr(si, 1380, 664, "年化夏普", P.MONO20, MUTED);
  const bTicks = [-2, -1, 0, 1, 2, 3].map((v) => P.ctr(si, TX(v), 655, v < 0 ? P.fn(v, 0) : K.fmt(v), P.MONO20, MUTED));
  const bExpected = P.ctr(si, TX(CR.trials.expectedMax), 374, "··", MONO(54), C.text);
  const bNotCap = P.ctr(si, TX(CR.trials.expectedMax), 438, "期望，不是上限", SANS(20, 700), MUTED);
  const bPost = P.txr(si, 1378, 550, "事后挑的", SANS(22, 700), MUTED);
  const bNew = P.tag(si, 1750, 717, "新数据 · 再检验", MUTED);
  const upB = (t) => {
    const a = pB.up(t, t29, t33 - 0.1, 0.3);
    const formulaA = a * P.win(t, t30, t31 - 0.1, 0.25, 0.2);
    P.vin(bIntro, a, a * (1 - on(t, t30 - 0.1)));
    bFormula.forEach((e, i) => {
      P.vin(e, a, formulaA);
      K.col(e, P.lightCol(t, [t30, tMean, tVol, tAnnual][i], C.text, MUTED));
    });
    P.vin(bEstimate, a, a * on(t, tEstimate));
    P.vin(bExplain, a, a * on(t, tLuck));
    hide([bTotal, bTotalL, bAxisL, bValid, bNull, ...bTicks], a);
    // 登记开始就计数，念到总次数时落定；条带保留原来的真实夏普顺序。
    K.put(bTotal, t < tRegister ? "··" : K.fmt(Math.floor(N * K.prog(t, tRegister, tTrials))));
    K.col(bTotal, t < tRegister ? MUTED : C.text);
    if (t >= tTrials) P.glow(bTotal, t, tTrials, WHITE);
    P.vin(bFailure, a, a * on(t, tFail));
    P.vin(bDebug, a, a * on(t, tDebug));
    P.vin(bFreezeL, a, a * on(t, t30));
    P.vin(bFreezeV, a, a * on(t, t30));
    K.put(bFreezeV, t < tSharpe ? "··" : P.fn(frozenValue));
    K.col(bFreezeV, t < tSharpe ? MUTED : C.main[2]);
    if (t >= tSharpe) P.glow(bFreezeV, t, tSharpe, C.main);
    K.put(bValid, `有年化夏普 · ${t >= tTrialsSaid ? K.fmt(valid.length) : "··"}`);
    K.put(bNull, `无夏普 · ${t >= tTrialsSaid ? K.fmt(missing) : "··"}`);
    P.vin(bExpected, a, a * on(t, tHighest));
    K.put(bExpected, t < tExpected ? "··" : P.fn(CR.trials.expectedMax));
    K.col(bExpected, t < tExpected ? MUTED : C.text);
    P.vin(bNotCap, a, a * on(t, tExpected));
    P.vin(bPost, a, a * on(t, tPost));
    P.vin(bNew, a, a * on(t, tNew));
    K.col(bNew, K.mixHex(MUTED, C.text, Math.max(P.pulse(t, tNew), P.pulse(t, tRetest))));
    if (!cvB.begin(a)) return;
    const ctx = cvB.ctx;
    ctx.globalAlpha = a;
    ctx.fillStyle = "#2a2d33";
    ctx.fillRect(190, 647, 1188, 1);
    for (let v = -2.5; v <= 3.5; v += 0.5) ctx.fillRect(TX(v), 648, 1, Number.isInteger(v) ? 7 : 4);
    const fill = K.prog(t, tRegister, tTrials + 0.7);
    const fp = on(t, tFrozenPoint);
    for (let j = 0; j < dots.length; j++) {
      const p = dots[j];
      const q = K.c01((fill * 1.12 - j / dots.length) / 0.12);
      if (q <= 0) continue;
      ctx.globalAlpha = a * q;
      const selected = p.i === CR.trials.frozen;
      ctx.fillStyle = selected && fp > 0 ? K.mixHex("#8a8f98", C.main[2], fp) : "#9a9b9c";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
    for (let j = 0; j < missing; j++) {
      const q = K.c01((K.prog(t, tFail, tTrials + 0.4) * 1.12 - j / missing) / 0.12);
      ctx.globalAlpha = a * q;
      ctx.fillStyle = "#7d828c";
      ctx.beginPath();
      ctx.arc(454 + j * 5.6, 741, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = a;
    if (fp > 0) {
      ctx.strokeStyle = K.rgba(C.main[2], fp);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(frozen.x, frozen.y, 8 + 4 * P.pulse(t, tSharpe), 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = K.rgba(C.main[1], fp * 0.65);
      ctx.fillRect(frozen.x, frozen.y + 9, 1, 647 - frozen.y - 9);
      ctx.fillRect(frozen.x - 4, 644, 9, 5);
    }
    const ex = on(t, tExpected);
    if (ex > 0) {
      ctx.globalAlpha = a * ex;
      ctx.fillStyle = C.text;
      ctx.fillRect(TX(CR.trials.expectedMax), 477, 1, 170 * K.eo(ex));
    }
    const post = on(t, tPicked);
    if (post > 0) {
      ctx.globalAlpha = a * post;
      P.dashRect(ctx, TX(2.8) - 6, 582, TX(valid[valid.length - 1].v) - TX(2.8) + 18, 56, MUTED, 5);
    }
    const fresh = K.eo(K.prog(t, tNew, tRetest + 0.3));
    if (fresh > 0) {
      ctx.globalAlpha = a;
      ctx.strokeStyle = MUTED;
      ctx.lineWidth = 1;
      P.poly(ctx, [[1340, 638], [1398, 638], [1398, 731], [1434, 731]], fresh);
      if (fresh >= 1) P.arrow(ctx, 1422, 731, 1434, 731, MUTED, 7);
    }
    ctx.globalAlpha = a;
    band(ctx, t, tNew, 1434, 710, 316, 42, C.main[2], 0.38);
    band(ctx, t, tRetest, 1434, 710, 316, 42, C.main[2], 0.38);
  };

  // ================= C：2 × 2 常驻舞台（第 33–40 句）=================
  const pC1 = K.panel(si, 140, 236, 950, 540, C.gray, "2 × 2 · SIGNAL × PORTFOLIO");
  const pC2 = K.panel(si, 1120, 236, 660, 540, C.gray, "PROTOCOL v0.4 · 对角两格的比较");
  const cvC = P.layer(si);
  const colC = [
    P.ctr(si, 506, 298, "P2", MONO(36), C.text),
    P.ctr(si, 878, 298, "P4", MONO(36), C.text),
    P.ctr(si, 506, 346, "成本约束 · 线性规划", SANS(20, 700), MUTED),
    P.ctr(si, 878, 346, "风险模型 + 均值方差", SANS(20, 700), MUTED),
  ];
  const rowC = [
    P.tx(si, 168, 417, "S2", MONO(36), C.text),
    P.tx(si, 168, 468, "10 个量价特征", SANS(22, 700), MUTED),
    P.tx(si, 168, 587, "S4", MONO(36), C.text),
    P.tx(si, 168, 638, "因子库", SANS(22, 700), MUTED),
  ];
  const cells = [
    { id: "S2P2", x: 344, y: 394, ts: t041, role: "简单方案", rt: tSimple },
    { id: "S2P4", x: 716, y: 394, ts: t40 + 0.2 },
    { id: "S4P2", x: 344, y: 564, ts: t118 },
    { id: "S4P4", x: 716, y: 564, ts: t054, role: "复杂方案", rt: tComplex },
  ].map((c) => ({
    ...c,
    lab: P.tx(si, c.x + 18, c.y + 12, c.id, MONO(20, 700), MUTED),
    num: P.ctr(si, c.x + 162, c.y + (c.role ? 52 : 42), "··", MONO(c.role ? 70 : 64), MUTED),
    roleEl: P.txr(si, c.x + 304, c.y + 12, c.role || "", SANS(22, 700), C.text),
    report: c.role ? null : P.tag(si, c.x + 308, c.y + 114, "REPORT ONLY · 只报告", MUTED),
  }));
  const cCommon = P.ctr(si, 694, 733, "同一份数据 · 同一个账本 · 同一套折", SANS(24, 700), MUTED);
  const cPrimary = P.ctr(si, 694, 733, "S4P4 ↔ S2P2 · 唯一的主要检验", MONO(24, 700), C.text);
  const cIR = P.tx(si, 168, 733, "净 IR", MONO(20, 700), MUTED);

  // 右侧的内容原地交接；矩阵及唯一比较的连线一直保留。
  const dTitle = P.tx(si, 1150, 304, "同样的输入", SANS(40, 800), C.text);
  const dRows = ["同一份数据", "同一个账本", "同一套折"].map((s, i) => P.tx(si, 1210, 408 + i * 91, s, SANS(32, 700), MUTED));
  const dRuleTitle = P.tx(si, 1150, 304, "写在看结果之前", SANS(40, 800), C.text);
  const dRuleSub = P.tx(si, 1150, 362, "一个主要检验 · 四条冻结条件", SANS(24, 700), MUTED);
  const ruleText = ["主要检验 p < 0.05", "Ridge 同一比较也为正", "复杂方案不低于另两格", "求解失败 ≤ 5% · 跟踪误差 ≥ 2%"];
  const ruleRows = ruleText.map((s, i) => P.tx(si, 1190, 418 + i * 64, s, SANS(20, 700), MUTED));
  const ruleActual = P.tx(si, 1190, 508, "实际 −0.56", MONO(20, 700), MUTED);
  const ruleLock = P.tx(si, 1190, 706, "条件锁定，尚未看结果", SANS(24, 700), MUTED);
  const ruleTitle = P.tx(si, 1150, 304, "四条冻结条件", SANS(40, 800), C.text);
  const ruleMeaning = P.tx(si, 1150, 362, "未检出差别 ≠ 复杂方案没用", SANS(26, 700), MUTED);
  const ruleCount = P.tx(si, 1150, 670, "·· / ··", MONO(76), MUTED);
  const ruleCountL = P.tx(si, 1460, 706, "条满足", SANS(26, 700), MUTED);

  const eTitle = P.tx(si, 1150, 304, "只比对角这两格", SANS(40, 800), C.text);
  const eCompare = P.tx(si, 1150, 374, "S4P4 − S2P2", MONO(26, 700), MUTED);
  const eLabel = P.tx(si, 1150, 445, "信息比率的差", SANS(28, 700), MUTED);
  const eDiff = P.tx(si, 1144, 488, "··", MONO(110), C.text);
  const eFormula = P.tx(si, 1150, 632, "·· − ·· = ··", MONO(32, 700), MUTED);
  const eBasis = P.tx(si, 1150, 716, "VS 0.95 × POOL EW · 已扣成本", MONO(20, 700), MUTED);

  const fPLabel = P.tx(si, 1150, 332, "p =", MONO(50, 700), C.text);
  const fP = P.tx(si, 1300, 299, "··", MONO(104), C.text);
  const fFinding = P.tx(si, 1150, 416, "没分出可靠的差别", SANS(30, 800), C.text);
  const fSE = P.tx(si, 1150, 460, "差 ·· · 标准误 ··", MONO(24, 700), MUTED);
  const fMethod = P.tx(si, 1150, 501, "循环块 bootstrap · 块长 ·· 天", SANS(20, 700), MUTED);
  const fDays = P.tx(si, 1150, 546, `${K.fmt(CR.series.dev.active.length)} 天 · 两条收益同步重抽`, SANS(20, 700), MUTED);
  const fCount = P.tx(si, 1150, 638, "··", MONO(60), C.text);
  const fCountL = P.tx(si, 1430, 666, "次", SANS(24, 700), MUTED);
  const fIll = P.tag(si, 1750, 727, "ILLUSTRATIVE · 示意", MUTED);
  // 20 天和 10,000 次是已声明的方法参数；不从示意图推算任何抽样分布。
  const blockDays = 20;
  const repeats = 10000;
  const nDays = CR.series.dev.active.length;
  const blocks = Array.from({ length: Math.ceil(nDays / blockDays) }, (_, i) => Math.min(blockDays, nDays - i * blockDays));
  const blockX = (i) => 1150 + i * (600 / blocks.length);
  const moving = [2, 11, 24, 36, 45, 58];

  const gTitle = P.tx(si, 1150, 304, "最小可检出差", SANS(40, 800), C.text);
  const gMDE = P.tx(si, 1144, 366, "··", MONO(104), C.text);
  const gCompare = P.tx(si, 1150, 488, "S4P4 − S2P2 · 仅此比较", MONO(20, 700), MUTED);
  const gObs = P.tx(si, 1150, 623, `观测差 ${P.fs(CR.primary.diff)}`, MONO(28, 700), MUTED);
  const gPower = P.tx(si, 1150, 675, "检出的把握才有八成", SANS(30, 800), C.text);
  const gNote = P.tx(si, 1150, 725, "双侧 5% · 功效 80% · 非硬门槛", SANS(20, 700), MUTED);
  const powerTicks = [0, 0.5, 1, 1.5, 2].map((v) => P.ctr(si, 1170 + v / 2 * 550, 587, P.fn(v, v % 1 ? 1 : 0), MONO(20, 700), MUTED));

  const hTitle = P.tx(si, 1150, 304, "四格里最高的", SANS(40, 800), C.text);
  const hID = P.tx(si, 1150, 369, "S4P2 · 因子库 + 成本约束", SANS(26, 700), MUTED);
  const hV = P.tx(si, 1144, 420, "··", MONO(104), C.gray);
  const hRule = P.tx(si, 1150, 557, "不是事先定的候选", SANS(32, 800), C.text);
  const hReport = P.tag(si, 1150, 626, "REPORT ONLY · 只报告", MUTED, true);
  const hText = P.tx(si, 1150, 708, "不是事先定的候选 · 只报告", SANS(24, 700), MUTED);

  const upRight = (t, a, ctx) => {
    const inputA = a * P.win(t, t33, t34 - 0.1, 0.3, 0.2);
    const previewA = a * P.win(t, t34, t36 - 0.1, 0.3, 0.2);
    const diffA = a * P.win(t, t36, t37 - 0.1, 0.3, 0.2);
    const sampleA = a * P.win(t, t37, t38 - 0.1, 0.3, 0.2);
    const powerA = a * P.win(t, t38, t39 - 0.1, 0.3, 0.2);
    const rulesA = a * P.win(t, t39, t40 - 0.1, 0.3, 0.2);
    const reportA = a * on(t, t40);
    hide([dTitle, ...dRows], inputA);
    dRows.forEach((e, i) => K.col(e, P.lightCol(t, [tData, tLedger, tFour][i], C.text, MUTED)));
    hide([dRuleTitle, dRuleSub], previewA);
    P.vin(ruleLock, previewA, previewA * on(t, tWritten));
    const ruleA = Math.max(previewA * on(t, tConditions), rulesA);
    hide(ruleRows, ruleA);
    const ruleTimes = conditions.map((_, i) => K.lerp(tFourRules, tOneRule - 0.15, i / (conditions.length - 1)));
    ruleRows.forEach((e, i) => K.col(e, rulesA > 0 ? P.lightCol(t, ruleTimes[i], conditions[i] ? C.main[2] : MUTED, MUTED) : MUTED));
    P.vin(ruleActual, rulesA, rulesA * on(t, ruleTimes[1]));
    hide([ruleTitle, ruleCount, ruleCountL], rulesA);
    P.vin(ruleMeaning, rulesA, rulesA * on(t, tNotUseless));
    K.put(ruleCount, t >= tOneRule ? `${K.fmt(passed)} / ${K.fmt(conditions.length)}` : "·· / ··");
    K.col(ruleCount, t >= tOneRule ? C.text : MUTED);
    hide([eTitle, eCompare, eLabel, eDiff, eFormula, eBasis], diffA);
    K.col(eLabel, P.lightCol(t, tIR, C.text, MUTED));
    K.put(eDiff, t >= tDiff ? P.fs(CR.primary.diff) : "··");
    K.put(eFormula, `${t >= t054 ? P.fn(CR.cells.S4P4) : "··"} − ${t >= t041 ? P.fn(CR.cells.S2P2) : "··"} = ${t >= tDiff ? P.fs(CR.primary.diff) : "··"}`);
    if (t >= tDiff) P.glow(eDiff, t, tDiff, WHITE);
    hide([fPLabel, fP, fSE, fMethod, fDays, fCount, fCountL, fIll], sampleA);
    P.vin(fFinding, sampleA, sampleA * on(t, tNoDiff));
    K.put(fP, t >= tP ? P.fn(CR.primary.p) : "··");
    K.col(fP, t >= tP ? C.text : MUTED);
    if (t >= tP) P.glow(fP, t, tP, WHITE);
    K.put(fSE, `差 ${P.fs(CR.primary.diff)} · 标准误 ${t >= tP ? P.fn(CR.primary.se) : "··"}`);
    K.put(fMethod, `循环块 bootstrap · 块长 ${t >= tBlock ? K.fmt(blockDays) : "··"} 天`);
    K.put(fCount, t >= tCount ? K.roll(t, tCount, 1.15, 0, repeats) : "··");
    hide([gTitle, gMDE, gCompare, gObs, ...powerTicks], powerA);
    K.put(gMDE, t >= tMDE ? P.fn(CR.primary.mde) : "··");
    K.col(gMDE, t >= tMDE ? C.text : MUTED);
    if (t >= tMDE) P.glow(gMDE, t, tMDE, WHITE);
    P.vin(gPower, powerA, powerA * on(t, tPower));
    P.vin(gNote, powerA, powerA * on(t, tPower));
    hide([hTitle, hID, hV], reportA);
    K.col(hID, P.lightCol(t, tFactorCost, C.text, MUTED));
    K.put(hV, t >= t118 ? P.fn(CR.cells.S4P2) : "··");
    P.vin(hRule, reportA, reportA * on(t, tNotCandidate));
    P.vin(hReport, reportA, reportA * on(t, tReport));
    P.vin(hText, reportA, reportA * on(t, tReport));
    if (a <= 0.002) return;

    ctx.globalAlpha = inputA;
    for (let i = 0; i < dRows.length; i++) P.check(ctx, 1170, 432 + i * 91, 24, C.text, on(t, [tData, tLedger, tFour][i]), 2);
    ctx.globalAlpha = previewA * on(t, tBefore);
    P.lock(ctx, 1165, 722, 24, MUTED);
    for (let i = 0; i < ruleRows.length; i++) {
      ctx.globalAlpha = previewA * on(t, tConditions + i * 0.12);
      ctx.strokeStyle = "#3a3e46";
      ctx.strokeRect(1155.5, 423.5 + i * 64, 21, 21);
      ctx.globalAlpha = rulesA;
      const fn = conditions[i] ? P.check : P.cross;
      fn(ctx, 1166, 433 + i * 64, 24, conditions[i] ? C.main[2] : MUTED, on(t, ruleTimes[i]), 2.3);
    }

    // 一条 1212 天的细条，61 块，末块按 12/20 的实际宽度画。上下两道代表同步抽取的两条收益。
    if (sampleA > 0.002) {
      const cut = on(t, tBlock);
      const pair = on(t, tPair);
      const re = K.eo(K.prog(t, tResample, tP - 0.1));
      const bw = 600 / blocks.length;
      ctx.globalAlpha = sampleA;
      ctx.fillStyle = "#2a2d33";
      ctx.fillRect(1150, 578, 600, 23);
      for (let i = 0; i < blocks.length; i++) {
        const xx = blockX(i);
        const ww = bw * blocks[i] / blockDays - cut;
        ctx.fillStyle = K.mixHex("#646973", "#c9c4bb", K.hash(i, 17) * 0.6);
        ctx.fillRect(xx, 578, ww, 10);
        ctx.globalAlpha = sampleA * pair;
        ctx.fillStyle = "#737982";
        ctx.fillRect(xx, 591, ww, 10);
        ctx.globalAlpha = sampleA;
        if (re > 0) {
          ctx.globalAlpha = sampleA * re * 0.65;
          ctx.fillStyle = "#8a8f98";
          ctx.fillRect(xx, 612, ww, 5);
          ctx.fillStyle = "#5a5f68";
          ctx.fillRect(xx, 620, ww, 5);
        }
      }
      for (let j = 0; j < moving.length; j++) {
        const q = K.eio(K.prog(t, tResample + j * 0.12, tResample + 0.8 + j * 0.12));
        if (q <= 0) continue;
        const dest = [47, 7, 54, 18, 31, 3][j];
        const xx = K.lerp(blockX(moving[j]), blockX(dest), q);
        const yy = K.lerp(578, 612, q) - 17 * Math.sin(q * Math.PI);
        ctx.globalAlpha = sampleA;
        ctx.fillStyle = C.text;
        ctx.fillRect(xx, yy, bw - 1, 5);
        ctx.fillStyle = MUTED;
        ctx.fillRect(xx, yy + 8, bw - 1, 5);
      }
    }
    if (powerA > 0.002) {
      ctx.globalAlpha = powerA;
      const X = (v) => 1170 + v / 2 * 550;
      ctx.fillStyle = "#3a3e46";
      ctx.fillRect(X(0), 570, 550, 1);
      for (const v of [0, 0.5, 1, 1.5, 2]) ctx.fillRect(X(v), 571, 1, 8);
      ctx.fillStyle = C.text;
      ctx.fillRect(X(0), 564, (X(CR.primary.diff) - X(0)) * K.eo(on(t, tGap)), 12);
      const q = K.eo(on(t, tMDE));
      ctx.globalAlpha = powerA * q;
      ctx.fillRect(X(CR.primary.mde), 537, 1, 57 * q);
      ctx.beginPath();
      ctx.arc(X(CR.primary.mde), 570, 5, 0, Math.PI * 2);
      ctx.fill();
    }
    if (reportA > 0.002) {
      ctx.globalAlpha = reportA * on(t, tBest);
      P.dashRect(ctx, 1140, 414, 610, 121, MUTED, 8);
    }
  };

  const upC = (t) => {
    const a = pC1.up(t, t33, win.t1 - 0.3, 0.3);
    pC2.up(t, t33, win.t1 - 0.3, 0.3);
    K.put(pC2.lab, t >= t40 ? "REPORT ONLY · 非预设候选" : "PROTOCOL v0.4 · 对角两格的比较");
    colC.forEach((e, i) => {
      P.vin(e, a, a);
      const ta = i === 0 || i === 2 ? tPortfolio : tPortfolio + 0.15;
      K.col(e, P.lightCol(t, ta, i < 2 ? C.text : MUTED, MUTED));
    });
    rowC.forEach((e) => P.vin(e, a, a));
    K.col(rowC[0], P.lightCol(t, tSignal, C.text, MUTED));
    K.col(rowC[2], P.lightCol(t, tSignal + 0.18, C.text, MUTED));
    K.col(rowC[1], P.lightCol(t, tTen, C.text, MUTED));
    K.col(rowC[3], P.lightCol(t, tFactors, C.text, MUTED));
    K.col(colC[3], P.lightCol(t, tRisk, C.text, MUTED));
    K.col(colC[2], P.lightCol(t, tCost, C.text, MUTED));
    P.vin(cCommon, a, a * (1 - on(t, tPrimary - 0.1)));
    P.vin(cPrimary, a, a * on(t, tPrimary));
    P.vin(cIR, a, a * on(t, tIR));
    const freeze = K.eo(on(t, tFreeze));
    cells.forEach((c, i) => {
      P.vin(c.lab, a, a * on(t, tFour + i * 0.07));
      P.vin(c.num, a, a);
      K.put(c.num, t >= c.ts ? P.fn(CR.cells[c.id]) : "··");
      const isFrozen = c.id === "S2P2";
      const reportOnly = !c.role;
      K.col(c.num, t < c.ts ? MUTED : isFrozen && freeze > 0 ? K.mixHex(C.text, C.main[2], freeze) : reportOnly ? C.gray : C.text);
      if (c.role) {
        P.vin(c.roleEl, a, a * on(t, c.rt));
        K.put(c.roleEl, isFrozen && t >= tFreeze ? "FROZEN · 冻结" : c.role);
        c.roleEl.style.font = isFrozen && t >= tFreeze ? MONO(20, 700) : SANS(22, 700);
        K.col(c.roleEl, isFrozen ? K.mixHex(C.text, C.main[2], freeze) : C.text);
      } else {
        P.vin(c.roleEl, 0);
        P.vin(c.report, a, a * on(t, tReport));
      }
    });
    const draw = cvC.begin(a);
    const ctx = cvC.ctx;
    // 无论本层是否出场，右栏每个字块都调用一次，避免直接挂在 si 的文字跨层残留。
    upRight(t, a, ctx);
    if (!draw) return;
    ctx.globalAlpha = a;
    cells.forEach((c, i) => {
      const q = K.eo(on(t, tFour + i * 0.07));
      const frozenCell = c.id === "S2P2";
      const complexCell = c.id === "S4P4";
      const roleOn = c.role ? on(t, c.rt) : 0;
      const color = frozenCell ? K.mixHex(K.mixHex("#3a3e46", C.text, roleOn * 0.6), C.main[1], freeze) : complexCell ? K.mixHex("#3a3e46", C.text, roleOn * 0.65) : "#3a3e46";
      ctx.globalAlpha = a * (0.4 + 0.6 * q);
      ctx.fillStyle = frozenCell ? K.rgba(C.main[1], freeze * 0.065) : "#101319";
      K.rr(ctx, c.x, c.y, 324, 147, 10);
      ctx.fill();
      if (!c.role && t >= t40) P.dashRect(ctx, c.x, c.y, 324, 147, MUTED, 10);
      else {
        ctx.strokeStyle = color;
        ctx.lineWidth = frozenCell && freeze > 0 ? 1.5 : 1;
        ctx.stroke();
      }
      if (c.role && roleOn > 0) {
        ctx.globalAlpha = a * roleOn;
        ctx.fillStyle = frozenCell ? K.mixHex(C.text, C.main[1], freeze) : C.text;
        const pulse = P.pulse(t, c.rt, 0.12, 0.6) + (frozenCell ? P.pulse(t, tTurnover) * 0.3 + P.pulse(t, tByRule) * 0.25 : 0);
        ctx.fillRect(c.x + 1, c.y + 42, 2, 66 + pulse * 20);
      }
    });
    // 条带落在行底和列右沿的空白处，不盖行头、数字或方案标签。
    ctx.globalAlpha = a;
    [526, 696].forEach((y) => band(ctx, t, tSignal, 158, y, 882, 24, C.text));
    [634, 1006].forEach((x) => {
      ctx.save();
      ctx.translate(x, 376);
      ctx.rotate(Math.PI / 2);
      band(ctx, t, tPortfolio, 0, -32, 334, 32, C.text);
      ctx.restore();
    });
    band(ctx, t, tTen, 158, 462, 176, 38, C.main[2]);
    band(ctx, t, tTen, 354, 496, 304, 38, C.main[2]);
    const primary = on(t, tPrimary);
    if (primary > 0) {
      ctx.globalAlpha = a * primary;
      ctx.strokeStyle = "#8a8f98";
      ctx.lineWidth = 1;
      const pts = [[668, 522], [680, 522], [680, 551], [704, 551], [704, 590], [716, 590]];
      P.poly(ctx, pts, primary);
      P.arrow(ctx, 680, 522, 668, 522, "#8a8f98", 6);
      if (primary >= 1) P.arrow(ctx, 704, 590, 716, 590, "#8a8f98", 6);
    }
  };

  return (t) => {
    if (t < t29 + 0.4) upA(t);
    else upA(-1);
    if (t > t29 - 0.2 && t < t33 + 0.4) upB(t);
    else upB(-1);
    if (t > t33 - 0.2) upC(t);
    else upC(-1);
  };
});
