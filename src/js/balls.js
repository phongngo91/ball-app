import * as THREE from "./three";

const blueTexture = new THREE.TextureLoader().load("src/textures/white-flower.png");
const blueGeo = new THREE.SphereGeometry(1, 16, 16);
const blueMat = new THREE.MeshBasicMaterial({ map: blueTexture });
export const blueBall = new THREE.Mesh(blueGeo, blueMat);

const redTexture = new THREE.TextureLoader().load("src/textures/red-flower.png");
const redGeo = new THREE.SphereGeometry(1, 16, 16);
const redMat = new THREE.MeshBasicMaterial({ map: redTexture });
export const redBall = new THREE.Mesh(redGeo, redMat);

const gameTexture = new THREE.TextureLoader().load("src/textures/soccer.png");
const gameGeo = new THREE.SphereGeometry(1, 16, 16);
const gameMat = new THREE.MeshBasicMaterial({ map: gameTexture });
export const gameBall = new THREE.Mesh(gameGeo, gameMat);