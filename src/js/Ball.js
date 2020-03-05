import * as THREE from "./three";
import { Laser } from "./Laser";

export class Ball {
  constructor(camera) {
    const texture = new THREE.TextureLoader().load("src/textures/soccer.png");
    const geometry = new THREE.SphereGeometry(1, 16, 16);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    this.mesh = new THREE.Mesh(geometry, material);

    this.camera = camera;

    this.SPACE_BAR = 32;
    this.LEFT_ARROW = 37;
    this.UP_ARROW = 38;
    this.RIGHT_ARROW = 39;
    this.DOWN_ARROW = 40;
    this.R_KEY = 82;
    this.VELOCITY_BASE = 40;
    this.E_KEY = 69;
    this.W_KEY = 87;
    this.S_KEY = 83;
    this.A_KEY = 65;
    this.D_KEY = 68;

    this.cameraMomentumZ = 0;
    this.reset();
  }

  reset() {
    this.dirX = 0;
    this.dirY = 0;
    this.velocity = 0;
    this.health = 0;
    this.trajectoryBankZ = 0;
    this.mesh.position.y = -35;
    this.mesh.position.x = 0;
    this.camera.position.y = -45;
    this.camera.position.x = 0;
    this.camera.position.z = 5;
    this.camera.rotation.x = (90 * Math.PI) / 180;
  }

  moveUp() {
    this.camera.position.y += 0.1;
    this.mesh.position.y += 0.1;
    this.mesh.rotation.x -= 0.1;
    this.velocity -= 0.1;
  }

  moveDown() {
    this.camera.position.y -= 0.1;
    this.mesh.position.y -= 0.1;
    this.mesh.rotation.x += 0.1;
    this.velocity -= 0.1;
  }

  moveLeft() {
    this.camera.position.x -= 0.1;
    this.mesh.position.x -= 0.1;
    this.mesh.rotation.y -= 0.1;
    this.velocity -= 0.1;
  }

  moveRight() {
    this.camera.position.x += 0.1;
    this.mesh.position.x += 0.1;
    this.mesh.rotation.y += 0.1;
    this.velocity -= 0.1;
  }

  update() {

    // If camera is not where the ball is on the z, move the camera
    if (Math.abs(this.mesh.position.z - this.camera.position.z) > 4){
      // this.cameraMomentumZ += (this.mesh.position.z - this.camera.position.z) / 10;
      this.camera.position.z += (this.mesh.position.z - this.camera.position.z) / 100;

    }

    if (this.velocity > 0) {
      if (this.dirX > 0) {
        this.moveRight();
        if (this.dirY > 0) {
          this.moveUp();
        } else if (this.dirY < 0) {
          this.moveDown();
        }
      } else if (this.dirX < 0) {
        this.moveLeft();
        if (this.dirY > 0) {
          this.moveUp();
        } else if (this.dirY < 0) {
          this.moveDown();
        }
        // Don't move ball if already moving
      } else if (this.dirY > 0) {
        this.moveUp();
        if (this.dirX > 0) {
          this.moveRight();
        } else if (this.dirX < 0) {
          this.moveLeft();
        }
      } else if (this.dirY < -0) {
        this.moveDown();
        if (this.dirX > 0) {
          this.moveRight();
        } else if (this.dirX < 0) {
          this.moveLeft();
        }
      }
    } else {
      this.dirX = 0;
      this.dirY = 0;
    }

    // Gravity, Ball falling down
    if (this.trajectoryBankZ > 0) {
      this.trajectoryBankZ -= 0.1;
      this.mesh.position.z += 0.2;
    }

    if (this.mesh.position.z > 0) {
      this.mesh.position.z -= 0.1;
    } else {
      this.mesh.position.z = 0;
    }

    this.outBoundsCorrection();
  }

  outBoundsCorrection() {
    // if we are going out of bounds, reverse the direction
    if (this.mesh.position.x > 20 || this.mesh.position.x < -20) {
      this.dirX = this.dirX * -1;
    }

    // // if we are going out of bounds, reverse the direction
    if (this.mesh.position.y > 40 || this.mesh.position.y < -40) {
      this.dirY = this.dirY * -1;
    }
  }

  shoot() {
    return new Laser(this, true);
  }

  controller() {
    return e => {
      const keyCode = e.which;

      // debugger;
      if (keyCode === this.DOWN_ARROW) {
        this.dirY = -20;
        this.velocity = this.VELOCITY_BASE;
      } else if (keyCode === this.UP_ARROW) {
        this.dirY = 20;
        this.velocity = this.VELOCITY_BASE;
      } else if (keyCode === this.RIGHT_ARROW) {
        this.dirX = 20;
        this.velocity = this.VELOCITY_BASE;
      } else if (keyCode === this.LEFT_ARROW) {
        this.dirX = -20;
        this.velocity = this.VELOCITY_BASE;
      } else if (keyCode === this.R_KEY) {
        // resetGame();
      } else if (keyCode === this.E_KEY) {
        // let duplicateLaser = playerLaser.clone();
        // laserBank.push(new LaserAI(duplicateLaser, gameBall));
        // scene.add(duplicateLaser);
        this.shoot();
      } else if (keyCode === this.W_KEY) {
        // this.camera.position.y += 0.1;
        // this.mesh.position.y += 0.1;
        // this.dirY = 20;
        // this.velocity = this.VELOCITY_BASE;
      } else if (keyCode === this.S_KEY) {
        this.dirY = -20;
        this.velocity = this.VELOCITY_BASE;
      } else if (keyCode === this.A_KEY) {
        // this.dirX = -20;
        // this.velocity = this.VELOCITY_BASE;
      } else if (keyCode === this.D_KEY) {
        // this.dirX = 20;
        // this.velocity = this.VELOCITY_BASE;
      } else if (keyCode === this.SPACE_BAR) {
        this.trajectoryBankZ = 4;
      }
    };
  }

  // mouseController() {
  //   return e => {
  //     const canvas = document.getElementsByTagName("canvas")[0];
  //     let relativeX = e.clientX - canvas.offsetLeft - canvas.width / 2;

  //     if (relativeX > -canvas.width / 2 && relativeX < canvas.width / 2) {
  //       this.mesh.position.x = relativeX / 25;
  //     }
  //   };
  // }
}
