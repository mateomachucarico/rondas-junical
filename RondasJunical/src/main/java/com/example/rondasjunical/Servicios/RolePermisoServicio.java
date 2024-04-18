package com.example.rondasjunical.Servicios;
import com.example.rondasjunical.Repositorios.RolePermisoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RolePermisoServicio {
    @Autowired
    private RolePermisoRepositorio rolePermisoRepositorio;

    public RolePermisoServicio(RolePermisoRepositorio rolePermisoRepositorio) {
        this.rolePermisoRepositorio = rolePermisoRepositorio;
    }
}
