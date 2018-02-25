package logica;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 *
 * @author Juan Aparicio
 */
public class Avion extends Vehiculo {

    private boolean vivo;

    /*En este caso el nombre en String es en realidad un numero, que representa
    su posicion en el arreglo en el que se encuentra en JavaScript.*/
    public Avion() {
        this.nombre = "-1";
        this.x = 0;
        this.y = 0;
        this.rot = 0;
        this.vivo = true;
    }

    public Avion(String nombre, double x, double y, double rot) {
        this.nombre = nombre;
        this.x = x;
        this.y = y;
        this.rot = rot;
        this.vivo = true;
    }

    public Avion(String nombre, double x, double y, double rot, boolean vivo) {
        this.nombre = nombre;
        this.x = x;
        this.y = y;
        this.rot = rot;
        this.vivo = vivo;
    }

    Avion(double x, double y, double rot) {
        this.x = x;
        this.y = y;
        this.rot = rot;
        this.vivo = true;
    }

    public boolean isVivo() {
        return vivo;
    }

    public void setVivo(boolean vivo) {
        this.vivo = vivo;
    }
}
