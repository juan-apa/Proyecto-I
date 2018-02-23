/*Class Arma.js*/

/* global game, fireButton */

const METRALLETA = 1;
const TORPEDO = 2;
const BOMBA = 3;

function Arma(tipoArma) {
    this.tipoArma = tipoArma;

    if (this.tipoArma === METRALLETA) {         //la cantidad de municion que tiene
        this.municion = 20;
        this.sprite = game.add.sprite('balas');
        this.sprite.anchor.set(0.5);
    } else {
        this.municion = 1;
    }
    
    this.sprite = game.add.group();
    this.sprite.enableBody = true;
    this.sprite.physicsBodyType = Phaser.Physics.ARCADE;
    this.sprite.createMultiple(50, "balas");
    this.sprite.setAll('checkWorldBounds', true);
    this.sprite.setAll('outOfBoundsKill', true);

}

Arma.prototype.getMunicion = function () {
    return this.municion;
};

Arma.prototype.dispararr = function (x,y) {
    if (fireButton.isDown && this.municion > 0) {
        if (this.tipoArma === METRALLETA) {
            ////test
            nextFire = 0;
            fireRate = 100;
            if (game.time.now > nextFire && this.sprite.countDead() > 0)
            {
                nextFire = game.time.now + fireRate;
                var bullet = this.sprite.getFirstDead();                
                bullet.reset(x - 8, y - 8); // de donde sale la bala
                bullet.lifespan = 200;		//distancia de la bala
                bullet.trackrotation = true;
                game.physics.arcade.moveToPointer(bullet, 2000);	//velocidad de la bala

            }

            /////test
        }
    }
};


/*Funciones del objeto*/