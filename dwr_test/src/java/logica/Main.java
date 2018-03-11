/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package logica;

import java.util.logging.Level;
import java.util.logging.Logger;
//import persistencia.DAOPartida;
import persistencia.ExcepcionDAOPartida;
import persistencia.ExceptionConfiguracion;

/**
 *
 * @author Juan Aparicio
 */
public class Main {
    public static void main(String[] args) {
        try {
            Equipos e = new Equipos();
            System.out.println("LLEGUEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
            Fachada f = Fachada.getInstance();
            f.guardarPartida();

        } catch (ExcepcionDAOPartida ex) {
            ex.printStackTrace();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
