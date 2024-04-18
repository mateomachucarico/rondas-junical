package com.example.rondasjunical.Excepciones;

public class PisoNotFoundException  extends RuntimeException{

    private Long id;

    public PisoNotFoundException(Long id) {
        super("Piso con ID " + id + " no encontrada.");
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
