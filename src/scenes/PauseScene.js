class PauseScene extends BaseScene {
  constructor(config) {
    super("PauseScene", config);

    this.menu = [
      { scene: "PlayScene", text: "Resume" },
      // { scene: "TutorialScene", text: "Tutorial" },
      { scene: "MenuScene", text: "Exit to Menu" },
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
    });

    textObj.on("pointerout", () => {
      textObj.setStyle({ fill: "#fff" });
    });

    textObj.on("pointerup", () => {
      if (menuItem.scene && menuItem.text === "Resume") {
        // shuts down pause scene
        this.scene.stop();
        // resumes play scene
        this.scene.resume(menuItem.scene);
      } else {
        // Shuts down play scene, pause scene
        this.scene.stop("PlayScene");
        // starts menu scene
        this.scene.start(menuItem.scene);
      }
    });
  }
}
