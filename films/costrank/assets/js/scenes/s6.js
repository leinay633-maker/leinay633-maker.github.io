// 收尾：问题 → 答案 → 两条体会与下一步 → 回到开场的 1800 格。
K.scene("s6", (si, win) => {
  const C = K.C;
  const MONO = P.mono;
  const SANS = P.sans;
  const DIM = "#6b707a";
  const L = (n) => K.seg(n).t0 - 0.08;
  const at = (n, s, k = 1) => K.w(n, s, k) - 0.08;
  const t82 = win.t0;
  const t83 = L(83);
  const t84 = L(84);
  const t85 = L(85);
  const t86 = L(86);
  const t87 = L(87);
  const tMachine = at(82, "机器学习选股");
  const tCost = at(82, "成本");
  const tLeft = at(82, "还剩多少");
  const tNet = at(83, "扣完成本");
  const tAnswer = at(83, "没找到");
  const tDev = at(83, "开发期");
  const tMainStyle = at(83, "主要来自");
  const tStyle83 = at(83, "风格");
  const tTwo = at(84, "两件事");
  const tRule = at(84, "判定规则");
  const tBefore = at(84, "之前");
  const tWrite = at(84, "照写");
  const tLooks = at(85, "看着像超额");
  const tSplit = at(85, "拆开");
  const tStyle85 = at(85, "风格");
  const tStyle86 = at(86, "两个风格");
  const tRisk = at(86, "风险控制住");
  const tNew = at(86, "写好新规则");
  const tData = at(86, "冻结以后的数据");
  const tTest = at(86, "检验");
  const tQuestion = at(87, "问题");
  const tProtocol = at(87, "协议");
  const tCriteria = at(87, "判定标准");
  const tCheck = at(87, "每个数的核对");
  const tAudit = at(87, "核对");
  const tMine = at(87, "是我做的");
  const tDisclaimer = K.seg(87).t1;
  const IR = [CR.ir.dev, CR.ir.hold, CR.ir.supp];
  const rawIC = P.mean(CR.ic.dev.raw);
  const neutralIC = P.mean(CR.ic.dev.neutral);

  // P.say 的对时照用，未读字略提亮，避免大块面板上的暗字低于对比度下限。
  const say = (x, y, w, n, text, font) => {
    const q = P.say(si, x, y, w, n, text, font);
    q.paint = (t, color = C.text) => q.spans.forEach((e, i) => K.col(e, P.lightCol(t, q.times[i] - 0.08, color, DIM)));
    return q;
  };
  const lightWord = (q, word, t, tOn, color) => {
    const i = q.el.textContent.indexOf(word);
    if (i >= 0) q.spans.slice(i, i + word.length).forEach((e) => K.col(e, P.lightCol(t, tOn, color, DIM)));
  };

  // ---- HUD ----
  const tele = (t) => t < t86
    ? `▸ IR ${P.fn(IR[0])} · ${P.fn(IR[1])} · ${P.fn(IR[2])} · IC ${P.fn(rawIC, 3)} → ${P.fn(neutralIC, 3)}`
    : t < t87
      ? "▸ NEXT · CONTROL STYLE AS RISK · NEW RULES · POST-FREEZE DATA"
      : "▸ NOT INVESTMENT ADVICE";
  const titles = [
    { t: t82, text: "回到{开头的问题}" },
    { t: t83, text: "在这个设定下，{没找到}可靠的超额" },
    { t: t84, text: "两条体会，和{下一步}" },
    { t: t85, text: "看着像超额，先拆开看{风格}", color: C.amb[2] },
    { t: t86, text: "把风格当成{风险}控制住", color: C.amb[2] },
    { t: t87, text: "问题、协议、判定标准和{每个数的核对}" },
  ];
  K.plans.push({ t0: win.t0, t1: win.t1, chip: "06", chap: "收尾", lab: "THE ANSWER · 回到开头的问题", tele, titles });
  K.plates.push({ t0: win.t0, t1: win.t1, text: "FROZEN · LIGHTGBM + 10 FEATURES + COST" });
  P.dock.push({ t0: win.t0, t1: win.t1, st: { lit: { warm: 1, dev: 1, hold: 1, supp: 1, paper: 1 }, lock: 1, open: 1, folds: 1, days: P.PAPER_DONE } });


  // ================= A：片名问句（82）=================
  const pA = K.panel(si, 140, 236, 1640, 540, C.main[1], "THE QUESTION · 回到开头");
  const cvA = P.layer(si);
  const question1 = say(200, 326, 1520, 82, "机器学习选股，", SANS(72, 900));
  const question2 = say(200, 430, 1520, 82, "扣掉成本还剩多少？", SANS(72, 900));
  const setting = P.tx(si, 200, 652, "沪深全 A · 日频 · 只做多", SANS(28, 600), C.gray);
  const upA = (t) => {
    const a = pA.up(t, t82, t83, 0.3);
    const textA = a * (1 - K.prog(t, t83 - 0.12, t83 + 0.04));
    [pA.lab, question1.el, question2.el, setting].forEach((e) => K.vis(e, textA));
    if (a > 0) {
      question1.paint(t);
      question2.paint(t);
      lightWord(question2, "成本", t, tCost, C.red[2]);
      lightWord(question2, "还剩多少", t, tLeft, C.main[2]);
    }
    if (!cvA.begin(a)) return;
    const ctx = cvA.ctx;
    ctx.globalAlpha = a;
    ctx.fillStyle = "#2a2d33";
    ctx.fillRect(200, 578, 1520, 1);
    ctx.fillStyle = C.main[1];
    ctx.fillRect(200, 578, 1520 * K.eio(K.prog(t, tMachine, tLeft + 0.4)), 1);
  };

  // ================= B：三段 IR 和打分 IC（83）=================
  const pB = K.panel(si, 140, 236, 1640, 540, C.main[1], "THE ANSWER · 本次设定 · 已扣成本");
  const cvB = P.layer(si);
  const answer = say(180, 296, 1550, 83, "没找到可靠的超额", SANS(64, 900));
  const irLabel = P.tx(si, 180, 408, "信息比率", SANS(30, 800), C.text);
  const irBase = P.txr(si, 1144, 414, "VS 0.95 × POOL EW", P.MONO20, C.amb[2]);
  const irXs = [180, 510, 840];
  const irTimes = IR.map((v, i) => tNet + i * 0.16);
  const irYears = ["开发期", "2025", "2026"];
  const irKinds = ["2020–2024", "保留期", "补做"];
  const irYear = irYears.map((s, i) => P.tx(si, irXs[i], 462, s, i ? MONO(28, 700) : SANS(28, 700), C.gray));
  const irValue = IR.map((v, i) => P.tx(si, irXs[i], 504, "··", MONO(96), DIM));
  const irKind = irKinds.map((s, i) => P.tx(si, irXs[i], 628, s, i ? SANS(24, 600) : MONO(24, 600), C.gray));
  const icLabel = P.tx(si, 1216, 408, "打分 IC · 开发期", SANS(30, 800), C.text);
  const icBefore = P.tx(si, 1216, 472, "中性化前", SANS(24, 700), C.amb[2]);
  const icAfter = P.tx(si, 1512, 472, "中性化后", SANS(24, 700), C.main[2]);
  const icV0 = P.tx(si, 1216, 514, "··", MONO(64), DIM);
  const icV1 = P.tx(si, 1512, 514, "··", MONO(64), DIM);
  const icNote = P.tx(si, 1216, 678, "剔除行业和风格后", SANS(24, 600), C.gray);
  const styleAnswer = say(180, 706, 1010, 83, "开发期那点优势，主要来自风格。", SANS(36, 800));
  const upB = (t) => {
    const a = pB.up(t, t83, t84, 0.3);
    const textA = a * K.prog(t, t83 + 0.05, t83 + 0.22) * (1 - K.prog(t, t84 - 0.12, t84 + 0.04));
    [pB.lab, answer.el, irLabel, irBase, icLabel, icBefore, icAfter, icV0, icV1, icNote, styleAnswer.el, ...irYear, ...irValue, ...irKind].forEach((e) => K.vis(e, textA));
    if (a > 0) {
      answer.paint(t);
      lightWord(answer, "没找到", t, tAnswer, C.main[2]);
      styleAnswer.paint(t);
      lightWord(styleAnswer, "风格", t, tStyle83, C.amb[2]);
      IR.forEach((v, i) => {
        K.put(irValue[i], t >= irTimes[i] ? P.fn(v) : "··");
        K.col(irValue[i], P.lightCol(t, irTimes[i], v < 0 ? C.gray : C.main[2], DIM));
        K.col(irYear[i], P.lightCol(t, irTimes[i], C.text, DIM));
      });
      K.put(icV0, t >= tDev ? P.fn(rawIC, 3) : "··");
      K.put(icV1, t >= tMainStyle ? P.fn(neutralIC, 3) : "··");
      K.col(icV0, P.lightCol(t, tDev, C.amb[2], DIM));
      K.col(icV1, P.lightCol(t, tMainStyle, C.main[2], DIM));
    }
    if (!cvB.begin(a)) return;
    const ctx = cvB.ctx;
    ctx.globalAlpha = a;
    ctx.strokeStyle = "#2a2d33";
    ctx.lineWidth = 1;
    irXs.forEach((x) => {
      K.rr(ctx, x - 12.5, 452.5, 316, 220, 8);
      ctx.stroke();
    });
    ctx.fillStyle = "#2a2d33";
    ctx.fillRect(1180, 408, 1, 324);
    for (const y of [604, 640]) ctx.fillRect(1216, y, 450, 12);
    const p0 = K.eo(K.prog(t, tDev, tDev + 0.55));
    const p1 = K.eo(K.prog(t, tMainStyle, tStyle83 + 0.3));
    ctx.fillStyle = C.amb[1];
    ctx.fillRect(1216, 604, 450 * p0, 12);
    ctx.fillStyle = C.main[1];
    ctx.fillRect(1216, 640, 450 * neutralIC / rawIC * p1, 12);
    if (p1 > 0) {
      ctx.globalAlpha = a * p1;
      P.arrow(ctx, 1430, 548, 1478, 548, C.text, 8);
    }
  };

  // ================= C：三张卡常驻，念到哪张亮哪张（84–86）=================
  const cardXs = [140, 695, 1250];
  const panels = cardXs.map((x, i) => K.panel(si, x, 236, 530, 540, C.gray, ["01 · 体会", "02 · 体会", "NEXT · 下一步"][i]));
  const cvC = P.layer(si);
  const heads = ["规则写在前面", "先拆开看风格", "下一步"];
  const headE = heads.map((s, i) => P.tx(si, cardXs[i] + 32, 306, s, SANS(40, 900), DIM));
  const rule1 = say(172, 410, 466, 84, "判定规则写在看结果之前，", SANS(36, 800));
  const rule2 = say(172, 466, 466, 84, "结果不好看也照写。", SANS(36, 800));
  const ruleBefore = P.tx(si, 172, 650, "先写规则", SANS(26, 700), C.gray);
  const ruleAfter = P.txr(si, 638, 650, "再看结果", SANS(26, 700), C.gray);
  const ruleKeep = P.tx(si, 172, 706, "结果不好看，也照写", SANS(28, 800), DIM);
  const split1 = say(727, 410, 466, 85, "回测里看着像超额的东西，", SANS(34, 700));
  const split2 = say(727, 466, 466, 85, "先拆开，看是不是风格。", SANS(34, 800));
  const receiptLabels = [
    P.tx(si, 759, 620, "特质波动低", SANS(28, 700), DIM),
    P.tx(si, 759, 664, "换手冷清", SANS(28, 700), DIM),
  ];
  const receiptTag = P.tag(si, 727, 734, "小票回扣 · 比喻", C.gray, true);
  const next1 = say(1318, 410, 424, 86, "把这两个风格", SANS(32, 800));
  const nextRisk = say(1318, 454, 424, 86, "当成风险控制住，", SANS(32, 800));
  const next2 = say(1318, 544, 424, 86, "写好新规则，", SANS(32, 800));
  const next3 = say(1318, 644, 424, 86, "用冻结以后的数据检验。", SANS(32, 800));
  const cardOn = [tTwo, t85, t86];
  const cardColor = [C.main[2], C.amb[2], C.text];
  const upC = (t) => {
    const textFade = K.prog(t, t84 + 0.05, t84 + 0.22) * (1 - K.prog(t, t87 - 0.12, t87 + 0.04));
    const aa = panels.map((p, i) => {
      const a = p.up(t, t84, t87, 0.3);
      const lit = K.eo(K.prog(t, cardOn[i], cardOn[i] + 0.3));
      p.el.style.borderColor = K.mix("#3a3e46", cardColor[i], lit * 0.6);
      p.el.querySelectorAll(".pc").forEach((e) => { e.style.borderColor = K.mix("#3a3e46", cardColor[i], lit); });
      K.vis(p.lab, a * textFade);
      K.vis(headE[i], a * textFade);
      K.col(headE[i], P.lightCol(t, cardOn[i], cardColor[i], DIM));
      return a;
    });
    const a = Math.max(...aa);
    [rule1.el, rule2.el, ruleBefore, ruleAfter, ruleKeep, split1.el, split2.el, ...receiptLabels, receiptTag, next1.el, nextRisk.el, next2.el, next3.el].forEach((e) => K.vis(e, a * textFade));
    if (a > 0) {
      rule1.paint(t);
      rule2.paint(t);
      split1.paint(t);
      split2.paint(t);
      next1.paint(t);
      nextRisk.paint(t);
      next2.paint(t);
      next3.paint(t);
      lightWord(split2, "风格", t, tStyle85, C.amb[2]);
      lightWord(next1, "风格", t, tStyle86, C.amb[2]);
      K.col(ruleBefore, P.lightCol(t, tRule, C.text, DIM));
      K.col(ruleAfter, P.lightCol(t, tBefore, C.text, DIM));
      K.col(ruleKeep, P.lightCol(t, tWrite, C.main[2], DIM));
      receiptLabels.forEach((e, i) => K.col(e, P.lightCol(t, tSplit + i * 0.16, C.amb[2], DIM)));
    }
    if (!cvC.begin(a)) return;
    const ctx = cvC.ctx;
    ctx.globalAlpha = a;
    P.lock(ctx, 608, 330, 42, P.lightCol(t, tRule, C.main[2], DIM));
    const ruleP = K.eio(K.prog(t, tRule, tBefore + 0.3));
    ctx.fillStyle = "#2a2d33";
    ctx.fillRect(192, 606, 424, 1);
    ctx.fillStyle = C.main[1];
    ctx.fillRect(192, 606, 424 * ruleP, 1);
    for (const [x, tk] of [[192, tRule], [616, tBefore]]) {
      ctx.fillStyle = P.lightCol(t, tk, C.text, DIM);
      ctx.fillRect(x - 4, 602, 9, 9);
    }
    P.check(ctx, 610, 727, 26, C.main[2], K.prog(t, tWrite, tWrite + 0.3), 2);
    // 这张小票是归因的比喻，下面两行不编码任何收益大小。
    const splitP = K.eio(K.prog(t, tSplit, tStyle85 + 0.25));
    ctx.strokeStyle = P.lightCol(t, tLooks, C.text, "#3a3e46");
    ctx.lineWidth = 1;
    K.rr(ctx, 727.5, 574.5, 465, 149, 6);
    ctx.stroke();
    ctx.fillStyle = "#3a3e46";
    ctx.fillRect(747, 602, 426, 1);
    receiptLabels.forEach((e, i) => {
      const band = 0.18 * K.eo(K.prog(t, tStyle86, tStyle86 + 0.16)) + 0.2 * P.pulse(t, tStyle86, 0.1, 0.4);
      ctx.globalAlpha = a * textFade;
      ctx.fillStyle = K.rgba(C.amb[2], band);
      ctx.fillRect(751, 617 + i * 44, 424, 38);
      ctx.fillStyle = K.mix("#2a2d33", C.amb[1], K.c01(splitP * 2 - i * 0.4));
      ctx.fillRect(743, 622 + i * 44, 3, 28);
    });
    const riskBand = 0.18 * K.eo(K.prog(t, tRisk, tRisk + 0.16)) + 0.2 * P.pulse(t, tRisk, 0.1, 0.4);
    ctx.globalAlpha = a * textFade;
    ctx.fillStyle = K.rgba(C.main[2], riskBand);
    ctx.fillRect(1310, 450, 432, 46);
    ctx.globalAlpha = a;
    const steps = [[tRisk, 446], [tNew, 565], [tData, 666]];
    steps.forEach(([tk, y], i) => {
      const p = K.eo(K.prog(t, tk, tk + 0.35));
      ctx.strokeStyle = K.mix("#3a3e46", i === 0 ? C.amb[1] : C.main[1], p);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(1286, y, 10, 0, 6.283);
      ctx.stroke();
      ctx.fillStyle = K.mix("#2a2d33", i === 0 ? C.amb[1] : C.main[1], p);
      ctx.beginPath();
      ctx.arc(1286, y, 3 + 3 * p, 0, 6.283);
      ctx.fill();
      if (i < 2) P.arrow(ctx, 1286, y + 20, 1286, steps[i + 1][1] - 20, p ? C.gray : "#3a3e46", 6);
    });
    P.check(ctx, 1738, 738, 26, C.main[2], K.prog(t, tTest, tTest + 0.3), 2);
  };

  // ================= D：回到真实的 1800 格，平实留屏（87）=================
  const cvD = P.layer(si);
  const code = P.tx(si, 1400, 244, "代码主要是 AI 写的", SANS(28, 600), C.text);
  const own1 = say(1400, 310, 360, 87, "问题、协议、判定标准", SANS(28, 700));
  const own2 = say(1400, 354, 360, 87, "和每个数的核对，", SANS(28, 700));
  const own3 = say(1400, 398, 360, 87, "是我做的。", SANS(28, 700));
  const gridDate = P.tx(si, 1400, 450, CR.grid.date.slice(5) + " CLOSE · 收盘打分", P.MONO20, C.gray);
  const poolN = P.tx(si, 1394, 480, K.fmt(CR.pool), MONO(96), C.text);
  const poolL = P.tx(si, 1400, 584, "只股票 · 按分数排，左上最高", SANS(24, 600), C.gray);
  const heldN = P.tx(si, 1394, 616, K.fmt(CR.grid.held.length), MONO(76), C.main[2]);
  const heldL = P.tx(si, 1524, 651, "只持仓", SANS(28, 700), C.main[2]);
  const day = P.tx(si, 1400, 728, `DAY ${P.PAPER_DONE} / ${P.PAPER_DAYS}`, MONO(52, 700), C.main[2]);
  const disclaimer = P.tx(si, 140, 198, "回测和模拟盘结果不代表未来收益，不构成投资建议", SANS(28, 500), C.gray);
  const upD = (t) => {
    const a = P.win(t, t87, win.t1 + 1, 0.3, 0.3);
    const textA = a * K.prog(t, t87 + 0.05, t87 + 0.22);
    [code, own1.el, own2.el, own3.el, gridDate, poolN, poolL, heldN, heldL, day].forEach((e) => K.vis(e, textA));
    K.vis(disclaimer, a * K.prog(t, tDisclaimer, tDisclaimer + 0.25));
    if (a > 0) {
      own1.paint(t);
      own2.paint(t);
      own3.paint(t);
    }
    if (!cvD.begin(a)) return;
    const ctx = cvD.ctx;
    ctx.globalAlpha = a;
    // 格 15 px、间距 4 px：底边到 y 806，让开底部时间轴的标签（y 813 起）
    P.drawPool(ctx, { x: 140, y: 240, cell: 15, gap: 4, fill: 1, held: 1, dim: 0.6 });
    // 暖白逐行核对后退回原分数灰阶，24 只持仓也恢复橙色；定格前结束。
    for (let row = 0; row < P.POOL.rows; row++) {
      const scan = P.pulse(t, tAudit + row * 0.025, 0.075, 0.18);
      if (scan <= 0) continue;
      ctx.globalAlpha = a * scan * 0.68;
      ctx.fillStyle = C.text;
      for (let col = 0; col < P.POOL.cols; col++) ctx.fillRect(140 + col * 19, 240 + row * 19, 15, 15);
    }
    ctx.globalAlpha = a;
    // 词本身还是暗档，不能整行铺亮；可量的是这行字上方的空档，念到一词闪一次。
    const words87 = [[tQuestion, 1396, 112], [tProtocol, 1508, 112], [tCriteria, 1620, 150]];
    const flash87 = words87.reduce((m, [tk]) => Math.max(m, P.pulse(t, tk, 0.08, 0.34)), 0);
    if (flash87 > 0) {
      ctx.fillStyle = K.rgba(C.main[2], 0.55 * flash87);
      ctx.fillRect(1392, 276, 400, 34);
    }
    words87.forEach(([tk, x, w]) => {
      const mark = K.eo(K.prog(t, tk, tk + 0.14));
      if (mark <= 0) return;
      ctx.fillStyle = K.rgba(C.main[2], 0.34 * mark);
      ctx.fillRect(x, 308, w, 40);
    });
    ctx.fillStyle = "#2a2d33";
    ctx.fillRect(1400, 436, 360, 1);
    // 右栏四项对应本人的工作，随旁白逐项落定；AI 这句没有单独的动画或强调。
    [tQuestion, tProtocol, tCriteria, tCheck].forEach((tk, i) => {
      const q = K.eo(K.prog(t, tk, tk + 0.3));
      ctx.fillStyle = K.mix("#2a2d33", C.text, q);
      ctx.fillRect(1400 + i * 92, 436, 84, 1);
    });
    ctx.fillStyle = K.rgba(C.text, K.prog(t, tMine, tMine + 0.3));
    ctx.fillRect(1400, 436, 360, 1);
  };

  return (t) => {
    upA(t < t83 + 0.31 ? t : -1);
    upB(t > t83 - 0.1 && t < t84 + 0.31 ? t : -1);
    upC(t > t84 - 0.1 && t < t87 + 0.31 ? t : -1);
    upD(t > t87 - 0.1 ? t : -1);
  };
});
