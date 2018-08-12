var cursors;

var level1 = {

	create: function () {
		"use strict";
		game.add.image(0, 0, 'bg-level1');
		game.world.setBounds(0, 0, 1900, 1082);

		// physics, so enable the Arcade Physics system
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.sortDirection = Phaser.Physics.Arcade.BOTTOM_TOP;

		//AUDIO

		this.intromusic = game.add.audio('level1-audio');
		this.factbubble = game.add.audio('factbubble');
		this.intromusic.play();

		////FISH
		this.orangefish= game.add.sprite(1200, 600, 'orangefish');
		game.physics.enable(this.orangefish);
		game.add.tween(this.orangefish).to({ x: 800 }, 30000, Phaser.Easing.Linear.None, true, 0, 1200, true)

		//WHALE
		this.whale= game.add.sprite(0, -100, 'whale');
		game.physics.enable(this.whale);
		game.add.tween(this.whale).to({ y: 800 }, 30000, Phaser.Easing.Linear.None, true, 0, 1200, true)

		//Seahorse
		this.seahorse= game.add.sprite(1600, 300, 'seahorse');
		game.physics.enable(this.seahorse);
		game.add.tween(this.seahorse).to({ x: -100 }, 60000, Phaser.Easing.Linear.None, true, 0, 1200, true)
		var tween2 = game.add.tween(this.seahorse).to( { alpha: 1 }, 2000, "Linear", true);
 
    	//  The 1000 tells it to wait for 1 second before restarting the fade.
    	tween2.repeat(10, 1000);


	
		//WATER BOTTLE GROUP
	    this.bottle = game.add.sprite(10, 100, 'bottle');
	    game.add.tween(this.bottle).to({ x: 200 }, 20000, Phaser.Easing.Linear.None, true, 0, 1200, true)
	    game.physics.arcade.enable(this.bottle);

	    //BottleFact
	    this.bottlefact = game.add.sprite(0, 3, 'factbottle');
	    game.physics.arcade.enable(this.bottlefact);
		this.bottlefact.visible = false;


		//STRAW GROUP
	    this.straw = game.add.sprite(400, 700, 'straw');
	    game.add.tween(this.straw).to({ x: 450 }, 20000, Phaser.Easing.Linear.None, true, 0, 1200, true)
	    game.physics.arcade.enable(this.straw);

	    this.strawfact = game.add.sprite(300, 450, 'factstraw');
	    game.physics.arcade.enable(this.strawfact);
		this.strawfact.visible = false;
	 

		//PLASTIC BAG GROUP
		this.bag = game.add.sprite(1300, 100, 'bag');
	    game.add.tween(this.bag).to({ x: 1400 }, 10000, Phaser.Easing.Linear.None, true, 0, 1200, true)
	    game.physics.arcade.enable(this.bag);

	    this.bagfact = game.add.sprite(900, 0, 'factbag');
	    game.physics.arcade.enable(this.bagfact);
		this.bagfact.visible = false;

		
			//Submarine
		this.sub = game.add.sprite(game.world.width / 2, game.world.height/2, 'sub');
		game.camera.follow(this.sub);
		game.physics.arcade.enable(this.sub);
	    cursors = game.input.keyboard.createCursorKeys();



		

	},
	


	update: function () {
		"use strict";
		//responisve
		game.scale.setShowAll();
		game.scale.refresh(); 

		//overlaps
		game.physics.arcade.overlap(this.sub, this.bottle, BottlePop, null, this);
		game.physics.arcade.overlap(this.sub, this.straw, StrawPop, null, this);
		game.physics.arcade.overlap(this.sub, this.bag, BagPop, null, this);
		
		

if(cursors.left.isDown && this.sub.x>-10){
		this.sub.x -= 5;
		//scaling 100% pointing in the orginal directiosn
		this.sub.scale.x = -1;
		}
		
		if(cursors.right.isDown && this.sub.x<2000){
			this.sub.x += 5;
			this.sub.scale.x = 1;	
		}
		if(cursors.up.isDown && this.sub.y>10){
			this.sub.y -= 5;	
		}
		
		if(cursors.down.isDown && this.sub.y<1900){
			this.sub.y += 5;
			}	
}
};


//BOTTLE FUNCTIONS
function BottlePop(sub, bottle) {
	"use strict";
	this.bottlefact.visible = true;
	game.time.events.add(Phaser.Timer.SECOND * 15, fadeBottle, this);
};

function fadeBottle() {
	"use strict";
	game.add.tween(this.bottlefact).to( { alpha: 0 }, 50, Phaser.Easing.Linear.None, true);
	this.bottlefact = game.add.sprite(5, 3, 'factbottle');
	this.bottlefact.visible = false;
};


//STRAW FUNCTIONS
function StrawPop(sub, straw) {
	"use strict";
	this.strawfact.visible = true;
	game.time.events.add(Phaser.Timer.SECOND * 15, fadeStraw, this);
};

function fadeStraw() {
	"use strict";
	game.add.tween(this.strawfact).to( { alpha: 0 }, 50, Phaser.Easing.Linear.None, true);
	this.strawfact = game.add.sprite(300, 450, 'factstraw');
	this.strawfact.visible = false;
};


//BAG FUNCTIONS
function BagPop(sub, bag) {
	"use strict";
	this.bagfact.visible = true;
	game.time.events.add(Phaser.Timer.SECOND * 15, bagStraw, this);
};

function bagStraw() {
	"use strict";
	game.add.tween(this.bagfact ).to( { alpha: 0 }, 50, Phaser.Easing.Linear.None, true);
	this.bagfact = game.add.sprite(900, 0, 'factbag');
	this.bagfact .visible = false;
};


