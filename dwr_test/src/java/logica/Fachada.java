/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package logica;

import java.util.logging.Level;
import java.util.logging.Logger;
import persistencia.Conexion;
import persistencia.ExceptionConfiguracion;
import persistencia.ExceptionPersistencia;
import persistencia.Persistencia;

/**
 *
 * @author Juan Aparicio
 */
public class Fachada {

    private static Fachada instancia;

    private Persistencia persistenceManager;
    private Conexion conexionBDD;

    private Jugador jAzul;
    private Jugador jRojo;
    private boolean jAzulListo;
    private boolean jRojoListo;
    private Partida partida;

    private Fachada() throws ExceptionPersistencia {
        this.partida = new Partida();
        this.conexionBDD = new Conexion();
        this.persistenceManager = new Persistencia();
        this.jAzul = new Jugador();
        this.jRojo = new Jugador();
        this.jAzulListo = false;
        this.jRojoListo = false;
    }

    public static Fachada getInstance() throws ExceptionConfiguracion, Exception {
        if (Fachada.instancia == null) {
            Fachada.instancia = new Fachada();
        }
        return Fachada.instancia;
    }

    public void updatePosRojo(VOPosicion[] vop, VOPosicion vopBarco) {

        this.partida.getEquipos().getEquipoRojo().getAviones().updatePosiciones(vop);
        this.partida.getEquipos().getEquipoRojo().getBarco().updatePosicion(vopBarco.getX(), vopBarco.getY(), vopBarco.getRot());
    }

    public void updatePosAzul(VOPosicion[] vop, VOPosicion vopBarco) {
        this.partida.getEquipos().getEquipoAzul().getAviones().updatePosiciones(vop);
        this.partida.getEquipos().getEquipoAzul().getBarco().updatePosicion(vopBarco.getX(), vopBarco.getY(), vopBarco.getRot());
    }

    public VOEstado getEstadoEquipoAzul() {
        return this.partida.getEquipos().getEquipoAzul().getEstado();
    }

    public VOEstado getEstadoEquipoRojo() {
        return this.partida.getEquipos().getEquipoRojo().getEstado();
    }
//    public void updateEstadoAzul(VOEstado vo){
//        this.avionesAzules.updateAvionesVivos(vo.getAvionesVivos());
//        this.avionesAzules.updateX(vo.getX_aviones());
//        this.avionesAzules.updateY(vo.getY_aviones());
//        this.avionesAzules.updateRot(vo.getRot_aviones());
//        this.avionesAzules.updateVel(vo.getVelocidadAviones());
//        this.avionesAzules.updateMuniciones(vo.getMunicionesAviones());
//        this.avionesAzules.updateAlturas(vo.getAlturas());
//        this.barcoAzul.setX(vo.getX_barco());
//        this.barcoAzul.setY(vo.getY_barco());
//        this.barcoAzul.setRot(vo.getRot_barco());
//        this.barcoAzul.setVelocidad(vo.getVelocidadBarco());
//        this.barcoAzul.setVivo(vo.isBarcoVivo());
//        this.barcoAzul.getAviones().updateAvionesVivos(vo.getAvionesEnBarco());
//    }
//    
//    public void updateEstadoRojo(VOEstado vo){
//        this.avionesRojos.updateAvionesVivos(vo.getAvionesVivos());
//        this.avionesRojos.updateX(vo.getX_aviones());
//        this.avionesRojos.updateY(vo.getY_aviones());
//        this.avionesRojos.updateRot(vo.getRot_aviones());
//        this.avionesRojos.updateVel(vo.getVelocidadAviones());
//        this.avionesRojos.updateMuniciones(vo.getMunicionesAviones());
//        this.avionesRojos.updateAlturas(vo.getAlturas());
//        this.barcoRojo.setX(vo.getX_barco());
//        this.barcoRojo.setY(vo.getY_barco());
//        this.barcoRojo.setRot(vo.getRot_barco());
//        this.barcoRojo.setVelocidad(vo.getVelocidadBarco());
//        this.barcoRojo.setVivo(vo.isBarcoVivo());
//        this.barcoRojo.getAviones().updateAvionesVivos(vo.getAvionesEnBarco());        
//    }

    public void choque_avion_avion(String nombreAvionAzul, String nombreAvionRojo) {
        this.partida.getEquipos().getEquipoAzul().getAviones().destruirAvion(nombreAvionAzul);
        this.partida.getEquipos().getEquipoRojo().getAviones().destruirAvion(nombreAvionRojo);
    }

