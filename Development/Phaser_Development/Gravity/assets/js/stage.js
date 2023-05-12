var stage1,stage2,stage3,stage4;
var Stage={
	preload: function(){

        game.load.image('back', './assets/images/back.png');
        game.load.image('stage1', './assets/images/stage/0.png');
        game.load.image('stage2', './assets/images/stage/1.png');
        game.load.image('stage3', './assets/images/stage/2.png');
        game.load.image('stage4', './assets/images/stage/3.png');
        game.load.image('stage5', './assets/images/stage/4.png');
        game.load.image('stage6', './assets/images/stage/5.png');
        game.load.image('stage7', './assets/images/stage/6.png');
        game.load.image('stage8', './assets/images/stage/7.png');
        game.load.image('stage9', './assets/images/stage/8.png');

	},

	create: function(){
      /*  start = Menu.add.sprite(640, 350, 'start');
        start.width=100;
        start.height=60;
        start.anchor.set(0.5);
        start.inputEnabled = true;     //Sending the signal of clicking the switch button
        start.events.onInputDown.add(this.startGame, this);*/
        game.add.sprite(0, 0, 'back');

        stage1=Stage.add.sprite(300,200,'stage1');
        //stage
        stage1.anchor.set(0.5);
        stage1.inputEnabled=true;
        stage1.events.onInputDown.add(this.start1,this);

        /*stage2=Stage.add.sprite(300,200,'stage1');
        //stage
        stage1.anchor.set(0.5);
        stage1.inputEnabled=true;
        stage1.events.onInputDown.add(this.start1,this);*/


	},
	start1: function(){
		game.state.start('Game');
	}
};