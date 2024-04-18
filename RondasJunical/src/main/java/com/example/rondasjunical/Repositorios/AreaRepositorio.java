package com.example.rondasjunical.Repositorios;

import com.example.rondasjunical.Entidades.Area;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;



@Service

// Correct:
public interface AreaRepositorio extends JpaRepository<Area, Long> {

    boolean existsByAreaName(String areaName);

}

