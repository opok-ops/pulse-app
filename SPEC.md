# 热点随身听（Pulse）App 设计规格书

## 1. Concept & Vision

**一句话定位：** 专为碎片时间打造的声音资讯伴侣——把天下大事变成你的专属电台。

不同于算法驱动的信息流，Pulse 以"电台感"为核心体验：每条资讯都是有温度的声音节目，用户不是在刷屏，而是在"换台"。设计语言融合复古收音机的温暖感与现代极简美学，让用户在通勤、家务、睡前都能轻松"听起来"，真正解放双眼。

---

## 2. Design Language

### Aesthetic Direction
**"Warm Radio" — 暖声电台**
融合1950s复古收音机的温润质感与现代杂志编辑的精致排版。不是冷冰冰的科技产品，而是一个有灵魂的私人电台。强调"被声音包围"的沉浸感，视觉元素服务于听觉体验。

### Color Palette
```
--bg-primary:      #0D0D0D   /* 深邃夜黑，沉浸背景 */
--bg-card:         #1A1A1A   /* 卡片背景 */
--bg-elevated:     #242424   /* 悬浮层 */
--accent-primary:  #E8A445   /* 琥珀金，主色调 */
--accent-warm:     #D4622A   /* 暖橙，热点标记 */
--accent-cool:     #5B8A72   /* 青绿，平静/科技 */
--text-primary:    #F5F0E8   /* 暖白主文字 */
--text-secondary:  #9A9488   /* 灰褐次文字 */
--text-muted:      #5C5750   /* 弱化文字 */
--border:          #2E2E2E   /* 分割线 */
--glow:            rgba(232, 164, 69, 0.15)  /* 光晕效果 */
```

### Typography
- **Display / Logo:** "Ma Shan Zheng"（马上正楷）— 中文手写感，亲切有温度
- **Headlines:** "Noto Serif SC" — 传统媒体般的权威感
- **Body / UI:** "LXGW WenKai"（霞鹜文楷）— 清晰可读，略带文艺气质
- **Mono / Tags:** "JetBrains Mono" — 标签和时间的数字显示
- Fallback: system-ui, sans-serif

### Spatial System
- Base unit: 8px
- Card padding: 20px
- Section gap: 32px
- Touch targets: minimum 48px
- Border radius: 16px (cards), 24px (buttons), 50% (avatars)

### Motion Philosophy
- **Entrance:** 页面元素依次淡入上浮，模拟电台信号接入（stagger 80ms）
- **Transitions:** 屏幕切换用滑动+淡出，200ms ease-out
- **Now Playing:** 音频播放时，封面呼吸式微动效（scale 1.0↔1.02，3s循环）
- **Waveform:** 播放时底部波形条动态起伏（5条柱，CSS animation）
- **Pull-to-refresh:** 下拉时信号波形动画
- **Time indicator:** "15分钟前更新" 有轻微脉冲动画

### Visual Assets
- Icons: Phosphor Icons（线条风格，圆润版）
- Images: Unsplash 配图（新闻现场、城市生活）
- Decorative: 复古收音机刻度盘纹理、信号波纹动画、唱片纹理叠加
- Logo: 圆形声波图标，内含"P"字样

---

## 3. Layout & Structure

### 整体架构（Mobile-first, 375px 设计基准）

```
┌─────────────────────────┐
│  Status Bar (sys)       │
├─────────────────────────┤
│  Header: Logo + 搜索 + 头像 │
├─────────────────────────┤
│                         │
│  主内容区（可滚动）           │
│  - 实时热点轮播（大卡片）       │
│  - 分类频道列表              │
│  - 快捷播放入口              │
│  - 播客深度解读              │
│                         │
├─────────────────────────┤
│  迷你播放器（当前播放时显示）    │
├─────────────────────────┤
│  底部导航：首页/频道/订阅/我的  │
└─────────────────────────┘
```

### 页面清单
1. **首页（Home）** — 实时热点 + 分类入口 + 继续播放
2. **频道（Channels）** — 分类浏览（科技/商业/社会/国际/娱乐）
3. **播放页（Player）** — 全屏播放器 + 波形可视化 + 文稿
4. **订阅（Subscriptions）** — 已订阅频道管理 + 兴趣标签
5. **我的（Profile）** — 收听历史/收藏/设置

### 视觉节奏
- 首页：卡片式布局，大标题+配图形成视觉锚点
- 频道页：网格布局（2列），紧凑高效
- 播放页：大量留白，聚焦音频体验
- 各页面底部统一有迷你播放器条

