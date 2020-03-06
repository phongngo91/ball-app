import "../styles/game.scss";
import * as THREE from "./three";
import { Soccerball } from "./Soccerball";
import { setup } from "./setup";
import { Football } from "./Football";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const soccerHealthElement = document.getElementById("soccerHealth");
const footballHealthElement = document.getElementById("footballHealth");
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth , window.innerHeight);
const E_KEY = 69;

let refreshTimer = 0;
let runGame = false;
let laserBank = [];
let footballShootFreq = 1;

const soccerball = new Soccerball(camera);
const football = new Football();
document.addEventListener("keydown", soccerball.keyboardController());
document.addEventListener("mousemove", soccerball.mouseController());

document.addEventListener("keydown", e => {
  const keyCode = e.which;
  if (keyCode === E_KEY) {
    let laser = soccerball.shoot();
    laserBank.push(laser);
    scene.add(laser.mesh);
  }
});

setup(scene);

function stopGame(){
  runGame = false;
  scene.remove(soccerball.mesh);
  scene.remove(football.mesh);
  laserBank.forEach( laser =>{
    scene.remove(laser.mesh);
  });
  laserBank = [];
  footballShootFreq = 0;
}

function resetGame(){
  runGame = true;
  refreshTimer = 0;
  soccerball.reset();
  football.reset();
  scene.add(soccerball.mesh);
  scene.add(football.mesh);
}

function animate(){
  requestAnimationFrame(animate);
  if (runGame === true){
    refreshTimer += 1;
    footballShootFreq += 0.1;
  }

  if (refreshTimer > 240){
    renderer.setSize(window.innerWidth , window.innerHeight);
    refreshTimer = 0;
  }

  if (footballShootFreq > 4){
    let laser = football.shoot();
    laserBank.push(laser);
    scene.add(laser.mesh);
    footballShootFreq = 0;
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
    if (football.collide(laser)){
      scene.remove(laser.mesh);
      laserBank.splice(laserBank.indexOf(laser), 1);
    }
    if (soccerball.collide(laser)){
      scene.remove(laser.mesh);
      laserBank.splice(laserBank.indexOf(laser), 1);
    }
    laser.update();
  });

  soccerHealthElement.innerHTML = "SOCCER HEALTH: " + soccerball.health;
  footballHealthElement.innerHTML = "FOOTBALL HEALTH: " +football.health;

  renderer.render(scene, camera);
}

resetGame();
animate();

document.body.appendChild(renderer.domElement);
