package com.example.rondasjunical.Controladores;

import com.example.rondasjunical.Entidades.CategSopor;
import com.example.rondasjunical.Repositorios.CategSoporRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8080")
public class CategSoporControlador {
    @Autowired
    private com.example.rondasjunical.Servicios.CategSoporServicio categSoporServicio;
    @Autowired
    private CategSoporRepositorio categSoporRepositorio;

    //Necesito realiar lo siguiente: tengo que subir mi proyecto realizado en angular phpstrord
    // Método para guardar un nuevo categoria
    @PostMapping("/categSopor/guardarCategSopor")
    public ResponseEntity<CategSopor> guardarCategSpor(@RequestBody CategSopor categSopor) {
        if (categSopor.getCategName() == null) {
            // Manejar valores nulos (lanzar excepción, devolver mensaje de error)
            return ResponseEntity.badRequest().build();
        }
        CategSopor categSoporGuardado = categSoporServicio.guardarCategSopor(categSopor);
        return ResponseEntity.status(HttpStatus.CREATED).body(categSoporGuardado);
    }

    // CRUD de Categoria

    // Recuperar todas los Categoria
    @GetMapping("/categSopor/obtenerTodosLosCategSopors")
    public ResponseEntity<List<CategSopor>> obtenerTodosLosCategSopors() {
        List<CategSopor> categSopors = categSoporServicio.obtenerTodosLosCategSopors();
        return ResponseEntity.ok(categSopors);
    }

    // Recuperar Categoria por ID
    @GetMapping("/categSopor/recuperarPorId/{id}")
    public ResponseEntity<CategSopor> obtenerCategiaPorId(@PathVariable Long id) {
        CategSopor categSopor = categSoporServicio.obtenerCategSoporPorId(id);
        return ResponseEntity.ok(categSopor);
    }
    // Actualiza la anotación @PutMapping para reflejar la ruta adecuada
    @PutMapping("/categSopor/{id}")
    public ResponseEntity<?> actualizarCategSopor(@PathVariable("id") Long id, @RequestBody CategSopor categSoporActualizada) {
        try {
            if (!id.equals(categSoporActualizada.getId())){
                throw new IllegalArgumentException("El id de la categoría del cuerpo no coincide con el ID proporcionado en la ruta.");
            }
            CategSopor categSoporActual = categSoporServicio.obtenerPorId(id);
            if (categSoporActual == null){
                return new ResponseEntity<>("No se encontró ninguna categoría con el ID proporcionado.", HttpStatus.NOT_FOUND);
            }
            CategSopor categSoporActualizadaGuardada = categSoporServicio.actualizarCategSopor(categSoporActualizada);
            return new ResponseEntity<>(categSoporActualizadaGuardada, HttpStatus.OK);
        } catch (IllegalArgumentException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Eliminar Categoria
    @DeleteMapping("/categSopor/{id}")
    public ResponseEntity<String> eliminarCategSoporPorId (@PathVariable Long id){
        categSoporServicio.eliminarCategSopor(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Categoria con ID " + id + " eliminada correctamente.");
    }

    // Inhabilitar categoria
    @PutMapping("/categSopor/{id}/inhabilitar")
    public ResponseEntity<Void> inhabilitarCategSopor (@PathVariable Long id){
        categSoporServicio.inhabilitarCategSopor(id);
        return ResponseEntity.ok().build();
    }
    //Habilitar Categoria
    @PutMapping("/categSopor/{id}/habilitar")
    public ResponseEntity<Void> habilitarCategSopor(@PathVariable Long id) {
        categSoporServicio.habilitarCategSopor(id);
        return ResponseEntity.ok().build();
    }
    // verificar si una categortia existe en la base de datos
    @GetMapping("/categSopor/existe/{categName}")
    public ResponseEntity<?> verificarCategSoporExistente(@PathVariable String categName) {
        try {
            boolean existe = categSoporServicio.verificarCategSoporExistente(categName);
            return ResponseEntity.ok(existe);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al verificar si la Categoria existe por Nombre: " + e.getMessage());
        }
    }
}
