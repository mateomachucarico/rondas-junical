import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {KeyValuePipe, NgIf} from "@angular/common";
import {CargoService} from "../cargo.service";
import {HttpClient, HttpClientModule, HttpErrorResponse} from "@angular/common/http";

interface Cargo {
  id: number;
  cargoName: string;
  habilitado:boolean;
}

@Component({
  providers: [CargoService, HttpClient],
  selector: 'app-crear-cargo',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    HttpClientModule,
    KeyValuePipe
  ],
  templateUrl: './crear-cargo.component.html',
  styleUrl: './crear-cargo.component.css'
})
export class CrearCargoComponent implements OnInit{
  crearForm!: FormGroup;
  cargo: Cargo = {id: 0, cargoName: '', habilitado: true};
  cargoCreado: boolean = false;
  cargoEnProceso: boolean = false;
  errorCrearCargo: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private cargoService: CargoService,
  ) {}

  ngOnInit(): void {
    this.crearForm = this.formBuilder.group({
      cargoName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      //cargoDescrips: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]], // Aquí corregido
    });
  }

  onSubmit(): void {
    if (this.crearForm.valid) {
      const cargoName = this.crearForm.value.cargoName;
      // Llamada al servicio para registrar el cargo
      this.cargoService.verificarCargoExistente(cargoName).subscribe(
        (existeCargo: boolean) => {
          if (existeCargo) {
            this.errorCrearCargo = 'La Cargo ya existe en la base de datos crea una con otro Nombre.';
          } else {
            this.cargoEnProceso = true;
            this.cargoService.guardarCargo(this.crearForm.value).subscribe(
              (response) => {
                this.cargoEnProceso = false; // Ocultar indicador de carga
                // Manejo de la respuesta exitosa
                console.log("Cargo creado exitosamente!" , response);
                this.crearForm.reset();
                if (!this.errorCrearCargo) {
                  this.cargoCreado = true;
                  setTimeout(() => {
                    this.cargoCreado = false;
                  }, 3000);
                }
              },
              (error: HttpErrorResponse) => {
                // Manejo de la respuesta con errores
                console.error(error);
                this.cargoEnProceso = false; // Ocultar indicador de carga
                // Mostrar mensaje de error al usuario
                this.errorCrearCargo = error.message || 'Ocurrió un error al crear la Cargo.';
                // Ocultar la alerta después de 5 segundos
                setTimeout(() => {
                  this.errorCrearCargo = '';
                }, 5000);
              }
            );
          }
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          this.errorCrearCargo = 'Error al verificar la existencia de la Cargo.';
        }
      );
    } else {
      // Mostrar mensaje de validación al usuario
      this.crearForm.markAllAsTouched();
    }
  }
  cancelar(): void {
    this.crearForm.reset();
  }
  cerrarMensaje() {
    this.cargoCreado = false;
    this.errorCrearCargo = '';
  }
  //get
  get cargoName() {
    return this.crearForm.get('cargoName');
  }

}
