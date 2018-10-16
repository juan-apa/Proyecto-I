var winState = {
    create: function(){
        var fondo = game.add.sprite(0, 0, 'imgVictoria');
        fondo.scale.setTo(0.75,0.55);
        let nombreJuego = game.add.text(80, 80, 'Usted ha ganado', {font: '50px Arial', fill: '#028c07'});
        let espera = game.add.text(80, 160, 'espacio para nueva partida', {font: '50px Arial', fill: '#028c07'});
        /*TODO Avisarle a la fachada que este jugaor ganó*/
    },
    update: function(){
        if(fireButton.isDown && fireButton.downDuration(1)){
            Fachada.nuevaPartida(function(){
                game.state.start('espera');
            });
        }
    }
};

