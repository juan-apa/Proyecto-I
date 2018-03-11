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
    
    public static final String INGRESAR_AVION = "INSERT INTO Proyecto.Avion (idEquipo,nombre,x,y,rot,altura,velocidad,combustible,vivo,aterrizado,tipoArma,municion,deBarco) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
    public static final String INGRESAR_EQUIPO = "INSERT INTO Proyecto.Equipo (idEquipo, color) VALUES (?, ?)";
    public static final String INGRESAR_BARCO = "INSERT INTO Proyecto.Barco (idEquipo, velMaxima, velocidad, vivo, x, y, rot) VALUES (?,?,?,?, ?, ?, ?)";
    public static final String INGRESAR_PARTIDA = "INSERT INTO Proyecto.Partida (idPartida, tiempo, dificultad, idEquipo1, idEquipo2, nombreJugador, colorJugadorGuardado) VALUES (?, ?, ?, ?, ?, ?, ?)";

    
    public static final String FIND_EQUIPO = "SELECT * FROM Proyecto.Equipo WHERE idEquipo = ?";
    public static final String FIND_BARCO = "SELECT * FROM Proyecto.Barco WHERE idEquipo = ?";
    public static final String FIND_AVIONES = "SELECT * FROM Proyecto.Avion WHERE idEquipo = ? AND deBarco = ? ORDER BY nombre";
    public static final String FIND_PARTIDA = "SELECT * FROM Proyecto.Partida WHERE idPartida = ?";
    
    public static final String LARGO_PARTIDAS = "Select count(*) FROM Proyecto.Partida";
    public static final String LARGO_EQUIPOS = "Select count(*) FROM Proyecto.Equipo";
    public static final String LARGO_BARCOS = "Select count(*) FROM Proyecto.Barco";
    public static final String LARGO_AVIONES = "Select count(*) FROM Proyecto.Avion";
    
    public static final String CREAR_DB = "CREATE DATABASE IF NOT EXISTS Proyecto";
    
    public static final String TABLA_EQUIPOS = "CREATE TABLE IF NOT EXISTS Proyecto.Equipo(\n" +
"	idEquipo INT PRIMARY KEY,\n" +
"    color INT\n" +
");";
    
    public static final String TABLA_PARTIDAS = "CREATE TABLE IF NOT EXISTS Proyecto.Partida(\n" +
"	idPartida INT PRIMARY KEY,\n" +
"    tiempo INT,\n" +
"    dificultad INT,\n" +
"    idEquipo1 INT,\n" +
"    idEquipo2 INT,\n" +
"    nombreJugador varchar(45),\n" +
"    colorJugadorGuardado INT,\n" +
"    FOREIGN KEY (idEquipo1) REFERENCES Equipo(idEquipo),\n" +
"    FOREIGN KEY (idEquipo2) REFERENCES Equipo(idEquipo)\n" +
");";
    public static final String TABLA_BARCOS = "CREATE TABLE IF NOT EXISTS Proyecto.Barco(\n" +
"	idEquipo INT,\n" +
"    velMaxima INT,\n" +
"    velocidad INT,\n" +
"    vivo bool,\n" +
"    x double,\n" +
"    Y double,\n" +
"    rot double,\n" +
"    FOREIGN KEY (idEquipo) REFERENCES Equipo(idEquipo)\n" +
");";
    
    public static final String TABLA_AVIONES = "CREATE TABLE IF NOT EXISTS Proyecto.Avion(\n" +
"	idEquipo INT,\n" +
"    nombre VARCHAR(4),\n" +
"    x double,\n" +
"    y double,\n" +
"    rot double,\n" +
"    altura int,\n" +
"    velocidad int,\n" +
"    combustible int,\n" +
"    vivo bool,\n" +
"    aterrizado boolean,\n" +
"    tipoArma bool,\n" +
"    municion int,\n" +
"    deBarco boolean,\n" +
"    FOREIGN KEY (idEquipo) REFERENCES Equipo(idEquipo)\n" +
");";
    
    public static final String TABLA_JUGADORES = "CREATE TABLE IF NOT EXISTS Proyecto.Jugadores(\n" +
"	nombre varchar(45) PRIMARY KEY,\n" +
"    password varchar(45)\n" +
");";
    
    
}
