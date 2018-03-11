/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package persistencia;

/**
 * 
 * @author Sammy Guergachi <sguergachi at gmail.com>
 */
public class ExceptionPersistencia extends Exception{
    public static final int ERROR_CONEXION = 0;
    public static final int ERROR_INSERT = 1;
    public static final int ERROR_FIND = 2;
    public static final int ERROR_OBTENER_DATOS = 3;
    public static final int ERROR_CERRAR_CONEXION = 4;
    public static final int ERROR_COMMIT = 5;
    public static final int ERROR_ROLLBACK = 6;
    
    
    private static final String[] MENSAJES_ERROR = {
        "Error conexión con base de datos.",
        "Error al insertar en la base de datos.",
        "Error al obtener la partida de la base de datos.",
        "Error al obtener datos de la base de datos",
        "Error al cerrar la conexion con la base de datos.",
        "Error al ejectuar la transaccion a la base de datos.",
        "Error al revertir los cambios en la base de datos."
    };

    public ExceptionPersistencia() {
    }
    
    public ExceptionPersistencia(int error){
        super(MENSAJES_ERROR[error]);
    }   
}
