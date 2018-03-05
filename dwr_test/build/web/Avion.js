/*Class Avion.js*/
<<<<<<< HEAD
/* global game, parametros, Phaser, informacion */
=======
/* global game, parametros, Phaser, BOMBA */
>>>>>>> desarrollo

const ALTURA_BAJA = 1;
const ALTURA_ALTA = 2;

function Avion(nombreAvion, x, y, combustible){
    this.maxBalas = 200;
    this.maxVida = 400;
    this.maxCombustible = 20;
    this.combustible = combustible;
    this.seleccionado = false;
    this.altura = ALTURA_BAJA;
    this.arma = new Arma(BOMBA);
    this.vivo = true;
    this.aterrizado = false;
    this.bloqueado = false;
    this.id = 0;
    
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
Avion.prototype.obtenerSpirte = function(){
    return this.sprite;
};

Avion.prototype.setSprite = function(x,y){
    this.sprite.reset(x, y);
    this.aterrizado = false;
};

Avion.prototype.getBloqueado = function(){
    return this.bloqueado;
};



Avion.prototype.setId = function(valor){
    this.id = valor;
};

Avion.prototype.getId = function(){
    return this.id;
};



Avion.prototype.disparar = function(){
    if (this.seleccionado===true){
       this.cantBalas--;
       this.arma.dispararr(this.sprite.x, this.sprite.y);
    }
};

Avion.prototype.getArma = function(){
    return this.arma.getSprite();
};

Avion.prototype.getMunicion = function(){
    return this.arma.getCantMunicion();
};

Avion.prototype.recargar = function(){
    this.arma.recargar();
    this.bloqueado = false;
    console.log("avion recargado");
};

Avion.prototype.getAltura = function(){
    var ret;
    if (this.altura===1){
        ret = 'ALTURA BAJA';
    }
    else {
        ret = 'ALTURA ALTA';
    }    
    return ret;
};

Avion.prototype.cambiarAltura = function(){
    if (this.altura===1){
        this.altura=2;
    }
    else {
        this.altura=1;
    }    
};


Avion.prototype.moverAMouse = function(){
    if(this.seleccionado){
        informacion.setText("Municion: "+this.getMunicion() + " Tipo Municion: METRALLETA" + "Altura Actual: " +this.getAltura());
        mouse_x = game.input.x;
        mouse_y = game.input.y;
        if (game.input.mousePointer.isDown){
            game.physics.arcade.moveToPointer(this.sprite, 500);
            this.sprite.rotation = game.physics.arcade.angleToPointer(this.sprite) - 300;
            if (Phaser.Rectangle.contains(this.sprite.body, mouse_x, mouse_y))
            {
                this.sprite.body.velocity.setTo(0, 0);
            }
            /*TODO modificar para que la camara siga al mouse*/
//            game.camera.follow(this.sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1);
        }
        else{
            this.sprite.body.velocity.setTo(0,0);
        }
        if(! this.seleccionado){
            this.sprite.velocity.setTo(0,0);
        }
    }
};

Avion.prototype.isAterrizado = function(){
    return this.aterrizado;
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

Avion.prototype.destruir = function(){
    this.vivo = false;
    this.sprite.kill();
};

Avion.prototype.aterrizar = function(){
    this.aterrizado = true;
    this.bloqueado = true;
    /*Para cambiar el tiempo de recarga cambiar el 4 por otro numero*/
    game.time.events.add(1000 * 4, this.recargar, this);
};

Avion.prototype.despegar = function(){
    this.aterrizado = false;
};

Avion.prototype.isVivo = function(){
    return this.vivo;
};

Avion.prototype.disminuirCombustible = function(){
    this.combustible--;
};

Avion.prototype.sinCombustible = function(){
    return (this.combustible === 0);
};

Avion.prototype.obtenerCombustible = function(){
    return this.combustible;
};

Avion.prototype.obtenerTipoArma = function(){
    return this.arma.tipoArma;
};