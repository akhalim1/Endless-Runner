class MenuScene extends Phaser.Scene {
  constructor(config) {
    super("MenuScene");
    this.config = config;
  }

  preload() {
    this.load.image("ocean", "assets/ocean.png");
  }

  create() {
    this.add.image(0, 0, "ocean").setOrigin(0);
    //this.scene.start("PlayScene");
  }
}
