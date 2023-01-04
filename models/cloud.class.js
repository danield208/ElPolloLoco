class cloud extends MovableObject {
	y = 20;
	height = 250;
	width = 480;

	constructor() {
		super().loadImage("../img/5_background/layers/4_clouds/1.png");
		this.x = 700;
		this.animate();
	}

	animate() {
		this.moveLeft();
	}
}
