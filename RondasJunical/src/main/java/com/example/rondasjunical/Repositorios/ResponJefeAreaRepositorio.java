package com.example.rondasjunical.Repositorios;

import com.example.rondasjunical.Entidades.ResponJefeArea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service

public interface ResponJefeAreaRepositorio extends JpaRepository<ResponJefeArea, Long> {

    boolean existsByResponName(String responName);
    boolean existsByResponEmail(String responEmail);
}
