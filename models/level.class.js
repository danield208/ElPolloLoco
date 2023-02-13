class Level {
	enemies;
	coins;
	clouds;
	backgroundObjects;
	level_end_x = 2200;

	constructor() {
		this.initLevel();
	}

	initLevel() {
		// this.setEnemies();
		this.setCoins();
		this.setClouds();
		this.setBackground();
	}

	setEnemies() {
		this.enemies = [
			new Chicken(),
			new Chicken(),
			new Chicken(),
			new SmallChicken(),
			new SmallChicken(),
			new SmallChicken(),
			new Endboss(),
		];
	}

	setCoins() {
		this.coins = [new Coin(300, 140), new Coin(450, 340), new Coin(900, 140), new Coin(1200, 140), new Coin(1500, 140)];
	}

	setClouds() {
		this.clouds = [new cloud()];
	}

	setBackground() {
		this.backgroundObjects = [
			new BackgroundObject("../img/5_background/layers/air.png", -719),
			new BackgroundObject("../img/5_background/layers/3_third_layer/2.png", -719),
			new BackgroundObject("../img/5_background/layers/2_second_layer/2.png", -719),
			new BackgroundObject("../img/5_background/layers/1_first_layer/2.png", -719),
			new BackgroundObject("../img/5_background/layers/air.png", 0),
			new BackgroundObject("../img/5_background/layers/3_third_layer/1.png", 0),
			new BackgroundObject("../img/5_background/layers/2_second_layer/1.png", 0),
			new BackgroundObject("../img/5_background/layers/1_first_layer/1.png", 0),
			new BackgroundObject("../img/5_background/layers/air.png", 719, 0),
			new BackgroundObject("../img/5_background/layers/3_third_layer/2.png", 719),
			new BackgroundObject("../img/5_background/layers/2_second_layer/2.png", 719),
			new BackgroundObject("../img/5_background/layers/1_first_layer/2.png", 719),
			new BackgroundObject("../img/5_background/layers/air.png", 719 * 2, 0),
			new BackgroundObject("../img/5_background/layers/3_third_layer/1.png", 719 * 2),
			new BackgroundObject("../img/5_background/layers/2_second_layer/1.png", 719 * 2),
			new BackgroundObject("../img/5_background/layers/1_first_layer/1.png", 719 * 2),
			new BackgroundObject("../img/5_background/layers/air.png", 719 * 3, 0),
			new BackgroundObject("../img/5_background/layers/3_third_layer/2.png", 719 * 3),
			new BackgroundObject("../img/5_background/layers/2_second_layer/2.png", 719 * 3),
			new BackgroundObject("../img/5_background/layers/1_first_layer/2.png", 719 * 3),
		];
	}
}
