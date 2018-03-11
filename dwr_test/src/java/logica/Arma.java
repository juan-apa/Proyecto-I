/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package logica;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * 
 * @author Sammy Guergachi <sguergachi at gmail.com>
 */
@Entity
public class Arma implements Serializable{
    @Id
    @GeneratedValue
    private Long id;
    
    public final static int MUNICION_METRALLETA = 1;
    public final static int MUNICION_TORPEDO = 2;
    public final static int MUNICION_BOMBA = 3;
    
    private int tipoMunicion;

    public Arma() {
        this.tipoMunicion = MUNICION_METRALLETA;
    }
    
    Arma(int tipoMunicion) {
        this.tipoMunicion = tipoMunicion;
    }
    
    public int getTipoMunicion(){
        return this.tipoMunicion;
    }
    
    public void setTipoMunicion(int tipoMunicion){
        this.tipoMunicion = tipoMunicion;
    }
}
