package com.example.rondasjunical.Servicios;


import com.example.rondasjunical.Entidades.FotoHallazgo;
import com.example.rondasjunical.Repositorios.FotoHallazgoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class FotoHallazgoServicio {

    @Autowired
    private FotoHallazgoRepositorio fotoHallazgoRepositorio;

    public FotoHallazgoServicio(FotoHallazgoRepositorio fotoHallazgoRepositorio) {
        this.fotoHallazgoRepositorio = fotoHallazgoRepositorio;

    }

    public void subirFotos(Long idHallazgo, MultipartFile[] fotos) {
        for (MultipartFile foto : fotos) {
            if (validarFoto(foto)) {
                FotoHallazgo fotoHallazgo = new FotoHallazgo();
                fotoHallazgo.setIdHallazgo(idHallazgo);
                fotoHallazgo.setNombreArchivo(foto.getOriginalFilename());
                fotoHallazgo.setTipoArchivo(foto.getContentType());
                fotoHallazgo.setTamanoArchivo(foto.getSize());

                try {
                    fotoHallazgo.setContenidoArchivo(foto.getBytes());
                } catch (IOException e) {
                    // Manejar la excepción de I/O
                }

                fotoHallazgoRepositorio.save(fotoHallazgo);
            }
        }
    }

    private boolean validarFoto(MultipartFile foto) {
        // Implementar la lógica de validación de la foto
        // (tamaño, formato, etc.)
        return true; // Reemplazar con la lógica real
    }

    public void eliminarFoto(Long idFoto) {
        fotoHallazgoRepositorio.deleteById(idFoto);
    }

}
