/*Class Arma.js*/

/* global game, fireButton, Aviones, aviones_rojos, aviones_rojo, Phaser, informacion */

const METRALLETA = 1;
const TORPEDO = 2;
const BOMBA = 3;

function Arma(tipoArma) {
    this.tipoArma = tipoArma;
    this.municion = 1;
    this.maxBalas = 1;                  //si es bomba o torpedo tiene 1 municion
    if (this.tipoArma === METRALLETA) {   //si es metra, tiene mas municion
        this.municion = 200;
        this.maxBalas = 200;
    }

    this.balas = game.add.group();
    this.balas.enableBody = true;
//    game.physics.enable(balas);
    this.balas.physicsBodyType = Phaser.Physics.ARCADE;
    this.balas.createMultiple(50, "balas");
    this.balas.setAll('anchor.x', 0.5);
    this.balas.setAll('anchor.y', 0.5);
    this.balas.setAll('checkWorldBounds', true);
    this.balas.setAll('outOfBoundsKill', true);
    this.balas.setAll('bounce', 1);
    this.balas.forEach(function (item) {
        game.debug.body(item);
    });

    this.nextFire = 0;
}
;

/*Funciones del objeto*/

Arma.prototype.recargar = function () {
    this.municion = this.maxBalas;
};

Arma.prototype.getCantMunicion = function () {
    return this.municion;
};

Arma.prototype.getSprite = function () {
    return this.balas;
};

Arma.prototype.dispararr = function (x, y, angulo) {
    if (fireButton.isDown && this.municion > 0) {
        //informacion de municion del avion
        if (this.tipoArma === METRALLETA) {
            let x1 = x + (Math.sin(angulo) * 300);
            let y1 = y + (Math.cos(angulo) * 300);
            informacion.setText("Municion: " + this.municion + " Tipo Municion: METRALLETA");
            fireRate = 1500;  //parametrizable
            if (game.time.now > this.nextFire && this.balas.countDead() > 0)
            {
                this.municion--;
                this.nextFire = game.time.now + fireRate;
                let bullet = this.balas.getFirstDead(true);
                bullet.reset(x + (Math.sin(angulo) * 30), y + (Math.cos(angulo) * 30)); // de donde sale la bala
                bullet.lifespan = 300;		//distancia de la bala
                bullet.trackrotation = true;
                game.physics.arcade.moveToXY(bullet, x1, y1, 600);	//velocidad de la bala
            }
        }

        if (this.tipoArma === BOMBA) {
            let x1 = x + (Math.sin(angulo) * 300);
            let y1 = y + (Math.cos(angulo) * 300);
            informacion.setText("Municion: " + this.municion + " Tipo Municion: BOMBA");
            fireRate = 2000;  //parametrizable
            if (game.time.now > this.nextFire && this.balas.countDead() > 0)
            {
                this.municion--;
                this.nextFire = game.time.now + fireRate;
                let bullet = this.balas.getFirstDead(true);
//                bullet.reset(x + (Math.sin(angulo) * 40), y + (Math.cos(angulo) * 40)); // de donde sale la bala
                bullet.reset(x + (Math.sin(angulo) * 30), y + (Math.cos(angulo) * 30)); // de donde sale la bala
                bullet.lifespan = 300;		//distancia de la bala
                bullet.trackrotation = true;
                game.physics.arcade.moveToXY(bullet, x1, y1, 600);	//velocidad de la bala
            }

        }

        if (this.tipoArma === TORPEDO) {
            informacion.setText("Municion: " + this.municion + " Tipo Municion: BOMBA");
            this.municion--;
            let bullet = this.balas.getFirstDead();
            bullet.reset(x + (Math.sin(angulo) * 30), y + (Math.cos(angulo) * 30)); // de donde sale la bala
            bullet.lifespan = 300;
            game.physics.arcade.moveToPointer(bullet, 300);
        }
    }
};

Arma.prototype.cambiarMunicion = function (tipoArma) {
    if (this.tipoArma !== tipoArma) {
        this.tipoArma = tipoArma;
        if (this.tipoArma === METRALLETA) {
            this.maxBalas = 200;
        }
        if (this.tipoArma === BOMBA || this.tipoArma === TORPEDO) {
            this.maxBalas = 1;
        }
        this.recargar();
    }
};


Arma.prototype.cambiarArma = function () {
    var tipoDeArmaNueva;
    if (this.tipoArma === METRALLETA) {
        tipoDeArmaNueva = BOMBA;
    } else {
        if (this.tipoArma === BOMBA) {
            tipoDeArmaNueva = TORPEDO;
        } else {
            if (this.tipoArma === TORPEDO) {
                tipoDeArmaNueva = METRALLETA;
            }
        }
    }
    return tipoDeArmaNueva;
};
