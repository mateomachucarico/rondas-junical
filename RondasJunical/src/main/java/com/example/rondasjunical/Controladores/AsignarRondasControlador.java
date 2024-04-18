package com.example.rondasjunical.Controladores;
import com.example.rondasjunical.Entidades.AsignarRonda;
import com.example.rondasjunical.Repositorios.AsignarRondaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8080")
public class AsignarRondasControlador {
    @Autowired
    private com.example.rondasjunical.Servicios.AsignarRondaServicio asignarRondaServicio;

    @Autowired
    private AsignarRondaRepositorio asignarRondaRepositorio;

    // guardar  ronda asignada
    @PostMapping("/asignarRondas/guardarAsignarRondas")
    public ResponseEntity<AsignarRonda> guardarAsignarRonda(@RequestBody AsignarRonda asignarRonda) {
        if (asignarRonda.getUsuario() == null || asignarRonda.getAsignarFechas() == null || asignarRonda.getAsignarTorre()== null || asignarRonda.getAsignarCateg()== null || asignarRonda.getAsignarObservacion()==null) {
            return ResponseEntity.badRequest().build();
        }
        AsignarRonda AsignarRondaGuardado = asignarRondaServicio.guardarAsignarRonda(asignarRonda);
            return ResponseEntity.status(HttpStatus.CREATED).body(AsignarRondaGuardado);
    }

    // CRUD de asignar rondas

    // Recuperar todas los asignar rondas
    @GetMapping("/asignarRondas/obtenerTodosLosAsignarRonda")
    public ResponseEntity<List<AsignarRonda>> obtenerTodosLosAsignarRonda() {
        List<AsignarRonda> asignarRonda = asignarRondaServicio.obtenerTodosLosAsignarRonda();
        return ResponseEntity.ok(asignarRonda);
    }
    // Recuperar ronda asignada por ID
    @GetMapping("/asignarRondas/recuperarPorId/{id}")
    public ResponseEntity<AsignarRonda> obtenerAsignarRondaPorId(@PathVariable Long id) {
        AsignarRonda asignarRonda = asignarRondaServicio.obtenerAsignarRondaPorId(id);
        return ResponseEntity.ok(asignarRonda);
    }
    //Actualizar Asignacion de Ronda
    @PutMapping("asignarRondas/{id}")
    public ResponseEntity<?> actualizarAsignarRonda(@PathVariable("id") Long id, @RequestBody AsignarRonda asignarRondaActualizada) {
        try {
            // Verificar si el ID proporcionado en la ruta coincide con el ID de la ronda actualizada
            if (!id.equals(asignarRondaActualizada.getId())) {
                throw new IllegalArgumentException("El ID de la ronda del cuerpo no coincide con el ID proporcionado en la ruta.");
            }
            AsignarRonda asignarRondaActual = asignarRondaServicio.obtenerPorId(id);
            if (asignarRondaActual == null) {
                return new ResponseEntity<>("No se encontró ninguna la ronda con el ID proporcionado.", HttpStatus.NOT_FOUND);
            }
            AsignarRonda asignarRondaActualizadaGuardada = asignarRondaServicio.actualizarAsignarRonda(asignarRondaActualizada);
                return new ResponseEntity<>(asignarRondaActualizadaGuardada, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    //Eliminar Ronda
    @DeleteMapping("/asignarRondas/{id}")
    public ResponseEntity<String> eliminarAsignarRondaPorId(@PathVariable Long id) {
        asignarRondaServicio.eliminarAsignarRonda(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Ronda con ID " + id + " eliminada correctamente.");
    }
    // Inhabilitar ronda asignar
    @DeleteMapping("asignarRondas/{id}/inhabilitar")
    public ResponseEntity<Void> inhabilitarAsignarRonda(@PathVariable Long id) {
        asignarRondaServicio.inhabilitarAsignarRonda(id);
            return ResponseEntity.ok().build();
    }
    // habilitar ronda asignar
    @DeleteMapping("asignarRondas/{id}/habilitar")
    public ResponseEntity<Void> habilitarAsignarRonda(@PathVariable Long id) {
        asignarRondaServicio.habilitarAsignarRonda(id);
        return ResponseEntity.ok().build();
    }
}
