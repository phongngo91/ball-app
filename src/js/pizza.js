import * as THREE from "./three";

var textureLoader = new THREE.TextureLoader();
const geometry = new THREE.BoxGeometry( 4, 2, 4 );

var texture0 = textureLoader.load( 'src/images/car/pizza.png' );
var texture1 = textureLoader.load( 'src/images/car/pizza.png' );
var texture2 = textureLoader.load( 'src/images/car/pizza.png' );
var texture3 = textureLoader.load( 'src/images/car/pizza.png' );
var texture4 = textureLoader.load( 'src/images/car/pizza.png' );
var texture5 = textureLoader.load( 'src/images/car/pizza.png' );

var materials = [
  new THREE.MeshBasicMaterial( { map: texture0 } ),
  new THREE.MeshBasicMaterial( { map: texture1 } ),
  new THREE.MeshBasicMaterial( { map: texture2 } ),
  new THREE.MeshBasicMaterial( { map: texture3 } ),
  new THREE.MeshBasicMaterial( { map: texture4 } ),
  new THREE.MeshBasicMaterial( { map: texture5 } )
];

var faceMaterial = new THREE.MeshFaceMaterial(materials);
export const pizza = new THREE.Mesh(geometry, faceMaterial);
