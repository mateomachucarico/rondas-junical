package com.example.rondasjunical.Repositorios;


import com.example.rondasjunical.Entidades.FotoHallazgo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public interface FotoHallazgoRepositorio extends JpaRepository<FotoHallazgo, Long> {


}
