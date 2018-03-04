/*Inicio el canvas del juego*/
var game = new Phaser.Game(2048,
        900,
        Phaser.CANVAS,
        'Juego Midway'
);

/*Defino las variables globales del juego*/
var text = '';
var sprite;
var sprite2;
var weapon;
var fireRate = 100;
var nextFire = 0;
var cropRect;
var w;
var h;
var av1;
var av2;
var mover = 0;
var aviones_azules;
var aviones_rojos;
var barco_azul;
var barco_rojo;
var flechas;
var informacion;
var despegarAvionAzul_1;
var despegarAvionAzul_2;
var despegarAvionAzul_3;
var despegarAvionAzul_4;
var llamar = 0;
var x = 0;
var y = 0;
var azul = false;
var rojo = false;
var informacion;

//test:
var huboImpacto = false;
var team;
var pos = 9;
var cant = 0;

/*Defino los estados que va a tener el juego*/
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
//game.state.add('win', winState);
//game.state.add('loose', looseState);

/*Inicio el siguiente estado, que es boot*/
console.log("pasando a boot");
game.state.start('boot');
