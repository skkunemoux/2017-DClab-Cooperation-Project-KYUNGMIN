var start;
var music;
var titleText;
var startText,optionText;
var text = null;
var grd;

WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() { game.time.events.add(Phaser.Timer.SECOND, this.createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Revalia']
    }

};
var Menu = {
    preload : function() {
        // load menu image form game object
   // game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        game.load.image('back', './assets/images/back.png');
        game.load.image('start', './assets/images/startButton.png');

    game.load.audio('background','./assets/musics/Marimba-Boy.wav');
    },

  init: function () {
    this.titleText = game.make.text(game.world.centerX, 100, "Gravity", {
        font: 'bold 65px Arial',
      fill: '#FDFFB5',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
   // this.optionCount = 1;
  },
    create: function () {
        // add image
    	music = game.sound.play('background');
        game.add.sprite(0, 0, 'back');
      /*  start = Menu.add.sprite(640, 350, 'start');
        start.width=100;
        start.height=60;
        start.anchor.set(0.5);
        start.inputEnabled = true;     //Sending the signal of clicking the switch button
        start.events.onInputDown.add(this.startGame, this);*/


        game.add.existing(this.titleText);


        startText=game.add.text(100, 330, "Start", 
        { 
            font: "45px Arial", 
            fill: "#ffff44", 
            align: "center" 
        });

    startText.anchor.set(0.5);

    startText.inputEnabled = true;

    startText.events.onInputOver.add(this.over, this);
    startText.events.onInputOut.add(this.out, this);

    startText.events.onInputDown.add(this.down, this);
    startText.events.onInputUp.add(this.up, this);


        optionText=game.add.text(110, 420, "Option", 
        { 
            font: "45px Arial", 
            fill: "#ffff44", 
            align: "center" 
        });

    optionText.anchor.set(0.5);

    optionText.inputEnabled = true;

    optionText.events.onInputOver.add(this.over2, this);
    optionText.events.onInputOut.add(this.out2, this);

    optionText.events.onInputDown.add(this.down2, this);
    optionText.events.onInputUp.add(this.up2, this);

    },
 createText: function() {

    text = game.add.text(game.world.centerX, game.world.centerY, "- phaser -\nrocking with\ngoogle web fonts");
    text.anchor.setTo(0.5);

    text.font = 'Revalia';
    text.fontSize = 60;

    //  x0, y0 - x1, y1
    grd = text.context.createLinearGradient(0, 0, 0, text.canvas.height);
    grd.addColorStop(0, '#8ED6FF');   
    grd.addColorStop(1, '#004CB3');
    text.fill = grd;

    text.align = 'center';
    text.stroke = '#000000';
    text.strokeThickness = 2;
    text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);


},
    startOption: function(){

    },

    startGame: function () {
        // Change the state to the actual game.
        this.state.start('Stage');
        console.log("hello ");
    },
    over: function(item){

    item.fill = "#ff0044";
    },
    out: function(item){
        
    item.fill = "#ffff44";
    item.text = "Start";
    },

    down: function(item){
        
    },
    up: function(item){
        this.startGame();
    },

     over2: function(item){

    item.fill = "#ff0044";
    },


    out2: function(item){
        
    item.fill = "#ffff44";
    item.text = "Option";
    },

    down2: function(item){
        
    },

    up2: function(item){
       // this.startOption();
    }


};