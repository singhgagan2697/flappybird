class Bird {
	constructor(brain) {
		this.y = height/2;
		this.x = 64;
		
		this.gravity = 0.8;
		this.lift = -12;
		this.velocity = 0;

		this.score = 0;
		this.fitness = 0;

		if(brain) {
			this.brain = brain.copy();
		}
		else {
			this.brain = new NeuralNetwork(5, 8, 2);
		}

	}
	show() {
		stroke(255);
		fill(255, 100);
		ellipse(this.x, this.y, 32, 32);
	}

	mutate(mutationProb) {
		this.brain.mutate(mutationProb);
	}

	think(pipes) {

		let closest = null;
		let closestD = Infinity;

		for(let i = 0; i < pipes.length; i++) {
			let d = (pipes[i].x + pipes[i].w) - this.x;
			if(d < closestD && d > 0) {
				closest = pipes[i];
				closestD = d;
			}
		}

		let inputs = [];

		if(closest != null) {
			inputs[0] = this.y / height;
			inputs[1] = closest.top / height;
			inputs[2] = closest.bottom / height;
			inputs[3] = closest.x / width;
			inputs[4] = this.velocity / 10;
		}
		else {
			inputs[0] = this.y / height;
			inputs[1] = 0.5;
			inputs[2] = 0.5;
			inputs[3] = 0.5;
			inputs[4] = 0.5;
		}

		let output = this.brain.predict(inputs);
		if(output[0] > output[1]) {
			this.up();
		}
	}

	update () {		
		this.score++;

		this.velocity += this.gravity;
		this.y += this.velocity;

	}

	up () {
		this.velocity += this.lift;
	}
	
  offScreen() {
    return (this.y > height || this.y < 0);
  }

}