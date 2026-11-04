// 片名卡和五张章节卡。
// 片名卡：开发期 1212 天的两条累计主动收益从左往右画出来，上面灰虚线是零费用重算，下面橙线是扣成本 10 bps，
// 中间红粉的那块就是成本吃掉的部分（真实序列，CR.zero / CR.series.dev）。
K.scene("tc", (si, win) => {
  const C = K.C;
  const a = win.t0;
  const b = win.t1;
  const en = K.txt(si, "lab ctr", 0, 196, "HOW MUCH IS LEFT AFTER COSTS");
  en.style.letterSpacing = "0.32em";
  en.style.color = C.main[1];
  const l1 = K.txt(si, "ctr", 0, 246, "");
  l1.style.font = '900 104px/124px "HF Sans", sans-serif';
  const l2 = K.txt(si, "ctr", 0, 372, "");
  l2.style.font = '900 104px/124px "HF Sans", sans-serif';
  const sub = K.txt(si, "ctr", 0, 520, "一次沪深全 A 的样本外检验");
  sub.style.font = '500 34px/44px "HF Sans", sans-serif';
  sub.style.color = C.gray;

  const zero = P.cum(CR.zero.active);
  const net = P.cum(CR.series.dev.active);
  const GX = 500;
  const GW = 920;
  const GY0 = 770;
  const SC = 300;
  const ctx = K.canvas(si, GX - 20, 590, GW + 40, 270);
  const OX = GX - 20;
  const OY = 590;
  const g = { x: GX - OX, w: GW, y0: GY0 - OY, scale: SC };
  const labZ = P.tx(si, GX + GW + 18, 0, "零费用", P.MONO20, C.gray);
  const labN = P.tx(si, GX + GW + 18, 0, "扣成本", P.MONO20, C.main[2]);
  const labC = P.tx(si, GX + GW + 18, 0, "成本", P.MONO20, C.red[2]);
  const axL = P.tx(si, GX, GY0 + 72, "2020", P.MONO20, P.DIM);
  const axR = P.txr(si, GX + GW, GY0 + 72, "2024", P.MONO20, P.DIM);
  const tD0 = a + 0.5;
  const tD1 = a + 1.8;

  return (t) => {
    const out = 1 - K.prog(t, b - 0.25, b);
    const p = K.prog(t, a + 0.05, a + 0.55);
    K.vis(l1, (p > 0 ? 1 : 0) * out);
    K.vis(l2, (K.prog(t, a + 0.15, a + 0.2) > 0 ? 1 : 0) * out);
    const p2 = K.prog(t, a + 0.15, a + 0.65);
    if (p < 1) K.put(l1, K.scramble("机器学习选股", p, Math.floor(t * 30)));
    else K.put(l1, "机器学习选股");
    if (p2 < 1) K.put(l2, K.scramble("扣掉成本还剩多少", p2, Math.floor(t * 30) + 7));
    else K.html(l2, K.rich("扣掉成本{还剩多少}", C.main[2]));
    K.vis(en, K.prog(t, a + 0.1, a + 0.4) * out);
    K.vis(sub, K.prog(t, a + 0.6, a + 0.9) * out);

    ctx.clearRect(0, 0, GW + 40, 270);
    const gp = K.eio(K.prog(t, tD0, tD1));
    const ga = K.prog(t, tD0 - 0.1, tD0 + 0.2) * out;
    for (const e of [axL, axR]) K.vis(e, ga);
    if (ga > 0.002) {
      ctx.globalAlpha = ga;
      ctx.fillStyle = "#2a2d33";
      ctx.fillRect(g.x, g.y0, GW, 1);
      // 每年一根刻度
      for (let k = 0; k <= 5; k++) ctx.fillRect(Math.round(g.x + (k / 5) * GW), g.y0, 1, 6);
      if (gp > 0) {
        P.fillBetween(ctx, zero, net, { ...g, p: gp }, K.rgba(C.red[1], 0.28));
        P.drawCurve(ctx, zero, { ...g, p: gp, color: "#8a8f98", lw: 1.5, dash: [6, 4] });
        ctx.save();
        ctx.shadowColor = C.main[2];
        ctx.shadowBlur = 6;
        P.drawCurve(ctx, net, { ...g, p: gp, color: C.main[1], lw: 2 });
        ctx.restore();
      }
      ctx.globalAlpha = 1;
    }
    const la = K.prog(t, tD1 - 0.1, tD1 + 0.2) * out;
    const yZ = GY0 - zero[zero.length - 1] * SC;
    const yN = GY0 - net[net.length - 1] * SC;
    K.at(labZ, GX + GW + 18, yZ - 22);
    K.at(labN, GX + GW + 18, yN - 2);
    K.at(labC, GX + GW + 18, (yZ + yN) / 2 - 12);
    K.vis(labZ, la);
    K.vis(labN, la);
    K.vis(labC, K.prog(t, tD1 + 0.1, tD1 + 0.4) * out);
  };
});

