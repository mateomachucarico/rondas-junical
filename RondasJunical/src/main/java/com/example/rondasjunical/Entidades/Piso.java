package com.example.rondasjunical.Entidades;
import jakarta.persistence.*;
import java.util.List;
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

    @OneToOne
    @JoinColumn(name = "id_torre")
    private Torre torre;

//    @ManyToOne
//    @JoinColumn(name = "id_torre", nullable = false)
//    private Torre torre;
//
//    @OneToMany(mappedBy = "piso")
//    private List<Area> areas;

//    @Column(name = "habilitado")
//    private boolean habilitado;

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

//    public boolean isHabilitado() {
//        return habilitado;
//    }
//
//    public void setHabilitado(boolean habilitado) {
//        this.habilitado = habilitado;
//    }

    //Relaciones

//    public Torre getTorre() {
//        return torre;
//    }
//
//    public void setTorre(Torre torre) {
//        this.torre = torre;
//    }
//
//    public List<Area> getAreas() {
//        return areas;
//    }
//
//    public void setAreas(List<Area> areas) {
//        this.areas = areas;
//    }

    public Torre getTorre() {
        return torre;
    }

    public void setTorre(Torre torre) {
        this.torre = torre;
    }

    // Método toString()
    @Override
    public String toString() {
        return "Piso{" +
                "id=" + id +
                ", pisoName='" + pisoName + '\'' +
                ", pisoNumber=" + pisoNumber +
//                ", habilitado=" + habilitado +
                '}';
    }
}
