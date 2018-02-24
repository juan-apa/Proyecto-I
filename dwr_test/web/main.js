/* global Fachada, dwr, parametros, Phaser, mask, b, a, Aviones, aviones_rojo */

var game = new Phaser.Game(2048,
        900,
        Phaser.CANVAS,
        'phaser-example',
        {
            preload: preload,
            create: create,
            update: update,
            render: render
        }
);
var text = '';
var sprite;
var sprite2;
var weapon;
var fireRate = 100;
var nextFire = 0;
var cropRect;
var w;
var h;
var av1;
var av2;
var mover = 0;
var aviones_azules;
var aviones_rojos;

/*Precarga del juego*/
function preload() {
    game.load.image('block', 'avionn.png');
    game.load.image("fondoOceano", "oceano2.jpg");
    game.load.image("balas", "balas2.png");
    game.load.image("barco", "barcoo.png");
}

var informacion;
/*Creacion del juego*/
function create() {
    mapa = game.add.tileSprite(0, 0, 1600, 1200, 'fondoOceano');
    mapa.fixedToCamara = true;
    game.stage.backgroundColor = "#4488AA";
    game.world.setBounds(0, 0, 1600, 1200);

    //creo los grupos
    grupoTop = game.add.group();
    grupoLow = game.add.group();


    /*Aviones Azules*/
    aviones_azules = new Aviones("Azules");
    for (let i = 0; i < 4; i++) {
        aviones_azules.agregarAvion(new Avion(i, 100, i * 100, 30));
    }
    /*Avioens Rojos*/
    aviones_rojos = new Aviones("Rojos");
    for (let i = 0; i < 4; i++) {
        aviones_rojos.agregarAvion(new Avion(i, 900, i * 100, 30));
    }


//    //Avion A1
//    sprite = game.add.sprite(64 + (64 * 1), 200 + (1 * 4), 'block');
//    sprite.anchor.set(0.5);
//    sprite.name = 'Avion_A1';
//    sprite.inputEnabled = true;
//    sprite.events.onInputDown.add(clickedSprite, this);
//    game.physics.enable(sprite, Phaser.Physics.ARCADE);
//    grupoTop.add(sprite);
//    sprite.body.collideWorldBounds = true;
//    
//    game.camera.follow(sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1);
//    
//    //Avion A2
//    sprite2 = game.add.sprite(64 + (64 * 1)+800, 200 + (1*4), 'block');
//    sprite2.name = 'Avion_A2';
//    sprite2.anchor.set(0.5);
//    sprite2.inputEnabled = true;
//    sprite2.events.onInputDown.add(clickedSprite2, this);
//    game.physics.enable(sprite2, Phaser.Physics.ARCADE);
//    grupoTop.add(sprite2);


    sprite3 = game.add.sprite(64 + (64 * 1) + 800, 200 + (1 * 4) + 300, 'barco');
    sprite3.name = 'B2';
    sprite3.width = 450;
    sprite3.height = 128;
    sprite3.anchor.set(0.5);
    sprite3.inputEnabled = true;
    sprite3.events.onInputDown.add(clickedSprite4, this);
    game.physics.enable(sprite3, Phaser.Physics.ARCADE);
    grupoLow.add(sprite3);

//    sprite4 = game.add.sprite(64 + (64 * 1)+400, 200 + (1*4)+200, 'block');
//    sprite4.name = 'Avion_Bomba';
//    sprite4.anchor.set(0.5);
//    sprite4.inputEnabled = true;
//    sprite4.events.onInputDown.add(clickedSprite3, this);
//    game.physics.enable(sprite4, Phaser.Physics.ARCADE);
//    grupoTop.add(sprite4);

//    sprite.kill();
//    sprite2.kill();
//    sprite4.kill();



    weapon = game.add.group();
    weapon.enableBody = true;
    weapon.physicsBodyType = Phaser.Physics.ARCADE;

    weapon.createMultiple(50, "balas");
    weapon.setAll('checkWorldBounds', true);
    weapon.setAll('outOfBoundsKill', true);
//    sprite.body.allowRotation = false;
    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');
    
    //seteo el panel de mensajes
    informacion = game.add.text(10,10, "", {
        font: "30px Arial",
        fill: "#ff0044",
        align: "center"
    });

}


function move(pointer, x, y) {
    mask.x = x - 100;
    mask.y = y - 100;
}

function clickedSprite(sprite) {
    mover = 1;
}

function clickedSprite2(sprite) {
    mover = 2;
}

function clickedSprite3(sprite) {
    mover = 3;
}

function clickedSprite4(sprite) {
    mover = 4;
}

var llamar = 0;
var x = 0;
var y = 0;
var azul = false;
var rojo = false;
var informacion;

