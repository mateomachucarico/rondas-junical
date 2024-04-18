package com.example.rondasjunical.Excepciones;

public class CategSoporNotFoundException extends  RuntimeException{

    private Long id;

    public CategSoporNotFoundException(Long id) {
        super("Categoria con ID " + id + " no encontrada.");
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
