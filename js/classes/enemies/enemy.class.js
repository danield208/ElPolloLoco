class Enemy extends DrawObject {
	id;
	width;
	height;
	status = "alive";
	killInit = false;
	enemySpeed;
	bossChicken = 300;
	smallChicken = 50;
	normalChicken = 80;

	// boss
	healthStatus;

	offset = {
		left: 5,
		right: 5,
		top: 5,
		bottom: 5,
	};

	offsetX;
	offsetY;
	offsetWidth;
	offsetHeight;

	// for image generation
	currentImage;
	timeDelayImage = 100;
	currentImageCounter = 0;
	timestamp_Framerate = new Date().getTime();
	currentAnimationArray = IMAGES_CHICKEN_NORMAL;

	constructor(type) {
		super().loadSingleImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
		this.id = Math.random();
		this.type = type;
		this.setEnemyHeight();

		this.position = {
			x: 0,
			y: canvas.height - this.height - mapOffset,
		};

		if (type != "boss") this.initEnemy();
		else this.initBoss();
	}

	setEnemyHeight() {
		if (this.type === "small") {
			this.width = this.smallChicken;
			this.height = this.smallChicken;
		}
		if (this.type === "normal") {
			this.width = this.normalChicken;
			this.height = this.normalChicken;
		}
		if (this.type === "boss") {
			this.width = this.bossChicken;
			this.height = this.bossChicken;
		}
	}

	initEnemy() {
		this.setEnemySpawn();
		this.setEnemySpeed();
	}

	initBoss() {
		this.position.x = backgroundsLayer_one[8].position.x - 100;
		this.enemySpeed = 2;
	}

	setEnemySpawn() {
		this.position.x = Math.floor(Math.random() * 100) * Math.floor(Math.random() * 100) * 5 + canvas.width;
		if (this.position.x < 1000) {
			this.setEnemySpawn();
			return;
		} else if (this.position.x > backgroundsLayer_one[8].position.x) {
			this.setEnemySpawn();
			return;
		}
	}

	setEnemySpeed() {
		this.enemySpeed = Math.floor(Math.random() * 10);
		if (this.enemySpeed == 0) this.initEnemy();
		if (this.enemySpeed > 4) this.initEnemy();
	}

	draw() {
		this.imageArray_NormalChicken();
		this.imageArray_SmallChicken();
		this.imageArray_BossChicken();
		if (this.type != "boss") {
			this.setStandartValues();
		} else {
			this.setBossValues();
		}
		this.drawWalkDirection();
	}

	imageArray_NormalChicken() {
		if (this.type === "normal") this.currentAnimationArray = IMAGES_CHICKEN_NORMAL;
	}

	imageArray_SmallChicken() {
		if (this.type === "small") this.currentAnimationArray = IMAGES_CHICKEN_SMALL;
	}

	imageArray_BossChicken() {
		if (this.type === "boss" && bossHealth != 0 && !bossHit) {
			this.currentAnimationArray = IMAGES_BOSS_WALK;
		} else if (this.type === "boss" && bossHit) {
			this.currentAnimationArray = IMAGES_BOSS_HURT;
		} else if (this.type === "boss" && bossHealth == 0) this.currentAnimationArray = IMAGES_BOSS_DEAD;
	}

	setStandartValues() {
		if (this.timestamp_Framerate + this.timeDelayImage < new Date().getTime() && this.status != "dead") {
			this.playAnimation(this.currentAnimationArray);
			this.timestamp_Framerate = new Date().getTime();
		} else if (this.status == "dead") {
			if (this.type == "normal") this.currentImage = IMAGE_CHICKEN_NORMAL_DEAD;
			if (this.type == "small") this.currentImage = IMAGES_CHICKEN_SMALL_DEAD;
		}
	}

	setBossValues() {
		if (this.timestamp_Framerate + this.timeDelayImage < new Date().getTime()) {
			this.playAnimation(this.currentAnimationArray);
			this.timestamp_Framerate = new Date().getTime();
		} else if (bossHealth == 0) {
			if (this.type == "normal") this.currentImage = IMAGE_CHICKEN_NORMAL_DEAD;
			if (this.type == "small") this.currentImage = IMAGES_CHICKEN_SMALL_DEAD;
		}

		this.checkForHealthStatus();
		ctx.drawImage(this.healthStatus, this.position.x, this.position.y - 10, 200, 50);

		if (wonGame && initWin) {
			if (BossTimestamp_StopDeadAnimation + 800 <= new Date().getTime()) {
				walkingsound.pause();
				initWin = false;
				stopAnimation = true;
				globalCurrentImage = YouWin;
				ctx.drawImage(globalCurrentImage, canvas.width / 2 - 250, canvas.height / 2 - 100, 500, 200);
				PressButton = true;
				ctx.drawImage(
					TryAgain,
					TryAgainButtonPositionX,
					TryAgainButtonPositionY,
					TryAgainButtonWidth,
					TryAgainButtonHeight
				);
			}
		}
	}

	drawWalkDirection() {
		if (player.position.x > this.position.x && this.status != "dead") {
			// ANCHOR kein plan was hier passiert
			ctx.save();
			ctx.scale(-1, 1);
			ctx.drawImage(this.currentImage, this.position.x * -1 - this.width, this.position.y, this.width, this.height);
			ctx.restore();
		} else {
			ctx.drawImage(this.currentImage, this.position.x, this.position.y, this.width, this.height);
		}
	}

	checkForHealthStatus() {
		if (bossHealth == 100) this.healthStatus = char_health_100;
		else if (bossHealth == 75) this.healthStatus = char_health_80;
		else if (bossHealth == 50) this.healthStatus = char_health_60;
		else if (bossHealth == 25) this.healthStatus = char_health_20;
		else if (bossHealth == 0) this.healthStatus = char_health_0;
	}

	update() {
		this.draw();

		if (this.status != "dead") {
			this.setCoordinates();
		} else if (this.status == "dead") {
			this.deleteEnemy();
		}

		this.setOffset();
	}

	setCoordinates() {
		if (player.position.x < this.position.x) this.position.x -= this.enemySpeed;
		else if (player.position.x > this.position.x) this.position.x += this.enemySpeed;
	}
	deleteEnemy() {
		if (!this.killInit) {
			setTimeout(() => {
				let index = enemies.findIndex((enemy) => {
					return enemy.id === this.id;
				});
				enemies.splice(index, 1);
			}, 1000);
		}
	}
	setOffset() {
		this.offsetX = this.position.x + this.offset.left;
		this.offsetY = this.position.y + this.offset.top;
		this.offsetWidth = this.width - this.offset.right - this.offset.left;
		this.offsetHeight = this.height - this.offset.bottom - this.offset.top;
	}
}
