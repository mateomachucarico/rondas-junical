package com.example.rondasjunical.Excepciones;

public class PermisoNotFoundException extends RuntimeException {
    private Long id;
    public PermisoNotFoundException(Long id) {
        super("Permiso con Id " + id + " no encontrado");
        this.id = id;
    }
    public Long getId() {
        return id;
    }
}
