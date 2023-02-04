class SmallChicken extends Canvas {
	y = 370;
	width = 55;
	height = 65;
	IMAGES_WALKING = [
		"img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
		"img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
		"img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
	];
	IMAGE_DEAD = "img/3_enemies_chicken/chicken_small/2_dead/dead.png";

	constructor() {
		super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
		this.x = 500 + Math.random() * 500;
		this.loadImages(this.IMAGES_WALKING);
		this.animate(this.IMAGES_WALKING);
		this.speed = 0.4 + Math.random() * 0.8;
	}
}
