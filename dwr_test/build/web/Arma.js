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
    this.sprite = game.add.sprite('balas');
    this.sprite.anchor.set(0.5);

    this.balas = game.add.group();
    this.balas.enableBody = true;
    this.balas.physicsBodyType = Phaser.Physics.ARCADE;
    this.balas.createMultiple(50, "balas");
    this.balas.setAll('checkWorldBounds', true);
    this.balas.setAll('outOfBoundsKill', true);
    
    this.nextFire = 0;
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

Arma.prototype.dispararr = function (x, y, angulo) {
    if (fireButton.isDown && this.municion > 0) {
        //informacion de municion del avion
        
        if (this.tipoArma === METRALLETA) {
            let x = x + (Math.sin(angulo) * 300);
            let y = y + (Math.cos(angulo) * 300);
            //informacion.setText("Municion: "+this.municion + " Tipo Municion: METRALLETA" );
            this.municion--;
            this.nextFire = 0;
            fireRate = 200;  //parametrizable
            if (game.time.now > this.nextFire && this.sprite.countDead() > 0)
            {
                this.nextFire = game.time.now + fireRate;
                let bullet = this.balas.getFirstDead();
                bullet.reset(x + (Math.sin(angulo) * 40), y + (Math.cos(angulo) * 40)); // de donde sale la bala
                bullet.lifespan = 200;		//distancia de la bala
                bullet.trackrotation = true;
                game.physics.arcade.moveToXY(bullet, x, y, 200);	//velocidad de la bala
            }
        }
        
        if(this.tipoArma === BOMBA){
            informacion.setText("Municion: "+this.municion + " Tipo Municion: BOMBA" );
            this.municion--;
            nextFire = 0;
            fireRate = 2000;  //parametrizable
            if (game.time.now > nextFire && this.sprite.countDead() > 0 )
            {
                nextFire = game.time.now + fireRate;
                let bullet = this.sprite.getFirstDead();
                bullet.reset(x - 8, y - 8);
                bullet.lifespan = 30;
                bullet.trackrotation = true;
                game.physics.arcade.moveToPointer(bullet, 10);
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
        }
        if(this.tipoArma === BOMBA || this.tipoArma === TORPEDO){
            this.maxBalas = 1
        }
        this.recargar();
    }
};
