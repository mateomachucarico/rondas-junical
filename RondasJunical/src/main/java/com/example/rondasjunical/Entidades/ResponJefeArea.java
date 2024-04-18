package com.example.rondasjunical.Entidades;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "responJefeArea")
public class ResponJefeArea {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "respon_name")
    private String responName;

    @Column(name = "respon_email")
    private String responEmail;

    @Column(name = "respon_area")
    private String responArea;

    @Column(name = "respon_cargo")
    private String responCargo;

//    @Column(name = "respon_firma")
//    private String responFirma;

    @Column(name = "habilitado")
    private boolean habilitado;

    // Constructores
    public ResponJefeArea(){}

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getResponName() {
        return responName;
    }

    public void setResponName(String responName) {
        this.responName = responName;
    }

    public String getResponEmail() {
        return responEmail;
    }

    public void setResponEmail(String responEmail) {
        this.responEmail = responEmail;
    }

    public String getResponArea() {
        return responArea;
    }

    public void setResponArea(String responArea) {
        this.responArea = responArea;
    }

    public String getResponCargo() {
        return responCargo;
    }

    public void setResponCargo(String responCargo) {
        this.responCargo = responCargo;
    }

//    public String getResponFirma() {
//        return responFirma;
//    }
//
//    public void setResponFirma(String responFirma) {
//        this.responFirma = responFirma;
//    }
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
        return "ResponJefeArea{" +
                "id=" + id +
                ", responName='" + responName + '\'' +
                ", responEmail='" + responEmail + '\'' +
                ", responArea='" + responArea + '\'' +
                ", responCargo='" + responCargo + '\'' +
                ", habilitado=" + habilitado +
                '}';
    }

    // Relación con áreas
    @OneToMany(mappedBy = "responJefeArea", cascade = CascadeType.ALL)
    private Set<Area> areas = new HashSet<>();

    // Getters y setters para la relación con Area
    public Set<Area> getAreas() {
        return areas;
    }

    public void setAreas(Set<Area> areas) {
        this.areas = areas;
    }

    // Relación con cargos
    @ManyToMany
    @JoinTable(
            name = "respon_cargo",
            joinColumns = @JoinColumn(name = "respon_id"),
            inverseJoinColumns = @JoinColumn(name = "cargo_id"))
    private Set<Cargo> cargos = new HashSet<>();

    // Getters y setters para la relación con Cargo
    public Set<Cargo> getCargos() {
        return cargos;
    }

    public void setCargos(Set<Cargo> cargos) {
        this.cargos = cargos;
    }


}
