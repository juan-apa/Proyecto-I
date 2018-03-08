/* global game, Phaser, flechas */

const VELOCIDAD_BARCO = 2;

function Barco(nombre){
    this.seleccionado = false;
    this.velocidad = 200;
    this.velocidadRotacion = 10;
    this.velocidadActual = 0;
    this.cantAviones = 0;
    this.sprite = game.add.sprite(64 + (64 * 1)+800, Math.random() * 200, 'barco_0avion');
    this.sprite.immovable = false;
    this.vivo = true;
    this.aviones = new Array(4);
    for(let i = 0; i < 4; i++){
        this.aviones[i] = false;
    }
    
    
    /*Ojo con el !== porque por defecto lo pone como undefined, no null. Entonces
     * uso el != para que haga la conversion de undefined -> null.*/
    if(nombre != null){
        this.sprite.name = nombre;
    }
    else{
        this.sprite.name = "Barco";
    }
//    this.sprite.width = 128;
//    this.sprite.height = 450;
    this.sprite.anchor.set(0.5);
    
    game.physics.p2.enable([this.sprite], false);
    this.sprite.body.clearShapes();
    this.sprite.body.loadPolygon("portaviones_1", "portaviones_1");
    this.sprite.body.damping = 0.7;
    
//    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
}

Barco.prototype.moverBarco = function(){
    this.sprite.body.setZeroVelocity();
    if (flechas.left.isDown) {
        this.sprite.body.rotateLeft(this.velocidadRotacion);
    }   //ship movement
    else if (flechas.right.isDown){
        this.sprite.body.rotateRight(this.velocidadRotacion);
    }
    else {
        this.sprite.body.setZeroRotation();
    }
    if (flechas.up.isDown){
        this.sprite.body.thrust(this.velocidad);
    }

};

Barco.prototype.sumarCantidadAviones = function(){
    if(this.cantAviones<4){
        this.cantAviones++;
    }
};

Barco.prototype.getCantidadAviones = function (){
    return this.cantAviones;
};

Barco.prototype.agregarCantidadAviones = function(){
    this.cantAviones++;
};

Barco.prototype.getSprite = function(){
    return this.sprite;
};

Barco.prototype.restarCantidadAviones = function(){
    if(this.cantAviones>0){
        this.cantAviones--;
    }
};

Barco.prototype.obtenerPosicion = function(){
  return new VOPosicion(this.sprite.x, this.sprite.y, this.sprite.rotation); 
};

Barco.prototype.actualizarPosicion = function(vop){
    this.sprite.x = vop.x;
    this.sprite.y = vop.y;
    this.sprite.rotation = vop.rot;
};

Barco.prototype.actualizarPosicion2 = function(x, y, r){
    this.sprite.x = x;
    this.sprite.y = y;
    this.sprite.rotation = r;
};

Barco.prototype.setearSprite = function(valor){
    //console.log('valor==='+valor);
    if(valor===0){
        this.sprite.loadTexture('barco_0avion', 0);
    }
    if(valor===1){
        this.sprite.loadTexture('barco_1avion', 0);
    }
    if(valor===2){
        this.sprite.loadTexture('barco_2avion', 0);
    }
    if(valor===3){
        this.sprite.loadTexture('barco_3avion', 0);
    }
    if(valor===4){
        this.sprite.loadTexture('barco_4avion', 0);
    }
};

Barco.prototype.despegarAvion = function(){
    if (this.cantAviones===4){
        //this.cantAviones = 3;
        this.sprite.loadTexture('barco_3avion', 0);
    }
    if (this.cantAviones===3){
        //this.cantAviones = 2;
        this.sprite.loadTexture('barco_2avion', 0);
    }
    if (this.cantAviones===2){
        //this.cantAviones = 1;
        this.sprite.loadTexture('barco_1avion', 0);
    }
    if (this.cantAviones===1){
        //this.cantAviones = 0;
        this.sprite.loadTexture('barco_0avion', 0);
    }
    
    if (this.cantAviones>=1 && this.cantAviones<=4){
        this.cantAviones--;
    }
    
    //console.log('cantidad aviones:' + this.cantAviones);
    //return id_avion;
};

Barco.prototype.isVivo = function(){
    return this.vivo;
};

Barco.prototype.destruir = function(){
  this.vivo = false;  
  this.sprite.kill();
};

Barco.prototype.actualizarSpriteBarcoSegunAviones =  function (){
//    console.log()
    this.setearSprite(this.cantAviones);
};

Barco.prototype.updateAvionesEnBarco = function(arrBool){
    let cant = 0;
    
    for(let i = 0; i < arrBool.length; i++){
        if(arrBool[i] == true){
            cant++;
        }
    }
    this.cantAviones = cant;
    this.actualizarSpriteBarcoSegunAviones();
};