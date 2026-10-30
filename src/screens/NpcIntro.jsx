import React from 'react'
import './NpcIntro.css'

const NPC_INTROS = {
  might: {
    cta: "Got it, chief.",
    narration: "You see a half-dressed hockey player in the street ahead, cursing under his breath at a pair of locked doors. He turns to you and gestures wildly at the entrance.",
    messages: [
      `{name}! Buddy! You gotta help me out here.`,
      `I'm super late for practice and the Stanley Cup championships are coming up. Coach is gonna be so mad.`,
      `Don't let him know, but I took too much poutine last night and my hockey stuff is scattered all over town...`,
      `Come with me to grab my **Helm of Hockey Flow**, **Blades of Glory**, and **Jersey of Destiny**? I'll let you Zamboni the championships!`,
    ],
  },

  magic: {
    cta: "Understood. I'll pencil it in.",
    narration: "A frazzled city official bursts through the doors of New City Hall, juggling a teetering stack of binders and three lanyards. They spot you and wave you over with visible relief.",
    messages: [
      `{name}! Oh thank goodness. I need your help immediately.`,
      `The city has lost something critical. One Vacation Day — the only approved one left on the municipal calendar. Vanished after the last budget meeting.`,
      `Nobody noticed for six months. But I noticed. We need it back before the quarter ends, and quietly.`,
      `Help me track down the **Top Hat of Justice**, **Gavel of Enough Funding**, and **Coat of Arms**. I will personally approve your paperwork. You have my word and a memo to that effect.`,
    ],
  },

  moxie: {
    cta: "On it. (sniffs the air)",
    narration: "You hear rustling from behind a recycling bin. A raccoon in a small knitted hat peers out at you, sniffs the air twice, and beckons you closer with one tiny paw.",
    messages: [
      `{name}. Good. You made it. I've been watching you.`,
      `The city is changing. Condos. Noise. Someone paved over my favourite foraging spot on Queen West. The ravines are restless and the bees are stressed.`,
      `We need your help before things get worse out here.`,
      `Sniff out the **Acorn Hat of Doom**, **Bee Stinger of Friendship**, and **Cape of David Suzuki**. Do that, and I'll show you A Really Perfect Tree. Worth it, I promise.`,
    ],
  },
}

function renderDialogue(text) {
  const parts = text.split(/\*\*(.+?)\*\*/)
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  )
}

export default function NpcIntro({ character, onContinue, onBack }) {
  const intro = NPC_INTROS[character.path.id] || NPC_INTROS.might

  return (
    <div className="ni-screen">
      <div className="ni-topbar">
        <button className="ni-back" onClick={onBack}>{'< Back'}</button>
      </div>

      <div className="ni-messages">
        {intro.narration && (
          <p className="ni-narration">{intro.narration}</p>
        )}
        {intro.messages.map((msg, i) => {
          const text = msg.replace('{name}', character.name)
          return (
            <div key={i} className="ni-bubble-row">
              {i === 0
                ? <div className="ni-avatar">
                    <img src={character.path.image} alt={character.path.archetype} />
                  </div>
                : <div className="ni-avatar-spacer" />
              }
              <div className="ni-bubble">
                <p className="ni-dialogue">{renderDialogue(text)}</p>
              </div>
            </div>
          )
        })}
      </div>

      <button className="ni-cta" onClick={onContinue}>
        {intro.cta}
      </button>
    </div>
  )
}
