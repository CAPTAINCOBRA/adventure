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
    // back: "DragonKilled",
    options: [
      {
        text: "Restart.",
        nextText: -1,
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
        nextText: 25,
      },
      {
        text: "Go right",
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
    text: "No matter how fast you run, you are no match for the mighty Sphinx. You make for a good dinner! If only you had waited for the Sphinx to ask his riddle",
    back: "SphinxRun",
    options: [
      {
        text: "Restart",
        nextText: -1,
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
];

startGame();
