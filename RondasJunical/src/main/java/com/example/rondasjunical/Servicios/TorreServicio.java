package com.example.rondasjunical.Servicios;
import com.example.rondasjunical.Entidades.Torre;
import com.example.rondasjunical.Excepciones.TorreNotFoundException;
import com.example.rondasjunical.Repositorios.TorreRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class TorreServicio {

    @Autowired
    private TorreRepositorio torreRepositorio;

    public TorreServicio(TorreRepositorio torreRepositorio) {
        this.torreRepositorio = torreRepositorio;
    }

    // Crud

    //Obtener todas las torres
    public List<Torre> obtenerTodosLosTorres() {
        return torreRepositorio.findAll();
    }
    //Obtener torre por Id
    public Torre obtenerTorrePorId(Long id) {
        return torreRepositorio.findById(id).orElseThrow(() -> new TorreNotFoundException(id));
    }
    //Guardar torre
    public Torre guardarTorre(Torre torre) {
        return torreRepositorio.save(torre);
    }
    // crear torre
    public Torre crearTorre(Torre torre) {
        return torreRepositorio.save(torre);
    }
    // Método para obtener una torre por su ID
    public Torre obtenerPorId(Long id) {
        return torreRepositorio.findById(id).orElse(null);
    }
    // Método para actualizar una torre
    public Torre actualizarTorre(Torre torre) {
        return torreRepositorio.save(torre);
    }
    //Metodo inhabilitar torre
    public void inhabilitarTorre(Long id) {
        Torre torre = torreRepositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("Torre no encontrada con el id: " + id));
        torre.setHabilitado(false); // Actualizar el estado
        torreRepositorio.save(torre);
    }
    //Metodo habilitar torre
    public void habilitarTorre(Long id) {
        Torre torre = torreRepositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("Torre no encontrada con el id: " + id));
        torre.setHabilitado(true); // Actualizar el estado
        torreRepositorio.save(torre);
    }
    //Eliminar torre
    public void eliminarTorre(Long id) {
        torreRepositorio.deleteById(id);
    }
    //Verificar existente torre
    public boolean verificarTorreExistente(String torreName) {
        return torreRepositorio.existsByTorreName(torreName);
    }
}
