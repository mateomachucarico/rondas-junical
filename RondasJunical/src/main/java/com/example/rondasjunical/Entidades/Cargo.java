package com.example.rondasjunical.Entidades;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name="cargo")
public class Cargo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "cargo_name")
    private String cargoName;

//    @JsonCreator
//    public Cargo(@JsonProperty("cargo_name") String cargo_name) {
//        this.cargoName = cargo_name;
//    }

    @Column(name = "habilitado")
    private boolean habilitado;

//    @ManyToOne
//    @JoinColumn(name = "jefe_area_id")
//    private ResponJefeArea jefeArea;

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
                ", habilitado=" + habilitado +
                '}';
    }

    // Relación con el responsable de área
//    public ResponJefeArea getJefeArea() {
//        return jefeArea;
//    }

//    public void setJefeArea(ResponJefeArea jefeArea) {
//        this.jefeArea = jefeArea;
//    }

}
