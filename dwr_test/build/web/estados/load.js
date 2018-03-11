/* global game, clickedSprite4, Phaser */

var loadState = {
    /*Función preload del juego*/
    preload: function () {
        /*Cargo todas las imagenes que voy a usar en el juego*/
        game.load.image('block', 'assets/avion.png');
        game.load.image("fondoOceano", "assets/oceano2.jpg");
        game.load.image("balas", "assets/balas2.png");
        game.load.image("bullet", "assets/balas2.png");
        game.load.image("barco_0avion", "assets/portaviones_1.png");
        game.load.image("barco_1avion", "assets/portaviones_2.png");
        game.load.image("barco_2avion", "assets/portaviones_3.png");
        game.load.image("barco_3avion", "assets/portaviones_4.png");
        game.load.image("barco_4avion", "assets/portaviones_5.png");
        game.load.image("quilla", "assets/quilla3.png");

        game.load.spritesheet('button', 'assets/buttons/button_sprite_sheet.png', 193, 71);
        game.load.image('background', 'assets/misc/starfield.jpg');

        /*Elementos Hud*/
        game.load.image('hudAvion', 'assets/hud_avion.png');
        game.load.image('hudBarco', 'assets/hud_barco.png');
        game.load.image(BOMBA.toString(), 'assets/tipoBomba.png');
        game.load.image(METRALLETA.toString(), 'assets/tipoMetralleta.png');
        game.load.image(TORPEDO.toString(), 'assets/tipoTorpedo.png');

        game.load.image('imgVictoria', 'assets/imgVictoria.jpg');
        game.load.image('imgDerrota', 'assets/imgDerrota2.jpg');
        game.load.image('impacto', 'assets/imgImpacto.jpg');
    },

    /*Función create del juego*/
    create: function () {
        game.state.start('menu');
    }
};
