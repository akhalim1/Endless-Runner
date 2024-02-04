// Project: Endless Runner
// Name: Alexander Halim
// Date: 2/1/24

// Spritesheet by ElvGames: https://elv-games.itch.io/free-fantasy-dreamland-sprites

/* notes here
IDEA: UNDERWATER ODYSSEY

Theme: Submarine avoiding underwater hazards like coral, trenches, scary aquatic creatures (sharks, kraken?).

- Flappy Bird like mechanic. "Flap" to avoid/pass through obstacles.
- Additional Idea: Gather bubbles for oxygen to keep going.
- Another Idea: Current system? (add if you have time)
*/

"use strict";

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  render: {
    pixelArt: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 250 },
      debug: true,
    },
  },
  scene: {
    preload,
    create,
    update,
  },
};

function preload() {
  this.load.image("ocean", "assets/ocean.png");
  this.load.image("submarine", "assets/submarine.png");
}

const VELOCITY = 200;
let floatVelocity = 250;
let submarine = null;
const initialSubPos = { x: config.width * 0.05, y: config.height / 2 };

function create() {
  this.add.image(0, 0, "ocean").setOrigin(0, 0);

  submarine = this.physics.add
    .sprite(initialSubPos.x, initialSubPos.y, "submarine")
    .setOrigin(0)
    .setScale(0.1);

  //submarine.body.velocity.x = VELOCITY;

  this.input.on("pointerdown", float);

  let spaceBar = this.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.SPACE
  );

  spaceBar.on("down", float);
}

function update(time, delta) {
  if (submarine.y > config.height || submarine.y < -submarine.height) {
    restartSubPosition();
  }
}

function restartSubPosition() {
  submarine.x = initialSubPos.x;
  submarine.y = initialSubPos.y;
  submarine.body.velocity.y = 0;
}
function float() {
  submarine.body.velocity.y = -floatVelocity;
}

let game = new Phaser.Game(config);

let cursors;
let { height, width } = game.config;
