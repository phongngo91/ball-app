import * as THREE from "./three";

const texture = new THREE.TextureLoader().load("src/textures/steel.png");


const geometry = new THREE.BoxGeometry(1, 20, 1);
var material = new THREE.MeshBasicMaterial( { map: texture } );
var cube = new THREE.Mesh( geometry, material );

export default cube;