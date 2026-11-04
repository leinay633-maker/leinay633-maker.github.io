// 片名卡和五张章节卡。
// 片名卡：1501 道测试题一题一根 1 px 竖线排成条码（按 11 个库的顺序），先按原版的官方执行准确率亮 743 根，
// 再扫成最终系统三个 seed 的三档亮度（平均 869 根）。数据取 EFA.blocks，和记分板同一份。
K.scene("tc", (si, win) => {
  const C = K.C;
  const a = win.t0;
  const b = win.t1;
  const en = K.txt(si, "lab ctr", 0, 222, "HOW MUCH CAN EXECUTION RESULTS TEACH A MODEL");
  en.style.letterSpacing = "0.32em";
  en.style.color = C.main[1];
  const l1 = K.txt(si, "ctr", 0, 276, "");
  l1.style.font = '900 112px/128px "HF Sans", sans-serif';
  const sub = K.txt(si, "ctr", 0, 434, "一个 4B SQL Agent 的后训练复盘");
  sub.style.font = '500 34px/44px "HF Sans", sans-serif';
  sub.style.color = C.gray;

  // 条码
  const BX = 210;
  const BY = 560;
  const BH = 72;
  const ctx = K.canvas(si, BX - 10, BY - 10, 1521, BH + 40);
  const cols = [];
  const seps = [];
  for (const blk of EFA.blocks) {
    seps.push(cols.length);
    for (let i = 0; i < blk.n; i++) cols.push({ b: +blk.bEx[i], r: +blk.rlbEx[i] });
  }
  const N = cols.length;
  const lL = P.tx(si, BX, BY + BH + 30, "", P.MONO20, C.gray);
  const lM = P.ctr(si, BX + N / 2, BY + BH + 30, "1501 TEST TASKS · OFFICIAL EX", P.MONO20, P.DIM);
  const lR = P.txr(si, BX + N, BY + BH + 30, "FINAL · 3 SEEDS", P.MONO20, C.gray);
  const tier = (v) => (v === 1 ? K.mixHex(C.main[0], C.main[1], 0.45) : v === 2 ? C.main[1] : C.main[2]);
  const tDraw0 = a + 0.2;
  const tDraw1 = a + 1.0;
  const tSw0 = a + 1.3;
  const tSw1 = a + 2.2;

  return (t) => {
    const out = 1 - K.prog(t, b - 0.25, b);
    const p = K.prog(t, a + 0.05, a + 0.55);
    K.vis(l1, (p > 0 ? 1 : 0) * out);
    if (p < 1) K.put(l1, K.scramble("执行结果能教会模型多少", p, Math.floor(t * 30)));
    else K.html(l1, K.rich("{执行结果}能教会模型多少", C.main[2]));
    K.vis(en, K.prog(t, a + 0.1, a + 0.4) * out);
    K.vis(sub, K.prog(t, a + 0.6, a + 0.9) * out);

    ctx.clearRect(0, 0, 1521, BH + 40);
    const draw = K.eio(K.prog(t, tDraw0, tDraw1));
    const sweep = K.prog(t, tSw0, tSw1);
    ctx.globalAlpha = out;
    const xe = N * draw;
    // 换档的前沿宽 8%，前沿过去的竖线从原版的颜色渐变到最终的三档
    const front = sweep * 1.08;
    for (let i = 0; i < xe; i++) {
      const c = cols[i];
      const old = c.b ? C.main[1] : "#1a1c22";
      const q = K.c01((front - i / N) / 0.08);
      ctx.fillStyle = q > 0 ? K.mix(old, c.r ? tier(c.r) : "#1a1c22", q) : old;
      ctx.fillRect(10 + i, 10, 1, BH);
    }
    // 扫描线
    if (sweep > 0 && front < 1) {
      ctx.fillStyle = K.rgba(C.main[2], 0.9);
      ctx.fillRect(10 + Math.round(N * front), 4, 1, BH + 12);
    }
    // 库与库之间的分隔刻度
    ctx.fillStyle = "#3a3e46";
    for (const s of seps) if (s < xe) ctx.fillRect(10 + s, BH + 14, 1, 8);
    ctx.globalAlpha = 1;
    const la = K.prog(t, tDraw0 + 0.3, tDraw0 + 0.6) * out;
    K.vis(lL, la);
    K.vis(lM, la);
    K.vis(lR, K.prog(t, tSw0, tSw0 + 0.3) * out);
    const lit = K.lerp(743, 869, K.eo(sweep));
    K.put(lL, `${sweep > 0 ? "→" : "BASE ·"} ${Math.round(lit)} / 1501`);
    K.col(lL, sweep > 0 ? C.main[2] : C.gray);
  };
});

// 章节卡：超大空心编号、PART 0N、标题、发光下划线、英文副标题
const CHAPTERS = [
  ["c1", "01", "先把{考场}搭好", "THE EXAM ROOM"],
  ["c2", "02", "训完就{不查了}", "IT STOPPED LOOKING", "red"],
  ["c3", "03", "{老师}先考过学生", "THE TEACHER SITS THE EXAM FIRST", "amb"],
  ["c4", "04", "{信号}在哪", "WHERE THE SIGNAL IS"],
  ["c5", "05", "还{错在哪}", "WHAT IT STILL GETS WRONG", "red"],
];
for (const [id, no, title, sub, tone] of CHAPTERS) {
  K.scene(id, (si, win) => {
    const C = K.C;
    const a = win.t0;
    const b = win.t1;
    const kw = tone === "red" ? C.red[2] : tone === "amb" ? C.amb[2] : C.main[2];
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
