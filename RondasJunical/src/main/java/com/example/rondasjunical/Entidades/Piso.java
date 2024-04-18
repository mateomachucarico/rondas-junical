package com.example.rondasjunical.Entidades;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "piso")
public class Piso {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "piso_name")
    private String pisoName;

    @Column(name = "piso_number")
    private Long pisoNumber;

    @Column(name = "habilitado")
    private boolean habilitado;

    // Constructor
    public Piso() {}

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPisoName() {
        return pisoName;
    }

    public void setPisoName(String pisoName) {
        this.pisoName = pisoName;
    }

    public Long getPisoNumber() {
        return pisoNumber;
    }

    public void setPisoNumber(Long pisoNumber) {
        this.pisoNumber = pisoNumber;
    }

    public boolean isHabilitado() {
        return habilitado;
    }

    public void setHabilitado(boolean habilitado) {
        this.habilitado = habilitado;
    }

    // Relación con Torre
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "torre_id") // Ensure the foreign key column name matches
    private Torre torre;

    // Getters y setters para la relación con Torre
    public Torre getTorre() {
        return torre;
    }

    public void setTorre(Torre torre) {
        this.torre = torre;
    }

    // Relación con Zonas
    @OneToMany(mappedBy = "piso", cascade = CascadeType.ALL)
    private Set<Zona> zonas = new HashSet<>();

    // Getters y setters para la relación con Zonas
    public Set<Zona> getZonas() {
        return zonas;
    }

    public void setZonas(Set<Zona> zonas) {
        this.zonas = zonas;
    }

    // Relación con Áreas
    @OneToMany(mappedBy = "piso", cascade = CascadeType.ALL)
    private Set<Area> areas = new HashSet<>();

    // Getters y setters para la relación con Áreas
    public Set<Area> getAreas() {
        return areas;
    }

    public void setAreas(Set<Area> areas) {
        this.areas = areas;
    }

    // Método toString()
    @Override
    public String toString() {
        return "Piso{" +
                "id=" + id +
                ", pisoName='" + pisoName + '\'' +
                ", pisoNumber=" + pisoNumber +
                ", habilitado=" + habilitado +
                '}';
    }
}
