class BaseScene extends Phaser.Scene {
  constructor(key, config) {
    // passing key since every other class will be having a unique key that will be passed here
    super(key);
    this.config = config;
    this.fontSize = 40;
    this.lineHeight = 50;
    this.fontOptions = { fontSize: `${this.fontSize}px`, fill: "#fff" };
    this.screenCenter = [config.width / 2, config.height / 2];
  }

  create() {
    this.add.image(0, 0, "ocean").setOrigin(0);
  }

  createMenu(menu, setUpMenuEvents) {
    let lastMenuPositionY = 0;

    menu.forEach((menuItem) => {
      const menuPosition = [
        this.screenCenter[0],
        this.screenCenter[1] + lastMenuPositionY,
      ];
      menuItem.textObj = this.add
        .text(...menuPosition, menuItem.text, this.fontOptions)
        .setOrigin(0.5, 1);

      lastMenuPositionY += this.lineHeight;
      setUpMenuEvents(menuItem);
    });
  }
}
