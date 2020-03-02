import * as THREE from "./three";
import ball from "./ball";
import level_1 from "./level_1";
import cube from "./cube";
import cube2 from "./cube2";
import yellowBall from "./yellow_ball";
import blueBall from "./blue_ball";
import '../styles/game.scss';

let soccerBallHealth = 100;

const gameContainer = document.createElement("div");
gameContainer.classList.add("game-container");
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const randx = [0.3, 0.2, 0.1, 0.001, -0.1, -0.2, -0.3];
const randy = [0.3, 0.2, 0.1, 0.001, -0.1, -0.2, -0.3];

let xTrajectoryBank = 0;
let yTrajectoryBank = 0;
let xDir = 0;
let yDir = 0;

let blueXTrajectoryBank = 0;
let blueYTrajectoryBank = 0;
let blueXDir = 0;
let blueYDir = 0;

const topNav = document.getElementsByClassName("top-nav");

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth * (6 / 10), window.innerHeight * (6 / 10));

let id;

function restart() {
  const oldGameOver = document.getElementsByClassName("game-over-text");

  if (oldGameOver.length > 0) {
    gameContainer.removeChild(oldGameOver[0]);
  }

  gameContainer.appendChild(renderer.domElement);

  scene.add(ball);
  scene.add(level_1);
  scene.add(cube);
  scene.add(cube2);
  scene.add(yellowBall);
  scene.add(blueBall);

  cube.position.x = 3;
  cube.position.y = 10;
  cube.position.z = 1;

  cube2.position.x = -3;
  cube2.position.y = 10;
  cube2.position.z = 1;

  yellowBall.position.y = 10;
  yellowBall.position.z = 1;

  blueBall.position.y = 10;
  blueBall.position.x = -2;
  blueBall.position.z = 1;

  level_1.position.y = 10;

  camera.position.z = 7;

  camera.rotation.x = (55 * Math.PI) / 180;
  camera.position.y = -5;

  const moveSpeed = 0.5;

  const LEFT_ARROW = 37;
  const UP_ARROW = 38;
  const RIGHT_ARROW = 39;
  const DOWN_ARROW = 40;
  const R_KEY = 82;

  document.addEventListener("keydown", e => {
    var keyCode = e.which;

    if (keyCode == DOWN_ARROW) {
      ball.rotation.x += moveSpeed;
      ball.position.y -= moveSpeed;
      camera.position.y -= moveSpeed;

    } else if (keyCode == UP_ARROW) {

      ball.rotation.x -= moveSpeed;
      ball.position.y += moveSpeed;
      camera.position.y += moveSpeed;
    } else if (keyCode == RIGHT_ARROW) {

        console.log("Hello");
        level_1.position.x -= moveSpeed;
        cube.position.x -= moveSpeed;
        cube2.position.x -= moveSpeed;
        yellowBall.position.x -= moveSpeed;
        blueBall.position.x -= moveSpeed;

        ball.rotation.y -= moveSpeed;

    } else if (keyCode == LEFT_ARROW) {


        level_1.position.x += moveSpeed;
        cube.position.x += moveSpeed;
        cube2.position.x += moveSpeed;
        yellowBall.position.x += moveSpeed;
        blueBall.position.x += moveSpeed;

        ball.rotation.y += moveSpeed;

    } else if (keyCode == R_KEY) {
      restart();
    }

    renderer.render(scene, camera);
  });

  var animate = function() {
    id = requestAnimationFrame(animate);

    //Rotations
    blueBall.rotation.x += 0.1;
    blueBall.rotation.y += 0.1;

    yellowBall.rotation.x -= 0.1;
    yellowBall.rotation.y -= 0.1;

    // YELLOW BALL Y
    if (yTrajectoryBank === 0){
      yTrajectoryBank = 30;
      yDir = randy[Math.floor(Math.random() * randy.length)];
    } else {
      yellowBall.position.y += yDir;

      if (yellowBall.position.y > 20 || yellowBall.position.y < -20) {
        console.log(yellowBall.position.y);
        yDir = yDir * -1;
      }

      yTrajectoryBank -= 1;
    }

    // YELLOW BALL X
    if (xTrajectoryBank === 0){
      xTrajectoryBank = 30;
      xDir = randx[Math.floor(Math.random() * randx.length)];
    } else {
      yellowBall.position.x += xDir;

      // if it is going out of bounds, flip the direction
      if (yellowBall.position.x > 20 || yellowBall.position.x < -20){
        console.log(yellowBall.position.x);
        xDir = xDir * -1;
      }

      xTrajectoryBank -= 1;
    }

    // BLUE BALL Y
    if (blueYTrajectoryBank === 0){
      blueYTrajectoryBank = 30;
      blueYDir = randy[Math.floor(Math.random() * randy.length)];
    } else {
      blueBall.position.y += blueYDir;

      if (blueBall.position.y > 20 || blueBall.position.y < -20) {
        console.log(blueBall.position.y);
        blueYDir = blueYDir * -1;
      }

      blueYTrajectoryBank -= 1;
    }

    // BLUE BALL X

    if (blueXTrajectoryBank === 0){
      blueXTrajectoryBank = 30;
      blueXDir = randx[Math.floor(Math.random() * randx.length)];
    } else {
      blueBall.position.x += blueXDir;

      // if it is going out of bounds, flip the direction
      if (blueBall.position.x > 20 || blueBall.position.x < -20){
        console.log(blueBall.position.x);
        blueXDir  = blueXDir  * -1;
      }

      blueXTrajectoryBank -= 1;
    }

    renderer.render(scene, camera);
  };
  animate();
}

restart();

export default gameContainer;
