package com.example.rondasjunical.Servicios;
import com.example.rondasjunical.Entidades.Rol;
import com.example.rondasjunical.Entidades.Usuario;
import com.example.rondasjunical.Repositorios.RolRepositorio;
import com.example.rondasjunical.Repositorios.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class RolServicio {

    @Autowired
    private RolRepositorio rolRepositorio;

//    public RolServicio(RolRepositorio rolRepositorio){
//        this.rolRepositorio = rolRepositorio;
//    }

//    public void addUsuario(Rol rol, Usuario usuario) {
//        rol.getUsuarios().add(usuario);
//        rolRepositorio.save(rol);
//    }
//
//    public void removeUsuario(Rol rol, Usuario usuario) {
//        rol.getUsuarios().remove(usuario);
//        rolRepositorio.save(rol);
//    }

    // inicio de CRUD

    //Obtener todos los roles
    public List<Rol> obtenerTodosLosRoles() {
        return rolRepositorio.findAll();
    }

    //Obtener Rol por Id
    public Rol obtenerRolPorId(Long id) {
        return rolRepositorio.findById(id).orElseThrow(() -> new RolNotFoundException(id));
    }
    //Guardar rol
    public Rol guardarRol(Rol rol){
        return rolRepositorio.save(rol);
    }
    //Crear rol
    public Rol crearRol(Rol rol) {
        return rolRepositorio.save(rol);
    }
    //Obtener rol por su Id
    public Rol obtenerPorId(Long id){
        return rolRepositorio.findById(id).orElse(null);
    }
    //Actualizar Rol
    public Rol actualizarRol(Rol rol) {
        return rolRepositorio.save(rol);
    }
    //Inhabilitar rol
    public void inhabilitarRol(Long id) {
        Rol rol = rolRepositorio.findById(id)
                .orElseThrow(()-> new RuntimeException("Rol no encontrado con el Id:"+ id));
        rol.setHabilitado(false);
        rolRepositorio.save(rol);
    }
    //habilitar rol
    public void habilitarRol(Long id) {
        Rol rol = rolRepositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("Rol no encontrado con el Id:" + id));
        rol.setHabilitado(true);
        rolRepositorio.save(rol);
    }
    //Eliminar Rol
    public void eliminarRol(Long id) {
        rolRepositorio.deleteById(id);
    }
    //Verificar existente rol
    public boolean verificarRolExistente(String rolName) {
        return rolRepositorio.existsByRolName(rolName);
    }
    // fin de crud


    // usuarios

    public void agregarUsuarioARol(Long id, Long usuarioId) {
    }

    public static class RolNotFoundException extends RuntimeException {
        public RolNotFoundException(Long message) {
            super(String.valueOf(message));
        }
    }
}
