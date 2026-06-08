// ── Exact icon URLs extracted from Figma node 59:7786 ──────────────────────
// Each tab has two variants: active (filled/colored) and inactive (outline/dim)
const ICONS = {
  options: {
    active:   'https://www.figma.com/api/mcp/asset/36abf2c8-3129-4034-9b2f-3742c5f11b20',
    inactive: 'https://www.figma.com/api/mcp/asset/e0192437-eb50-43a2-a372-8589153b36bd',
  },
  watchlist: {
    active:   'https://www.figma.com/api/mcp/asset/3b42e027-fd48-4bcd-89f3-e5124490d3f3',
    inactive: 'https://www.figma.com/api/mcp/asset/4f041097-b2f5-4954-87b5-0616133a7dea',
  },
  guru: 'https://www.figma.com/api/mcp/asset/cd860748-9b17-4a88-aa35-86f40dce313d',
  portfolio: {
    active:   'https://www.figma.com/api/mcp/asset/e8bfdd96-3677-42bb-bacf-c83ce4ed5d05',
    inactive: 'https://www.figma.com/api/mcp/asset/ec1a6e7b-0e5b-43e4-bbdb-b4e95381c9af',
  },
  profile: {
    active:   'https://www.figma.com/api/mcp/asset/36446bc6-7af1-4016-a3fd-64708ccd3935',
    inactive: 'https://www.figma.com/api/mcp/asset/1ea43159-94c0-4a03-9776-6e6ca06d0881',
  },
}

// Guru circle SVG background — radial gradient from Figma
const GURU_CIRCLE_BG = `
  url("data:image/svg+xml;utf8,<svg viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.2'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-0.026978 4.6508 -4.6508 -0.026978 30 30)'><stop stop-color='rgba(27,63,132,1)' offset='0'/><stop stop-color='rgba(20,108,142,1)' offset='0.25'/><stop stop-color='rgba(14,153,152,1)' offset='0.5'/><stop stop-color='rgba(7,198,162,1)' offset='0.75'/><stop stop-color='rgba(0,243,172,1)' offset='1'/></radialGradient></defs></svg>"),
  linear-gradient(90deg, #070708 0%, #070708 100%)
`.trim()

export default function BottomNav({ activeTab, onNavigate, onGuruOpen }) {
  const tabs = [
    { id: 'options',   label: 'Options' },
    { id: 'watchlist', label: 'Watchlist' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'profile',   label: 'Profile' },
  ]

  return (
    <nav className="tab-bar">
      <div className="tab-bar-inner">

        {/* Options */}
        <TabButton
          isActive={activeTab === 'options'}
          label="Options"
          icon={activeTab === 'options' ? ICONS.options.active : ICONS.options.inactive}
          onClick={() => onNavigate('options')}
        />

        {/* Watchlist */}
        <TabButton
          isActive={activeTab === 'watchlist'}
          label="Watchlist"
          icon={activeTab === 'watchlist' ? ICONS.watchlist.active : ICONS.watchlist.inactive}
          onClick={() => onNavigate('watchlist')}
        />

        {/* Your Guru — center elevated button, opens drawer */}
        <button className="tab-guru-btn" onClick={onGuruOpen} aria-label="Your Guru">
          <div
            className="tab-guru-circle"
            style={{ backgroundImage: GURU_CIRCLE_BG }}
          >
            <img
              src={ICONS.guru}
              alt=""
              width={28}
              height={28}
              style={{ display: 'block', objectFit: 'contain' }}
            />
          </div>
          <span className="tab-guru-label">Your Guru</span>
        </button>

        {/* Portfolio */}
        <TabButton
          isActive={activeTab === 'portfolio'}
          label="Portfolio"
          icon={activeTab === 'portfolio' ? ICONS.portfolio.active : ICONS.portfolio.inactive}
          onClick={() => onNavigate('portfolio')}
        />

        {/* Profile */}
        <TabButton
          isActive={activeTab === 'profile'}
          label="Profile"
          icon={activeTab === 'profile' ? ICONS.profile.active : ICONS.profile.inactive}
          onClick={() => onNavigate('profile')}
        />

      </div>
    </nav>
  )
}

function TabButton({ isActive, label, icon, onClick }) {
  return (
    <button
      className="tab-btn"
      style={{ opacity: isActive ? 1 : 0.6 }}
      onClick={onClick}
      aria-label={label}
    >
      <img
        src={icon}
        alt=""
        width={24}
        height={24}
        style={{ display: 'block', objectFit: 'contain', flexShrink: 0 }}
      />
      <span
        className="tab-label"
        style={{ color: isActive ? '#00f3ac' : '#81909f' }}
      >
        {label}
      </span>
    </button>
  )
}
