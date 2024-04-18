package com.example.rondasjunical.Entidades;

import jakarta.persistence.*;
@Entity
@Table(name = "permisos")
public class Permiso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "permiso_name", nullable = false, unique = true)
    private String permisoName;

    @Column(name = "habilitado")
    private boolean habilitado;

    //Constructores
    public Permiso() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPermisoName() {
        return permisoName;
    }
    public void setPermisoName(String permisoName) {
        this.permisoName = permisoName;
    }
    // Getter y setter para el campo habilitado
    public boolean isHabilitado() {
        return habilitado;
    }

    public void setHabilitado(boolean habilitado) {
        this.habilitado = habilitado;
    }
}
