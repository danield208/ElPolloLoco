const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// background
const air = new Image();
air.src = "img/5_background/layers/air.png";

const bgLayer1_1 = new Image();
bgLayer1_1.src = "img/5_background/layers/1_first_layer/1.png";
const bgLayer1_2 = new Image();
bgLayer1_2.src = "img/5_background/layers/1_first_layer/2.png";
const bgLayer2_1 = new Image();
bgLayer2_1.src = "img/5_background/layers/2_second_layer/1.png";
const bgLayer2_2 = new Image();
bgLayer2_2.src = "img/5_background/layers/2_second_layer/2.png";
const bgLayer3_1 = new Image();
bgLayer3_1.src = "img/5_background/layers/3_third_layer/1.png";
const bgLayer3_2 = new Image();
bgLayer3_2.src = "img/5_background/layers/3_third_layer/2.png";

const clouds1 = new Image();
clouds1.src = "img/5_background/layers/4_clouds/1.png";
const clouds2 = new Image();
clouds2.src = "img/5_background/layers/4_clouds/2.png";

// intro, outro, win, lose
const GameOver = new Image();
GameOver.src = "img/9_intro_outro_screens/GameOver.png";
const Startscreen = new Image();
Startscreen.src = "img/9_intro_outro_screens/Startscreen.png";
const YouWin = new Image();
YouWin.src = "img/9_intro_outro_screens/YouWin.png";

// buttons
const StartButton = new Image();
StartButton.src = "img/buttons/Start.png";

// icons
const CoinIcon = new Image();
CoinIcon.src = "img/7_statusbars/3_icons/icon_coin.png";

const BottleIcon = new Image();
BottleIcon.src = "img/7_statusbars/3_icons/icon_salsa_bottle.png";

// statusbar
// character
const char_health_0 = new Image();
char_health_0.src = "img/7_statusbars/1_statusbar/Statusbar Health/0.png";
const char_health_20 = new Image();
char_health_20.src = "img/7_statusbars/1_statusbar/Statusbar Health/20.png";
const char_health_40 = new Image();
char_health_40.src = "img/7_statusbars/1_statusbar/Statusbar Health/40.png";
const char_health_60 = new Image();
char_health_60.src = "img/7_statusbars/1_statusbar/Statusbar Health/60.png";
const char_health_80 = new Image();
char_health_80.src = "img/7_statusbars/1_statusbar/Statusbar Health/80.png";
const char_health_100 = new Image();
char_health_100.src = "img/7_statusbars/1_statusbar/Statusbar Health/100.png";

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
const IMAGE_CHICKEN_NORMAL_DEAD = new Image();
IMAGE_CHICKEN_NORMAL_DEAD.src = "img/3_enemies_chicken/chicken_normal/2_dead/dead.png";

const IMAGES_CHICKEN_SMALL = [
	"img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
	"img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
	"img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
];
const IMAGES_CHICKEN_SMALL_DEAD = new Image();
IMAGES_CHICKEN_SMALL_DEAD.src = "img/3_enemies_chicken/chicken_small/2_dead/dead.png";

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

let imageCache = {};

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
}

function addToImageCache(imageArray) {
	imageArray.forEach((path) => {
		let img = new Image();
		img.src = path;
		imageCache[path] = img;
	});
}
initImageCache();

let StartButtonWidth = StartButton.width / 2;
let StartButtonHeight = StartButton.height / 2;
let StartButtonPositionX = canvas.width / 2 - StartButtonWidth / 2;
let StartButtonPositionY = canvas.height / 7 - StartButtonHeight / 2;

function initStartscreen() {
	loadSingleImage(Startscreen);
	ctx.drawImage(Startscreen, 0, 0, canvas.width, canvas.height);
	ctx.drawImage(StartButton, StartButtonPositionX, StartButtonPositionY, StartButtonWidth, StartButtonHeight);
	ctx.fillStyle = "red";
}

