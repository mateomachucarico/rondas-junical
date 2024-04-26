package com.example.rondasjunical.Controladores;
import com.example.rondasjunical.Entidades.Zona;
import com.example.rondasjunical.Repositorios.ZonaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Controller
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8080")
public class ZonaControlador {

    @Autowired
    private com.example.rondasjunical.Servicios.ZonaServicio zonaServicio;
    @Autowired
    private ZonaRepositorio zonaRepositorio;

    // Método para guardar un nuevo zona
    @PostMapping("/zonas/guardarZona")
    public ResponseEntity<Zona> guardarZona(@RequestBody Zona zona) {
        if (zona.getZonaName() == null || zona.getTorre()== null || zona.getPiso()== null || zona.getArea()==null) {
            // Manejar valores nulos (lanzar excepción, devolver mensaje de error)
            return ResponseEntity.badRequest().build();
        }
        Zona zonaGuardado = zonaServicio.guardarZona(zona);
            return ResponseEntity.status(HttpStatus.CREATED).body(zonaGuardado);
    }

    // CRUD de zona

    // Recuperar todas los zonas
    @GetMapping("/zonas/obtenerTodosLosZonas")
    public ResponseEntity<List<Zona>> obtenerTodosLosZonas() {
        List<Zona> zonas = zonaServicio.obtenerTodosLosZonas();
        return ResponseEntity.ok(zonas);
    }

    // Recuperar zona por ID
    @GetMapping("/zonas/recuperarPorId/{id}")
    public ResponseEntity<Zona> obtenerZonaPorId(@PathVariable Long id) {
        Zona zona = zonaServicio.obtenerZonaPorId(id);
        return ResponseEntity.ok(zona);
    }
    // Actualizar zona
    @PutMapping("/zonas/{id}")
    public ResponseEntity<?> actualizarZona(@PathVariable("id") Long id, @RequestBody Zona zonaActualizada) {
        try {
            if (!id.equals(zonaActualizada.getId())) {
                throw new IllegalArgumentException("El Id de la Zona no cuincide con el Id proporcionado en la ruta.");
            }
            Zona zonaActual = zonaServicio.obtenerPorId(id);
            if (zonaActual == null) {
                return new ResponseEntity<>("No se encontró ninguna Zona con el ID proporcionado.", HttpStatus.NOT_FOUND);
            }
            Zona zonaActualizadaGuardada = zonaServicio.actualizarZona(zonaActualizada);
            return new ResponseEntity<>(zonaActualizadaGuardada, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    // Eliminar zona
    @DeleteMapping("/zonas/{id}")
    public ResponseEntity<String> eliminarZonaPorId (@PathVariable Long id) {
        zonaServicio.eliminarZona(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Zona con ID " + id + " eliminada correctamente.");
    }

    // Inhabilitar zona
    @PutMapping("/zonas/{id}/inhabilitar")
    public ResponseEntity<Void> inhabilitarZona(@PathVariable Long id){
        zonaServicio.inhabilitarZona(id);
            return ResponseEntity.ok().build();
    }
    // habilitar zona
    @PutMapping("/zonas/{id}/habilitar")
    public ResponseEntity<Void> habilitarZona(@PathVariable Long id){
        zonaServicio.habilitarZona(id);
        return ResponseEntity.ok().build();
    }
    // verificar si una zona existe en la base de datos
    @GetMapping("/zonas/existe/{zonaName}")
    public ResponseEntity<?> verificarZonaExistente(@PathVariable String zonaName) {
        try {
            boolean existe = zonaServicio.verificarZonaExistente(zonaName);
            return ResponseEntity.ok(existe);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al verificar si la Zona existe por Nombre: " + e.getMessage());
        }
    }
}
