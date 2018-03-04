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
        <title>Prueba Factibilidad</title>
        <script type="text/javascript" src="dwr/engine.js"> </script>
        <script type="text/javascript" src="dwr/util.js"> </script>
        <script type="text/javascript" src="<%=pageContext.getServletContext().getContextPath()  %>/dwr/interface/Fachada.js"></script>
        <script src="phaser.min.js" charset="utf-8"> </script>
        
        <script type="text/javascript">
            var parametros = {
                VIDA_MAX_AVION:400,
                MAX_BALAS:300
            };
            console.log("UNO " + parametros.MAX_BALAS);
            
            
            Fachada.obtenerMAX_BALAS({callback:obtenerMaxBalas});
            
            function obtenerMaxBalas(respuesta){
                console.log(respuesta);
                parametros.MAX_BALAS = respuesta;
                console.log(parametros)
            }
            console.log("TRES " + parametros.MAX_BALAS);
//            dwr.engine.setActiveReverseAjax(true);
        </script>
        
        <script src="VOPosicion.js" charset="utf-8"> </script>
        <script src="Barco.js" charset="utf-8"> </script>
        <script src="Arma.js" charset="utf-8"> </script>
        <script src="Avion.js" charset="utf-8"> </script>
        <script src="Aviones.js" charset="utf-8"> </script>
        <!--<script src="main.js" charset="utf-8"> </script>-->
        
        <script src="estados/boot.js" charset="utf-8"> </script>
        <script src="estados/load.js" charset="utf-8"> </script>
        <script src="estados/menu.js" charset="utf-8"> </script>
        <script src="estados/play.js" charset="utf-8"> </script>
        <script src="estados/game.js" charset="utf-8"> </script>
        
        
        
    </head>
    <body>
        <h1>Hello World!</h1>
    </body>
</html>
