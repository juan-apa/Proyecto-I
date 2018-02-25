/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package logica;

/**
 *
 * @author Juan Aparicio
 */
public class Barco extends Vehiculo{

    public Barco() {
        this.nombre = "-1";
        this.x = 0;
        this.y = 0;
        this.rot = 0;
    }
    
    public Barco(String nombre){
        this.nombre = nombre;
        this.x = 0;
        this.y = 0;
        this.rot = 0;
    }
    
    public Barco(String nombre, double x, double y, double rot){
        this.nombre = nombre;
        this.x = x;
        this.y = y;
        this.rot = rot;
    }
}
