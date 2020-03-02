import * as THREE from "./three";
import ball from "./ball";
import level_1 from "./level_1";
import cube from "./cube";
import cube2 from "./cube2";
import '../styles/game.scss';

// let timer = 0;

const gameContainer = document.createElement("div");
gameContainer.classList.add("game-container");
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

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

  cube.position.x = 3;
  cube.position.y = 10;
  cube.position.z = 1;

  cube2.position.x = -3;
  cube2.position.y = 10;
  cube2.position.z = 1;

  level_1.position.y = 10;

  camera.position.z = 4;

  camera.rotation.x = (55 * Math.PI) / 180;
  camera.position.y = -3;

  const moveSpeed = 0.5;

  const LEFT_ARROW = 37;
  const UP_ARROW = 38;
  const RIGHT_ARROW = 39;
  const DOWN_ARROW = 40;
  const R_KEY = 82;

  document.addEventListener("keydown", e => {
    var keyCode = e.which;

    if (keyCode == DOWN_ARROW) {
      level_1.position.y += moveSpeed;
      cube.position.y += moveSpeed;
      cube2.position.y += moveSpeed;
      ball.rotation.x += moveSpeed;
    } else if (keyCode == UP_ARROW) {
      level_1.position.y -= moveSpeed;
      cube.position.y -= moveSpeed;
      cube2.position.y -= moveSpeed;
      ball.rotation.x -= moveSpeed;
    } else if (keyCode == RIGHT_ARROW) {
      // Collision check
      if (Math.round(ball.position.x) !== Math.round(cube.position.x - 1)) {
        console.log("Hello");
        level_1.position.x -= moveSpeed;
        cube.position.x -= moveSpeed;
        cube2.position.x -= moveSpeed;
        ball.rotation.y -= moveSpeed;
      } else {
        console.log("COLLISION");
      }
    } else if (keyCode == LEFT_ARROW) {
      if (Math.round(ball.position.x) !== Math.round(cube2.position.x + 1)){
        console.log("Hello");

        level_1.position.x += moveSpeed;
        cube.position.x += moveSpeed;
        cube2.position.x += moveSpeed;
        ball.rotation.y += moveSpeed;
      } else {
        console.log("COLLISION");
      }
    } else if (keyCode == R_KEY) {
      restart();
    }

    if (level_1.position.y < -10) {
      // var gameWindow = document.querySelector("canvas");
      // if (gameWindow) {
      //   gameContainer.removeChild(gameWindow);

      
      const gameOver = document.createElement("div");
      gameOver.classList.add("game-over-text");
      gameOver.innerHTML = "GAME OVER, press r to Restart";
      // timer = 0;
      cancelAnimationFrame( id );
      var gameContainer = document.getElementsByClassName('content-container');
      if (gameContainer.length > 0){
        gameContainer[0].appendChild(gameOver);

      }
      // gameContainer.appendChild(gameOver);
      // }
    }
    console.log(ball.position.x, ball.position.y);
    console.log(cube.position.x, cube.position.y);

    // if (Math.round(ball.position.y) === Math.round(cube.position.y)) {
    //   ball.position.y -= 2;
    //   camera.position.y -= 2;
    //   console.log("COLLISION");
    // }

    renderer.render(scene, camera);
  });

  var animate = function() {
    id = requestAnimationFrame(animate);

    // const oldTimeTrack = document.getElementsByClassName("timer");
    // if (oldTimeTrack.length > 0 && topNav.length > 0) {
    //   topNav[0].removeChild(oldTimeTrack[0]);
    // }

    // timer += 0.1;

    // const timeTrack = document.createElement("div");
    // timeTrack.innerHTML = Math.floor(timer);
    // timeTrack.classList.add("timer");

    // if (topNav.length > 0){
    //   topNav[0].appendChild(timeTrack);
    // }

    renderer.render(scene, camera);
  };
  animate();
}

restart();

export default gameContainer;
