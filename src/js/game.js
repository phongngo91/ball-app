import * as THREE from "./three";
import { collision, boxCollision, laserCollision } from "./utils";
import level_1 from "./level_1";
import BallAI from "./Ball_AI";
import PizzaAI from "./Pizza_AI";
import BallHuman from "./Ball_Human";
import { blueBall, redBall, gameBall } from "./balls";
import { pizza } from "./pizza";
import { skybox } from "./skybox";
import playerLaser from "./player_laser";
import LaserAI from "./Laser_AI";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();

let gameBallDirectionX;
let gameBallDirectionY;
let gameBallVelocity;
let playerHealth;
let pizzaHealth;

let laserBank = [];

const redBallModel = new BallAI(redBall);
const blueBallModel = new BallAI(blueBall);
const pizzaModel = new PizzaAI(pizza);
const gameBallModel = new BallHuman(gameBall);

const SPACE_BAR = 32;
const LEFT_ARROW = 37;
const UP_ARROW = 38;
const RIGHT_ARROW = 39;
const DOWN_ARROW = 40;
const R_KEY = 82;
const VELOCITY_BASE = 40;
const E_KEY = 69;
let renderId;
const gameContainer = document.createElement("div");
const score = document.getElementById("score");
gameContainer.classList.add("game-container");
renderer.setSize(window.innerWidth * (6 / 10), window.innerHeight * (6 / 10));

function moveGameBallUp() {
  gameBall.position.y += 0.1;
  camera.position.y += 0.1;
  gameBall.rotation.x -= 0.1;
  gameBallVelocity -= 0.1;
}

function moveGameBallDown() {
  gameBall.position.y -= 0.1;
  camera.position.y -= 0.1;
  gameBall.rotation.x += 0.1;
  gameBallVelocity -= 0.1;
}

function moveGameBallLeft() {
  gameBall.position.x -= 0.1;
  camera.position.x -= 0.1;
  gameBall.rotation.y -= 0.1;
  gameBallVelocity -= 0.1;
}

function moveGameBallRight() {
  gameBall.position.x += 0.1;
  camera.position.x += 0.1;
  gameBall.rotation.y += 0.1;
  gameBallVelocity -= 0.1;
}

scene.add(level_1);
scene.add(skybox);
playerLaser.position.z = 2;

function setUp() {
  if (renderId) {
    cancelAnimationFrame(renderId);
  }
  animate();

  redBallModel.resetState();
  blueBallModel.resetState();
  pizzaModel.resetState();
  gameBallModel.resetState();

  playerHealth = 100;
  pizzaHealth = 10000;
  gameBallDirectionX = 0;
  gameBallDirectionY = 0;
  gameBallVelocity = 0;

  gameBall.position.y = -35;
  gameBall.position.x = 0;

  camera.position.x = 0;
  level_1.position.z = -1;
  camera.position.z = 5;
  camera.rotation.x = (90 * Math.PI) / 180;
  camera.position.y = -45;
  scene.background = new THREE.Color(0x00cccc);
}

function endGame() {
  scene.remove(gameBall);
  scene.remove(pizza);
  scene.remove(redBall);
  scene.remove(blueBall);
}

function resetGame() {
  scene.add(gameBall);
  scene.add(pizza);
  scene.add(redBall);
  scene.add(blueBall);

  setUp();
}

function knockCarRight() {
  pizzaModel.currentDirX = 0.2;
  pizzaModel.trajectoryBankX = 30;
  pizza.position.z += 2;
}

function knockCarLeft() {
  pizzaModel.currentDirX = -0.2;
  pizzaModel.trajectoryBankX = 30;
  pizza.position.z += 2;
}

function knockCarUp() {
  pizzaModel.currentDirY = 0.2;
  pizzaModel.trajectoryBankY = 30;
  pizza.position.z += 2;
}

function knockCarDown() {
  pizzaModel.currentDirY = -0.2;
  pizzaModel.trajectoryBankY = 30;
  pizza.position.z += 2;
}

document.addEventListener("keydown", e => {
  var keyCode = e.which;

  if (keyCode === DOWN_ARROW) {
    gameBallDirectionY = -20;
    gameBallVelocity = VELOCITY_BASE;
  } else if (keyCode === UP_ARROW) {
    gameBallDirectionY = 20;
    gameBallVelocity = VELOCITY_BASE;
  } else if (keyCode === RIGHT_ARROW) {
    gameBallDirectionX = 20;
    gameBallVelocity = VELOCITY_BASE;
  } else if (keyCode === LEFT_ARROW) {
    gameBallDirectionX = -20;
    gameBallVelocity = VELOCITY_BASE;
  } else if (keyCode === R_KEY) {
    resetGame();
  } else if (keyCode === E_KEY) {
    let duplicateLaser = playerLaser.clone();
    laserBank.push(new LaserAI(duplicateLaser, gameBall));
    scene.add(duplicateLaser);
  } else if (keyCode === SPACE_BAR) {
    gameBallModel.trajectoryBankZ = 4;
  }

  renderer.render(scene, camera);
});

