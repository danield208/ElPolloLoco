class Bottle extends DrawObject {
	width = 60;
	height = 60;
	splash = false;
	id = Math.random();
	bottleDeleteInit = false;
	bottleDeleting = false;
	canHit = true;

	offset = {
		left: 22,
		right: 12,
		top: 10,
		bottom: 8,
	};

	offsetX;
	offsetY;
	offsetWidth;
	offsetHeight;

	// for image generation
	timeDelayImage = 80;
	timestamp_Framerate = new Date().getTime();
	currentAnimationArray = IMAGES_CHICKEN_NORMAL;

	constructor({ x = 0, y = canvas.height - 60 - mapOffset, thrown = false, velocityX = 0, velocityY = 0 }) {
		super().loadSingleImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
		this.thrown = thrown;
		this.position = {
			x: x,
			y: y,
		};
		this.velocity = {
			x: velocityX,
			y: velocityY,
		};

		this.currentImage = BasicBottle;

		if (!thrown) this.init();
	}

	init() {
		this.setSpawnDirection();
		this.setBottleSpawn();
	}

	setSpawnDirection() {
		if (Math.random() * 10 <= 5) {
			this.loadSingleImage(IMAGES_BottleGround[0]);
		} else {
			this.loadSingleImage(IMAGES_BottleGround[1]);
		}
	}

	loadSingleImage(path) {
		this.currentImage = new Image();
		this.currentImage.src = path;
	}

	setBottleSpawn() {
		this.position.x = Math.floor(Math.random() * 100) * Math.floor(Math.random() * 100) * 5 + canvas.width;
		if (this.position.x < 1000) this.setBottleSpawn();
		else if (this.position.x > backgroundsLayer_one[8].position.x - 800) this.setBottleSpawn();
	}

	draw() {
		if (!this.thrown) ctx.drawImage(this.currentImage, this.position.x, this.position.y, this.width, this.height);
		else if (this.timestamp_Framerate + this.timeDelayImage < new Date().getTime()) {
			this.playAnimation(this.currentAnimationArray);
			this.timestamp_Framerate = new Date().getTime();
		}
		ctx.drawImage(this.currentImage, this.position.x, this.position.y, this.width, this.height);
	}

	update() {
		if (!this.thrown) {
			this.draw();
		} else if (this.splash) {
			this.timeDelayImage = 200;
			this.currentAnimationArray = IMAGES_BottleSplash;
			this.draw();
		} else {
			this.currentAnimationArray = IMAGES_BottleThrown;
			this.draw();
		}

		this.position.y += this.velocity.y;
		this.position.x += this.velocity.x;
		if (this.position.y < canvas.height - this.height - mapOffset) {
			this.velocity.y += gravity;
		} else {
			this.velocity.y = 0;
			this.velocity.x = 0;
			if (this.thrown) {
				this.splash = true;
				this.bottleDeleteInit = true;
			}
		}

		if (this.thrown && this.bottleDeleteInit) {
			if (!this.bottleDeleting) {
				this.bottleDeleting = true;
				setTimeout(() => {
					let index = bottles.findIndex((bottle) => {
						return bottle.id === this.id;
					});
					bottles.splice(index, 1);
				}, 1000);
			}
		}

		// set offset
		this.offsetX = this.position.x + this.offset.left;
		this.offsetY = this.position.y + this.offset.top;
		this.offsetWidth = this.width - this.offset.right - this.offset.left;
		this.offsetHeight = this.height - this.offset.bottom - this.offset.top;
	}
}
