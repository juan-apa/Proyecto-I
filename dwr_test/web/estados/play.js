/* global game, Phaser, Fachada, rojo, azul, aviones_azules, aviones_rojos, barco_azul */

var playState = {
    create: function () {
        /*Seteo las flechas de la camara*/
        wasd = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.W),
            down: game.input.keyboard.addKey(Phaser.Keyboard.S),
            left: game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: game.input.keyboard.addKey(Phaser.Keyboard.D),
        };
        
        /*Seteo el mapa en que voy a jugar*/
        mapa = game.add.tileSprite(0, 0, 1600, 1200, 'fondoOceano');
        mapa.fixedToCamara = true;
        game.stage.backgroundColor = "#4488AA";
        game.world.setBounds(0, 0, 1600, 1200);

        /*Aviones Azules*/
        aviones_azules = new Aviones("Azules");
        for (let i = 0; i < 4; i++) {
            aviones_azules.agregarAvion(new Avion(i, 100, i * 100, i + 5));
        }
        /*Aviones Rojos*/
        aviones_rojos = new Aviones("Rojos");
        for (let i = 0; i < 4; i++) {
            aviones_rojos.agregarAvion(new Avion(i, 900, i * 100, i + 9));
        }

        /*Creo los barcos*/
        barco_azul = new Barco("barco_azul");
        barco_rojo = new Barco("barco_rojo");

        /*Seteo los botones de disparo*/
        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

        explosions = game.add.group();
        explosions.createMultiple(30, 'kaboom');

        //seteo el panel de mensajes
        informacion = game.add.text(10, 10, "", {
            font: "30px Arial",
            fill: "#ff0044",
            align: "center"
        });

        /*Seteo las flehcas de movimiento de los barcos*/
        flechas = game.input.keyboard.createCursorKeys();

        /*Evento en que se apreta la tecla 1 para despegar el avión del barco*/
        despegarAvionAzul_1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        despegarAvionAzul_2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        despegarAvionAzul_3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        despegarAvionAzul_4 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
        
        cambiarAlturaAvion = game.input.keyboard.addKey(Phaser.KeyCode.Z);
        
        /*Creacion loop disminucion combustibles*/