const animate = function() {
  renderId = requestAnimationFrame(animate);

  if (gameBallVelocity > 0) {
    if (gameBallDirectionX > 0) {
      moveGameBallRight();
      if (gameBallDirectionY > 0) {
        moveGameBallUp();
      } else if (gameBallDirectionY < 0) {
        moveGameBallDown();
      }
    } else if (gameBallDirectionX < 0) {
      moveGameBallLeft();
      if (gameBallDirectionY > 0) {
        moveGameBallUp();
      } else if (gameBallDirectionY < 0) {
        moveGameBallDown();
      }
      // Don't move gameBall if already moving
    } else if (gameBallDirectionY > 0) {
      moveGameBallUp();
      if (gameBallDirectionX > 0) {
        moveGameBallRight();
      } else if (gameBallDirectionX < 0) {
        moveGameBallLeft();
      }
    } else if (gameBallDirectionY < -0) {
      moveGameBallDown();
      if (gameBallDirectionX > 0) {
        moveGameBallRight();
      } else if (gameBallDirectionX < 0) {
        moveGameBallLeft();
      }
    }
  } else {
    gameBallDirectionX = 0;
    gameBallDirectionY = 0;
  }

  // if we are going out of bounds, reverse the direction
  if (gameBall.position.x > 20 || gameBall.position.x < -20) {
    gameBallDirectionX = gameBallDirectionX * -1;
  }

  // // if we are going out of bounds, reverse the direction
  if (gameBall.position.y > 40 || gameBall.position.y < -40) {
    gameBallDirectionY = gameBallDirectionY * -1;
  }

  if (collision(blueBall, gameBall)) {
    blueBall.position.z += 1;
    playerHealth -= 10;
  }

  if (collision(gameBall, redBall)) {
    redBall.position.z += 1;
    playerHealth -= 10;
  }

  // Check if any of our lasers collide with the pizza
  // Each laser is our laser AI model, and each laserMesh is our randomly generated clone
  laserBank.forEach(laser =>{
    if (laserCollision(laser.laserMesh, pizza)){
      pizzaHealth -= 10;
    }
  });


  let hitBox = boxCollision(gameBall, pizza);
  switch (hitBox) {
    case "LEFT COLLISION":
      knockCarLeft();
      break;
    case "RIGHT COLLISION":
      knockCarRight();
      break;
    case "FRONT COLLISION":
      knockCarUp();
      break;
    case "BACK COLLISION":
      knockCarDown();
      break;
    default:
      break;
  }

  let redHitBox = boxCollision(redBall, pizza);
  switch (redHitBox) {
    case "LEFT COLLISION":
      knockCarLeft();
      break;
    case "RIGHT COLLISION":
      knockCarRight();
      break;
    case "FRONT COLLISION":
      knockCarUp();
      break;
    case "BACK COLLISION":
      knockCarDown();
      break;
    default:
      break;
  }

  let blueHitBox = boxCollision(blueBall, pizza);
  switch (blueHitBox) {
    case "LEFT COLLISION":
      knockCarLeft();
      break;
    case "RIGHT COLLISION":
      knockCarRight();
      break;
    case "FRONT COLLISION":
      knockCarUp();
      break;
    case "BACK COLLISION":
      knockCarDown();
      break;
    default:
      break;
  }

  blueBallModel.updateMovement();
  redBallModel.updateMovement();
  pizzaModel.updateMovement();
  gameBallModel.updateMovement();

  let newLaserBank = [];

  laserBank.forEach(laser => {
    if (laser.velocity > 0) {
      newLaserBank.push(laser);
    } else {
      // take out laser from scene if it is out of velocity
      scene.remove(laser.laserMesh);
    }
  });

  // filter the laser bank
  laserBank = newLaserBank;

  // moves lasers
  laserBank.forEach(laser => {
    laser.updateMovement();
  });

  // Clears the top nav
  while (score.children.length > 0) {
    score.removeChild(score.children[0]);
  }

  const playerHealthText = document.createElement("div");
  const pizzaHealthText = document.createElement("div");

  playerHealthText.innerHTML = "Player: " + playerHealth;
  pizzaHealthText.innerHTML = "Pizza: " + pizzaHealth;

  if (playerHealth <= 0) {
    cancelAnimationFrame(renderId);
    playerHealthText.innerHTML =
      "playerHealth gone, You Lose, Press R to restart";
  }

  score.appendChild(playerHealthText);
  score.appendChild(pizzaHealthText);

  renderer.render(scene, camera);
};

document.getElementById("red-bg").addEventListener("click", () => {
  scene.background = new THREE.Color(0xff0000);
});
document.getElementById("cyan-bg").addEventListener("click", () => {
  scene.background = new THREE.Color(0x00cccc);
});
document.getElementById("green-bg").addEventListener("click", () => {
  scene.background = new THREE.Color(0x008000);
});
document.getElementById("gray-bg").addEventListener("click", () => {
  scene.background = new THREE.Color(0x808080);
});

resetGame();

document.getElementById("content-container").appendChild(renderer.domElement);
