import "./styles/index.scss";
import * as THREE from "./js/three";
import ball from "./js/ball";

window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("center");
  document.body.classList.add("page-bg");

  const contentContainer = document.createElement("div");
  contentContainer.classList.add("content-container");

  const topNav = document.createElement("div");
  topNav.classList.add("top-nav");

  const leftNav = document.createElement("div");
  leftNav.classList.add("left-nav");

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
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
  gameContainer.appendChild(renderer.domElement);

  scene.add(ball);
  camera.position.z = 5;
  camera.position.z = 5;

  var animate = function() {
    requestAnimationFrame(animate);

    ball.rotation.x += 0.01;
    ball.rotation.y += 0.01;

    renderer.render(scene, camera);
  };

  animate();

  const bottomSection = document.createElement("div");
  bottomSection.classList.add("bottom-section");
  bottomSection.appendChild(leftNav);
  bottomSection.appendChild(gameContainer);

  contentContainer.appendChild(topNav);
  contentContainer.appendChild(bottomSection);

  document.body.appendChild(contentContainer);
});
