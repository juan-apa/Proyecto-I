/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package persistencia;

import com.mysql.jdbc.Connection;
import com.mysql.jdbc.Statement;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author Juan Aparicio
 */
public class DAOConfiguraciones {
    private Connection conn = null;

    public DAOConfiguraciones() throws ExceptionConfiguracion {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            this.conn = (Connection) DriverManager.getConnection("jdbc:mysql://localhost:3306/","admin","admin");
        } catch (ClassNotFoundException ex) {
            throw new ExceptionConfiguracion(ExceptionConfiguracion.ERROR_OBTENER_CONFIGURACIONES);
        } catch (SQLException ex) {
            throw new ExceptionConfiguracion(ExceptionConfiguracion.ERROR_OBTENER_CONFIGURACIONES);
        }
    }
    
    public int obtenerMAX_BALAS() throws ExceptionConfiguracion{
        int ret = 0;
        try {
            PreparedStatement stmt = this.conn.prepareStatement(Consultas.OBTENER_MAX_BALAS);
            ResultSet rs = stmt.executeQuery();
            while(rs.next()){
                ret = rs.getInt(1);
            }
            rs.close();
            stmt.close();
        } catch (SQLException ex) {
            throw new ExceptionConfiguracion(ExceptionConfiguracion.ERROR_OBTENER_CONFIGURACIONES);
        }
        return ret;
    }
    
}
