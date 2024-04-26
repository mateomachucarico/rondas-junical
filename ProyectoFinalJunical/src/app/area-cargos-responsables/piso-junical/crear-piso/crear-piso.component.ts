import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {PisoService} from "./piso.service";


interface Torre {
  id: number;
  torreName: string;
  habilitado: boolean;
}

interface Piso {
  id: number;
  pisoName: string;
  pisoNumber: string;
  torre: Torre;
}
@Component({
  providers: [PisoService, HttpClient],
  selector: 'app-crear-piso',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    HttpClientModule,
    KeyValuePipe,
    NgForOf,
    CommonModule,

  ],
  templateUrl: './crear-piso.component.html',
  styleUrl: './crear-piso.component.css'
})
export class CrearPisoComponent implements OnInit {
  crearForm!: FormGroup;
  piso!: Piso;
  errorCrearPiso: string = ''; // Inicialización de la variable
  pisoCreado: boolean = false;
  pisoEnProceso: boolean = false;
  torres: Torre[] = [];
  pisos: Piso[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private pisoService: PisoService,
  ) {}

  ngOnInit(): void {
    this.crearForm = this.formBuilder.group({
      pisoName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      pisoNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(1), Validators.maxLength(5)]],
      torre: ['', [Validators.required]],
    });
    this.cargarTorres();
  }

  cargarTorres(): void {
    this.pisoService.recuperarTodosTorres().subscribe(
      (torres: Torre[]) => {
        this.torres = torres.filter(torre => torre.habilitado);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit(): void {
    if (this.crearForm.valid) {
      const pisoNumber = this.crearForm.value.pisoNumber;
      // Verificar si la piso ya existe
      this.pisoService.verificarPisoExistente(pisoNumber).subscribe(
        (existePiso: boolean) => {
          if (existePiso) {
            this.errorCrearPiso = 'El piso ya existe en la base de datos crea una con otro Nombre.';
          } else {
            // Si el piso no existe, proceder a crearla
            this.pisoEnProceso = true; // Mostrar indicador de carga
            this.pisoService.guardarPiso(this.crearForm.value).subscribe(
              (response) => {
                this.pisoEnProceso = false; // Ocultar indicador de carga
                // Manejo de la respuesta exitosa
                console.log("Piso creado exitosamente!" , response);
                this.crearForm.reset();
                if (!this.errorCrearPiso) { // Asegúrate de que no hay un error antes de establecer pisoCreado
                  this.pisoCreado = true; // Establece torreCreado solo cuando se crea la piso correctamente
                  setTimeout(() => {
                    this.pisoCreado = false;
                  }, 3000);
                }
              },
              (error) => {
                // Manejo de la respuesta con errores
                console.error(error);
                this.pisoEnProceso = false; // Ocultar indicador de carga
                // Mostrar mensaje de error al usuario
                this.errorCrearPiso = error.message || 'Ocurrió un error al crear el piso.';
                // Ocultar la alerta después de 5 segundos
                setTimeout(() => {
                  this.errorCrearPiso = '';
                }, 5000);
              }
            );
          }
        },
        (error) => {
          console.error(error);
          this.errorCrearPiso = 'Error al verificar la existencia del piso.';
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
    this.pisoCreado = false;
    this.errorCrearPiso = '';
  }
  // Getters para acceder a los controles del formulario
  get pisoName() {
    return this.crearForm.get('pisoName');
  }
  get pisoNumber() {
    return this.crearForm.get('pisoNumber');
  }
  get torre() {
    return this.crearForm.get('torre');
  }
  //Validación para PisoNumber
  isInvalidPisoNumber() {
    const pisoNumber = this.crearForm.get('pisoNumber');
    return pisoNumber && pisoNumber.invalid && (pisoNumber.dirty || pisoNumber.touched);
  }
  // Obtener errores de pisoNumber
  getErrorPisoNumber() {
    const pisoNumber = this.crearForm.get('pisoNumber');
    if (pisoNumber?.hasError('required')) {
      return 'El número de Piso es obligatorio.';
    }
    if (pisoNumber?.hasError('pattern')) {
      return 'El número de Piso debe contener solo números.';
    }
    if (pisoNumber?.hasError('minlength')) {
      return 'El número de Piso debe tener al menos 1 números.';
    }
    if (pisoNumber?.hasError('maxlength')) {
      return 'El número de Piso no debe exceder los 5 números.';
    }
    return '';
  }
}
