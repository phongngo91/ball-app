import "./styles/index.scss";
import * as THREE from "./js/three";

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

  var geometrySphere = new THREE.SphereGeometry(1, 5, 5);
  var materialSphere = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  var sphere = new THREE.Mesh(geometrySphere, materialSphere);

  scene.add(sphere);
  camera.position.z = 5;
  camera.position.z = 5;

  var animate = function() {
    requestAnimationFrame(animate);

    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

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
