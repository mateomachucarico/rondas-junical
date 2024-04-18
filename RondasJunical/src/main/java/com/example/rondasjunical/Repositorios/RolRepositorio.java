package com.example.rondasjunical.Repositorios;

import com.example.rondasjunical.Entidades.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public interface RolRepositorio extends JpaRepository<Rol, Long> {
    // Modificar la firma del método save() para aceptar un objeto Rol con la colección usuarios actualizada.
    @Override
    <S extends Rol> S save(S entity);

    boolean existsByRolName(String rolName);
}
