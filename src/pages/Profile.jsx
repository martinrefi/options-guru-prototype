const imgBell     = 'https://www.figma.com/api/mcp/asset/c4353799-17da-4cc4-9cdb-744e95ac09d1'
const imgRefer    = 'https://www.figma.com/api/mcp/asset/71665630-b200-4973-b37f-85429ed41925'
const imgChevron  = 'https://www.figma.com/api/mcp/asset/b20d61f8-36bd-4aa9-8bf7-7bd32757273e'
const imgNotif    = 'https://www.figma.com/api/mcp/asset/1cb645f5-8eb8-427b-ba3c-42e39f643776'
const imgPrivacy  = 'https://www.figma.com/api/mcp/asset/fd8ab4df-506e-4ef0-8e16-d306837354bc'
const imgHelp     = 'https://www.figma.com/api/mcp/asset/91898516-044c-4bd5-b911-a4ad12f344ad'
const imgLogout   = 'https://www.figma.com/api/mcp/asset/d1fc9144-591d-4a55-8f4a-cb842d901e17'
const imgChevronRed = 'https://www.figma.com/api/mcp/asset/a7293ab5-7753-4e72-86d2-43b644603b12'

export default function Profile() {
  return (
    <div>
      {/* Header */}
      <header className="screen-header">
        <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Profile</span>
        <div className="header-actions">
          <button className="icon-btn" style={{ position: 'relative' }}>
            <img src={imgBell} alt="bell" style={{ width: 20, height: 20 }} />
            <span className="notif-dot" />
          </button>
        </div>
      </header>

      {/* User Card */}
      <div style={{ padding: '0 16px' }}>
        <div className="profile-user-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
            <div className="profile-avatar">
              <span>JD</span>
            </div>
            <div className="profile-user-info">
              <span className="profile-name">John Doe</span>
              <span className="profile-email">john.doe@email.com</span>
            </div>
          </div>
          <span className="premium-badge">PREMIUM</span>
        </div>
      </div>

      {/* Refer and Earn */}
      <div style={{ padding: '16px 16px 0' }}>
        <div className="refer-card">
          <div className="refer-header">
            <div className="refer-icon">
              <img src={imgRefer} alt="refer" />
            </div>
            <div>
              <div className="refer-title">Refer and earn</div>
              <div className="refer-sub">Each friend who joins earns you free Premium.</div>
            </div>
          </div>

          {/* Stats */}
          <div className="refer-stats">
            {[
              { label: 'Referred', value: '4' },
              { label: 'Free months', value: '2' },
              { label: 'Leaderboard', value: '#37' },
            ].map((s) => (
              <div key={s.label} className="refer-stat">
                <span className="refer-stat-label">{s.label}</span>
                <span className="refer-stat-value">{s.value}</span>
              </div>
            ))}
          </div>

          {/* Share button */}
          <button className="refer-btn">Share invite link</button>
        </div>
      </div>

      {/* Account Settings */}
      <div style={{ padding: '24px 16px 0' }}>
        <div className="settings-section">
          <div className="settings-section-label">ACCOUNT</div>
          <div className="settings-group">
            <div className="settings-item">
              <div className="settings-item-left">
                <img src={imgNotif} alt="" />
                <span className="settings-item-title">Notifications</span>
              </div>
              <img src={imgChevron} alt=">" className="settings-chevron" />
            </div>
            <div className="settings-item">
              <div className="settings-item-left">
                <img src={imgPrivacy} alt="" />
                <span className="settings-item-title">Privacy &amp; Security</span>
              </div>
              <img src={imgChevron} alt=">" className="settings-chevron" />
            </div>
          </div>
        </div>
      </div>

      {/* Support */}
      <div style={{ padding: '24px 16px 0' }}>
        <div className="settings-section">
          <div className="settings-section-label">SUPPORT</div>
          <div className="settings-group">
            <div className="settings-item">
              <div className="settings-item-left">
                <img src={imgHelp} alt="" />
                <span className="settings-item-title">Help Center</span>
              </div>
              <img src={imgChevron} alt=">" className="settings-chevron" />
            </div>
            <div className="settings-item">
              <div className="settings-item-left">
                <img src={imgHelp} alt="" />
                <span className="settings-item-title">Contact Support</span>
              </div>
              <img src={imgChevron} alt=">" className="settings-chevron" />
            </div>
          </div>
        </div>
      </div>

      {/* Log Out */}
      <div style={{ padding: '24px 16px 16px' }}>
        <div className="settings-group">
          <div className="settings-item" style={{ borderBottom: 'none' }}>
            <div className="settings-item-left">
              <img src={imgLogout} alt="" />
              <span className="settings-item-title-danger">Log Out</span>
            </div>
            <img src={imgChevronRed} alt=">" className="settings-chevron" />
          </div>
        </div>
      </div>
    </div>
  )
}
