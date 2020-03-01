# JS Project Proposal: Ball rolling down a hill

## Background

Ball Rolling Down A Hill is a game built on the 3d plane, where the objective is to control a ball with arrow keys, while avoiding obstacles and reaching the finish line within a set amount of time, while still having the ball's health greater than 0(Ball life will start at 100 and decrease per collision with obstacles). The faster the player achieves to avoid all obstactles and read the finish line, the more winning they are doing. 

Collisions with certain obstacles will also have suprises, an example being, if a player's ball collides with a tree, the ball will turn green, and if the ball collides with a fireball, the ball with be ignited and the ball will speed up, but life will be greatly reduced (-20). Getting the fastest time will involve balancing between which objects to intentionally collide with and which to avoid.

## Functionality & MVP

With Ball Rolling Down A Hill, users will be able to:

* Start, pause, and reset back to the beginning of the hill.
* Move the ball left or right, or back and forth on on the hill.
* (dispite being on a hill, the ball will not move without user's input, users have full control and can roll backwards if they wish).
* The game will end when the time runs out, or the user collides with too many obstactles and the health reaches 0.

In addition, the project will include:

* An About modal describing the background and rules of the game
* A production README

##  Wireframes

This app will consist of a single screen with a play screen, nav links to the Github, LinkedIn and the controls, a controls help screen, and a timer countdown on the upper left, and a current power on the left side.

<img width="812" alt="Screen Shot 2020-03-01 at 6 12 15 PM" src="https://user-images.githubusercontent.com/43156715/75635921-39e3eb80-5be8-11ea-9089-67a215e542cd.png">

## Architecture and Technologies

* JavaScript for game logic

## Implementation Timeline

Date 1: Setup all necessary Node modules, including getting webpack up and running. Write a basic entry file and how to implement 3d rendering using JavaScript.

* Get app running
* Create a ball model

Date 2: Get a ball moving and build a few obstacle models, and build the finish line model and collision/end game logic.

* Finish building level 1.

Day 3-5: Make awesome levels and power ups, and make the game challenging for players. Make the game fun and colorful using styling packs.
