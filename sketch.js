const TOTAL = 100;
var birds = [];
let savedBirds = [];
var pipes = [];
var score = 0;
var running = true;
var canPipe = false;
let counter = 0;

function setup() {
	createCanvas(400, 600);
	for(let i = 0; i < TOTAL; i++) {
		birds[i] = new Bird();
	}
}

function draw() {
	background(0);
	
	if(counter % 175 == 0) {
		canPipe = true;
	}
	if(counter % 200 == 0) {
		canPipe = false;
	}

	if((canPipe && random() > 0.2) || pipes.length == 0) {
		pipes.push(new Pipe());
		canPipe = false;
	}
	text(score, 15, 15)

	if(this.running){
		for(var i = pipes.length-1; i >= 0; i--) {
			pipes[i].show();
			pipes[i].update();
			

			for(let j = birds.length-1; j >=0; j--) {
			
				if(pipes[i].hits (birds[j])){
					savedBirds.push(birds.splice(j, 1)[0]);
					//this.running = false;
				}	
			}

			if(pipes[i].offscreen()) {
				this.score++;
				pipes.splice(i, 1);
			}
		}

		for(let bird of birds) {
			bird.show();
			bird.update();
			bird.think(pipes);
		}

		if(birds.length === 0) {
			score = 0;
			nextGeneration();
			counter = 0;
			pipes = [];
		}

	}
	else {
		gameOver();
	}
	counter++;
}

// function keyPressed() {
// 	if(key == ' ') {
// 		console.log("I jumped");
// 		bird.up();
// 	}
// }

function gameOver() {
	text("Game Over", width/2 - 30, height/2 - 50);
}