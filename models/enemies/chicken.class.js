class Chicken extends Canvas {
	y = 310;
	width = 90;
	height = 130;
	IMAGES_WALKING = [
		"./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
		"./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
		"./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
	];
	offset = {
		LEFT: 20,
		RIGHT: 20,
		TOP: 20,
		BOTTOM: 20,
	};

	constructor() {
		super().loadImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
		this.x = 500 + Math.random() * 500; // Zahl zwischen 200 und 700
		this.loadImages(this.IMAGES_WALKING);
		this.animate(this.IMAGES_WALKING);
		this.speed = 0.4 + Math.random() * 0.8;
	}
}
