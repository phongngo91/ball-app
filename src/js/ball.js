import * as THREE from "./three";

var geometryBall = new THREE.SphereGeometry(1, 5, 5);
var materialBall = new THREE.MeshBasicMaterial({ color: 0xffff00 });
var ball = new THREE.Mesh(geometryBall, materialBall);

export default ball;