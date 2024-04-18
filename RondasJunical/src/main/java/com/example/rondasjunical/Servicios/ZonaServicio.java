package com.example.rondasjunical.Servicios;

import com.example.rondasjunical.Entidades.Zona;
import com.example.rondasjunical.Excepciones.ZonaNotFoundException;
import com.example.rondasjunical.Repositorios.ZonaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
public class ZonaServicio {

    @Autowired
    private ZonaRepositorio zonaRepositorio;

    public ZonaServicio(ZonaRepositorio zonaRepositorio) {
        this.zonaRepositorio = zonaRepositorio;
    }

    // Crud

    //Obtener todas las zonas
    public List<Zona> obtenerTodosLosZonas() {
        return zonaRepositorio.findAll();
    }
    //Obtener zonas por Id
    public Zona obtenerZonaPorId(Long id) {
        return zonaRepositorio.findById(id).orElseThrow(() -> new ZonaNotFoundException(id));
    }
    //Guardar Zona
    public Zona guardarZona(Zona zona) {
        return zonaRepositorio.save(zona);
    }
    //Crear zonas
    public Zona crearZona(Zona zona) {
        return zonaRepositorio.save(zona);
    }
    //Obtener una zona por su Id
    public Zona obtenerPorId(Long id){
        return zonaRepositorio.findById(id).orElse(null);
    }
    //Actualizar zonas
    public Zona actualizarZona(Zona zona) {
        return zonaRepositorio.save(zona);
    }

    //Inhabilitar Zona
    public void inhabilitarZona(Long id) {
        Zona zona = zonaRepositorio.findById(id)
                .orElseThrow(()-> new RuntimeException("Zona no encontrada por Id:" + id));
        zona.setHabilitado(false);
        zonaRepositorio.save(zona);
    }
    //habilitar Zona
    public void habilitarZona(Long id) {
        Zona zona = zonaRepositorio.findById(id)
                .orElseThrow(()-> new RuntimeException("Zona no encontrada por Id:" + id));
        zona.setHabilitado(true);
        zonaRepositorio.save(zona);
    }
    //Eliminar Zona
    public void eliminarZona(Long id) {
        zonaRepositorio.deleteById(id);
    }
    //Verificar existente zona
    public boolean verificarZonaExistente(String zonaName) {
        return zonaRepositorio.existsByZonaName(zonaName);
    }
}
