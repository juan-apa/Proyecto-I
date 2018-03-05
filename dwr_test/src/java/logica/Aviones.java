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
    
    public double[] xAviones(){
        double[] ret = new double[this.cantAviones];
        for(int i = 0; i < this.cantAviones; i++){
            if(this.aviones[i].isVivo()){
                ret[i] = this.aviones[i].getX();
            }
            else{
                ret[i] = -1;
            }
        }
        return ret;
    }
    public double[] yAviones(){
        double[] ret = new double[this.cantAviones];
        for(int i = 0; i < this.cantAviones; i++){
            if(this.aviones[i].isVivo()){
                ret[i] = this.aviones[i].getY();
            }
            else{
                ret[i] = -1;
            }
        }
        return ret;
    }
    
    public double[] rotAviones(){
        double[] ret = new double[this.cantAviones];
        for(int i = 0; i < this.cantAviones; i++){
            if(this.aviones[i].isVivo()){
                ret[i] = this.aviones[i].getRot();
            }
            else{
                ret[i] = -1;
            }
        }
        return ret;
    }
    
    public int[] velAviones(){
        int[] ret = new int[this.cantAviones];
        for(int i = 0; i < this.cantAviones; i++){
            if(this.aviones[i].isVivo()){
                ret[i] = this.aviones[i].getVelocidad();
            }
            else{
                ret[i] = -1;
            }
        }
        return ret;
    }
    
    public int[] municionesAviones(){
        int[] ret = new int[this.cantAviones];
        for(int i = 0; i < this.cantAviones; i++){
            if(this.aviones[i].isVivo()){
                ret[i] = this.aviones[i].getArma().getTipoMunicion();
            }
            else{
                ret[i] = -1;
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
    
    public void updateX(double[] pos){
        for(int i = 0; i < this.cantAviones; i++){
            if(this.aviones[i].isVivo()){
                this.aviones[i].setX(pos[i]);
            }
            else{
                this.aviones[i].setX(Double.NaN);
            }
        }
    }
    
    public void updateY(double[] pos){
        for(int i = 0; i < this.cantAviones; i++){
            if(this.aviones[i].isVivo()){
                this.aviones[i].setY(pos[i]);
            }
            else{
                this.aviones[i].setY(Double.NaN);
            }
        }
    }
    
    public void updateRot(double[] pos){
        for(int i = 0; i < this.cantAviones; i++){
            if(this.aviones[i].isVivo()){
                this.aviones[i].setRot(pos[i]);
            }
            else{
                this.aviones[i].setRot(Double.NaN);
            }
        }
    }
    
    public void updateVel(int[] vel){
        for(int i = 0; i < this.cantAviones; i++){
            if(this.aviones[i].isVivo()){
                this.aviones[i].setVelocidad(vel[i]);
            }
            else{
                this.aviones[i].setVelocidad(-1);
            }
        }
    }
    
    public void updateAvionesVivos(boolean[] vivos){
        for(int i = 0; i < this.cantAviones; i++){
            if(!vivos[i]){
                this.aviones[i].destruir();
            }
        }
    }
    
    public void updateMuniciones(int[] municiones){
        for(int i = 0; i < this.cantAviones; i++){
            if(this.aviones[i].isVivo()){
                this.aviones[i].getArma().setTipoMunicion(municiones[i]);
            }
            else{
                this.aviones[i].getArma().setTipoMunicion(-1);
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
            if(this.aviones[i] != null){
                ret[i] = this.aviones[i].isVivo();
            }
        }
        return ret;
    }
    
    public void updateCombustible(int[] combustibles){
        for(int i = 0; i < this.aviones.length; i++){
            this.aviones[i].setCombustible(combustibles[i]);
        }
    }
    
    public int cantidadAviones(){
        int ret = 0;
        for(int i = 0; i < this.aviones.length; i++){
            if(this.aviones[i] != null){
                ret++;
            }
        }
        return ret;
    }
    
    public void insertarAvion(Avion avion, int indice){
        this.aviones[indice] = avion;
    }
    
    public Avion sacarAvion(int indice){
        Avion ret = this.aviones[indice];
        this.aviones[indice] = null;
        return ret;
    }
    
    public Avion popAvion(){
        Avion pop = null;
        int i = this.aviones.length - 1;
        while(pop == null && i >= 0){
            if(this.aviones[i] != null){
                pop = this.aviones[i];
                this.aviones[i] = null;
            }
            i--;
        }
        return pop;
    }
    
    public Avion obtenerAvion(int indice){
        return this.aviones[indice];
    }
    
    public void vaciar(){
        for(int i = 0; i < this.cantAviones; i++){
            this.aviones[i] = null;
        }
    }
}
