import * as THREE from "./three";

const texture = new THREE.TextureLoader().load("src/textures/soccer.png");

const geometryBall = new THREE.SphereGeometry(1, 16, 16);
const materialBall = new THREE.MeshBasicMaterial({ map: texture });
const ball = new THREE.Mesh(geometryBall, materialBall);

export default ball;