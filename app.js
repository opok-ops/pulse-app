
// ─────────────────────────────────────
//  Data
// ─────────────────────────────────────
const CHANNELS = [
  { id: 'tech', name: '科技脉动', desc: 'AI · 芯片 · 数码', color: '#4A7FBF', bg: 'rgba(74,127,191,0.15)', icon: 'ph-robot', count: 12 },
  { id: 'business', name: '商业头条', desc: '财经 · 创投 · 市场', color: '#E8A445', bg: 'rgba(232,164,69,0.15)', icon: 'ph-chart-line-up', count: 8 },
  { id: 'society', name: '社会观察', desc: '民生 · 文化 · 观点', color: '#5B8A72', bg: 'rgba(91,138,114,0.15)', icon: 'ph-users-three', count: 15 },
  { id: 'world', name: '国际视界', desc: '外交 · 全球 · 地缘', color: '#8B6FBD', bg: 'rgba(139,111,189,0.15)', icon: 'ph-globe-hemisphere-west', count: 6 },
  { id: 'entertainment', name: '娱乐现场', desc: '影视 · 音乐 · 综艺', color: '#D4622A', bg: 'rgba(212,98,42,0.15)', icon: 'ph-film-slate', count: 20 },
];

const NEWS = [
  {
    id: 'n1', channel: 'tech', featured: true,
    title: 'OpenAI 发布 GPT-5：AGI 曙光初现，还是又一轮焦虑？',
    summary: 'GPT-5 在推理能力上实现了质的飞跃，但更值得关注的是它对人类工作方式的潜在改变。',
    duration: 145, img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    tags: ['AI', 'OpenAI'], publishedAt: Date.now() - 8 * 60000,
  },
  {
    id: 'n2', channel: 'business',
    title: '苹果 MR 头显年销量破百万，库克称"空间计算时代已至"',
    summary: 'Vision Pro 终于跨过关键门槛，但 3499 美元的定价依然是普及的最大障碍。',
    duration: 98, img: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=400&q=80',
    tags: ['苹果', 'MR'], publishedAt: Date.now() - 22 * 60000,
  },
  {
    id: 'n3', channel: 'society',
    title: '年轻人为什么开始爱上"旧东西"：二手经济观察',
    summary: '从二手手机到复古服饰，Z世代正在用消费行为投票，重塑整个零售业的逻辑。',
    duration: 112, img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80',
    tags: ['消费', 'Z世代'], publishedAt: Date.now() - 35 * 60000,
  },
  {
    id: 'n4', channel: 'world',
    title: '欧盟 AI 法案正式生效：全球监管框架竞赛开启',
    summary: '这是全球首个全面规范 AI 使用的法规，将对科技公司的欧洲业务产生深远影响。',
    duration: 130, img: 'https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=400&q=80',
    tags: ['AI监管', '欧盟'], publishedAt: Date.now() - 51 * 60000,
  },
  {
    id: 'n5', channel: 'entertainment',
    title: '《流浪地球3》定档春节，刘慈欣：这次要拍出宇宙的孤独感',
    summary: '续集将深入探讨人类文明在宇宙尺度的命运，被认为是整个系列最有野心的一部。',
    duration: 87, img: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&q=80',
    tags: ['电影', '科幻'], publishedAt: Date.now() - 68 * 60000,
  },
  {
    id: 'n6', channel: 'tech',
    title: '英伟达 H200 芯片供货中国受阻，国产替代加速',
    summary: '美国最新芯片出口限制令让 H200 无法进入中国市场，华为昇腾订单暴涨300%。',
    duration: 105, img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
    tags: ['芯片', '英伟达'], publishedAt: Date.now() - 82 * 60000,
  },
  {
    id: 'n7', channel: 'business',
    title: '瑞幸 vs 库迪：9.9元咖啡大战，谁在流血谁在圈地？',
    summary: '价格战的尽头是规模效应的胜利，但持续烧钱的模式正在考验两家公司的融资能力。',
    duration: 95, img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80',
    tags: ['咖啡', '新消费'], publishedAt: Date.now() - 95 * 60000,
  },
];

