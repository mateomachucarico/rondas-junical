package com.example.rondasjunical.Excepciones;

public class CargoNotFoundException extends  RuntimeException{
    private Long id;

    public CargoNotFoundException(Long id) {
        super("Cargo con ID " + id + " no encontrada.");
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
