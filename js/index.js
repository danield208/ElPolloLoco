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

let imageCache = {};
function addToImageCache(imageArray) {
	imageArray.forEach((path) => {
		let img = new Image();
		img.src = path;
		imageCache[path] = img;
	});
}

function initImageCache() {
	addToImageCache(IMAGES_DEAD);
	addToImageCache(IMAGES_HURT);
	addToImageCache(IMAGES_IDLE);
	addToImageCache(IMAGES_JUMP);
	addToImageCache(IMAGES_WALK);
	addToImageCache(IMAGES_CHICKEN_NORMAL);
	addToImageCache(IMAGES_CHICKEN_SMALL);
}

initImageCache();
let bossSpawned = false;
let enemyDamage;

const mapOffset = 50;
const gravity = 1.2;
const keys = {
	left: false,
	right: false,
	space: false,
	throw: false,
};
let bottleAmount = 15;
let timestamp_ThrownBottle = new Date().getTime();
const timeDelay = 400;

let flippingImage = false;
let lastPosition = "right";
let flip = true;

class Player {
	bottles = 0;
	currentImageCounter = 0;
	currentImage;
	timeDelayImage = 100;
	timestamp_Framerate = new Date().getTime();
	currentAnimationArray = IMAGES_IDLE;

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

		this.loadSingleImage("img/2_character_pepe/5_dead/D-51.png");
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
	smallChicken = 50;
	normalChicken = 80;
	bossChicken = {
		color: "orange",
		pixel: 100,
	};

	boxColor = "blue";

	enemySpeed;
	width;
	height;

	currentAnimationArray = IMAGES_CHICKEN_NORMAL;
	currentImageCounter = 0;
	currentImage;
	timeDelayImage = 100;
	timestamp_Framerate = new Date().getTime();

	constructor(type) {
		this.type = type;
		this.setEnemyHeight();

		this.position = {
			x: 0,
			y: canvas.height - this.height - mapOffset,
		};

		if (type != "boss") this.initEnemy();
		else this.initBoss();

		this.loadSingleImage("img/2_character_pepe/5_dead/D-51.png");
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
			this.width = this.bossChicken.pixel;
			this.height = this.bossChicken.pixel;
			this.boxColor = this.bossChicken.color;
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

		if (this.timestamp_Framerate + this.timeDelayImage < new Date().getTime()) {
			this.playAnimation(this.currentAnimationArray);
			this.timestamp_Framerate = new Date().getTime();
		}

		if (player.position.x > this.position.x) {
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
		if (player.position.x < this.position.x) this.position.x -= this.enemySpeed;
		else if (player.position.x > this.position.x) this.position.x += this.enemySpeed;
	}
}

let backgroundsLayer_one = [];
let backgroundsLayer_two = [];
let backgroundsLayer_three = [];
let clouds = [];
let enemies = [];
let coins;
let bottles;
let airBackground;
let player;
let doesObjectHitEnemy = false;
let playerJumping = false;

function init() {
	coins = [];
	bottles = [];
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
	enemies = [];

	let amount;
	function randomChickenSpawn() {
		amount = Math.floor(Math.random() * 13);
		if (amount <= 5) {
			randomChickenSpawn();
			return;
		}
		for (let i = 0; i < amount; i++) {
			const chickentype = setType();
			enemies.push(new Enemy(chickentype));
		}
	}

	randomChickenSpawn();

	function setType() {
		if (Math.random() < 0.5) return "normal";
		else return "small";
	}
}

let bossStats;
let bossHealth = 100;

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

		if (checkForCollision(enemy)) {
			// player.health -= enemyDamage;
			if (player.velocity.y > 0 && playerJumping) {
				console.log("head jump");
				playerJumping = false;
				for (let index = 0; index < enemies.length; index++) {
					if (enemies[index].position.x === enemy.position.x) {
						enemies.splice(index, 1);
					}
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
					}
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

	ctx.fillStyle = "black";
	ctx.font = "25px rubikbubbles";
	ctx.fillText(player.bottles + " / " + bottleAmount, 20, 80);

	// check if jump
	if (keys.space && player.velocity.y == 0) {
		player.velocity.y -= player.jumpHieght;
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
	if (player.health == 0) init();

	// apply gravity
	if (player.position.y + player.height + player.velocity.y <= canvas.height - mapOffset) player.velocity.y += gravity;
	else player.velocity.y = 0;

	// check win
	if (bossHealth == 0) console.log("win");

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
		lastPosition = "right";
		player.currentAnimationArray = IMAGES_WALK;
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
		lastPosition = "left";
		flippingImage = true;
		player.currentAnimationArray = IMAGES_WALK;
	} else player.currentAnimationArray = IMAGES_IDLE;
}

init();
animate();

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
