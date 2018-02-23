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
    private float x;
    private float y;
    private float rot;
    
    public VOPosicion() {
        this.x = 0;
        this.y = 0;
        this.rot = 0;
    }
    
    public VOPosicion(float x, float y, float rot) {
        this.x = x;
        this.y = y;
        this.rot = rot;
    }

    public float getX() {
        return x;
    }

    public void setX(float x) {
        this.x = x;
    }

    public float getY() {
        return y;
    }

    public void setY(float y) {
        this.y = y;
    }

    public float getRot() {
        return rot;
    }

    public void setRot(float rot) {
        this.rot = rot;
    }
}
