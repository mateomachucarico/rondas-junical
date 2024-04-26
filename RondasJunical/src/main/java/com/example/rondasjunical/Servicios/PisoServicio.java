package com.example.rondasjunical.Servicios;
import com.example.rondasjunical.Entidades.Piso;
import com.example.rondasjunical.Entidades.Torre;
import com.example.rondasjunical.Excepciones.PisoNotFoundException;
import com.example.rondasjunical.Repositorios.PisoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PisoServicio {

    @Autowired
    private PisoRepositorio pisoRepositorio;

    public PisoServicio(PisoRepositorio pisoRepositorio) {
        this.pisoRepositorio = pisoRepositorio;
    }

    // Crud

    //Obtener todos los pisos
    public List<Piso> obtenerTodosLosPisos()
    {
        List<Piso> pisos = pisoRepositorio.findAll();
        return pisos;
    }
    //Obtener piso por Id
    public Piso obtenerPisoPorId(Long id) {
        return pisoRepositorio.findById(id).orElseThrow(() -> new PisoNotFoundException(id));
    }
    //Guardar piso
    public Piso guardarPiso(Piso piso) {
        return pisoRepositorio.save(piso);
    }
    //crear piso
    public Piso crearPiso(Piso piso) {
        return pisoRepositorio.save(piso);
    }
    // Método para obtener un piso por su ID
    public Piso obtenerPorId(Long id) {
        return pisoRepositorio.findById(id).orElse(null);
    }
    // Método para actualizar una torre
    public Piso actualizarPiso(Piso piso) {
        return pisoRepositorio.save(piso);
    }

    //Metodo inhabilitar piso
//    public void inhabilitarPiso(Long id) {
//        Piso piso = pisoRepositorio.findById(id)
//                .orElseThrow(() -> new RuntimeException("Piso no encontrada con el id: " + id));
//        piso.setHabilitado(false); // Actualizar el estado
//        pisoRepositorio.save(piso);
//    }
    //Metodo habilitar piso
//    public void habilitarPiso(Long id) {
//        Piso piso = pisoRepositorio.findById(id)
//                .orElseThrow(() -> new RuntimeException("Piso no encontrada con el id: " + id));
//        piso.setHabilitado(true); // Actualizar el estado
//        pisoRepositorio.save(piso);
//    }

    //Eliminar piso
    public void eliminarPiso(Long id) {
        pisoRepositorio.deleteById(id);
    }
    //Verificar existente piso
    public boolean verificarPisoExistente(Long pisoNumber) {
        return pisoRepositorio.existsByPisoNumber(pisoNumber);
    }
}

