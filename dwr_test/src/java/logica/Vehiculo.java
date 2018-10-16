/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package logica;

/**
 *
 * @author pc-61
 */
public abstract class Vehiculo {
    protected double x;
    protected double y;
    protected double rot;
    protected String nombre;

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getRot() {
        return rot;
    }

    public void setRot(double rot) {
        this.rot = rot;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public void updatePosicion(double x, double y, double rot){
        this.x = x;
        this.y = y;
        this.rot = rot;
    }
    
    public VOPosicion getPosicion(){
        return new VOPosicion(x, y, rot);
    }
}
