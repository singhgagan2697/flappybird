class Bird {
	constructor() {
	this.y = height/2;
	this.x = 50;
	
	this.gravity = .6;
	this.lift = -15;
	this.velocity = 0;

	this.brain = new NeuralNetwork(4,4,1);
	
	}
	show() {
		fill(255);
		ellipse(this.x, this.y, 32, 32);
	}


	think(pipes) {
		let inputs = [];
		inputs[0] = this.y / height;
		inputs[1] = pipes[0].top / height;
		inputs[2] = pipes[0].bottom / height;
		inputs[3] = pipes[0].x / width;

		console.log(inputs);

		let output = this.brain.predict(inputs);
		if(output > 0.5) {
			this.up();
		}
	}

	update () {

		
		
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