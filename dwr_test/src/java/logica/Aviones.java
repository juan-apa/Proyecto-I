/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package logica;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

/**
 *
 * @author Juan Aparicio
 */
@Entity
public class Aviones {
    @Id
    @GeneratedValue
    private Long id;
    
    @OneToMany(cascade = CascadeType.ALL)
    private List<Avion> aviones;
    private int cantAviones;
    
    public Aviones() {
        this.cantAviones = 4;
        this.aviones = new ArrayList<>();
        int random = (int) (Math.floor(Math.random() * 100));
        for(int i = 0; i < this.cantAviones; i++){
            this.aviones.add(new Avion(random, i*150, 0)) ;
            this.aviones.get(i).setNombre(String.valueOf(i));
            this.aviones.get(i).setAterrizado(true);
        }
    }
    
    public Aviones(int cantAviones) {
        this.cantAviones = cantAviones;
        this.aviones = new ArrayList<>();
        int random = (int) (Math.floor(Math.random() * 100));
        for(int i = 0; i < this.cantAviones; i++){
            this.aviones.add(new Avion(random, i*150, 0)) ;
            this.aviones.get(i).setNombre(String.valueOf(i));
            this.aviones.get(i).setAterrizado(true);
        }
    }
    
    public VOPosicion[] obtenerPosicionesAviones(){
        VOPosicion[] ret = new VOPosicion[this.cantAviones];
        for(int i = 0; i < this.cantAviones; i++){
            if(this.aviones.get(i).isVivo()){
                ret[i] = this.aviones.get(i).getPosicion();
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
            if(this.aviones.get(i).isVivo()){
                ret[i] = this.aviones.get(i).getX();
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
            if(this.aviones.get(i).isVivo()){
                ret[i] = this.aviones.get(i).getY();
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
            if(this.aviones.get(i).isVivo()){
                ret[i] = this.aviones.get(i).getRot();
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
            if(this.aviones.get(i).isVivo()){
                ret[i] = this.aviones.get(i).getVelocidad();
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
            if(this.aviones.get(i).isVivo()){
                ret[i] = this.aviones.get(i).getArma().getTipoMunicion();
            }
            else{
                ret[i] = -1;
            }
        }
        return ret;
    }
    
    
    public void updatePosiciones(VOPosicion[] vop){
        for(int i = 0; i < this.cantAviones; i++){
            if(this.aviones.get(i).isVivo()){
                this.aviones.get(i).updatePosicion(vop[i].getX(), vop[i].getY(), vop[i].getRot());
            }
            else{
                this.aviones.get(i).updatePosicion(Double.NaN, Double.NaN, Double.NaN);
            }
        }
    }
    
    public void updateX(double[] pos){
        for(int i = 0; i < this.cantAviones; i++){
            if(this.aviones.get(i).isVivo()){
                this.aviones.get(i).setX(pos[i]);
            }
            else{
                this.aviones.get(i).setX(Double.NaN);
            }
        }
    }
    
    public void updateY(double[] pos){
        for(int i = 0; i < this.cantAviones; i++){
            if(this.aviones.get(i).isVivo()){
                this.aviones.get(i).setY(pos[i]);
            }
            else{
                this.aviones.get(i).setY(Double.NaN);
            }
        }
    }
    
    public void updateRot(double[] pos){
        for(int i = 0; i < this.cantAviones; i++){
            if(this.aviones.get(i).isVivo()){
                this.aviones.get(i).setRot(pos[i]);
            }
            else{
                this.aviones.get(i).setRot(Double.NaN);
            }
        }
    }
    
    public void updateVel(int[] vel){
        for(int i = 0; i < this.cantAviones; i++){
            if(this.aviones.get(i).isVivo()){
                this.aviones.get(i).setVelocidad(vel[i]);
            }
            else{
                this.aviones.get(i).setVelocidad(-1);
            }
        }
    }
    
    public void updateAvionesVivos(boolean[] vivos){
        for(int i = 0; i < this.cantAviones; i++){
            if(!vivos[i]){
                this.aviones.get(i).destruir();
            }
        }
    }
    
    public void updateMuniciones(int[] municiones){
        for(int i = 0; i < this.cantAviones; i++){
            if(this.aviones.get(i).isVivo()){
                this.aviones.get(i).getArma().setTipoMunicion(municiones[i]);
            }
            else{ 
                this.aviones.get(i).getArma().setTipoMunicion(-1);
            }
        }
    }
    
    public int largo(){
        return this.aviones.size();
    }
    
    /*Acá el nombre en realidad es un número que es el indice del arreglo.*/
    public void destruirAvion(String nombre){
        int i = Integer.parseInt(nombre);
        this.aviones.get(i).destruir();
    }
    
    public boolean[] obtenerAvionesVivos(){
        boolean[] ret = new boolean[this.aviones.size()];
        for(int i = 0; i < this.aviones.size(); i++){
            if(this.aviones.get(i) != null){
                ret[i] = this.aviones.get(i).isVivo();
            }
        }
        return ret;
    }
    
    public int[] getCombustibles(){
        int[] ret = new int[this.cantAviones];
        for(int i = 0; i < this.cantAviones; i++){
            ret[i] = this.aviones.get(i).getComustible();
        }
        return ret;
    }
    
    public void updateCombustible(int[] combustibles){
        for(int i = 0; i < this.aviones.size(); i++){
            this.aviones.get(i).setCombustible(combustibles[i]);
        }
    }
    
    public int cantidadAviones(){
        int ret = 0;
        for(int i = 0; i < this.aviones.size(); i++){
            if(this.aviones.get(i) != null){
                ret++;
            }
        }
        return ret;
    }
    
    public void insertarAvion(Avion avion, int indice){
        this.aviones.set(indice, avion);
    }
    
    public Avion sacarAvion(int indice){
        Avion ret = this.aviones.get(indice);
        this.aviones.set(indice, null);
        return ret;
    }
    
    public Avion popAvion(){
        Avion pop = null;
        int i = this.aviones.size() - 1;
        while(pop == null && i >= 0){
            if(this.aviones.get(i) != null){
                pop = this.aviones.get(i);
                this.aviones.set(i, null);
            }
            i--;
        }
        return pop;
    }
    
    public Avion obtenerAvion(int indice){
        return this.aviones.get(indice);
    }
    
    public void vaciar(){
        for(int i = 0; i < this.cantAviones; i++){
            this.aviones.set(i, null);
        }
    }
    
    public int[] alturas(){
        int[] ret = new int[this.cantAviones];
        for(int i = 0; i < this.cantAviones; i++){
            ret[i] = this.aviones.get(i).getAltura();
        }
        return ret;
    }
    
    public void updateAlturas(int[] alturas){
        for(int i = 0; i < this.cantAviones; i++){
            this.aviones.get(i).setAltura(alturas[i]);
        }
    }

    void disminuirCombustibles() {
        for(int i = 0; i < this.cantAviones; i++){
            if(this.aviones.get(i).isVivo() && (!this.aviones.get(i).isAterrizado())){
                int nuevoCombustible = this.aviones.get(i).getComustible() - 1;
                this.aviones.get(i).setCombustible(nuevoCombustible);
                if(nuevoCombustible == 0){
                    this.destruirAvion(String.valueOf(i));
                }
            }
        }
    }
    
}
