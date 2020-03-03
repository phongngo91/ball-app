import level_1 from "./level_1";
import gameBall from "./game_ball";
import "../styles/game.scss";
import ball from "./game_ball";
import { blueBall, redBall } from "./balls";

const randx = [0.3, 0.2, 0.1, 0.001, -0.1, -0.2, -0.3];
const randy = [0.3, 0.2, 0.1, 0.001, -0.1, -0.2, -0.3];

// Yellow NPC Ball
let yellowTrajectoryBankX = 0;
let yellowTrajectoryBankY = 0;
let yellowCurrentDirX = 0;
let yellowCurrentDirY = 0;

// Blue NPC Ball
let blueTrajectoryBankX = 0;
let blueTrajectoryBankY = 0;
let blueCurrentDirX = 0;
let blueCurrentDirY = 0;

// Game Ball
let gameBallVelocity = 0;
let gameBallDirectionX = 0;
let gameBallDirectionY = 0;

const moveSpeed = 0.9;

let health;

const LEFT_ARROW = 37;
const UP_ARROW = 38;
const RIGHT_ARROW = 39;
const DOWN_ARROW = 40;
const R_KEY = 82;

let renderId;

const gameContainer = document.createElement("div");
gameContainer.classList.add("game-container");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth * (6 / 10), window.innerHeight * (6 / 10));
gameContainer.appendChild(renderer.domElement);

function moveGameBallUp() {
  gameBall.position.y += 0.1;
  camera.position.y += 0.1;
  gameBall.rotation.x -= 0.1;
  gameBallDirectionY -= 0.1;
  gameBallVelocity -= 0.1;
}

function moveGameBallDown() {
  gameBall.position.y -= 0.1;
  camera.position.y -= 0.1;
  gameBall.rotation.x += 0.1;
  gameBallDirectionY += 0.1;
  gameBallVelocity -= 0.1;
}

function moveGameBallLeft() {
  gameBall.position.x -= 0.1;
  camera.position.x -= 0.1;
  gameBall.rotation.y += 0.1;
  gameBallDirectionX += 0.1;
  gameBallVelocity -= 0.1;
}

function moveGameBallRight() {
  gameBall.position.x += 0.1;
  camera.position.x += 0.1;
  gameBall.rotation.y -= 0.1;
  gameBallDirectionX -= 0.1;
  gameBallVelocity -= 0.1;
}

function restart() {
  health = 100;

  scene.add(level_1);
  scene.add(gameBall);
  scene.add(redBall);
  scene.add(blueBall);

  blueBall.position.x = -2;
  blueBall.position.y = 5;
  redBall.position.x = 2;
  redBall.position.y = 5;

  level_1.position.z = -1;

  camera.position.z = 6;
  camera.rotation.x = (55 * Math.PI) / 180;
  camera.position.y = -20;
  gameBall.position.y = -15;

  document.addEventListener("keydown", e => {
    var keyCode = e.which;

    if (keyCode == DOWN_ARROW) {
      gameBallDirectionY = -30;
      gameBallVelocity = +30;
    } else if (keyCode == UP_ARROW) {
      gameBallDirectionY = 30;
      gameBallVelocity = +30;
    } else if (keyCode == RIGHT_ARROW) {
      // gameBall.rotation.y -= moveSpeed;
      // gameBall.position.x += moveSpeed;
      // camera.position.x += moveSpeed;
      gameBallDirectionX = 30;
      gameBallVelocity = +30;
    } else if (keyCode == LEFT_ARROW) {
      // gameBall.rotation.y += moveSpeed;
      // gameBall.position.x -= moveSpeed;
      // camera.position.x -= moveSpeed;
      gameBallDirectionX = -30;
      gameBallVelocity = +30;
    } else if (keyCode == R_KEY) {
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
        // Don't run direction X if direction Y already ran
      } else if (gameBallDirectionY > 0) {
        moveGameBallUp();
        if (gameBallDirectionX > 0) {
          moveGameBallRight();
        } else if (gameBallDirectionX < 0) {
          moveGameBallLeft();
        }
      } else if (gameBallDirectionY < 0) {
        moveGameBallDown();
        if (gameBallDirectionX > 0) {
          moveGameBallRight();
        } else if (gameBallDirectionX < 0) {
          moveGameBallLeft();
        }
      }
    } else {
      // if ball has no velocity, reset it's directions
      gameBallDirectionX = 0;
      gameBallDirectionY = 0;
    }

    if (
      Math.floor(blueBall.position.x * 100) / 100 ===
        Math.floor(ball.position.x * 100) / 100 ||
      Math.floor(blueBall.position.y * 100) / 100 ===
        Math.floor(ball.position.y * 100) / 100
    ) {
      scene.remove(blueBall);
      health -= 20;
    }

    if (
      Math.floor(redBall.position.x * 10) / 10 ===
        Math.floor(ball.position.x * 10) / 10 ||
      Math.floor(redBall.position.y * 10) / 10 ===
        Math.floor(ball.position.y * 10) / 10
    ) {
      scene.remove(redBall);
      health -= 20;
    }

    //Rotations
    blueBall.rotation.x += 0.1;
    blueBall.rotation.y += 0.1;

    redBall.rotation.x -= 0.1;
    redBall.rotation.y -= 0.1;

    // YELLOW BALL Y
    if (yellowTrajectoryBankY === 0) {
      yellowTrajectoryBankY = 30;
      yellowCurrentDirY = randy[Math.floor(Math.random() * randy.length)];
    } else {
      redBall.position.y += yellowCurrentDirY;

      if (redBall.position.y > 20 || redBall.position.y < -20) {
        yellowCurrentDirY = yellowCurrentDirY * -1;
      }

      yellowTrajectoryBankY -= 1;
    }

    // YELLOW BALL X
    if (yellowTrajectoryBankX === 0) {
      yellowTrajectoryBankX = 30;
      yellowCurrentDirX = randx[Math.floor(Math.random() * randx.length)];
    } else {
      redBall.position.x += yellowCurrentDirX;

      // if it is going out of bounds, flip the direction
      if (redBall.position.x > 20 || redBall.position.x < -20) {
        yellowCurrentDirX = yellowCurrentDirX * -1;
      }

      yellowTrajectoryBankX -= 1;
    }

    // BLUE BALL Y
    if (blueTrajectoryBankY === 0) {
      blueTrajectoryBankY = 30;
      blueCurrentDirY = randy[Math.floor(Math.random() * randy.length)];
    } else {
      blueBall.position.y += blueCurrentDirY;

      if (blueBall.position.y > 20 || blueBall.position.y < -20) {
        blueCurrentDirY = blueCurrentDirY * -1;
      }

      blueTrajectoryBankY -= 1;
    }

    // BLUE BALL X

    if (blueTrajectoryBankX === 0) {
      blueTrajectoryBankX = 30;
      blueCurrentDirX = randx[Math.floor(Math.random() * randx.length)];
    } else {
      blueBall.position.x += blueCurrentDirX;

      // if it is going out of bounds, flip the direction
      if (blueBall.position.x > 20 || blueBall.position.x < -20) {
        blueCurrentDirX = blueCurrentDirX * -1;
      }

      blueTrajectoryBankX -= 1;
    }

    // rerenders the health of the ball
    const topNav = document.getElementById("top-nav");

    if (topNav) {
      if (topNav.children.length > 0) {
        topNav.removeChild(topNav.children[0]);
      }

      const healthText = document.createElement("div");
      healthText.innerHTML = health;
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
