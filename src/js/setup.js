import * as THREE from "./three";
const soccerFieldTexture = new THREE.TextureLoader().load(
  "src/images/soccer_field.png"
);
const soccerFieldGeometry = new THREE.PlaneGeometry(40, 80, 32);
const soccerFieldMaterial = new THREE.MeshBasicMaterial({
  map: soccerFieldTexture
});
const soccerField = new THREE.Mesh(soccerFieldGeometry, soccerFieldMaterial);

const SunGeometry = new THREE.SphereGeometry(5, 32, 32);
const SunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(SunGeometry, SunMaterial);

export const setup = scene => {
  soccerField.position.z = -1;
  sun.position.z = 40;
  sun.position.y = 40;
  sun.position.x = -40;
  scene.background = new THREE.Color(0x00cccc);
  scene.add(soccerField);
  scene.add(sun);
};
