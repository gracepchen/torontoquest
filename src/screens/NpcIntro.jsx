import React from 'react'
import './NpcIntro.css'

const NPC_INTROS = {
  might: {
    cta: "Got it, chief.",
    messages: [
      {
        id: 1,
        narration: 'You drop unceremoniously into a puff of dust on a cobbled street, a warrior standing guard in the gate ahead of you. He turns and smiles at you.',
        dialogue: `Greetings, adventurer, welcome to Toronto!`,
      },
      {
        id: 2,
        narration: 'He steps back, leaning on his spear.',
        dialogue: `You're one of those hockey players lookin' for the Stanley Cup, eh? It hasn't been seen for a thousand moons in this kingdom.\n\nThere were whispers of it reappearing at the quarter century, but...`,
      },
      {
        id: 3,
        narration: 'He shakes his head, distracted.',
        dialogue: `A story for another time. Hey, listen: the tournament is coming up, and you look like you just might be what we need.\n\nAre you up for some great peril and/or moderate walking on mostly flat ground?`,
      },
      {
        id: 4,
        narration: 'You give a confused nod. He leans in, looking closely at you again without blinking. He scratches his chin.',
        dialogue: `Yeah, you'll do. Get your equipment and come to the locker rooms. Bring some maple syrup taffy as well. Let's get that cup!`,
      },
    ],
  },

  magic: {
    cta: "Understood. I'll pencil it in.",
    messages: [
      {
        id: 1,
        narration: 'You materialize in a beige hallway that smells faintly of toner. A city official in a lanyard peers at you over his reading glasses.',
        dialogue: `Oh good, you're here. There's a lot of paperwork to get through.`,
      },
      {
        id: 2,
        narration: 'He gestures vaguely at a stack of binders.',
        dialogue: `The city has lost something very important. One Vacation Day — the last approved day off in the entire municipal calendar.\n\nIt vanished sometime after the last budget meeting. Nobody noticed for six months.`,
      },
      {
        id: 3,
        narration: 'He lowers his voice conspiratorially.',
        dialogue: `To find it, you'll need to gather three civic artifacts: the Top Hat of Justice, the Gavel of Enough Funding, and the Coat of Arms.\n\nThey're scattered across the city. The public doesn't know. Let's keep it that way.`,
      },
      {
        id: 4,
        narration: 'He hands you a laminated badge and a slightly damp handshake.',
        dialogue: `You're officially a Temporary Contractor. No benefits, obviously. But if you pull this off, I'll personally approve your One Vacation Day. You have my word, and a memo to that effect.`,
      },
    ],
  },

  moxie: {
    cta: "On it. (sniffs the air)",
    messages: [
      {
        id: 1,
        narration: 'You tumble out of a recycling bin into a park at dusk. A very large goose regards you without blinking.',
        dialogue: `Oh. You made it. Good. I was starting to think you weren't coming.`,
      },
      {
        id: 2,
        narration: 'The goose tilts its head slowly.',
        dialogue: `Listen. The city is changing. Construction. Noise. All these new condos. The ravines are restless, the bees are stressed, and someone paved over a very good foraging spot on Queen West.\n\nWe need a hero. Preferably one who doesn't mind getting a bit muddy.`,
      },
      {
        id: 3,
        narration: 'A squirrel drops an acorn nearby. The goose ignores it professionally.',
        dialogue: `Your quest: find the Acorn Hat of Doom, the Bee Stinger of Friendship, and the Cape of David Suzuki.\n\nComplete those three, and you'll earn the right to claim A Really Perfect Tree — the most beautiful tree in all of Toronto. We've been saving it.`,
      },
      {
        id: 4,
        narration: 'The goose leans in very close. You do not move.',
        dialogue: `Don't mess this up. The raccoons are counting on you. The bees are counting on you. Honestly, the whole ecosystem is watching.\n\nNo pressure. Now go. The waterfront won't sniff itself.`,
      },
    ],
  },
}

export default function NpcIntro({ character, onContinue, onBack }) {
  const archetypeLabel = {
    might: 'Rabid Hockey Fan',
    magic: 'Cuddly City Official',
    moxie: 'Local Trash Panda',
  }[character.path.id] || ''

  const intro = NPC_INTROS[character.path.id] || NPC_INTROS.might

  return (
    <div className="ni-screen">
      <div className="ni-header">
        <div className="ni-header-top">
          <button className="ni-back" onClick={onBack}>◀</button>
          <p className="ni-welcome">Welcome to the realm</p>
          <div className="ni-header-top-spacer" />
        </div>
        <div className="ni-avatar-wrap">
          <img src={character.path.playerImage} alt={character.name} />
        </div>
        <p className="ni-name">{character.name} {character.title}</p>
        <p className="ni-archetype">{archetypeLabel}</p>
      </div>

      <div className="ni-messages">
        {intro.messages.map(msg => (
          <div key={msg.id} className="ni-message-group">
            {msg.narration && (
              <p className="ni-narration">{msg.narration}</p>
            )}
            <div className="ni-bubble-row">
              <div className="ni-avatar">
                <img src={character.path.npcImage} alt="NPC" />
              </div>
              <div className="ni-bubble">
                <p className="ni-dialogue">{msg.dialogue}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="ni-cta" onClick={onContinue}>
        {intro.cta}
      </button>
    </div>
  )
}
