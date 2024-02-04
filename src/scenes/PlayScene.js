class PlayScene extends Phaser.Scene {
  constructor(config) {
    super("PlayScene");
  }

  create() {
    this.sky = this.add.tileSprite(0, 0, 640, 480, "sky").setOrigin(0, 0);
  }

  update() {
    this.sky.tilePositionX -= 1;
  }
}
