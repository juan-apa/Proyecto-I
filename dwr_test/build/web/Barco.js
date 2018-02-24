/* global game, Phaser */

function Barco(nombre){
    this.seleccionado = false;
    this.velocidad = 2;
    this.cantAviones = 0;
    this.sprite = game.add.sprite(64 + (64 * 1)+800, 200 + (1*4)+300, 'barco');
    if(nombre !== null){
        this.sprite.name = nombre;
    }
    else{
        this.sprite.name = "Barco";
    }
    this.sprite.width = 450;
    this.sprite.height = 128;
    this.sprite.anchor.set(0.5);
    this.sprite.inputEnabled(true);
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
}

Barco.prototype.moverBarco = function(){
    if(flechas.up.isDown){
        this.sprite.y = this.sprite.y - 2;
    }
}

Barco.prototype.sumarCantidadAviones = function(){
    if(this.cantAviones<4){
        this.cantAviones++;
    }
};

Barco.prototype.restarCantidadAviones = function(){
    if(this.cantAviones>0){
        this.cantAviones--;
    }
};