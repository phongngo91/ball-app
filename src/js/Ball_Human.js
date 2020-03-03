class BallHuman {
  construction(ballMesh, camera){
    this.ballMesh = ballMesh;
    this.camera = camera;
    this.directionX = 0;
    this.directionY = 0;
    this.velocity = 0;

    this.score = 0;
  }

}

export default BallHuman;