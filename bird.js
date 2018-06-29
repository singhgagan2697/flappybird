class Bird {
	constructor(brain) {
	this.y = height/2;
	this.x = 50;
	
	this.gravity = .6;
	this.lift = -15;
	this.velocity = 0;

	this.score = 0;
	this.fitness = 0;

	if(brain) {
		this.brain = brain.copy();
	}
	else {
		this.brain = new NeuralNetwork(4, 4, 1);
	}

	}
	show() {
		stroke(255);
		fill(255, 50);
		ellipse(this.x, this.y, 32, 32);
	}

	mutate(mutationProb) {
		this.brain.mutate(mutationProb);
	}

	think(pipes) {

		let closest = null;
		let closestD = Infinity;

		for(let i = 0; i < pipes.length; i++) {
			let d = pipes[i].x - this.x;
			if(d < closestD && d >= 0) {
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
		}
		else {
			inputs[0] = this.y / height;
			inputs[1] = 0.5;
			inputs[2] = 0.5;
			inputs[3] = 0.5;
		}

		let output = this.brain.predict(inputs);
		if(output[0] > 0.5) {
			this.up();
		}
	}

	update () {		
		this.score++;

		this.velocity += this.gravity;
		this.velocity *= 0.9;
		this.y += this.velocity;

		if(this.y > height) {
			this.y = height;
			this.velocity = 0;
		}

		if(this.y < 0) {
			this.y = 0;
			this.velocity = 0;
		}
	}

	up () {
		this.velocity += this.lift;
	}
}