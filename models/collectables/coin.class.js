class Coin extends Canvas {
	x;
	y;
	width = 80;
	height = 80;
	IMAGES_COIN = ["./img/8_coin/coin_1.png", "./img/8_coin/coin_2.png"];

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
