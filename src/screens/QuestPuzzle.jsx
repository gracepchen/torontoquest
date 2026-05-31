import React, { useState } from 'react'
import './QuestPuzzle.css'

const QUEST_DATA = {

  // ── MIGHT PATH ──────────────────────────────────────────────────────────────

  helm: {
    location: 'Hockey Hall of Fame',
    riddles: [
      {
        question: `My favourite adventurer! In what year did the Toronto Maple Leafs last win the Stanley Cup?`,
        answer: '1967',
        successMessage: `Correct! Walk three paces left and look for the old bronze plaque near the entrance...`,
        hint: "Think back to a time before Canada's 100th birthday.",
      },
      {
        question: `Good work! Now tell me — the Hockey Hall of Fame sits at the corner of Yonge and what other street?`,
        answer: 'front',
        successMessage: `Well done! You're getting closer. Head past the championship banners on your left...`,
        hint: 'It shares its name with the first page of a newspaper.',
      },
      {
        question: `Impressive! How many Stanley Cups have the Toronto Maple Leafs won in total?`,
        answer: '13',
        successMessage: `Thirteen! You know your history. The next clue lies beneath that number...`,
        hint: 'An unlucky number for opponents.',
      },
      {
        question: `Almost there! Two goalies shared the net for the Leafs in the 1967 Cup run. Name one of them.`,
        answer: 'johnny bower',
        successMessage: `Johnny Bower — the China Wall himself! The helm is nearly within reach...`,
        hint: 'One of them was nicknamed "The China Wall".',
        altAnswers: ['terry sawchuk', 'bower', 'sawchuk'],
      },
      {
        question: `One final test. In what year was the Hockey Hall of Fame officially established in Toronto?`,
        answer: '1943',
        successMessage: `1943! You've proven your worth. The Helm of Hockey Flow is yours, hero!`,
        hint: 'During the height of the Second World War.',
      },
    ],
  },

  blades: {
    location: 'Scotiabank Arena',
    riddles: [
      {
        question: `Welcome, brave soul! How many Stanley Cup championship banners hang in the rafters of this arena?`,
        answer: '13',
        successMessage: `Thirteen banners — each one a piece of history. Head to the east concourse...`,
        hint: 'The same number the Leafs have won in total.',
      },
      {
        question: `Sharp eyes! What was the original name of Scotiabank Arena when it opened?`,
        answer: 'air canada centre',
        successMessage: `Air Canada Centre! Named for the skies, now home to champions. Keep moving...`,
        hint: 'Named after a national airline.',
        altAnswers: ['the air canada centre'],
      },
      {
        question: `Excellent! In what year did this arena first open its doors to the public?`,
        answer: '1999',
        successMessage: `1999 — practically a relic by Toronto standards! The blades glimmer ahead...`,
        hint: 'The last year of the millennium.',
      },
      {
        question: `Nearly there! What sport, besides hockey, calls this arena home?`,
        answer: 'basketball',
        successMessage: `Basketball! The hardwood hides beneath the ice. You're very close now...`,
        hint: 'The sport of the Toronto Raptors.',
      },
      {
        question: `Final question! Which Toronto team won a championship at this very arena in 2019?`,
        answer: 'raptors',
        successMessage: `The Raptors! We the North! The Blades of Glory are yours, hero!`,
        hint: 'They were the first Canadian team to win this particular title.',
        altAnswers: ['toronto raptors', 'the raptors'],
      },
    ],
  },

  jersey: {
    location: 'Maple Leaf Gardens',
    riddles: [
      {
        question: `Greetings, champion! Name the captain who led the Maple Leafs to their last Stanley Cup victory.`,
        answer: 'george armstrong',
        successMessage: `George Armstrong — The Chief himself! A true leader. Venture deeper...`,
        hint: 'He was nicknamed "The Chief".',
        altAnswers: ['armstrong'],
      },
      {
        question: `Well done! What jersey number did the legendary Darryl Sittler wear for the Leafs?`,
        answer: '27',
        successMessage: `Number 27 — retired from the rafters for good reason. Onwards...`,
        hint: 'A number between 25 and 30.',
      },
      {
        question: `Impressive! What number did Mats Sundin, the Leafs' all-time leading scorer, wear?`,
        answer: '13',
        successMessage: `Number 13 — lucky for the Leafs, anyway! The jersey beckons...`,
        hint: 'Some call it unlucky. Not in Toronto.',
      },
      {
        question: `Almost! In what year were the Toronto Maple Leafs founded, making them one of the original NHL teams?`,
        answer: '1917',
        successMessage: `1917 — the birth of a dynasty! You're nearly there...`,
        hint: 'The same year the NHL itself was founded.',
      },
      {
        question: `Last one! What was the Toronto Maple Leafs' very first team name?`,
        answer: 'toronto arenas',
        successMessage: `The Toronto Arenas! History runs deep here. The Jersey of Destiny is yours, hero!`,
        hint: 'They were named after the building they played in.',
        altAnswers: ['arenas', 'the toronto arenas', 'the arenas'],
      },
    ],
  },

  stanleycup: {
    location: 'Nathan Phillips Square',
    riddles: [
      {
        question: `So — you've made it. Tell me, young hero: who donated the original Stanley Cup trophy to hockey?`,
        answer: 'lord stanley',
        successMessage: `Lord Stanley of Preston! Governor General of Canada. The quest truly begins now...`,
        hint: 'He was the Governor General of Canada at the time.',
        altAnswers: ['frederick stanley', 'lord stanley of preston'],
      },
      {
        question: `Excellent! In what year was the Stanley Cup first awarded to a hockey team?`,
        answer: '1893',
        successMessage: `1893 — before the NHL even existed! You know your Cup history...`,
        hint: 'In the 1890s, when hockey was still played outdoors.',
      },
      {
        question: `Remarkable! Which franchise has won the most Stanley Cups in history?`,
        answer: 'montreal canadiens',
        successMessage: `The Montreal Canadiens — 24 titles! A worthy rival to Toronto's legacy...`,
        hint: 'A certain team from Quebec with a lot of hardware.',
        altAnswers: ['montreal', 'canadiens', 'habs', 'the montreal canadiens'],
      },
      {
        question: `So close! How many bands or rings make up the Stanley Cup trophy?`,
        answer: '5',
        successMessage: `Five bands — each engraved with champions' names. You can almost touch the Cup...`,
        hint: 'Count the barrel-shaped sections of the trophy.',
      },
      {
        question: `Final question, hero! In what year did the Toronto Maple Leafs first win the Cup under the name 'Maple Leafs'?`,
        answer: '1932',
        successMessage: `1932! The Maple Leafs and the Stanley Cup — together at last. It's yours, hero!`,
        hint: 'During the Great Depression, they brought joy to a city that needed it.',
      },
    ],
  },

  // ── MAGIC PATH ──────────────────────────────────────────────────────────────

  tophat: {
    location: 'New City Hall',
    riddles: [
      {
        question: `Ah, a new face at City Hall! Tell me — in what year was Toronto's New City Hall officially opened?`,
        answer: '1965',
        successMessage: `1965! One year before Canada's centennial. You clearly read the plaques. Follow the courtyard south...`,
        hint: "One year before Canada's centennial celebrations began.",
      },
      {
        question: `Very good! The architect of New City Hall came from which country?`,
        answer: 'finland',
        successMessage: `Finland! Viljo Revell beat out hundreds of competitors for this design. Head toward the reflecting pool...`,
        hint: 'A Nordic nation known for design, saunas, and surprisingly good hockey.',
        altAnswers: ['finnish'],
      },
      {
        question: `Excellent instincts! What is the name of the large outdoor square directly in front of New City Hall?`,
        answer: 'nathan phillips square',
        successMessage: `Nathan Phillips Square! Named after the mayor who made this building possible. You're nearly there...`,
        hint: 'Named after the mayor who championed the building.',
        altAnswers: ['nathan phillips', 'phillips square'],
      },
      {
        question: `Almost! What beloved winter activity draws thousands to Nathan Phillips Square every year?`,
        answer: 'skating',
        successMessage: `Skating! The rink beneath the Toronto sign — a true city tradition. One more question...`,
        hint: 'Lace up, bundle up, and glide under the Toronto sign.',
        altAnswers: ['ice skating', 'ice skate', 'skate', 'ice skates'],
      },
      {
        question: `Final test! What three-dimensional illuminated sign — beloved by selfie-takers — stands in the square?`,
        answer: 'toronto sign',
        successMessage: `The Toronto Sign! It literally tells you where you are. The Top Hat of Justice is yours!`,
        hint: "It spells out exactly where you're standing.",
        altAnswers: ['toronto', 'the toronto sign', 'sign'],
      },
    ],
  },

  gavel: {
    location: "Queen's Park",
    riddles: [
      {
        question: `Welcome to the seat of power! Queen's Park is named in honour of which British monarch?`,
        answer: 'queen victoria',
        successMessage: `Queen Victoria! She also gave her name to a lake, a province, and a whole era. Move past the statues...`,
        hint: 'She reigned for 63 years and gave her name to an entire era.',
        altAnswers: ['victoria'],
      },
      {
        question: `Very good! In what year was the Ontario Legislative Building completed?`,
        answer: '1893',
        successMessage: `1893 — the same year the Stanley Cup was first awarded! History everywhere you look. Continue on...`,
        hint: 'In the same decade the Stanley Cup was first awarded.',
      },
      {
        question: `Sharp! The Legislative Building is built from what type of distinctive stone, giving it its warm reddish hue?`,
        answer: 'sandstone',
        successMessage: `Sandstone! Quarried from the Credit Valley. Beautiful and politically durable. Keep going...`,
        hint: 'It gives the building a warm, reddish-pink glow.',
        altAnswers: ['pink sandstone', 'red sandstone', 'credit valley sandstone'],
      },
      {
        question: `Almost there! What is the official title of Ontario's head of government?`,
        answer: 'premier',
        successMessage: `The Premier! Like a Prime Minister, but provincial. The gavel is nearly in reach...`,
        hint: 'Like a Prime Minister, but at the provincial level.',
        altAnswers: ['the premier', 'premier of ontario'],
      },
      {
        question: `Last one! What does MPP stand for, as used by Ontario's elected representatives?`,
        answer: 'member of provincial parliament',
        successMessage: `Member of Provincial Parliament! One for every riding in Ontario. The Gavel of Enough Funding is yours!`,
        hint: 'Each one represents an electoral district across the province.',
        altAnswers: ['members of provincial parliament'],
      },
    ],
  },

  coat: {
    location: 'Toronto Reference Library',
    riddles: [
      {
        question: `Welcome, seeker of knowledge! The Toronto Reference Library sits on which famous Toronto street?`,
        answer: 'yonge street',
        successMessage: `Yonge Street! Once claimed to be the longest in the world. Head to the third floor atrium...`,
        hint: 'Once claimed to be the longest street in the world.',
        altAnswers: ['yonge', 'yonge st'],
      },
      {
        question: `Well read! In what year did the Toronto Reference Library first open its doors?`,
        answer: '1977',
        successMessage: `1977 — the same year Star Wars hit theatres. The force of knowledge is strong here. Keep looking...`,
        hint: 'The same year Star Wars was first released.',
      },
      {
        question: `Impressive! The library was designed by which acclaimed Canadian architect?`,
        answer: 'raymond moriyama',
        successMessage: `Raymond Moriyama! Also the mind behind the Canadian War Museum. You're nearly there...`,
        hint: 'He also designed the Canadian War Museum in Ottawa.',
        altAnswers: ['moriyama'],
      },
      {
        question: `Almost! The library holds a world-class collection dedicated to which beloved fictional detective?`,
        answer: 'sherlock holmes',
        successMessage: `Sherlock Holmes! Elementary, as they say. One final question...`,
        hint: 'Elementary, my dear adventurer.',
        altAnswers: ['sherlock', 'holmes'],
      },
      {
        question: `Last one! Approximately how many branches does the Toronto Public Library system have across the city?`,
        answer: '100',
        successMessage: `About 100 branches — one of the busiest urban library systems in the world. The Coat of Arms is yours!`,
        hint: 'Just over a hundred locations spread across the city.',
        altAnswers: ['100 branches', 'about 100', '100 locations', '101', '99'],
      },
    ],
  },

  vacation: {
    location: 'Union Station',
    riddles: [
      {
        question: `You've made it to Union Station — the gateway to your well-earned rest. In what year did it officially open?`,
        answer: '1927',
        successMessage: `1927! During the Roaring Twenties, when Toronto was booming. Head through the Great Hall...`,
        hint: 'During the Roaring Twenties.',
      },
      {
        question: `Splendid! What architectural style was Union Station built in?`,
        answer: 'beaux-arts',
        successMessage: `Beaux-Arts! Grand, ornate, monumental. Just like your future career. Keep going...`,
        hint: 'Think grand European railway stations — ornate columns, soaring ceilings.',
        altAnswers: ['beaux arts', 'classical', 'neoclassical', 'beaux arts classical'],
      },
      {
        question: `Excellent! What is the name of the grand central hall inside Union Station?`,
        answer: 'the great hall',
        successMessage: `The Great Hall! Commuters have rushed beneath its soaring ceilings for nearly a century. Almost there...`,
        hint: 'Where millions have hurried under soaring ceilings for nearly a hundred years.',
        altAnswers: ['great hall'],
      },
      {
        question: `Almost done! Which two railway companies originally built and operated Union Station?`,
        answer: 'cn and cp',
        successMessage: `CN and CP! Both share their initials with Canadian provinces. One last question...`,
        hint: 'Both share their initials with Canadian provinces.',
        altAnswers: ['canadian national and canadian pacific', 'canadian national', 'canadian pacific', 'cn', 'cp', 'cnr and cpr'],
      },
      {
        question: `Final question! What transit system connects Union Station to the rest of the city underground?`,
        answer: 'ttc',
        successMessage: `The TTC! Toronto Transit Commission — and your ticket home. One Vacation Day is finally yours!`,
        hint: 'Short for the Toronto Transit Commission.',
        altAnswers: ['toronto transit commission', 'the ttc', 'subway', 'the subway'],
      },
    ],
  },

  // ── MOXIE PATH ──────────────────────────────────────────────────────────────

  acornhat: {
    location: 'Harbourfront',
    riddles: [
      {
        question: `Greetings, fellow creature of nature! Harbourfront sits on the shore of which of the Great Lakes?`,
        answer: 'lake ontario',
        successMessage: `Lake Ontario! The smallest Great Lake, but the one with the best view of Toronto. Head along the waterfront...`,
        hint: 'The smallest of the Great Lakes by surface area.',
        altAnswers: ['ontario'],
      },
      {
        question: `Good nose! What island destination — reachable by a short ferry ride — sits just offshore from Harbourfront?`,
        answer: 'toronto island',
        successMessage: `Toronto Island! Car-free, beautiful, beloved. The acorn hat is near the ferry terminal...`,
        hint: 'Car-free and beloved by cyclists and picnickers alike.',
        altAnswers: ['toronto islands', 'the toronto islands', 'centre island', 'the toronto island'],
      },
      {
        question: `Sharp claws! In what decade was Harbourfront Centre established as a public arts and cultural space?`,
        answer: '1970s',
        successMessage: `The 1970s! Bell-bottoms, disco, and a new vision for the waterfront. Scramble past the boats...`,
        hint: 'Bell-bottoms, disco, and a new vision for the city waterfront.',
        altAnswers: ['1970', 'the 1970s', '70s', 'the 70s'],
      },
      {
        question: `Getting warmer! What popular recreational trail runs along Toronto's waterfront past Harbourfront?`,
        answer: 'martin goodman trail',
        successMessage: `The Martin Goodman Trail! Named after a Toronto Star publisher who loved this waterfront. Keep scurrying...`,
        hint: 'Named after a former Toronto Star publisher who championed the waterfront.',
        altAnswers: ['the martin goodman trail', 'waterfront trail', 'the waterfront trail'],
      },
      {
        question: `Last one! What famous annual film festival — one of the largest in the world — is held near Harbourfront each September?`,
        answer: 'tiff',
        successMessage: `TIFF! The Toronto International Film Festival. Lights, camera, Acorn Hat of Doom — it's yours!`,
        hint: 'Three letters that make Toronto the centre of the film world each fall.',
        altAnswers: ['toronto international film festival', 'the toronto international film festival'],
      },
    ],
  },

  beestinger: {
    location: 'Trinity Bellwoods Park',
    riddles: [
      {
        question: `Ah, a fellow park-dweller! Trinity Bellwoods gets half its name from what historic institution that once stood here?`,
        answer: 'trinity college',
        successMessage: `Trinity College! It later moved to the University of Toronto campus. Head past the old gate...`,
        hint: 'A college that later relocated to the University of Toronto.',
        altAnswers: ['trinity', 'trinity college toronto'],
      },
      {
        question: `Excellent sniff! Trinity Bellwoods is legendary for rare sightings of a white version of which city-dwelling animal?`,
        answer: 'squirrel',
        successMessage: `The white squirrel! Almost mythical, completely real. Keep your eyes peeled and your tail up...`,
        hint: 'Grey or black — and occasionally, magically white.',
        altAnswers: ['white squirrel', 'squirrels', 'white squirrels'],
      },
      {
        question: `Quick paws! What street runs along the southern edge of Trinity Bellwoods, lined with coffee shops and vintage stores?`,
        answer: 'queen street west',
        successMessage: `Queen Street West! One of Toronto's most eclectic streets. Scurry through the park toward the hill...`,
        hint: 'One of Toronto\'s most walkable and artsy streets.',
        altAnswers: ['queen west', 'queen street', 'queen st west', 'queen st', 'queen'],
      },
      {
        question: `Almost! Trinity Bellwoods is famous for warm-weather what, where locals gather on the grass with blankets and snacks?`,
        answer: 'picnics',
        successMessage: `Picnics! A sunny Toronto Sunday tradition. The bees are close — follow the flowers...`,
        hint: 'A blanket, some snacks, friends, sunshine — a Toronto tradition.',
        altAnswers: ['picnic', 'picnicking'],
      },
      {
        question: `Last sting! What type of pollinating insect has been welcomed back to Trinity Bellwoods through community garden initiatives?`,
        answer: 'bees',
        successMessage: `Bees! Essential to every garden, every park, every city. The Bee Stinger of Friendship is yours!`,
        hint: 'They make honey and keep the flowers blooming.',
        altAnswers: ['bee', 'honeybees', 'honey bees', 'honeybee'],
      },
    ],
  },

  cape: {
    location: 'Riverdale Park',
    riddles: [
      {
        question: `Welcome, nature warrior! David Suzuki is best known as a Canadian environmentalist and long-time host of which CBC program?`,
        answer: 'the nature of things',
        successMessage: `The Nature of Things! On air since 1960. A true Canadian institution. Head to the east hill...`,
        hint: "The show's title is something of a clue.",
        altAnswers: ['nature of things'],
      },
      {
        question: `Excellent! Riverdale Park overlooks which Toronto valley and river system?`,
        answer: 'don valley',
        successMessage: `The Don Valley! A green corridor running through the heart of the city. Venture down the slope...`,
        hint: 'Named after a river that flows from north Toronto all the way to the lake.',
        altAnswers: ['the don valley', 'don river', 'don river valley', 'the don river valley'],
      },
      {
        question: `Sharp eyes! Adjacent to Riverdale Park is a historic working farm — what is it called?`,
        answer: 'riverdale farm',
        successMessage: `Riverdale Farm! Same name as the park, with more goats. The cape is near the goat pen...`,
        hint: 'Same name as the park, but with more goats.',
        altAnswers: ['the riverdale farm'],
      },
      {
        question: `Almost there! Which famous Toronto viaduct — visible from Riverdale Park — was featured in Michael Ondaatje's novel "In the Skin of a Lion"?`,
        answer: 'prince edward viaduct',
        successMessage: `The Prince Edward Viaduct! Also called the Bloor Viaduct. Literature and infrastructure, together at last...`,
        hint: 'Also called the Bloor Viaduct.',
        altAnswers: ['bloor viaduct', 'the prince edward viaduct', 'the bloor viaduct'],
      },
      {
        question: `Last leaf! Toronto has one of the largest urban what systems in the world — the forested valleys winding through the city?`,
        answer: 'ravine',
        successMessage: `The ravine system! Miles of green corridors hidden in plain sight. The Cape of David Suzuki is yours!`,
        hint: 'Miles of forested corridors where you can get completely lost — within city limits.',
        altAnswers: ['ravines', 'ravine system', 'ravine systems'],
      },
    ],
  },

  perfecttree: {
    location: 'Union Station',
    riddles: [
      {
        question: `You've found your way to Union Station, urban adventurer. In what year did it officially open?`,
        answer: '1927',
        successMessage: `1927! Built during the jazz age. Even the trees were smaller then. Head under the arches...`,
        hint: 'During the Roaring Twenties.',
      },
      {
        question: `Rooted knowledge! Toronto's ravine network stretches for approximately how many kilometres through the city?`,
        answer: '300',
        successMessage: `About 300 kilometres! More than enough green to explore for a lifetime. Keep going...`,
        hint: 'More than enough green corridors to explore for a lifetime.',
        altAnswers: ['300km', '300 km', '300 kilometres', '300 kilometers', 'about 300'],
      },
      {
        question: `Branching out! What is the name of the man-made peninsula in Lake Ontario that became a thriving nature reserve — built from construction rubble?`,
        answer: 'tommy thompson park',
        successMessage: `Tommy Thompson Park — the Leslie Street Spit! Nature reclaimed it completely. You're so close...`,
        hint: 'Also known as the Leslie Street Spit.',
        altAnswers: ['leslie street spit', 'leslie spit', 'the spit', 'the leslie spit', 'tommy thompson'],
      },
      {
        question: `Almost there! The Don River flows through Toronto's ravines and empties into which body of water?`,
        answer: 'lake ontario',
        successMessage: `Lake Ontario! Everything flows to the lake eventually. One more question...`,
        hint: 'The same lake that laps at Harbourfront and the Toronto Islands.',
        altAnswers: ['ontario', 'toronto harbour'],
      },
      {
        question: `Final question! Toronto's Rouge National Urban Park was the first of its kind in Canada. What kind of park is it?`,
        answer: 'national urban park',
        successMessage: `A National Urban Park! The first in Canadian history, right here in Toronto. A Really Perfect Tree is yours!`,
        hint: 'Think: national park, but inside a city.',
        altAnswers: ['urban national park', 'national urban', 'rouge park', 'rouge national urban park'],
      },
    ],
  },
}

