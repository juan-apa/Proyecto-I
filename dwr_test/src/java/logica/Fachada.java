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
    private int tiempoRestante = 60;
    
    
    private Fachada() throws ExceptionConfiguracion{
        this.configuraciones = new DAOConfiguraciones();
        this.avionesAzules = new Aviones(4);
        this.avionesRojos = new Aviones(4);
        this.barcoAzul = new Barco("Barco Azul", 50, 50, 1);
        this.barcoRojo = new Barco("Barco Rojo", 200, 200, 3);
        for(int i = 0; i < 4; i++){
            String nombre = String.valueOf(i);
            this.avionesAzules.obtenerAvion(i).setNombre(nombre);
            this.avionesRojos.obtenerAvion(i).setNombre(nombre);
            this.aterrizajeAvionAzul(i);
            this.aterrizajeAvionRojo(i);
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
    
        
    public VOEstado getEstadoEquipoAzul(){
        VOEstado estAzul = new VOEstado(
                this.avionesAzules.obtenerAvionesVivos(), 
                this.avionesAzules.xAviones(),
                this.avionesAzules.yAviones(),
                this.avionesAzules.rotAviones(),
                this.avionesAzules.velAviones(),
                this.avionesAzules.municionesAviones(),
                this.barcoAzul.getX(),
                this.barcoAzul.getY(),
                this.barcoAzul.getRot(),
                this.barcoAzul.getVelocidad(),
                this.barcoAzul.isVivo(),
                this.barcoAzul.getAviones().obtenerAvionesVivos(),
                this.avionesAzules.alturas(),
                this.avionesAzules.getCombustibles()
        );
        
        return estAzul;
    }
    
    public VOEstado getEstadoEquipoRojo(){
        VOEstado estRojo = new VOEstado(
                this.avionesRojos.obtenerAvionesVivos(), 
                this.avionesRojos.xAviones(),
                this.avionesRojos.yAviones(),
                this.avionesRojos.rotAviones(),
                this.avionesRojos.velAviones(),
                this.avionesRojos.municionesAviones(),
                this.barcoRojo.getX(),
                this.barcoRojo.getY(),
                this.barcoRojo.getRot(),
                this.barcoRojo.getVelocidad(),
                this.barcoRojo.isVivo(),
                this.barcoRojo.getAviones().obtenerAvionesVivos(),
                this.avionesRojos.alturas(),
                this.avionesRojos.getCombustibles()
        );
        
        return estRojo;
    }
    
    public void updateEstadoAzul(VOEstado vo){
        this.avionesAzules.updateAvionesVivos(vo.getAvionesVivos());
        this.avionesAzules.updateX(vo.getX_aviones());
        this.avionesAzules.updateY(vo.getY_aviones());
        this.avionesAzules.updateRot(vo.getRot_aviones());
        this.avionesAzules.updateVel(vo.getVelocidadAviones());
        this.avionesAzules.updateMuniciones(vo.getMunicionesAviones());
        this.avionesAzules.updateAlturas(vo.getAlturas());
        this.barcoAzul.setX(vo.getX_barco());
        this.barcoAzul.setY(vo.getY_barco());
        this.barcoAzul.setRot(vo.getRot_barco());
        this.barcoAzul.setVelocidad(vo.getVelocidadBarco());
        this.barcoAzul.setVivo(vo.isBarcoVivo());
        this.barcoAzul.getAviones().updateAvionesVivos(vo.getAvionesEnBarco());
    }
    
    public void updateEstadoRojo(VOEstado vo){
        this.avionesRojos.updateAvionesVivos(vo.getAvionesVivos());
        this.avionesRojos.updateX(vo.getX_aviones());
        this.avionesRojos.updateY(vo.getY_aviones());
        this.avionesRojos.updateRot(vo.getRot_aviones());
        this.avionesRojos.updateVel(vo.getVelocidadAviones());
        this.avionesRojos.updateMuniciones(vo.getMunicionesAviones());
        this.avionesRojos.updateAlturas(vo.getAlturas());
        this.barcoRojo.setX(vo.getX_barco());
        this.barcoRojo.setY(vo.getY_barco());
        this.barcoRojo.setRot(vo.getRot_barco());
        this.barcoRojo.setVelocidad(vo.getVelocidadBarco());
        this.barcoRojo.setVivo(vo.isBarcoVivo());
        this.barcoRojo.getAviones().updateAvionesVivos(vo.getAvionesEnBarco());        
    }
    
    public void choque_avion_avion(String nombreAvionAzul, String nombreAvionRojo){
        this.avionesAzules.destruirAvion(nombreAvionAzul);
        this.avionesRojos.destruirAvion(nombreAvionRojo);
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
    
    public void disparo_avion_barco(int equipoObjetivo, String nombreAvion){
        if(equipoObjetivo == EQUIPO_AZUL){
            int numeroAvionQueDisparo = Integer.parseInt(nombreAvion);
            int tipoMunicion = this.avionesRojos.obtenerAvion(numeroAvionQueDisparo).getArma().getTipoMunicion();
            
            if(this.barcoAzul.tieneAviones()){
                if(tipoMunicion == Arma.MUNICION_BOMBA){
                    this.barcoAzul.recibeDisparoConAvionDeBomba();
                }
                else{
                    if(tipoMunicion == Arma.MUNICION_TORPEDO){
                        this.barcoAzul.recibeDisparoSinAviones();
                    }
                }
            }
            else{
                this.barcoAzul.recibeDisparoSinAviones();
            }
        }
        else{
            if(equipoObjetivo == EQUIPO_ROJO){
                int numeroAvionQueDisparo = Integer.parseInt(nombreAvion);
                int tipoMunicion = this.avionesAzules.obtenerAvion(numeroAvionQueDisparo).getArma().getTipoMunicion();

                if(this.barcoRojo.tieneAviones()){
                    if(tipoMunicion == Arma.MUNICION_BOMBA){
                        this.barcoRojo.recibeDisparoConAvionDeBomba();
                    }
                    else{
                        if(tipoMunicion == Arma.MUNICION_TORPEDO){
                            this.barcoRojo.recibeDisparoSinAviones();
                        }
                    }
                }
                else{
                    this.barcoRojo.recibeDisparoSinAviones();
                }
            }
        }
    }
    
    public boolean[] avionesAzulesVivos(){
        return this.avionesAzules.obtenerAvionesVivos();
    }
    
    public boolean[] avionesRojosVivos(){
        return this.avionesRojos.obtenerAvionesVivos();
    }
    
    public void updateCombustibleAzul(int[] combustibles){
        this.avionesAzules.updateCombustible(combustibles);
    }
    
    public void updateCombustibleRojo(int[] combustibles){
        this.avionesRojos.updateCombustible(combustibles);
    }
    public void aterrizajeAvionAzul(int posAvion){
        Avion aux = this.avionesAzules.obtenerAvion(posAvion);
        this.barcoAzul.aterrizajeAvion(aux);
        
        aux = null;
    }
    public void aterrizajeAvionRojo(int posAvion){
        Avion aux = this.avionesRojos.obtenerAvion(posAvion);
        this.barcoRojo.aterrizajeAvion(aux);
        aux = null;
    }
    
    public void despegueAvionAzul(int posAvion){
        this.barcoAzul.despegueAvion(posAvion);
    }
    
    public void despegueAvionRojo(int posAvion){
        this.barcoRojo.despegueAvion(posAvion);
    }
    
    public void cambioAlturaAvion(int equipo, int indiceAvion, int alturaNueva){
        if(equipo == EQUIPO_AZUL){
            this.avionesAzules.obtenerAvion(indiceAvion).setAltura(alturaNueva);
        }
        else{
            if(equipo == EQUIPO_ROJO){
                this.avionesRojos.obtenerAvion(indiceAvion).setAltura(alturaNueva);
            }
        }
    }
    
    public void disminuirCombustibles(){
        this.avionesAzules.disminuirCombustibles();
        this.avionesRojos.disminuirCombustibles();
    }
    
    public void cambiarTipoMunicionAvion(int equipo,int indice, int armaNueva){
         if(equipo == EQUIPO_ROJO){
            this.avionesAzules.obtenerAvion(indice).cambiarTipoArma(armaNueva);
        }
        else{
            if(equipo == EQUIPO_AZUL){
                //
            }
        }
    }
    
}
