export default class CarAI {
  constructor(carMesh) {
    this.carMesh = carMesh;
    this.carMesh.position.x = 0;
    this.carMesh.position.y = 0;

    this.trajectoryBankX = 0;
    this.trajectoryBankY = 0;
    this.currentDirX = 0;
    this.currentDirY = 0;
  }

  updateMovement() {
    if (this.trajectoryBankX > 0) {
      this.carMesh.position.x += this.currentDirX;
      this.trajectoryBankX -= 1;
    } else {
      this.currentDirX = 0;
    }

    if (this.trajectoryBankY > 0) {
      this.carMesh.position.y += this.currentDirY;
      this.trajectoryBankY -= 1;
    } else {
      this.currentDirY = 0;
    }
  }
}
