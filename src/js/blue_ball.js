import * as THREE from "./three";

const geometryBall = new THREE.SphereGeometry(1, 16, 16);
var material = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
const randBall = new THREE.Mesh(geometryBall, material);

export default randBall;