package com.example.rondasjunical.Servicios;

import com.example.rondasjunical.Entidades.Cargo;
import com.example.rondasjunical.Excepciones.CargoNotFoundException;
import com.example.rondasjunical.Repositorios.CargoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class CargoServicio {
    @Autowired
    private CargoRepositorio cargoRepositorio;

    public CargoServicio(CargoRepositorio cargoRepositorio) {
        this.cargoRepositorio = cargoRepositorio;
    }

    // Crud

    //Obtener todas los cargos
    public List<Cargo> obtenerTodosLosCargos() {
        return cargoRepositorio.findAll();
    }
    //Obtener cargo por Id
    public Cargo obtenerCargoPorId(Long id) {
        return cargoRepositorio.findById(id).orElseThrow(() -> new CargoNotFoundException(id));
    }
    //Guardar cargo
    public Cargo guardarCargo(Cargo cargo) {
        return cargoRepositorio.save(cargo);
    }
    //crear cargo
    public Cargo crearCargo(Cargo cargo) {
        return cargoRepositorio.save(cargo);
    }
    // Metodo para obtener un cargo por su Id
    public Cargo obtenerPorId(Long id){
        return cargoRepositorio.findById(id).orElse(null);
    }
    // Método para actualizar una cargo
    public Cargo actualizarCargo(Cargo cargo) {
        return cargoRepositorio.save(cargo);
    }
    //Metodo inhabilitar un cargo
    public void inhabilitarCargo(Long id) {
        Cargo cargo = cargoRepositorio.findById(id)
                        .orElseThrow(() -> new RuntimeException("Cargo no encontrado con el Id:" + id));
        cargo.setHabilitado(false);
        cargoRepositorio.save(cargo);
    }
    //Metodo habilitar un cargo
    public void habilitarCargo(Long id) {
        Cargo cargo = cargoRepositorio.findById(id)
                .orElseThrow(()-> new RuntimeException("Cargo no encontrado con el Id:" + id));
        cargo.setHabilitado(true);
        cargoRepositorio.save(cargo);
    }
    //Eliminar un cargo
    public void eliminarCargo(Long id) {
        cargoRepositorio.deleteById(id);
    }
    //Verificar existencias de un cargo
    public boolean verificarCargoExistente(String cargoName){
        return cargoRepositorio.existsByCargoName(cargoName);
    }
}
