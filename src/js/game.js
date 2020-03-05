import "../styles/game.scss";
import * as THREE from "./three";
import { airplane, airPlaneController } from "./airplane";
import { Debri, collision } from "./Debri";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.addEventListener("mousemove", airPlaneController, false);
const scoreElement = document.getElementById("score");
const menu = document.getElementById("menu");
const instructions = document.getElementById("instructions");
scoreElement.style.visibility = "hidden";

let gameTimer = 0;
let spawnFreq = 1;
camera.position.z = 20;
let runGame = false;
let debris = [];
let scoreValue = 0;

function stopGame() {
  menu.innerHTML = "Restart";
  instructions.innerHTML = "Final Score: " + scoreValue;
  runGame = false;
  gameTimer = 0;
  scoreValue = 0;
  debris.forEach(debri =>{
    scene.remove(debri.mesh);
  });
  debris = [];
  scoreElement.style.visibility = "hidden";
  menu.style.visibility = "visible";
  instructions.style.visibility = "visible";
  scene.remove(airplane);
}

function startGame() {
  spawnFreq = 1;
  runGame = true;
  scoreValue = 0;
  scoreElement.style.visibility = "visible";
  scene.add(airplane);
}

const animate = function() {
  requestAnimationFrame(animate);

  if (runGame === true) {
    gameTimer += 1;
  }

  if (gameTimer > (15 / spawnFreq)) {
    renderer.setSize(window.innerWidth, window.innerHeight);
    const newDebri = new Debri();
    debris.push(newDebri);
    scene.add(newDebri.mesh);

    spawnFreq += 0.01;
    gameTimer = 0;
  }

  debris.forEach(debri => {
    debri.update();
    if (collision(airplane, debri)) {
      if (debri.color === "BLUE") {
        console.log("Blue collision");
        scoreValue += 20;
      } else if (debri.color === "RED") {
        stopGame();
      } else if (debri.color === "YELLOW") {
        scoreValue += 10;
      }
      scene.remove(debri.mesh);
      debris.splice(debris.indexOf(debri), 1);
    }

    // This means the debri has left the camera view
    if (debri.mesh.z > 20){
      scene.remove(debri.mesh);
      debris.splice(debris.indexOf(debri), 1);
    }
  });

  while (scoreElement.children.length > 0) {
    scoreElement.children.forEach(child => {
      scoreElement.remove(child);
    });
  }

  scoreElement.innerHTML = scoreValue;

  renderer.render(scene, camera);
};

animate();
document.body.appendChild(renderer.domElement);

menu.style.visibility = "visible";
instructions.style.visibility = "visible";
menu.addEventListener("click", () => {
  menu.style.visibility = "hidden";
  instructions.style.visibility = "hidden";
  startGame();
});
