/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package persistencia;

import java.sql.Connection;

/**
 *
 * @author Juan Aparicio
 */
public class Conexion {

    private Connection con;

    public Conexion(Connection con) {
        this.con = con;
    }

    public Connection getConexion() {
        return this.con;
    }
}