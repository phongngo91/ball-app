import * as THREE from "./three";
import { collision, boxCollision } from "./utils";
import level_1 from "./level_1";
import BallAI from "./Ball_AI";
import CarAI from "./Car_AI";
import BallHuman from "./Ball_Human";
import { blueBall, redBall, gameBall } from "./balls";
import { car } from "./car";
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
let health;

let laserBank = [];

const redBallModel = new BallAI(redBall);
const blueBallModel = new BallAI(blueBall);
const carModel = new CarAI(car);
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
const topNav = document.getElementById("top-nav");
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
scene.add(playerLaser);
playerLaser.position.z = 2;

function setUp() {
  if (renderId) {
    cancelAnimationFrame(renderId);
  }
  animate();

  redBallModel.resetState();
  blueBallModel.resetState();
  carModel.resetState();
  gameBallModel.resetState();

  health = 100;
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
  scene.remove(car);
  scene.remove(redBall);
  scene.remove(blueBall);
}

function resetGame() {
  scene.add(gameBall);
  scene.add(car);
  scene.add(redBall);
  scene.add(blueBall);

  setUp();
}

function knockCarRight() {
  carModel.currentDirX = 0.2;
  carModel.trajectoryBankX = 30;
  car.position.z += 2;
}

function knockCarLeft() {
  carModel.currentDirX = -0.2;
  carModel.trajectoryBankX = 30;
  car.position.z += 2;
}

function knockCarUp() {
  carModel.currentDirY = 0.2;
  carModel.trajectoryBankY = 30;
  car.position.z += 2;
}

function knockCarDown() {
  carModel.currentDirY = -0.2;
  carModel.trajectoryBankY = 30;
  car.position.z += 2;
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
    laserBank.push(new LaserAI(playerLaser, gameBall));
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
    health -= 10;
  }

  if (collision(gameBall, redBall)) {
    redBall.position.z += 1;
    health -= 10;
  }

  let hitBox = boxCollision(gameBall, car);
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

  let redHitBox = boxCollision(redBall, car);
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

  let blueHitBox = boxCollision(blueBall, car);
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
  carModel.updateMovement();
  gameBallModel.updateMovement();

  let newLaserBank = [];

  laserBank.forEach(laser =>{
    if (laser.velocity > 0){
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
  if (topNav) {
    if (topNav.children.length > 0) {
      topNav.removeChild(topNav.children[0]);
    }

    const healthText = document.createElement("div");
    healthText.innerHTML = "Health: " + health;

    if (health <= 0) {
      cancelAnimationFrame(renderId);
      healthText.innerHTML = "Health gone, You Lose, Press R to restart";
    }
    topNav.appendChild(healthText);
  }
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
