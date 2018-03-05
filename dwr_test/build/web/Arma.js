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

    this.sprite = game.add.group();
    this.sprite.enableBody = true;
    this.sprite.physicsBodyType = Phaser.Physics.ARCADE;
    this.sprite.createMultiple(50, "balas");
    this.sprite.setAll('checkWorldBounds', true);
    this.sprite.setAll('outOfBoundsKill', true);
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

Arma.prototype.dispararr = function (x, y) {
    if (fireButton.isDown && this.municion >= 0) {
        //informacion de municion del avion
        
        if (this.tipoArma === METRALLETA) {
            //informacion.setText("Municion: "+this.municion + " Tipo Municion: METRALLETA" );
            this.municion--;
            nextFire = 0;
            fireRate = 80;  //parametrizable
            if (game.time.now > nextFire && this.sprite.countDead() > 0)
            {
                nextFire = game.time.now + fireRate;
                let bullet = this.sprite.getFirstDead();
                bullet.reset(x - 8, y - 8); // de donde sale la bala
                bullet.lifespan = 200;		//distancia de la bala
                bullet.trackrotation = true;
                game.physics.arcade.moveToPointer(bullet, 2000);	//velocidad de la bala
            }
        }
        
        if(this.tipoArma === BOMBA){
            informacion.setText("Municion: "+this.municion + " Tipo Municion: BOMBA" );
            this.municion--;
            nextFire = 0;
            fireRate = 1000;  //parametrizable
            if (game.time.now > nextFire && this.sprite.countDead() > 0)
            {
                nextFire = game.time.now + fireRate;
                let bullet = this.sprite.getFirstDead();
                bullet.reset(x - 8, y - 8);
                bullet.lifespan = 0;
                bullet.trackrotation = true;
                game.physics.arcade.moveToPointer(bullet, 1);
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
