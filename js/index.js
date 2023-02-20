const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let PressButton = false;
// for Framerate
let frameRateTimeStamp;
let frameRate = 1000 / 70;

// ANCHOR walkingsound
const walkingsound = new Audio("audio/char_walking.mp3");
walkingsound.volume = 0.1;

// in init()
// Arrays
let clouds;
let enemies;
let bottles;
let coinsArray;
let timoutArray;
let backgroundsLayer_one;
let backgroundsLayer_two;
let backgroundsLayer_three;

// strings
let lastPosition;

// number with new Date()
let timestamp_ThrownBottle;

let bossStats;
let bossHealth;

let player;
let airBackground;

// numbers
let enemyDamage;
const gravity = 1.2;
const mapOffset = 50;
let bottleAmount = 12;
const timeDelay = 400;
let bossDeadAnimationTimestamp;

// booleans
const keys = {
	left: false,
	right: false,
	space: false,
	throw: false,
};
let flip;
let bossHit;
let wonGame;
let initWin;
let bossSpawned;
let flippingImage;
let playerJumping;
let stopAnimation;
let setWinTimestamp;
let doesObjectHitEnemy;
let globalCurrentImage;

let TryAgainButtonWidth;
let TryAgainButtonHeight;
let TryAgainButtonPositionX;
let TryAgainButtonPositionY;

let StartButtonWidth;
let StartButtonHeight;
let StartButtonPositionX;
let StartButtonPositionY;

let addToImageCacheDone = 0;
let imageCacheLoaded = false;

// ANCHOR src Arrays
const IMAGES_IDLE = [
	"img/2_character_pepe/1_idle/I-1.png",
	"img/2_character_pepe/1_idle/I-2.png",
	"img/2_character_pepe/1_idle/I-3.png",
];
const IMAGES_WALK = [
	"img/2_character_pepe/2_walk/W-21.png",
	"img/2_character_pepe/2_walk/W-22.png",
	"img/2_character_pepe/2_walk/W-23.png",
	"img/2_character_pepe/2_walk/W-24.png",
	"img/2_character_pepe/2_walk/W-25.png",
	"img/2_character_pepe/2_walk/W-26.png",
];
const IMAGES_JUMP = [
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
const IMAGES_HURT = [
	"img/2_character_pepe/4_hurt/H-41.png",
	"img/2_character_pepe/4_hurt/H-42.png",
	"img/2_character_pepe/4_hurt/H-43.png",
];
const IMAGES_DEAD = [
	"img/2_character_pepe/5_dead/D-51.png",
	"img/2_character_pepe/5_dead/D-52.png",
	"img/2_character_pepe/5_dead/D-53.png",
	"img/2_character_pepe/5_dead/D-54.png",
	"img/2_character_pepe/5_dead/D-55.png",
	"img/2_character_pepe/5_dead/D-56.png",
	"img/2_character_pepe/5_dead/D-57.png",
];
const IMAGES_CHICKEN_NORMAL = [
	"img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
	"img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
	"img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
];
const IMAGES_CHICKEN_SMALL = [
	"img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
	"img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
	"img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
];
const IMAGES_BOSS_WALK = [
	"img/4_enemie_boss_chicken/1_walk/G1.png",
	"img/4_enemie_boss_chicken/1_walk/G2.png",
	"img/4_enemie_boss_chicken/1_walk/G3.png",
	"img/4_enemie_boss_chicken/1_walk/G4.png",
];
const IMAGES_BOSS_HURT = [
	"img/4_enemie_boss_chicken/4_hurt/G21.png",
	"img/4_enemie_boss_chicken/4_hurt/G22.png",
	"img/4_enemie_boss_chicken/4_hurt/G23.png",
];
const IMAGES_BOSS_DEAD = [
	"img/4_enemie_boss_chicken/5_dead/G24.png",
	"img/4_enemie_boss_chicken/5_dead/G25.png",
	"img/4_enemie_boss_chicken/5_dead/G26.png",
];
const IMAGES_COIN = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];
const IMAGES_BottleGround = [
	"img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
	"img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
];
const IMAGES_BottleThrown = [
	"img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
	"img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
	"img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
	"img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
];
const IMAGES_BottleSplash = [
	"img/6_salsa_bottle/bottle_splash/1_bottle_splash.png",
	"img/6_salsa_bottle/bottle_splash/2_bottle_splash.png",
	"img/6_salsa_bottle/bottle_splash/3_bottle_splash.png",
	"img/6_salsa_bottle/bottle_splash/4_bottle_splash.png",
	"img/6_salsa_bottle/bottle_splash/5_bottle_splash.png",
	"img/6_salsa_bottle/bottle_splash/6_bottle_splash.png",
];

