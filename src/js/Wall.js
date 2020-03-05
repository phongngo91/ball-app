import * as THREE from "./three";

export const setUpWalls = scene => {
  var texture = new THREE.TextureLoader().load("src/images/stadium.png");
  var geometry = new THREE.PlaneGeometry(40, 40, 32);
  var material = new THREE.MeshBasicMaterial({ map: texture });
  var wall = new THREE.Mesh(geometry, material);

  wall.rotation.x = (90 * Math.PI) / 180;
  wall.position.y = 40;
  wall.position.z = 19;
  scene.add(wall);
  let rightWall = wall.clone();
  rightWall.rotation.y = (90 * Math.PI) / 180;
  rightWall.position.y = 40;
  rightWall.position.z = 19;
  rightWall.rotation.y = (90 * Math.PI) / 180;
  rightWall.rotation.x = (90 * Math.PI) / 180;
  rightWall.position.x = -20;
  rightWall.position.y = 20;
  rightWall.position.z = 19;
  scene.add(rightWall);
  let rightWall2 = rightWall.clone();
  rightWall2.position.y = -20;
  scene.add(rightWall2);
  let leftWall = rightWall2.clone();
  leftWall.position.x = 20;
  leftWall.rotation.y = (-90 * Math.PI) / 180;
  scene.add(leftWall);
  let leftWall2 = leftWall.clone();
  leftWall2.position.y = -20;
  scene.add(leftWall2);

};
