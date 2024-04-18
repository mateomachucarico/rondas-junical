package com.example.rondasjunical.Servicios;

import com.example.rondasjunical.Entidades.Permiso;
import com.example.rondasjunical.Excepciones.PermisoNotFoundException;
import com.example.rondasjunical.Repositorios.PermisoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PermisoService {

    @Autowired
    private PermisoRepositorio PermisoRepositorio;
    @Autowired
    private PermisoRepositorio permisoRepositorio;

    public PermisoService(PermisoRepositorio permisoRepositorio) {
        this.PermisoRepositorio = permisoRepositorio;

    }
    // CRUD

    //Obtener todos los permisos
    public List<Permiso> obtenerTodosLosPermisos() {
        return PermisoRepositorio.findAll();
    }
    //Obtener permisos por Id
    public Permiso obtenerPorId(Long id) {
        return permisoRepositorio.findById(id).orElse(null);
    }
    //Obtener permiso por Id NotFoundException
    public Permiso obtenerPermisoPorId(Long id) {
        return PermisoRepositorio.findById(id).orElseThrow(()-> new PermisoNotFoundException(id));
    }

    //Guardar Permiso
    public Permiso guardarPermiso(Permiso permiso) {
        return PermisoRepositorio.save(permiso);
    }
    //Metodo para Actualizar un Permiso
    public Permiso actualizarPermiso(Permiso permiso) {
        return PermisoRepositorio.save(permiso);
    }
    //Metodo para eliminar un permiso
    public void eliminarPermiso(Long id) {
        PermisoRepositorio.deleteById(id);
    }
    //Metodo para Inhabilitar un permiso
    public void inhabilitarPermiso(Long id) {
        Permiso permiso = permisoRepositorio.findById(id)
                .orElseThrow(()-> new RuntimeException("Permiso no encontrado con el Id:" + id));
        permiso.setHabilitado(false);
        permisoRepositorio.save(permiso);
    }
    //Metodo para habilitar un permiso
    public void habilitarPermiso(Long id) {
        Permiso permiso = permisoRepositorio.findById(id)
                .orElseThrow(()-> new RuntimeException("Permiso no encontrado con el Id:" + id));
        permiso.setHabilitado(true);
        permisoRepositorio.save(permiso);
    }
}
