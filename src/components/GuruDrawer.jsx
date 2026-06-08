import { useState, useRef, useEffect } from 'react'

// ─── Asset URLs ───────────────────────────────────────────────────────────────
const imgRobotBody = 'https://www.figma.com/api/mcp/asset/a1c0537d-94d4-4759-b59f-cc9024437f81'
const imgRobotBg   = 'https://www.figma.com/api/mcp/asset/eb6eb262-d21c-4ca4-9a07-bb84792c1812'
const imgSparkle   = 'https://www.figma.com/api/mcp/asset/2b614b29-a56f-4ab3-bbba-831683ab0a7c'
const imgHistory   = 'https://www.figma.com/api/mcp/asset/da806c0e-6d27-475e-ad69-083cb2eca5d2'
const imgNewChat   = 'https://www.figma.com/api/mcp/asset/619624b5-db8a-44e3-b819-79c3e3688d80'
const imgMic       = 'https://www.figma.com/api/mcp/asset/d6e7b9ca-3ebb-4187-8a19-8fc6e381fe78'
const imgSend      = 'https://www.figma.com/api/mcp/asset/6e6ce822-468a-43c0-bcad-650171353f12'
const imgAttach    = 'https://www.figma.com/api/mcp/asset/349404d0-b05c-4e81-a389-e322f23b2c02'
// Chat state assets (from Figma 60:8263 / 60:8527)
const imgGuruIcon  = 'https://www.figma.com/api/mcp/asset/8a2c686d-4217-43be-9898-15c93b088a4d'
const imgNvdaLogo  = 'https://www.figma.com/api/mcp/asset/87c70390-a116-4805-9bc2-95f6626ab2b9'
const imgUpload    = 'https://www.figma.com/api/mcp/asset/ed6a010c-8282-4869-a4c8-3a58e2362e1b'
const imgCopy      = 'https://www.figma.com/api/mcp/asset/630b5f8b-f0b3-4369-b5ee-34fe2775fe46'
const imgThumbUp   = 'https://www.figma.com/api/mcp/asset/f9b26c23-4a6a-46b1-bf20-bc5332b8f11f'
const imgThumbDown = 'https://www.figma.com/api/mcp/asset/7035bdef-dbff-45b5-a450-1a512d49ca84'
const imgReplay    = 'https://www.figma.com/api/mcp/asset/4728d175-a326-4d8b-8cf6-57f75beae27d'
const imgSendWhite = 'https://www.figma.com/api/mcp/asset/4c55c088-320c-49ca-a225-2c70e4643fc5'

// ─── Content ──────────────────────────────────────────────────────────────────
const SUGGESTIONS = [
  'NVDA $145 CALL Dec 20 - should I take it?',
  "What's my max risk on TSLA $250 calls?",
  'Position sizing for SPY call spread?',
  'Covered call or protective put on AAPL?',
]

// AI response split into two parts (card appears between them)
const RESPONSE_PART1 =
  "I've analyzed this trade opportunity for you. Here's my complete assessment:\n\n" +
  "• Strong bullish setup with institutional support. Technical breakout confirmed above $142 resistance. Consider entering with defined risk."

const RESPONSE_PART2 =
  "Alternatives\n\n" +
  "• Bull call spread: Buy $145/$150 to reduce cost\n" +
  "• Wait for pullback to $143 for better entry"

const TOTAL_STREAM_LEN = RESPONSE_PART1.length + RESPONSE_PART2.length

// ─── Drag thresholds ──────────────────────────────────────────────────────────
const SNAP_CLOSE_THRESHOLD    = 120   // px dragged down to close
const SNAP_VELOCITY_THRESHOLD = 0.5   // px/ms

