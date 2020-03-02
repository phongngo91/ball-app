import * as THREE from "./three";
import ball from "./ball";
import level_1 from "./level_1";

let timer = 0;

const gameContainer = document.createElement("div");
gameContainer.classList.add("game-container");
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const topNav = document.getElementsByClassName('top-nav');

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth * (6 / 10), window.innerHeight * (6 / 10));

function restart() {
  var id;

  const oldGameOver = document.getElementsByClassName("game-over-text");

  if (oldGameOver.length > 0) {
    gameContainer.removeChild(oldGameOver[0]);
  }

  gameContainer.appendChild(renderer.domElement);

  scene.add(ball);
  scene.add(level_1);
  level_1.position.y = 10;

  camera.position.z = 5;

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
      ball.rotation.x += moveSpeed;
    } else if (keyCode == UP_ARROW) {
      level_1.position.y -= moveSpeed;
      ball.rotation.x -= moveSpeed;
    } else if (keyCode == RIGHT_ARROW) {
      level_1.position.x -= moveSpeed;
      ball.rotation.y -= moveSpeed;
    } else if (keyCode == LEFT_ARROW) {
      level_1.position.x += moveSpeed;
      ball.rotation.y += moveSpeed;
    } else if (keyCode == R_KEY) {
      restart();
    }

    if (level_1.position.y < -10) {
      var gameWindow = document.querySelector("canvas");
      if (gameWindow) {
        gameContainer.removeChild(gameWindow);

        const gameOver = document.createElement("div");
        gameOver.classList.add("game-over-text");
        gameOver.innerHTML = "GAME OVER, press r to restart";
        cancelAnimationFrame( id );
        gameContainer.appendChild(gameOver);
      }
    }
    console.log(level_1.position.y);
    renderer.render(scene, camera);
  });

  var animate = function() {
    id = requestAnimationFrame(animate);

    const oldTimeTrack = document.getElementsByClassName("timer");
    if (oldTimeTrack.length > 0 && topNav.length > 0) {
      topNav[0].removeChild(oldTimeTrack[0]);
    }

    timer += 0.1;

    const timeTrack = document.createElement("div");
    timeTrack.innerHTML = Math.floor(timer);
    timeTrack.classList.add("timer");

    if (topNav.length > 0){
      topNav[0].appendChild(timeTrack);
    }

    renderer.render(scene, camera);
  };
  animate();
}

restart();

export default gameContainer;
