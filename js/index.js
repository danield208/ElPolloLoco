const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// ANCHOR Parents
const drawObject = new DrawObject();

// ANCHOR for starting Game
let PressButton = false;

// ANCHOR set Framerate
let frameRateTimeStamp;
let frameRate = 1000 / 70;

// ANCHOR walkingsound
const walkingsound = new Audio("audio/char_walking.mp3");
walkingsound.volume = 0.1;

// ANCHOR Variables init()
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

let addToImageCacheDone = 0;
let imageCacheLoaded = false;

// ANCHOR Button Values
let TryAgainButtonWidth;
let TryAgainButtonHeight;
let TryAgainButtonPositionX;
let TryAgainButtonPositionY;

let StartButtonWidth;
let StartButtonHeight;
let StartButtonPositionX;
let StartButtonPositionY;

let ButtonWidth;
let ButtonHeight;

let ArrowButtonRightPositionX;
let ArrowButtonRightPositionY;

let ArrowButtonLeftPositionX;
let ArrowButtonLeftPositionY;

let ArrowButtonUPPositionX;
let ArrowButtonUPPositionY;

let BottleButtonPositionX;
let BottleButtonPositionY;

let newImageContentLoaded = 0;
let ImageSrcContentLoaded = false;

let checkImages;
let drawTouchButtons = false;

// ANCHOR html element
let muteButton;
let muted = true;

let checkWindowInterval;

// ANCHOR eventListener.js
let clickX;
let clickY;

function checkForButton() {
	return (
		clickX > StartButtonPositionX && // clickX > picture left
		clickX < StartButtonPositionX + StartButtonWidth && // clickX < picture right
		clickY > StartButtonPositionY && // clixkY > picture top
		clickY < StartButtonPositionY + StartButtonHeight // clickY < picture bottom
	);
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
			if (bottle.position.y < canvas.height - bottle.height - mapOffset && bossSpawned && bottle.thrown) {
				if (checkBottle_BossCollision(bottle)) {
					if (!doesObjectHitEnemy) {
						if (bottle.canHit) {
							bossHealth -= 25;
							bottle.canHit = false;
						}
						bossHit = true;
						doesObjectHitEnemy = true;
					}
					setTimeout(() => {
						bossHit = false;
					}, 500);
				} else doesObjectHitEnemy = false;
			}

			// player collision with normal bottle
			if (checkForCollision(bottle) && !bottle.thrown) {
				for (let index = 0; index < bottles.length; index++) {
					if (bottles[index].id === bottle.id) {
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

		// ANCHOR draw touch buttons
		if (drawTouchButtons) {
			ctx.drawImage(arrowButton, ArrowButtonRightPositionX, ArrowButtonRightPositionY, ButtonWidth, ButtonHeight);
			ctx.save();
			ctx.scale(-1, 1);
			ctx.drawImage(arrowButton, ArrowButtonLeftPositionX, ArrowButtonLeftPositionY, ButtonWidth, ButtonHeight);
			ctx.restore();

			ctx.drawImage(arrowButtonUP, ArrowButtonUPPositionX, ArrowButtonUPPositionY, ButtonWidth, ButtonHeight);
			ctx.drawImage(bottleButton, BottleButtonPositionX, BottleButtonPositionY, ButtonWidth, ButtonHeight);
			let buttons = ["right", "left", "up", "throw"];
			buttons.forEach((button) => {
				if (checkForButtonCollision(button)) {
					switch (button) {
						case "left":
							keys.left = true;
							break;
						case "right":
							keys.right = true;
							break;
						case "up":
							keys.space = true;
							break;
						case "throw":
							keys.throw = true;
							break;
					}
				}
			});
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

function checkForButtonCollision(button) {
	if (button == "right") {
		return (
			clickX > ArrowButtonRightPositionX && // clickX > picture left
			clickX < ArrowButtonRightPositionX + ButtonWidth && // clickX < picture right
			clickY > ArrowButtonRightPositionY && // clixkY > picture top
			clickY < ArrowButtonRightPositionY + ButtonHeight // clickY < picture bottom
		);
	} else if (button == "left") {
		return (
			clickX > ArrowButtonLeftPositionX * -1 - 80 && // clickX > picture left
			clickX < ArrowButtonLeftPositionX * -1 - 80 + ButtonWidth && // clickX < picture right
			clickY > ArrowButtonLeftPositionY && // clixkY > picture top
			clickY < ArrowButtonLeftPositionY + ButtonHeight // clickY < picture bottom
		);
	} else if (button == "up") {
		return (
			clickX > ArrowButtonUPPositionX && // clickX > picture left
			clickX < ArrowButtonUPPositionX + ButtonWidth && // clickX < picture right
			clickY > ArrowButtonUPPositionY && // clixkY > picture top
			clickY < ArrowButtonUPPositionY + ButtonHeight // clickY < picture bottom
		);
	} else if (button == "throw") {
		return (
			clickX > BottleButtonPositionX && // clickX > picture left
			clickX < BottleButtonPositionX + ButtonWidth && // clickX < picture right
			clickY > BottleButtonPositionY && // clixkY > picture top
			clickY < BottleButtonPositionY + ButtonHeight // clickY < picture bottom
		);
	}
}