function update() {
    llamar = llamar + 1;
    if (llamar === 0) {
        if (azul === true) {
            let posAviones = aviones_azules.obtenerPosicionesAviones();
            Fachada.updatePosRojo(posAviones, {
                timeout: 5000,
                errorHandler: function (message, exception) {
                    console.log("error updatePosRojo ");
                    console.log(dwr.util.toDescriptiveString(exception, 2));
                }
            });
            Fachada.getPosAzul({
                callback: function (pos) {
                    aviones_rojos.actualizarPosicionesAviones(pos);
                },
                timeout: 5000,
                errorHandler: function (message) {
                    console.log("error getPosAzul" + message);
                }
            });
        }
        if (rojo === true) {
            Fachada.updatePosAzul(aviones_rojos.obtenerPosicionesAviones(), {
                callback: function () {},
                timeout: 5000,
                errorHandler: function (message) {
                    console.log("error updatePosAzul " + message);
                }
            });
            Fachada.getPosRojo({
                callback: function (pos) {
                    aviones_azules.actualizarPosicionesAviones(pos);
                },
                timeout: 5000,
                errorHandler: function (message) {
                    console.log("error getPos");
                }
            });
        }
    } else {
        if (llamar > 10) {
            llamar = -1;
        }
    }

    game.world.bringToTop(grupoTop);

//    if (fireButton.isDown && parametros.MAX_BALAS > 0)
//    {
//        if (mover === 1) {
//            parametros.MAX_BALAS--;
//            if (parametros.MAX_BALAS > 0) {
//                fire(sprite);
//            }
//        }
//        if (mover === 2) {
//            parametros.MAX_BALAS--;
//            if (parametros.MAX_BALAS > 0) {
//                fire(sprite2);
//            }
//        }
//
//        if (mover === 3) {
//            caeBomba();
//        }
//    }

    mapa.tilePosition.x = -game.camera.x;
    mapa.tilePosition.y = -game.camera.y;

//    if (mover === 1) {
//        game.physics.arcade.overlap(weapon, sprite2, collisionHandler, null, this);
//        var explosion = explosions.getFirstExists(false);
//        explosion.play('kaboom', 30, false, true);
//    }
//    
//    if (mover === 2) {
//        game.physics.arcade.overlap(weapon, sprite, collisionHandler, null, this);
//        var explosion = explosions.getFirstExists(false);
//        explosion.play('kaboom', 30, false, true);
//    }

//    game.physics.arcade.collide(sprite2, sprite, test);
//    game.physics.arcade.collide(sprite, sprite2, test);

    if (mover === 4) {
        if (game.input.mousePointer.isDown)
        {
            game.physics.arcade.moveToPointer(sprite3, 50);
            sprite3.rotation = game.physics.arcade.angleToPointer(sprite3);
            if (Phaser.Rectangle.contains(sprite3.body, game.input.x, game.input.y))
            {
                sprite3.body.velocity.setTo(0, 0);
            }
        } else
        {
            sprite3.body.velocity.setTo(0, 0);
        }
    }

    /*TODO este bloque no se tiene que hacer todo el tiempo, solo se tiene que
     * hacer una vez, cuando se sepa que equipo es el mio. */
    if (rojo === true) {
        for (i = 0; i < aviones_rojos.largo(); i++) {
            aviones_rojos.obtenerAvion(i).moverAMouse();
        }
    }
    
    /*TODO este bloque no se tiene que hacer todo el tiempo, solo se tiene que
     * hacer una vez, cuando se sepa que equipo es el mio. */
    if (azul === true) {
        for (i = 0; i < aviones_azules.largo(); i++) {
            aviones_azules.obtenerAvion(i).moverAMouse();//+ aviones_azules.obtenerAvion(i).getMunicion   
            if (fireButton.isDown) {
                aviones_azules.obtenerAvion(i).disparar();
                
                for (y = 0; y < aviones_azules.largo(); y++) {
                    if (numeroRandom(1, 20) >= 10) {                //este parametro levantarlo del archivo de configuracion (va de la mano con el grado de difucuotad)
                        game.physics.arcade.collide(aviones_azules.obtenerAvion(i).getArma(), aviones_rojos.obtenerAvion(y).obtenerSpirte(), collisionHandler);
                    }
                }
            }
        }
    }

}

function numeroRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}


/*Funciones Auxiliares*/
//function test(sprite, sprite2) {
//    sprite.kill();
//    sprite2.kill();
//}
//
//function caeBomba() {
//    if (checkOverlap(sprite4, sprite3)) {
//        sprite3.kill();
//    }
//}




function checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    return Phaser.Rectangle.intersects(boundsA, boundsB);
}




function fire(spriteq) {
    if (game.time.now > nextFire && weapon.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var bullet = weapon.getFirstDead();

        bullet.reset(spriteq.x - 8, spriteq.y - 8); // de donde sale la bala

        bullet.lifespan = 200;		//distancia de la bala

        bullet.trackrotation = true;

        game.physics.arcade.moveToPointer(bullet, 2000);	//velocidad de la bala

    }
}

function collisionHandler(a, b) {
    b.kill();
    a.kill();
}

function render() {
    //game.debug.text("Caca" + parametros.MAX_BALAS + "VIDA:" + parametros.VIDA_MAX_AVION, 32, 32);
}





