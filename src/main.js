// Project: Endless Runner
// Name: Alexander Halim
// Date: 2/1/24

/* notes here

Include in-game instructions using text or other means (e.g., tooltips, tutorial, diagram, etc.) (1)
Include one or more animated characters that use a texture atlas* (1)
Simulate scrolling with a tileSprite (or equivalent means) (1)
Have looping background music* (1)
Use a minimum of four sound effects for key mechanics, UI, and/or significant events appropriate to your game design (1)
Include in-game credits for all roles, assets, music, etc. (1)
* You must make all of your own visual assets (without AI assistance). It's OK to use royalty-free music/SFX.

IDEA: (GAME NAME) UNDERWATER ODYSSEY

Theme: Submarine avoiding underwater hazards like coral, trenches, scary aquatic creatures (sharks, kraken?).

- Flappy Bird like mechanic. "Flap" to avoid/pass through obstacles.
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

const Scenes = [PreloadScene, MenuScene, PlayScene];

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
