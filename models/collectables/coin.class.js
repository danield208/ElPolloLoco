class Coin extends Canvas {
	x;
	y;
	width = 80;
	height = 80;
	IMAGES_COIN = ["./img/8_coin/coin_1.png", "./img/8_coin/coin_2.png"];
	// offset = {
	// 	LEFT: 54,
	// 	RIGHT: 54,
	// 	TOP: 54,
	// 	BOTTOM: 54,
	// };
	offset = {
		LEFT: 0,
		RIGHT: 0,
		TOP: 0,
		BOTTOM: 0,
	};

	constructor(x, y) {
		super().loadImage("img/8_coin/coin_1.png");
		this.x = x;
		this.y = y;
		this.loadImages(this.IMAGES_COIN);
		this.animate();
	}

	animate() {
		setInterval(() => {
			this.playAnimation(this.IMAGES_COIN);
		}, 800);
	}
}
