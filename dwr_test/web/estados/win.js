var winState = {
    create: function(){
        var fondo = game.add.sprite(0, 0, 'imgVictoria');
        fondo.scale.setTo(0.75,0.55);
        let nombreJuego = game.add.text(80, 80, 'Usted ha ganado', {font: '50px Arial', fill: '#028c07'});
        
        /*TODO Avisarle a la fachada que este jugaor ganó*/
    }
};

