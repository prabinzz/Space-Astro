function Asteriod(pos, r){
  if (pos){
    this.pos = pos.copy();
  }else{
    this.pos = createVector(random(width), random(height));
  }
  if (r){
    this.r = r/2;
  }else{
    this.r = random(25, 75);
  }
  this.total_edge = floor(random(5,10));
  this.val = p5.Vector.random2D();
  this.offset = [];

  for(var i=0; i < this.total_edge; i++){
    this.offset[i] = random(-(this.r/2), this.r/2 );
  }

  this.edges = function(){
    if(this.pos.x > width + this.r){
      this.pos.x = -this.r;
    }else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if(this.pos.y > height + this.r){
      this.pos.y = -this.r;
    }else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }

  this.breakup =  function(){
    var newAsteroid = [];
    newAsteroid[0] = new Asteriod(this.pos, this.r);
    newAsteroid[0].val.mult(1.5);
    newAsteroid[1] = new Asteriod(this.pos, this.r);
    newAsteroid[1].val.mult(1.5);
    return newAsteroid;
  }

  this.update = function(){
    this.pos.add(this.val);
  }
  this.show = function(){
    push();
    translate(this.pos.x, this.pos.y);
    stroke(255);
    noFill();
    strokeWeight(2);
    // ellipse(0, 0, this.r*2 );
    beginShape();

    for(var i=0; i < this.total_edge ; i++){
      var angle = map(i, 0, this.total_edge, 0, TWO_PI);
      var r = this.r + this.offset[i];
      var x = r*cos(angle);
      var y = r*sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }
}
