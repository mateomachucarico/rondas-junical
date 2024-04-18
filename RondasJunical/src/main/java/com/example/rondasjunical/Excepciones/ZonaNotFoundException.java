package com.example.rondasjunical.Excepciones;

public class ZonaNotFoundException extends RuntimeException {
    private Long id;

    public ZonaNotFoundException(Long id) {
        super("Zona con ID " + id + " no encontrada.");
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
