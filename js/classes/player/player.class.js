class Player extends DrawObject {
	bottles = 0;
	coins = 0;
	damage = false;
	InitDead = true;
	playerDead = false;

	offset = {
		left: 17,
		right: 28,
		top: 100,
		bottom: 10,
	};

	offsetX;
	offsetY;
	offsetWidth;
	offsetHeight;

	// for image generation
	currentImage;
	timeDelayImage = 100;
	currentImageCounter = 0;
	currentAnimationArray = IMAGES_IDLE;
	timestamp_Framerate = new Date().getTime();

	BossTimestamp_StopDeadAnimation = new Date().getTime();

	constructor() {
		super().loadSingleImage("img/2_character_pepe/1_idle/I-1.png");

		this.width = 100;
		this.height = 250;
		this.speed = 8;
		this.jumpHieght = 25;
		this.health = 1000;
		this.CharHealthBar;
		this.velocity = {
			x: 0,
			y: 0,
		};
		this.position = {
			x: canvas.width / 3,
			y: 177,
		};
	}

	checkHealth() {
		if (this.health == 1000) this.CharHealthBar = char_health_100;
		else if (this.health >= 800) this.CharHealthBar = char_health_80;
		else if (this.health >= 600) this.CharHealthBar = char_health_60;
		else if (this.health >= 400) this.CharHealthBar = char_health_40;
		else if (this.health >= 200) this.CharHealthBar = char_health_20;
		else if (this.health == 0) this.CharHealthBar = char_health_0;
	}

	draw() {
		if (this.timestamp_Framerate + this.timeDelayImage < new Date().getTime()) {
			this.playAnimation(this.currentAnimationArray);
			this.timestamp_Framerate = new Date().getTime();
		}
		if (lastPosition === "left") {
			// ANCHOR kein plan was hier passiert
			ctx.save();
			ctx.scale(-1, 1);
			ctx.drawImage(this.currentImage, this.position.x * -1 - this.width, this.position.y, this.width, this.height);
			ctx.restore();
		} else {
			ctx.drawImage(this.currentImage, this.position.x, this.position.y, this.width, this.height);
		}
		ctx.drawImage(this.CharHealthBar, 0, 0, 200, 50);
	}

	update() {
		if (!player.playerDead) {
			this.checkHealth();
			this.draw();
			this.position.y += this.velocity.y;
			this.position.x += this.velocity.x;

			// set offset
			this.offsetX = this.position.x + this.offset.left;
			this.offsetY = this.position.y + this.offset.top;
			this.offsetWidth = this.width - this.offset.right - this.offset.left;
			this.offsetHeight = this.height - this.offset.bottom - this.offset.top;
		} else {
			if (this.timestamp_StopDeadAnimation + 700 <= new Date().getTime()) {
				walkingsound.pause();
				stopAnimation = true;
				this.currentImage = GameOver;
				ctx.drawImage(this.currentImage, 0, 0, canvas.width, canvas.height);
				PressButton = true;
				ctx.drawImage(
					TryAgain,
					TryAgainButtonPositionX,
					TryAgainButtonPositionY,
					TryAgainButtonWidth,
					TryAgainButtonHeight
				);
			} else {
				this.currentAnimationArray = IMAGES_DEAD;
				this.draw();
			}
		}
	}
}
