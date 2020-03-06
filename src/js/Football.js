import * as THREE from "./three";
import { Laser } from "./Laser";

export class Football {
  constructor(){
    const footballTexture = new THREE.TextureLoader().load("src/images/football.png");
    const footballMaterial = new THREE.MeshBasicMaterial({ map: footballTexture });
    let points = [];
    for (let deg = 0; deg <= 180; deg += 6) {
      let rad = (Math.PI * deg) / 180;
      let point = new THREE.Vector2(
        (0.72 + 20 * Math.cos(rad)) * Math.sin(rad),
        -Math.cos(rad)
      );
      points.push(point);
    }
    const footballGeometry = new THREE.LatheBufferGeometry(points, 50);
    this.mesh = new THREE.Mesh(footballGeometry, footballMaterial);
    this.DIRS = [0.3, 0.2, 0.1, -0.1, -0.2, -0.3];

    this.reset();
  }

  reset(){
    this.health = 100;
    this.velocity = 0;
    this.dirX = 0;
    this.dirZ = 0;
    this.trajectoryBankX = 0;
    this.trajectoryBankZ = 0;
    this.mesh.position.y = 38;
    this.mesh.position.z = 6;
  }

  shoot(){
    return new Laser(this, false);
  }

  update(){
    if (this.trajectoryBankX <= 0){
      this.trajectoryBankX = Math.random() * 600;
      this.dirX = this.DIRS[
        Math.floor(Math.random() * this.DIRS.length)
      ];
    } else {
      this.mesh.position.x += this.dirX;

      if (this.mesh.position.x > 20 || this.mesh.position.x < -20){
        this.dirX = this.dirX * -1;
      }
      this.trajectoryBankX -= 1;
    }

    if (this.trajectoryBankZ <= 0){
      this.trajectoryBankZ = Math.random() * 600;
      this.dirZ = this.DIRS[
        Math.floor(Math.random() * this.DIRS.length)
      ];
    } else {
      this.mesh.position.z += this.dirZ;

      if (this.mesh.position.z > 40 || this.mesh.position.z < 5){
        this.dirZ = this.dirZ * -1;
      }

      this.trajectoryBankZ -= 1;
    }

  }

}