---

## 4. Features & Interactions

### 核心功能

#### 🎙️ 语音资讯流
- 每15分钟自动更新新内容
- 每条资讯自动转语音（TTS），时长30s~3min
- 点击卡片直接播放，背景继续播放
- 滑动切换下一条/上一条

#### 📻 分类频道
- 5大频道：科技脉动 / 商业头条 / 社会观察 / 国际视界 / 娱乐现场
- 每个频道显示最新N条 + 未读数量标记
- 长按频道可订阅/取消

#### 🎧 全屏播放器
- 封面旋转（唱片效果）
- 播放进度条（可拖拽）
- 语速调节（0.75x / 1x / 1.25x / 1.5x）
- 定时关闭（15min / 30min / 60min / 听完）
- 背景播放（切换页面继续）
- 文稿显示（可折叠）

#### 🔔 订阅管理
- 添加/移除频道
- 兴趣标签（AI/创业/新能源/影视等）
- 接收推送提醒开关

#### 📜 播放历史 & 收藏
- 记录最近50条播放历史
- 收藏感兴趣的资讯
- 一键生成个人日报摘要

### 交互细节
- **下拉刷新：** 信号波形动画 + "正在连接..." 文字
- **点击播放：** 卡片缩放反馈 + 播放器弹出动画
- **长按卡片：** 显示"收藏/分享/不感兴趣"快捷菜单
- **滑动删除：** 历史记录左滑删除
- **空状态：** "还没有播放历史，去听听热点吧" + 入口按钮
- **加载状态：** 骨架屏（3条灰色卡片占位）

---

## 5. Component Inventory

### NewsCard（新闻卡片）
- 封面图（左图右文布局，或全图大卡）
- 频道标签（彩色小标签）
- 标题（最多2行，末尾省略）
- 摘要（最多3行）
- 时长 + 更新时间
- 播放按钮（圆形，accent色）
- States: default / playing / loading / bookmarked

### MiniPlayer（迷你播放器条）
- 封面缩略图（圆形，旋转中）
- 标题 + 频道名
- 播放/暂停按钮
- 进度条（细线，accent色）
- 点击展开全屏播放器
- States: hidden / minimized / playing / paused

### ChannelCard（频道卡片）
- 频道图标（彩色圆形背景）
- 频道名称
- 最新数量徽标
- 订阅开关
- States: default / subscribed / new-content

### AudioWaveform（音频波形）
- 5根动态柱状条
- 播放时动画，暂停时静止在最高位
- 颜色跟随 accent-primary

### CategoryChip（分类标签）
- 圆角胶囊形状
- 图标 + 文字
- States: default / selected

### EmptyState（空状态）
- 插画图标（收音机 illustration）
- 主文案 + 副文案
- CTA按钮

---

## 6. Technical Approach

### 技术栈
- **前端：** 单文件 HTML + CSS + Vanilla JS（零依赖，移动端最优）
- **音频：** Web Audio API（播放控制）+ TTS（用本地TTS或模拟）
- **状态管理：** 原生 JS（localStorage 持久化）
- **字体：** Google Fonts CDN
- **图标：** Phosphor Icons CDN
- **图片：** Unsplash Source API

### 数据模型
```javascript
// 资讯条目
NewsItem {
  id: string,
  channel: 'tech' | 'business' | 'society' | 'world' | 'entertainment',
  title: string,
  summary: string,
  duration: number, // 秒
  audioUrl: string, // 模拟TTS或真实URL
  coverImage: string,
  publishedAt: Date,
  tags: string[]
}

// 用户状态
UserState {
  subscribedChannels: string[],
  history: string[], // newsItem ids
  bookmarks: string[],
  preferredSpeed: number,
  sleepTimer: number | null
}
```

### 内测码机制
- 格式：8位字母数字，如 `PULSE-2026-ALPHA`
- 存储于 localStorage，激活后显示完整功能
- 未激活状态显示内测申请页

### 响应式策略
- 主要针对 375px–428px 宽度优化
- Max-width: 430px，居中显示（桌面预览用）
- 安全区域适配（env safe-area-inset）

---

## 7. 内测链接与码

- **内测包地址：** `https://pulse-nextexample.vercel.app`（示例域名，实际需部署）
- **备用地址：** 直接打开本 HTML 文件
- **内测码：** `PULSE-2026-ALPHA`
- **有效期：** 2026年4月1日 – 2026年6月30日
- **激活方式：** 首次打开App输入内测码
