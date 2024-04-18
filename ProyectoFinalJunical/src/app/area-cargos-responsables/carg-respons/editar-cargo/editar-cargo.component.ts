import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {AppComponent} from "../../../app.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CargoService} from "../cargo.service";
import {ActivatedRoute} from "@angular/router";

interface Cargo {
  id: number;
  cargoName: string;
  cargoDescrips: string;
  habilitado:boolean;
  [key: string]: boolean | number | string;
}
@Component({
  providers: [CargoService, HttpClient],
  selector: 'app-editar-cargo',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    AppComponent,
    HttpClientModule
  ],
  templateUrl: './editar-cargo.component.html',
  styleUrl: './editar-cargo.component.css'
})
export class EditarCargoComponent implements  OnInit{
  editarForm!: FormGroup;
  cargo: Cargo = {id: 0, cargoName: '', cargoDescrips:'', habilitado: false };
  // Variables para mensajes
  cargoCreado: boolean = false;
  errorEditarCargo: string = '';
  cargoEnProceso: boolean = false;
  cargoId: number= 0;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private cargoService: CargoService
  ) {
  }
  ngOnInit(): void {
    this.editarForm = this.formBuilder.group({
      cargoName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      cargoDescrips: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    });
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.cargoId = +id;
        this.cargoService.obtenerCargo(this.cargoId).subscribe(
          (response: Cargo) => {
            this.cargo = response;
            this.editarForm.patchValue({
              cargoName: response.cargoName,
              cargoDescrips: response.cargoDescrips
            });
          },
          (error) => {
            console.error(error);
            if (error.status === 404) {
              this.errorEditarCargo = 'La cargo no se encontró. Verifica el ID proporcionado.';
            } else {
              this.errorEditarCargo = 'Error al cargar la cargo. Por favor, inténtalo de nuevo más tarde.';
            }
          }
        );
      } else {
        console.error('No se proporcionó un ID válido en la URL...');
      }
    });
  }
  onSubmit(): void {
    // Verificar si el ID del cargo es válido
    if (this.cargoId <= 0) {
      console.error("ID de cargo inválido");
      return;
    }
    if (this.editarForm.valid) {
      const cargo = this.editarForm.value;
      this.cargoService.actualizarCargo(this.cargoId, cargo).subscribe(
        () => {
          this.cargoCreado = true;
          this.cargoEnProceso = false;
          console.log("Cargo actualizada exitosamente!");
          this.editarForm.reset();
          setTimeout(() => {
            this.cargoCreado = false;
          }, 4000);
        },
        (error) => {
          console.error(error);
          this.cargoEnProceso = false;
          this.errorEditarCargo = error.message || 'Ocurrió un error al actualizar la cargo.';
          setTimeout(() => {
            this.errorEditarCargo = '';
          }, 5000);
        }
      );
    } else {
      this.editarForm.markAllAsTouched();
    }
  }
  // Método para cancelar la edición
  cancelar() {
    this.editarForm.reset();
  }
  // Método para cerrar mensajes
  cerrarMensaje() {
    this.cargoCreado = false;
    this.errorEditarCargo = '';
  }
  // Getters para acceder a los controles del formulario
  get cargoName() {
    return this.editarForm.get('cargoName');
  }
  get cargoDescrips() {
    return this.editarForm.get('cargoDescrips');
  }
}
