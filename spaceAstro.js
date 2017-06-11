var gamePlay =  false;
var ship;
var asteriods = [];
var score = 0;
var lasers = [];
var power;

function banner(x,y,siz){
	this.x = x;
	this.y = y;
	noStroke();
	fill("orange");
	textSize(siz);
	text("Space", x, y, siz);
	fill(200);
	x = x+siz*3;
	text("Astro", x, y, siz*5);
	y = y+siz;
	x = this.x+siz;
	textSize(siz/1.5);
	text("By : ", x, y, siz*1.5);
	x = x + siz*1.5;
	text("Prabin Parajuli", x, y, siz*6);
}
function setup(){
	createCanvas(windowWidth, windowHeight);
	ship = new Ship(width/2, height/2, 20);
	power = new powers("triple", random(width), random(height));

	for(var i = 0; i< 5; i++){
		asteriods[i] = new Asteriod;
	}
}
function draw(){
	background(51);
	banner(50, 50, 25);
	power.update();
	power.show();
	power.eat();
	power.edges();
	if(random() <= 0.0005){
		var bul = random(bullets);
		power = new powers(bul)
		power.active(1000);
	}

	if(asteriods.length <= 6){
		asteriods.push(new Asteriod);
	}
	for (var i = 0; i < asteriods.length; i++) {
		asteriods[i].update();
		asteriods[i].show();
		asteriods[i].edges();
		if(asteriods[i].r < 12){
			asteriods.splice(i,1);
		}else{
		if(ship.die(asteriods[i])){
			ship = new Ship(width/2, height/2, 20);
			asteriods = [];
			for(var i = 0; i< 10; i++){
				asteriods[i] = new Asteriod;
			}
			console.log("oopsss...!");
		}
	}
	}
	for (var i = lasers.length-1; i > 0; i--) {
		lasers[i].update();
		lasers[i].show();
		if(lasers[i].pos.x > width || lasers[i].pos.x < 0 || lasers[i].pos.y > height || lasers[i].pos.y < 0){
			lasers.splice(i, 1);
			break;
		}
		for (var j = asteriods.length-1; j >= 0; j--) {
			if(lasers[i].hits(asteriods[j])){
				var newAsteroid = asteriods[j].breakup();
				asteriods =  asteriods.concat(newAsteroid);
				asteriods.splice(j, 1);
				lasers.splice(i, 1);
				break;
			}
		}

	}
	ship.update();
	ship.show();
	ship.edges();

}



function keyPressed(){
	if(keyCode === 32){
		// ship.firing = true ;
		// console.log(new Laser(ship.pos, ship.heading));
		if(bulletType == "single"){
			lasers.push(new Laser(ship.pos, ship.heading));
		}
		if(bulletType == "singleJitter"){
			lasers.push(new Laser(ship.pos, random(ship.heading-0.1, ship.heading+0.1,)));
		}
		if(bulletType == "rocket"){
			lasers.push(new Laser(ship.pos, random(ship.heading-0.1, ship.heading+0.1), "rocket"));
		}
		if(bulletType == "triple"){
			lasers.push(new Laser(ship.pos, ship.heading));
			lasers.push(new Laser(ship.pos, ship.heading+0.1));
			lasers.push(new Laser(ship.pos, ship.heading-0.1));
		}
		if(bulletType == "tripleJitter"){
			lasers.push(new Laser(ship.pos, random(ship.heading-0.1, ship.heading+0.1,)));
			lasers.push(new Laser(ship.pos, random(ship.heading-0.1, ship.heading+0.1,)));
			lasers.push(new Laser(ship.pos, random(ship.heading-0.1, ship.heading+0.1,)));

		}

	}
	if(keyCode == LEFT_ARROW){
		ship.rotation += 0.1;
	}
	if(keyCode == RIGHT_ARROW){
		ship.rotation -= 0.1;
	}
	if(keyCode == UP_ARROW){
		ship.boosting = true;
	}
}

function keyReleased(){
	ship.rotation = 0;
	ship.boosting = false;
	ship.firing = false;
}
