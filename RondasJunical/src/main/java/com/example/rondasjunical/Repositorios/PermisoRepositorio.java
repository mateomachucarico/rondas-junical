package com.example.rondasjunical.Repositorios;

import com.example.rondasjunical.Entidades.Permiso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public interface PermisoRepositorio extends JpaRepository<Permiso, Long> {


}
