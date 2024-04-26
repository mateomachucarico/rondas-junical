package com.example.rondasjunical.Controladores;

import com.example.rondasjunical.Entidades.Area;
import com.example.rondasjunical.Repositorios.AreaRepositorio;
import com.example.rondasjunical.Servicios.AreaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8080")
public class AreaControlador {

    @Autowired
    private AreaServicio areaServicio;

    @Autowired
    private AreaRepositorio areaRepositorio;

    // Método para guardar un nuevo área
    @PostMapping("/areas/guardarArea")
    public ResponseEntity<Area> guardarArea(@RequestBody Area area) {
        if (area.getAreaName() == null || area.getResponJefeArea() == null) { // Verificamos que el nombre del área y el jefe de área no sean nulos
            // Crear un objeto Área con mensajes de error
            Area errorResponse = new Area();
            errorResponse.setAreaName("Error: Datos de área no válidos");
            return ResponseEntity.badRequest().body(errorResponse);
        }
        Area areaGuardado = areaServicio.guardarArea(area);
        return ResponseEntity.status(HttpStatus.CREATED).body(areaGuardado);
    }

    // CRUD de area

    // Recuperar todas los area
    @RequestMapping("/areas/obtenerTodosLosAreas")
    public ResponseEntity<List<Area>> obtenerTodosLosAreas() {
        List<Area> areas = areaServicio.obtenerTodosLosAreas();
        return ResponseEntity.ok(areas);
    }

    // Recuperar area por ID
    @GetMapping("/areas/recuperarPorId/{id}")
    public ResponseEntity<Area> obtenerAreaPorId(@PathVariable Long id) {
        Area area = areaServicio.obtenerAreaPorId(id);
        return ResponseEntity.ok(area);
    }

    // Actualizar area
    @PutMapping("/areas/{id}")
    public ResponseEntity<?> actualizarArea(@PathVariable("id") Long id, @RequestBody Area areaActualizada) {
        try {
            if (!id.equals(areaActualizada.getId())){
                throw new IllegalArgumentException("El Id deñ area no coincide con el Id proporcionado en la ruta.");
        }
            Area areaActual = areaServicio.obtenerPorId(id);
            if (areaActual == null){
                return new ResponseEntity<>("No se encontro ningun Cargo con el Id proporcionado.", HttpStatus.NOT_FOUND);
            }
            Area areaActualizadaGuardada = areaServicio.actualizarArea(areaActualizada);
                return new ResponseEntity<>(areaActualizadaGuardada, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    // Eliminar Area
    @DeleteMapping("/areas/{id}")
    public ResponseEntity<String> eliminarAreaPorId(@PathVariable Long id) {
        areaServicio.eliminarArea(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Area con ID " + id + " eliminada correctamente.");
    }
    // Inhabilitar area
    @PutMapping("/areas/{id}/inhabilitar")
    public ResponseEntity<Void> inhabilitarArea(@PathVariable Long id) {
        areaServicio.inhabilitarArea(id);
        return ResponseEntity.ok().build();
    }
    //Habilitar Area
    @PutMapping("/areas/{id}/habilitar")
    public ResponseEntity<Void> habilitarArea(@PathVariable Long id) {
        areaServicio.habilitarArea(id);
        return ResponseEntity.ok().build();
    }
    // verificar si un area existe en la base de datos
    @GetMapping("/areas/existe/{areaName}")
    public ResponseEntity<?> verificarAreaExistente(@PathVariable String areaName) {
        try {
            boolean existe = areaServicio.verificarAreaExistente(areaName);
            return ResponseEntity.ok(existe);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al verificar si el area existe por Nombre: " + e.getMessage());
        }
    }

}
