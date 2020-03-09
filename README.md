# Soccer vs Football

## Background

Soccer vs Football is a game built on WebGL using the help of Three.js. Players can choose to move the soccerball with arrow keys or mouse, and can fire a laser to shoot a moving football. The objective is to lower the football's health to 0. Players will start with 100 life and will lose 10 life per damage they are hit. Laser collision with football is saved into the state of the soccerball and an accuracy of lasers fired is displayed at the end.

## Functionality & MVP

In Soccer vs Football, users will be able to:

* Start, pause, mute, and reset back back to the beginning of the battle.
* Movements include left, right, back, forward, and jumping.
* Ball can fire laser with collision based on distance.
* The game will end when the soccerball's health reduces to zero, or the football health reduces to zero.

## Wireframe

This app will consist of the single full screen, with a UI for for nav links to Github, LinkedIn, AngelList and Portfolio website at the start screen, and the player's health, boss health, and mouse direction indicator while playing if user is choosing to play with a mouse or keyboard.

<img width="1183" alt="Screen Shot 2020-03-09 at 10 44 28 AM" src="https://user-images.githubusercontent.com/43156715/76225501-f8100200-61f2-11ea-8047-c47153edfe3a.png">

<img width="928" alt="Screen Shot 2020-03-09 at 1 25 16 AM" src="https://user-images.githubusercontent.com/43156715/76225593-2097fc00-61f3-11ea-9ca2-0f787e0454de.png">

## Architecture and Technologies

* JavaScript for game logic
* three.js library for rendering 3d graphics using scenes and camera

## Implementation Timeline

Date 1: Setup all necessary Node modules, including getting webpack up and running. Write a basic entry file and how to implement 3d rendering using JavaScript.

* Get app running
* Create a ball model

Date 2: Get a ball moving and build a few obstacle models, and build the finish line model and collision/end game logic.

* Finish building level 1.

Day 3-5: Make awesome levels and power ups, and make the game challenging for players. Make the game fun and colorful using styling packs.

## File Structure

* /dist
* /src
  * /images
    * soccer_field.png
    * mouse_instructions.png
    * football-cute.png
    * football-ow.png
  * /js
    * calculations.js
    * football.js
    * game.js
    * laser.js
    * menu.js
    * setup.js
    * soccerball.js
    * sounds.js
    * three.js (3D Library)
  * /sounds
    * pew-pew.mp3
    * ouch.mp3
    * splay.wav
  * /styles
    * game.scss
* Index.html
* .gitignore
* node_modules
* package.json
* package.lock.json
* postcss.config.js
* README.md
* webpack.common.js
* webpack.dev.js
* webpack.prod.js
