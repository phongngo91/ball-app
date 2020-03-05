import * as THREE from "./three";

const texture = new THREE.TextureLoader().load("src/textures/soccer.png");
const geometry = new THREE.SphereGeometry(1, 16, 16);
const material = new THREE.MeshBasicMaterial({ map: gameTexture });
export const ball = new THREE.MeshBasicMaterial({ map: gameTexture });

const SPACE_BAR = 32;
const LEFT_ARROW = 37;
const UP_ARROW = 38;
const RIGHT_ARROW = 39;
const DOWN_ARROW = 40;
const R_KEY = 82;
const VELOCITY_BASE = 40;
const E_KEY = 69;

export const ballController = e => {
  const keyCode = e.which;

  

};