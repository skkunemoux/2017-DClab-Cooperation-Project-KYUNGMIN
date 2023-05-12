
var success=0;

var music_back,music_jump;
var i;
var players;
var player;
var player2;
var platforms,spikes;
var cursors;
var switch_on_1;
var switch_on_2;
var switch_off;
var switch_var=0;

var game_over,restart,home;


var player1_heart, player2_heart;

var leftKey;
var rightKey;
var upKey;
var downKey;

var hole;

var attempt1=3,attempt2=3;


var introText;
var Game={
 preload: function(){

    this.load.image('back', './assets/images/back.png');
    this.load.image('ground_long', './assets/images/platform_long2.png');
    this.load.image('ground_column', './assets/images/platform_column2.png');
    this.load.image('star', './assets/images/star.png');
    this.load.image('base', './assets/images/ground.png');
    this.load.image('switch_on', './assets/images/switch_on.png');
    this.load.image('switch_off', './assets/images/switch_off.png');
    this.load.image('spike', './assets/images/spike.png');
    this.load.image('hole', './assets/images/hole.png');
  //  game.load.atlas('button', './assets/images/button_texture_atlas.png', './assets/button.json');
    this.load.spritesheet('dude', './assets/images/dude.png', 32, 46);
    this.load.image('heart0', './assets/images/heart_0.png');
    this.load.image('heart1', './assets/images/heart_1.png');
    this.load.image('heart2', './assets/images/heart_2.png');
    this.load.image('heart3', './assets/images/heart_3.png');
    this.load.image('game_over', './assets/images/game_over.png');
    this.load.image('restart', './assets/images/restart.png');
    this.load.image('home', './assets/images/home.png');


    game.load.audio('jump','./assets/musics/jump.mp3');

},



create: function() {
    //music_back = game.sound.play('background');

	//spike.width = 40;
	//spike.height = 25;
    //  We're going to be using physics, so enable the Arcade Physics system
    this.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    this.add.sprite(0, 0, 'back');
    platforms = this.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(0, this.world.height - 100, 'base');
    //ground.scale.setTo(2, 2);
    ground.body.immovable = true;
/*
    ground = platforms.create(0, game.world.height-625 , 'base');
    ground.body.immovable = true;
*/

    var ledge; 
    ledge= platforms.create(290, 580, 'ground_long');
    ledge.body.immovable = true;

    ledge = platforms.create(570, 540, 'ground_long');
    ledge.body.immovable = true;

    ledge = platforms.create(210, 60, 'ground_long');
    ledge.body.immovable = true;

    ledge = platforms.create(610, 60, 'ground_long');
    ledge.body.immovable = true;

    ledge = platforms.create(420, 260, 'ground_long');
    ledge.body.immovable = true;

    ledge = platforms.create(210, 60, 'ground_column');
    ledge.body.immovable = true;

    ledge = platforms.create(1010, 60, 'ground_column');
    ledge.body.immovable = true;

    ledge = platforms.create(650, 380, 'ground_long');
    ledge.body.immovable = true;

    ledge = platforms.create(210, 420, 'ground_long');
    ledge.body.immovable = true;


    // The player and its settings

    for(i=0;i<2;i++){
    	spikes = platforms.create(570+40*1,515,'spike');	//making the spikes

    	spikes.body.immovable = true;
    	spikes.width=40;
   	    spikes.height=25;
    	spikes.body.collideWorldBounds = true;
   		spikes.body.onCollide = new Phaser.Signal();	
   		spikes.body.onCollide.add(this.hitSprite, this);
	}

    for(i=0;i<3;i++){
   		spikes = platforms.create(892+40*i,432,'spike');
        spikes.anchor.setTo(0,.6);
    	spikes.body.immovable = true;	
    	spikes.width=40;
    	//spikes.height=25;
    	spikes.scale.y*=-1;
   		spikes.body.onCollide = new Phaser.Signal();	
   		spikes.body.onCollide.add(this.hitSprite, this);
    }

    for(i=0;i<3;i++){
   		spikes = platforms.create(580+40*i,312,'spike');
    	spikes.anchor.setTo(0,.6);
    	spikes.body.immovable = true;
    	spikes.width=40;
      //  spikes.height=25;
    	spikes.scale.y*=-1;
   		spikes.body.onCollide = new Phaser.Signal();	
   		spikes.body.onCollide.add(this.hitSprite, this);
    }

    hole=platforms.create(620,220,'hole');
    hole.body.immovable=true;
    hole.anchor.setTo(0,0);
   	hole.width=40;
   	hole.height=40;
   	hole.body.onCollide = new Phaser.Signal();	
   	hole.body.onCollide.add(this.hitHole, this);
    
    player = this.add.sprite(32, this.world.height - 150, 'dude');

    //  We need to enable physics on the player
    this.physics.enable(player, Phaser.Physics.ARCADE);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 650;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 8, true);
    player.animations.add('right', [5, 6, 7, 8], 8, true);
    //  Our controls.


    
    player2 = this.add.sprite(1200, this.world.height - 150, 'dude');

    //  We need to enable physics on the player
    this.physics.enable(player2, Phaser.Physics.ARCADE);

    //  Player physics properties. Give the little guy a slight bounce.
    player2.body.bounce.y = 0.2;
    player2.body.gravity.y = 650;
    player2.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player2.animations.add('left', [0, 1, 2, 3], 8, true);
    player2.animations.add('right', [5, 6, 7, 8], 8, true);

    
    cursors = this.input.keyboard.createCursorKeys();

	this.leftKey = this.input.keyboard.addKey(Phaser.Keyboard.A);		//for player 2
	this.rightKey = this.input.keyboard.addKey(Phaser.Keyboard.D);
	this.upKey = this.input.keyboard.addKey(Phaser.Keyboard.W);
	this.downKey = this.input.keyboard.addKey(Phaser.Keyboard.S);


	this.physics.startSystem(Phaser.Physics.P2JS);

    switch_off = this.add.sprite(-200, -200, 'switch_off');
      //  game.input.onDown.add(change, this);
     // switch_off.immovable=true;

    //game.input.onDown.add(change, this);
 //   switch_on = game.add.sprite(200, 200, 'switch_on');
	//game.physics.p2.enable([ switch_on,switch_off ], false);

    switch_on_1 = this.add.sprite(100, 350, 'switch_on');
    switch_on_1.anchor.set(0.5);
    switch_on_1.inputEnabled = true;
    switch_on_2 = this.add.sprite(1180, 350, 'switch_on');
    switch_on_2.anchor.set(0.5);
    switch_on_2.inputEnabled = true;
    switch_on_1.events.onInputDown.add(this.change, this);		//Sending the signal of clicking the switch button
    switch_on_2.events.onInputDown.add(this.change, this);

    player.anchor.setTo(.5,.5);
    player2.anchor.setTo(.5,.5);



    player1_heart = this.add.sprite(60, 70, 'heart3');
    player1_heart.width=90;
    player1_heart.height=35;
    player2_heart = this.add.sprite(1130, 70, 'heart3');
    player2_heart.width=90;
    player2_heart.height=35;

},

