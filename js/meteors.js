var meteorImg;

function preload() {
	meteorImg = loadImage("img/meteor.png")
}

function Meteor (position, radius) {
	if (position) {
		this.position = position.copy();
	} else {
		this.position = createVector(random(width), random(height));
	}
	if (radius) {
		this.radius = radius/2;
	} else {		
		this.radius = random(30, 120);
	}
	this.velocity = p5.Vector.random2D();

	this.update = function() {
		this.position.add(this.velocity);
		this.velocity.mult(1.0000009);
	};


	this.render = function() {
		push();
		image(meteorImg, this.position.x, this.position.y, this.radius, this.radius);
		pop();
	}

	this.changeSides = function() {
		if (this.position.x > width + this.radius) {
			this.position.x = -this.radius
		}  else if (this.position.x < - this.radius) {
			this.position.x = width + this.radius;
		}  	else if (this.position.y > height + this.radius) {
			this.position.y = -this.radius
		}  	else if (this.position.y < - this.radius) {
			this.position.y = height + this.radius;
		}
	}
	this.break = function() {
		var newM = [];
		newM[0] = new Meteor(this.position, this.radius);
		newM[1] = new Meteor(this.position, this.radius);
		return newM;
	}
}

