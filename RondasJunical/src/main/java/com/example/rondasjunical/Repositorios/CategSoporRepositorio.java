package com.example.rondasjunical.Repositorios;


import com.example.rondasjunical.Entidades.CategSopor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public interface CategSoporRepositorio  extends JpaRepository<CategSopor, Long> {

    boolean existsByCategName(String categName);
}
