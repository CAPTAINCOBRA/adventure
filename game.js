const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");

let state = {};

function startGame() {
  state = {};
  showTextNode(1);
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
    id: 1,
    text: "You wake up in a strange place and you see a sparkling blue orb near you.",
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
      },
    ],
  },
];

startGame();
