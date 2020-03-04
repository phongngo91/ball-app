import * as THREE from "./three";

let materialArray = [];
let texture_ft = new THREE.TextureLoader().load( 'src/images/stadium.png');
let texture_bk = new THREE.TextureLoader().load( 'src/images/stadium.png');
let texture_up = new THREE.TextureLoader().load( 'src/images/stadium.png');
let texture_dn = new THREE.TextureLoader().load( 'src/images/stadium.png');
let texture_rt = new THREE.TextureLoader().load( 'src/images/stadium.png');
let texture_lf = new THREE.TextureLoader().load( 'src/images/stadium.png');
  
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));
   
for (let i = 0; i < 6; i++)
  materialArray[i].side = THREE.BackSide;
   
let skyboxGeo = new THREE.BoxGeometry( 10000, 10000, 10000);
export const skybox = new THREE.Mesh( skyboxGeo, materialArray );
