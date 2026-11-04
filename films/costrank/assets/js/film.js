// 总控：字体就绪后，用一条时间线按绝对时间驱动各段和 HUD。
(() => {
  function setup() {
    const total = window.TIMING.duration;
    const tl = gsap.timeline({ paused: true });
    const ups = K.scenes.map((sc) => {
      const si = document.querySelector(`#${sc.id} .si`);
      const win = window.TIMING.scenes[sc.id];
      return { si, win, up: sc.build(si, win) };
    });
    const hudUp = K.hud(document.querySelector("#hud .si"));
    // 面板标题行上方压着透明画布（游标、高亮带都已避开标题行），检查器把画布当不透明
    // 画布都是透明的叠层，检查器把画布当不透明；直接带字的元素都声明一下（属性不往下继承，要标在带字的元素上）
    for (const e of document.querySelectorAll("#root .scene *")) {
      if (e.tagName === "CANVAS") continue;
      // 叶子元素也标上：很多字块建的时候是空的，播放时才填字
      if (!e.children.length || [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) e.setAttribute("data-layout-allow-occlusion", "");
    }
    function frame(t) {
      const sh = K.shakeAt(t);
      for (const s of ups) {
        if (t < s.win.t0 - 0.04 || t > s.win.t1 + 0.04) continue;
        s.up(t);
        K.tf(s.si, Math.abs(sh) > 0.01 ? `translateX(${sh.toFixed(2)}px)` : "none");
      }
      hudUp(t);
    }
    let cur = 0;
    const driver = {};
    Object.defineProperty(driver, "t", {
      configurable: true,
      get() {
        return cur;
      },
      set(v) {
        cur = v;
        frame(v);
      },
    });
    tl.to(driver, { t: total, duration: total, ease: "none" }, 0);
    frame(0);
    if (K.missing.length) {
      // 锚词对不上时直接印在画面上，截帧就能看见
      console.warn("K.w 没找到：" + K.missing.join(", "));
      const box = document.getElementById("err");
      box.textContent = "K.w 没找到：" + K.missing.join(", ");
      box.style.display = "block";
    }
    window.__timelines["main"] = tl;
    if (window.__hfForceTimelineRebind) window.__hfForceTimelineRebind();
    return tl;
  }

  const sample = "机器学习选股扣掉成本还剩多少先把账记对冻结之后超额从哪来0123456789%−.ICIRBETAPOOL";
  const faces = ['900 52px "HF Sans"', '500 38px "HF Sans"', '500 18px "HF Mono"', '800 96px "HF Mono"'];
  window.buildFilm = () =>
    Promise.all(faces.map((f) => document.fonts.load(f, sample)))
      .then(() => document.fonts.ready)
      .catch(() => {})
      .then(() => setup());
})();
