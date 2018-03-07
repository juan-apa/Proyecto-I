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
            aviones_azules.agregarAvion(new Avion(i, 100, i * 100, i + 5));
            aviones_azules.obtenerAvion(i).setCombustible();
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
        informacion.fixedToCamera = true;

        /*Seteo las flehcas de movimiento de los barcos*/
        flechas = game.input.keyboard.createCursorKeys();

        /*Evento en que se apreta la tecla 1 para despegar el avión del barco*/
        despegarAvion_1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        despegarAvion_2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        despegarAvion_3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        despegarAvion_4 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);

        cambiarAlturaAvion = game.input.keyboard.addKey(Phaser.KeyCode.Z);


        //test visibilidad



        /*Creacion loop disminucion combustibles*/
//        game.time.events.loop(1000, this.disminuirCombustible, this);
    },

    update: function () {
        var estadoAzul;
        var estadoRojo;
        llamar++;
        if (llamar === 0) {
            /*Obtengo los estados de ambos equipos*/
            Fachada.getEstadoEquipoAzul(function (estadoAz) {
                estadoAzul = estadoAz;
                aviones_azules.updateAvionesVivos(estadoAz.avionesVivos);
                aviones_azules.updateAlturasAviones(estadoAz.alturas);
                aviones_azules.updateArmas(estadoAz.municionesAviones);
                barco_azul.velocidad = estadoAz.velocidadBarco;
                barco_azul.vivo = estadoAz.barcoVivo;
                
                
                if (rojo === true) {
                    aviones_azules.aterrizarAviones(estadoAz.avionesEnBarco);
                    barco_azul.updateAvionesEnBarco(estadoAz.avionesEnBarco);
                    /*Condicion de victoria*/
                    if (!estadoAz.barcoVivo) {
                        game.state.start("win");
                    }
                }
                /*Condicion de perdida*/
                if (azul === true) {
                    if (!estadoAz.barcoVivo) {
                        game.state.start("loose");
                    }
                }
            });
            Fachada.getEstadoEquipoRojo(function (estadoRo) {
                estadoRojo = estadoRo;
                aviones_rojos.updateAvionesVivos(estadoRo.avionesVivos);
                aviones_rojos.updateAlturasAviones(estadoRo.alturas);
                aviones_rojos.updateCombustibles(estadoRo.combustibles);
                barco_rojo.velocidad = estadoRo.velocidadBarco;
                barco_rojo.vivo = estadoRo.barcoVivo;
                
                
                if (azul === true) {
                    aviones_rojos.aterrizarAviones(estadoRo.avionesEnBarco);
                    barco_rojo.updateAvionesEnBarco(estadoRo.avionesEnBarco);
                    /*Condicion de victoria*/
                    if (!estadoRo.barcoVivo) {
                        game.state.start("win");
                    }
                }
                /*Condicion de perdida*/
                if (rojo === true) {
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

                //Manejo de altura
                if (cambiarAlturaAvion.isDown && cambiarAlturaAvion.downDuration(1)) {
                    aviones_rojos.obtenerAvion(i).cambiarAltura();
                    let alturaNueva = aviones_rojos.obtenerAvion(i).getAltura2();
                    Fachada.cambioAlturaAvion(1, i, alturaNueva, function(){
                        console.log("altura cambiada en la fachada.");
                    });
                }

                /*Manejo de disparo*/
                if (fireButton.isDown) {
                    aviones_rojos.obtenerAvion(i).disparar();
                    let tipoArmaAvion = aviones_rojos.obtenerAvion(i).obtenerTipoArma();
                    let colision = false;
                    switch (tipoArmaAvion) {
                        case METRALLETA:
                            for (y = 0; y < aviones_azules.largo(); y++) {
                                if (numeroRandom(1, 20) >= 10) {                //este parametro levantarlo del archivo de configuracion (va de la mano con el grado de difucuotad)
                                    colision = game.physics.arcade.collide(aviones_rojos.obtenerAvion(i).getArma(), aviones_azules.obtenerAvion(y).obtenerSpirte(), collisionHandler);
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
                            colision = game.physics.arcade.collide(aviones_rojos.obtenerAvion(i).getArma(), barco_azul.getSprite(), colisionBombaBarco);
                            if (colision) {
                                console.log("colision: " + colision);
                                Fachada.disparo_avion_barco(0, i.toString(), function () {
                                    console.log("respuesta fachada");
                                });
                            }
                            break

                        case TORPEDO:
                            colision = game.physics.arcade.collide(aviones_rojos.obtenerAvion(i).getArma(), barco_azul.getSprite(), colisionBombaBarco);
                            if (colision) {
                                console.log("colision: " + colision);
                                Fachada.disparo_avion_barco(0, i.toString(), function () {
                                    console.log("respuesta fachada");
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
                if(avAux.isVivo() && ! avAux.isAterrizado()){
                    avAux.obtenerSpirte().visible = false;
                }
            }


            /*Despegar avion*/
            despegarAviones(aviones_azules, barco_azul, azul, rojo);

            for (i = 0; i < aviones_azules.largo(); i++) {
                /*Mover avion*/
                aviones_azules.obtenerAvion(i).moverAMouse();

                /*Aterrizaje avion*/
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

                //Manejo de altura
                if (cambiarAlturaAvion.isDown && cambiarAlturaAvion.downDuration(1)) {
                    aviones_azules.obtenerAvion(i).cambiarAltura();
                    let alturaNueva = aviones_azules.obtenerAvion(i).getAltura2();
                    Fachada.cambioAlturaAvion(0, i, alturaNueva, function(){
                        console.log("altura cambiada en la fachada.");
                    });
                }

                //Colision entre aviones enemigos             PARA TERMINAR +%)($_)%*$)%*)($&%)($*%)$
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
                        let avAux = aviones_rojos.obtenerAvion(i);
                        if(avAux.isVivo() && ! avAux.isAterrizado()){
                            avAux.mostrarSprite();
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
                                    colision = game.physics.arcade.collide(aviones_azules.obtenerAvion(i).getArma(), aviones_rojos.obtenerAvion(y).obtenerSpirte(), collisionHandler);
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
                            colision = game.physics.arcade.collide(aviones_azules.obtenerAvion(i).getArma(), barco_rojo.getSprite(), colisionBombaBarco);
                            if (colision) {
                                console.log("colision: " + colision);
                                Fachada.disparo_avion_barco(1, i.toString(), function () {
                                    console.log("respuesta fachada");
                                });
                            }
                            break;

                        case TORPEDO:
                            colision = game.physics.arcade.collide(aviones_azules.obtenerAvion(i).getArma(), barco_rojo.getSprite(), colisionBombaBarco);
                            if (colision) {
                                console.log("colision: " + colision);
                                Fachada.disparo_avion_barco(1, i.toString(), function () {
                                    console.log("respuesta fachada");
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
    },
    disminuirCombustible: function () {
        aviones_azules.disminuirCombustible();
        aviones_rojos.disminuirCombustible();
        Fachada.updateCombustibleAzul(aviones_azules.obtenerCombustibles(), function (){});
        Fachada.updateCombustibleRojo(aviones_rojos.obtenerCombustibles(), function (){});
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
}


/*Le paso el objeto de aviones y el barco correspondiente al equipo, y si es azul o rojo*/
function despegarAviones(aviones, barco, azul, rojo) {
    //Presiono 1 para despegar avion id 1
    if ((despegarAvion_1.isDown) && (despegarAvion_1.downDuration(1)) && (barco.getCantidadAviones() > 0)) {
        for (i = 0; i < aviones.largo(); i++) {
            if (aviones.obtenerAvion(i).getId() === 1 && aviones.obtenerAvion(i).getBloqueado() === false) {
                barco.despegarAvion();
                aviones.obtenerAvion(i).setId(0);
                aviones.obtenerAvion(i).setSprite(barco.getSprite().position.x - 300, barco.getSprite().position.y - 150);
                if (azul) {
                    Fachada.despegueAvionAzul(i, function () {
                        console.log("Avion despegado en fachada");
                    });
                } else {
                    if (rojo) {
                        Fachada.despegueAvionRojo(i, function () {
                            console.log("Avion despegado en fachada");
                        });
                    }
                }
            }
        }
    }

    //Presiono 2 para despegar avion id 2
    if (despegarAvion_2.isDown && despegarAvion_2.downDuration(1) && barco.getCantidadAviones() > 0) {    //emfernandez a terminar
        for (i = 0; i < aviones.largo(); i++) {
            if (aviones.obtenerAvion(i).getId() === 2 && aviones.obtenerAvion(i).getBloqueado() === false) {
                barco.despegarAvion();
                aviones.obtenerAvion(i).setId(0);
                aviones.obtenerAvion(i).setSprite(barco.getSprite().position.x - 300, barco.getSprite().position.y - 100);
                if (azul) {
                    Fachada.despegueAvionAzul(i, function () {
                        console.log("Avion despegado en fachada");
                    });
                } else {
                    if (rojo) {
                        Fachada.despegueAvionRojo(i, function () {
                            console.log("Avion despegado en fachada");
                        });
                    }
                }
            }
        }
    }

    //Presiono 3 para despegar avion id 3
    if (despegarAvion_3.isDown && despegarAvion_3.downDuration(1) && barco.getCantidadAviones() > 0) {    //emfernandez a terminar
        //console.log("id avion:" + 3);

        for (i = 0; i < aviones.largo(); i++) {
            if (aviones.obtenerAvion(i).getId() === 3 && aviones.obtenerAvion(i).getBloqueado() === false) {
                barco.despegarAvion();
                aviones.obtenerAvion(i).setId(0);
                aviones.obtenerAvion(i).setSprite(barco.getSprite().position.x - 300, barco.getSprite().position.y - 50);
                if (azul) {
                    Fachada.despegueAvionAzul(i, function () {
                        console.log("Avion despegado en fachada");
                    });
                } else {
                    if (rojo) {
                        Fachada.despegueAvionRojo(i, function () {
                            console.log("Avion despegado en fachada");
                        });
                    }
                }
            }
        }
    }

    //Presiono 4 para despegar avion id 4
    if (despegarAvion_4.isDown && despegarAvion_4.downDuration(1) && barco.getCantidadAviones() > 0) {    //emfernandez a terminar
        for (i = 0; i < aviones.largo(); i++) {
            if (aviones.obtenerAvion(i).getId() === 4 && aviones.obtenerAvion(i).getBloqueado() === false) {
                barco.despegarAvion();
                aviones.obtenerAvion(i).setId(0);
                aviones.obtenerAvion(i).setSprite(barco.getSprite().position.x - 300, barco.getSprite().position.y);
                if (azul) {
                    Fachada.despegueAvionAzul(i, function () {
                        console.log("Avion despegado en fachada");
                    });
                } else {
                    if (rojo) {
                        Fachada.despegueAvionRojo(i, function () {
                            console.log("Avion despegado en fachada");
                        });
                    }
                }
            }
        }
    }
}