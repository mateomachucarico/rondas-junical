package com.example.rondasjunical.Entidades;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="cargo")
public class Cargo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "cargo_name")
    private String cargoName;

    @Column(name = "cargo_descripc")
    private String cargoDescrips;

    @Column(name = "habilitado")
    private boolean habilitado;

    // Constructores
    public Cargo(){}

    // Constructores Cargados
    // (Aquí se agregan)

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCargoName() {
        return cargoName;
    }

    public void setCargoName(String cargoName) {
        this.cargoName = cargoName;
    }

    public String getCargoDescrips(){
        return cargoDescrips;
    }

    public void setCargoDescrips(String cargoDescrips) {
        this.cargoDescrips = cargoDescrips;
    }
    // Getter y setter para el campo habilitado
    public boolean isHabilitado() {
        return habilitado;
    }

    public void setHabilitado(boolean habilitado) {
        this.habilitado = habilitado;
    }

    // Método toString()
    @Override
    public String toString() {
        return "Cargo{" +
                "id=" + id +
                ", cargoName='" + cargoName + '\'' +
                ", cargoDescrips='" + cargoDescrips + '\'' +
                ", habilitado=" + habilitado +
                '}';
    }


    // Relación con el responsable de área
    @ManyToMany(mappedBy = "cargos")
    private Set<ResponJefeArea> responJefeArea = new HashSet<>();

    // Getters y setters para la relación con ResponJefeArea
    public Set<ResponJefeArea> getResponJefeArea() {
        return responJefeArea;
    }

    public void setResponJefeArea(Set<ResponJefeArea> responJefeArea) {
        this.responJefeArea = responJefeArea;
    }
}
