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
public class ExcpetionAviones extends Exception{
    
    public final int ERROR_OBTENER_AVION = 0;
    

    public ExcpetionAviones() {
    }

    public ExcpetionAviones(String string) {
        super(string);
    }
    
}
