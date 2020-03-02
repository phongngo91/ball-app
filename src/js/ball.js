import * as THREE from "./three";

const texture = new THREE.TextureLoader().load("src/images/tree_bg.jpg");

const geometryBall = new THREE.SphereGeometry(1, 32, 32);
// var materialBall = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const materialBall = new THREE.MeshBasicMaterial({ map: texture });
const ball = new THREE.Mesh(geometryBall, materialBall);

export default ball;