package com.example.rondasjunical.Entidades;


import jakarta.persistence.*;

@Entity
@Table(name = "foto")
public class FotoHallazgo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String nombreArchivo;

    private String tipoArchivo;

    private Long tamanoArchivo;

    private byte[] contenidoArchivo;

    //Constructores
    public FotoHallazgo() {

    }

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getNombreArchivo() {
        return nombreArchivo;
    }

    public void setNombreArchivo(String nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }

    public String getTipoArchivo() {
        return tipoArchivo;
    }

    public void setTipoArchivo(String tipoArchivo) {
        this.tipoArchivo = tipoArchivo;
    }

    public Long getTamanoArchivo() {
        return tamanoArchivo;
    }

    public void setTamanoArchivo(Long tamanoArchivo) {
        this.tamanoArchivo = tamanoArchivo;
    }

    public byte[] getContenidoArchivo() {
        return contenidoArchivo;
    }

    public void setContenidoArchivo(byte[] contenidoArchivo) {
        this.contenidoArchivo = contenidoArchivo;
    }

    public void setIdHallazgo(Long idHallazgo) {
    }
}
