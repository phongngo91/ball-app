class BallHuman {
  constructor(ballMesh){
    this.ballMesh = ballMesh;
    this.directionX = 0;
    this.directionY = 0;
    this.velocity = 0;
    this.trajectoryBankZ = 0;

    this.score = 0;
  }

  resetState(){
    this.directionX = 0;
    this.directionY = 0;
    this.velocity = 0;
    this.trajectoryBankZ = 0;

    this.score = 0;
  }

  updateMovement(){

    if (this.trajectoryBankZ > 0){
      this.trajectoryBankZ -= 0.1;
      this.ballMesh.position.z += 0.2;
    }

    if (this.ballMesh.position.z > 0){
      this.ballMesh.position.z -= 0.1;
    } else {
      this.ballMesh.position.z = 0;
    }

  }

}

export default BallHuman;