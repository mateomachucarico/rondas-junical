package com.example.rondasjunical.Servicios;
import com.example.rondasjunical.Entidades.Ronda;
import com.example.rondasjunical.Excepciones.RondaNotFoundException;
import com.example.rondasjunical.Repositorios.InformacRondaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class InformacRondaServicio {

    @Autowired
    private InformacRondaRepositorio informacRondaRepositorio;

        public InformacRondaServicio(InformacRondaRepositorio informacRondaRepositorio){
            this.informacRondaRepositorio = informacRondaRepositorio;
    }
    //CRUD
    //Guardar Ronda
    public Ronda guardarRonda(Ronda ronda) {
        return informacRondaRepositorio.save(ronda);
    }
    //Obtener todas las Rondas
    public List<Ronda> obtenerTodoslosRondas() {
            return informacRondaRepositorio.findAll();
    }
    //Obtener ronda por ID
    public Ronda obtenerRondaPorId(Long id) {
            return informacRondaRepositorio.findById(id).orElseThrow(()-> new RondaNotFoundException(id));
    }
    //Actualizar Ronda
    public Ronda actualizarRonda(Ronda ronda) {return informacRondaRepositorio.save(ronda);}
    //Eliminar Ronda
    public void eliminarRonda(Long id) {informacRondaRepositorio.deleteById(id);}
}
