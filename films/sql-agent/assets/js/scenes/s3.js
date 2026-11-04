// 第 3 章：先考老师，再筛轨迹、设门槛和补题。所有动画由绝对时间驱动。
K.scene("s3", (si, win) => {
  const C = K.C;
  const V7 = EFA.k.v07;
  const V8 = EFA.k.v08;
  const studentKept = EFA.k.v05.kept;
  const VS = EFA.verdicts;
  const L = (n) => K.seg(n).t0 - 0.08;
  const at = (n, s, k = 1) => K.w(n, s, k) - 0.08;
  const M = P.mono;
  const S = P.sans;
  const num = K.fmt;
  const inAt = (t, a, dur = 0.32) => K.eo(K.prog(t, a, a + dur));
  const flash = (t, on, dur = 0.7) => Math.min(K.prog(t, on, on + 0.1), 1 - K.prog(t, on + dur - 0.2, on + dur));
  const phase = (t, a, b) => Math.min(K.prog(t, a, a + 0.3), 1 - K.prog(t, b - 0.28, b));
  const tint = (e, t, tt, col = C.text) => K.col(e, P.lightCol(t, tt, col));
  const show = (e, a, t, tt, dur = 0.25) => K.vis(e, a * K.prog(t, tt, tt + dur));
  const panel = (x, y, w, h, label, color = P.GRAY[2]) => K.panel(si, x, y, w, h, color, label);
  // 非口述数字用灰色小标，百分比和口述主数才用大字。
  const tx = (x, y, text, px = 28, col = C.text) => P.tx(si, x, y, text, S(px), col);
  const mn = (x, y, text, px = 96, col = C.text) => P.tx(si, x, y, text, M(px), col);
  const ct = (x, y, text, px = 28, col = C.text) => P.ctr(si, x, y, text, S(px), col);
  const cm = (x, y, text, px = 96, col = C.text) => P.ctr(si, x, y, text, M(px), col);
  const tag = (xr, y, text, col = C.gray) => P.tag(si, xr, y, text, col);
  const recolorPanel = (p, a) => K.vis(p.el, a);
  const rect = (c, x, y, w, h, stroke, fill = null, r = 8) => {
    K.rr(c, x + 0.5, y + 0.5, w - 1, h - 1, r);
    if (fill) { c.fillStyle = fill; c.fill(); }
    if (stroke) { c.strokeStyle = stroke; c.lineWidth = 1; c.stroke(); }
  };
  const line = (c, x0, y0, x1, y1, col, lw = 1) => {
    c.strokeStyle = col; c.lineWidth = lw; c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke(); c.lineWidth = 1;
  };
  const dot = (c, x, y, r, col) => { c.fillStyle = col; c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill(); };
  const gridAt = (i, x, y, cols, pitch) => [x + (i % cols) * pitch, y + Math.floor(i / cols) * pitch];
  // 这里只还原汇总数量，不把排序当成真实题目的身份。
  const ranks = (n, seed) => {
    const order = Array.from({ length: n }, (_, i) => i).sort((a, b) => K.hash(a, seed) - K.hash(b, seed));
    const rank = new Array(n); order.forEach((i, j) => { rank[i] = j; }); return rank;
  };

  const T = {
    a: L(55), bigModel: at(55, "大模型"), flow: at(55, "做题过程"), distill: at(55, "蒸馏"), four: at(55, "4B"),
    b: L(56), b32: at(56, "三十二"),
    c: L(57), official: at(57, "官方"), teacher: at(57, "50.9%"), student: at(57, "58.3%"), gap: at(57, "7个"),
    d: L(58), third: at(58, "三分之一"), noQuery: at(58, "不查"),
    e: L(59), sample: at(59, "抽查"), nVal: at(59, "1612"), queried: at(59, "572"),
    f: L(60), equal: at(60, "同样多"), tTrain: at(60, "学老师"), rTrain: at(60, "学自己"), noDiff: at(60, "分不出高低"),
    g: L(61), notProof: at(61, "说明不了"), noAdv: at(61, "没有优势"), before: at(61, "开跑之前"), mistake: at(61, "设计"),
    h: L(62), single: at(62, "一个随机种子"), seed: at(62, "随机种子"), explore: at(62, "探索"), filter: at(62, "执行结果"), filtered: at(62, "筛过"), raw: at(62, "不筛"), gain: at(62, "10个"),
    i: L(63), half: at(63, "一半"), wrong: at(63, "错"),
    j: L(64), v8: at(64, "零点八"), gate: at(64, "门槛"), gateTeacher: at(64, "老师"), dev: at(64, "开发"), gateBase: at(64, "原版"), five: at(64, "5个"), lower: at(64, "下界"), positive: at(64, "大于零"), reject: at(64, "不过线"),
    k: L(65), project: at(65, "项目判分"), b235: at(65, "二百三十五"), d62: at(65, "62.1%"), d54: at(65, "54.1%"), eight: at(65, "8个"), passed: at(65, "过了"),
    l: L(66), allWrong: at(66, "3247"), done: at(66, "3097"), fourPass: at(66, "4", 2), solved: at(66, "832"),
    m: L(67), again832: at(67, "832条"), merge: at(67, "补进"), kept: at(67, "3435条"),
    n: L(68), test: at(68, "测试集"), p24: at(68, "2.4个"), lo08: at(68, "0.8"), holds: at(68, "成立"),
    o: L(69), fourAgain: at(69, "4B"), gold: at(69, "标准答案"), redo: at(69, "自己再做"), fails: at(69, "没过线"),
    p: L(70), dpo: at(70, "DPO"), ptr: at(70, "离线起点"), sameNight: at(70, "同一晚"), pj: at(70, "项目判分"), p66: at(70, "6.6个"), bulk: at(70, "大头"),
  };
  const weak = K.seg(61).t1 - 0.25;
  P.vLight[2] = T.noDiff;
  P.vLight[3] = weak;
  P.vLight[4] = T.holds;
  P.vLight[5] = T.fails;

  K.plans.push({
    t0: win.t0, t1: win.t1, chip: "03", chap: "老师先考过学生",
    lab: "THE TEACHER SITS THE EXAM FIRST · v0.7 → v0.8",
    tele: (t) => t < T.c ? "▸ DISTILLATION · TEACHER TRAJECTORIES → 4B STUDENT"
      : t < T.e ? `▸ VALIDATION · OFFICIAL EX · 32B ${V7.teacherVal.toFixed(1)}% / STUDENT ${V7.studentVal.toFixed(1)}%`
      : t < T.f ? `▸ T · SEED 42 · QUERY FIRST ${num(V7.tQueried)} / ${num(V7.valTasks)}`
      : t < T.h ? "▸ v0.7 · EQUAL DATA · T − R · CI CROSSES ZERO"
      : t < T.j ? `▸ EXPLORATORY · ONE SEED · FILTERED − RAW ${P.fs(V7.tMinusRaw.m)}`
      : t < T.l ? `▸ GATE ≥ ${P.fs(V8.gate)} · LOWER BOUND > 0 · DEV ${V8.teacherDev.toFixed(1)} VS ${V8.baseDev.toFixed(1)}`
      : t < T.n ? `▸ ${num(V8.allWrong)} TASKS · ${num(V8.done)} DONE · +${num(V8.solved)} TRAJECTORIES`
      : t < T.p ? `▸ PROJECT · TEST · TR − R ${P.fs(V8.trMinusR.m)} · HR − R NOT ESTABLISHED`
      : `▸ PROJECT · SAME NIGHT · TR → DPO → PTR · ${P.fs(V8.ptrMinusB)}`,
    titles: [
      { t: T.a, text: "让小模型{学做题过程}", color: C.amb[2] },
      { t: T.b, text: "先请 {32B} 当老师", color: C.amb[2] },
      { t: T.c, text: "老师先{考一遍}", color: C.amb[2] },
      { t: T.gap, text: `老师反而{低了 ${(V7.studentVal - V7.teacherVal).toFixed(1)} 点}`, color: C.red[2] },
      { t: T.d, text: "约三分之一{不查就交}", color: C.red[2] },
      { t: T.e, text: "学了老师，{还查不查}" },
      { t: T.f, text: "同样数据，{分不出高低}", color: C.red[2] },
      { t: T.g, text: "这个老师{没有优势}" },
      { t: T.before, text: "开跑之前，{先测老师}", color: C.amb[2] },
      { t: T.h, text: "先看{筛过的轨迹}", color: C.gray },
      { t: T.i, text: "不筛，{一半多是错的}", color: C.red[2] },
      { t: T.j, text: "先立一道{门槛}" },
      { t: T.k, text: "{235B} 先过门槛", color: C.amb[2] },
      { t: T.l, text: "老师补{学生全错的题}", color: C.amb[2] },
      { t: T.m, text: `{${V8.solved} 条}补进学生数据`, color: C.amb[2] },
      { t: T.n, text: "过门槛，再补题：{成立}" },
      { t: T.o, text: "带答案自己重做，{没过线}", color: C.red[2] },
      { t: T.p, text: "补题后接 DPO，{离线起点}" },
      { t: T.p66, text: `项目判分，{高约 ${V8.ptrMinusB.toFixed(1)} 点}` },
    ],
  });
  K.plates.push({ t0: win.t0, t1: win.t1, text: "v0.7 → v0.8" });

  // A：做题过程沿轨迹流向小模型；图形是示意，不伪造执行记录。
  const pA = panel(140, 230, 1640, 630, "DISTILLATION · 蒸馏", C.amb[1]);
  const cvA = P.layer(si);
  const aTeacher = tx(220, 330, "大模型 · 老师", 40, C.amb[2]);
  const aSize = mn(220, 408, "32B", 110, C.amb[2]);
  const aStudent = tx(1360, 330, "小模型 · 学生", 40);
  const aFour = mn(1360, 408, "4B", 110);
  const aSieve = ct(960, 652, "学做题过程", 40, C.amb[2]);
  const aGoal = ct(960, 744, "补做学生做不对的题", 32);
  const aIllustration = tag(1744, 260, "ILLUSTRATIVE · 示意");
  const aSteps = ["SCHEMA", "QUERY", "FINISH"].map((s, i) => cm(660 + i * 250, 472, s, 26, C.amb[2]));
  const upA = (t) => {
    const a = phase(t, win.t0, T.c - 0.1);
    pA.up(t, win.t0 - 0.08, T.c - 0.1, 0.28); recolorPanel(pA, a);
    [aTeacher, aStudent, aIllustration].forEach((e) => K.vis(e, a));
    show(aSize, a, t, T.b32); P.glow(aSize, t, T.b32, C.amb);
    show(aFour, a, t, T.four);
    show(aSieve, a, t, T.distill); show(aGoal, a, t, T.four + 0.1);
    aSteps.forEach((e, i) => show(e, a, t, T.flow + i * 0.32));
    if (!cvA.begin(a)) return;
    const c = cvA.ctx; c.globalAlpha = a;
    rect(c, 194, 306, 360, 278, C.amb[1], K.rgba(C.amb[1], 0.36 * flash(t, T.bigModel))); rect(c, 1318, 306, 400, 278, P.GRAY[1]);
    for (let j = 0; j < 3; j++) {
      const x = 558 + j * 250;
      const p = inAt(t, T.flow + j * 0.32, 0.5);
      rect(c, x, 432, 204, 110, K.mixHex(P.GRAY[0], C.amb[1], p), K.rgba(C.amb[1], 0.55 * flash(t, T.flow + j * 0.32)));
      if (j < 2) P.arrow(c, x + 210, 487, x + 242, 487, K.mixHex(P.GRAY[0], C.amb[1], p));
    }
    P.arrow(c, 1280, 487, 1310, 487, C.amb[1]);
    // 三条细轨迹错开行进，构图底部用题目骨架占住。
    for (let j = 0; j < 3; j++) {
      const q = K.prog(t, T.flow + j * 0.38, T.flow + j * 0.38 + 1.8);
      if (q > 0 && q < 1) dot(c, K.lerp(560, 1310, q), 564 + 14 * j, 3, C.amb[2]);
    }
    for (let j = 0; j < 6; j++) {
      const x = 410 + j * 188; const p = inAt(t, T.a + j * 0.15);
      rect(c, x, 640, 140, 166, K.mixHex(P.GRAY[0], P.GRAY[1], p));
      for (let k = 0; k < 4; k++) {
        c.fillStyle = K.mixHex("#22252d", "#5a5f67", 0.35 * p);
        c.fillRect(x + 18, 666 + k * 25, 78 + K.hash(j, k) * 24, 2);
      }
    }
    c.fillStyle = "#0d0f14"; c.fillRect(650, 642, 620, 58); c.fillRect(560, 733, 800, 53);
  };

  // B：同一官方 EX 轴比较老师、学生；右侧先读差值，再转成不查的扇形。
  const pB = panel(140, 230, 970, 630, "VALIDATION · 验证集");
  const pBD = panel(1140, 230, 640, 630, "TEACHER DIAGNOSIS · 老师诊断");
  const cvB = P.layer(si);
  const bTag = tag(1074, 260, "OFFICIAL EX · 官方");
  const bTL = cm(380, 456, "32B 老师", 32, C.amb[2]);
  const bSL = ct(800, 456, "学生", 32);
  const bTN = cm(380, 330, "—", 96, C.amb[2]);
  const bSN = cm(800, 330, "—", 96, C.text);
  const bGapL = tx(1180, 314, "老师 − 学生", 30);
  const bGapN = mn(1180, 364, P.fs(V7.teacherVal - V7.studentVal), 110, C.red[2]);
  const bGapU = tx(1590, 434, "点", 30, C.gray);
  const bThird = cm(1460, 612, "1/3", 96, C.red[2]);
  const bThirdL = ct(1460, 734, "约 · 不查就交", 32, C.red[2]);
  const bThirdNote = ct(1460, 790, "老师自己的行为", 24, C.gray);
  const bTicks = [0, 20, 40, 60].map((v) => P.tx(si, 182, 790 - v / 65 * 302 - 12, `${v}%`, P.MONO20, C.gray));
  const upB = (t) => {
    const a = phase(t, T.c, T.e - 0.08);
    for (const p of [pB, pBD]) { p.up(t, T.c, T.e - 0.08, 0.28); recolorPanel(p, a); }
    [bTag, bTL, bSL].forEach((e) => K.vis(e, a));
    K.vis(bTN, a); K.vis(bSN, a);
    K.put(bTN, t < T.teacher ? "—" : K.roll(t, T.teacher, 0.38, 0, V7.teacherVal, 1) + "%");
    K.put(bSN, t < T.student ? "—" : K.roll(t, T.student, 0.38, 0, V7.studentVal, 1) + "%");
    P.glow(bTN, t, T.teacher, C.amb);
    K.vis(bGapL, a); tint(bGapL, t, T.gap);
    K.vis(bGapN, a); K.put(bGapN, t < T.gap ? "—" : P.fs(V7.teacherVal - V7.studentVal));
    show(bGapU, a, t, T.gap);
    P.glow(bGapN, t, T.gap, C.red);
    K.vis(bThird, a); K.put(bThird, t < T.third ? "—" : "1/3");
    K.col(bThird, t < T.third ? P.DIM : C.red[2]);
    K.vis(bThirdL, a); tint(bThirdL, t, T.third, C.red[2]);
    show(bThirdNote, a, t, T.noQuery);
    bTicks.forEach((e) => K.vis(e, a));
    if (!cvB.begin(a)) return;
    const c = cvB.ctx; c.globalAlpha = a;
    for (const v of [0, 20, 40, 60]) line(c, 250, 790 - v / 65 * 302, 1040, 790 - v / 65 * 302, v ? "#24272e" : P.GRAY[1]);
    [V7.teacherVal, V7.studentVal].forEach((v, i) => {
      const x = i ? 710 : 290; const tt = i ? T.student : T.teacher; const p = inAt(t, tt, 0.55);
      const h = v / 65 * 302 * p;
      rect(c, x, 504, 180, 286, "#343840");
      c.fillStyle = i ? "#c9c4bb" : C.amb[1]; c.fillRect(x, 790 - h, 180, h);
      line(c, x, 790 - h, x + 180, 790 - h, i ? C.text : C.amb[2], 2);
      const scan = K.prog(t, tt, tt + 0.75);
      if (scan > 0 && scan < 1) line(c, x - 12, 790 - h, x + 192, 790 - h, C.text);
    });
    const p = inAt(t, T.third, 0.55); const x = 1460; const y = 675;
    c.lineWidth = 8; c.strokeStyle = "#2a2d33"; c.beginPath(); c.arc(x, y, 118, -Math.PI / 2, Math.PI * 1.5); c.stroke(); c.lineWidth = 1;
    if (p > 0) {
      c.lineWidth = 8;
      c.strokeStyle = C.red[1]; c.beginPath(); c.arc(x, y, 118, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 / 3 * p); c.stroke(); c.lineWidth = 1;
    }
  };

  // C：1,612 格，只点亮抽查模型先查的 572 格。
  const pC = panel(140, 230, 1640, 630, "QUERY FIRST · 学老师数据后的学生");
  const cvC = P.layer(si);
  const cSeed = tag(1744, 260, "SEED 42 · 抽查");
  const cCountMap = tx(176, 818, "COUNT MAP · 按数量排布，不对应题号", 20, C.gray);
  const cNL = tx(1290, 330, "验证题", 30);
  const cN = mn(1290, 374, "—", 96);
  const cQL = tx(1290, 548, "先查了", 30, C.main[2]);
  const cQ = mn(1290, 592, "—", 110, C.main[2]);
  const cSL = tx(1290, 756, "T · 学老师数据", 24, C.gray);
  const cRank = ranks(V7.valTasks, 17);
  const upC = (t) => {
    const a = phase(t, T.e, T.f - 0.08);
    pC.up(t, T.e, T.f - 0.08, 0.28); recolorPanel(pC, a);
    [cSeed, cCountMap, cNL, cN, cQL, cQ, cSL].forEach((e) => K.vis(e, a));
    K.put(cN, t < T.nVal ? "—" : num(V7.valTasks));
    K.put(cQ, t < T.queried ? "—" : K.roll(t, T.queried, 0.5, 0, V7.tQueried));
    P.glow(cQ, t, T.queried, C.main);
    tint(cSeed, t, T.sample, C.gray);
    if (!cvC.begin(a)) return;
    const c = cvC.ctx; c.globalAlpha = a;
    const shown = Math.floor(V7.tQueried * inAt(t, T.queried, 0.7));
    const skeleton = inAt(t, T.nVal, 0.5);
    for (let i = 0; i < V7.valTasks; i++) {
      const [x, y] = gridAt(i, 176, 360, 62, 17);
      c.fillStyle = cRank[i] < shown ? C.main[1] : K.mixHex("#15181e", "#30343d", skeleton);
      c.fillRect(x, y, 11, 11);
    }
    const q = K.prog(t, T.queried, T.queried + 0.7);
    if (q > 0 && q < 1) line(c, 176 + 1054 * q, 350, 176 + 1054 * q, 800, C.main[2]);
  };

  // D：正式比较和设计反思；TR−R 的弱阳性只做小注，避免抢主结论。
  const pD = panel(140, 230, 1640, 630, "EQUAL DATA · 同样多的数据");
  const cvD = P.layer(si);
  const dTag = tag(1744, 260, "PROJECT · 项目判分");
  const dTeacher = tx(190, 334, "学老师", 40, C.amb[2]);
  const dStudent = P.txr(si, 1730, 334, "学自己", S(40), C.text);
  const dModelT = mn(190, 390, "T · 32B 轨迹", 24, C.amb[2]);
  const dModelR = P.txr(si, 1730, 390, "R · 学生轨迹", S(24), C.gray);
  const dData = ct(960, 332, "等量训练数据", 32, C.gray);
  const dCount = cm(960, 392, `各 ${num(V7.rawN)} 条`, 20, C.gray);
  const dCI = P.ci(si, 610, 450, 700, V7.tMinusR, { min: -3, max: 5 });
  const dFail = ct(960, 600, "分不出高低", 40, C.red[2]);
  const dLimit = ct(960, 600, "这个老师没有优势", 40);
  const dBefore = ct(960, 678, "开跑之前，先测老师", 40, C.amb[2]);
  const dMistake = ct(960, 752, "设计上的失误", 40);
  const dWeak = P.txr(si, 1732, 810, `TR − R ${P.fs(VS[3].m)} · 勉强`, P.MONO24, C.main[2]);
  const dWeakHUD = P.ctr(si, 1440, 204, "勉强", P.MONO20, C.gray);
  const upD = (t) => {
    const a = phase(t, T.f, T.h + 0.42);
    const back = 1 - 0.78 * inAt(t, T.noAdv);
    pD.up(t, T.f, T.h + 0.55, 0.28); recolorPanel(pD, a);
    K.vis(dTag, a);
    show(dTeacher, a * back, t, T.tTrain); show(dModelT, a * back, t, T.tTrain);
    show(dStudent, a * back, t, T.rTrain); show(dModelR, a * back, t, T.rTrain);
    show(dData, a * back, t, T.equal);
    show(dCount, a * back, t, T.equal);
    dCI.up(t, a * back, T.noDiff);
    K.vis(dFail, a * inAt(t, T.noDiff) * (1 - inAt(t, T.notProof)));
    show(dLimit, a, t, T.noAdv); show(dBefore, a, t, T.before); show(dMistake, a, t, T.mistake);
    show(dWeak, a, t, weak, 0.15);
    const weakA = phase(t, weak, T.j);
    K.vis(dWeakHUD, weakA);
    if (P.vSlots) K.at(dWeakHUD, P.vSlots.slots[3] + P.vSlots.TW / 2, 204);
    if (!cvD.begin(a)) return;
    const c = cvD.ctx; c.globalAlpha = a * back;
    const z = inAt(t, T.rTrain, 0.5);
    [190, 1494].forEach((x, j) => {
      const p = inAt(t, j ? T.rTrain : T.tTrain);
      for (let i = 0; i < V7.rawN; i++) {
        const [xb, yb] = gridAt(i, j ? 1194 : 190, 500, 80, 7);
        const [xs, ys] = gridAt(i, x, 450, 60, 4);
        c.fillStyle = K.mixHex("#24272e", j ? "#c9c4bb" : C.amb[1], p);
        c.fillRect(K.lerp(xb, xs, z), K.lerp(yb, ys, z), K.lerp(4, 2, z), K.lerp(4, 2, z));
      }
    });
    const p = inAt(t, T.before, 0.8);
    c.globalAlpha = a;
    line(c, 560, 734, 560 + p * 800, 734, P.GRAY[1]);
  };

  // E：探索只有差值，不捏造两种训练的绝对成绩；零高柱明确是未筛基准。
  const pE = panel(140, 230, 1640, 630, "FILTER BY EXECUTION · 轨迹筛选");
  pE.el.style.borderStyle = "dashed";
  const cvE = P.layer(si);
  const eTag = tag(1744, 260, "EXPLORATORY · 单种子");
  const eAxis = tx(176, 312, "相对没筛 · 提升百分点", 24, C.gray);
  const eYes = ct(510, 558, "筛过", 30);
  const eNo = ct(820, 558, "没筛 · 基准", 30, C.gray);
  const eN = mn(1160, 330, P.fs(V7.tMinusRaw.m), 110);
  const eCI = mn(1164, 456, `[${P.fs(V7.tMinusRaw.lo)}, ${P.fs(V7.tMinusRaw.hi)}]`, 24, C.gray);
  const eWhy = tx(1164, 510, "筛过的更高", 30);
  const eRaw = mn(176, 608, `${num(V7.rawN)} 条 · 没筛`, 20, C.gray);
  const eWrong = P.txr(si, 1744, 610, `${num(V7.rawWrong)} 条答案错`, P.MONO20, C.gray);
  const eHalf = tx(1390, 700, "一半多", 40, C.red[2]);
  const eErr = tx(1390, 760, "答案是错的", 28, C.red[2]);
  const eRawRank = ranks(V7.rawN, 31);
  const upE = (t) => {
    const a = phase(t, T.h + 0.5, T.j - 0.08);
    pE.up(t, T.h + 0.5, T.j - 0.08, 0.28); recolorPanel(pE, a);
    [eTag, eAxis, eYes, eNo, eRaw, eWrong].forEach((e) => K.vis(e, a));
    tint(eTag, t, T.explore, C.gray); tint(eYes, t, T.filtered); tint(eNo, t, T.raw, C.gray);
    const seedFlash = flash(t, T.seed), filterFlash = flash(t, T.filter);
    if (seedFlash > 0) K.col(eTag, K.mix(C.gray, C.text, seedFlash));
    show(eN, a, t, T.gain); show(eCI, a, t, T.gain + 0.15); show(eWhy, a, t, T.gain + 0.2);
    K.put(eN, t < T.gain ? P.fs(V7.tMinusRaw.m) : "+" + K.roll(t, T.gain, 0.35, 0, V7.tMinusRaw.m, 1));
    show(eHalf, a, t, T.half); show(eErr, a, t, T.wrong);
    if (!cvE.begin(a)) return;
    const c = cvE.ctx; c.globalAlpha = a;
    c.fillStyle = K.rgba(C.gray, 0.5 * seedFlash); c.fillRect(1318, 254, 426, 40);
    c.fillStyle = K.rgba(C.gray, 0.38 * flash(t, T.explore)); c.fillRect(340, 350, 620, 190);
    c.fillStyle = K.rgba(C.gray, 0.45 * filterFlash); c.fillRect(1102, 538, 526, 58);
    const base = 540; const scale = 16;
    for (const v of [0, 5, 10, 15]) {
      line(c, 340, base - v * scale, 960, base - v * scale, "#292c34");
      c.fillStyle = C.gray; c.font = M(20, 500).replace(/\/\d+px/, ""); c.fillText(String(v), 300, base - v * scale + 6);
    }
    const bp = inAt(t, T.gain, 0.65);
    c.fillStyle = "#b8bbc1"; c.fillRect(430, base - V7.tMinusRaw.m * scale * bp, 160, V7.tMinusRaw.m * scale * bp);
    line(c, 740, base, 900, base, C.gray, 3);
    // 筛子逐层落下，只是机制示意，不额外编码样本数。
    const sieve = inAt(t, T.filter, 0.5);
    for (let j = 0; j < 3; j++) {
      const x = 1110 + j * 180;
      const sieveColor = K.mixHex(P.GRAY[1], C.text, filterFlash);
      line(c, x, 550, x + 70 * sieve, 570, sieveColor); line(c, x + 70 * sieve, 570, x, 590, sieveColor);
    }
    const nr = Math.floor(V7.rawWrong * inAt(t, T.half, 0.8));
    const wrongFlash = flash(t, T.filtered);
    for (let i = 0; i < V7.rawN; i++) {
      const [x, y] = gridAt(i, 176, 656, 149, 8);
      c.fillStyle = eRawRank[i] < nr ? C.red[1] : eRawRank[i] < V7.rawWrong ? K.mixHex("#3a3e46", C.red[2], wrongFlash) : "#3a3e46"; c.fillRect(x, y, 4, 4);
    }
    const q = K.prog(t, T.half, T.half + 0.8);
    if (q > 0 && q < 1) line(c, 176 + 1192 * q, 648, 176 + 1192 * q, 844, C.red[2]);
  };

  // F：开发集项目判分。门槛约束均值，下界只需大于零，二者分开画。
  const pF = panel(140, 230, 1640, 630, "TEACHER GATE · 老师准入");
  const cvF = P.layer(si);
  const fTag = tag(1744, 260, "PROJECT · DEV");
  const fMean = tx(176, 330, "平均提升至少", 32);
  const fFive = mn(176, 386, `+${V8.gate.toFixed(1)}`, 110);
  const fLo = tx(176, 552, "区间下界 > 0", 32);
  const fReject = tx(176, 652, "不过线就不用", 32, C.red[2]);
  const fTeacher = cm(976, 324, "—", 96, C.amb[2]);
  const fBase = cm(1396, 324, "—", 96);
  const fTL = cm(976, 440, "235B 老师", 30, C.amb[2]);
  const fBL = ct(1396, 440, "原版", 30);
  const fDelta = mn(1500, 692, P.fs(V8.gateDiff.m), 96, C.main[2]);
  const fRange = mn(720, 676, `[${P.fs(V8.gateDiff.lo)}, ${P.fs(V8.gateDiff.hi)}]`, 24, C.gray);
  const fPass = tx(176, 746, "过了", 40, C.main[2]);
  const fGate = cm(720 + (V8.gate + 2) / 17 * 730, 804, `+${V8.gate.toFixed(0)} · 均值门槛`, 24, C.gray);
  const fZero = mn(720 + 2 / 17 * 730 - 6, 804, "0", 20, C.gray);
  const FX = (v) => 720 + (v + 2) / 17 * 730;
  const upF = (t) => {
    const a = phase(t, T.j, T.l - 0.08);
    pF.up(t, T.j, T.l - 0.08, 0.28); recolorPanel(pF, a);
    [fTag, fMean, fTeacher, fBase].forEach((e) => K.vis(e, a));
    tint(fTag, t, T.dev, C.gray);
    const devFlash = flash(t, T.dev);
    if (devFlash > 0) K.col(fTag, K.mix(C.gray, C.text, devFlash));
    show(fFive, a, t, T.five); show(fLo, a, t, T.lower); tint(fLo, t, T.positive);
    show(fReject, a, t, T.reject); K.vis(fReject, a * inAt(t, T.reject) * (1 - inAt(t, T.passed)));
    show(fTL, a, t, T.b235); show(fBL, a, t, T.k);
    K.put(fTeacher, t < T.d62 ? "—" : K.roll(t, T.d62, 0.35, 0, V8.teacherDev, 1) + "%");
    K.put(fBase, t < T.d54 ? "—" : K.roll(t, T.d54, 0.35, 0, V8.baseDev, 1) + "%");
    P.glow(fTeacher, t, T.d62, C.amb);
    show(fDelta, a, t, T.eight); show(fRange, a, t, T.eight + 0.1); show(fPass, a, t, T.passed);
    P.glow(fDelta, t, T.passed, C.main);
    show(fGate, a, t, T.five); show(fZero, a, t, T.lower);
    if (!cvF.begin(a)) return;
    const c = cvF.ctx; c.globalAlpha = a;
    c.fillStyle = K.rgba(C.gray, 0.5 * devFlash); c.fillRect(1496, 254, 248, 40);
    [T.gateTeacher, T.gateBase].forEach((on, index) => {
      const focus = flash(t, on), x = index ? 1306 : 886;
      c.fillStyle = K.rgba(index ? C.text : C.amb[1], 0.36 * focus);
      c.fillRect(x - 14, 312, 208, 148); c.fillRect(x, 492, 180, 154);
    });
    [V8.teacherDev, V8.baseDev].forEach((v, i) => {
      const x = i ? 1306 : 886; const tt = i ? T.d54 : T.d62; const p = inAt(t, tt, 0.5);
      rect(c, x, 492, 180, 154, "#343840");
      c.fillStyle = i ? "#c9c4bb" : C.amb[1]; c.fillRect(x, 646 - v / 70 * 154 * p, 180, v / 70 * 154 * p);
    });
    line(c, FX(-2), 772, FX(15), 772, P.GRAY[1]);
    const gate = inAt(t, T.five); c.globalAlpha = a * gate;
    c.setLineDash([5, 5]); line(c, FX(V8.gate), 716, FX(V8.gate), 798, C.text); c.setLineDash([]);
    c.globalAlpha = a * inAt(t, T.lower);
    line(c, FX(0), 728, FX(0), 798, P.GRAY[2]);
    const p = inAt(t, T.eight, 0.55); c.globalAlpha = a * p;
    const v = V8.gateDiff; const col = t >= T.passed ? C.main[2] : C.amb[2];
    line(c, FX(K.lerp(v.m, v.lo, p)), 752, FX(K.lerp(v.m, v.hi, p)), 752, col, 3);
    [v.lo, v.hi].forEach((z) => line(c, FX(K.lerp(v.m, z, p)), 742, FX(K.lerp(v.m, z, p)), 762, col));
    dot(c, FX(K.lerp(0, v.m, p)), 752, 7, col);
    if (t >= T.passed) P.check(c, 452, 772, 34, C.main[2], inAt(t, T.passed), 3);
  };

  // G：3,247 → 3,097 → 832；最后将 832 格真实搬到学生 3,435 格后面。
  const pG = panel(140, 230, 1640, 630, "TEACHER COMPLETION · 补学生全错的题", C.amb[1]);
  const cvG = P.layer(si);
  const gTag = tag(1744, 260, "COUNT MAP · 按数量排布");
  const gLabs = [tx(176, 300, "学生全错", 30), tx(730, 300, "老师做完", 30), tx(1284, 300, "新做对", 30, C.amb[2])];
  const gNums = [mn(176, 344, "—", 96), mn(730, 344, "—", 96), mn(1284, 344, "—", 96, C.amb[2])];
  const gTimes = [T.allWrong, T.done, T.solved];
  const gValues = [V8.allWrong, V8.done, V8.solved];
  const gFour = P.txr(si, 1744, 438, "每题 ×4", M(32), C.amb[2]);
  const gStudent = tx(1170, 500, "学生自己的轨迹", 30);
  const gKept = mn(1170, 546, "—", 96, C.main[2]);
  const gNote = tx(176, 810, "描框 = 做完 · 琥珀 = 新做对", 24, C.gray);
  const gMerge = tx(1170, 808, "", 24, C.amb[2]);
  const gRank = ranks(V8.allWrong, 53);
  const gIndex = new Array(V8.allWrong); gRank.forEach((r, i) => { gIndex[r] = i; });
  const upG = (t) => {
    const a = phase(t, T.l, T.n - 0.08);
    pG.up(t, T.l, T.n - 0.08, 0.28); recolorPanel(pG, a);
    [gTag, gNote].forEach((e) => K.vis(e, a));
    show(gStudent, a, t, T.m);
    gLabs.forEach((e, i) => { K.vis(e, a); tint(e, t, gTimes[i], i === 2 ? C.amb[2] : C.text); });
    gNums.forEach((e, i) => {
      K.vis(e, a); K.put(e, t < gTimes[i] ? "—" : K.roll(t, gTimes[i], 0.4, 0, gValues[i]));
    });
    P.glow(gNums[2], t, T.solved, C.amb);
    show(gFour, a, t, T.fourPass); show(gKept, a, t, T.kept);
    K.put(gKept, t < T.kept ? "—" : K.roll(t, T.kept, 0.4, 0, studentKept));
    P.glow(gKept, t, T.kept, C.main);
    show(gMerge, a, t, T.merge); K.put(gMerge, `+${num(V8.solved)} 条老师轨迹`);
    if (!cvG.begin(a)) return;
    const c = cvG.ctx; c.globalAlpha = a;
    const done = Math.floor(V8.done * inAt(t, T.done, 0.65));
    const solved = Math.floor(V8.solved * inAt(t, T.solved, 0.65));
    const move = inAt(t, T.merge, 1.15);
    const zoom = inAt(t, T.m - 0.12, 0.6);
    const sourceAt = (i) => {
      const [xb, yb] = gridAt(i, 176, 498, 130, 12);
      const [xs, ys] = gridAt(i, 176, 474, 100, 9);
      return [K.lerp(xb, xs, zoom), K.lerp(yb, ys, zoom)];
    };
    const n = inAt(t, T.allWrong, 0.5);
    for (let i = 0; i < V8.allWrong; i++) {
      const [x, y] = sourceAt(i);
      const cell = K.lerp(8, 6, zoom);
      c.fillStyle = K.mixHex("#171a20", "#30343d", n); c.fillRect(x, y, cell, cell);
      if (gRank[i] < done) { c.strokeStyle = "#969aa3"; c.strokeRect(x + 0.5, y + 0.5, cell - 1, cell - 1); }
    }
    const kp = inAt(t, T.kept, 0.6);
    c.globalAlpha = a * zoom;
    for (let i = 0; i < studentKept; i++) {
      const [x, y] = gridAt(i, 1170, 670, 143, 4);
      c.fillStyle = K.mixHex("#252831", C.main[1], kp); c.fillRect(x, y, 2, 2);
    }
    for (let j = 0; j < V8.solved; j++) {
      const [x, y] = gridAt(j + studentKept, 1170, 670, 143, 4);
      c.fillStyle = "#252831"; c.fillRect(x, y, 2, 2);
    }
    c.globalAlpha = a;
    for (let j = 0; j < solved; j++) {
      const [x0, y0] = sourceAt(gIndex[j]);
      const [x1, y1] = gridAt(studentKept + j, 1170, 670, 143, 4);
      const q = inAt(t, T.merge + 0.28 * K.hash(j, 1), 0.75);
      const cell = K.lerp(K.lerp(8, 6, zoom), 2, q);
      c.fillStyle = C.amb[1]; c.fillRect(K.lerp(x0, x1, q), K.lerp(y0, y1, q), cell, cell);
    }
    // 四次扫描明确对应“每题四遍”，不把过程画成四份新题。
    for (let j = 0; j < 4; j++) {
      const q = K.prog(t, T.fourPass + j * 0.3, T.fourPass + j * 0.3 + 0.28);
      if (q > 0 && q < 1) line(c, 176 + q * K.lerp(1560, 900, zoom), 474, 176 + q * K.lerp(1560, 900, zoom), 794, C.amb[2]);
    }
    if (move > 0 && move < 1) P.arrow(c, 1090, 605, 1155, 605, C.amb[2]);
    const repeat = P.pulse(t, T.again832, 0.1, 0.6);
    if (repeat > 0) { c.globalAlpha = a * repeat; line(c, 1284, 454, 1500, 454, C.amb[2], 2); }
  };

  // H：同一测试口径，两条补题路线。下一行先摆暗骨架，避免空半屏。
  const pH = panel(140, 230, 1640, 630, "COMPLETION TEST · 补题路线");
  const cvH = P.layer(si);
  const hTag = tag(1744, 260, "PROJECT · 项目判分 · TEST");
  const hTL = tx(190, 314, "过门槛的老师补题", 36, C.amb[2]);
  const hN = mn(190, 382, P.fs(V8.trMinusR.m), 110, C.main[2]);
  const hLo = mn(190, 514, `下界 ${P.fs(V8.trMinusR.lo)}`, 32, C.main[2]);
  const hYes = P.txr(si, 1730, 450, "成立", S(40), C.main[2]);
  const hCI = P.ci(si, 750, 370, 650, V8.trMinusR, { min: -2, max: 6 });
  const hBL = tx(190, 634, "自己重做", 36, C.gray);
  const hFour = mn(190, 688, "4B", 48);
  const hGold = tx(356, 694, "金标提示", 30, C.amb[2]);
  const hNo = P.txr(si, 1730, 748, "没过线", S(40), C.red[2]);
  const hBCI = P.ci(si, 750, 680, 650, V8.hrMinusR, { min: -2, max: 6 });
  const upH = (t) => {
    const a = phase(t, T.n, T.p - 0.08);
    pH.up(t, T.n, T.p - 0.08, 0.28); recolorPanel(pH, a);
    K.vis(hTag, a);
    const old = 1 - 0.78 * inAt(t, T.o);
    K.vis(hTL, a * old);
    show(hN, a * old, t, T.p24); P.glow(hN, t, T.p24, C.main);
    show(hLo, a * old, t, T.lo08); show(hYes, a * old, t, T.holds);
    hCI.up(t, a * old, T.p24);
    K.vis(hBL, a); tint(hBL, t, T.redo);
    show(hFour, a, t, T.fourAgain); show(hGold, a, t, T.gold);
    show(hNo, a, t, T.fails); hBCI.up(t, a, T.fails - 0.65);
    if (!cvH.begin(a)) return;
    const c = cvH.ctx; c.globalAlpha = a;
    line(c, 176, 592, 1744, 592, "#343840");
    if (t < T.fails - 0.65) {
      c.globalAlpha = a * 0.7; c.setLineDash([5, 5]);
      line(c, 750, 738, 1400, 738, P.GRAY[1]); c.setLineDash([]);
      line(c, 912.5, 714, 912.5, 764, P.GRAY[1]);
    }
    c.globalAlpha = a * inAt(t, T.gold);
    P.lock(c, 622, 720, 32, C.amb[1]);
    if (t >= T.holds) { c.globalAlpha = a * old; P.check(c, 1570, 482, 34, C.main[2], inAt(t, T.holds), 3); }
    if (t >= T.fails) { c.globalAlpha = a; P.cross(c, 1510, 776, 34, C.red[2], inAt(t, T.fails), 3); }
  };

  // I：常驻 1,501 格记分板，切成 PTR 项目判分的三种子三档。
  const pI = panel(140, 230, 1640, 650, "OFFLINE START · 离线起点");
  const cvI = P.layer(si);
  const board = P.board(si, 147, 520);
  board.set("bPj", T.p, 0.45);
  board.set("ptrPj", T.ptr, 0.95);
  const iTag = tag(1744, 260, "PROJECT · 同一晚");
  const iStages = [
    [176, "TR", "补题后", T.p, C.amb[2]],
    [526, "DPO", "再接偏好训练", T.dpo, C.text],
    [876, "PTR", "离线起点", T.ptr, C.main[2]],
  ].map(([x, en, zh, tt, col]) => ({ x, tt, col, en: mn(x + 24, 330, en, 40, col), zh: tx(x + 24, 390, zh, 26, C.gray) }));
  const iN = mn(1435, 330, P.fs(V8.ptrMinusB), 110, C.main[2]);
  const ptrMean = EFA.totals.PTR_pj.reduce((a, b) => a + b, 0) / EFA.totals.PTR_pj.length;
  const iCount = mn(176, 466, `B ${num(EFA.totals.B_pj)} → PTR ${num(ptrMean, 1)} / ${num(EFA.totals.tasks)} · 三种子均值`, 20, C.gray);
  const iSeed = P.txr(si, 1744, 466, `PTR SEEDS · ${EFA.totals.PTR_pj.map((v) => num(v)).join(" / ")}`, P.MONO20, C.gray);
  const iLegend = tx(1164, 850, "亮度 = 三个种子答对次数", 20, C.gray);
  const iLegendNums = [1, 2, 3].map((v, i) => mn(1576 + i * 56, 850, String(v), 20, C.gray));
  const upI = (t) => {
    const a = phase(t, T.p, win.t1 - 0.34);
    pI.up(t, T.p, win.t1 - 0.34, 0.28); recolorPanel(pI, a);
    K.vis(iTag, a); tint(iTag, t, T.sameNight, C.gray);
    iStages.forEach((it) => { K.vis(it.en, a); K.vis(it.zh, a); tint(it.en, t, it.tt, it.col); });
    show(iN, a, t, T.p66); P.glow(iN, t, T.p66, C.main);
    K.vis(iCount, a); K.vis(iSeed, a * inAt(t, T.ptr));
    K.vis(iLegend, a); iLegendNums.forEach((e) => K.vis(e, a));
    board.up(t, a, { ring: 1, labels: 1 });
    if (!cvI.begin(a)) return;
    const c = cvI.ctx; c.globalAlpha = a;
    iStages.forEach((it, i) => {
      rect(c, it.x, 308, 300, 132, K.mixHex(P.GRAY[0], i === 0 ? C.amb[1] : i === 2 ? C.main[1] : P.GRAY[2], inAt(t, it.tt)));
      if (i < 2) P.arrow(c, it.x + 310, 373, it.x + 340, 373, P.GRAY[2]);
    });
    for (let i = 0; i < 3; i++) {
      c.fillStyle = i === 0 ? K.mixHex(C.main[0], C.main[1], 0.45) : C.main[i];
      c.fillRect(1560 + i * 56, 854, 11, 11);
    }
    const p = inAt(t, T.bulk, 0.65);
    if (p > 0) line(c, 1435, 454, 1435 + p * 286, 454, C.main[2], 2);
  };

  return (t) => {
    upA(t); upB(t); upC(t); upD(t); upE(t); upF(t); upG(t); upH(t); upI(t);
  };
});
