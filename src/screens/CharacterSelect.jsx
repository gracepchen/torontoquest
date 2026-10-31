import React, { useState } from 'react'
import './CharacterSelect.css'

const TITLES = [
  'the Relentless', 'the Brave', 'the Silly One', 'the Canuck',
  'the Determined', 'the Fearless', 'the Mighty', 'the Scrappy',
  'the Splendid', 'the Unstoppable', 'the Polite', 'the Bold',
  'the Beaver', 'the Treasure Hunter', 'the Survivor', 'the "Tough"',
  'the Indomitable', 'the Determined', 'the Beautiful', 'the Mysterious',
  'the Maple Leaf', 'the Quaint', 'the Hobbit', 'the Sleepy',
  'the Strange', 'the Weary', 'the Unknown', 'the Victorious',
  'the Terrible', 'the Tasty', 'the Tender', 'the Magnificent',
  'the Blue', 'the Adorable', 'the Delightful', 'the Defiant',
  'the Eager', 'the Effervescent', 'the Faithful', 'the Jolly',
  'the Jittery', 'the Lucky', 'the Generous', 'the Geriatric',
  'the Fish-Slayer', 'the Fortune-teller', 'the Softhearted', 'the Sticky-Handed',
  'the Smooth-Brained', 'the Thick', 'the Crispy', 'the One-Handed',
  'the Crunchy Roll', 'the Floppy Disk', 'the Jello', 'the Mad',
  'the Almighty', 'the Woolly', 'the Adolescent', 'the Composed',
  'the Eminent', 'the Funky Fresh', 'the Torontonian', 'the Frequent Flyer',
  'the Somewhat Literate', 'the Horror Oh the Horror', 'the Hideous', 'the Pure',
  'the Puzzled', 'the Quixotic', 'the Quintessential', 'the Suburbanite',
  'the Suspicious', 'the Thin Mint', 'the Big 5', 'the Pedestrian'
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
        <label className="cs-name-label">Welcome to the realm,<br></br>Adventurer.</label>
        <label className="cs-name-label">What's your name?<br></br><br></br></label>
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
