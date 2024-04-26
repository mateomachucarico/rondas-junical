package com.example.rondasjunical.Controladores;
import com.example.rondasjunical.Entidades.Torre;
import com.example.rondasjunical.Repositorios.TorreRepositorio;
import com.example.rondasjunical.Servicios.TorreServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8080")
public class TorreControlador {

    @Autowired
    private TorreServicio torreServicio;

    @Autowired
    private TorreRepositorio torreRepositorio;

    // **Método para guardar un nuevo torre:**
    @PostMapping("/torres/guardarTorre")
    public ResponseEntity<Torre> guardarPiso(@RequestBody Torre torre) {
        if (torre.getTorreName() == null ){
            // Manejar valores nulos (lanzar excepción, devolver mensaje de error)
            return ResponseEntity.badRequest().build();
        }
        Torre torreGuardado = torreServicio.guardarTorre(torre);
            return ResponseEntity.status(HttpStatus.CREATED).body(torreGuardado);
    }

    // CRUD de torre

    // Recuperar todas los torre
    @GetMapping("/torres/obtenerTodosLosTorres")
    public ResponseEntity<List<Torre>> obtenerTodosLosTorres() {
        List<Torre> torres = torreServicio.obtenerTodosLosTorres();
        for (Torre torre : torres)
        {
            System.out.println(torre.getTorreName());
        }
        return ResponseEntity.ok(torres);
    }

    // Recuperar torre por ID
    @GetMapping("/torres/recuperarPorId/{id}")
    public ResponseEntity<Torre> obtenerTorrePorId(@PathVariable Long id) {
        Torre torre = torreServicio.obtenerTorrePorId(id);
            return ResponseEntity.ok(torre);
    }

    // Nuevo controlador para actualizar una torre.
    @PutMapping("torres/{id}")
    public ResponseEntity<?> actualizarTorre(@PathVariable("id") Long id, @RequestBody Torre torreActualizada) {
        try {
            // Verificar si el ID proporcionado en la ruta coincide con el ID de la torre actualizada
            if (!id.equals(torreActualizada.getId())) {
                throw new IllegalArgumentException("El ID de la Torre del cuerpo no coincide con el ID proporcionado en la ruta.");
            }
            Torre torreActual = torreServicio.obtenerPorId(id);
            if (torreActual == null) {
                return new ResponseEntity<>("No se encontró ninguna torre con el ID proporcionado.", HttpStatus.NOT_FOUND);
            }
            Torre torreActualizadaGuardada = torreServicio.actualizarTorre(torreActualizada);
            return new ResponseEntity<>(torreActualizadaGuardada, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    // Eliminar torre
    @DeleteMapping("/torres/{id}")
    public ResponseEntity<String> eliminarTorrePorId(@PathVariable Long id) {
        torreServicio.eliminarTorre(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Torre con ID " + id + " eliminada correctamente.");
    }
    //Inhabilitar Torre
    @PutMapping("/torres/{id}/inhabilitar")
    public ResponseEntity<Void> inhabilitarTorre(@PathVariable Long id) {
        torreServicio.inhabilitarTorre(id);
            return ResponseEntity.ok().build();
    }
    //Habilitar Torre
    @PutMapping("/torres/{id}/habilitar")
    public ResponseEntity<Void> habilitarTorre(@PathVariable Long id) {
        torreServicio.habilitarTorre(id);
            return ResponseEntity.ok().build();
    }

    // verificar si una torre existe en la base de datos
    @GetMapping("/torres/existe/{torreName}")
    public ResponseEntity<?> verificarTorreExistente(@PathVariable String torreName) {
        try {
            boolean existe = torreServicio.verificarTorreExistente(torreName);
            return ResponseEntity.ok(existe);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al verificar si la Torre existe por Nombre: " + e.getMessage());
        }
    }
}
