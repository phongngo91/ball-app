import * as THREE from "./three";

const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
export const airplane = new THREE.Mesh(geometry, material);

export const airPlaneController = e => {
  e.preventDefault();
  const canvas = document.getElementsByTagName("canvas")[0];

  let relativeX = e.clientX - canvas.offsetLeft - canvas.width / 2;

  if (relativeX > -canvas.width / 2 && relativeX < canvas.width / 2) {
    airplane.position.x = relativeX / 41;
  }

  let relativeY = e.clientY - canvas.offsetTop - canvas.height / 2;

  if (relativeY > -canvas.height / 2 && relativeY < canvas.height / 2) {
    airplane.position.y = -relativeY / 24;
  }
};
