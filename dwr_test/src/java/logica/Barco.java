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
public class Barco extends Vehiculo{
    private Aviones aviones;
    private final int velMaxima = 100;
    private int velocidad = 100;
    private boolean vivo = true;
    
    public Barco() {
        this.nombre = "-1";
        this.x = 0;
        this.y = 0;
        this.rot = 0;
        this.aviones = new Aviones(4);
        this.aviones.vaciar();
    }
    
    public Barco(String nombre){
        this.nombre = nombre;
        this.x = 0;
        this.y = 0;
        this.rot = 0;
        this.aviones = new Aviones(4);
        this.aviones.vaciar();
    }
    
    public Barco(String nombre, double x, double y, double rot){
        this.nombre = nombre;
        this.x = x;
        this.y = y;
        this.rot = rot;
        this.aviones = new Aviones(4);
        this.aviones.vaciar();
    }
    
    public Barco(String nombre, double x, double y, double rot, Aviones aviones){
        this.nombre = nombre;
        this.x = x;
        this.y = y;
        this.rot = rot;
        this.aviones = aviones;
    }
    
    public boolean tieneAviones(){
        return (this.aviones.cantidadAviones() != 0);
    }
    
    public Aviones getAviones(){
        return this.aviones;
    }

    public void recibeDisparoSinAviones() {
        int fullVel = this.velMaxima;
        int cuartoVel = (int) (this.velMaxima * 0.75);
        int mitadVel = (int) (this.velMaxima * 0.5);
        
        if(this.velocidad == fullVel){
            this.velocidad = cuartoVel;
        }else{
            if(this.velocidad == cuartoVel){
                this.velocidad = mitadVel;
            }
            else{
                if(this.velocidad == mitadVel){
                    this.velocidad = 0;
                }
                else{
                    if(this.velocidad == 0){
                        this.velocidad = 0;
                        this.vivo = false;
                        this.x = Double.NaN;
                        this.y = Double.NaN;
                        this.rot = Double.NaN;
                        this.vivo = false;
                    }
                }
            }
        }
    }
    
    
    public void recibeDisparoConAvionDeBomba(){
        Avion av = this.aviones.popAvion();
        av.destruir();
    }
    public void recibeDisparoSinAvionesDeTorpedo(){
        /*Le saco 1/2 de la velocidad*/
        this.velocidad = this.velocidad - (this.velocidad * (1/4));
        if(this.velocidad <= 0){
            this.x = Double.NaN;
            this.y = Double.NaN;
            this.rot = Double.NaN;
        }
    }

    public int getVelocidad() {
        return velocidad;
    }

    public void setVelocidad(int velocidad) {
        this.velocidad = velocidad;
    }

    public boolean isVivo() {
        return vivo;
    }

    public void setVivo(boolean vivo) {
        this.vivo = vivo;
    }
    
    public void aterrizajeAvion(Avion av){
        av.setAterrizado(true);
        av.recargarCombustible();
        System.out.println(av.getNombre());
        this.aviones.insertarAvion(av, Integer.parseInt(av.getNombre()));
    }
    
    public void despegueAvion(int indice){
        Avion aux = this.aviones.sacarAvion(indice);
        aux.setAterrizado(false);
    }
    
}
