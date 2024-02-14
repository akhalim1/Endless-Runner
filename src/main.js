// Project: Endless Runner
// Name: Alexander Halim
// Hours Spent: 20h

/* 
1. A technical thing that I implemented was the flag I added to the sharks. 
I had a small issue where I had trouble coming up with a way to keep track of the score.
Originally whenever a shark passed by, it would increase their score by an insane amount due to the update() function constantly running.
My solution was to use Phaser's data component to add a flag. 
I gave each shark a "hasDodged" property (defaulted to false) that tracks whether the submarine has passed the shark.
Once the shark passes the screen, that means it didn't hit the player so I set the flag to false.
Then the score would only increase and set the flag to true if the shark's flag was false and the shark passed the submarine.

2. I think part of the visual style that brings the game a bit more to life was the addition of the animations for the sprite. 
The movement of the submarine's propeller creates the illusion of movement that captures the idea of propulusion through the deep sea.
Each sprite was designed through piskelapp which proved to be convenient (provides the json file and the spritesheet set-up). 
The API's example for the texture atlas made piecing the animation together a easier process.
(Line 25 in Play.js)

*/

"use strict";

const WIDTH = 800;
const HEIGHT = 600;
const SUB_POSITION = { x: WIDTH * 0.05, y: HEIGHT / 2 };

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: SUB_POSITION,
};

const Scenes = [
  PreloadScene,
  MenuScene,
  CreditsScene,
  TutorialScene,
  PlayScene,
  PauseScene,
];

const createScene = (Scene) => new Scene(SHARED_CONFIG);
// iterates over all the scenes, and creating a new instance of that scene with SHARED_CONFIG
const initScenes = () => Scenes.map(createScene);

let config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  render: {
    pixelArt: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
  scene: initScenes(),
};

let game = new Phaser.Game(config);

let cursors;
let { height, width } = game.config;
