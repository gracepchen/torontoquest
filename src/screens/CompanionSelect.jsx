import React, { useState, useEffect, useRef } from 'react'
import './CompanionSelect.css'

const TrophyIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h2"/>
    <path d="M18 9h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2"/>
    <path d="M6 4h12v7a6 6 0 0 1-12 0V4z"/>
    <line x1="12" y1="17" x2="12" y2="20"/>
    <line x1="8" y1="20" x2="16" y2="20"/>
  </svg>
)

const SparkleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2 L13.8 9 L21 12 L13.8 15 L12 22 L10.2 15 L3 12 L10.2 9 Z"/>
    <path d="M19 3 L19.7 5.3 L22 6 L19.7 6.7 L19 9 L18.3 6.7 L16 6 L18.3 5.3 Z"/>
  </svg>
)

const LeafIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
)

export const PATHS = [
  {
    id: 'might',
    label: 'Might',
    icon: TrophyIcon,
    archetype: 'Rabid Hockey Player',
    tagline: '"Puck on, puck off. Hockey stick with me, kid, and you won\'t regret it."',
    description: 'Unleash the thrill of salt, sweat, and tears.',
    image: '/hockey.jpg',
    npcImage: '/knight.jpg',
    playerImage: '/hockey.jpg',
  },
  {
    id: 'magic',
    label: 'Magic',
    icon: SparkleIcon,
    archetype: 'Cuddly City Official',
    tagline: '"OHIP, hip, hooray! No, but seriously, our myths and powers are crazy cool."',
    description: 'Unlock the unseen powers of the ancient city.',
    image: '/gov.jpg',
    npcImage: '/wizard.jpg',
    playerImage: '/gov.jpg',
  },
  {
    id: 'moxie',
    label: 'Moxie',
    icon: LeafIcon,
    archetype: 'Local Trash Panda',
    tagline: '"You know you love me. And trees, and rocks, and shrubs..."',
    description: 'Unwind amidst the seasonal flora and fauna.',
    image: '/raccoon1.jpg',
    npcImage: '/goose.jpg',
    playerImage: '/raccoon1.jpg',
  },
]

// 5-card clone layout for seamless infinite scroll:
// [Moxie_clone, Might, Magic, Moxie, Might_clone]
const DISPLAY = [PATHS[2], PATHS[0], PATHS[1], PATHS[2], PATHS[0]]

const CARD_W = 260
const CARD_GAP = 12

const PencilIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
)

// Saved path index (0=Might,1=Magic,2=Moxie) maps to display position (1,2,3)
function savedToPos(savedIndex) {
  return savedIndex >= 0 ? savedIndex + 1 : 1
}

export default function CompanionSelect({ name, title, onStart, onContinue, onBack, initialData, completedQuests }) {
  const savedIndex = initialData?.path
  ? PATHS.findIndex(p => p.id === initialData.path.id)
  : 0
  const [pos, setPos] = useState(savedToPos(Math.max(0, savedIndex)))
  const [animate, setAnimate] = useState(true)
  const touchStartX = useRef(null)

  const selectedPath = DISPLAY[pos]
  const hasProgress = completedQuests?.length > 0
  const isSamePath = selectedPath?.id === initialData?.path?.id
  const canContinue = hasProgress && isSamePath

  // Handle seamless wrap: after transition to a clone position, jump to the real one
  useEffect(() => {
    if (pos === 0 || pos === 4) {
      const t = setTimeout(() => {
        setAnimate(false)
        setPos(pos === 0 ? 3 : 1)
      }, 350)
      return () => clearTimeout(t)
    }
    if (!animate) {
      const t = setTimeout(() => setAnimate(true), 30)
      return () => clearTimeout(t)
    }
  }, [pos, animate])

  function prev() {
    setPos(p => (p > 0 ? p - 1 : p))
  }

  function next() {
    setPos(p => (p < 4 ? p + 1 : p))
  }

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return
      const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 40) {
      dx < 0 ? next() : prev()
    }
    touchStartX.current = null
  }

  function handleGo() {
    const charData = { name, title, path: selectedPath }
    if (canContinue) {
      onContinue(charData)
    } else {
      onStart(charData)
    }
  }

  const trackOffset = `calc(50% - ${CARD_W / 2 + pos * (CARD_W + CARD_GAP)}px)`

  return (
    <div className="cmp-screen">
      <div className="cmp-header">
        <p className="cmp-greeting-label">All hail,</p>
        <p className="cmp-greeting-name">{name}</p>
        <p className="cmp-greeting-title">{title}!</p>
        <button className="cmp-edit-btn" onClick={onBack} title="Edit name">
          <PencilIcon />
        </button>
        <p className="cmp-subtitle">It's dangerous to go alone.<br />Choose your Canadian:</p>
      </div>

      <div className="cmp-body">
        <div
          className="cmp-carousel-outer"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="cmp-carousel-track"
            style={{
              transform: `translateX(${trackOffset})`,
              transition: animate ? 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
            }}
          >
            {DISPLAY.map((path, i) => {
              const Icon = path.icon
              const isActive = i === pos
              return (
                <div
                  key={i}
                  className={`cmp-card ${isActive ? 'cmp-card--active' : ''}`}
                  style={animate ? undefined : { transition: 'none' }}
                  onClick={() => { if (!isActive) { i < pos ? prev() : next() } }}
                >
                  <div className="cmp-card-header">
                    <Icon />
                    <span className="cmp-card-label">{path.label}</span>
                  </div>
                  <div className="cmp-card-img">
                    <img src={path.image} alt={path.archetype} />
                  </div>
                  <p className="cmp-card-archetype">{path.archetype}</p>
                  <p className="cmp-card-tagline">{path.tagline}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="cmp-arrows">
          <button className="cmp-arrow-btn" onClick={prev} aria-label="Previous">←</button>
          <button className="cmp-arrow-btn" onClick={next} aria-label="Next">→</button>
        </div>
      </div>

      <button className="cmp-go-btn cmp-go-btn--active" onClick={handleGo}>
        {canContinue ? 'Continue your adventure' : "Let's go!"}
      </button>
    </div>
  )
}
