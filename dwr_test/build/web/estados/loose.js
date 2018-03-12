var looseState = {
    create: function(){
        var fondo = game.add.sprite(0, 0, 'imgDerrota');
        fondo.scale.setTo(1.2,1.2);
        let nombreJuego = game.add.text(80, 80, 'Usted ha sido derrotado', {font: '50px Arial', fill: '#d10000'});
        let espera = game.add.text(80, 160, 'espacio para nueva partida', {font: '50px Arial', fill: '#028c07'});
        
        /*TODO Avisarle a la fachada que este jugaor perdió*/
    },
    update: function(){
        if(fireButton.isDown && fireButton.downDuration(1)){
            Fachada.nuevaPartida(function(){
                game.state.start('espera');
            })
        }
    }
};