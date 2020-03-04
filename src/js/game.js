import * as THREE from "./three";
import { collision, boxCollision } from "./utils";

import level_1 from "./level_1";
import BallAI from "./Ball_AI";
import CarAI from "./Car_AI";
import { blueBall, redBall, gameBall } from "./balls";
import { car } from "./car";
import { skybox } from "./skybox";

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

const SPACE_BAR = 32;
const LEFT_ARROW = 37;
const UP_ARROW = 38;
const RIGHT_ARROW = 39;
const DOWN_ARROW = 40;
const R_KEY = 82;

const VELOCITY_BASE = 40;

let renderId;

const gameContainer = document.createElement("div");
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

health = 100;
gameBallDirectionX = 0;
gameBallDirectionY = 0;
gameBallVelocity = 0;

const redBallModel = new BallAI(redBall);
const blueBallModel = new BallAI(blueBall);
const carModel = new CarAI(car);

scene.add(level_1);
scene.add(gameBall);
scene.add(redBall);
scene.add(blueBall);
scene.add(car);
scene.add(skybox);

level_1.position.z = -1;

camera.position.z = 10;

camera.rotation.x = (65 * Math.PI) / 180;

gameBall.position.y = -35;
camera.position.y = -43;

gameBall.position.x = 0;
camera.position.x = 0;

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
  } else if (keyCode === SPACE_BAR) {
    gameBallDirectionY = 0;
    gameBallDirectionX = 0;
  }

  renderer.render(scene, camera);
});

var animate = function() {
  renderId = requestAnimationFrame(animate);

  if (Math.round(car.position.y) === 40) {
    cancelAnimationFrame(renderId);
    document.getElementById("top-nav").innerHTML = "YOU WIN!!!!!";
  }

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
      } else if (gameBallDirectionX < -0) {
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
      carModel.currentDirX = -0.2;
      carModel.trajectoryBankX = 30;
      car.position.z += 2;
      break;
    case "RIGHT COLLISION":
      carModel.currentDirX = 0.2;
      carModel.trajectoryBankX = 30;
      car.position.z += 2;
      break;
    case "FRONT COLLISION":
      carModel.currentDirY = +0.2;
      carModel.trajectoryBankY = 30;
      car.position.z += 2;
      break;
    case "BACK COLLISION":
      carModel.currentDirY = -0.2;
      carModel.trajectoryBankY = 30;
      car.position.z += 2;
      break;
    default:
      break;
  }

  let redHitBox = boxCollision(redBall, car);
  switch (redHitBox) {
    case "LEFT COLLISION":
      // car.position.x -= 5;
      carModel.currentDirX = -0.2;
      carModel.trajectoryBankX = 30;
      car.position.z += 4;
      break;
    case "RIGHT COLLISION":
      // car.position.x += 5;
      carModel.currentDirX = 0.2;
      carModel.trajectoryBankX = 30;
      car.position.z += 4;
      break;
    case "FRONT COLLISION":
      // car.position.y -= 5;
      carModel.currentDirY = -0.2;
      carModel.trajectoryBankY = 30;
      car.position.z += 4;
      break;
    case "BACK COLLISION":
      // car.position.y += 5;
      carModel.currentDirY = 0.2;
      carModel.trajectoryBankY = 30;
      car.position.z += 4;
      break;
    default:
      break;
  }

  let blueHitBox = boxCollision(blueBall, car);
  switch (blueHitBox) {
    case "LEFT COLLISION":
      // car.position.x -= 5;
      carModel.currentDirX = -0.2;
      carModel.trajectoryBankX = 30;
      car.position.z += 4;
      break;
    case "RIGHT COLLISION":
      // car.position.x += 5;
      carModel.currentDirX = 0.2;
      carModel.trajectoryBankX = 30;
      car.position.z += 4;
      break;
    case "FRONT COLLISION":
      // car.position.y -= 5;
      carModel.currentDirY = -0.2;
      carModel.trajectoryBankY = 30;
      car.position.z += 4;
      break;
    case "BACK COLLISION":
      // car.position.y += 5;
      carModel.currentDirY = 0.2;
      carModel.trajectoryBankY = 30;
      car.position.z += 4;
      break;
    default:
      break;
  }


  blueBallModel.updateMovement();
  redBallModel.updateMovement();
  carModel.updateMovement();

  // rerenders the score of the gameBall
  const topNav = document.getElementById("top-nav");

  if (topNav) {
    if (topNav.children.length > 0) {
      topNav.removeChild(topNav.children[0]);
    }

    const healthText = document.createElement("div");
    healthText.innerHTML = "Health: " + health;

    if (health === 0) {
      cancelAnimationFrame(renderId);
      healthText.innerHTML = "Health gone, You Lose";
    }
    topNav.appendChild(healthText);
  }
  render();
};

function render() {
  renderer.autoClear = false;
  renderer.clear();
  renderer.render(scene, camera);
}

animate();

document.getElementById("content-container").appendChild(renderer.domElement);
