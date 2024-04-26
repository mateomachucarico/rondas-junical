package com.example.rondasjunical.Excepciones;

public class RondaNotFoundException extends RuntimeException {
    private Long id;

    public RondaNotFoundException(Long id) {
        super("Ronda con ID" + id + "No encontrada");
        this.id = id;
    }
    public Long getId() {
        return id;
    }

}
