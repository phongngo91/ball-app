import * as THREE from "./three";

var texture = new THREE.TextureLoader().load("src/images/pikachu.jpg");
var geometry = new THREE.PlaneGeometry(5, 20, 32);

var material = new THREE.MeshBasicMaterial({ map: texture });
var plane = new THREE.Mesh(geometry, material);

export default plane;
