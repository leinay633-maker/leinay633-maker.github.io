K.scene("s2", (si, win) => {
  const C = K.C;
  const V3 = EFA.k.v03;
  const V5 = EFA.k.v05;
  const verdict = EFA.verdicts[1];
  const L = (n) => K.seg(n).t0 - 0.08;
  const at = (n, text, occurrence = 1) => K.w(n, text, occurrence) - 0.08;
  const mono = P.mono;
  const sans = P.sans;
  const appear = (t, start, duration = 0.3) => K.prog(t, start, start + duration);
  const ease = (t, start, duration = 0.5) => K.eio(appear(t, start, duration));
  const setText = (element, alpha, text, color) => {
    K.vis(element, alpha);
    if (text != null) K.put(element, text);
    if (color) K.col(element, color);
  };
  const times = {
    fail: at(40, "失败"),
    last: at(41, "最后"),
    submit: at(41, "提交"),
    before: at(41, "之前"),
    query: at(41, "查"),
    edit: at(41, "改"),
    noTeach: at(41, "不教"),
    context: at(42, "上下文里"),
    error: at(42, "报错"),
    result: at(42, "执行结果"),
    pairs: at(43, "512"),
    rule: at(43, "495"),
    made: at(43, "规则"),
    learnedSubmit: at(44, "交"),
    noQuery: at(44, "没学会查"),
    audit: at(45, "抽查"),
    tasks: at(45, "256"),
    repeated: at(45, "254"),
    same: at(45, "原样"),
    again: at(45, "一遍"),
    againAgain: at(45, "又一遍"),
    change: at(47, "换了做法"),
    self: at(47, "自己"),
    pool: at(47, "6682"),
    sampled: at(47, "采出"),
    trajectories: at(47, "13612"),
    correct: at(47, "做对"),
    rate: at(47, "47.3%"),
    perTask: at(48, "每道题"),
    pickOne: at(48, "挑一条"),
    execution: at(48, "执行"),
    matched: at(48, "对上"),
    whole: at(48, "完整轨迹"),
    kept: at(48, "3435"),
    repaired: at(49, "568"),
    repairError: at(49, "报错"),
    corrected: at(49, "改对"),
    eachStep: at(50, "每一步"),
    valid: at(50, "有效动作"),
    learn: at(50, "都学"),
    maskError: at(50, "报错"),
    exclude: at(50, "不学"),
    validation: at(51, "验证集"),
    mean: at(51, "2.0"),
    interval: at(51, "区间"),
    lower: at(51, "0.4"),
    first: at(52, "第一次"),
    stable: at(52, "稳稳地"),
    dpo: at(53, "DPO"),
    preferences: at(53, "547"),
    pairEach: at(53, "一对"),
    positive: at(53, "正"),
    negative: at(53, "反例"),
    prefer: at(53, "偏向"),
    chooseCorrect: at(53, "做对"),
    dev: at(54, "按开发集"),
    score: at(54, "成绩"),
    next: at(54, "下一步"),
    start: at(54, "起点"),
  };

  P.vLight[1] = times.mean;
  K.plans.push({
    t0: win.t0,
    t1: win.t1,
    chip: "02",
    chap: "训完就不查了",
    lab: "IT STOPPED LOOKING · v0.3 → v0.5",
    tele: (t) =>
      t < L(42)
        ? "▸ v0.3 · FINISH ONLY · QUERY / REPAIR NOT TAUGHT"
        : t < L(44)
          ? `▸ v0.3 · ${K.fmt(V3.pairs)} PAIRS · ${K.fmt(V3.ruleMade)} RULE-MADE · ${V3.natural} NATURAL`
          : t < L(47)
            ? `▸ SEED 42 · QUERY ${V3.dQuery} / ${V3.tasks} · REPEATED FINISH ${V3.dRepeat} / ${V3.tasks}`
            : t < L(51)
              ? `▸ v0.5 · ${K.fmt(V5.traj)} TRAJ → ${K.fmt(V5.kept)} KEPT · ${V5.repaired} REPAIRED`
              : t < L(53)
                ? `▸ VALIDATION · PROJECT · R − B ${P.fs(verdict.m)} [${P.fs(verdict.lo)}, ${P.fs(verdict.hi)}]`
                : `▸ DPO · ${V5.dpoPairs} PREFERENCE PAIRS · DEV SELECTED START`,
    titles: [
      { t: win.t0, text: "回到开头那次{失败}", color: C.red[2] },
      { t: L(41), text: "只教最后{怎么提交}" },
      { t: times.before, text: "怎么查、怎么改，{不教}", color: C.gray },
      { t: L(42), text: "上下文多了{报错和结果}", color: C.text },
      { t: L(43), text: "错误大多{按规则造}", color: C.gray },
      { t: L(44), text: "学会了交，{没学会查}", color: C.red[2] },
      { t: L(45), text: "同一条 SQL，{一遍又一遍}", color: C.red[2] },
      { t: L(46), text: "模型学会的", color: C.text },
      { t: L(47), text: "换个做法：{自己先做}" },
      { t: times.rate, text: `做对的只有 {${V5.acc.toFixed(1)}%}` },
      { t: L(48), text: "每题留一条{完整轨迹}" },
      { t: L(49), text: `其中 {${V5.repaired}} 条，自己改对` },
      { t: L(50), text: "有效动作{都学}" },
      { t: times.exclude, text: "报错的那一步{不学}", color: C.gray },
      { t: L(51), text: `验证集{高了 ${verdict.m.toFixed(1)} 个点}` },
      { t: L(52), text: "第一次{稳稳地涨分}" },
      { t: L(53), text: "正反成对，{偏向做对的}" },
      { t: L(54), text: "成为{下一步起点}" },
    ],
  });
  K.plates.push({ t0: win.t0, t1: win.t1, text: "v0.3 → v0.5" });

  const trainPanel = K.panel(si, 140, 230, 1640, 630, P.GRAY[2], "FIRST TRAINING · 第一次训练");
  const trainLayer = P.layer(si);
  const trainRail = P.rail(si, 176, 366, 1568, [
    null,
    null,
    null,
    { a: "finish", t: win.t0, tone: "main", toneT: times.submit },
  ], { h: 150, gap: 32 });
  const trainTitle = P.tx(si, 176, 286, "只教最后怎么提交", sans(48, 800), C.text);
  const untrained = ["SCHEMA · 看表", "QUERY · 试跑", "QUERY · 修改"].map((text, index) =>
    P.ctr(si, trainRail.sx(index) + trainRail.cw / 2, 426, text, mono(26, 600), C.gray));
  const teachLabels = Array.from({ length: 4 }, (_, index) =>
    P.ctr(si, trainRail.sx(index) + trainRail.cw / 2, 560, index === 3 ? "教" : "不教", sans(40, 800), index === 3 ? C.main[2] : C.gray));
  const lossLabel = P.tx(si, 176, 650, "TRAINING MASK · 参与训练的动作", P.MONO20, C.gray);
  const lossSub = P.tx(si, 176, 794, "怎么查、怎么改，训练信号都没有覆盖", sans(28, 500), C.gray);
  const upTrain = (t) => {
    const alpha = P.win(t, win.t0, L(42) - 0.15, 0.3, 0.3);
    K.vis(trainPanel.el, alpha);
    trainRail.up(t, alpha);
    setText(trainTitle, alpha);
    untrained.forEach((element) => K.vis(element, alpha));
    teachLabels.forEach((element, index) => {
      const start = index === 3 ? times.submit : [times.before, times.query, times.edit][index];
      K.vis(element, alpha * appear(t, start));
      if (index === 3) P.glow(element, t, times.submit, C.main);
    });
    K.vis(lossLabel, alpha);
    K.vis(lossSub, alpha * appear(t, times.before));
    if (!trainLayer.begin(alpha)) return;
    const ctx = trainLayer.ctx;
    ctx.globalAlpha = alpha;
    const position = ease(t, L(41), 0.6);
    for (let index = 0; index < 4; index++) {
      const left = trainRail.sx(index);
      const width = trainRail.cw;
      const lit = index === 3 ? appear(t, times.last, 0.6) : 0;
      ctx.fillStyle = index === 3 ? K.mix(P.GRAY[0], C.main[1], lit) : P.GRAY[0];
      ctx.fillRect(left, 696, width * position, 52);
      ctx.strokeStyle = index === 3 ? K.mix(P.GRAY[1], C.main[2], lit) : P.GRAY[1];
      ctx.strokeRect(left + 0.5, 696.5, width - 1, 51);
      if (index < 3) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(left, 697, width, 50);
        ctx.clip();
        for (let offset = -50; offset < width; offset += 18) {
          ctx.beginPath();
          ctx.moveTo(left + offset, 748);
          ctx.lineTo(left + offset + 50, 697);
          ctx.stroke();
        }
        ctx.restore();
      }
    }
    ctx.globalAlpha = alpha * P.pulse(t, times.noTeach, 0.1, 0.65);
    ctx.strokeStyle = C.text;
    ctx.strokeRect(176.5, 696.5, trainRail.sx(2) + trainRail.cw - 176, 51);
  };

  const dataPanel = K.panel(si, 140, 230, 1640, 630, P.GRAY[2], "REPAIR CONTEXT · 修复版训练数据");
  const dataLayer = P.layer(si);
  const dataTitle = P.tx(si, 176, 282, "上下文里多了什么", sans(48, 800), C.text);
  const errorLabel = P.tx(si, 220, 366, "报错", sans(32), C.gray);
  const resultLabel = P.tx(si, 1020, 366, "执行结果", sans(32), C.gray);
  const dataGridLabel = P.tx(si, 176, 442, "TRAINING PAIRS · 每对一格", P.MONO20, C.gray);
  const pairNumber = P.tx(si, 1000, 472, K.fmt(V3.pairs), mono(112), C.text);
  const pairUnit = P.tx(si, 1360, 534, "对训练数据", sans(28, 500), C.gray);
  const ruleNumber = P.tx(si, 1000, 636, K.fmt(V3.ruleMade), mono(104), C.gray);
  const ruleUnit = P.tx(si, 1350, 689, "规则造的错", sans(28, 500), C.gray);
  const naturalLabel = P.tx(si, 1000, 790, `自然修复 ${V3.natural} 对`, mono(24, 500), C.gray);
  const upData = (t) => {
    const alpha = P.win(t, L(42), L(44) - 0.1, 0.3, 0.3);
    K.vis(dataPanel.el, alpha);
    setText(dataTitle, alpha, t < L(43) ? "上下文多了报错和执行结果" : "规则造错，占了绝大多数");
    setText(errorLabel, alpha, null, P.lightCol(t, times.error, C.red[2], C.gray));
    setText(resultLabel, alpha, null, P.lightCol(t, times.result, C.text, C.gray));
    K.vis(dataGridLabel, alpha);
    setText(pairNumber, alpha * appear(t, times.pairs, 0.18), K.roll(t, times.pairs, 0.5, 0, V3.pairs));
    K.vis(pairUnit, alpha * appear(t, times.pairs));
    setText(ruleNumber, alpha * appear(t, times.rule, 0.18), K.roll(t, times.rule, 0.5, 0, V3.ruleMade));
    K.col(ruleNumber, K.mix(C.gray, C.text, P.pulse(t, times.made + 15 * 0.045 + 0.06, 0.08, 0.35)));
    K.vis(ruleUnit, alpha * appear(t, times.rule));
    K.vis(naturalLabel, alpha * appear(t, times.made));
    if (!dataLayer.begin(alpha)) return;
    const ctx = dataLayer.ctx;
    ctx.globalAlpha = alpha;
    [176, 976].forEach((left, index) => {
      const lit = appear(t, index ? times.result : times.error);
      K.rr(ctx, left + 0.5, 346.5, 768, 74, 8);
      ctx.fillStyle = "#111319";
      ctx.fill();
      ctx.strokeStyle = K.mix(P.GRAY[0], index ? C.gray : C.red[1], lit);
      ctx.stroke();
      if (lit > 0) {
        ctx.fillStyle = index ? C.text : C.red[1];
        ctx.fillRect(left + 20, 366, 3, 30 * lit);
      }
    });
    const sweep = appear(t, times.pairs, 0.7);
    const classify = appear(t, times.rule, 0.7);
    for (let index = 0; index < V3.pairs; index++) {
      const left = 176 + (index % 32) * 21;
      const top = 480 + Math.floor(index / 32) * 21;
      const on = K.c01(sweep * 1.3 - (index % 32) / 80);
      const natural = index >= V3.ruleMade;
      const rowFlash = natural ? 0 : P.pulse(t, times.made + Math.floor(index / 32) * 0.045, 0.06, 0.25);
      ctx.fillStyle = natural ? K.mix(P.OFF, C.main[1], classify) : K.mix(P.OFF, "#3a3e46", on);
      if (rowFlash > 0) ctx.fillStyle = K.mix("#3a3e46", "#b9bec7", rowFlash);
      ctx.fillRect(left, top, 16, 16);
      ctx.strokeStyle = natural ? K.mix(P.GRAY[0], C.main[2], classify) : K.mix(P.GRAY[0], P.GRAY[1], on);
      ctx.strokeRect(left + 0.5, top + 0.5, 15, 15);
      if (!natural && t >= times.made) {
        const mark = appear(t, times.made + (index % 32) * 0.018, 0.25);
        ctx.globalAlpha = alpha * mark;
        ctx.beginPath();
        ctx.moveTo(left + 4, top + 12);
        ctx.lineTo(left + 12, top + 4);
        ctx.stroke();
        ctx.globalAlpha = alpha;
      }
    }
  };

  const auditPanel = K.panel(si, 140, 230, 1640, 630, C.red[1], "BEHAVIOR AUDIT · 修复版行为诊断");
  const auditLayer = P.layer(si);
  const auditRail = P.rail(si, 176, 650, 1568, [
    { a: "finish", t: times.learnedSubmit, tone: "red", sql: "同一条 SQL" },
    { a: "finish", t: times.same, tone: "red", sql: "同一条 SQL" },
    { a: "finish", t: times.again, tone: "red", sql: "同一条 SQL" },
    { a: "finish", t: times.againAgain, tone: "red", sql: "同一条 SQL" },
  ], { h: 146, gap: 32 });
  const auditTag = P.tag(si, 1744, 284, "SEED 42 · 抽查");
  const auditTitle = P.tx(si, 176, 286, "没学会先查再交", sans(44, 800), C.red[2]);
  const auditCount = P.tx(si, 1272, 378, String(V3.dQuery), mono(120), C.red[2]);
  const auditTotal = P.tx(si, 1450, 438, "/ " + V3.tasks, mono(38, 600), C.gray);
  const auditMetric = P.tx(si, 1272, 338, "先查了", sans(28), C.gray);
  const auditRepeat = P.tx(si, 1272, 480, String(V3.dRepeat), mono(112), C.red[2]);
  const repeatUnit = P.tx(si, 1490, 548, "/ " + V3.tasks, mono(32, 600), C.gray);
  const auditNote = P.tx(si, 176, 588, "QUERY-FIRST · 每题一格", P.MONO20, C.gray);
  const repeatCaption = P.tx(si, 1272, 602, "原样反复提交", sans(28), C.red[2]);
  const thought = P.say(si, 176, 518, 1568, 46, "模型学会的，常常不是你想教的。", sans(64, 800));
  thought.el.style.whiteSpace = "nowrap";
  thought.el.style.textAlign = "center";
  const upAudit = (t) => {
    const base = P.win(t, L(44), L(47) - 0.15, 0.3, 0.3);
    const quote = appear(t, L(46), 0.25);
    const alpha = base * K.lerp(1, 0.06, appear(t, L(46), 0.08)); // 体会句压在 254 大字上，背景压到 6%
    K.vis(auditPanel.el, alpha);
    auditRail.up(t, alpha, L(44));
    const repeat = ease(t, times.repeated, 0.4);
    setText(auditTitle, alpha, t < times.repeated ? "没学会先查再交" : "同一条 SQL，原样反复提交");
    K.vis(auditTag, alpha);
    K.at(auditCount, 1272, K.lerp(378, 380, repeat));
    auditCount.style.font = mono(K.lerp(120, 32, repeat));
    K.at(auditTotal, K.lerp(1450, 1320, repeat), K.lerp(438, 382, repeat));
    auditTotal.style.font = mono(K.lerp(38, 26, repeat), 600);
    K.vis(auditMetric, alpha);
    K.vis(auditCount, alpha * K.lerp(1, 0.5, repeat));
    K.vis(auditTotal, alpha * K.lerp(1, 0.5, repeat));
    setText(auditRepeat, alpha * appear(t, times.repeated, 0.18), K.roll(t, times.repeated, 0.45, 0, V3.dRepeat));
    K.vis(repeatUnit, alpha * appear(t, times.repeated));
    K.vis(repeatCaption, alpha * appear(t, times.repeated));
    setText(auditNote, alpha, t < times.repeated ? "QUERY-FIRST · 每题一格" : "REPEATED FINISH · 循环记号 = 原样重交");
    K.vis(thought.el, base * quote);
    thought.paint(t, C.text);
    if (!auditLayer.begin(base)) return;
    const ctx = auditLayer.ctx;
    ctx.globalAlpha = alpha;
    const scan = appear(t, times.noQuery, 0.65);
    const repeatScan = appear(t, times.repeated, 0.7);
    for (let index = 0; index < V3.tasks; index++) {
      const left = 176 + (index % 32) * 31;
      const top = 346 + Math.floor(index / 32) * 28;
      ctx.fillStyle = "#111217";
      ctx.fillRect(left, top, 23, 20);
      ctx.strokeStyle = K.mix(P.GRAY[0], C.red[1], scan);
      ctx.setLineDash([3, 3]);
      ctx.strokeRect(left + 0.5, top + 0.5, 22, 19);
      ctx.setLineDash([]);
      if (index < V3.dRepeat && index / V3.dRepeat < repeatScan) {
        ctx.fillStyle = C.red[0];
        ctx.fillRect(left + 1, top + 1, 21, 18);
        ctx.strokeStyle = C.red[2];
        ctx.beginPath();
        ctx.arc(left + 11.5, top + 10, 6.5, -0.5, Math.PI * 1.65);
        ctx.stroke();
        P.arrow(ctx, left + 12, top + 3.5, left + 17, top + 6, C.red[2], 4);
      }
    }
    ctx.globalAlpha = alpha * P.pulse(t, times.tasks, 0.15, 0.8);
    ctx.strokeStyle = C.red[2];
    ctx.strokeRect(168.5, 338.5, 1007, 231);
    if (quote > 0) {
      ctx.globalAlpha = base * quote * 0.94;
      ctx.fillStyle = C.bg;
      ctx.fillRect(150, 496, 1620, 138);
    }
  };

  const cloudPanel = K.panel(si, 140, 230, 1640, 630, P.GRAY[2], "REJECTION SAMPLING · 拒绝采样微调");
  const keptPanel = K.panel(si, 140, 510, 1640, 350, C.main[1], "ONE PER TASK · 每题只留一条");
  const maskPanel = K.panel(si, 140, 634, 1640, 226, P.GRAY[2], "FULL TRAJECTORY · 整条轨迹的训练信号");
  const funnelLayer = P.layer(si);
  const maskRail = P.rail(si, 176, 680, 1568, [
    { a: "schema", t: L(50), tone: "main", toneT: times.eachStep, sql: "有效动作" },
    { a: "query", t: L(50), sql: "执行报错" },
    { a: "query", t: L(50), tone: "main", toneT: times.eachStep + 0.14, sql: "改对 · 有效动作" },
    { a: "finish", t: L(50), tone: "main", toneT: times.eachStep + 0.28, sql: "提交 · 有效动作" },
  ], { h: 130, gap: 32 });
  const funnelTitle = P.tx(si, 176, 284, "自己先做，再按执行结果筛", sans(44, 800), C.text);
  const poolLabel = P.tx(si, 1272, 310, "训练题", sans(26), C.gray);
  const poolNumber = P.tx(si, 1272, 348, K.fmt(V5.pool), mono(96), C.amb[2]);
  const trajectoryLabel = P.tx(si, 1272, 480, "采出的轨迹", sans(26), C.gray);
  const trajectoryNumber = P.tx(si, 1272, 518, K.fmt(V5.traj), mono(96), C.text);
  const rateLabel = P.tx(si, 1272, 650, "执行结果做对", sans(26), C.gray);
  const rateNumber = P.tx(si, 1272, 688, V5.acc.toFixed(1) + "%", mono(96), C.main[2]);
  const cloudLabel = P.tx(si, 176, 394, "TRAINING POOL · 每题一格", P.MONO20, C.gray);
  const keptNumber = P.tx(si, 176, 566, K.fmt(V5.kept), mono(112), C.main[2]);
  const keptLabel = P.tx(si, 176, 706, "完整轨迹 · 每题一条", sans(30), C.text);
  const repairedNumber = P.tx(si, 176, 646, String(V5.repaired), mono(112), C.main[2]);
  const repairedLabel = P.tx(si, 176, 788, "报错后自己改对", sans(28), C.main[2]);
  const keptTag = P.tag(si, 1744, 528, "按数量排布 · 不代表题目顺序", C.gray);
  const maskTag = P.tag(si, 1744, 646, "ILLUSTRATIVE · 示意", C.gray);
  const maskLabels = Array.from({ length: 4 }, (_, index) =>
    P.ctr(si, maskRail.sx(index) + maskRail.cw / 2, 822, index === 1 ? "不学" : "学", sans(22), index === 1 ? C.gray : C.main[2]));
  const trajectories = Array.from({ length: V5.traj }, (_, index) => ({
    left: 176 + (index % 166) * 6,
    top: 432 + Math.floor(index / 166) * 4.8,
    jitter: K.hash(index, 17),
  }));
  const upFunnel = (t) => {
    const alpha = P.win(t, L(47), L(51) - 0.12, 0.3, 0.3);
    const shrink = ease(t, L(48), 0.65);
    const mask = ease(t, L(50), 0.6);
    const repaired = ease(t, times.repaired, 0.5);
    K.vis(cloudPanel.el, alpha);
    cloudPanel.el.style.height = K.lerp(630, 250, shrink).toFixed(1) + "px";
    const keepAlpha = alpha * appear(t, L(48) + 0.15);
    K.vis(keptPanel.el, keepAlpha);
    K.at(keptPanel.el, 140, K.lerp(510, 506, mask), 1640, K.lerp(350, 102, mask));
    K.vis(keptPanel.lab, keepAlpha * (1 - mask));
    const maskAlpha = alpha * appear(t, L(50) + 0.15);
    K.vis(maskPanel.el, maskAlpha);
    const oldAlpha = alpha * K.lerp(1, 0.35, shrink);
    setText(funnelTitle, alpha, t < L(48) ? "自己先做，再按执行结果筛" : "先筛掉错的，再按题去重");
    [poolLabel, trajectoryLabel, rateLabel].forEach((element, index) => {
      K.at(element, K.lerp(1272, 176 + index * 480, shrink), K.lerp(310 + index * 170, 338, shrink));
      element.style.font = sans(K.lerp(26, 24, shrink));
      const focus = index < 2 ? 1 - 0.75 * appear(t, index === 0 ? times.trajectories : times.rate) : 1;
      K.vis(element, oldAlpha * K.lerp(focus, 1, shrink));
    });
    [poolNumber, trajectoryNumber, rateNumber].forEach((element, index) => {
      K.at(element, K.lerp(1272, 176 + index * 480, shrink), K.lerp(348 + index * 170, 374, shrink));
      element.style.font = mono(K.lerp(96, 32, shrink));
      const focus = index < 2 ? 1 - 0.75 * appear(t, index === 0 ? times.trajectories : times.rate) : 1;
      K.vis(element, oldAlpha * K.lerp(focus, 1, shrink) * appear(t, [times.pool, times.trajectories, times.rate][index], 0.16));
      if (index === 0) K.put(element, K.roll(t, times.pool, 0.55, 0, V5.pool));
      else if (index === 1) K.put(element, K.roll(t, times.trajectories, 0.55, 0, V5.traj));
      else K.put(element, K.roll(t, times.rate, 0.5, 0, V5.acc, 1) + "%");
      K.col(element, shrink > 0.99 ? C.gray : index === 0 ? C.amb[2] : index === 2 ? C.main[2] : C.text);
    });
    K.at(cloudLabel, 176, K.lerp(394, 446, shrink));
    setText(cloudLabel, alpha * K.lerp(1, 0.7, shrink), t < times.trajectories ? "TRAINING POOL · 每题一格" : "TRAJECTORIES · 每点一条 · 按汇总比例点亮");
    K.at(keptNumber, 176, K.lerp(566, 538, mask));
    keptNumber.style.font = mono(K.lerp(K.lerp(112, 32, repaired), 32, mask));
    setText(keptNumber, keepAlpha * appear(t, times.kept, 0.16), K.roll(t, times.kept, 0.55, 0, V5.kept));
    K.col(keptNumber, repaired > 0.8 ? C.gray : C.main[2]);
    K.at(keptLabel, K.lerp(176, 360, mask), K.lerp(K.lerp(706, 608, repaired), 544, mask));
    keptLabel.style.font = sans(K.lerp(30, 22, mask), 500);
    setText(keptLabel, keepAlpha, mask > 0.5 ? "条完整轨迹" : repaired > 0.5 ? "条留下，其中" : "完整轨迹 · 每题一条");
    K.at(repairedNumber, K.lerp(176, 630, mask), K.lerp(646, 538, mask));
    repairedNumber.style.font = mono(K.lerp(112, 32, mask));
    setText(repairedNumber, keepAlpha * appear(t, times.repaired, 0.16), K.roll(t, times.repaired, 0.5, 0, V5.repaired));
    K.at(repairedLabel, K.lerp(176, 740, mask), K.lerp(788, 544, mask));
    repairedLabel.style.font = sans(K.lerp(28, 22, mask), 500);
    K.vis(repairedLabel, keepAlpha * appear(t, times.repaired));
    K.vis(keptTag, keepAlpha * (1 - mask));
    K.vis(maskTag, maskAlpha);
    maskRail.up(t, maskAlpha);
    maskLabels.forEach((element, index) => K.vis(element, maskAlpha * appear(t, index === 1 ? times.exclude : times.learn + index * 0.08)));
    if (!funnelLayer.begin(alpha)) return;
    const ctx = funnelLayer.ctx;
    ctx.save();
    ctx.translate(0, K.lerp(0, 410 - 432 * 0.065, shrink));
    ctx.scale(1, K.lerp(1, 0.065, shrink));
    const sampled = ease(t, times.sampled, 0.8);
    const hasTrajectories = t >= times.sampled;
    const sweep = hasTrajectories ? appear(t, times.trajectories, 0.65) : appear(t, times.pool, 0.65);
    const correct = appear(t, times.rate, 0.65);
    const passFraction = V5.acc / 100;
    ctx.globalAlpha = alpha * K.lerp(1, 0.22, shrink);
    if (hasTrajectories) {
      for (let index = 0; index < trajectories.length; index++) {
        const point = trajectories[index];
        const shown = K.c01(sweep * 1.4 - (index % 166) / 415);
        const outcome = K.c01(passFraction * V5.traj - index);
        ctx.fillStyle = K.mix(P.OFF, "#6b707a", shown);
        const top = point.top + (1 - sampled) * (point.jitter - 0.5) * 22;
        ctx.fillRect(point.left, top, 3, 3);
        if (outcome > 0 && correct > 0) {
          ctx.globalAlpha = alpha * K.lerp(1, 0.22, shrink) * correct * outcome;
          ctx.fillStyle = C.main[1];
          ctx.fillRect(point.left, top, 3, 3);
          ctx.globalAlpha = alpha * K.lerp(1, 0.22, shrink);
        }
      }
    } else {
      for (let index = 0; index < V5.pool; index++) {
        const left = 176 + (index % 112) * 8.9;
        const top = 432 + Math.floor(index / 112) * 6.6;
        const shown = K.c01(sweep * 1.4 - (index % 112) / 280);
        ctx.fillStyle = K.mix(P.OFF, C.amb[1], shown);
        ctx.fillRect(left, top, 5, 4);
      }
    }
    ctx.restore();
    if (shrink > 0) {
      const down = appear(t, times.pickOne, 0.65);
      ctx.globalAlpha = alpha * shrink;
      ctx.strokeStyle = P.GRAY[1];
      ctx.beginPath();
      ctx.moveTo(1190, 410);
      ctx.lineTo(1718, 410);
      ctx.lineTo(1550, 462);
      ctx.lineTo(1550, 494);
      ctx.stroke();
      P.arrow(ctx, 1550, 462, 1550, 462 + 36 * down, C.main[2], 7);
    }
    const keptSweep = appear(t, times.kept, 0.7);
    const repairedSweep = appear(t, times.repaired, 0.65);
    if (keepAlpha > 0.002) {
      ctx.globalAlpha = keepAlpha * 0.48 * P.pulse(t, times.whole, 0.12, 0.6);
      ctx.fillStyle = C.main[1];
      ctx.fillRect(168, 702, 384, 48);
      ctx.globalAlpha = keepAlpha;
      for (let index = 0; index < V5.kept; index++) {
        const column = index % 115;
        const row = Math.floor(index / 115);
        const left = K.lerp(780 + column * 8, 1120 + column * 5.1, mask);
        const top = K.lerp(568 + row * 8, 524 + row * 2.25, mask);
        const width = K.lerp(5, 3, mask);
        const height = K.lerp(5, 2, mask);
        const lit = K.c01(keptSweep * 1.35 - column / 328);
        ctx.fillStyle = K.mix(P.OFF, C.main[1], lit);
        const matchFlash = P.pulse(t, times.execution + column * 0.008, 0.08, 0.2);
        if (matchFlash > 0) ctx.fillStyle = K.mix(P.OFF, C.main[2], matchFlash);
        ctx.fillRect(left, top, width, height);
        if (index < V5.repaired && index / V5.repaired < repairedSweep) {
          ctx.strokeStyle = C.main[2];
          ctx.lineWidth = 1;
          ctx.strokeRect(left - 0.5, top - 0.5, width + 1, height + 1);
        }
      }
    }
    if (maskAlpha > 0.002) {
      ctx.globalAlpha = maskAlpha * appear(t, times.maskError, 0.35);
      ctx.strokeStyle = P.GRAY[1];
      for (let offset = 0; offset < maskRail.cw - 48; offset += 16) {
        ctx.beginPath();
        ctx.moveTo(maskRail.sx(1) + 20 + offset, 790);
        ctx.lineTo(maskRail.sx(1) + 44 + offset, 766);
        ctx.stroke();
      }
    }
  };

  const ciPanel = K.panel(si, 140, 230, 1640, 630, C.main[1], "FIRST IMPROVEMENT · 第一次稳定提升");
  const ciLayer = P.layer(si);
  const ci = P.ci(si, 810, 450, 660, verdict, { min: -1, max: 6 });
  const ciTitle = P.tx(si, 176, 284, "拒绝采样微调 − 原版", sans(44, 800), C.text);
  const ciTag = P.tag(si, 1744, 350, "VALIDATION · 项目判分");
  const ciMean = P.tx(si, 240, 438, P.fs(verdict.m), mono(120), C.main[2]);
  const ciUnit = P.tx(si, 240, 586, "个百分点", sans(30), C.gray);
  const meanRule = P.tx(si, 240, 702, "平均提升 > 0", sans(30), C.gray);
  const ciLow = P.tx(si, 1010, 660, P.fs(verdict.lo), mono(104), C.main[2]);
  const lowLabel = P.tx(si, 810, 702, "区间下界", sans(30), C.gray);
  const lowRule = P.tx(si, 1320, 702, "仍在 0 的右侧", sans(28), C.gray);
  const ciStable = P.tx(si, 240, 790, "第一次稳稳地涨分", sans(30), C.main[2]);
  const upCI = (t) => {
    const alpha = P.win(t, L(51), L(53) - 0.12, 0.3, 0.3);
    K.vis(ciPanel.el, alpha);
    setText(ciTitle, alpha, t < L(52) ? "拒绝采样微调 − 原版" : "第一次稳稳地涨分");
    K.vis(ciTag, alpha);
    ci.up(t, alpha, times.interval);
    K.vis(ciMean, alpha);
    K.put(ciMean, t < times.mean ? "R − B" : P.fs(verdict.m));
    ciMean.style.font = mono(t < times.mean ? 96 : 120);
    P.glow(ciMean, t, times.mean, C.main);
    if (t < times.mean) K.col(ciMean, C.gray);
    K.vis(ciUnit, alpha);
    K.vis(meanRule, alpha);
    K.col(meanRule, P.lightCol(t, times.mean, C.main[2], C.gray));
    K.vis(lowLabel, alpha);
    K.vis(ciLow, alpha);
    K.put(ciLow, t < times.lower ? "···" : P.fs(verdict.lo));
    P.glow(ciLow, t, times.lower, C.main);
    if (t < times.lower) K.col(ciLow, C.gray);
    K.vis(lowRule, alpha * appear(t, times.lower));
    K.vis(ciStable, alpha * appear(t, times.stable));
    if (!ciLayer.begin(alpha)) return;
    const ctx = ciLayer.ctx;
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = P.GRAY[0];
    ctx.beginPath();
    ctx.moveTo(704.5, 402);
    ctx.lineTo(704.5, 810);
    ctx.moveTo(780, 620.5);
    ctx.lineTo(1720, 620.5);
    ctx.stroke();
    P.check(ctx, 204, 722, 24, C.main[2], appear(t, times.mean, 0.4));
    if (t >= times.lower) {
      ctx.strokeStyle = C.main[2];
      ctx.beginPath();
      ctx.moveTo(ci.X(verdict.lo), 522);
      ctx.lineTo(ci.X(verdict.lo), 605);
      ctx.lineTo(1170, 605);
      ctx.lineTo(1170, 644);
      ctx.stroke();
      ctx.fillStyle = C.main[2];
      ctx.beginPath();
      ctx.arc(ci.X(verdict.lo), 508, 5 + 4 * P.pulse(t, times.lower, 0.12, 0.65), 0, Math.PI * 2);
      ctx.fill();
    }
    P.check(ctx, 204, 810, 24, C.main[2], appear(t, times.first, 0.45));
  };

  const preferencePanel = K.panel(si, 140, 230, 1640, 630, P.GRAY[2], "PREFERENCE OPTIMIZATION · 偏好优化");
  const preferenceLayer = P.layer(si);
  const prefTitle = P.tx(si, 176, 284, "DPO · 正反例成对", sans(44, 800), C.text);
  const prefNumber = P.tx(si, 176, 414, String(V5.dpoPairs), mono(120), C.text);
  const prefUnit = P.tx(si, 176, 560, "对正反例", sans(32), C.gray);
  const pairLegend = P.tx(si, 640, 344, "每对：做对的 / 做错的", sans(28), C.gray);
  const positiveLegend = P.tx(si, 176, 674, "做对的", sans(32), C.main[2]);
  const negativeLegend = P.tx(si, 176, 730, "做错的", sans(32), C.red[2]);
  const preferenceTag = P.tag(si, 1744, 288, "每题一对 · 按数量排布", C.gray);
  const devTag = P.tag(si, 1744, 288, "DEV · 开发集选起点", C.gray);
  const nextTitle = P.ctr(si, 1060, 778, "下一步起点", sans(52, 800), C.main[2]);
  const nextSub = P.tx(si, 176, 792, "偏向做对的那条", sans(28), C.main[2]);
  const upPreferences = (t) => {
    const alpha = P.win(t, L(53), win.t1 - 0.35, 0.3, 0.3);
    const next = ease(t, L(54), 0.65);
    const prefer = appear(t, times.prefer, 0.65);
    K.vis(preferencePanel.el, alpha);
    K.vis(prefTitle, alpha);
    K.at(prefNumber, 176, K.lerp(414, 380, next));
    prefNumber.style.font = mono(K.lerp(120, 104, next));
    setText(prefNumber, alpha * appear(t, times.preferences, 0.15), K.roll(t, times.preferences, 0.55, 0, V5.dpoPairs));
    P.glow(prefNumber, t, times.chooseCorrect, C.main);
    if (t < times.chooseCorrect) K.col(prefNumber, C.text);
    K.at(prefUnit, 176, K.lerp(560, 514, next));
    K.vis(prefUnit, alpha);
    K.vis(pairLegend, alpha);
    K.vis(positiveLegend, alpha * appear(t, times.positive));
    K.vis(negativeLegend, alpha * appear(t, times.negative) * K.lerp(1, 0.35, prefer));
    K.vis(preferenceTag, alpha * (1 - next));
    K.vis(devTag, alpha * appear(t, times.dev));
    K.vis(nextTitle, alpha * appear(t, times.next));
    K.vis(nextSub, alpha * appear(t, times.chooseCorrect));
    if (!preferenceLayer.begin(alpha)) return;
    const ctx = preferenceLayer.ctx;
    const sweep = appear(t, times.preferences, 0.7);
    const positive = appear(t, times.positive, 0.35);
    const negative = appear(t, times.negative, 0.35);
    const pairing = appear(t, times.pairEach, 0.35);
    for (let index = 0; index < V5.dpoPairs; index++) {
      const column = index % 41;
      const row = Math.floor(index / 41);
      const left = 640 + column * 26;
      const top = K.lerp(396 + row * 28, 396 + row * 21, next);
      const on = K.c01(sweep * 1.35 - column / 117);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = K.mix(P.OFF, C.main[1], on * positive);
      ctx.fillRect(left, top - prefer * 3, 8, 16);
      ctx.fillStyle = K.mix(P.OFF, C.red[1], on * negative);
      ctx.globalAlpha = alpha * K.lerp(1, 0.25, prefer);
      ctx.fillRect(left + 12, top, 8, 16);
      ctx.globalAlpha = alpha * pairing * on;
      ctx.strokeStyle = prefer > 0.5 ? C.main[2] : P.GRAY[1];
      ctx.beginPath();
      ctx.moveTo(left, top + 19);
      ctx.lineTo(left + 20, top + 19);
      ctx.stroke();
      if (prefer > 0) {
        ctx.globalAlpha = alpha * prefer;
        ctx.strokeStyle = C.main[2];
        ctx.strokeRect(left - 0.5, top - prefer * 3 - 0.5, 9, 17);
      }
    }
    if (next > 0) {
      ctx.globalAlpha = alpha * next;
      const progress = appear(t, times.score, 0.75);
      ctx.strokeStyle = P.GRAY[1];
      ctx.beginPath();
      ctx.moveTo(640, 714);
      ctx.lineTo(1700, 714);
      ctx.stroke();
      P.arrow(ctx, 1060, 715, 1060, 715 + 48 * progress, C.main[2], 8);
      if (t >= times.start) {
        ctx.strokeStyle = C.main[1];
        ctx.strokeRect(836.5, 768.5, 447, 76);
      }
    }
  };

  return (t) => {
    upTrain(t);
    upData(t);
    upAudit(t);
    upFunnel(t);
    upCI(t);
    upPreferences(t);
  };
});
