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
public class VOPosicion {
    private double x;
    private double y;
    private double rot;
    
    public VOPosicion() {
        this.x = 0;
        this.y = 0;
        this.rot = 0;
    }
    
    public VOPosicion(double x, double y, double rot) {
        this.x = x;
        this.y = y;
        this.rot = rot;
    }

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
}
