const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");

let state = {};

function startGame() {
  state = {};
  // showTextNode(1);
  showTextNode(100);
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text;
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  //Bug eka starts
  if (textNode.back) {
    const bady = document.getElementById("bady");
    // bady.classList.remove();
    bady.removeAttribute("class");
    bady.classList.add(textNode.back);
  } else {
    const bady = document.getElementById("bady");
    bady.classList.add("baady");
  }

  //Bug eka ends

  textNode.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("btn");
      button.classList.add("btn-info");
      button.addEventListener("click", () => selectOption(option));
      optionButtonsElement.appendChild(button);
      //Bug eka
      if (textNode.options[0].win) {
        console.log(textNode.options[0].win);
        // button.addEventListener("click", party.confetti(button));
        // button.addEventListener("onmousedown", party.confetti(this));
        party.confetti(button, {
          // count: party.variation.range(50000, 40000),
          count: party.variation.range(5000, 5000),
        });

        setTimeout(() => {
          const partyDiv = document.getElementById("party-js-container");
          // partyDiv.style.width = "1000px !important";
          partyDiv.style.position = "fixed";
          // partyDiv.classList.add("positioFixed");
        }, 10);
      }

      // Welcome salutation
      // if (textNode.salut && textNode.byLine) {
      //   const titleH1 = document.getElementById("title");
      //   titleH1.innerText = textNode.salut;
      //   const byLineCite = document.getElementById("byLine");
      //   byLineCite.innerText = textNode.byLine;
      // }
      // // else {
      // if (!(textNode.salut && textNode.byLine)) {
      //   const titleH1 = document.getElementById("title");
      //   titleH1.innerText = "";
      //   const byLineCite = document.getElementById("caption");
      //   // byLineCite.remove();
      // }
      //Welcome salutation ends

      //Bug eka ends
    }
  });
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}

