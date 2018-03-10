/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package persistencia;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import logica.Partida;

/**
 *
 * @author Maxi
 */
public class DAOPartida {
    
    private EntityManagerFactory factory;
    private EntityManager manager;
    
    public DAOPartida() throws ExcepcionDAOPartida{
        try{
            this.factory = Persistence.createEntityManagerFactory("Personas");
            this.manager = this.factory.createEntityManager();
        } catch (Exception e) {
            throw new ExcepcionDAOPartida(ExcepcionDAOPartida.ERROR_CONEXION);
        }
    }
    
    public void insert(Partida partida) throws ExcepcionDAOPartida{
        try {
            this.manager.getTransaction().begin();
            this.manager.persist(partida);
            manager.getTransaction().commit();
        } catch (Exception e) {
            e.printStackTrace();
            manager.getTransaction().rollback();
            throw new ExcepcionDAOPartida(ExcepcionDAOPartida.ERROR_INSERT);
        }
    }
    
    public Partida find(int id_partida) throws ExcepcionDAOPartida{
        Partida ret = null;
        try {
            this.manager.getTransaction().begin();
            ret = this.manager.find(Partida.class, id_partida);
            manager.getTransaction().commit();
        } catch (Exception e) {
            manager.getTransaction().rollback();
            throw new ExcepcionDAOPartida(ExcepcionDAOPartida.ERROR_FIND);
        }
        return ret;
    }
    
    public List<VOPersona> listarMayores(int edad) throws PersistenciaException{
        List<VOPersona> ret = new ArrayList<>();
        try {
            this.manager.getTransaction().begin();
            Query query = this.manager.createNamedQuery("Persona.verPersonasMayores", Persona.class);
            query.setParameter("edad", edad);
            List<Persona> aux = query.getResultList();
            for (Persona persona : aux) {
                ret.add(new VOPersona(persona.getCedula(), persona.getNombre(), persona.getEdad()));
            }
            this.manager.getTransaction().commit();
        } catch (Exception e) {
            this.manager.getTransaction().rollback();
            throw new PersistenciaException("Error al obtener el listado de la bdd.");
        }
        return ret;
    }
}
