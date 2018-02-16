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
public class DAOAviones {
    private Avion[] aviones;
    private final int TAM = 3;

    public DAOAviones() {
        this.aviones = new Avion[this.TAM];
        for(int i = 0; i < this.TAM; i++){
            this.aviones[i] = new Avion();
        }
    }
    
    public Avion getAvion(int i){
        return this.aviones[i];
    }
    
    public Avion[] getAviones(){
        return this.aviones;
    }
    
    
}
