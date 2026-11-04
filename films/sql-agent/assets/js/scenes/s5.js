// 第 5 章：在线蒸馏的两种比较、未经检验的错因观察、最终模型的剩余错误。
K.scene("s5", (si, win) => {
  const C = K.C;
  const V = EFA.k.v12;
  const L = (n) => K.seg(n).t0 - 0.08;
  const at = (n, s, k = 1) => K.w(n, s, k) - 0.08;
  const M = P.mono;
  const S = P.sans;
  const vin = P.vin;
  const G = "#666c76";
  const rise = (t, t0, d = 0.35) => K.eo(K.prog(t, t0, t0 + d));
  const line = (ctx, x0, y0, x1, y1, col) => {
    ctx.strokeStyle = col;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
  };
  const tx = (p, x, y, s, f = S(28, 600), c = C.text) => P.tx(p.el, x, y, s, f, c);
  const tag = (p, s, y = 18, c = C.gray) => P.tag(p.el, 1604, y, s, c);
  const panel = (name, tone = P.GRAY[2]) => K.panel(si, 140, 230, 1640, 630, tone, name);
  const number = (e, t, t0, value, a, tier = null, prefix = "", suffix = "", d = 0) => {
    vin(e, a, K.prog(t, t0, t0 + 0.12));
    K.put(e, prefix + K.roll(t, t0, 0.32, 0, value, d) + suffix);
    if (tier) P.glow(e, t, t0, tier);
  };

  const T = {
    start: win.t0,
    online: at(90, "试在线"), four: at(90, "4"),
    student: at(91, "学生"), teacher: at(91, "二百三十五"),
    chunks: at(91, "每一小段"), score: at(91, "打分"), likely: at(91, "多大可能"),
    result: L(92), project: at(92, "项目"), gain: at(92, "4.7"), hold: at(92, "成立"),
    tr: at(92, "补题"), dpo: at(92, "DPO"), loss: at(92, "0.8"),
    zero: at(92, "跨零"), fail: at(92, "没证明更好"),
    obs: L(93), toward: at(93, "往老师"),
    columns: at(94, "列数"), opd202: at(94, "202"), tr127: at(94, "127"), teacher181: at(94, "181"),
    group: L(95), groupName: at(95, "分组统计"),
    opdPct: at(95, "19.9%"), teacherPct: at(95, "22.2%"), trPct: at(95, "37.6%"),
    observe: at(96, "观察"), untested: at(96, "没做检验"), habit: at(96, "毛病"),
    final: L(97), boundary: at(97, "边界题"), finalProject: at(97, "项目"),
    seeds: at(97, "三个种子"), mean: at(97, "平均"), total: at(97, "680"),
    largest: at(98, "最多"), shape: at(98, "航数列数"), values: at(98, "值不对"), approx: at(98, "310"),
    compare: L(99), cols165: at(99, "165"), cols83: at(99, "83"),
    answer: at(99, "没交答案"), no64: at(99, "64"), no6: at(99, "6", 3),
    phone: at(100, "电话题"), phoneCol: at(100, "列数不对"),
    valueCompare: L(101), val309: at(101, "309"), val312: at(101, "312"), same: at(101, "总数没少"),
    denom: L(102), denominator: at(102, "分母"), criterion: at(102, "口径"), inspect: at(102, "逐题"),
    out: win.t1 - 0.32,
  };

  const bIdx = EFA.errors.cols.indexOf("B") + 1;
  const fIdx = EFA.errors.cols.indexOf("RLb") + 1;
  const seedCount = EFA.totals.RLb_pj.length;
  const errorTones = [C.red[1], "#bb8997", "#946c7e", "#b95473", "#827181", "#d1a2b0", "#936572"];
  let bOffset = 0;
  let fOffset = 0;
  const errors = EFA.errors.rows.map((r, i) => {
    const e = { name: r[0], b: r[bIdx], f: r[fIdx], b0: bOffset, f0: fOffset, tone: errorTones[i] };
    bOffset += e.b;
    fOffset += e.f;
    return e;
  });
  const err = (s) => errors.find((e) => e.name === s);
  const valueError = err("值不对");
  const columnError = err("列数不对");
  const noAnswer = err("没有提交");
  const totalFinal = fOffset;
  const roundedTotal = Math.round(totalFinal / 10) * 10;
  const roundedValues = Math.round(valueError.f / 10) * 10;

  K.plans.push({
    t0: win.t0, t1: win.t1, chip: "05", chap: "还错在哪", lab: "WHAT IT STILL GETS WRONG · v0.12",
    tele: (t) => t < T.result
      ? "▸ ONLINE DISTILLATION · STUDENT OUTPUT · TEACHER LIKELIHOOD"
      : t < T.obs
        ? `▸ PROJECT · OPD − B ${P.fs(V.opdMinusB.m)} · OPD − TR ${P.fs(V.opdMinusTr.m)}`
        : t < T.final
          ? "▸ NOT TESTED · WRONG COLUMNS · GROUP BY · OBSERVATION ONLY"
          : t < T.compare
            ? `▸ PROJECT · FINAL = v0.11 · ${seedCount} SEEDS · ${totalFinal} ERRORS`
            : `▸ WRONG COLUMNS ${columnError.b} → ${columnError.f} · NO ANSWER ${noAnswer.b} → ${noAnswer.f} · WRONG VALUES ${valueError.b} → ${valueError.f}`,
    titles: [
      { t: win.t0, text: "从原版再试{在线蒸馏}", color: C.text },
      { t: T.student, text: "学生输出，{老师逐段打分}", color: C.amb[2] },
      { t: T.result, text: "先和{原版}比", color: C.text },
      { t: T.hold, text: "比原版，{成立}" },
      { t: T.tr, text: "再和{补题版}比", color: C.text },
      { t: T.fail, text: "比补题版，{没证明更好}", color: C.red[2] },
      { t: T.obs, text: "错因往{老师那边靠}", color: C.amb[2] },
      { t: T.columns, text: "观察：{列数不对}", color: C.gray },
      { t: T.groupName, text: "观察：{分组统计}", color: C.gray },
      { t: T.observe, text: "这只是{观察}", color: C.gray },
      { t: T.final, text: "回到{最终模型}", color: C.text },
      { t: T.largest, text: "最多的一类：{值不对}", color: C.red[2] },
      { t: T.compare, text: "少交错列，{少漏交}", color: C.text },
      { t: T.phone, text: "回到开场的{电话题}", color: C.amb[2] },
      { t: T.valueCompare, text: "值不对，{总数没少}", color: C.red[2] },
      { t: T.denom, text: "{口径}仍是难点", color: C.text },
    ],
  });
  K.plates.push({ t0: win.t0, t1: win.t1, text: "v0.12 · FINAL = v0.11" });
  P.vLight[13] = T.hold;
  P.vLight[12] = T.fail;

  // A：打分柱只讲机制，不伪造老师的具体分数。
  const pA = panel("ONLINE DISTILLATION · 在线蒸馏");
  const cvA = P.layer(si);
  const aTitle = tx(pA, 40, 70, "从原版再出发", S(44, 800));
  const aStudent = tx(pA, 40, 198, "学生", S(32));
  const a4 = tx(pA, 36, 242, "4B", M(112), C.main[2]);
  const aModel = tx(pA, 40, 370, "QWEN3 · 自己做题", M(24, 500), C.gray);
  const aTeacher = tx(pA, 1050, 55, "235B", M(112), C.amb[2]);
  const aTeacherLabel = tx(pA, 1392, 115, "老师", S(32), C.amb[2]);
  const aLikelihood = tx(pA, 526, 548, "老师自己有多大可能这么写", S(32, 600), C.amb[2]);
  const aOutput = tx(pA, 526, 490, "STUDENT OUTPUT · 逐段输出", M(24, 500), C.gray);
  const aIllustration = tag(pA, "ILLUSTRATIVE · 示意");
  const upA = (t) => {
    const a = pA.up(t, T.start, T.result - 0.22, 0.22);
    vin(aTitle, a);
    K.put(aTitle, t >= T.online ? "在线蒸馏" : "从原版再出发");
    vin(aStudent, a); vin(a4, a);
    K.put(a4, t < T.four - 0.2 ? "—" : "4B");
    P.glow(a4, t, T.four, C.main);
    vin(aModel, a);
    vin(aTeacher, a, K.prog(t, T.teacher, T.teacher + 0.18));
    P.glow(aTeacher, t, T.teacher, C.amb);
    vin(aTeacherLabel, a, rise(t, T.teacher));
    vin(aLikelihood, a, rise(t, T.likely));
    vin(aOutput, a); vin(aIllustration, a);
    if (!cvA.begin(a)) return;
    const ctx = cvA.ctx;
    ctx.globalAlpha = a;
    const x0 = 666;
    const baseY = 648;
    P.arrow(ctx, 510, 661, 626, 661, P.GRAY[2]);
    for (let i = 0; i < 12; i++) {
      const x = x0 + i * 88;
      const output = rise(t, T.online + 0.10 * i);
      const produced = rise(t, T.student + 0.20 * i);
      ctx.strokeStyle = K.mixHex("#3a3e46", C.main[1], output);
      ctx.strokeRect(x + 0.5, baseY + 0.5, 66, 44);
      ctx.fillStyle = K.rgba(C.main[1], 0.24 + 0.62 * produced);
      ctx.fillRect(x + 6, baseY + 7, 54 * output, 31);
      const h = (82 + 126 * K.hash(i + 2, 11)) * rise(t, T.score + i * 0.12);
      ctx.strokeStyle = "#3a3e46";
      ctx.strokeRect(x + 19.5, baseY - 228.5, 27, 206);
      if (h > 0) {
        ctx.fillStyle = C.amb[1];
        ctx.fillRect(x + 20, baseY - 24 - h, 27, h);
        line(ctx, x + 33.5, baseY - 20, x + 33.5, baseY - 4, C.amb[1]);
        ctx.fillStyle = C.amb[2];
        ctx.beginPath(); ctx.arc(x + 33.5, baseY - 24 - h, 3, 0, Math.PI * 2); ctx.fill();
      }
      const scan = P.pulse(t, T.chunks + i * 0.21, 0.10, 0.58) + P.pulse(t, T.likely + i * 0.10, 0.08, 0.46);
      if (scan > 0) {
        ctx.strokeStyle = K.rgba(C.text, Math.min(1, scan));
        ctx.strokeRect(x - 4.5, baseY - 234.5, 76, 286);
      }
    }
    line(ctx, x0, 765, 1710, 765, "#30343d");
    const read = K.prog(t, T.student, T.likely + 1.1);
    ctx.fillStyle = C.main[2];
    ctx.fillRect(x0, 764, 1044 * read, 2);
  };

  // B：两种比较共用项目判分口径，第二根区间确实跨过零。
  const pB = panel("COMPARISONS · 两种比较");
  const pB1 = K.panel(si, 176, 378, 1568, 186, P.GRAY[2], "OPD − B · 在线蒸馏比原版");
  const pB2 = K.panel(si, 176, 614, 1568, 212, P.GRAY[2], "OPD − TR · 在线蒸馏比补题版");
  const cvB = P.layer(si);
  const bTitle = tx(pB, 40, 70, "比较对象变了，结论也不同", S(44, 800));
  const bScope = tag(pB, "PROJECT · 项目判分");
  const b1Label = tx(pB1, 32, 58, "比原版", S(44, 800));
  const b2Label = tx(pB2, 32, 58, "比补题版", S(44, 800));
  const b2Dpo = tx(pB2, 34, 126, "TR · 未接 DPO", M(24, 500), C.gray);
  const b1Num = tx(pB1, 484, 40, "", M(96), C.main[2]);
  const b2Num = tx(pB2, 484, 40, "", M(96), C.red[2]);
  const b1Status = tx(pB1, 490, 146, "成立", S(28, 700), C.main[2]);
  const b2Status = tx(pB2, 490, 148, "没证明更好", S(28, 700), C.red[2]);
  const ci1 = P.ci(si, 1060, 410, 440, V.opdMinusB, { min: -5, max: 10 });
  const ci2 = P.ci(si, 1060, 646, 440, V.opdMinusTr, { min: -5, max: 10 });
  const bAxis = tx(pB, 920, 548, "百分点 · 均值与区间", M(20, 500), C.gray);
  const upB = (t) => {
    const a = pB.up(t, T.result, T.obs - 0.22, 0.22);
    const firstFocus = 1 - 0.78 * rise(t, T.loss);
    const a1 = pB1.up(t, T.result + 0.08, T.obs - 0.22, 0.22, firstFocus);
    const a2 = pB2.up(t, T.result + 0.16, T.obs - 0.22, 0.22);
    vin(bTitle, a); vin(bScope, a); vin(b1Label, a1);
    vin(b2Label, a2); K.col(b2Label, P.lightCol(t, T.tr, C.text));
    vin(b2Dpo, a2, rise(t, T.dpo));
    number(b1Num, t, T.gain, V.opdMinusB.m, a1, C.main, "+", "", 1);
    number(b2Num, t, T.loss, Math.abs(V.opdMinusTr.m), a2, C.red, "−", "", 1);
    vin(b1Status, a1, rise(t, T.hold)); vin(b2Status, a2, rise(t, T.fail));
    vin(bAxis, a, rise(t, T.zero));
    ci1.up(t, a * firstFocus, T.gain); ci2.up(t, a, T.loss);
    if (!cvB.begin(a)) return;
    const ctx = cvB.ctx;
    ctx.globalAlpha = a;
    ctx.globalAlpha = a * firstFocus;
    if (t >= T.hold) P.check(ctx, 610, 474, 42, C.main[2], rise(t, T.hold));
    ctx.globalAlpha = a;
    if (t >= T.fail) P.cross(ctx, 610, 710, 42, C.red[2], rise(t, T.fail));
    const cross = P.pulse(t, T.zero, 0.15, 1.2);
    if (cross > 0) {
      ctx.strokeStyle = K.rgba(C.text, cross * 0.8);
      ctx.strokeRect(ci2.X(0) - 12.5, 672.5, 25, 69);
    }
  };

  // C：观察不用紫、红粉表达好坏；第二项出现时，上面的整幅图先收成一行。
  const pC = panel("ERROR SIGNATURE · 错因观察");
  pC.el.style.borderStyle = "dashed";
  pC.el.style.borderColor = "#5a5f68";
  const cvC = P.layer(si);
  const cObs = tag(pC, "NOT TESTED · 观察");
  const cMean = P.tag(pC.el, 1260, 18, `${seedCount} SEEDS · 均值`, C.gray);
  const cScope = P.tag(pC.el, 40, 62, "PROJECT · 项目判分", C.gray, true);
  const cHead = tx(pC, 40, 108, "错因往老师那边靠", S(44, 800), C.text);
  const cCols = tx(pC, 40, 260, "列数不对", S(44, 800));
  const cColsUnit = tx(pC, 42, 320, "题数", S(26, 500), C.gray);
  const cGroups = tx(pC, 40, 422, "分组统计", S(44, 800));
  const cGroupsUnit = tx(pC, 42, 482, "做对占比", S(26, 500), C.gray);
  const cNote = tx(pC, 40, 582, "只是观察，还没做检验", S(30, 700), C.text);
  const cData = [
    { name: "在线蒸馏", x: 590, n: V.wrongCols.opd, pct: V.groupBy.opd, nt: T.opd202, pt: T.opdPct, tone: "#b4b8c0" },
    { name: "补题版", x: 970, n: V.wrongCols.tr, pct: V.groupBy.tr, nt: T.tr127, pt: T.trPct, tone: "#8a8f98" },
    { name: "老师", x: 1350, n: V.wrongCols.teacher, pct: V.groupBy.teacher, nt: T.teacher181, pt: T.teacherPct, tone: C.amb[1] },
  ].map((d) => ({ ...d,
    label: tx(pC, d.x - 120, 170, d.name, S(30, 700), d.tone),
    num: tx(pC, d.x - 120, 220, "—", M(96), C.gray),
    pctEl: tx(pC, d.x - 130, 398, "—", M(96), C.gray),
  }));
  const upC = (t) => {
    const a = pC.up(t, T.obs, T.final - 0.22, 0.22);
    const shrink = rise(t, T.group, 0.7);
    const cautionFocus = rise(t, T.observe);
    const topA = (1 - shrink * 0.75) * (1 - cautionFocus * 0.2);
    const bottomA = 1 - cautionFocus * 0.78;
    vin(cObs, a); vin(cMean, a); vin(cScope, a); vin(cHead, a, 1 - shrink);
    vin(cCols, a, topA); vin(cColsUnit, a, topA);
    K.tf(cCols, `translateY(${(-101 * shrink).toFixed(2)}px)`);
    K.tf(cColsUnit, `translateY(${(-101 * shrink).toFixed(2)}px)`);
    vin(cGroups, a, shrink * bottomA); vin(cGroupsUnit, a, shrink * bottomA);
    vin(cNote, a, rise(t, T.observe));
    K.put(cNote, t >= T.habit ? "看上去，连老师的毛病也学了" : "只是观察，还没做检验");
    cData.forEach((d) => {
      vin(d.label, a); K.tf(d.label, `translateY(${(-94 * shrink).toFixed(2)}px)`);
      vin(d.num, a, topA); K.tf(d.num, `translateY(${(-94 * shrink).toFixed(2)}px)`);
      K.put(d.num, t < d.nt ? "—" : K.roll(t, d.nt, 0.32, 0, d.n));
      K.col(d.num, t < d.nt ? G : d.tone);
      vin(d.pctEl, a, shrink * bottomA);
      K.put(d.pctEl, t < d.pt ? "—" : K.roll(t, d.pt, 0.32, 0, d.pct, 1) + "%");
      K.col(d.pctEl, t < d.pt ? G : d.tone);
    });
    if (!cvC.begin(a)) return;
    const ctx = cvC.ctx;
    ctx.globalAlpha = a;
    const y1 = K.lerp(619, 508, shrink);
    const h1 = K.lerp(42, 26, shrink);
    for (const d of cData) {
      const x = 140 + d.x - 130;
      ctx.globalAlpha = a * topA;
      ctx.strokeStyle = "#3a3e46";
      ctx.strokeRect(x + 0.5, y1 + 0.5, 299, h1);
      ctx.fillStyle = d.tone;
      ctx.fillRect(x + 1, y1 + 1, 298 * (d.n / 220) * rise(t, d.nt, 0.5), h1 - 1);
      if (shrink > 0) {
        ctx.globalAlpha = a * shrink * bottomA;
        ctx.strokeStyle = "#3a3e46";
        ctx.strokeRect(x + 0.5, 766.5, 299, 22);
        ctx.fillStyle = d.tone;
        ctx.fillRect(x + 1, 767, 298 * (d.pct / 40) * rise(t, d.pt, 0.5), 21);
        ctx.globalAlpha = a;
      }
      const pulse = P.pulse(t, d.nt, 0.12, 0.8) + P.pulse(t, d.pt, 0.12, 0.8);
      if (pulse > 0) {
        ctx.strokeStyle = K.rgba(C.text, Math.min(1, pulse) * 0.6);
        ctx.strokeRect(x - 9.5, (t < T.group ? 444 : t < T.opdPct ? 350 : 621) + 0.5, 320, 150);
      }
    }
    ctx.globalAlpha = a * shrink;
    line(ctx, 180, 590, 1740, 590, "#343842");
    ctx.globalAlpha = a;
    const toward = rise(t, T.toward, 1.15) * (1 - shrink);
    if (toward > 0) P.arrow(ctx, 630, 719, 630 + 1000 * toward, 719, P.GRAY[2], 9);
    const caution = P.pulse(t, T.untested, 0.12, 1.3);
    if (caution > 0) {
      ctx.globalAlpha = a * caution;
      P.dashRect(ctx, 165, 800, 1590, 46, C.gray, 5);
    }
  };

  // D：683 是错因整数均值之和；旁白的 680 / 310 分别按十位取约数。
  const pD = panel("FINAL ERRORS · 最终模型的错因");
  const cvD = P.layer(si);
  const dTitle = tx(pD, 40, 70, "边界题模型，还错在哪", S(44, 800));
  const dScope = tag(pD, "PROJECT · 项目判分");
  const dMean = tag(pD, `${seedCount} SEEDS · 均值`, 62);
  const dTotal = tx(pD, 36, 142, "", M(112), C.red[2]);
  const dUnit = tx(pD, 388, 210, "道错题", S(32));
  const dExact = tx(pD, 40, 268, `分类合计 ${totalFinal} · 一格一道`, M(20, 500), C.gray);
  const dValueTitle = tx(pD, 1000, 90, "值不对 · 最长的一段", S(40, 800), C.red[2]);
  const dValue = tx(pD, 1000, 148, "", M(112), C.red[2]);
  const dValueExact = tx(pD, 1004, 268, `精确计数 ${valueError.f}`, M(20, 500), C.gray);
  const dShape = tx(pD, 526, 272, "行数、列数都对", S(28, 600), C.text);
  const legend = errors.map((e, i) => ({
    ...e, x: 40 + (i % 4) * 398, y: 450 + Math.floor(i / 4) * 94,
    label: tx(pD, 62 + (i % 4) * 398, 450 + Math.floor(i / 4) * 94, e.name, S(28, 600)),
    count: tx(pD, 62 + (i % 4) * 398, 490 + Math.floor(i / 4) * 94, String(e.f), M(20, 500), C.gray),
  }));
  const upD = (t) => {
    const a = pD.up(t, T.final, T.compare - 0.22, 0.22);
    const focus = rise(t, T.values);
    vin(dTitle, a); vin(dScope, a); vin(dMean, a, rise(t, T.seeds));
    number(dTotal, t, T.total, roundedTotal, a, C.red, "≈");
    vin(dTotal, a, 1 - focus * 0.78);
    if (t < T.total) K.put(dTotal, "—");
    vin(dUnit, a, rise(t, T.total)); vin(dExact, a, rise(t, T.total));
    K.col(dTotal, t < T.total ? G : K.mixHex(C.red[2], C.gray, focus * 0.8));
    vin(dValueTitle, a, focus);
    number(dValue, t, T.approx, roundedValues, a, C.red, "≈");
    vin(dValueExact, a, rise(t, T.approx)); vin(dShape, a, rise(t, T.shape));
    legend.forEach((e, i) => {
      const on = rise(t, T.finalProject + i * 0.21);
      vin(e.label, a); vin(e.count, a, on);
      K.col(e.label, t < T.finalProject ? G : e.name === "值不对" ? K.mixHex(C.text, C.red[2], focus) : C.text);
    });
    if (!cvD.begin(a)) return;
    const ctx = cvD.ctx;
    const reveal = rise(t, T.boundary, 1.05);
    const classified = rise(t, T.total, 0.65);
    for (const e of errors) {
      for (let j = 0; j < e.f; j++) {
        const i = e.f0 + j;
        const arrived = (i + 1) / totalFinal <= reveal;
        const active = arrived ? classified * (e.name === "值不对" ? 1 : 1 - focus * 0.73) : 0;
        ctx.globalAlpha = a;
        ctx.fillStyle = K.mixHex(arrived ? "#30343d" : "#22252d", e.tone, active);
        ctx.fillRect(192 + i * 2.25, 562, 2, 88);
      }
      if (e.f0 > 0) {
        ctx.globalAlpha = a * classified;
        line(ctx, 191 + e.f0 * 2.25, 552, 191 + e.f0 * 2.25, 660, C.gray);
      }
    }
    for (const [i, e] of legend.entries()) {
      ctx.globalAlpha = a * rise(t, T.finalProject + i * 0.21);
      ctx.fillStyle = e.tone;
      ctx.fillRect(180 + e.x - 40, 230 + e.y + 8, 6, 22);
    }
    const p = rise(t, T.values, 0.5);
    ctx.globalAlpha = a * p;
    const end = 192 + valueError.f * 2.25;
    line(ctx, 192, 543, end, 543, C.red[2]);
    line(ctx, 192, 538, 192, 551, C.red[2]);
    line(ctx, end, 538, end, 551, C.red[2]);
    const sweep = K.prog(t, T.finalProject, T.total + 0.7);
    if (sweep > 0 && sweep < 1) {
      ctx.globalAlpha = a * 0.8;
      ctx.fillStyle = C.text;
      ctx.fillRect(192 + 1536 * sweep, 552, 1, 108);
    }
  };

  // E：同一格面积画原版和最终的全部错题，重点两段按真实计数着色。
  const pE = panel("ERROR MIX · 原版与最终");
  const cvE = P.layer(si);
  const eScope = tag(pE, "PROJECT · 项目判分");
  const eMean = tag(pE, `${seedCount} SEEDS · 最终均值`, 62);
  const eB = tx(pE, 142, 68, "原版", S(44, 800));
  const eF = tx(pE, 612, 68, "最终", S(44, 800));
  const eBn = tx(pE, 144, 126, `错题合计 ${bOffset}`, M(20, 500), C.gray);
  const eFn = tx(pE, 614, 126, `错题合计 ${totalFinal}`, M(20, 500), C.gray);
  const eCols = tx(pE, 970, 104, "列数不对", S(44, 800));
  const eColsB = tx(pE, 966, 170, "", M(96), C.red[2]);
  const eColsArr = tx(pE, 1190, 188, "→", M(64), C.gray);
  const eColsF = tx(pE, 1318, 170, "", M(96), C.red[2]);
  const eNo = tx(pE, 970, 358, "没交答案", S(44, 800));
  const eNoB = tx(pE, 966, 422, "", M(96), C.red[2]);
  const eNoArr = tx(pE, 1190, 440, "→", M(64), C.gray);
  const eNoF = tx(pE, 1318, 422, "", M(96), C.red[2]);
  const eUnit = tx(pE, 40, 588, "一格 = 一道错题 · 分类数为均值", M(20, 500), C.gray);
  const phoneId = tx(pE, 400, 432, EFA.mainTask.id, M(20, 500), C.amb[2]);
  const phoneText = tx(pE, 400, 466, "多交一列", S(28), C.red[2]);
  const phoneName = tx(pE, 409, 361, "Phone", M(20, 500), C.amb[2]);
  const gridY = (i) => 814 - Math.floor(i / 20) * 10;
  const upE = (t) => {
    const a = pE.up(t, T.compare, T.valueCompare - 0.22, 0.22);
    vin(eScope, a); vin(eMean, a); vin(eB, a); vin(eF, a); vin(eBn, a); vin(eFn, a); vin(eUnit, a);
    vin(eCols, a); vin(eNo, a); K.col(eNo, P.lightCol(t, T.answer, C.text));
    number(eColsB, t, T.cols165, columnError.b, a, C.red);
    number(eColsF, t, T.cols83, columnError.f, a, C.red);
    number(eNoB, t, T.no64, noAnswer.b, a, C.red);
    number(eNoF, t, T.no6, noAnswer.f, a, C.red);
    vin(eColsArr, a, rise(t, T.cols83 - 0.18)); vin(eNoArr, a, rise(t, T.no6 - 0.18));
    vin(phoneId, a, rise(t, T.phone)); vin(phoneText, a, rise(t, T.phoneCol)); vin(phoneName, a, rise(t, T.phone));
    if (!cvE.begin(a)) return;
    const ctx = cvE.ctx;
    const colsOn = rise(t, T.cols165);
    const noOn = rise(t, T.answer);
    ["b", "f"].forEach((key, side) => {
      const x0 = side ? 754 : 284;
      const N = key === "b" ? bOffset : totalFinal;
      const visible = Math.floor(N * rise(t, T.compare, 0.55));
      for (const e of errors) {
        const offset = e[key + "0"];
        for (let j = 0; j < e[key]; j++) {
          const i = offset + j;
          if (i >= visible) continue;
          const colA = e.name === "列数不对" ? colsOn : e.name === "没有提交" ? noOn : 0;
          ctx.globalAlpha = a;
          ctx.fillStyle = K.mixHex("#41454e", C.red[1], colA);
          ctx.fillRect(x0 + (i % 20) * 10, gridY(i), 8, 8);
        }
      }
      const drawBracket = (e, start, pulse) => {
        const yTop = gridY(e[key + "0"] + e[key] - 1) - 3;
        const yBottom = gridY(e[key + "0"]) + 11;
        ctx.globalAlpha = a * rise(t, start);
        const x = x0 + 209;
        line(ctx, x, yTop, x, yBottom, C.red[2]);
        line(ctx, x - 5, yTop, x + 5, yTop, C.red[2]);
        line(ctx, x - 5, yBottom, x + 5, yBottom, C.red[2]);
        const f = P.pulse(t, pulse, 0.1, 0.7);
        if (f > 0) {
          ctx.globalAlpha = a * f;
          ctx.strokeStyle = C.text;
          ctx.strokeRect(x0 - 4.5, yTop - 1.5, 208, yBottom - yTop + 3);
        }
      };
      drawBracket(columnError, T.cols165, side ? T.cols83 : T.cols165);
      drawBracket(noAnswer, T.answer, side ? T.no6 : T.no64);
    });
    const ph = rise(t, T.phone);
    ctx.globalAlpha = a * ph;
    ctx.strokeStyle = C.amb[1];
    K.rr(ctx, 537.5, 578.5, 181, 78, 7); ctx.stroke();
    line(ctx, 538, 619, 718, 619, "#5a3d1c");
    line(ctx, 648, 579, 648, 656, C.red[1]);
    ctx.fillStyle = K.rgba(C.red[1], 0.20); ctx.fillRect(649, 579, 69, 77);
    for (let r = 0; r < 3; r++) {
      ctx.fillStyle = C.amb[1]; ctx.fillRect(550, 625 + r * 9, 79, 2);
      ctx.fillStyle = C.red[1]; ctx.fillRect(663, 625 + r * 9, 37, 2);
    }
    P.cross(ctx, 681, 600, 22, C.red[2], rise(t, T.phoneCol));
    // 电话题是原版多交一列，连向原版，避免暗示最终模型仍错这道题。
    const targetY = gridY(columnError.b0 + Math.floor(columnError.b / 2));
    line(ctx, 537, 596, 516, 596, C.amb[1]); line(ctx, 516, 596, 516, targetY, C.amb[1]);
    P.arrow(ctx, 516, targetY, 486, targetY, C.amb[1], 6);
  };

  // F：两根条的单位相同；309 与 312 几乎等长，随后把焦点交给“分母”。
  const pF = panel("WRONG VALUES · 值不对");
  const cvF = P.layer(si);
  const fScope = tag(pF, "PROJECT · 项目判分");
  const fMean = tag(pF, `${seedCount} SEEDS · 最终均值`, 62);
  const fTitle = tx(pF, 40, 70, "行列都对上了，值还不对", S(44, 800));
  const fB = tx(pF, 40, 195, "原版", S(32));
  const fF = tx(pF, 40, 374, "最终", S(32));
  const f309 = tx(pF, 254, 144, "", M(112), C.red[2]);
  const f312 = tx(pF, 254, 323, "", M(112), C.red[2]);
  const fSame = tx(pF, 40, 533, "总数没少", S(44, 800), C.red[2]);
  const fAvg = tx(pF, 40, 521, "平均值", S(36, 800));
  const fEq = tx(pF, 211, 519, "=", M(40), C.text);
  const fSum = tx(pF, 312, 479, "合计", S(32));
  const fDen = tx(pF, 312, 549, "分母", S(32));
  const fCriterion = tx(pF, 700, 519, "口径仍是难点", S(44, 800));
  const fInspect = tx(pF, 1368, 557, "逐题看", S(28), C.gray);
  const upF = (t) => {
    const a = pF.up(t, T.valueCompare, T.out, 0.27);
    const lower = rise(t, T.denom + 0.18, 0.6);
    const compareA = 1 - lower * 0.78;
    vin(fScope, a); vin(fMean, a); vin(fTitle, a);
    vin(fB, a, compareA); vin(fF, a, compareA);
    number(f309, t, T.val309, valueError.b, a, C.red); number(f312, t, T.val312, valueError.f, a, C.red);
    vin(f309, a, rise(t, T.val309) * compareA); vin(f312, a, rise(t, T.val312) * compareA);
    const dy = 0;
    [fB, fF, f309, f312].forEach((e) => K.tf(e, `translateY(${dy.toFixed(2)}px)`));
    vin(fSame, a, rise(t, T.same) * (1 - K.prog(t, T.denom, T.denom + 0.18)));
    vin(fAvg, a, lower); vin(fEq, a, lower); vin(fSum, a, lower);
    vin(fDen, a, lower); K.col(fDen, P.lightCol(t, T.denominator, C.text));
    vin(fCriterion, a, rise(t, T.criterion)); vin(fInspect, a, rise(t, T.inspect));
    if (!cvF.begin(a)) return;
    const ctx = cvF.ctx;
    const x0 = 774;
    [{ n: valueError.b, y: 427, on: T.val309 }, { n: valueError.f, y: 606, on: T.val312 }].forEach((d) => {
      const p = rise(t, d.on, 0.55);
      const y = d.y + dy;
      for (let i = 0; i < d.n; i++) {
        ctx.globalAlpha = a * compareA;
        ctx.fillStyle = i / d.n < p ? C.red[1] : "#30343d";
        ctx.fillRect(x0 + i * 3, y, 2, 52);
      }
      ctx.globalAlpha = a * compareA;
      line(ctx, x0, y + 63, x0 + d.n * 3 - 1, y + 63, "#4b505a");
      const flash = P.pulse(t, d.on, 0.12, 0.8);
      if (flash > 0) {
        ctx.globalAlpha = a * flash;
        line(ctx, x0, y - 10, x0 + (d.n * 3 - 1) * p, y - 10, C.red[2]);
      }
    });
    ctx.globalAlpha = a * rise(t, T.same) * (1 - lower);
    const bEnd = x0 + valueError.b * 3;
    const fEnd = x0 + valueError.f * 3;
    ctx.setLineDash([4, 5]); line(ctx, bEnd - 1, 406, bEnd - 1, 676, C.gray); ctx.setLineDash([]);
    line(ctx, bEnd, 691, fEnd, 691, C.red[2]);
    ctx.globalAlpha = a * lower;
    line(ctx, 408, 700, 1740, 700, "#343842"); line(ctx, 430, 766, 572, 766, C.gray);
    const den = rise(t, T.denominator, 0.7);
    line(ctx, 432, 819, 432 + 140 * den, 819, C.text);
    const inspect = rise(t, T.inspect, 0.4);
    ctx.globalAlpha = a * inspect;
    ctx.strokeStyle = C.gray; ctx.strokeRect(1535.5, 732.5, 132, 48);
    for (let i = 1; i < 3; i++) line(ctx, 1536, 732 + i * 16, 1668, 732 + i * 16, "#454a54");
    line(ctx, 1584, 732, 1584, 781, "#454a54");
    const row = Math.min(2, Math.floor(K.prog(t, T.inspect, T.out) * 3));
    ctx.strokeStyle = C.text; ctx.strokeRect(1531.5, 729.5 + row * 16, 140, 20);
  };

  return (t) => {
    upA(t); upB(t); upC(t); upD(t); upE(t); upF(t);
  };
});
