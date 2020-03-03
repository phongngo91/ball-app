import * as THREE from "./three";
import forest from "./forest";

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

forest.position.z = -1;
camera.position.z = 23;
camera.rotation.z = 90 * Math.PI / 180;

function animate(){
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();

document.getElementById("content-container").appendChild(renderer.domElement);