update: function() {
    //attempt1=0;
    this.physics.arcade.collide(player2, platforms);
    this.physics.arcade.collide(player2, spikes);

    //  Reset the players velocity (movement)
    player2.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player2.body.velocity.x = -150;

        player2.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player2.body.velocity.x = 150;

        player2.animations.play('right');
    }
    else
    {
        //  Stand still
        player2.animations.stop();

        player2.frame = 4;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player2.body.touching.down)
    {
            music_jump = game.sound.play('jump');
            player2.body.velocity.y = -320;
    }
    if(switch_var%2==1 && cursors.up.isDown){
            player2.body.velocity.y = 320;

    }



    this.physics.arcade.collide(player, platforms);
    this.physics.arcade.collide(player, spikes);

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (this.leftKey.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (this.rightKey.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (this.upKey.isDown && player.body.touching.down)
    {
        music_jump = game.sound.play('jump');
        player.body.velocity.y = -320;
    }

    //hole.angle++;

    if(success==2){
    	this.nextStage();
    }


        if(attempt1==3){

    player1_heart.loadTexture('heart3', 0);
    player1_heart.width=90;
    player1_heart.height=35;
        }
        if(attempt1==2){

    player1_heart.loadTexture('heart2', 0);
    player1_heart.width=90;
    player1_heart.height=35;
        }

        if(attempt1==1){

    player1_heart.loadTexture('heart1', 0);
    player1_heart.width=90;
    player1_heart.height=35;
        }

        if(attempt1==0){
    player1_heart.loadTexture('heart0', 0);
    player1_heart.width=90;
    player1_heart.height=35;
            this.gameOver();
        }
        if(attempt1<0){
    player1_heart.loadTexture('heart0', 0);
    player1_heart.width=90;
    player1_heart.height=35;
            
        }


        if(attempt2==3){
    player2_heart.loadTexture('heart3', 0);
    player2_heart.width=90;
    player2_heart.height=35;
        }
        if(attempt2==2){
    player2_heart.loadTexture('heart2', 0);
    player2_heart.width=90;
    player2_heart.height=35;

        }

        if(attempt2==1){
    player2_heart.loadTexture('heart1', 0);
    player2_heart.width=90;
    player2_heart.height=35;

        }

        if(attempt2==0){
    player2_heart.loadTexture('heart0', 0);
    player2_heart.width=90;
    player2_heart.height=35;
            this.gameOver();
        }
        if(attempt2<0){
    player2_heart.loadTexture('heart0', 0);
    player2_heart.width=90;
    player2_heart.height=35;

        }
},
	
nextStage: function(){

},

change: function() {

		if(switch_var%2==0){
		    switch_on_1.loadTexture('switch_off', 0);
		    switch_on_2.loadTexture('switch_off', 0);
		    console.log("off");

		    player.scale.y*=-1;
    		player.body.gravity.y = -650;
		    player2.scale.y*=-1;
    		player2.body.gravity.y = -650;
			switch_var+=1;
		}
		else{
			switch_on_1.loadTexture('switch_on',0);
			switch_on_2.loadTexture('switch_on',0);
			console.log("on");

		    player.scale.y*=-1;
    		player.body.gravity.y = 650;
		    player2.scale.y*=-1;
    		player2	.body.gravity.y = 650;
			switch_var+=1;	

		}
        console.log(switch_var);
	


},

hitSprite: function(spike,play) {

        console.log("wtf");
    if(play==player){
	    player.kill();
	    console.log("wtf");    
        player.reset(32, this.world.height-150);
        attempt1--;
    }
    if(play==player2){
        player2.kill();
        console.log("wtf");    
        player2.reset(1200, this.world.height - 150);
        attempt2--;
    }


},

 hitHole: function(hole, players) {

	players.kill();
	success++;
},

nextStage: function(){
    game.paused=true;
    introText = game.add.text(game.world.centerX, 400, 'Success!', { font: "40px Arial", fill: "#000000", align: "center" });
    introText.anchor.setTo(0.5, 0.5);
    introText.visible = true;

},
gameOver: function(){
    attempt1=-1;
    attempt2=-1;
    console.log("over");
    game_over = this.add.sprite(230,100  , 'game_over');
    game_over.width=800;
    game_over.height=400;

    restart=this.add.sprite(730,550,'restart');
    restart.inputEnabled = true;
    restart.events.onInputDown.add(this.reStart, this);


    home=this.add.sprite(380,530,'home');
    home.width=110;
    home.height=110;
    home.inputEnabled = true;
    home.events.onInputDown.add(this.hoMe, this);

  //  game.paused=true;


},

reStart: function(){
    console.log("re?");
    attempt1=3; 
    attempt2=3;
    this.state.start('Game');
},
hoMe: function(){
    console.log("home?");
    this.state.start('Menu');
}
};