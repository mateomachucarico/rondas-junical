package com.example.rondasjunical.Repositorios;

import com.example.rondasjunical.Entidades.Piso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public  interface PisoRepositorio extends JpaRepository<Piso, Long> {

    boolean existsByPisoNumber(Long pisoNumber);
}


