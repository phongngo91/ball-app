import * as THREE from "./three";
import forest from "./forest";
import { player } from "./player_ava";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth * (6 / 10), window.innerHeight * (6 / 10));
scene.add(forest);
scene.add(player);

forest.position.z = -1;
camera.position.z = 5;
camera.rotation.z = (90 * Math.PI) / 180;
player.rotation.z = (90 * Math.PI) / 180;
camera.position.y = -10;
camera.position.x = 7;
player.position.x = 10;
player.position.y = -10;

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();

document.getElementById("content-container").appendChild(renderer.domElement);
