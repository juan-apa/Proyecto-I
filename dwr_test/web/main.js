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
var barco_azul;
var barco_rojo;
var flechas;

/*Precarga del juego*/
function preload() {
    game.load.image('block', 'avionn.png');
    game.load.image("fondoOceano", "oceano2.jpg");
    game.load.image("balas", "balas2.png");
    game.load.image("barco", "portaviones_1.png");
    //cargo imagenes portaaviones
    game.load.image("barco", "barcoo.png");
    game.load.image("barco_0avion", "portaviones_1.png");
    game.load.image("barco_1avion", "portaviones_2.png");
    game.load.image("barco_2avion", "portaviones_3.png");
    game.load.image("barco_3avion", "portaviones_4.png");
    game.load.image("barco_4avion", "portaviones_5.png");
}

var informacion;
var despegarAvionAzul_1;
var despegarAvionAzul_2;
var despegarAvionAzul_3;
var despegarAvionAzul_4;

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

    barco_azul = new Barco("barco_azul");
    barco_rojo = new Barco("barco_rojo");


    sprite3 = game.add.sprite(64 + (64 * 1) + 800, 200 + (1 * 4) + 300, 'barco');
    sprite3.name = 'B2';
    sprite3.width = 450;
    sprite3.height = 128;
    sprite3.anchor.set(0.5);
    sprite3.inputEnabled = true;
    sprite3.events.onInputDown.add(clickedSprite4, this);
    game.physics.enable(sprite3, Phaser.Physics.ARCADE);
    grupoLow.add(sprite3);
    sprite3.kill();

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
    informacion = game.add.text(10, 10, "", {
        font: "30px Arial",
        fill: "#ff0044",
        align: "center"
    });
    flechas = game.input.keyboard.createCursorKeys();

    //despegarAvionAzul_1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);

    despegarAvionAzul_1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    //despegarAvionAzul_1.onDown.add(barco_azul.despegarAvion(),this);
    // despegarAvionAzul_2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    //despegarAvionAzul_3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    //despegarAvionAzul_4 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
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

//test:
var huboImpacto = false;
var team;
var pos = 9;
var cant = 0;

