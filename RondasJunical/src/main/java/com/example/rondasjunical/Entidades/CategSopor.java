package com.example.rondasjunical.Entidades;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "categsopor")
public class CategSopor {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "categ_name")
    private String categName;

    @Column(name = "habilitado")
    private boolean habilitado;

    // Constructores
    public CategSopor (){}

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategName() {
        return categName;
    }

    public void setCategName(String categName) {
        this.categName = categName;
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
        return "CategSopor{" +
                "id=" + id +
                ", categName='" + categName + '\'' +
                ", habilitado=" + habilitado +
                '}';
    }

    // Relaciones
    @OneToMany(mappedBy = "categoria")
    private Set<AsignarRonda> asignarRondas = new HashSet<>();

    // Getters y setters para la relación con AsignarRonda
    public Set<AsignarRonda> getAsignarRondas() {
        return asignarRondas;
    }

    public void setAsignarRondas(Set<AsignarRonda> asignarRondas) {
        this.asignarRondas = asignarRondas;
    }

}
