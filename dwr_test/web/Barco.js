/* global game, Phaser, flechas */

const VELOCIDAD_BARCO = 2;

function Barco(nombre){
    this.seleccionado = false;
    this.velocidad = 50;
    this.velocidadRotacion = 0.5;
    this.velocidadActual = 0;
    this.cantAviones = 0;
    this.sprite = game.add.sprite(64 + (64 * 1)+800, 200 + (1*4)+300, 'barco_0avion');
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.setCircle(60, 20, -30);
//    sprite.body.setSize(400, 50, -100, 20);
    this.sprite.body.collideWorldBounds = true;
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
    
    this.sprite.anchor.set(0.5);
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
}

Barco.prototype.moverBarco = function(){
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
        //  The speed we'll travel at
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
    
    /*Actualizo el cuerpo del barco*/
    let ang = this.sprite.angle;
    if(((45 <= ang)&&(ang <= 135)) && ((-135 <= ang) && (ang <= -45))){
        /*tomo el ancho*/
    }
    else{
        
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