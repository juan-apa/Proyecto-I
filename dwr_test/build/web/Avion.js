/*Class Avion.js*/
/* global game, parametros, Phaser, BOMBA, informacion */

const ALTURA_BAJA = 0;
const ALTURA_ALTA = 1;

function Avion(nombreAvion, x, y, combustible, equipo){
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
    this.visible = true;
    
    this.equipo = equipo;
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
    if(this.equipo === "azul"){
        this.sprite.tint = 0x005ce8;
        this.sprite.x = 0;
        this.sprite.y = 0;
    }
    else{
        this.sprite.tint = 0xe80000;
        this.sprite.x = 500;
        this.sprite.y = 500;
    }
    
}

/*Funciones del objeto*/
Avion.prototype.reEscalar = function(){
    this.sprite.scale.set(1 * factorEscaladoAvion);
};

Avion.prototype.obtenerSpirte = function(){
    return this.sprite;
};

Avion.prototype.getNombre = function(){
    return this.sprite.name;
};

Avion.prototype.ocultarSprite = function(){
    this.visible = false;
    this.sprite.visible = false;
};

Avion.prototype.mostrarSprite = function(){
    this.visible = true;
    this.sprite.visible = true;
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
       this.arma.dispararr(this.sprite.x, this.sprite.y, -this.sprite.rotation + game.math.degToRad(180));
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
    if (this.altura===ALTURA_BAJA){
        ret = 'ALTURA BAJA';
    }
    else {
        ret = 'ALTURA ALTA';
    }    
    return ret;
};

Avion.prototype.getAltura2 = function(){
    return this.altura;
};

Avion.prototype.cambiarAltura = function(){
    if (this.altura===ALTURA_BAJA){
        this.altura=ALTURA_ALTA;
    }
    else {
        this.altura=ALTURA_BAJA;
    }    
};


Avion.prototype.moverAMouse = function(){
    if(this.seleccionado){
//        informacion.setText("Municion: "+this.getMunicion() + " Tipo Municion: " + this.arma.tipoArma + " Altura Actual: " +this.getAltura());
        mouse_x = game.input.x;
        mouse_y = game.input.y;
        if (game.input.mousePointer.isDown){
            game.physics.arcade.moveToPointer(this.sprite, 500);
            this.sprite.rotation = game.physics.arcade.angleToPointer(this.sprite) - 300;
            if (Phaser.Rectangle.contains(this.sprite.body, mouse_x, mouse_y))
            {
                this.sprite.body.velocity.setTo(0, 0);
            }
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

Avion.prototype.setAltura = function(altura){
    this.altura = altura;
};

Avion.prototype.setCombustible = function(combustible){
    this.combustible = combustible;
};

Avion.prototype.cambiarMunicion = function(tipoMunicion){
    this.arma.cambiarMunicion(tipoMunicion);
};

Avion.prototype.cambiarTipoDeArma = function(){
    var nuevaArma = this.arma.cambiarArma();
    this.arma.tipoArma = nuevaArma;
    return nuevaArma;
};

