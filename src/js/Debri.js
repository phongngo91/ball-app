import * as THREE from "./three";

export class Debri {
  constructor() {
    const geometry = new THREE.SphereGeometry(1, 32, 32);

    const COLORS = ["RED", "BLUE", "YELLOW"];
    const MATERIALS = [
      new THREE.MeshBasicMaterial({ color: 0xffff00 }),
      new THREE.MeshBasicMaterial({ color: 0x0000ff }),
      new THREE.MeshBasicMaterial({ color: 0xff0000 })
    ];
    const diceRoll = Math.floor(Math.random() * COLORS.length);

    const debri = new THREE.Mesh(geometry, MATERIALS[diceRoll]);

    this.color = COLORS[diceRoll];
    this.mesh = debri;
    this.mesh.position.z = -100;
    this.mesh.position.x = Math.random() * 20 - 10;
    this.mesh.position.y = Math.random() * 20 - 10;
  }

  update() {
    this.mesh.position.z += 1;
  }
}

export const collision = (airplane, debri) => {
  const airplaneX = airplane.position.x;
  const airplaneY = airplane.position.y;
  const debriX = debri.mesh.position.x;
  const debriY = debri.mesh.position.y;
  const zClose = Math.abs(airplane.position.z - debri.mesh.position.z);

  const distance = Math.sqrt(
    Math.pow(airplaneX - debriX, 2) + Math.pow(airplaneY - debriY, 2)
  );

  return distance < 2 && zClose < 2;
};
