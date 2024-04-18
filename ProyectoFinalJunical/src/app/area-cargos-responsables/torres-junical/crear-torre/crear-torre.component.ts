import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {KeyValuePipe, NgIf} from "@angular/common";
import {TorresService} from "../torres.service";
import {HttpClient, HttpClientModule, HttpErrorResponse} from "@angular/common/http";

interface Torre {
  id: number;
  torreName: string;
  habilitado: boolean;
  [key: string]: boolean | number | string;
}
@Component({
  providers: [TorresService, HttpClient],
  selector: 'app-crear-torre',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    HttpClientModule,
    KeyValuePipe

  ],
  templateUrl: './crear-torre.component.html',
  styleUrl: './crear-torre.component.css'
})
export class CrearTorreComponent implements OnInit{
  crearForm!: FormGroup;
  torre: Torre = {id: 0, torreName: '',habilitado:false };
  torreCreado: boolean = false;
  torreEnProceso: boolean = false;
  errorCrearTorre: string = ''; // Inicialización de la variable

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private torreService: TorresService

  ) {
  }
  ngOnInit(): void {
    this.crearForm = this.formBuilder.group({
      torreName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    });
  }
  onSubmit(): void {
    if (this.crearForm.valid) {
      const torreName = this.crearForm.value.torreName;
      // Verificar si la torre ya existe
      this.torreService.verificarTorreExistente(torreName).subscribe(
        (existeTorre: boolean) => {
          if (existeTorre) {
            this.errorCrearTorre = 'La torre ya existe en la base de datos crea una con otro Nombre.';
          } else {
            // Si la torre no existe, proceder a crearla
            this.torreEnProceso = true; // Mostrar indicador de carga
            this.torreService.guardarTorre(this.crearForm.value).subscribe(
              (response) => {
                this.torreEnProceso = false; // Ocultar indicador de carga
                // Manejo de la respuesta exitosa
                console.log("Torre creado exitosamente!" , response);
                this.crearForm.reset();
                if (!this.errorCrearTorre) { // Asegúrate de que no hay un error antes de establecer torreCreado
                  this.torreCreado = true; // Establece torreCreado solo cuando se crea la torre correctamente
                  setTimeout(() => {
                    this.torreCreado = false;
                  }, 3000);
                }
              },
              (error: HttpErrorResponse) => {
                // Manejo de la respuesta con errores
                console.error(error);
                this.torreEnProceso = false; // Ocultar indicador de carga
                // Mostrar mensaje de error al usuario
                this.errorCrearTorre = error.message || 'Ocurrió un error al crear la Torre.';
                // Ocultar la alerta después de 5 segundos
                setTimeout(() => {
                  this.errorCrearTorre = '';
                }, 5000);
              }
            );
          }
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          this.errorCrearTorre = 'Error al verificar la existencia de la torre.';
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
    this.torreCreado = false;
    this.errorCrearTorre = '';
  }
  //get
  get torreName() {
    return this.crearForm.get('torreName');
  }
}

