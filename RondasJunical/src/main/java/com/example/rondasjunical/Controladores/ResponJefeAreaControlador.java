package com.example.rondasjunical.Controladores;
import com.example.rondasjunical.Entidades.ResponJefeArea;
import com.example.rondasjunical.Repositorios.ResponJefeAreaRepositorio;
import com.example.rondasjunical.Servicios.ResponJefeAreaServicio;
import jakarta.persistence.Id;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8080")
public class ResponJefeAreaControlador {

    @Autowired
    private ResponJefeAreaServicio responJefeAreaServicio;

    @Autowired
    private ResponJefeAreaRepositorio responJefeAreaRepositorio;

    // Método para guardar un nuevo responsable
    @PostMapping("/responJefeAreas/guardarResponJefeArea")
    public ResponseEntity<ResponJefeArea> guardarResponJefeArea(@RequestBody ResponJefeArea responJefeArea) {
        if (responJefeArea.getResponName() == null || responJefeArea.getResponEmail() == null) {
            // Manejar valores nulos (lanzar excepción, devolver mensaje de error)
            return ResponseEntity.badRequest().build();
        }
        ResponJefeArea responJefeAreaGuardado = responJefeAreaServicio.guardarResponJefeArea(responJefeArea);
        return ResponseEntity.status(HttpStatus.CREATED).body(responJefeAreaGuardado);
    }

    // CRUD de Responsable Jefe responsable de area

    // Recuperar todas las Responsables de area
    @GetMapping("/responJefeAreas/obtenerTodosLosResponJefeArea")
    public ResponseEntity<List<ResponJefeArea>> obtenerTodosLosResponJefeAreas() {
        List<ResponJefeArea> responJefeAreas = responJefeAreaServicio.obtenerTodasLosResponJefeArea();
        return ResponseEntity.ok(responJefeAreas);
    }
    // Recuperar Responsable de area por ID
    @GetMapping("/responJefeArea/recuperarPorId{id}")
    public ResponseEntity<ResponJefeArea> obtenerResponJefeAreaPorId(@PathVariable Long id){
        ResponJefeArea responJefeArea = responJefeAreaServicio.obtenerResponJefeAreaPorId(id);
        return ResponseEntity.ok(responJefeArea);
    }
    // Actualizar Responsable jefe de area
    @PutMapping("/responJefeAreas/{id}")
    public ResponseEntity<?> actulizarResponJefeArea(@PathVariable("id") Long id, @RequestBody ResponJefeArea responJefeAreaActualizada) {
        try {
            if(!id.equals(responJefeAreaActualizada.getId())){
                throw new IllegalArgumentException("El Id del jefe de area del cuerpo no coincide con el Id proporcionado en la ruta.");
            }
            ResponJefeArea responJefeAreaActual = responJefeAreaServicio.obtenerPorId(id);
                if (responJefeAreaActual == null){
                    return new ResponseEntity<>("No se encontro ninguna Categoria con el Id proporcionado.", HttpStatus.NOT_FOUND);
                }
                ResponJefeArea responJefeAreaActualizadaGuardada = responJefeAreaServicio.actualizarResponJefeArea(responJefeAreaActualizada);
                    return new ResponseEntity<>(responJefeAreaActualizadaGuardada, HttpStatus.OK);
            } catch (IllegalArgumentException e){
                return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    // Eliminar Jefe Responsable del area
    @DeleteMapping("/responJefeAreas/{id}")
    public ResponseEntity<String> eliminarResponJefeAreaPorId(@PathVariable Long id){
        responJefeAreaServicio.eliminarResponJefeArea(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Jefe Responsable del Area con ID" + id + "eliminado correctamente." );
    }

    // Inhabilitar Jefe Responsable del area
    @PutMapping("/responJefeAreas/{id}/inhabilitar")
    public ResponseEntity<Void> inhabilitarResponJefeArea(@PathVariable Long id){
        responJefeAreaServicio.inhabilitarResponJefeArea(id);
            return ResponseEntity.ok().build();
    }
    // habilitar Jefe Responsable del area
    @PutMapping("/responJefeAreas/{id}/habilitar")
    public ResponseEntity<Void> habilitarResponJefeArea(@PathVariable Long id){
        responJefeAreaServicio.habilitarResponJefeArea(id);
        return ResponseEntity.ok().build();
    }
    // verificar si una categoria existe en la base de datos
    @GetMapping("/responJefeAreas/existe/{responName}")
    public ResponseEntity<?> verificarResponJefeAreasExistente(@PathVariable String responName) {
        try {
            boolean existe = responJefeAreaServicio.verificarResponJefeAreasExistente(responName);
            return ResponseEntity.ok(existe);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al verificar si el Jefe de Area existe por Nombre: " + e.getMessage());
        }
    }
    @GetMapping("/responJefeAreas/existeEmail/{responEmail}")
    public ResponseEntity<?> verificarResponJefeAreasExistentePorEmail(@PathVariable String responEmail) {
        try {
            boolean existe = responJefeAreaServicio.verificarResponJefeAreasExistentePorEmail(responEmail);
            return ResponseEntity.ok(existe);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al verificar si el Jefe de Area existe por Email: " + e.getMessage());
        }
    }
}
