<%-- 
    Document   : index
    Created on : Feb 13, 2018, 2:01:42 PM
    Author     : pc-61
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Vulture's Row</title>
        <script type="text/javascript" src="dwr/engine.js"></script>
        <script type="text/javascript" src="dwr/util.js"></script>
        <script type="text/javascript" src="<%=pageContext.getServletContext().getContextPath()  %>/dwr/interface/Fachada.js"></script>
        <script src="phaser.min.js" charset="utf-8"></script>
        <script type="text/javascript" src="phaser_nineslice.js"></script>
        <script type="text/javascript" src="phaser_input.js"></script>
        <style>
            html{
                margin: 0;
                padding: 0;
            }
            body{
                margin: 0;
                padding: 0;
            }
        </style>
        <script type="text/javascript">
            var factorEscaladoBarco = 0.8;
            var factorEscaladoAvion = 1;
            var factorEscaladoHud = 1;
            var parametros = {
                VIDA_MAX_AVION: 400,
                MAX_BALAS: 300
            };
            console.log("UNO " + parametros.MAX_BALAS);
            Fachada.inicializarBDD(function(){
                console.log("bdd inicializada");
            });

            function obtenerMaxBalas(respuesta) {
                console.log(respuesta);
                parametros.MAX_BALAS = respuesta;
                console.log(parametros)
            }
            console.log("TRES " + parametros.MAX_BALAS);
//            dwr.engine.setActiveReverseAjax(true);
            var azul = false;
            var rojo = false;
            var botonCarga;
            window.onbeforeunload = function(e){  
                if(azul){
                    Fachada.jugadorAzulSalio(function(){});
                }
                if(rojo){
                    Fachada.jugadorRojoSalio(function(){});
                }
                return 'salido'; //return not alert
            }   
        </script>

        <script src="InfoAvion.js" charset="utf-8"></script>
        <script src="InfoBarco.js" charset="utf-8"></script>
        <script src="Hud.js" charset="utf-8"></script>
        <script src="VOPosicion.js" charset="utf-8"></script>
        <script src="Barco.js" charset="utf-8"></script>
        <script src="Arma.js" charset="utf-8"></script>
        <script src="Avion.js" charset="utf-8"></script>
        <script src="Aviones.js" charset="utf-8"></script>
        <!--<script src="main.js" charset="utf-8"> </script>-->
        <script src="estados/espera.js" charset="utf-8"></script>
        <script src="estados/empate.js" charset="utf-8"></script>
        <script src="estados/win.js" charset="utf-8"></script>
        <script src="estados/loose.js" charset="utf-8"></script>
        <script src="estados/boot.js" charset="utf-8"></script>
        <script src="estados/credits.js" charset="utf-8"></script>
        <script src="estados/load.js" charset="utf-8"></script>
        <script src="estados/menu.js" charset="utf-8"></script>
        <script src="estados/play.js" charset="utf-8"></script>

        <!--<script src="estados/game.js" charset="utf-8"> </script>-->



    </head>
    <body>
        <script type="text/javascript">
            var game1 = new Phaser.Game(800, 600, Phaser.AUTO, '', {create: create, preload: preload}, true);
            var figure;
            var user;
            var testHolder;
            var password;
            Phaser.Device.whenReady(function () {
                game1.plugins.add(PhaserInput.Plugin);
                game1.plugins.add(PhaserNineSlice.Plugin);
            });

            function preload() {
                game1.load.image('bg', 'assets/img.jpg');
                game1.load.nineSlice('input', 'assets/button3.png', 15);
                game1.load.nineSlice('btn', 'assets/button_ingresar3.png', 20, 23, 27, 28);
                game1.load.nineSlice('btn2', 'assets/boton_creditos.png', 20, 23, 27, 28);
            }

            function create() {
                if (!game1.device.desktop) {
                    game1.scale.setGameSize(window.innerWidth, window.innerHeight);
                }


                game1.add.image(0, 0, 'bg');


                var login = game1.add.text(game1.width / 2, 100, "Vulture's Row", {
                    font: '30px Arial',
                    fill: '#000000',
                    fontWeight: 'bold',
                });
                login.anchor.set(0.5);


                var userBg = game1.add.nineSlice(game1.width / 2 + 5, 180, 'input', null, 200, 50);
                userBg.anchor.set(0.5);

                user = game1.add.inputField(game1.width / 2 - 85, 180 - 17, {
                    font: '18px Arial',
                    fill: '#000000',
                    fillAlpha: 0,
                    fontWeight: 'bold',
                    forceCase: PhaserInput.ForceCase.upper,
                    width: 150,
                    max: 20,
                    padding: 8,
                    borderWidth: 1,
                    borderColor: '#000',
                    borderRadius: 6,
                    placeHolder: 'Usuario',
                    textAlign: 'center',
                    zoom: true
                });
                //user.setText('prefilled');
                user.blockInput = false;


                var passBg = game1.add.nineSlice(game1.width / 2 + 5, 250, 'input', null, 200, 50);
                passBg.anchor.set(0.5);
                password = game1.add.inputField(game1.width / 2 - 85, 250 - 17, {
                    font: '18px Arial',
                    fill: '#212121',
                    fillAlpha: 0,
                    fontWeight: 'bold',
                    width: 150,
                    padding: 8,
                    borderWidth: 1,
                    borderColor: '#000',
                    borderRadius: 6,
                    placeHolder: 'Contrasena',
                    textAlign: 'center',
                    type: PhaserInput.InputType.password,
                    zoom: true
                });
                password.focusOutOnEnter = false;
                testHolder = password;

                var submitBtn = game1.add.nineSlice(game1.width / 2 - 50, 300, 'btn', null, 106, 37); //106×37 
                var submit = game1.add.text(game1.width / 2 - 80, 380, '', {
                    font: '18px Arial'
                });
                submitBtn.inputEnabled = true;
                submitBtn.input.useHandCursor = true;
                submitBtn.events.onInputDown.add(function () {					//
                    var usuarioValido = false;
                    Fachada.verificarUsuario(user.value, password.value, function (respuesta) {
                        if (respuesta)
                        {
                            Fachada.loginUsuario(user.value, function (colorAsignado) {
                                console.log(colorAsignado)
                                if (colorAsignado == 0) {
                                    azul = true;
                                } else {
                                    rojo = true;
                                }
                                var imported = document.createElement('script');
                                imported.src = 'estados/game.js';
                                document.head.appendChild(imported);
                                game1.destroy();
                            });

                        } else {
                            game1.add.text(10, 50, 'USUARIO INVALIDO', {
                                font: '18px Arial',
                                fill: '#FF0000',
                                fontWeight: 'bold',
                                textAlign: 'center'
                            });
                        }
                    });
                });

                var botonCreditos = game1.add.nineSlice(game1.width / 2 - 50, 550, 'btn2', null, 106, 37);
                botonCreditos.inputEnabled = true;
                botonCreditos.input.useHandCursor = true;
                botonCreditos.events.onInputDown.add(function () {

                        var win = window.open('/dwr-test/estados/creditos.html', '_blank');
                        win.focus();

                });




                PhaserInput.onKeyboardOpen.add(function () {
                    console.error("keyboard open", PhaserInput.KeyboardOpen);
                });
                PhaserInput.onKeyboardClose.add(function () {
                    console.error("keyboard close", PhaserInput.KeyboardOpen);
                });

            }

        </script>


    </body>
</html>
