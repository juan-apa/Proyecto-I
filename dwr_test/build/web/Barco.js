/* global game, Phaser, flechas, factorEscaladoBarco */

const VELOCIDAD_BARCO = 2;

function Barco(nombre, equipo){
    this.seleccionado = false;
    this.velocidad = 50;
    this.velocidadRotacion = 0.5;
    this.velocidadActual = 0;
    this.cantAviones = 0;
    if(azul){
        this.sprite = game.add.sprite(Math.floor(Math.random() * 600) + 200, Math.floor(Math.random() * 1300) + 200, 'barco_0avion');
        console.log("x: " + this.sprite.x + "y: " + this.sprite.y);
    }
    if(rojo){
        this.sprite = game.add.sprite(Math.floor(Math.random() * 1800) + 1600, Math.floor(Math.random() * 1300) + 200, 'barco_0avion');
        console.log("x: " + this.sprite.x + "y: " + this.sprite.y);
    }
    
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.setCircle(110, 115, -40);
    this.sprite.scale.set(0.65 * factorEscaladoBarco);
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
    
    
    /*quilla*/
    
    this.quilla = game.add.sprite(this.sprite.x + 300, this.sprite.y, 'quilla');
    this.quilla.anchor.set(0.5, 0.5);
    game.physics.enable(this.quilla, Phaser.Physics.ARCADE);
    this.quilla.enableBody = true;
    
    
    this.quilla.scale.set(5.5 * factorEscaladoBarco);
    this.quilla.body.setCircle();
//    this.quilla.body.radius = 40
    this.grupo = game.add.group();
    this.grupo.add(this.sprite);
    this.grupo.add(this.quilla);

//    this.sprite.addChild(this.quilla);
    
    
//    this.quilla.body.setSize(300, 750, 500, 150);
}


Barco.prototype.getQuilla = function(){
  return this.quilla;
};


Barco.prototype.reEscalar = function(){
  this.sprite.scale.set(0.65 * factorEscaladoBarco);
  this.quilla.scale.set(5.5 * factorEscaladoBarco);
};

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
        this.moverQuilla();
    }
};

Barco.prototype.moverQuilla = function(){
    this.quilla.x = this.sprite.x + (Math.sin(-this.sprite.rotation + game.math.degToRad(87)) * this.sprite.width * 0.47);
    this.quilla.y = this.sprite.y + (Math.cos(-this.sprite.rotation + game.math.degToRad(87)) * this.sprite.width * 0.47);
    this.quilla.rotation = this.sprite.rotation;
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
    this.sprite.body.enable = true;
    
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
    this.moverQuilla();
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