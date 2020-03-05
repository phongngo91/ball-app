import * as THREE from "./three";

export class Laser {
  constructor(shooter, goodguy = true, velocity = 1000) {
    const geometry = new THREE.BoxGeometry(1, 5, 1);
    let material;
    let offSet;
    let initDir;
    if (goodguy === true){
      offSet = 5;
      initDir = 0.4;
      material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    } else {
      offSet = -5;
      initDir = -0.4;
      material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    }
    this.mesh = new THREE.Mesh(geometry, material);
    this.shooter = shooter;

    this.mesh.position.x = shooter.mesh.position.x;
    this.mesh.position.y = shooter.mesh.position.y + offSet;
    this.mesh.position.z = shooter.mesh.position.z;

    this.travelDir = initDir;
    this.velocity = velocity;
  }

  update() {
    this.mesh.position.y += this.travelDir;
    this.velocity -= 1;
  }
}
