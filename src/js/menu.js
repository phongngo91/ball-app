import { playSplatSound } from "./sounds";

const menu = document.getElementById("main-menu");
const soccerHealthElement = document.getElementById("soccerHealth");
const bossHPElement = document.getElementById("bossHP");
const playerHPElement = document.getElementById("playerHP");
const footballHealthElement = document.getElementById("footballHealth");
const mouseMoveHintElement = document.getElementById("mouse-move-hint");
const pauseBtn = document.getElementById("pause");
const muteBtn = document.getElementById("mute");
const playWithMouseElement = document.getElementById("mouse-controller");
const playWithKeyboardElement = document.getElementById("keyboard-controller");
const gameOverScreen = document.getElementById("game-over-screen");

playWithKeyboardElement.addEventListener("mouseover", () => {
  playSplatSound();
});

playWithMouseElement.addEventListener("mouseover", () => {
  playSplatSound();
});

export const hideMenu = () => {
  menu.style.visibility = "hidden";
};

export const hideEverything = () => {
  menu.style.visibility = "hidden";
  soccerHealthElement.style.visibility = "hidden";
  footballHealthElement.style.visibility = "hidden";
  mouseMoveHintElement.style.visibility = "hidden";
  pauseBtn.style.visibility = "hidden";
  muteBtn.style.visibility = "hidden";
  gameOverScreen.style.visibility = "hidden";
};

export const addMuteBtn = mute => {
  muteBtn.addEventListener("click", () => {
    if (mute === true) {
      mute = false;
      muteBtn.innerHTML = "Mute";
    } else {
      mute = true;
      muteBtn.innerHTML = "UnMute";
    }
  });
};

export const addPauseBtn = runGame => {
  pauseBtn.addEventListener("click", () => {
    if (runGame === true) {
      runGame = false;
      pauseBtn.innerHTML = "UnPause";
    } else {
      runGame = true;
      pauseBtn.innerHTML = "Pause";
    }
  });
};

export const showDuringGamePlayElements = () => {
  soccerHealthElement.style.visibility = "visible";
  footballHealthElement.style.visibility = "visible";
  muteBtn.style.visibility = "visible";
  pauseBtn.style.visibility = "visible";
  mouseMoveHintElement.style.visibility = "visible";
};

export const updateFootballHealth = football => {
  bossHPElement.innerHTML = "FOOTBALL HEALTH: " + football.health;
  bossHPElement.style.width = `${football.health / 3}%`;
  bossHPElement.style.height = "24px";
  bossHPElement.style.backgroundColor = "red";
};

export const updateSoccerballHealth = soccerball => {
  playerHPElement.innerHTML = "SOCCER HEALTH: " + soccerball.health;
  playerHPElement.style.width = `${soccerball.health}%`;
  playerHPElement.style.height = "24px";
  playerHPElement.style.backgroundColor = "green";
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

export const showWinScreen = () => {
  bossHPElement.innerHTML = "GAME OVER, YOU WIN!!!";
  bossHPElement.style.width = "0%";
};

export const showLoseScreen = () => {
  bossHPElement.innerHTML = "GAME OVER, YOU LOSE!!!";
};

export const hideGamePlayElements = () => {
  footballHealthElement.style.visibility = "hidden";
  muteBtn.style.visibility = "hidden";
  pauseBtn.style.visibility = "hidden";
  soccerHealthElement.style.visibility = "hidden";
  mouseMoveHintElement.style.visibility = "hidden";
};

export const showGameOverScreen = () =>{
  gameOverScreen.style.visibility = "visible";
};

export const hideGameOverScreen = () =>{
  gameOverScreen.style.visibility = "hidden";
};