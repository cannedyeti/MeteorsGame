var ship;
var meteors = [];
var img;
var lasers = [];


function setup() {
	img = loadImage("img/space.jpg");
	createCanvas(windowWidth,windowHeight)
	ship = new Ship();
	meteor = new Meteor;
	for (var i = 0; i < 12; i++) {
		meteors.push(new Meteor());
	}
}

function draw() {
	background(img);
	for (var i = lasers.length-1; i >= 0; i--) {
		lasers[i].render();
		lasers[i].update();
		for (var j = meteors.length-1; j >= 0; j--)
			if (lasers[i].hits(meteors[j])) {
				if (meteors[j].radius > 30) {
					var newMeteors = meteors[j].break();
					meteors = meteors.concat(newMeteors);
					meteors.splice(j, 1);
					lasers.splice(i, 1);
					break;
				} else {
					meteors.splice(j, 1);
				}
		}
	}
	for (var i = 0; i < meteors.length; i++) {
		meteors[i].render();
		meteors[i].update();
		meteors[i].changeSides();	
	}
	ship.render();
	ship.turn();
	ship.update();
	ship.changeSides();

}

function keyReleased() {
	ship.setRotation(0);
	ship.moving(false);
}

function keyPressed() {
	if (keyCode == 32) {
		lasers.push(new Laser(ship.position, ship.heading));
	} else if (keyCode == RIGHT_ARROW) {
		ship.setRotation(0.1);
	} else if (keyCode == LEFT_ARROW) {
		ship.setRotation(-0.1);
	} else if (keyCode == UP_ARROW) {
		ship.moving(true);
	}
}