let imageCache = {};

let newImageContentLoaded = 0;
let ImageSrcContentLoaded = false;

// ANCHOR hard coded images
// background
let air;
let bgLayer1_1;
let bgLayer1_2;
let bgLayer2_1;
let bgLayer2_2;
let bgLayer3_1;
let bgLayer3_2;
let clouds1;
let clouds2;
let GameOver;
let Startscreen;
let YouWin;
let StartButton;
let CoinIcon;
let BottleIcon;
let char_health_0;
let char_health_20;
let char_health_40;
let char_health_60;
let char_health_80;
let char_health_100;
let IMAGE_CHICKEN_NORMAL_DEAD;
let IMAGES_CHICKEN_SMALL_DEAD;
let BasicBottle;
let TryAgain;

let checkImages;

// ANCHOR html element
let muteButton;
let muted = true;

document.addEventListener("DOMContentLoaded", () => {
	muteButton = document.querySelector("#MuteButton");
	muteButton.addEventListener("click", () => {
		muteButton.classList.toggle("active");
		if (muted) muted = false;
		else muted = true;
	});
	checkImages = setInterval(() => {
		if (!ImageSrcContentLoaded) {
			setNewImage();
			initImageCache();
		}
		startFirstInit();
	}, 1);
});

function startFirstInit() {
	if (newImageContentLoaded == 25) initStartscreen();
}

function setNewImage() {
	ImageSrcContentLoaded = true;
	air = new Image();
	air.onload = () => {
		newImageContentLoaded++;
	};
	bgLayer1_1 = new Image();
	bgLayer1_1.onload = () => {
		newImageContentLoaded++;
	};
	bgLayer1_2 = new Image();
	bgLayer1_2.onload = () => {
		newImageContentLoaded++;
	};
	bgLayer2_1 = new Image();
	bgLayer2_1.onload = () => {
		newImageContentLoaded++;
	};
	bgLayer2_2 = new Image();
	bgLayer2_2.onload = () => {
		newImageContentLoaded++;
	};
	bgLayer3_1 = new Image();
	bgLayer3_1.onload = () => {
		newImageContentLoaded++;
	};
	bgLayer3_2 = new Image();
	bgLayer3_2.onload = () => {
		newImageContentLoaded++;
	};
	clouds1 = new Image();
	clouds1.onload = () => {
		newImageContentLoaded++;
	};
	clouds2 = new Image();
	clouds2.onload = () => {
		newImageContentLoaded++;
	};
	GameOver = new Image();
	GameOver.onload = () => {
		newImageContentLoaded++;
	};
	Startscreen = new Image();
	Startscreen.onload = () => {
		newImageContentLoaded++;
	};
	YouWin = new Image();
	YouWin.onload = () => {
		newImageContentLoaded++;
	};
	StartButton = new Image();
	StartButton.onload = () => {
		newImageContentLoaded++;
	};
	CoinIcon = new Image();
	CoinIcon.onload = () => {
		newImageContentLoaded++;
	};
	BottleIcon = new Image();
	BottleIcon.onload = () => {
		newImageContentLoaded++;
	};
	char_health_0 = new Image();
	char_health_0.onload = () => {
		newImageContentLoaded++;
	};
	char_health_20 = new Image();
	char_health_20.onload = () => {
		newImageContentLoaded++;
	};
	char_health_40 = new Image();
	char_health_40.onload = () => {
		newImageContentLoaded++;
	};
	char_health_60 = new Image();
	char_health_60.onload = () => {
		newImageContentLoaded++;
	};
	char_health_80 = new Image();
	char_health_80.onload = () => {
		newImageContentLoaded++;
	};
	char_health_100 = new Image();
	char_health_100.onload = () => {
		newImageContentLoaded++;
	};
	IMAGE_CHICKEN_NORMAL_DEAD = new Image();
	IMAGE_CHICKEN_NORMAL_DEAD.onload = () => {
		newImageContentLoaded++;
	};
	IMAGES_CHICKEN_SMALL_DEAD = new Image();
	IMAGES_CHICKEN_SMALL_DEAD.onload = () => {
		newImageContentLoaded++;
	};
	BasicBottle = new Image();
	BasicBottle.onload = () => {
		newImageContentLoaded++;
	};
	TryAgain = new Image();
	TryAgain.onload = () => {
		newImageContentLoaded++;
	};

	setImageSRC();
}

