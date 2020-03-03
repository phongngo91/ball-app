import * as THREE from "./three";

const texture = new THREE.TextureLoader().load("src/images/pikachu.png");
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const mat = new THREE.MeshBasicMaterial({ map: texture });
export const player = new THREE.Mesh(geometry, mat);
