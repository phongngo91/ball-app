import * as THREE from "./three";

var texture = new THREE.TextureLoader().load("src/images/tree_bg.jpg");


var geometryBall = new THREE.SphereGeometry(1, 32, 32);
// var materialBall = new THREE.MeshBasicMaterial({ color: 0xffff00 });
var materialBall = new THREE.MeshBasicMaterial({ map: texture });
var ball = new THREE.Mesh(geometryBall, materialBall);

export default ball;