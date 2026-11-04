document.querySelectorAll('[data-copy]').forEach((btn) => {
  const label = btn.textContent;
  btn.addEventListener('click', async () => {
    const text = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // 部分手机内置浏览器不给剪贴板权限，退回选区复制
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.append(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    btn.textContent = '已复制';
    setTimeout(() => { btn.textContent = label; }, 1600);
  });
});

// 顶栏的深浅色按钮：页面 head 里的小脚本已按 localStorage 设好 data-theme，这里只管切换和按钮文字
(() => {
  const btn = document.querySelector('.theme-btn');
  if (!btn) return;
  const root = document.documentElement;
  const media = matchMedia('(prefers-color-scheme: dark)');
  const isDark = () => (root.dataset.theme ? root.dataset.theme === 'dark' : media.matches);
  const sync = () => {
    const next = isDark() ? '浅色' : '深色';
    btn.querySelector('.tb-mode').textContent = next;
    btn.setAttribute('aria-label', `切换到${next}模式`);
  };
  btn.addEventListener('click', () => {
    root.dataset.theme = isDark() ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch {}
    sync();
  });
  media.addEventListener('change', sync);
  sync();
})();

// 点了封面才插入 B 站播放器，不点就不加载 B 站的页面和脚本
document.querySelectorAll('.video-cover[data-bvid]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const frame = document.createElement('iframe');
    frame.className = 'video-frame';
    frame.src = `https://player.bilibili.com/player.html?isOutside=true&bvid=${btn.dataset.bvid}&p=1&autoplay=1&danmaku=0&high_quality=1`;
    frame.title = btn.dataset.title;
    frame.allow = 'autoplay; fullscreen; picture-in-picture';
    frame.allowFullscreen = true;
    btn.replaceWith(frame);
    frame.focus();
  });
});
