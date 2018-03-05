/* global game, clickedSprite4, Phaser */

var loadState = {
    /*Función preload del juego*/
    preload: function(){
        /*Cargo todas las imagenes que voy a usar en el juego*/
        game.load.image('block', 'assets/avionn.png');
        game.load.image("fondoOceano", "assets/oceano2.jpg");
        game.load.image("balas", "assets/balas2.png");
        game.load.image("bullet", "assets/balas2.png");
        game.load.image("barco", "assets/portaviones_1.png");
        game.load.image("barco", "assets/barcoo.png");
        game.load.image("barco_0avion", "assets/portaviones_1.png");
        game.load.image("barco_1avion", "assets/portaviones_2.png");
        game.load.image("barco_2avion", "assets/portaviones_3.png");
        game.load.image("barco_3avion", "assets/portaviones_4.png");
        game.load.image("barco_4avion", "assets/portaviones_5.png");
    },
    
    /*Función create del juego*/
    create: function(){
        game.state.start('menu');
    }
};
