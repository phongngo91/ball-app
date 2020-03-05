import "../styles/game2.scss";
import * as THREE from "./three";
import { Ball } from "./Ball";
import { setup } from "./setup";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth , window.innerHeight);
const E_KEY = 69;

let refreshTimer = 0;
let runGame = false;
let laserBank = [];
const ball = new Ball(camera);
document.addEventListener("keydown", ball.controller());
document.addEventListener("keydown", e => {
  const keyCode = e.which;
  if (keyCode === E_KEY) {
    let laser = ball.shoot();
    laserBank.push(laser);
    scene.add(laser.mesh);
  }
});

setup(scene);

function stopGame(){
  runGame = false;
  scene.remove(ball.mesh);
  laserBank.forEach( laser =>{
    scene.remove(laser.mesh);
  });
  laserBank = [];
}

function resetGame(){
  runGame = true;
  refreshTimer = 0;
  scene.add(ball.mesh);
  ball.reset();
}

function animate(){
  requestAnimationFrame(animate);
  if (runGame === true){
    refreshTimer += 1;
  }

  if (refreshTimer > 240){
    renderer.setSize(window.innerWidth , window.innerHeight);
    refreshTimer = 0;
  }

  let newLaserBank = [];
  laserBank.forEach(laser => {
    if (laser.velocity > 0) {
      newLaserBank.push(laser);
    } else {
      scene.remove(laser.mesh);
    }
  });

  ball.update();
  laserBank.forEach(laser => {
    laser.update();
  });

  renderer.render(scene, camera);
}

resetGame();
animate();

document.body.appendChild(renderer.domElement);