const INTERESTS = ['AI大模型', '新能源汽车', '消费电子', '创业投资', '国际关系', '影视综艺', '数码产品', '房产市场', '健康医疗', '体育竞技', '文化艺术', '教育职场'];

// ─────────────────────────────────────
//  State
// ─────────────────────────────────────
let state = {
  activated: false,
  currentPage: 'home',
  currentTrackIndex: -1,
  isPlaying: false,
  progress: 0,
  speed: 1,
  history: [],
  bookmarks: [],
  subscriptions: ['tech', 'business', 'society'],
  interests: ['AI大模型', '新能源汽车', '消费电子'],
  sleepTimer: null,
  sleepTimerMinutes: 0,
  totalListens: 127,
  totalBookmarks: 23,
};

// ─────────────────────────────────────
//  Init
// ─────────────────────────────────────
function init() {
  const saved = localStorage.getItem('pulse_state');
  if (saved) {
    try { state = { ...state, ...JSON.parse(saved) }; } catch(e) {}
  }
  if (state.activated) {
    document.getElementById('activation-screen').classList.add('hide');
  }
  render();
}

function saveState() {
  localStorage.setItem('pulse_state', JSON.stringify(state));
}

// ─────────────────────────────────────
//  Activation
// ─────────────────────────────────────
document.getElementById('activation-btn').addEventListener('click', activate);
document.getElementById('activation-code').addEventListener('keydown', e => {
  if (e.key === 'Enter') activate();
});

function activate() {
  const code = document.getElementById('activation-code').value.trim().toUpperCase();
  if (code === 'PULSE-2026-ALPHA') {
    state.activated = true;
    saveState();
    document.getElementById('activation-screen').classList.add('hide');
    showToast('内测资格激活成功！');
    render();
  } else {
    document.getElementById('activation-error').textContent = '内测码无效，请检查后重新输入';
    document.getElementById('activation-code').classList.add('shake');
    setTimeout(() => document.getElementById('activation-code').classList.remove('shake'), 500);
  }
}

// ─────────────────────────────────────
//  Navigation
// ─────────────────────────────────────
function switchPage(page) {
  state.currentPage = page;
  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.toggle('active', n.dataset.page === page);
  });
  document.querySelectorAll('.page').forEach(p => {
    p.classList.toggle('active', p.id === `page-${page}`);
  });
  renderPage(page);
}

// ─────────────────────────────────────
//  Render
// ─────────────────────────────────────
function render() {
  renderPage(state.currentPage);
}

function renderPage(page) {
  const map = {
    home: 'home-scroll',
    channels: 'channels-scroll',
    subscriptions: 'subscriptions-scroll',
    profile: 'profile-scroll'
  };
  const container = document.getElementById(map[page] || 'home-scroll');
  if (page === 'home') renderHomePage(container);
  else if (page === 'channels') renderChannelsPage(container);
  else if (page === 'subscriptions') renderSubscriptionsPage(container);
  else if (page === 'profile') renderProfilePage(container);
}

function renderHomePage(el) {
  const featured = NEWS.find(n => n.featured);
  const heroChannel = CHANNELS.find(c => c.id === featured.channel);
  const newsItems = NEWS.filter(n => !n.featured);

  el.innerHTML = `
    <div class="update-bar">
      <div class="pulse-line">
        <div class="bar"></div><div class="bar"></div><div class="bar"></div>
      </div>
      15分钟前更新
    </div>

    <!-- Hero -->
    <div class="hero-card" onclick="playNews('${featured.id}')" style="margin-top:16px">
      <img src="${featured.img}" alt="" onerror="this.style.display='none'">
      <div class="hero-overlay">
        <div class="hero-tag" style="background:${heroChannel.bg};color:${heroChannel.color}">
          <i class="ph ${heroChannel.icon}"></i>${heroChannel.name}
        </div>
        <div class="hero-title">${featured.title}</div>
        <div class="hero-meta">
          <span><i class="ph ph-clock"></i> ${fmtDuration(featured.duration)}</span>
          <span>${timeAgo(featured.publishedAt)}</span>
        </div>
      </div>
      <button class="hero-play-btn" onclick="event.stopPropagation();playNews('${featured.id}')">
        <i class="ph ${state.isPlaying && state.currentTrackIndex === NEWS.findIndex(n=>n.id===featured.id) ? 'ph-pause' : 'ph-play-fill'}"></i>
      </button>
    </div>

    <!-- News -->
    <div class="section-header">
      <div class="section-title"><span class="live-dot"></span>最新资讯</div>
      <div class="section-more">查看全部 <i class="ph ph-caret-right"></i></div>
    </div>
    <div class="news-list">
      ${newsItems.map(n => renderNewsCard(n)).join('')}
    </div>
  `;
}

