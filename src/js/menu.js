import { playSplatSound } from "./sounds";
import { resetGame } from "./game";

const menu = document.getElementById("main-menu");

const soccerHPContainerElement = document.getElementById("soccer-hp-container");
const soccerHPNumElement = document.getElementById("soccer-hp-num");
const soccerHPBarElement = document.getElementById("soccer-hp-bar");

const footballHPContainerElement = document.getElementById(
  "football-hp-container"
);
const footballHPNumElement = document.getElementById("football-hp-num");
const footballHPBarElement = document.getElementById("football-hp-bar");

const mouseMoveHintElement = document.getElementById("mouse-move-hint");
const pauseBtn = document.getElementById("pause");
const muteBtn = document.getElementById("mute");
const playWithMouseElement = document.getElementById("mouse-controller");
const playWithKeyboardElement = document.getElementById("keyboard-controller");
const gameOverScreen = document.getElementById("game-over-screen");
const nextLevelBtn = document.getElementById("next-level-btn");
const restartBtn = document.getElementById("restart-btn");
const mainMenuBtn = document.getElementById("main-menu-btn");
const statsScreen = document.getElementById("stats-screen");

playWithKeyboardElement.addEventListener("mouseover", () => {
  playSplatSound();
});

playWithMouseElement.addEventListener("mouseover", () => {
  playSplatSound();
});

export const addDeathMode = deathModeObj => {
  nextLevelBtn.addEventListener("click", () => {
    deathModeObj.deathMode = true;
    deathModeObj.deathModeLevel += 1;
    resetGame();
  });
};

restartBtn.addEventListener("click", () => {
  resetGame();
});

mainMenuBtn.addEventListener("click", () => {
  hideGameOverScreen();
  showMenu();
});

export const hideMenu = () => {
  menu.style.visibility = "hidden";
};

export const hideEverything = () => {
  menu.style.visibility = "hidden";
  soccerHPContainerElement.style.visibility = "hidden";
  footballHPContainerElement.style.visibility = "hidden";
  mouseMoveHintElement.style.visibility = "hidden";
  pauseBtn.style.visibility = "hidden";
  muteBtn.style.visibility = "hidden";
  gameOverScreen.style.visibility = "hidden";
};

export const addMuteBtn = muteObj => {
  muteBtn.addEventListener("click", () => {
    if (muteObj.mute === true) {
      muteObj.mute = false;
      muteBtn.innerHTML = "Mute";
    } else {
      muteObj.mute = true;
      muteBtn.innerHTML = "UnMute";
    }
  });
};

export const addPauseBtn = runGameObj => {
  pauseBtn.addEventListener("click", () => {
    if (runGameObj.runGame === true) {
      runGameObj.runGame = false;
      pauseBtn.innerHTML = "UnPause";
    } else {
      runGameObj.runGame = true;
      pauseBtn.innerHTML = "Pause";
    }
  });
};

export const showDuringGamePlayElements = () => {
  soccerHPContainerElement.style.visibility = "visible";
  footballHPContainerElement.style.visibility = "visible";
  muteBtn.style.visibility = "visible";
  pauseBtn.style.visibility = "visible";
  mouseMoveHintElement.style.visibility = "visible";
};

export const updateFootballHealth = football => {
  footballHPNumElement.innerHTML = "FOOTBALL HEALTH: " + football.health;

  footballHPBarElement.style.width = `${football.health / 3}%`;
  footballHPBarElement.style.height = "24px";
  footballHPBarElement.style.backgroundColor = "red";
};

export const updateSoccerballHealth = soccerball => {
  soccerHPNumElement.innerHTML = "SOCCER HEALTH: " + soccerball.health;

  soccerHPBarElement.style.width = `${soccerball.health}%`;
  soccerHPBarElement.style.height = "24px";
  soccerHPBarElement.style.backgroundColor = "green";
};

export const showMenu = () => {
  menu.style.visibility = "visible";
};

export const showMouseMoveHint = () => {
  mouseMoveHintElement.style.visibility = "visible";
};

export const hideMouseMoveHint = () => {
  mouseMoveHintElement.style.visibility = "hidden";
};

export const hideGamePlayElements = () => {
  footballHPContainerElement.style.visibility = "hidden";
  muteBtn.style.visibility = "hidden";
  pauseBtn.style.visibility = "hidden";
  soccerHPContainerElement.style.visibility = "hidden";
  mouseMoveHintElement.style.visibility = "hidden";
};

export const showGameOverScreen = endGameStats => {
  gameOverScreen.style.visibility = "visible";
  let accuracy = 0;
  if (endGameStats.shotsFired > 0) {
    accuracy = (endGameStats.shotsLanded / endGameStats.shotsFired) * 100;
  }

  statsScreen.innerHTML = `Game Over, you ${endGameStats.winOrLost}! ${
    endGameStats.shotsFired
  } shots fired,
  ${endGameStats.shotsLanded} shots landed, for a ${Math.floor(
    accuracy
  )}% accuracy`;
};

export const hideGameOverScreen = () => {
  gameOverScreen.style.visibility = "hidden";
};