// setTimeout(() => {
// 	initStartscreen();
// }, 200);

let clickX;
let clickY;

canvas.addEventListener("click", (event) => {
	const rect = canvas.getBoundingClientRect();
	clickX = event.clientX - rect.left;
	clickY = event.clientY - rect.top;
	if (checkForButton()) {
		init();
	}
	clickX = 0;
	clickY = 0;
});

function checkForButton() {
	return (
		clickX > StartButtonPositionX && // clickX > picture left
		clickX < StartButtonPositionX + StartButtonWidth && // clickX < picture right
		clickY > StartButtonPositionY && // clixkY > picture top
		clickY < StartButtonPositionY + StartButtonHeight // clickY < picture bottom
	);
}

// in init()
// Arrays
let clouds;
let enemies;
let bottles;
let coinsArray;
let killedEnemy;
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
let bottleAmount = 15;
const timeDelay = 400;

// booleans
const keys = {
	left: false,
	right: false,
	space: false,
	throw: false,
};
let bossHit;
let flip;
let bossSpawned;
let flippingImage;
let playerJumping;
let doesObjectHitEnemy;

class Player {
	bottles = 0;
	coins = 0;

	// for image generation
	currentImage;
	timeDelayImage = 100;
	currentImageCounter = 0;
	currentAnimationArray = IMAGES_IDLE;
	timestamp_Framerate = new Date().getTime();

	constructor() {
		this.width = 100;
		this.height = 250;
		this.speed = 8;
		this.jumpHieght = 25;
		this.health = 1000;
		this.CharHealthBar;
		this.position = {
			x: canvas.width / 3,
			y: 0,
		};
		this.velocity = {
			x: 0,
			y: 0,
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
		this.checkHealth();
		this.draw();
		this.position.y += this.velocity.y;
		this.position.x += this.velocity.x;
	}
}

class Bottle {
	width = 20;
	height = 20;
	timestamp = 0;

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

		if (!thrown) this.init();
		else this.setTimsestamp();
	}

	init() {
		this.setBottleSpawn();
	}

	setBottleSpawn() {
		this.position.x = Math.floor(Math.random() * 100) * Math.floor(Math.random() * 100) * 5 + canvas.width;
		if (this.position.x < 1000) this.setBottleSpawn();
		else if (this.position.x > backgroundsLayer_one[8].position.x - 800) this.setBottleSpawn();
	}

	setTimsestamp() {
		this.timestamp = new Date().getTime();
	}

	draw() {
		ctx.fillStyle = "red";
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	}

	update() {
		this.draw();
		this.position.y += this.velocity.y;
		this.position.x += this.velocity.x;
		if (this.position.y < canvas.height - this.height - mapOffset) {
			this.velocity.y += gravity;
		} else {
			this.velocity.y = 0;
			this.velocity.x = 0;
		}
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
		} else if (bossHit) {
			this.currentAnimationArray = IMAGES_BOSS_HURT;
		} else if (bossHealth == 0) this.currentAnimationArray = IMAGES_BOSS_DEAD;

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
			}
			// else if (bossHealth == 0) {
			// 	if (this.type == "normal") this.currentImage = IMAGE_CHICKEN_NORMAL_DEAD;
			// }
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
	}

	update() {
		this.draw();
		if (this.status != "dead") {
			if (player.position.x < this.position.x) this.position.x -= this.enemySpeed;
			else if (player.position.x > this.position.x) this.position.x += this.enemySpeed;
		} else if (this.status == "dead") {
			let index = enemies.findIndex((enemy) => {
				return enemy.id === this.id;
			});
			if (!this.killInit) {
				console.log("jo");
				killedEnemy.push(
					setTimeout(() => {
						enemies.splice(index, 1);
					}, 1000)
				);
			}
		}
	}
}

class Coin {
	position = {
		x: 0,
		y: 120,
	};

	width = 90;
	height = 90;

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
	}
}

