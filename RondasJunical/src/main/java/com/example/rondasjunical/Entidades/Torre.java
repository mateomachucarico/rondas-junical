package com.example.rondasjunical.Entidades;
import jakarta.persistence.*;
import java.util.HashSet;
import java.util.List;
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

//    @OneToMany(mappedBy = "torre")
//    private List<Piso> pisos;

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

//    public List<Piso> getPisos() {
//        return pisos;
//    }
//
//    public void setPisos(List<Piso> pisos) {
//        this.pisos = pisos;
//    }


    @OneToMany(mappedBy = "torre")
    private Set<AsignarRonda> asignarRondas = new HashSet<>();

    // Getters y setters
    public Set<AsignarRonda> getAsignarRondas() {
        return asignarRondas;
    }

    public void setAsignarRondas(Set<AsignarRonda> asignarRondas) {
        this.asignarRondas = asignarRondas;
    }

    //Relaciones

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
