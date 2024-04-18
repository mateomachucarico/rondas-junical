package com.example.rondasjunical.Servicios;
import com.example.rondasjunical.Entidades.AsignarRonda;
import com.example.rondasjunical.Repositorios.AsignarRondaRepositorio;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AsignarRondaServicio {

    @Autowired
    private AsignarRondaRepositorio asignarRondaRepositorio;

    public AsignarRondaServicio(AsignarRondaRepositorio asignarRondaRepositorio){
        this.asignarRondaRepositorio = asignarRondaRepositorio;
    }

    // crud

    //Obtener todas asignaciones de rondas
    public List<AsignarRonda> obtenerTodosLosAsignarRonda(){
        return asignarRondaRepositorio.findAll();
    }
    //Obtener asignaciones de rondas  por Id
    public AsignarRonda obtenerAsignarRondaPorId(Long id){
        return asignarRondaRepositorio.findById(id)
                .orElseThrow(()-> new EntityNotFoundException("Ronda Asignada no Encontrada con Id" + id));
    }
    // Guardar  Asignar ronda
    public AsignarRonda guardarAsignarRonda(AsignarRonda asignarRonda){
        return asignarRondaRepositorio.save(asignarRonda);
    }
    //Obtener ronda por su Id
    public AsignarRonda obtenerPorId(Long id){
        return asignarRondaRepositorio.findById(id).orElse(null);
    }
    //Actualizar ronda
    public AsignarRonda actualizarAsignarRonda(AsignarRonda asignarRonda){
        return asignarRondaRepositorio.save(asignarRonda);
    }
    // Inhabilitar ronda asignada
    public void inhabilitarAsignarRonda(Long id){
        AsignarRonda asignarRonda = asignarRondaRepositorio.findById(id)
                .orElseThrow(()-> new RuntimeException("Ronda Asignada no encontrada con el Id:" + id));
        asignarRonda.setHabilitado(false);
        asignarRondaRepositorio.save(asignarRonda);
    }
    // habilitar ronda asignada
    public void habilitarAsignarRonda(Long id){
        AsignarRonda asignarRonda = asignarRondaRepositorio.findById(id)
                .orElseThrow(()-> new RuntimeException("Ronda Asignada no encontrada con el Id:" + id));
        asignarRonda.setHabilitado(true);
        asignarRondaRepositorio.save(asignarRonda);
    }
    //Eliminar ronda asignada
    public void eliminarAsignarRonda(Long id){
        asignarRondaRepositorio.deleteById(id);
    }
    //
}
