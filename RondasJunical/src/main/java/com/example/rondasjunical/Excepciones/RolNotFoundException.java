package com.example.rondasjunical.Excepciones;

public class RolNotFoundException  extends  RuntimeException{
    private Long id;

    public RolNotFoundException(Long id) {
        super("Rol con ID " + id + " no encontrada.");
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