const textNodes = [
  {
    id: 100,
    text: "Welcome to Choose your own adventure! Click on the Button to play the game!",
    salut: "Choose your own adventure!",
    byLine: "By Ekansh Baweja",
    options: [
      {
        text: "Play",
        nextText: 1,
      },
    ],
  },
  {
    id: 1,
    text: "You wake up in a strange place and you see a sparkling blue orb near you.",
    back: "Orb",
    options: [
      {
        text: "Take the orb",
        setState: { blueOrb: true },
        nextText: 2,
      },
      {
        text: "Leave the orb",
        nextText: 2,
      },
      {
        text: "Destroy the Orb",
        nextText: 21,
      },
      {
        text: "Go back to sleep.",
        nextText: 23,
      },
    ],
  },
  {
    id: 2,
    text: "You venture forth in search of answers to where you are when you come across a blacksmith.",
    back: "Blacksmith",
    options: [
      {
        text: "Trade the orb for a sword",
        requiredState: (currentState) => currentState.blueOrb,
        setState: { blueOrb: false, sword: true },
        nextText: 3,
      },
      {
        text: "Trade the orb for a shield",
        requiredState: (currentState) => currentState.blueOrb,
        setState: { blueOrb: false, shield: true },
        nextText: 3,
      },
      {
        text: "Ignore the blacksmith",
        nextText: 3,
      },
      {
        text: "Rob the blacksmith.",
        nextText: 22,
      },
    ],
  },
  {
    id: 3,
    text: "After leaving the blacksmith you start to feel tired and stumble upon a small town next to a dangerous looking castle.",
    back: "Castle",
    options: [
      {
        text: "Explore the castle",
        nextText: 4,
      },
      {
        text: "Explore the castle dungeons",
        nextText: 24,
      },
      {
        text: "Find a room to sleep at in the town",
        nextText: 5,
      },
      {
        text: "Find some hay in a stable to sleep in",
        nextText: 6,
      },
    ],
  },
  {
    id: 4,
    text: "You are so tired that you fall asleep while exploring the castle and are killed by some terrible dragon in your sleep.",
    back: "DragonEat",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 5,
    text: "Without any money to buy a room you break into the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell.",
    back: "Inn",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 6,
    text: "You wake up well rested and full of energy ready to explore the nearby castle.",
    back: "Hay",
    options: [
      {
        text: "Explore the castle",
        nextText: 7,
      },
    ],
  },
  {
    id: 7,
    text: "While exploring the castle you come across a horrible dragon in your path.",
    back: "MonsterCastle",
    options: [
      {
        text: "Try to run",
        nextText: 8,
      },
      {
        text: "Attack it with your sword",
        requiredState: (currentState) => currentState.sword,
        nextText: 9,
      },
      {
        text: "Hide behind your shield",
        requiredState: (currentState) => currentState.shield,
        nextText: 10,
      },
      {
        text: "Throw the blue orb at it",
        requiredState: (currentState) => currentState.blueOrb,
        nextText: 11,
      },
    ],
  },
  {
    id: 8,
    text: "Your attempts to run are in vain and the dragon easily catches.",
    back: "DragonHideRun",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 9,
    text: "You foolishly thought this dragon could be slain with a single sword.",
    back: "DragonSword",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 10,
    text: "The dragon laughed as you hid behind your shield and ate you.",
    back: "DragonShield",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 11,
    text: "You threw your shiny orb at the dragon and it exploded. After the dust settled you saw the dragon was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.",
    back: "DragonKilled",
    options: [
      {
        text: "Congratulations. Play Again.",
        nextText: -1,
        win: true,
      },
    ],
  },
  {
    id: 21,
    text: "There is a blast of blue light and it engulfs you. RIP.",
    back: "OrbBlast",
    options: [
      {
        text: "Restart.",
        nextText: -1,
      },
    ],
  },
  {
    id: 22,
    text: "Blacksmith's workers come and arrest you and have the town guard lock you in a cell.",
    back: "LockedCell",
    options: [
      {
        text: "Restart.",
        nextText: -1,
      },
    ],
  },
  {
    id: 23,
    text: "Why were you even born?",
    back: "Sleep",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
      {
        text: "Get a life",
        nextText: 38,
      },
    ],
  },
  {
    id: 24,
    text: "While exploring the dungeons, you come accross 2 passageways",
    back: "Dungeons",
    options: [
      {
        text: "Go left",
        setState: { rightBranch: false, leftBranch: true },
        nextText: 25,
      },
      {
        text: "Go right",
        setState: { rightBranch: true, leftBranch: false },
        nextText: 26,
      },
    ],
  },
  {
    id: 25,
    text: "You walk for some time and see large cobwebs hanging from the walls. And that is when you come face to face with a giant Troll",
    back: "Troll",
    options: [
      {
        text: "Run",
        nextText: 27,
      },
      {
        text: "Throw the Orb at the Troll",
        requiredState: (currentState) => currentState.blueOrb,
        nextText: 28,
      },
      {
        text: "Attack the Troll with your sword",
        requiredState: (currentState) => currentState.sword,
        nextText: 29,
      },
      {
        text: "Hide behind your shield",
        requiredState: (currentState) => currentState.shield,
        nextText: 30,
      },
    ],
  },
  {
    id: 27,
    text: "You somehow manage to outrun the Troll and manage to reach the exit of that tunnel",
    back: "TrollEscape",
    options: [
      {
        text: "Explore the castle instead",
        nextText: 7,
      },
      {
        text: "Explore the right branch of the dungeon",
        requiredState: (currentState) => currentState.leftBranch,
        nextText: 26,
      },
      {
        text: "Explore the castle grounds",
        nextText: 46,
      },
    ],
  },
  {
    id: 28,
    text: "The troll catches the Orb and eats it up before gobbling you down as well",
    back: "TrollEat",
    options: [
      {
        text: "Next",
        nextText: 31,
      },
    ],
  },
  {
    id: 29,
    text: "The best defense is a good offence. You hack fiercely at the troll with the sword and finally manage to strike it deep in the heart. Congratulations for surviving the ordeal",
    back: "TrollSword",
    options: [
      {
        text: "Congratulations. Play Again.",
        nextText: -1,
        win: true,
      },
    ],
  },
  {
    id: 30,
    text: "The troll tears through your shield and shreds you to pieces",
    back: "TrollKill",
    options: [
      {
        text: "Restart.",
        nextText: -1,
      },
    ],
  },
  {
    id: 31,
    text: "Inside the stomach, Orb explodes and the troll cries in agony before dying. But you are no longer alive to witness your pyrhic victory. Indeed how pathetic!",
    back: "TrollDead",
    options: [
      {
        text: "Restart.",
        nextText: -1,
      },
    ],
  },
  {
    id: 26,
    text: "You come accross a large well lit hall which holds large amounts of treasure. But there is one small problem. ",
    back: "Treasures",
    options: [
      {
        text: "What's a small problem in the grand scheme of things?",
        nextText: 32,
      },
    ],
  },
  {
    id: 32,
    text: "In the middle of the hall is a Sphinx guarding the treasure. ",
    back: "Sphinx",
    options: [
      {
        text: "Run",
        nextText: 33,
      },
      {
        text: "Attack the Sphinx with your sword",
        requiredState: (currentState) => currentState.sword,
        nextText: 34,
      },
      {
        text: "Throw the Orb at the Sphinx",
        requiredState: (currentState) => currentState.blueOrb,
        nextText: 35,
      },
      {
        text: "Hide behind your shield",
        requiredState: (currentState) => currentState.shield,
        nextText: 36,
      },
    ],
  },
  {
    id: 33,
    text: "No matter how fast you run, you are no match for the mighty Sphinx. It blocks the entrance and opens its mouth to.....",
    back: "SphinxRun",
    options: [
      {
        text: "Next",
        nextText: 39,
      },
    ],
  },
  {
    id: 34,
    text: "You mere mortals and your hubris. You think you can fight the legendary Sphinx? That too with a single sword?",
    back: "SphinxHubris",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 35,
    text: "The sphinx staggers back in shock as it turns blue and a light explosion knocks you both off your feet. The Sphinx is blown away in the explosion.",
    back: "SphinxDead",
    options: [
      {
        text: "Next",
        nextText: 37,
      },
    ],
  },
  {
    id: 36,
    text: "The Sphinx laughed his human head off at your antics before making dinner of you!",
    back: "SphinxKill",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 37,
    text: "While you survived the explosion somehow, the treasure did not. But at least ou are alive. This is what happens when you enter dungeons!",
    back: "TreasureGone",
    options: [
      {
        text: "Congratulations. Play Again.",
        nextText: -1,
        win: true,
      },
    ],
  },
  {
    id: 38,
    text: "We don't sell that here",
    back: "GetALife",
    options: [
      {
        text: "Restart.",
        nextText: -1,
      },
    ],
  },
  {
    id: 39,
    text: "Ask you a riddle!",
    back: "SphinxRiddle",
    options: [
      {
        text: "Bring it on",
        nextText: 40,
      },
      {
        text: "Refuse",
        nextText: 41,
      },
    ],
  },
  {
    id: 41,
    text: "You thought you had a choice? Did you look at the Sphinx? Before you can change your mind, it Stomps you down into the ground.",
    back: "SphinxKill",
    options: [
      {
        text: "Restart.",
        nextText: -1,
      },
    ],
  },
  {
    id: 40,
    text: "What breathes, consumes, and grows, but was and never will be alive?",
    back: "Riddle",
    options: [
      {
        text: "Tree",
        nextText: 44,
      },
      {
        text: "Virus",
        nextText: 44,
      },
      {
        text: "Fire",
        nextText: 42,
      },
      {
        text: "Sphinx",
        nextText: 44,
      },
    ],
  },
  {
    id: 42,
    text: "You gave the correct answer! The Sphinx is happy and lets you have any one piece from the treasure.",
    back: "SphinxRiddler",
    options: [
      {
        text: "Next",
        nextText: 43,
      },
    ],
  },
  {
    id: 44,
    text: "You should have taken this more seriously. Your answer is wrong, before you can change it, Sphinx stomps you into the ground.",
    back: "SphinxKill",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 43,
    text: "Your eyes fall upon a beautiful ring lying in the middle of the treasure. You choose it. The Sphinx has no choice but to agree. As you return back, you hear him mutter - Let the games begin!",
    back: "RingToRule",
    options: [
      {
        text: "Next",
        nextText: 45,
      },
    ],
  },
  {
    id: 45,
    text: "As you come out of the tunnel. You ",
    back: "DungeonReturn",
    options: [
      {
        text: "Explore the castle instead",
        nextText: 7,
      },
      {
        text: "Explore the castle grounds",
        nextText: 46,
      },
      {
        text: "Explore the left branch of the dungeons",
        requiredState: (currentState) => currentState.rightBranch,
        nextText: 25,
      },
    ],
  },
  {
    id: 46,
    text: "As you enter the large grounds that surround the castle, you are overwhelmed by the vastness of the estate. It is large and creepy with forests, corn fields and even a lake.",
    back: "CastleGround",
    options: [
      {
        text: "Explore the lake",
        setState: { lakeVisit: true, forestVisit: false, fieldVisit: false },
        nextText: 47,
      },
      {
        text: "Explore the forest",
        setState: { lakeVisit: false, forestVisit: true, fieldVisit: false },
        nextText: 56,
      },
      {
        text: "Explore the corn field",
        setState: { lakeVisit: false, forestVisit: false, fieldVisit: true },
        nextText: 66,
      },
    ],
  },
  {
    id: 47,
    text: "As you near the lake, you hear a beautiful voice. You follow the voice and come across a beautiful woman singing. You",
    back: "LakeWoman",
    options: [
      {
        text: "Approach her and compliment her voice",
        nextText: 48,
      },
      {
        text: "Admire her singing from afar and go back",
        nextText: 53,
      },
    ],
  },
  {
    id: 48,
    text: "As you walk towards her, you notice a large number of pigs and other animals in the surroundings.",
    back: "AnimalPigs",
    options: [
      {
        text: "Next",
        nextText: 49,
      },
    ],
  },
  {
    id: 49,
    text: "You introduce yourself and can't help but get enchanted with her voice. She offers you a tea. You ",
    back: "LakeTeaWoman",
    options: [
      {
        text: "Inquire about the Pigs",
        nextText: 50,
      },
      {
        text: "Politely refuse it",
        nextText: 52,
      },
      {
        text: "Accept the tea",
        nextText: 54,
      },
    ],
  },
  {
    id: 50,
    text: "Classy move Casanova! Talk about pigs to women.",
    back: "Piggies",
    options: [
      {
        text: "She answers by ",
        nextText: 51,
      },
    ],
  },
  {
    id: 51,
    text: "dismissing your question vaguely and goes back to her singing ignoring you completely, Some lessons are learnt the hard way young Padwan.",
    back: "WomanLakeIgnore",
    options: [
      {
        text: "Explore the lake",
        requiredState: (currentState) => !currentState.lakeVisit,
        // setState: { lakeVisit: true, forestVisit: false, fieldVisit:false },
        nextText: 47,
      },
      {
        text: "Explore the forest",
        setState: { lakeVisit: true, forestVisit: true, fieldVisit: false },
        nextText: 56,
      },
      {
        text: "Explore the corn field",
        setState: { lakeVisit: true, forestVisit: false, fieldVisit: true },
        nextText: 66,
      },
    ],
  },
  {
    id: 52,
    text: "You are not a simp and you smell something fishy. Good sense prevails for now and you...",
    back: "LadyOfTheLake",
    options: [
      {
        text: "Politely Refuse and go back",
        // setState: { lakeVisit: true, forestVisit: false, fieldVisit:false },
        nextText: 53,
      },
    ],
  },
  {
    id: 53,
    text: "You make your way back to the castle grounds",
    back: "CastleGrounds",
    options: [
      {
        text: "Explore the forest",
        setState: { lakeVisit: true, forestVisit: true, fieldVisit: false },
        nextText: 56,
      },
      {
        text: "Explore the corn field",
        setState: { lakeVisit: true, forestVisit: false, fieldVisit: true },
        nextText: 66,
      },
    ],
  },
  {
    id: 54,
    text: "You slurp it down. It's the best tea you have ever tasted. You suddenly feel weird.",
    back: "TeaLady",
    options: [
      {
        text: "Next",

        nextText: 55,
      },
    ],
  },
  {
    id: 55,
    text: "Unfortunately for you the woman is Circe and the tea had a magical portion in it that turns men into pigs. You should have seen the warning signs but you were not thinking with our brain, were you?. Too bad you can't do anything but burp.",
    back: "Circe",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 56,
    text: "In the forest you get lost and start walking in large circles. You hear a loud noise. You",
    back: "ForestLostIn",
    options: [
      {
        text: "Follow the voice",
        nextText: 58,
      },
      {
        text: "Run back",
        nextText: 57,
      },
    ],
  },
  {
    id: 57,
    text: "That was a smart move. You reach the edge of the forest where you entered.",
    back: "ForestEdge",
    options: [
      {
        text: "Explore the corn field",
        requiredState: (currentState) => !currentState.fieldVisit,
        nextText: 66,
      },
      {
        text: "Explore the lake",
        requiredState: (currentState) => !currentState.lakeVisit,
        nextText: 47,
      },
    ],
  },
  {
    id: 58,
    text: "You come to a clearing in the middle of the forest. There sitting in the middle of the clearing is...",
    back: "ForestClearing",
    options: [
      {
        text: "Next",
        nextText: 59,
      },
    ],
  },
  {
    id: 59,
    text: "A Giant Troll",
    back: "JungleMonster",
    options: [
      {
        text: "Challenge it to a fight",
        nextText: 60,
      },
      {
        text: "Slip back quietly and get back to the safety of the castle",
        nextText: 61,
      },
    ],
  },
  {
    id: 61,
    text: "Unfortunately for you, you are not spiderman and you make a lot of noise and the troll sees you. You have no choice but to face your opponent.",
    back: "MonsterSeesYou",
    options: [
      {
        text: "Next",
        nextText: 60,
      },
    ],
  },
  {
    id: 60,
    text: "You get ready to fight",
    back: "ReadyToFight",
    options: [
      {
        text: "Throw the Orb at the Troll",
        requiredState: (currentState) => currentState.blueOrb,
        nextText: 62,
      },
      {
        text: "Attack the Troll with your sword",
        requiredState: (currentState) => currentState.sword,
        nextText: 63,
      },
      {
        text: "Hide behind your shield",
        requiredState: (currentState) => currentState.shield,
        nextText: 64,
      },
    ],
  },
  {
    id: 63,
    text: "The best defense is a good offence. You hack fiercely at the troll with the sword and finally manage to strike it deep in the heart. Congratulations for surviving the ordeal!",
    back: "JungleFight",
    options: [
      {
        text: "Congratulations. Play Again.",
        nextText: -1,
        win: true,
      },
    ],
  },
  {
    id: 62,
    text: "The troll catches the Orb and eats it up before gobbling you down as well.",
    back: "TrollEating",
    options: [
      {
        text: "Next",
        nextText: 65,
      },
    ],
  },
  {
    id: 65,
    text: "Apparently the Orb was completely useless. And so were you. Indeed how pathetic!",
    back: "TrollAttack",
    options: [
      {
        text: "Restart.",
        nextText: -1,
      },
    ],
  },
  {
    id: 64,
    text: "The troll tears through your shield and shreds you to pieces.",
    back: "TrollFight",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 66,
    text: "The fields has cliffs overlooking the sea. As you are exploring the fields near the cliff, you hear a small growl.",
    back: "Cliff",
    options: [
      {
        text: "Next",
        nextText: 67,
      },
    ],
  },
  {
    id: 67,
    text: "Before you have a chance to do anything, a Tiger emerges from behind the bushes paralyzing you with fear and charges at its lunch which is you by the way.",
    back: "TigerEmerge",
    options: [
      {
        text: "Next",
        nextText: 68,
      },
    ],
  },
  {
    id: 68,
    text: "Before it can take the final leap at you, its feet get stuck in a bear trap and it roars out in pain. And you overcome your paralysis and ",
    back: "TigerTrap",
    options: [
      {
        text: "Run towards the cliff",
        nextText: 71,
      },
      {
        text: "Attack the tiger with your sword",
        requiredState: (currentState) => currentState.sword,
        nextText: 69,
      },
    ],
  },
  {
    id: 69,
    text: "Just because you bought a sword does not make you a swordsman. You swing like a 6 year old girl and miss.",
    back: "TigerSword",
    options: [
      {
        text: "Next",
        nextText: 70,
      },
    ],
  },
  {
    id: 70,
    text: "The Tiger for its part doesn't and in one swift motion rips your head off.",
    back: "TigerRip",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 71,
    text: "You run towards the cliff and come across a cave",
    back: "CliffCave",
    options: [
      {
        text: "Explore the cave",
        nextText: 72,
      },
      {
        text: "Make your way back to the castle",
        nextText: 7,
      },
    ],
  },
  {
    id: 72,
    text: "As you enter the cave, you find it littered with bones. But that doesn't stop you because you are very brave as just witnessed by the Tiger who was trapped.",
    back: "CaveBones",
    options: [
      {
        text: "Next",
        nextText: 73,
      },
    ],
  },
  {
    id: 73,
    text: "Or maybe you don't stop and wonder who those bones belong to because you think you are the only smart guy on the planet who came across this cave.",
    back: "BonesCave",
    options: [
      {
        text: "Next",
        nextText: 74,
      },
    ],
  },
  {
    id: 74,
    text: "As you venture further into the cave, you come across a giant sleeping monster with one eye on its head. ",
    back: "SleepingCyclops",
    options: [
      {
        text: "Next",
        nextText: 75,
      },
    ],
  },
  {
    id: 75,
    text: "Its a Cyclops. Before you can run, it opens its eyes and in one swift motion, grabs you and lifts you up. You",
    back: "CyclopsLift",
    options: [
      {
        text: "Poke the Cyclops in the eye with your sword",
        requiredState: (currentState) => currentState.sword,
        nextText: 76,
      },
      {
        text: "Beg him to release you",
        nextText: 77,
      },
      {
        text: "Introduce yourself",
        nextText: 78,
      },
    ],
  },
  {
    id: 77,
    text: "You should know better than to beg for mercy from monsters. By the time you realize your folly, it gobbles you up as an evening snack.",
    back: "CyclopsGobble",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 76,
    text: "You successfully manage to blind the Cyclops and it loses its grip on you. But unfortunately for you, it only makes it more angry and it lashes out. You",
    back: "CyclopsKill",
    options: [
      {
        text: "Find this as a golden opportunity to run",
        nextText: 79,
      },
      {
        text: "What can a blind Cyclops do? I'll kill it",
        nextText: 80,
      },
    ],
  },
  {
    id: 80,
    text: "Humans and their arrogance has no bounds. Before you can even get near the cyclops, the bilnded Cyclops blindly swings its baton and it lands on top of you. Instantly killing you.",
    back: "CyclopsBaton",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 79,
    text: "You somehow manage to escape the cave and trace your way back to the fields to where the Tiger was trapped.",
    back: "TigerEscaped",
    options: [
      {
        text: "Next",
        nextText: 81,
      },
    ],
  },
  {
    id: 81,
    text: "You find that the tiger has somehow escaped. You rush back to the castle.",
    back: "GoToCastle",
    options: [
      {
        text: "Explore the castle",
        nextText: 7,
      },
    ],
  },
  {
    id: 78,
    text: "You introduce yourself to the Cyclops as...",
    back: "CyclopsMercy",
    options: [
      {
        text: "A Knight",
        nextText: 82,
      },
      {
        text: "Nobody",
        nextText: 84,
      },
    ],
  },
  {
    id: 82,
    text: "The Cyclops opens its mouth and....",
    back: "CyclopsMouth",
    options: [
      {
        text: "Next",
        nextText: 83,
      },
    ],
  },
  {
    id: 83,
    text: "Tells you- Foolish human, this cave is littered with the bones of many Knights that came before you! And gobbles you up!",
    back: "FoolCyclops",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 84,
    text: "The cyclops doesn't understand your name and scratches its head weakening its grip on you. And you take advantge by poking it in the eye. It is blinded and shrieks out in pain and calls the other cyclops deeper in the cave. You didn't see that coming?",
    back: "CyclopsLose",
    options: [
      {
        text: "Next",
        nextText: 85,
      },
    ],
  },
  {
    id: 85,
    text: "But nobody comes to his help!",
    back: "CyclopsNoOne",
    options: [
      {
        text: "Next",
        nextText: 86,
      },
    ],
  },
  {
    id: 86,
    text: "Because he was screaming that nobody is trying to kill him. HA ha ha ha ha!",
    back: "VictoryCyclops", //TODO:
    options: [
      {
        text: "Run like hell",
        nextText: 79,
      },
    ],
  },
];

startGame();
