class MenuScene extends BaseScene {
  constructor(config) {
    super("MenuScene", config);

    this.menu = [
      { scene: "PlayScene", text: "Play" },
      { scene: "TutorialScene", text: "Tutorial" },
      { scene: "CreditsScene", text: "Credits" },
      { scene: null, text: "Exit" },
    ];
  }

  create() {
    super.create();
    this.createMenu(this.menu, this.setUpMenuEvents.bind(this)); // second argument will bind the correct "this" context
  }

  setUpMenuEvents(menuItem) {
    const textObj = menuItem.textObj;
    textObj.setInteractive();
    textObj.on("pointerover", () => {
      textObj.setStyle({ fill: "#A020F0" });

      this.sound.play("mousehover");
    });

    textObj.on("pointerout", () => {
      textObj.setStyle({ fill: "#fff" });
    });

    textObj.on("pointerdown", () => {
      this.sound.play("mouseclick", { rate: 2 });
    });

    textObj.on("pointerup", () => {
      //console.log("Clicked");

      menuItem.scene && this.scene.start(menuItem.scene);

      if (menuItem === "Exit") {
        this.game.destroy(true);
      }
    });
  }
}
