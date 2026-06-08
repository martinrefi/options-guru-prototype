import { useState } from 'react'

const imgLogo        = 'https://www.figma.com/api/mcp/asset/3857d887-6abb-4940-b5f2-5031e9e80c3e'
const imgLogoBody    = 'https://www.figma.com/api/mcp/asset/16cc0e42-353b-420c-8581-9da2a7b6b630'
const imgNVDA        = 'https://www.figma.com/api/mcp/asset/4267e27c-4181-4d21-bef6-f911ed2ae748'
const imgSearch      = 'https://www.figma.com/api/mcp/asset/3d9468f8-e309-4973-9907-ab2d21490f19'
const imgBell        = 'https://www.figma.com/api/mcp/asset/b1bbc76e-35bd-41d2-bfe2-2b0846ecb163'
const imgStar        = 'https://www.figma.com/api/mcp/asset/65b4e5e4-95f3-436c-9159-55adaeec4eb4'
const imgWhyIcon     = 'https://www.figma.com/api/mcp/asset/ddfa7a22-0ec5-4a50-a831-2192ef1e373c'

const ALL_IDEAS = [
  { ticker: 'TSLA',  sentiment: 'Bullish', details: '$250 Call · Expires Nov 15',   risk: 2, riskColor: 'yellow', premium: '$4.2M', highRisk: false, shortTerm: true  },
  { ticker: 'AAPL',  sentiment: 'Bearish', details: '$130 Put · Expires Dec 20',    risk: 2, riskColor: 'yellow', premium: '$3.5M', highRisk: false, shortTerm: false },
  { ticker: 'TSLA',  sentiment: 'Bullish', details: '$260 Call · Expires Nov 22',   risk: 3, riskColor: 'red',    premium: '$4.2M', highRisk: true,  shortTerm: true  },
  { ticker: 'GOOGL', sentiment: 'Bullish', details: '$1200 Call · Expires Feb 5',   risk: 1, riskColor: 'green',  premium: '$5.1M', highRisk: false, shortTerm: false },
  { ticker: 'AAPL',  sentiment: 'Bearish', details: '$130 Put · Expires Dec 20',    risk: 2, riskColor: 'yellow', premium: '$3.5M', highRisk: false, shortTerm: false },
  { ticker: 'SPY',   sentiment: 'Bearish', details: '$580 Put · Expires Nov 8',     risk: 3, riskColor: 'red',    premium: '$8.1M', highRisk: true,  shortTerm: true  },
  { ticker: 'NVDA',  sentiment: 'Bullish', details: '$145 Call · Expires Jan 17',   risk: 1, riskColor: 'green',  premium: '$6.3M', highRisk: false, shortTerm: false },
  { ticker: 'AMD',   sentiment: 'Bearish', details: '$110 Put · Expires Nov 29',    risk: 3, riskColor: 'red',    premium: '$2.8M', highRisk: true,  shortTerm: true  },
]

const FILTERS = ['All', 'Bullish', 'Bearish', 'High Risk', 'Short-term']

function filterIdeas(filter) {
  switch (filter) {
    case 'Bullish':    return ALL_IDEAS.filter(i => i.sentiment === 'Bullish')
    case 'Bearish':    return ALL_IDEAS.filter(i => i.sentiment === 'Bearish')
    case 'High Risk':  return ALL_IDEAS.filter(i => i.highRisk)
    case 'Short-term': return ALL_IDEAS.filter(i => i.shortTerm)
    default:           return ALL_IDEAS
  }
}

function RiskDots({ count, color }) {
  const total = 3
  const colorMap = { yellow: '#fbbf24', red: '#ff4667', green: '#00dc51' }
  return (
    <div className="risk-dots">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="risk-dot"
          style={{ background: i < count ? colorMap[color] : '#272a36' }}
        />
      ))}
    </div>
  )
}

export default function Options() {
  const [activeFilter, setActiveFilter] = useState('All')
  const ideas = filterIdeas(activeFilter)

  return (
    <div>
      {/* Header */}
      <header className="screen-header">
        <div className="header-logo">
          <div className="header-logo-avatar">
            <img src={imgLogoBody} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <span className="header-title">OPTIONS GURU</span>
        </div>
        <div className="header-actions">
          <button className="icon-btn">
            <img src={imgSearch} alt="search" />
          </button>
          <button className="icon-btn" style={{ position: 'relative' }}>
            <img src={imgBell} alt="bell" />
            <span className="notif-dot" />
          </button>
        </div>
      </header>

      {/* Top Pick Today */}
      <div style={{ padding: '8px 16px 0' }}>
        <div className="section-label">
          <img src={imgStar} alt="" />
          <span>TOP PICK TODAY</span>
        </div>
        <div style={{ marginTop: 4 }}>
          <div className="top-pick-card">
            {/* Stock row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div className="stock-row">
                <img className="stock-logo" src={imgNVDA} alt="NVDA" />
                <div className="stock-info">
                  <div className="stock-name-row">
                    <span className="stock-ticker">NVDA</span>
                    <span className="badge badge-bullish">Bullish</span>
                  </div>
                  <span className="stock-details">$145 Call · Expires Sep 18</span>
                </div>
              </div>
              <div className="investment-data">
                <span className="investment-amount">$4.2M</span>
                <span className="investment-label">Premium</span>
              </div>
            </div>

            {/* Metrics */}
            <div className="metrics-row" style={{ marginTop: 16 }}>
              <div className="metric-box">
                <span className="metric-label">Risk</span>
                <div className="risk-dots">
                  {[0,1,2,3,4].map(i => (
                    <div key={i} className="risk-dot" style={{ background: i < 3 ? '#fbbf24' : '#272a36' }} />
                  ))}
                </div>
                <span className="metric-value">Moderate</span>
              </div>
              <div className="metric-box">
                <span className="metric-label">Conviction</span>
                <span className="conviction-value">72%</span>
              </div>
            </div>

            {/* Why This Trade */}
            <div className="why-trade" style={{ marginTop: 16 }}>
              <div className="why-trade-header">
                <img src={imgWhyIcon} alt="" />
                <span className="why-trade-title">Why This Trade?</span>
              </div>
              <p className="why-trade-text">
                Multiple large call orders were placed near the ask ahead of next week's earnings. Volume is significantly above average, suggesting aggressive bullish positioning.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* All Options Ideas */}
      <div style={{ padding: '16px 16px 0' }}>
        <span className="section-title-text">All Options Ideas</span>

        {/* Filters */}
        <div className="filter-row" style={{ marginTop: 12 }}>
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-chip ${f === activeFilter ? 'filter-chip-active' : 'filter-chip-inactive'}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Ideas list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
          {ideas.map((idea, i) => (
            <div key={i} className="idea-item">
              <div className="idea-stock-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="stock-ticker-sm">{idea.ticker}</span>
                  <span className={`badge ${idea.sentiment === 'Bullish' ? 'badge-bullish' : 'badge-bearish'}`} style={{ fontSize: 11, padding: '0 6px' }}>
                    {idea.sentiment}
                  </span>
                </div>
                <span className="stock-details">{idea.details}</span>
              </div>
              <div className="idea-risk-col">
                <RiskDots count={idea.risk} color={idea.riskColor} />
                <span className="idea-risk-label">Risk</span>
              </div>
              <div className="idea-investment-col">
                <span className="investment-amount-sm">{idea.premium}</span>
                <span className="investment-label">Premium</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
