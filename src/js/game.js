import level_1 from "./level_1";
import { blueBall, redBall, gameBall } from "./balls";
import BallAI from "./Ball_AI";
import { collision } from "./utils";
import "../styles/game.scss";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();

const DIR_X = [0.3, 0.2, 0.1, 0, -0.1, -0.2, -0.3];
const DIR_Y = [0.3, 0.2, 0.1, 0, -0.1, -0.2, -0.3];

// Yellow NPC Ball
// let yellowTrajectoryBankX = 0;
// let yellowTrajectoryBankY = 0;
// let yellowCurrentDirX = 0;
// let yellowCurrentDirY = 0;

// Blue NPC Ball
let blueTrajectoryBankX = 0;
let blueTrajectoryBankY = 0;
let blueCurrentDirX = 0;
let blueCurrentDirY = 0;

// Game Ball
let gameBallDirectionX = 0;
let gameBallDirectionY = 0;
let gameBallVelocity = 0;

let score;

const SPACE_BAR = 32;
const LEFT_ARROW = 37;
const UP_ARROW = 38;
const RIGHT_ARROW = 39;
const DOWN_ARROW = 40;
const R_KEY = 82;

const VELOCITY_BASE = 40;

let renderId;

// let spawnCounter = 0;

const gameContainer = document.createElement("div");
gameContainer.classList.add("game-container");

renderer.setSize(window.innerWidth * (6 / 10), window.innerHeight * (6 / 10));
gameContainer.appendChild(renderer.domElement);

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

function restart() {
  score = 100;

  const redBallModel = new BallAI(redBall);

  scene.add(level_1);
  scene.add(gameBall);
  scene.add(redBallModel.ballMesh);
  scene.add(blueBall);

  blueBall.position.x = -2;
  blueBall.position.y = 5;
  // redBall.position.x = 2;
  // redBall.position.y = 5;

  level_1.position.z = -1;

  camera.position.z = 6;
  camera.rotation.x = (55 * Math.PI) / 180;
  camera.position.y = -20;
  gameBall.position.y = -15;

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

    // if (
    //   scene.children.includes(redBall) === false ||
    //   scene.children.includes(blueBall) === false
    // ) {
      // spawnCounter += 1;
    // }

    // if (spawnCounter > 600) {
    //   spawnCounter = 0;

    //   if (scene.children.includes(redBall) === false) {
    //     scene.add(redBall);
    //     redBall.position.x = Math.random() * 10;
    //     redBall.position.y = Math.random() * 10;
    //     redBall.position.z = 0;
    //   }

    //   if (scene.children.includes(blueBall) === false) {
    //     scene.add(blueBall);
    //     blueBall.position.y = Math.random() * 10;
    //     blueBall.position.x = Math.random() * 10;
    //     blueBall.position.z = 0;
    //   }
    // }

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

    // if we are going out of bounds, reverse the direction
    if (gameBall.position.y > 20 || gameBall.position.y < -20) {
      gameBallDirectionY = gameBallDirectionY * -1;
    }

    if (blueBall) {
      if (collision(blueBall, gameBall)) {
        scene.remove(blueBall);
        blueBall.position.z = 1;
        score += 10;
      }
    }

    if (redBall) {
      if (collision(gameBall, redBall)) {
        scene.remove(redBall);
        redBall.position.z = 1;
        score += 10;
      }
    }

    //Rotations
    blueBall.rotation.x += 0.1;
    blueBall.rotation.y += 0.1;

    // redBall.rotation.x -= 0.1;
    // redBall.rotation.y -= 0.1;

    // YELLOW BALL Y
    // if (yellowTrajectoryBankY === 0) {
    //   yellowTrajectoryBankY = 120;
    //   yellowCurrentDirY = DIR_Y[Math.floor(Math.random() * DIR_Y.length)];
    // } else {
    //   redBall.position.y += yellowCurrentDirY;

    //   if (redBall.position.y > 20 || redBall.position.y < -20) {
    //     yellowCurrentDirY = yellowCurrentDirY * -1;
    //   }

    //   yellowTrajectoryBankY -= 1;
    // }

    // // YELLOW BALL X
    // if (yellowTrajectoryBankX === 0) {
    //   yellowTrajectoryBankX = 120;
    //   yellowCurrentDirX = DIR_X[Math.floor(Math.random() * DIR_X.length)];
    // } else {
    //   redBall.position.x += yellowCurrentDirX;

    //   // if it is going out of bounds, flip the direction
    //   if (redBall.position.x > 20 || redBall.position.x < -20) {
    //     yellowCurrentDirX = yellowCurrentDirX * -1;
    //   }

    //   yellowTrajectoryBankX -= 1;
    // }
    redBallModel.updateMovement();

    // BLUE BALL Y
    if (blueTrajectoryBankY === 0) {
      blueTrajectoryBankY = 120;
      blueCurrentDirY = DIR_Y[Math.floor(Math.random() * DIR_Y.length)];
    } else {
      blueBall.position.y += blueCurrentDirY;

      if (blueBall.position.y > 20 || blueBall.position.y < -20) {
        blueCurrentDirY = blueCurrentDirY * -1;
      }

      blueTrajectoryBankY -= 1;
    }

    // BLUE BALL X

    if (blueTrajectoryBankX === 0) {
      blueTrajectoryBankX = 120;
      blueCurrentDirX = DIR_X[Math.floor(Math.random() * DIR_X.length)];
    } else {
      blueBall.position.x += blueCurrentDirX;

      // if it is going out of bounds, flip the direction
      if (blueBall.position.x > 20 || blueBall.position.x < -20) {
        blueCurrentDirX = blueCurrentDirX * -1;
      }

      blueTrajectoryBankX -= 1;
    }

    // rerenders the score of the gameBall
    const topNav = document.getElementById("top-nav");

    if (topNav) {
      if (topNav.children.length > 0) {
        topNav.removeChild(topNav.children[0]);
      }

      const healthText = document.createElement("div");
      healthText.innerHTML = score;
      topNav.appendChild(healthText);
    }
    render();
  };

  animate();

  function render() {
    renderer.autoClear = false;
    renderer.clear();
    renderer.render(scene, camera);
  }
}

restart();

export default gameContainer;
