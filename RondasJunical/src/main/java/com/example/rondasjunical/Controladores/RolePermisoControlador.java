package com.example.rondasjunical.Controladores;
import com.example.rondasjunical.Repositorios.RolePermisoRepositorio;
import com.example.rondasjunical.Servicios.RolePermisoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8080")
public class RolePermisoControlador {
    @Autowired
    private RolePermisoServicio rolePermisoServicio;

    @Autowired
    private RolePermisoRepositorio rolePermisoRepositorio;

}
