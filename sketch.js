var bird;
var pipes = [];
var score = 0;
var running = true;

function setup() {
	createCanvas(400, 600);
	bird = new Bird();
	pipes.push(new Pipe());
}

function draw() {
	background(0);

	text(score, 15, 15)

	if(this.running){
		for(var i = pipes.length-1; i >= 0; i--) {
			pipes[i].show();
			pipes[i].update();
			
			if(pipes[i].hits(bird)){
				this.running = false;
			}

			if(pipes[i].offscreen()) {
				this.score++;
				pipes.splice(i, 1);
			}
		}

		bird.show();
		bird.update();

		if(frameCount % 200 == 0) {
			pipes.push(new Pipe())
		}
	}
	else {
		gameOver();
	}
}

function keyPressed() {
	if(key == ' ') {
		console.log("I jumped");
		bird.up();
	}
}

function gameOver() {
	text("Game Over", width/2 - 30, height/2 - 50);
}