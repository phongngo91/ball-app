import * as THREE from "./three";
import { collision, boxCollision, laserCollision } from "./utils";
import "../styles/game.scss";
import level_1 from "./level_1";
// import BallAI from "./Ball_AI";
// import PizzaAI from "./Pizza_AI";
// import { blueBall, redBall } from "./balls";
// import { pizza } from "./pizza";
// import pizzaLaser from "./enemy_laser";
// import PizzaLaserAI from "./Pizza_Laser_AI";
import { Ball } from "./Ball";
// import { Debri } from "./Debri";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();

// let pizzaHealth;
let laserBank = [];
// let debrisBank = [];

let gameTimer = 0;
// let debriFreq = 1;

let enemyTimer;
let gameRun = false;

// const redBallModel = new BallAI(redBall);
// const blueBallModel = new BallAI(blueBall);
// const pizzaModel = new PizzaAI(pizza);
const ball = new Ball(camera);

// const gameContainer = document.createElement("div"); 
// const score = document.getElementById("score");
// gameContainer.classList.add("game-container");
renderer.setSize(window.innerWidth, window.innerHeight);

// document.addEventListener("mousemove", ball.mouseController(), false);

scene.add(level_1);

function setUp() {

  // redBallModel.resetState();
  // blueBallModel.resetState();
  // pizzaModel.resetState();
  // gameBallModel.resetState();

  // enemyTimer = 0;
  // pizzaHealth = 100;
  // pizza.position.y = 20;
  level_1.position.z = -1;
  scene.background = new THREE.Color(0x00cccc);
}

function endGame() {
  scene.remove(ball.mesh);
  // scene.remove(pizza);
  // scene.remove(redBall);
  // scene.remove(blueBall);
}

function resetGame() {
  scene.add(ball.mesh);
  // scene.add(pizza);
  // scene.add(redBall);
  // scene.add(blueBall);

  setUp();
}

// function knockCarRight() {
//   pizzaModel.currentDirX = 0.2;
//   pizzaModel.trajectoryBankX = 30;
//   pizza.position.z += 2;
// }

// function knockCarLeft() {
//   pizzaModel.currentDirX = -0.2;
//   pizzaModel.trajectoryBankX = 30;
//   pizza.position.z += 2;
// }

// function knockCarUp() {
//   pizzaModel.currentDirY = 0.2;
//   pizzaModel.trajectoryBankY = 30;
//   pizza.position.z += 2;
// }

// function knockCarDown() {
//   pizzaModel.currentDirY = -0.2;
//   pizzaModel.trajectoryBankY = 30;
//   pizza.position.z += 2;
// }

document.addEventListener("keydown", ball.controller());
document.addEventListener("keydown", e => {
  const keyCode = e.which;
  // E KEY SHOOTS
  if (keyCode === 69) {
    let laser = ball.shoot();
    laserBank.push(laser);
    scene.add(laser.mesh);
  }
});

