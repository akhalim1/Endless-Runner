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
    this.score = 0;
    this.scoreText = "";
  }

  preload() {
    this.load.image("ocean", "assets/ocean.png");
    this.load.image("submarine", "assets/submarine.png");
    this.load.image("shark", "assets/shark.png");
  }

  create() {
    this.createBackground();
    this.createSub();
    this.createSharks();
    this.createColliders();
    this.createScore();
    this.handleInputs();
  }

  update() {
    this.sky.tilePositionX -= 1;

    this.checkSubStatus();

    this.moveSharks();
  }

  createBackground() {
    this.sky = this.add.tileSprite(0, 0, 640, 480, "sky").setOrigin(0, 0);
    this.add.image(0, 0, "ocean").setOrigin(0, 0);
  }

  // change these into classes later
  createSub() {
    this.submarine = this.physics.add
      .sprite(
        this.config.startPosition.x,
        this.config.startPosition.y,
        "submarine"
      )
      .setOrigin(0)
      .setScale(0.1);
    this.submarine.body.gravity.y = 500;
    this.submarine.setCollideWorldBounds(true);
  }

  createSharks() {
    //shark = this.physics.add.sprite(300, 100, "shark").setOrigin(0, 0);
    this.sharks = this.physics.add.group({
      key: "shark",
      repeat: 2,
      setXY: { x: 900, y: 100, stepX: -300, stepY: 20 },
    });

    this.sharks.children.iterate((shark) => {
      shark.setImmovable(true);
      shark.setVelocityX(-200);

      shark.setData("hasDodged", false);
    });
  }

  createColliders() {
    this.physics.add.collider(
      this.submarine, // object1
      this.sharks, // object2
      this.gameOver, // callback function that's invoked when collision happens
      null, // callback function that's also invoked when collsion happens (must return a boolean)
      this // callback context (the scope in which to call the callbacks)
    );
  }

  createScore() {
    this.score = 0;
    this.scoreText = this.add.text(16, 16, `Score: ${0}`, {
      fontSize: "20px",
      fill: "#fff",
    });
  }
  handleInputs() {
    // purpose of passing "this" (3rd argument): you need to provide the value of the context you want to pass into the function float. By passing "this", you will get the correct context and submarine will be defined.
    this.input.on("pointerdown", this.float, this);

    let spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    spaceBar.on("down", this.float, this);
  }

  checkSubStatus() {
    if (
      this.submarine.getBounds().bottom >= config.height ||
      this.submarine.y <= 0
    ) {
      this.gameOver();
    }
  }

  moveSharks() {
    this.sharks.children.iterate((shark) => {
      if (shark.x < -shark.width) {
        shark.x = config.width + Phaser.Math.Between(100, 300);
        shark.y = Phaser.Math.Between(0, config.height - shark.height);
        shark.setData("hasDodged", false);
      }

      if (!shark.getData("hasDodged") && shark.x < this.submarine.x) {
        this.addScore();
        shark.setData("hasDodged", true);
      }
    });
  }

  addScore() {
    this.score += 1;
    this.scoreText.setText(`Score: ${this.score}`);
  }

  gameOver() {
    this.physics.pause();
    this.submarine.setTint(132009);

    this.time.addEvent({
      delay: 500,
      callback: () => {
        this.scene.restart();
      },
      loop: false,
    });
  }

  float() {
    this.submarine.body.velocity.y = -this.floatVelocity;
  }
}
