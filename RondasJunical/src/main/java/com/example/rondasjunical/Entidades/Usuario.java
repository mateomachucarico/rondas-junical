package com.example.rondasjunical.Entidades;
import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "usuario")
public class Usuario {

    // Variables
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "identificacion")
    private Long identificacion;

    @Column(name = "celular")
    private Long celular;

//    @Column(name = "habilitado")
//    private boolean habilitado;
//    @ManyToMany
//    @JoinTable(
//            name = "usuario_roles",
//            joinColumns = @JoinColumn(name = "usuario_id"),
//            inverseJoinColumns = @JoinColumn(name = "rol_id"))
//    private Set<Rol> roles = new HashSet<>();

    @OneToOne
    @JoinColumn(name = "id_rol")
    private Rol rol;

    @OneToOne
    @JoinColumn(name = "id_area")
    private Area area;

    @OneToOne
    @JoinColumn(name = "id_cargo")
    private Cargo cargo;

    // Relación con cargos
//    @ManyToMany
//    @JoinTable(
//            name = "usuario_cargos",
//            joinColumns = @JoinColumn(name = "usuario_id"),
//            inverseJoinColumns = @JoinColumn(name = "cargo_id"))
//    private Set<Cargo> cargos = new HashSet<>();

    // Relación con áreas
//    @ManyToMany
//    @JoinTable(
//            name = "usuario_areas",
//            joinColumns = @JoinColumn(name = "usuario_id"),
//            inverseJoinColumns = @JoinColumn(name = "area_id"))
//    private Set<Area> areas = new HashSet<>();

    // Constructores
    public Usuario() { }

    // Constructores Cargados

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getIdentificacion() {
        return identificacion;
    }

    public void setIdentificacion(Long identificacion) {
        this.identificacion = identificacion;
    }

    public Long getCelular() {
        return celular;
    }

    public void setCelular(Long celular) {
        this.celular = celular;
    }

    // Getter y setter para la relación con roles
//    public Set<Rol> getRoles() {
//        return roles;
//    }
//
//    public void setRoles(Set<Rol> roles) {
//        this.roles = roles;
//    }

    // Getters y setters para la relación con cargos
//    public Set<Cargo> getCargos() {
//        return cargos;
//    }
//
//    public void setCargos(Set<Cargo> cargos) {
//        this.cargos = cargos;
//    }

    // Getters y setters para la relación con áreas
//    public Set<Area> getAreas() {
//        return areas;
//    }
//
//    public void setAreas(Set<Area> areas) {
//        this.areas = areas;
//    }

    // Relación con AsignarRonda
    @OneToMany(mappedBy = "usuario")
    private Set<AsignarRonda> asignarRondas = new HashSet<>();

    // Getters y setters para la relación con AsignarRonda
    public Set<AsignarRonda> getAsignarRondas() {
        return asignarRondas;
    }

    public void setAsignarRondas(Set<AsignarRonda> asignarRondas) {
        this.asignarRondas = asignarRondas;
    }

    // Getter y setter para el campo habilitado
//    public boolean isHabilitado() {
//        return habilitado;
//    }
//
//    public void setHabilitado(boolean habilitado) {
//        this.habilitado = habilitado;
//    }

    //Relacion con Roles final Getters y Setters
    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }

    //Relacion con Area final Getters y Setters
    public Area getArea() {
        return area;
    }

    public void setArea(Area area) {
        this.area = area;
    }
//    //Relacion con Cargo final Getters y Setters
    public Cargo getCargo() {
        return cargo;
    }

    public void setCargo(Cargo cargo) {
        this.cargo = cargo;
    }

    // Método toString()
    @Override
    public String toString() {
        return "Usuario{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", identificacion=" + identificacion +
                ", celular=" + celular +
                ", area=" + area +
                ", cargo=" + cargo +
                ",rol=" + rol +
//                ", habilitado=" + habilitado +
                '}';
    }
}
