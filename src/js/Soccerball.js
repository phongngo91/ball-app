import * as THREE from "./three";
import { Laser } from "./laser";

export class Soccerball {
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
    this.E_KEY = 69;

    this.VELOCITY_BASE_KEYBOARD = 40;
    this.VELOCITY_BASE_MOUSE = 30;

    this.reset();
  }

  reset() {
    this.health = 100;
    this.velocity = 0;
    this.hurtDelay = 0;
    this.cameraMomentumZ = 0;
    this.trajectoryBankZ = 0;
    this.dirX = 0;
    this.dirY = 0;
    this.mesh.position.y = -35;
    this.mesh.position.x = 0;
    this.mesh.position.z = 0;
    this.camera.position.y = -45;
    this.camera.position.x = 0;
    this.camera.position.z = 5;
    this.camera.rotation.x = (90 * Math.PI) / 180;
  }

  moveUp() {
    this.camera.position.y += this.dirY;
    this.mesh.position.y += this.dirY;
    this.mesh.rotation.x -= this.dirY;
    this.velocity -= 0.1;
  }

  moveDown() {
    this.camera.position.y += this.dirY;
    this.mesh.position.y += this.dirY;
    this.mesh.rotation.x -= this.dirY;
    this.velocity -= 0.1;
  }

  moveLeft() {
    this.camera.position.x += this.dirX;
    this.mesh.position.x += this.dirX;
    this.mesh.rotation.y -= this.dirX;
    this.velocity -= 0.1;
  }

  moveRight() {
    this.camera.position.x += this.dirX;
    this.mesh.position.x += this.dirX;
    this.mesh.rotation.y -= this.dirX;
    this.velocity -= 0.1;
  }

  update() {
    // If camera is not where the ball is on the z, move the camera
    // we need the range to be 4 otherwise the camera will be pulled too low * it is set to be 2 above the ball so that we can angle down the camera
    if (Math.abs(this.mesh.position.z - this.camera.position.z) > 4) {
      // this.cameraMomentumZ += (this.mesh.position.z - this.camera.position.z) / 10;
      this.camera.position.z +=
        (this.mesh.position.z - this.camera.position.z) / 60;
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
      // stop ball momentum if velocity runs out (Prevents rolling horizontally/veritcally after diagonally)
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
    // Creates a "soft" wall, so if users use mouse and breaks the wall, there is no "infinite back and forth" gitch, caused by repeated "mousemove" event, keeping correction from happening.
    if (
      Math.round(this.mesh.position.x) === 20 ||
      Math.round(this.mesh.position.x) === -20
    ) {
      this.dirX = this.dirX * -1;
    }

    if (
      Math.round(this.mesh.position.y) === 40 ||
      Math.round(this.mesh.position.y) === -40
    ) {
      this.dirY = this.dirY * -1;
    }
  }

  shoot() {
    return new Laser(this, true);
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

    if (distance < 2) {
      this.health -= 10;
      this.hurtDelay = 120;
      return true;
    }
    return false;
  }

  keyboardController() {
    return e => {
      const keyCode = e.which;
      if (keyCode === this.DOWN_ARROW) {
        this.dirY = -0.1;
        this.velocity = this.VELOCITY_BASE_KEYBOARD;
      } else if (keyCode === this.UP_ARROW) {
        this.dirY = 0.1;
        this.velocity = this.VELOCITY_BASE_KEYBOARD;
      } else if (keyCode === this.RIGHT_ARROW) {
        this.dirX = 0.1;
        this.velocity = this.VELOCITY_BASE_KEYBOARD;
      } else if (keyCode === this.LEFT_ARROW) {
        this.dirX = -0.1;
        this.velocity = this.VELOCITY_BASE_KEYBOARD;
      }
    };
  }

  spacebarJump() {
    return e => {
      const keyCode = e.which;
      if (keyCode === this.SPACE_BAR) {
        this.trajectoryBankZ = 4;
      }
    };
  }

  mouseController() {
    return e => {
      const canvas = document.getElementsByTagName("canvas")[0];

      //Ball is center, so where mouse is minus half of canvas works
      let relativeX = e.clientX - canvas.offsetLeft - canvas.width / 2;

      if (relativeX > -canvas.width / 2 && relativeX < canvas.width / 2) {
        // velocity base for mouse should be smaller so ball stops rolling when mouse leaves screen
        this.velocity = this.VELOCITY_BASE_MOUSE;
        this.dirX = relativeX / 1500;
      }

      //Ball is 1/3 of the way dowm from the screen, not half, so 75% of screen height down
      let relativeY = e.clientY - canvas.offsetTop - canvas.height * 0.75;

      if (relativeY > -canvas.height / 2 && relativeY < canvas.height / 2) {
        // velocity base for mouse should be smaller so ball stops rolling when mouse leaves screen

        this.velocity = this.VELOCITY_BASE_MOUSE;

        if (relativeY > 0) {
          // Screen is shorter on the bottom, so speed should increase at faster rate
          this.dirY = -relativeY / 500;
        } else {
          this.dirY = -relativeY / 1500;
        }
      }
    };
  }
}
