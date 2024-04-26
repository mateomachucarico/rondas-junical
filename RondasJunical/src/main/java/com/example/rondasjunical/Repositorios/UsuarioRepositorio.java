package com.example.rondasjunical.Repositorios;

import com.example.rondasjunical.Entidades.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepositorio extends JpaRepository<Usuario, Long> {
    boolean existsByEmail(String email);
    boolean existsByUserName(String userName);
    boolean existsByIdentificacion(Long identificacion);


    Usuario findByEmail(String email);

    // Modificar la firma del método save() para aceptar un objeto Usuario con la colección roles actualizada.
//    @Override
//    <S extends Usuario> S save(S entity);

}
