const imgBell   = 'https://www.figma.com/api/mcp/asset/09aa339c-1861-4824-ad66-55caca007bd7'
const imgPlus   = 'https://www.figma.com/api/mcp/asset/69d19c0a-b9e3-4492-a841-08d2cb686b8a'
const imgLink   = 'https://www.figma.com/api/mcp/asset/f7e70f21-0a6b-4e81-be0d-0d262d319132'
const imgPower  = 'https://www.figma.com/api/mcp/asset/39fbab22-687d-461e-a5df-17d176c1a6d4'

const alerts = [
  {
    ticker: 'NVDA',
    type: 'RISK',
    typeClass: 'alert-type-risk',
    cardClass: 'alert-card-risk',
    text: 'Represents 35% of your portfolio, making performance increasingly dependent on a single stock.',
  },
  {
    ticker: 'META',
    type: 'NEWS',
    typeClass: 'alert-type-news',
    cardClass: 'alert-card-news',
    text: 'The EU regulatory decision could affect advertising revenue, creating uncertainty.',
  },
  {
    ticker: 'TSLA',
    type: 'EARNINGS',
    typeClass: 'alert-type-earnings',
    cardClass: 'alert-card-earnings',
    text: 'Your largest position reports earnings before market open. Increased volatility is expected.',
  },
]

const accounts = [
  { name: 'Robinhood',       masked: '****8123', balance: '$32,568.00', change: '+2.84',  positive: true,  logoColor: '#54d7ff' },
  { name: 'Coinbase Wallet', masked: '****4567', balance: '$8,934.83',  change: '-0.87%', positive: false, logoColor: '#54d7ff' },
]

export default function Portfolio() {
  return (
    <div>
      {/* Header */}
      <header className="screen-header">
        <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Portfolio</span>
        <div className="header-actions">
          <button className="icon-btn">
            <img src={imgPlus} alt="add" style={{ width: 36, height: 36, borderRadius: 12 }} />
          </button>
          <button className="icon-btn" style={{ position: 'relative' }}>
            <img src={imgBell} alt="bell" style={{ width: 20, height: 20 }} />
            <span className="notif-dot" />
          </button>
        </div>
      </header>

      {/* Aggregated Value Card */}
      <div style={{ padding: '0 16px' }}>
        <div className="portfolio-value-card">
          <div className="portfolio-value-main">
            <span className="portfolio-label">Aggregated Value</span>
            <span className="portfolio-total">$41,502.83</span>
          </div>
          <div className="portfolio-pl">
            <span className="portfolio-pl-label">Today P/L</span>
            <span className="portfolio-pl-value">+$628.4</span>
          </div>
        </div>
      </div>

      {/* Holdings Alerts */}
      <div style={{ padding: '16px 16px 0' }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Holdings Alerts</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
          {alerts.map((a) => (
            <div key={a.ticker} className={`alert-card ${a.cardClass}`}>
              <div className="alert-ticker-row">
                <span className="alert-ticker">{a.ticker}</span>
                <span className={`alert-type-badge ${a.typeClass}`}>{a.type}</span>
              </div>
              <p className="alert-text">{a.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Connected Accounts */}
      <div style={{ padding: '16px 16px 0' }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Connected Accounts</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
          {accounts.map((a) => (
            <div key={a.name} className="account-item">
              <div className="account-left">
                <div className="account-logo" style={{ background: a.logoColor }} />
                <div className="account-info">
                  <div className="account-name-row">
                    <span className="account-name">{a.name}</span>
                    <img src={imgLink} alt="link" style={{ width: 14, height: 14, opacity: 0.6 }} />
                  </div>
                  <span className="account-masked">{a.masked}</span>
                </div>
              </div>
              <div className="account-right">
                <span className="account-balance">{a.balance}</span>
                <span className={a.positive ? 'account-change-positive' : 'account-change-negative'}>
                  {a.change}
                </span>
              </div>
            </div>
          ))}

          {/* Connect new */}
          <button className="account-connect">
            <div className="connect-icon-circle">
              <img src={imgPower} alt="connect" />
            </div>
            <div className="connect-text">
              <span className="connect-title">Connect a brokerage or wallet</span>
              <span className="connect-sub">Any US Brokerage or Coinbase</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
