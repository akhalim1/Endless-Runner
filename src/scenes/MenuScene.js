class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  create() {}

  preload() {
    this.load.image("sky", "./assets/sky.png");
  }
}
