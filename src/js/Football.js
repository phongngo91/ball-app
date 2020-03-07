import * as THREE from "./three";
import { Laser } from "./Laser";

export class Football {
  constructor(){
    this.footballHappyTexture = new THREE.TextureLoader().load("src/images/football-cute.png");
    const footballMaterial = new THREE.MeshBasicMaterial({ map: this.footballHappyTexture , transparent: true});
    this.footballOwTexture = new THREE.TextureLoader().load("src/images/football-ow.png");
    const footballGeometry = new THREE.BoxGeometry( 20, 0.01, 20 );

    this.mesh = new THREE.Mesh(footballGeometry, footballMaterial);
    this.DIRS = [0.3, 0.2, 0.1, -0.1, -0.2, -0.3];

    this.reset();
  }

  reset(){
    this.health = 300;
    this.velocity = 0;
    this.dirX = 0;
    this.dirZ = 0;
    this.trajectoryBankX = 0;
    this.trajectoryBankZ = 0;
    this.mesh.position.y = 38;
    this.mesh.position.z = 7;
    this.hurtDelay = 0;
    this.mesh.material.map = this.footballHappyTexture;
    this.mesh.material.needsUpdate = true;
  }

  shoot(){
    return new Laser(this, false);
  }

  collide(laser) {
    const laserX = laser.mesh.position.x;
    const laserY = laser.mesh.position.y;
    const laserZ = laser.mesh.position.z;

    const distance = Math.sqrt(
      Math.pow(this.mesh.position.x - laserX, 2) +
        Math.pow(this.mesh.position.y - laserY, 2) +
        Math.pow(this.mesh.position.z - laserZ, 2)
    );

    if (distance < 9){
      this.health -= 10;
      this.hurtDelay = 60;
      this.mesh.material.map = this.footballOwTexture;
      this.mesh.material.needsUpdate = true;
      return true;
    }
    return false;
  }

  update(){

    if (this.hurtDelay === 1){
      this.mesh.material.map = this.footballHappyTexture;
      this.mesh.material.needsUpdate = true;
      this.hurtDelay -= 1;
    } else if (this.hurtDelay > 1){
      this.hurtDelay -=1;
    }

    if (this.trajectoryBankX <= 0){
      this.trajectoryBankX = Math.random() * 600;
      this.dirX = this.DIRS[
        Math.floor(Math.random() * this.DIRS.length)
      ];
    } else {
      if (this.mesh.position.x > 20 || this.mesh.position.x < -20){
        this.dirX = this.dirX * -1;
        this.mesh.position.x += this.dirX;
      }

      this.mesh.position.x += this.dirX;
      this.trajectoryBankX -= 1;
    }

    if (this.trajectoryBankZ <= 0){
      this.trajectoryBankZ = Math.random() * 600;
      this.dirZ = this.DIRS[
        Math.floor(Math.random() * this.DIRS.length)
      ];
    } else {
      if (this.mesh.position.z > 40 || this.mesh.position.z < 5){
        this.dirZ = this.dirZ * -1;
      }
      this.mesh.position.z += this.dirZ;
      this.trajectoryBankZ -= 1;
    }


  }

}
