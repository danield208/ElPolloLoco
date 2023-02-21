function animate() {
	if (frameRateTimeStamp + frameRate <= new Date().getTime()) {
		frameRateTimeStamp = new Date().getTime();
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawBackgrounds();
		drawEnemies();
		drawBottles();
		drawCoins();
		drawPlayer();
		displayPlayerInfos();
		checkForLoseOrWin();
		checkForJump();
		checkForThrow();
		spawnBoss();
		initTouchButtons();
		setWalkingValues();
	}
	if (!stopAnimation) {
		requestAnimationFrame(animate);
	}
}

function drawBackgrounds() {
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
}

function drawEnemies() {
	enemies.forEach((enemy) => {
		enemy.update();

		if (enemy.type == "boss") enemyDamage = 2;
		else enemyDamage = 1;

		if (checkForCollision(enemy)) {
			setDemage(enemy);
		} else {
			setTimeout(() => {
				player.damage = false;
			}, 200);
		}

		if (enemy.type == "boss") {
			setBossStats(enemy);
		}
	});
}

function setDemage(enemy) {
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
}

function setBossStats(enemy) {
	bossStats = {
		position: {
			x: enemy.offsetX,
			y: enemy.offsetY,
		},
		width: enemy.offsetWidth,
		height: enemy.offsetHeight,
	};
}

function drawBottles() {
	bottles.forEach((bottle) => {
		bottle.update();
		checkThrownBottle(bottle);
		checkPlayerCollisionWithBottle(bottle);
	});
}

function checkThrownBottle(bottle) {
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
}

function checkPlayerCollisionWithBottle(bottle) {
	if (checkForCollision(bottle) && !bottle.thrown) {
		for (let index = 0; index < bottles.length; index++) {
			if (bottles[index].id === bottle.id) {
				bottles.splice(index, 1);
				player.bottles++;
			}
		}
	}
}

function drawCoins() {
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
}

function drawPlayer() {
	player.update();
}

function displayPlayerInfos() {
	dispalyBottles();
	displayCoins();
}

function dispalyBottles() {
	ctx.drawImage(BottleIcon, 7, 50, 50, 50);
	ctx.fillStyle = "black";
	ctx.font = "25px rubikbubbles";
	ctx.fillText(player.bottles + " / " + 12, 50, 85);
}

function displayCoins() {
	ctx.drawImage(CoinIcon, 15, 100, 35, 35);
	ctx.fillStyle = "black";
	ctx.font = "25px rubikbubbles";
	ctx.fillText(player.coins, 50, 128);
}

function checkForLoseOrWin() {
	checkIfGameLose();
	checkIfGameWon();
}

function checkIfGameLose() {
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
}

function checkIfGameWon() {
	if (bossHealth == 0 && !wonGame) {
		if (!setWinTimestamp) {
			setWinTimestamp = true;
			BossTimestamp_StopDeadAnimation = new Date().getTime();
		}
		wonGame = true;
	}
}

function checkForJump() {
	checkIfJump();
	applyGravity();
	setImageTimeDelay();
}

function checkIfJump() {
	if (keys.space && player.velocity.y == 0) {
		player.velocity.y -= player.jumpHieght;
		player.timeDelayImage = 70;
		player.currentImageCounter = 0;
		playerJumping = true;
		player.currentAnimationArray = IMAGES_JUMP;
	}
}

function applyGravity() {
	if (player.position.y + player.height + player.velocity.y <= canvas.height - mapOffset) player.velocity.y += gravity;
	else {
		if (player.offsetY + player.offsetHeight + 11 >= canvas.height - mapOffset) {
			playerJumping = false;
		}
		player.velocity.y = 0;
	}
}

function setImageTimeDelay() {
	if (player.position.y + player.height - 10 >= canvas.height - mapOffset) {
		player.timeDelayImage = 100;
	}
}

function checkForThrow() {
	if (keys.throw && player.bottles > 0 && timestamp_ThrownBottle + timeDelay < new Date().getTime()) {
		player.bottles--;
		bottleAmount--;
		timestamp_ThrownBottle = new Date().getTime();
		setThrownBottle();
	}
}

function setThrownBottle() {
	if (lastPosition === "left") {
		thrownToLeft();
	} else {
		thrownToRight();
	}
}

function thrownToLeft() {
	bottles.push(
		new Bottle({
			thrown: true,
			x: player.offsetX - 25,
			y: player.offsetY + 25,
			velocityX: -7,
			velocityY: -20,
		})
	);
}

function thrownToRight() {
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

function spawnBoss() {
	// spawn boss
	if (player.position.x > backgroundsLayer_one[8].position.x - 1000) {
		if (!bossSpawned) {
			enemies.push(new Enemy("boss"));
			bossSpawned = true;
		}
	}
}

function initTouchButtons() {
	if (drawTouchButtons) {
		ctx.drawImage(arrowButton, ArrowButtonRightPositionX, ArrowButtonRightPositionY, ButtonWidth, ButtonHeight);
		ctx.save();
		ctx.scale(-1, 1);
		ctx.drawImage(arrowButton, ArrowButtonLeftPositionX, ArrowButtonLeftPositionY, ButtonWidth, ButtonHeight);
		ctx.restore();

		ctx.drawImage(arrowButtonUP, ArrowButtonUPPositionX, ArrowButtonUPPositionY, ButtonWidth, ButtonHeight);
		ctx.drawImage(bottleButton, BottleButtonPositionX, BottleButtonPositionY, ButtonWidth, ButtonHeight);

		setTouchButtonsBooleans();
	}
}

function setTouchButtonsBooleans() {
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

function setWalkingValues() {
	if (keys.right && backgroundsLayer_one[8].position.x > 50) {
		walkingRight();
	} else if (keys.left && backgroundsLayer_one[0].position.x < -50) {
		walkingLeft();
	} else if (
		player.position.y + player.height + player.velocity.y >= canvas.height - mapOffset &&
		player.health != 0 &&
		!player.damage
	) {
		setIdle();
	} else if (!playerJumping) player.currentAnimationArray = IMAGES_HURT;
}

function walkingRight() {
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
}

function walkingLeft() {
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
}

function setIdle() {
	player.currentAnimationArray = IMAGES_IDLE;
	walkingsound.pause();
}
