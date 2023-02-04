class StatusbarCoins extends Canvas {
	IMAGES = [
		"img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
		"img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
		"img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
		"img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
		"img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
		"img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
	];

	Percentage = 100;

	constructor() {
		super();
		this.loadImages(this.IMAGES);
		this.x = 20;
		this.y = -20;
		this.width = 200;
		this.height = 100;
		this.setPercentage(100);
	}

	setPercentage(percentage) {
		this.Percentage = percentage;
		let path = this.IMAGES[this.resolveImageIndex()];
		this.img = this.imageCache[path];
	}

	resolveImageIndex() {
		if (this.Percentage == 100) {
			return 5;
		} else if (this.Percentage > 80) {
			return 4;
		} else if (this.Percentage > 60) {
			return 3;
		} else if (this.Percentage > 40) {
			return 2;
		} else if (this.Percentage > 20) {
			return 1;
		} else {
			return 0;
		}
	}
}
