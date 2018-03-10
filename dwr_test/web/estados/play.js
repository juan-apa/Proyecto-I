/* global game, Phaser, Fachada, rojo, azul, aviones_azules, aviones_rojos, barco_azul, win, loose, despegarAvion_4, despegarAvion_3, despegarAvion_2, despegarAvion_1, barco_rojo, METRALLETA, BOMBA, TORPEDO, EQUIPO_ROJO, EQUIPO_AZUL, dwr */

var playState = {
    create: function () {
        /*Seteo las flechas de la camara*/
        wasd = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.W),
            down: game.input.keyboard.addKey(Phaser.Keyboard.S),
            left: game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: game.input.keyboard.addKey(Phaser.Keyboard.D)
        };

        /*Seteo el mapa en que voy a jugar*/
        mapa = game.add.tileSprite(0, 0, 1600, 1200, 'fondoOceano');
        mapa.fixedToCamara = true;
        game.stage.backgroundColor = "#4488AA";
        game.world.setBounds(0, 0, 3000, 3000);

        /*Aviones Azules*/
        aviones_azules = new Aviones("Azules");
        for (let i = 0; i < 4; i++) {
            aviones_azules.agregarAvion(new Avion(i, 100, i * 100, i + 5, "azul"));
        }
        /*Aviones Rojos*/
        aviones_rojos = new Aviones("Rojos");
        for (let i = 0; i < 4; i++) {
            aviones_rojos.agregarAvion(new Avion(i, 900, i * 100, i + 9, "rojo"));
        }

        /*Creo los barcos*/
        barco_azul = new Barco("azul");
        barco_rojo = new Barco("rojo");

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
        informacion.fixedToCamera = true;

        /*Seteo las flehcas de movimiento de los barcos*/
        flechas = game.input.keyboard.createCursorKeys();

        /*Evento en que se apreta la tecla 1 para despegar el avión del barco*/
        despegarAvion_1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        despegarAvion_2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        despegarAvion_3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        despegarAvion_4 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
        cambiarAlturaAvion = game.input.keyboard.addKey(Phaser.KeyCode.Z);
        
        /*Inicio el tipo de fisicas del juego*/
        game.physics.startSystem(Phaser.Physics.ARCADE);

        /*Creacion loop disminucion combustibles*/
        game.time.events.loop(1000, this.disminuirCombustible, this);
        
        /*Creacion loop disminucion de tiempo*/
        game.time.events.loop(1000, this.disminuirTiempoPartida, this);
    },

    update: function () {
//        console.log(barco_azul.sprite.angle);
        var estAzulObtenido = false;
        var estRojoObtenido = false;
        var estadoAzul;
        var estadoRojo;
        llamar++;
        if (llamar === 0) {
            /*Obtengo los estados de ambos equipos*/
            Fachada.getEstadoEquipoAzul(function (estadoAz) {
                estadoAzul = estadoAz;
                estAzulObtenido = true;
                aviones_azules.updateAvionesVivos(estadoAz.avionesVivos);
                aviones_azules.updateAlturasAviones(estadoAz.alturas);
                aviones_azules.updateArmas(estadoAz.municionesAviones);
                aviones_azules.updateCombustibles(estadoAz.combustibles);
                aviones_azules.aterrizarAviones(estadoAz.avionesEnBarco);
                
                barco_azul.updateAvionesEnBarco(estadoAz.avionesEnBarco);
                
                barco_azul.velocidad = estadoAz.velocidadBarco;
                barco_azul.vivo = estadoAz.barcoVivo;
                
                if (rojo === true) {
                    aviones_azules.actualizarPosicionesAviones2(estadoAz.x_aviones, estadoAz.y_aviones, estadoAz.rot_aviones);
                    barco_azul.actualizarPosicion2(estadoAz.x_barco, estadoAz.y_barco, estadoAz.rot_barco);
                    /*Condicion de victoria*/
                    if (!estadoAz.barcoVivo) {
                        game.state.start("win");
                    }
                }
                
                if (azul === true) {
                    /*Condicion de perdida*/
                    if (!estadoAz.barcoVivo) {
                        game.state.start("loose");
                    }
                }
            });
            Fachada.getEstadoEquipoRojo(function (estadoRo) {
                estadoRojo = estadoRo;
                estRojoObtenido = true;
                aviones_rojos.updateAvionesVivos(estadoRo.avionesVivos);
                aviones_rojos.updateAlturasAviones(estadoRo.alturas);
                aviones_rojos.updateArmas(estadoRo.municionesAviones);
                aviones_rojos.updateCombustibles(estadoRo.combustibles);
                aviones_rojos.aterrizarAviones(estadoRo.avionesEnBarco);
                
                barco_rojo.updateAvionesEnBarco(estadoRo.avionesEnBarco);
                
                barco_rojo.velocidad = estadoRo.velocidadBarco;
                barco_rojo.vivo = estadoRo.barcoVivo;

                if (azul === true) {
                    aviones_rojos.actualizarPosicionesAviones2(estadoRo.x_aviones, estadoRo.y_aviones, estadoRo.rot_aviones);
                    barco_rojo.actualizarPosicion2(estadoRo.x_barco, estadoRo.y_barco, estadoRo.rot_barco);
                    /*Condicion de victoria*/
                    if (!estadoRo.barcoVivo) {
                        game.state.start("win");
                    }
                }
                if (rojo === true) {
                    /*Condicion de perdida*/
                    if (!estadoRo.barcoVivo) {
                        game.state.start("loose");
                    }
                }
            });

        } else {
            if (llamar > 0) {
                llamar = -1;
            }
        }

        mapa.tilePosition.x = -game.camera.x;
        mapa.tilePosition.y = -game.camera.y;

        moverCamara();
        if (rojo === true) {
            /*Mover barco*/
            barco_rojo.moverBarco();

            /*Despegar avion*/
            despegarAviones(aviones_rojos, barco_rojo, azul, rojo);

            for (i = 0; i < aviones_rojos.largo(); i++) {
                /*Mover avion*/
                aviones_rojos.obtenerAvion(i).moverAMouse();

                /*Aterrizaje avion*/
                aterrizajeAvionRojo();

                //Manejo de altura
                if (cambiarAlturaAvion.isDown && cambiarAlturaAvion.downDuration(1)) {
                    aviones_rojos.obtenerAvion(i).cambiarAltura();
                    let alturaNueva = aviones_rojos.obtenerAvion(i).getAltura2();
                    Fachada.cambioAlturaAvion(1, i, alturaNueva, function(){
                        console.log("altura cambiada en la fachada.");
                    });
                }

                /*Manejo de disparo*/
                if (fireButton.isDown) { /*TODO ARREGLAR BUG MANTENER BOTON APRETADO DE DISPARO*/
                    aviones_rojos.obtenerAvion(i).disparar();
                    let tipoArmaAvion = aviones_rojos.obtenerAvion(i).obtenerTipoArma();
                    let colision = false;
                    switch (tipoArmaAvion) {
                        case METRALLETA:
                            for (y = 0; y < aviones_azules.largo(); y++) {
                                if (numeroRandom(1, 20) >= 10) {                //este parametro levantarlo del archivo de configuracion (va de la mano con el grado de difucuotad)
                                    colision = game.physics.arcade.collide(aviones_rojos.obtenerAvion(i).getArma().balas, aviones_azules.obtenerAvion(y).obtenerSpirte(), collisionHandler);
                                    if (colision) {
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
                            colision = game.physics.arcade.collide(aviones_rojos.obtenerAvion(i).getArma(), barco_azul.getSprite(), colisionBombaBarco, null, this);
                            if (colision) {
                                Fachada.disparo_avion_barco(0, i.toString(), {
                                    callback: function () {
                                        console.log("respuesta fachada bomba");
                                    },
                                    timeout: 5000,
                                    errorHandler: function(){
                                        console.log("Error disparo rojo -> azul");
                                    }
                                });
                            }
                            break

                        case TORPEDO:
                            colision = game.physics.arcade.overlap(aviones_rojos.obtenerAvion(i).getArma(), barco_azul.getSprite(), colisionBombaBarco, null, this);
                            if (colision) {
                                Fachada.disparo_avion_barco(0, i.toString(), function () {
                                    console.log("respuesta fachada torpedo");
                                });
                            }
                            break
                    }

                }
            }
        }

        if (azul === true) {
            /*Mover barco*/
            barco_azul.moverBarco();

            //visibilidad 1 (abajo esta el paso 2)
            for (i = 0; i < aviones_rojos.largo(); i++) {
                let avAux = aviones_rojos.obtenerAvion(i);
                if(avAux.vivo && ! avAux.aterrizado){
                    avAux.obtenerSpirte().visible = false;
                }
            }


            /*Despegar avion*/
            despegarAviones(aviones_azules, barco_azul, azul, rojo);

            for (i = 0; i < aviones_azules.largo(); i++) {
                /*Mover avion*/
                aviones_azules.obtenerAvion(i).moverAMouse();

                /*Aterrizaje avion*/
                aterrizajeAvionAzul();

                //Manejo de altura
                if (cambiarAlturaAvion.isDown && cambiarAlturaAvion.downDuration(1)) {
                    aviones_azules.obtenerAvion(i).cambiarAltura();
                    let alturaNueva = aviones_azules.obtenerAvion(i).getAltura2();
                    Fachada.cambioAlturaAvion(0, i, alturaNueva, function(){
                        console.log("altura cambiada en la fachada.");
                    });
                }

                //Colision entre aviones enemigos
                for (y = 0; y < aviones_rojos.largo(); y++) {
                    if (aviones_azules.obtenerAvion(i).getAltura2() === aviones_rojos.obtenerAvion(i).getAltura2()) {
                        //game.physics.arcade.collide(aviones_azules.obtenerAvion(i).obtenerSpirte(), aviones_rojos.obtenerAvion(i).obtenerSpirte());
                        let choqueAviones = game.physics.arcade.collide(aviones_azules.obtenerAvion(i).obtenerSpirte(), aviones_rojos.obtenerAvion(y).obtenerSpirte(), collisionHandler2);
                        if (choqueAviones) { //falta preguntarle al otro cliente la altura 
                            Fachada.choque_avion_avion(i.toString(), y.toString(),
                                    function(){
                                        console.log("choque aviones en la fachada");
                                    });
                        }
                    }
                    //visibilidad 2
                    /*Chequear que no este estacionado */
                    if (visibilidad(aviones_azules.obtenerAvion(i).obtenerSpirte().x, aviones_azules.obtenerAvion(i).obtenerSpirte().y, aviones_rojos.obtenerAvion(y).obtenerSpirte().x, aviones_rojos.obtenerAvion(y).obtenerSpirte().y) <= 300) {
                        let avAux = aviones_rojos.obtenerAvion(y);
                        if(!aviones_rojos.obtenerAvion(y).aterrizado){
                            if(aviones_rojos.obtenerAvion(y).vivo){
                                avAux.mostrarSprite();
                            }
                        }
                    }

                }

                /*Manejo de disparo*/
                if (fireButton.isDown) {
                    aviones_azules.obtenerAvion(i).disparar();
                    let tipoArmaAvion = aviones_rojos.obtenerAvion(i).obtenerTipoArma();
                    let colision = false;
                    switch (tipoArmaAvion) {
                        case METRALLETA:
                            for (y = 0; y < aviones_rojos.largo(); y++) {
                                
                                if (numeroRandom(1, 20) >= 10) {                //este parametro levantarlo del archivo de configuracion (va de la mano con el grado de difucuotad)
                                    colision = game.physics.arcade.collide(aviones_azules.obtenerAvion(i).getArma(), aviones_rojos.obtenerAvion(y).obtenerSpirte(), collisionHandler, null, this);
                                    if (colision) {
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
                            break;

                        case BOMBA:
                            colision = game.physics.arcade.collide(aviones_azules.obtenerAvion(i).getArma(), barco_rojo.getSprite(), colisionBombaBarco, null, this);
                            if (colision) {
                                Fachada.disparo_avion_barco(1, i.toString(), function () {
                                    console.log("respuesta fachada bomba");
                                });
                            }
                            break;

                        case TORPEDO:
                            colision = game.physics.arcade.collide(aviones_azules.obtenerAvion(i).getArma(), barco_rojo.getSprite(), colisionBombaBarco);
                            if (colision) {
                                Fachada.disparo_avion_barco(1, i.toString(), function () {
                                    console.log("respuesta fachada torpedo");
                                });
                            }
                            break;
                    }
                }
            }
        }
        
        /*Aviso las posiciones de los aviones y barco a la fachada*/
        if (azul === true) {
            Fachada.updatePosAzul(aviones_azules.obtenerPosicionesAviones(), barco_azul.obtenerPosicion(), {
                timeout: 5000,
                errorHandler: function (message, exception) {
                    console.log("error updatePosRojo ");
                    console.log(dwr.util.toDescriptiveString(exception, 2));
                }
            });
        }

        if (rojo === true) {
            Fachada.updatePosRojo(aviones_rojos.obtenerPosicionesAviones(), barco_rojo.obtenerPosicion(), {
                callback: function () {},
                timeout: 5000,
                errorHandler: function (message) {
                    console.log("error updatePosAzul " + message);
                },
                callback: function(){
                    estRojoObtenido = false;
                }
            });
        }
    },
    
    render: function(){
//        game.debug.body(barco_azul.sprite);
//        game.debug.body(barco_rojo.sprite);
        game.debug.body(aviones_rojos.aviones[0].arma.balas);
    },
    disminuirCombustible: function () {
//        console.log(aviones_azules.obtenerCombustibles());
//        console.log(aviones_rojos.obtenerCombustibles());
        Fachada.disminuirCombustibles(function(){
            console.log("disminución en fachada.");
        });
    },
    disminuirTiempoPartida: function(){
        /*TODO avisar al a facahada de la disminucion del tiempo de la partida*/
    }
};


function visibilidad(x1, y1, x2, y2) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
}
;

function barcoAvionAzulColisionan(a, b) {
    /*a es el avion, y b es el barco*/
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
}
;



function barcoAvionRojoColisionan(a, b) {
    /*a es el avion, y b es el barco*/
    a.kill();
    a.visible = false;
    if (barco_rojo.getCantidadAviones() === 0) {
        barco_rojo.setearSprite(1);
    }
    if (barco_rojo.getCantidadAviones() === 1) {
        barco_rojo.setearSprite(2);
    }
    if (barco_rojo.getCantidadAviones() === 2) {
        barco_rojo.setearSprite(3);
    }
    if (barco_rojo.getCantidadAviones() === 3) {
        barco_rojo.setearSprite(4);
    }
    barco_rojo.agregarCantidadAviones();
}
;


function collisionHandler(a, b) {
    b.kill();
    a.kill();
}
;

function collisionHandler2(a, b) {
    a.kill();
    b.kill();
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

function moverCamara() {
    if (wasd.up.isDown)
    {
        game.camera.y -= 10;
    } else if (wasd.down.isDown)
    {
        game.camera.y += 10;
    }

    if (wasd.left.isDown)
    {
        game.camera.x -= 10;
    } else if (wasd.right.isDown)
    {
        game.camera.x += 10;
    }
}

function colisionBombaBarco(a, b) {
    b.kill();
//    console.log("colision bomba barco");
}


/*Le paso el objeto de aviones y el barco correspondiente al equipo, y si es azul o rojo*/
function despegarAviones(aviones, barco, azul, rojo) {
    //Presiono 1 para despegar avion id 1
    if ((despegarAvion_1.isDown) && (despegarAvion_1.downDuration(1)) && (barco.getCantidadAviones() > 0)) {
        if(aviones.obtenerAvion(0).aterrizado && !aviones.obtenerAvion(0).getBloqueado()){
            console.log("entra 1");
            barco.despegarAvion();
            barco.despegarAvion();
            aviones.obtenerAvion(0).setSprite(barco.getSprite().position.x - 300, barco.getSprite().position.y - 150);
            if (azul) {
                    Fachada.despegueAvionAzul(0, function () {
                        console.log("Avion despegado en fachada");
                    });
                } else {
                    if (rojo) {
                        Fachada.despegueAvionRojo(0, function () {
                            console.log("Avion despegado en fachada");
                        });
                    }
                }
        }
    }
    //Presiono 2 para despegar avion id 2
    if (despegarAvion_2.isDown && despegarAvion_2.downDuration(1) && barco.getCantidadAviones() > 0) {    //emfernandez a terminar
        if(aviones.obtenerAvion(1).aterrizado && !aviones.obtenerAvion(1).getBloqueado()){
            console.log("entra 2");
            barco.despegarAvion();
            barco.despegarAvion();
            aviones.obtenerAvion(1).setSprite(barco.getSprite().position.x - 300, barco.getSprite().position.y - 150);
            if (azul) {
                    Fachada.despegueAvionAzul(1, function () {
                        console.log("Avion despegado en fachada");
                    });
                } else {
                    if (rojo) {
                        Fachada.despegueAvionRojo(1, function () {
                            console.log("Avion despegado en fachada");
                        });
                    }
                }
        }
    }
    //Presiono 3 para despegar avion id 3
    if (despegarAvion_3.isDown && despegarAvion_3.downDuration(1) && barco.getCantidadAviones() > 0) {    //emfernandez a terminar
        if(aviones.obtenerAvion(2).aterrizado && !aviones.obtenerAvion(2).getBloqueado()){
            console.log("entra 3");
            barco.despegarAvion();
            barco.despegarAvion();
            aviones.obtenerAvion(2).setSprite(barco.getSprite().position.x - 300, barco.getSprite().position.y - 150);
            if (azul) {
                    Fachada.despegueAvionAzul(2, function () {
                        console.log("Avion despegado en fachada");
                    });
                } else {
                    if (rojo) {
                        Fachada.despegueAvionRojo(2, function () {
                            console.log("Avion despegado en fachada");
                        });
                    }
                }
        }
    }
    //Presiono 4 para despegar avion id 4
    if (despegarAvion_4.isDown && despegarAvion_4.downDuration(1) && barco.getCantidadAviones() > 0) {    //emfernandez a terminar
        if(aviones.obtenerAvion(3).aterrizado && !aviones.obtenerAvion(3).getBloqueado()){
            console.log("entra 4");
            barco.despegarAvion();
            barco.despegarAvion();
            aviones.obtenerAvion(3).setSprite(barco.getSprite().position.x - 300, barco.getSprite().position.y - 150);
            if (azul) {
                    Fachada.despegueAvionAzul(3, function () {
                        console.log("Avion despegado en fachada");
                    });
                } else {
                    if (rojo) {
                        Fachada.despegueAvionRojo(3, function () {
                            console.log("Avion despegado en fachada");
                        });
                    }
                }
        }
    }
}

function aterrizajeAvionAzul(){
    let avionBarcoSuperpuestos = game.physics.arcade.overlap(aviones_azules.obtenerAvion(i).obtenerSpirte(), 
                barco_azul.getSprite(), 
                barcoAvionAzulColisionan, 
                null, 
                this);
    if (avionBarcoSuperpuestos) {
        aviones_azules.obtenerAvion(i).aterrizar();
        var posAterrizaje = barco_azul.getCantidadAviones();
        aviones_azules.obtenerAvion(i).setId(posAterrizaje);
        /*Le digo al servidor que aterrizo el avion i*/
        Fachada.aterrizajeAvionAzul(i, function () {
            console.log("avion aterrizado en fachada.");
        });
    }
    return avionBarcoSuperpuestos;
}

function aterrizajeAvionRojo(){
    let avionBarcoSuperpuestos = game.physics.arcade.overlap(aviones_rojos.obtenerAvion(i).obtenerSpirte(), 
                barco_rojo.getSprite(), 
                barcoAvionRojoColisionan, 
                null, 
                this);
    if (avionBarcoSuperpuestos) {
        aviones_rojos.obtenerAvion(i).aterrizar();
        var posAterrizaje = barco_rojo.getCantidadAviones();
        aviones_rojos.obtenerAvion(i).setId(posAterrizaje);
        /*Le digo al servidor que aterrizo el avion i*/
        Fachada.aterrizajeAvionRojo(i, function () {
            console.log("avion aterrizado en fachada.");
        });
    }
}