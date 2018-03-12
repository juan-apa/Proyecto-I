/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package logica;

import persistencia.Conexion;
import persistencia.ExceptionPersistencia;
import persistencia.Persistencia;

/**
 *
 * @author Juan Aparicio
 */
public class Main {
    public static void main(String[] args) {
        try {
            Partida p = new Partida();
            Conexion c = new Conexion();
            Persistencia per = new Persistencia();
//            per.persistirPartida(p, c);
//            Partida obtenida = per.obtenerPartida(1, c);
            c.cerrarConexion();
            
        } catch (ExceptionPersistencia ex) {
            ex.printStackTrace();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
