package com.example.rondasjunical.Repositorios;

import com.example.rondasjunical.Entidades.Zona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public interface ZonaRepositorio extends JpaRepository<Zona, Long> {

    boolean existsByZonaName(String zonaName);

}