function update() {

    llamar = llamar + 1;
    if (llamar === 0) {
//        if (huboImpacto === true && pos!==9) {
//            console.log('entre');
//            console.log('pos='+pos);
//            console.log('largo aviones: '+aviones_rojos.largo());
//            aviones_rojos.eliminarAvion(aviones_rojos.obtenerAvion(pos));
//            huboImpacto === false;
//        }
        if (azul === true) {
            Fachada.updatePosAzul(aviones_azules.obtenerPosicionesAviones(), barco_azul.obtenerPosicion(), {
                timeout: 5000,
                errorHandler: function (message, exception) {
                    console.log("error updatePosRojo ");
                    console.log(dwr.util.toDescriptiveString(exception, 2));
                }
            });
            Fachada.getPosRojo({
                callback: function (pos) {
                    let largo = pos.length - 1;
                    aviones_rojos.actualizarPosicionesAviones(pos.slice(0, largo));
                    barco_rojo.actualizarPosicion(pos[largo]);
                },
                timeout: 5000,
                errorHandler: function (message) {
                    console.log("error getPosAzul" + message);
                }
            });
        }

        if (rojo === true) {
            Fachada.updatePosRojo(aviones_rojos.obtenerPosicionesAviones(), barco_rojo.obtenerPosicion(), {
                callback: function () {},
                timeout: 5000,
                errorHandler: function (message) {
                    console.log("error updatePosAzul " + message);
                }
            });
            Fachada.getPosAzul({
                callback: function (pos) {
                    let largo = pos.length - 1;
                    aviones_azules.actualizarPosicionesAviones(pos.slice(0, largo));
                    barco_azul.actualizarPosicion(pos[largo]);
                },
                timeout: 5000,
                errorHandler: function (message) {
                    console.log("error getPosRojo" + message);
                }
            });
        }
    } else {
        if (llamar > 0) {
            llamar = -1;
        }
    }

    game.world.bringToTop(grupoTop);

    mapa.tilePosition.x = -game.camera.x;
    mapa.tilePosition.y = -game.camera.y;

    /*TODO este bloque no se tiene que hacer todo el tiempo, solo se tiene que
     * hacer una vez, cuando se sepa que equipo es el mio. */
    if (rojo === true) {
        Fachada.avionesRojosVivos(function(arr){
            for(let i = 0; i < arr.length; i++){
                if(arr[i] === false){
                    aviones_rojos.destruirAvion(i);
                }
            }
        });
        barco_rojo.moverBarco();
        for (i = 0; i < aviones_rojos.largo(); i++) {
            aviones_rojos.obtenerAvion(i).moverAMouse();
            //test
            if (fireButton.isDown) { /*TODO revisar esto, puede ser que si las balas
             *                                  son mas lentas y se suelta el boton de disparo,
             *                                  no detecte las colisiones.*/
                aviones_rojos.obtenerAvion(i).disparar();
                for (y = 0; y < aviones_azules.largo(); y++) {
                    if (numeroRandom(1, 20) >= 10) {                //este parametro levantarlo del archivo de configuracion (va de la mano con el grado de difucuotad)
                        let colision = game.physics.arcade.collide(aviones_rojos.obtenerAvion(i).getArma(), aviones_azules.obtenerAvion(y).obtenerSpirte(), collisionHandler);
                        if (colision) {
                            console.log("azul: " + i + " rojo: " + y);
                            Fachada.disparo_avion_avion(0, y.toString(), {
                                callback: function () {},
                                timeout: 5000,
                                errorHandler: function (mensaje) {
                                    console.log("Error disparo rojo->azul: " + mensaje);
                                }
                            });
                        }
                    }
                }
            }
            //test
        }
    }

    /*TODO este bloque no se tiene que hacer todo el tiempo, solo se tiene que
     * hacer una vez, cuando se sepa que equipo es el mio. */
    if (azul === true) {
//        console.log('cantidad de aviones:' + barco_azul.getCantidadAviones());
        Fachada.avionesAzulesVivos(function(arr){
            for(let i = 0; i < arr.length; i++){
                if(arr[i] === false){
                    aviones_azules.destruirAvion(i);
                }
            }
        });
        barco_azul.moverBarco();
        if (despegarAvionAzul_1.isDown && despegarAvionAzul_1.downDuration(1)) {    //emfernandez a terminar
            barco_azul.despegarAvion();
        }
        for (i = 0; i < aviones_azules.largo(); i++) {
            aviones_azules.obtenerAvion(i).moverAMouse();
            game.physics.arcade.overlap(aviones_azules.obtenerAvion(i).obtenerSpirte(), barco_azul.getSprite(), collisionHandler2, null, this);
            if (fireButton.isDown) {
                aviones_azules.obtenerAvion(i).disparar();
                for (y = 0; y < aviones_rojos.largo(); y++) {
                    if (numeroRandom(1, 20) >= 10) {                //este parametro levantarlo del archivo de configuracion (va de la mano con el grado de difucuotad)
                        let colision = game.physics.arcade.collide(aviones_azules.obtenerAvion(i).getArma(), aviones_rojos.obtenerAvion(y).obtenerSpirte(), collisionHandler);
                        if (colision) {
                            console.log("azul: " + i + " rojo: " + y);
                            Fachada.disparo_avion_avion(1, y.toString(), {
                                callback: function () {},
                                timeout: 5000,
                                errorHandler: function (mensaje) {
                                    console.log("Error disparo rojo->azul: " + mensaje);
                                }
                            });
                        }
                    }
                }
            }
        }
    }

}


function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}
;

function collisionHandler2(a, b) {
    a.kill();
    if (barco_azul.getCantidadAviones() === 0) {
        console.log('entre acaaaaaaaaaaa');
        barco_azul.setearSprite(1);
    }
    if (barco_azul.getCantidadAviones() === 1) {
        barco_azul.setearSprite(2);
    }
    if (barco_azul.getCantidadAviones() === 2) {
        barco_azul.setearSprite(3);
    }
    if (barco_azul.getCantidadAviones() === 3) {
        barco_azul.setearSprite(4);
    }
    barco_azul.agregarCantidadAviones();
    console.log('cantidad de aviones: ' + barco_azul.getCantidadAviones());

}
;

function collisionHandler(a, b) {
    b.kill();
    a.kill();
}
;



function numeroRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}


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


function render() {
    //game.debug.text("Caca" + parametros.MAX_BALAS + "VIDA:" + parametros.VIDA_MAX_AVION, 32, 32);
}





