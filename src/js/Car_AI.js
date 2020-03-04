export default class CarAI {
  constructor(carMesh) {
    this.carMesh = carMesh;
    this.carMesh.position.x = 0;
    this.carMesh.position.y = 0;
    this.carMesh.position.z = 0;

    this.trajectoryBankX = 0;
    this.trajectoryBankY = 0;
    this.currentDirX = 0;
    this.currentDirY = 0;
  }

  updateMovement() {

    // Drop the ball back to 0 on the z
    if (this.carMesh.position.z > 0.1){
      this.carMesh.position.z -= 0.07;
    } else {
      this.carMesh.position.z = 0;
    }

    if (this.trajectoryBankX > 0) {
      this.carMesh.position.x += this.currentDirX;
      this.trajectoryBankX -= 1;

      // keeps car in bounds
      if (this.carMesh.position.x > 20 || this.carMesh.position.x < -20) {
        this.currentDirX = this.currentDirX * -1;
      }
    } else {
      this.currentDirX = 0;
    }

    if (this.trajectoryBankY > 0) {
      this.carMesh.position.y += this.currentDirY;
      this.trajectoryBankY -= 1;

      // keeps car in bounds
      if (this.carMesh.position.y> 40 || this.carMesh.position.y < -40) {
        this.currentDirY = this.currentDirY * -1;
      }
    } else {
      this.currentDirY = 0;
    }
  }
}