// 章节卡：超大空心编号、PART 0N、标题、发光下划线、英文副标题
const CHAPTERS = [
  ["c1", "01", "先把{账记对}", "THE LEDGER"],
  ["c2", "02", "先写规则，{再看结果}", "RULES BEFORE RESULTS"],
  ["c3", "03", "只开一次的 {2025}", "OPENED ONCE"],
  ["c4", "04", "超额{从哪来}", "WHERE THE EDGE CAME FROM"],
  ["c5", "05", "冻结{之后}", "AFTER THE FREEZE"],
];
for (const [id, no, title, sub] of CHAPTERS) {
  K.scene(id, (si, win) => {
    const C = K.C;
    const a = win.t0;
    const b = win.t1;
    const kw = C.main[2];
    // 卡的后半段编号自上而下铺一层淡主色：不然 1.6 秒后整张卡停住，节奏扫描会量成 2 秒以上的静止
    const fill = K.txt(si, "", 280, 268, no);
    fill.style.font = '800 400px/400px "HF Mono", monospace';
    fill.style.color = K.rgba(C.main[1], 0.22);
    const num = K.txt(si, "", 280, 268, no);
    num.style.font = '800 400px/400px "HF Mono", monospace';
    num.style.color = "transparent";
    num.style.webkitTextStroke = `2px ${K.rgba(C.main[1], 0.85)}`;
    const part = K.txt(si, "lab", 880, 400, "PART " + no);
    part.style.color = C.main[1];
    part.style.letterSpacing = "0.32em";
    part.style.fontSize = "26px";
    const ttl = K.txt(si, "", 874, 438, "");
    ttl.style.font = '900 92px/108px "HF Sans", sans-serif';
    const line = K.at(K.el("div", "", si), 880, 560, 640, 2);
    line.style.position = "absolute";
    line.style.background = `linear-gradient(90deg, ${C.main[2]}, ${K.rgba(C.main[1], 0)})`;
    line.style.boxShadow = `0 0 10px ${K.rgba(C.main[2], 0.55)}`;
    line.style.transformOrigin = "0 50%";
    line.style.visibility = "hidden";
    const en = K.txt(si, "lab", 880, 584, sub);
    en.style.letterSpacing = "0.26em";
    en.style.fontSize = "24px";
    // 编号下方的五格进度：已讲过的章亮
    const dots = Array.from({ length: CHAPTERS.length }, (_, i) => {
      const d = K.at(K.el("div", "", si), 880 + i * 34, 644, 24, 4);
      d.style.position = "absolute";
      d.style.background = i < +no ? C.main[1] : C.line;
      d.style.visibility = "hidden";
      return d;
    });

    return (t) => {
      const out = 1 - K.prog(t, b - 0.3, b);
      const rev = K.eio(K.prog(t, a, a + 0.6));
      num.style.clipPath = `inset(${((1 - rev) * 100).toFixed(2)}% 0 0 0)`;
      K.vis(num, (rev > 0 ? 1 : 0) * out);
      const f = K.eio(K.prog(t, a + 1.9, a + 2.6));
      fill.style.clipPath = `inset(0 0 ${((1 - f) * 100).toFixed(2)}% 0)`;
      K.vis(fill, (f > 0 ? 1 : 0) * out);
      K.vis(part, K.prog(t, a + 0.15, a + 0.4) * out);
      const p = K.prog(t, a + 0.25, a + 0.7);
      if (p < 1) K.put(ttl, K.scramble(K.plain(title), p, Math.floor(t * 30)));
      else K.html(ttl, K.rich(title, kw));
      K.vis(ttl, (p > 0 ? 1 : 0) * out);
      K.tf(line, `scaleX(${K.eo(K.prog(t, a + 0.5, a + 1.1)).toFixed(4)})`);
      K.vis(line, (t > a + 0.5 ? 1 : 0) * out);
      K.vis(en, K.prog(t, a + 0.75, a + 1.05) * out);
      dots.forEach((d, i) => K.vis(d, K.prog(t, a + 0.9 + i * 0.06, a + 1.1 + i * 0.06) * out));
      const lit = K.prog(t, a + 1.3, a + 1.6);
      dots[+no - 1].style.boxShadow = lit > 0 ? `0 0 ${(8 * lit).toFixed(1)}px ${K.rgba(C.main[2], 0.8)}` : "none";
    };
  });
}
