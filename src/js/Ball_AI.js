class BallAI {
  constructor(ballMesh) {
    this.ballMesh = ballMesh;
    this.ballMesh.position.x = (Math.random() * 40) - 20;

    // reduces the range so it can't instantly damage the player on spawn
    this.ballMesh.position.y = (Math.random() * 30) - 15;
    this.ballMesh.rotation.x = 0;
    this.ballMesh.rotation.y = 0;

    this.trajectoryBankX = 0;
    this.trajectoryBankY = 0;
    this.currentDirX = 0;
    this.currentDirY = 0;

    this.DIRS = [0.12, 0.08, 0.04, 0, -0.04, -0.08, -0.12];
  }

  updateMovement() {

    // Gravity for ball dropping
    if (this.ballMesh.position.z > 0.1){
      this.ballMesh.position.z -= 0.03;
    } else {
      this.ballMesh.position.z = 0;
    }

    if (this.trajectoryBankY <= 0) {
      this.trajectoryBankY = Math.random() * 6000;
      this.currentDirY = this.DIRS[
        Math.floor(Math.random() * this.DIRS.length)
      ];
    } else {
      this.ballMesh.position.y += this.currentDirY;
      this.ballMesh.rotation.x -= this.currentDirY;

      // If ball would go out of bounds, reverse direction
      if (this.ballMesh.position.y > 20 || this.ballMesh.position.y < -20) {
        this.currentDirY = this.currentDirY * -1;
      }
      this.trajectoryBankY -= 1;
    }

    if (this.trajectoryBankX <= 0) {
      this.trajectoryBankX = Math.random() * 6000;
      this.currentDirX = this.DIRS[
        Math.floor(Math.random() * this.DIRS.length)
      ];
    } else {
      this.ballMesh.position.x += this.currentDirX;
      this.ballMesh.rotation.y -= this.currentDirX;

      // If ball would go out of bounds, reverse direction
      if (this.ballMesh.position.x > 20 || this.ballMesh.position.x < -20) {
        this.currentDirX = this.currentDirX * -1;
      }
      this.trajectoryBankX -= 1;
    }
  }
}

export default BallAI;
