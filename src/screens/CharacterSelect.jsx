import React, { useState } from 'react'
import './CharacterSelect.css'

const TrophyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h2"/>
    <path d="M18 9h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2"/>
    <path d="M6 4h12v7a6 6 0 0 1-12 0V4z"/>
    <line x1="12" y1="17" x2="12" y2="20"/>
    <line x1="8" y1="20" x2="16" y2="20"/>
  </svg>
)

const SparkleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2 L13.8 9 L21 12 L13.8 15 L12 22 L10.2 15 L3 12 L10.2 9 Z"/>
    <path d="M19 3 L19.7 5.3 L22 6 L19.7 6.7 L19 9 L18.3 6.7 L16 6 L18.3 5.3 Z"/>
  </svg>
)

const LeafIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
)

const TITLES = [
  'the Relentless', 'the Brave', 'the Silly One', 'the Canuck',
  'the Determined', 'the Fearless', 'the Mighty', 'the Scrappy',
  'the True North', 'the Unstoppable', 'the Polite', 'the Bold',
  'the Beaver', 'the Treasure Hunter', 'the Survivor', 'the "Tough"'
]

function randomTitle(current) {
  const others = TITLES.filter(t => t !== current)
  return others[Math.floor(Math.random() * others.length)]
}

const imgLeaf = '/dice.png'

const PATHS = [
  {
    id: 'might',
    label: 'Might',
    icon: TrophyIcon,
    archetype: 'Rabid Hockey Player',
    tagline: '"Puck on, puck off."',
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
    tagline: '"OHIP, hip, hooray!"',
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
    tagline: '"You know you love me."',
    description: 'Unwind amidst the seasonal flora and fauna.',
    image: '/raccoon1.jpg',
    npcImage: '/goose.jpg',
    playerImage: '/raccoon1.jpg',
  },
]

export default function CharacterSelect({ onStart, onContinue, initialData, completedQuests }) {
  const [name, setName] = useState(initialData?.name || '')
  const [selectedPath, setSelectedPath] = useState(
    initialData?.path ? PATHS.find(p => p.id === initialData.path.id) || null : null
  )
  const [title, setTitle] = useState(initialData?.title || 'the Relentless')

  const hasProgress = completedQuests?.length > 0
  const isSamePath = selectedPath?.id === initialData?.path?.id
  const canContinue = hasProgress && isSamePath && name.trim() && selectedPath
  const canStart = name.trim() && selectedPath

  function handleStart() {
    if (!canStart) return
    onStart({ name: name.trim(), title, path: selectedPath })
  }

  function handleContinue() {
    if (!canContinue) return
    onContinue({ name: name.trim(), title, path: selectedPath })
  }

  return (
    <div className="cs-screen">
      <h1 className="cs-title">Toronto Quest</h1>

      <div className="cs-name-section">
        <label className="cs-name-label">Name</label>
        <div className="cs-name-input-wrap">
          <input
            className="cs-name-input"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder=""
          />
        </div>
        <div className="cs-name-subtitle-row">
          <p className="cs-name-subtitle">{title}</p>
        </div>
         <div className="cs-name-subtitle-row">
            <button className="cs-dice-btn" onClick={() => setTitle(t => randomTitle(t))} title="Randomize title">
            <img src={imgLeaf} alt="Roll title" />
          </button>
        </div>
      </div>

      <h2 className="cs-path-title">Choose your path</h2>

      <div className="cs-tabs">
        {PATHS.map(path => {
          const Icon = path.icon
          const active = selectedPath?.id === path.id
          return (
            <button
              key={path.id}
              className={`cs-tab ${active ? 'cs-tab--active' : ''}`}
              onClick={() => setSelectedPath(path)}
            >
              <Icon />
              <span className="cs-tab-label">{path.label}</span>
            </button>
          )
        })}
      </div>

      {selectedPath && (
        <div className="cs-detail-card">
          <div className="cs-detail-img">
            <img src={selectedPath.image} alt={selectedPath.archetype} />
          </div>
          <div className="cs-detail-info">
            <p className="cs-detail-archetype">{selectedPath.archetype}</p>
            <p className="cs-detail-tagline">{selectedPath.tagline}</p>
            <p className="cs-detail-desc">{selectedPath.description}</p>
          </div>
        </div>
      )}

      {!selectedPath && (
        <div className="cs-detail-empty">Select a path above to begin.</div>
      )}

      {canContinue ? (
        <button className="cs-start-btn cs-start-btn--active cs-start-btn--continue" onClick={handleContinue}>
          Continue your adventure
        </button>
      ) : (
        <button
          className={`cs-start-btn ${canStart ? 'cs-start-btn--active' : ''}`}
          onClick={handleStart}
        >
          Start your adventure
        </button>
      )}
    </div>
  )
}
