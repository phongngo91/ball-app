import "../styles/game.scss";
import * as THREE from "./three";
import { airplane, airPlaneController } from "./airplane";
import { Debri, collision } from "./Debri";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.addEventListener("mousemove", airPlaneController, false);

let gameTimer = 0;
camera.position.z = 20;
let runGame = false;
let debris = [];
let airplaneHealth = 100;

function stopGame() {
  runGame = false;
  gameTimer = 0;
  airplaneHealth = 100;
  debris = [];
  scene.remove(airplane);
}

function startGame() {
  runGame = true;
  airplaneHealth = 100;
  scene.add(airplane);
}

const animate = function() {
  requestAnimationFrame(animate);

  if (runGame === true) {
    gameTimer += 1;
  }
  if (gameTimer > 60) {
    renderer.setSize(window.innerWidth, window.innerHeight);
    const newDebri = new Debri();
    debris.push(newDebri);
    scene.add(newDebri.mesh);
    gameTimer = 0;
  }

  debris.forEach(debri => {
    debri.update();
    if (collision(airplane, debri)) {
      scene.remove(debri.mesh);
      airplaneHealth -= 10;
      debris.splice(debris.indexOf(debri), 1);
    }
  });

  renderer.render(scene, camera);
};

animate();
startGame();

document.body.appendChild(renderer.domElement);
