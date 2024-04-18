package com.example.rondasjunical.Excepciones;

public class ResponJefeAreaNotFoundException extends  RuntimeException {
    private Long id;

    public ResponJefeAreaNotFoundException(Long id) {
        super("Jefe Responsable de Area con ID " + id + " no encontrada.");
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
