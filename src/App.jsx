import { useState, useRef } from 'react'
import BottomNav from './components/BottomNav'
import GuruDrawer from './components/GuruDrawer'
import Options from './pages/Options'
import Watchlist from './pages/Watchlist'
import Portfolio from './pages/Portfolio'
import Profile from './pages/Profile'

const TABS = ['options', 'watchlist', 'portfolio', 'profile']
const TAB_COMPONENTS = {
  options:   Options,
  watchlist: Watchlist,
  portfolio: Portfolio,
  profile:   Profile,
}

export default function App() {
  const [activeTab, setActiveTab] = useState('options')
  const [prevTab, setPrevTab]     = useState(null)
  const [animating, setAnimating] = useState(false)
  const [guruOpen, setGuruOpen]   = useState(false)
  const timeoutRef = useRef(null)

  function navigate(tab) {
    if (tab === activeTab || animating) return
    setPrevTab(activeTab)
    setActiveTab(tab)
    setAnimating(true)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setPrevTab(null)
      setAnimating(false)
    }, 200)
  }

  const currentIndex = TABS.indexOf(activeTab)
  const prevIndex    = prevTab ? TABS.indexOf(prevTab) : -1
  const direction    = currentIndex > prevIndex ? 'forward' : 'backward'

  const ActivePage = TAB_COMPONENTS[activeTab]
  const PrevPage   = prevTab ? TAB_COMPONENTS[prevTab] : null

  return (
    <div className="app-shell">
      <div className="page-container">
        {PrevPage && (
          <div
            key={`exit-${prevTab}`}
            className={`page ${direction === 'forward' ? 'page-exit-to-left' : 'page-exit-to-right'}`}
          >
            <PrevPage />
          </div>
        )}
        <div
          key={`enter-${activeTab}`}
          className={`page ${animating ? (direction === 'forward' ? 'page-enter-from-right' : 'page-enter-from-left') : ''}`}
        >
          <ActivePage />
        </div>
      </div>

      <BottomNav
        activeTab={activeTab}
        onNavigate={navigate}
        onGuruOpen={() => setGuruOpen(true)}
      />

      <GuruDrawer
        open={guruOpen}
        onClose={() => setGuruOpen(false)}
      />
    </div>
  )
}
