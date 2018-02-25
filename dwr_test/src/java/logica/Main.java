/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package logica;

import java.util.logging.Level;
import java.util.logging.Logger;
import persistencia.ExceptionConfiguracion;

/**
 *
 * @author Juan Aparicio
 */
public class Main {
    public static void main(String[] args) {
        try {
            Fachada f = Fachada.getInstance();
//            f.obtenerMAX_BALAS();
            VOPosicion[] vops = new VOPosicion[4];
            for(int i = 0; i < vops.length; i++){
                vops[i] = new VOPosicion(0, 0, 0);
            }
            
//            f.updatePosAzul(vops);
            f.getPosAzul();
        } catch (ExceptionConfiguracion ex) {
            ex.printStackTrace();
        }
    }
}
