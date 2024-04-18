package com.example.rondasjunical.Controladores;

import com.example.rondasjunical.Entidades.Piso;
import com.example.rondasjunical.Repositorios.PisoRepositorio;
import com.example.rondasjunical.Servicios.PisoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8080")
public class PisoControlador {

    @Autowired
    private PisoServicio pisoServicio;

    @Autowired
    private PisoRepositorio pisoRepositorio;

    // Método para guardar un nuevo piso
    @PostMapping("/pisos/guardarPiso")
    public ResponseEntity<Piso> guardarPiso(@RequestBody Piso piso) {
        if (piso.getPisoName() == null || piso.getPisoNumber() == null) {
            // Manejar valores nulos (lanzar excepción, devolver mensaje de error)
            return ResponseEntity.badRequest().build();
        }
        Piso pisoGuardado = pisoServicio.guardarPiso(piso);
        return ResponseEntity.status(HttpStatus.CREATED).body(pisoGuardado);
    }

    // CRUD de Pisos

    // Recuperar todas los pisos
    @GetMapping("/pisos/obtenerTodosLosPisos")
    public ResponseEntity<List<Piso>> obtenerTodosLosPisos() {
        List<Piso> pisos = pisoServicio.obtenerTodosLosPisos();
        return ResponseEntity.ok(pisos);
    }

    // Recuperar piso por ID
    @GetMapping("/pisos/recuperarPorId/{id}")
    public ResponseEntity<Piso> obtenerPisoPorId(@PathVariable Long id) {
        Piso piso = pisoServicio.obtenerPisoPorId(id);
        return ResponseEntity.ok(piso);
    }

    // Actualizar piso
    @PutMapping("pisos/{id}")
    public ResponseEntity<?> actualizarPiso(@PathVariable("id") Long id, @RequestBody Piso pisoActualizada) {
        try {
            // Verificar si el ID proporcionado en la ruta coincide con el ID del piso actualizada
            if (!id.equals(pisoActualizada.getId())) {
                throw new IllegalArgumentException("El ID del Piso del cuerpo no coincide con el ID proporcionado en la ruta.");
            }
            Piso pisoActual = pisoServicio.obtenerPorId(id);
            if (pisoActual == null) {
                return new ResponseEntity<>("No se encontró ninguna piso con el ID proporcionado.", HttpStatus.NOT_FOUND);
            }
            Piso pisoActualizadaGuardada = pisoServicio.actualizarPiso(pisoActualizada);
            return new ResponseEntity<>(pisoActualizadaGuardada, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    // Eliminar piso
    @DeleteMapping("/pisos/{id}")
    public ResponseEntity<String> eliminarPisoPorId(@PathVariable Long id) {
        pisoServicio.eliminarPiso(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Piso con ID " + id + " eliminada correctamente.");
    }

    // Inhabilitar piso
    @PutMapping("/pisos/{id}/inhabilitar")
    public ResponseEntity<Void> inhabilitarPiso(@PathVariable Long id) {
        pisoServicio.inhabilitarPiso(id);
        return ResponseEntity.ok().build();
    }

    // Habilitar piso
    @PutMapping("/pisos/{id}/habilitar")
    public ResponseEntity<Void> habilitarPiso(@PathVariable Long id) {
        pisoServicio.habilitarPiso(id);
        return ResponseEntity.ok().build();
    }

// verificar si una piso existe en la base de datos
    @GetMapping("/pisos/existe/{pisoNumber}")
    public ResponseEntity<?> verificarPisoExistente(@PathVariable Long pisoNumber) {
        try {
            boolean existe = pisoServicio.verificarPisoExistente(pisoNumber);
            return ResponseEntity.ok(existe);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al verificar si el piso existe por Numero: " + e.getMessage());
        }
    }
}