export default function QuestPuzzle({ character, quest, completedQuests, onBack, onComplete }) {
  const [riddleIndex, setRiddleIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [submittedAnswer, setSubmittedAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const data = QUEST_DATA[quest.id] || QUEST_DATA.helm
  const riddle = data.riddles[riddleIndex]
  const totalRiddles = data.riddles.length
  const isLastRiddle = riddleIndex === totalRiddles - 1
  const done = completedQuests.includes(quest.id)

  function checkAnswer(raw) {
    const normalized = raw.trim().toLowerCase()
    if (normalized === riddle.answer.toLowerCase()) return true
    if (riddle.altAnswers) {
      return riddle.altAnswers.some(a => a.toLowerCase() === normalized)
    }
    return false
  }

  function handleSubmit() {
    if (!userAnswer.trim()) return
    const isCorrect = checkAnswer(userAnswer)
    setCorrect(isCorrect)
    setSubmittedAnswer(userAnswer.trim())
    setSubmitted(true)
  }

  function handleNext() {
    setRiddleIndex(i => i + 1)
    setUserAnswer('')
    setSubmittedAnswer('')
    setSubmitted(false)
    setCorrect(false)
    setShowHint(false)
  }

  return (
    <div className="qp-screen">
      <div className="qp-header">
        <button className="qp-back" onClick={onBack}>◀</button>
        <div className="qp-quest-banner">
          <div className="qp-quest-img">
            <img src={quest.image} alt={quest.name} style={{ opacity: 0.4 }} />
          </div>
          <div className="qp-quest-info">
            <p className="qp-quest-name">{quest.name}</p>
            <p className="qp-quest-sub">{quest.subtext}</p>
            <div className="qp-quest-status">
              <span className={`qp-status-dot ${done ? 'qp-status-dot--done' : ''}`} />
              <span className="qp-status-text">{done ? 'Completed' : 'Not completed'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="qp-location-row">
        <span className="qp-location-icon">📍</span>
        <span className="qp-location-label">Starting point</span>
        <span className="qp-location-name">{data.location.toUpperCase()}</span>
      </div>

      <div className="qp-riddle-progress">
        {data.riddles.map((_, i) => (
          <span
            key={i}
            className={`qp-riddle-dot ${i < riddleIndex ? 'qp-riddle-dot--done' : ''} ${i === riddleIndex ? 'qp-riddle-dot--active' : ''}`}
          />
        ))}
        <span className="qp-riddle-label">Riddle {riddleIndex + 1} of {totalRiddles}</span>
      </div>

      <div className="qp-messages">
        {!submitted && (
          <p className="qp-narration">
            {riddleIndex === 0
              ? 'You see the warrior waiting patiently at the entrance. He brightens up when he sees you.'
              : 'He nods approvingly and leans in with the next riddle.'}
          </p>
        )}

        <div className="qp-bubble-row">
          <div className="qp-avatar">
            <img src={character.path.npcImage} alt="NPC" />
          </div>
          <div className="qp-bubble">
            <p className="qp-dialogue">{riddle.question}</p>
          </div>
        </div>

        {!submitted && (
          <p className="qp-narration">He holds his breath, waiting for your answer.</p>
        )}

        {!submitted && (
          <div className="qp-answer-display">
            <p className="qp-answer-placeholder">Type your answer...</p>
            <div className="qp-player-sprite">🏒</div>
          </div>
        )}

        {submitted && (
          <div className="qp-bubble-row qp-bubble-row--player">
            <div className="qp-bubble qp-bubble--player">
              <p className="qp-dialogue">"{submittedAnswer}"</p>
            </div>
            <div className="qp-avatar qp-avatar--player">
              <img src={character.path.playerImage} alt="player" />
            </div>
          </div>
        )}

        {submitted && correct && (
          <div className="qp-bubble-row">
            <div className="qp-avatar">
              <img src={character.path.npcImage} alt="NPC" />
            </div>
            <div className="qp-bubble qp-bubble--success">
              <p className="qp-dialogue">{riddle.successMessage}</p>
            </div>
          </div>
        )}

        {submitted && !correct && (
          <div className="qp-bubble-row">
            <div className="qp-avatar">
              <img src={character.path.npcImage} alt="NPC" />
            </div>
            <div className="qp-bubble qp-bubble--wrong">
              <p className="qp-dialogue">"Hmm... that's not quite right. Try again!"</p>
            </div>
          </div>
        )}

        {showHint && (
          <div className="qp-hint">
            <span className="qp-hint-label">Hint: </span>{riddle.hint}
          </div>
        )}
      </div>

      <div className="qp-input-area">
        {correct && isLastRiddle ? (
          <button className="qp-complete-btn" onClick={() => onComplete(quest.id)}>
            Quest complete — return to map ▶
          </button>
        ) : correct && !isLastRiddle ? (
          <button className="qp-next-btn" onClick={handleNext}>
            Next riddle ▶
          </button>
        ) : (
          <>
            <label className="qp-input-label">Your answer...</label>
            <div className="qp-input-row">
              <input
                className="qp-input"
                type="text"
                value={userAnswer}
                onChange={e => {
                  setUserAnswer(e.target.value)
                  setSubmitted(false)
                }}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                placeholder=""
              />
              <button
                className="qp-submit"
                onClick={handleSubmit}
                disabled={!userAnswer.trim()}
              >▶</button>
            </div>
            <button className="qp-hint-btn" onClick={() => setShowHint(v => !v)}>
              {showHint ? 'Hide hint' : 'Need a hint?'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
