/* global game, azul */

var menuState = {
    create: function(){
        let nombreJuego = game.add.text(80, 80, 'Batalla midway', {font: '50px Arial', fill: '#ffffff'});
        let instruccioneJuego = game.add.text(80, game.world.height - 80, 'aprete 1 para ser equipo azul, 2 para rojo', {font: '50px Arial', fill: '#ffffff'});
        
        let tecla1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        let tecla2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        
        tecla1.onDown.addOnce(this.startAzul, this);
        tecla2.onDown.addOnce(this.startRojo, this);
    },
    
    startAzul: function(){
        azul = true;
        game.state.start('play');
    },
    
    startRojo: function(){
        rojo = true;
        game.state.start('play');
    }
};
