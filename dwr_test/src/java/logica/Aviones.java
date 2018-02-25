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
public class Aviones {
    private Avion[] aviones;
    private int cantAviones;
    
    public Aviones(int cantAviones) {
        this.cantAviones = cantAviones;
        this.aviones = new Avion[this.cantAviones];
        for(int i = 0; i < this.cantAviones; i++){
            this.aviones[i] = new Avion();
        }
    }
    
    public VOPosicion[] obtenerPosicionesAviones(){
        VOPosicion[] ret = new VOPosicion[this.cantAviones];
        for(int i = 0; i < this.cantAviones; i++){
            ret[i] = this.aviones[i].getPosicion();
        }
        return ret;
    }
    
    public void updatePosiciones(VOPosicion[] vop){
        for(int i = 0; i < this.cantAviones; i++){
            this.aviones[i].updatePosicion(vop[i].getX(), vop[i].getY(), vop[i].getRot());
        }
    }
    
    public int largo(){
        return this.aviones.length;
    }
}
