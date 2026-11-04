// 第 3 章 · 只开一次的 2025（242.605–322.840 秒）。
// 41–45：冻结记录 → 开启规则 → 前缀拦截 → 75 个账本文件复核 → 未读保留区间。
// 46–53：2025 区间常驻；下方依次叠加累计线 / 日收益散点、逐年点、补做声明和 2026 区间。
K.scene("s3", (si, win) => {
  const C = K.C;
  const MONO = P.mono;
  const SANS = P.sans;
  const L = (n) => K.seg(n).t0 - 0.08;
  const at = (n, s, k = 1) => K.w(n, s, k) - 0.08;
  // HUD 的完整读数等这一词念完再换；画面动作仍提前 0.08 秒。
  const said = (n, s) => {
    const t = K.w(n, s);
    return K.seg(n).words.find((w) => t >= w.t0 - 1e-6 && t < w.t1 - 1e-6)?.t1 || t;
  };
  const on = (t, a, d = 0.3) => K.eo(K.prog(t, a, a + d));
  const band = (ctx, t, tm, x, y, w, h, color, strength = 0.3) => {
    const p = on(t, tm, 0.22);
    const fade = 1 - K.prog(t, tm + 0.22, tm + 0.85);
    if (p <= 0 || fade <= 0) return;
    ctx.save();
    ctx.globalAlpha *= strength * fade;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w * p, h);
    ctx.restore();
  };
  const revealHash = (e, text, t, a, seed) => {
    const p = K.prog(t, a, a + 0.48);
    K.put(e, t < a ? "········…" : p < 1 ? K.scramble(text, p, seed + Math.floor(t * 30)) : text);
  };
  const H = CR.holdout;
  const HOLD = CR.series.hold;
  const N = HOLD.net.length;
  const YR = Object.entries(CR.irByYear);
  const DEV_MIN = Math.min(...YR.map((r) => r[1]));
  const DEV_MAX = Math.max(...YR.map((r) => r[1]));
  const t41 = win.t0 + 0.02;
  const tCode41 = at(41, "源码");
  const tConfig41 = at(41, "配置");
  const tDeps41 = at(41, "依赖");
  const tData41 = at(41, "开发数据");
  const tHash41 = at(41, "哈希");
  const tPrint41 = at(41, "数字指纹");
  const t42 = L(42);
  const tRecord42 = at(42, "记录");
  const tReject42 = at(42, "拒绝");
  const tFirst42 = at(42, "第一次");
  const tWrite42 = at(42, "写");
  const tCover42 = at(42, "不能覆盖");
  const tCred42 = at(42, "凭据");
  const t43 = L(43);
  const tHash43 = at(43, "哈希");
  const tMismatch43 = at(43, "对不上");
  const tStop43 = at(43, "拦");
  const t44 = L(44);
  const tDefect44 = at(44, "代码缺陷");
  const tFix44 = at(44, "修好");
  const tRun44 = at(44, "再跑一遍");
  const tLedger44 = at(44, "账本");
  const tByte44 = at(44, "逐字节");
  const tEqual44 = at(44, "一致");
  const tFreeze44 = at(44, "冻结");
  const tFreezeSaid44 = said(44, "冻结");
  const t45 = L(45);
  const tCheck45 = at(45, "排查");
  const tUnseen45 = at(45, "没看过");
  const tMarket45 = at(45, "航情");
  const t46 = L(46);
  const tOpen46 = at(46, "拆开");
  const tIR46 = at(46, "信息比率");
  const tM46 = at(46, "负0.43");
  const t95_46 = at(46, "95%");
  const tCI46 = at(46, "区间");
  const tLo46 = at(46, "负2.02");
  const tHi46 = at(46, "1.25");
  const tHiSaid46 = said(46, "1.25");
  const t47 = L(47);
  const tCombo47 = at(47, "组合");
  const tAnn47 = at(47, "年化");
  const tReturn47 = at(47, "13.4%");
  const tPool47 = at(47, "合格池");
  const tBeta47 = at(47, "贝塔");
  const tB47 = at(47, "0.32");
  const t48 = L(48);
  const tFollow48 = at(48, "跟着");
  const tDaily48 = at(48, "每天");
  const tMove48 = at(48, "涨跌");
  const tThird48 = at(48, "三成");
  const t49 = L(49);
  const tYear49 = at(49, "全年");
  const tPool49 = at(49, "20.3%");
  const tActive49 = at(49, "年化主动收益");
  const tNeg49 = at(49, "负7.7%");
  const t50 = L(50);
  const tReverse50 = at(50, "反过来");
  const tSingle50 = at(50, "单看一年");
  const tLo50 = at(50, "负0.67");
  const tHi50 = at(50, "1.69");
  const tSwing50 = at(50, "晃");
  const t51 = L(51);
  const tReal51 = at(51, "真实");
  const tMDE51 = at(51, "2.85");
  const tMDESaid51 = said(51, "2.85");
  const tDetect51 = at(51, "检出");
  const tPower51 = at(51, "八成");
  const tCross51 = at(51, "跨过");
  const tJudge51 = at(51, "判断好坏");
  const t52 = L(52);
  const tPeriod52 = at(52, "1到10月");
  const tSeen52 = at(52, "看到");
  const tNegative52 = at(52, "负");
  const tAfter52 = at(52, "以后");
  const tAppend52 = at(52, "追加");
  const tDeclare52 = at(52, "声明");
  const tResult52 = at(52, "结果");
  const tBefore52 = at(52, "之前");
  const t53 = L(53);
  const tM53 = at(53, "0.24");
  const tCI53 = at(53, "区间");
  const tLo53 = at(53, "负2.20");
  const tHi53 = at(53, "2.64");
  const tHiSaid53 = said(53, "2.64");
  const tCross53 = at(53, "跨过");
  const tEnd = win.t1;

  // ---- HUD：不把尚未念到的结果写进读数行 ----
  const read2025 = `2025 IR ${P.fn(H.ir)} [${P.fn(H.ci[0])}, ${P.fs(H.ci[1])}]`;
  const read2026 = `2026 IR ${P.fn(CR.ir.supp)} [${P.fn(CR.supp.ci[0])}, ${P.fs(CR.supp.ci[1])}]`;
  K.plans.push({
    t0: win.t0,
    t1: tEnd,
    chip: "03",
    chap: "只开一次的 2025",
    lab: "OPENED ONCE · 只开一次的 2025",
    tele: (t) => {
      if (t < t43) return "▸ FREEZE RECORD · CODE · CONFIG · DEPS · DEV DATA PREFIX";
      if (t < tFreezeSaid44) return "▸ PREFIX MISMATCH · e311e8e7… ≠ ad441b36… · HOLDOUT STILL LOCKED";
      if (t < tHiSaid46) return "▸ FREEZE-2 · CODE 66daa39a… · PREFIX 2f913324…";
      if (t >= tHiSaid53) return `▸ ${read2025} · ${read2026}`;
      return `▸ ${read2025} · ${K.fmt(N)} SESSIONS · VS 0.95 × POOL EW${t >= tMDESaid51 ? ` · MDE ${P.fn(H.mde)}` : ""}`;
    },
    titles: [
      { t: t41, text: "冻结时，记下{数字指纹}" },
      { t: t42, text: "没记录就{拒绝}，凭据只写一次", color: C.red[2] },
      { t: t43, text: "哈希对不上，{程序先拦下}", color: C.red[2] },
      { t: t44, text: "修好、重跑、{逐字节一致}，才又冻结" },
      { t: t45, text: "排查时，{没看过}保留期行情" },
      { t: t46, text: "拆开以后，看{信息比率和区间}" },
      { t: t47, text: "年化上涨，{跟随幅度}却不大", color: C.amb[2] },
      { t: t48, text: "每天的涨跌，{大约跟随三成}", color: C.amb[2] },
      { t: t49, text: "{合格池}上涨，主动收益为负", color: C.amb[2] },
      { t: t50, text: "开发期{单看一年}，也会上下晃" },
      { t: t51, text: "一年数据，能分辨{多大的差别}" },
      { t: t52, text: "追加一段，仍然{先声明再算}" },
      { t: t53, text: "补做的这一段，区间仍{跨过零}" },
    ],
  });
  K.plates.push({ t0: win.t0, t1: tEnd, text: "HOLDOUT 2025 · OPENED 1×" });
  P.dock.push({
    t0: win.t0,
    t1: tEnd,
    st: (t) => ({
      lit: { dev: 0.35, hold: 1, supp: on(t, t52, 0.5) },
      lock: 1,
      open: on(t, tOpen46, 0.55),
      folds: 1,
      days: P.PAPER_DONE,
    }),
  });
  K.shake(tStop43, 3, 0.24);

  // ================= A：第一份冻结记录（41）=================
  const pA = K.panel(si, 140, 236, 1640, 540, C.main[1], "FREEZE RECORD · 第一份冻结记录");
  const cvA = P.layer(si);
  const RECORD = [
    ["源码 · CODE", "0c5f61a5…", tCode41],
    ["配置 · CONFIG", "94495b5b…", tConfig41],
    ["依赖 · LOCKED VERSIONS", "numpy 2.4.6 · scipy 1.17.1", tDeps41],
    ["开发数据 · PREFIX", "ad441b36…", tData41],
  ];
  const aRows = RECORD.map(([label, value], i) => ({
    l: P.tx(si, 202, 330 + i * 92, label, SANS(28, 800), P.DIM),
    v: P.tx(si, 610, 320 + i * 92, value, MONO(i === 2 ? 30 : 48, 700), P.DIM),
  }));
  const aYear = P.ctr(si, 1534, 566, "2025", MONO(76), C.text);
  const aLock = P.ctr(si, 1534, 674, "HOLDOUT · LOCKED", P.MONO20, C.gray);
  const aPrint = P.tx(si, 202, 718, "哈希 · 数字指纹", SANS(26, 700), C.text);
  const upA = (t) => {
    const a = pA.up(t, t41, t42 - 0.12, 0.3);
    RECORD.forEach(([label, value, tm], i) => {
      const e = aRows[i];
      P.vin(e.l, a, a);
      P.vin(e.v, a, a);
      K.col(e.l, P.lightCol(t, tm, C.text));
      K.col(e.v, P.lightCol(t, tm, C.text));
      if (i === 2) K.put(e.v, t < tm ? "····· ····· · ····· ······" : K.scramble(value, K.prog(t, tm, tm + 0.48), 413 + Math.floor(t * 30)));
      else revealHash(e.v, value, t, tm, 410 + i);
    });
    [aYear, aLock].forEach((e) => P.vin(e, a, a));
    P.vin(aPrint, a, a * on(t, tHash41));
    K.col(aPrint, P.lightCol(t, tPrint41, C.main[2], C.gray));
    if (!cvA.begin(a)) return;
    const ctx = cvA.ctx;
    ctx.globalAlpha = a;
    ctx.fillStyle = "#252932";
    ctx.fillRect(1380, 310, 1, 408);
    for (let i = 0; i < 4; i++) {
      const q = on(t, RECORD[i][2]);
      ctx.fillStyle = "#1c2028";
      ctx.fillRect(200, 384 + i * 92, 1124, 1);
      ctx.fillStyle = K.mix("#3a3e46", C.text, q);
      ctx.fillRect(180, 336 + i * 92, 3, 26);
      P.check(ctx, 1320, 348 + i * 92, 18, C.text, q);
    }
    P.lock(ctx, 1534, 456, 90, C.text);
    const q = P.pulse(t, tPrint41, 0.1, 0.8);
    ctx.strokeStyle = K.rgba(C.main[2], q * 0.75);
    ctx.lineWidth = 1;
    K.rr(ctx, 188, 709, 260, 44, 6);
    ctx.stroke();
  };

  // ================= B：开启规则，只画示意（42）=================
  const pB = K.panel(si, 140, 236, 1640, 540, C.main[1], "ONE-TIME OPEN · 开启规则");
  const cvB = P.layer(si);
  const bTag = P.tag(si, 1740, 252, "ILLUSTRATIVE · 示意");
  const bRequest = P.tx(si, 226, 350, "读 2025 年数据", SANS(38, 900), C.text);
  const bGate = P.ctr(si, 950, 350, "有冻结记录吗？", SANS(40, 900), P.DIM);
  const bReject = P.tx(si, 1410, 324, "拒绝", SANS(68, 900), C.red[2]);
  const bNo = P.tx(si, 1264, 388, "没有", SANS(24, 800), C.gray);
  const bFirst = P.tx(si, 226, 570, "第一次打开", SANS(40, 900), P.DIM);
  const bCred = P.ctr(si, 950, 568, "开启凭据", SANS(48, 900), P.DIM);
  const bWrite = P.ctr(si, 950, 638, "写下这次开启", SANS(26, 700), P.DIM);
  const bOnce = P.tx(si, 1360, 562, "只写一次", SANS(40, 900), P.DIM);
  const bCover = P.tx(si, 1360, 622, "不能覆盖", SANS(40, 900), P.DIM);
  const bWith = P.tx(si, 226, 702, "有冻结记录，才允许开启", SANS(24, 700), C.gray);
  const upB = (t) => {
    const a = pB.up(t, t42, t43 - 0.12, 0.3);
    [bTag, bRequest, bGate, bNo, bFirst, bCred, bWrite, bOnce, bCover, bWith].forEach((e) => P.vin(e, a, a));
    P.vin(bReject, a, a * on(t, tReject42));
    K.col(bGate, P.lightCol(t, tRecord42, C.text));
    K.col(bFirst, P.lightCol(t, tFirst42, C.text));
    K.col(bCred, P.lightCol(t, tCred42, C.text));
    K.col(bWrite, P.lightCol(t, tWrite42, C.text));
    K.col(bOnce, P.lightCol(t, tFirst42, C.text));
    K.col(bCover, P.lightCol(t, tCover42, C.text));
    if (!cvB.begin(a)) return;
    const ctx = cvB.ctx;
    ctx.globalAlpha = a;
    [[198, 324, 400, 126], [682, 324, 536, 126], [198, 546, 400, 140], [682, 546, 536, 140]].forEach(([x, y, w, h]) => {
      ctx.strokeStyle = "#3a3e46";
      ctx.lineWidth = 1;
      K.rr(ctx, x, y, w, h, 8);
      ctx.stroke();
    });
    P.arrow(ctx, 610, 388, 666, 388, P.lightCol(t, tRecord42, C.text));
    const r = on(t, tReject42);
    P.arrow(ctx, 1234, 364, 1372, 364, K.mix("#3a3e46", C.red[2], r));
    P.cross(ctx, 1680, 365, 36, C.red[2], r, 3);
    const f = on(t, tFirst42);
    P.arrow(ctx, 610, 610, 666, 610, K.mix("#3a3e46", C.text, f));
    P.arrow(ctx, 1234, 610, 1326, 610, P.lightCol(t, tWrite42, C.text));
    const c = on(t, tCover42);
    ctx.strokeStyle = K.mix("#3a3e46", C.text, c);
    K.rr(ctx, 1338, 546, 360, 140, 8);
    ctx.stroke();
    const scan = K.prog(t, tWrite42, tCred42 + 0.3);
    if (scan > 0 && scan < 1) {
      ctx.fillStyle = K.rgba(C.text, 0.4);
      ctx.fillRect(704, 558 + 112 * scan, 490, 1);
    }
  };

  // ================= C：不一致发生在保留区间开启之前（43）=================
  const pC = K.panel(si, 140, 236, 1640, 540, C.main[1], "PREFIX CHECK · 保留区间仍锁住");
  const cvC = P.layer(si);
  const cOldL = P.tx(si, 208, 342, "冻结记录 · 开发前缀", SANS(32, 800), C.text);
  const cNewL = P.tx(si, 208, 470, "新快照 · 开发前缀", SANS(32, 800), C.text);
  const cOldV = P.tx(si, 746, 326, "", MONO(58, 700), C.text);
  const cNewV = P.tx(si, 746, 454, "", MONO(58, 700), C.text);
  const cNeq = P.tx(si, 1240, 392, "≠", MONO(76), C.red[2]);
  const cStop = P.tx(si, 208, 640, "传输前停止 · 保留区间未打开", SANS(34, 900), C.red[2]);
  const cYear = P.ctr(si, 1550, 566, "2025", MONO(62), C.gray);
  const upC = (t) => {
    const a = pC.up(t, t43, t44 - 0.12, 0.3);
    [cOldL, cNewL, cOldV, cNewV, cYear].forEach((e) => P.vin(e, a, a));
    revealHash(cOldV, "ad441b36…", t, tHash43, 431);
    revealHash(cNewV, "e311e8e7…", t, tHash43 + 0.06, 432);
    K.col(cNewV, P.lightCol(t, tMismatch43, C.red[2], C.text));
    P.vin(cNeq, a, a * on(t, tMismatch43));
    P.vin(cStop, a, a * on(t, tStop43));
    if (!cvC.begin(a)) return;
    const ctx = cvC.ctx;
    ctx.globalAlpha = a;
    ctx.fillStyle = "#252932";
    ctx.fillRect(208, 420, 964, 1);
    ctx.fillRect(1372, 310, 1, 414);
    P.lock(ctx, 1550, 438, 82, C.gray);
    const q = on(t, tStop43);
    if (q > 0) {
      ctx.strokeStyle = C.red[2];
      ctx.lineWidth = 1;
      K.rr(ctx, 190, 624, 1050 * q, 72, 6);
      ctx.stroke();
    }
  };

  // ================= D：修复、重跑、75 个文件逐个核对（44）=================
  const pD = K.panel(si, 140, 236, 1640, 540, C.main[1], "REPAIR → REPLAY → FREEZE-2 · 重新冻结");
  const cvD = P.layer(si);
  const dCause = P.tx(si, 200, 302, "事件表没按上市日过滤", SANS(36, 900), P.DIM);
  const dDetail = P.tx(si, 200, 356, "业绩预告 +38 行 · 快报 +34 行 · 来自 90 只 2025 年新股", MONO(24, 600), P.DIM);
  const dFix = P.tx(si, 200, 420, "修好", SANS(30, 900), P.DIM);
  const dRun = P.tx(si, 400, 420, "开发期重跑", SANS(30, 900), P.DIM);
  const dSame = P.tx(si, 746, 420, "逐字节一致", SANS(30, 900), P.DIM);
  const dPrefix = P.tx(si, 1114, 424, "", MONO(24, 600), P.DIM);
  const dCount = P.tx(si, 808, 512, "·· / 75", MONO(72), P.DIM);
  const dFiles = P.tx(si, 810, 612, "账本文件", SANS(28, 800), C.gray);
  const dBytes = P.tx(si, 810, 656, "逐字节核对", SANS(26, 700), C.gray);
  const dFrozenL = P.tx(si, 1250, 490, "第二份冻结记录", SANS(28, 800), P.DIM);
  const dCodeL = P.tx(si, 1250, 538, "CODE", P.MONO20, P.DIM);
  const dCode = P.tx(si, 1360, 530, "", MONO(36, 700), P.DIM);
  const dConfigL = P.tx(si, 1250, 596, "CONFIG", P.MONO20, P.DIM);
  const dConfig = P.tx(si, 1360, 588, "", MONO(36, 700), P.DIM);
  const dPrefixL = P.tx(si, 1250, 654, "PREFIX", P.MONO20, P.DIM);
  const dPrefixV = P.tx(si, 1360, 646, "", MONO(36, 700), P.DIM);
  const dNote = P.tx(si, 200, 716, "修复实现缺陷 · 不改研究方案", SANS(24, 700), C.gray);
  const FILES = 75; // VERIFICATION.md：75 个账本文件解压后逐字节相同。
  const tFile = (i) => K.lerp(tLedger44, tEqual44 - 0.08, i / (FILES - 1));
  const upD = (t) => {
    const a = pD.up(t, t44, t45 - 0.12, 0.3);
    [dCause, dDetail, dFix, dRun, dSame, dPrefix, dCount, dFiles, dBytes, dFrozenL, dCodeL, dCode, dConfigL, dConfig, dPrefixL, dPrefixV, dNote].forEach((e) => P.vin(e, a, a));
    K.col(dCause, P.lightCol(t, tDefect44, C.text));
    K.col(dDetail, P.lightCol(t, tDefect44 + 0.12, C.gray));
    K.col(dFix, P.lightCol(t, tFix44, C.text));
    K.col(dRun, P.lightCol(t, tRun44, C.text));
    K.col(dSame, P.lightCol(t, tEqual44, C.text));
    const n = Math.min(FILES, Math.max(0, Math.floor(K.prog(t, tLedger44, tEqual44 + 0.1) * FILES)));
    K.put(dCount, t < tLedger44 ? "·· / 75" : `${K.fmt(n)} / ${K.fmt(FILES)}`);
    K.col(dCount, P.lightCol(t, tByte44, C.text));
    K.put(dPrefix, t < tFix44 ? "········… = ········…" : "2f913324… = 2f913324…");
    K.col(dPrefix, P.lightCol(t, tFix44, C.text));
    [dFrozenL, dCodeL, dCode, dConfigL, dConfig, dPrefixL, dPrefixV].forEach((e) => K.col(e, P.lightCol(t, tFreeze44, C.text)));
    revealHash(dCode, "66daa39a…", t, tFreeze44, 441);
    revealHash(dConfig, "94495b5b…", t, tFreeze44 + 0.03, 442);
    revealHash(dPrefixV, "2f913324…", t, tFreeze44 + 0.06, 443);
    if (!cvD.begin(a)) return;
    const ctx = cvD.ctx;
    ctx.globalAlpha = a;
    ctx.fillStyle = "#252932";
    ctx.fillRect(200, 398, 1520, 1);
    P.arrow(ctx, 294, 440, 376, 440, P.lightCol(t, tFix44, C.text));
    P.arrow(ctx, 584, 440, 718, 440, P.lightCol(t, tRun44, C.text));
    for (let i = 0; i < FILES; i++) {
      const x = 200 + (i % 15) * 36;
      const y = 492 + Math.floor(i / 15) * 38;
      const q = on(t, tFile(i), 0.14);
      ctx.fillStyle = K.mix("#11141a", "#282b30", q);
      ctx.fillRect(x, y, 28, 28);
      ctx.strokeStyle = K.mix("#30343c", "#8a8f98", q);
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 0.5, y + 0.5, 27, 27);
      P.check(ctx, x + 14, y + 14, 18, C.text, q, 1.5);
    }
    const scan = K.prog(t, tRun44, tLedger44);
    if (scan > 0 && scan < 1) {
      ctx.fillStyle = K.rgba(C.main[2], 0.5);
      ctx.fillRect(192 + scan * 548, 486, 1, 190);
    }
    ctx.strokeStyle = P.lightCol(t, tFreeze44, C.text, "#30343c");
    K.rr(ctx, 1224, 474, 510, 226, 8);
    ctx.stroke();
  };

  // ================= E：排查只到开发期为止（45）=================
  const pE = K.panel(si, 140, 236, 1640, 540, C.main[1], "SCOPE OF CHECK · 只核对开发期记录");
  const cvE = P.layer(si);
  const eScope = P.tx(si, 204, 320, "只比对 2025 年以前的记录", SANS(40, 900), C.text);
  const ePrefix = P.tx(si, 204, 396, "开发前缀  2f913324… = 2f913324…", MONO(30, 600), C.text);
  const eReplay = P.tx(si, 204, 460, "开发期重跑 · 账本逐字节一致", SANS(30, 800), C.gray);
  const eNoRead = P.tx(si, 204, 666, "没看过 2025 年的行情", SANS(38, 900), P.DIM);
  const eYear = P.ctr(si, 1480, 536, "2025", MONO(92), C.gray);
  const eHold = P.ctr(si, 1480, 672, "保留区间 · 未读行情", SANS(26, 700), C.gray);
  const upE = (t) => {
    const a = pE.up(t, t45, t46 - 0.12, 0.3);
    [eScope, ePrefix, eReplay, eNoRead, eYear, eHold].forEach((e) => P.vin(e, a, a));
    K.col(eScope, P.lightCol(t, tCheck45, C.text, C.gray));
    K.col(eNoRead, P.lightCol(t, tUnseen45, C.text));
    if (!cvE.begin(a)) return;
    const ctx = cvE.ctx;
    ctx.globalAlpha = a;
    ctx.fillStyle = "#090b10";
    K.rr(ctx, 1210, 310, 540, 420, 10);
    ctx.fill();
    ctx.strokeStyle = "#30343c";
    ctx.lineWidth = 1;
    ctx.stroke();
    for (let i = 0; i < FILES; i++) {
      const x = 204 + (i % 25) * 34;
      const y = 540 + Math.floor(i / 25) * 32;
      ctx.strokeStyle = "#3a3e46";
      ctx.strokeRect(x + 0.5, y + 0.5, 23, 23);
      P.check(ctx, x + 12, y + 12, 16, C.gray);
    }
    P.lock(ctx, 1480, 422, 84, P.lightCol(t, tMarket45, C.text, C.gray));
    ctx.fillStyle = "#3a3e46";
    ctx.fillRect(1134, 318, 1, 392);
    const q = on(t, tUnseen45);
    ctx.strokeStyle = K.rgba(C.text, q * 0.7);
    ctx.beginPath();
    ctx.moveTo(204, 720);
    ctx.lineTo(204 + 760 * q, 720);
    ctx.stroke();
  };

  // ================= F：结果常驻舞台（46–53）=================
  const pF = K.panel(si, 140, 236, 1640, 540, C.main[1], "2025 · HOLDOUT · INFORMATION RATIO");
  const cvF = P.layer(si);
  const fBasis = P.txr(si, 1740, 254, "VS 0.95 × POOL EW", P.MONO20, C.gray);
  const fIR = P.tx(si, 188, 294, "··", MONO(104), C.gray);
  const fIRLab = P.tx(si, 196, 412, "2025 · 信息比率", SANS(24, 800), C.gray);
  const f95 = P.txr(si, 1740, 303, "95% 区间", SANS(26, 800), C.gray);
  const AX = 520;
  const AW = 1000;
  const AMIN = -3;
  const AMAX = 3.5;
  const X = (v) => AX + ((v - AMIN) / (AMAX - AMIN)) * AW;
  const ciGroup = K.el("div", "", si);
  ciGroup.style.position = "absolute";
  ciGroup.style.inset = "0";
  const d25 = { m: H.ir, lo: H.ci[0], hi: H.ci[1] };
  const ci25 = P.ci(ciGroup, AX, 315, AW, d25, { min: AMIN, max: AMAX });
  const ci25Tx = [...ciGroup.querySelectorAll(".tx")];
  const ciPointFlash = P.layer(ciGroup);
  const mdeV = P.ctr(si, X(H.mde), 304, "··", MONO(36), C.text);
  const mdeL = P.ctr(si, X(H.mde), 423, "MDE · 八成把握", P.MONO20, C.gray);
  const fSampleL = P.tx(si, 214, 482, "SAMPLE · 日频 · 2025", P.MONO20, C.gray);
  const fDays = P.tx(si, 214, 532, K.fmt(N), MONO(110), C.text);
  const fDaysL = P.tx(si, 454, 610, "个交易日", SANS(30, 800), C.text);
  const fForm = P.tx(si, 930, 510, "均值 ÷ 波动 × √252", SANS(42, 800), C.text);
  const fBasisCN = P.tx(si, 930, 586, "相对 0.95 × 前一日合格池等权", SANS(26, 700), C.amb[2]);
  const fCost = P.tx(si, 930, 640, "已扣成本", SANS(26, 700), C.red[2]);
  const fOpen = P.tx(si, 214, 708, "保留区间 · 仅开启一次", SANS(26, 700), C.text);

  // 累计收益必须几何连乘；P.cum 是相加，不能用于这里。
  const compound = (arr) => {
    let v = 1;
    return arr.map((r) => (v *= 1 + r) - 1);
  };
  const netCum = compound(HOLD.net);
  const benchCum = compound(HOLD.bench);
  const netTotal = netCum[netCum.length - 1];
  const mx = P.mean(HOLD.bench);
  const my = P.mean(HOLD.net);
  const alpha = my - H.beta * mx;
  const cAnnL = P.tx(si, 196, 474, "组合年化", SANS(30, 800), C.text);
  const cAnnV = P.tx(si, 420, 460, "··", MONO(64), P.DIM);
  const cNetL = P.tx(si, 214, 526, "组合 · 已扣成本", P.MONO20, C.main[2]);
  const cBenchL = P.tx(si, 486, 526, "合格池 · 等权", P.MONO20, C.amb[2]);
  const cNetEnd = P.tx(si, 884, 0, "全年 ··", MONO(20, 700), C.main[2]);
  const cBenchEnd = P.tx(si, 884, 0, "全年 ··", MONO(20, 700), C.amb[2]);
  const cStart = P.tx(si, 214, 744, "01-02", P.MONO20, C.gray);
  const cEnd = P.txr(si, 872, 744, "12-31", P.MONO20, C.gray);
  const cZero = P.txr(si, 204, 658, "0", P.MONO20, C.gray);
  const sTitle = P.tx(si, 1094, 474, "日收益", SANS(30, 800), C.text);
  const sAxis = P.tx(si, 1094, 522, "横轴 合格池 · 纵轴 组合", P.MONO20, C.gray);
  const sBetaL = P.tx(si, 1506, 484, "β", MONO(30), C.amb[2]);
  const sBeta = P.tx(si, 1552, 460, "··", MONO(64), P.DIM);
  const sCount = P.tx(si, 1554, 582, `${K.fmt(N)} 个点`, P.MONO20, C.gray);
  const sCash = P.tx(si, 1554, 630, "首日全为现金", SANS(20, 700), C.gray);
  const sCash0 = P.tx(si, 1554, 662, "组合日收益 0", P.MONO20, C.gray);
  const sUnit = P.tx(si, 1554, 626, "合格池 → 组合", SANS(20, 700), C.amb[2]);
  const sRatio = P.tx(si, 1554, 662, "1 → ··", MONO(30, 700), C.amb[2]);
  const sFollow = P.tx(si, 1554, 706, "约三成", SANS(26, 800), C.amb[2]);
  const SC = { x: 1134, y: 562, w: 378, h: 158, xmin: -0.125, xmax: 0.065, ymin: -0.07, ymax: 0.04 };
  const SX = (v) => SC.x + ((v - SC.xmin) / (SC.xmax - SC.xmin)) * SC.w;
  const SY = (v) => SC.y + SC.h - ((v - SC.ymin) / (SC.ymax - SC.ymin)) * SC.h;
  const sTicksX = [-0.1, 0, 0.05].map((v) => P.ctr(si, SX(v), 722, P.pct(v, 0, true), MONO(20, 500), C.gray));
  const sTicksY = [-0.05, 0, 0.025].map((v) => P.txr(si, 1122, SY(v) - 11, P.pct(v, v === 0.025 ? 1 : 0, true), MONO(20, 500), C.gray));
  const activeL = P.tx(si, 1094, 474, "年化主动收益", SANS(32, 900), C.text);
  const activeV = P.tx(si, 1274, 584, "··", MONO(88), C.gray);
  const activeBasis = P.tx(si, 1274, 698, "相对 0.95 × 合格池等权", SANS(22, 700), C.gray);
  const activeZero = P.txr(si, 1120, 538, "0", P.MONO20, C.gray);

  // 逐年点只代表五个年份，没有开发期置信区间。
  const devL = P.tx(si, 196, 478, "开发期逐年", SANS(32, 900), C.text);
  const devNoCI = P.tx(si, 196, 530, "逐年点 · 不是置信区间", SANS(22, 700), C.gray);
  const devReverse = P.tx(si, 196, 582, "方向反转", SANS(40, 900), C.gray);
  const devAll = P.tx(si, 196, 644, `开发期整段 ${P.fn(CR.ir.dev)}`, MONO(24, 600), C.gray);
  const devRows = YR.map(([year, value]) => ({
    year: P.txr(si, 648, 0, year, MONO(22, 600), C.gray),
    value: P.tx(si, X(value) + 18, 0, "··", MONO(24, 700), value < 0 ? C.gray : C.main[2]),
    v: value,
  }));
  const devRange = P.tx(si, 742, 714, "逐年最小 ··  至最大 ··", MONO(24, 600), C.gray);
  const devWithin = P.tx(si, 196, 714, "2025 落在逐年范围内", SANS(26, 800), C.text);
  const mdeReal = P.tx(si, 196, 520, "真实的信息比率约", SANS(28, 800), C.text);
  const mdeBig = P.tx(si, 196, 560, "··", MONO(76), C.text);
  const mdePower = P.tx(si, 196, 654, "检出的把握才有八成", SANS(28, 800), C.text);
  const mdeObs = P.tx(si, 1100, 714, `这次观测值仍是 ${P.fn(H.ir)}`, MONO(24, 600), C.gray);
  const mdeJudgment = P.tx(si, 196, 714, "跨零 · 还不足以判断好坏", SANS(28, 900), C.text);
  const suppL = P.tx(si, 196, 476, "2026 年补做", SANS(32, 900), C.text);
  const suppPeriod = P.tx(si, 196, 526, "··", MONO(28, 700), P.DIM);
  const suppSeen = P.tx(si, 196, 568, "看到 2025 为负以后才决定追加", SANS(22, 700), P.DIM);
  const commitL1 = P.tx(si, 238, 632, "声明在前", SANS(30, 900), P.DIM);
  const commitL2 = P.tx(si, 1072, 632, "结果在后", SANS(30, 900), P.DIM);
  const commitV1 = P.tx(si, 238, 684, "·······", MONO(38, 700), P.DIM);
  const commitV2 = P.tx(si, 1072, 684, "·······", MONO(38, 700), P.DIM);
  const commitSub1 = P.tx(si, 542, 696, "声明提交", SANS(22, 700), C.gray);
  const commitSub2 = P.tx(si, 1376, 696, "结果提交", SANS(22, 700), C.gray);
  const supp26L = P.tx(si, 196, 600, "2026 · 1–10 月", SANS(28, 900), C.text);
  const supp26M = P.tx(si, 188, 646, "··", MONO(88), C.text);
  const suppGroup = K.el("div", "", si);
  suppGroup.style.position = "absolute";
  suppGroup.style.inset = "0";
  const d26 = { m: CR.ir.supp, lo: CR.supp.ci[0], hi: CR.supp.ci[1] };
  const ci26 = P.ci(suppGroup, AX, 620, AW, d26, { min: AMIN, max: AMAX });
  const ci26Tx = [...suppGroup.querySelectorAll(".tx")];
  const bothZero = P.txr(si, 1740, 742, "两段区间都跨零", SANS(24, 800), C.text);

  const upF = (t) => {
    const a = pF.up(t, t46, tEnd - 0.25, 0.25);
    [fBasis, fIR, fIRLab].forEach((e) => P.vin(e, a, a));
    K.put(fIR, t < tM46 ? "··" : P.fn(H.ir));
    const negativePulse = P.pulse(t, tNegative52, 0.12, 0.72);
    K.col(fIR, negativePulse > 0 ? K.mixHex(C.gray, C.text, negativePulse) : P.lightCol(t, tM46, C.gray));
    P.vin(f95, a, a * on(t, t95_46));
    d25.lo = K.lerp(H.ir, H.ci[0], on(t, tLo46, 0.42));
    d25.hi = K.lerp(H.ir, H.ci[1], on(t, tHi46, 0.42));
    ci25.up(t, a, tIR46);
    K.vis(ci25Tx[0], 0); // 数值由左侧大字显示，区间点仍使用 P.ci 的橙色。
    K.put(ci25Tx[1], `[${t < tLo46 ? "··" : P.fn(H.ci[0])}, ${t < tHi46 ? "··" : P.fs(H.ci[1])}]`);
    K.vis(ci25Tx[1], a * on(t, tCI46));
    ci25Tx.slice(2).forEach((e) => K.col(e, C.gray));
    // 独立清空覆盖层，反向跳秒和 upF(-1) 时都不会留下暖白点。
    if (ciPointFlash.begin(a * negativePulse)) {
      const ctx = ciPointFlash.ctx;
      ctx.globalAlpha = a * negativePulse;
      ctx.fillStyle = C.text;
      ctx.beginPath();
      ctx.arc(X(H.ir), 373, 7, 0, Math.PI * 2);
      ctx.fill();
    }
    const ma = a * on(t, t51);
    P.vin(mdeV, ma, ma);
    P.vin(mdeL, ma, ma * on(t, tMDE51));
    K.put(mdeV, t < tMDE51 ? "··" : P.fn(H.mde));

    const sampleA = a * (1 - on(t, t47));
    [fSampleL, fDays, fDaysL, fForm, fBasisCN, fCost, fOpen].forEach((e) => P.vin(e, sampleA, sampleA));
    const chartsA = a * on(t, t47) * (1 - on(t, t50));
    [cAnnL, cAnnV, cNetL, cBenchL, cStart, cEnd, cZero].forEach((e) => P.vin(e, chartsA, chartsA));
    K.put(cAnnV, t < tReturn47 ? "··" : P.pct(H.annReturn, 1, true));
    K.col(cAnnV, P.lightCol(t, tReturn47, C.main[2]));
    const cp = on(t, tCombo47, 1.85);
    const bp = on(t, tAnn47, 1.85);
    const curveY = (v) => 670 - v * 480;
    K.at(cNetEnd, 884, curveY(netTotal) - 10);
    K.at(cBenchEnd, 884, curveY(H.poolTotal) - 14);
    K.put(cNetEnd, t < tReturn47 ? "全年 ··" : `全年 ${P.pct(netTotal, 1, true)}`);
    K.put(cBenchEnd, t < tPool49 ? "全年 ··" : `全年 ${P.pct(H.poolTotal, 1, true)}`);
    P.vin(cNetEnd, chartsA, chartsA * on(t, tCombo47 + 1.7));
    P.vin(cBenchEnd, chartsA, chartsA * on(t, tAnn47 + 1.7));
    K.col(cBenchL, P.lightCol(t, tPool47, C.amb[2]));
    const scatterA = chartsA * (1 - on(t, t49));
    [sTitle, sAxis, sBetaL, sBeta, sCount, ...sTicksX, ...sTicksY].forEach((e) => P.vin(e, scatterA, scatterA));
    K.col(sAxis, K.mixHex(C.gray, C.text, P.pulse(t, tPool47, 0.12, 0.75)));
    [sCash, sCash0].forEach((e) => P.vin(e, scatterA, scatterA * (1 - on(t, tDaily48))));
    K.put(sBeta, t < tB47 ? "··" : P.fn(H.beta));
    K.col(sBeta, P.lightCol(t, tB47, C.amb[2]));
    [sUnit, sRatio].forEach((e) => P.vin(e, scatterA, scatterA * on(t, tDaily48)));
    P.vin(sFollow, scatterA, scatterA * on(t, tThird48));
    K.put(sRatio, `1 → ${t < tThird48 ? "··" : P.fn(H.beta)}`);
    const activeA = chartsA * on(t, t49);
    [activeL, activeV, activeBasis, activeZero].forEach((e) => P.vin(e, activeA, activeA));
    K.col(activeL, P.lightCol(t, tActive49, C.text, C.gray));
    K.put(activeV, t < tNeg49 ? "··" : P.pct(H.active));

    const devA = a * on(t, t50);
    const compact = on(t, t52, 0.65);
    const devTop = K.lerp(492, 468, compact);
    const devPitch = K.lerp(40, 24, compact);
    const beforeSupp = 1 - on(t, t52);
    const beforeMDE = 1 - on(t, t51);
    // 讲最小可检出值时收起“开发期逐年”，免得和下面的“真实的信息比率约 2.85”连成一句
    P.vin(devL, devA, devA * Math.max(beforeSupp * beforeMDE, on(t, t53)));
    P.vin(devNoCI, devA, devA * Math.max(beforeSupp * beforeMDE, on(t, t53)));
    P.vin(devReverse, devA, devA * beforeMDE * on(t, tReverse50));
    P.vin(devAll, devA, devA * beforeMDE * on(t, tReverse50));
    const dp = on(t, tSingle50, 0.5);
    devRows.forEach((e, i) => {
      const y = devTop + i * devPitch;
      K.at(e.year, 648, y - 12);
      K.at(e.value, X(e.v) + 18, y - 13);
      e.year.style.font = MONO(K.lerp(22, 20, compact), 600);
      e.value.style.font = MONO(K.lerp(24, 22, compact), 700);
      P.vin(e.year, devA, devA * dp);
      P.vin(e.value, devA, devA * dp);
      const tm = e.v === DEV_MIN ? tLo50 : e.v === DEV_MAX ? tHi50 : tSingle50;
      K.put(e.value, t < tm ? "··" : P.fs(e.v));
    });
    P.vin(devRange, devA, devA * beforeMDE * on(t, tLo50));
    K.put(devRange, `逐年最小 ${t < tLo50 ? "··" : P.fn(DEV_MIN)}  至最大 ${t < tHi50 ? "··" : P.fs(DEV_MAX)}`);
    P.vin(devWithin, devA, devA * beforeMDE * on(t, tSwing50));
    const mdeA = a * on(t, t51) * beforeSupp;
    [mdeReal, mdeBig].forEach((e) => P.vin(e, mdeA, mdeA * on(t, tReal51)));
    K.put(mdeBig, t < tMDE51 ? "··" : P.fn(H.mde));
    P.vin(mdePower, mdeA, mdeA * on(t, tDetect51));
    K.col(mdePower, P.lightCol(t, tPower51, C.text, C.gray));
    P.vin(mdeObs, mdeA, mdeA * on(t, tMDE51));
    P.vin(mdeJudgment, mdeA, mdeA * on(t, tJudge51));
    const commitsA = a * on(t, t52) * (1 - on(t, t53));
    [suppL, suppPeriod, suppSeen, commitL1, commitL2, commitV1, commitV2, commitSub1, commitSub2].forEach((e) => P.vin(e, commitsA, commitsA));
    K.put(suppPeriod, t < tPeriod52 ? "··" : "1–10 月 · 追加检验");
    K.col(suppPeriod, P.lightCol(t, tPeriod52, C.text));
    const seenPulse = P.pulse(t, tAfter52, 0.12, 0.75);
    K.col(suppSeen, seenPulse > 0 ? K.mixHex(C.gray, C.text, seenPulse) : P.lightCol(t, tSeen52, C.gray));
    K.put(suppSeen, t < tNegative52 ? "看到 2025 结果以后" : "看到 2025 为负以后才决定追加");
    K.col(commitL1, P.lightCol(t, tDeclare52, C.text));
    K.col(commitV1, P.lightCol(t, tDeclare52, C.text));
    K.col(commitL2, P.lightCol(t, tResult52, C.text));
    K.col(commitV2, P.lightCol(t, tResult52, C.text));
    // 提交号按 DESIGN.md 给定的七位缩写显示，不杜撰第八位。
    K.put(commitV1, t < tDeclare52 ? "·······" : K.scramble("a96f224", K.prog(t, tDeclare52, tDeclare52 + 0.45), 521 + Math.floor(t * 30)));
    K.put(commitV2, t < tResult52 ? "·······" : K.scramble("7106916", K.prog(t, tResult52, tResult52 + 0.45), 522 + Math.floor(t * 30)));
    const suppA = a * on(t, t53);
    [supp26L, supp26M].forEach((e) => P.vin(e, suppA, suppA));
    K.put(supp26M, t < tM53 ? "··" : P.fn(CR.ir.supp));
    K.col(supp26M, P.lightCol(t, tM53, C.main[2], C.gray));
    d26.lo = K.lerp(CR.ir.supp, CR.supp.ci[0], on(t, tLo53, 0.45));
    d26.hi = K.lerp(CR.ir.supp, CR.supp.ci[1], on(t, tHi53, 0.45));
    ci26.up(t, suppA, tM53);
    K.vis(ci26Tx[0], 0);
    K.put(ci26Tx[1], `[${t < tLo53 ? "··" : P.fn(CR.supp.ci[0])}, ${t < tHi53 ? "··" : P.fs(CR.supp.ci[1])}]`);
    K.vis(ci26Tx[1], suppA * on(t, tCI53));
    ci26Tx.slice(2).forEach((e) => K.col(e, C.gray));
    P.vin(bothZero, suppA, suppA * on(t, tCross53));
    if (!cvF.begin(a)) return;
    const ctx = cvF.ctx;
    ctx.globalAlpha = a;
    ctx.fillStyle = "#252932";
    ctx.fillRect(180, 452, 1560, 1);
    // 带宽只跟随真实区间端点，左右分别随旁白展开，不添加虚构范围。
    ctx.globalAlpha = a * on(t, tCI46) * (1 - on(t, t47)) * 0.24;
    ctx.fillStyle = C.text;
    ctx.fillRect(X(d25.lo), 357, X(d25.hi) - X(d25.lo), 32);
    if (sampleA > 0.002) {
      ctx.globalAlpha = sampleA;
      ctx.strokeStyle = "#30343c";
      ctx.lineWidth = 1;
      K.rr(ctx, 190, 472, 630, 216, 8);
      ctx.stroke();
      P.lock(ctx, 746, 570, 54, C.text, on(t, tOpen46, 0.55));
      const q = K.prog(t, tOpen46, tHi46 + 0.5);
      ctx.fillStyle = C.main[1];
      ctx.fillRect(214, 676, 560 * q, 2);
    }
    if (chartsA > 0.002) {
      ctx.globalAlpha = chartsA;
      ctx.fillStyle = "#30343c";
      ctx.fillRect(214, 670, 660, 1);
      ctx.fillRect(1048, 476, 1, 276);
      for (let i = 0; i < N; i++) {
        if (i % 20 === 0) ctx.fillRect(214 + (i / (N - 1)) * 658, 730, 1, 5);
      }
      const poolArea = K.prog(t, tYear49, tPool49);
      if (poolArea > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(214, 452, 658 * poolArea, 300);
        ctx.clip();
        ctx.globalAlpha = chartsA * 0.2;
        ctx.fillStyle = C.amb[2];
        ctx.beginPath();
        ctx.moveTo(214, 670);
        benchCum.forEach((v, i) => ctx.lineTo(214 + i / (N - 1) * 658, curveY(v)));
        ctx.lineTo(872, 670);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
      const np = P.drawCurve(ctx, netCum, { x: 214, y0: 670, w: 658, scale: 480, p: cp, color: C.main[1], lw: 2.2 });
      const ep = P.drawCurve(ctx, benchCum, { x: 214, y0: 670, w: 658, scale: 480, p: bp, color: C.amb[1], lw: 1.8 });
      [[np, C.main[2]], [ep, C.amb[2]]].forEach(([pt, col]) => {
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(pt[0], pt[1], 3, 0, 6.283);
        ctx.fill();
      });
      const poolPulse = P.pulse(t, tYear49, 0.15, 1.8);
      if (poolPulse > 0) {
        ctx.globalAlpha = chartsA * poolPulse;
        P.drawCurve(ctx, benchCum, { x: 214, y0: 670, w: 658, scale: 480, p: 1, color: C.amb[2], lw: 3 });
      }
    }
    if (scatterA > 0.002) {
      ctx.globalAlpha = scatterA;
      band(ctx, t, tPool47, 1084, 516, 178, 34, C.amb[2], 0.34);
      ctx.strokeStyle = "#30343c";
      ctx.lineWidth = 1;
      ctx.strokeRect(SC.x + 0.5, SC.y + 0.5, SC.w, SC.h);
      ctx.fillStyle = "#4a4f58";
      ctx.fillRect(SX(0), SC.y, 1, SC.h);
      ctx.fillRect(SC.x, SY(0), SC.w, 1);
      const dots = K.prog(t, tPool47, tB47 + 0.2);
      for (let i = 0; i < N; i++) {
        const p = K.c01((dots * 1.12 - i / N) / 0.12);
        if (p <= 0) continue;
        ctx.globalAlpha = scatterA * p * 0.65;
        ctx.fillStyle = C.gray;
        ctx.beginPath();
        ctx.arc(SX(HOLD.bench[i]), SY(HOLD.net[i]), 2.05, 0, 6.283);
        ctx.fill();
      }
      ctx.globalAlpha = scatterA;
      const slopeP = on(t, tBeta47, 0.7);
      const followP = on(t, tFollow48, 0.5);
      ctx.strokeStyle = K.mixHex(C.main[1], C.main[2], followP);
      ctx.lineWidth = 3.2 + 1.2 * followP;
      // beta = 0.3248；截距保证斜线穿过两组真实日收益的均值点。
      P.poly(ctx, [[SX(-0.12), SY(alpha + H.beta * -0.12)], [SX(0.06), SY(alpha + H.beta * 0.06)]], slopeP);
      const m = on(t, tMove48);
      ctx.strokeStyle = K.rgba(C.amb[2], m);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(SX(mx), SY(my), 9, 0, 6.283);
      ctx.stroke();
      ctx.fillStyle = C.amb[2];
      ctx.beginPath();
      ctx.arc(SX(mx), SY(my), 3, 0, 6.283);
      ctx.fill();
    }
    if (activeA > 0.002) {
      ctx.globalAlpha = activeA;
      ctx.fillStyle = "#4a4f58";
      ctx.fillRect(1134, 550, 600, 1);
      const p = on(t, tNeg49, 0.7);
      ctx.fillStyle = C.gray;
      ctx.fillRect(1152, 551, 82, -H.active * 1900 * p);
      if (p > 0.05) P.arrow(ctx, 1193, 551, 1193, 551 - H.active * 1900 * p, C.gray, 8);
    }
    if (devA > 0.002) {
      ctx.globalAlpha = devA * dp;
      // 这是逐年最小 / 最大的范围带，不是置信区间。
      ctx.fillStyle = "#151820";
      ctx.fillRect(X(DEV_MIN), devTop - 16, X(DEV_MAX) - X(DEV_MIN), devPitch * 4 + 32);
      ctx.strokeStyle = "#5a5f68";
      ctx.lineWidth = 1;
      // 范围带只在上下沿收口，竖边不穿过逐年数值。
      for (const [y, dir] of [[devTop - 20, 1], [devTop + devPitch * 4 + 20, -1]]) {
        ctx.beginPath();
        ctx.moveTo(X(DEV_MIN), y + dir * 5);
        ctx.lineTo(X(DEV_MIN), y);
        ctx.lineTo(X(DEV_MAX), y);
        ctx.lineTo(X(DEV_MAX), y + dir * 5);
        ctx.stroke();
      }
      YR.forEach(([year, v], i) => {
        const y = devTop + i * devPitch;
        const p = on(t, tSingle50 + i * 0.09);
        ctx.globalAlpha = devA * dp * p;
        ctx.fillStyle = "#30343c";
        ctx.fillRect(680, y, X(v) - 692, 1);
        if (X(v) + 118 < 1340) ctx.fillRect(X(v) + 118, y, 1340 - X(v) - 118, 1);
        ctx.fillStyle = v < 0 ? C.gray : C.main[1];
        ctx.beginPath();
        ctx.arc(X(v), y, 5, 0, 6.283);
        ctx.fill();
      });
      const within = on(t, tSwing50);
      ctx.globalAlpha = devA * within * (1 - compact);
      ctx.strokeStyle = K.rgba(C.main[2], 0.7);
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 5]);
      ctx.beginPath();
      ctx.moveTo(X(H.ir), 429);
      ctx.lineTo(X(H.ir), devTop + devPitch * 4 + 16);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    if (ma > 0.002) {
      ctx.globalAlpha = ma * on(t, tMDE51);
      ctx.strokeStyle = C.text;
      ctx.lineWidth = 1;
      P.poly(ctx, [[X(H.mde), 350], [X(H.mde), 402]], on(t, tMDE51));
      ctx.fillStyle = C.text;
      ctx.beginPath();
      ctx.moveTo(X(H.mde) - 6, 349);
      ctx.lineTo(X(H.mde) + 6, 349);
      ctx.lineTo(X(H.mde), 357);
      ctx.closePath();
      ctx.fill();
      const z = on(t, tCross51);
      ctx.globalAlpha = ma * z;
      ctx.strokeStyle = "#8a8f98";
      ctx.lineWidth = 1;
      K.rr(ctx, X(H.ci[0]) - 13, 346, X(H.ci[1]) - X(H.ci[0]) + 26, 52, 5);
      ctx.stroke();
    }
    if (commitsA > 0.002) {
      ctx.globalAlpha = commitsA;
      band(ctx, t, tAfter52, 186, 562, 596, 38, C.text, 0.26);
      [[214, tDeclare52], [1048, tResult52]].forEach(([x, tm]) => {
        ctx.strokeStyle = P.lightCol(t, tm, C.text, "#3a3e46");
        ctx.lineWidth = 1;
        K.rr(ctx, x, 616, 636, 130, 8);
        ctx.stroke();
      });
      const p = on(t, tBefore52);
      P.arrow(ctx, 882, 682, 1016, 682, K.mixHex("#3a3e46", C.text, p), 9);
      const q = P.pulse(t, tAppend52, 0.1, 0.65);
      ctx.fillStyle = K.rgba(C.main[2], q * 0.8);
      ctx.fillRect(194, 594, 440, 1);
    }
    if (suppA > 0.002) {
      const z = on(t, tCross53);
      ctx.globalAlpha = suppA * z;
      ctx.strokeStyle = "#8a8f98";
      ctx.lineWidth = 1;
      K.rr(ctx, X(CR.supp.ci[0]) - 13, 651, X(CR.supp.ci[1]) - X(CR.supp.ci[0]) + 26, 52, 5);
      ctx.stroke();
    }
  };

  return (t) => {
    if (t < t42 + 0.35) upA(t); else upA(-1);
    if (t > t42 - 0.2 && t < t43 + 0.35) upB(t); else upB(-1);
    if (t > t43 - 0.2 && t < t44 + 0.35) upC(t); else upC(-1);
    if (t > t44 - 0.2 && t < t45 + 0.35) upD(t); else upD(-1);
    if (t > t45 - 0.2 && t < t46 + 0.35) upE(t); else upE(-1);
    if (t > t46 - 0.2) upF(t); else upF(-1);
  };
});
