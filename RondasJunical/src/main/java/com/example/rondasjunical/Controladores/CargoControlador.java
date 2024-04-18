package com.example.rondasjunical.Controladores;

import com.example.rondasjunical.Entidades.Cargo;
import com.example.rondasjunical.Repositorios.CargoRepositorio;
import com.example.rondasjunical.Servicios.CargoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8080")
public class CargoControlador {

    @Autowired
    private CargoServicio cargoServicio;
    @Autowired
    private CargoRepositorio cargoRepositorio;

    // Método para guardar un nuevo cargo
    @PostMapping("/cargos/guardarCargo")
    public ResponseEntity<Cargo> guardarCargo(@RequestBody Cargo cargo) {
        if (cargo.getCargoName() == null || cargo.getCargoDescrips() == null) {
            // Manejar valores nulos (lanzar excepción, devolver mensaje de error)
            return ResponseEntity.badRequest().build();
        }
        Cargo cargoGuardado = cargoServicio.guardarCargo(cargo);
        return ResponseEntity.status(HttpStatus.CREATED).body(cargoGuardado);
    }

    // CRUD de Cargos

    // Recuperar todas los cargos
    @GetMapping("/cargos/obtenerTodosLosCargos")
    public ResponseEntity<List<Cargo>> obtenerTodosLosCargos() {
        List<Cargo> cargos = cargoServicio.obtenerTodosLosCargos();
        return ResponseEntity.ok(cargos);
    }

    // Recuperar cargo por ID
    @GetMapping("/cargos/recuperarPorId/{id}")
    public ResponseEntity<Cargo> obtenerCargoPorId(@PathVariable Long id) {
        Cargo cargo = cargoServicio.obtenerCargoPorId(id);
        return ResponseEntity.ok(cargo);
    }
    //Actualizar cargo
    @PutMapping("/cargos/{id}")
    public ResponseEntity<?> actualizarCargo(@PathVariable("id") Long id, @RequestBody Cargo cargoActualizado) {
        try {
            if (!id.equals(cargoActualizado.getId())){
                throw new IllegalArgumentException("El Id del cargo no cuincide con el Id proporcionado en la ruta.");
            }
            Cargo  cargoActual = cargoServicio.obtenerPorId(id);
            if (cargoActual == null){
                return new ResponseEntity<>("No se encontro ningun cargo con el Id proporcionado.", HttpStatus.NOT_FOUND);
            }
            Cargo cargoActualizarGuardada = cargoServicio.actualizarCargo(cargoActualizado);
            return new ResponseEntity<>(cargoActualizarGuardada, HttpStatus.OK);
        } catch (IllegalArgumentException e){
            return  new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    // Eliminar cargo
    @DeleteMapping("/cargos/{id}")
    public ResponseEntity<String> eliminarCargoPorId (@PathVariable Long id){
        cargoServicio.eliminarCargo(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Cargo con ID " + id + " eliminada correctamente.");
    }

    // Inhabilitar cargo
    @PutMapping("/cargos/{id}/inhabilitar")
    public ResponseEntity<Void> inhabilitarCargo(@PathVariable Long id){
        cargoServicio.inhabilitarCargo(id);
        return ResponseEntity.ok().build();
        }
    // Habilitar cargo
    @PutMapping("/cargos/{id}/habilitar")
    public ResponseEntity<Void> habilitarCargo(@PathVariable Long id){
        cargoServicio.habilitarCargo(id);
        return ResponseEntity.ok().build();
    }
    //Verificar si una cargo existe en la base de datos
    @GetMapping("/cargos/existe/{cargoName}")
    public ResponseEntity<?> verificarCargoExistente(@PathVariable String cargoName){
        try {
            boolean existe = cargoServicio.verificarCargoExistente(cargoName);
            return ResponseEntity.ok(existe);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al verificar si el cargo existe por Nombre:" + e.getMessage());
        }
    }
}
