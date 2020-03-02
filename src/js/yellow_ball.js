import * as THREE from "./three";

const geometryBall = new THREE.SphereGeometry(1, 16, 16);
var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const randBall = new THREE.Mesh(geometryBall, material);

export default randBall;