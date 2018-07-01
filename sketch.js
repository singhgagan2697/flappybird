const TOTAL = 500;
var birds = [];
let savedBirds = [];
var pipes = [];
var score = 0;
var running = true;
var canPipe = false;
let counter = 0;
var highestScore = 0;
var genNum = 1;
var bestBird;
var bestBirdScore = 0;

function keyPressed() {
	if (key === 'S') {
	  saveJSON(bestBird.brain, 'bird.json');
	}
  }

  function setup() {
	createCanvas(600, 480);
	slider = createSlider(1, 100, 1);
	for(let i = 0; i < TOTAL; i++) {
		birds[i] = new Bird();
	}
}

function draw() {
	
	for(let n = 0; n < slider.value(); n++) {

		if(counter % 150 == 0) {
			canPipe = true;
		}
		if(counter % 175 == 0) {
			canPipe = false;
		}

		if((canPipe && random() > 0.2) || pipes.length <= 0) {
			pipes.push(new Pipe());
			canPipe = false;
		}

		if(this.running){
			for(var i = pipes.length-1; i >= 0; i--) {
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
				bird.update();
				bird.think(pipes);
				if(bird.score > bestBirdScore) {
					bestBird = bird;
				}
			}

			if(birds.length === 0) {
				score = 0;
				nextGeneration();
				genNum++;
				counter = 0;
				pipes = [];
			}

		}
		else {
			gameOver();
		}
		counter++;
		if(score > highestScore) {
			highestScore = score;
		}
	}

	background(0);

	text(score, 15, 15);

	text('highestScore', 15, 35);
	text(highestScore, 105, 35);

	text('generation', 15, 55);
	text(genNum, 105, 55);

	for(let bird of birds) {
		bird.show();
	}
	
	for(let pipe of pipes) {
		pipe.show();
	}
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