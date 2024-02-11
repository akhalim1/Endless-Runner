class BaseScene extends Phaser.Scene {
  constructor(key, config) {
    // passing key since every other class will be having a unique key that will be passed here
    super(key);
    this.config = config;
  }

  create() {
    this.add.image(0, 0, "ocean").setOrigin(0);
  }
}
