const imgBell      = 'https://www.figma.com/api/mcp/asset/98ee310f-1be5-4735-aad5-37d8ce87f425'
const imgSearch    = 'https://www.figma.com/api/mcp/asset/7dc5319e-ad90-47b5-8eb7-82d3d916db77'
const imgAdd       = 'https://www.figma.com/api/mcp/asset/58e2ccb9-1dc5-41d8-90fd-24569d0fcd9d'
const imgEdit      = 'https://www.figma.com/api/mcp/asset/a827494b-b5d5-4a54-9397-fafac5133748'
const imgDropdown  = 'https://www.figma.com/api/mcp/asset/aa786015-b478-41d1-a0bc-6bc9528b80ea'
const imgAlertOn   = 'https://www.figma.com/api/mcp/asset/b6ae7c2a-f173-4c24-8e67-b02dbef86346'
const imgAlertOff  = 'https://www.figma.com/api/mcp/asset/a531eeb3-252d-4236-8b63-c278c327eda9'
const imgSparkUp   = 'https://www.figma.com/api/mcp/asset/a04061b1-6db7-43da-9284-cb1215dbba20'
const imgSparkDown = 'https://www.figma.com/api/mcp/asset/4baaea5a-3a63-4629-847c-f4425da57733'
const imgArrowUp   = 'https://www.figma.com/api/mcp/asset/bbecd8ce-c0e2-496c-8017-9e85dd87b1c4'
const imgArrowDown = 'https://www.figma.com/api/mcp/asset/71aa034c-539c-434a-b122-dfc8d3dd325c'
const imgNvdaLogo  = 'https://www.figma.com/api/mcp/asset/ae469d52-9abb-494e-9bdc-748ec6851a45'

const stocks = [
  {
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    logo: imgNvdaLogo,
    logoColor: null,
    spark: imgSparkUp,
    price: '$145.28',
    change: '+2.84',
    positive: true,
    alertOn: true,
  },
  {
    ticker: 'SPY',
    name: 'S&P 500 ETF',
    logo: null,
    logoColor: '#54d7ff',
    spark: imgSparkUp,
    price: '$145.28',
    change: '+2.84',
    positive: true,
    alertOn: true,
  },
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    logo: null,
    logoColor: '#c1ffb8',
    spark: imgSparkDown,
    price: '$145.28',
    change: '-0.37',
    positive: false,
    alertOn: false,
  },
]

export default function Watchlist() {
  return (
    <div>
      {/* Header */}
      <header className="screen-header">
        <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>My Watchlist</span>
        <div className="header-actions">
          <button className="icon-btn" style={{ position: 'relative' }}>
            <img src={imgBell} alt="bell" style={{ width: 20, height: 20 }} />
            <span className="notif-dot" />
          </button>
        </div>
      </header>

      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Search bar */}
        <div className="search-bar">
          <div className="search-bar-left">
            <img src={imgSearch} alt="search" />
            <span className="search-placeholder">Add a ticker...</span>
          </div>
          <button className="search-add-btn">
            <img src={imgAdd} alt="add" style={{ width: 24, height: 24 }} />
          </button>
        </div>

        {/* Controls row */}
        <div className="watchlist-controls">
          <div className="watchlist-edit">
            <img src={imgEdit} alt="edit" />
            <span>Edit Watchlist</span>
          </div>
          <div className="watchlist-sort">
            <span>% Change</span>
            <img src={imgDropdown} alt="sort" />
          </div>
        </div>

        {/* Stock list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {stocks.map((s) => (
            <div key={s.ticker + s.name} className="watchlist-item">
              {/* Logo + info */}
              <div className="wl-stock-left">
                <div className="wl-logo" style={{ background: s.logoColor || 'transparent' }}>
                  {s.logo && <img src={s.logo} alt={s.ticker} />}
                </div>
                <div className="wl-info">
                  <div className="wl-name-row">
                    <span className="wl-ticker">{s.ticker}</span>
                    <button
                      className="alert-btn"
                      style={{ background: s.alertOn ? 'rgba(0,243,172,0.2)' : 'rgba(10,14,26,0.6)' }}
                    >
                      <img src={s.alertOn ? imgAlertOn : imgAlertOff} alt="alert" />
                    </button>
                  </div>
                  <span className="wl-company">{s.name}</span>
                </div>
              </div>

              {/* Sparkline */}
              <div className="sparkline">
                <img src={s.spark} alt="chart" />
              </div>

              {/* Price + change */}
              <div className="wl-price-col">
                <span className="wl-price">{s.price}</span>
                <div className={`change-badge ${s.positive ? 'change-badge-positive' : 'change-badge-negative'}`}>
                  <img
                    src={s.positive ? imgArrowUp : imgArrowDown}
                    alt={s.positive ? 'up' : 'down'}
                    style={{ transform: s.positive ? 'none' : 'scaleY(-1)' }}
                  />
                  <span className={s.positive ? 'change-text-positive' : 'change-text-negative'}>
                    {s.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
