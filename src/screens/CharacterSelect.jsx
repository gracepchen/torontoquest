import React, { useState } from 'react'
import './CharacterSelect.css'

const TITLES = [
  'the Relentless', 'the Brave', 'the Silly One', 'the Canuck',
  'the Determined', 'the Fearless', 'the Mighty', 'the Scrappy',
  'the Splendid', 'the Unstoppable', 'the Polite', 'the Bold',
  'the Beaver', 'the Treasure Hunter', 'the Survivor', 'the "Tough"',
  'the Indomitable', 'the Determined', 'the Beautiful', 'the "Mysterious"',
  'the Maple Leaf', 'the Quaint', 'the Hobbit', 'the "Sleepy"'
]

function randomTitle(current) {
  const others = TITLES.filter(t => t !== current)
  return others[Math.floor(Math.random() * others.length)]
}

const imgLeaf = '/dice.png'

export default function CharacterSelect({ onNext, initialData }) {
  const [name, setName] = useState(initialData?.name || '')
  const [title, setTitle] = useState(initialData?.title || 'the Relentless')

  function handleNext() {
    if (!name.trim()) return
    onNext({ name: name.trim(), title })
  }

  return (
    <div className="cs-screen">
      <h1 className="cs-title">Toronto Quest</h1>

      <div className="cs-name-section">
        <label className="cs-name-label">Welcome to the realm, <br></br>Adventurer<br></br><br></br></label>
        <div className="cs-name-input-wrap">
          <input
            className="cs-name-input"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder=""
            onKeyDown={e => e.key === 'Enter' && handleNext()}
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

      <button
        className={`cs-start-btn ${name.trim() ? 'cs-start-btn--active' : ''}`}
        onClick={handleNext}
      >
        Start your adventure!
      </button>
    </div>
  )
}
