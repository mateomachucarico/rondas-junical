package com.example.rondasjunical.Entidades;

import jakarta.persistence.*;

@Entity
@Table(name = "roles_permisos")
public class RolePermiso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "rol_id", referencedColumnName = "id")
    private Rol rol;

    @ManyToOne
    @JoinColumn(name = "permiso_id", referencedColumnName = "id")
    private Permiso permiso;

    // Otros campos y métodos
    //
}
