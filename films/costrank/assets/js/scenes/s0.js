// 开场（0–67.9 秒），逐句画面见 DESIGN.md「s0 开场」。分八层，按句子先后出场：
// A 五年两排：每年平均 IC 都为正，扣完成本的信息比率三年为负（第 1 句）
// B 名次对名次：IC 怎么算（第 2 句，示意）
// C 开发期逐日 IC 和每年均值，五年平均 0.086（第 3 句）
// D 逐日主动收益 1212 天，均值、波动、信息比率 0.41（第 4–5 句）
// E 1800 格合格池：10-19 收盘打分、合格池的条件、10-20 买进的 24 只都在前 34 名（第 6–8 句）
// F 研究设定四张牌，格子缩到右边（第 9 句）
// G 累计主动收益：零费用的灰虚线和扣成本的橙线，中间红粉是成本（第 10–11 句）
// H 冻结方案、大时间轴和五章路线（第 12 句）
K.scene("s0", (si, win) => {
  const C = K.C;
  const L = (n) => K.seg(n).t0 - 0.08;
  const at = (n, s, k = 1) => K.w(n, s, k) - 0.08;
  const MONO = P.mono;
  const SANS = P.sans;

  // ---- 时刻 ----
  const t1 = L(1);
  const tSort1 = at(1, "排序");
  const tYear1 = at(1, "年年");
  const tRight1 = at(1, "都对");
  const tCost1 = at(1, "扣掉");
  const tBuy1 = at(1, "买");
  const tFive1 = at(1, "五年");
  const tThree1 = at(1, "三年");
  const tLose1 = at(1, "跑输");
  const t2 = L(2);
  const tIC2 = at(2, "看ic");
  const tModel2 = at(2, "模型");
  const tRank2 = at(2, "名次");
  const tAfter2 = at(2, "之后");
  const tMove2 = at(2, "涨跌");
  const tRank2b = at(2, "名次", 2);
  const t3 = L(3);
  const tYears3 = at(3, "每年");
  const tAvg3 = at(3, "平均ic");
  const tPos3 = at(3, "大于零");
  const tFive3 = at(3, "五年平均");
  const t086 = at(3, "0.086");
  const t4 = L(4);
  const tPool4 = at(4, "能选");
  const tMore4 = at(4, "多挣");
  const tLess4 = at(4, "少挣");
  const tActive4 = at(4, "主动收益");
  const t5 = L(5);
  const tMean5 = at(5, "平均值");
  const tVol5 = at(5, "波动");
  const tAnn5 = at(5, "年化");
  const tIR5 = at(5, "信息比率");
  const tCost5 = at(5, "扣完成本");
  const t041 = at(5, "0.41");
  const t6 = L(6);
  const tClose6 = at(6, "收盘");
  const t1800 = at(6, "1800");
  const tScore6 = at(6, "打了分");
  const t7 = L(7);
  const tTrade7 = at(7, "当天能交易");
  const tAmt7 = at(7, "成交额");
  const tOnly7 = at(7, "只在");
  const tPool7 = at(7, "合格池");
  const t8 = L(8);
  const tOpen8 = at(8, "开盘");
  const tPaper8 = at(8, "模拟盘");
  const t24 = at(8, "24");
  const tAll8 = at(8, "全在");
  const t34 = at(8, "34");
  const t9 = L(9);
  const tA9 = at(9, "沪深全a");
  const tDaily9 = at(9, "日频");
  const tLong9 = at(9, "只做多");
  const tBao9 = at(9, "宝stock");
  const t10 = L(10);
  const tSort10 = at(10, "排序");
  const tNoCost10 = at(10, "不扣成本");
  const tCurve10 = at(10, "曲线");
  const t11 = L(11);
  const tCut11 = at(11, "扣掉");
  const tRule11 = at(11, "规矩");
  const tFill11 = at(11, "成交");
  const tLeft11 = at(11, "还剩");
  const t12 = L(12);
  const tData12 = at(12, "数据");
  const tAll12 = at(12, "一直");
  const tFreeze12 = at(12, "冻结");
  const tDay12 = at(12, "每一天");
  const tEnd = win.t1;

  // ---- HUD ----
  K.plans.push({
    t0: 0,
    t1: tEnd,
    chip: "00",
    chap: "开场",
    lab: "OPENING · 开场",
    tele: (t) =>
      t < t6
        ? "▸ DEV 2020–2024 · 1212 SESSIONS · IR VS 0.95 × POOL EW"
        : t < t10
          ? "▸ UNIVERSE 1800 · HOLD 24 · REBAL 5D · SLIP 10BPS"
          : "▸ LIGHTGBM · 10 FEATURES · COST-AWARE LP · 2016 → 2026-12-31",
    titles: [
      { t: t1, text: "排序年年对，扣完成本{三年跑输}" },
      { t: t2, text: "排序对不对，看 {IC}" },
      { t: t3, text: "每年的平均 IC {都大于零}" },
      { t: t4, text: "多挣或少挣的，叫{主动收益}" },
      { t: t5, text: "扣完成本，信息比率 {0.41}" },
      { t: t6, text: "10-19 收盘，{1800 只}打分" },
      { t: t7, text: "只在{合格池}里挑", color: C.amb[2] },
      { t: t8, text: "24 只，全在{前 34 名}" },
      { t: t9, text: "沪深全 A · 日频 · {只做多}" },
      { t: t10, text: "只看排序，或{不扣成本}的曲线" },
      { t: t11, text: "扣掉成本，{还剩多少}", color: C.red[2] },
      { t: t12, text: "从数据讲到{冻结以后}" },
    ],
  });
  K.plates.push({ t0: 0.3, t1: t6, text: "DEV 2020–2024 · FROZEN CONFIG" });
  K.plates.push({ t0: t6, t1: t9, text: "PAPER · 2026-10-19 CLOSE" });
  K.plates.push({ t0: t9, t1: tEnd, text: "ALL A-SHARES · DAILY · LONG ONLY" });
  K.shake(tLose1 + 0.15, 3, 0.25);

  // ================= A：五年两排（第 1 句）=================
  const pA = K.panel(si, 140, 236, 1640, 560, C.main[1], "DEV 2020–2024 · 冻结方案 · 逐年");
  const cvA = P.layer(si);
  const YRS = ["2020", "2021", "2022", "2023", "2024"];
  const AX = (i) => 720 + i * 236;
  const BASE1 = 470;
  const ZERO2 = 660;
  const ICS = 1600;
  const IRS = 60;
  const rA1 = P.tx(si, 180, 300, "排序 · 每年平均 IC", SANS(32, 800), P.DIM);
  const sA1 = P.tx(si, 180, 346, "RANK IC · 大于 0 = 方向对", P.MONO20, P.DIM);
  const costA = P.tx(si, 222, 448, "扣佣金、印花税、滑点", SANS(26, 700), C.red[2]);
  const rA2 = P.tx(si, 180, 580, "扣完成本 · 信息比率", SANS(32, 800), P.DIM);
  const sA2 = P.tx(si, 180, 626, "IR VS 0.95 × POOL EW", P.MONO20, P.DIM);
  const loseN = P.tx(si, 180, 676, "3 / 5", MONO(72), C.text);
  const loseL = P.tx(si, 410, 702, "年跑输", SANS(30, 700), C.text);
  const yrL = YRS.map((y, i) => P.ctr(si, AX(i), BASE1 + 10, y, P.MONO24, C.gray));
  const icV = YRS.map((y, i) => P.ctr(si, AX(i), 0, "", MONO(30, 700), C.main[2]));
  const irV = YRS.map((y, i) => P.ctr(si, AX(i), 0, "", MONO(30, 700), C.text));
  const upA = (t) => {
    const a = pA.up(t, t1, t2 - 0.1, 0.3);
    const lit1 = K.eo(K.prog(t, tSort1, tSort1 + 0.3));
    const aCost = a * K.prog(t, tCost1, tCost1 + 0.3);
    const lit2 = K.eo(K.prog(t, tBuy1, tBuy1 + 0.3));
    K.vis(rA1, a);
    K.col(rA1, K.mix(P.DIM, C.text, lit1));
    K.vis(sA1, a);
    K.col(sA1, K.mix(P.DIM, C.gray, lit1));
    K.vis(costA, aCost);
    K.vis(rA2, aCost);
    K.col(rA2, K.mix(P.DIM, C.text, lit2));
    K.vis(sA2, aCost);
    K.col(sA2, K.mix(P.DIM, C.gray, lit2));
    K.vis(loseN, a * K.prog(t, tThree1, tThree1 + 0.25));
    P.glow(loseN, t, tThree1, [C.text, C.text, "#ffffff"]);
    K.vis(loseL, a * K.prog(t, tLose1, tLose1 + 0.25));
    const gI = (i) => K.eo(K.prog(t, tYear1 + i * 0.1, tYear1 + i * 0.1 + 0.45));
    const gR = (i) => K.eo(K.prog(t, tFive1 + i * 0.1, tFive1 + i * 0.1 + 0.45));
    YRS.forEach((y, i) => {
      K.vis(yrL[i], a * K.prog(t, t1 + 0.2 + i * 0.08, t1 + 0.45 + i * 0.08));
      const vi = CR.icByYear[y];
      const g = gI(i);
      K.vis(icV[i], a * K.prog(t, tYear1 + i * 0.1, tYear1 + i * 0.1 + 0.2));
      K.put(icV[i], (vi * g).toFixed(3));
      K.at(icV[i], AX(i), BASE1 - vi * ICS * g - 42);
      const vr = CR.irByYear[y];
      const gr = gR(i);
      K.vis(irV[i], aCost * K.prog(t, tFive1 + i * 0.1, tFive1 + i * 0.1 + 0.2));
      K.put(irV[i], P.fs(vr * gr, 2));
      K.at(irV[i], AX(i), vr > 0 ? ZERO2 - vr * IRS * gr - 40 : ZERO2 - vr * IRS * gr + 8);
      K.col(irV[i], vr > 0 ? C.main[2] : t > tThree1 ? K.mix("#ffffff", C.text, K.prog(t, tThree1 + 0.3, tThree1 + 1)) : C.gray);
    });
    if (!cvA.begin(a)) return;
    const ctx = cvA.ctx;
    ctx.globalAlpha = a;
    ctx.fillStyle = "#3a3e46";
    ctx.fillRect(600, BASE1, 1160, 1);
    YRS.forEach((y, i) => {
      const x = AX(i) - 50;
      const h = CR.icByYear[y] * ICS * gI(i);
      if (h > 0.5) {
        ctx.fillStyle = C.main[1];
        ctx.fillRect(x, BASE1 - h, 100, h);
        ctx.fillStyle = C.main[2];
        ctx.fillRect(x, BASE1 - h, 100, 2);
      }
      P.check(ctx, AX(i), BASE1 - 30, 28, C.bg, K.prog(t, tRight1 + i * 0.08, tRight1 + i * 0.08 + 0.3), 3);
    });
    // 扣成本：红粉箭头从上一排落到下一排
    const pc = K.eo(K.prog(t, tCost1, tCost1 + 0.45));
    if (pc > 0) P.arrow(ctx, 198, 392, 198, 392 + 170 * pc, C.red[1], 9);
    if (aCost <= 0.002) return;
    ctx.globalAlpha = aCost;
    ctx.fillStyle = "#3a3e46";
    ctx.fillRect(600, ZERO2, 1160, 1);
    YRS.forEach((y, i) => {
      const x = AX(i) - 50;
      const v = CR.irByYear[y];
      const h = v * IRS * gR(i);
      if (v > 0 && h > 0.5) {
        ctx.fillStyle = C.main[1];
        ctx.fillRect(x, ZERO2 - h, 100, h);
        ctx.fillStyle = C.main[2];
        ctx.fillRect(x, ZERO2 - h, 100, 2);
      } else if (v < 0 && -h > 0.5) {
        const hp = P.pulse(t, tThree1 + i * 0.06, 0.12, 0.8);
        ctx.fillStyle = K.mix("#4a4f58", "#8a8f98", hp);
        ctx.fillRect(x, ZERO2, 100, -h);
        // 跑输的三年：虚线框
        const dp = K.prog(t, tThree1, tThree1 + 0.3);
        if (dp > 0) {
          ctx.globalAlpha = aCost * dp;
          P.dashRect(ctx, x - 8, ZERO2 - 8, 116, -h + 16, "#8a8f98", 4);
          ctx.globalAlpha = aCost;
        }
      }
    });
  };

  // ================= B：名次对名次（第 2 句，示意）=================
  const pB = K.panel(si, 140, 236, 1640, 560, P.GRAY[2], "RANK IC · 一天怎么算");
  const cvB = P.layer(si);
  const tagB = P.tag(si, 1756, 252, "ILLUSTRATIVE · 示意");
  // 模型名次第 i 的股票，之后 5 天涨跌排第 PERM[i]（编的，只为演示怎么算）
  const PERM = [3, 0, 6, 1, 7, 2, 5, 4];
  const LET = "ABCDEFGH";
  const BLX = 340;
  const BRX = 1200;
  const BW = 380;
  const BH = 38;
  const BY0 = 336;
  const BP = 46;
  const hB1 = P.tx(si, BLX, 286, "模型给的名次", SANS(30, 800), P.DIM);
  const hB2 = P.tx(si, BRX, 286, "之后 5 天涨跌的名次", SANS(30, 800), P.DIM);
  const rowB = [];
  for (let i = 0; i < 8; i++) {
    rowB.push({
      lr: P.tx(si, BLX + 16, BY0 + i * BP + 6, "#" + (i + 1), MONO(24, 700), C.gray),
      ln: P.tx(si, BLX + 90, BY0 + i * BP + 5, "股票 " + LET[i], SANS(24, 600), C.text),
    });
  }
  const rowR = [];
  for (let j = 0; j < 8; j++) {
    const i = PERM.indexOf(j);
    rowR.push({
      lr: P.tx(si, BRX + 16, BY0 + j * BP + 6, "#" + (j + 1), MONO(24, 700), C.gray),
      ln: P.tx(si, BRX + 90, BY0 + j * BP + 5, "股票 " + LET[i], SANS(24, 600), C.text),
    });
  }
  const fB = P.ctr(si, 960, 712, "IC = 两列名次的相关系数", SANS(34, 800), C.text);
  const fB2 = P.ctr(si, 960, 760, "SPEARMAN · 每天一个数 · −1 到 +1", P.MONO20, C.gray);
  const upB = (t) => {
    const a = pB.up(t, t2, t3 - 0.1, 0.3);
    K.vis(tagB, a);
    K.vis(hB1, a);
    K.col(hB1, P.lightCol(t, tModel2));
    K.vis(hB2, a * K.prog(t, tAfter2, tAfter2 + 0.3));
    K.col(hB2, P.lightCol(t, tAfter2 + 0.1));
    rowB.forEach((r, i) => {
      const p = a * K.prog(t, tModel2 + i * 0.07, tModel2 + i * 0.07 + 0.25);
      K.vis(r.lr, p);
      K.vis(r.ln, p);
      K.col(r.lr, t > tRank2 + i * 0.05 ? K.mix(C.gray, C.main[2], K.prog(t, tRank2 + i * 0.05, tRank2 + i * 0.05 + 0.3)) : C.gray);
    });
    rowR.forEach((r, j) => {
      const p = a * K.prog(t, tAfter2 + 0.2 + j * 0.07, tAfter2 + 0.45 + j * 0.07);
      K.vis(r.lr, p);
      K.vis(r.ln, p);
      K.col(r.lr, t > tMove2 + j * 0.05 ? K.mix(C.gray, C.text, K.prog(t, tMove2 + j * 0.05, tMove2 + j * 0.05 + 0.3)) : C.gray);
    });
    K.vis(fB, a * K.prog(t, tRank2b, tRank2b + 0.3));
    K.vis(fB2, a * K.prog(t, tRank2b + 0.2, tRank2b + 0.5));
    if (!cvB.begin(a)) return;
    const ctx = cvB.ctx;
    for (let i = 0; i < 8; i++) {
      const pl = K.prog(t, tModel2 + i * 0.07, tModel2 + i * 0.07 + 0.25);
      if (pl > 0) {
        ctx.globalAlpha = a * pl;
        K.rr(ctx, BLX + 0.5, BY0 + i * BP + 0.5, BW - 1, BH - 1, 8);
        ctx.fillStyle = "#11141a";
        ctx.fill();
        ctx.strokeStyle = K.mix("#2a2d33", C.main[1], K.prog(t, tRank2 + i * 0.05, tRank2 + i * 0.05 + 0.3) * 0.8);
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      const pr = K.prog(t, tAfter2 + 0.2 + i * 0.07, tAfter2 + 0.45 + i * 0.07);
      if (pr > 0) {
        ctx.globalAlpha = a * pr;
        K.rr(ctx, BRX + 0.5, BY0 + i * BP + 0.5, BW - 1, BH - 1, 8);
        ctx.fillStyle = "#11141a";
        ctx.fill();
        ctx.strokeStyle = "#3a3e46";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
    // 同一只股票连线：念到“涨跌”时一根根连上
    for (let i = 0; i < 8; i++) {
      const p = K.eio(K.prog(t, tMove2 + i * 0.06, tMove2 + i * 0.06 + 0.4));
      if (p <= 0) continue;
      const x0 = BLX + BW + 6;
      const y0 = BY0 + i * BP + BH / 2;
      const x1 = BRX - 6;
      const y1 = BY0 + PERM[i] * BP + BH / 2;
      ctx.globalAlpha = a;
      ctx.strokeStyle = K.rgba(C.text, 0.55);
      ctx.lineWidth = 1;
      ctx.beginPath();
      const N = 30;
      for (let k = 0; k <= N * p; k++) {
        const u = k / N;
        const s = u * u * (3 - 2 * u);
        const xx = x0 + (x1 - x0) * u;
        const yy = y0 + (y1 - y0) * s;
        if (k === 0) ctx.moveTo(xx, yy);
        else ctx.lineTo(xx, yy);
      }
      ctx.stroke();
      ctx.fillStyle = C.text;
      ctx.beginPath();
      ctx.arc(x0, y0, 3, 0, 6.283);
      ctx.fill();
      if (p >= 1) {
        ctx.beginPath();
        ctx.arc(x1, y1, 3, 0, 6.283);
        ctx.fill();
      }
    }
  };

  // ================= C：逐日 IC（第 3 句）=================
  const IC = CR.ic.dev;
  const pC = K.panel(si, 140, 236, 1640, 560, C.main[1], "DAILY RANK IC · 2020–2024 · 1,206 个有标签的交易日");
  const cvC = P.layer(si);
  const CX = 200;
  const CW = 1520;
  const CZ = 520;
  const CS = 300;
  // 每年在 1212 天里的起止
  const yrSpan = YRS.map((y) => {
    const idx = IC.dates.map((d, i) => (("20" + d.slice(0, 2)) === y ? i : -1)).filter((i) => i >= 0);
    return [idx[0], idx[idx.length - 1]];
  });
  const cxOf = (i) => CX + (i / IC.raw.length) * CW;
  const yrMean = YRS.map((y) => CR.icByYear[y]);
  const yC = YRS.map((y, k) => P.ctr(si, (cxOf(yrSpan[k][0]) + cxOf(yrSpan[k][1])) / 2, 292, y, P.MONO20, C.gray));
  const vC = YRS.map((y, k) => P.ctr(si, (cxOf(yrSpan[k][0]) + cxOf(yrSpan[k][1])) / 2, 318, "均值 " + yrMean[k].toFixed(3), MONO(24, 700), C.main[2]));
  const zC = P.txr(si, CX - 10, CZ - 12, "0", P.MONO20, C.gray);
  const bigLC = P.tx(si, 1060, 712, "五年平均 IC", SANS(32, 800), C.text);
  const bigC = P.txr(si, 1740, 680, "0.086", MONO(96), C.main[1]);
  const noteC = P.tx(si, 200, 700, "每根竖线是一天的 IC · 橙 = 大于 0", P.MONO20, C.gray);
  const upC = (t) => {
    const a = pC.up(t, t3, t4 - 0.1, 0.3);
    const sw = K.eio(K.prog(t, t3 + 0.05, tYears3 - 0.1));
    YRS.forEach((y, k) => {
      K.vis(yC[k], a * K.prog(t, t3 + 0.1 + k * 0.25, t3 + 0.35 + k * 0.25));
      K.vis(vC[k], a * K.prog(t, tAvg3 + k * 0.1, tAvg3 + k * 0.1 + 0.25));
    });
    K.vis(zC, a);
    K.vis(noteC, a * K.prog(t, t3 + 0.6, t3 + 0.9));
    K.vis(bigLC, a * K.prog(t, tFive3, tFive3 + 0.3));
    K.vis(bigC, a * K.prog(t, t086 - 0.1, t086 + 0.15));
    K.put(bigC, t < t086 ? "0.···" : "0.086");
    P.glow(bigC, t, t086, C.main);
    if (!cvC.begin(a)) return;
    const ctx = cvC.ctx;
    ctx.globalAlpha = a;
    // 年界
    YRS.forEach((y, k) => {
      if (!k) return;
      const x = Math.round(cxOf(yrSpan[k][0]) - 2);
      ctx.fillStyle = "#2a2d33";
      for (let yy = 300; yy < 680; yy += 8) ctx.fillRect(x, yy, 1, 4);
    });
    P.drawStrip(ctx, IC.raw, {
      x: CX,
      y0: CZ,
      w: CW,
      scale: CS,
      p: sw,
      fill: 1,
      col: (v) => (v > 0 ? K.rgba(C.main[1], 0.5) : "#3a3e46"),
    });
    ctx.fillStyle = "#8a8f98";
    ctx.fillRect(CX, CZ, CW, 1);
    // 每年均值：一根橙色横线，念到“每年”时一年一年亮
    YRS.forEach((y, k) => {
      const p = K.eo(K.prog(t, tYears3 + k * 0.12, tYears3 + k * 0.12 + 0.35));
      if (p <= 0) return;
      const x0 = cxOf(yrSpan[k][0]);
      const x1 = cxOf(yrSpan[k][1]);
      const yy = CZ - yrMean[k] * CS * p;
      ctx.save();
      ctx.shadowColor = C.main[2];
      ctx.shadowBlur = 8;
      ctx.fillStyle = C.main[2];
      ctx.fillRect(x0 + 4, Math.round(yy) - 1, x1 - x0 - 8, 3);
      ctx.restore();
      // 大于零：均值线下面一个对勾
      P.check(ctx, (x0 + x1) / 2, yy + 22, 22, C.main[2], K.prog(t, tPos3 + k * 0.08, tPos3 + k * 0.08 + 0.3), 2.5);
    });
  };

  // ================= D：逐日主动收益和信息比率（第 4–5 句）=================
  const SD = CR.series.dev;
  const pD = K.panel(si, 140, 236, 1640, 560, C.main[1], "DAILY ACTIVE RETURN · 2020–2024 · 1,212 个交易日");
  const cvD = P.layer(si);
  const DZ = 500;
  const DS = 3000;
  const mD = P.mean(SD.active);
  const sdD = P.sd(SD.active);
  const fD = K.at(K.el("div", "rline", si), 180, 280);
  fD.style.font = '700 30px/40px "HF Sans", sans-serif';
  fD.setAttribute("data-layout-allow-occlusion", "");
  const fD1 = K.el("span", "", fD, "主动收益");
  K.el("span", "", fD, " = 组合收益 − ");
  const fD2 = K.el("span", "", fD, "0.95 × 前一日合格池等权");
  const meanD = P.tx(si, 1000, 284, "均值 +" + (mD * 100).toFixed(3) + "% / 天", MONO(24, 700), C.main[2]);
  const sdD_ = P.tx(si, 1340, 284, "波动 " + (sdD * 100).toFixed(2) + "% / 天", MONO(24, 700), C.text);
  const fIR = K.at(K.el("div", "rline", si), 180, 664);
  fIR.style.font = '800 36px/48px "HF Sans", sans-serif';
  fIR.setAttribute("data-layout-allow-occlusion", "");
  const fI1 = K.el("span", "", fIR, "信息比率");
  const fI2 = K.el("span", "", fIR, " = 均值 ÷ 波动");
  const fI3 = K.el("span", "", fIR, " × √252");
  const costD = P.tag(si, 1180, 740, "已扣成本 · 10 BPS", C.red[2]);
  const bigD = P.txr(si, 1740, 650, "", MONO(120), C.main[1]);
  const upD = (t) => {
    const a = pD.up(t, t4, t6 - 0.1, 0.3);
    K.vis(fD, a);
    K.col(fD, C.text);
    K.col(fD1, K.mix(C.text, C.main[2], K.prog(t, tActive4, tActive4 + 0.3)));
    K.col(fD2, K.mix(C.text, C.amb[2], K.prog(t, tPool4, tPool4 + 0.3)));
    K.vis(meanD, a * K.prog(t, tMean5, tMean5 + 0.3));
    K.vis(sdD_, a * K.prog(t, tVol5, tVol5 + 0.3));
    K.vis(fIR, a * K.prog(t, t5 + 0.6, t5 + 0.9));
    K.col(fI1, P.lightCol(t, tIR5, C.main[2], P.DIM));
    K.col(fI2, P.lightCol(t, tVol5, C.text, P.DIM));
    K.col(fI3, P.lightCol(t, tAnn5, C.text, P.DIM));
    K.vis(costD, a * K.prog(t, tCost5, tCost5 + 0.3));
    K.vis(bigD, a * K.prog(t, tIR5, tIR5 + 0.3));
    if (t < t041) {
      K.put(bigD, "0.··");
      K.col(bigD, K.mixHex(C.main[0], C.main[1], 0.6));
      bigD.style.textShadow = "none";
      bigD._ts = "none";
    } else {
      K.put(bigD, CR.ir.dev.toFixed(2));
      P.glow(bigD, t, t041, C.main);
    }
    if (!cvD.begin(a)) return;
    const ctx = cvD.ctx;
    ctx.globalAlpha = a;
    const sw = K.eio(K.prog(t, tMore4 - 0.2, tActive4));
    const lp = K.prog(t, tMore4, tMore4 + 0.3);
    const ln = K.prog(t, tLess4, tLess4 + 0.3);
    P.drawStrip(ctx, SD.active, {
      x: 200,
      y0: DZ,
      w: 1520,
      scale: DS,
      p: sw,
      fill: 1,
      col: (v) => (v > 0 ? K.mix("#3a3e46", C.main[1], 0.35 + 0.5 * lp) : K.mix("#2a2d33", "#6b707a", 0.3 + 0.7 * ln)),
    });
    ctx.fillStyle = "#8a8f98";
    ctx.fillRect(200, DZ, 1520, 1);
    // 波动：均值上下各一个标准差的灰带
    const pv = K.eo(K.prog(t, tVol5, tVol5 + 0.4));
    if (pv > 0) {
      ctx.fillStyle = K.rgba(C.text, 0.07 * pv);
      ctx.fillRect(200, DZ - mD * DS - sdD * DS * pv, 1520, 2 * sdD * DS * pv);
      ctx.fillStyle = K.rgba(C.text, 0.5 * pv);
      ctx.fillRect(200, Math.round(DZ - mD * DS - sdD * DS * pv), 1520, 1);
      ctx.fillRect(200, Math.round(DZ - mD * DS + sdD * DS * pv), 1520, 1);
    }
    // 均值：一根橙线扫过去
    const pm = K.eio(K.prog(t, tMean5, tMean5 + 0.6));
    if (pm > 0) {
      ctx.save();
      ctx.fillStyle = C.main[2];
      ctx.shadowColor = C.main[2];
      ctx.shadowBlur = 8;
      ctx.fillRect(200, Math.round(DZ - mD * DS) - 1, 1520 * pm, 2);
      ctx.restore();
    }
  };

  // ================= E：1800 格合格池（第 6–8 句）=================
  const GE = { x: 140, y: 240, cell: 16, gap: 4 };
  const GF = { x: 1180, y: 300, cell: 8, gap: 2 };
  const cvE = P.layer(si);
  const eL1 = P.tx(si, 1400, 244, "10-19 CLOSE · 收盘打分", P.MONO20, C.gray);
  const eBig = P.tx(si, 1394, 272, "", MONO(96), C.text);
  const eSub = P.tx(si, 1400, 380, "只股票 · 按分数排，左上最高", SANS(24, 600), C.gray);
  const CRIT = [
    ["当天能交易 · 非 ST", tTrade7],
    ["上市满 180 天", tTrade7 + 0.3],
    ["日均成交额 ≥ 1000 万", tAmt7],
    ["成交额前 1800 只", tAmt7 + 0.35],
  ];
  const eCrit = CRIT.map(([s], i) => P.tx(si, 1440, 440 + i * 44, s, SANS(24, 600), P.DIM));
  const ePool = P.tx(si, 140, 852, "ELIGIBLE POOL · 合格池 · 1,800 只", P.MONO20, C.amb[1]);
  const eL2 = P.tx(si, 1400, 636, "10-20 OPEN · 模拟盘买进", P.MONO20, C.gray);
  const e24 = P.tx(si, 1394, 664, "", MONO(96), C.main[1]);
  const e24u = P.tx(si, 1520, 718, "只", SANS(36, 700), C.main[2]);
  const e34 = P.tx(si, 1400, 776, "全在分数前 34 名", SANS(28, 700), C.text);
  const eTop = P.tx(si, 140, 206, "TOP 34 · 前 34 名", P.MONO20, C.main[2]);
  const eHold = P.tx(si, 1180, 612, "10-19 打分 · 24 只持仓", P.MONO20, C.gray);
  // 24 格变橙的时刻：按名次先后，0.6 秒铺完
  const heldOrder = CR.grid.held;
  const heldT = (i) => K.eo(K.prog(t_cur, t24 + heldOrder.indexOf(i) * 0.025, t24 + heldOrder.indexOf(i) * 0.025 + 0.3));
  let t_cur = 0;
  const upE = (t) => {
    t_cur = t;
    const a = P.win(t, t6, t10 - 0.1, 0.35, 0.3);
    const rcol = 1 - K.prog(t, t9 - 0.05, t9 + 0.25);
    K.vis(eL1, a * rcol * K.prog(t, tClose6, tClose6 + 0.3));
    K.vis(eBig, a * rcol * K.prog(t, t1800 - 0.1, t1800 + 0.1));
    K.put(eBig, K.roll(t, t1800, 0.8, 0, 1800));
    P.glow(eBig, t, t1800 + 0.8, [C.text, C.text, "#ffffff"]);
    K.vis(eSub, a * rcol * K.prog(t, tScore6, tScore6 + 0.3));
    CRIT.forEach(([s, tc], i) => {
      K.vis(eCrit[i], a * rcol * K.prog(t, t7 + 0.1 + i * 0.06, t7 + 0.3 + i * 0.06));
      K.col(eCrit[i], P.lightCol(t, tc, C.text));
    });
    const mv = K.eio(K.prog(t, t9 - 0.05, t9 + 0.55));
    const g = {
      x: K.lerp(GE.x, GF.x, mv),
      y: K.lerp(GE.y, GF.y, mv),
      cell: K.lerp(GE.cell, GF.cell, mv),
      gap: K.lerp(GE.gap, GF.gap, mv),
    };
    const gw = 60 * (g.cell + g.gap) - g.gap;
    const gh = 30 * (g.cell + g.gap) - g.gap;
    K.vis(ePool, a * rcol * K.prog(t, tPool7, tPool7 + 0.3));
    K.vis(eL2, a * rcol * K.prog(t, tOpen8, tOpen8 + 0.3));
    K.vis(e24, a * rcol * K.prog(t, t24 - 0.1, t24 + 0.1));
    K.put(e24, K.roll(t, t24, 0.6, 0, 24));
    P.glow(e24, t, t24 + 0.6, C.main);
    K.vis(e24u, a * rcol * K.prog(t, t24 + 0.2, t24 + 0.4));
    K.vis(e34, a * rcol * K.prog(t, tAll8, tAll8 + 0.3));
    K.col(e34, P.lightCol(t, t34, C.text, C.gray));
    K.vis(eTop, a * rcol * K.prog(t, t34, t34 + 0.3));
    K.vis(eHold, a * K.prog(t, t9 + 0.5, t9 + 0.8));
    if (!cvE.begin(a)) return;
    const ctx = cvE.ctx;
    ctx.globalAlpha = a;
    P.drawPool(ctx, {
      ...g,
      fill: K.eio(K.prog(t, t1800, tScore6 + 0.3)),
      heldT: (i) => (t < t24 ? 0 : heldT(i)),
      dim: K.prog(t, tAll8, tAll8 + 0.4) * 0.6,
    });
    // 合格池：冰蓝框，念到“只在里面挑”时描一圈，念到“合格池”时亮一下
    const pf = K.eo(K.prog(t, tOnly7, tOnly7 + 0.6));
    if (pf > 0) {
      const pu = P.pulse(t, tPool7, 0.12, 0.9);
      ctx.save();
      ctx.strokeStyle = K.mix(C.amb[1], C.amb[2], pu);
      ctx.shadowColor = C.amb[2];
      ctx.shadowBlur = 10 * pu;
      ctx.lineWidth = 1;
      const x0 = g.x - 7.5;
      const y0 = g.y - 7.5;
      const W = gw + 15;
      const H = gh + 15;
      ctx.beginPath();
      P.poly(ctx, [[x0, y0], [x0 + W, y0], [x0 + W, y0 + H], [x0, y0 + H], [x0, y0]], pf);
      ctx.restore();
    }
    // 合格池的四条：小对勾
    CRIT.forEach(([s, tc], i) => {
      const p = K.prog(t, tc, tc + 0.3);
      if (p > 0 && rcol > 0) {
        ctx.globalAlpha = a * rcol;
        P.check(ctx, 1414, 455 + i * 44, 20, C.amb[1], p, 2);
        ctx.globalAlpha = a;
      }
    });
    // 前 34 名：一圈暖白细框
    const pt = K.eo(K.prog(t, t34, t34 + 0.4)) * rcol;
    if (pt > 0) {
      ctx.globalAlpha = a * pt;
      ctx.strokeStyle = C.main[2];
      ctx.lineWidth = 1;
      ctx.strokeRect(g.x - 3.5, g.y - 3.5, 34 * (g.cell + g.gap) - g.gap + 7, g.cell + 7);
      ctx.globalAlpha = a;
    }
  };

  // ================= F：研究设定（第 9 句）=================
  const TILES = [
    ["沪深全 A", "ALL A-SHARES · 5,317 只", tA9],
    ["日频", "DAILY · 2016–2024 · 2,187 天", tDaily9],
    ["只做多", "LONG ONLY · 不做空", tLong9],
    ["BaoStock", "免费公开数据", tBao9],
  ];
  const tilesF = TILES.map(([a, b], i) => P.tile(si, 140 + (i % 2) * 500, 290 + Math.floor(i / 2) * 230, 470, 200, a, b, 52));
  const fNote = P.tx(si, 140, 780, "退市的股票也在样本里 · 收盘决策，第二天开盘成交", SANS(26, 600), C.gray);
  const upF = (t) => {
    const a = P.win(t, t9, t10 - 0.1, 0.35, 0.3);
    tilesF.forEach((tl, i) => tl.up(t, a * K.prog(t, t9 + 0.15 + i * 0.08, t9 + 0.4 + i * 0.08), TILES[i][2], i === 2 ? C.main : [C.text, "#8a8f98", C.text]));
    K.vis(fNote, a * K.prog(t, tBao9 + 0.3, tBao9 + 0.6));
  };

  // ================= G：累计主动收益，零费用对扣成本（第 10–11 句）=================
  const pG = K.panel(si, 140, 236, 1640, 560, C.main[1], "CUMULATIVE ACTIVE · 2020–2024 · 逐日相加 · VS 0.95 × POOL EW");
  const cvG = P.layer(si);
  const zc = P.cum(CR.zero.active);
  const nc = P.cum(SD.active);
  const GG = { x: 260, w: 1260, y0: 610, scale: 520 };
  const gTags = [
    P.tag(si, 180, 286, "只看排序准不准 · IC 0.086", C.gray, true),
    P.tag(si, 520, 286, "不扣成本的曲线", C.gray, true),
  ];
  const RULES = ["佣金", "印花税", "滑点", "T+1", "涨跌停", "停牌", "整手"];
  const gRules = RULES.map((s, i) => {
    const e = P.tag(si, 1060 + i * 102, 286, s, i < 3 ? C.red[2] : C.text, true);
    return e;
  });
  const gAx = [0, 0.2, 0.4].map((v) => P.txr(si, GG.x - 12, GG.y0 - v * GG.scale - 12, v ? "+" + v * 100 + "%" : "0", P.MONO20, P.DIM));
  const gYr = YRS.map((y, k) => P.ctr(si, GG.x + ((k + 0.5) / 5) * GG.w, GG.y0 + 132, y, P.MONO20, P.DIM));
  const gZ = P.tx(si, GG.x + GG.w + 20, 0, "零费用 · IR 0.64", MONO(24, 700), C.gray);
  const gN = P.tx(si, GG.x + GG.w + 20, 0, "扣成本 · IR 0.41", MONO(24, 700), C.main[2]);
  const gC = P.tx(si, GG.x + GG.w + 20, 0, "成本", SANS(26, 700), C.red[2]);
  const gQ = P.tx(si, GG.x + GG.w + 20, 0, "还剩多少？", SANS(28, 800), C.text);
  const upG = (t) => {
    const a = pG.up(t, t10, t12 - 0.1, 0.3);
    K.vis(gTags[0], a * K.prog(t, tSort10, tSort10 + 0.3));
    K.vis(gTags[1], a * K.prog(t, tNoCost10, tNoCost10 + 0.3));
    gRules.forEach((e, i) => {
      const tc = i < 3 ? tCut11 + i * 0.12 : tRule11 + (i - 3) * 0.12;
      K.vis(e, a * K.prog(t, tc, tc + 0.25));
    });
    for (const e of gAx) K.vis(e, a);
    for (const e of gYr) K.vis(e, a);
    const pz = K.eio(K.prog(t, tCurve10 - 0.3, tCurve10 + 0.6));
    const pn = K.eio(K.prog(t, tCut11, tFill11 + 0.3));
    const ez = GG.y0 - zc[zc.length - 1] * GG.scale;
    const en = GG.y0 - nc[nc.length - 1] * GG.scale;
    K.at(gZ, GG.x + GG.w + 20, ez - 16);
    K.at(gN, GG.x + GG.w + 20, en - 16);
    K.at(gC, GG.x + GG.w + 20, (ez + en) / 2 - 18);
    K.at(gQ, GG.x + GG.w + 20, en + 26);
    K.vis(gZ, a * K.prog(t, tCurve10 + 0.5, tCurve10 + 0.8));
    K.vis(gN, a * K.prog(t, tFill11 + 0.3, tFill11 + 0.6));
    K.vis(gC, a * K.prog(t, tFill11 + 0.4, tFill11 + 0.7));
    K.vis(gQ, a * K.prog(t, tLeft11, tLeft11 + 0.3));
    if (!cvG.begin(a)) return;
    const ctx = cvG.ctx;
    ctx.globalAlpha = a;
    // 只看排序：缩略的逐日 IC 条（开发期 1212 天，开场第 3 句那条）
    const pm = K.eio(K.prog(t, tSort10 - 0.1, tSort10 + 0.5));
    if (pm > 0) {
      ctx.strokeStyle = "#3a3e46";
      ctx.lineWidth = 1;
      ctx.strokeRect(180.5, 322.5, 300, 64);
      P.drawStrip(ctx, CR.ic.dev.raw, {
        x: 184,
        y0: 356,
        w: 292,
        scale: 48,
        p: pm,
        fill: 1,
        col: (v) => (v > 0 ? K.rgba(C.main[1], 0.75) : "#4a4f58"),
      });
    }
    ctx.fillStyle = "#2a2d33";
    for (const v of [0.2, 0.4]) ctx.fillRect(GG.x, Math.round(GG.y0 - v * GG.scale), GG.w, 1);
    ctx.fillStyle = "#8a8f98";
    ctx.fillRect(GG.x, GG.y0, GG.w, 1);
    for (let k = 0; k <= 5; k++) ctx.fillRect(Math.round(GG.x + (k / 5) * GG.w), GG.y0, 1, 6);
    if (pn > 0) P.fillBetween(ctx, zc, nc, { ...GG, p: pn }, K.rgba(C.red[1], 0.3));
    if (pz > 0) P.drawCurve(ctx, zc, { ...GG, p: pz, color: "#a0a5ae", lw: 1.5, dash: [7, 5] });
    if (pn > 0) {
      ctx.save();
      ctx.shadowColor = C.main[2];
      ctx.shadowBlur = 6;
      const [ex, ey] = P.drawCurve(ctx, nc, { ...GG, p: pn, color: C.main[1], lw: 2.5 });
      ctx.restore();
      if (pn < 1) {
        ctx.fillStyle = C.main[2];
        ctx.beginPath();
        ctx.arc(ex, ey, 4, 0, 6.283);
        ctx.fill();
      }
    }
  };

  // ================= H：冻结方案、大时间轴和五章路线（第 12 句）=================
  const pH = K.panel(si, 140, 252, 1640, 176, C.main[1], "FROZEN CONFIG · 冻结方案");
  const hL1 = P.tx(pH.el, 26, 56, "LightGBM + 10 个量价特征 + 成本约束的线性规划", SANS(40, 800), C.text);
  const hL2 = P.tx(pH.el, 26, 116, "每 5 个交易日换仓 · 滑点 10 BPS · 初始 100 万元 · 跟着它走完全片", P.MONO20, C.gray);
  const TLH = P.timeline(si, 240, 596, 1440, true);
  const CH = ["01 先把账记对", "02 先写规则，再看结果", "03 只开一次的 2025", "04 超额从哪来", "05 冻结之后"];
  const chH = CH.map((s, i) => P.tile(si, 140 + i * 334, 700, 304, 70, s, null, 24));
  const upH = (t) => {
    const a = P.win(t, t12, tEnd - 0.3, 0.35, 0.3);
    pH.up(t, t12, tEnd - 0.3, 0.3);
    const sw = K.prog(t, tData12, tDay12 + 0.3);
    const segT = { warm: tData12, dev: tData12 + 0.25, hold: tAll12 + 0.1, supp: tAll12 + 0.4, paper: tFreeze12 + 0.2 };
    const lit = {};
    for (const k in segT) lit[k] = K.eo(K.prog(t, segT[k], segT[k] + 0.3));
    TLH.up(t, a, {
      lit,
      lock: K.prog(t, tAll12, tAll12 + 0.3),
      folds: K.prog(t, tData12 + 0.3, tData12 + 0.6),
      days: K.lerp(0, P.PAPER_DONE, K.prog(t, tDay12, tDay12 + 0.6)),
      sweep: sw,
    });
    chH.forEach((c, i) => c.up(t, a * K.prog(t, t12 + 0.2 + i * 0.06, t12 + 0.45 + i * 0.06), tData12 + i * ((tDay12 - tData12) / 4), C.main));
  };

  return (t) => {
    if (t < t2 + 0.3) upA(t);
    else upA(1e9);
    if (t > t2 - 0.2 && t < t3 + 0.4) upB(t);
    else upB(-1);
    if (t > t3 - 0.2 && t < t4 + 0.4) upC(t);
    else upC(-1);
    if (t > t4 - 0.2 && t < t6 + 0.4) upD(t);
    else upD(-1);
    if (t > t6 - 0.2 && t < t10 + 0.4) upE(t);
    else upE(-1);
    if (t > t9 - 0.2 && t < t10 + 0.4) upF(t);
    else upF(-1);
    if (t > t10 - 0.2 && t < t12 + 0.4) upG(t);
    else upG(-1);
    upH(t);
  };
});
