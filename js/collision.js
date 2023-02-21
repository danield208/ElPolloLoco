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
