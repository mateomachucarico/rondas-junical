package com.example.rondasjunical.Repositorios;

import com.example.rondasjunical.Entidades.Cargo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service

public  interface CargoRepositorio extends JpaRepository<Cargo, Long> {
    boolean existsByCargoName(String cargoName);
}
