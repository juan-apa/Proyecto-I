/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package persistencia;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Juan Aparicio
 */
public class Conexion {

    private Connection conn = null;
    
    public Conexion() throws ExceptionPersistencia{
        
        try {
            Class.forName("com.mysql.jdbc.Driver");
            this.conn = (com.mysql.jdbc.Connection) DriverManager.getConnection("jdbc:mysql://localhost:3306/","root","root");
            this.conn.setAutoCommit(false);
        } catch (ClassNotFoundException ex) {
           throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_CONEXION);
        } catch (SQLException ex) {
            throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_CONEXION);
        } finally {
            
        }
    }
    
    public void cerrarConexion() throws ExceptionPersistencia {
        try {
            this.conn.close();
        } catch (SQLException ex) {
            throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_CERRAR_CONEXION);
        }
    }

    public Conexion(Connection con) {
        this.conn = con;
    }

    public Connection getConexion() {
        return this.conn;
    }
    
    public void liberarConexionExitosa() throws ExceptionPersistencia{
        try {
            this.conn.commit();
        } catch (SQLException ex) {
            throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_COMMIT);
        }
    }
    
    public void liberarConexionFallida() throws ExceptionPersistencia{
        try {
            this.conn.rollback();
        } catch (SQLException ex) {
            throw new ExceptionPersistencia(ExceptionPersistencia.ERROR_ROLLBACK);
        }
    }
}