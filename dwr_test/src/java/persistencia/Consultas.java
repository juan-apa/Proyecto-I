/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package persistencia;

/**
 *
 * @author Juan Aparicio
 */
public class Consultas {
    public static final String OBTENER_RANGO_METRALLETA = "SELECT rango_metralleta FROM JUEGO.Configuraciones";
    public static final String OBTENER_RANGO_TORPEDO = "SELECT rango_torpedo FROM JUEGO.Configuraciones";
    public static final String OBTENER_MAX_BALAS = "SELECT MAX_BALAS FROM JUEGO.Configuraciones";
    
    public static final String INGRESAR_AVION = "INSERT INTO Proyecto.Avion (idEquipo,nombre,x,y,rot,altura,velocidad,combustible,vivo,aterrizado,tipoArma,municion) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
    public static final String INGRESAR_EQUIPO = "INSERT INTO Proyecto.Equipo (idEquipo, color, idBarco) VALUES (?, ?, ?)";
    public static final String INGRESAR_BARCO = "INSERT INTO Proyecto.Barco (idEquipo, velMaxima, velocidad, vivo) VALUES (?,?,?,?)";
    public static final String INGRESAR_PARTIDA = "INSERT INTO Proyecto.Partida (idPartida, tiempo, dificultad, idEquipo1, idEquipo2) VALUES (?, ?, ?, ?, ?)";

    
    public static final String FIND_EQUIPO = "SELECT * FROM Proyecto.Equipo WHERE idEquipo = ?";
    public static final String FIND_BARCO = "SELECT * FROM Proyecto.Barco WHERE idEquipo = ?";
    public static final String FIND_AVIONES = "SELECT * FROM Proyecto.Avion WHERE idEquipo = ?";
    public static final String FIND_PARTIDA = "SELECT * FROM Proyecto.Partida WHERE idPartida = ?";
    
    public static final String LARGO_PARTIDAS = "Select count(*) FROM Proyecto.Partida";
    public static final String LARGO_EQUIPOS = "Select count(*) FROM Proyecto.Equipo";
    public static final String LARGO_BARCOS = "Select count(*) FROM Proyecto.Barco";
    public static final String LARGO_AVIONES = "Select count(*) FROM Proyecto.Avion";
    
    
}
