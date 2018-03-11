/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package persistencia.daos;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import logica.Partida;
import persistencia.Conexion;
import persistencia.Consultas;
import persistencia.ExceptionPersistencia;



/**
 * 
 * @author Sammy Guergachi <sguergachi at gmail.com>
 */

public class DAOPartidas  {
    private DAOEquipos dao;
    
    public DAOPartidas(){
        this.dao = new DAOEquipos();
    }
    
//    public void insert(Partida p, Conexion con) throws ExceptionPersistencia{
//        Connection c = con.getConexion();
//        dao.insertarEquipo(con, p.getEquipos().getEquipoAzul());
//        try {
//            PreparedStatement pstmt = c.prepareStatement(Consultas.INGRESAR_PARTIDA);
//            int largoPartidas = this.largo(con);
//            pstmt.setInt(1, largoPartidas);
//            ps
//        } catch (SQLException ex) {
//            throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_INSERT);
//        }
//    }
//    
//    public int largo(Conexion con) throws ExceptionPersistencia{
//        Connection c = con.getConexion();
//        int largo = 0;
//
//        /*Hago la consulta a la base de datos*/
//        try {
//            PreparedStatement pstmt = c.prepareStatement(Consultas.LARGO_PARTIDAS);
//            ResultSet rs = pstmt.executeQuery();
//            /*Como solo me devuelve una tupla, no tengo que iterar, con un if me alcanza*/
//            if (rs.next()) {
//                largo = rs.getInt(1);
//            }
//            rs.close();
//            pstmt.close();
//        } catch (SQLException e) {
//            throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_OBTENER_DATOS);
//        }
//
//        /*Devuelvo el resultado*/
//        return largo;
//    }
}
