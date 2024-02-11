class TutorialScene extends BaseScene {
  constructor(config) {
    super("TutorialScene", {...config, canGoBack: true});
  }

  create() {
    super.create();

    const tutorialText =
      "Mouse click or press your spacebar to increase velocity. Avoid the sharks for as long as possible. Each passed shark returns a +1 score.";

    const textOptions = {
      ...this.fontOptions,
      wordWrap: { width: this.config.width - 40 },
      align: "center",
    };
    this.add
      .text(...this.screenCenter, tutorialText, textOptions)
      .setOrigin(0.5);
  }
}