    /**
     * x
     *
     * @param equipoObjetivo es el equipo al cual le dispararon un avion.
     *
     * @param nombreAvionObjetivo es un String cuyos valores pueden ser: "0",
     * "1", "2", "3", el cual es el índice del arreglo dentro de Aviones.
     */
    public void disparo_avion_avion(int equipoObjetivo, String nombreAvionObjetivo) {
        if (equipoObjetivo == Equipos.EQUIPO_AZUL) {
            this.partida.getEquipos().getEquipoAzul().getAviones().destruirAvion(nombreAvionObjetivo);
        } else {
            if (equipoObjetivo == Equipos.EQUIPO_ROJO) {
                this.partida.getEquipos().getEquipoRojo().getAviones().destruirAvion(nombreAvionObjetivo);
            }
        }
    }

    public void disparo_avion_barco(int equipoObjetivo, String nombreAvion) {
        if (equipoObjetivo == Equipos.EQUIPO_AZUL) {
            int numeroAvionQueDisparo = Integer.parseInt(nombreAvion);
            int tipoMunicion = this.partida.getEquipos().getEquipoRojo().getAviones().obtenerAvion(numeroAvionQueDisparo).getArma().getTipoMunicion();

            if (this.partida.getEquipos().getEquipoAzul().getBarco().tieneAviones()) {
                if (tipoMunicion == Arma.MUNICION_BOMBA) {
                    this.partida.getEquipos().getEquipoAzul().getBarco().recibeDisparoConAvionDeBomba();
                } else {
                    if (tipoMunicion == Arma.MUNICION_TORPEDO) {
                        this.partida.getEquipos().getEquipoAzul().getBarco().recibeDisparoSinAviones();
                    }
                }
            } else {
                this.partida.getEquipos().getEquipoAzul().getBarco().recibeDisparoSinAviones();
            }
        } else {
            if (equipoObjetivo == Equipos.EQUIPO_ROJO) {
                int numeroAvionQueDisparo = Integer.parseInt(nombreAvion);
                int tipoMunicion = this.partida.getEquipos().getEquipoAzul().getAviones().obtenerAvion(numeroAvionQueDisparo).getArma().getTipoMunicion();

                if (this.partida.getEquipos().getEquipoRojo().getBarco().tieneAviones()) {
                    if (tipoMunicion == Arma.MUNICION_BOMBA) {
                        this.partida.getEquipos().getEquipoRojo().getBarco().recibeDisparoConAvionDeBomba();
                    } else {
                        if (tipoMunicion == Arma.MUNICION_TORPEDO) {
                            this.partida.getEquipos().getEquipoRojo().getBarco().recibeDisparoSinAviones();
                        }
                    }
                } else {
                    this.partida.getEquipos().getEquipoRojo().getBarco().recibeDisparoSinAviones();
                }
            }
        }
    }

    public boolean[] avionesAzulesVivos() {
        return this.partida.getEquipos().getEquipoAzul().getAviones().obtenerAvionesVivos();
    }

    public boolean[] avionesRojosVivos() {
        return this.partida.getEquipos().getEquipoRojo().getAviones().obtenerAvionesVivos();
    }

    public void updateCombustibleAzul(int[] combustibles) {
        this.partida.getEquipos().getEquipoAzul().getAviones().updateCombustible(combustibles);
    }

    public void updateCombustibleRojo(int[] combustibles) {
        this.partida.getEquipos().getEquipoAzul().getAviones().updateCombustible(combustibles);
    }

    public void aterrizajeAvionAzul(int posAvion) {
        Avion aux = this.partida.getEquipos().getEquipoAzul().getAviones().obtenerAvion(posAvion);
        this.partida.getEquipos().getEquipoAzul().getBarco().aterrizajeAvion(aux);
        aux = null;
    }

    public void aterrizajeAvionRojo(int posAvion) {
        Avion aux = this.partida.getEquipos().getEquipoRojo().getAviones().obtenerAvion(posAvion);
        this.partida.getEquipos().getEquipoRojo().getBarco().aterrizajeAvion(aux);
        aux = null;
    }

    public void despegueAvionAzul(int posAvion) {
        this.partida.getEquipos().getEquipoAzul().getBarco().despegueAvion(posAvion);
    }

    public void despegueAvionRojo(int posAvion) {
        this.partida.getEquipos().getEquipoRojo().getBarco().despegueAvion(posAvion);
    }

