package com.example.rondasjunical.Servicios;
import com.example.rondasjunical.Entidades.Area;
import com.example.rondasjunical.Excepciones.AreaNotFoundException;
import com.example.rondasjunical.Repositorios.AreaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AreaServicio {

    @Autowired
    private AreaRepositorio areaRepositorio;


    public AreaServicio(AreaRepositorio areaRepositorio) {
        this.areaRepositorio = areaRepositorio;
    }

    // Crud

    //Obtener todos los area
    public List<Area> obtenerTodosLosAreas() {
        return areaRepositorio.findAll();
    }

    //Obtener area por Id
    public Area obtenerAreaPorId(Long id) {
        return areaRepositorio.findById(id).orElseThrow(() -> new AreaNotFoundException(id));
    }
    //Guardar Area
    public Area guardarArea(Area area) {
        return areaRepositorio.save(area);
    }
    //Crear Area
    public Area crearArea(Area area) {
        return areaRepositorio.save(area);
    }
    // Método para obtener un cargo por su ID
    public Area obtenerPorId (Long id){
        return areaRepositorio.findById(id).orElseThrow(null);
    }
    // Método para actualizar un Area
    public Area actualizarArea(Area area) {
        return areaRepositorio.save(area);
    }
    //Metodo inhabilitar un area
    public void inhabilitarArea(Long id) {
        Area area = areaRepositorio.findById(id)
                .orElseThrow(()-> new RuntimeException("Area no encontrada con el Id:" + id));
        area.setHabilitado(false);
        areaRepositorio.save(area);
    }
    //Metodo habilitar un area
    public void habilitarArea(Long id) {
        Area area = areaRepositorio.findById(id)
                .orElseThrow(()-> new RuntimeException("Area no encontrada con el Id:" + id));
        area.setHabilitado(true);
        areaRepositorio.save(area);
    }
    //Eliminar Area
    public void eliminarArea(Long id) {
        areaRepositorio.deleteById(id);
    }
    //Verificar existente Area
    public boolean verificarAreaExistente(String areaName){
        return areaRepositorio.existsByAreaName(areaName);
    }

}
