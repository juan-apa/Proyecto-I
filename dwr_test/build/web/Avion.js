/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Avion(nombreAvion, maxBalas, maxVida, combustible){
    this.maxBalas = maxBalas;
    this.maxVida = maxVida;
    this.combustible = combustible;
    this.seleccionado = false;
    this.sprite = game.add.sprite(50 + (64 * 1), 200 + (1 * 4), 'block');
    this.sprite.anchor.set(0.5);
    this.sprite.name = nombreAvion;
    this.sprite.inputEnabled = true;
    /*Uso una función flecha para obtener el 'this' del avion construido.*/
    this.sprite.events.onInputDown.add(() => {
        this.seleccionado = true;
    }, this);
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    console.log(this);
}


/*Funciones del objeto*/
Avion.prototype.disparar = function(){
    this.maxBalas--; 
};

Avion.prototype.seleccionado = function(){
    return this.seleccionado();
};

Avion.prototype.recargar = function(){
    this.maxBalas = parametros.MAX_BALAS;
};


