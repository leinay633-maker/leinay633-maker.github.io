// 开场（0–73.8 秒），逐句画面见 DESIGN.md「s0 开场」。分七层，按句子先后出场：
// A 两排 256 格：原版先查了 256 道，训练后 0 道（第 1 句）
// B1 任务流水线：问题 → 模型 → SQL → 数据库 → 结果（第 2 句）
// B2 电话题卡、表结构、4 步轨道上原版的两步和查询结果（第 3–5 句）
// C 第一次训练想教的：看报错、改 SQL（第 6 句，示意）
// D 三排 256 格（原版、普通训练、修复训练）和三根答对率条（第 7–9 句）
// E 项目三张卡、版本时间轴、每版的预注册小卡、14 张判定签收进 HUD（第 10–13 句）
// F 头条：同一晚官方执行准确率 49.5% → 57.9%，缩小的记分板（第 14 句）
// G 电话题卡回到中间，执行结果只有对和不对（第 15 句）
K.scene("s0", (si, win) => {
  const C = K.C;
  const M = EFA.mainTask;
  const V3 = EFA.k.v03;
  const L = (n) => K.seg(n).t0 - 0.08;
  const at = (n, s, k = 1) => K.w(n, s, k) - 0.08;
  const vin = (e, a, p = 1) => K.vis(e, a > 0.002 ? p : 0);
  const MONO = (px, wt = 800) => `${wt} ${px}px/${Math.round(px * 1.08)}px "HF Mono", "HF Sans", monospace`;
  const SANS = (px, wt = 700) => `${wt} ${px}px/${Math.round(px * 1.25)}px "HF Sans", sans-serif`;

  // ---- 时刻 ----
  const t1 = L(1);
  const tTrain1 = at(1, "训练");
  const tNo1 = at(1, "不查");
  const t2 = L(2);
  const tRead2 = at(2, "看懂");
  const tDB2 = at(2, "数据库");
  const tQ2 = at(2, "问题");
  const tSQL2 = at(2, "写");
  const tRun2 = at(2, "把答案");
  const tOut2 = at(2, "出来");
  const t3 = L(3);
  const tList3 = at(3, "列出");
  const tSat3 = at(3, "sat");
  const tTop3 = at(3, "前三");
  const tPhone3 = at(3, "电话");
  const tSchool3 = at(3, "学校");
  const t4 = L(4);
  const tTask4 = at(4, "题目");
  const tSchema4 = at(4, "表结构");
  const tTry4 = at(4, "试跑");
  const tQuery4 = at(4, "查询");
  const tSee4 = at(4, "看到");
  const tFin4 = at(4, "提交");
  const t5 = L(5);
  const tMax5 = at(5, "4步");
  const tUsed5 = at(5, "2步");
  const t6 = L(6);
  const tLearn6 = at(6, "学会");
  const tErr6 = at(6, "看报");
  const tFix6 = at(6, "改");
  const tSQL6 = at(6, "sql");
  const t7 = L(7);
  const t256 = at(7, "256");
  const tAll7 = at(7, "道道");
  const tTrained7 = at(7, "训练");
  const tCheck7 = at(7, "抽查");
  const tNone7 = at(7, "一道都");
  const tNo7 = at(7, "不查");
  const t8 = L(8);
  const tErrCtx8 = at(8, "报错");
  const tVs8 = at(8, "普通");
  const tLow8 = at(8, "低了");
  const t1720 = at(8, "17");
  const tPt8 = at(8, "点");
  const t9 = L(9);
  const tNot9 = at(9, "没比");
  const tB9 = at(9, "原版");
  const t10 = L(10);
  const tPost10 = at(10, "后训练");
  const tModel10 = at(10, "模型");
  const tQwen10 = at(10, "千问三");
  const t4B10 = at(10, "4b");
  const tData10 = at(10, "题目");
  const tBird10 = at(10, "bird");
  const t11 = L(11);
  const tAxis11 = at(11, "一路");
  const tTo11 = at(11, "零点十二");
  const tReal11 = at(11, "真正");
  const t8v11 = at(11, "8");
  const t12 = L(12);
  const tRun12 = at(12, "开跑");
  const tWrite12 = at(12, "写好");
  const tWhat12 = at(12, "比什么");
  const tHold12 = at(12, "成立");
  const t13 = L(13);
  const tMany13 = at(13, "十几");
  const t5v13 = at(13, "5");
  const tUp13 = at(13, "提升");
  const t14 = L(14);
  const tEval14 = at(14, "评测");
  const tOff14 = at(14, "官方");
  const t495 = at(14, "49.5%");
  const tTo14 = at(14, "到了");
  const t579 = at(14, "57.9%");
  const t15 = L(15);
  const tExec15 = at(15, "执行结果");
  const tRight15 = at(15, "对不对");
  const tHow15 = at(15, "学会");
  const tPhone15 = at(15, "电话");
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
        ? "▸ TASK · QUESTION → SQL → RESULT · ≤ 4 STEPS"
        : t < t10
          ? "▸ v0.3 · 256 VALIDATION TASKS · QUERY-FIRST 256 → 0"
          : t < t14
            ? "▸ QWEN3-4B · BIRD · v0.2 → v0.12 · 8 FULL RUNS · 14 COMPARISONS"
            : "▸ TEST 1501 · OFFICIAL EX 49.5% → 57.9% · SAME NIGHT",
    titles: [
      { t: t1, text: "训练完，它{不查了}", color: C.red[2] },
      { t: t2, text: "看懂问题，{写 SQL}" },
      { t: t3, text: "一道真题：{前 3 名的电话}", color: C.amb[2] },
      { t: t4, text: "原版：{先查}，再交" },
      { t: t6, text: "想教它{看报错、改 SQL}" },
      { t: t7, text: "先查的题：256 → {0}", color: C.red[2] },
      { t: t8, text: "低了 {17 到 20} 个点", color: C.red[2] },
      { t: t9, text: "普通训练也{没涨}", color: C.red[2] },
      { t: t10, text: "{Qwen3-4B} · BIRD" },
      { t: t11, text: "版本号到 v0.12，{8 版}正式结果" },
      { t: t12, text: "开跑前写好{怎样算成立}" },
      { t: t13, text: "十几个比较，{5 个}成立" },
      { t: t14, text: "官方执行准确率 {57.9%}" },
      { t: t15, text: "执行结果能{教会模型多少}" },
    ],
  });
  K.plates.push({ t0: 0.3, t1: tEnd, text: "RUN LOG · v0.3 → v0.12" });
  P.vLight[0] = tPt8;
  const tFly = tUp13 + 0.25;
  P.vShow = tFly + 0.15;
  K.shake(tNo1 + 0.5, 4, 0.3);

  // 全屏画布：每层一张，建在该层的面板之后（面板底色不透明，会盖住先建的画布），文字建在画布之后
  const layer = () => {
    const ctx = K.canvas(si, 0, 0, 1920, 1080);
    let dirty = false;
    return {
      ctx,
      begin(a) {
        if (dirty) ctx.clearRect(0, 0, 1920, 1080);
        dirty = a > 0.002;
        ctx.globalAlpha = 1;
        return dirty;
      },
    };
  };
  // 256 格：64 列 × 4 行，按列填；fn(c) 返回这一列的 { fill, stroke }
  const grid = (ctx, x0, y0, cell, pitch, fn) => {
    for (let c = 0; c < 64; c++) {
      const st = fn(c);
      if (!st) continue;
      for (let r = 0; r < 4; r++) {
        const x = x0 + c * pitch;
        const y = y0 + r * pitch;
        if (st.fill) {
          ctx.fillStyle = st.fill;
          ctx.fillRect(x, y, cell, cell);
        }
        if (st.stroke) {
          ctx.strokeStyle = st.stroke;
          ctx.lineWidth = 1;
          ctx.strokeRect(x + 0.5, y + 0.5, cell - 1, cell - 1);
        }
      }
    }
  };
  const litCol = (t, tc) => (t < tc ? { stroke: "#2a2d33" } : { fill: K.mix(C.main[2], C.main[1], K.prog(t, tc, tc + 0.3)) });
  const redCol = (t, tc) => (t < tc ? { stroke: "#2a2d33" } : { fill: K.mix(C.red[1], C.red[0], K.prog(t, tc, tc + 0.3)), stroke: C.red[1] });

  // ================= A：两排 256 格（第 1 句）=================
  const pA = K.panel(si, 140, 300, 1640, 420, C.main[1], "VALIDATION · 256 TASKS · 先查数据的题");
  const cvA = layer();
  const hA = P.txr(si, 1740, 318, "QUERY-FIRST · 先查的题数", P.MONO20, C.gray);
  const rowYA = [380, 550];
  const labA = [P.tx(si, 180, rowYA[0] - 4, "原版", SANS(34), C.text), P.tx(si, 180, rowYA[1] - 4, "训练后", SANS(34), C.text)];
  const subA = [P.tx(si, 180, rowYA[0] + 40, "BASE · Qwen3-4B", P.MONO20, C.gray), P.tx(si, 180, rowYA[1] + 40, "v0.3 · SEED 42 · 抽查", P.MONO20, C.gray)];
  const numA = [P.txr(si, 1740, rowYA[0] - 2, "", MONO(64), C.main[2]), P.txr(si, 1740, rowYA[1] - 2, "", MONO(64), C.red[2])];
  const arrA = P.tx(si, 214, 482, "训练", P.MONO20, C.gray);
  const tLitA = t1 + 0.1;
  const upA = (t) => {
    const a = pA.up(t, t1, t2 - 0.1, 0.3);
    K.vis(hA, a);
    const a2 = a * K.prog(t, tTrain1, tTrain1 + 0.3);
    K.vis(labA[0], a);
    K.vis(subA[0], a);
    K.vis(labA[1], a2);
    K.vis(subA[1], a2);
    K.vis(arrA, a2);
    K.vis(numA[0], a * K.prog(t, tLitA, tLitA + 0.2));
    K.put(numA[0], K.roll(t, tLitA, 0.55, 0, 256));
    P.glow(numA[0], t, tLitA + 0.5, C.main);
    K.vis(numA[1], a2);
    if (t < tNo1 + 0.45) {
      K.put(numA[1], "··");
      K.col(numA[1], P.DIM);
    } else {
      K.put(numA[1], "0");
      P.glow(numA[1], t, tNo1 + 0.45, C.red);
    }
    if (!cvA.begin(a)) return;
    const ctx = cvA.ctx;
    ctx.globalAlpha = a;
    grid(ctx, 440, rowYA[0], 14, 18, (c) => litCol(t, tLitA + 0.5 * (c / 63)));
    if (a2 <= 0.002) return;
    ctx.globalAlpha = a2;
    grid(ctx, 440, rowYA[1], 14, 18, (c) => redCol(t, tNo1 + 0.45 * (c / 63)));
    P.arrow(ctx, 198, 468, 198, 468 + 70 * K.eo(K.prog(t, tTrain1, tTrain1 + 0.4)), "#6b707a", 7);
  };

  // ================= B1：任务流水线（第 2 句）=================
  const NX = [140, 480, 820, 1160, 1500];
  const NY = 396;
  const NW = 280;
  const NH = 156;
  const cvB1 = layer();
  const nodes = [
    { lab: "QUESTION · 问题", main: "自然语言问题", t: tRead2, amb: true },
    { lab: "MODEL · 模型", main: "Qwen3-4B", t: t2, mono: true },
    { lab: "SQL", main: "", t: tSQL2, mono: true },
    { lab: "SQLITE · 数据库", main: "数据库", t: tDB2 },
    { lab: "RESULT · 结果", main: "查出来的行", t: tOut2 },
  ];
  nodes.forEach((n, i) => {
    n.l = P.tx(si, NX[i] + 20, NY + 18, n.lab, P.MONO20, n.amb ? C.amb[1] : C.gray);
    n.m = P.tx(si, NX[i] + 20, NY + 54, n.main, n.mono ? MONO(26, 700) : SANS(30), C.text);
  });
  const SQLTXT = "SELECT … FROM …";
  const arrowT = [tQ2, tSQL2, tRun2, tOut2];
  const upB1 = (t) => {
    const a = P.win(t, t2, t3 - 0.1, 0.3, 0.35);
    nodes.forEach((n) => {
      const p = a * K.eo(K.prog(t, n.t, n.t + 0.3));
      K.vis(n.l, p);
      K.vis(n.m, p);
    });
    const ty = K.prog(t, tSQL2 + 0.1, tSQL2 + 0.9);
    K.put(nodes[2].m, SQLTXT.slice(0, Math.round(ty * SQLTXT.length)) + (ty > 0 && ty < 1 ? "▍" : ""));
    if (!cvB1.begin(a)) return;
    const ctx = cvB1.ctx;
    nodes.forEach((n, i) => {
      const p = K.eo(K.prog(t, n.t, n.t + 0.3));
      if (p <= 0) return;
      ctx.globalAlpha = a * p;
      const x = NX[i];
      const y = NY + 10 * (1 - p);
      K.rr(ctx, x + 0.5, y + 0.5, NW - 1, NH - 1, 14);
      ctx.fillStyle = "#0d0f14";
      ctx.fill();
      ctx.strokeStyle = n.amb ? K.rgba(C.amb[1], 0.7) : "#3a3e46";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = "#2a2d33";
      if (i === 0) {
        // 一段话的灰条
        ctx.fillRect(x + 20, y + 106, 200, 6);
        ctx.fillRect(x + 20, y + 122, 150, 6);
      } else if (i === 1) {
        // 一小片参数格
        for (let r = 0; r < 3; r++) for (let c = 0; c < 12; c++) ctx.fillRect(x + 20 + c * 14, y + 104 + r * 12, 8, 6);
      } else if (i === 3) {
        // 圆柱
        const cx = x + 220;
        const cy = y + 70;
        ctx.strokeStyle = "#6b707a";
        for (const dy of [0, 22, 44]) {
          ctx.beginPath();
          ctx.ellipse(cx, cy + dy, 30, 9, 0, 0, 6.283);
          ctx.stroke();
        }
        ctx.fillRect(cx - 30, cy, 1, 44);
        ctx.fillRect(cx + 29, cy, 1, 44);
      } else if (i === 4) {
        // 三行两列的小表
        ctx.strokeStyle = "#3a3e46";
        ctx.strokeRect(x + 20.5, y + 100.5, 160, 40);
        ctx.fillRect(x + 100, y + 100, 1, 40);
        for (let r = 1; r < 4; r++) ctx.fillRect(x + 20, y + 100 + r * 10, 160, 1);
      }
    });
    ctx.globalAlpha = a;
    arrowT.forEach((ta, i) => {
      const p = K.eo(K.prog(t, ta, ta + 0.35));
      if (p <= 0) return;
      const x0 = NX[i] + NW + 6;
      const x1 = NX[i + 1] - 6;
      P.arrow(ctx, x0, NY + NH / 2, x0 + (x1 - x0) * p, NY + NH / 2, "#8a8f98", 7);
    });
    // 查询发出去、结果回来：一颗小点沿箭头走
    for (const [ta, i] of [[tRun2, 2], [tOut2, 3]]) {
      const p = K.prog(t, ta + 0.1, ta + 0.5);
      if (p <= 0 || p >= 1) continue;
      ctx.fillStyle = C.text;
      ctx.beginPath();
      ctx.arc(NX[i] + NW + 6 + (NX[i + 1] - NX[i] - NW - 12) * K.eio(p), NY + NH / 2, 4, 0, 6.283);
      ctx.fill();
    }
  };

  // ================= B2：电话题卡、表结构、原版的两步（第 3–5 句）=================
  const Q = P.qcard(si, 140, 230, 940);
  const pS = K.panel(si, 1120, 230, 660, 244, P.GRAY[2], "SCHEMA · " + M.db);
  const SCH = [
    ["satscores", "( cds, …, NumTstTakr, …, NumGE1500, … )"],
    ["schools", "( CDSCode, …, Phone, … )"],
    ["frpm", "( CDSCode, … )"],
  ];
  const schBands = SCH.map((_, i) => {
    const e = K.at(K.el("div", "tx", pS.el), 22, 52 + i * 58, 610, 32);
    e.style.background = K.rgba(C.amb[1], 0.42);
    e.style.borderRadius = "4px";
    e.setAttribute("data-layout-ignore", "");
    K.vis(e, 0);
    return e;
  });
  const schL = SCH.map(([tb, cols], i) => [P.tx(pS.el, 26, 56 + i * 58, "CREATE TABLE " + tb, MONO(22, 600), P.DIM), P.tx(pS.el, 26, 84 + i * 58, cols, P.MONO20, C.gray)]);
  const cvB2 = layer();
  const RB = P.rail(si, 140, 516, 1640, [
    { a: "query", t: tTry4, sql: M.b[0].sql, tone: "main", toneT: tQuery4 },
    { a: "finish", t: tFin4, sql: M.b[1].sql },
  ]);
  const railLabB = P.tx(si, 140, 482, "BASE · 原版 Qwen3-4B 的这一轮", P.MONO20, C.gray);
  const TB = P.table(si, 156, 676, M.b[0].cols, M.b[0].rows, { widths: [250, 250] });
  const stepLab = P.txr(si, 1780, 680, "STEPS · 最多 4 步", P.MONO20, C.gray);
  const stepNum = P.txr(si, 1780, 712, "", MONO(96), C.text);
  const upB2 = (t) => {
    const dim = 1 - 0.8 * K.eo(K.prog(t, t6, t6 + 0.4));
    const aq = Q.up(t, t3, t7 - 0.1, 0.35, dim);
    Q.hl("sat", K.eo(K.prog(t, tSat3, tSat3 + 0.3)));
    Q.hl("top3", K.eo(K.prog(t, tTop3, tTop3 + 0.3)));
    Q.hl("phone", K.eo(K.prog(t, tPhone3, tPhone3 + 0.3)));
    const as = pS.up(t, tList3, t6 - 0.05, 0.3);
    schL.forEach(([tb, cols], i) => {
      const lit = K.eo(K.prog(t, tSchema4 + i * 0.15, tSchema4 + i * 0.15 + 0.3));
      const flash = i < 2 ? P.pulse(t, i === 0 ? tSat3 : tSchool3, 0.12, 0.65) : 0;
      vin(schBands[i], as, flash);
      K.col(tb, flash > 0 ? K.mix(P.DIM, C.amb[2], flash) : K.mix(P.DIM, C.text, lit));
      vin(cols, as, lit);
    });
    // 空轨道在第 3 句念到“列出”时就摆出来，免得下半屏空着
    const ar = P.win(t, tList3 + 0.5, t6 - 0.05, 0.3, 0.3);
    RB.up(t, ar, tMax5);
    K.vis(railLabB, ar);
    TB.up(t, ar, tSee4);
    K.vis(stepLab, ar * K.prog(t, tMax5, tMax5 + 0.3));
    K.vis(stepNum, ar * K.prog(t, tMax5, tMax5 + 0.3));
    if (t < tUsed5) {
      K.put(stepNum, "· / 4");
      K.col(stepNum, P.DIM);
    } else {
      K.put(stepNum, "2 / 4");
      P.glow(stepNum, t, tUsed5, [C.text, C.text, "#ffffff"]);
    }
    if (!cvB2.begin(Math.max(aq, ar))) return;
    const ctx = cvB2.ctx;
    // 念到“题目”时题卡闪一下
    const pu = P.pulse(t, tTask4, 0.1, 0.8) * aq;
    if (pu > 0.01) {
      ctx.save();
      ctx.globalAlpha = pu;
      ctx.shadowColor = C.amb[2];
      ctx.shadowBlur = 18;
      ctx.strokeStyle = C.amb[2];
      K.rr(ctx, 140.5, 230.5, 939, P.QH - 1, 16);
      ctx.stroke();
      ctx.restore();
    }
    // 结果表挂在第 1 格下面
    const pl = K.eo(K.prog(t, tSee4 - 0.1, tSee4 + 0.15));
    if (ar > 0.002 && pl > 0) {
      ctx.globalAlpha = ar;
      ctx.fillStyle = "#4a4f58";
      ctx.fillRect(300, 660, 1, 16 * pl);
    }
  };

  // ================= C：想教的——看报错、改 SQL（第 6 句，示意）=================
  const pErr = K.panel(si, 156, 676, 430, 76, C.red[1], null);
  const errT = P.tx(pErr.el, 22, 24, "ERROR · no such column: Phone_No", P.MONO20, C.red[2]);
  const cvC = layer();
  const RCt = P.rail(si, 140, 516, 1640, [
    { a: "query", t: tLearn6, sql: "SELECT Phone_No FROM schools …" },
    { a: "query", t: tFix6 + 0.15, sql: "SELECT Phone FROM schools …", tone: "main", toneT: tSQL6 + 0.1 },
    { a: "finish", t: tSQL6 + 0.4 },
  ]);
  const cLab = P.tx(si, 140, 482, "v0.3 · 第一次训练 · 想教会的", P.MONO20, C.main[1]);
  const cTag = P.tag(si, 1780, 480, "ILLUSTRATIVE · 示意");
  const fixT = P.tx(si, 800, 690, "看报错 → 改 SQL → 再试", SANS(28, 600), C.text);
  const upC = (t) => {
    const a = P.win(t, t6, t7 - 0.1, 0.3, 0.3);
    RCt.up(t, a);
    K.vis(cLab, a);
    K.vis(cTag, a);
    pErr.up(t, tErr6, t7 - 0.1, 0.3);
    K.vis(fixT, a * K.prog(t, tFix6, tFix6 + 0.3));
    if (!cvC.begin(a)) return;
    const ctx = cvC.ctx;
    ctx.globalAlpha = a;
    const pe = K.eo(K.prog(t, tErr6 - 0.1, tErr6 + 0.15));
    if (pe > 0) {
      ctx.fillStyle = C.red[1];
      ctx.fillRect(300, 660, 1, 16 * pe);
    }
    // 从报错框弯到第 2 格
    const pf = K.eo(K.prog(t, tFix6, tFix6 + 0.45));
    if (pf > 0) {
      const p0 = [586, 714];
      const p1 = [740, 714];
      const p2 = [740, 660];
      ctx.strokeStyle = C.main[1];
      ctx.lineWidth = 1;
      ctx.beginPath();
      const N = 30;
      let last = p0;
      for (let k = 0; k <= N * pf; k++) {
        const u = k / N;
        const x = (1 - u) * (1 - u) * p0[0] + 2 * (1 - u) * u * p1[0] + u * u * p2[0];
        const y = (1 - u) * (1 - u) * p0[1] + 2 * (1 - u) * u * p1[1] + u * u * p2[1];
        if (k === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        last = [x, y];
      }
      ctx.stroke();
      if (pf >= 1) P.arrow(ctx, 740, 672, 740, 661, C.main[1], 8);
      else {
        ctx.fillStyle = C.main[2];
        ctx.beginPath();
        ctx.arc(last[0], last[1], 3, 0, 6.283);
        ctx.fill();
      }
    }
  };

  // ================= D：三排 256 格和三根答对率条（第 7–9 句）=================
  const pD1 = K.panel(si, 140, 230, 1640, 330, C.main[1], "VALIDATION · 256 TASKS · 先查数据的题数");
  const pD2 = K.panel(si, 140, 590, 1640, 280, P.GRAY[2], "VALIDATION · 256 TASKS · 答对率 · 项目判分");
  const cvD = layer();
  const rowYD = [284, 374, 464];
  const GXD = 520;
  const labD = ["原版", "普通训练", "修复训练"].map((s, i) => P.tx(si, 176, rowYD[i] - 2, s, SANS(30), C.text));
  const subD = ["BASE", "C · SEED 42", "D · SEED 42 · 带报错上下文"].map((s, i) => P.tx(si, 176, rowYD[i] + 34, s, P.MONO20, C.gray));
  const numD = rowYD.map((y, i) => P.txr(si, 1740, y + 4, "", MONO(44), i ? C.red[2] : C.main[2]));
  const seedTag = P.tag(si, 1740, 248, "SEED 42 · 抽查", C.gray);
  // 答对率：0–60% 画在 520–1320
  const BX0 = 520;
  const BPX = 800 / 60;
  const pct = (n) => (100 * n) / V3.tasks;
  const barV = [[pct(V3.B)], V3.C.map(pct), V3.D.map(pct)];
  const mean = (a) => a.reduce((s, v) => s + v, 0) / a.length;
  const barY = [650, 712, 774];
  const barT = [t9 + 0.05, tVs8 + 0.05, tErrCtx8];
  const barLab = ["原版", "普通训练", "修复训练"].map((s, i) => P.tx(si, 176, barY[i] - 2, s, SANS(26, 600), C.text));
  const barNum = barV.map((v, i) => P.tx(si, BX0 + mean(v) * BPX + 16, barY[i], mean(v).toFixed(1) + "%", P.MONO24, C.gray));
  const axisD = [0, 10, 20, 30, 40, 50, 60].map((v) => P.ctr(si, BX0 + v * BPX, 818, v + "%", P.MONO20, P.DIM));
  const bigD = P.tx(si, 1400, 756, "−17 ~ −20 点", MONO(48), C.red[2]);
  const noteD = P.tx(si, 1400, 818, "D − C · " + EFA.verdicts[0].note, P.MONO20, C.red[1]);
  const sameD = P.tx(si, 1400, 714, "≈ 原版 · 没涨", SANS(26, 600), C.gray);
  const upD = (t) => {
    const a1 = pD1.up(t, t7, t10 - 0.1, 0.3);
    const a2 = pD2.up(t, t7 + 0.5, t10 - 0.1, 0.3);
    const rowOn = [t256, tTrained7, tTrained7 + 0.1];
    labD.forEach((e, i) => {
      const p = a1 * K.prog(t, rowOn[i], rowOn[i] + 0.3);
      K.vis(e, p);
      K.vis(subD[i], p);
      const pu = i === 2 ? P.pulse(t, tErrCtx8, 0.12, 0.9) : 0;
      K.col(e, pu > 0 ? K.mix(C.text, C.red[2], pu) : C.text);
      K.col(subD[i], i && t >= tCheck7 ? K.mix(C.gray, C.text, P.pulse(t, tCheck7, 0.1, 0.8) + 0.3) : C.gray);
    });
    K.vis(seedTag, a1 * K.prog(t, tCheck7, tCheck7 + 0.3));
    K.vis(numD[0], a1 * K.prog(t, tAll7, tAll7 + 0.2));
    K.put(numD[0], K.roll(t, tAll7, 0.6, 0, 256) + " / 256");
    P.glow(numD[0], t, tAll7 + 0.6, C.main);
    for (const i of [1, 2]) {
      K.vis(numD[i], a1 * K.prog(t, tTrained7 + 0.1 * i, tTrained7 + 0.1 * i + 0.3));
      if (t < tNo7 + 0.3) {
        K.put(numD[i], "·· / 256");
        K.col(numD[i], P.DIM);
      } else {
        K.put(numD[i], "0 / 256");
        P.glow(numD[i], t, tNo7 + 0.3, C.red);
      }
    }
    barLab.forEach((e, i) => {
      K.vis(e, a2);
      K.col(e, P.lightCol(t, barT[i], C.text));
    });
    barNum.forEach((e, i) => K.vis(e, a2 * K.prog(t, barT[i] + 0.4, barT[i] + 0.6)));
    axisD.forEach((e) => K.vis(e, a2));
    K.vis(bigD, a2 * K.prog(t, t1720, t1720 + 0.25));
    P.glow(bigD, t, t1720, C.red);
    K.vis(noteD, a2 * K.prog(t, tPt8, tPt8 + 0.3));
    K.vis(sameD, a2 * K.prog(t, tB9, tB9 + 0.3));
    if (!cvD.begin(Math.max(a1, a2))) return;
    const ctx = cvD.ctx;
    if (a1 > 0.002) {
      ctx.globalAlpha = a1;
      grid(ctx, GXD, rowYD[0], 12, 15, (c) => (t < t256 ? null : litCol(t, tAll7 + 0.55 * (c / 63))));
      for (const i of [1, 2]) grid(ctx, GXD, rowYD[i], 12, 15, (c) => (t < tTrained7 + 0.1 * i ? null : redCol(t, tNone7 + 0.1 * i + 0.5 * (c / 63))));
    }
    if (a2 <= 0.002) return;
    ctx.globalAlpha = a2;
    // 刻度
    for (let v = 0; v <= 60; v += 5) {
      ctx.fillStyle = v % 10 ? "#2a2d33" : "#3a3e46";
      ctx.fillRect(BX0 + v * BPX, 806, 1, v % 10 ? 4 : 8);
    }
    ctx.fillStyle = "#2a2d33";
    ctx.fillRect(BX0, 806, 800, 1);
    barV.forEach((vs, i) => {
      const g = K.eo(K.prog(t, barT[i], barT[i] + 0.5));
      if (g <= 0) return;
      const m = mean(vs);
      const red = i === 2 && t >= tLow8 ? K.eo(K.prog(t, tLow8, tLow8 + 0.3)) : 0;
      ctx.fillStyle = red > 0 ? K.mix(C.main[0], C.red[1], red) : K.mixHex(C.main[0], C.main[1], 0.55);
      ctx.fillRect(BX0, barY[i], m * BPX * g, 30);
      // 每个 seed 一个点
      if (g >= 1 && vs.length > 1) {
        ctx.fillStyle = C.text;
        vs.forEach((v, k) => {
          ctx.beginPath();
          ctx.arc(BX0 + v * BPX, barY[i] + 15 + (k - 1) * 7, 3, 0, 6.283);
          ctx.fill();
        });
      }
    });
    // 低掉的那一段：从修复训练的条尾到普通训练的条尾
    const pg = K.eo(K.prog(t, tLow8, tLow8 + 0.4));
    if (pg > 0) {
      const xd = BX0 + mean(barV[2]) * BPX;
      const xc = BX0 + mean(barV[1]) * BPX;
      ctx.setLineDash([5, 4]);
      ctx.strokeStyle = C.red[1];
      ctx.lineWidth = 1;
      ctx.strokeRect(xd + 0.5, barY[2] + 0.5, (xc - xd) * pg - 1, 29);
      ctx.setLineDash([]);
    }
    // 普通训练和原版对齐的虚线
    const pn = K.eo(K.prog(t, tNot9, tNot9 + 0.4));
    if (pn > 0) {
      const xb = BX0 + barV[0][0] * BPX;
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = C.text;
      ctx.beginPath();
      ctx.moveTo(xb + 0.5, barY[0] - 6);
      ctx.lineTo(xb + 0.5, barY[0] - 6 + (barY[1] + 36 - barY[0] + 6) * pn);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  };

  // ================= E：项目三张卡、版本时间轴、预注册小卡、14 张判定签（第 10–13 句）=================
  const pE1 = K.panel(si, 140, 230, 520, 220, P.GRAY[2], "PROJECT · 个人项目");
  const pE2 = K.panel(si, 700, 230, 520, 220, P.GRAY[2], "MODEL · 模型");
  const pE3 = K.panel(si, 1260, 230, 520, 220, C.amb[1], "DATASET · 数据集");
  pE3.lab.style.color = C.amb[1];
  const e1m = P.tx(pE1.el, 26, 62, "", SANS(56, 900), C.text);
  const e1s = P.tx(pE1.el, 26, 150, "EXEC FEEDBACK · 执行结果当信号", P.MONO20, C.gray);
  const e2m = P.tx(pE2.el, 26, 66, "", MONO(60), C.text);
  const e2s = P.tx(pE2.el, 26, 150, "Instruct-2507 · 小模型", P.MONO20, C.gray);
  const e3m = P.tx(pE3.el, 26, 66, "BIRD", MONO(60), C.amb[1]);
  const e3s = P.tx(pE3.el, 26, 150, "公开的 text-to-SQL 数据集", SANS(24, 500), C.gray);
  const cvE = layer();
  // 第 10 句三张卡摆在中间时，下面各挂一条按真实数量画的细节：8 张卡、约 40 亿参数（一点一亿）、80 个库。
  // 算力不写“每版一晚”：v0.11 是单卡跑了约 32 小时（facts 第 0 节）
  const STRIP = [
    [166, "COMPUTE · 8 × H20", C.gray],
    [726, "4B · 约 40 亿参数 · 一点一亿", C.gray],
    [1286, "80 个库 · 按库切分", C.amb[1]],
  ];
  const strL = STRIP.map(([x, s, c]) => P.tx(si, x, 636, s, P.MONO20, c));
  const VERS = ["v0.2", "v0.3", "v0.4", "v0.5", "v0.6", "v0.7", "v0.8", "v0.9", "v0.10", "v0.11", "v0.12"];
  const FORMAL = new Set(["v0.3", "v0.5", "v0.7", "v0.8", "v0.9", "v0.10", "v0.11", "v0.12"]);
  const VX = (j) => 220 + j * 148;
  const AXY = 800;
  const verLab = VERS.map((v, j) => P.ctr(si, VX(j), AXY + 18, v, P.MONO20, P.DIM));
  const formalIdx = VERS.map((v, j) => j).filter((j) => FORMAL.has(VERS[j]));
  const docT = formalIdx.map((j, k) => ({
    j,
    t: tRun12 + 0.07 * k,
    l1: P.ctr(si, VX(j), 690, "比什么", SANS(20, 600), P.DIM),
    l2: P.ctr(si, VX(j), 718, "算成立", SANS(20, 600), P.DIM),
  }));
  const fullLab = P.tx(si, 140, 482, "FULL RUNS · 正式结果", P.MONO20, C.gray);
  const fullNum = P.tx(si, 140, 506, "", MONO(96), C.text);
  const cmpLab = P.txr(si, 1780, 482, "COMPARISONS · 事先写好的比较", P.MONO20, C.gray);
  const cmpNum = P.txr(si, 1780, 506, "", MONO(96), C.text);
  // 判定签的位置：每版一组，摆在那一版的预注册小卡上方
  const VT = EFA.verdicts.map((v, i) => ({ v, i, j: VERS.indexOf(v.v) }));
  const perVer = {};
  for (const x of VT) (perVer[x.j] = perVer[x.j] || []).push(x);
  for (const j in perVer) perVer[j].forEach((x, k, arr) => (x.x = VX(+j) - (arr.length * 40 - 6) / 2 + k * 40));
  const upE = (t) => {
    const out = t14 - 0.1;
    const dimE = 1 - 0.65 * K.eo(K.prog(t, t11, t11 + 0.4));
    // 三张卡先摆在中间，念到版本号时上移、变暗，给时间轴让位
    const dyE = 160 * (1 - K.eio(K.prog(t, t11 - 0.2, t11 + 0.4)));
    const ae1 = pE1.up(t, t10, out, 0.3, dimE, dyE);
    const ae2 = pE2.up(t, tModel10, out, 0.3, dimE, dyE);
    const ae3 = pE3.up(t, tData10, out, 0.3, dimE, dyE);
    const pp = K.prog(t, tPost10, tPost10 + 0.4);
    K.put(e1m, pp <= 0 ? "" : pp < 1 ? K.scramble("后训练", pp, Math.floor(t * 30)) : "后训练");
    vin(e1s, ae1, K.prog(t, tPost10 + 0.3, tPost10 + 0.6));
    const q4 = t >= t4B10 ? '<span style="color:#ece6dc">Qwen3</span><span style="color:' + C.main[2] + '">-4B</span>' : "Qwen3";
    K.html(e2m, t >= tQwen10 ? q4 : "");
    vin(e2s, ae2, K.prog(t, t4B10 + 0.2, t4B10 + 0.5));
    P.glow(e3m, t, tBird10, C.amb);
    vin(e3s, ae3, K.prog(t, tBird10 + 0.2, tBird10 + 0.5));
    const a = P.win(t, t11 - 0.1, out, 0.3, 0.3);
    verLab.forEach((e, j) => {
      K.vis(e, a * K.prog(t, tAxis11 + 0.08 * j, tAxis11 + 0.08 * j + 0.25));
      const f = FORMAL.has(VERS[j]) ? K.eo(K.prog(t, tReal11 + 0.1 * formalIdx.indexOf(j), tReal11 + 0.1 * formalIdx.indexOf(j) + 0.3)) : 0;
      K.col(e, f > 0 ? K.mix(P.DIM, C.text, f) : P.DIM);
    });
    for (const d of docT) {
      const p = a * K.prog(t, d.t, d.t + 0.25);
      K.vis(d.l1, p);
      K.vis(d.l2, p);
      K.col(d.l1, P.lightCol(t, tWhat12, C.text));
      K.col(d.l2, P.lightCol(t, tHold12, C.text));
    }
    K.vis(fullLab, a * K.prog(t, tReal11, tReal11 + 0.3));
    K.vis(fullNum, a * K.prog(t, tReal11, tReal11 + 0.3));
    K.put(fullNum, t < t8v11 ? "· / 11" : "8 / 11");
    if (t < t8v11) K.col(fullNum, P.DIM);
    else P.glow(fullNum, t, t8v11, [C.text, C.text, "#ffffff"]);
    const tagOut = 1 - K.prog(t, tFly, tFly + 0.4);
    K.vis(cmpLab, a * K.prog(t, tMany13, tMany13 + 0.3));
    K.vis(cmpNum, a * K.prog(t, tMany13, tMany13 + 0.3));
    if (t < t5v13) {
      K.put(cmpNum, "14");
      K.col(cmpNum, C.text);
    } else {
      K.html(cmpNum, `<span style="color:${C.main[2]}">5</span> / 14`);
      P.glow(cmpNum, t, t5v13, [C.text, C.text, C.text]);
    }
    const tStr = [tPost10 + 0.5, t4B10 + 0.5, tBird10 + 0.5];
    const aStr = tStr.map((ts) => Math.min(K.prog(t, ts, ts + 0.3), 1 - K.prog(t, t11 - 0.45, t11 - 0.15)));
    strL.forEach((e, k) => K.vis(e, aStr[k]));
    if (!cvE.begin(Math.max(a, ...aStr))) return;
    const ctx = cvE.ctx;
    ctx.lineWidth = 1;
    if (aStr[0] > 0.002)
      for (let k = 0; k < 8; k++) {
        const p = K.eo(K.prog(t, tStr[0] + 0.05 * k, tStr[0] + 0.05 * k + 0.2));
        if (p <= 0) continue;
        ctx.globalAlpha = aStr[0] * p;
        const x = 166 + k * 56;
        const y = 676;
        ctx.strokeStyle = "#8a8f98";
        K.rr(ctx, x + 0.5, y + 0.5, 43, 43, 4);
        ctx.stroke();
        ctx.strokeStyle = "#5a5f68";
        ctx.strokeRect(x + 10.5, y + 10.5, 22, 22);
        ctx.fillStyle = "#5a5f68";
        for (let q = 0; q < 4; q++) {
          ctx.fillRect(x + 8 + q * 8, y - 5, 1, 5);
          ctx.fillRect(x + 8 + q * 8, y + 44, 1, 5);
        }
      }
    if (aStr[1] > 0.002)
      for (let k = 0; k < 40; k++) {
        const p = K.prog(t, tStr[1] + 0.015 * k, tStr[1] + 0.015 * k + 0.15);
        if (p <= 0) continue;
        ctx.globalAlpha = aStr[1] * p;
        ctx.fillStyle = "#8a8f98";
        ctx.beginPath();
        ctx.arc(730 + (k % 20) * 20, 684 + Math.floor(k / 20) * 22, 4, 0, 6.283);
        ctx.fill();
      }
    if (aStr[2] > 0.002)
      for (let k = 0; k < 80; k++) {
        const d = K.hash(k * 1.7, 3.3) * 0.5;
        const p = K.prog(t, tStr[2] + d, tStr[2] + d + 0.2);
        if (p <= 0) continue;
        ctx.globalAlpha = aStr[2] * p;
        const x = 1286 + (k % 20) * 20;
        const y = 676 + Math.floor(k / 20) * 20;
        ctx.fillStyle = C.amb[0];
        ctx.fillRect(x, y, 14, 14);
        ctx.strokeStyle = C.amb[1];
        ctx.strokeRect(x + 0.5, y + 0.5, 13, 13);
      }
    if (a <= 0.002) return;
    ctx.globalAlpha = a;
    // 轴
    const ga = K.eio(K.prog(t, tAxis11 - 0.1, tAxis11 + 0.8));
    ctx.fillStyle = "#3a3e46";
    ctx.fillRect(VX(0) - 40, AXY, (VX(10) - VX(0) + 80) * ga, 1);
    VERS.forEach((v, j) => {
      const p = K.eo(K.prog(t, tAxis11 + 0.08 * j, tAxis11 + 0.08 * j + 0.25));
      if (p <= 0) return;
      const k = formalIdx.indexOf(j);
      const f = k >= 0 ? K.eo(K.prog(t, tReal11 + 0.1 * k, tReal11 + 0.1 * k + 0.3)) : 0;
      ctx.globalAlpha = a * p;
      ctx.beginPath();
      ctx.arc(VX(j), AXY, 6, 0, 6.283);
      ctx.fillStyle = f > 0 ? K.mix("#07080c", C.text, f) : "#07080c";
      ctx.fill();
      ctx.strokeStyle = f > 0 ? K.mix("#5a5f68", C.text, f) : "#5a5f68";
      ctx.lineWidth = 1;
      ctx.stroke();
      if (f > 0.5) {
        ctx.save();
        ctx.shadowColor = C.text;
        ctx.shadowBlur = 10 * P.pulse(t, tReal11 + 0.1 * k, 0.1, 0.8);
        ctx.stroke();
        ctx.restore();
      }
    });
    // 预注册小卡
    for (const d of docT) {
      const p = K.eo(K.prog(t, d.t, d.t + 0.25));
      if (p <= 0) continue;
      ctx.globalAlpha = a * p;
      const x = VX(d.j) - 56;
      const y = 676 - 14 * (1 - p);
      K.rr(ctx, x + 0.5, y + 0.5, 111, 79, 6);
      ctx.fillStyle = "#0d0f14";
      ctx.fill();
      ctx.strokeStyle = t >= tWrite12 ? K.mix("#3a3e46", "#8a8f98", K.prog(t, tWrite12, tWrite12 + 0.3)) : "#3a3e46";
      ctx.stroke();
      ctx.fillStyle = "#3a3e46";
      ctx.fillRect(VX(d.j), y + 80, 1, AXY - y - 86);
    }
    // 14 张判定签：十几个比较，5 个成立的闪一下紫；v0.3 那张已经在第 8 句判过，是红粉
    if (t >= tMany13 && tagOut > 0) {
      for (const x of VT) {
        const p = K.eo(K.prog(t, tMany13 + 0.05 * x.i, tMany13 + 0.05 * x.i + 0.25));
        if (p <= 0) continue;
        ctx.globalAlpha = a * p * tagOut;
        const y = 628 - 12 * (1 - p) - 40 * K.eio(K.prog(t, tFly, tFly + 0.4));
        K.rr(ctx, x.x + 0.5, y + 0.5, 33, 23, 4);
        const lit = x.v.ok ? P.pulse(t, t5v13 + 0.06 * x.i, 0.12, 1.1) : 0;
        const red = x.i === 0;
        ctx.fillStyle = red ? C.red[0] : lit > 0 ? K.mix("#14161b", C.main[1], lit) : "#14161b";
        ctx.fill();
        ctx.strokeStyle = red ? C.red[1] : lit > 0 ? K.mix("#2a2d33", C.main[2], lit) : "#2a2d33";
        ctx.stroke();
      }
    }
  };

  // ================= F：头条——同一晚官方执行准确率 49.5% → 57.9%（第 14 句）=================
  const fTag1 = P.tag(si, 140, 236, "SAME NIGHT · 同一晚", C.gray, true);
  const fTag2 = P.tag(si, 440, 236, "OFFICIAL EX · 官方", C.gray, true);
  const fTag3 = P.tag(si, 730, 236, "TEST · 1501 TASKS", C.gray, true);
  const fL1 = P.tx(si, 140, 300, "BASE · 原版", P.MONO20, C.gray);
  const fN1 = P.tx(si, 140, 326, "49.5%", MONO(120), C.main[1]);
  const fS1 = P.tx(si, 140, 460, "743 / 1501", P.MONO24, C.gray);
  const fL2 = P.tx(si, 140, 560, "FINAL · 最终系统 · 3 SEEDS 平均", P.MONO20, C.gray);
  const fN2 = P.tx(si, 140, 586, "57.9%", MONO(120), C.main[2]);
  const fS2 = P.tx(si, 140, 720, "869 / 1501", P.MONO24, C.gray);
  const BF = P.board(si, 640, 430, {});
  BF.set("bEx", t495, 0.9).set("rlbEx", t579, 1.0);
  const SF = 0.7;
  const fLeg1 = P.tx(si, 640, 652, "■ 原版答对", P.MONO20, C.main[1]);
  const fLeg2 = P.tx(si, 840, 652, "", P.MONO20, C.main[2]);
  const cvF = layer();
  const upF = (t) => {
    const out = t15 + 1.0;
    const dim = 1 - 0.85 * K.eo(K.prog(t, t15, t15 + 0.5));
    const a = P.win(t, t14, out, 0.3, 0.3) * dim;
    K.vis(fTag1, a);
    K.vis(fTag2, a * K.prog(t, tOff14, tOff14 + 0.3));
    K.vis(fTag3, a * K.prog(t, tEval14, tEval14 + 0.3));
    K.vis(fL1, a * K.prog(t, t495 - 0.2, t495));
    K.vis(fN1, a * K.prog(t, t495, t495 + 0.2));
    K.bigNum(fN1, t, t495, [C.main[0], C.main[1], C.main[1]], "49.5%");
    K.vis(fS1, a * K.prog(t, t495 + 0.3, t495 + 0.6));
    K.vis(fL2, a * K.prog(t, t579 - 0.2, t579));
    K.vis(fN2, a * K.prog(t, t579, t579 + 0.2));
    K.bigNum(fN2, t, t579, C.main, "57.9%");
    K.vis(fS2, a * K.prog(t, t579 + 0.3, t579 + 0.6));
    BF.place(0, 0, SF);
    BF.up(t, a * K.prog(t, tEval14, tEval14 + 0.3), { labels: 0 });
    K.vis(fLeg1, a * K.prog(t, t495 + 0.2, t495 + 0.5) * (1 - 0.65 * K.prog(t, t579, t579 + 0.4)));
    K.vis(fLeg2, a * K.prog(t, t579 + 0.3, t579 + 0.6));
    K.html(fLeg2, `<span style="color:${K.mixHex(C.main[0], C.main[1], 0.45)}">■</span><span style="color:${C.main[1]}">■</span><span style="color:${C.main[2]}">■</span> 最终：三个种子里对了 1 / 2 / 3 次`);
    if (!cvF.begin(a)) return;
    const ctx = cvF.ctx;
    ctx.globalAlpha = a;
    const pa = K.eo(K.prog(t, tTo14, tTo14 + 0.35));
    if (pa > 0) P.arrow(ctx, 200, 500, 200, 500 + 46 * pa, C.main[1], 8);
  };

  // ================= G：电话题卡回到中间（第 15 句）=================
  const QG = P.qcard(si, 300, 300, 940);
  const pJ = K.panel(si, 300, 580, 940, 120, P.GRAY[2], "EXEC RESULT · 执行结果");
  const jY = P.tx(pJ.el, 90, 54, "和标准答案一致 → 1", SANS(28, 600), C.main[2]);
  const jN = P.tx(pJ.el, 560, 54, "不一致 → 0", SANS(28, 600), C.red[2]);
  const cvG = layer();
  const qm = P.ctr(si, 1500, 300, "?", '900 300px/320px "HF Sans", sans-serif', "transparent");
  qm.style.webkitTextStroke = `3px ${C.main[1]}`;
  const upG = (t) => {
    const out = tEnd - 0.35;
    const aq = QG.up(t, t15 + 0.15, out, 0.3);
    QG.hl("phone", K.eo(K.prog(t, tPhone15, tPhone15 + 0.3)));
    const aj = pJ.up(t, tExec15, out, 0.3);
    vin(jY, aj, K.prog(t, tRight15, tRight15 + 0.25));
    vin(jN, aj, K.prog(t, tRight15 + 0.3, tRight15 + 0.55));
    const aqm = P.win(t, tHow15, out, 0.3, 0.3);
    K.vis(qm, aqm);
    K.tf(qm, `translateX(-50%) scale(${(0.9 + 0.1 * K.back(K.prog(t, tHow15, tHow15 + 0.4))).toFixed(3)})`);
    qm.style.textShadow = aqm > 0 ? `0 0 ${(18 * P.pulse(t, tHow15, 0.15, 1.2) + 4).toFixed(1)}px ${K.rgba(C.main[2], 0.5)}` : "none";
    if (!cvG.begin(Math.max(aq, aj))) return;
    const ctx = cvG.ctx;
    ctx.globalAlpha = aj;
    P.check(ctx, 360, 652, 30, C.main[2], K.eo(K.prog(t, tRight15, tRight15 + 0.3)), 3);
    P.cross(ctx, 830, 652, 30, C.red[2], K.eo(K.prog(t, tRight15 + 0.3, tRight15 + 0.6)), 3);
    const pu = P.pulse(t, tPhone15, 0.1, 0.9) * aq;
    if (pu > 0.01) {
      ctx.save();
      ctx.globalAlpha = pu;
      ctx.shadowColor = C.amb[2];
      ctx.shadowBlur = 18;
      ctx.strokeStyle = C.amb[2];
      K.rr(ctx, 300.5, 300.5, 939, P.QH - 1, 16);
      ctx.stroke();
      ctx.restore();
    }
  };

  return (t) => {
    upA(t);
    upB1(t);
    upB2(t);
    upC(t);
    upD(t);
    upE(t);
    upF(t);
    upG(t);
  };
});
