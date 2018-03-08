/*Class Arma.js*/

/* global game, fireButton, Aviones, aviones_rojos, aviones_rojo, Phaser, informacion */

const METRALLETA = 1;
const TORPEDO = 2;
const BOMBA = 3;

function Arma(tipoArma) {
    this.tipoArma = tipoArma;
    this.municion = 1;
    this.maxBalas = 1;                  //si es bomba o torpedo tiene 1 municion
    if(this.tipoArma === METRALLETA){   //si es metra, tiene mas municion
        this.municion = 200;
        this.maxBalas = 200;
    }
    
    this.nextFire = 0;
    
    this.sprite = game.add.sprite('balas');
    this.sprite.anchor.set(0.5);
    console.log(this.sprite);
    game.physics.p2.enable([this.sprite], false);
    this.sprite.body.clearShapes();
    this.sprite.body.loadPolygon("balas2", "balas2");
    
    this.balas = game.add.group();
    this.balas.enableBody = true;
    this.balas.physicsBodyType = Phaser.Physics.P2JS;
    this.balas.createMultiple(50, "balas");
    this.balas.setAll('checkWorldBounds', true);
    this.balas.setAll('outOfBoundsKill', true);
    
    this.objetivo = new p2.Body();
    game.physics.p2.world.addBody(this.objetivo);
    game.physics.p2.enable(this.objetivo, true);
};

/*Funciones del objeto*/

Arma.prototype.recargar = function(){
    this.municion = this.maxBalas;
};

Arma.prototype.getCantMunicion = function () {
    return this.municion;
};

Arma.prototype.getSprite = function () {
    return this.sprite;
};

Arma.prototype.dispararr = function (x, y, angle) {
    if (fireButton.isDown && this.municion > 0) {
        //informacion de municion del avion
        this.objetivo.x = x + (Math.sin(angle) * 50);
        this.objetivo.y = y + (Math.cos(angle) * 50);
        
        if (this.tipoArma === METRALLETA) {
            informacion.setText("Municion: "+this.municion + " Tipo Municion: METRALLETA" );
            this.municion--;
            fireRate = 200;  //parametrizable
            if (game.time.now > this.nextFire && this.balas.countDead() > 0 )
            {
                this.nextFire = game.time.now + fireRate;
                let bullet = this.balas.getFirstDead();
                bullet.body.clearShapes();
                bullet.body.loadPolygon("balas2", "balas2");
                bullet.reset(x + (Math.sin(angle) * 40), y + (Math.cos(angle) * 40)); // de donde sale la bala
                bullet.lifespan = 500;		//vida de la bala
                this.accelerateToObject(bullet, this.objetivo, 16000);
            }
        }
        
        if(this.tipoArma === BOMBA){
            informacion.setText("Municion: "+this.municion + " Tipo Municion: BOMBA" );
            this.municion--;
            fireRate = 300;  //parametrizable
            if (game.time.now > this.nextFire && this.balas.countDead() > 0 )
            {
                this.nextFire = game.time.now + fireRate;
                let bullet = this.balas.getFirstDead();
                bullet.body.clearShapes();
                bullet.body.loadPolygon("balas2", "balas2");
                bullet.reset(x + (Math.sin(angle) * 40), y + (Math.cos(angle) * 40)); // de donde sale la bala
                bullet.lifespan = 1000;                        //vida de la bala
                this.accelerateToObject(bullet, this.objetivo, 80000);
            }
        }
        
        if(this.tipoArma === TORPEDO){
            informacion.setText("Municion: "+this.municion + " Tipo Municion: BOMBA" );
            this.municion--;
            let bullet = this.sprite.getFirstDead();
            bullet.reset(x - 8, y - 8);
            bullet.lifespan = 300;
            game.physics.arcade.moveToPointer(bullet, 300);
        }
    }
};

Arma.prototype.cambiarMunicion = function(tipoArma){
    if(this.tipoArma !== tipoArma){
        this.tipoArma = tipoArma;
        if(this.tipoArma === METRALLETA){
            this.maxBalas = 200;
            this.municion = 0;
        }
        if(this.tipoArma === BOMBA || this.tipoArma === TORPEDO){
            this.maxBalas = 1;
            this.municion = 0;
        }
        this.recargar();
    }
};

Arma.prototype.accelerateToObject = function(obj1, obj2, speed) {
    if (typeof speed === 'undefined') { speed = 4000; }
    var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
    obj1.body.rotation = angle + game.math.degToRad(90);  // correct angle of angry bullets (depends on the sprite used)
    obj1.body.force.x = Math.cos(angle) * speed;    // accelerateToObject 
    obj1.body.force.y = Math.sin(angle) * speed;
//    console.log(this.sprite.angle);
};

Arma.prototype.setTipoArma = function(nuevaArma){
    informacion.setText(this.tipoArma);
    if(this.tipoArma != nuevaArma){
        this.tipoArma = nuevaArma;
        if(this.tipoArma === METRALLETA){
            this.maxBalas = 200;
            this.maxBalas = 200;
        }
        if(this.tipoArma === BOMBA || this.tipoArma === TORPEDO){
            this.maxBalas = 1;
            this.municion = 1;
        }
    }
};