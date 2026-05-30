import React, { useState } from 'react'
import './QuestMap.css'

const imgMapBg = '/torontomap.png'
const imgHelm = '/helm.png'
const imgBlades = '/weapon.png'
const imgJersey = '/armour.png'
const imgTrophy = '/trophy.png'
const imgTopHat = '/helm.png'
const imgGavel = '/weapon.png'
const imgCoat = '/armour.png'
const imgAcornHat = '/helm.png'
const imgBeeStinger = '/weapon.png'
const imgCape = '/armour.png'

const QUESTS = {
  might: [
    {
      id: 'helm',
      name: 'Helm of Hockey Flow',
      subtext: 'Head to the Hockey Hall of Fame to begin.',
      image: imgHelm,
    },
    {
      id: 'blades',
      name: 'Blades of Glory',
      subtext: 'The ice calls from Scotiabank Arena.',
      image: imgBlades,
    },
    {
      id: 'jersey',
      name: 'Jersey of Destiny',
      subtext: 'History lives at Maple Leaf Gardens.',
      image: imgJersey,
    },
    {
      id: 'stanleycup',
      name: 'Stanley Cup Playoffs',
      subtext: 'Equip yourself and make your way to the ice!',
      image: imgTrophy,
      isFinal: true,
    },
  ],
  magic: [
    {
      id: 'tophat',
      name: 'Top Hat of Justice',
      subtext: 'The city awaits at New City Hall.',
      image: imgTopHat,
    },
    {
      id: 'gavel',
      name: 'Gavel of Enough Funding',
      subtext: "Democracy unfolds at Queen's Park.",
      image: imgGavel,
    },
    {
      id: 'coat',
      name: 'Coat of Arms',
      subtext: 'Knowledge hides in the Reference Library.',
      image: imgCoat,
    },
    {
      id: 'vacation',
      name: 'One Vacation Day',
      subtext: 'Your well-earned reward awaits at Union Station.',
      image: imgTrophy,
      isFinal: true,
    },
  ],
  moxie: [
    {
      id: 'acornhat',
      name: 'Acorn Hat of Doom',
      subtext: 'The waterfront whispers at Harbourfront.',
      image: imgAcornHat,
    },
    {
      id: 'beestinger',
      name: 'Bee Stinger of Friendship',
      subtext: 'Find the buzz at Trinity Bellwoods Park.',
      image: imgBeeStinger,
    },
    {
      id: 'cape',
      name: 'Cape of David Suzuki',
      subtext: 'Nature calls from Riverdale Park.',
      image: imgCape,
    },
    {
      id: 'perfecttree',
      name: 'A Really Perfect Tree',
      subtext: 'Your roots lead to Union Station.',
      image: imgTrophy,
      isFinal: true,
    },
  ],
}

const STARS = [
  { top: '26%', left: '12%' },
  { top: '14%', left: '65%' },
  { top: '24%', left: '91%' },
]

const FUN_FACTS = {
  might: [
    "The last time the Leafs won the Stanley Cup, there were no McDonald's restaurants in Canada.",
    "The Toronto Raptors are the only NBA team based outside the United States.",
    "Maple Leaf Gardens, opened in 1931, was built in just 5 months during the Great Depression.",
    "The Toronto Blue Jays were the first non-US team to win the World Series — back-to-back in 1992 and 1993.",
    "Toronto FC was the first MLS team to win the Canadian Championship, MLS Cup, and Supporters' Shield in the same season (2017).",
    "The Hockey Hall of Fame has been located in Toronto since 1961, and holds over 3,000 artifacts.",
    "Scotiabank Arena hosts more events per year than almost any other arena in North America.",
    "The first ever NHL game was played in Toronto on December 19, 1917.",
    "BMO Field was the first soccer-specific stadium built in Canada.",
    "Toronto has produced more NHL players per capita than almost any other city in the world.",
  ],
  magic: [
    "Toronto City Hall's design was chosen from an international competition with 520 entries from 42 countries.",
    "Ontario's Queen's Park Legislative Building took 6 years to build and was completed in 1893.",
    "Toronto was incorporated as a city in 1834, with a population of just 9,000 people.",
    "The Toronto Public Library system has about 100 branches — one of the busiest urban library systems in the world.",
    "Toronto has had 66 mayors since its incorporation in 1834.",
    "The city of Toronto was amalgamated in 1998, merging six municipalities into one megacity.",
    "Union Station handles over 65 million passenger trips per year, making it Canada's busiest transportation hub.",
    "Toronto's PATH network is the world's largest underground shopping complex, with over 30 km of tunnels.",
    "The Toronto Transit Commission opened its first subway line in 1954, making it the first subway in Canada.",
    "Toronto's official motto is 'Diversity Our Strength' — adopted in 1998 at amalgamation.",
  ],
  moxie: [
    "Toronto has one of the largest urban ravine systems in the world, with over 300 km of ravine corridors.",
    "The Toronto Islands were originally a peninsula until a storm in 1858 cut them off from the mainland.",
    "Tommy Thompson Park — built from construction rubble — is now home to one of the largest double-crested cormorant colonies in the world.",
    "Toronto's urban forest contains an estimated 10 million trees maintained by the city.",
    "Rouge National Urban Park, on Toronto's eastern edge, is the first national urban park in Canada.",
    "Trinity Bellwoods Park is famous for its rare white squirrels, an albino-adjacent genetic variation of the eastern grey squirrel.",
    "The Don River was so polluted in the 1960s it was called 'dead' — decades of restoration have brought salmon back to its waters.",
    "Toronto's High Park contains one of the last remnants of the black oak savanna ecosystem that once covered much of southern Ontario.",
    "Harbourfront Centre hosts over 4,000 events per year, making it one of Canada's most active cultural spaces.",
    "The Martin Goodman Trail runs 56 km along Toronto's waterfront, connecting parks and neighbourhoods from east to west.",
  ],
}

