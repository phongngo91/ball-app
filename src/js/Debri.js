import * as THREE from "./three";

export class Debri {
  constructor() {
    const TEXTURES = [
      new THREE.TextureLoader().load("src/textures/white-flower.png"),
      new THREE.TextureLoader().load("src/textures/red-flower.png"),
      new THREE.TextureLoader().load("src/textures/soccer.png")
    ];
    const diceRoll = Math.floor(Math.random() * TEXTURES.length);
    const geometry = new THREE.SphereGeometry(1, 16, 16);
    const texture = TEXTURES[diceRoll];
    const material = new THREE.MeshBasicMaterial({ map: texture });
    this.mesh = new THREE.Mesh(geometry, material);

    this.mesh.position.y = Math.random() * 400;
    this.mesh.position.x = Math.random() * 40 - 20;
    this.mesh.position.z = Math.random() * 40 - 20;
  }

  update() {
    this.mesh.position.y -= 1;
  }
}

export const collision = (ball, debri) => {
  const ballX = ball.position.x;
  const ballY = ball.position.y;
  const ballZ = ball.position.z;
  const debriX = debri.mesh.position.x;
  const debriY = debri.mesh.position.y;
  const debriZ = debri.mesh.position.z;

  const distance = Math.sqrt(
    Math.pow(ballX - debriX, 2) +
      Math.pow(ballY - debriY, 2) +
      Math.pow(ballZ - debriZ, 2)
  );

  return distance < 2;
};
