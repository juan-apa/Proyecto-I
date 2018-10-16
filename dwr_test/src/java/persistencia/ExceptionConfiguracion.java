/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package persistencia;

/**
 *
 * @author Juan Aparicio
 */
public class ExceptionConfiguracion extends Exception{
    
    public static final int ERROR_OBTENER_CONFIGURACIONES = 0;
    
    private static final String[] MENSAJES_ERROR = {
        "Error al obtener las configuraciones de la bdd."
    };

    public ExceptionConfiguracion() {
    }
    
    public ExceptionConfiguracion(int error){
//        String mensaje = MENSAJES_ERROR[error];
        super(ExceptionConfiguracion.MENSAJES_ERROR[error]);
    }

    public ExceptionConfiguracion(String string) {
        super(string);
    }

    public ExceptionConfiguracion(String string, Throwable thrwbl) {
        super(string, thrwbl);
    }
    
}
