import { useState, useMemo, useEffect } from "react";

/* ============================================================
   ICONS — minimal, consistent 1.75px stroke line icon set
   ============================================================ */
const Icon = ({ path, className = "w-[18px] h-[18px]", strokeWidth = 1.75 }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d={path} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const I = {
  home: "M3 11.5 12 4l9 7.5M5.5 10v9a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-9M9.5 20v-6a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6",
  inbox: "M4 12h4l1.5 3h5L16 12h4M4 12l1.4-6.2A2 2 0 0 1 7.35 4h9.3a2 2 0 0 1 1.95 1.8L20 12M4 12v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6",
  bulb: "M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.6.45.9 1.15.9 1.9V16h5.4v-.3c0-.75.3-1.45.9-1.9A6 6 0 0 0 12 3Z",
  book: "M5 4.5A1.5 1.5 0 0 1 6.5 3H19v16H6.5A1.5 1.5 0 0 0 5 20.5V4.5ZM5 20.5A1.5 1.5 0 0 1 6.5 19H19M9 7h6M9 10h6",
  sparkles: "m12 3 1.6 4.2L18 9l-4.4 1.8L12 15l-1.6-4.2L6 9l4.4-1.8L12 3ZM19 15l.8 2.1L22 18l-2.2.9L19 21l-.8-2.1L16 18l2.2-.9L19 15Z",
  folder: "M4 7.5A1.5 1.5 0 0 1 5.5 6h4.4l2 2.4H18.5A1.5 1.5 0 0 1 20 9.9v8.1a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18V7.5Z",
  calendar: "M7 3v3.2M17 3v3.2M4 9.5h16M5.5 5.5h13A1.5 1.5 0 0 1 20 7v12a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19V7a1.5 1.5 0 0 1 1.5-1.5Z",
  chart: "M4.5 20V9.5M11 20V4M17.5 20v-7",
  users: "M9 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM3.5 20c.5-3.5 3-5.5 5.5-5.5s5 2 5.5 5.5M17 8.5a2.75 2.75 0 1 1 0 5.5M19.5 20c-.3-2.4-1.5-4-3.3-4.8",
  settings: "M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z M4.6 13.7l-1.4-.4a1 1 0 0 1-.6-1.5l.7-1.3a1 1 0 0 0-.1-1.1L2.4 8.2a1 1 0 0 1 .3-1.6l1.2-.7a1 1 0 0 0 .5-1l-.1-1.4a1 1 0 0 1 1.2-1.1l1.4.3a1 1 0 0 0 1-.4L9 1a1 1 0 0 1 1.6 0l.9 1.2a1 1 0 0 0 1 .4l1.4-.3a1 1 0 0 1 1.2 1.1l-.1 1.4a1 1 0 0 0 .5 1l1.2.7a1 1 0 0 1 .3 1.6l-.9 1.1a1 1 0 0 0-.1 1.1l.7 1.3a1 1 0 0 1-.6 1.5l-1.4.4",
  search: "m20 20-3.5-3.5M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z",
  bell: "M6 9a6 6 0 1 1 12 0c0 3.4 1 5 1.6 5.8a.8.8 0 0 1-.6 1.3H5a.8.8 0 0 1-.6-1.3C5 14 6 12.4 6 9ZM9.5 19a2.5 2.5 0 0 0 5 0",
  plus: "M12 5v14M5 12h14",
  chevronRight: "m9 6 6 6-6 6",
  chevronDown: "m6 9 6 6 6-6",
  arrowRight: "M4.5 12h15M13.5 5.5 20 12l-6.5 6.5",
  check: "m5 12.5 4.5 4.5L19 7",
  link: "M9.5 14.5 14.5 9.5M11 6.5l1.2-1.2a3.5 3.5 0 0 1 5 5L16 11.5M13 17.5l-1.2 1.2a3.5 3.5 0 0 1-5-5L8 12.5",
  fileText: "M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1ZM14 3.5V8h4.2M9 12.5h6M9 15.5h6M9 9.5h2",
  video: "M4.5 6.5A1.5 1.5 0 0 1 6 5h8a1.5 1.5 0 0 1 1.5 1.5v11A1.5 1.5 0 0 1 14 19H6a1.5 1.5 0 0 1-1.5-1.5v-11ZM15.5 10l4-2.3v8.6l-4-2.3",
  mic: "M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3ZM6.5 11a5.5 5.5 0 0 0 11 0M12 18.5V21",
  image: "M5 4.5h14A1.5 1.5 0 0 1 20.5 6v12a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 18V6A1.5 1.5 0 0 1 5 4.5ZM8.2 10a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4ZM3.7 16l5-5 3 3 3.5-3.5 4.8 4.8",
  camera: "M9 4.5h6l1.2 2H19a1.5 1.5 0 0 1 1.5 1.5v9.5A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5V8a1.5 1.5 0 0 1 1.5-1.5h2.8L9 4.5ZM12 15.2a3.4 3.4 0 1 0 0-6.8 3.4 3.4 0 0 0 0 6.8Z",
  send: "M4 11.5 20 4l-6.2 16-3-7-6.8-1.5Z",
  clock: "M12 7v5.3l3.5 2M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z",
  grip: "M9 6.2h.01M9 12h.01M9 17.8h.01M15 6.2h.01M15 12h.01M15 17.8h.01",
  gem: "m4 8.5 3.5-5h9l3.5 5-8 11.5-8-11.5ZM4 8.5h16M9.5 3.5 8 8.5l4 11.5M14.5 3.5 16 8.5l-4 11.5",
  logout: "M14 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2M9 12h11m0 0-3.5-3.5M20 12l-3.5 3.5",
};

/* ============================================================
   MOCK DATA
   ============================================================ */
const NAV_ITEMS = [
  { key: "home", label: "首頁", icon: I.home },
  { key: "inbox", label: "Inbox 收集中心", icon: I.inbox, badge: 23 },
  { key: "ideas", label: "Ideas 靈感中心", icon: I.bulb },
  { key: "knowledge", label: "Knowledge 知識庫", icon: I.book },
  { key: "studio", label: "AI Studio", icon: I.sparkles },
  { key: "projects", label: "Projects 專案", icon: I.folder },
  { key: "calendar", label: "Calendar 行事曆", icon: I.calendar },
  { key: "analytics", label: "Analytics 數據分析", icon: I.chart },
  { key: "crm", label: "CRM 客戶管理", icon: I.users },
  { key: "settings", label: "設定", icon: I.settings },
];

const TODAY_TASKS = [
  { id: 1, time: "12:00", title: "發布 IG 貼文", tag: "發布", icon: I.image, done: false, urgent: true },
  { id: 2, time: "14:30", title: "Threads 草稿撰寫", tag: "創作", icon: I.fileText, done: false },
  { id: 3, time: "明天", title: "YouTube 腳本完成", tag: "創作", icon: I.video, done: false },
  { id: 4, time: "今天", title: "回覆客戶訊息（2 位）", tag: "客戶", icon: I.users, done: false },
  { id: 5, time: "16:00", title: "與王先生會議", tag: "會議", icon: I.calendar, done: false },
];

const WEEK_DAYS = [
  { d: "7/15", w: "一", today: false },
  { d: "7/16", w: "二", today: false },
  { d: "7/17", w: "三", today: false },
  { d: "7/18", w: "四", today: false },
  { d: "7/19", w: "五", today: false },
  { d: "7/20", w: "六", today: true },
  { d: "7/21", w: "日", today: false },
];

const CAL_SEED = [
  { id: "c1", day: 0, time: "12:00", title: "IG 貼文", platform: "ig" },
  { id: "c2", day: 0, time: "14:30", title: "Threads", platform: "threads" },
  { id: "c3", day: 1, time: "10:00", title: "YouTube", platform: "yt" },
  { id: "c4", day: 1, time: "20:00", title: "Reels", platform: "ig" },
  { id: "c5", day: 2, time: "09:00", title: "Podcast", platform: "podcast" },
  { id: "c6", day: 2, time: "18:00", title: "IG 限動", platform: "ig" },
  { id: "c7", day: 3, time: "11:00", title: "部落格文章", platform: "blog" },
  { id: "c8", day: 4, time: "15:00", title: "客戶會議", platform: "meeting" },
];

const PLATFORM_STYLES = {
  ig: { bg: "bg-gradient-to-br from-pink-400 to-orange-300", label: "IG" },
  threads: { bg: "bg-ink-900", label: "@" },
  yt: { bg: "bg-red-500", label: "YT" },
  podcast: { bg: "bg-brand-500", label: "🎙" },
  blog: { bg: "bg-sky-500", label: "✎" },
  meeting: { bg: "bg-emerald-500", label: "☰" },
};

const PROJECTS = [
  { id: 1, title: "保險知識系列影片", sub: "YouTube", progress: 65, hue: "from-indigo-500 to-brand-500" },
  { id: 2, title: "「慢一點也沒關係」系列貼文", sub: "社群貼文", progress: 40, hue: "from-orange-400 to-rose-400" },
  { id: 3, title: "2026 演講簡報", sub: "簡報設計", progress: 80, hue: "from-emerald-400 to-teal-500" },
];

const IDEAS = [
  { id: 1, title: "人生有時候就是這樣⋯", source: "來自 IG · 2 小時前", tag: "故事" },
  { id: 2, title: "保險理賠的真實案例", source: "來自 客戶對話 · 5 小時前", tag: "保險" },
  { id: 3, title: "如何建立個人品牌", source: "來自 YouTube · 1 天前", tag: "品牌" },
];

const CAPTURES = [
  { id: 1, title: "這支影片很有啟發！", source: "YouTube · 2 小時前", icon: I.video, hue: "from-rose-400 to-orange-300" },
  { id: 2, title: "一篇很棒的文章", source: "medium.com · 5 小時前", icon: I.link, hue: "from-sky-400 to-indigo-400" },
  { id: 3, title: "客戶傳來的檔案", source: "PDF · 昨天", icon: I.fileText, hue: "from-emerald-400 to-teal-400" },
];

const AI_QUICK_ACTIONS = [
  { id: 1, label: "幫我生成一篇 IG 貼文", icon: I.image },
  { id: 2, label: "分析最近表現最好的內容", icon: I.chart },
  { id: 3, label: "將 YouTube 影片轉成腳本", icon: I.video },
  { id: 4, label: "整理今天的待辦事項", icon: I.calendar },
  { id: 5, label: "給我內容創作建議", icon: I.sparkles },
];

const QUICK_CAPTURE = [
  { id: "url", label: "網址", icon: I.link },
  { id: "article", label: "文章", icon: I.fileText },
  { id: "video", label: "影片", icon: I.video },
  { id: "voice", label: "語音", icon: I.mic },
  { id: "file", label: "檔案", icon: I.folder },
  { id: "shot", label: "截圖", icon: I.camera },
];

/* ============================================================
   SMALL UTILITIES / DECORATIVE CHARTS (hand-rolled SVG, no deps)
   ============================================================ */
function Sparkline({ points, color = "#7C5CFF", width = 96, height = 32, fill = false }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = width / (points.length - 1);
  const coords = points.map((p, i) => [i * step, height - ((p - min) / range) * (height - 6) - 3]);
  const path = coords.reduce((acc, [x, y], i) => acc + (i === 0 ? `M${x},${y}` : ` L${x},${y}`), "");
  const areaPath = `${path} L${width},${height} L0,${height} Z`;
  const gid = `grad-${color.replace("#", "")}`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      {fill && (
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
      )}
      {fill && <path d={areaPath} fill={`url(#${gid})`} stroke="none" />}
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={coords[coords.length - 1][0]} cy={coords[coords.length - 1][1]} r="2.5" fill={color} />
    </svg>
  );
}

