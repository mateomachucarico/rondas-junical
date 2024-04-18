package com.example.rondasjunical.Servicios;


import com.example.rondasjunical.Entidades.ResponJefeArea;
import com.example.rondasjunical.Repositorios.ResponJefeAreaRepositorio;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResponJefeAreaServicio {
    @Autowired
    private ResponJefeAreaRepositorio responJefeAreaRepositorio;

    public ResponJefeAreaServicio(ResponJefeAreaRepositorio responJefeAreaRepositorio){
        this.responJefeAreaRepositorio = responJefeAreaRepositorio;
    }

    //CRUD

    // Obtener todas los Responsables
    public List<ResponJefeArea> obtenerTodasLosResponJefeArea() {
        return responJefeAreaRepositorio.findAll(); // Aquí llamamos al método en la instancia responJefeAreaRepositorio
    }

    // Obtener responsable área por ID
    public ResponJefeArea obtenerResponJefeAreaPorId(Long id) {
        return responJefeAreaRepositorio.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Responsable del area no encontrada con ID: " + id));
    }
    //Guardar Responsable jefe
    public ResponJefeArea guardarResponJefeArea(ResponJefeArea responJefeArea) {
        return responJefeAreaRepositorio.save(responJefeArea);
    }
    //Crear Responsable Jefe
    public ResponJefeArea crearResponJefeArea(ResponJefeArea responJefeArea) {
        return responJefeAreaRepositorio.save(responJefeArea);
    }
    // Método para obtener un jefe responsable por su ID
    public ResponJefeArea obtenerPorId(Long id){
        return responJefeAreaRepositorio.findById(id).orElse(null);
    }
    // Método para actualizar un jefe responsable
    public ResponJefeArea actualizarResponJefeArea(ResponJefeArea responJefeArea) {
        return responJefeAreaRepositorio.save(responJefeArea);
    }
    // Inhabilitar Responsable área
    public void inhabilitarResponJefeArea(Long id) {
        ResponJefeArea responJefeArea = responJefeAreaRepositorio.findById(id)
                        .orElseThrow(()-> new RuntimeException("Jefe Responsable del Area no encontrada con el Id: "+ id));
        responJefeArea.setHabilitado(false);
        responJefeAreaRepositorio.save(responJefeArea);
    }
    // habilitar Responsable área
    public void habilitarResponJefeArea(Long id) {
        ResponJefeArea responJefeArea = responJefeAreaRepositorio.findById(id)
                .orElseThrow(()-> new RuntimeException("Jefe Responsable del Area no encontrada con el Id: "+ id));
        responJefeArea.setHabilitado(true);
        responJefeAreaRepositorio.save(responJefeArea);
    }
    //Eliminar Jefe de area
    public void eliminarResponJefeArea(Long id) {
        responJefeAreaRepositorio.deleteById(id);
    }
    //Verificar existente Jefe de area Nombre
    public boolean verificarResponJefeAreasExistente(String responName) {
        return responJefeAreaRepositorio.existsByResponName(responName);
    }
    //Verificar existente Jefe de area por Email
    public boolean verificarResponJefeAreasExistentePorEmail(String responEmail) {
        return responJefeAreaRepositorio.existsByResponEmail(responEmail);
    }
}
