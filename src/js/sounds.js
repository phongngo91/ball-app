import { distance } from "./calculations";

//RANDOM ENEMY DAMAGE SOUNDS

const enemyOuch1 = document.createElement("audio");
enemyOuch1.src = "src/sounds/ouch.mp3";
enemyOuch1.volume = 0.3;
const enemyOuch2 = document.createElement("audio");
enemyOuch2.src = "src/sounds/enemy-ouch.mp3";
enemyOuch2.volume = 0.3;

const ENEMY_OUCHES = [enemyOuch1, enemyOuch2];

export const playEnemyOuchSound = (football, soccerball) => {
  const randEnemyOuch = ENEMY_OUCHES[Math.floor(Math.random() * ENEMY_OUCHES.length)];

  // If we are close, increase the volume
  if (distance(football, soccerball) < 1){
    randEnemyOuch.volume = distance(football, soccerball);
  } else {
    randEnemyOuch.volume = 0.5;
  }

  return randEnemyOuch.play();
};

// RANDOM PLAYER DAMAGE SOUNDS

const playerOuch1 = document.createElement("audio");
playerOuch1.src = "src/sounds/splat.wav";

const PLAYER_OUCHES = [playerOuch1];

export const playPlayerOuchSound = () => {
  return PLAYER_OUCHES[Math.floor(Math.random() * PLAYER_OUCHES.length)].play();
};

//MENU EFFECTS

const splat = document.createElement("audio");
splat.src = "src/sounds/splat.wav";

export const playSplatSound = () => {
  splat.play();
};

//LASER SOUNDS

// ENEMY LASER SOUND
const enemyPew1 = document.createElement("audio");
enemyPew1.src = "src/sounds/enemy-pew.mp3";
enemyPew1.volume = 0.3;

// enemyVolume laser sound depends on how far it is from you
export const playEnemyPewSound = (football, soccerball) => {

  if (distance(football, soccerball) < 1){
    enemyPew1.volume = distance(football, soccerball);
  } else {
    enemyPew1.volume = 0.3;
  }

  enemyPew1.play();
};

// PLAYER LASER SOUND
const playerPew1 = document.createElement("audio");
playerPew1.src = "src/sounds/pew-pew.wav";

export const playPlayerPewSound = () => {
  playerPew1.play();
};
