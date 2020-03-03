import * as THREE from "./three";

var texture = new THREE.TextureLoader().load("src/images/soccer_field.png");
var geometry = new THREE.PlaneGeometry(40, 40, 32);
var material = new THREE.MeshBasicMaterial({ map: texture });
var plane = new THREE.Mesh(geometry, material);

export default plane;
