var ship;
var meteors = [];
var img;
var lasers = [];


function setup() {
	img = loadImage("img/space.jpg");
	createCanvas(windowWidth,windowHeight)
	ship = new Ship();
	meteor = new Meteor;
	for (var i = 0; i < 20; i++) {
		meteors.push(new Meteor());
	}
}


draw = function() {
	background(img);

	for (var i = 0; i < meteors.length; i++) {
		if (ship.hits(meteors[i])) {
			$(".startScreen").show();
			$("h3").css("color", "red");
			$(".startScreen > h3").text("You Lose! Try again?")
		}
		meteors[i].render();
		meteors[i].update();
		meteors[i].changeSides();
	}

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

	ship.render();
	ship.turn();
	ship.update();
	ship.changeSides();

	function checkWin() {
		if (meteors.length === 0) {
			console.log('suck it')
			noLoop();
			$(".startScreen > h3").text("YOU WON! Play again?")
			$(".startScreen").show();
		}
	}

}

keyReleased = function() {
	ship.setRotation(0);
	ship.moving(false);
}

keyPressed = function() {
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


$(function() {
	$(".start").click(function() {
		$(".startScreen").hide();
		meteors = [];
		lasers = [];
		setup();
		redraw();
		loop();

	})



});