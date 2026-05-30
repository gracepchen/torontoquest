import React, { useState } from 'react'
import CharacterSelect from './screens/CharacterSelect'
import NpcIntro from './screens/NpcIntro'
import QuestMap from './screens/QuestMap'
import QuestPuzzle from './screens/QuestPuzzle'

export default function App() {
  const [screen, setScreen] = useState('character-select')
  const [character, setCharacter] = useState(null)
  const [activeQuest, setActiveQuest] = useState(null)
  const [completedQuests, setCompletedQuests] = useState([])

  function handleStart(charData) {
    // Reset progress only if the player switched paths
    if (character && charData.path.id !== character.path.id) {
      setCompletedQuests([])
    }
    setCharacter(charData)
    setScreen('npc-intro')
  }

  function handleIntroDone() {
    setScreen('quest-map')
  }

  function handleSelectQuest(quest) {
    setActiveQuest(quest)
    setScreen('quest-puzzle')
  }

  function handleQuestComplete(questId) {
    setCompletedQuests(prev => prev.includes(questId) ? prev : [...prev, questId])
    setScreen('quest-map')
    setActiveQuest(null)
  }

  function handleBackToMap() {
    setScreen('quest-map')
    setActiveQuest(null)
  }

  function handleEditCharacter() {
    setScreen('character-select')
  }

  function handleContinue(charData) {
    // Update character details (name/title may have changed) but preserve progress
    setCharacter(charData)
    setScreen('quest-map')
  }

  return (
    <div className="phone-shell">
      {screen === 'character-select' && (
        <CharacterSelect
          onStart={handleStart}
          onContinue={handleContinue}
          initialData={character}
          completedQuests={completedQuests}
        />
      )}
      {screen === 'npc-intro' && character && (
        <NpcIntro
          character={character}
          onContinue={handleIntroDone}
          onBack={() => setScreen('character-select')}
        />
      )}
      {screen === 'quest-map' && character && (
        <QuestMap
          character={character}
          completedQuests={completedQuests}
          onSelectQuest={handleSelectQuest}
          onEditCharacter={handleEditCharacter}
        />
      )}
      {screen === 'quest-puzzle' && character && activeQuest && (
        <QuestPuzzle
          character={character}
          quest={activeQuest}
          completedQuests={completedQuests}
          onBack={handleBackToMap}
          onComplete={handleQuestComplete}
        />
      )}
    </div>
  )
}
