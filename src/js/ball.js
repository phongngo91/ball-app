import * as THREE from "./three";

var geometrySphere = new THREE.SphereGeometry(1, 5, 5);
var materialSphere = new THREE.MeshBasicMaterial({ color: 0xffff00 });
var sphere = new THREE.Mesh(geometrySphere, materialSphere);

export default sphere;