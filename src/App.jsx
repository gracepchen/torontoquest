import React, { useState, useEffect, useRef, useCallback } from 'react'
import CharacterSelect from './screens/CharacterSelect'
import NpcIntro from './screens/NpcIntro'
import QuestMap from './screens/QuestMap'
import QuestPuzzle from './screens/QuestPuzzle'

export default function App() {
  const [screen, setScreen] = useState('character-select')
  const [character, setCharacter] = useState(null)
  const [activeQuest, setActiveQuest] = useState(null)
  const [completedQuests, setCompletedQuests] = useState([])

  // Internal nav stack — drives all back navigation
  const navStack = useRef(['character-select'])

  // Forward navigation: push to our stack + browser history
  function navigate(toScreen) {
    navStack.current = [...navStack.current, toScreen]
    history.pushState(null, '')
    setScreen(toScreen)
  }

  // Pop one level from our stack and update screen
  const goBack = useCallback(() => {
    const stack = navStack.current
    if (stack.length <= 1) return
    const newStack = stack.slice(0, -1)
    navStack.current = newStack
    const dest = newStack[newStack.length - 1]
    setScreen(dest)
    setActiveQuest(null)
  }, [])

  // Intercept browser / Android back button
  useEffect(() => {
    // Ensure there's always a history entry to pop so popstate always fires
    history.pushState(null, '')

    const handlePop = () => {
      history.pushState(null, '') // re-add sentinel immediately
      goBack()
    }

    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [goBack])

  // In-app ◀ buttons call this — goes through history so both paths are identical
  function handleBack() {
    history.back()
  }

  // ── Screen handlers ──────────────────────────────────────────────────────────

  function handleStart(charData) {
    if (character && charData.path.id !== character.path.id) {
      setCompletedQuests([])
    }
    setCharacter(charData)
    navigate('npc-intro')
  }

  function handleContinue(charData) {
    setCharacter(charData)
    navigate('quest-map')
  }

  function handleIntroDone() {
    navigate('quest-map')
  }

  function handleEditCharacter() {
    navigate('character-select')
  }

  function handleSelectQuest(quest) {
    setActiveQuest(quest)
    navigate('quest-puzzle')
  }

  // Quest complete: pop quest-puzzle via history.back() so the stack stays consistent
  function handleQuestComplete(questId) {
    setCompletedQuests(prev => prev.includes(questId) ? prev : [...prev, questId])
    history.back() // → popstate → goBack() → clears quest-puzzle, returns to quest-map
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
          onBack={handleBack}
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
          onBack={handleBack}
          onComplete={handleQuestComplete}
        />
      )}
    </div>
  )
}
