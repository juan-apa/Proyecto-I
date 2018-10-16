/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package logica;
/**
 *
 * @author Maxi
 */

public class Partida{
    public final int DIFICULTAD_DIFICL = 0;
    public final int DIFICULTAD_MEDIA = 1;
    public final int DIFICULTAD_FACIL = 2;
    
    private int idPartida;
    private Equipos equipos;
    private int dificultad;
    private int tiempo;
    private String nombreJugador;
    private int colorJugadorGuardado;
    
    public Partida(){
        this.idPartida = 0;
        this.equipos = new Equipos(this.idPartida);
        this.dificultad = DIFICULTAD_FACIL;
        this.tiempo = 90000;
        this.nombreJugador = "";
        this.colorJugadorGuardado = Equipos.EQUIPO_AZUL;
    }

    public String getNombreJugador() {
        return nombreJugador;
    }

    public void setNombreJugador(String nombreJugador) {
        this.nombreJugador = nombreJugador;
    }

    public int getColorJugadorGuardado() {
        return colorJugadorGuardado;
    }

    public void setColorJugadorGuardado(int colorJugadorGuardado) {
        this.colorJugadorGuardado = colorJugadorGuardado;
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
    
    public int getId() {
        return this.idPartida;
    }
    
    public void setId(int id){
        this.idPartida = id;
    }
    
}
