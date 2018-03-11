/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package logica;

import java.io.Serializable;
import java.util.Random;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * 
 * @author Sammy Guergachi <sguergachi at gmail.com>
 */

public class Equipo implements Serializable{
    @Id
    @GeneratedValue
    private Long id;
    
    private int puntaje;
    private Aviones aviones;
    private Barco barco;
    private int color;

    public Equipo(int puntaje, int color) {
        this.puntaje = puntaje;
        this.aviones = new Aviones(4);
        Random r = new Random();
        int x_minimo = 200;
        int x_maximo = 600;
        int x = r.nextInt(x_maximo - x_minimo);
        
        int y_minimo = 200;
        int y_maximo = 800;
        int y = r.nextInt(y_maximo - y_minimo);
        this.barco = new Barco("azul", x, y, 0);
        this.color = color;
    }

    public Equipo() {
        this.puntaje = 0;
        this.aviones = new Aviones(4);
        Random r = new Random();
        int x_minimo = 200;
        int x_maximo = 600;
        int x = r.nextInt(x_maximo - x_minimo);
        
        int y_minimo = 200;
        int y_maximo = 800;
        int y = r.nextInt(y_maximo - y_minimo);
        this.barco = new Barco("azul", x, y, 0);
        this.color = Equipos.EQUIPO_AZUL;
    }
    
    public Equipo(int equipo) {
        this.puntaje = 0;
        this.aviones = new Aviones(4);
        Random r = new Random();
        int x_minimo = 200;
        int x_maximo = 600;
        int y_minimo = 200;
        int y_maximo = 800;
        
        if(equipo == Equipos.EQUIPO_AZUL){
            x_minimo = 200;
            x_maximo = 600;
            y_minimo = 200;
            y_maximo = 800;
        }
        if(equipo == Equipos.EQUIPO_ROJO){
            x_minimo = 1800;
            x_maximo = 2200;
            y_minimo = 200;
            y_maximo = 800;
        }
        
        int x = r.nextInt(x_maximo - x_minimo);
        int y = r.nextInt(y_maximo - y_minimo);
        
        if(equipo == Equipos.EQUIPO_AZUL){
            this.barco = new Barco("azul", x, y, 0);
        }
        if(equipo == Equipos.EQUIPO_ROJO){
            this.barco = new Barco("rojo", x, y, 0);
        }
        this.color = equipo;
        
        for(int i = 0; i < this.aviones.cantidadAviones(); i++){
            Avion aux = this.aviones.obtenerAvion(i);
            this.barco.aterrizajeAvion(aux);
        }
    }

    public int getPuntaje() {
        return puntaje;
    }

    public void setPuntaje(int puntaje) {
        this.puntaje = puntaje;
    }

    public Aviones getAviones() {
        return aviones;
    }

    public void setAviones(Aviones aviones) {
        this.aviones = aviones;
    }

    public Barco getBarco() {
        return barco;
    }

    public void setBarco(Barco barco) {
        this.barco = barco;
    }

    public int getColor() {
        return color;
    }

    public void setColor(int color) {
        this.color = color;
    }
    
    public VOEstado getEstado(){
        VOEstado estado = new VOEstado(
                this.aviones.obtenerAvionesVivos(), 
                this.aviones.xAviones(),
                this.aviones.yAviones(),
                this.aviones.rotAviones(),
                this.aviones.velAviones(),
                this.aviones.municionesAviones(),
                this.barco.getX(),
                this.barco.getY(),
                this.barco.getRot(),
                this.barco.getVelocidad(),
                this.barco.isVivo(),
                this.barco.getAviones().obtenerAvionesVivos(),
                this.aviones.alturas(),
                this.aviones.getCombustibles()
        );
        
        return estado;
    }
}
