package com.example.rondasjunical.Controladores;
import com.example.rondasjunical.Entidades.Rol;
import com.example.rondasjunical.Repositorios.RolRepositorio;
import com.example.rondasjunical.Servicios.RolServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8080")
public class RolControlador {
    @Autowired
    private RolServicio rolServicio;

    @Autowired
    private RolRepositorio rolRepositorio;

    // Método para guardar un nuevo Rol
    @PostMapping("/roles/guardarRol")
    public ResponseEntity<Rol> guardarRol(@RequestBody Rol rol) {
        if (rol.getRolName() == null || rol.getRolDescripc() == null || rol.getRolFechaCreac() == null || rol.getRolFechaModic()== null) {
            // Manejar valores nulos (lanzar excepción, devolver mensaje de error)
            return ResponseEntity.badRequest().build();
        }
        Rol rolGuardado = rolServicio.guardarRol(rol);
        return ResponseEntity.status(HttpStatus.CREATED).body(rolGuardado);
    }
    // Métodos CRUD existentes para roles

    // Recuperar todas los Roles
    @GetMapping("/roles/obtenerTodosLosRoles")
    public ResponseEntity<List<Rol>> obtenerTodosLosRoles() {
        List<Rol> roles = rolServicio.obtenerTodosLosRoles();
        return ResponseEntity.ok(roles);
    }

    // Recuperar rol por ID
    @GetMapping("/roles/recuperarPorId/{id}")
    public ResponseEntity<Rol> obtenerRolPorId(@PathVariable Long id) {
        Rol rol = rolServicio.obtenerRolPorId(id);
        return ResponseEntity.ok(rol);
    }
    // Actualizar Rol
    @PutMapping("/roles/{id}")
    public ResponseEntity<?> actualizarRol(@PathVariable("id") Long id, @RequestBody Rol rolActualizada) {
        try {
            // Verificar si el ID proporcionado en la ruta coincide con el ID el rol actualizada
            if (!id.equals(rolActualizada.getId())) {
                throw new IllegalArgumentException("El ID el Rol del cuerpo no coincide con el ID proporcionado en la ruta.");
            }
            Rol rolActual = rolServicio.obtenerPorId(id);
            if (rolActual == null) {
                return new ResponseEntity<>("No se encontró ningun Rol con el ID proporcionado.", HttpStatus.NOT_FOUND);
            }
            Rol rolActualizadaGuardada = rolServicio.actualizarRol(rolActualizada);
            return new ResponseEntity<>(rolActualizadaGuardada, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    // Eliminar rol
    @DeleteMapping("/roles/{id}")
    public ResponseEntity<String> eliminarRolPorId(@PathVariable Long id) {
        rolServicio.eliminarRol(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Rol con ID " + id + " eliminada correctamente.");
    }
    // Inhabilitar Rol
    @PutMapping("/roles/{id}/inhabilitar")
    public ResponseEntity<Void> inhabilitarRolPorId(@PathVariable Long id) {
        rolServicio.inhabilitarRol(id);
            return ResponseEntity.ok().build();
    }
    // habilitar Rol
    @PutMapping("/roles/{id}/habilitar")
    public ResponseEntity<Void> habilitarRolPorId(@PathVariable Long id) {
        rolServicio.habilitarRol(id);
        return ResponseEntity.ok().build();
    }
    // verificar si un rol existe en la base de datos
    @GetMapping("/roles/existe/{rolName}")
    public ResponseEntity<?> verificarRolExistente(@PathVariable String rolName) {
        try {
            boolean existe = rolServicio.verificarRolExistente(rolName);
            return ResponseEntity.ok(existe);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al verificar si el rol existe por Nombre: " + e.getMessage());
        }
    }
}
