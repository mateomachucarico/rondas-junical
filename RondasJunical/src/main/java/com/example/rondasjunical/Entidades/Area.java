package com.example.rondasjunical.Entidades;
import jakarta.persistence.*;

@Entity
@Table(name = "area")
public class Area {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "area_name")
    private String areaName;

    @Column(name = "habilitado")
    private boolean habilitado;

    // Constructores
    public Area() { }

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


    // Método toString()
    @Override
    public String toString() {
        return "Area{" +
                "id=" + id +
                ", areaName='" + areaName + '\'' +
                ", habilitado=" + habilitado +
                '}';
    }

    // Relación con Torre.
//    @OneToOne
//    @JoinColumn(name = "torre_id", unique = true)
//    private Torre torre;

//     Getters y setters para la relación con Torre
//    public Torre getTorre() {
//        return torre;
//    }
//
//    public void setTorre(Torre torre) {
//        this.torre = torre;
//    }

    // Relación con Piso
    @ManyToOne
    @JoinColumn(name = "piso_id")
    private Piso piso;

    // Getters y setters para la relación con Piso
    public Piso getPiso() {
        return piso;
    }

    public void setPiso(Piso piso) {
        this.piso = piso;
    }

    // Relación con Area con Torre
    @ManyToOne
    @JoinColumn(name = "torre_id")
    private Torre torre;
    public Torre getTorre() {
        return torre;
    }
    public void setTorre(Torre torre) {
        this.torre = torre;
    }

    // Relación con el responsable de área
    @ManyToOne
    @JoinColumn(name = "respon_id")
    private ResponJefeArea responJefeArea;

    // Getters y setters para la relación con ResponJefeArea
    public ResponJefeArea getResponJefeArea() {
        return responJefeArea;
    }

    public void setResponJefeArea(ResponJefeArea responJefeArea) {
        this.responJefeArea = responJefeArea;
    }
}
//pero si un area puede tener solo una torre porfavor realizar la correción