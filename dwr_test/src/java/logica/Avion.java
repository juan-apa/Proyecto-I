package logica;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import org.directwebremoting.annotations.RemoteMethod;
import org.directwebremoting.annotations.RemoteProxy;

/**
 *
 * @author pc-61
 */
@RemoteProxy
public class Avion{
    private int numero;
    private static Avion instancia = null; 

    public Avion() {
        this.numero = 0;
    }
    
    public static synchronized Avion getInstance(){
        if(instancia == null){
            Avion.instancia = new Avion();
        }
        Avion.instancia.sumar();
        return Avion.instancia;
    }
    @RemoteMethod
    public int getNumero(){
        return this.numero;
    }
    @RemoteMethod
    public String imprimirNumero(){
        System.out.println("Numero: " + this.numero);
        return "Accedido: " + this.numero + " veces";
    }

    private void sumar() {
        this.numero++;
    }
}
