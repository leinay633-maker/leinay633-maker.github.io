// 第 1 章 · 先把账记对（74.4–156.0 秒），逐句画面见 DESIGN.md「s1」。分八层，按句子先后出场：
// A 时点：T 日收盘决定、T+1 开盘成交，标签是 T+1 开盘到 T+6 开盘（第 13 句）
// B 滚动 10 折：每折训练 756 天、验证 126 天、测试 126 天（第 14 句，CR.folds）
// C 退市的 245 只：主板 202、创业板 40、科创板 3，留在样本里；幸存者偏差的比喻（第 15–16 句）
// D 估值闸门：30 个公司年里 3 个在年报公告前跳变，15 个估值因子整组不用，规则写在前面（第 17–19 句）
// E1 账本：10-20 模拟盘的真实逐笔（名次、股数）和六条规矩（第 20–21 句）
// E2 四样成本和独立重算（第 22–23 句）
// F 日均换手 6% 和费用 3 个点对主动收益 5.8%（第 24–25 句）
// G 全片论点和后面四章（第 26–27 句）
// HUD 底部常驻时间轴：本章亮 2016–2024 的数据段，第 27 句一路亮到模拟盘
K.scene("s1", (si, win) => {
  const C = K.C;
  const L = (n) => K.seg(n).t0 - 0.08;
  const at = (n, s, k = 1) => K.w(n, s, k) - 0.08;
  const MONO = P.mono;
  const SANS = P.sans;

  // ---- 时刻 ----
  const t13 = win.t0 + 0.02;
  const tTime13 = at(13, "时间");
  const tClose13 = at(13, "收盘");
  const tDecide13 = at(13, "决定");
  const tNext13 = at(13, "第二");
  const tOpen13 = at(13, "开盘");
  const tFill13 = at(13, "成交");
  const t14 = L(14);
  const tCut14 = at(14, "切成");
  const t10_14 = at(14, "10段");
  const tPrev14 = at(14, "之前");
  const tTrain14 = at(14, "训练");
  const t15 = L(15);
  const tDel15 = at(15, "退市");
  const t245 = at(15, "245");
  const tKeep15 = at(15, "留在");
  const t16 = L(16);
  const tAlive16 = at(16, "活到今天");
  const tTest16 = at(16, "回测");
  const tAsk16 = at(16, "采访");
  const tWin16 = at(16, "中了奖");
  const t17 = L(17);
  const tCheck17 = at(17, "抽查");
  const t30 = at(17, "30个");
  const t3 = at(17, "3个");
  const tReport17 = at(17, "年报");
  const tJump17 = at(17, "跳了");
  const t18 = L(18);
  const tVendor18 = at(18, "数据商");
  const tRule18 = at(18, "规则");
  const t15f = at(18, "15个");
  const tDrop18 = at(18, "整组");
  const t19 = L(19);
  const tFront19 = at(19, "前面");
  const tBad19 = at(19, "结果");
  const tDo19 = at(19, "照着办");
  const t20 = L(20);
  const tOne20 = at(20, "一笔");
  const tQty20 = at(20, "买入数量");
  const tBoard20 = at(20, "板块");
  const tToday20 = at(20, "当天买");
  const tNext20 = at(20, "下个交易日");
  const t21 = L(21);
  const tLimit21 = at(21, "涨跌停");
  const tHalt21 = at(21, "停牌");
  const tDelist21 = at(21, "退市");
  const tEx21 = at(21, "除权");
  const tRef21 = at(21, "参考价");
  const t22 = L(22);
  const tComm22 = at(22, "佣金");
  const tMin22 = at(22, "最低");
  const tTrans22 = at(22, "过户费");
  const tStamp22 = at(22, "印花税");
  const tSlip22 = at(22, "10个基点");
  const t23 = L(23);
  const tOther23 = at(23, "另一份");
  const tCash23 = at(23, "现金");
  const tNav23 = at(23, "净值");
  const tAgain23 = at(23, "从头");
  const t24 = L(24);
  const tTrade24 = at(24, "买进卖出");
  const tNav24 = at(24, "净值");
  const t6 = at(24, "6%");
  const t25 = L(25);
  const tFee25 = at(25, "费用");
  const t3pt = at(25, "3个点");
  const t58 = at(25, "5.8%");
  const tScale25 = at(25, "量级");
  const tActive25 = at(25, "主动收益");
  const t26 = L(26);
  const tCut26 = at(26, "扣完成本");
  const tSee26 = at(26, "看得见");
  const tStyle26 = at(26, "风格");
  const t27 = L(27);
  const tWhy27 = at(27, "怎么来的");
  const tTrust27 = at(27, "信它");
  const tEnd = win.t1;

  // ---- HUD ----
  K.plans.push({
    t0: win.t0,
    t1: tEnd,
    chip: "01",
    chap: "先把账记对",
    lab: "THE LEDGER · 先把账记对",
    tele: (t) =>
      t < t20
        ? "▸ T CLOSE → T+1 OPEN · LABEL 5D · 10 FOLDS · DELISTED 245"
        : t < t24
          ? "▸ COMMISSION 3BPS MIN ¥5 · TRANSFER · STAMP ON SELL · SLIP 10BPS"
          : "▸ TURNOVER 6.0%/DAY · COST DRAG 3.0%/YR · ACTIVE 5.8%/YR",
    titles: [
      { t: t13, text: "收盘决定，{第二天开盘}成交" },
      { t: t14, text: "滚动切成 {10 段}" },
      { t: t15, text: "退市的 {245 只}，留在样本里" },
      { t: t16, text: "只看活下来的，就是{幸存者偏差}" },
      { t: t17, text: "30 个公司年，{3 个}提前跳了", color: C.red[2] },
      { t: t18, text: "{15 个}估值因子整组不用", color: C.red[2] },
      { t: t19, text: "规则{写在前面}" },
      { t: t20, text: "账本{一笔一笔}记" },
      { t: t21, text: "涨跌停、停牌、退市、{除权}" },
      { t: t22, text: "四样{成本}", color: C.red[2] },
      { t: t23, text: "另一份脚本{从头再算}" },
      { t: t24, text: "每天换手约 {6%}" },
      { t: t25, text: "费用 {3 个点}，对主动收益 5.8%", color: C.red[2] },
      { t: t26, text: "扣完成本，{没找到}可靠的超额" },
      { t: t27, text: "这句话{怎么来的}" },
    ],
  });
  K.plates.push({ t0: win.t0 + 0.2, t1: t20, text: "DATA · 2016–2024 · 5,317 STOCKS" });
  K.plates.push({ t0: t20, t1: t24, text: "LEDGER · LOT · T+1 · LIMITS · FEES" });
  K.plates.push({ t0: t24, t1: tEnd, text: "FROZEN CONFIG · DEV 2020–2024" });
  const segLit = [
    ["hold", tWhy27 - 0.6],
    ["supp", tWhy27 - 0.1],
    ["paper", tTrust27 - 0.3],
  ];
  P.dock.push({
    t0: win.t0,
    t1: tEnd,
    st: (t) => {
      const lit = { warm: t < t24 ? 1 : 0.35, dev: 1 };
      for (const [k, tk] of segLit) lit[k] = K.eo(K.prog(t, tk, tk + 0.3));
      return { lit, folds: K.prog(t, tCut14, tCut14 + 0.4), lock: 1, days: P.PAPER_DONE };
    },
  });
  K.shake(tRule18 + 0.1, 4, 0.3);

  // ================= A：时点（第 13 句）=================
  const pA = K.panel(si, 140, 236, 1640, 540, C.main[1], "TIMING · 时点");
  const cvA = P.layer(si);
  const DAYS = ["T", "T+1", "T+2", "T+3", "T+4", "T+5", "T+6"];
  const DX = (i) => 420 + i * 200;
  const DW = 120;
  const DY = 440;
  const dayL = DAYS.map((d, i) => P.ctr(si, DX(i) + DW / 2, 318, d, MONO(30, 800), C.gray));
  const closeL = P.txr(si, DX(0) + DW - 4, 474, "15:00 收盘 · 决定", SANS(28, 800), C.main[2]);
  const openL = P.tx(si, DX(1) + 6, 474, "9:30 开盘 · 成交", SANS(28, 800), C.main[2]);
  const decideS = P.txr(si, DX(0) + DW - 4, 514, "打分 · 出指令", P.MONO20, C.gray);
  const fillS = P.tx(si, DX(1) + 6, 514, "按开盘价 · 加 10 BPS 滑点", P.MONO20, C.gray);
  const labelL = P.ctr(si, (DX(1) + DX(6)) / 2, 626, "标签 = T+1 开盘 → T+6 开盘的 5 日收益", SANS(30, 800), C.text);
  const labelS = P.ctr(si, (DX(1) + DX(6)) / 2, 672, "LABEL · 只用决策之后的价格", P.MONO20, C.gray);
  const upA = (t) => {
    const a = pA.up(t, t13, t14 - 0.1, 0.3);
    dayL.forEach((e, i) => {
      P.vin(e, a, a * K.prog(t, tTime13 + i * 0.06, tTime13 + 0.25 + i * 0.06));
      K.col(e, i === 0 ? P.lightCol(t, tClose13, C.text, C.gray) : i === 1 ? P.lightCol(t, tNext13, C.text, C.gray) : C.gray);
    });
    P.vin(closeL, a, a * K.prog(t, tClose13, tClose13 + 0.3));
    P.vin(decideS, a, a * K.prog(t, tDecide13, tDecide13 + 0.3));
    P.vin(openL, a, a * K.prog(t, tOpen13, tOpen13 + 0.3));
    P.vin(fillS, a, a * K.prog(t, tFill13, tFill13 + 0.3));
    P.vin(labelL, a, a * K.prog(t, tFill13 + 0.35, tFill13 + 0.65));
    P.vin(labelS, a, a * K.prog(t, tFill13 + 0.5, tFill13 + 0.8));
    if (!cvA.begin(a)) return;
    const ctx = cvA.ctx;
    ctx.globalAlpha = a;
    // 每天一根交易时段条，夜里断开
    DAYS.forEach((d, i) => {
      const p = K.eo(K.prog(t, tTime13 + i * 0.06, tTime13 + 0.3 + i * 0.06));
      if (p <= 0) return;
      ctx.fillStyle = "#1c2028";
      ctx.fillRect(DX(i), DY - 10, DW * p, 20);
      ctx.strokeStyle = "#3a3e46";
      ctx.lineWidth = 1;
      ctx.strokeRect(DX(i) + 0.5, DY - 9.5, DW * p - 1, 19);
      // 午休：中间一道缝
      ctx.fillStyle = C.bg;
      ctx.fillRect(DX(i) + DW * 0.5 - 1, DY - 10, 3, 20 * (p >= 1 ? 1 : 0));
    });
    // T 日收盘点、T+1 开盘点
    const pc = K.eo(K.prog(t, tClose13, tClose13 + 0.3));
    const po = K.eo(K.prog(t, tOpen13, tOpen13 + 0.3));
    const dot = (x, p) => {
      if (p <= 0) return;
      ctx.save();
      ctx.fillStyle = C.main[2];
      ctx.shadowColor = C.main[2];
      ctx.shadowBlur = 10 * p;
      ctx.beginPath();
      ctx.arc(x, DY, 8 * p, 0, 6.283);
      ctx.fill();
      ctx.restore();
    };
    dot(DX(0) + DW, pc);
    dot(DX(1), po);
    // 收盘到次日开盘：一道弧
    const pa = K.eio(K.prog(t, tNext13, tOpen13 + 0.1));
    if (pa > 0) {
      const x0 = DX(0) + DW;
      const x1 = DX(1);
      const pts = [];
      for (let k = 0; k <= 30; k++) {
        const u = k / 30;
        pts.push([x0 + (x1 - x0) * u, DY - 14 - 46 * Math.sin(Math.PI * u)]);
      }
      ctx.strokeStyle = C.main[1];
      ctx.lineWidth = 1.5;
      P.poly(ctx, pts, pa);
      if (pa >= 1) P.arrow(ctx, x1 - 4, DY - 22, x1, DY - 14, C.main[1], 8);
    }
    // 标签：T+1 开盘到 T+6 开盘
    const pl = K.eio(K.prog(t, tFill13 + 0.3, tFill13 + 0.9));
    if (pl > 0) {
      const x0 = DX(1);
      const x1 = DX(6);
      const y = 596;
      ctx.fillStyle = C.text;
      ctx.fillRect(x0, y, (x1 - x0) * pl, 1);
      ctx.fillRect(x0, y - 10, 1, 20);
      if (pl >= 1) ctx.fillRect(x1, y - 10, 1, 20);
      for (let i = 2; i <= 5; i++) {
        const xx = DX(i);
        if (xx > x0 + (x1 - x0) * pl) break;
        ctx.fillStyle = "#8a8f98";
        ctx.fillRect(xx, y - 5, 1, 10);
      }
    }
  };

  // ================= B：滚动 10 折（第 14 句）=================
  const pB = K.panel(si, 140, 236, 1640, 540, C.main[1], "WALK-FORWARD · 10 折 · 每折重新训练");
  const cvB = P.layer(si);
  const FX = (d) => 330 + ((P.yr(d) - 2016) / 9) * 1400;
  const FY = (k) => 300 + k * 38;
  const foldL = CR.folds.map((f, k) => P.txr(si, 300, FY(k) - 1, "折 " + (k + 1), P.MONO20, C.gray));
  const yrB = [];
  for (let y = 2016; y <= 2025; y++) yrB.push(P.ctr(si, FX(`${y}-01-02`), 690, String(y), P.MONO20, y >= 2020 && y < 2025 ? C.text : P.DIM));
  const legB = [
    P.tag(si, 1100, 252, "训练 756 天", C.gray, true),
    P.tag(si, 1290, 252, "验证 126 天", C.gray, true),
    P.tag(si, 1480, 252, "测试 126 天", C.main[2], true),
  ];
  const devB = P.ctr(si, (FX("2020-01-02") + FX("2024-12-31")) / 2, 724, "2020–2024 · 开发期，滚动样本外", SANS(26, 700), C.main[2]);
  const upB = (t) => {
    const a = pB.up(t, t14, t15 - 0.1, 0.3);
    foldL.forEach((e, k) => P.vin(e, a, a * K.prog(t, t10_14 + k * 0.05, t10_14 + 0.25 + k * 0.05)));
    for (const e of yrB) P.vin(e, a, a);
    legB.forEach((e, i) => P.vin(e, a, a * K.prog(t, i === 2 ? tCut14 : tPrev14 + (i ? 0.2 : 0), (i === 2 ? tCut14 : tPrev14 + (i ? 0.2 : 0)) + 0.3)));
    P.vin(devB, a, a * K.prog(t, t14 + 0.1, t14 + 0.4));
    if (!cvB.begin(a)) return;
    const ctx = cvB.ctx;
    ctx.globalAlpha = a;
    // 开发期底色
    const pd = K.eo(K.prog(t, t14, t14 + 0.4));
    ctx.fillStyle = K.rgba(C.main[1], 0.06 * pd);
    ctx.fillRect(FX("2020-01-02"), 286, (FX("2024-12-31") - FX("2020-01-02")) * pd, 386);
    ctx.fillStyle = "#3a3e46";
    ctx.fillRect(330, 676, 1400, 1);
    for (let y = 2016; y <= 2025; y++) ctx.fillRect(Math.round(FX(`${y}-01-02`)), 676, 1, 6);
    CR.folds.forEach((f, k) => {
      const [tr, va, te, tn] = f;
      const y = FY(k);
      // 测试段：念到“10 段”时一折一折亮
      const pt = K.eo(K.prog(t, t10_14 + k * 0.05, t10_14 + 0.3 + k * 0.05));
      if (pt > 0) {
        ctx.save();
        ctx.fillStyle = C.main[1];
        ctx.shadowColor = C.main[2];
        ctx.shadowBlur = 6 * pt;
        ctx.fillRect(FX(te), y, (FX(tn) - FX(te)) * pt, 22);
        ctx.restore();
      }
      // 训练、验证：念到“之前”时从测试段往左长出来
      const pv = K.eo(K.prog(t, tPrev14 + k * 0.04, tPrev14 + 0.35 + k * 0.04));
      if (pv > 0) {
        const xv = FX(te) - (FX(te) - FX(va)) * pv;
        ctx.fillStyle = "#4a4f58";
        ctx.fillRect(xv, y + 3, FX(te) - xv - 2, 16);
      }
      const ptr = K.eo(K.prog(t, tPrev14 + 0.2 + k * 0.04, tTrain14 + 0.2 + k * 0.04));
      if (ptr > 0) {
        const xt = FX(va) - (FX(va) - FX(tr)) * ptr;
        ctx.fillStyle = K.mix("#2a2d33", "#6b707a", K.prog(t, tTrain14, tTrain14 + 0.3));
        ctx.fillRect(xt, y + 3, FX(va) - xt - 2, 16);
      }
    });
  };

  // ================= C：退市的 245 只（第 15–16 句）=================
  const DL = CR.delisted;
  const pC = K.panel(si, 140, 236, 1640, 540, P.GRAY[2], "DELISTED · 2016–2024 区间内退市");
  const cvC = P.layer(si);
  const BLK = [
    { n: DL.main, cols: 26, x: 200, zh: "主板" },
    { n: DL.chinext, cols: 10, x: 840, zh: "创业板" },
    { n: DL.star, cols: 3, x: 1130, zh: "科创板" },
  ];
  const DP = 22;
  const DY0 = 316;
  const blkL = BLK.map((b) => P.tx(si, b.x, 506, b.zh + " " + b.n, SANS(28, 800), C.text));
  const bigC = P.txr(si, 1740, 290, "", MONO(120), C.text);
  const bigCL = P.txr(si, 1740, 426, "只区间内退市的股票", SANS(26, 700), C.gray);
  const sampC = P.tx(si, 180, 564, "SAMPLE · 2016–2024 · 5,317 只 · 退市的也在", P.MONO20, C.amb[1]);
  const biasC = P.tag(si, 180, 600, "删掉它们 = 只看活下来的 · SURVIVORSHIP BIAS", C.gray, true);
  const metC = P.tx(si, 1270, 648, "只采访中奖的人", SANS(34, 800), C.text);
  const metS = P.tag(si, 1270, 698, "比喻 · METAPHOR", C.gray, true);
  // 第 n 个点在哪个板块、坐标
  const dotXY = [];
  BLK.forEach((b, bi) => {
    for (let i = 0; i < b.n; i++) dotXY.push([b.x + (i % b.cols) * DP + 8, DY0 + Math.floor(i / b.cols) * DP + 8, bi, i]);
  });
  const upC = (t) => {
    const a = pC.up(t, t15, t17 - 0.1, 0.3);
    BLK.forEach((b, i) => P.vin(blkL[i], a, a * K.prog(t, t245 + 0.3 + i * 0.12, t245 + 0.55 + i * 0.12)));
    P.vin(bigC, a, a * K.prog(t, t245 - 0.1, t245 + 0.1));
    K.put(bigC, K.roll(t, t245, 0.7, 0, DL.total));
    P.glow(bigC, t, t245 + 0.7, [C.text, C.text, "#ffffff"]);
    P.vin(bigCL, a, a * K.prog(t, t245 + 0.2, t245 + 0.5));
    P.vin(sampC, a, a * K.prog(t, tKeep15, tKeep15 + 0.3));
    P.vin(biasC, a, a * K.prog(t, tAlive16, tAlive16 + 0.3));
    P.vin(metC, a, a * K.prog(t, tAsk16, tAsk16 + 0.3));
    P.vin(metS, a, a * K.prog(t, tAsk16 + 0.1, tAsk16 + 0.4));
    if (!cvC.begin(a)) return;
    const ctx = cvC.ctx;
    ctx.globalAlpha = a;
    // 245 个点：念到“退市”时一行行铺开，念到 245 时点亮
    const lay = K.prog(t, tDel15 - 0.1, t245 + 0.5);
    const ghost = K.eo(K.prog(t, tAlive16, tAlive16 + 0.4)) * (1 - K.eo(K.prog(t, tWin16 + 0.5, tWin16 + 0.9)));
    dotXY.forEach(([x, y, bi, i], k) => {
      const ap = K.c01((lay * 1.1 - k / dotXY.length) / 0.1);
      if (ap <= 0) return;
      const lit = K.prog(t, t245, t245 + 0.5);
      ctx.globalAlpha = a * ap;
      if (ghost > 0.5) {
        ctx.strokeStyle = "#4a4f58";
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 2]);
        ctx.beginPath();
        ctx.arc(x, y, 6.5, 0, 6.283);
        ctx.stroke();
        ctx.setLineDash([]);
      } else {
        ctx.fillStyle = K.mix("#4a4f58", "#c9c4bb", lit);
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, 6.283);
        ctx.fill();
      }
    });
    ctx.globalAlpha = a;
    // 留在样本里：冰蓝框把三块点圈进来
    const pk = K.eo(K.prog(t, tKeep15, tKeep15 + 0.5));
    if (pk > 0) {
      ctx.strokeStyle = C.amb[1];
      ctx.lineWidth = 1;
      const x0 = 178.5;
      const y0 = 296.5;
      P.poly(ctx, [[x0, y0], [1230, y0], [1230, 556], [x0, 556], [x0, y0]], pk);
    }
    // 比喻：40 张彩票，只有一张中了
    const pm = K.prog(t, tAsk16, tWin16 + 0.4);
    if (pm > 0) {
      for (let i = 0; i < 40; i++) {
        const q = K.c01((pm * 1.2 - i / 40) / 0.2);
        if (q <= 0) continue;
        const x = 200 + i * 26;
        const y = 652;
        const win_ = i === 27;
        const lit = win_ ? K.eo(K.prog(t, tWin16, tWin16 + 0.3)) : 0;
        ctx.globalAlpha = a * q;
        ctx.strokeStyle = win_ && lit > 0 ? K.mix("#3a3e46", C.text, lit) : "#3a3e46";
        ctx.fillStyle = win_ && lit > 0 ? K.rgba(C.text, 0.85 * lit) : "#14161b";
        ctx.lineWidth = 1;
        K.rr(ctx, x + 0.5, y + 0.5, 19, 33, 3);
        ctx.fill();
        ctx.stroke();
        // 票根的虚线
        ctx.fillStyle = win_ && lit > 0.5 ? C.bg : "#2a2d33";
        for (let xx = x + 3; xx < x + 18; xx += 4) ctx.fillRect(xx, y + 24, 2, 1);
      }
      ctx.globalAlpha = a;
    }
  };

  // ================= D：估值闸门（第 17–19 句）=================
  const pD = K.panel(si, 140, 236, 1640, 540, C.red[1], "VALUATION GATE · 估值数据抽查");
  pD.lab.style.color = C.red[2];
  const cvD = P.layer(si);
  const CELL_X = (i) => 180 + (i % 10) * 58;
  const CELL_Y = (i) => 296 + Math.floor(i / 10) * 58;
  const d30 = P.tx(si, 180, 478, "", MONO(64), C.red[2]);
  const d30L = P.tx(si, 450, 498, "年报公告前，每股收益先跳了", SANS(26, 700), C.text);
  const dPass = P.tx(si, 600, 254, "30 个公司年 · 按事先写的口径逐个比对", P.MONO20, C.gray);
  const chartTag = P.tag(si, 1756, 252, "ILLUSTRATIVE · 示意");
  const epsL = P.tx(si, 880, 290, "每股收益 EPS", P.MONO20, C.gray);
  const annL = P.ctr(si, 1500, 508, "年报公告日", P.MONO20, C.text);
  const jumpL = P.ctr(si, 1370, 300, "公告前就跳了", SANS(26, 800), C.red[2]);
  const vendorL = P.tx(si, 880, 546, "诊断：更像数据商更新偏晚", SANS(24, 600), C.gray);
  const gateL = P.tx(si, 1430, 540, "闸门 · 判定失败", SANS(30, 900), C.red[2]);
  const facL = P.tx(si, 180, 590, "估值因子", SANS(26, 800), C.text);
  const facN = P.tx(si, 1150, 594, "", MONO(36, 800), C.text);
  const facS = P.tx(si, 1150, 638, "因子库候选", P.MONO20, C.gray);
  const ruleD = P.say(si, 220, 700, 1500, 19, "规则写在前面，结果不好看，也照着办。", '800 32px/44px "HF Sans", sans-serif');
  const ruleS = P.tx(si, 220, 742, "闸门不过就整组弃用 · 不找替代数据 · 不改闸门口径", P.MONO20, C.gray);
  const upD = (t) => {
    const a = pD.up(t, t17, t20 - 0.1, 0.3);
    P.vin(dPass, a, a * K.prog(t, tCheck17, tCheck17 + 0.3));
    P.vin(d30, a, a * K.prog(t, t3, t3 + 0.25));
    K.put(d30, "3 / 30");
    P.glow(d30, t, t3, C.red);
    P.vin(d30L, a, a * K.prog(t, tReport17, tReport17 + 0.3));
    P.vin(chartTag, a, a * K.prog(t, tReport17, tReport17 + 0.3));
    P.vin(epsL, a, a * K.prog(t, tReport17, tReport17 + 0.3));
    P.vin(annL, a, a * K.prog(t, tReport17 + 0.2, tReport17 + 0.5));
    P.vin(jumpL, a, a * K.prog(t, tJump17 + 0.2, tJump17 + 0.5));
    P.vin(vendorL, a, a * K.prog(t, tVendor18, tVendor18 + 0.3));
    P.vin(gateL, a, a * K.prog(t, tRule18, tRule18 + 0.2));
    P.vin(facL, a, a * K.prog(t, t15f, t15f + 0.3));
    P.vin(facN, a, a * K.prog(t, t15f + 0.3, t15f + 0.6));
    P.vin(facS, a, a * K.prog(t, t15f + 0.3, t15f + 0.6));
    K.put(facN, t < tDrop18 + 0.3 ? "183" : "183 → 168");
    K.col(facN, t < tDrop18 + 0.3 ? C.text : K.mix(C.red[2], C.text, K.prog(t, tDrop18 + 0.6, tDrop18 + 1.4)));
    P.vin(ruleD.el, a, a * K.prog(t, t19 - 0.1, t19 + 0.2));
    if (a > 0) ruleD.paint(t);
    P.vin(ruleS, a, a * K.prog(t, tDo19, tDo19 + 0.3));
    if (!cvD.begin(a)) return;
    const ctx = cvD.ctx;
    ctx.globalAlpha = a;
    // 30 格：27 格过，最后 3 格是提前跳的（只按通过、不通过排，不代表抽查顺序）
    for (let i = 0; i < 30; i++) {
      const p = K.prog(t, t30 - 0.1 + i * 0.02, t30 + 0.15 + i * 0.02);
      if (p <= 0) continue;
      const bad = i >= 27;
      const r = bad ? K.eo(K.prog(t, t3 + (i - 27) * 0.08, t3 + 0.3 + (i - 27) * 0.08)) : 0;
      ctx.globalAlpha = a * p;
      const flash = 1 - K.prog(t, t30 - 0.1 + i * 0.02, t30 + 0.35 + i * 0.02);
      ctx.fillStyle = r > 0 ? K.mix("#1c2028", C.red[0], r) : K.mix("#1c2028", "#5a5f68", flash);
      ctx.fillRect(CELL_X(i), CELL_Y(i), 50, 50);
      ctx.strokeStyle = r > 0 ? K.mix("#4a4f58", C.red[1], r) : "#4a4f58";
      ctx.lineWidth = 1;
      ctx.strokeRect(CELL_X(i) + 0.5, CELL_Y(i) + 0.5, 49, 49);
      if (!bad) P.check(ctx, CELL_X(i) + 25, CELL_Y(i) + 25, 22, "#6b707a", K.prog(t, tCheck17 + 0.8 + i * 0.015, tCheck17 + 1.1 + i * 0.015), 2);
      else P.cross(ctx, CELL_X(i) + 25, CELL_Y(i) + 25, 26, C.red[2], r, 2.5);
    }
    ctx.globalAlpha = a;
    // 示意图：每股收益在公告日之前就跳上去
    const pc = K.prog(t, tReport17, tReport17 + 0.3);
    if (pc > 0) {
      ctx.globalAlpha = a * pc;
      ctx.fillStyle = "#3a3e46";
      ctx.fillRect(880, 500, 860, 1);
      ctx.fillRect(880, 320, 1, 180);
      ctx.fillStyle = C.text;
      for (let y = 326; y < 500; y += 8) ctx.fillRect(1500, y, 1, 4);
      const ps = K.eio(K.prog(t, tReport17 + 0.2, tJump17 + 0.6));
      const pts = [[890, 460], [1250, 460], [1250, 380], [1720, 380]];
      ctx.strokeStyle = C.text;
      ctx.lineWidth = 2;
      P.poly(ctx, pts, ps);
      const pr = K.eo(K.prog(t, tJump17, tJump17 + 0.4));
      if (pr > 0) {
        ctx.fillStyle = K.rgba(C.red[1], 0.22 * pr);
        ctx.fillRect(1250, 330, 250 * pr, 170);
        ctx.fillStyle = C.red[2];
        ctx.fillRect(1250, 330, 250 * pr, 2);
      }
      ctx.globalAlpha = a;
    }
    // 闸门判定失败：一圈红粉框
    const pg = K.eo(K.prog(t, tRule18, tRule18 + 0.3));
    if (pg > 0) {
      ctx.save();
      ctx.strokeStyle = C.red[2];
      ctx.shadowColor = C.red[2];
      ctx.shadowBlur = 10 * P.pulse(t, tRule18, 0.1, 0.9);
      ctx.lineWidth = 2;
      K.rr(ctx, 1416, 532, 300 * pg, 52, 6);
      ctx.stroke();
      ctx.restore();
    }
    // 15 个估值因子：一排小格，念到“整组”时一道红粉线划掉
    const pf = K.prog(t, t15f, t15f + 0.5);
    if (pf > 0) {
      for (let i = 0; i < 15; i++) {
        const q = K.c01((pf * 1.2 - i / 15) / 0.2);
        if (q <= 0) continue;
        ctx.globalAlpha = a * q;
        const x = 320 + i * 54;
        ctx.fillStyle = "#1c2028";
        ctx.fillRect(x, 588, 44, 44);
        ctx.strokeStyle = "#5a5f68";
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 0.5, 588.5, 43, 43);
      }
      ctx.globalAlpha = a;
      const px = K.eio(K.prog(t, tDrop18, tDrop18 + 0.45));
      if (px > 0) {
        ctx.save();
        ctx.fillStyle = C.red[2];
        ctx.shadowColor = C.red[2];
        ctx.shadowBlur = 6;
        ctx.fillRect(312, 609, (15 * 54 + 6) * px, 2);
        ctx.restore();
      }
    }
    // 规则卡：左边一把锁
    const pr = K.prog(t, t19 - 0.1, t19 + 0.2);
    if (pr > 0) {
      ctx.globalAlpha = a * pr;
      ctx.fillStyle = "#11141a";
      ctx.fillRect(160, 680, 1600, 88);
      ctx.strokeStyle = "#3a3e46";
      ctx.strokeRect(160.5, 680.5, 1599, 87);
      P.lock(ctx, 190, 724, 30, P.lightCol(t, tFront19, C.main[2], "#5a5f68"));
      ctx.globalAlpha = a;
    }
  };

  // ================= E1：账本和六条规矩（第 20–21 句）=================
  const FF = CR.forward.firstFill.rows;
  const pE = K.panel(si, 140, 236, 520, 540, C.main[1], "PAPER LEDGER · 10-20 · 逐笔");
  const rowsE = FF.slice(0, 9).map((r) => ["10-20", "买入", "#" + (r[0] + 1), K.fmt(r[1]), r[1] / 100 + " 手"]);
  const TE = P.table(si, 162, 300, ["日期", "方向", "名次", "股数", "整手"], rowsE, { widths: [94, 80, 80, 116, 106], rh: 40 });
  const eNote = P.tx(si, 162, 716, "24 笔都是 100 股的整数倍", SANS(24, 700), C.gray);
  const RULES = [
    ["整手", "100 股起 · 科创板 200 股起", tBoard20],
    ["T+1", "当天买的，下个交易日才能卖", tNext20],
    ["涨跌停", "分板块的涨跌幅限制", tLimit21],
    ["停牌", "停牌日不成交", tHalt21],
    ["退市", "按退市规则处理持仓", tDelist21],
    ["除权", "按明细记账，少数近似", tEx21],
  ];
  const tilesE = RULES.map(([a, b], i) => P.tile(si, 700 + (i % 3) * 364, 256 + Math.floor(i / 3) * 176, 340, 150, a, b, 40));
  const exL = P.tx(si, 700, 640, "除权事件", SANS(26, 800), C.text);
  const exA = P.tx(si, 840, 644, "97.7% 按明细记账", MONO(22, 700), C.text);
  const exB = P.txr(si, 1780, 644, "2.3% 按参考价近似", MONO(22, 700), C.gray);
  const upE1 = (t) => {
    const a = pE.up(t, t20, t22 - 0.1, 0.3);
    TE.up(t, a, t20, { rowT: rowsE.map((r, i) => tOne20 + i * 0.09) });
    P.vin(eNote, a, a * K.prog(t, tQty20 + 0.4, tQty20 + 0.7));
    tilesE.forEach((tl, i) => tl.up(t, a * K.prog(t, tQty20 - 0.2 + i * 0.05, tQty20 + 0.1 + i * 0.05), RULES[i][2], [C.text, "#8a8f98", "#ffffff"]));
    const ae = a * K.prog(t, tEx21 + 0.1, tEx21 + 0.4);
    P.vin(exL, a, ae);
    P.vin(exA, a, ae);
    P.vin(exB, a, a * K.prog(t, tRef21, tRef21 + 0.3));
  };
  const cvE1 = P.layer(si);
  const upE1c = (t) => {
    const a = P.win(t, t20, t22 - 0.1);
    if (!cvE1.begin(a)) return;
    const ctx = cvE1.ctx;
    // 除权：97.7 对 2.3 的一根条
    const pb = K.eo(K.prog(t, tEx21 + 0.1, tEx21 + 0.6));
    if (pb > 0) {
      ctx.globalAlpha = a;
      const x0 = 700;
      const W = 1080;
      ctx.fillStyle = "#c9c4bb";
      ctx.fillRect(x0, 690, W * 0.977 * pb, 16);
      const pr = K.eo(K.prog(t, tRef21, tRef21 + 0.4));
      if (pr > 0) {
        ctx.fillStyle = "#5a5f68";
        ctx.fillRect(x0 + W * 0.977 + 2, 690, (W * 0.023 - 2) * pr, 16);
      }
    }
  };

  // ================= E2：四样成本和独立重算（第 22–23 句）=================
  const pF1 = K.panel(si, 140, 236, 800, 540, C.red[1], "COSTS · 每笔成交都扣");
  pF1.lab.style.color = C.red[2];
  const cvRow = P.layer(si);
  const FEES = [
    ["佣金", "买卖都收", "3 BPS · 最低 ¥5", tComm22],
    ["过户费", "买卖都收", "按成交额", tTrans22],
    ["印花税", "只在卖出时收", "按生效日的费率", tStamp22],
    ["滑点", "按开盘价再让一步", "10 BPS", tSlip22],
  ];
  const feeE = FEES.map(([n, s, v], i) => ({
    n: P.tx(si, 180, 300 + i * 112, n, SANS(36, 900), P.DIM),
    s: P.tx(si, 180, 348 + i * 112, s, P.MONO20, P.DIM),
    v: P.txr(si, 900, 306 + i * 112, v, MONO(32, 800), P.DIM),
  }));
  const FP = CR.forward.firstFill.parts;
  const pF3 = K.panel(si, 980, 236, 800, 540, C.red[1], "10-20 建仓 · 实际扣了多少（元）");
  pF3.lab.style.color = C.red[2];
  const ACT = [
    [FP.commission, tComm22],
    [FP.transfer, tTrans22],
    [FP.stamp, tStamp22],
    [FP.slippage, tSlip22],
  ];
  const actV = ACT.map(([v], i) => P.txr(si, 1740, 312 + i * 112, K.fmt(v, 2), MONO(30, 800), P.DIM));
  const actN = P.tx(si, 1020, 532, "只买没卖", P.MONO20, C.gray);
  const actT = P.txr(si, 1740, 716, "合计 " + K.fmt(CR.forward.firstFill.fees, 2), MONO(30, 800), C.red[2]);
  const actS = P.tx(si, 1020, 722, "24 笔 · 成交 " + K.fmt(CR.forward.firstFill.notional, 0), P.MONO20, C.gray);
  const pF2 = K.panel(si, 980, 236, 800, 540, C.main[1], "AUDIT · 另一份脚本从头重算");
  const AUD = [
    ["现金", "最大偏差 9.5e-9 元", tCash23],
    ["净值", "最大偏差 7.0e-10 元", tNav23],
    ["违例", "0 / 20 类", tAgain23 + 0.4],
  ];
  const audE = AUD.map(([n, v], i) => ({
    n: P.tx(si, 1046, 320 + i * 120, n, SANS(36, 900), P.DIM),
    v: P.txr(si, 1740, 326 + i * 120, v, MONO(30, 800), P.DIM),
  }));
  const audS = P.tx(si, 1020, 700, "每次运行之后都跑 · 和账本逐日对", P.MONO20, C.gray);
  const cvE2 = P.layer(si);
  const upE2 = (t) => {
    const a1 = pF1.up(t, t22, t24 - 0.1, 0.3);
    FEES.forEach(([n, s, v, tf], i) => {
      const q = a1 * K.prog(t, t22 + i * 0.08, t22 + 0.3 + i * 0.08);
      const e = feeE[i];
      P.vin(e.n, a1, q);
      P.vin(e.s, a1, q);
      P.vin(e.v, a1, q);
      K.col(e.n, P.lightCol(t, tf, C.text));
      K.col(e.s, P.lightCol(t, tf, C.gray));
      K.col(e.v, P.lightCol(t, i === 0 ? tMin22 : tf, C.red[2], K.mixHex(C.red[0], C.red[1], 0.6)));
    });
    const a3 = pF3.up(t, t22 + 0.3, tOther23 - 0.1, 0.3);
    ACT.forEach(([v, ta], i) => {
      P.vin(actV[i], a3, a3 * K.prog(t, t22 + 0.4 + i * 0.08, t22 + 0.7 + i * 0.08));
      K.col(actV[i], P.lightCol(t, ta, C.red[2], K.mixHex(C.red[0], C.red[1], 0.6)));
    });
    P.vin(actN, a3, a3 * K.prog(t, tStamp22 + 0.2, tStamp22 + 0.5));
    P.vin(actT, a3, a3 * K.prog(t, tSlip22 + 0.5, tSlip22 + 0.8));
    P.vin(actS, a3, a3 * K.prog(t, tSlip22 + 0.6, tSlip22 + 0.9));
    const a2 = pF2.up(t, tOther23, t24 - 0.1, 0.3);
    AUD.forEach(([n, v, ta], i) => {
      const e = audE[i];
      const q = a2 * K.prog(t, tOther23 + 0.1 + i * 0.08, tOther23 + 0.4 + i * 0.08);
      P.vin(e.n, a2, q);
      P.vin(e.v, a2, q);
      K.col(e.n, P.lightCol(t, ta, C.text));
      if (t >= ta) P.glow(e.v, t, ta, C.main);
      else K.col(e.v, P.DIM);
    });
    P.vin(audS, a2, a2 * K.prog(t, tAgain23 + 0.5, tAgain23 + 0.8));
    if (cvRow.begin(a1)) {
      FEES.forEach(([n, s, v, tf], i) => {
        const pu = Math.max(P.pulse(t, tf, 0.12, 0.9), i === 0 ? P.pulse(t, tMin22, 0.12, 0.9) : 0);
        if (pu <= 0.01) return;
        cvRow.ctx.globalAlpha = a1;
        cvRow.ctx.fillStyle = K.rgba(C.red[1], 0.3 * pu);
        cvRow.ctx.fillRect(152, 292 + i * 112, 776, 88);
      });
    }
    if (!cvE2.begin(Math.max(a1, a2, a3))) return;
    const ctx = cvE2.ctx;
    // 每条成本左边一根红粉竖条，念到时亮
    FEES.forEach(([n, s, v, tf], i) => {
      const p = K.eo(K.prog(t, tf, tf + 0.3));
      ctx.globalAlpha = a1;
      ctx.fillStyle = p > 0 ? K.mix("#2a2d33", C.red[1], p) : "#2a2d33";
      ctx.fillRect(164, 300 + i * 112, 3, 70);
      if (i < 3) {
        ctx.fillStyle = "#1c2028";
        ctx.fillRect(180, 390 + i * 112, 720, 1);
      }
    });
    // 10-20 实际扣的：每样一根红粉条，同一比例（滑点 932 元最长）
    ACT.forEach(([v, ta], i) => {
      const p = K.eo(K.prog(t, ta, ta + 0.5));
      ctx.globalAlpha = a3;
      ctx.fillStyle = "#1c2028";
      ctx.fillRect(1020, 300 + i * 112, 560, 30);
      if (p > 0 && v > 0) {
        ctx.fillStyle = C.red[1];
        ctx.fillRect(1020, 300 + i * 112, Math.max(2, (v / FP.slippage) * 560 * p), 30);
      }
    });
    // 重算：一道扫描线从上往下走，走过的行打勾
    const ps = K.prog(t, tAgain23, tAgain23 + 0.8);
    AUD.forEach(([n, v, ta], i) => {
      ctx.globalAlpha = a2;
      P.check(ctx, 1018, 344 + i * 120, 22, C.main[2], K.prog(t, ta + 0.1, ta + 0.4), 2.5);
      if (i < 2) {
        ctx.fillStyle = "#1c2028";
        ctx.fillRect(1000, 396 + i * 120, 760, 1);
      }
    });
    if (ps > 0 && ps < 1) {
      ctx.globalAlpha = a2 * (1 - ps * 0.5);
      ctx.fillStyle = K.rgba(C.main[2], 0.6);
      ctx.fillRect(1000, 300 + ps * 380, 760, 2);
    }
  };

  // ================= F：换手和费用（第 24–25 句）=================
  const pG = K.panel(si, 140, 236, 1640, 540, C.main[1], "COSTS · 冻结方案 · 开发期 2020–2024");
  const cvG = P.layer(si);
  const gGrid = P.tx(si, 200, 716, "100 格 = 净值 · 每格 1%", P.MONO20, C.gray);
  const g6 = P.tx(si, 676, 280, "", MONO(110), C.main[1]);
  const g6L = P.tx(si, 686, 404, "日均双边换手 · 买进加卖出", SANS(28, 700), C.text);
  const BAR = { x: 920, s: 120 };
  const gB1 = P.tx(si, 686, 520, "年费用拖累", SANS(28, 800), C.text);
  const gB2 = P.tx(si, 686, 610, "年化主动收益", SANS(28, 800), C.text);
  const gV1 = P.tx(si, 0, 518, P.pct(CR.costs.S2P2.drag), MONO(40, 800), C.red[2]);
  const gV2 = P.tx(si, 0, 608, "5.8%", MONO(40, 800), C.main[2]);
  const gQ = P.tx(si, 1640, 562, "一个量级", SANS(26, 800), C.text);
  const gCmp = P.tx(si, 686, 708, `对照 · 风险模型 + 均值方差：换手 ${P.pct(CR.costs.S4P4.turnover)} · 拖累 ${P.pct(CR.costs.S4P4.drag)}`, P.MONO20, C.gray);
  const upF = (t) => {
    const a = pG.up(t, t24, t26 - 0.1, 0.3);
    P.vin(gGrid, a, a * K.prog(t, tNav24, tNav24 + 0.3));
    P.vin(g6, a, a * K.prog(t, tTrade24, tTrade24 + 0.3));
    if (t < t6) {
      K.put(g6, "·.·%");
      K.col(g6, K.mixHex(C.main[0], C.main[1], 0.6));
    } else {
      K.put(g6, P.pct(CR.costs.S2P2.turnover));
      P.glow(g6, t, t6, C.main);
    }
    P.vin(g6L, a, a * K.prog(t, tTrade24, tTrade24 + 0.3));
    P.vin(gB1, a, a * K.prog(t, t24 + 0.4, t24 + 0.7));
    P.vin(gB2, a, a * K.prog(t, t24 + 0.5, t24 + 0.8));
    K.col(gB1, P.lightCol(t, tFee25, C.text));
    K.col(gB2, P.lightCol(t, t58 - 0.3, C.text));
    const p1 = K.eo(K.prog(t, t3pt, t3pt + 0.5));
    const p2 = K.eo(K.prog(t, t58, t58 + 0.6));
    K.at(gV1, BAR.x + CR.costs.S2P2.drag * 100 * BAR.s * p1 + 20, 518);
    K.at(gV2, BAR.x + 5.8 * BAR.s * p2 + 20, 608);
    P.vin(gV1, a, a * K.prog(t, t3pt, t3pt + 0.3));
    P.vin(gV2, a, a * K.prog(t, t58, t58 + 0.3));
    P.vin(gQ, a, a * K.prog(t, tScale25, tScale25 + 0.3));
    P.vin(gCmp, a, a * K.prog(t, tScale25 + 0.3, tScale25 + 0.6));
    if (!cvG.begin(a)) return;
    const ctx = cvG.ctx;
    ctx.globalAlpha = a;
    // 10 × 10 格，6 格是一天的换手
    const pg = K.prog(t, t24, tTrade24 + 0.3);
    for (let i = 0; i < 100; i++) {
      const q = K.c01((pg * 1.2 - i / 100) / 0.2);
      if (q <= 0) continue;
      const x = 200 + (i % 10) * 40;
      const y = 296 + Math.floor(i / 10) * 40;
      const on = i < 6 ? K.eo(K.prog(t, t6 - 0.3 + i * 0.05, t6 + i * 0.05)) : 0;
      ctx.globalAlpha = a * q;
      if (on > 0) {
        ctx.save();
        ctx.fillStyle = K.mix("#1c2028", C.main[1], on);
        ctx.shadowColor = C.main[2];
        ctx.shadowBlur = 8 * on;
        ctx.fillRect(x, y, 34, 34);
        ctx.restore();
      } else {
        ctx.fillStyle = "#1c2028";
        ctx.fillRect(x, y, 34, 34);
        ctx.strokeStyle = "#2a2d33";
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 0.5, y + 0.5, 33, 33);
      }
    }
    ctx.globalAlpha = a;
    // 两根条，同一比例：每 1% 120 px；先摆空槽
    const pe = K.prog(t, t24 + 0.4, t24 + 0.8);
    if (pe > 0) {
      ctx.globalAlpha = a * pe;
      for (const y of [520, 610]) {
        ctx.fillStyle = "#11141a";
        ctx.fillRect(BAR.x, y, 6 * BAR.s, 36);
        ctx.strokeStyle = "#2a2d33";
        ctx.lineWidth = 1;
        ctx.strokeRect(BAR.x + 0.5, y + 0.5, 6 * BAR.s - 1, 35);
      }
      ctx.globalAlpha = a;
    }
    ctx.fillStyle = "#2a2d33";
    for (let v = 0; v <= 6; v++) ctx.fillRect(BAR.x + v * BAR.s, 664, 1, 6);
    ctx.fillRect(BAR.x, 664, 6 * BAR.s, 1);
    if (p1 > 0) {
      ctx.fillStyle = C.red[1];
      ctx.fillRect(BAR.x, 520, CR.costs.S2P2.drag * 100 * BAR.s * p1, 36);
    }
    if (p2 > 0) {
      ctx.fillStyle = K.mix(C.main[1], C.main[2], P.pulse(t, tActive25, 0.12, 0.9));
      ctx.fillRect(BAR.x, 610, 5.8 * BAR.s * p2, 36);
    }
    // 一个量级：右边一道括号把两根条连起来
    const pq = K.eo(K.prog(t, tScale25, tScale25 + 0.3));
    if (pq > 0) {
      ctx.strokeStyle = C.text;
      ctx.lineWidth = 1;
      ctx.globalAlpha = a * pq;
      const xb = 1620;
      P.poly(ctx, [[xb - 10, 538], [xb, 538], [xb, 628], [xb - 10, 628]], pq);
    }
  };

  // ================= G：全片论点和后面四章（第 26–27 句）=================
  const pT = K.panel(si, 240, 262, 1440, 330, C.main[1], "THESIS · 全片的结论");
  const th1 = P.say(si, 290, 330, 1340, 26, "扣完成本，没找到可靠的超额", '900 64px/80px "HF Sans", sans-serif');
  const th2 = P.say(si, 290, 450, 1340, 26, "看得见的那点优势，大头是早就有人研究过的风格", '700 40px/56px "HF Sans", sans-serif');
  const NEXT = ["02 先写规则，再看结果", "03 只开一次的 2025", "04 超额从哪来", "05 冻结之后"];
  const nextT = NEXT.map((s, i) => P.tile(si, 240 + i * 368, 632, 340, 72, s, null, 26));
  const upG = (t) => {
    const a = pT.up(t, t26, tEnd - 0.3, 0.3);
    P.vin(th1.el, a, a);
    P.vin(th2.el, a, a * K.prog(t, tSee26 - 0.2, tSee26));
    if (a > 0) {
      th1.paint(t);
      th2.paint(t);
      // “风格”两个字染冰蓝
      const n = th2.spans.length;
      for (const sp of th2.spans.slice(n - 2)) K.col(sp, P.lightCol(t, tStyle26, C.amb[2]));
    }
    const span = (tTrust27 - t27) / 4;
    nextT.forEach((c, i) => c.up(t, a * K.prog(t, t27 + i * 0.06, t27 + 0.25 + i * 0.06), t27 + 0.3 + i * span, C.main));
  };

  return (t) => {
    if (t < t14 + 0.4) upA(t);
    else upA(-1);
    if (t > t14 - 0.2 && t < t15 + 0.4) upB(t);
    else upB(-1);
    if (t > t15 - 0.2 && t < t17 + 0.4) upC(t);
    else upC(-1);
    if (t > t17 - 0.2 && t < t20 + 0.4) upD(t);
    else upD(-1);
    if (t > t20 - 0.2 && t < t22 + 0.4) {
      upE1(t);
      upE1c(t);
    } else {
      upE1(-1);
      upE1c(-1);
    }
    if (t > t22 - 0.2 && t < t24 + 0.4) upE2(t);
    else upE2(-1);
    if (t > t24 - 0.2 && t < t26 + 0.4) upF(t);
    else upF(-1);
    upG(t);
  };
});