//        game.time.events.loop(1000, this.disminuirCombustible, this);
    },
    
    update: function(){
        var estadoAzul;
        var estadoRojo;
        llamar++;
        if (llamar === 0) {
            /*Obtengo los estados de ambos equipos*/
            Fachada.getEstadoEquipoAzul(function(estadoAz){
                estadoAzul = estadoAz;
                aviones_azules.updateAvionesVivos(estadoAz.avionesVivos);
                barco_azul.velocidad = estadoAz.velocidadBarco;
                barco_azul.vivo = estadoAz.barcoVivo;
                if(rojo===true){
                    aviones_azules.aterrizarAviones(estadoAzul.avionesEnBarco);
                    if(! estadoAzul.barcoVivo){
                        game.state.start(win);
                    }
                }
                if(azul === true){
                    if(! estadoAzul.barcoVivo){
                        game.state.start(loose);
                    }
                }
            });
            Fachada.getEstadoEquipoRojo(function(estadoRo){
                estadoRojo = estadoRo;
                aviones_rojos.updateAvionesVivos(estadoRo.avionesVivos);
                barco_rojo.velocidad = estadoRo.velocidadBarco;
                barco_rojo.vivo = estadoRo.barcoVivo;
                if(azul===true){
                    aviones_rojos.aterrizarAviones(estadoRojo.avionesEnBarco);
                    if(! estadoRojo.barcoVivo){
                        game.state.start(win);
                    }
                }
                if(azul === true){
                    if(! estadoRojo.barcoVivo){
                        game.state.start(loose);
                    }
                }
            });
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

        mapa.tilePosition.x = -game.camera.x;
        mapa.tilePosition.y = -game.camera.y;

        moverCamara();
        if (rojo === true) {
//            Fachada.avionesRojosVivos(function (arr) {
//                for (let i = 0; i < arr.length; i++) {
//                    if (arr[i] === false) {
//                        aviones_rojos.destruirAvion(i);
//                    }
//                }
//            });
            barco_rojo.moverBarco();
            for (i = 0; i < aviones_rojos.largo(); i++) {
                aviones_rojos.obtenerAvion(i).moverAMouse();
                //test
                if (fireButton.isDown) { /*TODO revisar esto, puede ser que si las balas
                 *                                  son mas lentas y se suelta el boton de disparo,
                 *                                  no detecte las colisiones.*/

                    aviones_rojos.obtenerAvion(i).disparar();
                    let tipoArmaAvion = aviones_rojos.obtenerAvion(i).obtenerTipoArma();
                    switch(tipoArmaAvion){
                        case METRALLETA:
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
                            break;
                        
                        case BOMBA:
                            let colision = game.physics.arcade.collide(aviones_rojos.obtenerAvion(i).getArma(), barco_azul.getSprite(), colisionBombaBarco);
                            if(colision){
                                console.log("colision: " + colision);
                                Fachada.disparo_avion_barco(0, i.toString(),function(){
                                    console.log("respuesta fachada");
                                });
                            }
                            break
                            
                        case TORPEDO:
                            break
                    }
                    
                }
                //test
            }
        }

        if (azul === true) {
            barco_azul.moverBarco();

            //Presiono 1 para despegar avion id 1
            if (despegarAvionAzul_1.isDown && despegarAvionAzul_1.downDuration(1) && barco_azul.getCantidadAviones() > 0) {    //emfernandez a terminar
                //console.log("id avion:" + 1);
                for (i = 0; i < aviones_azules.largo(); i++) {
                    if (aviones_azules.obtenerAvion(i).getId() === 1 && aviones_azules.obtenerAvion(i).getBloqueado()===false) {
                        barco_azul.despegarAvion();
                        aviones_azules.obtenerAvion(i).setId(0);
                        aviones_azules.obtenerAvion(i).setSprite(barco_azul.getSprite().position.x - 300, barco_azul.getSprite().position.y - 150);
                        Fachada.despegueAvionAzul(i, function(){
                            console.log("Avion despegado en fachada");
                        });
                    }
                }
            }

            //Presiono 2 para despegar avion id 2
            if (despegarAvionAzul_2.isDown && despegarAvionAzul_2.downDuration(1) && barco_azul.getCantidadAviones() > 0) {    //emfernandez a terminar
                //console.log("id avion:" + 2);

                for (i = 0; i < aviones_azules.largo(); i++) {
                    if (aviones_azules.obtenerAvion(i).getId() === 2 && aviones_azules.obtenerAvion(i).getBloqueado()===false) {
                        barco_azul.despegarAvion();
                        aviones_azules.obtenerAvion(i).setId(0);
                        aviones_azules.obtenerAvion(i).setSprite(barco_azul.getSprite().position.x - 300, barco_azul.getSprite().position.y - 100);
                        Fachada.despegueAvionAzul(i, function(){
                            console.log("Avion despegado en fachada");
                        });
                    }
                }
            }

            //Presiono 3 para despegar avion id 3
            if (despegarAvionAzul_3.isDown && despegarAvionAzul_3.downDuration(1) && barco_azul.getCantidadAviones() > 0) {    //emfernandez a terminar
                //console.log("id avion:" + 3);

                for (i = 0; i < aviones_azules.largo(); i++) {
                    if (aviones_azules.obtenerAvion(i).getId() === 3 && aviones_azules.obtenerAvion(i).getBloqueado()===false) {
                        barco_azul.despegarAvion();
                        aviones_azules.obtenerAvion(i).setId(0);
                        aviones_azules.obtenerAvion(i).setSprite(barco_azul.getSprite().position.x - 300, barco_azul.getSprite().position.y - 50);
                        Fachada.despegueAvionAzul(i, function(){
                            console.log("Avion despegado en fachada");
                        });
                    }
                }
            }

            //Presiono 4 para despegar avion id 4
            if (despegarAvionAzul_4.isDown && despegarAvionAzul_4.downDuration(1) && barco_azul.getCantidadAviones() > 0) {    //emfernandez a terminar
                for (i = 0; i < aviones_azules.largo(); i++) {
                    if (aviones_azules.obtenerAvion(i).getId() === 4 && aviones_azules.obtenerAvion(i).getBloqueado()===false) {                       
                        barco_azul.despegarAvion();
                        aviones_azules.obtenerAvion(i).setId(0);
                        aviones_azules.obtenerAvion(i).setSprite(barco_azul.getSprite().position.x - 300, barco_azul.getSprite().position.y);
                        Fachada.despegueAvionAzul(i, function(){
                            console.log("Avion despegado en fachada");
                        });
                    }
                }
            }
            //////////////////////////////////////

            for (i = 0; i < aviones_azules.largo(); i++) {
                aviones_azules.obtenerAvion(i).moverAMouse();
                //aterrizaje de avion
                let avionBarcoSuperpuestos = game.physics.arcade.overlap(aviones_azules.obtenerAvion(i).obtenerSpirte(), barco_azul.getSprite(), collisionHandler2, null, this);
                if (avionBarcoSuperpuestos) {
                    aviones_azules.obtenerAvion(i).aterrizar();
                    var posAterrizaje = barco_azul.getCantidadAviones();
                    aviones_azules.obtenerAvion(i).setId(posAterrizaje);
                    /*Le digo al servidor que aterrizo el avion i*/
                    Fachada.aterrizajeAvionAzul(i, function(){
                        console.log("avion aterrizado en fachada.");
                    });
                }
                //cambiarAlturaAvion
                if (cambiarAlturaAvion.isDown && cambiarAlturaAvion.downDuration(1)){
                    aviones_azules.obtenerAvion(i).cambiarAltura();
                }
                if (fireButton.isDown) {
                    aviones_azules.obtenerAvion(i).disparar();
                    for (y = 0; y < aviones_rojos.largo(); y++) {
                        if (numeroRandom(1, 20) >= 10) {                //este parametro levantarlo del archivo de configuracion (va de la mano con el grado de difucuotad)
                            let colision = game.physics.arcade.collide(aviones_azules.obtenerAvion(i).getArma(), aviones_rojos.obtenerAvion(y).obtenerSpirte(), collisionHandler);
                            if (colision) {
                                //console.log("azul: " + i + " rojo: " + y);
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
    },
    disminuirCombustible: function(){
        aviones_azules.disminuirCombustible();
        aviones_rojos.disminuirCombustible();
        Fachada.updateCombustibleAzul(aviones_azules.obtenerCombustibles(), function () {});
        Fachada.updateCombustibleRojo(aviones_rojos.obtenerCombustibles(), function () {});
    }
};


function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}
;

function collisionHandler2(a, b) {
    //if (a.visible === true) {
    //console.log('ANTES= cantidad de aviones: ' + barco_azul.getCantidadAviones());
    a.kill();
    a.visible = false;
    if (barco_azul.getCantidadAviones() === 0) {
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
    //console.log('DESPUES= cantidad de aviones: ' + barco_azul.getCantidadAviones());

    //}
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

function sinAviones(arr){
    let ret = true;
    for(let i = 0; i < arr.length; i++){
        if(arr[i]){
           ret = false; 
        } 
    }
    return ret;
}

function moverCamara(){
    if (wasd.up.isDown)
    {
        game.camera.y -= 4;
    }
    else if (wasd.down.isDown)
    {
        game.camera.y += 4;
    }

    if (wasd.left.isDown)
    {
        game.camera.x -= 4;
    }
    else if (wasd.right.isDown)
    {
        game.camera.x += 4;
    }
}

function colisionBombaBarco(a, b){
    b.kill();
}