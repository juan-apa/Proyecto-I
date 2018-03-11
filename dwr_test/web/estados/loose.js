var looseState = {
    create: function(){
        var fondo = game.add.sprite(0, 0, 'imgDerrota');
        fondo.scale.setTo(1.2,1.2);
        let nombreJuego = game.add.text(80, 80, 'Usted ha sido derrotado', {font: '50px Arial', fill: '#d10000'});
        
        /*TODO Avisarle a la fachada que este jugaor perdió*/
    }
};