    public void cambioAlturaAvion(int equipo, int indiceAvion, int alturaNueva) {
        if (equipo == Equipos.EQUIPO_AZUL) {
            this.partida.getEquipos().getEquipoAzul().getAviones().obtenerAvion(indiceAvion).setAltura(alturaNueva);
        } else {
            if (equipo == Equipos.EQUIPO_ROJO) {
                this.partida.getEquipos().getEquipoRojo().getAviones().obtenerAvion(indiceAvion).setAltura(alturaNueva);
            }
        }
    }

    public void disminuirCombustibles() {
        this.partida.getEquipos().getEquipoAzul().getAviones().disminuirCombustibles();
        this.partida.getEquipos().getEquipoRojo().getAviones().disminuirCombustibles();
    }

    public void cambiarTipoMunicionAvion(int equipo, int indice, int armaNueva) {
        if (equipo == Equipos.EQUIPO_ROJO) {
            this.partida.getEquipos().getEquipoRojo().getAviones().obtenerAvion(indice).cambiarTipoArma(armaNueva);
        } else {
            if (equipo == Equipos.EQUIPO_AZUL) {
                this.partida.getEquipos().getEquipoAzul().getAviones().obtenerAvion(indice).cambiarTipoArma(armaNueva);
            }
        }
    }

    public void guardarPartida(boolean azul, boolean rojo) throws ExceptionPersistencia {
        try {
            if (azul == true) {
                persistenceManager.persistirPartida(partida, jAzul.getNombre(), Equipos.EQUIPO_AZUL, conexionBDD);
            } else {
                persistenceManager.persistirPartida(partida, jRojo.getNombre(), Equipos.EQUIPO_ROJO, conexionBDD);
            }
//            persistenceManager.persistirPartida(partida, conexionBDD);
            conexionBDD.liberarConexionExitosa();
        } catch (ExceptionPersistencia ex) {
            conexionBDD.liberarConexionFallida();
            throw ex;
        }
    }

    public void cargarPartida() throws ExceptionPersistencia {
        try {
            this.partida = persistenceManager.obtenerPartida(conexionBDD);
            conexionBDD.liberarConexionExitosa();
        } catch (ExceptionPersistencia ex) {
            conexionBDD.liberarConexionFallida();
            throw ex;
        }
    }

    public void nuevaPartida() {
        this.partida = new Partida();
        this.jAzulListo = false;
        this.jRojoListo = false;
    }

    public boolean verificarUsuario(String nomUser, String passUser) throws ExceptionPersistencia {
        boolean ret;
        try {
            ret = persistenceManager.usuarioValido(nomUser, passUser, conexionBDD);
        } catch (ExceptionPersistencia ex) {
            conexionBDD.liberarConexionFallida();
            throw ex;
        }
        return ret;
    }
    
    public int loginUsuario(String nomUser) throws ExceptionPersistencia{
        Jugador aux = null;
        int colorAsignado = 0;
        try {
            aux = persistenceManager.obtenerUsuario(nomUser, conexionBDD);
            if(this.jAzulListo){
                this.jRojo = aux;
                this.jRojoListo = true;
                colorAsignado = Equipos.EQUIPO_ROJO;
            }
            else{
                this.jAzul = aux;
                this.jAzulListo = true;
                colorAsignado = Equipos.EQUIPO_AZUL;
            }
            conexionBDD.liberarConexionExitosa();
        } catch (ExceptionPersistencia ex) {
            conexionBDD.liberarConexionFallida();
            throw ex;
        }      
        return colorAsignado;
    }

    public void embisteRojoAzul() {
        this.partida.getEquipos().getEquipoAzul().getBarco().setVivo(false);
    }

    public void embisteAzulRojo() {
        this.partida.getEquipos().getEquipoRojo().getBarco().setVivo(false);
    }

    public void embisteEmpate() {
        this.partida.getEquipos().getEquipoAzul().getBarco().setVivo(false);
        this.partida.getEquipos().getEquipoRojo().getBarco().setVivo(false);
    }

    public void jugadorAzulListo() {
        this.jAzulListo = true;
    }

    public void jugadorRojoListo() {
        this.jRojoListo = true;
    }
    
    public boolean estaJugarAzulListo(){
        return this.jAzulListo;
    }
    public boolean estaJugarRojoListo(){
        return this.jRojoListo;
    }
    
    public boolean jugadoresListos(){
        return (jAzulListo) && (jRojoListo);
    }
}
