import * as THREE from "./three";
import { distance } from "./calculations";

export class Debri {
  constructor() {
    const geometry = new THREE.SphereGeometry(1, 32, 32);

    const COLORS = ["YELLOW", "BLUE", "RED"];
    const MATERIALS = [
      new THREE.MeshBasicMaterial({ color: 0xffff00 }),
      new THREE.MeshBasicMaterial({ color: 0x0000ff }),
      new THREE.MeshBasicMaterial({ color: 0xff0000 })
    ];
    const diceRoll = Math.floor(Math.random() * COLORS.length);

    const debri = new THREE.Mesh(geometry, MATERIALS[diceRoll]);

    this.color = COLORS[diceRoll];
    this.mesh = debri;
    this.mesh.position.y = 40;
    this.mesh.position.x = Math.random() * 40 - 20;
    this.mesh.position.z = Math.random() * 20;
  }

  collide(soccerball){
    return distance(soccerball, this) < 2;
  }

  update() {
    this.mesh.position.y -= 0.2;
  }
}

