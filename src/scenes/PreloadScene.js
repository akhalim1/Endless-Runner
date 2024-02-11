class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.load.image("ocean", "assets/ocean.png");
    this.load.image("submarine", "assets/submarine.png");
    this.load.image("shark", "assets/shark.png");
    this.load.image("pausebutton", "assets/pausebutton.png");
    this.load.image("backbutton", "assets/backbutton.png");
    this.load.audio("bgm", "assets/bgm.mp3");
  }

  create() {
    this.scene.start("MenuScene");
  }
}
