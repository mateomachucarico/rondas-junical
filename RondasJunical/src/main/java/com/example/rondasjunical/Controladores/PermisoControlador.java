package com.example.rondasjunical.Controladores;
import com.example.rondasjunical.Entidades.Permiso;
import com.example.rondasjunical.Repositorios.PermisoRepositorio;
import com.example.rondasjunical.Servicios.PermisoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8080")
public class PermisoControlador {

    @Autowired
    private PermisoService permisoService;

    @Autowired
    private PermisoRepositorio permisoRepositorio;

    // Crud

    // **Método para guardar un nuevo Permiso:**
    @PostMapping("/permisos/guardarPermiso")
    public ResponseEntity<Permiso> guardarPermiso (@RequestBody Permiso permiso){
            if (permiso.getPermisoName() == null) {
                // Manejar valores nulos (lanzar excepción, devolver mensaje de error)
                return ResponseEntity.badRequest().build();
            }
            Permiso permisoGuardado = permisoService.guardarPermiso(permiso);
                return ResponseEntity.status(HttpStatus.CREATED).body(permisoGuardado);
    }
    //Recuperar todos los Permisos
    @GetMapping("/permisos/obtenerTodosLosPermisos")
    public ResponseEntity<List<Permiso>> obtenerTodosLosPermisos() {
        List<Permiso> permisos = permisoService.obtenerTodosLosPermisos();
        return ResponseEntity.ok(permisos);
    }

    //Recuperar Permisos por ID
    @GetMapping("/permisos/recuperarPorId/{id}")
    public ResponseEntity<Permiso> obtenerPermisoPorId(@PathVariable Long id){
        Permiso permiso = permisoService.obtenerPermisoPorId(id);
        return ResponseEntity.ok(permiso);
    }
    // Nuevo controlador para actualizar un permiso.
    @PutMapping("permisos/{id}")
    public ResponseEntity<?> actualizarPermiso(@PathVariable("id") Long id, @RequestBody Permiso permisoActualizada) {
        try {
            // Verificar si el ID proporcionado en la ruta coincide con el ID de la Permiso actualizada
            if (!id.equals(permisoActualizada.getId())) {
                throw new IllegalArgumentException("El ID del Permiso del cuerpo no coincide con el ID proporcionado en la ruta.");
            }
            Permiso permisoActual = permisoService.obtenerPorId(id);
            if (permisoActual == null) {
                return new ResponseEntity<>("No se encontró ningun Permiso con el ID proporcionado.", HttpStatus.NOT_FOUND);
            }
            Permiso permisoActualizadaGuardada = permisoService.actualizarPermiso(permisoActualizada);
            return new ResponseEntity<>(permisoActualizadaGuardada, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    // Eliminar permiso
    @DeleteMapping("/permisos/{id}")
    public ResponseEntity<String> eliminarPermisoPorId(@PathVariable Long id) {
        permisoService.eliminarPermiso(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Permiso con ID " + id + " eliminada correctamente.");
    }
    //Inhabilitar permiso
    @PutMapping("/permisos/{id}/inhabilitar")
    public ResponseEntity<Void> inhabilitarPermiso(@PathVariable Long id) {
        permisoService.inhabilitarPermiso(id);
        return ResponseEntity.ok().build();
    }
    //Habilitar permiso
    @PutMapping("/permisos/{id}/habilitar")
    public ResponseEntity<Void> habilitarPermiso(@PathVariable Long id) {
        permisoService.habilitarPermiso(id);
        return ResponseEntity.ok().build();
    }


}