function setImageSRC() {
	air.src = "img/5_background/layers/air.png";
	bgLayer1_1.src = "img/5_background/layers/1_first_layer/1.png";
	bgLayer1_2.src = "img/5_background/layers/1_first_layer/2.png";
	bgLayer2_1.src = "img/5_background/layers/2_second_layer/1.png";
	bgLayer2_2.src = "img/5_background/layers/2_second_layer/2.png";
	bgLayer3_1.src = "img/5_background/layers/3_third_layer/1.png";
	bgLayer3_2.src = "img/5_background/layers/3_third_layer/2.png";
	clouds1.src = "img/5_background/layers/4_clouds/1.png";
	clouds2.src = "img/5_background/layers/4_clouds/2.png";
	GameOver.src = "img/9_intro_outro_screens/GameOver.png";
	Startscreen.src = "img/9_intro_outro_screens/Startscreen.png";
	YouWin.src = "img/9_intro_outro_screens/YouWin.png";
	StartButton.src = "img/buttons/Start.png";
	CoinIcon.src = "img/7_statusbars/3_icons/icon_coin.png";
	BottleIcon.src = "img/7_statusbars/3_icons/icon_salsa_bottle.png";
	char_health_0.src = "img/7_statusbars/1_statusbar/Statusbar Health/0.png";
	char_health_20.src = "img/7_statusbars/1_statusbar/Statusbar Health/20.png";
	char_health_40.src = "img/7_statusbars/1_statusbar/Statusbar Health/40.png";
	char_health_60.src = "img/7_statusbars/1_statusbar/Statusbar Health/60.png";
	char_health_80.src = "img/7_statusbars/1_statusbar/Statusbar Health/80.png";
	char_health_100.src = "img/7_statusbars/1_statusbar/Statusbar Health/100.png";
	IMAGE_CHICKEN_NORMAL_DEAD.src = "img/3_enemies_chicken/chicken_normal/2_dead/dead.png";
	IMAGES_CHICKEN_SMALL_DEAD.src = "img/3_enemies_chicken/chicken_small/2_dead/dead.png";
	BasicBottle.src = "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png";
	TryAgain.src = "img/buttons/TryAgain.png";
}

function setStartscreenOptions() {
	TryAgainButtonWidth = TryAgain.width / 2;
	TryAgainButtonHeight = TryAgain.height / 2;
	TryAgainButtonPositionX = canvas.width / 2 - TryAgainButtonWidth / 2;
	TryAgainButtonPositionY = canvas.height / 7 - TryAgainButtonHeight / 2;

	StartButtonWidth = StartButton.width / 2;
	StartButtonHeight = StartButton.height / 2;
	StartButtonPositionX = canvas.width / 2 - StartButtonWidth / 2;
	StartButtonPositionY = canvas.height / 7 - StartButtonHeight / 2;
}

function initImageCache() {
	addToImageCache(IMAGES_DEAD);
	addToImageCache(IMAGES_HURT);
	addToImageCache(IMAGES_IDLE);
	addToImageCache(IMAGES_JUMP);
	addToImageCache(IMAGES_WALK);
	addToImageCache(IMAGES_CHICKEN_NORMAL);
	addToImageCache(IMAGES_CHICKEN_SMALL);
	addToImageCache(IMAGES_BOSS_WALK);
	addToImageCache(IMAGES_BOSS_HURT);
	addToImageCache(IMAGES_BOSS_DEAD);
	addToImageCache(IMAGES_COIN);
	addToImageCache(IMAGES_BottleGround);
	addToImageCache(IMAGES_BottleThrown);
	addToImageCache(IMAGES_BottleSplash);
}

function addToImageCache(imageArray) {
	imageArray.forEach((path) => {
		let img = new Image();
		img.src = path;
		imageCache[path] = img;
	});
	addToImageCacheDone++;
}

function initStartscreen() {
	clearInterval(checkImages);
	setStartscreenOptions();
	ctx.drawImage(Startscreen, 0, 0, canvas.width, canvas.height);
	ctx.drawImage(StartButton, StartButtonPositionX, StartButtonPositionY, StartButtonWidth, StartButtonHeight);
	ctx.fillStyle = "red";
	PressButton = true;
}

let clickX;
let clickY;

