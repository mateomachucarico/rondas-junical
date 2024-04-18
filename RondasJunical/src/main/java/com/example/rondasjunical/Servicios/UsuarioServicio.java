package com.example.rondasjunical.Servicios;
import com.example.rondasjunical.Entidades.Rol;
import com.example.rondasjunical.Entidades.Usuario;
import com.example.rondasjunical.Repositorios.UsuarioRepositorio;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UsuarioServicio {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    public UsuarioServicio(UsuarioRepositorio usuarioRepositorio){
        this.usuarioRepositorio = usuarioRepositorio;
    }

    public void addRol(Usuario usuario, Rol rol) {
        usuario.getRoles().add(rol);
        usuarioRepositorio.save(usuario);
    }

    public void removeRol(Usuario usuario, Rol rol) {
        usuario.getRoles().remove(rol);
        usuarioRepositorio.save(usuario);
    }
    //Registrar Usuarios
    public Usuario registrarUsuario(Usuario usuario) {
        usuario.setPassword(usuario.getPassword());
        usuarioRepositorio.save(usuario);
        return usuario;
    }

    //CRUD

    //Obtener todos los usuarios
    public List<Usuario> obtenerTodosLosUsuarios() {
        return usuarioRepositorio.findAll();
    }
    //Obtener usuario por Id
    public Usuario obtenerUsuarioPorId(Long id) {
        return usuarioRepositorio.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con ID: " + id));
    }
    //Guardar Usuario
    public Usuario guardarUsuario(Usuario usuario) {
        return usuarioRepositorio.save(usuario);
    }
    //Obtener un usuario por su Id
    public Usuario obtenerPorId(Long id){
        return usuarioRepositorio.findById(id).orElse(null);
    }
    //Actualizar Usuario
    public Usuario actualizarUsuario(Usuario usuario){
        return usuarioRepositorio.save(usuario);
    }
    //Inhabilitar Usuarios
    public void inhabilitarUsuario(Long id) {
        Usuario usuario = usuarioRepositorio.findById(id)
                .orElseThrow(()-> new RuntimeException("Usuario no encontrado por iD"+ id));
        usuario.setHabilitado(false);
        usuarioRepositorio.save(usuario);
    }
    //habilitar Usuarios
    public void habilitarUsuario(Long id) {
        Usuario usuario = usuarioRepositorio.findById(id)
                .orElseThrow(()-> new RuntimeException("Usuario no encontrado por iD"+ id));
        usuario.setHabilitado(true);
        usuarioRepositorio.save(usuario);
    }
    //Eliminar Usuario
    public void eliminarUsuario(Long id){
        usuarioRepositorio.deleteById(id);
    }
    // Verificar usuario existente por nombre
    public boolean verificarUsuarioExistente(String userName){
        return usuarioRepositorio.existsByUserName(userName);
    }
    public boolean verificarUsuarioExistentePorIdentificacion(Long identificacion) {
        return usuarioRepositorio.existsByIdentificacion(identificacion);
    }

    // Verificar usuario existente por email
    public boolean verificarExistentePorEmail(String email){
        return usuarioRepositorio.existsByEmail(email);
    }

    //Login de inicio de session
    public ResponseEntity<?> loginUsuario(Usuario usuario) {
        if (checkExistsByEmail(usuario.getEmail())) {
            Usuario contra = usuarioRepositorio.findByEmail(usuario.getEmail());
            String contrasenaEncriptada = (usuario.getPassword());
            if (contrasenaEncriptada.equals(contra.getPassword())) {
                System.out.println("TRUE");
                return new ResponseEntity<>(true, HttpStatus.OK);
            } else {
                System.out.println("NO COINCIDEN");
                return new ResponseEntity<>(false, HttpStatus.OK);
            }
        } else {
            System.out.println("NO SE ENCUENTRA");
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
    }
    //verificar si el email existe en la base de datos
    public boolean checkExistsByEmail(String email) {
        return usuarioRepositorio.existsByEmail(email);
    }
    public void agregarRolAUsuario(Long id, Long rolId) {
    }


}
