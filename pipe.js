function Pipe() {

	this.rangeUpLim = 200;
	this.rangeLowLim = 100;

	do{
		this.top = random(height/2);
		this.bottom = random(height/2);

	}
	while(((height - this.bottom) - this.top < this.rangeLowLim)
	|| ((height - this.bottom) - this.top > this.rangeUpLim));

	this.x = width;
	this.w = 50;
	this.speed = 2;

	this.highlight = false;

	this.show = function() {
		fill(255);
		if(this.highlight) {
			fill(255, 0, 0);
		}
		rect(this.x, 0, this.w, this.top);
		rect(this.x, height-this.bottom, this.w, this.bottom);
	}

	this.update = function() {
		this.x -= this.speed;
	}

	this.offscreen = function() {
		if(this.x < -this.w) {
			return true;
		}
		else {
			return false;
		}
	}


	this.hits= function(bird) {
		if(bird.x > this.x && bird.x < this.x + this.w){
			if(bird.y < this.top || bird.y > height - this.bottom) {
				this.highlight = true;
				return true;
			}
		}
		
		this.highlight = false;
		return false;
	}
}