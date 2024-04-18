package com.example.rondasjunical.Entidades;
import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "torre")
public class Torre {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "torre_name")
    private String torreName;

    @Column(name = "habilitado")
    private boolean habilitado;

    // Constructores
    public Torre() {}

    // Constructores Cargados
    // (Aquí se agregan)

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTorreName() {
        return torreName;
    }
    public void setTorreName(String torreName) {
        this.torreName = torreName;
    }

    // Getter y setter para el campo habilitado
    public boolean isHabilitado() {
        return habilitado;
    }

    public void setHabilitado(boolean habilitado) {
        this.habilitado = habilitado;
    }

    // Relaciones
    @OneToMany(mappedBy = "torre", cascade = CascadeType.ALL)
    private Set<Piso> pisos = new HashSet<>();

    // Getters y setters
    public Set<Piso> getPisos() {
        return pisos;
    }

    public void setPisos(Set<Piso> pisos) {
        this.pisos = pisos;
    }

    // Relaciones torre y area

    @OneToMany(mappedBy = "torre", cascade = CascadeType.ALL)
    private Set<Area> areas = new HashSet<>();

    //Getters y setters
    public Set<Area> getAreas() {
        return areas;
    }
    public void setAreas(Set<Area> areas) {
        this.areas = areas;
    }


    @OneToMany(mappedBy = "torre")
    private Set<AsignarRonda> asignarRondas = new HashSet<>();

    // Getters y setters
    public Set<AsignarRonda> getAsignarRondas() {
        return asignarRondas;
    }

    public void setAsignarRondas(Set<AsignarRonda> asignarRondas) {
        this.asignarRondas = asignarRondas;
    }

    // Método toString()
    @Override
    public String toString() {
        return "Torre{" +
                "id=" + id +
                ", torreName='" + torreName + '\'' +
                ", habilitado=" + habilitado +
                '}';
    }
}
