import * as THREE from "./three";
import ball from "./ball";
import level_1 from "./level_1";

const gameContainer = document.createElement("div");
gameContainer.classList.add("game-container");

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth * (6/10), window.innerHeight * (6/10));

gameContainer.appendChild(renderer.domElement);

scene.add(ball);
scene.add(level_1);

camera.position.z = 5;

const moveSpeed = 0.5;

const LEFT_ARROW = 37;
const UP_ARROW = 38;
const RIGHT_ARROW = 39;
const DOWN_ARROW = 40;

document.addEventListener("keydown", e => {
  var keyCode = e.which;
  if (keyCode == UP_ARROW) {
    ball.position.y += moveSpeed;
  } else if (keyCode == DOWN_ARROW) {
    ball.position.y -= moveSpeed;
  } else if (keyCode == LEFT_ARROW) {
    ball.position.x -= moveSpeed;
  } else if (keyCode == RIGHT_ARROW) {
    ball.position.x += moveSpeed;
  }
  renderer.render(scene, camera);
});

var animate = function() {
  requestAnimationFrame(animate);
  ball.rotation.x -= 0.01;
  ball.rotation.y -= 0.01;

  // Move the level down
  level_1.position.y -= 0.1;
  console.log(level_1.position.y);

  if (level_1.position.y < -14){
    level_1.position.y = 14;
  }

  renderer.render(scene, camera);
};
animate();

export default gameContainer;