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
            if(this.aviones[i].isVivo()){
                ret[i] = this.aviones[i].getPosicion();
            }
            else{
                ret[i] = null;
            }
        }
        return ret;
    }
    
    public void updatePosiciones(VOPosicion[] vop){
        for(int i = 0; i < this.cantAviones; i++){
            if(this.aviones[i].isVivo()){
                this.aviones[i].updatePosicion(vop[i].getX(), vop[i].getY(), vop[i].getRot());
            }
            else{
                this.aviones[i].updatePosicion(Double.NaN, Double.NaN, Double.NaN);
            }
        }
    }
    
    public int largo(){
        return this.aviones.length;
    }
    
    /*Acá el nombre en realidad es un número que es el indice del arreglo.*/
    public void destruirAvion(String nombre){
        int i = Integer.parseInt(nombre);
        this.aviones[i].destruir();
    }
    
    public boolean[] obtenerAvionesVivos(){
        boolean[] ret = new boolean[this.aviones.length];
        for(int i = 0; i < this.aviones.length; i++){
            ret[i] = this.aviones[i].isVivo();
        }
        return ret;
    }
    
    public void updateCombustible(int[] combustibles){
        for(int i = 0; i < this.aviones.length; i++){
            this.aviones[i].setCombustible(combustibles[i]);
        }
    }
}
