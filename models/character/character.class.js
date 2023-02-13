class Character extends Canvas {
	IMAGES_IDLE = [
		"img/2_character_pepe/1_idle/idle/I-1.png",
		"img/2_character_pepe/1_idle/idle/I-2.png",
		"img/2_character_pepe/1_idle/idle/I-3.png",
		"img/2_character_pepe/1_idle/idle/I-4.png",
		"img/2_character_pepe/1_idle/idle/I-5.png",
		"img/2_character_pepe/1_idle/idle/I-6.png",
		"img/2_character_pepe/1_idle/idle/I-7.png",
		"img/2_character_pepe/1_idle/idle/I-8.png",
		"img/2_character_pepe/1_idle/idle/I-9.png",
		"img/2_character_pepe/1_idle/idle/I-10.png",
		"img/2_character_pepe/1_idle/long_idle/I-11.png",
		"img/2_character_pepe/1_idle/long_idle/I-12.png",
		"img/2_character_pepe/1_idle/long_idle/I-13.png",
		"img/2_character_pepe/1_idle/long_idle/I-14.png",
		"img/2_character_pepe/1_idle/long_idle/I-15.png",
		"img/2_character_pepe/1_idle/long_idle/I-16.png",
		"img/2_character_pepe/1_idle/long_idle/I-17.png",
		"img/2_character_pepe/1_idle/long_idle/I-18.png",
		"img/2_character_pepe/1_idle/long_idle/I-19.png",
		"img/2_character_pepe/1_idle/long_idle/I-20.png",
	];
	IMAGES_WALKING = [
		"img/2_character_pepe/2_walk/W-21.png",
		"img/2_character_pepe/2_walk/W-22.png",
		"img/2_character_pepe/2_walk/W-23.png",
		"img/2_character_pepe/2_walk/W-24.png",
		"img/2_character_pepe/2_walk/W-25.png",
		"img/2_character_pepe/2_walk/W-26.png",
	];
	IMAGES_JUMPING = [
		"img/2_character_pepe/3_jump/J-31.png",
		"img/2_character_pepe/3_jump/J-32.png",
		"img/2_character_pepe/3_jump/J-33.png",
		"img/2_character_pepe/3_jump/J-34.png",
		"img/2_character_pepe/3_jump/J-35.png",
		"img/2_character_pepe/3_jump/J-36.png",
		"img/2_character_pepe/3_jump/J-37.png",
		"img/2_character_pepe/3_jump/J-38.png",
		"img/2_character_pepe/3_jump/J-39.png",
	];
	IMAGES_DAED = [
		"img/2_character_pepe/5_dead/D-51.png",
		"img/2_character_pepe/5_dead/D-52.png",
		"img/2_character_pepe/5_dead/D-53.png",
		"img/2_character_pepe/5_dead/D-54.png",
		"img/2_character_pepe/5_dead/D-55.png",
		"img/2_character_pepe/5_dead/D-56.png",
		"img/2_character_pepe/5_dead/D-57.png",
	];
	IMAGES_HURT = [
		"img/2_character_pepe/4_hurt/H-41.png",
		"img/2_character_pepe/4_hurt/H-42.png",
		"img/2_character_pepe/4_hurt/H-43.png",
	];
	// offset = {
	// 	LEFT: 72,
	// 	RIGHT: 122,
	// 	TOP: 138,
	// 	BOTTOM: 155,
	// };
	x = 20;
	y = 165;
	width = 150;
	height = 280;
	speed = 8;
	offset = {
		LEFT: 28,
		RIGHT: 70,
		TOP: 120,
		BOTTOM: 130,
	};
	// walking_sound = new Audio("audio/char_walking.mp3");

	constructor() {
		super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
		this.loadImages(this.IMAGES_IDLE);
		this.loadImages(this.IMAGES_WALKING);
		this.loadImages(this.IMAGES_JUMPING);
		this.loadImages(this.IMAGES_DAED);
		this.loadImages(this.IMAGES_HURT);
		this.characterAnimations();
		console.log();
	}

	characterAnimations() {
		setInterval(() => {
			this.checkWalkDirection();
			this.checkJump();
			this.World.checkCollisions();
			this.World.camera_x = -this.x + 100; //background moves with character
		}, 30);

		setInterval(() => {
			this.characterStatusAnimation();
		}, 130);
	}

	checkWalkDirection() {
		if (this.World.keyboard.RIGHT && this.x < this.World.level.level_end_x) {
			this.moveRight();
			this.otherDirection = false;
		} else if (this.World.keyboard.LEFT && this.x > 100) {
			this.moveLeft();
			this.otherDirection = true;
		}
	}

	checkJump() {
		if (this.World.keyboard.SPACE && !this.isAboveGround()) {
			this.speedY = 30;
		}
	}

	characterStatusAnimation() {
		if (this.isDead()) {
			this.playAnimation(this.IMAGES_DEAD);
		} else if (this.isHurt()) {
			this.playAnimation(this.IMAGES_HURT);
		} else if (this.isAboveGround()) {
			this.playAnimation(this.IMAGES_JUMPING);
		} else {
			if (this.World.keyboard.RIGHT || this.World.keyboard.LEFT) {
				this.playAnimation(this.IMAGES_WALKING);
			} else {
				this.playAnimation(this.IMAGES_IDLE);
			}
		}
	}

	collectCoin(coin) {
		console.log(coin);
	}
}
