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

let refreshTimer = 0;
let runGame = false;
const ball = new Ball(camera);
setup(scene);

function stopGame(){
  runGame = false;
}

function resetGame(){
  runGame = true;
  refreshTimer = 0;
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

  renderer.render(scene, camera);
}

resetGame();
animate();

document.body.appendChild(renderer.domElement);
