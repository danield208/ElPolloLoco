class BackgroundObject extends Canvas {
	y = 0;
	width = 720;
	height = 480;

	constructor(imagePath, x) {
		super().loadImage(imagePath);
		this.x = x;
	}
}