function randomFact(current, pathId) {
  const facts = FUN_FACTS[pathId] || FUN_FACTS.might
  const others = facts.filter(f => f !== current)
  return others[Math.floor(Math.random() * others.length)]
}

export default function QuestMap({ character, completedQuests, onSelectQuest, onEditCharacter }) {
  const pathFacts = FUN_FACTS[character.path.id] || FUN_FACTS.might
  const [funFact, setFunFact] = useState(pathFacts[0])

  const pathQuests = QUESTS[character.path.id] || QUESTS.might
  const nonFinalQuests = pathQuests.filter(q => !q.isFinal)

  return (
    <div className="qm-screen">
      <div className="qm-header">
        <button className="qm-header-avatar" onClick={onEditCharacter} title="Edit character">
          <img src={character.path.playerImage} alt={character.path.archetype} />
        </button>
        <div className="qm-header-text">
          <p className="qm-char-name">{character.name} {character.title}</p>
          <p className="qm-path-label">{character.path.archetype}</p>
        </div>
      </div>

      <div className="qm-map-container">
        <img className="qm-map-bg" src={imgMapBg} alt="Toronto map" />
        {STARS.map((s, i) => (
          <div key={i} className="qm-star" style={{ top: s.top, left: s.left }}>★</div>
        ))}
      </div>

      <div className="qm-quests">
        {pathQuests.map(quest => {
          const done = completedQuests.includes(quest.id)
          const isLocked = quest.isFinal && !nonFinalQuests.every(q => completedQuests.includes(q.id))
          return (
            <button
              key={quest.id}
              className={`qm-quest-card ${done ? 'qm-quest-card--done' : ''} ${isLocked ? 'qm-quest-card--locked' : ''}`}
              onClick={() => !isLocked && onSelectQuest(quest)}
              disabled={isLocked}
            >
              <div className="qm-quest-img">
                {quest.image && (
                  <img
                    src={quest.image}
                    alt={quest.name}
                    style={isLocked ? { opacity: 0.35 } : undefined}
                  />
                )}
              </div>
              <div className="qm-quest-info">
                <p className="qm-quest-name">{quest.name}</p>
                {isLocked
                  ? <p className="qm-quest-sub qm-quest-locked-msg">Complete all 3 quests to unlock</p>
                  : <p className="qm-quest-sub">{quest.subtext}</p>
                }
                {!isLocked && (
                  <div className="qm-quest-status">
                    <span className={`qm-status-dot ${done ? 'qm-status-dot--done' : ''}`} />
                    <span className="qm-status-text">{done ? 'Completed' : 'Not completed'}</span>
                  </div>
                )}
              </div>
              <div className="qm-quest-arrow">{isLocked ? '🔒' : '▶'}</div>
            </button>
          )
        })}
      </div>

      <div className="qm-fun-fact">
        <div className="qm-fun-fact-header">
          <p className="qm-fun-fact-label">Fun Fact</p>
          <button className="qm-dice-btn" onClick={() => setFunFact(f => randomFact(f, character.path.id))} title="New fun fact">🎲</button>
        </div>
        <p className="qm-fun-fact-text">{funFact}</p>
      </div>

      <div className="qm-footer-btns">
        <button className="qm-footer-btn">Game help</button>
        <button className="qm-footer-btn qm-footer-btn--coffee">Enjoying the game? buy me a coffee</button>
      </div>
    </div>
  )
}
