var bulletSpeed = 10;
var maxTime ;
var bulletDuration;
var bullets = ["singleJitter","triple", "tripleJitter"];
var bulletType = "single";
function Laser(spos, angle, type){
  this.pos = createVector(spos.x, spos.y);
  this.val = p5.Vector.fromAngle(angle);
  this.val.mult(bulletSpeed);

  this.update = function(){
    this.pos.add(this.val);
  }

  this.hits = function(ass){
    d = dist(this.pos.x, this.pos.y, ass.pos.x, ass.pos.y);
    if(d < ass.r){
      return true;
    }
  }

  this.show = function(){
    stroke(255);
    strokeWeight(5);
    point(this.pos.x, this.pos.y);
  }
}

function powers (name, x, y){
  this.name = name;
  this.pos = createVector(random(width),random(height));
  this.size = 50;
  this.activated = false;
  this.val = p5.Vector.random2D();
  this.tsize = 20;
  this.ringSize = 0;

  this.active= function(name, duration){
    this.name = name;
    this.duration = duration;
    this.activated = true;
  }
  this.edges = function(){
    if(this.pos.x > width + this.size){
      this.pos.x = -this.r;
    }else if (this.pos.x < -this.size) {
      this.pos.x = width + this.size;
    }
    if(this.pos.y > height + this.size){
      this.pos.y = -this.size;
    }else if (this.pos.y < -this.size) {
      this.pos.y = height + this.size;
    }
  }

  this.update = function(){
    this.duration -= 1;
    if (this.activated && this.ringSize < this.size * 3){
      this.ringSize += 1;
    }else{
      this.ringSize = 0;
    }
    maxTime -= 1;
    if(maxTime <= 0){
      bulletType = 'single';
    }
    if(this.duration <= 0){
      this.activated = false;
    }
    this.pos.add(this.val);
    if(name == "singleJitter"){
      this.codeName = "SJ";
      this.fullName = "singleJitter";
    }else if (name == "tripleJitter") {
      this.codeName = "TJ";
      this.fullName = "tripleJitter";
    }else if (name == "triple") {
      this.codeName = "T3"
      this.fullName = "triple";
    }
  }
  this.eat = function(){
    if(this.activated){
      maxTime = 1000;
      var d = dist(this.pos.x, this.pos.y, ship.pos.x, ship.pos.y);
      if(d < this.size+ ship.size){
        bulletType = this.fullName;
        this.activated =  false;
      }
    }
  }
  this.show = function(){
    push();
    if(this.activated){
      translate(this.pos.x, this.pos.y);
      noFill();
      stroke("orange");
      strokeWeight(1);
      ellipse(0, 0, this.ringSize);
      ellipse(0, 0, this.ringSize + 20);
      ellipse(0, 0, this.ringSize + 40);
      fill(200);
      ellipse(0, 0, this.size);
      fill("orange");
      textSize(this.tsize);
      text(this.codeName, 0-this.tsize/1.5, this.tsize/3, this.tsize*2 );
    }
    pop();
  }
}
