var Credits = function(game) {};

Credits.prototype = {

  preload: function () {
    this.optionCount = 1;
    this.creditCount = 0;

  },

  addCredit: function(task, author) {
    var authorStyle = { font: '40pt Arial', fill: 'white', align: 'center', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var taskStyle = { font: '30pt Arial', fill: 'white', align: 'center', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var authorText = game.add.text(game.world.centerX, 1100, author, authorStyle);
    var taskText = game.add.text(game.world.centerX, 1150, task, taskStyle);
    authorText.anchor.setTo(0.5);
    authorText.stroke = "rgba(0,0,0,0)";
    authorText.strokeThickness = 4;
    taskText.anchor.setTo(0.5);
    taskText.stroke = "rgba(0,0,0,0)";
    taskText.strokeThickness = 4;
    game.add.tween(authorText).to( { y: -300 }, 20000, Phaser.Easing.Cubic.Out, true, this.creditCount * 10000);
    game.add.tween(taskText).to( { y: -200 }, 20000, Phaser.Easing.Cubic.Out, true, this.creditCount * 10000);
    this.creditCount ++;
  },
  addAuthors: function(task, author, author2, author3, author4) {
    var authorStyle = { font: '40pt Arial', fill: 'white', align: 'center', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var taskStyle = { font: '30pt Arial', fill: 'white', align: 'center', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var authorText4 = game.add.text(game.world.centerX, 950, author4, authorStyle);
    var authorText3 = game.add.text(game.world.centerX, 1000, author3, authorStyle);
    var authorText2 = game.add.text(game.world.centerX, 1050, author2, authorStyle);
    var authorText = game.add.text(game.world.centerX, 1100, author, authorStyle);
    var taskText = game.add.text(game.world.centerX, 1150, task, taskStyle);
    authorText.anchor.setTo(0.5);
    authorText.stroke = "rgba(0,0,0,0)";
    authorText.strokeThickness = 4;
    
     authorText3.anchor.setTo(0.5);
    authorText3.stroke = "rgba(0,0,0,0)";
    authorText3.strokeThickness = 4;
    
     authorText2.anchor.setTo(0.5);
    authorText2.stroke = "rgba(0,0,0,0)";
    authorText2.strokeThickness = 4;
    
     authorText4.anchor.setTo(0.5);
    authorText4.stroke = "rgba(0,0,0,0)";
    authorText4.strokeThickness = 4;
    
    taskText.anchor.setTo(0.5);
    taskText.stroke = "rgba(0,0,0,0)";
    taskText.strokeThickness = 4;
     game.add.tween(authorText4).to( { y: -450 }, 20000, Phaser.Easing.Cubic.Out, true, this.creditCount * 10000);
     game.add.tween(authorText3).to( { y: -400 }, 20000, Phaser.Easing.Cubic.Out, true, this.creditCount * 10000);
     game.add.tween(authorText2).to( { y: -350 }, 20000, Phaser.Easing.Cubic.Out, true, this.creditCount * 10000);
    game.add.tween(authorText).to( { y: -300 }, 20000, Phaser.Easing.Cubic.Out, true, this.creditCount * 10000);
    game.add.tween(taskText).to( { y: -250 }, 20000, Phaser.Easing.Cubic.Out, true, this.creditCount * 10000);
    this.creditCount ++;
  },

  addMenuOption: function(text, callback) {
    var optionStyle = { font: '30pt Arial', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var txt = game.add.text(50, 530, text, optionStyle);

    txt.stroke = "rgba(0,0,0,0";
    txt.strokeThickness = 4;
    var onOver = function (target) {
      target.fill = "#FEFFD5";
      target.stroke = "rgba(200,200,200,0.5)";
      txt.useHandCursor = true;
    };
    var onOut = function (target) {
      target.fill = "white";
      target.stroke = "rgba(0,0,0,0)";
      txt.useHandCursor = false;
    };
    //txt.useHandCursor = true;
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);
    txt.events.onInputOver.add(onOver, this);
    txt.events.onInputOut.add(onOut, this);

    this.optionCount ++;
  },

  create: function () {
    this.stage.disableVisibilityChange = true;
  
    var bg = game.add.image(0, 0, 'background');
    this.addAuthors('Test1', 'nombres', 'nombres2', 'nombres3', 'nombres4');
    this.addCredit('nombres', 'Desarrollado por');
    this.addCredit('Proyecto 2018', 'Grupo A');
    this.addCredit('test', 'test');
    this.addCredit('Phaser.io', 'Powered By');
    this.addCredit('por jugar', 'Gracias');
    this.addMenuOption('Volver', function (e) {
      game.state.start("mainmenu");
    });
    game.add.tween(bg).to({alpha: 0}, 20000, Phaser.Easing.Cubic.Out, true, 40000);
  }

};