function init() {
	// init arrays
	clouds = [];
	enemies = [];
	bottles = [];
	coinsArray = [];
	killedEnemy = [];
	backgroundsLayer_one = [];
	backgroundsLayer_two = [];
	backgroundsLayer_three = [];

	// set default values
	bossHealth = 100;
	bottleAmount = 15;
	timestamp_ThrownBottle = new Date().getTime();

	flip = true;
	bossHit = false;
	bossSpawned = false;
	flippingImage = false;

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
	requestAnimationFrame(animate);
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

		if (enemy.type != "boss") {
			if (checkForCollision(enemy)) {
				// player.health -= enemyDamage;
				if (enemy.status == "dead") enemy.killInit = true;
				if (player.velocity.y > 0 && playerJumping && enemy.status != "dead") {
					console.log(enemies);
					enemy.status = "dead";
					playerJumping = false;
				}
			}
		}

		// check for boos health
		if (enemy.type == "boss" && bossHealth == 0) {
			for (let index = 0; index < enemies.length; index++) {
				if (enemies[index].type === "boss") {
					enemies.splice(index, 1);
				}
			}
		}

		if (enemy.type == "boss") {
			bossStats = {
				position: {
					x: enemy.position.x,
					y: enemy.position.y,
				},
				width: enemy.width,
				height: enemy.height,
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
			if (bottle.timestamp + 2000 < new Date().getTime()) {
				for (let index = 0; index < bottles.length; index++) {
					if (bottles[index].position.x === bottle.position.x) {
						bottles.splice(index, 1);
					}
				}
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
	ctx.fillText(player.bottles + " / " + bottleAmount, 50, 85);

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
		player.currentAnimationArray = IMAGES_JUMP;
		playerJumping = true;
	}

	// check if throwing
	if (keys.throw && player.bottles > 0 && timestamp_ThrownBottle + timeDelay < new Date().getTime()) {
		player.bottles--;
		bottleAmount--;
		timestamp_ThrownBottle = new Date().getTime();
		bottles.push(
			new Bottle({
				thrown: true,
				x: player.position.x + player.width,
				y: player.position.y,
				velocityX: 7,
				velocityY: -20,
			})
		);
	}

	// check player health
	if (player.health == 0)
		setTimeout(() => {
			init();
		}, 200);

	// apply gravity
	if (player.position.y + player.height + player.velocity.y <= canvas.height - mapOffset) player.velocity.y += gravity;
	else player.velocity.y = 0;

	// set player.timeDelay back to default after jumping
	if (player.position.y + player.height + player.velocity.y >= canvas.height - mapOffset) {
		player.timeDelayImage = 100;
	}

	// check win
	if (bossHealth == 0)
		setTimeout(() => {
			init();
		}, 200);

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
		if (player.position.y + player.height + player.velocity.y >= canvas.height - mapOffset) {
			player.currentAnimationArray = IMAGES_WALK;
		}
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
		if (player.position.y + player.height + player.velocity.y >= canvas.height - mapOffset) {
			player.currentAnimationArray = IMAGES_WALK;
		}
	} else if (player.position.y + player.height + player.velocity.y >= canvas.height - mapOffset)
		player.currentAnimationArray = IMAGES_IDLE;
}

function checkForCollision(object) {
	return (
		player.position.x + player.width >= object.position.x && //player right > object left
		player.position.y + player.height > object.position.y && //player bottom > object top
		player.position.x < object.position.x + object.width && // player left < object right
		player.position.y < object.position.y + object.height // player top < object bottom
	);
}

function checkBottle_BossCollision(bottle) {
	return (
		bottle.position.x + bottle.width >= bossStats.position.x && //bottle right > bossStats left
		bottle.position.y + bottle.height - 1 > bossStats.position.y && //bottle bottom > bossStats top
		bottle.position.x < bossStats.position.x + bossStats.width && // bottle left < bossStats right
		bottle.position.y < bossStats.position.y + bossStats.height // player top < bossStats bottom
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

init();
