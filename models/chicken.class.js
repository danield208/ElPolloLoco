class Chicken extends MovableObject {
	y = 338;
	width = 75;
	height = 100;
	IMAGES_WALKING = [
		"./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
		"./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
		"./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
	];
	currentImage = 0;
	constructor() {
		super().loadImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
		this.x = 200 + Math.random() * 500; // Zahl zwischen 200 und 700
		this.loadImages(this.IMAGES_WALKING);
		this.animate();
		this.speed = 0.4 + Math.random() * 0.8;
	}

	animate() {
		setInterval(() => {
			this.playAnimation(this.IMAGES_WALKING);
		}, 200);
		setInterval(() => {
			this.moveLeft();
		}, 1000 / 30);
	}
}
