package com.example.rondasjunical.Repositorios;

import com.example.rondasjunical.Entidades.AsignarRonda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public interface AsignarRondaRepositorio extends JpaRepository<AsignarRonda, Long> {
}
