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
    public final static int EQUIPO_AZUL = 0;
    public final static int EQUIPO_ROJO = 1;
    private DAOConfiguraciones configuraciones;
    private static Fachada instancia;
    private Aviones avionesAzules;
    private Aviones avionesRojos;
    private Barco barcoAzul;
    private Barco barcoRojo;
    
    
    private Fachada() throws ExceptionConfiguracion{
        this.configuraciones = new DAOConfiguraciones();
        this.avionesAzules = new Aviones(4);
        this.avionesRojos = new Aviones(4);
        this.barcoAzul = new Barco("Barco Azul", 50, 50, 1);
        this.barcoRojo = new Barco("Barco Rojo", 200, 200, 3);
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
    
    public void updatePosRojo(VOPosicion[] vop, VOPosicion vopBarco){
        /*Actualizo la posicion de los aviones rojos*/
        this.avionesRojos.updatePosiciones(vop);
        
        /*Actualizo la posicion del barco rojo*/
        this.barcoRojo.updatePosicion(vopBarco.getX(), vopBarco.getY(), vopBarco.getRot());
    }
    
    public void updatePosAzul(VOPosicion[] vop, VOPosicion vopBarco){
        /*Actualizo la posicion de los aviones azules*/
        this.avionesAzules.updatePosiciones(vop);
        
        /*Actualizo la posicion del barco azul*/
        this.barcoAzul.updatePosicion(vopBarco.getX(), vopBarco.getY(), vopBarco.getRot());
    }
    
    public VOPosicion[] getPosRojo(){
        /*Hago un arreglo en donde entren las VOPosiciones de los avioens y el 
        barco, por eso es que le sumo 1.*/
        VOPosicion[] ret = new VOPosicion[this.avionesRojos.largo() + 1];
        
        /*Obtengo las posiciones de los aviones rojos.*/
        VOPosicion[] vopAviones = this.avionesRojos.obtenerPosicionesAviones();
        
        /*Obtengo las posiciones del barco en un VOPosiciones.*/
        VOPosicion vopBarco = this.barcoRojo.getPosicion();
        
        /*Junto los vop de los aviones y el barco en la variable ret.*/
        System.arraycopy(vopAviones, 0, ret, 0, vopAviones.length);
        ret[ret.length-1] = vopBarco;
        
        return ret;
    }
    
    public VOPosicion[] getPosAzul(){
        /*Hago un arreglo en donde entren las VOPosiciones de los avioens y el 
        barco, por eso es que le sumo 1.*/
        VOPosicion[] ret = new VOPosicion[this.avionesAzules.largo() + 1];
        
        /*Obtengo las posiciones de los aviones rojos.*/
        VOPosicion[] vopAviones = this.avionesAzules.obtenerPosicionesAviones();
        
        /*Obtengo las posiciones del barco en un VOPosiciones.*/
        VOPosicion vopBarco = this.barcoAzul.getPosicion();
        
        /*Junto los vop de los aviones y el barco en la variable ret.*/
        System.arraycopy(vopAviones, 0, ret, 0, vopAviones.length);
        ret[ret.length-1] = vopBarco;
        
        return ret;
    }
    
    /**
     * @param equipoObjetivo
     * es el equipo al cual le dispararon un avion.
     * 
     * @param nombreAvionObjetivo 
     * es un String cuyos valores pueden ser: "0", "1", "2", "3", el cual es el 
     * índice del arreglo dentro de Aviones.*/
    public void disparo_avion_avion(int equipoObjetivo, String nombreAvionObjetivo){
        if(equipoObjetivo == EQUIPO_AZUL){
            this.avionesAzules.destruirAvion(nombreAvionObjetivo);
        }
        else{
            if(equipoObjetivo == EQUIPO_ROJO){
                this.avionesRojos.destruirAvion(nombreAvionObjetivo);
            }
        }
    }
    
    public boolean[] avionesAzulesVivos(){
        return this.avionesAzules.obtenerAvionesVivos();
    }
    
    public boolean[] avionesRojosVivos(){
        return this.avionesRojos.obtenerAvionesVivos();
    }
}
