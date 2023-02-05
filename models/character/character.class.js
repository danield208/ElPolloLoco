class Character extends Canvas {
	x = 20;
	y = 165;
	width = 150;
	height = 280;
	speed = 8;
	World;
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
	];
	IMAGES_LONGIDLE = [
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
		"../img/2_character_pepe/2_walk/W-21.png",
		"../img/2_character_pepe/2_walk/W-22.png",
		"../img/2_character_pepe/2_walk/W-23.png",
		"../img/2_character_pepe/2_walk/W-24.png",
		"../img/2_character_pepe/2_walk/W-25.png",
		"../img/2_character_pepe/2_walk/W-26.png",
	];
	IMAGES_JUMPING = [
		"../img/2_character_pepe/3_jump/J-31.png",
		"../img/2_character_pepe/3_jump/J-32.png",
		"../img/2_character_pepe/3_jump/J-33.png",
		"../img/2_character_pepe/3_jump/J-34.png",
		"../img/2_character_pepe/3_jump/J-35.png",
		"../img/2_character_pepe/3_jump/J-36.png",
		"../img/2_character_pepe/3_jump/J-37.png",
		"../img/2_character_pepe/3_jump/J-37.png",
		"../img/2_character_pepe/3_jump/J-38.png",
		"../img/2_character_pepe/3_jump/J-39.png",
	];
	IMAGES_DAED = [
		"./img/2_character_pepe/5_dead/D-51.png",
		"./img/2_character_pepe/5_dead/D-52.png",
		"./img/2_character_pepe/5_dead/D-53.png",
		"./img/2_character_pepe/5_dead/D-54.png",
		"./img/2_character_pepe/5_dead/D-55.png",
		"./img/2_character_pepe/5_dead/D-56.png",
		"./img/2_character_pepe/5_dead/D-57.png",
	];
	IMAGES_HURT = [
		"img/2_character_pepe/4_hurt/H-41.png",
		"img/2_character_pepe/4_hurt/H-42.png",
		"img/2_character_pepe/4_hurt/H-43.png",
	];
	walking_sound = new Audio("../audio/char_walking.mp3");

	IdleAnimation = false;
	Action = false;

	constructor() {
		super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
		this.loadImages(this.IMAGES_IDLE);
		this.loadImages(this.IMAGES_LONGIDLE);
		this.loadImages(this.IMAGES_WALKING);
		this.loadImages(this.IMAGES_JUMPING);
		this.loadImages(this.IMAGES_DAED);
		this.loadImages(this.IMAGES_HURT);
		// this.initIdle();
		this.animate();
		this.applyGravity();
	}

	initIdle() {
		setInterval(() => {
			if (!this.IdleAnimation && !this.Action) this.playIdleAnimation();
		}, 10);
	}

	playIdleAnimation() {
		this.IdleAnimation = true;
		this.IMAGES_IDLE.forEach((image) => {
			console.log("draw");
			this.loadImage(image);
			setTimeout(() => {
				this.draw();
			}, 200);
		});
	}

	animate() {
		//walk, jump and throw animations
		setInterval(() => {
			// this.walking_sound.pause();
			if (this.World.keyboard.RIGHT && this.x < this.World.level.level_end_x) {
				this.moveRight();
				this.otherDirection = false;
				this.Action = true;
				// this.walking_sound.play();
			}
			if (this.World.keyboard.LEFT && this.x > 0) {
				this.moveLeft();
				this.otherDirection = true;
				// this.walking_sound.play();
			}
			if (this.World.keyboard.SPACE && !this.isAboveGround()) {
				this.jump();
			}
			if (this.World.keyboard.THROW) {
				new ThrowableObject();
			}
			this.World.camera_x = -this.x + 100;
		}, 1000 / 30);

		//play character animation
		setInterval(() => {
			if (this.isDead()) {
				this.playAnimation(this.IMAGES_DAED);
			}
			if (this.isHurt()) {
				this.playAnimation(this.IMAGES_HURT);
			}
			if (this.isAboveGround()) {
				this.playAnimation(this.IMAGES_JUMPING);
			}
			{
				if (this.World.keyboard.RIGHT || this.World.keyboard.LEFT) {
					this.playAnimation(this.IMAGES_WALKING);
				}
			}
		}, 100);
	}
}
