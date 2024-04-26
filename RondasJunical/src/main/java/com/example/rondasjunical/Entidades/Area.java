package com.example.rondasjunical.Entidades;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "area")
public class Area {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "area_name")
    private String areaName;

//    @OneToMany(mappedBy = "area")
//    private List<Zona> zonas;

    @Column(name = "habilitado")
    private boolean habilitado;

    @OneToOne
    @JoinColumn(name = "respon_jefe_area_id")
    private ResponJefeArea responJefeArea;


    // Constructores
    public Area() {
    }

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }


    // Getter y setter para el campo habilitado
    public boolean isHabilitado() {
        return habilitado;
    }

    public void setHabilitado(boolean habilitado) {
        this.habilitado = habilitado;
    }

//    public List<Zona> getZonas() {
//        return zonas;
//    }
//
//    public void setZonas(List<Zona> zonas) {
//        this.zonas = zonas;
//    }

    // Getter y setter para la relación con ResponJefeArea

    public ResponJefeArea getResponJefeArea() {
        return responJefeArea;
    }

    public void setResponJefeArea(ResponJefeArea responJefeArea) {
        this.responJefeArea = responJefeArea;
    }


    // Método toString()
    @Override
    public String toString() {
        return "Area{" +
                "id=" + id +
                ", areaName='" + areaName + '\'' +
                ", habilitado=" + habilitado +
                '}';
    }
}
