class PlayScene extends BaseScene {
  constructor(config) {
    super("PlayScene", config);
    /*
    this.initialSubPos = {
      x: 100,
      y: 400,
    };
    */

    this.submarine = null;
    this.sharks = null;
    this.floatVelocity = 250;
    this.score = 0;
    this.scoreText = "";

    this.bestScore = 0;
    this.bestScoreText = "";
  }

  create() {
    super.create();
    this.createBackground();

    this.anims.create({
      key: "submarineswim",
      frames: [
        { key: "submarine", frame: "submarineswim0" },
        { key: "submarine", frame: "submarineswim1" },
        { key: "submarine", frame: "submarineswim3" },
        { key: "submarine", frame: "submarineswim4" },
        { key: "submarine", frame: "submarineswim5" },
        { key: "submarine", frame: "submarineswim6" },
        { key: "submarine", frame: "submarineswim7" },
        { key: "submarine", frame: "submarineswim8" },
      ],
      frameRate: 10,
      repeat: -1,
    });

    this.createSub();
    this.createSharks();
    this.createColliders();
    this.createScore();
    this.createPauseButton();
    this.handleInputs();
    this.listenEvents();

    this.backgroundMusic = this.sound.add("bgm", {
      loop: true,
      volume: 0.5,
    });

    this.backgroundMusic.play();
  }

  update() {
    this.ocean.tilePositionX -= 1;

    this.checkSubStatus();

    this.moveSharks();
  }

  listenEvents() {
    this.events.on("resume", () => {
      this.physics.resume();
      this.resumeMusic();
    });

    this.events.on("pause", () => {
      this.pauseMusic();
    });
  }

  pauseMusic() {
    if (this.backgroundMusic && this.backgroundMusic.isPlaying) {
      this.backgroundMusic.pause();
    }
  }

  resumeMusic() {
    if (this.backgroundMusic && this.backgroundMusic.isPaused) {
      this.backgroundMusic.resume();
    }
  }

  createBackground() {
    //this.sky = this.add.tileSprite(0, 0, 640, 480, "sky").setOrigin(0, 0);
    this.ocean = this.add
      .tileSprite(0, 0, this.config.width, this.config.height, "ocean")
      .setOrigin(0, 0);
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
      .setScale(2);
    // hitbox stuff here
    this.submarine.body.setSize(
      this.submarine.width * 0.6,
      this.submarine.height * 0.35
    );
    this.submarine.body.gravity.y = 500;
    this.submarine.setCollideWorldBounds(true);
    this.submarine.play("submarineswim");
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
      () => {
        this.sound.play("sharkbite");
        return true;
      }, // callback function that's also invoked when collsion happens (must return a boolean)
      this // callback context (the scope in which to call the callbacks)
    );
  }

  createScore() {
    this.score = 0;
    const bestScore = localStorage.getItem("bestScores");

    this.scoreText = this.add.text(16, 16, `Score: ${0}`, {
      fontSize: "20px",
      fill: "#fff",
    });

    this.bestScoreText = this.add.text(
      16,
      40,
      `Best Score: ${bestScore || 0}`,
      {
        fontSize: "15px",
        fill: "#fff",
      }
    );
  }

  createPauseButton() {
    const pauseButton = this.add
      .image(this.config.width - 10, this.config.height * 0.065, "pausebutton")
      .setOrigin(1)
      .setScale(0.5)
      .setInteractive();

    pauseButton.on("pointerdown", () => {
      console.log("Paused.");
      this.physics.pause();
      this.scene.pause();
      // this shouldn't shutdown the play scene
      this.scene.launch("PauseScene");
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

  setBestScore() {
    // local storage stuff here
    const bestScoreText = localStorage.getItem("bestScores");
    const bestScore = bestScoreText && parseInt(bestScoreText, 10);

    if (!bestScore || this.score > bestScore) {
      localStorage.setItem("bestScores", this.score);
    }
  }
  gameOver() {
    this.pauseMusic();
    this.physics.pause();
    this.submarine.setTint(132009);

    this.setBestScore();

    const bestScore = localStorage.getItem("bestScores");
    this.bestScoreText.setText(`Best Score: ${bestScore}`);

    this.time.addEvent({
      delay: 500,
      callback: () => {
        this.scene.restart();
      },
      loop: false,
    });
  }

  float() {
    this.sound.play("bubblepop", { volume: 0.1 });
    this.submarine.body.velocity.y = -this.floatVelocity;
  }
}
