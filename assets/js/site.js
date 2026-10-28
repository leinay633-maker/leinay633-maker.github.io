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
