// 第 1 章 先把考场搭好（80.3–210.3 秒），逐句画面见 DESIGN.md「s1 先把考场搭好」。分六段：
// A 考场：4 步轨道、三种动作、只有提交算交卷、最多 4 步；右边“模型能看到的”清单（第 16–19 句）
// B 沙箱：只读、独立进程、30 秒、一万行；结果超上限截断判错（第 20–21 句）
// C 判分台：两边各跑一遍，比列数、行数、每一行的值；电话题多交一列判错；项目判分比官方严（第 22–26 句）
// D 按库切分、测试集 1534 − 33、1501 格记分板亮 743 格（第 27–31 句）
// E 三个种子、按库有放回抽 2000 次、区间和下界、三道线、事后挑的问题（第 32–37 句）
// F 论点：执行结果当筛子；每版先看还查不查（第 38–39 句）
K.scene("s1", (si, win) => {
  const C = K.C;
  const M = EFA.mainTask;
  const L = (n) => K.seg(n).t0 - 0.08;
  const at = (n, s, k = 1) => K.w(n, s, k) - 0.08;
  const vin = P.vin;
  const MONO = P.mono;
  const SANS = P.sans;
  const tEnd = win.t1;

  // ---- 时刻 ----
  const t16 = L(16);
  const tExam16 = at(16, "考场");
  const tCan16 = at(16, "能");
  const t17 = L(17);
  const tPick17 = at(17, "选");
  const tSch17 = at(17, "看表结构");
  const tQry17 = at(17, "试跑");
  const tFin17 = at(17, "提交");
  const t18 = L(18);
  const tSub18 = at(18, "交卷");
  const tAll18 = at(18, "连提交");
  const tMax18 = at(18, "4步");
  const t19 = L(19);
  const tQ19 = at(19, "问题");
  const tHint19 = at(19, "提示");
  const tDDL19 = at(19, "建表");
  const tGold19 = at(19, "标准答案");
  const t20 = L(20);
  const tRO20 = at(20, "只读");
  const tProc20 = at(20, "独立");
  const t30s = at(20, "30秒");
  const t10k = at(20, "一万");
  const t21 = L(21);
  const tOver21 = at(21, "超了");
  const tWrong21 = at(21, "就算错");
  const tHalf21 = at(21, "半截");
  const t22 = L(22);
  const tModel22 = at(22, "模型的");
  const tGold22 = at(22, "标准");
  const tRun22 = at(22, "各跑");
  const tCmp22 = at(22, "比两边");
  const t23 = L(23);
  const tCols23 = at(23, "列数");
  const tRows23 = at(23, "航数");
  const tVals23 = at(23, "航的值");
  const t24 = L(24);
  const tPhone24 = at(24, "电话");
  const tOut24 = at(24, "查出来");
  const tGoldAns24 = at(24, "标准答案");
  const tSame24 = at(24, "一模一样");
  const t25 = L(25);
  const tExtra25 = at(25, "多交");
  const tColsBad25 = at(25, "列数");
  const tWrong25 = at(25, "判错");
  const t26 = L(26);
  const tStrict26 = at(26, "还严");
  const tMain26 = at(26, "主比较");
  const tOff26 = at(26, "官方", 2);
  const t27 = L(27);
  const tDB27 = at(27, "数据库");
  const tCut27 = at(27, "切开");
  const tSame27 = at(27, "同一个");
  const tSet27 = at(27, "集合");
  const t28 = L(28);
  const tLearn28 = at(28, "学");
  const tSel28 = at(28, "选方案");
  const tVal28 = at(28, "验证");
  const tTest28 = at(28, "测试");
  const tAccept28 = at(28, "验收");
  const t29 = L(29);
  const tBird29 = at(29, "bird");
  const t1534 = at(29, "1534");
  const t30 = L(30);
  const t33 = at(30, "33");
  const tCant30 = at(30, "跑不出");
  const tDrop30 = at(30, "拿掉");
  const t31 = L(31);
  const t1501 = at(31, "1501");
  const tCell31 = at(31, "每题");
  const tOff31 = at(31, "官方");
  const t743 = at(31, "743");
  const t495 = at(31, "49.5%");
  const t32 = L(32);
  const tSeeds32 = at(32, "三个");
  const tExp32 = at(32, "探索");
  const t33s = L(33);
  const tByDB33 = at(33, "按库");
  const tDraw33 = at(33, "抽");
  const t2000 = at(33, "两千");
  const tAgain33 = at(33, "抽过");
  const tRange33 = at(33, "提升");
  const tLow33 = at(33, "最低");
  const tLB33 = at(33, "下界");
  const t34 = L(34);
  const tThree34 = at(34, "三道线");
  const tV07 = at(34, "零点七");
  const t35 = L(35);
  const tL1 = at(35, "大于零");
  const tL2 = at(35, "大于零", 2);
  const tL3 = at(35, "大于零", 3);
  const t36 = L(36);
  const tLock36 = at(36, "写死");
  const tGain36 = at(36, "提升");
  const tTwo36 = at(36, "两");
  const tWide36 = at(36, "区间");
  const t37 = L(37);
  const tStep37 = at(37, "挑步");
  const tMet37 = at(37, "指标");
  const tPick37 = at(37, "挑出");
  const tNice37 = at(37, "好看");
  const t38 = L(38);
  const tSieve38 = at(38, "当筛子");
  const tF1 = at(38, "筛训");
  const tF2 = at(38, "筛老师");
  const tF3 = at(38, "也筛");
  const t39 = L(39);
  const tHabit39 = at(39, "先查再交");
  const tGone39 = at(39, "训没");
  const tEach39 = at(39, "每一版");
  const tLook39 = at(39, "还查不查");

  // ---- HUD ----
  K.plans.push({
    t0: win.t0,
    t1: tEnd,
    chip: "01",
    chap: "先把考场搭好",
    lab: "THE EXAM ROOM · 考场",
    tele: (t) =>
      t < t20
        ? "▸ ACTIONS · SCHEMA / QUERY / FINISH · ≤ 4 STEPS"
        : t < t22
          ? "▸ READ-ONLY SQLITE · 1 PROCESS / SQL · 30 S · 10,000 ROWS"
          : t < t27
            ? "▸ JUDGE · COLUMNS · ROWS · VALUES · STRICTER THAN OFFICIAL EX"
            : t < t32
              ? "▸ SPLIT BY DB · 49 / 6 / 14 / 11 · TEST 1534 − 33 = 1501"
              : t < t38
                ? "▸ 3 SEEDS · DB BOOTSTRAP × 2,000 · v0.7+ PASS RULE"
                : "▸ FILTER BY EXECUTION · DATA · TEACHER · TASKS",
    titles: [
      { t: t16, text: "模型在考场里{能做什么}" },
      { t: t17, text: "只有{三种动作}" },
      { t: t18, text: "只有提交{算交卷}" },
      { t: tMax18, text: "最多 {4 步}" },
      { t: t19, text: "看得到题，{看不到答案}", color: C.amb[2] },
      { t: t20, text: "只读{沙箱}" },
      { t: t21, text: "超上限{就算错}", color: C.red[2] },
      { t: t22, text: "两边{各跑一遍}" },
      { t: t23, text: "列数、行数、{每一行的值}" },
      { t: t24, text: "回到{电话题}", color: C.amb[2] },
      { t: t25, text: "多交一列，{判错}", color: C.red[2] },
      { t: t26, text: "比官方{更严}" },
      { t: t27, text: "按{数据库}切开" },
      { t: t28, text: "学、选方案、{验收}" },
      { t: t29, text: "测试集：{1534} 道", color: C.amb[2] },
      { t: t30, text: "拿掉 {33} 道" },
      { t: t31, text: "{1501} 道，每题一格" },
      { t: t32, text: "三个{随机种子}" },
      { t: t33s, text: "按库{有放回地抽}" },
      { t: t34, text: "判成立：{三道线}" },
      { t: t36, text: "开跑之前{写死}" },
      { t: t37, text: "事后挑，{总能挑出}", color: C.red[2] },
      { t: t38, text: "执行结果{当筛子}" },
      { t: t39, text: "每版先看：{还查不查}" },
    ],
  });
  K.plates.push({ t0: win.t0 + 0.2, t1: t34, text: "PROTOCOL · ALL RUNS" });
  K.plates.push({ t0: t34, t1: tEnd, text: "PASS RULE · v0.7+" });

  // ================= A：考场（第 16–19 句）=================
  const aOut = t20 - 0.1;
  const pA = K.panel(si, 140, 230, 1120, 630, P.GRAY[2], "EXAM ROOM · 考场");
  const pV = K.panel(si, 1300, 230, 480, 630, P.GRAY[2], "VISIBLE · 模型能看到的");
  const cvA = P.layer(si);
  const RA = P.rail(si, 176, 292, 1048, [
    { a: "schema", t: tAll18 },
    { a: "query", t: tAll18 + 0.2 },
    { a: "query", t: tAll18 + 0.4 },
    { a: "finish", t: tAll18 + 0.6 },
  ]);
  const exA = P.tag(si, 1224, 446, "ILLUSTRATIVE · 示意");
  const maxA = P.tx(si, 176, 444, "最多 4 步 · 提交也算一步", SANS(26, 600), C.text);
  const ACTS = [
    ["SCHEMA", "看表结构", "→ 返回表的结构", tSch17],
    ["QUERY", "试跑一条查询", "→ 返回查询结果", tQry17],
    ["FINISH", "提交", "→ 交卷，拿去判分", tFin17],
  ];
  const cardX = [176, 540, 904];
  const CY = 508;
  const cards = ACTS.map(([en, zh, sub, tt], i) => ({
    tt,
    en: P.tx(si, cardX[i] + 24, CY + 22, en, MONO(34), C.text),
    zh: P.tx(si, cardX[i] + 24, CY + 68, zh, SANS(30), C.text),
    sub: P.tx(si, cardX[i] + 24, CY + 116, sub, P.MONO20, C.gray),
    tag: P.tag(si, cardX[i] + 324, CY + 16, i === 2 ? "交卷" : "不交卷", i === 2 ? C.text : P.GRAY[1]),
  }));
  const VIS = [
    ["问题", "Please list the phone numbers …", tQ19, false],
    ["提示", "EVIDENCE · Excellence rate = …", tHint19, false],
    ["建表语句 × 3", "CREATE TABLE satscores ( … )", tDDL19, false],
    ["标准答案", "GOLD SQL · 看不到", tGold19, true],
  ];
  const visRows = VIS.map(([k, s, tt, gold], i) => ({
    tt,
    gold,
    k: P.tx(si, 1330, 296 + i * 136, k, SANS(30), P.DIM),
    s: P.tx(si, 1330, 342 + i * 136, s, P.MONO20, P.DIM),
  }));
  const upA = (t) => {
    const a = pA.up(t, t16, aOut, 0.35);
    const av = pV.up(t, t16 + 0.4, aOut, 0.35);
    RA.up(t, a);
    K.vis(exA, a * K.prog(t, tAll18, tAll18 + 0.3));
    K.vis(maxA, a * K.prog(t, tMax18, tMax18 + 0.3));
    for (const c of cards) {
      const p = a * K.eo(K.prog(t, c.tt, c.tt + 0.3));
      K.vis(c.en, p);
      K.vis(c.zh, p);
      K.vis(c.sub, a * K.prog(t, c.tt + 0.2, c.tt + 0.5));
      K.vis(c.tag, a * K.prog(t, tSub18, tSub18 + 0.3));
    }
    for (const [i, r] of visRows.entries()) {
      K.vis(r.k, av);
      K.vis(r.s, av);
      const lit = Math.max(K.eo(K.prog(t, r.tt, r.tt + 0.3)), P.pulse(t, tCan16 + i * 0.12, 0.1, 0.4));
      K.col(r.k, K.mix(P.DIM, r.gold ? C.amb[2] : C.text, lit));
      K.col(r.s, K.mix(P.DIM, r.gold ? C.amb[1] : C.gray, lit));
    }
    if (!cvA.begin(Math.max(a, av))) return;
    const ctx = cvA.ctx;
    ctx.lineWidth = 1;
    for (let i = 0; i < 4; i++) {
      ctx.fillStyle = C.gray;
      ctx.globalAlpha = a * 0.46 * P.pulse(t, tExam16 + i * 0.14, 0.1, 0.4);
      ctx.fillRect(RA.sx(i) + 6, 322, RA.cw - 12, 94);
      ctx.globalAlpha = av * 0.42 * P.pulse(t, tCan16 + i * 0.12, 0.1, 0.4);
      ctx.fillRect(1324, 292 + i * 136, 432, 84);
    }
    // 三个动作位先摆虚线框，不然第 16 句时考场下半空着
    const tSlots = t16 + 0.7;
    if (t >= tSlots) {
      ctx.globalAlpha = a * K.prog(t, tSlots, tSlots + 0.3);
      cards.forEach((c, i) => {
        const p = K.eo(K.prog(t, c.tt, c.tt + 0.3));
        K.rr(ctx, cardX[i] + 0.5, CY + 0.5, 339, 159, 12);
        if (p <= 0) {
          ctx.setLineDash([6, 5]);
          ctx.strokeStyle = "#3a3e46";
          ctx.stroke();
          ctx.setLineDash([]);
          return;
        }
        ctx.fillStyle = "#14161c";
        ctx.fill();
        ctx.strokeStyle = K.mix("#2a2d33", "#5a5f68", p);
        ctx.stroke();
        if (i === 2 && t >= tSub18) {
          const g = K.eo(K.prog(t, tSub18, tSub18 + 0.3));
          ctx.save();
          ctx.shadowColor = "#ffffff";
          ctx.shadowBlur = 12 * g * (0.4 + 0.6 * (1 - K.prog(t, tSub18 + 0.3, tSub18 + 1.5)));
          ctx.strokeStyle = K.mix("#5a5f68", C.text, g);
          ctx.stroke();
          ctx.restore();
        }
      });
    }
    ctx.globalAlpha = av;
    visRows.forEach((r, i) => {
      const y = 296 + i * 136 + 22;
      if (i) {
        ctx.fillStyle = "#1f2229";
        ctx.fillRect(1326, 296 + i * 136 - 24, 430, 1);
      }
      if (t < r.tt) return;
      if (r.gold) P.lock(ctx, 1736, y, 40 * K.back(K.prog(t, r.tt, r.tt + 0.35)), C.amb[1]);
      else P.check(ctx, 1736, y, 30, C.text, K.eo(K.prog(t, r.tt, r.tt + 0.35)), 2.5);
    });
  };

  // ================= B：沙箱（第 20–21 句）=================
  const bOut = t22 - 0.1;
  const pSB = K.panel(si, 140, 230, 760, 630, P.GRAY[2], "SANDBOX · 沙箱");
  const pRW = K.panel(si, 940, 230, 840, 630, P.GRAY[2], "RESULT ROWS · 结果行数");
  const cvB = P.layer(si);
  const SBR = [
    ["只读", "READ-ONLY · 不能改库", tRO20],
    ["每条 SQL 一个独立进程", "1 SQL = 1 PROCESS", tProc20],
    ["30 秒", "TIMEOUT · 30 s", t30s],
    ["一万行封顶", "MAX ROWS · 10,000", t10k],
  ];
  const sbRows = SBR.map(([k, s, tt], i) => ({ tt, k: P.tx(si, 266, 296 + i * 136, k, SANS(32), P.DIM), s: P.tx(si, 266, 344 + i * 136, s, P.MONO20, P.DIM) }));
  const BK = { x: 1000, w: 300, y0: 820, cap: 380, top: 300 };
  const capLab = P.tx(si, 1340, BK.cap - 14, "10,000 行 · 上限", P.MONO20, C.gray);
  const rwLab = P.txr(si, 1750, 470, "ROWS · 行数", P.MONO20, C.gray);
  const rwNum = P.txr(si, 1750, 498, "", MONO(72), C.text);
  const truncLab = P.txr(si, 1750, 590, "超上限 · 截断", P.MONO24, C.red[2]);
  const wrongB = P.txr(si, 1750, 630, "判错", SANS(64, 900), C.red[2]);
  const halfLab = P.tx(si, 1340, 760, "截下来的半截 · 不判对", SANS(28, 600), C.gray);
  const upB = (t) => {
    const a = pSB.up(t, t20, bOut, 0.35);
    const ar = pRW.up(t, t20 + 0.3, bOut, 0.35);
    for (const r of sbRows) {
      K.vis(r.k, a);
      K.vis(r.s, a);
      K.col(r.k, P.lightCol(t, r.tt, C.text));
      K.col(r.s, P.lightCol(t, r.tt, C.gray));
    }
    K.vis(capLab, ar * K.prog(t, t10k, t10k + 0.3));
    K.col(capLab, t >= tOver21 ? C.red[2] : C.gray);
    K.vis(rwLab, ar);
    K.vis(rwNum, ar);
    if (t < tOver21) {
      K.put(rwNum, K.roll(t, t10k, 0.9, 0, 10000));
      K.col(rwNum, t < t10k ? P.DIM : C.text);
      rwNum.style.textShadow = "none";
    } else {
      K.put(rwNum, "10,000+");
      P.glow(rwNum, t, tOver21, C.red);
    }
    K.vis(truncLab, ar * K.prog(t, tOver21 + 0.3, tOver21 + 0.6));
    K.vis(wrongB, ar * K.prog(t, tWrong21, tWrong21 + 0.25));
    P.glow(wrongB, t, tWrong21, C.red);
    K.vis(halfLab, ar * K.prog(t, tHalf21, tHalf21 + 0.3));
    if (!cvB.begin(Math.max(a, ar))) return;
    const ctx = cvB.ctx;
    // 左边每行一个图标
    ctx.globalAlpha = a;
    sbRows.forEach((r, i) => {
      const lit = K.eo(K.prog(t, r.tt, r.tt + 0.3));
      const col = K.mix("#3a3e46", C.text, lit);
      const x = 200;
      const y = 296 + i * 136 + 30;
      if (i) {
        ctx.fillStyle = "#1f2229";
        ctx.fillRect(176, 296 + i * 136 - 24, 690, 1);
      }
      ctx.strokeStyle = col;
      ctx.fillStyle = col;
      ctx.lineWidth = 1.5;
      if (i === 0) P.lock(ctx, x, y, 40, col);
      else if (i === 1)
        for (let k = 0; k < 3; k++) {
          ctx.strokeRect(x - 26 + k * 18 + 0.5, y - 8 + 0.5, 13, 13);
          if (lit > 0) ctx.fillRect(x - 23 + k * 18, y - 5, 8, 8);
        }
      else if (i === 2) {
        ctx.beginPath();
        ctx.arc(x, y, 17, 0, 6.283);
        ctx.stroke();
        // 指针从“独立进程”转到“30 秒”，转满一圈
        const sw = K.prog(t, tProc20, t30s + 0.2);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 13 * Math.sin(sw * 6.283), y - 13 * Math.cos(sw * 6.283));
        ctx.stroke();
      } else for (let k = 0; k < 4; k++) ctx.fillRect(x - 18, y - 12 + k * 8, 36, 3);
    });
    // 右边：一根根结果行往上堆，到上限线为止；超了的部分红粉
    ctx.globalAlpha = ar;
    ctx.strokeStyle = "#3a3e46";
    ctx.lineWidth = 1;
    ctx.strokeRect(BK.x + 0.5, BK.top + 0.5, BK.w - 1, BK.y0 - BK.top);
    const nCap = Math.floor((BK.y0 - BK.cap) / 4);
    const nOver = Math.floor((BK.cap - BK.top) / 4) - 1;
    const n = Math.floor(nCap * K.prog(t, t10k, t10k + 0.9)) + Math.floor(nOver * K.prog(t, tOver21, tOver21 + 0.6));
    const half = K.prog(t, tHalf21, tHalf21 + 0.4);
    for (let k = 0; k < n; k++) {
      const over = k >= nCap;
      ctx.fillStyle = over ? C.red[1] : half > 0 ? K.mix("#8a8f98", "#3a3e46", half) : "#8a8f98";
      ctx.fillRect(BK.x + 12, BK.y0 - 6 - k * 4, BK.w - 34 - 40 * K.hash(k, 3), 1);
    }
    if (t >= t10k) {
      ctx.fillStyle = t >= tOver21 ? C.red[1] : C.text;
      ctx.fillRect(BK.x - 14, BK.cap, BK.w + 28, 2);
    }
    // 半截结果：斜线划掉
    if (half > 0) {
      ctx.strokeStyle = K.rgba(C.red[1], 0.8 * half);
      ctx.beginPath();
      ctx.moveTo(BK.x + 8, BK.y0 - 8);
      ctx.lineTo(BK.x + 8 + (BK.w - 16) * half, BK.y0 - 8 - (BK.y0 - BK.cap - 16) * half);
      ctx.stroke();
    }
    if (t >= tWrong21) P.cross(ctx, 1586, 668, 40, C.red[2], K.eo(K.prog(t, tWrong21, tWrong21 + 0.3)), 4);
  };

  // ================= C：判分台（第 22–26 句）=================
  const cOut = t27 - 0.1;
  const pJ = K.panel(si, 140, 230, 1640, 630, P.GRAY[2], "JUDGE · 判分");
  const pMS = K.panel(si, 176, 276, 600, 150, P.GRAY[2], "MODEL SQL · 模型的 SQL");
  const pGS = K.panel(si, 1144, 276, 600, 150, C.amb[1], "GOLD SQL · 标准 SQL");
  pGS.lab.style.color = C.amb[1];
  const pPJ = K.panel(si, 176, 712, 760, 128, C.main[1], "PROJECT · 项目判分");
  const pOE = K.panel(si, 984, 712, 760, 128, P.GRAY[2], "OFFICIAL EX · 官方");
  pPJ.lab.style.color = C.main[1];
  const pjT = P.tx(pPJ.el, 26, 50, "列数、行数、每一行都要对上", SANS(28, 600), C.text);
  const pjN = P.tx(pPJ.el, 26, 92, "同一个原版在测试集：680 道对", P.MONO20, C.gray);
  const oeT = P.tx(pOE.el, 26, 50, "两边的行，按集合比", SANS(28, 600), C.text);
  const oeN = P.tx(pOE.el, 26, 92, "同一个原版在测试集：743 道对", P.MONO20, C.gray);
  const mainB = P.tag(pPJ.el, 734, 14, "MAIN · 主比较", C.main[2]);
  const alsoB = P.tag(pOE.el, 734, 14, "ALSO · 另外列出", C.gray);
  const cvC = P.layer(si);
  const SQLB = ["SELECT s.Phone, (satscores.NumGE1500 * 1.0", "  / satscores.NumTstTakr) AS ExcellenceRate", "FROM satscores JOIN schools s ON …", "ORDER BY ExcellenceRate DESC LIMIT 3"];
  const sqlL = SQLB.map((s, i) => P.tx(si, 200, 318 + i * 26, s, P.MONO20, C.text));
  const goldNote = P.tx(si, 1168, 392, "判分时才跑 · 模型看不到", P.MONO20, C.gray);
  const qTag = P.tag(si, 960, 236, "bird-dev:13 · 电话题", C.amb[1]);
  qTag.style.transform = "translateX(-50%)";
  const TBm = P.table(si, 176, 470, M.b[0].cols, M.b[0].rows, { widths: [250, 250] });
  const TBg = P.table(si, 1184, 470, ["Phone"], M.rlb[0].rows, { widths: [260], head: C.amb[1] });
  const CHK = [
    ["列数", tCols23, "2 ≠ 1", C.red[2]],
    ["行数", tRows23, "3 = 3", C.text],
    ["每一行的值", tVals23, "—", C.gray],
  ];
  const chk = CHK.map(([k, tt, v, vc], i) => ({ tt, vc, k: P.tx(si, 852, 290 + i * 44, k, SANS(28, 600), P.DIM), v: P.txr(si, 1104, 293 + i * 44, v, P.MONO24, vc) }));
  const stampC = P.ctr(si, 960, 630, "判错", SANS(64, 900), C.red[2]);
  const runM = P.tx(si, 492, 434, "RUN ▸ SANDBOX", P.MONO20, C.gray);
  const runG = P.tx(si, 1330, 434, "RUN ▸ SANDBOX", P.MONO20, C.amb[1]);
  // 结果表出来之前的骨架：格子里是灰条。第 23 句按列、按行、逐行各扫一遍；side 只用来错开灰条长短
  const skel = (ctx, T, x, y, A, t, side) => {
    if (A <= 0.002) return;
    const ga = ctx.globalAlpha;
    ctx.globalAlpha = ga * A;
    ctx.strokeStyle = "#3a3e46";
    ctx.strokeRect(x + 0.5, y + 0.5, T.W - 1, T.H - 1);
    ctx.fillStyle = "#3a3e46";
    ctx.fillRect(x, y + T.rh, T.W, 1);
    ctx.fillStyle = "#1f2229";
    for (let i = 2; i <= 3; i++) ctx.fillRect(x, y + i * T.rh, T.W, 1);
    T.xs.forEach((cx, j) => {
      const cw = (j + 1 < T.xs.length ? T.xs[j + 1] : T.W) - cx;
      if (j) {
        ctx.fillStyle = "#1f2229";
        ctx.fillRect(x + cx, y, 1, T.H);
      }
      ctx.fillStyle = "#4a4f58";
      ctx.fillRect(x + cx + 14, y + 16, cw * (0.32 + 0.2 * K.hash(j + 1, side)), 8);
      for (let i = 0; i < 3; i++) {
        const v = P.pulse(t, tVals23 + 0.3 * i, 0.1, 0.7);
        ctx.fillStyle = K.mix("#2a2d33", "#c9c4bb", v);
        ctx.fillRect(x + cx + 14, y + (i + 1) * T.rh + 20, cw * (0.42 + 0.3 * K.hash(i + 3 * j + 1, side + 5)), 8);
      }
      const c = P.pulse(t, tCols23 + 0.2 * j, 0.12, 0.9);
      if (c > 0) {
        ctx.strokeStyle = K.rgba("#ffffff", 0.85 * c);
        ctx.lineWidth = 2;
        ctx.strokeRect(x + cx + 3, y + 3, cw - 6, T.H - 6);
        ctx.lineWidth = 1;
      }
    });
    ctx.font = '600 18px "HF Mono", monospace';
    ctx.textBaseline = "middle";
    for (let i = 0; i < 3; i++) {
      const r = P.pulse(t, tRows23 + 0.2 * i, 0.12, 0.9);
      const lit = K.prog(t, tRows23 + 0.2 * i, tRows23 + 0.2 * i + 0.2);
      ctx.fillStyle = K.mix("#3a3e46", "#8a8f98", lit);
      ctx.fillText(String(i + 1), x - 22, y + (i + 1) * T.rh + 24);
      if (r > 0) {
        ctx.strokeStyle = K.rgba("#ffffff", 0.85 * r);
        ctx.lineWidth = 2;
        ctx.strokeRect(x + 3, y + (i + 1) * T.rh + 3, T.W - 6, T.rh - 4);
        ctx.lineWidth = 1;
      }
    }
    ctx.globalAlpha = ga;
  };
  const upC = (t) => {
    const a = pJ.up(t, t22, cOut, 0.35);
    const fade = 1 - 0.75 * K.eo(K.prog(t, t26, t26 + 0.4));
    const am = pMS.up(t, tModel22, cOut, 0.35, fade);
    const ag = pGS.up(t, tGold22, cOut, 0.35, fade);
    const ap = pPJ.up(t, t26 + 0.1, cOut, 0.35);
    const ao = pOE.up(t, tStrict26, cOut, 0.35);
    vin(mainB, ap, K.prog(t, tMain26, tMain26 + 0.3));
    vin(alsoB, ao, K.prog(t, tOff26, tOff26 + 0.3));
    vin(pjN, ap, K.prog(t, tStrict26 + 0.3, tStrict26 + 0.6));
    vin(oeN, ao, K.prog(t, tStrict26 + 0.3, tStrict26 + 0.6));
    sqlL.forEach((e, i) => K.vis(e, am * K.prog(t, tPhone24 + 0.1 * i, tPhone24 + 0.1 * i + 0.25)));
    K.vis(goldNote, ag * K.prog(t, tGold22 + 0.3, tGold22 + 0.6));
    K.vis(runM, a * fade * K.prog(t, tRun22 + 0.2, tRun22 + 0.5) * (1 - K.prog(t, tOut24, tOut24 + 0.3)));
    K.vis(runG, a * fade * K.prog(t, tRun22 + 0.2, tRun22 + 0.5) * (1 - K.prog(t, tGoldAns24, tGoldAns24 + 0.3)));
    K.vis(qTag, a * fade * K.prog(t, tPhone24, tPhone24 + 0.3));
    TBm.up(t, a * fade, tOut24, { red: { cols: [1], t: tExtra25 } });
    TBg.up(t, a * fade, tGoldAns24);
    chk.forEach((c, i) => {
      K.vis(c.k, a * fade);
      K.col(c.k, P.lightCol(t, c.tt, C.text));
      const tv = tColsBad25 + 0.25 * i;
      K.vis(c.v, a * fade * K.prog(t, tv, tv + 0.25));
      if (i === 0) P.glow(c.v, t, tv, C.red);
    });
    K.vis(stampC, a * fade * K.prog(t, tWrong25, tWrong25 + 0.2));
    if (t >= tWrong25) K.tf(stampC, `translateX(-50%) scale(${(1.25 - 0.25 * K.eo(K.prog(t, tWrong25, tWrong25 + 0.25))).toFixed(3)})`);
    if (!cvC.begin(a)) return;
    const ctx = cvC.ctx;
    ctx.globalAlpha = a * fade;
    ctx.lineWidth = 1;
    // 电话题之前：两段 SQL 用灰条占位，标准 SQL 一直是琥珀色的遮挡条
    if (t < tPhone24 && am > 0) {
      ctx.globalAlpha = am;
      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = "#2a2d33";
        ctx.fillRect(200, 326 + i * 22, [420, 360, 300, 380][i], 8);
      }
    }
    if (ag > 0) {
      ctx.globalAlpha = ag;
      for (let i = 0; i < 2; i++) {
        ctx.fillStyle = K.rgba(C.amb[1], 0.45);
        ctx.fillRect(1168, 326 + i * 24, [440, 360][i], 10);
      }
    }
    ctx.globalAlpha = a * fade;
    // 各跑一遍：两根往下的箭头；结果表出来之前先摆空框
    const pr = K.eo(K.prog(t, tRun22, tRun22 + 0.35));
    if (pr > 0) {
      P.arrow(ctx, 476, 432, 476, 432 + 32 * pr, "#8a8f98", 7);
      P.arrow(ctx, 1314, 432, 1314, 432 + 32 * pr, C.amb[1], 7);
      const sk = K.eo(K.prog(t, tRun22 + 0.2, tRun22 + 0.6));
      skel(ctx, TBm, 176, 470, sk * (1 - K.prog(t, tOut24, tOut24 + 0.3)), t, 1);
      skel(ctx, TBg, 1184, 470, sk * (1 - K.prog(t, tGoldAns24, tGoldAns24 + 0.3)), t, 2);
      // 逐行比值：两张表同一行之间拉一根虚线
      if (t < tOut24)
        for (let i = 0; i < 3; i++) {
          const v = P.pulse(t, tVals23 + 0.3 * i, 0.1, 0.7);
          if (v <= 0) continue;
          const y = 470 + (i + 1) * 40 + 24;
          ctx.strokeStyle = K.rgba(C.text, 0.7 * v);
          ctx.setLineDash([5, 4]);
          ctx.beginPath();
          ctx.moveTo(690, y);
          ctx.lineTo(1170, y);
          ctx.stroke();
          ctx.setLineDash([]);
        }
    }
    // 比两边：中间的比较栏
    const pc = K.eo(K.prog(t, tCmp22, tCmp22 + 0.3));
    if (pc > 0) {
      ctx.strokeStyle = K.rgba("#5a5f68", pc);
      K.rr(ctx, 820.5, 276.5, 303, 149, 12);
      ctx.stroke();
      // 每一项前面一个小示意：列、行、格
      chk.forEach((c, i) => {
        const lit = K.eo(K.prog(t, c.tt, c.tt + 0.3));
        ctx.fillStyle = K.mix("#3a3e46", C.text, lit);
        const x = 836;
        const y = 300 + i * 44;
        if (i === 0) for (let k = 0; k < 3; k++) ctx.fillRect(x - 6 + k * 5, y - 8, 2, 18);
        else if (i === 1) for (let k = 0; k < 3; k++) ctx.fillRect(x - 6, y - 7 + k * 6, 13, 2);
        else for (let k = 0; k < 4; k++) ctx.fillRect(x - 6 + (k % 2) * 7, y - 7 + Math.floor(k / 2) * 7, 5, 5);
      });
    }
    // 电话一模一样：三根连线
    const ps = K.eo(K.prog(t, tSame24, tSame24 + 0.45));
    if (ps > 0)
      for (let i = 0; i < 3; i++) {
        const y = 470 + (i + 1) * 40 + 20;
        ctx.strokeStyle = K.rgba(C.text, 0.75);
        ctx.beginPath();
        ctx.moveTo(682, y);
        ctx.lineTo(682 + (1178 - 682) * ps, y);
        ctx.stroke();
        ctx.fillStyle = C.text;
        ctx.beginPath();
        ctx.arc(682, y, 3, 0, 6.283);
        ctx.fill();
        if (ps >= 1) {
          ctx.beginPath();
          ctx.arc(1178, y, 3, 0, 6.283);
          ctx.fill();
        }
      }
    if (t >= tWrong25) P.cross(ctx, 860, 668, 44, C.red[2], K.eo(K.prog(t, tWrong25, tWrong25 + 0.3)), 4);
  };

  // ================= D：按库切分、测试集、记分板（第 27–31 句）=================
  // 第 27–28 句用大布局占满面板（方块 40、库组底对齐、字在块下面）；第 29 句开头缩成小布局（方块 22、字在块右边），给下面的测试集让位
  const pD = K.panel(si, 140, 230, 1640, 630, P.GRAY[2], "SPLIT BY DATABASE · 按库切分");
  const cvD = P.layer(si);
  const GRP = [
    { n: 49, cols: 7, x: 190, xb: 200, name: "训练题", cnt: "49 库 · 6,682 题", role: "学", tr: tLearn28 },
    { n: 6, cols: 2, x: 690, xb: 760, name: "开发集", cnt: "6 库 · 615 题", role: "选方案", tr: tSel28 },
    { n: 14, cols: 2, x: 1050, xb: 1080, name: "验证集", cnt: "14 库 · 1,612 题", role: "验收", tr: tVal28 },
    { n: 11, cols: 2, x: 1410, xb: 1400, name: "测试集", cnt: "11 库 · 1,534 题", role: "验收", tr: tTest28 },
  ];
  const SQ = 22;
  const SP = 28;
  const SY = 282;
  const SQb = 40;
  const SPb = 50;
  const YB = 650;
  const LBS = 1.25;
  const sqs = [];
  GRP.forEach((g, gi) => {
    g.rows = Math.ceil(g.n / g.cols);
    g.yb = YB - g.rows * SPb;
    for (let i = 0; i < g.n; i++) {
      const c = i % g.cols;
      const r = Math.floor(i / g.cols);
      sqs.push({ gi, x: g.x + c * SP, y: SY + r * SP, xb: g.xb + c * SPb, yb: g.yb + r * SPb, h: K.hash(gi * 9.1, i * 2.3) });
    }
    const lx = g.x + g.cols * SP + 20;
    g.ls = [
      [lx, SY + 4, g.xb, 668],
      [lx, SY + 46, g.xb, 716],
      [lx, SY + 90, g.xb, 752],
    ];
    g.l1 = P.tx(si, lx, SY + 4, g.name, SANS(28), C.text);
    g.l2 = P.tx(si, lx, SY + 46, g.cnt, P.MONO20, C.gray);
    g.l3 = P.tx(si, lx, SY + 90, g.role, SANS(28, 600), P.DIM);
    for (const e of [g.l1, g.l2, g.l3]) e.style.transformOrigin = "0 0";
  });
  // 切开之前 80 个库混在一起：20 列 × 4 行，按随机顺序
  [...sqs].sort((p, q) => p.h - q.h).forEach((s, m) => {
    s.mx = 460 + (m % 20) * SPb;
    s.my = 380 + Math.floor(m / 20) * SPb;
  });
  const birdTag = P.tag(si, GRP[3].x + GRP[3].cols * SP + 20, SY + 140, "BIRD DEV · 官方公开", C.amb[1], true);
  const sameLab = P.tx(si, 176, 812, "同一个库的题，只在一个集合里", SANS(24, 500), C.gray);
  // z：0 是大布局，1 是小布局
  const zoomD = (t) => K.eio(K.prog(t, t29 - 0.15, t29 + 0.5));
  const sqAt = (s, t, z) => {
    const p = K.eio(K.prog(t, tCut27 + 0.25 * s.h, tCut27 + 0.25 * s.h + 0.5));
    return [K.lerp(K.lerp(s.mx, s.xb, p), s.x, z), K.lerp(K.lerp(s.my, s.yb, p), s.y, z), K.lerp(SQb, SQ, z)];
  };
  // 测试集 1534 格：118 列 × 13 行
  const TG = { x: 193, y: 610, cols: 118, cell: 10, pitch: 13 };
  const cntT = P.tx(si, 193, 556, "", MONO(40), C.text);
  const cntS = P.tx(si, 470, 566, "BIRD 官方公开的测试题", P.MONO20, C.amb[1]);
  const removed = [...Array(1534).keys()]
    .map((i) => [K.hash(i * 1.37, 7.7), i])
    .sort((p, q) => p[0] - q[0])
    .slice(0, 33)
    .map((p) => p[1]);
  const remIdx = new Map(removed.map((v, j) => [v, j]));
  const PILES = [
    { n: 19, x: 380, lab: "19 · 结果超过一万行" },
    { n: 12, x: 860, lab: "12 · 用了 CURRENT_TIMESTAMP" },
    { n: 2, x: 1380, lab: "2 · 超时" },
  ];
  const pileOf = [];
  PILES.forEach((p, pi) => {
    for (let k = 0; k < p.n; k++) pileOf.push({ pi, x: p.x + (k % 7) * 13, y: 806 + Math.floor(k / 7) * 13 });
    p.e = P.tx(si, p.x + 104, 802, p.lab, SANS(24, 600), C.gray);
  });
  // 记分板（一直留到第 33 句）
  const BD = P.board(si, 147, 520);
  BD.set("bEx", t743, 0.9);
  const bdTag = P.tag(si, 147, 236, "OFFICIAL EX · 官方 · 原版", C.gray, true);
  const bdN = P.tx(si, 147, 276, "", MONO(120), C.main[1]);
  const bdS = P.tx(si, 520, 340, "/ 1501", MONO(48, 600), C.gray);
  const bdP = P.txr(si, 1773, 276, "49.5%", MONO(120), C.main[1]);
  const upD = (t) => {
    const aP = pD.up(t, t27, t1501, 0.4);
    const z = zoomD(t);
    pD.el.style.height = K.lerp(630, 300, z).toFixed(1) + "px";
    const lsc = `scale(${K.lerp(LBS, 1, z).toFixed(4)})`;
    GRP.forEach((g) => {
      const p = aP * K.prog(t, tCut27 + 0.4, tCut27 + 0.8);
      [g.l1, g.l2, g.l3].forEach((e, k) => {
        const q = g.ls[k];
        K.at(e, K.lerp(q[2], q[0], z), K.lerp(q[3], q[1], z));
        K.tf(e, lsc);
      });
      K.vis(g.l1, p);
      K.vis(g.l2, p);
      K.vis(g.l3, aP * K.prog(t, g.tr, g.tr + 0.3));
      K.col(g.l3, P.lightCol(t, g.tr, C.main[2]));
    });
    K.vis(birdTag, aP * K.prog(t, tBird29, tBird29 + 0.3));
    K.vis(sameLab, aP * K.prog(t, tSame27, tSame27 + 0.3));
    K.at(sameLab, K.lerp(176, 190, z), K.lerp(812, 494, z));
    const aT = P.win(t, t1534, t1501, 0.3, 0.4);
    K.vis(cntT, aT);
    K.vis(cntS, aT);
    K.put(cntT, t < tDrop30 ? K.roll(t, t1534, 0.6, 0, 1534) : "1,534 − 33");
    for (const p of PILES) K.vis(p.e, aT * K.prog(t, tCant30 + 0.6, tCant30 + 0.9) * (1 - 0.35 * K.prog(t, tDrop30, tDrop30 + 0.4)));
    const aB = P.win(t, t1501, t34 - 0.1, 0.4, 0.35);
    // 第 33 句抽考卷时，被抽中的库亮、其余压暗
    const drawn = bootDrawn(t);
    BD.up(t, aB, {
      ring: K.prog(t, t743 + 1, t743 + 1.3),
      blockA: drawn ? (k) => (drawn.has(k) ? 1 : 0.22) : null,
      over: t >= tCell31 && t < tCell31 + 1.2 ? cellSweep(t) : null,
    });
    // 念到 743 之前，上面先摆总题数 1,501，免得记分板上方空着
    K.vis(bdTag, aB * K.prog(t, t1501 + 0.3, t1501 + 0.6) * (1 - K.prog(t, t32, t32 + 0.3)));
    K.put(bdTag, t < tOff31 ? "TEST · 1,534 − 33 · 每题一格" : "OFFICIAL EX · 官方 · 原版");
    const aN = aB * (1 - K.prog(t, t32, t32 + 0.3));
    const pre = t < t743;
    K.vis(bdN, aN * (pre ? K.prog(t, t1501 + 0.3, t1501 + 0.6) : 1));
    K.put(bdN, pre ? "1,501" : K.roll(t, t743, 0.9, 0, 743));
    P.glow(bdN, t, t743 + 0.9, C.main);
    if (pre) K.col(bdN, C.text);
    K.vis(bdS, aN * K.prog(t, t743 + 0.3, t743 + 0.6));
    K.vis(bdP, aN * K.prog(t, t495, t495 + 0.2));
    P.glow(bdP, t, t495, C.main);
    if (!cvD.begin(Math.max(aP, aT))) return;
    const ctx = cvD.ctx;
    // 80 个库：先混在一起，念到“切开”时飞回各自的集合
    if (t >= tDB27) {
      ctx.globalAlpha = aP * K.prog(t, tDB27, tDB27 + 0.3);
      for (const s of sqs) {
        const [x, y, w] = sqAt(s, t, z);
        const g = GRP[s.gi];
        const lit = K.eo(K.prog(t, g.tr, g.tr + 0.3));
        ctx.fillStyle = s.gi === 3 && t >= tBird29 ? K.mix("#2a2d33", C.amb[0], K.prog(t, tBird29, tBird29 + 0.3)) : K.mix("#2a2d33", "#3a3e46", lit);
        const testFlash = s.gi === 3 ? P.pulse(t, tTest28, 0.12, 0.65) : 0;
        if (testFlash > 0) ctx.fillStyle = K.mix("#3a3e46", C.gray, testFlash);
        ctx.fillRect(x, y, w, w);
        ctx.strokeStyle = s.gi === 3 && t >= tBird29 ? C.amb[1] : K.mix("#4a4f58", "#8a8f98", lit);
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 0.5, y + 0.5, w - 1, w - 1);
      }
      // 每个集合一个虚线框
      const pf = K.eo(K.prog(t, tSet27, tSet27 + 0.3));
      if (pf > 0)
        GRP.forEach((g) => {
          const sp = K.lerp(SPb, SP, z);
          const sq = K.lerp(SQb, SQ, z);
          ctx.globalAlpha = aP * pf;
          P.dashRect(ctx, K.lerp(g.xb, g.x, z) - 8, K.lerp(g.yb, SY, z) - 8, (g.cols - 1) * sp + sq + 16, (g.rows - 1) * sp + sq + 16, "#8a8f98", 6);
        });
      // “同一个库”：每个集合里亮一格
      const pu = P.pulse(t, tSame27, 0.12, 0.9);
      if (pu > 0) {
        ctx.globalAlpha = aP * pu;
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        GRP.forEach((g, gi) => {
          const [x, y, w] = sqAt(sqs.find((q) => q.gi === gi), t, z);
          ctx.strokeRect(x - 2, y - 2, w + 4, w + 4);
        });
      }
    }
    for (const g of GRP.slice(2)) {
      ctx.globalAlpha = aP * 0.48 * P.pulse(t, tAccept28, 0.12, 0.65);
      ctx.fillStyle = C.main[1];
      ctx.fillRect(K.lerp(g.xb, g.ls[2][0], z) - 8, K.lerp(750, SY + 88, z), 176, 50);
    }
    if (aT <= 0.002) return;
    // 测试集 1534 格：逐列铺开；33 格先变白，再飞到下面三堆
    ctx.globalAlpha = aT;
    const sweep = K.prog(t, t1534, t1534 + 0.7);
    for (let i = 0; i < 1534; i++) {
      const c = i % TG.cols;
      if (c / TG.cols > sweep) continue;
      const x0 = TG.x + c * TG.pitch;
      const y0 = TG.y + Math.floor(i / TG.cols) * TG.pitch;
      const j = remIdx.get(i);
      if (j == null) {
        ctx.fillStyle = "#2a2d33";
        ctx.fillRect(x0, y0, TG.cell, TG.cell);
        continue;
      }
      const w = K.prog(t, t33 + 0.012 * j, t33 + 0.012 * j + 0.2);
      const f = K.eio(K.prog(t, tCant30 + 0.015 * j, tCant30 + 0.015 * j + 0.6));
      const dst = pileOf[j];
      ctx.fillStyle = w > 0 ? K.mix("#2a2d33", "#c9c4bb", w) : "#2a2d33";
      ctx.globalAlpha = aT * (1 - 0.55 * K.prog(t, tDrop30, tDrop30 + 0.4) * f);
      ctx.fillRect(K.lerp(x0, dst.x, f), K.lerp(y0, dst.y, f), TG.cell, TG.cell);
      if (f > 0 && f < 1) {
        ctx.strokeStyle = K.rgba("#5a5f68", 0.6);
        ctx.strokeRect(x0 + 0.5, y0 + 0.5, TG.cell - 1, TG.cell - 1);
      }
      ctx.globalAlpha = aT;
    }
  };
  // “每题一格”：一道白边从左往右扫过记分板
  const cellSweep = (t) => {
    const u = K.prog(t, tCell31, tCell31 + 0.9);
    return (cl) => {
      const x = cl.x / BD.W;
      return x <= u && x > u - 0.08 ? "rgba(236,230,220,0.85)" : null;
    };
  };

  // ================= E：三个种子、按库重抽、区间、三道线、事后挑（第 32–37 句）=================
  const cvE = P.layer(si);
  const seedL = [42, 43, 44].map((s, i) => P.tx(si, 147, 250 + i * 64, "SEED " + s, MONO(26, 700), C.text));
  const seedE = [42, 43, 44].map((s, i) => P.tx(si, 1084, 252 + i * 64, "一个模型", SANS(24, 600), C.gray));
  const expTag = P.tag(si, 1773, 248, "EXPLORATORY · 探索", C.gray);
  const expT = P.tx(si, 1212, 330, "只跑一个种子，另算", SANS(30, 600), C.gray);
  const expS = P.tx(si, 1212, 378, "不进主比较 · 不算成立", P.MONO20, P.DIM);
  // 一套考卷：11 个空位，每次从 11 个库里有放回地抽
  const SLX = (j) => 160 + j * 84;
  const slotHead = P.tx(si, 160, 238, "一套考卷 · 从 11 个库里有放回地抽 11 次", P.MONO20, C.gray);
  const slotT = Array.from({ length: 11 }, (_, j) => P.ctr(si, SLX(j) + 36, 292, "", MONO(26, 700), C.text));
  const dupT = Array.from({ length: 11 }, (_, j) => P.ctr(si, SLX(j) + 36, 346, "", P.MONO20, C.main[2]));
  const bootN = P.txr(si, 1084, 396, "", MONO(40), C.text);
  const bootL = P.tx(si, 160, 404, "按库重抽 · 95% 区间", P.MONO20, C.gray);
  const histTag = P.tag(si, 1773, 236, "ILLUSTRATIVE · 示意");
  const histLB = P.ctr(si, 0, 452, "下界", SANS(26, 700), C.main[2]);
  const histZ = P.ctr(si, 0, 452, "0", P.MONO20, C.gray);
  const DRAWS = 40;
  const drawAt = (t) => {
    if (t < tDraw33 || t >= t34 - 0.1) return -1;
    // 前几套慢一点，念到“两千”以后加速，念到“抽过”时停在第 5 套（有重复的库）
    if (t >= tAgain33) return 4;
    if (t < t2000 + 0.2) return Math.min(4, Math.floor((t - tDraw33) / 0.18));
    return 5 + (Math.floor((t - t2000 - 0.2) / 0.07) % (DRAWS - 5));
  };
  const drawSet = (d) => Array.from({ length: 11 }, (_, j) => Math.floor(K.hash(d * 3.1 + 1, j * 5.7) * 11));
  const bootDrawn = (t) => {
    const d = drawAt(t);
    return d < 0 ? null : new Set(drawSet(d));
  };
  // 示意的 2000 次重抽：以 +2.6 为中心、标准差 1.02 的钟形（和第 35 句举的例子同一组数）
  const HB = { x: 1180, y: 450, w: 593, min: -2, max: 7, bins: 36 };
  const HX = (v) => HB.x + ((v - HB.min) / (HB.max - HB.min)) * HB.w;
  const pdf = (v) => Math.exp(-0.5 * ((v - 2.6) / 1.02) ** 2);
  // 三道线
  const pRule = K.panel(si, 140, 230, 840, 420, P.GRAY[2], "PASS RULE · 判定线 · v0.7 起");
  const pCI = K.panel(si, 1020, 230, 760, 420, P.GRAY[2], "EXAMPLE · v0.11 · 边界题 RL − 离线起点");
  const pPick = K.panel(si, 140, 680, 1640, 184, P.GRAY[2], "IF YOU PICK AFTERWARDS · 事后挑");
  // 第 34–36 句下面一条：8 个正式版本，v0.7 起每版三格，念到哪道线亮哪格；念到“写死”时每版上锁。第 37 句换成事后挑
  const pVer = K.panel(si, 140, 680, 1640, 184, P.GRAY[2], "APPLIES TO · 照三道线判的版本");
  const cvE2 = P.layer(si);
  const VERS = ["v0.3", "v0.5", "v0.7", "v0.8", "v0.9", "v0.10", "v0.11", "v0.12"];
  const VRX = (i) => 440 + i * 162;
  const VRY = 728;
  const verA = P.tx(si, 176, 736, "从 v0.7 起", SANS(30, 800), C.text);
  const verB = P.tx(si, 176, 784, "每版三道线", SANS(24, 600), C.gray);
  const verN = VERS.map((v, i) => P.ctr(si, VRX(i) + 74, VRY + 14, v, MONO(26, 700), i < 2 ? P.DIM : C.text));
  const verX = VERS.slice(0, 2).map((v, i) => P.ctr(si, VRX(i) + 74, VRY + 54, "—", P.MONO20, P.DIM));
  const RULES = [
    ["测试集上，平均提升 > 0", "TEST · MEAN > 0", tL1],
    ["测试集上，区间下界 > 0", "TEST · LOWER BOUND > 0", tL2],
    ["验证集上，平均提升 > 0", "VALIDATION · MEAN > 0", tL3],
  ];
  const rules = RULES.map(([k, s, tt], i) => ({ tt, k: P.tx(si, 230, 296 + i * 104, k, SANS(32), P.DIM), s: P.tx(si, 230, 342 + i * 104, s, P.MONO20, P.DIM) }));
  const lockT = P.tx(si, 230, 604, "开跑之前写死 · PRE-REGISTERED", MONO(22, 600), C.text);
  const CIX = { x: 1080, y: 318, w: 640 };
  const CIe = P.ci(si, CIX.x, CIX.y, CIX.w, { m: 2.6, lo: 0.7, hi: 4.7 }, { min: -2, max: 6 });
  const gainFlash = P.ctr(si, CIe.X(2.6), CIX.y + 2, "+2.6", '800 40px/44px "HF Mono", "HF Sans", monospace', C.main[2]);
  gainFlash.setAttribute("data-layout-allow-overlap", "");
  K.vis(gainFlash, 0);
  const ciVal = P.tx(si, 1060, 560, "VALIDATION · 平均提升 > 0", P.MONO20, C.gray);
  const brA = P.ctr(si, 0, 478, "两三个点", SANS(24, 600), C.text);
  const brB = P.ctr(si, 0, 528, "区间宽约 4 个点", SANS(24, 600), C.text);
  const pickTag = P.tag(si, 1756, 694, "ILLUSTRATIVE · 示意");
  const STEPS = ["100 步", "200 步", "300 步", "400 步"];
  const METS = ["项目判分", "官方 EX", "验证集"];
  const PCX = (c) => 420 + c * 330;
  const PRY = (r) => 752 + r * 36;
  const stepT = STEPS.map((s, c) => P.ctr(si, PCX(c) + 130, 716, s, P.MONO20, C.gray));
  const metT = METS.map((s, r) => P.tx(si, 176, PRY(r) - 13, s, SANS(22, 600), C.gray));
  const niceT = P.tx(si, 1500, 722, "挑出来的 · 好看", SANS(24, 700), C.red[2]);
  const PICK = { c: 2, r: 1 };
  const miniCI = (c, r) => (c === PICK.c && r === PICK.r ? { m: 2.1, h: 1.6 } : { m: -0.6 + 2.1 * K.hash(c * 4.1 + 2, r * 7.3), h: 1.5 + 0.4 * K.hash(c, r + 9) });
  const upE = (t) => {
    // 三个种子
    const aS = P.win(t, t32, t33s - 0.05, 0.3, 0.3);
    seedL.forEach((e, i) => K.vis(e, aS * K.prog(t, tSeeds32 + 0.15 * i, tSeeds32 + 0.15 * i + 0.3)));
    seedE.forEach((e, i) => K.vis(e, aS * K.prog(t, tSeeds32 + 0.15 * i + 0.8, tSeeds32 + 0.15 * i + 1.1)));
    const aX = aS * K.prog(t, tExp32, tExp32 + 0.3);
    K.vis(expTag, aX);
    K.vis(expT, aX);
    K.vis(expS, aX);
    // 重抽
    const aR = P.win(t, t33s, t34 - 0.1, 0.3, 0.35);
    const d = drawAt(t);
    const set = d >= 0 ? drawSet(d) : null;
    const cnt = {};
    if (set) for (const v of set) cnt[v] = (cnt[v] || 0) + 1;
    K.vis(slotHead, aR * K.prog(t, tByDB33, tByDB33 + 0.3));
    slotT.forEach((e, j) => {
      K.vis(e, aR * (set ? 1 : 0));
      if (set) K.put(e, String(set[j] + 1).padStart(2, "0"));
      K.col(e, set && cnt[set[j]] > 1 && t >= tAgain33 ? C.main[2] : C.text);
    });
    dupT.forEach((e, j) => {
      const on = set && t >= tAgain33 && cnt[set[j]] > 1;
      K.vis(e, aR * (on ? K.prog(t, tAgain33, tAgain33 + 0.3) : 0));
      if (on) K.put(e, "×" + cnt[set[j]]);
    });
    const nb = Math.round(K.lerp(0, 2000, K.eo(K.prog(t, t2000, t2000 + 1.4))));
    K.vis(bootN, aR * K.prog(t, t2000 - 0.1, t2000 + 0.2));
    K.put(bootN, "× " + K.fmt(nb) + " 套");
    K.vis(bootL, aR * K.prog(t, tRange33, tRange33 + 0.3));
    K.vis(histTag, aR * K.prog(t, t2000, t2000 + 0.3));
    K.vis(histZ, aR * K.prog(t, t2000, t2000 + 0.3));
    K.at(histZ, HX(0), HB.y + 6);
    K.vis(histLB, aR * K.prog(t, tLB33, tLB33 + 0.3));
    K.at(histLB, HX(0.7), HB.y + 4);
    // 三道线和例子
    const aRu = pRule.up(t, t34, t38 - 0.1, 0.35);
    const aC = pCI.up(t, tThree34, t38 - 0.1, 0.35);
    rules.forEach((r) => {
      K.vis(r.k, aRu * K.prog(t, tThree34, tThree34 + 0.3));
      K.vis(r.s, aRu * K.prog(t, tThree34, tThree34 + 0.3));
      K.col(r.k, P.lightCol(t, r.tt, C.text));
      K.col(r.s, P.lightCol(t, r.tt, C.gray));
    });
    K.vis(lockT, aRu * K.prog(t, tLock36, tLock36 + 0.3));
    CIe.up(t, aC, tL1 - 0.2);
    const gainPulse = P.pulse(t, tGain36, 0.12, 0.65);
    K.vis(gainFlash, aC * gainPulse);
    gainFlash.style.textShadow = gainPulse > 0 ? `0 0 ${(26 * gainPulse).toFixed(1)}px ${K.rgba(C.main[2], 0.85)}` : "none";
    K.vis(ciVal, aC * K.prog(t, tL3, tL3 + 0.3));
    K.col(ciVal, P.lightCol(t, tL3, C.main[2], C.gray));
    K.vis(brA, aC * K.prog(t, tTwo36, tTwo36 + 0.3));
    K.at(brA, (CIe.X(0) + CIe.X(2.6)) / 2, 478);
    K.vis(brB, aC * K.prog(t, tWide36, tWide36 + 0.3));
    K.at(brB, (CIe.X(0.7) + CIe.X(4.7)) / 2, 528);
    const aK = pPick.up(t, t37, t38 - 0.1, 0.35);
    K.vis(pickTag, aK);
    stepT.forEach((e, c) => K.vis(e, aK * K.prog(t, tStep37 + 0.08 * c, tStep37 + 0.08 * c + 0.25)));
    metT.forEach((e, r) => K.vis(e, aK * K.prog(t, tMet37 + 0.1 * r, tMet37 + 0.1 * r + 0.25)));
    K.vis(niceT, aK * K.prog(t, tNice37, tNice37 + 0.3));
    const aV = pVer.up(t, t34 + 0.3, t37 - 0.1, 0.3);
    const verIn = (i) => K.prog(t, t34 + 0.4 + 0.04 * i, t34 + 0.7 + 0.04 * i);
    K.vis(verA, aV * K.prog(t, tV07, tV07 + 0.3));
    K.vis(verB, aV * K.prog(t, tThree34, tThree34 + 0.3));
    K.put(verB, t < tLock36 ? "每版三道线" : "开跑之前写死");
    K.col(verB, t < tLock36 ? C.gray : C.text);
    verN.forEach((e, i) => K.vis(e, aV * verIn(i)));
    verX.forEach((e, i) => K.vis(e, aV * verIn(i)));

    // ---- 画布：种子线、考卷空位、直方图 ----
    if (cvE.begin(Math.max(aS, aR))) {
      const ctx = cvE.ctx;
      ctx.lineWidth = 1;
      if (aS > 0.002) {
        [0, 1, 2].forEach((i) => {
          const g = K.eo(K.prog(t, tSeeds32 + 0.15 * i, tSeeds32 + 0.15 * i + 0.9));
          if (g <= 0) return;
          ctx.globalAlpha = aS;
          const y = 266 + i * 64;
          const x0 = 300;
          const x1 = 1060;
          ctx.fillStyle = "#3a3e46";
          ctx.fillRect(x0, y, (x1 - x0) * g, 1);
          for (let x = x0; x < x0 + (x1 - x0) * g; x += 24) ctx.fillRect(x, y - 4, 1, 9);
          ctx.fillStyle = g >= 1 ? C.text : "#8a8f98";
          ctx.beginPath();
          ctx.arc(x0 + (x1 - x0) * g, y, 5, 0, 6.283);
          ctx.fill();
        });
        if (aX > 0.002) {
          ctx.globalAlpha = aX;
          P.dashRect(ctx, 1180, 240, 593, 190, "#8a8f98", 10);
          ctx.fillStyle = "#3a3e46";
          ctx.fillRect(1212, 314, 260 * K.eo(K.prog(t, tExp32, tExp32 + 0.8)), 1);
        }
      }
      if (aR > 0.002) {
        ctx.globalAlpha = aR;
        for (let j = 0; j < 11; j++) {
          K.rr(ctx, SLX(j) + 0.5, 276.5, 71, 55, 8);
          ctx.fillStyle = "#14161c";
          ctx.fill();
          const dup = set && t >= tAgain33 && cnt[set[j]] > 1;
          ctx.strokeStyle = dup ? C.main[2] : "#3a3e46";
          ctx.stroke();
        }
        // 直方图：重抽的次数越多，柱子越高
        const fill = nb / 2000;
        const bw = HB.w / HB.bins;
        const inCI = K.prog(t, tRange33, tRange33 + 0.4);
        for (let b = 0; b < HB.bins; b++) {
          const v = HB.min + (b + 0.5) * ((HB.max - HB.min) / HB.bins);
          const h = 170 * pdf(v) * fill * (0.92 + 0.16 * K.hash(b, 11));
          const ci = v >= 0.7 && v <= 4.7;
          ctx.fillStyle = ci && inCI > 0 ? K.mix("#5a5f68", C.main[1], inCI) : "#5a5f68";
          ctx.fillRect(HB.x + b * bw + 1, HB.y - h, bw - 2, h);
        }
        ctx.fillStyle = "#3a3e46";
        ctx.fillRect(HB.x, HB.y, HB.w, 1);
        ctx.fillStyle = "#8a8f98";
        ctx.fillRect(Math.round(HX(0)), HB.y - 190, 1, 196);
        // 95% 区间和下界
        if (inCI > 0) {
          ctx.fillStyle = K.rgba(C.main[2], inCI);
          ctx.fillRect(HX(0.7), HB.y - 196, (HX(4.7) - HX(0.7)) * inCI, 2);
        }
        const lb = K.prog(t, tLow33, tLow33 + 0.3);
        if (lb > 0) {
          ctx.save();
          ctx.shadowColor = C.main[2];
          ctx.shadowBlur = 14 * (0.5 + 0.5 * (1 - K.prog(t, tLow33 + 0.3, tLow33 + 1.6)));
          ctx.fillStyle = C.main[2];
          ctx.fillRect(Math.round(HX(0.7)) - 1, HB.y - 200, 3, 206 * lb);
          ctx.restore();
        }
      }
    }
    // ---- 画布：三道线的勾、锁、括号、事后挑 ----
    if (!cvE2.begin(Math.max(aRu, aC, aK, aV))) return;
    const ctx = cvE2.ctx;
    ctx.lineWidth = 1;
    if (aV > 0.002)
      VERS.forEach((v, i) => {
        const p = verIn(i);
        if (p <= 0) return;
        ctx.globalAlpha = aV * p;
        const x = VRX(i);
        const tOn = tV07 + 0.06 * (i - 2);
        const on = i >= 2 ? K.eo(K.prog(t, tOn, tOn + 0.3)) : 0;
        K.rr(ctx, x + 0.5, VRY + 0.5, 147, 89, 10);
        ctx.fillStyle = K.mix("#111318", C.main[0], 0.45 * on);
        ctx.fill();
        ctx.strokeStyle = i < 2 ? "#2a2d33" : K.mix("#3a3e46", C.main[1], on);
        ctx.stroke();
        if (i < 2) return;
        [tL1, tL2, tL3].forEach((tt, k) => {
          ctx.fillStyle = K.mix("#2a2d33", C.main[2], K.eo(K.prog(t, tt, tt + 0.3)));
          ctx.fillRect(x + 22 + k * 36, VRY + 64, 30, 6);
        });
        const tl = tLock36 + 0.05 * (i - 2);
        if (t >= tl) P.lock(ctx, x + 128, VRY + 24, 22 * K.back(K.prog(t, tl, tl + 0.35)), C.text);
      });
    ctx.globalAlpha = aRu;
    ctx.globalAlpha = aRu;
    rules.forEach((r, i) => {
      const y = 296 + i * 104 + 22;
      K.rr(ctx, 176.5, y - 15.5, 30, 30, 6);
      const lit = K.eo(K.prog(t, r.tt, r.tt + 0.3));
      ctx.strokeStyle = K.mix("#3a3e46", C.main[1], lit);
      ctx.stroke();
      if (lit > 0) {
        ctx.fillStyle = K.rgba(C.main[0], lit);
        ctx.fill();
        P.check(ctx, 191, y, 22, C.main[2], K.eo(K.prog(t, r.tt, r.tt + 0.35)), 2.5);
      }
    });
    if (t >= tLock36) {
      const s = 36 * K.back(K.prog(t, tLock36, tLock36 + 0.35));
      P.lock(ctx, 192, 618, s, C.text);
      ctx.save();
      ctx.globalAlpha = aRu * K.prog(t, tLock36, tLock36 + 0.3);
      ctx.strokeStyle = K.rgba(C.text, 0.5);
      K.rr(ctx, 160.5, 270.5, 800, 300, 10);
      ctx.stroke();
      ctx.restore();
    }
    if (aC > 0.002) {
      ctx.globalAlpha = aC * 0.45 * gainPulse;
      ctx.fillStyle = C.main[1];
      ctx.fillRect(CIe.X(2.6) - 90, CIX.y - 8, 180, 56);
      ctx.globalAlpha = aC * 0.56 * P.pulse(t, tTwo36, 0.12, 0.65);
      ctx.fillRect(CIe.X(2), CIX.y + 32, CIe.X(3) - CIe.X(2), 54);
      ctx.globalAlpha = aC;
      const br = (x0, x1, y, p, col) => {
        if (p <= 0) return;
        ctx.strokeStyle = col;
        ctx.beginPath();
        ctx.moveTo(x0, y - 6);
        ctx.lineTo(x0, y);
        ctx.lineTo(x0 + (x1 - x0) * p, y);
        if (p >= 1) ctx.lineTo(x1, y - 6);
        ctx.stroke();
      };
      br(CIe.X(0), CIe.X(2.6), 470, K.eo(K.prog(t, tTwo36, tTwo36 + 0.35)), C.text);
      br(CIe.X(0.7), CIe.X(4.7), 520, K.eo(K.prog(t, tWide36, tWide36 + 0.35)), C.text);
    }
    if (aK > 0.002) {
      ctx.globalAlpha = aK;
      for (let c = 0; c < 4; c++)
        for (let r = 0; r < 3; r++) {
          const on = Math.min(K.prog(t, tStep37 + 0.08 * c, tStep37 + 0.08 * c + 0.25), K.prog(t, tMet37 + 0.1 * r, tMet37 + 0.1 * r + 0.25));
          if (on <= 0) continue;
          const q = miniCI(c, r);
          const X = (v) => PCX(c) + ((v + 3) / 8) * 260;
          const y = PRY(r);
          ctx.globalAlpha = aK * on;
          ctx.fillStyle = "#3a3e46";
          ctx.fillRect(PCX(c), y, 260, 1);
          ctx.fillStyle = "#8a8f98";
          ctx.fillRect(Math.round(X(0)), y - 9, 1, 19);
          const pick = c === PICK.c && r === PICK.r && t >= tPick37;
          ctx.fillStyle = pick ? C.red[2] : "#c9c4bb";
          ctx.fillRect(X(q.m - q.h), y - 2, X(q.m + q.h) - X(q.m - q.h), 4);
          ctx.beginPath();
          ctx.arc(X(q.m), y, 4, 0, 6.283);
          ctx.fill();
          if (pick) {
            const p = K.eo(K.prog(t, tPick37, tPick37 + 0.35));
            ctx.strokeStyle = C.red[2];
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.ellipse(X(q.m), y, 150 * p, 22 * p, 0, 0, 6.283);
            ctx.stroke();
            ctx.lineWidth = 1;
          }
        }
    }
  };

  // ================= F：论点（第 38–39 句）=================
  const fOut = tEnd - 0.35;
  const pT = K.panel(si, 140, 230, 1640, 400, C.main[1], "THESIS · 留下来的几步");
  const pH = K.panel(si, 140, 660, 1640, 200, P.GRAY[2], "QUERY-FIRST · 先查再交");
  const cvF = P.layer(si);
  const thT = P.tx(si, 176, 272, "", SANS(52, 900), C.text);
  const SIEVE = [
    ["筛训练数据", "v0.5 · 13,612 条轨迹，留下 3,435 条", tF1],
    ["筛老师", "v0.8 · 老师先比原版高 5 个点以上，才用", tF2],
    ["筛训练题", "v0.11 · 只训 8 遍里对 1–7 遍的边界题", tF3],
  ];
  const sieves = SIEVE.map(([k, s, tt], i) => ({ tt, k: P.tx(si, 480, 368 + i * 82, k, SANS(32), P.DIM), s: P.tx(si, 720, 376 + i * 82, s, P.MONO20, P.DIM) }));
  for (const s of sieves) s.k.style.transformOrigin = s.s.style.transformOrigin = "0 0";
  // 第 38 句论点面板占满（三行间距 160、放大 1.25 倍），第 39 句开头收成上半屏，给下面的“先查再交”让位
  const zoomF = (t) => K.eio(K.prog(t, t39 - 0.1, t39 + 0.45));
  const rowY = (i, z) => K.lerp(440 + i * 160, 384 + i * 82, z);
  const qAct = P.act(si, 180, 728, "query", 220);
  const noQ = P.tx(si, 194, 740, "NO QUERY · 训没了", MONO(24, 700), C.red[2]);
  const VER8 = ["v0.3", "v0.5", "v0.7", "v0.8", "v0.9", "v0.10", "v0.11", "v0.12"];
  const VCX = (i) => 520 + i * 154;
  const verT = VER8.map((v, i) => P.ctr(si, VCX(i) + 68, 708, v, MONO(24, 700), C.text));
  const verQ = VER8.map((v, i) => P.tx(si, VCX(i) + 44, 760, "QUERY?", P.MONO20, C.gray));
  const upF = (t) => {
    const a = pT.up(t, t38, fOut, 0.35);
    const ah = pH.up(t, t39 + 0.25, fOut, 0.35);
    const zf = zoomF(t);
    const sc = K.lerp(1.25, 1, zf);
    pT.el.style.height = K.lerp(630, 400, zf).toFixed(1) + "px";
    const pp = K.prog(t, tSieve38, tSieve38 + 0.45);
    K.vis(thT, a * (pp > 0 ? 1 : 0));
    if (pp < 1) K.put(thT, K.scramble("执行结果 = 筛子", pp, Math.floor(t * 30)));
    else K.html(thT, K.rich("{执行结果} = 筛子", C.main[2]));
    sieves.forEach((s, i) => {
      const cy = rowY(i, zf);
      K.at(s.k, 176 + 304 * sc, cy - 20 * sc);
      K.at(s.s, 176 + 544 * sc, cy - 11 * sc);
      K.tf(s.k, `scale(${sc.toFixed(4)})`);
      K.tf(s.s, `scale(${sc.toFixed(4)})`);
      K.vis(s.k, a);
      K.vis(s.s, a);
      K.col(s.k, P.lightCol(t, s.tt, C.text));
      K.col(s.s, P.lightCol(t, s.tt, C.gray));
    });
    const gone = K.prog(t, tGone39, tGone39 + 0.3);
    qAct.up(t, ah * (1 - gone), tHabit39, "main", tHabit39 + 0.2);
    qAct.el.style.background = K.mix("#1b1e25", C.main[1], 0.58 * P.pulse(t, tHabit39, 0.12, 0.7));
    K.vis(noQ, ah * gone);
    // 版本框先暗着摆出来，念到“每一版”逐个点亮
    const verIn = K.prog(t, t39 + 0.5, t39 + 0.8);
    verT.forEach((e, i) => {
      K.vis(e, ah * verIn);
      K.col(e, P.lightCol(t, tEach39 + 0.06 * i, C.text));
    });
    verQ.forEach((e, i) => {
      K.vis(e, ah * verIn);
      K.col(e, P.lightCol(t, tLook39 + 0.05 * i, C.text, P.DIM));
    });
    if (!cvF.begin(Math.max(a, ah))) return;
    const ctx = cvF.ctx;
    ctx.lineWidth = 1;
    // 三个筛子：左边一把灰点进去，右边少几颗紫点出来。按行心平移、按 sc 缩放
    ctx.globalAlpha = a;
    sieves.forEach((s, i) => {
      const lit = K.eo(K.prog(t, s.tt, s.tt + 0.3));
      const cy = rowY(i, zf);
      if (i) {
        ctx.fillStyle = "#1f2229";
        ctx.fillRect(176, Math.round((rowY(i - 1, zf) + cy) / 2), 1568, 1);
      }
      ctx.save();
      ctx.translate(176, cy);
      ctx.scale(sc, sc);
      ctx.lineWidth = 1 / sc;
      ctx.strokeStyle = K.mix("#3a3e46", "#8a8f98", lit);
      ctx.beginPath();
      ctx.moveTo(124, -26);
      ctx.lineTo(176, -6);
      ctx.lineTo(176, 6);
      ctx.lineTo(124, 26);
      ctx.stroke();
      for (let k = 0; k < 18; k++) {
        const fx = K.hash(i * 5 + 1, k);
        const fy = K.hash(i * 5 + 2, k);
        ctx.fillStyle = K.mix("#2a2d33", "#6b707a", lit);
        ctx.fillRect(20 + fx * 92, -22 + fy * 44, 4, 4);
      }
      const flow = K.prog(t, s.tt + 0.1, s.tt + 1.1);
      for (let k = 0; k < 4; k++) {
        const p = K.c01(flow * 1.6 - k * 0.2);
        if (p <= 0) continue;
        ctx.fillStyle = C.main[2];
        ctx.fillRect(186 + p * 70 + k * 6, -2 + (k % 2 ? 6 : -6), 5, 5);
      }
      ctx.restore();
    });
    // 先查再交：版本一排小框
    ctx.globalAlpha = ah;
    VER8.forEach((v, i) => {
      if (verIn <= 0) return;
      ctx.globalAlpha = ah * verIn;
      K.rr(ctx, VCX(i) + 0.5, 696.5, 135, 103, 10);
      ctx.strokeStyle = K.mix("#24272e", "#5a5f68", K.eo(K.prog(t, tEach39 + 0.06 * i, tEach39 + 0.06 * i + 0.25)));
      ctx.stroke();
      const lit = K.eo(K.prog(t, tLook39 + 0.05 * i, tLook39 + 0.05 * i + 0.3));
      K.rr(ctx, VCX(i) + 14.5, 760.5, 21, 21, 4);
      ctx.strokeStyle = K.mix("#5a5f68", C.text, lit);
      ctx.stroke();
    });
    if (gone > 0) {
      ctx.globalAlpha = ah * 0.48 * P.pulse(t, tGone39, 0.12, 0.7);
      ctx.fillStyle = C.red[1];
      ctx.fillRect(180, 728, 280, 52);
      ctx.globalAlpha = ah * gone;
      ctx.setLineDash([6, 5]);
      ctx.strokeStyle = C.red[1];
      K.rr(ctx, 180.5, 728.5, 279, 51, 8);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  };

  return (t) => {
    upA(t);
    upB(t);
    upC(t);
    upD(t);
    upE(t);
    upF(t);
  };
});