function BigAreaChart() {
  const points = [8, 14, 11, 18, 15, 24, 20, 28, 25, 34, 30, 40];
  const width = 340, height = 120;
  const max = Math.max(...points), min = Math.min(...points), range = max - min || 1;
  const step = width / (points.length - 1);
  const coords = points.map((p, i) => [i * step, height - ((p - min) / range) * (height - 16) - 8]);
  const path = coords.reduce((acc, [x, y], i) => acc + (i === 0 ? `M${x},${y}` : ` L${x},${y}`), "");
  const areaPath = `${path} L${width},${height} L0,${height} Z`;
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="w-full h-28">
      <defs>
        <linearGradient id="bigArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#bigArea)" stroke="none" />
      <path d={path} fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={coords[coords.length - 1][0]} cy={coords[coords.length - 1][1]} r="4" fill="#ffffff" />
      <circle cx={coords[coords.length - 1][0]} cy={coords[coords.length - 1][1]} r="8" fill="#ffffff" opacity="0.25" className="pulse-glow" />
    </svg>
  );
}

/* ============================================================
   SIDEBAR
   ============================================================ */
function Sidebar({ active, setActive }) {
  return (
    <aside className="hidden lg:flex flex-col w-[264px] shrink-0 h-screen sticky top-0 sidebar-surface text-white/90">
      <div className="px-6 pt-7 pb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-[10px] shimmer-orb flex items-center justify-center shadow-glow-brand">
            <span className="font-display italic text-white text-lg font-semibold">C</span>
          </div>
          <span className="font-display text-[19px] tracking-tight text-white">
            Creator <span className="text-brand-300 italic">OS</span>
          </span>
        </div>
      </div>

      <nav className="flex-1 px-3.5 thin-scroll overflow-y-auto">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.key;
            return (
              <li key={item.key}>
                <button
                  onClick={() => setActive(item.key)}
                  className={`nav-item w-full flex items-center gap-3 pl-3 pr-2.5 py-2.5 rounded-xl text-[13.5px] font-medium ${
                    isActive
                      ? "bg-white/[0.08] text-white"
                      : "text-white/55 hover:text-white/90 hover:bg-white/[0.04]"
                  }`}
                >
                  <span
                    className="nav-indicator absolute left-0 w-[3px] h-4 rounded-full bg-brand-400"
                    style={{ opacity: isActive ? 1 : 0, transform: isActive ? "scaleY(1)" : "scaleY(0.3)" }}
                  ></span>
                  <Icon path={item.icon} className={`w-[18px] h-[18px] shrink-0 ${isActive ? "text-brand-300" : ""}`} />
                  <span className="flex-1 text-left truncate">{item.label}</span>
                  {item.badge && (
                    <span className="text-[10.5px] font-semibold bg-brand-500/90 text-white rounded-full px-1.5 py-0.5 min-w-[19px] text-center leading-none">
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-3.5 mt-auto">
        <div className="rounded-2xl bg-white/[0.05] border border-white/[0.07] p-3.5 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-300 to-brand-600 flex items-center justify-center text-[13px] font-semibold shrink-0">
              阿信
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-white truncate">阿信</p>
              <p className="text-[11px] text-brand-300/90 font-medium">Pro 方案</p>
            </div>
            <Icon path={I.logout} className="w-4 h-4 text-white/30" />
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-[10.5px] text-white/40 mb-1.5">
              <span>已使用 68.2 GB</span>
              <span>100 GB</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-300" style={{ width: "68%" }}></div>
            </div>
          </div>
        </div>
        <button className="sheen w-full rounded-xl bg-gradient-to-r from-brand-500 to-brand-400 text-white text-[13px] font-semibold py-2.5 shadow-glow-brand hover:brightness-110 transition">
          升級到 Team 方案
        </button>
      </div>
    </aside>
  );
}

/* ============================================================
   HEADER
   ============================================================ */
function Header() {
  const [dateStr, setDateStr] = useState("");
  useEffect(() => {
    const now = new Date();
    const fmt = new Intl.DateTimeFormat("zh-TW", { year: "numeric", month: "long", day: "numeric", weekday: "long" });
    setDateStr(fmt.format(now));
  }, []);

  return (
    <header className="rise-in flex items-start justify-between gap-6 mb-8" style={{ animationDelay: "0.02s" }}>
      <div>
        <h1 className="font-display text-[34px] leading-tight text-ink-900 tracking-tight">
          早安，阿信 <span className="inline-block animate-[floatSlow_2.5s_ease-in-out_infinite]">👋</span>
        </h1>
        <p className="text-[14px] text-ink-900/45 mt-1.5 font-medium">{dateStr || "今天是美好的一天"}</p>
      </div>

      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative group">
          <Icon path={I.search} className="w-[17px] h-[17px] absolute left-4 top-1/2 -translate-y-1/2 text-ink-900/30" />
          <input
            type="text"
            placeholder="搜尋內容、專案、客戶或使用 AI..."
            className="w-full glass rounded-2xl pl-11 pr-14 py-3 text-[13.5px] placeholder:text-ink-900/35 text-ink-900 shadow-soft-sm focus:outline-none focus:ring-2 focus:ring-brand-300/50 transition"
          />
          <kbd className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10.5px] font-medium text-ink-900/35 bg-ink-900/[0.04] rounded-md px-1.5 py-0.5">
            ⌘ K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <button className="w-10 h-10 rounded-xl glass shadow-soft-sm flex items-center justify-center text-ink-900/70 hover:text-brand-600 hover:border-brand-200 transition">
          <Icon path={I.plus} className="w-[18px] h-[18px]" />
        </button>
        <button className="relative w-10 h-10 rounded-xl glass shadow-soft-sm flex items-center justify-center text-ink-900/70 hover:text-brand-600 hover:border-brand-200 transition">
          <Icon path={I.bell} className="w-[18px] h-[18px]" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-500 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-[#F6F5F9]">
            8
          </span>
        </button>
        <div className="w-10 h-10 rounded-xl overflow-hidden ring-1 ring-ink-900/[0.06] shadow-soft-sm cursor-pointer">
          <div className="w-full h-full bg-gradient-to-br from-brand-300 to-brand-600 flex items-center justify-center text-white text-[13px] font-semibold">
            阿
          </div>
        </div>
      </div>
    </header>
  );
}

/* ============================================================
   ROW 1 — Today / AI Suggestion / Weekly Stats
   ============================================================ */
function TodayTasksCard() {
  const [tasks, setTasks] = useState(TODAY_TASKS);
  const toggle = (id) => setTasks((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));
  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <div className="rise-in lift-card glass rounded-3xl shadow-soft p-6 flex flex-col" style={{ animationDelay: "0.08s" }}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-[17px] text-ink-900 flex items-center gap-2">今日待辦</h3>
        <span className="text-[11.5px] font-semibold text-ink-900/40 tabular">{doneCount}/{tasks.length}</span>
      </div>
      <ul className="space-y-1 flex-1">
        {tasks.map((task) => (
          <li key={task.id}>
            <button
              onClick={() => toggle(task.id)}
              className="w-full flex items-center gap-3 py-2 px-2 -mx-2 rounded-xl hover:bg-ink-900/[0.03] transition text-left group"
            >
              <span
                className={`task-check shrink-0 w-[19px] h-[19px] rounded-full border-[1.75px] flex items-center justify-center ${
                  task.done ? "bg-brand-500 border-brand-500" : "border-ink-900/20 group-hover:border-brand-400"
                }`}
              >
                {task.done && <Icon path={I.check} className="w-3 h-3 text-white" strokeWidth={2.5} />}
              </span>
              <span className="w-6 h-6 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                <Icon path={task.icon} className="w-[13px] h-[13px]" />
              </span>
              <span className={`flex-1 text-[13.5px] font-medium truncate ${task.done ? "line-through text-ink-900/30" : "text-ink-900/85"}`}>
                {task.title}
              </span>
              <span className={`text-[11px] font-semibold tabular shrink-0 ${task.urgent && !task.done ? "text-brand-600" : "text-ink-900/35"}`}>
                {task.time}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <button className="mt-4 flex items-center justify-center gap-1.5 text-[12.5px] font-semibold text-brand-600 hover:text-brand-700 transition py-1">
        查看全部待辦
        <Icon path={I.arrowRight} className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function AISuggestionCard() {
  return (
    <div
      className="rise-in lift-card relative overflow-hidden rounded-3xl shadow-glow-brand p-6 flex flex-col text-white"
      style={{
        animationDelay: "0.14s",
        background: "radial-gradient(120% 140% at 100% 0%, #9678FF 0%, #7C5CFF 42%, #5230C9 100%)",
      }}
    >
      <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/10 blur-2xl float-slow"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-brand-900/20 blur-2xl"></div>

      <div className="relative flex items-center justify-between mb-5">
        <h3 className="font-display text-[17px] flex items-center gap-2">
          <Icon path={I.sparkles} className="w-[17px] h-[17px]" />
          AI 今日建議
        </h3>
        <span className="text-[10.5px] font-semibold bg-white/15 rounded-full px-2.5 py-1 backdrop-blur-sm">內容建議</span>
      </div>

      <div className="relative flex-1">
        <p className="text-[13px] text-white/70 mb-1">今天適合發布</p>
        <p className="font-display text-[21px] leading-snug mb-2 text-balance">「慢一點也沒關係」系列</p>
        <p className="text-[13px] text-white/80">
          預估互動率 <span className="font-bold text-white">+23%</span>
        </p>
      </div>

      <div className="relative -mx-1 mb-2">
        <BigAreaChart />
      </div>

      <div className="relative flex items-center justify-between mt-1">
        <button className="sheen flex items-center gap-1.5 bg-white text-brand-700 text-[13px] font-bold rounded-xl px-4 py-2.5 hover:brightness-105 transition shadow-lg shadow-black/10">
          生成內容
          <Icon path={I.arrowRight} className="w-3.5 h-3.5" strokeWidth={2.25} />
        </button>
        <button className="flex items-center gap-1 text-[12px] font-semibold text-white/75 hover:text-white transition">
          查看完整分析
          <Icon path={I.chevronRight} className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function WeeklyStatsCard() {
  const stats = [
    { label: "粉絲成長", value: "+210", delta: "+12.5%", up: true, points: [12, 18, 14, 22, 19, 26, 24], color: "#7C5CFF" },
    { label: "內容發布數", value: "18", delta: "+5.3%", up: true, points: [2, 3, 2, 4, 3, 5, 4], color: "#38BDF8" },
    { label: "互動率", value: "8.7%", delta: "+2.1%", up: true, points: [6, 7, 6.5, 8, 7.5, 9, 8.7], color: "#34D399" },
    { label: "觀看數", value: "24.3K", delta: "+8.9%", up: true, points: [10, 14, 12, 18, 16, 22, 24], color: "#FB923C" },
  ];

  return (
    <div className="rise-in lift-card glass rounded-3xl shadow-soft p-6 flex flex-col" style={{ animationDelay: "0.2s" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-[17px] text-ink-900">本週數據概覽</h3>
        <button className="flex items-center gap-1 text-[11.5px] font-semibold text-ink-900/40 hover:text-ink-900/70 transition bg-ink-900/[0.03] rounded-lg px-2 py-1">
          比上週
          <Icon path={I.chevronDown} className="w-3 h-3" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-5 flex-1">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-[11.5px] text-ink-900/45 font-medium mb-1">{s.label}</p>
            <div className="flex items-end justify-between gap-2">
              <div>
                <p className="font-display text-[21px] text-ink-900 tabular leading-none">{s.value}</p>
                <p className="text-[10.5px] font-bold text-emerald-500 mt-1.5 flex items-center gap-0.5">
                  <Icon path="M12 19V5M5 12l7-7 7 7" className="w-2.5 h-2.5" strokeWidth={3} />
                  {s.delta}
                </p>
              </div>
              <Sparkline points={s.points} color={s.color} width={64} height={28} fill />
            </div>
          </div>
        ))}
      </div>
      <button className="mt-5 flex items-center justify-center gap-1.5 text-[12.5px] font-semibold text-brand-600 hover:text-brand-700 transition py-1 border-t border-ink-900/[0.06] pt-4">
        進入 Analytics
        <Icon path={I.arrowRight} className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

/* ============================================================
   ROW 2 — Content Calendar (draggable weekly timeline)
   ============================================================ */
function ContentCalendar() {
  const [items, setItems] = useState(CAL_SEED);
  const [dragId, setDragId] = useState(null);
  const [overDay, setOverDay] = useState(null);

  const grouped = useMemo(() => {
    const g = Array.from({ length: 7 }, () => []);
    items.forEach((it) => g[it.day].push(it));
    g.forEach((col) => col.sort((a, b) => a.time.localeCompare(b.time)));
    return g;
  }, [items]);

  const onDrop = (dayIdx) => {
    if (dragId == null) return;
    setItems((prev) => prev.map((it) => (it.id === dragId ? { ...it, day: dayIdx } : it)));
    setDragId(null);
    setOverDay(null);
  };

  return (
    <div className="rise-in lift-card glass rounded-3xl shadow-soft p-6" style={{ animationDelay: "0.26s" }}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-[17px] text-ink-900">內容日曆（本週）</h3>
        <button className="flex items-center gap-1 text-[12.5px] font-semibold text-brand-600 hover:text-brand-700 transition">
          查看完整日曆
          <Icon path={I.arrowRight} className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2.5">
        {WEEK_DAYS.map((day, idx) => (
          <div
            key={day.d}
            onDragOver={(e) => { e.preventDefault(); setOverDay(idx); }}
            onDragLeave={() => setOverDay((d) => (d === idx ? null : d))}
            onDrop={() => onDrop(idx)}
            className={`rounded-2xl p-2.5 min-h-[168px] flex flex-col gap-1.5 transition-colors ${
              day.today ? "bg-brand-50 ring-1 ring-brand-200" : overDay === idx ? "bg-brand-50/60" : "bg-ink-900/[0.025]"
            }`}
          >
            <div className="flex items-center justify-between px-0.5 mb-0.5">
              <span className={`text-[11px] font-bold ${day.today ? "text-brand-600" : "text-ink-900/40"}`}>{day.w}</span>
              <span className={`text-[11px] font-semibold tabular ${day.today ? "text-brand-600" : "text-ink-900/35"}`}>
                {day.d}{day.today && <span className="ml-1 text-brand-500">今</span>}
              </span>
            </div>
            {grouped[idx].length === 0 && idx === 6 && (
              <div className="flex-1 flex items-center justify-center">
                <span className="text-[11px] text-ink-900/25 font-medium">休息日</span>
              </div>
            )}
            {grouped[idx].map((ev) => {
              const style = PLATFORM_STYLES[ev.platform];
              return (
                <div
                  key={ev.id}
                  draggable
                  onDragStart={() => setDragId(ev.id)}
                  onDragEnd={() => setDragId(null)}
                  className="lift-card cursor-grab active:cursor-grabbing bg-white rounded-xl px-2 py-1.5 shadow-soft-sm flex items-center gap-1.5 border border-ink-900/[0.04]"
                >
                  <span className={`w-4 h-4 rounded-md shrink-0 ${style.bg} flex items-center justify-center text-white text-[8px] font-bold`}>
                    {style.label}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-ink-900/80 truncate leading-tight">{ev.title}</p>
                    <p className="text-[9.5px] text-ink-900/35 tabular leading-tight">{ev.time}</p>
                  </div>
                </div>
              );
            })}
            {idx !== 6 && (
              <button className="mt-auto flex items-center gap-1 text-[10.5px] text-ink-900/25 hover:text-brand-500 font-medium py-1 transition">
                <Icon path={I.plus} className="w-3 h-3" />
                新增內容
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   ROW 3 — Active Projects / Ideas at a glance
   ============================================================ */
function ActiveProjects() {
  return (
    <div className="rise-in lift-card glass rounded-3xl shadow-soft p-6" style={{ animationDelay: "0.32s" }}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-[17px] text-ink-900">進行中的專案</h3>
        <button className="flex items-center gap-1 text-[12.5px] font-semibold text-brand-600 hover:text-brand-700 transition">
          查看全部專案
          <Icon path={I.arrowRight} className="w-3.5 h-3.5" />
        </button>
      </div>
      <ul className="space-y-1.5">
        {PROJECTS.map((p) => (
          <li key={p.id} className="flex items-center gap-3.5 p-2 -mx-2 rounded-2xl hover:bg-ink-900/[0.03] transition cursor-pointer">
            <div className={`w-12 h-12 rounded-xl shrink-0 bg-gradient-to-br ${p.hue} shadow-soft-sm`}></div>
            <div className="flex-1 min-w-0">
              <p className="text-[13.5px] font-semibold text-ink-900/85 truncate">{p.title}</p>
              <p className="text-[11.5px] text-ink-900/40 font-medium mb-1.5">{p.sub}</p>
              <div className="h-1.5 rounded-full bg-ink-900/[0.06] overflow-hidden">
                <div className={`h-full rounded-full bg-gradient-to-r ${p.hue}`} style={{ width: `${p.progress}%` }}></div>
              </div>
            </div>
            <span className="text-[12.5px] font-bold text-ink-900/60 tabular shrink-0">{p.progress}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function IdeasGlance() {
  return (
    <div className="rise-in lift-card glass rounded-3xl shadow-soft p-6" style={{ animationDelay: "0.38s" }}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-[17px] text-ink-900">靈感速覽</h3>
        <button className="flex items-center gap-1 text-[12.5px] font-semibold text-brand-600 hover:text-brand-700 transition">
          進入 Ideas
          <Icon path={I.arrowRight} className="w-3.5 h-3.5" />
        </button>
      </div>
      <ul className="space-y-1.5">
        {IDEAS.map((idea) => (
          <li key={idea.id} className="flex items-center gap-3 p-2 -mx-2 rounded-2xl hover:bg-ink-900/[0.03] transition cursor-pointer group">
            <span className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 group-hover:bg-brand-100 transition">
              <Icon path={I.bulb} className="w-4 h-4" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[13.5px] font-semibold text-ink-900/85 truncate">{idea.title}</p>
              <p className="text-[11px] text-ink-900/40 font-medium">{idea.source}</p>
            </div>
            <span className="text-[10.5px] font-semibold text-brand-600 bg-brand-50 rounded-full px-2 py-1 shrink-0">
              {idea.tag}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ============================================================
   RIGHT RAIL — AI Assistant + Quick Capture
   ============================================================ */
function AIAssistantPanel() {
  const [prompt, setPrompt] = useState("");
  return (
    <div className="rise-in glass-dark rounded-3xl shadow-soft-lg p-5 text-white relative overflow-hidden" style={{ animationDelay: "0.1s" }}>
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-brand-500/25 blur-3xl pulse-glow"></div>

      <div className="relative flex items-center justify-between mb-4">
        <h3 className="font-display text-[16px] flex items-center gap-2">
          <Icon path={I.sparkles} className="w-4 h-4 text-brand-300" />
          AI 助理
        </h3>
        <button className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center hover:bg-white/[0.12] transition">
          <Icon path={I.chevronDown} className="w-3.5 h-3.5 text-white/50" />
        </button>
      </div>

      <p className="relative text-[13px] text-white/55 mb-4 font-medium">嗨！需要我幫你做什麼？</p>

      <div className="relative space-y-1.5 mb-4">
        {AI_QUICK_ACTIONS.map((a) => (
          <button
            key={a.id}
            className="ai-chip w-full flex items-center gap-2.5 text-left text-[12.5px] font-medium text-white/75 bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.05] hover:border-brand-400/30 rounded-xl px-3 py-2.5 transition"
          >
            <Icon path={a.icon} className="w-[15px] h-[15px] text-brand-300 shrink-0" />
            <span className="truncate">{a.label}</span>
          </button>
        ))}
      </div>

      <div className="relative flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] rounded-2xl px-3.5 py-2.5 focus-within:border-brand-400/40 transition">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          placeholder="向 AI 助理提問..."
          className="flex-1 bg-transparent text-[12.5px] text-white placeholder:text-white/30 focus:outline-none"
        />
        <button className="w-7 h-7 rounded-full bg-brand-500 hover:bg-brand-400 flex items-center justify-center transition shrink-0">
          <Icon path={I.send} className="w-3 h-3 text-white" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

function QuickCapturePanel() {
  return (
    <div className="rise-in glass rounded-3xl shadow-soft p-5" style={{ animationDelay: "0.16s" }}>
      <h3 className="font-display text-[16px] text-ink-900 mb-4">快速收集</h3>
      <div className="grid grid-cols-3 gap-2.5 mb-2">
        {QUICK_CAPTURE.map((c) => (
          <button
            key={c.id}
            className="flex flex-col items-center justify-center gap-1.5 py-3.5 rounded-2xl bg-ink-900/[0.03] hover:bg-brand-50 border border-transparent hover:border-brand-200 transition group"
          >
            <span className="w-8 h-8 rounded-xl bg-white shadow-soft-sm flex items-center justify-center text-ink-900/55 group-hover:text-brand-600 transition">
              <Icon path={c.icon} className="w-[15px] h-[15px]" />
            </span>
            <span className="text-[11px] font-semibold text-ink-900/55 group-hover:text-brand-700">{c.label}</span>
          </button>
        ))}
      </div>
      <p className="text-center text-[11px] text-ink-900/30 font-medium mt-2">拖曳即可加入</p>
    </div>
  );
}

function RecentCaptures() {
  return (
    <div className="rise-in glass rounded-3xl shadow-soft p-5" style={{ animationDelay: "0.22s" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-[16px] text-ink-900">最近收藏</h3>
        <button className="text-[11.5px] font-semibold text-brand-600 hover:text-brand-700 transition flex items-center gap-0.5">
          查看全部
          <Icon path={I.chevronRight} className="w-3 h-3" />
        </button>
      </div>
      <ul className="space-y-1">
        {CAPTURES.map((c) => (
          <li key={c.id} className="flex items-center gap-3 p-1.5 -mx-1.5 rounded-xl hover:bg-ink-900/[0.03] transition cursor-pointer">
            <span className={`w-9 h-9 rounded-xl shrink-0 bg-gradient-to-br ${c.hue} flex items-center justify-center text-white shadow-soft-sm`}>
              <Icon path={c.icon} className="w-4 h-4" strokeWidth={1.9} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[12.5px] font-semibold text-ink-900/85 truncate">{c.title}</p>
              <p className="text-[10.5px] text-ink-900/40 font-medium">{c.source}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ============================================================
   APP SHELL
   ============================================================ */
function App() {
  const [active, setActive] = useState("home");

  return (
    <div className="app-canvas min-h-screen flex">
      <Sidebar active={active} setActive={setActive} />

      <div className="flex-1 min-w-0 relative z-[1] flex">
        <main className="flex-1 min-w-0 px-6 lg:px-10 py-8 max-w-[1180px]">
          <Header />

          <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            <TodayTasksCard />
            <AISuggestionCard />
            <WeeklyStatsCard />
          </section>

          <section className="mb-5">
            <ContentCalendar />
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
            <ActiveProjects />
            <IdeasGlance />
          </section>

          <footer className="text-center pb-6">
            <p className="text-[11.5px] text-ink-900/30 font-medium">
              Creator OS · 讓創作更有效率，讓夢想更有系統 <span className="text-brand-400">✨</span>
            </p>
          </footer>
        </main>

        <aside className="hidden xl:flex flex-col w-[336px] shrink-0 gap-5 px-5 py-8 h-screen sticky top-0 overflow-y-auto thin-scroll">
          <AIAssistantPanel />
          <QuickCapturePanel />
          <RecentCaptures />
        </aside>
      </div>
    </div>
  );
}

export default App;
