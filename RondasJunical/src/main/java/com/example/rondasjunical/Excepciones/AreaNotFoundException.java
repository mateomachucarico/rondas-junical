package com.example.rondasjunical.Excepciones;

public class AreaNotFoundException extends RuntimeException{
    private Long id;
    public AreaNotFoundException(Long id) {
        super("Area con ID " + id + " no encontrada.");
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
