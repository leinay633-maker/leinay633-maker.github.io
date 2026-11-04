// 第 5 章 · 冻结之后。流水线保留到第 75 句；成交池与逐日账本共用第 76–79 句的舞台。
K.scene("s5", (si, win) => {
  const C = K.C;
  const MONO = P.mono;
  const SANS = P.sans;
  const L = (n) => K.seg(n).t0 - 0.08;
  const at = (n, s, k = 1) => K.w(n, s, k) - 0.08;
  const on = (t, t0, dur = 0.3) => K.eo(K.prog(t, t0, t0 + dur));
  const F = CR.forward.firstFill;
  const LEDGER = CR.forward.ledger;
  const acceptedRow = LEDGER.findIndex((r) => r.date === "2026-10-23" && r.gate === "accept");

  const t70 = win.t0 + 0.02;
  const t2025 = at(70, "2025");
  const tSeal70 = at(70, "封存");
  const tKnow70 = at(70, "已经知道");
  const tMarket70 = at(70, "航情");
  const t71 = L(71);
  const tForward71 = at(71, "向前");
  const tFreeze71 = at(71, "冻结以后");
  const tDay71 = at(71, "交易日");
  const t72 = L(72);
  const tClock72 = at(72, "八点半");
  const tCloud72 = at(72, "云端容器");
  const tRun72 = at(72, "自动开跑");
  const t73 = L(73);
  const tData73 = at(73, "取当天的数据");
  const tSeven73 = at(73, "7道");
  const tGate73 = at(73, "闸门");
  const tSnapshot73 = at(73, "封存快照");
  const tScore73 = at(73, "打分");
  const tOrder73 = at(73, "出指令");
  const tSame73 = at(73, "同一个账本");
  const tBook73 = at(73, "记账");
  const tReport73 = at(73, "日报");
  const t74 = L(74);
  const tCode74 = at(74, "决定交易的代码");
  const tHash74 = at(74, "哈希");
  const tLock74 = at(74, "锁住");
  const tEdit74 = at(74, "改动");
  const tRefuse74 = at(74, "拒绝运行");
  const t75 = L(75);
  const tAppend75 = at(75, "追加");
  const tReplay75 = at(75, "整段回放");
  const tCheck75 = at(75, "逐航核对");
  const t76 = L(76);
  const tDate76 = at(76, "10月19日");
  const tHeld76 = at(76, "24只");
  const tOpen76 = at(76, "20日开盘");
  const tAll76 = at(76, "全部");
  const tFill76 = at(76, "成交");
  const tLots76 = at(76, "整手");
  const tCost76 = at(76, "费用");
  const tFees76 = at(76, "1221.36");
  const t77 = L(77);
  const tDate77 = at(77, "10月23日");
  const tFirst77 = at(77, "第一次");
  const tBlock77 = at(77, "拦下");
  const t78 = L(78);
  const tDelist78 = at(78, "退市整理期");
  const tLimit78 = at(78, "不设涨跌幅");
  const tBand78 = at(78, "超出");
  const t79 = L(79);
  const tVerified79 = at(79, "数据核过没错");
  const tReason79 = at(79, "写下理由");
  const tNoSignal79 = at(79, "没有信号");
  const tNoRebal79 = at(79, "不是换仓日");
  const t80 = L(80);
  const t54 = at(80, "54个");
  const tIR80 = at(80, "信息比率");
  const tSE80 = at(80, "标准误");
  const t22 = at(80, "2.2");
  const t05 = at(80, "0.5");
  const t1 = at(80, "1");
  const tRatio80 = at(80, "两到四倍");
  const t81 = L(81);
  const tCannot81 = at(81, "分不出好坏");
  const tYear81 = at(81, "年底");
  const tProtocol81 = at(81, "协议");
  const tForwardReport81 = at(81, "前向报告");
  const tEnd = win.t1;

  // ---- HUD ----
  const tele = (t) => {
    if (t >= t22) return `▸ ~${P.PAPER_DAYS} SESSIONS TO 12-31 · SE(IR) ≈ 2.2`;
    if (t >= t77) return "▸ 10-23 · PRICE-BAND GATE · ACCEPTED · NO SIGNAL";
    if (t >= tFees76) return `▸ 10-20 OPEN · ${F.filled} / ${F.orders} FILLED · LOTS OK · FEES ${K.fmt(F.fees, 2)}`;
    if (t >= t72) return "▸ 20:30 DAILY · 7 GATES · HASH-LOCKED · APPEND-ONLY";
    return "▸ FORWARD · 2026-10-19 → 12-31 · DESCRIBE ONLY";
  };
  const titles = [
    { t: t70, text: "封存过，{行情仍然已知}", color: C.amb[2] },
    { t: t71, text: "真正向前的证据，在{冻结以后}" },
    { t: t72, text: "每个交易日，{自动开跑}" },
    { t: t73, text: "取数、过闸门，再到{同一个账本}" },
    { t: t74, text: "决定交易的代码，{按哈希锁住}" },
    { t: t75, text: "记录{只追加}，整段重放核对" },
    { t: t76, text: "那批持仓，{全部成交}" },
    { t: t77, text: "第一次被{闸门拦下}", color: C.red[2] },
    { t: t78, text: "退市整理期首日，{超出价带检查}", color: C.red[2] },
    { t: t79, text: "核过数据，按{没有信号}记账" },
    { t: t80, text: "短短几十天，{标准误有多宽}" },
    { t: t81, text: "年底，先按协议写{前向报告}" },
  ];
  K.plans.push({ t0: win.t0, t1: win.t1, chip: "05", chap: "冻结之后", lab: "AFTER THE FREEZE · 冻结之后", tele, titles });
  K.plates.push({ t0: win.t0, t1: win.t1, text: `PAPER · DAY ${P.PAPER_DONE} / ${P.PAPER_DAYS}` });
  P.dock.push({ t0: win.t0, t1: win.t1, st: { lit: { warm: 0.35, dev: 0.35, hold: 0.35, supp: 0.35, paper: 1 }, lock: 1, folds: 1, days: P.PAPER_DONE } });

  // ================= A：已知的行情与冻结之后（70–71）=================
  const pA = K.panel(si, 140, 236, 1640, 540, C.main[1], "PAST KNOWLEDGE → FORWARD EVIDENCE · 从已知走向未知");
  const cvA = P.layer(si);
  const aYear = P.tx(si, 300, 330, "····", MONO(120), C.gray);
  const aSealed = P.tx(si, 300, 472, "数据封存", SANS(40, 800), C.text);
  const aKnown = P.tx(si, 300, 540, "大概的行情 · 已经知道", SANS(32, 700), P.DIM);
  const aFuture = P.tx(si, 1040, 340, "冻结以后才发生", SANS(40, 800), P.DIM);
  const aRange = P.tx(si, 1040, 412, "10-19 → 12-31", MONO(56, 700), P.DIM);
  const aEvidence = P.tx(si, 1040, 514, "真正向前的证据", SANS(40, 900), P.DIM);
  const aNote = P.tx(si, 1040, 580, "只描述 · 不作采纳判定", SANS(24, 600), P.DIM);
  // 与第三章合格池相同的逐日复利累计线，缩略图不另造数据。
  const marketCum = CR.series.hold.bench.reduce((out, r) => {
    out.push((1 + (out[out.length - 1] || 0)) * (1 + r) - 1);
    return out;
  }, []);
  const marketMin = Math.min(0, ...marketCum), marketMax = Math.max(0, ...marketCum);
  const marketScale = 34 / (marketMax - marketMin);
  const marketY0 = 588 + marketMax * marketScale;
  const bigTimeline = P.timeline(si, 240, 684, 1440, true);
  const upA = (t) => {
    const a = pA.up(t, t70, t72 - 0.08, 0.3);
    for (const e of [aYear, aSealed, aKnown, aFuture, aRange, aEvidence, aNote]) K.vis(e, a);
    K.put(aYear, t >= t2025 ? "2025" : "····");
    K.col(aYear, P.lightCol(t, t2025, C.text));
    K.col(aSealed, P.lightCol(t, tSeal70, C.text));
    K.col(aKnown, P.lightCol(t, tKnow70, C.amb[2]));
    K.col(aFuture, P.lightCol(t, tFreeze71, C.main[2]));
    K.col(aRange, P.lightCol(t, tFreeze71, C.main[2]));
    K.col(aEvidence, P.lightCol(t, tForward71, C.main[2]));
    K.col(aNote, P.lightCol(t, tDay71, C.gray));
    const travel = on(t, tFreeze71, 1.1);
    bigTimeline.up(t, a, { lit: { warm: 0.1, dev: 0.1, hold: 0.65 * (1 - travel), supp: 0.1, paper: travel }, lock: 1, folds: 1, days: P.PAPER_DONE });
    if (!cvA.begin(a)) return;
    const ctx = cvA.ctx;
    ctx.globalAlpha = a;
    const knownBand = 0.18 * on(t, tKnow70, 0.16) + 0.2 * P.pulse(t, tKnow70, 0.1, 0.4);
    ctx.fillStyle = K.rgba(C.amb[2], knownBand);
    ctx.fillRect(292, 536, 512, 48);
    P.lock(ctx, 230, 415, 78, P.lightCol(t, tSeal70, C.text));
    ctx.fillStyle = "#2a2d33";
    ctx.fillRect(930, 318, 1, 300);
    const marketP = on(t, tMarket70, 0.18);
    if (marketP > 0) {
      ctx.save();
      ctx.beginPath(); ctx.rect(300, 588, 550 * marketP, 36); ctx.clip();
      ctx.globalAlpha = a;
      ctx.fillStyle = K.rgba(C.amb[2], 0.3);
      ctx.fillRect(300, 588, 550, 34);
      ctx.fillStyle = K.rgba(C.amb[2], 0.45);
      ctx.beginPath(); ctx.moveTo(300, 622);
      marketCum.forEach((v, i) => ctx.lineTo(300 + i / (marketCum.length - 1) * 550, marketY0 - v * marketScale));
      ctx.lineTo(850, 622); ctx.closePath(); ctx.fill();
      P.drawCurve(ctx, marketCum, { x: 300, y0: marketY0, w: 550, scale: marketScale, p: marketP, color: C.amb[2], lw: 2.5 });
      ctx.restore();
    }
    ctx.globalAlpha = a * travel;
    P.arrow(ctx, 840, 666, 1665, 666, C.main[2], 9);
    ctx.globalAlpha = a;
    const dotX = K.lerp(bigTimeline.U("2025-01-02"), bigTimeline.U("2026-10-19"), travel);
    ctx.fillStyle = K.mix(C.gray, C.main[2], travel);
    ctx.beginPath();
    ctx.arc(dotX, 684, 5, 0, Math.PI * 2);
    ctx.fill();
  };

  // ================= B：每日流水线，上锁，再追加（72–75）=================
  const pB = K.panel(si, 140, 236, 1640, 540, C.main[1], "DAILY PIPELINE · 每个交易日");
  const cvB = P.layer(si);
  const bTime = P.tx(si, 270, 286, "··:··", MONO(96), P.DIM);
  const bCloud = P.tx(si, 680, 296, "云端容器", SANS(40, 800), P.DIM);
  const bDaily = P.tx(si, 680, 350, "每个交易日 · 定时任务", P.MONO20, C.gray);
  const bRunning = P.txr(si, 1736, 320, "SCHEDULED", MONO(26, 700), P.DIM);
  const PIPE = [
    ["取数", "TODAY'S DATA", tData73, C.amb],
    ["数据闸门", "CHECK INPUTS", tGate73, [C.text, C.gray, C.text]],
    ["封存快照", "SNAPSHOT", tSnapshot73, [C.text, C.gray, C.text]],
    ["打分", "MODEL SCORES", tScore73, C.main],
    ["出指令", "FROZEN POLICY", tOrder73, C.main],
    ["记账", "SAME LEDGER", tBook73, C.main],
    ["日报", "DAILY REPORT", tReport73, [C.text, C.gray, C.text]],
  ];
  const BX = (i) => 180 + i * 226;
  const pipeTiles = PIPE.map(([zh, en], i) => P.tile(si, BX(i), 400, 204, 88, zh, en, 28));
  const GATES = [
    ["行情文件", "齐全"], ["复权文件", "齐全"], ["行数变化", "≤ 5%"],
    ["应在的代码", "都在"], ["OHLC", "一致"], ["停牌", "没有成交"], ["收盘价", "在价带内"],
  ];
  const gateTiles = GATES.map(([zh, sub], i) => P.tile(si, BX(i), 518, 204, 76, zh, sub, 20));
  const bSeven = P.tx(si, 180, 492, "·· 道数据闸门", P.MONO20, P.DIM);
  const bSame = P.txr(si, 1736, 492, "同一个账本函数", P.MONO20, P.DIM);
  const bLockTitle = P.tx(si, 258, 622, "决定交易的代码", SANS(28, 800), P.DIM);
  const bHash = P.tx(si, 258, 664, "············", MONO(32, 700), P.DIM);
  const bLockState = P.tx(si, 258, 714, "HASH-LOCKED", P.MONO20, P.DIM);
  const bEdit = P.tx(si, 600, 626, "改动任何一处", SANS(24, 700), P.DIM);
  const bReject = P.tx(si, 600, 676, "拒绝运行", SANS(36, 900), P.DIM);
  const bAppend = P.tx(si, 952, 622, "只追加不改", SANS(32, 800), P.DIM);
  const bReplay = P.tx(si, 952, 670, "整段回放", SANS(28, 700), P.DIM);
  const bVerified = P.tx(si, 952, 716, "逐行核对", SANS(24, 700), P.DIM);
  const replayRows = LEDGER.slice(-6);
  const bDates = replayRows.map((r, i) => P.tx(si, 1282, 610 + i * (142 / Math.max(replayRows.length, 1)), r.date, MONO(20, 500), P.DIM));
  const bMarks = replayRows.map((r, i) => P.txr(si, 1708, 610 + i * (142 / Math.max(replayRows.length, 1)), "··", MONO(20, 500), P.DIM));
  const upB = (t) => {
    const a = pB.up(t, t72, t76 - 0.08, 0.3);
    for (const e of [bTime, bCloud, bDaily, bRunning]) K.vis(e, a);
    K.put(bTime, t < tClock72 ? "··:··" : "20:30");
    K.col(bTime, P.lightCol(t, tClock72, C.main[2]));
    K.col(bCloud, P.lightCol(t, tCloud72, C.text));
    K.put(bRunning, t >= tRun72 ? "RUNNING" : "SCHEDULED");
    K.col(bRunning, P.lightCol(t, tRun72, C.main[2]));
    pipeTiles.forEach((tl, i) => tl.up(t, a, PIPE[i][2], PIPE[i][3]));
    pipeTiles.slice(5).forEach((tl, j) => {
      const [, , tk, tier] = PIPE[j + 5];
      const band = 0.16 * on(t, tk, 0.16) + 0.18 * P.pulse(t, tk, 0.1, 0.35);
      tl.el.style.background = K.mixHex("#0d0f14", tier[2], band);
      if (a > 0.002 && t >= tk) K.col(tl.ss, C.text);
    });
    const gateA = a;
    gateTiles.forEach((tl, i) => tl.up(t, gateA, tGate73 + i * 0.075, [C.text, C.gray, C.text]));
    K.vis(bSeven, a);
    K.put(bSeven, t < tSeven73 ? "·· 道数据闸门" : `${GATES.length} 道数据闸门`);
    K.col(bSeven, P.lightCol(t, tSeven73, C.text));
    K.vis(bSame, a * on(t, tSame73));
    K.col(bSame, P.lightCol(t, tSame73, C.main[2]));
    const lockA = a;
    for (const e of [bLockTitle, bHash, bLockState, bEdit, bReject]) K.vis(e, lockA);
    K.put(bLockTitle, t < tCode74 ? "代码检查" : "决定交易的代码");
    K.col(bLockTitle, P.lightCol(t, tCode74, C.text));
    K.put(bHash, t < tHash74 ? "············" : "3d15f36c5500");
    K.col(bHash, P.lightCol(t, tHash74, C.main[2]));
    K.col(bLockState, P.lightCol(t, tLock74, C.main[2]));
    K.put(bLockState, t < tLock74 ? "··" : "HASH-LOCKED");
    K.put(bEdit, t < tEdit74 ? "改动检测" : "若改动任何一处");
    K.put(bReject, t < tRefuse74 ? "··" : "拒绝运行");
    K.col(bEdit, P.lightCol(t, tEdit74, C.text));
    K.col(bReject, P.lightCol(t, tRefuse74, C.red[2]));
    const appendA = a;
    for (const e of [bAppend, bReplay, bVerified]) K.vis(e, appendA);
    K.col(bAppend, P.lightCol(t, tAppend75, C.main[2]));
    K.col(bReplay, P.lightCol(t, tReplay75, C.text));
    K.col(bVerified, P.lightCol(t, tCheck75, C.main[2]));
    bDates.forEach((e, i) => {
      const rowT = tAppend75 + i * 0.12;
      const passT = tReplay75 + i * 0.19;
      K.vis(e, appendA);
      K.put(e, t < rowT ? "····-··-··" : replayRows[i].date);
      K.col(e, P.lightCol(t, passT, C.text));
      K.vis(bMarks[i], appendA);
      K.put(bMarks[i], t >= passT + 0.15 ? "MATCH" : "··");
      K.col(bMarks[i], P.lightCol(t, passT, C.main[2]));
    });
    if (!cvB.begin(a)) return;
    const ctx = cvB.ctx;
    ctx.globalAlpha = a;
    const sameBand = 0.18 * on(t, tSame73, 0.16) + 0.2 * P.pulse(t, tSame73, 0.1, 0.35);
    ctx.fillStyle = K.rgba(C.main[2], sameBand);
    ctx.fillRect(1568, 488, 180, 30);
    // 钟只表示定时任务，指针在八点半落定。
    ctx.strokeStyle = "#5a5f68";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(218, 336, 31, 0, Math.PI * 2);
    ctx.stroke();
    const clock = on(t, tClock72, 0.45);
    const minute = K.lerp(-Math.PI / 2, Math.PI / 2, clock);
    const hour = K.lerp(-Math.PI / 2, (8.5 / 12) * Math.PI * 2 - Math.PI / 2, clock);
    ctx.strokeStyle = K.mix(C.gray, C.main[2], clock);
    for (const [angle, length] of [[minute, 24], [hour, 17]]) {
      ctx.beginPath();
      ctx.moveTo(218, 336);
      ctx.lineTo(218 + Math.cos(angle) * length, 336 + Math.sin(angle) * length);
      ctx.stroke();
    }
    for (let i = 0; i < PIPE.length - 1; i++) {
      const p = on(t, PIPE[i + 1][2] - 0.14, 0.25);
      P.arrow(ctx, BX(i) + 208, 444, BX(i + 1) - 5, 444, K.mix("#3a3e46", C.text, p), 5);
    }
    ctx.globalAlpha = gateA * on(t, tSeven73);
    ctx.strokeStyle = "#5a5f68";
    ctx.beginPath();
    ctx.moveTo(BX(1) + 102, 489);
    ctx.lineTo(BX(1) + 102, 514);
    ctx.stroke();
    ctx.globalAlpha = lockA;
    ctx.strokeStyle = "#3a3e46";
    K.rr(ctx, 180.5, 608.5, 720, 147, 8);
    ctx.stroke();
    P.lock(ctx, 216, 660, 44, P.lightCol(t, tLock74, C.main[2]));
    const edit = on(t, tEdit74, 0.3);
    ctx.fillStyle = K.rgba(C.red[1], 0.16 * edit);
    ctx.fillRect(258, 704, 12 * edit, 2);
    const reject = on(t, tRefuse74, 0.22);
    ctx.strokeStyle = K.rgba(C.red[2], reject);
    K.rr(ctx, 584.5, 667.5, 286, 60, 5);
    ctx.stroke();
    P.cross(ctx, 846, 697, 18, C.red[2], reject, 2);
    ctx.globalAlpha = appendA;
    ctx.strokeStyle = "#3a3e46";
    K.rr(ctx, 932.5, 600.5, 807, 155, 8);
    ctx.stroke();
    const pitch = 142 / Math.max(replayRows.length, 1);
    for (let i = 0; i < replayRows.length; i++) {
      const y = 610 + i * pitch;
      ctx.globalAlpha = appendA;
      ctx.fillStyle = "#2a2d33";
      ctx.fillRect(1270, y + 25, 450, 1);
    }
    const scan = K.prog(t, tReplay75, tCheck75 + 0.45);
    if (scan > 0 && scan < 1) {
      ctx.globalAlpha = appendA;
      ctx.fillStyle = C.main[2];
      ctx.fillRect(1268, 609 + scan * 142, 452, 1);
    }
  };

  // ================= C：成交池、逐日账本和 10-23 的处置（76–79）=================
  const pCLeft = K.panel(si, 140, 236, 800, 540, C.main[1], "PAPER · 10-19 SCORE → 10-20 OPEN");
  const pCRight = K.panel(si, 980, 236, 800, 540, C.main[1], "DAILY LEDGER · 2026 · 只追加");
  const cvC = P.layer(si);
  const cFilled = P.tx(si, 180, 290, "·· / ··", MONO(96), P.DIM);
  const cLots = P.txr(si, 896, 350, "整手", SANS(40, 800), P.DIM);
  const cPoolLabel = P.tx(si, 180, 398, "合格池 · 按 10-19 收盘打分排序", P.MONO20, C.gray);
  const cPoolTag = P.txr(si, 896, 744, K.fmt(P.POOL.n) + " 格", P.MONO20, C.amb[2]);
  const cFeesLabel = P.tx(si, 1008, 582, "10-20 建仓费用 · 元", P.MONO20, P.DIM);
  const cFees = P.tx(si, 1008, 610, "········", MONO(96), P.DIM);
  const feeParts = [
    ["滑点", F.parts.slippage], ["佣金", F.parts.commission],
    ["过户费", F.parts.transfer], ["印花税", F.parts.stamp],
  ];
  const cParts = feeParts.map(([name], i) => P.tx(si, 1008 + (i % 2) * 380, 720 + Math.floor(i / 2) * 28, name + " ··", P.MONO20, P.DIM));
  const rows = LEDGER.map((r) => [r.date.slice(5), K.fmt(r.holdings), P.pct(r.turnover), K.fmt(r.fees, 2), r.gate === "accept" ? "··" : "PASS"]);
  const ledgerRh = Math.max(30, Math.min(39, Math.floor(274 / (LEDGER.length + 1))));
  const table = P.table(si, 1004, 302, ["日期", "持仓", "双边换手", "费用 / 元", "闸门"], rows, { widths: [100, 72, 136, 144, 300], rh: ledgerRh });
  const cDate = P.tx(si, 180, 310, "10-23", MONO(96), C.text);
  const cFirst = P.tx(si, 650, 348, "首次拦截", SANS(28, 700), P.DIM);
  const cStatus = P.tx(si, 180, 436, "闸门拦下", SANS(40, 900), P.DIM);
  const cCauses = [
    P.tx(si, 180, 506, "退市整理期首日", SANS(30, 700), P.DIM),
    P.tx(si, 180, 552, "不设涨跌幅", SANS(30, 700), P.DIM),
    P.tx(si, 180, 598, "跌幅超出价带检查", SANS(30, 800), P.DIM),
  ];
  const cReason = P.tx(si, 180, 686, "数据核过 · 写下理由", SANS(28, 700), P.DIM);
  const cNoRebal = P.tx(si, 180, 730, "不是换仓日", SANS(24, 700), P.DIM);
  const heldOrder = [...P.HELD];
  const heldAt = (i) => tHeld76 + heldOrder.indexOf(i) * 0.022;
  const filledAt = (i) => tAll76 + heldOrder.indexOf(i) * 0.023;
  const rowTimes = LEDGER.map((r, i) => {
    if (r.date <= "2026-10-19") return tDate76;
    if (r.date === "2026-10-20") return tFill76;
    if (r.date < "2026-10-23") return tFees76 + 0.4 + i * 0.16;
    if (r.date === "2026-10-23") return tDate77;
    return tNoSignal79 + 0.45 + (i - acceptedRow - 1) * 0.13;
  });
  const upC = (t) => {
    const a = pCLeft.up(t, t76, t80 - 0.08, 0.3);
    pCRight.up(t, t76, t80 - 0.08, 0.3);
    K.put(pCLeft.lab, t < t77 ? "PAPER · 10-19 SCORE → 10-20 OPEN" : "PRICE-BAND GATE · 10-23");
    const incident = on(t, t77, 0.3);
    const poolA = a * (1 - incident);
    for (const e of [cFilled, cLots, cPoolLabel, cPoolTag]) K.vis(e, poolA);
    K.put(cFilled, t < tHeld76 ? "·· / ··" : t < tAll76 ? `·· / ${F.orders}` : `${F.filled} / ${F.orders}`);
    K.col(cFilled, P.lightCol(t, tAll76, C.main[2]));
    K.col(cLots, P.lightCol(t, tLots76, C.main[2]));
    K.vis(cFeesLabel, a);
    K.col(cFeesLabel, P.lightCol(t, tCost76, C.red[2]));
    K.vis(cFees, a);
    K.put(cFees, t < tFees76 ? "········" : K.fmt(F.fees, 2));
    K.col(cFees, P.lightCol(t, tFees76, C.red[2]));
    if (t >= tFees76) P.glow(cFees, t, tFees76, C.red);
    else cFees.style.textShadow = cFees._ts = "none";
    cParts.forEach((e, i) => {
      K.vis(e, a);
      K.put(e, feeParts[i][0] + " " + (t < tFees76 ? "··" : K.fmt(feeParts[i][1], 2)));
      K.col(e, P.lightCol(t, tFees76 + 0.1 + i * 0.12, C.red[2]));
    });
    const accepted = on(t, tNoSignal79, 0.3);
    table.up(t, a, t76, {
      rowT: rowTimes,
      hl: (i, j) => {
        if (i === acceptedRow && t >= tBlock77 && t < tNoSignal79) return C.red[2];
        if (j === 3 && LEDGER[i].fees > 0) return t >= tFees76 ? C.red[2] : P.DIM;
        return j === 1 && LEDGER[i].holdings > 0 ? C.main[2] : C.text;
      },
    });
    // 第一笔费用听到才填；accept 行先保留拦截，不能在第 76 句泄露处置结论。
    LEDGER.forEach((r, i) => {
      K.put(table.cells[i][3], r.fees > 0 && t < tFees76 ? "··" : K.fmt(r.fees, 2));
      if (i === acceptedRow) K.put(table.cells[i][4], t < tBlock77 ? "··" : t < tNoSignal79 ? "闸门拦下" : "ACCEPT · NO SIGNAL");
    });
    const incidentA = a * incident;
    for (const e of [cDate, cFirst, cStatus]) K.vis(e, incidentA);
    K.col(cFirst, P.lightCol(t, tFirst77, C.red[2]));
    K.put(cStatus, t >= tNoSignal79 ? "ACCEPT · NO SIGNAL" : "闸门拦下");
    cStatus.style.font = t >= tNoSignal79 ? MONO(36, 800) : SANS(40, 900);
    K.col(cStatus, t >= tNoSignal79 ? C.text : P.lightCol(t, tBlock77, C.red[2]));
    [tDelist78, tLimit78, tBand78].forEach((tc, i) => {
      K.vis(cCauses[i], incidentA * on(t, tc));
      K.col(cCauses[i], K.mix(i === 2 ? C.red[2] : C.text, C.gray, accepted * 0.7));
    });
    K.vis(cReason, incidentA * on(t, tVerified79));
    K.put(cReason, t < tReason79 ? "数据核过 ··" : "数据核过 · 写下理由");
    K.col(cReason, P.lightCol(t, tReason79, C.text));
    K.vis(cNoRebal, incidentA * on(t, tNoRebal79));
    K.col(cNoRebal, P.lightCol(t, tNoRebal79, C.main[2]));
    if (!cvC.begin(a)) return;
    const ctx = cvC.ctx;
    ctx.globalAlpha = poolA;
    P.drawPool(ctx, { x: 180, y: 432, cell: 8, gap: 2, fill: 1, dim: on(t, tHeld76, 0.6), heldT: (i) => on(t, heldAt(i), 0.25), check: (i) => P.HELD.has(i) ? on(t, filledAt(i), 0.22) : 0 });
    ctx.globalAlpha = poolA * on(t, tLots76);
    P.check(ctx, 785, 376, 28, C.main[2], on(t, tLots76), 3);
    // 四样费用沿用第一章的红粉比例条，数值来自 firstFill.parts。
    feeParts.forEach(([, value], i) => {
      const x = 1008 + (i % 2) * 380;
      const y = 739 + Math.floor(i / 2) * 28;
      ctx.globalAlpha = a * on(t, tFees76 + 0.1 + i * 0.12);
      ctx.fillStyle = "#2a2d33";
      ctx.fillRect(x + 220, y - 13, 120, 3);
      ctx.fillStyle = C.red[1];
      ctx.fillRect(x + 220, y - 13, 120 * (value / F.parts.slippage) * on(t, tFees76 + i * 0.12, 0.35), 3);
    });
    if (acceptedRow >= 0) {
      const y = 302 + (acceptedRow + 1) * table.rh;
      const blocked = on(t, tBlock77, 0.25);
      ctx.globalAlpha = a * blocked;
      ctx.fillStyle = K.rgba(C.red[1], 0.17 * (1 - accepted));
      ctx.fillRect(1005, y + 1, table.W - 2, table.rh - 1);
      ctx.strokeStyle = K.mix(C.red[2], C.gray, accepted);
      ctx.lineWidth = 1;
      ctx.strokeRect(1004.5, y + 0.5, table.W - 1, table.rh - 1);
    }
    ctx.globalAlpha = incidentA;
    const block = on(t, tBlock77);
    ctx.strokeStyle = K.mix("#3a3e46", C.red[2], block * (1 - accepted));
    ctx.lineWidth = 1;
    ctx.fillStyle = K.rgba(C.red[1], 0.07 * block * (1 - accepted));
    K.rr(ctx, 164.5, 424.5, 750, 64, 7);
    ctx.fill();
    ctx.stroke();
    const verify = on(t, tVerified79, 0.3);
    P.check(ctx, 868, 705, 24, C.main[2], verify, 2);
    if (t >= tDelist78) {
      ctx.globalAlpha = incidentA * on(t, tDelist78);
      ctx.fillStyle = K.mix(C.red[1], C.gray, accepted);
      ctx.fillRect(166, 512, 2, 116 * on(t, tBand78, 0.35));
    }
  };

  // ================= D：标准误的尺度，再按协议写报告（80–81）=================
  // 54、2.2 来自 RESEARCH.md:196；这里画 ±1 个标准误的尺度示意，不冒充置信区间。
  const SE = 2.2;
  const pD = K.panel(si, 140, 236, 1640, 540, C.main[1], "FORWARD HORIZON · 2026-10-19 → 12-31");
  const cvD = P.layer(si);
  const dDays = P.tx(si, 180, 306, "··", MONO(120), P.DIM);
  const dUnit = P.tx(si, 366, 376, "个交易日 · 约数", SANS(28, 700), P.DIM);
  const dSELabel = P.tx(si, 1008, 310, "信息比率的标准误", SANS(36, 800), P.DIM);
  const dSE = P.tx(si, 1008, 358, "···", MONO(96), P.DIM);
  const dSECode = P.tx(si, 1240, 420, "SE(IR)", MONO(28, 700), P.DIM);
  const dTag = P.tag(si, 1740, 282, "ILLUSTRATIVE · 示意", C.gray);
  const XX = (v) => 880 + v * 240;
  const dZero = P.ctr(si, XX(0), 608, "0", MONO(26, 700), C.gray);
  const dLo = P.ctr(si, XX(-SE), 516, "···", MONO(28, 700), P.DIM);
  const dHi = P.ctr(si, XX(SE), 516, "···", MONO(28, 700), P.DIM);
  const dTargets = [0.5, 1].map((v) => P.ctr(si, XX(v), 650, "··", MONO(32, 800), P.DIM));
  const dTargetLabel = P.tx(si, 1076, 704, "想分辨的量", SANS(24, 700), P.DIM);
  const dRatio = P.tx(si, 1480, 556, "两到四倍", SANS(40, 900), P.DIM);
  const dFoot = P.tx(si, 180, 736, "以 0 为中心的 ±1 个标准误 · 尺度示意", P.MONO20, C.gray);
  const dDayCount = P.tx(si, 180, 310, `DAY ${P.PAPER_DONE} / ${P.PAPER_DAYS}`, MONO(96), C.main[2]);
  const dCannot = P.tx(si, 180, 430, "还分不出好坏", SANS(40, 800), P.DIM);
  const dDate = P.tx(si, 1028, 340, "12-31", MONO(64), P.DIM);
  const dReport = P.tx(si, 1290, 350, "前向报告", SANS(40, 800), P.DIM);
  const dProtocol = P.tx(si, 1028, 422, "按协议 · 只描述，不作采纳判定", SANS(24, 700), P.DIM);
  const upD = (t) => {
    const a = pD.up(t, t80, tEnd - 0.3, 0.3);
    const final = on(t, t81, 0.3);
    for (const e of [dDays, dUnit, dSELabel, dSE, dSECode]) K.vis(e, a * (1 - final));
    K.put(dDays, t < t54 ? "··" : K.fmt(P.PAPER_DAYS));
    K.col(dDays, P.lightCol(t, t54, C.text));
    K.col(dUnit, P.lightCol(t, t54, C.text));
    K.col(dSELabel, P.lightCol(t, tIR80, C.text));
    K.put(dSE, t < t22 ? "···" : K.fmt(SE, 1));
    K.col(dSE, P.lightCol(t, t22, C.text));
    K.col(dSECode, P.lightCol(t, tSE80, C.text));
    const chartA = a * (1 - final * 0.55);
    for (const e of [dTag, dZero, dLo, dHi, ...dTargets, dTargetLabel, dRatio, dFoot]) K.vis(e, chartA);
    K.put(dLo, t < t22 ? "···" : "−" + K.fmt(SE, 1));
    K.put(dHi, t < t22 ? "···" : "+" + K.fmt(SE, 1));
    K.col(dLo, P.lightCol(t, t22, C.text));
    K.col(dHi, P.lightCol(t, t22, C.text));
    dTargets.forEach((e, i) => {
      const tc = i === 0 ? t05 : t1;
      K.put(e, t < tc ? "··" : P.fn(i === 0 ? 0.5 : 1, i === 0 ? 1 : 0));
      K.col(e, P.lightCol(t, tc, C.main[2]));
    });
    K.col(dTargetLabel, P.lightCol(t, t05, C.main[2]));
    K.col(dRatio, P.lightCol(t, tRatio80, C.text));
    const endA = a * final;
    for (const e of [dDayCount, dCannot, dDate, dReport, dProtocol]) K.vis(e, endA);
    K.col(dCannot, P.lightCol(t, tCannot81, C.text));
    K.col(dDate, P.lightCol(t, tYear81, C.main[2]));
    K.col(dReport, P.lightCol(t, tForwardReport81, C.main[2]));
    K.col(dProtocol, P.lightCol(t, tProtocol81, C.text));
    if (!cvD.begin(a)) return;
    const ctx = cvD.ctx;
    ctx.globalAlpha = chartA;
    ctx.fillStyle = "#3a3e46";
    ctx.fillRect(280, 580, 1160, 1);
    const spread = on(t, t22, 0.55);
    ctx.fillStyle = K.rgba(C.text, 0.17);
    ctx.fillRect(XX(-SE * spread), 558, 2 * SE * spread * 240, 44);
    ctx.strokeStyle = K.rgba(C.text, 0.85);
    ctx.lineWidth = 1;
    ctx.strokeRect(XX(-SE * spread) + 0.5, 558.5, 2 * SE * spread * 240, 43);
    ctx.fillStyle = C.text;
    ctx.fillRect(XX(0), 548, 1, 54);
    for (const [v, tc] of [[0.5, t05], [1, t1]]) {
      const p = on(t, tc, 0.3);
      ctx.fillStyle = K.mix("#3a3e46", C.main[2], p);
      ctx.fillRect(XX(v) - 1, 566, 3, 70 * p);
      ctx.fillRect(XX(0), 626 + (v === 1 ? 12 : 0), (XX(v) - XX(0)) * p, 2);
    }
    ctx.globalAlpha = a * final;
    ctx.strokeStyle = K.mix("#3a3e46", C.main[1], on(t, tProtocol81));
    K.rr(ctx, 1008.5, 318.5, 731, 148, 8);
    ctx.stroke();
    ctx.fillStyle = C.main[1];
    ctx.fillRect(180, 486, 700 * (P.PAPER_DONE / P.PAPER_DAYS), 4);
    ctx.strokeStyle = "#3a3e46";
    ctx.strokeRect(180.5, 486.5, 699, 3);
  };

  return (t) => {
    if (t < t72 + 0.35) upA(t); else upA(-1);
    if (t > t72 - 0.2 && t < t76 + 0.35) upB(t); else upB(-1);
    if (t > t76 - 0.2 && t < t80 + 0.35) upC(t); else upC(-1);
    if (t > t80 - 0.2) upD(t); else upD(-1);
  };
});
