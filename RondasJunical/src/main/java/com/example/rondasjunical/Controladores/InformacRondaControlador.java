package com.example.rondasjunical.Controladores;
import com.example.rondasjunical.Entidades.Ronda;
import com.example.rondasjunical.Repositorios.InformacRondaRepositorio;
import com.example.rondasjunical.Servicios.InformacRondaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8080")
public class InformacRondaControlador {

    @Autowired
    private InformacRondaRepositorio informacRondaRepositorio;

    @Autowired
    private InformacRondaServicio informacRondaServicio;

    //CRUD

    //Metodo para guardar la informacion de la Ronda
    @PostMapping("/rondas/guardarRonda")
    public ResponseEntity<Ronda> guardarRonda(@RequestBody Ronda ronda) {
        if (ronda.getRondaFecha() == null || ronda.getRondaHoraInicio() == null || ronda.getRondaHoraFin() == null || ronda.getRondaDescrip() == null || ronda.getRondaPrioridad()==null ||ronda.getRondaFoto() == null || ronda.getRondaCorrectivo()==null || ronda.getRondaNoSolucion()==null ||
        ronda.getUsuario()==null || ronda.getTorre()==null || ronda.getPiso()==null || ronda.getArea()==null || ronda.getZona()==null || ronda.getCategSopor()==null || ronda.getResponJefeArea()==null) {
            // Manejar valores nulos (lanzar excepción, devolver mensaje de error)
            return ResponseEntity.badRequest().build();
        }
        Ronda rondaGuardado = informacRondaServicio.guardarRonda(ronda);
        return ResponseEntity.status(HttpStatus.CREATED).body(rondaGuardado);
    }
    //Recuperar todas las rondas
    @GetMapping("/rondas/obtenerTodoslosRondas")
    public ResponseEntity<List<Ronda>> obtenerTodoslosRondas() {
        List<Ronda> rondas = informacRondaServicio.obtenerTodoslosRondas();
        return ResponseEntity.ok().body(rondas);
    }
    //Recuperar Ronda por Id
    @GetMapping("/rondas/recuperarPorId/{id}")
    public ResponseEntity<Ronda> obtenerRondaPorId(@PathVariable Long id) {
        Ronda ronda = informacRondaServicio.obtenerRondaPorId(id);
        return ResponseEntity.ok().body(ronda);
    }
    //Actualizar Ronda
    @PutMapping("/rondas/{id}")
    public ResponseEntity<?> actualizarRonda(@PathVariable("id") Long id, @RequestBody Ronda rondaActualizada) {
        try {
            if (!id.equals(rondaActualizada.getId())) {
                throw new IllegalArgumentException("El id del ronda no es valido");
            }
            Ronda rondaActual = informacRondaServicio.obtenerRondaPorId(id);
            if (rondaActual == null) {
                return new ResponseEntity<>("No se encontro ninguna Ronda con el Id Proporcionado.", HttpStatus.NOT_FOUND);
            }
            Ronda rondaActualizarGuardada = informacRondaServicio.actualizarRonda(rondaActualizada);
            return new ResponseEntity<>(rondaActualizarGuardada, HttpStatus.OK);
        } catch (IllegalArgumentException e){
            return new  ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    //Eliminar Ronda
    @DeleteMapping("/rondas/{id}")
    public ResponseEntity<String> eliminarRondaPorId(@PathVariable Long id) {
        informacRondaServicio.eliminarRonda(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Ronda con Id" + id + " Eliminado Correctamente.");
    }
}
