export default class PizzaAI {
  constructor(pizzaMesh) {
    this.pizzaMesh = pizzaMesh;
    this.pizzaMesh.position.x = 0;
    this.pizzaMesh.position.y = 0;
    this.pizzaMesh.position.z = 0;

    this.trajectoryBankX = 0;
    this.trajectoryBankY = 0;
    this.currentDirX = 0;
    this.currentDirY = 0;

    this.aiBankX = 0;
    this.aiBankZ = 0;
    // this.aiBankY = 0;

    this.aiDirX = 0;
    // this.aiDirY = 0;
    this.aiDirZ = 0;

    this.DIRS = [0.3, 0.2, 0.1, -0.1, -0.2, -0.3];
  }

  resetState() {
    this.pizzaMesh.position.x = 0;
    this.pizzaMesh.position.y = 0;
    this.pizzaMesh.position.z = 0;

    this.trajectoryBankX = 0;
    this.trajectoryBankY = 0;
    this.currentDirX = 0;
    this.currentDirY = 0;

    this.aiBankX = 0;
    this.aiBankZ = 0;
    // this.aiBankY = 0;

    this.aiDirX = 0;
    // this.aiDirY = 0;
    this.aiDirZ = 0;
  }

  updateMovement() {

    if (this.aiBankX <= 0) {
      this.aiBankX = Math.random() * 600;
      this.aiDirX = this.DIRS[
        Math.floor(Math.random() * this.DIRS.length)
      ];
    } else {
      this.pizzaMesh.position.x += this.aiDirX;
      // keeps car in bounds
      if (this.pizzaMesh.position.x > 20 || this.pizzaMesh.position.x < -20) {
        this.aiDirX = this.aiDirX * -1;
      }
      this.aiBankX -= 1;
    }

    // if (this.aiBankY <= 0) {
    //   this.aiBankY = Math.random() * 100;
    //   this.aiDirY = this.DIRS[
    //     Math.floor(Math.random() * this.DIRS.length)
    //   ];
    // } else {
    //   // keeps pizza in bounds
    //   this.pizzaMesh.position.y += this.aiDirY;
    //   if (this.pizzaMesh.position.y > 40 || this.pizzaMesh.position.y < -40) {
    //     this.aiDirY = this.aiDirY * -1;
    //   }
    //   this.aiBankY -= 1;
    // }

    if (this.aiBankZ <= 0) {
      this.aiBankZ = Math.random() * 600;
      this.aiDirZ = this.DIRS[
        Math.floor(Math.random() * this.DIRS.length)
      ];
    } else {

      this.pizzaMesh.position.z += this.aiDirZ;
      // keeps the pizza within the bounds of the map
      if (this.pizzaMesh.position.z < 1 || this.pizzaMesh.position.z > 15) {
        this.aiDirZ = this.aiDirZ * -1;
      }
      this.aiBankZ -= 1;
    }

    // Drop the ball back to 0 on the z
    // Logic for Gravity of the pizza
    if (this.pizzaMesh.position.z > 1.1) {
      this.pizzaMesh.position.z -= 0.04;
    } else {
      this.pizzaMesh.position.z = 1;
    }

    if (this.trajectoryBankX > 0) {
      this.pizzaMesh.position.x += this.currentDirX;
      this.trajectoryBankX -= 1;

      // keeps pizza in bounds
      if (this.pizzaMesh.position.x > 20 || this.pizzaMesh.position.x < -20) {
        this.currentDirX = this.currentDirX * -1;
      }
    } else {
      this.currentDirX = 0;
    }

    if (this.trajectoryBankY > 0) {
      this.pizzaMesh.position.y += this.currentDirY;
      this.trajectoryBankY -= 1;

      // keeps pizza in bounds
      if (this.pizzaMesh.position.y > 40 || this.pizzaMesh.position.y < -40) {
        this.currentDirY = this.currentDirY * -1;
      }
    } else {
      this.currentDirY = 0;
    }
  }
}
