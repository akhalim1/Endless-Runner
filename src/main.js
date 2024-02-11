// Project: Endless Runner
// Name: Alexander Halim
// Date: 2/1/24

/* notes here
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
  scene: [
    PreloadScene,
    new MenuScene(SHARED_CONFIG),
    new PlayScene(SHARED_CONFIG),
  ],
};

let game = new Phaser.Game(config);

let cursors;
let { height, width } = game.config;
