import React from 'react'
import './NpcIntro.css'

const NPC_INTROS = {
  might: {
    cta: "You had me at Zamboni.",
    narration: "You see a half-dressed hockey player outside the stadium, cursing under his breath at a pair of locked doors. He turns to you and gestures wildly at the entrance.",
    messages: [
      `{name}, buddy! You gotta help me out.`,
      `I'm super late for practice and the **Stanley Cup** is in, like, two minutes... Coach is gonna chew me out again.`,
      `Okay, look, I might have taken a *little* too much poutine last night and now my hockey gear is who knows where.`,
      `Could you find my **Helm of Hockey Flow**, **Blades of Glory**, and **Jersey of Destiny**? I'll let you Zamboni the game, pinky promise.`,
    ],
  },

  magic: {
    cta: "I'll pencil it in faster than you can say PRESTO.",
    narration: "A frazzled city official bursts through the doors of New City Hall, juggling a teetering stack of binders and three lanyards. She spots you and waves you over with visible relief.",
    messages: [
      `{name}! Oh thank goodness. I need your help immediately.`,
      `The city has lost something critical. **One Vacation Day** - the only one left on the municipal calendar. Vanished after the last budget meeting.`,
      `We need it back ASAP, so we can all go on our approved 5-minute breaks.`,
      `Track down the **Top Hat of Justice**, **Gavel of Enough Funding**, and the **Coat of Arms** to figure out where it went. I'll personally approve a lifetime TTC pass. You have my word.`,
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

      <div className="ni-bottom-block">
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
    </div>
  )
}
