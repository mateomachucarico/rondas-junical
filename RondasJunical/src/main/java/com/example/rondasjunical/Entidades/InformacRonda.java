package com.example.rondasjunical.Entidades;

import jakarta.persistence.*;

@Entity
@Table(name = "infronda")
public class InformacRonda {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    public InformacRonda(){}

    //getters y setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    // Informacion del Formulario para Rondas

}
