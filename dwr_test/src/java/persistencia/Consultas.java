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
public class Consultas {
    public static final String OBTENER_RANGO_METRALLETA = "SELECT rango_metralleta FROM JUEGO.Configuraciones";
    public static final String OBTENER_RANGO_TORPEDO = "SELECT rango_torpedo FROM JUEGO.Configuraciones";
    public static final String OBTENER_MAX_BALAS = "SELECT MAX_BALAS FROM JUEGO.Configuraciones";
}
