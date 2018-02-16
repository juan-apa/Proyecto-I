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
    private float x_pos_az;
    private float y_pos_az;
    private float rot_az;
    private float x_pos_ro;
    private float y_pos_ro;
    private float rot_ro;
    
    private Fachada() throws ExceptionConfiguracion{
        this.configuraciones = new DAOConfiguraciones();
        this.x_pos_az = 0;
        this.y_pos_az = 0;
        this.rot_az = 0;
        
        this.x_pos_ro = 0;
        this.y_pos_ro = 0;
        this.rot_ro = 0;
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
    
    public void updatePosRojo(float x, float y, float r){
        this.x_pos_ro = x;
        this.y_pos_ro = y;
        this.rot_ro = r;
    }
    
    public void updatePosAzul(float x, float y, float r){
        this.x_pos_az = x;
        this.y_pos_az = y;
        this.rot_az = r;
    }
    
    public float[] getPosRojo(){
        float[] ret = new float[3]; 
        ret[0] = this.x_pos_ro;
        ret[1] = this.y_pos_ro;
        ret[2] = this.rot_ro;
        return ret;
    }
    
    public float[] getPosAzul(){
        float[] ret = new float[3]; 
        ret[0] = this.x_pos_az;
        ret[1] = this.y_pos_az;
        ret[2] = this.rot_az;
        return ret;
    }
}
