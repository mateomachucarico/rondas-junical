package com.example.rondasjunical.Excepciones;


public class TorreNotFoundException extends RuntimeException {


    private Long id;

    public TorreNotFoundException(Long id) {
        super("Torre con ID " + id + " no encontrada.");
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
