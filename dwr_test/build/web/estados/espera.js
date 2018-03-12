/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global rojo, game, azul, Fachada */

var esperaState = {
    create: function(){
        var fondo = game.add.sprite(0, 0, 'imgVictoria');
        botonCarga = game.input.keyboard.addKey(Phaser.Keyboard.C);
        fondo.scale.setTo(0.75,0.55);
        if(azul){
            let nombreJuego = game.add.text(80, 80, 'Color azul asignado.', {font: '50px Arial', fill: '#028c07'});
            
        }
        if(rojo){
            let nombreJuego = game.add.text(80, 80, 'Color rojo asignado.', {font: '50px Arial', fill: '#028c07'});
            
        }
        
        let nombreJuego = game.add.text(80, 160, 'Esperando al otro jugador', {font: '50px Arial', fill: '#028c07'});
        console.log("fin create");
    },
    update: function(){
        if(azul){
            Fachada.jugadorAzulListo(
                    function(){/*console.log("respuesta Fachada");*/}
            );
            if (botonCarga.isDown && botonCarga.downDuration(1)){
                Fachada.cargarPartida(function(){
                    console.log("partida cargada");
                    alert("partida cargada");
                });
            }
        }
        else{
            Fachada.jugadorRojoListo(/*function(){console.log("respuesta Fachada");}*/);
        }
//        console.log("update");
        Fachada.jugadoresListos(function(listos){
            if(listos){
                game.state.start('play');
            }
        });
        
    }
}