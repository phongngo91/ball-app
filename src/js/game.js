import "../styles/game.scss";
import * as THREE from "./three";
import { Soccerball } from "./soccerball";
import { Football } from "./football";
import { setup } from "./setup";
import { 
  playEnemyOuchSound, 
  playPlayerOuchSound, 
  playEnemyPewSound, 
  playPlayerPewSound } from "./sounds";
import {
  hideMenu,
  showMenu,
  addPauseBtn,
  addMuteBtn,
  showDuringGamePlayElements,
  updateFootballHealth,
  updateSoccerballHealth,
  showMouseMoveHint,
  hideMouseMoveHint,
  showWinScreen,
  showLoseScreen,
  hideGamePlayElements,
  hideGameOverScreen,
  showGameOverScreen,
  hideEverything
} from "./menu";

const E_KEY = 69;
const playWithMouseElement = document.getElementById("mouse-controller");
const playWithKeyboardElement = document.getElementById("keyboard-controller");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
const soccerball = new Soccerball(camera);
const football = new Football();

let runGame = false;
let mute = false;
let refreshTimer = 0;
let laserBank = [];
let footballShootFreq = 1;

renderer.setSize(window.innerWidth, window.innerHeight);
setup(scene);
addMuteBtn(mute);
addPauseBtn(runGame);
hideEverything();

function gameOver() {
  runGame = false;
  footballShootFreq = 0;

  scene.remove(soccerball.mesh);
  scene.remove(football.mesh);

  laserBank.forEach(laser => {
    scene.remove(laser.mesh);
  });
  laserBank = [];

  hideGamePlayElements();
}

function resetGame() {
  runGame = true;
  refreshTimer = 0;
  footballShootFreq = 1;

  soccerball.reset();
  football.reset();

  scene.add(soccerball.mesh);
  scene.add(football.mesh);

  showDuringGamePlayElements();
  updateFootballHealth(football);
  updateSoccerballHealth(soccerball);
}

function animate() {
  requestAnimationFrame(animate);
  if (runGame === true) {
    refreshTimer += 1;
    footballShootFreq += 0.1;

    if (refreshTimer > 240) {
      renderer.setSize(window.innerWidth, window.innerHeight);
      refreshTimer = 0;
    }

    if (footballShootFreq > 4) {
      let laser = football.shoot();
      laserBank.push(laser);
      scene.add(laser.mesh);
      footballShootFreq = 0;
      if (!mute) {
        playEnemyPewSound(football, soccerball);
      }
    }

    let newLaserBank = [];
    laserBank.forEach(laser => {
      if (laser.velocity > 0) {
        newLaserBank.push(laser);
      } else {
        scene.remove(laser.mesh);
      }
    });

    soccerball.update();
    football.update();
    laserBank.forEach(laser => {
      if (football.collide(laser)) {
        scene.remove(laser.mesh);
        soccerball.incrementShotsLanded();
        laserBank.splice(laserBank.indexOf(laser), 1);
        if (!mute) {
          playEnemyOuchSound();
        }
      }
      if (soccerball.collide(laser)) {
        scene.remove(laser.mesh);
        laserBank.splice(laserBank.indexOf(laser), 1);
        if (!mute) {
          playPlayerOuchSound();
        }
      }
      laser.update();
    });

    if (football.health === 0) {
      gameOver();
      // showWinScreen();
      // showMenu();
      const endGameStats = {
        shotsFired: soccerball.shotsFired,
        shotsLanded: soccerball.shotsLanded,
        winOrLost: "Win!"
      };
      showGameOverScreen(endGameStats);
      showMenu();
    } else {
      updateFootballHealth(football);
    }

    if (soccerball.health === 0) {
      gameOver();
      // showLoseScreen();
      // showMenu();
      showGameOverScreen();
    } else {
      updateSoccerballHealth(soccerball);
    }
  }

  renderer.render(scene, camera);
}

animate();
document.body.appendChild(renderer.domElement);

const mouseController = soccerball.mouseController();
const mouseShoot = () => {
  if (runGame) {
    let laser = soccerball.shoot();
    laserBank.push(laser);
    scene.add(laser.mesh);
    if (!mute) {
      playPlayerPewSound();
    }
  }
};

const keyboardController = soccerball.keyboardController();
document.addEventListener("keydown", soccerball.spacebarJump());
const keyboardShoot = e => {
  if (runGame && e.which === E_KEY) {
    let laser = soccerball.shoot();
    laserBank.push(laser);
    scene.add(laser.mesh);
    if (!mute) {
      playPlayerPewSound();
    }
  }
};

playWithMouseElement.addEventListener("click", () => {
  // Removes keyboard controllers
  document.removeEventListener("keydown", keyboardController);
  document.removeEventListener("keydown", keyboardShoot);

  // Adds mouse controllers
  document.addEventListener("mousemove", mouseController);
  document.addEventListener("click", mouseShoot);

  resetGame();
  hideMenu();
  showMouseMoveHint();
});

playWithKeyboardElement.addEventListener("click", () => {
  // Removes mouse controllers
  document.removeEventListener("mousemove", mouseController);
  document.removeEventListener("click", mouseShoot);

  // Add keyboard controllers
  document.addEventListener("keydown", keyboardController);
  document.addEventListener("keydown", keyboardShoot);
  resetGame();
  hideMenu();
  hideMouseMoveHint();
});

// FOR TESTING THE END GAME MENU TODO: REMOVE THIS
// showGameOverScreen();
showMenu();