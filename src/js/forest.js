import * as THREE from "./three";

var texture = new THREE.TextureLoader().load("src/images/forest.png");
var geometry = new THREE.PlaneGeometry(20, 40, 32);
var material = new THREE.MeshBasicMaterial({ map: texture });
var plane = new THREE.Mesh(geometry, material);

export default plane;
