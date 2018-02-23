/*Class Avion.js*/
/* global game, parametros, Phaser */

const ALTURA_BAJA = 1;
const ALTURA_ALTA = 2;

function Avion(nombreAvion, x, y, combustible){
    this.maxBalas = 200;
    this.maxVida = 400;
    this.combustible = combustible;
    this.seleccionado = false;
    this.altura = ALTURA_BAJA;
    
    this.sprite = game.add.sprite(x, y, 'block');
    this.sprite.anchor.set(0.5);
    this.sprite.name = nombreAvion;
    this.sprite.inputEnabled = true;
    
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    
    this.deseleccionar = function() {
        this.seleccionado = false;
    };
    this.getSeleccionado = function() {
        return this.seleccionado;
    };
    
    
}

/*Funciones del objeto*/
Avion.prototype.disparar = function(){
    this.maxBalas--; 
};

Avion.prototype.recargar = function(){
    this.maxBalas = parametros.MAX_BALAS;
};

Avion.prototype.moverAMouse = function(){
    if(this.seleccionado){
        mouse_x = game.input.x;
        mouse_y = game.input.y;
        if (game.input.mousePointer.isDown){
            game.physics.arcade.moveToPointer(this.sprite, 500);
            this.sprite.rotation = game.physics.arcade.angleToPointer(this.sprite) - 300;
            if (Phaser.Rectangle.contains(this.sprite.body, mouse_x, mouse_y))
            {
                this.sprite.body.velocity.setTo(0, 0);
            }
            game.camera.follow(this.sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1);
        }
        else{
            this.sprite.body.velocity.setTo(0,0);
        }
        if(! this.seleccionado){
            this.sprite.velocity.setTo(0,0);
        }
    }
};

Avion.prototype.obtenerXYRot = function(){
    return new VOPosicion(this.sprite.x, this.sprite.y, this.sprite.rotation);
};

Avion.prototype.setSeleccionado = function(seleccionado){
    this.seleccionado = seleccionado;
};

Avion.prototype.ascender = function(){
    if(this.altura === ALTURA_BAJA){
        this.altura = ALTURA_ALTA;
    }
};

Avion.prototype.descender = function(){
    if(this.altura === ALTURA_ALTA){
        this.altura = ALTURA_BAJA;
    }
};