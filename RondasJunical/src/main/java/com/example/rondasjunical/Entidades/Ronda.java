package com.example.rondasjunical.Entidades;
import jakarta.persistence.*;

@Entity
@Table(name = "ronda")
public class Ronda {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String rondaFecha;
    private String rondaHoraInicio;
    private String rondaHoraFin;
    private String rondaDescrip;
    private String rondaPrioridad;
    private String rondaFoto;
    private String rondaCorrectivo;
    private boolean rondaSolucion;
    private String rondaNoSolucion;

    @OneToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @OneToOne
    @JoinColumn(name = "id_torre")
    private Torre torre;

    @OneToOne
    @JoinColumn(name = "id_piso")
    private Piso piso;

    @OneToOne
    @JoinColumn(name = "id_area")
    private Area area;

    @OneToOne
    @JoinColumn(name = "id_zona")
    private Zona zona;

    @OneToOne
    @JoinColumn(name = "id_categSopor")
    private CategSopor categSopor;

    @OneToOne
    @JoinColumn(name = "id_responJefeArea")
    private ResponJefeArea responJefeArea;

    // Constructores

    public Ronda() {}

    // Getters y Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRondaFecha() {
        return rondaFecha;
    }

    public void setRondaFecha(String rondaFecha) {
        this.rondaFecha = rondaFecha;
    }

    public String getRondaHoraInicio() {
        return rondaHoraInicio;
    }

    public void setRondaHoraInicio(String rondaHoraInicio) {
        this.rondaHoraInicio = rondaHoraInicio;
    }

    public String getRondaHoraFin() {
        return rondaHoraFin;
    }

    public void setRondaHoraFin(String rondaHoraFin) {
        this.rondaHoraFin = rondaHoraFin;
    }

    public String getRondaDescrip() {
        return rondaDescrip;
    }

    public void setRondaDescrip(String rondaDescrip) {
        this.rondaDescrip = rondaDescrip;
    }

    public String getRondaPrioridad() {
        return rondaPrioridad;
    }

    public void setRondaPrioridad(String rondaPrioridad) {
        this.rondaPrioridad = rondaPrioridad;
    }

    public String getRondaFoto() {
        return rondaFoto;
    }

    public void setRondaFoto(String rondaFoto) {
        this.rondaFoto = rondaFoto;
    }

    public String getRondaCorrectivo() {
        return rondaCorrectivo;
    }

    public void setRondaCorrectivo(String rondaCorrectivo) {
        this.rondaCorrectivo = rondaCorrectivo;
    }

    public boolean isRondaSolucion() {
        return rondaSolucion;
    }

    public void setRondaSolucion(boolean rondaSolucion) {
        this.rondaSolucion = rondaSolucion;
    }

    public String getRondaNoSolucion() {
        return rondaNoSolucion;
    }

    public void setRondaNoSolucion(String rondaNoSolucion) {
        this.rondaNoSolucion = rondaNoSolucion;
    }

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

    public Zona getZona() {
        return zona;
    }

    public void setZona(Zona zona) {
        this.zona = zona;
    }

    public CategSopor getCategSopor() {
        return categSopor;
    }

    public void setCategSopor(CategSopor categSopor) {
        this.categSopor = categSopor;
    }

    public ResponJefeArea getResponJefeArea() {
        return responJefeArea;
    }

    public void setResponJefeArea(ResponJefeArea responJefeArea) {
        this.responJefeArea = responJefeArea;
    }

    // Método toString()

    @Override
    public String toString() {
        return "Ronda{" +
                "id=" + id +
                ", rondaFecha='" + rondaFecha + '\'' +
                ", rondaHoraInicio='" + rondaHoraInicio + '\'' +
                ", rondaHoraFin='" + rondaHoraFin + '\'' +
                ", rondaDescrip='" + rondaDescrip + '\'' +
                ", rondaPrioridad='" + rondaPrioridad + '\'' +
                ", rondaFoto='" + rondaFoto + '\'' +
                ", rondaCorrectivo='" + rondaCorrectivo + '\'' +
                ", rondaSolucion=" + rondaSolucion +
                ", rondaNoSolucion='" + rondaNoSolucion + '\'' +
                ", usuario=" + usuario +
                ", torre=" + torre +
                ", piso=" + piso +
                ", area=" + area +
                ", zona=" + zona +
                ", categSopor=" + categSopor +
                ", responJefeArea=" + responJefeArea +
                '}';
    }
}
