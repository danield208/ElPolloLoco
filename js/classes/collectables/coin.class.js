class Coin extends DrawObject {
	position = {
		x: 0,
		y: 120,
	};

	width = 90;
	height = 90;

	offset = {
		left: 30,
		right: 30,
		top: 30,
		bottom: 30,
	};

	offsetX;
	offsetY;
	offsetWidth;
	offsetHeight;

	// for image generation
	currentImage;
	timeDelayImage = 200;
	currentImageCounter = 0;
	timestamp_Framerate = new Date().getTime();
	currentAnimationArray = IMAGES_COIN;

	constructor() {
		super().loadSingleImage("img/8_coin/coin_1.png");
		this.initCoin();
	}

	initCoin() {
		this.position.x = Math.floor(Math.random() * 100) * Math.floor(Math.random() * 100) * 5 + canvas.width;
		if (this.position.x < 1000) {
			this.initCoin();
			return;
		} else if (this.position.x > backgroundsLayer_one[8].position.x) {
			this.initCoin();
			return;
		}
	}

	draw() {
		if (this.timestamp_Framerate + this.timeDelayImage < new Date().getTime()) {
			this.playAnimation(this.currentAnimationArray);
			this.timestamp_Framerate = new Date().getTime();
		}
		ctx.drawImage(this.currentImage, this.position.x, this.position.y, this.width, this.height);

		// set offset
		this.offsetX = this.position.x + this.offset.left;
		this.offsetY = this.position.y + this.offset.top;
		this.offsetWidth = this.width - this.offset.right - this.offset.left;
		this.offsetHeight = this.height - this.offset.bottom - this.offset.top;
	}
}
