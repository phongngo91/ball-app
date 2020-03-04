export default class LaserAI {
  constructor(laserMesh, shooter){
    this.laserMesh = laserMesh;
    this.shooter = shooter;
    this.laserMesh.position.x = shooter.position.x;
    this.laserMesh.position.y = shooter.position.y + 5;
    this.laserMesh.position.z = shooter.position.z;

    //This should be based on the shooter
    // Player shoots forward
    this.travelDir = 0.2;
    this.velocity = 1000;
  }

  updateMovement(){
    this.laserMesh.position.y += this.travelDir;
    this.velocity -= 1;
  }
}