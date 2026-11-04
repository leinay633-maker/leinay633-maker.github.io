// 收尾：回到 1501 格、14 张判定签和电话题。所有状态按绝对时间计算，支持任意 seek。
K.scene("s6", (si, win) => {
  const C = K.C, MONO = P.mono, SANS = P.sans;
  const L = (n) => K.seg(n).t0 - 0.08;
  const at = (n, s, k = 1) => K.w(n, s, k) - 0.08;
  const T = EFA.totals, M = EFA.mainTask, V = EFA.verdicts;
  const mean = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;
  const finalN = mean(T.RLb_ex);
  const finalPct = ((finalN / T.tasks) * 100).toFixed(1) + "%";
  const holds = V.filter((v) => v.ok).length;
  const t103 = L(103), t104 = L(104), t105 = L(105), t106 = L(106);
  const t107 = L(107), t108 = L(108), t109 = L(109), t111 = L(111);
  const tOfficial = at(103, "官方"), t1501 = at(103, "1501"), t743 = at(103, "743");
  const tSeeds = at(103, "三个种子"), t869 = at(103, "869"), tPct = at(103, "57.9%");
  const tAll = at(104, "1501"), tThree = at(104, "三个种子"), tQueryAll = at(104, "查过数据"), tHabit = at(104, "保住");
  const tMove = at(105, "比较"), tFive = at(105, "5个");
  const tAnswer = at(106, "能教会不少"), tChanges = at(106, "变化");
  const tMiss = at(106, "漏交"), tCols = at(106, "交错列"), tExec = at(106, "跑不通");
  const tMany = at(107, "很多"), tPatch = at(107, "专门补");
  const tTwo = at(108, "两条"), tFilter = at(108, "筛对");
  const tRule = at(109, "线来判"), tLog = at(109, "照实记下来");
  const tWritten = at(109, "事先"), tCode = at(110, "代码"), tAuthor = at(110, "A");
  const tCompare = at(110, "比什么"), tHow = at(110, "怎样"), tEstablished = at(110, "成立"), tMine = at(110, "我");
  const tPhone = at(111, "电话"), tTry = at(111, "试跑"), tResult = at(111, "看到结果");
  const tFinish = at(111, "只交"), tOneCol = at(111, "一列"), tMatch = tOneCol + 0.2;
  const tBlack = win.t1 - 0.7;
  const fade = (t) => 1 - K.prog(t, tBlack, win.t1);
  const panelA = (p, t, a, b, fo = 0.3) => {
    const v = P.win(t, a, b, 0.3, fo) * fade(t);
    p.up(t, a, b, fo);
    K.vis(p.el, v);
    return v;
  };
  P.vGlow = t105;
  P.vHide = tMove;
  K.plans.push({
    t0: win.t0, t1: win.t1, chip: "06", chap: "收尾", lab: "WRAP-UP · 收尾",
    tele: (t) => t < t104
      ? `▸ ${T.B_ex} → ${Math.round(finalN)} / ${T.tasks} · OFFICIAL EX ${finalPct} · SAME NIGHT`
      : t < t105
        ? `▸ QUERY · ${T.RLb_ex.length} SEEDS · ${T.tasks} / ${T.tasks} TASKS · HABIT KEPT`
        : t < tAnswer
          ? `▸ ${V.length} COMPARISONS · ${holds} HOLD · PRE-REGISTERED`
          : t < t108
            ? `▸ PROJECT · NO ANSWER ${errorRow("没有提交").join(" → ")} · WRONG COLUMNS ${errorRow("列数不对").join(" → ")} · EXEC ERROR ${errorRow("执行失败").join(" → ")}`
            : t < t111
              ? "▸ FILTER DATA BY EXECUTION · PRE-REGISTER THE RULE · KEEP EVERY VERDICT"
              : "▸ QUERY → FINISH · PHONE ONLY · RESULT MATCH · PROJECT",
    titles: [
      { t: win.t0, text: "再按{官方口径}看" },
      { t: tPct, text: `最后亮起 {${finalPct}}` },
      { t: t104, text: "{先查再交}，保住了" },
      { t: t105, text: "最后成立的，{这五个}" },
      { t: t106, text: "执行结果能{教会模型多少}" },
      { t: tAnswer, text: "能教会{不少}" },
      { t: t107, text: "{口径}还要专门补", color: C.red[2] },
      { t: t108, text: "先把{训练数据筛对}" },
      { t: t109, text: "每个结论，{照实记}" },
      { t: t111, text: "最后再看{电话题}", color: C.amb[2] },
      { t: tFinish, text: "{先查}，只交电话" },
    ],
  });
  K.plates.push({ t0: win.t0, t1: win.t1, text: "14 COMPARISONS · 5 HOLD" });

  // A：查询标记是每格右上角的点，三种子都查询过才标满。
  const aOut = t105 - 0.3;
  const pa = K.panel(si, 140, 230, 1640, 630, P.GRAY[2], "TEST · 每题一格");
  const board = P.board(si, 147, 544);
  board.set("bEx", t743, 0.75).set("rlbEx", t869, 0.78);
  const ca = P.layer(si);
  const offTag = P.tag(si, 1750, 248, "OFFICIAL EX · 同一晚", C.gray);
  const aTitle = P.tx(si, 176, 286, "同一晚，再看这张考卷", SANS(42, 800), C.text);
  const nBase = P.tx(si, 176, 350, "", MONO(112), C.main[2]);
  const nArrow = P.tx(si, 450, 374, "→", MONO(72, 500), C.gray);
  const nFinal = P.tx(si, 562, 350, "", MONO(112), C.main[2]);
  const nDenom = P.tx(si, 820, 414, "/ " + K.fmt(T.tasks), MONO(32, 600), C.gray);
  const nPct = P.txr(si, 1748, 350, finalPct, MONO(112), C.main[2]);
  const baseLab = P.tx(si, 180, 474, "BASE · 原版", P.MONO20, C.gray);
  const finalLab = P.tx(si, 566, 474, "FINAL · 三种子均值", P.MONO20, C.gray);
  const preLab = P.tx(si, 176, 476, "TEST TASKS · 总题数", P.MONO20, C.gray);
  const triLab = P.txr(si, 1748, 506, "亮度 = 三个种子答对 1 / 2 / 3 次", P.MONO20, C.gray);
  const seedLegend = [tSeeds, at(103, "种子"), at(103, "平均")].map((tt, i) => ({
    tt, x: 1196 + i * 188, color: [K.mixHex(C.main[0], C.main[1], 0.45), C.main[1], C.main[2]][i],
    label: P.ctr(si, 1284 + i * 188, 475, `${i + 1} 次`, P.MONO20, i ? C.bg : C.text),
  }));
  const nq = Object.entries(EFA.noQuery).filter(([k]) => k.startsWith("RLb_seed"));
  const checkedEverywhere = nq.length === T.RLb_ex.length && nq.every(([, n]) => n === 0);
  const qNum = P.tx(si, 176, 350, K.fmt(T.tasks), MONO(112), C.main[2]);
  const qDenom = P.tx(si, 555, 414, "/ " + K.fmt(T.tasks), MONO(32, 600), C.gray);
  const qLab = P.tx(si, 180, 476, "QUERY · 查过数据", P.MONO20, C.gray);
  const qRows = nq.map(([key, n], i) => ({
    t: tThree + i * 0.23,
    label: P.tx(si, 1100, 344 + i * 49, key.replace("RLb_seed", "SEED "), MONO(24, 500), C.gray),
    num: P.txr(si, 1688, 344 + i * 49, `${K.fmt(T.tasks - n)} / ${K.fmt(T.tasks)}`, MONO(28, 600), C.gray),
  }));
  const habit = P.txr(si, 1748, 500, "习惯保住了", SANS(28, 700), C.main[2]);
  const upA = (t) => {
    const a = panelA(pa, t, win.t0, aOut);
    const q = K.eo(K.prog(t, t104, t104 + 0.32)), old = a * (1 - q);
    board.up(t, a, { ring: 1 });
    K.vis(offTag, a); K.vis(aTitle, a);
    K.put(aTitle, t < t104 ? "同一晚，再看这张考卷" : "每一题，都查过数据");
    K.col(aTitle, P.lightCol(t, tOfficial, C.text));
    K.vis(nBase, old * K.prog(t, t1501, t1501 + 0.2));
    K.put(nBase, t < t743 ? K.roll(t, t1501, 0.5, 0, T.tasks) : K.roll(t, t743, 0.5, T.tasks, T.B_ex));
    P.glow(nBase, t, t743, C.main);
    K.vis(preLab, old * K.prog(t, t1501, t1501 + 0.2) * (1 - K.prog(t, t743, t743 + 0.2)));
    K.vis(baseLab, old * K.prog(t, t743, t743 + 0.25));
    K.vis(nArrow, old * K.prog(t, t869 - 0.15, t869 + 0.15));
    K.vis(nFinal, old * K.prog(t, t869, t869 + 0.2));
    K.put(nFinal, K.roll(t, t869, 0.55, T.B_ex, finalN)); P.glow(nFinal, t, t869, C.main);
    K.vis(finalLab, old * K.prog(t, tSeeds, tSeeds + 0.25));
    K.vis(nDenom, old * K.prog(t, t869, t869 + 0.25));
    K.vis(nPct, old * K.prog(t, tPct, tPct + 0.2)); P.glow(nPct, t, tPct, C.main);
    K.vis(triLab, old * K.prog(t, tSeeds, tSeeds + 0.3));
    seedLegend.forEach((s) => K.vis(s.label, old * K.prog(t, s.tt, s.tt + 0.16)));
    K.vis(qNum, a * q); K.vis(qDenom, a * q); K.vis(qLab, a * q); P.glow(qNum, t, tAll, C.main);
    qRows.forEach((r) => { K.vis(r.label, a * q); K.vis(r.num, a * q); K.col(r.num, P.lightCol(t, r.t, C.main[2], C.gray)); });
    K.vis(habit, a * K.prog(t, tHabit, tHabit + 0.3));
    if (!ca.begin(a)) return;
    const ctx = ca.ctx; ctx.globalAlpha = a; ctx.lineCap = "butt"; ctx.lineJoin = "miter"; ctx.lineWidth = 1;
    seedLegend.forEach((s) => {
      const p = K.eo(K.prog(t, s.tt, s.tt + 0.18));
      if (p <= 0 || old <= 0.002) return;
      ctx.globalAlpha = old; K.rr(ctx, s.x, 474, 176 * p, 28, 4);
      ctx.fillStyle = s.color; ctx.fill();
    });
    ctx.globalAlpha = a;
    if (t < t743) {
      const x = 147 + board.W * K.prog(t, t1501, t743);
      ctx.strokeStyle = K.rgba(C.main[2], 0.5 * K.prog(t, t1501, t1501 + 0.25));
      ctx.beginPath(); ctx.moveTo(x, 536); ctx.lineTo(x, 812); ctx.stroke();
    }
    if (checkedEverywhere && t >= tAll) {
      const p = K.prog(t, tAll, tQueryAll + 0.25);
      for (const cl of board.cells) {
        const s = (cl.k + 0.5 * cl.h) / EFA.blocks.length, lit = K.prog(p, s, s + 0.045);
        if (lit <= 0) continue;
        ctx.globalAlpha = a * lit; ctx.fillStyle = C.main[2];
        ctx.beginPath(); ctx.arc(147 + cl.x + 9, 544 + cl.y + 2, 1.45, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = a;
      qRows.forEach((r, i) => P.check(ctx, 1725, 358 + i * 49, 24, C.main[2], K.eo(K.prog(t, r.t, r.t + 0.3)), 2));
      const scan = ((t - tQueryAll) / 2.6) % 1;
      if (t >= tQueryAll) { ctx.globalAlpha = a * 0.22; ctx.fillStyle = C.main[2]; ctx.fillRect(147 + board.W * scan, 542, 1, 264); }
    }
  };

  // B：按版本分组的 14 张大签。区间拆行，不向窄栏塞长句。
  const pb = K.panel(si, 140, 230, 1640, 630, P.GRAY[2], "PRE-REGISTERED · 事先写好");
  const cb = P.layer(si);
  const bTag = P.tag(si, 1750, 248, "PROJECT · 项目判分", C.gray);
  const bTitle = P.tx(si, 176, 286, "每个比较，都有一个判定", SANS(42, 800), C.text);
  const five = P.tx(si, 1300, 268, String(holds), MONO(112), C.main[2]);
  const fiveLab = P.tx(si, 1404, 282, "确认有提升", SANS(28), C.text);
  const totalLab = P.tx(si, 1404, 328, `/ ${V.length} COMPARISONS`, P.MONO20, C.gray);
  const groups = [];
  V.forEach((v, i) => { let g = groups[groups.length - 1]; if (!g || g.v !== v.v) groups.push((g = { v: v.v, ids: [] })); g.ids.push(i); });
  const cards = [];
  groups.forEach((g, gi) => {
    g.x = 176 + (gi % 4) * 400; g.y = gi < 4 ? 398 : 620;
    g.label = P.tx(si, g.x, g.y - 32, g.v, MONO(24, 500), C.gray);
    g.ids.forEach((id, j) => {
      const v = V[id], x = g.x + (g.ids.length === 1 ? 94 : j * 188), y = g.y;
      const nums = P.vNums(v);
      const lines = v.lo == null ? nums.split(" / ") : [nums.slice(0, nums.indexOf(" [")), nums.slice(nums.indexOf("[") + 1, -1).replace(", ", " / ")];
      cards[id] = { id, v, x, y,
        key: P.tx(si, x + 14, y + 12, v.k, MONO(20, 600), C.gray),
        status: P.tx(si, x + 14, y + 43, P.vStatus(v), SANS(28, 800), v.ok ? C.main[2] : C.red[2]),
        nums: lines.map((s, k) => P.tx(si, x + 14, y + 83 + k * 23, s, MONO(20, 500), C.gray)),
      };
    });
  });
  const bFoot = P.tx(si, 176, 822, "成立的留下；不成立、变差的也照实记", SANS(26, 600), C.gray);
  const upB = (t) => {
    const a = panelA(pb, t, t105, tAnswer - 0.3);
    K.vis(bTag, a); K.vis(bTitle, a); K.vis(five, a * K.prog(t, tFive, tFive + 0.2)); P.glow(five, t, tFive, C.main);
    K.vis(fiveLab, a * K.prog(t, tFive, tFive + 0.25)); K.vis(totalLab, a);
    K.vis(bFoot, a * K.prog(t, tMove + 0.5, tMove + 0.8));
    groups.forEach((g, gi) => K.vis(g.label, a * K.prog(t, t105 + 0.12 + gi * 0.035, t105 + 0.4 + gi * 0.035)));
    cards.forEach((c) => {
      const p = K.eio(K.prog(t, tMove + c.id * 0.018, tMove + 0.6 + c.id * 0.018));
      [c.key, c.status, ...c.nums].forEach((e) => K.vis(e, a * K.prog(p, 0.72, 1)));
    });
    if (!cb.begin(a)) return;
    const ctx = cb.ctx; ctx.lineCap = "butt"; ctx.lineJoin = "miter";
    cards.forEach((c) => {
      const p = K.eio(K.prog(t, tMove + c.id * 0.018, tMove + 0.6 + c.id * 0.018));
      ctx.globalAlpha = a * (1 - p); ctx.strokeStyle = "#3a3e46"; ctx.lineWidth = 1;
      K.rr(ctx, c.x + 0.5, c.y + 0.5, 175, 165, 7); ctx.stroke();
      if (p <= 0) return;
      const slot = P.vSlots ? P.vSlots.slots[c.id] : 1400 + c.id * 26;
      const x = K.lerp(slot, c.x, p), y = K.lerp(148, c.y, p), w = K.lerp(26, 176, p), h = K.lerp(20, 166, p);
      const tier = c.v.ok ? C.main : C.red;
      ctx.globalAlpha = a; K.rr(ctx, x + 0.5, y + 0.5, w - 1, h - 1, 7);
      ctx.fillStyle = K.rgba(tier[0], c.v.ok ? 0.6 : 0.38); ctx.fill();
      ctx.strokeStyle = tier[1]; ctx.lineWidth = 1; ctx.stroke();
      if (c.v.ok) {
        const pulse = 0.48 + 0.2 * Math.cos((t - t105) * 2.8 + c.id * 0.7);
        const glow = Math.max(pulse, P.pulse(t, tFive + c.id * 0.025, 0.1, 0.8));
        ctx.save(); ctx.shadowColor = tier[2]; ctx.shadowBlur = 10 * glow;
        ctx.strokeStyle = K.rgba(tier[2], 0.5 + 0.4 * glow); ctx.stroke(); ctx.restore();
        const z = K.prog(t, tFive, tFive + 0.45); ctx.fillStyle = K.rgba(tier[2], z); ctx.fillRect(x + 14, y + h - 12, (w - 28) * z, 2);
      }
      if (P.vWorse(c.v) && p > 0.8) P.arrow(ctx, x + w - 24, y + 23, x + w - 24, y + 50, C.red[2], 8);
    });
  };

  // C：红条仍表示错误，紫色括线表示减少的部分。数值来自同一项目判分口径。
  const pc = K.panel(si, 140, 230, 1640, 630, P.GRAY[2], "CHANGES · 三类明显的变化");
  const cc = P.layer(si);
  const cTag = P.tag(si, 1750, 248, "PROJECT · 项目判分", C.gray);
  const cTitle = P.tx(si, 176, 288, "能教会不少", SANS(44, 800), C.text);
  const errorRow = (key) => { const r = EFA.errors.rows.find((r) => r[0] === key); return [r[1 + EFA.errors.cols.indexOf("B")], r[1 + EFA.errors.cols.indexOf("RLb")]]; };
  const changes = [["少漏交", "没有提交", tMiss], ["少交错列", "列数不对", tCols], ["少写跑不通的 SQL", "执行失败", tExec]].map(([label, key, tt], i) => {
    const [b, r] = errorRow(key), y = 356 + i * 144;
    return { b, r, tt, y,
      label: P.tx(si, 176, y + 18, label, SANS(38), P.DIM), sub: P.tx(si, 176, y + 71, key, P.MONO20, C.gray),
      base: P.txr(si, 1448, y + 19, String(b), MONO(84), C.gray), arrow: P.tx(si, 1482, y + 27, "→", MONO(72, 500), C.gray),
      final: P.txr(si, 1748, y + 19, String(r), MONO(84), C.red[2]),
    };
  });
  const plotMax = Math.max(...changes.map((r) => r.b)), barX = 640, barW = 570, barH = 24;
  const cBase = P.tx(si, barX, 332, "上：原版", P.MONO20, C.gray), cFinal = P.tx(si, barX + 176, 332, "下：最终", P.MONO20, C.gray);
  const cMany = P.tx(si, 176, 794, "口径这类错还很多", SANS(40, 800), C.red[2]);
  const cPatch = P.txr(si, 1748, 808, "接下来，专门补", SANS(28, 600), C.gray);
  const upC = (t) => {
    const a = panelA(pc, t, tAnswer, t108 - 0.3);
    K.vis(cTag, a); K.vis(cTitle, a); K.put(cTitle, t < tChanges ? "能教会不少" : "三类变化最明显");
    K.vis(cBase, a); K.vis(cFinal, a);
    changes.forEach((r) => { const p = K.eo(K.prog(t, r.tt, r.tt + 0.4)); K.vis(r.label, a); K.vis(r.sub, a); K.col(r.label, K.mix(P.DIM, C.main[2], p)); [r.base, r.arrow, r.final].forEach((e) => K.vis(e, a * p)); });
    K.vis(cMany, a * K.prog(t, t107, tMany + 0.2)); K.vis(cPatch, a * K.prog(t, tPatch, tPatch + 0.25));
    if (!cc.begin(a)) return;
    const ctx = cc.ctx; ctx.lineWidth = 1; ctx.lineCap = "butt"; ctx.lineJoin = "miter";
    changes.forEach((r, i) => {
      const p = K.eo(K.prog(t, r.tt, r.tt + 0.55)); ctx.globalAlpha = a;
      ctx.fillStyle = "#242831"; ctx.fillRect(176, r.y + 128, 1572, 1); ctx.strokeStyle = "#3a3e46";
      ctx.strokeRect(barX + 0.5, r.y + 18.5, barW, barH); ctx.strokeRect(barX + 0.5, r.y + 62.5, barW, barH);
      if (p > 0) {
        const bw = (r.b / plotMax) * barW, fw = (r.r / plotMax) * barW;
        ctx.fillStyle = K.mix(C.red[0], C.red[1], 0.4); ctx.fillRect(barX, r.y + 19, bw * p, barH - 1);
        ctx.fillStyle = C.red[1]; ctx.fillRect(barX, r.y + 63, K.lerp(bw, fw, p), barH - 1);
        ctx.strokeStyle = C.main[1]; ctx.beginPath(); ctx.moveTo(barX + fw, r.y + 106); ctx.lineTo(barX + fw + (bw - fw) * p, r.y + 106); ctx.stroke();
        ctx.fillStyle = C.main[2]; ctx.fillRect(barX + fw, r.y + 102, 1, 9); ctx.fillRect(barX + bw, r.y + 102, 1, 9);
        const scan = ((t - r.tt + i * 0.25) / 2.4) % 1;
        ctx.fillStyle = K.rgba(C.main[2], 0.5); ctx.fillRect(barX + fw + (bw - fw) * scan, r.y + 101, 2, 11);
      }
    });
    const q = K.prog(t, tMany, tMany + 0.4); ctx.globalAlpha = a * q; ctx.fillStyle = C.red[1]; ctx.fillRect(176, 849, 720 * q, 2);
  };

  // D：第一条先铺满，第二条到来时缩回上半屏；第 110 句不加任何新画面。
  const pd1 = K.panel(si, 140, 230, 1640, 630, P.GRAY[2], "TAKEAWAY · 体会");
  const pd2 = K.panel(si, 140, 560, 1640, 300, P.GRAY[2], "RECORD · 照实记");
  const cd = P.layer(si);
  const two = P.txr(si, 1736, 284, "2", MONO(112), C.gray), twoLab = P.txr(si, 1736, 408, "两条体会", SANS(28, 600), C.gray);
  const say1 = P.say(si, 540, 392, 1160, 108, "先用执行结果把训练数据筛对，", SANS(48, 800));
  const say1b = P.say(si, 540, 475, 1160, 108, "比换更复杂的算法管用。", SANS(44, 700));
  const d1Label = P.tx(si, 540, 700, "EXECUTION RESULTS → FILTER DATA", P.MONO24, C.gray);
  const say2 = P.say(si, 208, 620, 1504, 109, "每个结论都按事先写好的线来判，", SANS(44, 700));
  const say2b = P.say(si, 208, 684, 1504, 109, "不成立的也照实记下来。", SANS(44, 700));
  const d2Tag = P.txr(si, 1748, 580, "PRE-REGISTERED · KEEP EVERY VERDICT", P.MONO20, C.gray);
  const recordGroups = [];
  const recordCards = [];
  let recordX = 176;
  V.forEach((v, i) => {
    let g = recordGroups[recordGroups.length - 1];
    if (!g || g.v !== v.v) {
      if (g) recordX += 20;
      recordGroups.push((g = { v: v.v, x: recordX, ids: [] }));
    } else recordX += 8;
    g.ids.push(i);
    recordCards.push({ v, i, x: recordX, status: P.ctr(si, recordX + 49, 790, P.vStatus(v), SANS(24, 800), C.gray) });
    recordX += 98;
    g.w = recordX - g.x;
  });
  recordGroups.forEach((g) => { g.label = P.ctr(si, g.x + g.w / 2, 746, g.v, MONO(20, 500), C.gray); });
  recordCards.filter((c) => c.v.ok).forEach((c, i) => { c.holdOn = K.lerp(tHow, tEstablished, i / Math.max(1, holds - 1)); });
  const recordFlash = (t, c) => P.pulse(t, tCompare + c.i * 0.065, 0.09, 0.32);
  const holdFlash = (t, c) => c.v.ok ? P.pulse(t, c.holdOn, 0.12, 0.4) : 0;
  const upD = (t) => {
    // 两次压暗跟着「代码」「A」落下，给长句留出两次能量到的焦点转移。
    const focus = 1 - 0.32 * K.prog(t, tCode, tCode + 0.22) - 0.33 * K.prog(t, tAuthor, tAuthor + 0.22);
    const a = panelA(pd1, t, t108, t111 - 0.3) * focus, a2 = panelA(pd2, t, t109, t111 - 0.3);
    K.vis(pd1.el, a);
    const z = K.eio(K.prog(t, t109 - 0.1, t109 + 0.45)); pd1.el.style.height = K.lerp(630, 300, z).toFixed(1) + "px";
    K.vis(two, a * K.prog(t, tTwo, tTwo + 0.25) * (1 - z)); K.vis(twoLab, a * K.prog(t, tTwo, tTwo + 0.25) * (1 - z));
    K.at(say1.el, K.lerp(540, 380, z), K.lerp(392, 307, z)); K.at(say1b.el, K.lerp(540, 380, z), K.lerp(475, 373, z));
    say1.el.style.font = SANS(K.lerp(48, 44, z), 800); say1b.el.style.font = SANS(K.lerp(44, 40, z), 700);
    K.at(d1Label, K.lerp(540, 380, z), K.lerp(700, 463, z));
    const labelMove = t < t109 ? 1 - K.prog(t, t109 - 0.2, t109 - 0.04) : K.prog(t, t109 + 0.45, t109 + 0.7);
    K.vis(say1.el, a); K.vis(say1b.el, a); K.vis(d1Label, a * labelMove); say1.paint(t); say1b.paint(t);
    say1.spans.forEach((e, i) => { if (i >= 11 && i <= 12) K.col(e, P.lightCol(t, say1.times[i] - 0.04, C.main[2])); });
    K.vis(say2.el, a2); K.vis(say2b.el, a2); K.vis(d2Tag, a2); say2.paint(t); say2b.paint(t);
    const registered = Math.max(P.pulse(t, tWritten, 0.12, 0.68), P.pulse(t, tMine, 0.1, 0.55));
    d2Tag.style.background = K.rgba(C.main[1], 0.62 * registered);
    K.col(d2Tag, K.mix(C.gray, C.text, registered));
    say2b.spans.forEach((e, i) => { if (i < 3) K.col(e, P.lightCol(t, say2b.times[i] - 0.04, C.red[2])); });
    recordGroups.forEach((g) => K.vis(g.label, a2));
    recordCards.forEach((c) => {
      const p = K.eo(K.prog(t, tLog + c.i * 0.045, tLog + 0.28 + c.i * 0.045));
      const highlight = Math.max(recordFlash(t, c), holdFlash(t, c));
      K.vis(c.status, a2); K.col(c.status, K.mix(K.mixHex(C.gray, c.v.ok ? C.main[2] : C.red[2], p), C.text, 0.8 * highlight));
    });
    if (!cd.begin(Math.max(a, a2))) return;
    const ctx = cd.ctx, cx = K.lerp(320, 252, z), cy = K.lerp(527, 396, z), sc = K.lerp(1, 0.62, z); ctx.lineCap = "butt"; ctx.lineJoin = "miter";
    // 筛子的细扫线持续运动，110 句沿用这个画面，不增加解释内容。
    ctx.save(); ctx.translate(cx, cy); ctx.scale(sc, sc); ctx.globalAlpha = a; ctx.strokeStyle = "#5a5f68"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(-92, -95); ctx.lineTo(92, -95); ctx.lineTo(30, 8); ctx.lineTo(30, 85); ctx.lineTo(-30, 112); ctx.lineTo(-30, 8); ctx.closePath(); ctx.stroke();
    const q = K.eo(K.prog(t, tFilter, tFilter + 0.5)); ctx.strokeStyle = K.mix("#5a5f68", C.main[2], q);
    ctx.beginPath(); ctx.moveTo(-54, -32); ctx.lineTo(54, -32); ctx.stroke();
    const ph = ((t - t108) / 2.8) % 1; ctx.strokeStyle = K.rgba(C.main[1], 0.75);
    ctx.beginPath(); ctx.moveTo(-72, -73 + ph * 45); ctx.lineTo(72, -73 + ph * 45); ctx.stroke();
    P.check(ctx, 0, 43, 37, C.main[2], q, 3); ctx.restore();
    if (a2 > 0) {
      const line = K.prog(t, tRule, tRule + 0.45); ctx.globalAlpha = a2; ctx.fillStyle = C.main[1]; ctx.fillRect(208, 678, 760 * line, 1);
      const scan = ((t - tRule) / 3.2) % 1; if (t >= tRule) { ctx.fillStyle = C.main[2]; ctx.fillRect(208 + 760 * scan, 675, 22, 3); }
      const ruleBand = P.pulse(t, tRule, 0.16, 0.65), ruleWidth = (recordX - 176) * K.prog(t, tRule, tRule + 0.5);
      ctx.globalAlpha = a2 * ruleBand; ctx.fillStyle = K.rgba(C.main[1], 0.48); ctx.fillRect(176, 835, ruleWidth, 22);
      ctx.fillStyle = C.main[2]; ctx.fillRect(176, 844, ruleWidth, 3);
      recordCards.forEach((c) => {
        const p = K.eo(K.prog(t, tLog + c.i * 0.045, tLog + 0.28 + c.i * 0.045));
        const tier = c.v.ok ? C.main : C.red, flash = recordFlash(t, c), held = holdFlash(t, c);
        ctx.globalAlpha = a2; ctx.lineWidth = 1;
        K.rr(ctx, c.x + 0.5, 778.5, 97, 55, 5);
        ctx.fillStyle = K.mix(K.mixHex("#11141a", tier[0], p), tier[1], 0.65 * flash); ctx.fill();
        ctx.strokeStyle = K.mix(K.mixHex("#5a5f68", tier[1], p), tier[2], flash); ctx.stroke();
        if (held > 0) {
          ctx.save(); ctx.clip(); ctx.fillStyle = K.rgba(C.main[1], 0.72 * held);
          ctx.fillRect(c.x, 779, 98 * K.prog(t, c.holdOn, c.holdOn + 0.18), 54); ctx.restore();
        }
        if (c.v.ok && p > 0) {
          ctx.save(); ctx.shadowColor = tier[2]; ctx.shadowBlur = (5 + 2 * Math.cos((t - tLog) * 2.3 + c.i)) * p;
          ctx.strokeStyle = K.rgba(tier[2], 0.7 * p); ctx.stroke(); ctx.restore();
        }
      });
    }
  };

  // E：闭环只用 mainTask.rlb 的轨迹和结果，模型与金标都只有 Phone 一列。
  const qe = P.qcard(si, 140, 230, 1180);
  const pe = K.panel(si, 1360, 230, 420, 244, P.GRAY[2], "FINAL · 最终");
  const ce = P.layer(si);
  const eTitle = P.tx(si, 1390, 286, "先查，再交", SANS(40, 800), C.text);
  const eCol = P.tx(si, 1390, 342, `${M.rlb[0].cols.join(" / ")} · ${M.rlb[0].cols.length} 列`, MONO(32, 600), C.main[2]);
  const eCorrect = P.tx(si, 1465, 394, "判对", SANS(56, 900), C.main[2]);
  const eTag = P.tag(si, 1748, 486, "PROJECT · 项目判分", C.gray);
  // 轨道只展示真实 SELECT 列的摘要，完整 SQL 保留在 EFA，避免把整条长句交给裁切器。
  const rail = P.rail(si, 176, 512, 1568, M.rlb.map((s, i) => ({ a: s.a, t: i ? tFinish : tTry, sql: s.sql.split(" FROM ")[0] + " …", tone: i ? null : "main", toneT: tTry })));
  const queryTable = P.table(si, 176, 684, M.rlb[0].cols, M.rlb[0].rows, { widths: [300] });
  const finalTable = P.table(si, 577, 684, M.rlb[0].cols, M.rlb[0].rows, { widths: [300] });
  const goldTable = P.table(si, 1444, 684, M.rlb[0].cols, M.rlb[0].rows, { widths: [300], head: C.amb[1] });
  const eqLab = P.tx(si, 176, 654, "QUERY RESULT · 试跑结果", P.MONO20, C.gray);
  const efLab = P.tx(si, 577, 654, "FINAL · 只交 Phone", P.MONO20, C.main[2]);
  const egLab = P.tx(si, 1444, 654, "GOLD · 标准答案", P.MONO20, C.amb[1]);
  const emLab = P.ctr(si, 1160, 654, "RESULT MATCH · 结果对上", P.MONO20, C.gray);
  const skeleton = (ctx, x, a) => {
    ctx.globalAlpha = a; ctx.strokeStyle = "#3a3e46"; ctx.lineWidth = 1; ctx.strokeRect(x + 0.5, 684.5, 299, 165);
    for (let j = 1; j < 4; j++) { ctx.fillStyle = "#242831"; ctx.fillRect(x, 684 + j * 40, 300, 1); ctx.fillStyle = "#3a3e46"; ctx.fillRect(x + 16, 698 + j * 40, 156, 3); }
  };
  const upE = (t) => {
    const a = panelA(pe, t, t111, win.t1, 0);
    qe.up(t, t111, win.t1, 0); K.vis(qe.el, a); qe.hl("phone", K.prog(t, tPhone, tPhone + 0.4)); qe.hl("top3", 0); qe.hl("sat", 0);
    K.vis(eTitle, a); K.vis(eCol, a * K.prog(t, tFinish, tFinish + 0.25));
    K.vis(eCorrect, a * K.prog(t, tMatch, tMatch + 0.3)); P.glow(eCorrect, t, tMatch, C.main); K.vis(eTag, a);
    rail.up(t, a, tTry); queryTable.up(t, a, tResult); finalTable.up(t, a, tFinish); goldTable.up(t, a, tPhone);
    K.vis(eqLab, a); K.vis(efLab, a); K.vis(egLab, a); K.vis(emLab, a * K.prog(t, tFinish, tMatch));
    if (!ce.begin(a)) return;
    const ctx = ce.ctx; ctx.lineCap = "round"; ctx.lineJoin = "round";
    // 查询、提交前先摆空表，避免下半屏空等。
    skeleton(ctx, 176, a * (1 - K.prog(t, tResult, tResult + 0.3)));
    skeleton(ctx, 577, a * (1 - K.prog(t, tFinish, tFinish + 0.3)));
    skeleton(ctx, 1444, a * (1 - K.prog(t, tPhone, tPhone + 0.3)));
    const q = K.eo(K.prog(t, tFinish, tMatch + 0.2)); ctx.globalAlpha = a;
    for (let i = 0; i < M.rlb[0].rows.length; i++) {
      const y = 744 + i * 40, p = K.prog(t, tFinish + 0.12 + i * 0.12, tMatch + 0.1 + i * 0.12);
      ctx.strokeStyle = K.rgba(C.main[1], 0.8); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(897, y); ctx.lineTo(897 + 527 * p, y); ctx.stroke();
      P.check(ctx, 1160, y, 22, C.main[2], K.eo(K.prog(t, tMatch + i * 0.12, tMatch + 0.3 + i * 0.12)), 2);
    }
    P.check(ctx, 1422, 428, 32, C.main[2], q, 3);
    if (t >= tMatch) { const scan = ((t - tMatch) / 2.3) % 1; ctx.fillStyle = K.rgba(C.main[2], 0.45); ctx.fillRect(897 + 527 * scan, 738, 2, 91); }
  };

  // HUD 的顶部进度条未使用 endFade。用既有扩展钩子盖黑，避免改公共件；
  // 由 HUD 每帧更新，跳回本章之前也会恢复透明，不能只由本场的 up() 驱动。
  K.hudParts.push((hudRoot) => {
    const black = K.at(K.el("div", "", hudRoot), 0, 0, 1920, 1080);
    black.style.position = "absolute"; black.style.background = "#000000"; black.style.zIndex = "100";
    black.setAttribute("data-layout-ignore", "");
    K.vis(black, 0);
    return (t) => K.vis(black, K.prog(t, tBlack, win.t1));
  });
  return (t) => { upA(t); upB(t); upC(t); upD(t); upE(t); };
});
