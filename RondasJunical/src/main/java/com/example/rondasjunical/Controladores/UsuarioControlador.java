package com.example.rondasjunical.Controladores;
import com.example.rondasjunical.Entidades.Usuario;
import com.example.rondasjunical.Repositorios.UsuarioRepositorio;
import com.example.rondasjunical.Servicios.UsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8080")
public class UsuarioControlador {

    //    @Autowired
    //    public static final String ADMIN_ROLE = "ADMIN";

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Autowired
    private UsuarioServicio usuarioServicio;

    //Registrar Usuarios
//    @GetMapping("/admin")
//    public ResponseEntity<?> registrarUsuario(@RequestBody Usuario usuario) {
//        try {
//            Usuario nuevoUsuario = usuarioServicio.registrarUsuario(usuario);
//            return ResponseEntity.ok(nuevoUsuario);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al registrar usuario: " + e.getMessage());
//        }
//    }
    //Inicio de seccion del Login
    //Ingresar al dashboard
    @PostMapping("/usuarios/login")
    public ResponseEntity<?> loginUsuario(@RequestBody Usuario usuario){
        return usuarioServicio.loginUsuario(usuario);
    }

//    @PostMapping("/{id}/roles/{rolId}")
//    public ResponseEntity<?> agregarRolAUsuario(@PathVariable Long id, @PathVariable Long rolId) {
//        try {
//            usuarioServicio.agregarRolAUsuario(id, rolId);
//            return ResponseEntity.ok("Rol agregado correctamente al usuario.");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al agregar rol al usuario: " + e.getMessage());
//        }
//    }

    //CRUD

    // **Método para guardar un nuevo Usuario:**
    @PostMapping("/usuarios/guardarUsuarios")
    public ResponseEntity<Usuario> guardarUsuarios(@RequestBody Usuario usuario){
        if (usuario.getUserName()==null || usuario.getEmail()==null || usuario.getPassword()==null || usuario.getIdentificacion()==null || usuario.getCelular()==null || usuario.getRol()==null || usuario.getCargo()==null || usuario.getArea()==null ){
            return ResponseEntity.badRequest().build();
        }
        Usuario usuarioGuardado = usuarioServicio.guardarUsuarios(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(usuarioGuardado);
    }
    // Recuperar todas los usuarios
    @GetMapping("/usuarios/obtenerTodosLosUsuarios")
    public ResponseEntity<List<Usuario>> obtenerTodosLosUsuarios(){
        List<Usuario> usuarios = usuarioServicio.obtenerTodosLosUsuarios();
        return ResponseEntity.ok(usuarios);
    }
    //Recuperar Usuario por Id
    @GetMapping("/usuarios/recuperarPorId/{id}")
    public ResponseEntity<Usuario> obtenerUsuarioPorId(@PathVariable Long id){
        Usuario usuario = usuarioServicio.obtenerUsuarioPorId(id);
        return ResponseEntity.ok(usuario);
    }
    //Actualizar Usuario
    @PutMapping("usuarios/{id}")
    public ResponseEntity<?> actualizarUsuario(@PathVariable("id") Long id, @RequestBody Usuario usuarioActualizada) {
        try {
            // Verificar si el ID proporcionado en la ruta coincide con el ID de la usuario actualizada
            if (!id.equals(usuarioActualizada.getId())) {
                throw new IllegalArgumentException("El ID del usuario no coincide con el ID proporcionado en la ruta.");
            }
            Usuario usuarioActual = usuarioServicio.obtenerPorId(id);
            if (usuarioActual == null) {
                return new ResponseEntity<>("No se encontró ninguna usuario con el ID proporcionado.", HttpStatus.NOT_FOUND);
            }
            Usuario usuarioActualizadaGuardada = usuarioServicio.actualizarUsuario(usuarioActualizada);
            return new ResponseEntity<>(usuarioActualizadaGuardada, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    //Eliminar Usuario
    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<String> eliminarUsuarioPorId(@PathVariable Long id) {
        usuarioServicio.eliminarUsuario(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Usuario con ID " + id + " eliminada correctamente.");
    }
    //Inhabilitar usuario
//    @PutMapping("/usuarios/{id}/inhabilitar")
//    public ResponseEntity<Void> inhabilitarUsuario(@PathVariable Long id) {
//        usuarioServicio.inhabilitarUsuario(id);
//        return ResponseEntity.ok().build();
//    }
    //Habilitar usuario
//    @PutMapping("/usuarios/{id}/habilitar")
//    public ResponseEntity<Void> habilitarUsuario(@PathVariable Long id) {
//        usuarioServicio.habilitarUsuario(id);
//        return ResponseEntity.ok().build();
//    }
    // verificar si un usuario existe en la base de datos

    @GetMapping("/usuarios/existe/{userName}")
    public ResponseEntity<?> verificarUsuarioExistente(@PathVariable String userName) {
        try {
            boolean existe = usuarioServicio.verificarUsuarioExistente(userName);
            return ResponseEntity.ok(existe);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al verificar si el Usuario existe por Nombre: " + e.getMessage());
        }
    }
    // Verificar si un usuario existe en la base de datos por su identificación
    @GetMapping("/usuarios/existePorIdentificacion/{identificacion}")
    public ResponseEntity<?> verificarUsuarioExistentePorIdentificacion(@PathVariable Long identificacion) {
        try {
            boolean existe = usuarioServicio.verificarUsuarioExistentePorIdentificacion(identificacion);
            return ResponseEntity.ok(existe);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al verificar si el Usuario existe por Identificación: " + e.getMessage());
        }
    }
    // UsuarioController.java
    @GetMapping("/usuarios/userExiste/{email}")
    public ResponseEntity<?> verificarExistentePorEmail(@PathVariable String email) {
        try {
            boolean existe = usuarioServicio.verificarExistentePorEmail(email);
            return ResponseEntity.ok(existe);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al verificar si el usuario existe por correo electrónico: " + e.getMessage());
        }
    }

    //Otros
//    @DeleteMapping("/usuarios/{id}/roles/{rolId}")
//    public ResponseEntity<?> eliminarRolDeUsuario(@PathVariable Long id, @PathVariable Long rolId) {
//        try {
//            return ResponseEntity.ok("Rol eliminado correctamente del usuario.");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar rol del usuario: " + e.getMessage());
//        }
//    }
}
