package com.example.rondasjunical.Controladores;


import com.example.rondasjunical.Repositorios.FotoHallazgoRepositorio;
import com.example.rondasjunical.Servicios.FotoHallazgoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8080")
public class FotoHallazgoControllador {

    @Autowired
    private FotoHallazgoServicio fotoHallazgoServicio;

    @Autowired
    private FotoHallazgoRepositorio fotoHallazgoRepositorio;

    @PostMapping("/subirFoto")
    public ResponseEntity<Void> subirFotos(@RequestParam("idHallazgo") Long idHallazgo, @RequestParam("fotos") MultipartFile[] fotos) {
        fotoHallazgoServicio.subirFotos(idHallazgo, fotos);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/eliminarFoto/{idFoto}")
    public ResponseEntity<Void> eliminarFoto(@PathVariable Long idFoto) {
        fotoHallazgoServicio.eliminarFoto(idFoto);
        return ResponseEntity.ok().build();
    }

}
