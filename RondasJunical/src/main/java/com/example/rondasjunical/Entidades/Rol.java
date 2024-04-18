package com.example.rondasjunical.Entidades;
import jakarta.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "rol")
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "rol_name")
    private String rolName;

    @Column(name = "rol_descripc")
    private String rolDescripc;

    @Column(name = "rol_fecha_creac", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date rolFechaCreac;

    @Column(name = "rol_fecha_modic", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date rolFechaModic;

    // Relación usuario con rol
//    @ManyToMany(mappedBy = "roles")
//    private Set<Usuario> usuarios = new HashSet<>();

    @Column(name = "habilitado")
    private boolean habilitado;

    // Constructores
    public Rol() {
    }

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRolName() {
        return rolName;
    }

    public void setRolName(String rolName) {
        this.rolName = rolName;
    }

    public String getRolDescripc() {
        return rolDescripc;
    }

    public void setRolDescripc(String rolDescripc) {
        this.rolDescripc = rolDescripc;
    }

    public Date getRolFechaCreac() {
        return rolFechaCreac;
    }

    public void setRolFechaCreac(Date rolFechaCreac) {
        this.rolFechaCreac = rolFechaCreac;
    }

    public Date getRolFechaModic() {
        return rolFechaModic;
    }

    public void setRolFechaModic(Date rolFechaModic) {
        this.rolFechaModic = rolFechaModic;
    }

//    public Set<Usuario> getUsuarios() {
//        return usuarios;
//    }
//
//    public void setUsuarios(Set<Usuario> usuarios) {
//        this.usuarios = usuarios;
//    }

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
        return "Rol{" +
                "id=" + id +
                ", rolName='" + rolName + '\'' +
                ", rolDescripc='" + rolDescripc + '\'' +
                ", rolFechaCreac=" + rolFechaCreac +
                ", rolFechaModic=" + rolFechaModic +
                ", habilitado=" + habilitado +
                '}';
    }
}
