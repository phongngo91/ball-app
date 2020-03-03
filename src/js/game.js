import * as THREE from "./three";

import level_1 from "./level_1";
import { gameBall } from "./balls";
// import BallAI from "./Ball_AI";
// import { collision } from "./utils";
import "../styles/game.scss";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();

// let gameBallDirectionX;
// let gameBallDirectionY;
// let gameBallVelocity;

// let health;

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
gameContainer.appendChild(renderer.domElement);

function moveGameBallUp() {
  gameBall.position.x -= 0.1;
  gameBall.rotation.y += 0.1;
  gameBallVelocity -= 0.1;
}

function moveGameBallDown() {
  gameBall.position.x += 0.1;
  gameBall.rotation.y -= 0.1;
  gameBallVelocity -= 0.1;
}

function moveGameBallLeft() {
  gameBall.position.y -= 0.1;
  gameBall.rotation.x += 0.1;
  gameBallVelocity -= 0.1;
}

function moveGameBallRight() {
  gameBall.position.y += 0.1;
  gameBall.rotation.x -= 0.1;
  gameBallVelocity -= 0.1;
}

function restart() {

  health = 100;
  gameBallDirectionX = 0;
  gameBallDirectionY = 0;
  gameBallVelocity = 0;

  // const redBallModel = new BallAI(redBall);
  // const blueBallModel = new BallAI(blueBall);

  scene.add(level_1);
  scene.add(gameBall);
  // scene.add(redBall);
  // scene.add(blueBall);

  level_1.position.z = -1;

  camera.position.z = 23;

  camera.rotation.z = 90 * Math.PI / 180;

  gameBall.position.y = -20;

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
    } else if (keyCode === R_KEY) {
      scene.children.forEach(child => {
        scene.remove(child);
      });
      cancelAnimationFrame(renderId);
      restart();
    }

    renderer.render(scene, camera);
  });

  var animate = function() {
    renderId = requestAnimationFrame(animate);

    if (gameBall.position.y > 19){
      console.log("Game Over");
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
    // if (gameBall.position.x > 20 || gameBall.position.x < -20) {
    //   gameBallDirectionX = gameBallDirectionX * -1;
    // }

    // // if we are going out of bounds, reverse the direction
    // if (gameBall.position.y > 20 || gameBall.position.y < -20) {
    //   gameBallDirectionY = gameBallDirectionY * -1;
    // }

    // if (collision(blueBall, gameBall)) {
    //   blueBall.position.z += 1;
    //   health -= 10;
    // }

    // if (collision(gameBall, redBall)) {
    //   redBall.position.z += 1;
    //   health -= 10;
    // }

    // blueBallModel.updateMovement();
    // redBallModel.updateMovement();

    // rerenders the score of the gameBall
    const topNav = document.getElementById("top-nav");

    if (topNav) {
      if (topNav.children.length > 0) {
        topNav.removeChild(topNav.children[0]);
      }

      const healthText = document.createElement("div");
      healthText.innerHTML = health;

      if (health === 0) {
        cancelAnimationFrame(renderId);
        healthText.innerHTML = "You Lose, press r to reset";
      }
      topNav.appendChild(healthText);
    }
    render();
  };

  // const startButton = document.createElement("div");
  // startButton.classList.add("start-button");
  // startButton.innerHTML = "CLICK HERE TO START GAME";
  // gameContainer.appendChild(startButton);

  // startButton.addEventListener("click", () => {
  //   gameContainer.removeChild(
  //     document.getElementsByClassName("start-button")[0]
  //   );
  //   animate();
  // });

  function render() {
    renderer.autoClear = false;
    renderer.clear();
    renderer.render(scene, camera);
  }

  animate();
}

restart();

export default gameContainer;
