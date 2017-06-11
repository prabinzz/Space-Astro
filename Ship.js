
function Ship(x, y, size){
	this.pos = createVector(x, y);
	this.size = size;
	this.heading = 0;
	this.rotation = 0;
	this.die_s = false;
	this.val = createVector(0, 0);
	this.boosting = false;

	this.rotate = function(angle){
		this.heading += angle;
	}

	this.boost = function(){
		var force = p5.Vector.fromAngle(this.heading);
		this.val.add(force.mult(0.5));
	}

	this.die = function(ass){
		d = dist(this.pos.x, this.pos.y, ass.pos.x, ass.pos.y);
		if(d < this.size + ass.r){
			this.die_s = true;
			return true;
		}
		return false;
	}

	this.edges = function(){
		if(this.pos.x > width + this.size){
			this.pos.x = -this.size;
		}else if (this.pos.x < -this.size) {
			this.pos.x = width + this.size;
		}
		if(this.pos.y > height + this.size){
			this.pos.y = -this.size;
		}else if (this.pos.y < -this.size) {
			this.pos.y = height + this.size;
		}
	}

	this.update =  function(){
		this.pos.add(this.val);
		if(this.die_s){
			temp = 0;
			while(temp < TWO_PI){
				lasers.push(this.pos, temp, "single");
				temp += 0.1;
			}
			this.die_s = false;
		}
		if(this.boosting){
			this.boost();
		}
		this.val.mult(0.98);
 	}

	this.show = function(){
		push();
		translate(this.pos.x, this.pos.y);
		this.heading += this.rotation;
		rotate(this.heading + PI / 2);
		stroke(255);
		strokeWeight(2);
		fill(51);
		triangle(-this.size, this.size,  this.size,
			this.size, 0, -this.size);
		strokeWeight(5);
		point( 0, -this.size);
		pop();
	}
}