const animate = function() {
  requestAnimationFrame(animate);

  if (gameRun === true){
    gameTimer += 1;
  }
  if (gameTimer > 240){
    renderer.setSize(window.innerWidth, window.innerHeight);
    gameTimer = 0;
  }
  

  // enemyTimer += 1;
  // gameTimer += 1;

  // if (enemyTimer > 60) {
  //   // Enemy shoots a laser every 60 frames ( 1 second )
  //   let duplicateEnemyLaser = pizzaLaser.clone();
  //   laserBank.push(new PizzaLaserAI(duplicateEnemyLaser, pizza));
  //   scene.add(duplicateEnemyLaser);

  //   enemyTimer = 0;
  // }

  // if (gameTimer > 15 / debriFreq) {
  //   // renderer.setSize(window.innerWidth, window.innerHeight);
  //   const newDebri = new Debri();
  //   debrisBank.push(newDebri);
  //   scene.add(newDebri.mesh);

  //   if (debriFreq < 1) {
  //     debriFreq += 0.01;
  //   }
  //   gameTimer = 0;
  // }

  // debrisBank.forEach(debri => {
  //   debri.update();

  //   // This means the debri has left the camera view
  //   if (debri.mesh.y < -20) {
  //     scene.remove(debri.mesh);
  //     debrisBank.splice(debrisBank.indexOf(debri), 1);
  //   }
  // });

  // if (collision(blueBall, ball.mesh)) {
  //   blueBall.position.z += 1;
  //   ball.health -= 10;
  // }

  // if (collision(ball.mesh, redBall)) {
  //   redBall.position.z += 1;
  //   ball.health -= 10;
  // }

  // Check if any of our lasers collide with the pizza
  // Each laser is our laser AI model, and each laserMesh is our randomly generated clone

  // laserBank.forEach(laser => {
  //   if (laserCollision(laser.laserMesh, pizza)) {
  //     pizzaHealth -= 10;
  //     pizza.position.y += 0.5;

  //     // remove the laser if there's collision
  //     laserBank.splice(laserBank.indexOf(laser), 1);
  //     scene.remove(laser.laserMesh);
  //   }

  //   // If we hit the player, remove that laser and reduce our health
  //   if (laserCollision(laser.laserMesh, ball.mesh)) {
  //     ball.health -= 10;
  //     ball.mesh.position.y -= 0.5;
  //     // remove the laser if there's collision
  //     laserBank.splice(laserBank.indexOf(laser), 1);
  //     scene.remove(laser.laserMesh);
  //   }
  // });

  // let hitBox = boxCollision(ball.mesh, pizza);
  // switch (hitBox) {
  //   case "LEFT COLLISION":
  //     knockCarLeft();
  //     break;
  //   case "RIGHT COLLISION":
  //     knockCarRight();
  //     break;
  //   case "FRONT COLLISION":
  //     knockCarUp();
  //     break;
  //   case "BACK COLLISION":
  //     knockCarDown();
  //     break;
  //   default:
  //     break;
  // }

  // let redHitBox = boxCollision(redBall, pizza);
  // switch (redHitBox) {
  //   case "LEFT COLLISION":
  //     knockCarLeft();
  //     break;
  //   case "RIGHT COLLISION":
  //     knockCarRight();
  //     break;
  //   case "FRONT COLLISION":
  //     knockCarUp();
  //     break;
  //   case "BACK COLLISION":
  //     knockCarDown();
  //     break;
  //   default:
  //     break;
  // }

  // let blueHitBox = boxCollision(blueBall, pizza);
  // switch (blueHitBox) {
  //   case "LEFT COLLISION":
  //     knockCarLeft();
  //     break;
  //   case "RIGHT COLLISION":
  //     knockCarRight();
  //     break;
  //   case "FRONT COLLISION":
  //     knockCarUp();
  //     break;
  //   case "BACK COLLISION":
  //     knockCarDown();
  //     break;
  //   default:
  //     break;
  // }

  // blueBallModel.updateMovement();
  // redBallModel.updateMovement();
  // pizzaModel.updateMovement();

  ball.update();

  let newLaserBank = [];

  laserBank.forEach(laser => {
    if (laser.velocity > 0) {
      newLaserBank.push(laser);
    } else {
      // take out laser from scene if it is out of velocity
      scene.remove(laser.mesh);
    }
  });

  // filter the laser bank
  laserBank = newLaserBank;

  // moves lasers
  laserBank.forEach(laser => {
    laser.update();
  });

  // Clears the top nav
  // while (score.children.length > 0) {
  //   score.removeChild(score.children[0]);
  // }

  // const playerHealthText = document.createElement("div");
  // const pizzaHealthText = document.createElement("div");

  // playerHealthText.innerHTML = "Player: " + ball.health;
  // pizzaHealthText.innerHTML = "Pizza: " + pizzaHealth;

  // if (ball.health <= 0) {
  //   cancelAnimationFrame(renderId);
  //   playerHealthText.innerHTML =
  //     "You Lose, Press r to restart";
  // }

  // if (pizzaHealth <= 0) {
  //   cancelAnimationFrame(renderId);
  //   pizzaHealthText.innerHTML = "Pizza Defeated, Press r to restart";
  // }

  // score.appendChild(playerHealthText);
  // score.appendChild(pizzaHealthText);

  renderer.render(scene, camera);
};

// document.getElementById("red-bg").addEventListener("click", () => {
//   scene.background = new THREE.Color(0xff0000);
// });
// document.getElementById("cyan-bg").addEventListener("click", () => {
//   scene.background = new THREE.Color(0x00cccc);
// });
// document.getElementById("green-bg").addEventListener("click", () => {
//   scene.background = new THREE.Color(0x008000);
// });
// document.getElementById("gray-bg").addEventListener("click", () => {
//   scene.background = new THREE.Color(0x808080);
// });

resetGame();

animate();

document.body.appendChild(renderer.domElement);
