package com.example.rondasjunical.Repositorios;

import com.example.rondasjunical.Entidades.Ronda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public interface InformacRondaRepositorio extends JpaRepository<Ronda, Long> {
}
