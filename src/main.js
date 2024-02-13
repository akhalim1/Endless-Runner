// Project: Endless Runner
// Name: Alexander Halim
// Hours Spent: 20h

/* notes here
Credits: 
(Music) "Constance - The Descent" by Kevin MacLeod

Creative Tilt:
Use a minimum of four sound effects for key mechanics, UI, and/or significant events appropriate to your game design (1)
- Mouse Click SFX
- Mouse Hover Sound Effect
- Shark Bite Sound Effect
- Float Sound Effect (bubbling)

IDEA: (GAME NAME) UNDERWATER ODYSSEY

Theme: Submarine avoiding underwater hazards like coral, trenches, scary aquatic creatures (sharks, kraken?).

- Flappy Bird like mechanic. "Flap" (or float in this case) to avoid/pass through obstacles.
- Additional Idea: Gather bubbles for oxygen to keep going.
- Another Idea: Current system? (add if you have time)
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
