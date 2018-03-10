/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package persistencia;

/**
 *
 * @author Maxi
 */
public class ExcepcionDAOPartida extends Exception{
    public static final int ERROR_CONEXION = 0;
    public static final int ERROR_INSERT = 1;
    public static final int ERROR_FIND = 2;
    
    private static final String[] MENSAJES_ERROR = {
        "Error conexión con base de datos",
        "Error al insertar en la base de datos",
        "Error al obtener la partida de la base de datos"
    };

    public ExcepcionDAOPartida() {
    }
    
    public ExcepcionDAOPartida(int error){
//        String mensaje = MENSAJES_ERROR[error];
        super(ExcepcionDAOPartida.MENSAJES_ERROR[error]);
    }
    
}