canvas.addEventListener("click", (event) => {
	if (PressButton) {
		const rect = canvas.getBoundingClientRect();
		clickX = event.clientX - rect.left;
		clickY = event.clientY - rect.top;
		if (checkForButton()) {
			init();
		}
		clickX = 0;
		clickY = 0;
	}
});

function checkForButton() {
	return (
		clickX > StartButtonPositionX && // clickX > picture left
		clickX < StartButtonPositionX + StartButtonWidth && // clickX < picture right
		clickY > StartButtonPositionY && // clixkY > picture top
		clickY < StartButtonPositionY + StartButtonHeight // clickY < picture bottom
	);
}

class Player {
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

		this.loadSingleImage("img/2_character_pepe/1_idle/I-1.png");
	}

	loadSingleImage(path) {
		this.currentImage = new Image();
		this.currentImage.src = path;
	}

	checkHealth() {
		if (this.health == 1000) this.CharHealthBar = char_health_100;
		else if (this.health >= 800) this.CharHealthBar = char_health_80;
		else if (this.health >= 600) this.CharHealthBar = char_health_60;
		else if (this.health >= 400) this.CharHealthBar = char_health_40;
		else if (this.health >= 200) this.CharHealthBar = char_health_20;
		else if (this.health == 0) this.CharHealthBar = char_health_0;
	}

	playAnimation(images) {
		let index = this.currentImageCounter % images.length;
		let path = images[index];
		this.currentImage = imageCache[path];
		this.currentImageCounter++;
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
				console.log("loaded");
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

class Bottle {
	width = 60;
	height = 60;
	splash = false;
	id = Math.random();
	bottleDeleteInit = false;
	bottleDeleting = false;

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
	currentImage;
	timeDelayImage = 80;
	currentImageCounter = 0;
	timestamp_Framerate = new Date().getTime();
	currentAnimationArray = IMAGES_CHICKEN_NORMAL;

	constructor({ x = 0, y = canvas.height - this.height - mapOffset, thrown = false, velocityX = 0, velocityY = 0 }) {
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

	playAnimation(images) {
		let index = this.currentImageCounter % images.length;
		let path = images[index];
		this.currentImage = imageCache[path];
		this.currentImageCounter++;
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
				let index = bottles.findIndex((bottle) => {
					return bottle.id === this.id;
				});
				// timoutArray.push(
				setTimeout(() => {
					bottles.splice(index, 1);
				}, 1000);
				// );
			}
		}

		// set offset
		this.offsetX = this.position.x + this.offset.left;
		this.offsetY = this.position.y + this.offset.top;
		this.offsetWidth = this.width - this.offset.right - this.offset.left;
		this.offsetHeight = this.height - this.offset.bottom - this.offset.top;
	}
}

class Background {
	constructor({ x, image, type = "none" }) {
		this.image = image;
		this.width = this.image.width;
		this.height = this.image.height;
		this.position = {
			x: x,
			y: 0,
		};
		if (type == "cloud") this.update();
	}

	draw() {
		ctx.drawImage(this.image, this.position.x, this.position.y, canvas.width, canvas.height);
	}

	// cloud move speed
	update() {
		this.draw();
		this.position.x -= 0.18;
	}
}

class Enemy {
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
		this.id = Math.random();
		this.type = type;
		this.setEnemyHeight();

		this.position = {
			x: 0,
			y: canvas.height - this.height - mapOffset,
		};

		if (type != "boss") this.initEnemy();
		else this.initBoss();

