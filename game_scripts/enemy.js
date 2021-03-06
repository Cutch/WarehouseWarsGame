var enemyTicksPerMovement = 3;
// -- Start Enemy Class --
function Enemy (img, x, y) {
    this.x = x;
    this.y = y;
	this.img = img;
	this.id = enemyNum;
	this.enemyId = -1;
	this.ticks = 0;
	this.dead = false;
	gameBoard[this.y][this.x] = this;
}
Enemy.prototype.draw = function() {
	gameBoardElements[this.y][this.x].src = this.img;
}
Enemy.prototype.remove = function() {
	gameBoard[this.y][this.x] = 0;
	this.dead = true;
}
Enemy.prototype.move = function() {
	if(this.dead) return false;
	this.ticks++;
	if(this.ticks < enemyTicksPerMovement) return true;
	this.ticks = 0;

	var c;
	var start;
	do{
		c = Math.floor(Math.random()*8);
	}while(c == 8);
	start = c;
	
	var d; 
	var v;
	do{
		c++;
		c %= 8;
		d = directionList[c];
		v = gameBoard[this.y-d[1]][this.x+d[0]];
	} while(v != 0 && v.id != playerNum && c != start);
	
	if(v == 0 || v.id == playerNum){
		gameBoard[this.y][this.x] = 0;
		this.x += d[0];
		this.y -= d[1];
		gameBoard[this.y][this.x] = this;
	}else{
		score += 50;
		document.getElementById("scoreSpan").innerHTML = score;
		this.dead = true;
		gameBoard[this.y][this.x] = new Flame(this.x, this.y);
		return false;
	}
	return true;
}
// -- End Enemy Class --
