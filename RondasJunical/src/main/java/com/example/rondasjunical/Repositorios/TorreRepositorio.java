package com.example.rondasjunical.Repositorios;

import com.example.rondasjunical.Entidades.Torre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
// Correct:
public interface TorreRepositorio extends JpaRepository<Torre, Long> {

    boolean existsByTorreName(String torreName);
}