		this.loadSingleImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
	}

	loadSingleImage(path) {
		this.currentImage = new Image();
		this.currentImage.src = path;
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

	playAnimation(images) {
		let index = this.currentImageCounter % images.length;
		let path = images[index];
		this.currentImage = imageCache[path];
		this.currentImageCounter++;
	}

	draw() {
		if (this.type === "normal") this.currentAnimationArray = IMAGES_CHICKEN_NORMAL;
		if (this.type === "small") this.currentAnimationArray = IMAGES_CHICKEN_SMALL;
		if (this.type === "boss" && bossHealth != 0 && !bossHit) {
			this.currentAnimationArray = IMAGES_BOSS_WALK;
		} else if (this.type === "boss" && bossHit) {
			this.currentAnimationArray = IMAGES_BOSS_HURT;
		} else if (this.type === "boss" && bossHealth == 0) this.currentAnimationArray = IMAGES_BOSS_DEAD;

		if (this.type != "boos") {
			if (this.timestamp_Framerate + this.timeDelayImage < new Date().getTime() && this.status != "dead") {
				this.playAnimation(this.currentAnimationArray);
				this.timestamp_Framerate = new Date().getTime();
			} else if (this.status == "dead") {
				if (this.type == "normal") this.currentImage = IMAGE_CHICKEN_NORMAL_DEAD;
				if (this.type == "small") this.currentImage = IMAGES_CHICKEN_SMALL_DEAD;
			}
		} else {
			if (this.timestamp_Framerate + this.timeDelayImage < new Date().getTime()) {
				this.playAnimation(this.currentAnimationArray);
				this.timestamp_Framerate = new Date().getTime();
			} else if (bossHealth == 0) {
				if (this.type == "normal") this.currentImage = IMAGE_CHICKEN_NORMAL_DEAD;
				if (this.type == "small") this.currentImage = IMAGES_CHICKEN_SMALL_DEAD;
			}
		}

		if (player.position.x > this.position.x && this.status != "dead") {
			// ANCHOR kein plan was hier passiert
			ctx.save();
			ctx.scale(-1, 1);
			ctx.drawImage(this.currentImage, this.position.x * -1 - this.width, this.position.y, this.width, this.height);
			ctx.restore();
		} else {
			ctx.drawImage(this.currentImage, this.position.x, this.position.y, this.width, this.height);
		}

		if (this.type == "boss") {
			this.checkForHealthStatus();
			ctx.drawImage(this.healthStatus, this.position.x, this.position.y - 10, 200, 50);

			if (wonGame && initWin) {
				if (BossTimestamp_StopDeadAnimation + 300 <= new Date().getTime()) {
					console.log("wonGame");
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
			if (player.position.x < this.position.x) this.position.x -= this.enemySpeed;
			else if (player.position.x > this.position.x) this.position.x += this.enemySpeed;
		} else if (this.status == "dead") {
			if (!this.killInit) {
				let index = enemies.findIndex((enemy) => {
					return enemy.id === this.id;
				});
				setTimeout(() => {
					enemies.splice(index, 1);
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

class Coin {
	position = {
		x: 0,
		y: 120,
	};

	width = 90;
	height = 90;

	offset = {
		left: 30,
		right: 30,
		top: 30,
		bottom: 30,
	};

	offsetX;
	offsetY;
	offsetWidth;
	offsetHeight;

	// for image generation
	currentImage;
	timeDelayImage = 200;
	currentImageCounter = 0;
	timestamp_Framerate = new Date().getTime();
	currentAnimationArray = IMAGES_COIN;

	constructor() {
		this.initCoin();

		this.loadSingleImage("img/8_coin/coin_1.png");
	}

	loadSingleImage(path) {
		this.currentImage = new Image();
		this.currentImage.src = path;
	}

	initCoin() {
		this.position.x = Math.floor(Math.random() * 100) * Math.floor(Math.random() * 100) * 5 + canvas.width;
		if (this.position.x < 1000) {
			this.initCoin();
			return;
		} else if (this.position.x > backgroundsLayer_one[8].position.x) {
			this.initCoin();
			return;
		}
	}

	playAnimation(images) {
		let index = this.currentImageCounter % images.length;
		let path = images[index];
		this.currentImage = imageCache[path];
		this.currentImageCounter++;
	}

	draw() {
		if (this.timestamp_Framerate + this.timeDelayImage < new Date().getTime()) {
			this.playAnimation(this.currentAnimationArray);
			this.timestamp_Framerate = new Date().getTime();
		}
		ctx.drawImage(this.currentImage, this.position.x, this.position.y, this.width, this.height);

		// set offset
		this.offsetX = this.position.x + this.offset.left;
		this.offsetY = this.position.y + this.offset.top;
		this.offsetWidth = this.width - this.offset.right - this.offset.left;
		this.offsetHeight = this.height - this.offset.bottom - this.offset.top;
	}
}

function init() {
	PressButton = false;

	// init arrays
	clouds = [];
	enemies = [];
	bottles = [];
	coinsArray = [];
	timoutArray = [];
	backgroundsLayer_one = [];
	backgroundsLayer_two = [];
	backgroundsLayer_three = [];

	// set default values
	bossHealth = 100;
	bottleAmount = 12;
	timestamp_ThrownBottle = new Date().getTime();

	frameRateTimeStamp = new Date().getTime();

	flip = true;
	initWin = true;
	bossHit = false;
	wonGame = false;
	bossSpawned = false;
	flippingImage = false;
	stopAnimation = false;
	setWinTimestamp = false;

	lastPosition = "right";
	playerJumping = false;
	doesObjectHitEnemy = false;

	backgroundsLayer_one = [
		new Background({ x: -canvas.width, image: bgLayer1_2 }),
		new Background({ x: 0, image: bgLayer1_1 }),
		new Background({ x: canvas.width, image: bgLayer1_2 }),
		new Background({ x: canvas.width * 2, image: bgLayer1_1 }),
		new Background({ x: canvas.width * 3, image: bgLayer1_2 }),
		new Background({ x: canvas.width * 4, image: bgLayer1_1 }),
		new Background({ x: canvas.width * 5, image: bgLayer1_2 }),
		new Background({ x: canvas.width * 6, image: bgLayer1_1 }),
		new Background({ x: canvas.width * 7, image: bgLayer1_2 }),
	];
	backgroundsLayer_two = [
		new Background({ x: -canvas.width, image: bgLayer2_2 }),
		new Background({ x: 0, image: bgLayer2_1 }),
		new Background({ x: canvas.width, image: bgLayer2_2 }),
		new Background({ x: canvas.width * 2, image: bgLayer2_1 }),
		new Background({ x: canvas.width * 3, image: bgLayer2_2 }),
		new Background({ x: canvas.width * 4, image: bgLayer2_1 }),
		new Background({ x: canvas.width * 5, image: bgLayer2_2 }),
		new Background({ x: canvas.width * 6, image: bgLayer2_1 }),
		new Background({ x: canvas.width * 7, image: bgLayer2_2 }),
	];
	backgroundsLayer_three = [
		new Background({ x: -canvas.width, image: bgLayer3_2 }),
		new Background({ x: 0, image: bgLayer3_1 }),
		new Background({ x: canvas.width, image: bgLayer3_2 }),
		new Background({ x: canvas.width * 2, image: bgLayer3_1 }),
		new Background({ x: canvas.width * 3, image: bgLayer3_2 }),
		new Background({ x: canvas.width * 4, image: bgLayer3_1 }),
		new Background({ x: canvas.width * 5, image: bgLayer3_2 }),
		new Background({ x: canvas.width * 6, image: bgLayer3_1 }),
		new Background({ x: canvas.width * 7, image: bgLayer3_2 }),
	];
	airBackground = new Background({ x: 0, image: air });

	clouds = [
		new Background({ x: -canvas.width, image: clouds2, type: "cloud" }),
		new Background({ x: 0, image: clouds1, type: "cloud" }),
		new Background({ x: canvas.width, image: clouds2, type: "cloud" }),
		new Background({ x: canvas.width * 2, image: clouds1, type: "cloud" }),
		new Background({ x: canvas.width * 3, image: clouds2, type: "cloud" }),
		new Background({ x: canvas.width * 4, image: clouds1, type: "cloud" }),
		new Background({ x: canvas.width * 5, image: clouds2, type: "cloud" }),
		new Background({ x: canvas.width * 6, image: clouds1, type: "cloud" }),
		new Background({ x: canvas.width * 7, image: clouds2, type: "cloud" }),
	];

	for (let i = 0; i < bottleAmount; i++) {
		bottles.push(new Bottle({}));
	}

	player = new Player();

	let ChickenAmount;
	function randomChickenSpawn() {
		ChickenAmount = Math.floor(Math.random() * 13);
		if (ChickenAmount <= 5) {
			randomChickenSpawn();
			return;
		}
		for (let i = 0; i < ChickenAmount; i++) {
			const chickentype = setType();
			enemies.push(new Enemy(chickentype));
		}
	}
	randomChickenSpawn();

	let CoinsAmount;
	function randomCoinSpawn() {
		CoinsAmount = Math.floor(Math.random() * 13);
		if (CoinsAmount <= 5) {
			randomCoinSpawn();
			return;
		}
		for (let i = 0; i < CoinsAmount; i++) {
			coinsArray.push(new Coin());
		}
	}
	randomCoinSpawn();

	function setType() {
		if (Math.random() < 0.5) return "normal";
		else return "small";
	}

	animate();
}

function animate() {
	if (frameRateTimeStamp + frameRate <= new Date().getTime()) {
		frameRateTimeStamp = new Date().getTime();
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		airBackground.draw();

		clouds.forEach((cloud) => {
			cloud.update();
		});

		backgroundsLayer_three.forEach((background) => {
			background.draw();
		});
		backgroundsLayer_two.forEach((background) => {
			background.draw();
		});
		backgroundsLayer_one.forEach((background) => {
			background.draw();
		});

		enemies.forEach((enemy) => {
			enemy.update();

			if (enemy.type == "boss") enemyDamage = 2;
			else enemyDamage = 1;

			if (checkForCollision(enemy)) {
				if (enemy.type != "boss") {
					if (enemy.status == "dead") enemy.killInit = true;
					if (player.velocity.y > 0 && playerJumping && enemy.status != "dead") {
						enemy.status = "dead";
						playerJumping = false;
					}
				}

				if (!playerJumping && enemy.status != "dead") {
					player.damage = true;
					player.health -= enemyDamage;
				}
			} else {
				setTimeout(() => {
					player.damage = false;
				}, 200);
			}

			if (enemy.type == "boss") {
				bossStats = {
					position: {
						x: enemy.offsetX,
						y: enemy.offsetY,
					},
					width: enemy.offsetWidth,
					height: enemy.offsetHeight,
				};
			}
		});

		bottles.forEach((bottle) => {
			bottle.update();
			// for thrown bottle
			if (bottle.thrown) {
				if (bottle.position.y < canvas.height - bottle.height - mapOffset && bossSpawned) {
					if (checkBottle_BossCollision(bottle)) {
						if (!doesObjectHitEnemy) {
							bossHealth -= 25;
							doesObjectHitEnemy = true;
							bossHit = true;
						}
						setTimeout(() => {
							bossHit = false;
						}, 500);
					} else doesObjectHitEnemy = false;
				}
			}

			// player collision with normal bottle
			if (checkForCollision(bottle) && !bottle.thrown) {
				for (let index = 0; index < bottles.length; index++) {
					if (bottles[index].position.x === bottle.position.x) {
						bottles.splice(index, 1);
						player.bottles++;
					}
				}
			}
		});

		player.update();

		if (
			player.InitDead &&
			(player.health <= 0 ||
				(bottleAmount == 3 && bossHealth != 75) ||
				(bottleAmount == 2 && bossHealth != 50) ||
				(bottleAmount == 1 && bossHealth != 25) ||
				bottleAmount == 0)
		) {
			console.log("jo");
			player.InitDead = false;
			player.playerDead = true;
			player.timestamp_StopDeadAnimation = new Date().getTime();
		}

		coinsArray.forEach((coin) => {
			coin.draw();
			if (checkForCollision(coin)) {
				for (let index = 0; index < coinsArray.length; index++) {
					if (coinsArray[index].position.x === coin.position.x) {
						coinsArray.splice(index, 1);
						player.coins++;
					}
				}
			}
		});

		ctx.fillStyle = "black";
		ctx.font = "25px rubikbubbles";
		ctx.fillText(player.bottles + " / " + 12, 50, 85);

		ctx.fillStyle = "black";
		ctx.font = "25px rubikbubbles";
		ctx.fillText(player.coins, 50, 128);

		ctx.drawImage(BottleIcon, 7, 50, 50, 50);
		ctx.drawImage(CoinIcon, 15, 100, 35, 35);

		// check if jump
		if (keys.space && player.velocity.y == 0) {
			player.velocity.y -= player.jumpHieght;
			player.timeDelayImage = 70;
			player.currentImageCounter = 0;
			playerJumping = true;
			player.currentAnimationArray = IMAGES_JUMP;
		}

		// check if throwing
		if (keys.throw && player.bottles > 0 && timestamp_ThrownBottle + timeDelay < new Date().getTime()) {
			player.bottles--;
			bottleAmount--;
			timestamp_ThrownBottle = new Date().getTime();
			if (lastPosition === "left") {
				bottles.push(
					new Bottle({
						thrown: true,
						x: player.offsetX - 25,
						y: player.offsetY + 25,
						velocityX: -7,
						velocityY: -20,
					})
				);
			} else {
				bottles.push(
					new Bottle({
						thrown: true,
						x: player.offsetX + 25,
						y: player.offsetY + 25,
						velocityX: 7,
						velocityY: -20,
					})
				);
			}
		}

		// apply gravity
		if (player.position.y + player.height + player.velocity.y <= canvas.height - mapOffset)
			player.velocity.y += gravity;
		else {
			if (player.offsetY + player.offsetHeight + 11 >= canvas.height - mapOffset) {
				playerJumping = false;
			}
			player.velocity.y = 0;
		}

		// set player.timeDelay back to default after jumping
		if (player.position.y + player.height - 10 >= canvas.height - mapOffset) {
			player.timeDelayImage = 100;
		}

		// check win
		if (bossHealth == 0 && !wonGame) {
			if (!setWinTimestamp) {
				setWinTimestamp = true;
				BossTimestamp_StopDeadAnimation = new Date().getTime();
				console.log("setTime");
			}
			wonGame = true;
		}

		// spawn boss
		if (player.position.x > backgroundsLayer_one[8].position.x - 1000) {
			if (!bossSpawned) {
				enemies.push(new Enemy("boss"));
				bossSpawned = true;
			}
		}

		if (keys.right && backgroundsLayer_one[8].position.x > 50) {
			clouds.forEach((cloud) => {
				cloud.position.x -= player.speed * 0.22;
			});
			backgroundsLayer_three.forEach((background) => {
				background.position.x -= player.speed * 0.44;
			});
			backgroundsLayer_two.forEach((background) => {
				background.position.x -= player.speed * 0.66;
			});
			backgroundsLayer_one.forEach((background) => {
				background.position.x -= player.speed;
			});
			enemies.forEach((enemy) => {
				enemy.position.x -= player.speed;
			});
			bottles.forEach((bottle) => {
				bottle.position.x -= player.speed;
			});
			coinsArray.forEach((coin) => {
				coin.position.x -= player.speed;
			});
			lastPosition = "right";
			if (player.position.y + player.height + player.velocity.y >= canvas.height - mapOffset && !player.damage) {
				player.currentAnimationArray = IMAGES_WALK;
				if (muted) walkingsound.play();
			} else if (!playerJumping) player.currentAnimationArray = IMAGES_HURT;
		} else if (keys.left && backgroundsLayer_one[0].position.x < -50) {
			clouds.forEach((cloud) => {
				cloud.position.x += player.speed * 0.22;
			});
			backgroundsLayer_three.forEach((background) => {
				background.position.x += player.speed * 0.44;
			});
			backgroundsLayer_two.forEach((background) => {
				background.position.x += player.speed * 0.66;
			});
			backgroundsLayer_one.forEach((background) => {
				background.position.x += player.speed;
			});
			enemies.forEach((enemy) => {
				enemy.position.x += player.speed;
			});
			bottles.forEach((bottle) => {
				bottle.position.x += player.speed;
			});
			coinsArray.forEach((coin) => {
				coin.position.x += player.speed;
			});
			lastPosition = "left";
			flippingImage = true;
			if (player.position.y + player.height + player.velocity.y >= canvas.height - mapOffset && !player.damage) {
				player.currentAnimationArray = IMAGES_WALK;
				if (muted) walkingsound.play();
			} else if (!playerJumping) {
				walkingsound.pause();
				player.currentAnimationArray = IMAGES_HURT;
			}
		} else if (
			player.position.y + player.height + player.velocity.y >= canvas.height - mapOffset &&
			player.health != 0 &&
			!player.damage
		) {
			player.currentAnimationArray = IMAGES_IDLE;
			walkingsound.pause();
		} else if (!playerJumping) player.currentAnimationArray = IMAGES_HURT;
	}

	if (!stopAnimation) {
		requestAnimationFrame(animate);
	}
}

function checkForCollision(object) {
	return (
		player.offsetX + player.offsetWidth >= object.offsetX && //player right > object left
		player.offsetY + player.offsetHeight > object.offsetY && //player bottom > object top
		player.offsetX < object.offsetX + object.offsetWidth && // player left < object right
		player.offsetY < object.offsetY + object.offsetHeight // player top < object bottom
	);
}

function checkBottle_BossCollision(bottle) {
	return (
		bottle.offsetX + bottle.offsetWidth >= bossStats.position.x && //bottle right > bossStats left
		bottle.offsetY + bottle.offsetHeight - 1 > bossStats.position.y && //bottle bottom > bossStats top
		bottle.offsetX < bossStats.position.x + bossStats.width && // bottle left < bossStats right
		bottle.offsetY < bossStats.position.y + bossStats.height // player top < bossStats bottom
	);
}

document.addEventListener("keydown", (event) => {
	switch (event.key) {
		case "a":
			keys.left = true;
			break;
		case "d":
			keys.right = true;
			break;
		case " ":
			keys.space = true;
			break;
		case "l":
			keys.throw = true;
			break;
	}
});

document.addEventListener("keyup", (event) => {
	switch (event.key) {
		case "a":
			keys.left = false;
			break;
		case "d":
			keys.right = false;
			break;
		case " ":
			keys.space = false;
			break;
		case "l":
			keys.throw = false;
			break;
	}
});