function renderNewsCard(n) {
  const ch = CHANNELS.find(c => c.id === n.channel);
  const idx = NEWS.findIndex(x => x.id === n.id);
  const isCurrent = state.currentTrackIndex === idx;
  const isPlaying = isCurrent && state.isPlaying;
  const isBookmarked = state.bookmarks.includes(n.id);
  return `
    <div class="news-card" onclick="playNews('${n.id}')">
      <div class="news-card-inner">
        <img class="news-card-img" src="${n.img}" alt="" onerror="this.style.display='none'">
        <div class="news-card-content">
          <div class="news-card-top">
            <div class="news-tag" style="background:${ch.bg};color:${ch.color}">
              <i class="ph ${ch.icon}"></i>${ch.name}
            </div>
            <i class="ph ${isBookmarked ? 'ph-bookmark-simple-fill' : 'ph-bookmark-simple'} news-bookmark ${isBookmarked ? 'active' : ''}" onclick="event.stopPropagation();toggleBookmark('${n.id}')"></i>
          </div>
          <div class="news-card-title">${n.title}</div>
          <div class="news-card-bottom">
            <div class="news-meta">
              <span><i class="ph ph-clock"></i> ${fmtDuration(n.duration)}</span>
              <span>${timeAgo(n.publishedAt)}</span>
            </div>
            <button class="news-play-btn-small ${isPlaying ? 'playing' : ''}" onclick="event.stopPropagation();playNews('${n.id}')">
              <i class="ph ${isPlaying ? 'ph-pause-fill' : 'ph-play-fill'}"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderChannelsPage(el) {
  el.innerHTML = `
    <div class="section-header" style="margin-top:0">
      <div class="section-title"><span class="live-dot"></span>资讯频道</div>
      <div class="section-more">已订阅 ${state.subscriptions.length} 个</div>
    </div>
    <div class="channels-grid">
      ${CHANNELS.map(ch => {
        const isSub = state.subscriptions.includes(ch.id);
        const channelNews = NEWS.filter(n => n.channel === ch.id);
        return `
          <div class="channel-card" onclick="toggleSubscribe('${ch.id}')" style="--ch-color:${ch.color}">
            <style>.channel-card:hover::before{background:${ch.color}}</style>
            <div class="channel-icon" style="background:${ch.color}">
              <i class="ph ${ch.icon}"></i>
            </div>
            <div class="channel-name">${ch.name}</div>
            <div class="channel-desc">${ch.desc}</div>
            <div class="channel-badge" style="background:${ch.bg};color:${ch.color}">
              ${channelNews.length} 条新内容
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <div class="section-header">
      <div class="section-title"><span class="live-dot"></span>推荐内容</div>
    </div>
    <div class="news-list">
      ${NEWS.slice(0,4).map(n => renderNewsCard(n)).join('')}
    </div>
  `;
}

function renderSubscriptionsPage(el) {
  el.innerHTML = `
    <div class="section-header" style="margin-top:0">
      <div class="section-title"><span class="live-dot"></span>兴趣标签</div>
    </div>
    <div class="tag-grid">
      ${INTERESTS.map(tag => `
        <div class="tag-chip ${state.interests.includes(tag) ? 'selected' : ''}" onclick="toggleInterest('${tag}')">${tag}</div>
      `).join('')}
    </div>

    <div class="section-header">
      <div class="section-title">我的订阅频道</div>
    </div>
    <div class="news-list">
      ${CHANNELS.filter(ch => state.subscriptions.includes(ch.id)).map(ch => `
        <div class="news-card" onclick="switchPage('channels')">
          <div class="news-card-inner">
            <div class="channel-icon" style="background:${ch.color};width:60px;height:60px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:26px;color:#fff;flex-shrink:0">
              <i class="ph ${ch.icon}"></i>
            </div>
            <div class="news-card-content">
              <div class="news-card-title">${ch.name}</div>
              <div class="news-card-bottom">
                <div class="news-meta">${ch.desc}</div>
                <button class="news-play-btn-small" onclick="event.stopPropagation();switchPage('channels')" style="background:var(--bg-elevated);color:var(--accent-primary)">
                  <i class="ph ph-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderProfilePage(el) {
  el.innerHTML = `
    <div class="profile-header">
      <div class="profile-avatar">P</div>
      <div>
        <div class="profile-name">内测用户</div>
        <div style="font-size:12px;color:var(--text-muted)">PULSE-2026-ALPHA</div>
      </div>
    </div>

    <div class="profile-stat-row">
      <div class="profile-stat">
        <div class="profile-stat-num">${state.totalListens}</div>
        <div class="profile-stat-label">播放时长(分钟)</div>
      </div>
      <div class="profile-stat">
        <div class="profile-stat-num">${state.totalBookmarks}</div>
        <div class="profile-stat-label">收藏</div>
      </div>
      <div class="profile-stat">
        <div class="profile-stat-num">${state.history.length}</div>
        <div class="profile-stat-label">播放记录</div>
      </div>
    </div>

    <div class="section-header" style="margin-top:0">
      <div class="section-title">设置</div>
    </div>

    <div class="settings-item" onclick="showToast('播放设置')">
      <div class="settings-item-left">
        <div class="settings-item-icon"><i class="ph ph-gear"></i></div>
        <div>
          <div class="settings-item-label">播放设置</div>
          <div class="settings-item-sub">语速、定时关闭、音频质量</div>
        </div>
      </div>
      <i class="ph ph-caret-right" style="color:var(--text-muted)"></i>
    </div>
    <div class="settings-item" onclick="showToast('通知设置')">
      <div class="settings-item-left">
        <div class="settings-item-icon"><i class="ph ph-bell-ringing"></i></div>
        <div>
          <div class="settings-item-label">通知推送</div>
          <div class="settings-item-sub">热点更新、重要新闻提醒</div>
        </div>
      </div>
      <div class="toggle on" onclick="event.stopPropagation();this.classList.toggle('on')"></div>
    </div>
    <div class="settings-item" onclick="showToast('深色模式')">
      <div class="settings-item-left">
        <div class="settings-item-icon"><i class="ph ph-moon"></i></div>
        <div>
          <div class="settings-item-label">深色模式</div>
          <div class="settings-item-sub">已启用</div>
        </div>
      </div>
      <div class="toggle on" onclick="event.stopPropagation();this.classList.toggle('on')"></div>
    </div>
    <div class="settings-item" onclick="clearHistory()">
      <div class="settings-item-left">
        <div class="settings-item-icon"><i class="ph ph-trash"></i></div>
        <div>
          <div class="settings-item-label">清除播放历史</div>
          <div class="settings-item-sub">${state.history.length} 条记录</div>
        </div>
      </div>
      <i class="ph ph-caret-right" style="color:var(--text-muted)"></i>
    </div>

    <div style="text-align:center;padding:24px 0">
      <div style="font-size:12px;color:var(--text-muted);margin-bottom:4px">热点随身听 Pulse</div>
      <div style="font-size:11px;color:var(--text-muted)">内测版 v0.1.0 · 2026.04</div>
    </div>
  `;
}

// ─────────────────────────────────────
//  Player
// ─────────────────────────────────────
function playNews(id) {
  const idx = NEWS.findIndex(n => n.id === id);
  if (idx < 0) return;
  state.currentTrackIndex = idx;
  state.isPlaying = true;
  state.progress = 0;
  if (!state.history.includes(id)) {
    state.history.push(id);
    if (state.history.length > 50) state.history.shift();
  }
  saveState();
  updateMiniPlayer();
  updatePlayerUI();
  document.getElementById('mini-player').classList.remove('hidden');
  // Simulate progress
  if (window._pulseTimer) clearInterval(window._pulseTimer);
  window._pulseTimer = setInterval(() => {
    if (!state.isPlaying) return;
    const track = NEWS[state.currentTrackIndex];
    if (!track) return;
    const step = (state.speed * 100) / track.duration;
    state.progress = Math.min(100, state.progress + step);
    if (state.progress >= 100) {
      nextTrack();
    }
    updateMiniPlayer();
    updatePlayerUI();
  }, 100);
}

function togglePlay() {
  state.isPlaying = !state.isPlaying;
  updateMiniPlayer();
  updatePlayerUI();
}

function prevTrack() {
  if (state.currentTrackIndex > 0) {
    playNews(NEWS[state.currentTrackIndex - 1].id);
  }
}

function nextTrack() {
  if (state.currentTrackIndex < NEWS.length - 1) {
    playNews(NEWS[state.currentTrackIndex + 1].id);
  } else {
    state.isPlaying = false;
    state.progress = 0;
    updateMiniPlayer();
    updatePlayerUI();
  }
}

function seekRelative(secs) {
  // simulate seeking - in real app this would be audio.currentTime
  const track = NEWS[state.currentTrackIndex];
  if (!track) return;
  state.progress = Math.max(0, Math.min(100, state.progress + (secs / track.duration) * 100));
  updateMiniPlayer();
  updatePlayerUI();
}

function openPlayer() {
  document.getElementById('player-page').classList.add('open');
  updatePlayerUI();
}

function closePlayer() {
  document.getElementById('player-page').classList.remove('open');
}

function updateMiniPlayer() {
  const track = NEWS[state.currentTrackIndex];
  if (!track) return;
  const mini = document.getElementById('mini-player');
  const cover = document.getElementById('mini-cover');
  const title = document.getElementById('mini-title');
  const channel = document.getElementById('mini-channel');
  const progress = document.getElementById('mini-progress');
  const playBtn = document.getElementById('mini-play-btn');

  cover.src = track.img;
  title.textContent = track.title;
  const ch = CHANNELS.find(c => c.id === track.channel);
  channel.textContent = ch ? ch.name : '';
  progress.style.width = state.progress + '%';
  playBtn.innerHTML = state.isPlaying ? '<i class="ph ph-pause"></i>' : '<i class="ph ph-play"></i>';
  cover.classList.toggle('spinning', state.isPlaying);
}

function updatePlayerUI() {
  const track = NEWS[state.currentTrackIndex];
  if (!track) return;
  const ch = CHANNELS.find(c => c.id === track.channel);
  document.getElementById('player-cover').src = track.img;
  document.getElementById('player-cover').className = 'player-cover' + (state.isPlaying ? ' playing spinning' : '');
  document.getElementById('player-title').textContent = track.title;
  const tag = document.getElementById('player-channel-tag');
  tag.innerHTML = `<i class="ph ${ch.icon}"></i>${ch.name}`;
  tag.style.background = ch.bg;
  tag.style.color = ch.color;
  document.getElementById('player-progress-fill').style.width = state.progress + '%';
  document.getElementById('player-cur-time').textContent = fmtDuration(Math.floor((state.progress / 100) * track.duration));
  document.getElementById('player-total-time').textContent = fmtDuration(track.duration);

  const playMainBtn = document.querySelector('.play-main');
  if (playMainBtn) playMainBtn.innerHTML = state.isPlaying ? '<i class="ph ph-pause-fill"></i>' : '<i class="ph ph-play-fill"></i>';

  document.getElementById('mini-play-btn').innerHTML = state.isPlaying ? '<i class="ph ph-pause"></i>' : '<i class="ph ph-play"></i>';
}

// ─────────────────────────────────────
//  Interactions
// ─────────────────────────────────────
function toggleBookmark(id) {
  const idx = state.bookmarks.indexOf(id);
  if (idx < 0) {
    state.bookmarks.push(id);
    showToast('已添加收藏');
  } else {
    state.bookmarks.splice(idx, 1);
    showToast('已取消收藏');
  }
  state.totalBookmarks = state.bookmarks.length;
  saveState();
  render();
}

function toggleSubscribe(id) {
  const idx = state.subscriptions.indexOf(id);
  if (idx < 0) {
    state.subscriptions.push(id);
    const ch = CHANNELS.find(c => c.id === id);
    showToast(`已订阅「${ch.name}」`);
  } else {
    if (state.subscriptions.length <= 1) { showToast('至少保留一个订阅'); return; }
    state.subscriptions.splice(idx, 1);
    const ch = CHANNELS.find(c => c.id === id);
    showToast(`已取消订阅「${ch.name}」`);
  }
  saveState();
  render();
}

function toggleInterest(tag) {
  const idx = state.interests.indexOf(tag);
  if (idx < 0) {
    state.interests.push(tag);
  } else {
    state.interests.splice(idx, 1);
  }
  saveState();
  render();
}

function clearHistory() {
  state.history = [];
  state.totalListens = 0;
  saveState();
  showToast('播放历史已清除');
  render();
}

// ─────────────────────────────────────
//  Utilities
// ─────────────────────────────────────
function fmtDuration(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function timeAgo(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return '刚刚';
  if (mins < 60) return `${mins}分钟前`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}小时前`;
  return `${Math.floor(hrs/24)}天前`;
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}

function cycleSpeed() {
  const speeds = [1, 1.25, 1.5, 0.75];
  const labels = ['1x', '1.25x', '1.5x', '0.75x'];
  const currentIdx = speeds.indexOf(state.speed);
  const nextIdx = (currentIdx + 1) % speeds.length;
  state.speed = speeds[nextIdx];
  const btn = document.getElementById('speed-btn');
  document.getElementById('speed-label').textContent = labels[nextIdx];
  btn.classList.toggle('active', state.speed !== 1);
  saveState();
}

function setSleepTimer() {
  const options = [0, 15, 30, 60];
  const labels = ['关闭', '15分钟', '30分钟', '60分钟'];
  const currentIdx = options.indexOf(state.sleepTimerMinutes);
  const nextIdx = (currentIdx + 1) % options.length;
  state.sleepTimerMinutes = options[nextIdx];
  document.getElementById('sleep-label').textContent = labels[nextIdx];
  const btn = document.getElementById('player-extras')?.children[1];
  if (state.sleepTimer) { clearTimeout(state.sleepTimer); state.sleepTimer = null; }
  if (state.sleepTimerMinutes > 0) {
    state.sleepTimer = setTimeout(() => {
      state.isPlaying = false;
      state.sleepTimerMinutes = 0;
      updateMiniPlayer();
      updatePlayerUI();
      showToast('定时关闭，播放已停止');
    }, state.sleepTimerMinutes * 60000);
    showToast(`${state.sleepTimerMinutes}分钟后自动停止`);
  }
  const sleepBtn = document.querySelector('.player-extras')?.children[1];
  if (sleepBtn) sleepBtn.classList.toggle('active', state.sleepTimerMinutes > 0);
  saveState();
}

function toggleTranscript() {
  const el = document.getElementById('player-transcript');
  const track = NEWS[state.currentTrackIndex];
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
  if (track) {
    document.getElementById('transcript-text').textContent = track.summary;
  }
}

// Progress bar seek + Start
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('player-progress-bar')?.addEventListener('click', e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    state.progress = Math.max(0, Math.min(100, pct * 100));
    updateMiniPlayer();
    updatePlayerUI();
  });
  init();
});
