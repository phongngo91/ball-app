import "../styles/game.scss";
import { startInstructionsOn, gameOverInstructionsOn, clearInstructions } from "./instructions";
import * as THREE from "./three";
import { Soccerball } from "./Soccerball";
import { Football } from "./Football";
import { setup } from "./setup";
import { enemyOuch } from "./sounds";

const soccerHealthElement = document.getElementById("soccerHealth");
soccerHealthElement.style.visibility = "hidden";
const bossHPElement = document.getElementById("bossHP");
const playerHPElement = document.getElementById("playerHP");
const footballHealthElement = document.getElementById("footballHealth");
footballHealthElement.style.visibility = "hidden";
const controlsElement = document.getElementById("controls");
controlsElement.style.visibility = "hidden";
const instructionsElement = document.getElementById("instructions");
const pewPew = document.getElementById("pew-pew");
const enemyPew = document.getElementById("enemy-pew");
enemyPew.volume = 0.3;
const E_KEY = 69;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const soccerball = new Soccerball(camera);
const football = new Football();

let refreshTimer = 0;
let runGame = false;
let laserBank = [];
let footballShootFreq = 1;
let mute = false;

// KEYBOARD ONLY
document.addEventListener("keydown", soccerball.keyboardController());
document.addEventListener("keydown", e => {
  const keyCode = e.which;
  if (keyCode === E_KEY) {
    let laser = soccerball.shoot();
    laserBank.push(laser);
    scene.add(laser.mesh);

    if (!mute) {
      pewPew.play();
    }
  }
});

const muteBtn = document.getElementById("mute");
muteBtn.style.visibility = "hidden";
muteBtn.addEventListener("click", () => {
  if (mute === true) {
    mute = false;
    muteBtn.innerHTML = "Mute";
  } else {
    mute = true;
    muteBtn.innerHTML = "UnMute";
  }
});

const pauseBtn = document.getElementById("pause");
pauseBtn.style.visibility = "hidden";
pauseBtn.addEventListener("click", () => {
  if (runGame === true) {
    runGame = false;
    pauseBtn.innerHTML = "UnPause";
  } else {
    runGame = true;
    pauseBtn.innerHTML = "Pause";
  }
});


// MOUSE AND KEYBOARD
document.addEventListener("mousemove", soccerball.mouseController());
document.addEventListener("click", e => {
  e.preventDefault();
  if (runGame){
    let laser = soccerball.shoot();
    laserBank.push(laser);
    scene.add(laser.mesh);
    if (!mute) {
      pewPew.play();
    }
  }
});

setup(scene);

function gameOver() {
  runGame = false;
  scene.remove(soccerball.mesh);
  scene.remove(football.mesh);
  laserBank.forEach(laser => {
    scene.remove(laser.mesh);
  });
  laserBank = [];
  footballShootFreq = 0;
}

function resetGame() {
  runGame = true;
  refreshTimer = 0;
  soccerball.reset();
  football.reset();
  scene.add(soccerball.mesh);
  scene.add(football.mesh);
  soccerHealthElement.style.visibility = "visible";
  footballHealthElement.style.visibility = "visible";
  muteBtn.style.visibility = "visible";
  pauseBtn.style.visibility = "visible";
  controlsElement.style.visibility = "visible";

  bossHPElement.innerHTML = "FOOTBALL HEALTH: " + football.health;
  bossHPElement.style.width = `${football.health}%`;
  bossHPElement.style.height = "24px";
  bossHPElement.style.backgroundColor = "red";
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
        enemyPew.play();
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
        laserBank.splice(laserBank.indexOf(laser), 1);
        if (!mute) {
          enemyOuch();
        }
      }
      if (soccerball.collide(laser)) {
        scene.remove(laser.mesh);
        laserBank.splice(laserBank.indexOf(laser), 1);
      }
      laser.update();
    });

    if (football.health === 0 ){
      gameOver();
      gameOverInstructionsOn();
      bossHPElement.innerHTML = "GAME OVER, YOU WIN!!!";
      bossHPElement.style.width = "0%";
    } else {
      bossHPElement.innerHTML = "FOOTBALL HEALTH: " + football.health;
      bossHPElement.style.width = `${football.health}%`;
      bossHPElement.style.height = "24px";
      bossHPElement.style.backgroundColor = "red";
    }

    playerHPElement.innerHTML = "SOCCER HEALTH: " + soccerball.health;
    playerHPElement.style.width = `${soccerball.health}%`;
    playerHPElement.style.height = "24px";
    playerHPElement.style.backgroundColor = "green";
  }

  renderer.render(scene, camera);
}

animate();

startInstructionsOn();

instructionsElement.addEventListener("click", () =>{
  resetGame();
  clearInstructions();
});

document.body.appendChild(renderer.domElement);
