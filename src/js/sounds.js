const enemyOuch1 = document.createElement("audio");
enemyOuch1.src = "/src/sounds/ouch.mp3";
const enemyOuch2 = document.createElement("audio");
enemyOuch2.src = "/src/sounds/enemy-ouch.mp3";

const ENEMY_OUCHES = [enemyOuch1, enemyOuch2];

export const enemyOuch = () => {
  return ENEMY_OUCHES[Math.floor(Math.random() * ENEMY_OUCHES.length)].play();
};
