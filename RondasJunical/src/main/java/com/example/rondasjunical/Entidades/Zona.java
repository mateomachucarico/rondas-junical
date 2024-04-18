package com.example.rondasjunical.Entidades;

import jakarta.persistence.*;

@Entity
@Table(name = "zona")
public class Zona {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "zona_name")
    private String zonaName;

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


    // Método toString()
    @Override
    public String toString() {
        return "Zona{" +
                "id=" + id +
                ", zonaName='" + zonaName + '\'' +
                ", habilitado=" + habilitado +
                '}';
    }

    // Relación entre Torre, piso, area, zona
    @ManyToOne
    @JoinColumn(name = "piso_id")
    private Piso piso;

    // Relación con Area
//    @OneToOne(mappedBy = "zona", cascade = CascadeType.ALL)
//    private Area area;

    // Getters y setters para la relación con Piso
    public Piso getPiso() {
        return piso;
    }

    public void setPiso(Piso piso) {
        this.piso = piso;
    }

    // Getters y setters para la relación con Area
//    public Area getArea() {
//        return area;
//    }
//
//    public void setArea(Area area) {
//        this.area = area;
//    }


}
