package com.example.rondasjunical.Entidades;

import jakarta.persistence.*;

@Entity
@Table(name = "zona")
public class Zona {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "zona_name")
    private String zonaName;

    @OneToOne
    @JoinColumn(name = "id_torre")
    private Torre torre;

    @OneToOne
    @JoinColumn(name = "id_piso")
    private Piso piso;

    @OneToOne
    @JoinColumn(name = "id_area")
    private Area area;

//    @ManyToOne
//    @JoinColumn(name = "id_torre", nullable = false)
//    private Torre torre;
//
//    @ManyToOne
//    @JoinColumn(name = "id_piso", nullable = false)
//    private Piso piso;
//
//    @ManyToOne
//    @JoinColumn(name = "id_area", nullable = false)
//    private Area area;

    @Column(name = "habilitado")
    private boolean habilitado;

    // Constructores
    public Zona(){}

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getZonaName() {
        return zonaName;
    }

    public void setZonaName(String zonaName) {
        this.zonaName = zonaName;
    }
    // Getter y setter para el campo habilitado
    public boolean isHabilitado() {
        return habilitado;
    }

    public void setHabilitado(boolean habilitado) {
        this.habilitado = habilitado;
    }

    //Relacion

//    public Torre getTorre() {
//        return torre;
//    }
//
//    public void setTorre(Torre torre) {
//        this.torre = torre;
//    }
//
//    public Area getArea() {
//        return area;
//    }
//
//    public void setArea(Area area) {
//        this.area = area;
//    }

    public Torre getTorre() {
        return torre;
    }

    public void setTorre(Torre torre) {
        this.torre = torre;
    }

    public Piso getPiso() {
        return piso;
    }

    public void setPiso(Piso piso) {
        this.piso = piso;
    }
    public Area getArea() {
        return area;
    }

    public void setArea(Area area) {
        this.area = area;
    }

    // Método toString()
    @Override
    public String toString() {
        return "Zona{" +
                "id=" + id +
                ", zonaName='" + zonaName + '\'' +
                ", habilitado=" + habilitado +
                '}';
    }
}