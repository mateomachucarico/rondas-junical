package com.example.rondasjunical.Servicios;

import com.example.rondasjunical.Entidades.CategSopor;
import com.example.rondasjunical.Excepciones.CategSoporNotFoundException;
import com.example.rondasjunical.Repositorios.CategSoporRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategSoporServicio {
    @Autowired
    private CategSoporRepositorio categSoporRepositorio;

    public CategSoporServicio(CategSoporRepositorio categSoporRepositorio) {
        this.categSoporRepositorio = categSoporRepositorio;
    }

    // Crud

    //Obtener todas las categorias
    public List<CategSopor> obtenerTodosLosCategSopors() {
        return categSoporRepositorio.findAll();
    }
    //Obtener categorias por Id
    public CategSopor obtenerCategSoporPorId(Long id) {
        return categSoporRepositorio.findById(id).orElseThrow(() -> new CategSoporNotFoundException(id));
    }
    //Guardar categoria
    public CategSopor guardarCategSopor(CategSopor categSopor) {
        return categSoporRepositorio.save(categSopor);
    }
    //Crear categoria
    public CategSopor crearCategSopor(CategSopor categSopor) {
        return categSoporRepositorio.save(categSopor);
    }
    // Método para obtener una categoria por su ID
    public CategSopor obtenerPorId(Long id){
        return categSoporRepositorio.findById(id).orElse(null);
    }
    //Actualizar una categoria
    public CategSopor actualizarCategSopor(CategSopor categSopor) {
        return categSoporRepositorio.save(categSopor);
    }
    //Inhabilitar Categoria
    public void inhabilitarCategSopor(Long id) {
        CategSopor categSopor = categSoporRepositorio.findById(id)
                        .orElseThrow(()-> new RuntimeException("Categoria no encontrada con el Id:" + id));
        categSopor.setHabilitado(false);
        categSoporRepositorio.save(categSopor);
    }
    //Metodo habilitar categoria
    public void habilitarCategSopor(Long id) {
        CategSopor categSopor = categSoporRepositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria no encontrada con el id: " + id));
        categSopor.setHabilitado(true); // Actualizar el estado
        categSoporRepositorio.save(categSopor);
    }
    //Eliminar Categoria
    public void eliminarCategSopor(Long id) {
        categSoporRepositorio.deleteById(id);
    }
    //Verificar existente categoria
    public boolean verificarCategSoporExistente(String categName) {
        return categSoporRepositorio.existsByCategName(categName);
    }
}
