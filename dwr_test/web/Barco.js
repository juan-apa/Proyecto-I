/* global game, Phaser, flechas */

const VELOCIDAD_BARCO = 2;

function Barco(nombre, equipo){
    this.seleccionado = false;
    this.velocidad = 50;
    this.velocidadRotacion = 0.5;
    this.velocidadActual = 0;
    this.cantAviones = 0;
    this.sprite = game.add.sprite(800, 300, 'barco_0avion');
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.setCircle(210, 15.8, -136);
    this.sprite.scale.setTo(0.65, 0.65);
    this.sprite.anchor.set(0.5);
//    sprite.body.setSize(400, 50, -100, 20);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.immovable = false;
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    
    this.vivo = true;
    this.aviones = new Array(4);
    for(let i = 0; i < 4; i++){
        this.aviones[i] = false;
    }
    this.hitBox = game.add.graphics(0, 0);
    console.log(this.hitBox);
//    this.hitBox.lineWidth(20);
//    this.hitbox.lineColor(0x000000);
    this.hitBox.beginFill(0xFF0000, 0.5);
    this.hitBox.drawCircle(0, 0, 420);
    this.sprite.addChild(this.hitBox);
    this.equipo = equipo; // SI ES TRUE, ES AZUL, SI ES FALSE, ES ROJO
    
    
    if(nombre == "azul"){
        this.hitBox.tint = 0x005ce8;
        this.sprite.tint = 0x005ce8;
    }
    else{
        this.hitBox.tint = 0xe80000;
        this.sprite.tint = 0xe80000;
    }
    
    /*Ojo con el !== porque por defecto lo pone como undefined, no null. Entonces
     * uso el != para que haga la conversion de undefined -> null.*/
    if(nombre != null){
        this.sprite.name = nombre;
    }
    else{
        this.sprite.name = "Barco";
    }
}

Barco.prototype.moverBarco = function(){
    if(this.velocidad > 0){
        if (flechas.left.isDown)
        {
            this.sprite.angle -= this.velocidadRotacion;
        }
        else if (flechas.right.isDown)
        {
            this.sprite.angle += this.velocidadRotacion;
        }

        if (flechas.up.isDown)
        {
            this.velocidadActual = this.velocidad;
        }
        else
        {
            if (this.velocidadActual > 0)
            {
                this.velocidadActual -= 1;
            }
        }
        if (this.velocidadActual > 0)
        {
            game.physics.arcade.velocityFromRotation(this.sprite.rotation, this.velocidadActual, this.sprite.body.velocity);
        }
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

Barco.prototype.mostrarSprite = function(){
    this.visible = true;
    this.sprite.visible = true;
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