/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package logica;

/**
 *
 * @author Sammy Guergachi <sguergachi at gmail.com>
 */
public class VOEstado {

    private boolean[] avionesVivos;
    private double[] x_aviones;
    private double[] y_aviones;
    private double[] rot_aviones;
    private int[] velocidadAviones;
    private int[] municionesAviones;
    private double x_barco;
    private double y_barco;
    private double rot_barco;
    private int velocidadBarco;
    private boolean barcoVivo;
    private boolean[] avionesEnBarco;
    private int[] alturas;
    private int[] combustibles;

    public VOEstado(boolean[] avionesVivos, double[] x_aviones, double[] y_aviones, double[] rot_aviones, int[] velocidadAviones, int[] municionesAviones, double x_barco, double y_barco, double rot_barco, int velocidadBarco, boolean barcoVivo, boolean[] avionesEnBarco, int[] alturas, int[] combustibles) {
        this.avionesVivos = avionesVivos;
        this.x_aviones = x_aviones;
        this.y_aviones = y_aviones;
        this.rot_aviones = rot_aviones;
        this.velocidadAviones = velocidadAviones;
        this.municionesAviones = municionesAviones;
        this.x_barco = x_barco;
        this.y_barco = y_barco;
        this.rot_barco = rot_barco;
        this.velocidadBarco = velocidadBarco;
        this.barcoVivo = barcoVivo;
        this.avionesEnBarco = avionesEnBarco;
        this.alturas = alturas;
        this.combustibles = combustibles;
    }

    public boolean[] getAvionesVivos() {
        return avionesVivos;
    }

    public void setAvionesVivos(boolean[] avionesVivos) {
        this.avionesVivos = avionesVivos;
    }

    public double[] getX_aviones() {
        return x_aviones;
    }

    public void setX_aviones(double[] x_aviones) {
        this.x_aviones = x_aviones;
    }

    public double[] getY_aviones() {
        return y_aviones;
    }

    public void setY_aviones(double[] y_aviones) {
        this.y_aviones = y_aviones;
    }

    public double[] getRot_aviones() {
        return rot_aviones;
    }

    public void setRot_aviones(double[] rot_aviones) {
        this.rot_aviones = rot_aviones;
    }

    public int[] getVelocidadAviones() {
        return velocidadAviones;
    }

    public void setVelocidadAviones(int[] velocidadAviones) {
        this.velocidadAviones = velocidadAviones;
    }

    public int[] getMunicionesAviones() {
        return municionesAviones;
    }

    public void setMunicionesAviones(int[] municionesAviones) {
        this.municionesAviones = municionesAviones;
    }

    public double getX_barco() {
        return x_barco;
    }

    public void setX_barco(double x_barco) {
        this.x_barco = x_barco;
    }

    public double getY_barco() {
        return y_barco;
    }

    public void setY_barco(double y_barco) {
        this.y_barco = y_barco;
    }

    public double getRot_barco() {
        return rot_barco;
    }

    public void setRot_barco(double rot_barco) {
        this.rot_barco = rot_barco;
    }

    public int getVelocidadBarco() {
        return velocidadBarco;
    }

    public void setVelocidadBarco(int velocidadBarco) {
        this.velocidadBarco = velocidadBarco;
    }

    public boolean isBarcoVivo() {
        return barcoVivo;
    }

    public void setBarcoVivo(boolean barcoVivo) {
        this.barcoVivo = barcoVivo;
    }

    public boolean[] getAvionesEnBarco() {
        return avionesEnBarco;
    }

    public void setAvionesEnBarco(boolean[] avionesEnBarco) {
        this.avionesEnBarco = avionesEnBarco;
    }

    public int[] getAlturas() {
        return this.alturas;
    }

    public void setAlturas(int[] alturas) {
        this.alturas = alturas;
    }

    public int[] getCombustibles() {
        return this.combustibles;
    }

    public void setCombustibles(int[] combustibles) {
        this.combustibles = combustibles;
    }
}
