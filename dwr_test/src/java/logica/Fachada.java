/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package logica;

import persistencia.DAOConfiguraciones;
import persistencia.ExceptionConfiguracion;

/**
 *
 * @author Juan Aparicio
 */
public class Fachada {
    private DAOConfiguraciones configuraciones;
    private static Fachada instancia;
    private Posicion[] posicionesAzules;
    private Posicion[] posicionesRojos;
    
    private Fachada() throws ExceptionConfiguracion{
        this.configuraciones = new DAOConfiguraciones();
        
        this.posicionesAzules = new Posicion[4];
        for(int i = 0; i < this.posicionesAzules.length; i++){
            this.posicionesAzules[i] = new Posicion(1,1,1);
        }
        
        this.posicionesRojos = new Posicion[4];
        for(int i = 0; i < this.posicionesRojos.length; i++){
            this.posicionesRojos[i] = new Posicion(1,1,1);
        }
    }
    
    public static Fachada getInstance() throws ExceptionConfiguracion{
        if(Fachada.instancia == null){
            Fachada.instancia = new Fachada();
        }
        return Fachada.instancia;
    }
    
    public int obtenerMAX_BALAS() throws ExceptionConfiguracion {
        return this.configuraciones.obtenerMAX_BALAS();
    }
    
    public void updatePosRojo(VOPosicion[] vop){
        for(int i = 0; i < vop.length; i++){
            this.posicionesRojos[i].setX(vop[i].getX());
            this.posicionesRojos[i].setY(vop[i].getY());
            this.posicionesRojos[i].setRot(vop[i].getRot());
        }
    }
    
    public void updatePosAzul(VOPosicion[] vop){
        for(int i = 0; i < vop.length; i++){
            this.posicionesAzules[i].setX(vop[i].getX());
            this.posicionesAzules[i].setY(vop[i].getY());
            this.posicionesAzules[i].setRot(vop[i].getRot());
        }
    }
    
    public VOPosicion[] getPosRojo(){
        VOPosicion[] ret = new VOPosicion[this.posicionesRojos.length];
        for(int i = 0; i < this.posicionesRojos.length; i++){
            ret[i] = new VOPosicion(this.posicionesRojos[i].getX(), this.posicionesRojos[i].getY(), this.posicionesRojos[i].getRot());
        }
        return ret;
    }
    
    public VOPosicion[] getPosAzul(){
        VOPosicion[] ret = new VOPosicion[this.posicionesAzules.length];
        for(int i = 0; i < this.posicionesAzules.length; i++){
            ret[i] = new VOPosicion(this.posicionesAzules[i].getX(), this.posicionesAzules[i].getY(), this.posicionesAzules[i].getRot());
        }
        return ret;
    }
    
    public void test(VOPosicion[] vop){
        for(int i = 0; i < vop.length; i++){
            this.posicionesRojos[i].setX(vop[i].getX());
            this.posicionesRojos[i].setY(vop[i].getY());
            this.posicionesRojos[i].setRot(vop[i].getRot());
        }
    }
}
