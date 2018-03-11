/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package logica;


public class Equipos {
    public static final int CANT_EQUIPOS = 2;
    public static final int EQUIPO_AZUL = 0;
    public static final int EQUIPO_ROJO = 1;
    
    private Equipo equipoAzul;
    private Equipo equipoRojo;
    private int idPartida;
    
    public Equipos(int idPartida) {
        this.idPartida = idPartida;
        this.equipoAzul = new Equipo(EQUIPO_AZUL);
        this.equipoRojo = new Equipo(EQUIPO_ROJO);
    }
    
    public Equipo getEquipoAzul(){
        return this.equipoAzul;
    }
    
    public Equipo getEquipoRojo(){
        return this.equipoRojo;
    }
    
}
