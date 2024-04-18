package com.example.rondasjunical.Entidades;

import jakarta.persistence.*;

@Entity
@Table(name = "asignaronda")
public class AsignarRonda {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "asignar_usuario")
    private String asignarUsuario;

    @Column(name = "asignar_fecha")
    private String asignarFechas;

    @Column(name = "asignar_torre")
    private String asignarTorre;

    @Column(name = "asignar_categ")
    private String asignarCateg;

    @Column(name = "asignar_observacion")
    private String asignarObservacion;

    @Column(name = "habilitado")
    private boolean habilitado;

    // Constructores
    public AsignarRonda (){}

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAsignarUsuario() {
        return asignarUsuario;
    }

    public void setAsignarUsuario(String asignarUsuario) {
        this.asignarUsuario = asignarUsuario;
    }

    public String getAsignarFechas() {
        return asignarFechas;
    }

    public void setAsignarFechas(String asignarFechas) {
        this.asignarFechas = asignarFechas;
    }

    public String getAsignarTorre() {
        return asignarTorre;
    }

    public void setAsignarTorre(String asignarTorre) {
        this.asignarTorre = asignarTorre;
    }

    public String getAsignarCateg() {
        return asignarCateg;
    }

    public void setAsignarCateg(String asignarCateg) {
        this.asignarCateg = asignarCateg;
    }

    public String getAsignarObservacion() {
        return asignarObservacion;
    }

    // Getter y setter para el campo habilitado
    public boolean isHabilitado() {
        return habilitado;
    }

    public void setHabilitado(boolean habilitado) {
        this.habilitado = habilitado;
    }

    public void setAsignarObservacion(String asignarObservacion) {
        this.asignarObservacion = asignarObservacion;
    }

    // Método toString()
    @Override
    public String toString() {
        return "AsignarRonda{" +
                "id=" + id +
                ", asignarUsuario='" + asignarUsuario + '\'' +
                ", asignarFechas='" + asignarFechas + '\'' +
                ", asignarTorre='" + asignarTorre + '\'' +
                ", asignarCateg='" + asignarCateg + '\'' +
                ", asignarObservacion='" + asignarObservacion + '\'' +
                ", habilitado=" + habilitado +
                '}';
    }

    // Relaciones
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "torre_id")
    private Torre torre;

    @ManyToOne
    @JoinColumn(name = "categsopor_id")
    private CategSopor categoria;

    // Getters y setters para las relaciones
    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Torre getTorre() {
        return torre;
    }

    public void setTorre(Torre torre) {
        this.torre = torre;
    }

    public CategSopor getCategoria() {
        return categoria;
    }

    public void setCategoria(CategSopor categoria) {
        this.categoria = categoria;
    }
}
