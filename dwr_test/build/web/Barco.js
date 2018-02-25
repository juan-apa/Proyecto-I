/* global game, Phaser, flechas */

const VELOCIDAD_BARCO = 2;

function Barco(nombre){
    this.seleccionado = false;
    this.velocidad = 50;
    this.velocidadRotacion = 0.5;
    this.velocidadActual = 0;
    this.cantAviones = 0;
    this.sprite = game.add.sprite(64 + (64 * 1)+800, 200 + (1*4)+300, 'barco');
    
    /*Ojo con el !== porque por defecto lo pone como undefined, no null. Entonces
     * uso el != para que haga la conversion de undefined -> null.*/
    if(nombre != null){
        this.sprite.name = nombre;
    }
    else{
        this.sprite.name = "Barco";
    }
    this.sprite.width = 450;
    this.sprite.height = 128;
    this.sprite.anchor.set(0.5);
//    this.sprite.inputEnabled(true);
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
};

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