export default function GuruDrawer({ open, onClose }) {
  const [input, setInput]         = useState('')
  const [dragY, setDragY]         = useState(0)
  // chatPhase: 'empty' | 'loading' | 'streaming' | 'done'
  const [chatPhase, setChatPhase] = useState('empty')
  const [prompt, setPrompt]       = useState('')
  const [streamedCount, setStreamedCount] = useState(0)

  const dragging   = useRef(false)
  const startY     = useRef(0)
  const startTime  = useRef(0)
  const sheetRef   = useRef(null)
  const contentRef = useRef(null)
  const loadTimer  = useRef(null)

  // Reset drag when drawer opens
  useEffect(() => {
    if (open) setDragY(0)
  }, [open])

  // Reset chat after drawer closes (delay so it happens off-screen)
  useEffect(() => {
    if (!open) {
      const t = setTimeout(resetChat, 350)
      return () => clearTimeout(t)
    }
  }, [open])

  // Drive streaming: each tick reveals one more character
  useEffect(() => {
    if (chatPhase !== 'streaming') return
    if (streamedCount >= TOTAL_STREAM_LEN) {
      setChatPhase('done')
      return
    }
    const t = setTimeout(() => setStreamedCount(c => c + 1), 16)
    return () => clearTimeout(t)
  }, [chatPhase, streamedCount])

  // Auto-scroll content to bottom while streaming
  useEffect(() => {
    if (chatPhase === 'streaming' || chatPhase === 'done') {
      if (contentRef.current) {
        contentRef.current.scrollTop = contentRef.current.scrollHeight
      }
    }
  }, [streamedCount, chatPhase])

  // ── Actions ────────────────────────────────────────────────────────────────
  function handleSuggestionClick(s) {
    setPrompt(s)
    setInput('')
    setStreamedCount(0)
    setChatPhase('loading')
    clearTimeout(loadTimer.current)
    loadTimer.current = setTimeout(() => setChatPhase('streaming'), 1800)
  }

  function handleStop() {
    clearTimeout(loadTimer.current)
    setChatPhase('done')
  }

  function resetChat() {
    clearTimeout(loadTimer.current)
    setChatPhase('empty')
    setPrompt('')
    setStreamedCount(0)
    setInput('')
  }

  // ── Drag handlers ──────────────────────────────────────────────────────────
  function handlePointerDown(e) {
    dragging.current = true
    startY.current   = e.clientY
    startTime.current = Date.now()
    setDragY(0)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function handlePointerMove(e) {
    if (!dragging.current) return
    setDragY(Math.max(0, e.clientY - startY.current))
  }

  function handlePointerUp(e) {
    if (!dragging.current) return
    dragging.current = false
    const delta    = e.clientY - startY.current
    const elapsed  = Date.now() - startTime.current
    const velocity = delta / elapsed
    if (delta > SNAP_CLOSE_THRESHOLD || velocity > SNAP_VELOCITY_THRESHOLD) {
      onClose()
    } else {
      setDragY(0)
    }
  }

  // ── Derived display values ─────────────────────────────────────────────────
  const translateY = open ? dragY : '100%'
  const transition = dragging.current
    ? 'none'
    : 'transform 280ms cubic-bezier(0.32, 0.72, 0, 1)'

  const isActive    = chatPhase !== 'empty'
  const isGenerating = chatPhase === 'loading' || chatPhase === 'streaming'

  // Streamed text slices
  const visiblePart1 = (chatPhase === 'streaming' || chatPhase === 'done')
    ? RESPONSE_PART1.substring(0, Math.min(streamedCount, RESPONSE_PART1.length))
    : ''
  const part1Done    = streamedCount >= RESPONSE_PART1.length
  const visiblePart2 = part1Done && (chatPhase === 'streaming' || chatPhase === 'done')
    ? RESPONSE_PART2.substring(0, streamedCount - RESPONSE_PART1.length)
    : ''
  const showCard    = part1Done && isActive && chatPhase !== 'loading'
  const showActions = chatPhase === 'done'

  return (
    <>
      {/* Backdrop */}
      <div
        className="drawer-backdrop"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 280ms ease',
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className="drawer-sheet"
        style={{
          transform: `translateY(${typeof translateY === 'number' ? translateY + 'px' : translateY})`,
          transition,
          pointerEvents: open ? 'auto' : 'none',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Your Guru"
      >
        {/* Drag handle */}
        <div
          className="drawer-handle-area"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div className="drawer-handle" />
        </div>

        {/* Header */}
        <div className="drawer-header">
          <button className="drawer-icon-btn" onClick={onClose} aria-label="History">
            <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.7 }}>
              <circle cx="10" cy="10" r="8.25" stroke="#81909f" strokeWidth="1.5"/>
              <path d="M10 6v4.5l2.5 2.5" stroke="#81909f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="guru-title">OPTIONS GURU</span>
            <img src={imgSparkle} alt="" width={20} height={20} />
          </div>
          <button className="drawer-icon-btn" onClick={resetChat} aria-label="New chat">
            <img src={imgNewChat} alt="" width={20} height={20} style={{ objectFit: 'contain', opacity: isActive ? 1 : 0.7 }} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="drawer-content" ref={contentRef}>

          {/* ── EMPTY STATE ── */}
          {chatPhase === 'empty' && (
            <div className="drawer-hero">
              <div style={{ position: 'relative', width: 182, height: 170, flexShrink: 0 }}>
                <img
                  src={imgRobotBody}
                  alt="Options Guru"
                  style={{ position: 'absolute', left: 54, top: 0, width: 72, height: 72, objectFit: 'contain' }}
                />
                <img
                  src={imgRobotBg}
                  alt=""
                  style={{ position: 'absolute', left: 0, top: 29, width: 182, height: 141, objectFit: 'cover', borderRadius: 8, opacity: 0.55 }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, marginBottom: 8 }}>
                <span className="guru-title" style={{ fontSize: 24 }}>OPTIONS GURU</span>
                <img src={imgSparkle} alt="" width={20} height={20} />
              </div>

              <p style={{ fontSize: 14, color: '#81909f', textAlign: 'center', lineHeight: '20px', maxWidth: 316, marginBottom: 32 }}>
                Your assistant for validating trades, assessing risk, and finding the best options strategies.
              </p>

              <div style={{ width: '100%' }}>
                <p style={{ fontSize: 12, color: '#81909f', marginBottom: 12 }}>Try asking:</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      className="suggestion-btn"
                      onClick={() => handleSuggestionClick(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── CHAT STATE (loading / streaming / done) ── */}
          {chatPhase !== 'empty' && (
            <div className="chat-messages">

              {/* User bubble */}
              <div className="chat-user-row">
                <div className="chat-user-bubble">{prompt}</div>
              </div>

              {/* AI response */}
              <div className="chat-ai-content">
                <img src={imgGuruIcon} alt="" className="guru-chat-icon" />

                {/* Loading — Thinking... */}
                {chatPhase === 'loading' && (
                  <p className="thinking-text">Thinking...</p>
                )}

                {/* Streaming / Done — streamed text + card */}
                {chatPhase !== 'loading' && (
                  <>
                    {visiblePart1 && (
                      <div className="chat-ai-text">
                        {renderLines(visiblePart1)}
                      </div>
                    )}

                    {showCard && <TradeCard />}

                    {visiblePart2 && (
                      <div className="chat-ai-text">
                        {renderLines(visiblePart2)}
                      </div>
                    )}

                    {showActions && (
                      <div className="chat-actions">
                        <img src={imgUpload}    alt="Share"   width={20} height={20} />
                        <img src={imgCopy}      alt="Copy"    width={20} height={20} />
                        <img src={imgThumbUp}   alt="Like"    width={20} height={20} />
                        <img src={imgThumbDown} alt="Dislike" width={20} height={20} />
                        <img src={imgReplay}    alt="Retry"   width={20} height={20} />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Input bar */}
        <div className="drawer-input-wrap">
          <div className="guru-input-box">
            <textarea
              className="guru-textarea"
              placeholder="Ask about trades, risk, or strategies..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={1}
              onInput={(e) => {
                e.target.style.height = 'auto'
                e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px'
              }}
            />
            <div className="guru-input-actions">
              <button
                className="guru-action-btn guru-action-btn-dark"
                style={{ opacity: isGenerating ? 0.4 : 1 }}
                aria-label="Attach"
              >
                <img src={imgAttach} alt="" width={13} height={13} />
              </button>
              <div style={{ display: 'flex', gap: 8 }}>
                {isGenerating ? (
                  <>
                    <button
                      className="guru-action-btn guru-action-btn-dark"
                      style={{ opacity: 0.4 }}
                      aria-label="Voice"
                    >
                      <img src={imgMic} alt="" width={13} height={13} />
                    </button>
                    <button
                      className="guru-stop-btn"
                      aria-label="Stop generation"
                      onClick={handleStop}
                    >
                      <div className="guru-stop-square" />
                    </button>
                  </>
                ) : (
                  <>
                    <button className="guru-action-btn guru-action-btn-dark" aria-label="Voice">
                      <img src={imgMic} alt="" width={13} height={13} />
                    </button>
                    <button
                      className="guru-action-btn guru-action-btn-white"
                      style={{ opacity: input.trim() ? 1 : 0.45 }}
                      aria-label="Send"
                    >
                      <img src={chatPhase === 'done' ? imgSendWhite : imgSend} alt="" width={16} height={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Trade card component ─────────────────────────────────────────────────────
function TradeCard() {
  return (
    <div className="chat-trade-card">
      <div className="chat-trade-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img
            src="https://www.figma.com/api/mcp/asset/87c70390-a116-4805-9bc2-95f6626ab2b9"
            alt="NVDA"
            width={44}
            height={44}
            style={{ borderRadius: 52, objectFit: 'cover', flexShrink: 0 }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
              <span className="trade-ticker">NVDA</span>
              <span className="trade-bullish-badge">Bullish</span>
            </div>
            <span className="trade-subtitle">$145 Call · Expires Sep 18</span>
          </div>
        </div>
        <div style={{ textAlign: 'center', flexShrink: 0 }}>
          <div className="trade-premium">$4.2M</div>
          <div className="trade-premium-label">Premium</div>
        </div>
      </div>

      <div className="chat-trade-stats">
        <div className="trade-stat">
          <span className="trade-stat-label">Risk</span>
          <div className="trade-risk-dots">
            {[0,1,2,3,4].map(i => (
              <div key={i} className="trade-risk-dot" style={{ background: i < 3 ? '#fbbf24' : '#272a36' }} />
            ))}
          </div>
          <span className="trade-stat-value">Moderate</span>
        </div>
        <div className="trade-stat">
          <span className="trade-stat-label">Confidence</span>
          <span className="trade-stat-value" style={{ color: '#42c542', fontSize: 18 }}>72%</span>
        </div>
        <div className="trade-stat">
          <span className="trade-stat-label">Max Loss</span>
          <span className="trade-stat-value" style={{ fontSize: 18 }}>$320</span>
        </div>
      </div>
    </div>
  )
}

// ─── Helper: render text with newlines ───────────────────────────────────────
function renderLines(text) {
  const lines = text.split('\n')
  return lines.map((line, i) => (
    <span key={i}>
      {line}
      {i < lines.length - 1 && <br />}
    </span>
  ))
}
