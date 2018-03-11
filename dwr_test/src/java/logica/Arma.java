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
public class Arma{
    
    public final static int MUNICION_METRALLETA = 1;
    public final static int MUNICION_TORPEDO = 2;
    public final static int MUNICION_BOMBA = 3;
    public final static int BALAS_METRALLETA = 10;
    public final static int BALAS_TORPEDO = 1;
    public final static int BALAS_BOMBA = 1;
    
    
    private int tipoMunicion;
    private int municion;

    public Arma() {
        this.tipoMunicion = MUNICION_METRALLETA;
        this.municion = BALAS_METRALLETA;
    }
    
    Arma(int tipoMunicion) {
        this.tipoMunicion = tipoMunicion;
    }
    
    public int getTipoMunicion(){
        return this.tipoMunicion;
    }
    
    public void setTipoMunicion(int tipoMunicion){
        this.tipoMunicion = tipoMunicion;
//        switch(tipoMunicion){
//            case MUNICION_METRALLETA:
//                this.municion = BALAS_METRALLETA;
//                break;
//            case MUNICION_TORPEDO:
//                this.municion = BALAS_TORPEDO;
//                break;
//            case MUNICION_BOMBA:
//                this.municion = BALAS_BOMBA;
//                break;
//        }
    }

    public int getMunicion() {
        return municion;
    }

    public void setMunicion(int municion) {
        this.municion = municion;
    }
    
}
