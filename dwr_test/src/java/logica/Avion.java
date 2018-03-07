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
    public static final int ALTURA_BAJA = 0;
    public static final int ALTURA_ALTA = 1;
    public static final int MAX_COMBUSTIBLE = 20;
    
    private boolean vivo;
    private int combustible;
    private Arma arma;
    private int velocidad = 100;
    private boolean aterrizado = false;
    private int altura;
    
    /*En este caso el nombre en String es en realidad un numero, que representa
    su posicion en el arreglo en el que se encuentra en JavaScript.*/
    public Avion() {
        this.nombre = "-1";
        this.x = 0;
        this.y = 0;
        this.rot = 0;
        this.vivo = true;
        this.arma = new Arma(Arma.MUNICION_BOMBA);
        this.altura = Avion.ALTURA_BAJA;
        this.combustible = MAX_COMBUSTIBLE;
    }

    public Avion(String nombre, double x, double y, double rot) {
        this.nombre = nombre;
        this.x = x;
        this.y = y;
        this.rot = rot;
        this.vivo = true;
        this.arma = new Arma(Arma.MUNICION_METRALLETA);
        this.altura = Avion.ALTURA_BAJA;
        this.combustible = MAX_COMBUSTIBLE;
    }
    
    public Avion(String nombre, double x, double y, double rot, Arma arma) {
        this.nombre = nombre;
        this.x = x;
        this.y = y;
        this.rot = rot;
        this.vivo = true;
        this.arma = arma;
        this.altura = Avion.ALTURA_BAJA;
        this.combustible = MAX_COMBUSTIBLE;
    }

    public Avion(String nombre, double x, double y, double rot, boolean vivo) {
        this.nombre = nombre;
        this.x = x;
        this.y = y;
        this.rot = rot;
        this.vivo = vivo;
        this.arma = new Arma(Arma.MUNICION_METRALLETA);
        this.altura = Avion.ALTURA_BAJA;
        this.combustible = MAX_COMBUSTIBLE;
    }

    public Avion(double x, double y, double rot) {
        this.x = x;
        this.y = y;
        this.rot = rot;
        this.vivo = true;
        this.arma = new Arma(Arma.MUNICION_METRALLETA);
        this.altura = Avion.ALTURA_BAJA;
        this.combustible = MAX_COMBUSTIBLE;
    }
    
    public Avion(double x, double y, double rot, int altura) {
        this.x = x;
        this.y = y;
        this.rot = rot;
        this.vivo = true;
        this.arma = new Arma(Arma.MUNICION_METRALLETA);
        this.altura = altura;
        this.combustible = MAX_COMBUSTIBLE;
    }

    public boolean isVivo() {
        return vivo;
    }

    public void setVivo(boolean vivo) {
        this.vivo = vivo;
    }
    
    public void destruir(){
        this.x = Double.NaN;
        this.y = Double.NaN;
        this.rot = Double.NaN;
        this.vivo = false;
    }
    
    public int getComustible(){
        return this.combustible;
    }
    
    public void setCombustible(int combustible){
        this.combustible = combustible;
    }
    
    public Arma getArma(){
        return this.arma;
    }

    public int getVelocidad() {
        return velocidad;
    }

    public void setVelocidad(int velocidad) {
        this.velocidad = velocidad;
    }

    public boolean isAterrizado() {
        return aterrizado;
    }

    public void setAterrizado(boolean aterrizado) {
        this.aterrizado = aterrizado;
    }
    
    public int getAltura(){
        return this.altura;
    }
    
    public void setAltura(int altura){
        this.altura = altura;
    }

    void recargarCombustible() {
        this.combustible = MAX_COMBUSTIBLE;
    }
}
