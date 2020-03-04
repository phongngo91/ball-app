import * as THREE from "./three";

var geometry = new THREE.BoxGeometry( 1, 5, 1 );
var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
var cube = new THREE.Mesh( geometry, material );

export default cube;