//RANDOM ENEMY DAMAGE SOUNDS

const enemyOuch1 = document.createElement("audio");
enemyOuch1.src = "src/sounds/ouch.mp3";
const enemyOuch2 = document.createElement("audio");
enemyOuch2.src = "src/sounds/enemy-ouch.mp3";

const ENEMY_OUCHES = [enemyOuch1, enemyOuch2];

export const playEnemyOuchSound = () => {
  return ENEMY_OUCHES[Math.floor(Math.random() * ENEMY_OUCHES.length)].play();
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

  // enemy firing laser, when soccer is in front of football
  //avoids division by zero exception
  if (football.mesh.position.y > soccerball.mesh.position.y && football.mesh.position.y !== 0){
    enemyPew1.vol = soccerball.mesh.position.y / football.mesh.position.y;
  }

  enemyPew1.play();
};

// PLAYER LASER SOUND
const playerPew1 = document.createElement("audio");
playerPew1.src = "src/sounds/pew-pew.wav";

export const playPlayerPewSound = () => {
  playerPew1.play();
};
