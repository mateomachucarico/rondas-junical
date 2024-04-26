package com.example.rondasjunical.Entidades;
import jakarta.persistence.*;

@Entity
@Table(name = "responJefeArea")
public class ResponJefeArea {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "respon_name")
    private String responName;

    @Column(name = "respon_email")
    private String responEmail;

    @Column(name = "habilitado")
    private boolean habilitado;


    // Constructores
    public ResponJefeArea(){}
    // Getters y setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getResponName() {
        return responName;
    }
    public void setResponName(String responName) {
        this.responName = responName;
    }
    public String getResponEmail() {
        return responEmail;
    }
    public void setResponEmail(String responEmail) {
        this.responEmail = responEmail;
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
        return "ResponJefeArea{" +
                "id=" + id +
                ", responName='" + responName + '\'' +
                ", responEmail='" + responEmail + '\'' +
                ", habilitado=" + habilitado +
                '}';
    }
}
