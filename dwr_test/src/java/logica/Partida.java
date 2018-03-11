/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package logica;

import java.io.Serializable;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author Maxi
 */

@Entity
@Table(name = "Partida")
public class Partida{
    public final int DIFICULTAD_DIFICL = 0;
    public final int DIFICULTAD_MEDIA = 1;
    public final int DIFICULTAD_FACIL = 2;
    
    @Id
    private int idPartida;
    private Equipos equipos;
    private int dificultad;
    private int tiempo;
    
    public Partida(){
        /*TODO REVISAR EL 0 !!*/
        this.equipos = new Equipos(0);
        this.dificultad = DIFICULTAD_FACIL;
        this.tiempo = 90000;
    }
    
    public void disminuirTiempo(){
        this.tiempo = this.tiempo - 1000;
    }

    public Equipos getEquipos() {
        return equipos;
    }

    public void setEquipos(Equipos equipos) {
        this.equipos = equipos;
    }

    public int getDificultad() {
        return dificultad;
    }

    public void setDificultad(int dificultad) {
        this.dificultad = dificultad;
    }

    public int getTiempo() {
        return tiempo;
    }

    public void setTiempo(int tiempo) {
        this.tiempo = tiempo;
    }
    
//    public Equipo equipoRojo(){
//        return this.equipos.getEquipoRojo();
//    }
//    public Equipo equipoAzul(){
//        return this.equipos.getEquipoRojo();
//    }
    
}
