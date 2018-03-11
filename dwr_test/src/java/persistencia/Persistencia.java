/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package persistencia;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import logica.Arma;
import logica.Aviones;
import logica.Avion;
import logica.Barco;
import logica.Equipo;
import logica.Equipos;
import logica.Partida;
import persistencia.Conexion;
import persistencia.Consultas;
import persistencia.ExceptionPersistencia;

/**
 * 
 * @author Sammy Guergachi <sguergachi at gmail.com>
 */
public class Persistencia {
    public Persistencia(){
        
    }
    
    public void persistirPartida(Partida p, String nombreJugador, int colorJugadorGuardado, Conexion con)throws ExceptionPersistencia {
        Connection c = con.getConexion();
        PreparedStatement pstmt = null;
        
        try {
            int[] idEquipos = this.persistirEquipos(p.getEquipos(), con);
            p.setId(this.largoPartidas(con));
            pstmt = c.prepareStatement(Consultas.INGRESAR_PARTIDA);
            pstmt.setInt(1, p.getId());
            pstmt.setInt(2, p.getTiempo());
            pstmt.setInt(3, p.getDificultad());
            pstmt.setInt(4, idEquipos[0]);
            pstmt.setInt(5, idEquipos[1]);
            pstmt.setString(6, nombreJugador);
            pstmt.setInt(7, colorJugadorGuardado);
            pstmt.executeUpdate();
        } catch (SQLException ex) {
            throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_INSERT);
        }
    }
    
    public int largoPartidas(Conexion con) throws ExceptionPersistencia {
        Connection c = con.getConexion();
        PreparedStatement p = null;
        ResultSet rs = null;
        int largo = 0;
        try{
            p = c.prepareStatement(Consultas.LARGO_PARTIDAS);
            rs = p.executeQuery();
            if(rs.next()){
                largo = rs.getInt(1);
            }
        } catch(SQLException e){
            throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_OBTENER_DATOS);
        }
        finally{
            try {
                if(rs != null){
                    rs.close();
                }
                if(p != null){
                    p.close();
                }
            } catch (SQLException ex) {
                throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_CERRAR_CONEXION);
            }
        }
        return largo;
    }
    
    private int[] persistirEquipos(Equipos e, Conexion con) throws ExceptionPersistencia {
        Connection c = con.getConexion();
        int[] ids = new int[2];
        try{
            /*obtengo el largo de la cantidad de equipos para asignarle ese numero y el siguiente a los equipos.*/
            /*Si el numero de equipo es par, entonces es azul, de lo contrario es rojo*/
            int idAzul = this.largoEquipos(con);
            int idRojo = idAzul + 1;
            ids[0] = idAzul;
            ids[1] = idRojo;
            e.getEquipoAzul().setId(idAzul);
            e.getEquipoRojo().setId(idRojo);
            this.persistirEquipo(e.getEquipoAzul(), con);
            this.persistirEquipo(e.getEquipoRojo(), con);
        } catch(ExceptionPersistencia ex) {
            throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_INSERT);
        } finally {
        }
        return ids;
    }
    
    private int largoEquipos(Conexion con) throws ExceptionPersistencia {
        Connection c = con.getConexion();
        PreparedStatement p = null;
        ResultSet rs = null;
        int largo = 0;
        try{
            p = c.prepareStatement(Consultas.LARGO_EQUIPOS);
            rs = p.executeQuery();
            if(rs.next()){
                largo = rs.getInt(1);
            }
        } catch(SQLException e){
            throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_OBTENER_DATOS);
        }
        finally{
            try {
                rs.close();
                p.close();
            } catch (SQLException ex) {
                throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_CERRAR_CONEXION);
            }
        }
        return largo;
    }
    
    private void persistirEquipo(Equipo e, Conexion con) throws ExceptionPersistencia {
        Connection c = con.getConexion();
        PreparedStatement p = null;
        int idBarco = 0;
        try{
            p = c.prepareStatement(Consultas.INGRESAR_EQUIPO);
            p.setInt(1, e.getId());
            p.setInt(2, e.getColor());
            p.executeUpdate();
            this.persistirBarco(e.getBarco(), e.getId(), con);
            this.persistirAviones(e.getAviones(), e.getId(), false, con);
        } catch(SQLException ex) {
            throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_INSERT);
        } finally {
            try {
                p.close();
            } catch (SQLException ex) {
                throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_CERRAR_CONEXION);
            }
        }
    }
    
    private void persistirBarco(Barco b, int idEquipo, Conexion con) throws ExceptionPersistencia {
        Connection c = con.getConexion();
        PreparedStatement p = null;
        try{
            b.setId(idEquipo);
            this.persistirAviones(b.getAviones(), idEquipo, true, con);
            p = c.prepareStatement(Consultas.INGRESAR_BARCO);
            p.setInt(1, idEquipo);
            p.setInt(2, b.getVelMaxima());
            p.setInt(3, b.getVelocidad());
            p.setBoolean(4, b.isVivo());
            p.setDouble(5, b.getX());
            p.setDouble(6, b.getY());
            p.setDouble(7, b.getRot());
            p.executeUpdate();
        } catch(SQLException ex) {
            throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_INSERT);
        } finally {
            try {
                p.close();
            } catch (SQLException ex) {
                throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_CERRAR_CONEXION);
            }
        }
    }
    
    private int largoBarcos(Conexion con) throws ExceptionPersistencia {
        Connection c = con.getConexion();
        PreparedStatement p = null;
        ResultSet rs = null;
        int largo = 0;
        try{
            p = c.prepareStatement(Consultas.LARGO_BARCOS);
            rs = p.executeQuery();
            if(rs.next()){
                largo = rs.getInt(1);
            }
        } catch(SQLException e){
            throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_OBTENER_DATOS);
        }
        finally{
            try {
                rs.close();
                p.close();
            } catch (SQLException ex) {
                throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_CERRAR_CONEXION);
            }
        }
        return largo;
    }
    
    private void persistirAviones(Aviones av, int idEquipo, boolean deBarco, Conexion con) throws ExceptionPersistencia {
//        Connection c = con.getConexion();
//        PreparedStatement p = null;
        try{
            List<Avion> aux = av.getAviones();
            for(Avion a : aux){
                this.persistirAvion(a, idEquipo, deBarco, con);
            }
        } catch(ExceptionPersistencia ex) {
            throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_INSERT);
        } finally {
//            try {
//                p.close();
//            } catch (SQLException ex) {
//                throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_CERRAR_CONEXION);
//            }
        }
    }
    
    private void persistirAvion(Avion av, int idEquipo, boolean deBarco, Conexion con) throws ExceptionPersistencia {
        Connection c = con.getConexion();
        PreparedStatement p = null;
        try{
            p = c.prepareStatement(Consultas.INGRESAR_AVION);
            if(av != null){
                p.setInt(1, idEquipo);
                p.setString(2, av.getNombre());
                p.setDouble(3, av.getX());
                p.setDouble(4, av.getY());
                p.setDouble(5, av.getRot());
                p.setInt(6, av.getAltura());
                p.setInt(7, av.getVelocidad());
                p.setInt(8, av.getComustible());
                p.setBoolean(9, av.isVivo());
                p.setBoolean(10, av.isAterrizado());
                p.setInt(11, av.getArma().getTipoMunicion());
                p.setInt(12, av.getArma().getMunicion());
                p.setBoolean(13, deBarco);
            } else {
                p.setInt(1, idEquipo);
                p.setString(2, av.getNombre());
                p.setNull(3, java.sql.Types.NULL);
                p.setNull(4, java.sql.Types.NULL);
                p.setNull(5, java.sql.Types.NULL);
                p.setNull(6, java.sql.Types.NULL);
                p.setNull(7, java.sql.Types.NULL);
                p.setNull(8, java.sql.Types.NULL);
                p.setNull(10, java.sql.Types.NULL);
                p.setNull(11, java.sql.Types.NULL);
                p.setNull(12, java.sql.Types.NULL);
                p.setBoolean(13, deBarco);
            }
            p.executeUpdate();
        } catch(SQLException e) {
            throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_INSERT);
        } finally {
            try {
                p.close();
            } catch (SQLException ex) {
                throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_CERRAR_CONEXION);
            }
        }
        
    }
    
    
    public Partida obtenerPartida(int idPartida, Conexion con) throws ExceptionPersistencia {
        Partida ret = new Partida();
        Connection c = con.getConexion();
        PreparedStatement p = null;
        ResultSet rs = null;
        int idEquipoAzul = 0;
        int idEquipoRojo = 1;
        try{
            p = c.prepareStatement(Consultas.FIND_PARTIDA);
            p.setInt(1, idPartida);
            rs = p.executeQuery();
            if(rs.next()){
                ret.setId(idPartida);
                ret.setTiempo(rs.getInt("tiempo"));
                ret.setDificultad(rs.getInt("dificultad"));
                idEquipoAzul = rs.getInt("idEquipo1");
                idEquipoAzul = rs.getInt("idEquipo2");
            }
            Equipos aux = new Equipos(idPartida);
            aux.setEquipoAzul(this.obtenerEquipo(idEquipoAzul, con));
            aux.getEquipoAzul().setColor(Equipos.EQUIPO_AZUL);
            aux.setEquipoRojo(this.obtenerEquipo(idEquipoRojo, con));
            aux.getEquipoRojo().setColor(Equipos.EQUIPO_ROJO);
            ret.setEquipos(aux);
        } catch(SQLException e) {
            throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_OBTENER_DATOS);
        } finally {
            if(rs != null){
                try {
                    rs.close();
                } catch (SQLException ex) {
                    throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_CONEXION);
                }
            }
            if(p!=null){
                try {
                    p.close();
                } catch (SQLException ex) {
                    throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_CONEXION);
                }
            }
        }
        return ret;
    }
    
    private Equipo obtenerEquipo(int idEquipo, Conexion con) throws ExceptionPersistencia {
        Equipo ret = new Equipo();
        Connection c = con.getConexion();
        PreparedStatement p = null;
        ResultSet rs = null;
        try{
            p = c.prepareStatement(Consultas.FIND_EQUIPO);
            p.setInt(1, idEquipo);
            rs = p.executeQuery();
            if(rs.next()){
                ret.setColor(rs.getInt("color"));
            }
            ret.setId(idEquipo);
            ret.setBarco(this.obtenerBarco(idEquipo, con));
            ret.setAviones(this.obtenerAviones(idEquipo, false, con));
        } catch(SQLException e) {
            throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_OBTENER_DATOS);
        } finally {
            if(rs != null){
                try {
                    rs.close();
                } catch (SQLException ex) {
                    throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_CONEXION);
                }
            }
            if(p!=null){
                try {
                    p.close();
                } catch (SQLException ex) {
                    throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_CONEXION);
                }
            }
        }
        return ret;
    }
    
    private Barco obtenerBarco(int idEquipo, Conexion con) throws ExceptionPersistencia{
        Barco ret = new Barco();
        Connection c = con.getConexion();
        PreparedStatement p = null;
        ResultSet rs = null;
        try{
            p = c.prepareStatement(Consultas.FIND_BARCO);
            p.setInt(1, idEquipo);
            rs = p.executeQuery();
            if(rs.next()){
                ret.setId(idEquipo);
                ret.setVelMaxima(rs.getInt("velMaxima"));
                ret.setVelocidad(rs.getInt("velocidad"));
                ret.setVivo(rs.getBoolean("vivo"));
            }
            ret.setAviones(this.obtenerAviones(idEquipo, true, con));
        } catch(SQLException e) {
            throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_OBTENER_DATOS);
        } finally {
            if(rs != null){
                try {
                    rs.close();
                } catch (SQLException ex) {
                    throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_CONEXION);
                }
            }
            if(p!=null){
                try {
                    p.close();
                } catch (SQLException ex) {
                    throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_CONEXION);
                }
            }
        }
        return ret;
    }

    private Aviones obtenerAviones(int idEquipo, boolean enBarco, Conexion con) throws ExceptionPersistencia {
        Aviones ret = new Aviones();
        Connection c = con.getConexion();
        PreparedStatement p = null;
        ResultSet rs = null;
        try{
            p = c.prepareStatement(Consultas.FIND_AVIONES);
            p.setInt(1, idEquipo);
            p.setBoolean(2, enBarco);
            rs = p.executeQuery();
            List<Avion> aux = new ArrayList<>(4);
            Avion avAux = null;
            while(rs.next()){
                avAux = null;
                String nombre = rs.getString("nombre");
                double x = rs.getDouble("x");
                /*Si no fue null, es porque hay un barco en esta posición*/
                if(!rs.wasNull()){
                    avAux = new Avion();
                    avAux.setNombre(nombre);
                    avAux.setX(x);
                    avAux.setY(rs.getDouble("y"));
                    avAux.setRot(rs.getDouble("rot"));
                    avAux.setAltura(rs.getInt("altura"));
                    avAux.setVelocidad(rs.getInt("velocidad"));
                    avAux.setCombustible(rs.getInt("combustible"));
                    avAux.setVivo(rs.getBoolean("vivo"));
                    avAux.setAterrizado(rs.getBoolean("aterrizado"));
                    Arma arma = new Arma();
                    arma.setTipoMunicion(rs.getInt("tipoArma"));
                    arma.setMunicion(rs.getInt("municion"));
                    avAux.setArma(arma);
                }
                aux.add(avAux);
            }
            ret.setAviones(aux);
        } catch(SQLException e) {
            throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_OBTENER_DATOS);
        } finally {
            if(rs != null){
                try {
                    rs.close();
                } catch (SQLException ex) {
                    throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_CONEXION);
                }
            }
            if(p!=null){
                try {
                    p.close();
                } catch (SQLException ex) {
                    throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_CONEXION);
                }
            }
        }
        return ret;
    }
}
