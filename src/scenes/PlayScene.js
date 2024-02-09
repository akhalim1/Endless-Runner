class PlayScene extends Phaser.Scene {
  constructor(config) {
    super("PlayScene");
    /*
    this.initialSubPos = {
      x: 100,
      y: 400,
    };
    */
    this.config = config;
    this.submarine = null;
    this.sharks = null;
    this.floatVelocity = 250;
  }

  preload() {
    this.load.image("ocean", "assets/ocean.png");
    this.load.image("submarine", "assets/submarine.png");
    this.load.image("shark", "assets/shark.png");
  }

  create() {
    this.sky = this.add.tileSprite(0, 0, 640, 480, "sky").setOrigin(0, 0);
    this.add.image(0, 0, "ocean").setOrigin(0, 0);

    this.submarine = this.physics.add
      .sprite(
        this.config.startPosition.x,
        this.config.startPosition.y,
        "submarine"
      )
      .setOrigin(0)
      .setScale(0.1);

    this.submarine.body.gravity.y = 400;

    //shark = this.physics.add.sprite(300, 100, "shark").setOrigin(0, 0);
    this.sharks = this.physics.add.group({
      key: "shark",
      repeat: 2,
      setXY: { x: 900, y: 100, stepX: -300, stepY: 20 },
    });

    this.sharks.children.iterate((shark) => {
      shark.setVelocityX(-200);
    });

    // purpose of passing "this" (3rd argument): you need to provide the value of the context you want to pass into the function float. By passing "this", you will get the correct context and submarine will be defined.
    this.input.on("pointerdown", this.float, this);

    let spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    spaceBar.on("down", this.float, this);
  }

  update() {
    this.sky.tilePositionX -= 1;

    if (
      this.submarine.y > config.height ||
      this.submarine.y < -this.submarine.height
    ) {
      this.restartSubPosition();
    }

    //shark movement here
    this.sharks.children.iterate((shark) => {
      if (shark.x < -shark.width) {
        shark.x = config.width + Phaser.Math.Between(100, 300);
        shark.y = Phaser.Math.Between(0, config.height - shark.height);
      }
    });
  }

  restartSubPosition() {
    this.submarine.x = this.config.startPosition.x;
    this.submarine.y = this.config.startPosition.y;
    this.submarine.body.velocity.y = 0;
  }

  float() {
    this.submarine.body.velocity.y = -this.floatVelocity;
  }
}
